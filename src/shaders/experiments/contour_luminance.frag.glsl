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

// Phase 3: LASERROPE system (max 7 ropes)
uniform float u_hoverTime;
uniform float u_laseropeCount;
uniform float u_laseropeData[70];   // 7 ropes * 10 floats each (p0.xy, p1.xy, p2.xy, extension, glow, wrapAngle, wrapDir)

// LASERROPE structure parameters
uniform float u_ropeDashFrequency;  // 12.0 - dash pattern in base section
uniform float u_ropeGlowRadius;     // 0.006 - glow extent (3x core)
uniform float u_ropeGlowIntensity;  // 0.15 - subtle line glow
uniform float u_ropeThickness;      // 0.002 - core beam width
uniform float u_ropeTipFadeStart;   // 0.85 - where tip begins fading

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
// PHASE 3: LASERROPE RENDERING
// 3-segment structure: Base (dashed), Body (solid+glow), Tip (fading)
// ============================================

// Quadratic Bezier curve evaluation
vec2 quadBezier(vec2 p0, vec2 p1, vec2 p2, float t) {
    float omt = 1.0 - t;
    return omt * omt * p0 + 2.0 * omt * t * p1 + t * t * p2;
}

// Find closest point on Bezier and return both distance AND parametric t
// Returns: x = distance, y = parametric t (0-1 along visible portion)
vec2 bezierClosestPoint(vec2 p, vec2 p0, vec2 p1, vec2 p2, float extension) {
    float minDist = 1000.0;
    float closestT = 0.0;
    const int SAMPLES = 32;  // Higher sampling for accuracy

    for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES - 1) * extension;
        vec2 bezierPoint = quadBezier(p0, p1, p2, t);
        float dist = distance(p, bezierPoint);
        if (dist < minDist) {
            minDist = dist;
            closestT = t;
        }
    }

    // Normalize t to 0-1 based on extension
    float normalizedT = (extension > 0.01) ? closestT / extension : 0.0;
    return vec2(minDist, normalizedT);
}

// Render a single LINKTRACE line - matches oscilloscope aesthetic
// Luminance-based: brighter spawn = thicker, longer, stronger glow
float renderLaserrope(vec2 uv, vec2 p0, vec2 p1, vec2 p2, float extension, float thickness) {
    if (extension < 0.01) return 0.0;

    // Get distance and parametric position
    vec2 closest = bezierClosestPoint(uv, p0, p1, p2, extension);
    float dist = closest.x;
    float t = closest.y;  // 0 at origin, 1 at tip

    // Early exit if too far from line
    if (dist > 0.03) return 0.0;

    // ========================================
    // LUMINANCE-BASED SCALING
    // Brighter spawn = thicker line, stronger presence
    // ========================================
    float spawnLuminance = getLuminance(texture2D(u_originalImage, p0).rgb);
    float luminanceOpacity = 0.3 + spawnLuminance * 0.7;

    // Scale thickness by luminance - bright areas get thicker lines
    float lumThicknessBoost = 1.0 + spawnLuminance * 1.5; // 1.0-2.5x
    float finalThickness = thickness * lumThicknessBoost;

    // ========================================
    // DASH PATTERN - Long, boxy segments (oscilloscope style)
    // Brighter = longer dashes (less gaps)
    // ========================================
    float dashGap = 0.25 - spawnLuminance * 0.15; // 0.25-0.10 gap based on luminance
    float dashPattern = step(dashGap, fract(t * u_ropeDashFrequency * 0.5));

    // ========================================
    // TIP FADE - Soft termination
    // ========================================
    float tipFade = 1.0 - smoothstep(u_ropeTipFadeStart, 1.0, t);

    // ========================================
    // CORE LINE - Thickness varies with luminance
    // ========================================
    float coreWidth = 0.001 * finalThickness;
    float core = smoothstep(coreWidth, coreWidth * 0.4, dist);

    // ========================================
    // GLOW - Stronger for high luminance lines
    // ========================================
    float glowRadius = coreWidth * 3.0;
    float glow = exp(-dist * dist / (glowRadius * glowRadius)) * 0.2 * spawnLuminance;

    // Combine: core + glow, with dash pattern, tip fade, and luminance opacity
    float result = (core + glow) * dashPattern * tipFade * luminanceOpacity;

    return result;
}

// Render snap dissolve effect - box outlines along rope that flicker out
// Creates a "disintegrating" visual as the rope snaps back
float renderSnapDissolve(vec2 uv, vec2 p0, vec2 p1, vec2 p2, float snapProgress, float extension) {
    if (snapProgress < 0.01 || extension < 0.01) return 0.0;

    float result = 0.0;

    // Spawn boxes along the rope path
    const int NUM_BOXES = 12;

    for (int i = 0; i < NUM_BOXES; i++) {
        float fi = float(i);

        // Hash for this box - stable per-frame
        float h1 = fract(sin(fi * 127.1) * 43758.5);
        float h2 = fract(sin(fi * 269.5) * 18273.3);
        float h3 = fract(sin(fi * 419.2) * 29471.7);
        float h4 = fract(sin(fi * 631.4) * 51927.1);
        float h5 = fract(sin(fi * 853.7) * 37159.3);
        float h6 = fract(sin(fi * 967.3) * 62841.9);

        // Position along rope (0-1)
        float t = h1 * extension;

        // Get point on bezier curve
        float omt = 1.0 - t;
        vec2 boxCenter = omt * omt * p0 + 2.0 * omt * t * p1 + t * t * p2;

        // Add some offset perpendicular to rope
        vec2 tangent = normalize(2.0 * (1.0 - t) * (p1 - p0) + 2.0 * t * (p2 - p1));
        vec2 normal = vec2(-tangent.y, tangent.x);
        float offsetDist = (h2 - 0.5) * 0.015;
        boxCenter += normal * offsetDist;

        // Box size variation (smaller boxes)
        float boxSize = 0.002 + h3 * 0.004;
        float lineWidth = 0.0006;

        // Rotation angle
        float angle = h4 * 3.14159 * 2.0;

        // Rotate UV around box center
        vec2 delta = uv - boxCenter;
        float cosA = cos(angle);
        float sinA = sin(angle);
        vec2 rotated = vec2(
            delta.x * cosA - delta.y * sinA,
            delta.x * sinA + delta.y * cosA
        );

        // Staggered fade - boxes disappear at different times
        float fadeDelay = h5 * 0.6;
        float fadeProgress = clamp((snapProgress - fadeDelay) / (1.0 - fadeDelay), 0.0, 1.0);

        // Flicker effect - random opacity pulsing
        float flicker = 0.5 + 0.5 * sin(u_time * 30.0 + h6 * 20.0);
        float flickerIntensity = mix(1.0, flicker, fadeProgress * 0.7);

        // Final opacity - fade out with flicker
        float opacity = (1.0 - fadeProgress) * flickerIntensity;

        if (opacity < 0.05) continue;

        // Box outline rendering
        float dx = abs(rotated.x);
        float dy = abs(rotated.y);

        float onVerticalEdge = step(dx, boxSize) * step(boxSize - lineWidth, dx) * step(dy, boxSize);
        float onHorizontalEdge = step(dy, boxSize) * step(boxSize - lineWidth, dy) * step(dx, boxSize);
        float outline = max(onVerticalEdge, onHorizontalEdge);

        result += outline * opacity * 0.8;
    }

    return clamp(result, 0.0, 1.0);
}

// Render flickering box outlines along ring circumference (replaces solid ring)
// Thinner, higher quantity, with bloom
float renderGlitchWrap(vec2 uv, vec2 contactPoint, vec2 cursorCenter, float wrapAngle, float wrapDir, float aspectRatio) {
    if (wrapAngle < 0.01) return 0.0;

    float result = 0.0;
    float boundingRadius = 0.027;

    // Higher quantity - 12 boxes along ring circumference
    for (int b = 0; b < 12; b++) {
        float fb = float(b);

        // Stable seed that changes slowly
        float timeSeed = floor(u_time * 4.0 + fb * 0.5);
        float h1 = fract(sin(fb * 127.1 + timeSeed) * 43758.5);
        float h2 = fract(sin(fb * 269.5 + timeSeed) * 18273.3);
        float h3 = fract(sin(fb * 419.2) * 29471.7); // Static for position

        // Only show box based on wrap progress
        if (h1 > wrapAngle * 1.2 + 0.1) continue;

        // Position ON the ring circumference - perfect circle, evenly spaced
        float angle = fb * 6.28318 / 12.0; // Even distribution, no variation

        // Boxes sit on the ring edge - aspect ratio corrected for perfect circle
        vec2 boxCenter = cursorCenter + vec2(
            cos(angle) * boundingRadius / aspectRatio,  // Compress X by aspect ratio
            sin(angle) * boundingRadius
        );

        // Thinner, smaller boxes
        float boxSize = 0.002 + h2 * 0.002;
        float lineWidth = 0.0004; // Thinner lines

        // Rotation aligned to ring tangent + slight variation
        float rotation = angle + 1.5708 + (h1 - 0.5) * 0.5;

        // Rotate UV around box center
        vec2 delta = uv - boxCenter;
        float cosA = cos(rotation);
        float sinA = sin(rotation);
        vec2 rotated = vec2(
            delta.x * cosA - delta.y * sinA,
            delta.x * sinA + delta.y * cosA
        );

        // Flickering
        float flickerPhase = u_time * (10.0 + fb * 2.0) + fb * 1.5;
        float flicker = step(0.35, fract(sin(flickerPhase) * 43758.5));

        // Opacity based on wrap angle
        float opacity = wrapAngle * 0.7 * flicker;

        if (opacity < 0.05) continue;

        // Box outline rendering
        float dx = abs(rotated.x);
        float dy = abs(rotated.y);

        float onVerticalEdge = step(dx, boxSize) * step(boxSize - lineWidth, dx) * step(dy, boxSize);
        float onHorizontalEdge = step(dy, boxSize) * step(boxSize - lineWidth, dy) * step(dx, boxSize);
        float outline = max(onVerticalEdge, onHorizontalEdge);

        // Add bloom/glow around box
        float glowDist = max(dx, dy);
        float glow = exp(-glowDist * glowDist / (boxSize * boxSize * 4.0)) * 0.3;

        result += (outline + glow) * opacity;
    }

    return clamp(result, 0.0, 1.0);
}

// Render ignition spark with blocky squares expanding outward
// Stronger effect for brighter spawn areas
float renderIgnitionGlow(vec2 uv, vec2 origin, float intensity) {
    if (intensity < 0.01) return 0.0;

    vec2 delta = uv - origin;
    float dist = length(delta);

    // Sample luminance at origin for scaling
    float originLuminance = getLuminance(texture2D(u_originalImage, origin).rgb);
    float lumBoost = 1.0 + originLuminance * 1.5; // 1.0-2.5x based on brightness

    // Ease-in burst
    float burstT = intensity * intensity * intensity; // Cubic for snappier start

    // Stable seed - only changes when a new ignition starts (not every frame)
    float seed = floor(intensity * 100.0);

    float result = 0.0;

    // Square parameters - scale with luminance
    float baseSquareSize = 0.004 * lumBoost;
    float lineWidth = 0.0008 * lumBoost;

    // More squares for brighter areas
    int numSquares = 6 + int(originLuminance * 6.0); // 6-12 squares

    // Multiple squares expanding outward
    for (int i = 0; i < 12; i++) {
        if (i >= numSquares) break;
        float fi = float(i);

        // Hash for this square - stable per ignition
        float h1 = fract(sin(fi * 127.1 + seed) * 43758.5);
        float h2 = fract(sin(fi * 269.5 + seed) * 18273.3);
        float h3 = fract(sin(fi * 419.2 + seed) * 29471.7);
        float h4 = fract(sin(fi * 631.4 + seed) * 51927.1);
        float h5 = fract(sin(fi * 853.7 + seed) * 37159.3);

        // Staggered spawn timing - squares appear at different times
        float spawnDelay = h1 * 0.6;
        float t = clamp((burstT - spawnDelay) * 2.5, 0.0, 1.0);
        if (t < 0.01) continue;

        // Position - expand outward from origin
        float angle = h2 * 6.28318;
        float expandDist = (0.01 + h3 * 0.025) * t; // Squares move outward over time
        vec2 squareCenter = origin + vec2(cos(angle), sin(angle)) * expandDist;

        // Variable square size
        float squareSize = baseSquareSize * (0.6 + h4 * 0.8);

        // Opacity fades as square expands outward
        float fadeOut = 1.0 - t * 0.7;

        // Vector to square center
        vec2 toSq = uv - squareCenter;

        // Square outline - all 4 edges
        float dx = abs(toSq.x);
        float dy = abs(toSq.y);

        // Check if on any edge of the square outline
        float onVerticalEdge = step(dx, squareSize) * step(squareSize - lineWidth, dx) * step(dy, squareSize);
        float onHorizontalEdge = step(dy, squareSize) * step(squareSize - lineWidth, dy) * step(dx, squareSize);
        float outline = max(onVerticalEdge, onHorizontalEdge);

        // Variable opacity per square
        float squareOpacity = 0.7 + h5 * 0.3;

        result += outline * fadeOut * squareOpacity;
    }

    // Center dot (tiny filled square)
    float coreDist = max(abs(delta.x), abs(delta.y));
    float core = step(coreDist, 0.002);

    return clamp(core + result, 0.0, 1.0) * intensity;
}

// Render all active laserropes (max 7)
float renderLaserropes(vec2 uv, vec2 cursorCenter, float aspectRatio) {
    float result = 0.0;
    int count = int(u_laseropeCount);

    // WebGL 1.0 requires constant loop bounds - now only 7
    for (int i = 0; i < 7; i++) {
        if (i >= count) break;

        vec2 p0, p1, p2;
        float ext, ignitionGlow, wrapAngle, wrapDir;

        // Manual unpacking for WebGL 1.0 compatibility (7 ropes)
        // Data layout: p0.xy, p1.xy, p2.xy, extension, ignitionGlow, wrapAngle, wrapDir
        if (i == 0) {
            p0 = vec2(u_laseropeData[0], u_laseropeData[1]);
            p1 = vec2(u_laseropeData[2], u_laseropeData[3]);
            p2 = vec2(u_laseropeData[4], u_laseropeData[5]);
            ext = u_laseropeData[6];
            ignitionGlow = u_laseropeData[7];
            wrapAngle = u_laseropeData[8];
            wrapDir = u_laseropeData[9];
        } else if (i == 1) {
            p0 = vec2(u_laseropeData[10], u_laseropeData[11]);
            p1 = vec2(u_laseropeData[12], u_laseropeData[13]);
            p2 = vec2(u_laseropeData[14], u_laseropeData[15]);
            ext = u_laseropeData[16];
            ignitionGlow = u_laseropeData[17];
            wrapAngle = u_laseropeData[18];
            wrapDir = u_laseropeData[19];
        } else if (i == 2) {
            p0 = vec2(u_laseropeData[20], u_laseropeData[21]);
            p1 = vec2(u_laseropeData[22], u_laseropeData[23]);
            p2 = vec2(u_laseropeData[24], u_laseropeData[25]);
            ext = u_laseropeData[26];
            ignitionGlow = u_laseropeData[27];
            wrapAngle = u_laseropeData[28];
            wrapDir = u_laseropeData[29];
        } else if (i == 3) {
            p0 = vec2(u_laseropeData[30], u_laseropeData[31]);
            p1 = vec2(u_laseropeData[32], u_laseropeData[33]);
            p2 = vec2(u_laseropeData[34], u_laseropeData[35]);
            ext = u_laseropeData[36];
            ignitionGlow = u_laseropeData[37];
            wrapAngle = u_laseropeData[38];
            wrapDir = u_laseropeData[39];
        } else if (i == 4) {
            p0 = vec2(u_laseropeData[40], u_laseropeData[41]);
            p1 = vec2(u_laseropeData[42], u_laseropeData[43]);
            p2 = vec2(u_laseropeData[44], u_laseropeData[45]);
            ext = u_laseropeData[46];
            ignitionGlow = u_laseropeData[47];
            wrapAngle = u_laseropeData[48];
            wrapDir = u_laseropeData[49];
        } else if (i == 5) {
            p0 = vec2(u_laseropeData[50], u_laseropeData[51]);
            p1 = vec2(u_laseropeData[52], u_laseropeData[53]);
            p2 = vec2(u_laseropeData[54], u_laseropeData[55]);
            ext = u_laseropeData[56];
            ignitionGlow = u_laseropeData[57];
            wrapAngle = u_laseropeData[58];
            wrapDir = u_laseropeData[59];
        } else {
            p0 = vec2(u_laseropeData[60], u_laseropeData[61]);
            p1 = vec2(u_laseropeData[62], u_laseropeData[63]);
            p2 = vec2(u_laseropeData[64], u_laseropeData[65]);
            ext = u_laseropeData[66];
            ignitionGlow = u_laseropeData[67];
            wrapAngle = u_laseropeData[68];
            wrapDir = u_laseropeData[69];
        }

        // Slot 7 dual purpose:
        // - During ignition: ignitionGlow (0-1) for blocky squares at origin
        // - During snapping: snapProgress (0-1, negative to distinguish) for dissolve effect
        if (ignitionGlow > 0.01) {
            // Positive = ignition glow
            result += renderIgnitionGlow(uv, p0, ignitionGlow);
        } else if (ignitionGlow < -0.01) {
            // Negative = snap dissolve (abs value is progress 0-1)
            float snapProgress = -ignitionGlow;
            float dissolve = renderSnapDissolve(uv, p0, p1, p2, snapProgress, ext);
            // Exclusion blend mode: result + blend - 2 * result * blend
            result = result + dissolve - 2.0 * result * dissolve;
        }

        // Render beam (during extension/holding phase)
        result += renderLaserrope(uv, p0, p1, p2, ext, 1.0);

        // Render glitch wrap effect when touching cursor ring
        if (wrapAngle > 0.01) {
            result += renderGlitchWrap(uv, p2, cursorCenter, wrapAngle, wrapDir, aspectRatio);
        }
    }

    // Additive blending allows overlaps to brighten
    return clamp(result, 0.0, 1.0);
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

    // Phase 3: Render laserropes (pass cursor center and aspect ratio for perfect circles)
    // Offset cursor center slightly right (+x) and down (-y) to better align ring with cursor
    vec2 cursorCenter = vec2(1.0 - u_mouse.x + 0.001, u_mouse.y - 0.001); // Flip X + offset
    float aspectRatio = u_resolution.x / u_resolution.y;
    float laserropes = renderLaserropes(texUV, cursorCenter, aspectRatio);

    // Blend: scanlines + bloom + laserropes (additive)
    float finalIntensity = scanlines + bloom * (1.0 - scanlines * 0.5) + laserropes;

    // CRT vignette
    float vignetteX = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x);
    float vignetteY = smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);
    float vignette = vignetteX * vignetteY;
    finalIntensity *= mix(0.6, 1.0, vignette);

    finalIntensity = clamp(finalIntensity, 0.0, 1.0);

    gl_FragColor = vec4(vec3(finalIntensity), 1.0);
}
