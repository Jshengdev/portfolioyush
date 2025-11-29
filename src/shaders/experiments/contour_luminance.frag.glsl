precision highp float;

/**
 * V21 - Oscilloscope Waveform Hand (Phase 2)
 *
 * AESTHETIC: Joy Division meets CRT oscilloscope
 * Phase 1: FBM noise, exponential amplitude, variable thickness, edge enhancement
 * Phase 2: Depth parallax + cursor interaction
 */

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_depthMap;
uniform sampler2D u_originalImage;

// Scanline parameters
uniform float u_lineCount;
uniform float u_lineThickness;

// FBM Noise parameters
uniform float u_amplitude;
uniform float u_noiseScale;
uniform float u_noiseSpeed;
uniform float u_octaves;        // 2-6
uniform float u_lacunarity;     // 1.5-2.5
uniform float u_persistence;    // 0.3-0.7

// Amplitude mapping
uniform float u_amplitudeGamma; // 1.0-4.0 (exponential mapping)
uniform float u_bgAmplitude;

// Variable thickness
uniform float u_thicknessRange; // 0.0-4.0 (additional thickness in highlights)

// Edge enhancement
uniform float u_edgeMultiplier; // 0.0-5.0
uniform float u_edgeThreshold;  // 0.01-0.1

// Vertical displacement
uniform float u_verticalScale;  // 0.0-0.5

// Dash parameters
uniform float u_dashWidth;
uniform float u_dashDensity;

// Bloom parameters
uniform float u_bloomStrength;
uniform float u_bloomRadius;
uniform float u_contrast;

// Phase 2: Parallax parameters
uniform float u_parallaxStrength;   // 0.0-0.1
uniform float u_depthInfluence;     // 0.0-1.0

// Phase 2: Cursor interaction parameters (DEFORMATION, not displacement)
uniform float u_cursorRadius;       // 0.05-0.4 - Size of influence area
uniform float u_cursorStrength;     // 0.0-2.0 - Deformation intensity
uniform float u_cursorFalloff;      // 0.5-3.0 - Falloff curve power
uniform float u_cursorMode;         // 0=Tangential, 1=Magnetic, 2=Cymatic
uniform float u_tensionStrength;    // 0.0-1.0 - How much lines stretch
uniform float u_waveFrequency;      // 1.0-10.0 - Cymatic mode wave count
uniform float u_waveSpeed;          // 0.0-5.0 - Cymatic mode animation speed

// Debug/Visibility toggles
uniform float u_debugMode;          // 0=normal, 1=depth, 2=luminance, 3=lines only
uniform float u_useDepth;           // 0=off, 1=on
uniform float u_useLuminance;       // 0=off, 1=on
uniform float u_useBloom;           // 0=off, 1=on - Disable to remove ghost image

// ============================================
// NOISE FUNCTIONS
// ============================================

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Smooth 1D noise
float noise1D(float x) {
    float i = floor(x);
    float f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), f);
}

// Fractal Brownian Motion - layered noise for organic complexity
float fbm(float y, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float maxValue = 0.0;

    int numOctaves = int(u_octaves);
    for (int i = 0; i < 6; i++) {
        if (i >= numOctaves) break;

        value += amplitude * noise1D(y * frequency * u_noiseScale * 50.0 + time);
        maxValue += amplitude;
        frequency *= u_lacunarity;
        amplitude *= u_persistence;
    }

    return value / maxValue; // Normalize to 0-1
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

float sampleLuminance(vec2 uv) {
    float l = 0.0;
    l += getLuminance(texture2D(u_originalImage, uv).rgb) * 0.4;
    l += getLuminance(texture2D(u_originalImage, uv + vec2(0.003, 0.0)).rgb) * 0.15;
    l += getLuminance(texture2D(u_originalImage, uv - vec2(0.003, 0.0)).rgb) * 0.15;
    l += getLuminance(texture2D(u_originalImage, uv + vec2(0.0, 0.003)).rgb) * 0.15;
    l += getLuminance(texture2D(u_originalImage, uv - vec2(0.0, 0.003)).rgb) * 0.15;
    return l;
}

float sampleDepth(vec2 uv) {
    return texture2D(u_depthMap, uv).r;
}

// ============================================
// EDGE DETECTION (Sobel)
// ============================================

vec2 calculateDepthGradient(vec2 uv) {
    vec2 texelSize = 1.0 / u_resolution;
    float scale = 3.0; // Sample distance

    float depthL = sampleDepth(uv + vec2(-scale, 0.0) * texelSize);
    float depthR = sampleDepth(uv + vec2(scale, 0.0) * texelSize);
    float depthU = sampleDepth(uv + vec2(0.0, -scale) * texelSize);
    float depthD = sampleDepth(uv + vec2(0.0, scale) * texelSize);

    float gradX = depthR - depthL;
    float gradY = depthD - depthU;

    return vec2(gradX, gradY);
}

float calculateEdgeMagnitude(vec2 gradient) {
    float mag = length(gradient);
    // Threshold and normalize
    return smoothstep(u_edgeThreshold, u_edgeThreshold + 0.1, mag);
}

// ============================================
// PHASE 2: PARALLAX
// ============================================

vec2 calculateParallaxOffset(vec2 uv) {
    // u_mouse is already normalized 0-1, convert to -1 to 1 range (center = 0,0)
    vec2 mouseNorm = u_mouse * 2.0 - 1.0;

    // Sample depth at current pixel (use uv for initial sample)
    float depth = texture2D(u_depthMap, uv).r;

    // Calculate parallax offset — deeper areas (closer, brighter) move more
    vec2 parallaxOffset = mouseNorm * u_parallaxStrength * depth * u_depthInfluence;

    return parallaxOffset;
}

// ============================================
// PHASE 2: CURSOR DEFORMATION (Physics-based)
// Lines bend like fabric, never disappear
// ============================================

// Returns deformation values via out parameters
void calculateCursorDeformation(
    vec2 uv,
    vec2 cursorUV,
    float lineY,
    float cursorDepth,      // Depth at cursor position (0 = background, 1 = hand)
    float pixelDepth,       // Depth at current pixel (only deform hand pixels)
    out float yOffset,      // Vertical line displacement
    out float xOffset,      // Horizontal flow offset
    out float stretchFactor,// Dash stretching (tension)
    out float spacingMod    // Line spacing modification
) {
    // Initialize outputs
    yOffset = 0.0;
    xOffset = 0.0;
    stretchFactor = 1.0;
    spacingMod = 0.0;

    // Only interact when cursor is over the hand (depth > threshold)
    float handThreshold = 0.08;
    float cursorOnHand = smoothstep(handThreshold, handThreshold + 0.1, cursorDepth);

    // Also check if the current pixel is on the hand
    float pixelOnHand = smoothstep(handThreshold, handThreshold + 0.1, pixelDepth);

    // Early exit if cursor is not on hand OR pixel is not on hand
    if (cursorOnHand < 0.01 || pixelOnHand < 0.01) return;

    // Distance from current position to cursor
    float dist = distance(uv, cursorUV);

    // Early exit for pixels far from cursor
    if (dist > u_cursorRadius) return;

    // Smooth quadratic falloff (1 at cursor, 0 at edge)
    float rawInfluence = 1.0 - smoothstep(0.0, u_cursorRadius, dist);
    float influence = pow(rawInfluence, u_cursorFalloff);

    // Scale by both cursor-on-hand and pixel-on-hand for clean isolation
    influence *= cursorOnHand * pixelOnHand;

    // Direction vectors
    vec2 toCursor = cursorUV - uv;
    vec2 radial = (dist > 0.001) ? normalize(toCursor) : vec2(0.0);
    vec2 tangent = vec2(-radial.y, radial.x); // Perpendicular

    // Normalized distance (0 at cursor, 1 at edge)
    float normDist = dist / u_cursorRadius;

    // ===========================================
    // MODE 0: TANGENTIAL FLOW
    // Lines curve around cursor like water around a rock
    // ===========================================
    if (u_cursorMode < 0.5) {
        // Flow direction based on position relative to cursor
        float flowDir = sign(uv.y - cursorUV.y);
        if (abs(uv.y - cursorUV.y) < 0.01) flowDir = 1.0;

        // Horizontal offset creates curve around cursor (BOOSTED)
        xOffset = tangent.x * influence * u_cursorStrength * 0.08 * flowDir;

        // Vertical bulge for depth illusion (BOOSTED)
        yOffset = influence * u_cursorStrength * 0.05 * (1.0 - normDist);

        // Lines stretch under tension near cursor
        stretchFactor = 1.0 + (influence * u_tensionStrength);
    }
    // ===========================================
    // MODE 1: MAGNETIC BULGE
    // Lines bow outward creating 3D dome illusion
    // ===========================================
    else if (u_cursorMode < 1.5) {
        // Dome shape: maximum at center, zero at edge
        float domeHeight = influence * (1.0 - normDist * normDist);

        // Vertical displacement creates bulge (BOOSTED)
        yOffset = domeHeight * u_cursorStrength * 0.15;

        // Lines compress toward center, expand at edges (BOOSTED)
        spacingMod = -influence * 0.5 * (1.0 - normDist);

        // Tension increases toward center
        stretchFactor = 1.0 + (influence * u_tensionStrength * 1.5);
    }
    // ===========================================
    // MODE 2: CYMATIC RIPPLE
    // Concentric waves emanate from cursor
    // ===========================================
    else {
        // Wave phase based on distance
        float wavePhase = dist * u_waveFrequency * 25.0 - u_time * u_waveSpeed;
        float wave = sin(wavePhase);

        // Wave amplitude falls off with distance
        float waveAmp = wave * influence;

        // Vertical displacement creates visible ripple (BOOSTED)
        yOffset = waveAmp * u_cursorStrength * 0.08;

        // Line spacing oscillates (compression/expansion) (BOOSTED)
        spacingMod = waveAmp * 0.4;

        // Stretch at wave peaks
        stretchFactor = 1.0 + (abs(waveAmp) * u_tensionStrength * 0.8);
    }
}

// ============================================
// SCANLINE RENDERING (Enhanced + Deformation)
// ============================================

float renderScanlines(vec2 uv, vec2 texUV, vec2 cursorUV) {
    float result = 0.0;

    // Sample luminance (or use 0.5 if disabled)
    float rawLuminance = u_useLuminance > 0.5 ? sampleLuminance(texUV) : 0.5;
    float luminance = pow(rawLuminance, u_amplitudeGamma);

    // Sample depth (or use 0.5 if disabled)
    float depth = u_useDepth > 0.5 ? sampleDepth(texUV) : 0.5;
    float handMask = u_useDepth > 0.5 ? smoothstep(0.02, 0.15, depth) : 1.0;

    // Calculate edge enhancement (only if depth enabled)
    vec2 depthGradient = u_useDepth > 0.5 ? calculateDepthGradient(texUV) : vec2(0.0);
    float edgeMagnitude = calculateEdgeMagnitude(depthGradient);
    float edgeBoost = 1.0 + (edgeMagnitude * u_edgeMultiplier);

    // Base amplitude (hand vs background)
    float baseAmplitude = mix(u_bgAmplitude, u_amplitude, handMask);

    // Base line spacing
    float baseLineSpacing = 1.0 / u_lineCount;

    // ========================================
    // CURSOR DEFORMATION
    // ========================================
    // Sample depth at cursor position AND current pixel to limit interaction to hand only
    float cursorDepth = texture2D(u_depthMap, cursorUV).r;
    float pixelDepth = texture2D(u_depthMap, texUV).r;

    float cursorYOffset, cursorXOffset, stretchFactor, spacingMod;
    calculateCursorDeformation(
        texUV,
        cursorUV,
        uv.y,
        cursorDepth,
        pixelDepth,
        cursorYOffset,
        cursorXOffset,
        stretchFactor,
        spacingMod
    );

    // Apply spacing modification from cursor
    float lineSpacing = baseLineSpacing * (1.0 + spacingMod);

    // Find which scanline we're near
    float rawY = uv.y;

    // Vertical micro-displacement (depth gradient + cursor deformation)
    float verticalOffset = depthGradient.y * u_verticalScale + cursorYOffset;
    float adjustedY = rawY + verticalOffset;

    float scanlineY = floor(adjustedY / lineSpacing) * lineSpacing + lineSpacing * 0.5;
    float distToLine = abs(adjustedY - scanlineY);

    // Time-based animation
    float timeOffset = u_time * u_noiseSpeed;

    // FBM noise for complex, organic displacement
    float noiseVal = fbm(scanlineY, timeOffset);
    noiseVal = (noiseVal - 0.5) * 2.0; // Center around 0

    // Sample at scanline Y for consistent amplitude (respects toggles)
    vec2 scanlineTexUV = vec2(texUV.x, scanlineY);
    float scanlineLum = u_useLuminance > 0.5 ? pow(sampleLuminance(scanlineTexUV), u_amplitudeGamma) : 0.5;
    float scanlineHandMask = u_useDepth > 0.5 ? smoothstep(0.02, 0.15, sampleDepth(scanlineTexUV)) : 1.0;

    // Edge boost at scanline position (respects depth toggle)
    vec2 scanlineGradient = u_useDepth > 0.5 ? calculateDepthGradient(scanlineTexUV) : vec2(0.0);
    float scanlineEdge = calculateEdgeMagnitude(scanlineGradient);
    float scanlineEdgeBoost = 1.0 + (scanlineEdge * u_edgeMultiplier);

    float scanlineAmp = mix(u_bgAmplitude, u_amplitude, scanlineHandMask);
    scanlineAmp *= scanlineLum * scanlineEdgeBoost;

    // Horizontal displacement: FBM + cursor tangential flow
    float fbmDisplacement = noiseVal * scanlineAmp * 0.15;
    float totalDisplacement = fbmDisplacement + cursorXOffset;
    float displacedX = uv.x + totalDisplacement;

    // ========================================
    // TENSION: Stretch dashes near cursor
    // ========================================
    float stretchedDashWidth = u_dashWidth * stretchFactor;
    float stretchedDashDensity = u_dashDensity / stretchFactor;

    // Dash segmentation with tension
    float dashPhase = fract(displacedX / stretchedDashWidth);
    float dutyCycle = mix(0.2, stretchedDashDensity, scanlineLum);
    float isDash = step(dashPhase, dutyCycle);

    // Variable line thickness (thick highlights, thin shadows)
    float thicknessMultiplier = 1.0 + (scanlineLum * u_thicknessRange);
    float dynamicThickness = u_lineThickness * thicknessMultiplier;

    // Line rendering with anti-aliasing
    float aaWidth = lineSpacing * 0.12 * dynamicThickness;
    float lineIntensity = 1.0 - smoothstep(0.0, aaWidth, distToLine);

    // Combine line and dash
    result = lineIntensity * isDash;

    // Intensity modulation
    result *= mix(0.2, 1.0, scanlineLum);

    return result;
}

// ============================================
// BLOOM EFFECT
// ============================================

float calculateBloom(vec2 texUV) {
    float bloom = 0.0;

    float weights[9];
    weights[0] = 0.0625; weights[1] = 0.125; weights[2] = 0.0625;
    weights[3] = 0.125;  weights[4] = 0.25;  weights[5] = 0.125;
    weights[6] = 0.0625; weights[7] = 0.125; weights[8] = 0.0625;

    float radius = u_bloomRadius * 0.015;

    int idx = 0;
    for (float y = -1.0; y <= 1.0; y += 1.0) {
        for (float x = -1.0; x <= 1.0; x += 1.0) {
            vec2 offset = vec2(x, y) * radius;
            float lum = sampleLuminance(texUV + offset);
            lum = pow(lum, u_contrast);
            float thresholded = max(0.0, lum - 0.3) * 1.5;
            bloom += thresholded * weights[idx];
            idx++;
        }
    }

    // Far bloom
    float farBloom = 0.0;
    float farRadius = u_bloomRadius * 0.04;

    for (float y = -2.0; y <= 2.0; y += 2.0) {
        for (float x = -2.0; x <= 2.0; x += 2.0) {
            vec2 offset = vec2(x, y) * farRadius;
            float lum = sampleLuminance(texUV + offset);
            lum = pow(lum, u_contrast);
            float thresholded = max(0.0, lum - 0.4) * 1.2;
            float weight = 1.0 / (1.0 + length(vec2(x, y)) * 0.5);
            farBloom += thresholded * weight;
        }
    }
    farBloom /= 5.0;

    return (bloom * 0.6 + farBloom * 0.4) * u_bloomStrength;
}

// ============================================
// MAIN
// ============================================

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 texUV = vec2(1.0 - uv.x, uv.y);

    // ========================================
    // DEBUG MODES - Show raw textures
    // ========================================
    if (u_debugMode > 0.5 && u_debugMode < 1.5) {
        // Mode 1: Show depth map
        float depth = texture2D(u_depthMap, texUV).r;
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }
    if (u_debugMode > 1.5 && u_debugMode < 2.5) {
        // Mode 2: Show luminance (original image)
        float lum = getLuminance(texture2D(u_originalImage, texUV).rgb);
        gl_FragColor = vec4(vec3(lum), 1.0);
        return;
    }

    // ========================================
    // NORMAL RENDERING
    // ========================================

    // Phase 2: Calculate parallax offset from mouse position
    vec2 parallaxOffset = vec2(0.0);
    if (u_useDepth > 0.5) {
        parallaxOffset = calculateParallaxOffset(texUV);
    }

    // Apply parallax to texture UV
    texUV = texUV - parallaxOffset;
    texUV = clamp(texUV, 0.001, 0.999);

    // Phase 2: Cursor UV - u_mouse is already normalized 0-1, flip x to match texture space
    vec2 cursorUV = vec2(1.0 - u_mouse.x, u_mouse.y);

    // Render scanlines with cursor deformation
    float scanlines = renderScanlines(uv, texUV, cursorUV);

    // Calculate bloom only if enabled (disable to remove ghost image)
    float bloom = 0.0;
    if (u_useBloom > 0.5 && u_useLuminance > 0.5) {
        bloom = calculateBloom(texUV);
    }

    // Blend
    float finalIntensity = scanlines + bloom * (1.0 - scanlines * 0.5);

    // CRT vignette
    float vignetteX = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x);
    float vignetteY = smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);
    float vignette = vignetteX * vignetteY;
    finalIntensity *= mix(0.6, 1.0, vignette);

    finalIntensity = clamp(finalIntensity, 0.0, 1.0);

    gl_FragColor = vec4(vec3(finalIntensity), 1.0);
}
