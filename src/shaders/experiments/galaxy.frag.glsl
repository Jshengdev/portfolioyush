//=============================================================================
// GALAXY SIMULATOR SHADER (Enhanced with LOD & Effects)
// V19 Experiment: Procedural spiral galaxy with zoom, LOD, and particle variety
//
// Visual Goals:
// - Realistic spiral galaxy structure with 2 logarithmic arms
// - Central hot bulge (blue-white) + disk (cool/red-orange)
// - ZOOM with Level-of-Detail (LOD) system
// - Enhanced effects: star clusters, nebulae, supernovae, bloom
// - Differential rotation (inner stars orbit faster)
// - Mouse controls viewing angle + scroll controls zoom
//
// Techniques from PRD:
// - Cube root distribution for uniform star density
// - Logarithmic spirals: r = a × e^(b × θ)
// - Blackbody temperature colors (O→B→A→F→G→K→M)
// - Three-zone soft edge falloff
// - Kepler-inspired orbital motion: ω ∝ 1/√r
// - LOD culling based on zoom level
//
// Uniforms:
// - u_time: float (incrementing time in seconds)
// - u_resolution: vec2 (window width, height in pixels)
// - u_mouse: vec2 (normalized mouse position, 0-1)
// - u_backgroundColor: vec3 (theme-based: black or white)
// - u_zoom: float (zoom level, 0.3 to 15.0)
//=============================================================================

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;
uniform float u_zoom;

//=============================================================================
// CONSTANTS
//=============================================================================

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define NUM_ARMS 2.0
#define SPIRAL_TIGHTNESS 0.3
#define GALAXY_RADIUS 0.45
#define BULGE_RADIUS 0.08

//=============================================================================
// HASH & NOISE FUNCTIONS
//=============================================================================

float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}

vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion for nebula clouds
float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

//=============================================================================
// STAR TEMPERATURE → COLOR (Blackbody Approximation)
//=============================================================================

vec3 starColor(float temp) {
    vec3 colorM = vec3(1.0, 0.5, 0.2);
    vec3 colorK = vec3(1.0, 0.7, 0.4);
    vec3 colorG = vec3(1.0, 0.9, 0.7);
    vec3 colorF = vec3(1.0, 0.95, 0.9);
    vec3 colorA = vec3(0.9, 0.9, 1.0);
    vec3 colorB = vec3(0.7, 0.8, 1.0);
    vec3 colorO = vec3(0.6, 0.7, 1.0);

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

// Supernova explosion color
vec3 supernovaColor(float intensity) {
    vec3 core = vec3(1.0, 1.0, 1.0);
    vec3 mid = vec3(1.0, 0.8, 0.3);
    vec3 outer = vec3(1.0, 0.3, 0.1);

    if (intensity > 0.7) {
        return mix(mid, core, (intensity - 0.7) / 0.3);
    } else if (intensity > 0.3) {
        return mix(outer, mid, (intensity - 0.3) / 0.4);
    }
    return outer * intensity;
}

// Nebula color palette
vec3 nebulaColor(float value, float variation) {
    vec3 purple = vec3(0.4, 0.1, 0.6);
    vec3 blue = vec3(0.1, 0.3, 0.7);
    vec3 pink = vec3(0.8, 0.2, 0.5);
    vec3 teal = vec3(0.1, 0.6, 0.6);

    float t = fract(value + variation);
    if (t < 0.25) {
        return mix(purple, blue, t * 4.0);
    } else if (t < 0.5) {
        return mix(blue, teal, (t - 0.25) * 4.0);
    } else if (t < 0.75) {
        return mix(teal, pink, (t - 0.5) * 4.0);
    }
    return mix(pink, purple, (t - 0.75) * 4.0);
}

//=============================================================================
// SPIRAL ARM DENSITY
//=============================================================================

float spiralArmDensity(float r, float theta, float time) {
    float density = 0.0;

    for (float arm = 0.0; arm < NUM_ARMS; arm++) {
        float armOffset = arm * PI;
        float spiralAngle = log(max(r, 0.001) / 0.02) / SPIRAL_TIGHTNESS;
        spiralAngle += armOffset;
        spiralAngle += time * 0.05;

        float angleDiff = mod(theta - spiralAngle + PI, TWO_PI) - PI;
        float armWidth = 0.3 + r * 0.5;
        float armStrength = exp(-abs(angleDiff) / armWidth);

        density = max(density, armStrength);
    }

    return density;
}

//=============================================================================
// DENSITY FALLOFF (Three-Zone System)
//=============================================================================

float densityFalloff(float r) {
    float normalizedR = r / GALAXY_RADIUS;

    if (normalizedR < 0.85) {
        return 1.0;
    } else if (normalizedR < 1.0) {
        return mix(1.0, 0.5, (normalizedR - 0.85) / 0.15);
    } else {
        float excess = normalizedR - 1.0;
        return 0.5 * exp(-excess * 3.0);
    }
}

//=============================================================================
// LOD SYSTEM - Determines detail level based on zoom
//=============================================================================

// Returns number of star layers based on zoom
int getLODLayers(float zoom) {
    if (zoom < 0.5) return 2;      // Far: minimal stars
    if (zoom < 1.0) return 3;      // Normal: standard
    if (zoom < 2.0) return 4;      // Close: more detail
    if (zoom < 5.0) return 5;      // Very close: high detail
    return 6;                       // Extreme: maximum detail
}

// Returns star size multiplier based on zoom
float getLODStarSize(float zoom) {
    return mix(0.5, 2.0, smoothstep(0.3, 8.0, zoom));
}

// Returns whether to show nebulae
bool showNebulae(float zoom) {
    return zoom > 0.8;
}

// Returns whether to show star clusters
bool showClusters(float zoom) {
    return zoom > 1.5;
}

// Returns whether to show supernovae
bool showSupernovae(float zoom) {
    return zoom > 2.0;
}

//=============================================================================
// NEBULA CLOUDS (FBM-based emission nebulae)
//=============================================================================

vec3 renderNebulae(vec2 uv, float time, float zoom) {
    if (!showNebulae(zoom)) return vec3(0.0);

    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // Nebulae follow spiral arms loosely
    float armDensity = spiralArmDensity(r, theta, time);

    // FBM for cloud structure
    vec2 nebUV = uv * 3.0 + time * 0.02;
    float nebula = fbm(nebUV, 5);
    nebula *= fbm(nebUV * 2.0 + 10.0, 4);

    // Mask to spiral arms and galaxy bounds
    nebula *= armDensity * 0.8;
    nebula *= densityFalloff(r);
    nebula *= smoothstep(GALAXY_RADIUS * 1.2, GALAXY_RADIUS * 0.3, r);

    // Intensity based on zoom
    float intensity = smoothstep(0.8, 3.0, zoom) * 0.15;

    // Color variation
    float colorVar = hash21(floor(uv * 5.0));
    vec3 nebColor = nebulaColor(nebula + time * 0.01, colorVar);

    return nebColor * nebula * intensity;
}

//=============================================================================
// STAR CLUSTERS (Globular clusters around galaxy)
//=============================================================================

vec3 renderStarClusters(vec2 uv, float time, float zoom) {
    if (!showClusters(zoom)) return vec3(0.0);

    vec3 clusters = vec3(0.0);
    float clusterIntensity = smoothstep(1.5, 5.0, zoom) * 1.5;

    // 8 globular clusters positioned around galaxy
    for (float i = 0.0; i < 8.0; i++) {
        float angle = i * TWO_PI / 8.0 + hash21(vec2(i, 0.0)) * 0.5;
        float dist = 0.25 + hash21(vec2(i, 1.0)) * 0.2;

        vec2 clusterPos = vec2(cos(angle), sin(angle)) * dist;

        // Slow orbital motion
        float orbitSpeed = 0.02 / sqrt(dist);
        clusterPos = mat2(cos(time * orbitSpeed), -sin(time * orbitSpeed),
                          sin(time * orbitSpeed), cos(time * orbitSpeed)) * clusterPos;

        float d = length(uv - clusterPos);
        float clusterRadius = 0.02 + hash21(vec2(i, 2.0)) * 0.015;

        // Dense core with halo
        float core = smoothstep(clusterRadius, 0.0, d);
        float halo = smoothstep(clusterRadius * 3.0, clusterRadius * 0.5, d) * 0.3;

        // Individual stars in cluster (at high zoom)
        float stars = 0.0;
        if (zoom > 3.0 && d < clusterRadius * 2.0) {
            vec2 localUV = (uv - clusterPos) * 100.0;
            vec2 gridID = floor(localUV);
            for (float y = -1.0; y <= 1.0; y++) {
                for (float x = -1.0; x <= 1.0; x++) {
                    vec2 cellID = gridID + vec2(x, y);
                    vec2 starPos = hash22(cellID + i * 100.0);
                    float starDist = length(fract(localUV) - starPos - vec2(x, y));
                    stars += smoothstep(0.1, 0.0, starDist) * 0.5;
                }
            }
        }

        // Old yellow-orange stars typical of globular clusters
        vec3 clusterColor = vec3(1.0, 0.85, 0.6);
        clusters += clusterColor * (core + halo + stars * 0.3) * clusterIntensity;
    }

    return clusters;
}

//=============================================================================
// SUPERNOVAE (Rare explosive events)
//=============================================================================

vec3 renderSupernovae(vec2 uv, float time, float zoom) {
    if (!showSupernovae(zoom)) return vec3(0.0);

    vec3 supernovae = vec3(0.0);

    // 3 supernovae at fixed but scattered positions
    for (float i = 0.0; i < 3.0; i++) {
        // Position based on hash
        vec2 snPos = (hash22(vec2(i * 17.3, i * 23.7)) - 0.5) * 0.6;

        // Pulsing lifecycle (each supernova has different phase)
        float phase = fract(time * 0.05 + hash21(vec2(i, 0.0)));
        float lifecycle = sin(phase * PI); // Grows then fades

        // Only visible during "explosion" phase
        if (lifecycle < 0.1) continue;

        float d = length(uv - snPos);

        // Expanding shockwave
        float shockRadius = lifecycle * 0.08;
        float shock = smoothstep(shockRadius + 0.01, shockRadius, d) *
                      smoothstep(shockRadius - 0.02, shockRadius, d);

        // Bright core
        float core = smoothstep(0.02, 0.0, d) * lifecycle;

        // God rays / spikes
        float angle = atan(uv.y - snPos.y, uv.x - snPos.x);
        float rays = pow(abs(sin(angle * 4.0 + time)), 8.0);
        rays *= smoothstep(0.15, 0.0, d) * lifecycle;

        float intensity = (core * 2.0 + shock * 0.5 + rays * 0.3) * lifecycle;
        intensity *= smoothstep(2.0, 5.0, zoom);

        supernovae += supernovaColor(intensity) * intensity;
    }

    return supernovae;
}

//=============================================================================
// BLOOM / GLOW EFFECT
//=============================================================================

vec3 addBloom(vec3 color, float zoom) {
    // Stronger bloom at higher zoom
    float bloomStrength = smoothstep(1.0, 5.0, zoom) * 0.3;

    // Threshold for bloom (bright areas)
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    float bloomMask = smoothstep(0.5, 1.0, luminance);

    // Add soft glow
    vec3 bloom = color * bloomMask * bloomStrength;
    return color + bloom;
}

//=============================================================================
// GALACTIC DUST & NEBULA (enhanced)
//=============================================================================

vec3 galacticDust(vec2 uv, float time, float zoom) {
    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    float dustDensity = spiralArmDensity(r, theta + 0.2, time);
    dustDensity *= densityFalloff(r);

    // More detail at higher zoom
    int octaves = zoom > 2.0 ? 5 : 3;
    float n = fbm(uv * 8.0 + time * 0.1, octaves);
    n += fbm(uv * 16.0 - time * 0.05, octaves - 1) * 0.5;
    dustDensity *= n;

    vec3 dustColor = vec3(0.4, 0.2, 0.15);
    vec3 emissionColor = vec3(0.2, 0.3, 0.6);
    float emissionStrength = smoothstep(0.2, 0.0, r);

    float intensity = 0.15 * (1.0 + smoothstep(1.0, 4.0, zoom) * 0.5);

    return mix(dustColor, emissionColor, emissionStrength) * dustDensity * intensity;
}

//=============================================================================
// CENTRAL BULGE GLOW (enhanced with zoom)
//=============================================================================

vec3 centralBulge(vec2 uv, float zoom) {
    float r = length(uv);

    // Brighter and more detailed at higher zoom
    float zoomFactor = 1.0 + smoothstep(1.0, 5.0, zoom) * 0.5;

    float coreGlow = BULGE_RADIUS / max(r, 0.001);
    coreGlow = pow(coreGlow, 1.5) * 0.05 * zoomFactor;
    coreGlow = clamp(coreGlow, 0.0, 1.0);

    float halo = smoothstep(BULGE_RADIUS * 3.0, 0.0, r);

    // Add structure at high zoom (accretion disk hint)
    if (zoom > 3.0) {
        float diskAngle = atan(uv.y, uv.x);
        float disk = smoothstep(0.02, 0.01, r) * (0.5 + 0.5 * sin(diskAngle * 8.0 + r * 50.0));
        coreGlow += disk * 0.2;
    }

    vec3 coreColor = vec3(1.0, 0.95, 0.8);
    return coreColor * (coreGlow + halo * 0.1);
}

//=============================================================================
// MAIN STAR FIELD with LOD
//=============================================================================

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Apply zoom
    float zoom = u_zoom;
    uv /= zoom;

    // Mouse-based viewing angle
    vec2 mouseOffset = (u_mouse - 0.5) * 0.3;
    float viewAngle = mouseOffset.x * PI * 0.25;
    mat2 viewRot = mat2(cos(viewAngle), -sin(viewAngle),
                        sin(viewAngle), cos(viewAngle));
    uv = viewRot * uv;
    uv.y *= 1.0 + abs(mouseOffset.y) * 0.3;

    float time = u_time * 0.5;

    // Initialize with background
    vec3 color = u_backgroundColor;

    float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
    bool isDarkMode = bgBrightness < 0.5;

    // Get LOD parameters
    int numLayers = getLODLayers(zoom);
    float starSizeMult = getLODStarSize(zoom);

    // Galactic dust
    vec3 dust = galacticDust(uv, time, zoom);

    // Nebulae (only at medium+ zoom)
    vec3 nebulae = renderNebulae(uv, time, zoom);

    // Star clusters (only at close zoom)
    vec3 clusters = renderStarClusters(uv, time, zoom);

    // Supernovae (only at high zoom)
    vec3 supernovae = renderSupernovae(uv, time, zoom);

    // Multi-layer star field with LOD
    vec3 starColors = vec3(0.0);

    for (int i = 0; i < 6; i++) {
        if (i >= numLayers) break;

        float layer = float(i);
        float scale = (30.0 + layer * 20.0) * (1.0 + zoom * 0.2);

        vec2 layerUV = uv + vec2(layer * 0.1, layer * 0.07);
        vec2 gridUV = layerUV * scale;
        vec2 gridID = floor(gridUV);
        vec2 gridFract = fract(gridUV);

        for (float y = -1.0; y <= 1.0; y++) {
            for (float x = -1.0; x <= 1.0; x++) {
                vec2 neighbor = vec2(x, y);
                vec2 cellID = gridID + neighbor;

                vec2 starOffset = hash22(cellID + layer * 100.0);
                vec2 starWorldUV = (cellID + starOffset) / scale;
                float starR = length(starWorldUV);
                float starTheta = atan(starWorldUV.y, starWorldUV.x);

                if (starR > GALAXY_RADIUS * 1.5) continue;

                // Differential rotation
                float angularVel = 1.0 / (sqrt(max(starR, 0.05)) * 5.0);
                float rotatedTheta = starTheta + time * angularVel * 0.3;

                vec2 rotatedWorld = vec2(cos(rotatedTheta), sin(rotatedTheta)) * starR;
                vec2 rotatedGrid = rotatedWorld * scale;
                vec2 rotatedLocal = rotatedGrid - gridID;

                float dist = length(gridFract - rotatedLocal);

                // Density check
                float spiralDensity = spiralArmDensity(starR, rotatedTheta, time);
                float edgeFalloff = densityFalloff(starR);
                float bulgeFactor = smoothstep(BULGE_RADIUS * 2.0, 0.0, starR);
                float totalDensity = mix(spiralDensity * 0.8, 1.0, bulgeFactor) * edgeFalloff;

                float prob = hash21(cellID * 3.57 + layer * 50.0);
                if (prob < totalDensity * 0.6) {
                    // Star size with LOD
                    float sizeMult = 0.8 + hash21(cellID * 2.34) * 0.4;
                    float starSize = (0.02 + layer * 0.005) * sizeMult / scale * starSizeMult;

                    // Twinkle
                    float twinkle = 0.7 + 0.3 * sin(time * 4.0 + hash21(cellID) * TWO_PI);
                    float brightness = smoothstep(starSize * scale, 0.0, dist) * twinkle;

                    // Temperature color
                    float temp = 1.0 - (starR / GALAXY_RADIUS);
                    temp += (hash21(cellID * 5.67) - 0.5) * 0.4;
                    temp = clamp(temp, 0.0, 1.0);

                    vec3 thisStarColor = starColor(temp);

                    // Brighter stars at higher zoom
                    brightness *= (1.0 + smoothstep(2.0, 8.0, zoom) * 0.5);

                    if (brightness > 0.01) {
                        starColors += thisStarColor * brightness;
                    }
                }
            }
        }
    }

    // Central bulge
    vec3 bulge = centralBulge(uv, zoom);

    // Combine all layers
    if (isDarkMode) {
        color = u_backgroundColor;
        color += dust;
        color += nebulae;
        color += bulge;
        color += starColors * 1.2;
        color += clusters;
        color += supernovae;
    } else {
        float intensity = 0.4;
        vec3 galaxyColor = dust + nebulae + bulge + starColors + clusters + supernovae;
        color = mix(u_backgroundColor, galaxyColor, intensity);
    }

    // Add bloom at high zoom
    color = addBloom(color, zoom);

    // Vignette (less pronounced at high zoom)
    float vignetteStrength = mix(0.5, 0.2, smoothstep(1.0, 5.0, zoom));
    float vignette = 1.0 - length(uv * zoom) * vignetteStrength;
    color *= vignette;

    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
