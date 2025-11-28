//=============================================================================
// GALAXY SIMULATOR SHADER
// V19 Experiment: Procedural spiral galaxy with differential rotation
//
// Visual Goals:
// - Realistic spiral galaxy structure with 2 logarithmic arms
// - Central bulge (hot/blue) + disk (cool/red-orange)
// - Thousands of procedural stars with proper density distribution
// - Differential rotation (inner stars orbit faster)
// - Mouse controls viewing angle / parallax
//
// Techniques from PRD:
// - Cube root distribution for uniform star density
// - Logarithmic spirals: r = a × e^(b × θ)
// - Blackbody temperature colors (O→B→A→F→G→K→M)
// - Three-zone soft edge falloff
// - Kepler-inspired orbital motion: ω ∝ 1/√r
//
// Base Uniforms (from BaseExperimentShader):
// - u_time: float (incrementing time in seconds)
// - u_resolution: vec2 (window width, height in pixels)
// - u_mouse: vec2 (normalized mouse position, 0-1)
// - u_backgroundColor: vec3 (theme-based: black or white)
//=============================================================================

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

//=============================================================================
// CONSTANTS
//=============================================================================

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define NUM_ARMS 2.0
#define SPIRAL_TIGHTNESS 0.3
#define GALAXY_RADIUS 0.45
#define BULGE_RADIUS 0.08
#define NUM_STAR_LAYERS 5

//=============================================================================
// HASH & NOISE FUNCTIONS
//=============================================================================

// High-quality 2D hash for star positions
float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

// 2D hash returning vec2 (for star offsets)
vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}

// Simple value noise for turbulence
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Smooth interpolation

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

//=============================================================================
// STAR TEMPERATURE → COLOR (Blackbody Approximation)
//=============================================================================

// Maps temperature factor (0=cool/red, 1=hot/blue) to star color
vec3 starColor(float temp) {
    // M-type (cool, red-orange)
    vec3 colorM = vec3(1.0, 0.5, 0.2);
    // K-type (orange)
    vec3 colorK = vec3(1.0, 0.7, 0.4);
    // G-type (yellow, like Sun)
    vec3 colorG = vec3(1.0, 0.9, 0.7);
    // F-type (yellow-white)
    vec3 colorF = vec3(1.0, 0.95, 0.9);
    // A-type (white)
    vec3 colorA = vec3(0.9, 0.9, 1.0);
    // B-type (blue-white)
    vec3 colorB = vec3(0.7, 0.8, 1.0);
    // O-type (hot blue)
    vec3 colorO = vec3(0.6, 0.7, 1.0);

    // Blend through the sequence
    vec3 color;
    if (temp < 0.15) {
        color = mix(colorM, colorK, temp / 0.15);
    } else if (temp < 0.35) {
        color = mix(colorK, colorG, (temp - 0.15) / 0.2);
    } else if (temp < 0.5) {
        color = mix(colorG, colorF, (temp - 0.35) / 0.15);
    } else if (temp < 0.65) {
        color = mix(colorF, colorA, (temp - 0.5) / 0.15);
    } else if (temp < 0.85) {
        color = mix(colorA, colorB, (temp - 0.65) / 0.2);
    } else {
        color = mix(colorB, colorO, (temp - 0.85) / 0.15);
    }

    return color;
}

//=============================================================================
// SPIRAL ARM DENSITY
//=============================================================================

// Calculate distance to nearest spiral arm
// Uses logarithmic spiral: r = a * e^(b * theta)
float spiralArmDensity(float r, float theta, float time) {
    float density = 0.0;

    // Check both arms (180° apart)
    for (float arm = 0.0; arm < NUM_ARMS; arm++) {
        // Arm starting angle
        float armOffset = arm * PI;

        // Logarithmic spiral angle for this radius
        // Inverted: theta = ln(r/a) / b
        float spiralAngle = log(max(r, 0.001) / 0.02) / SPIRAL_TIGHTNESS;
        spiralAngle += armOffset;

        // Add slow rotation to the entire spiral pattern
        spiralAngle += time * 0.05;

        // Angular distance to arm (wrapped)
        float angleDiff = mod(theta - spiralAngle + PI, TWO_PI) - PI;

        // Arm width varies with radius (wider at edges)
        float armWidth = 0.3 + r * 0.5;

        // Exponential falloff from arm center
        float armStrength = exp(-abs(angleDiff) / armWidth);

        density = max(density, armStrength);
    }

    return density;
}

//=============================================================================
// DENSITY FALLOFF (Three-Zone System from PRD)
//=============================================================================

float densityFalloff(float r) {
    float normalizedR = r / GALAXY_RADIUS;

    // Core zone (0-85%): full density
    if (normalizedR < 0.85) {
        return 1.0;
    }
    // Transition zone (85-100%): linear fade
    else if (normalizedR < 1.0) {
        return mix(1.0, 0.5, (normalizedR - 0.85) / 0.15);
    }
    // Outlier zone (100-200%): exponential decay
    else {
        float excess = normalizedR - 1.0;
        return 0.5 * exp(-excess * 3.0);
    }
}

//=============================================================================
// STAR FIELD GENERATION
//=============================================================================

float starField(vec2 uv, float scale, float time, float layer) {
    float stars = 0.0;

    // Grid-based star placement
    vec2 gridUV = uv * scale;
    vec2 gridID = floor(gridUV);
    vec2 gridFract = fract(gridUV);

    // Check neighboring cells for stars
    for (float y = -1.0; y <= 1.0; y++) {
        for (float x = -1.0; x <= 1.0; x++) {
            vec2 neighbor = vec2(x, y);
            vec2 cellID = gridID + neighbor;

            // Random position within cell
            vec2 starPos = hash22(cellID + layer * 100.0);

            // Cube root distribution for radius (from PRD)
            // This creates uniform density throughout the galaxy
            float randRadius = pow(hash21(cellID * 7.13 + layer), 0.333);

            // Convert star position to polar for spiral arm check
            vec2 starUV = (cellID + starPos) / scale;
            float starR = length(starUV);
            float starTheta = atan(starUV.y, starUV.x);

            // Differential rotation: inner stars move faster
            // Angular velocity ∝ 1/√r (Kepler-inspired)
            float angularVel = 1.0 / (sqrt(max(starR, 0.05)) * 5.0);
            starTheta += time * angularVel * 0.3;

            // Recalculate position after rotation
            vec2 rotatedPos = vec2(cos(starTheta), sin(starTheta)) * starR;
            rotatedPos = rotatedPos * scale - gridID;

            // Distance from fragment to star
            vec2 diff = gridFract - rotatedPos - neighbor;
            float dist = length(diff);

            // Star visibility based on density
            float spiralDensity = spiralArmDensity(starR, starTheta, time);
            float edgeFalloff = densityFalloff(starR);

            // Central bulge has higher base density
            float bulgeFactor = smoothstep(BULGE_RADIUS * 2.0, 0.0, starR);
            float totalDensity = mix(spiralDensity, 1.0, bulgeFactor) * edgeFalloff;

            // Star appears if random value is below density threshold
            float threshold = hash21(cellID * 3.57 + layer * 50.0);
            if (threshold < totalDensity * 0.7) {
                // Star size (randomized, smaller stars more common)
                float starSize = 0.015 + hash21(cellID * 1.23) * 0.025;
                starSize *= (1.0 + bulgeFactor * 0.5); // Slightly larger in bulge

                // Star brightness with twinkle
                float twinkle = 0.7 + 0.3 * sin(time * 3.0 + hash21(cellID) * TWO_PI);
                float brightness = smoothstep(starSize, 0.0, dist) * twinkle;

                // Temperature based on radius (hotter toward center)
                float temp = 1.0 - starR / GALAXY_RADIUS;
                temp = clamp(temp + (hash21(cellID * 5.67) - 0.5) * 0.3, 0.0, 1.0);

                stars = max(stars, brightness);
            }
        }
    }

    return stars;
}

//=============================================================================
// GALACTIC DUST & NEBULA
//=============================================================================

vec3 galacticDust(vec2 uv, float time) {
    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // Dust follows spiral arms but with offset
    float dustDensity = spiralArmDensity(r, theta + 0.2, time);
    dustDensity *= densityFalloff(r);

    // Add noise for nebula-like structure
    float n = noise(uv * 8.0 + time * 0.1);
    n += noise(uv * 16.0 - time * 0.05) * 0.5;
    dustDensity *= n;

    // Dust color (reddish-brown, like real galactic dust)
    vec3 dustColor = vec3(0.4, 0.2, 0.15);

    // Blue emission nebulae near hot stars (center)
    vec3 emissionColor = vec3(0.2, 0.3, 0.6);
    float emissionStrength = smoothstep(0.2, 0.0, r);

    return mix(dustColor, emissionColor, emissionStrength) * dustDensity * 0.15;
}

//=============================================================================
// CENTRAL BULGE GLOW
//=============================================================================

vec3 centralBulge(vec2 uv) {
    float r = length(uv);

    // Bright central core
    float coreGlow = BULGE_RADIUS / max(r, 0.001);
    coreGlow = pow(coreGlow, 1.5) * 0.05;
    coreGlow = clamp(coreGlow, 0.0, 1.0);

    // Soft bulge halo
    float halo = smoothstep(BULGE_RADIUS * 3.0, 0.0, r);

    // Hot core color (yellow-white)
    vec3 coreColor = vec3(1.0, 0.95, 0.8);

    return coreColor * (coreGlow + halo * 0.1);
}

//=============================================================================
// MAIN
//=============================================================================

void main() {
    // Normalized coordinates with aspect ratio correction
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Mouse-based viewing angle (tilt the galaxy)
    vec2 mouseOffset = (u_mouse - 0.5) * 0.3;

    // Apply slight perspective tilt based on mouse
    float tiltX = mouseOffset.x * 0.5;
    float tiltY = mouseOffset.y * 0.3;

    // Rotate UV based on mouse for orbiting view
    float viewAngle = mouseOffset.x * PI * 0.25;
    mat2 viewRot = mat2(cos(viewAngle), -sin(viewAngle),
                        sin(viewAngle), cos(viewAngle));
    uv = viewRot * uv;

    // Slight Y-compression for edge-on tilt effect
    uv.y *= 1.0 + abs(mouseOffset.y) * 0.3;

    float time = u_time * 0.5; // Slow time for majestic rotation

    // Initialize color with background
    vec3 color = u_backgroundColor;

    // Determine if dark or light mode
    float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
    bool isDarkMode = bgBrightness < 0.5;

    // Galactic dust layer (subtle in background)
    vec3 dust = galacticDust(uv, time);

    // Multi-layer star field for depth
    float totalStars = 0.0;
    vec3 starColors = vec3(0.0);

    for (int i = 0; i < NUM_STAR_LAYERS; i++) {
        float layer = float(i);
        float scale = 30.0 + layer * 20.0; // Different densities per layer

        // Star field for this layer
        vec2 layerUV = uv + vec2(layer * 0.1, layer * 0.07);

        // Grid-based star rendering
        vec2 gridUV = layerUV * scale;
        vec2 gridID = floor(gridUV);
        vec2 gridFract = fract(gridUV);

        for (float y = -1.0; y <= 1.0; y++) {
            for (float x = -1.0; x <= 1.0; x++) {
                vec2 neighbor = vec2(x, y);
                vec2 cellID = gridID + neighbor;

                // Star position within cell
                vec2 starOffset = hash22(cellID + layer * 100.0);
                vec2 starGridPos = neighbor + starOffset;

                // World position of star
                vec2 starWorldUV = (cellID + starOffset) / scale;
                float starR = length(starWorldUV);
                float starTheta = atan(starWorldUV.y, starWorldUV.x);

                // Skip stars outside galaxy
                if (starR > GALAXY_RADIUS * 1.5) continue;

                // Differential rotation
                float angularVel = 1.0 / (sqrt(max(starR, 0.05)) * 5.0);
                float rotatedTheta = starTheta + time * angularVel * 0.3;

                // New position after rotation
                vec2 rotatedWorld = vec2(cos(rotatedTheta), sin(rotatedTheta)) * starR;
                vec2 rotatedGrid = rotatedWorld * scale;
                vec2 rotatedLocal = rotatedGrid - gridID;

                // Distance to star
                float dist = length(gridFract - rotatedLocal);

                // Density check
                float spiralDensity = spiralArmDensity(starR, rotatedTheta, time);
                float edgeFalloff = densityFalloff(starR);
                float bulgeFactor = smoothstep(BULGE_RADIUS * 2.0, 0.0, starR);
                float totalDensity = mix(spiralDensity * 0.8, 1.0, bulgeFactor) * edgeFalloff;

                // Probabilistic star visibility
                float prob = hash21(cellID * 3.57 + layer * 50.0);
                if (prob < totalDensity * 0.6) {
                    // Star size
                    float sizeMult = 0.8 + hash21(cellID * 2.34) * 0.4;
                    float starSize = (0.02 + layer * 0.005) * sizeMult / scale;

                    // Brightness with twinkle
                    float twinkle = 0.7 + 0.3 * sin(time * 4.0 + hash21(cellID) * TWO_PI);
                    float brightness = smoothstep(starSize * scale, 0.0, dist) * twinkle;

                    // Star color based on temperature (center = hotter)
                    float temp = 1.0 - (starR / GALAXY_RADIUS);
                    temp += (hash21(cellID * 5.67) - 0.5) * 0.4;
                    temp = clamp(temp, 0.0, 1.0);

                    vec3 thisStarColor = starColor(temp);

                    // Accumulate
                    if (brightness > 0.01) {
                        starColors += thisStarColor * brightness;
                        totalStars += brightness;
                    }
                }
            }
        }
    }

    // Central bulge glow
    vec3 bulge = centralBulge(uv);

    // Combine all layers
    if (isDarkMode) {
        // Dark mode: additive blending, stars pop
        color = u_backgroundColor;
        color += dust;
        color += bulge;
        color += starColors * 1.2;
    } else {
        // Light mode: subtle overlay
        float intensity = 0.4;
        vec3 galaxyColor = dust + bulge + starColors;
        color = mix(u_backgroundColor, galaxyColor, intensity);
    }

    // Slight vignette for depth
    float vignette = 1.0 - length(uv) * 0.5;
    color *= vignette;

    // Clamp to valid range
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
