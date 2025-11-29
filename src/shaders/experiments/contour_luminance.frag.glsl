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

// Phase 2: Cursor interaction parameters
uniform float u_cursorRadius;       // 0.05-0.4
uniform float u_cursorStrength;     // 0.0-2.0
uniform float u_cursorFalloff;      // 0.5-3.0
uniform float u_cursorMode;         // 0=Push, 1=Pull, 2=Swirl

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
// PHASE 2: CURSOR INTERACTION
// ============================================

float calculateCursorDisplacement(vec2 uv, vec2 cursorUV) {
    // Distance from current pixel to cursor
    float dist = distance(uv, cursorUV);

    // Early exit for pixels far from cursor
    if (dist > u_cursorRadius) return 0.0;

    // Calculate falloff (1 at cursor, 0 at radius edge)
    float influence = 1.0 - smoothstep(0.0, u_cursorRadius, dist);
    influence = pow(influence, u_cursorFalloff);

    // Direction from cursor to pixel
    vec2 direction = vec2(0.0);
    if (dist > 0.001) {
        direction = normalize(uv - cursorUV);
    }

    // Calculate displacement based on mode
    float cursorDisp = 0.0;

    if (u_cursorMode < 0.5) {
        // Mode 0: PUSH - lines away from cursor
        cursorDisp = direction.x * influence * u_cursorStrength;
    } else if (u_cursorMode < 1.5) {
        // Mode 1: PULL - lines toward cursor
        cursorDisp = -direction.x * influence * u_cursorStrength;
    } else {
        // Mode 2: SWIRL - rotational displacement
        vec2 perpendicular = vec2(-direction.y, direction.x);
        cursorDisp = perpendicular.x * influence * u_cursorStrength;
    }

    return cursorDisp;
}

// ============================================
// SCANLINE RENDERING (Enhanced + Phase 2)
// ============================================

float renderScanlines(vec2 uv, vec2 texUV, float cursorDisp) {
    float result = 0.0;

    // Sample luminance and apply exponential mapping
    float rawLuminance = sampleLuminance(texUV);
    float luminance = pow(rawLuminance, u_amplitudeGamma); // Dramatic highlights

    // Sample depth
    float depth = sampleDepth(texUV);
    float handMask = smoothstep(0.02, 0.15, depth);

    // Calculate edge enhancement
    vec2 depthGradient = calculateDepthGradient(texUV);
    float edgeMagnitude = calculateEdgeMagnitude(depthGradient);
    float edgeBoost = 1.0 + (edgeMagnitude * u_edgeMultiplier);

    // Base amplitude (hand vs background)
    float baseAmplitude = mix(u_bgAmplitude, u_amplitude, handMask);

    // Final amplitude: luminance + edge boost
    float finalAmplitude = baseAmplitude * luminance * edgeBoost;

    // Line spacing
    float lineSpacing = 1.0 / u_lineCount;

    // Find which scanline we're near
    float rawY = uv.y;

    // Vertical micro-displacement (lines wrap around form)
    float verticalOffset = depthGradient.y * u_verticalScale;
    float adjustedY = rawY + verticalOffset;

    float scanlineY = floor(adjustedY / lineSpacing) * lineSpacing + lineSpacing * 0.5;
    float distToLine = abs(adjustedY - scanlineY);

    // Time-based animation
    float timeOffset = u_time * u_noiseSpeed;

    // FBM noise for complex, organic displacement
    float noiseVal = fbm(scanlineY, timeOffset);
    noiseVal = (noiseVal - 0.5) * 2.0; // Center around 0

    // Sample at scanline Y for consistent amplitude
    vec2 scanlineTexUV = vec2(texUV.x, scanlineY);
    float scanlineLum = pow(sampleLuminance(scanlineTexUV), u_amplitudeGamma);
    float scanlineHandMask = smoothstep(0.02, 0.15, sampleDepth(scanlineTexUV));

    // Edge boost at scanline position
    vec2 scanlineGradient = calculateDepthGradient(scanlineTexUV);
    float scanlineEdge = calculateEdgeMagnitude(scanlineGradient);
    float scanlineEdgeBoost = 1.0 + (scanlineEdge * u_edgeMultiplier);

    float scanlineAmp = mix(u_bgAmplitude, u_amplitude, scanlineHandMask);
    scanlineAmp *= scanlineLum * scanlineEdgeBoost;

    // Horizontal displacement: FBM + cursor interaction
    float fbmDisplacement = noiseVal * scanlineAmp * 0.15;
    float totalDisplacement = fbmDisplacement + cursorDisp;
    float displacedX = uv.x + totalDisplacement;

    // Dash segmentation
    float dashPhase = fract(displacedX / u_dashWidth);
    float dutyCycle = mix(0.2, u_dashDensity, scanlineLum);
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

    // Phase 2: Calculate parallax offset from mouse position
    vec2 parallaxOffset = calculateParallaxOffset(vec2(1.0 - uv.x, uv.y));

    // Apply parallax to texture UV (inverted for natural feel)
    vec2 texUV = vec2(1.0 - uv.x, uv.y) - parallaxOffset;

    // Clamp to prevent sampling outside texture
    texUV = clamp(texUV, 0.001, 0.999);

    // Phase 2: Cursor UV - u_mouse is already normalized 0-1, flip x to match texture space
    vec2 cursorUV = vec2(1.0 - u_mouse.x, u_mouse.y);

    // Calculate cursor displacement for this pixel
    float cursorDisp = calculateCursorDisplacement(texUV, cursorUV);

    // Render scanlines with cursor displacement
    float scanlines = renderScanlines(uv, texUV, cursorDisp);

    // Calculate bloom (uses parallax-adjusted UV)
    float bloom = calculateBloom(texUV);

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
