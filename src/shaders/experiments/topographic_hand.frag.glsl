precision highp float;

/**
 * V18 - Topographic Hand
 * VERSION: 3.1.0 - Clean Build
 *
 * Depth-map based hand visualization with toggleable layers.
 *
 * LAYERS:
 * 1. Contour lines - Topographic elevation lines with edge threshold
 * 2. Scanlines - Joy Division style, scrolling, with edge dithering
 * 3. Stipple texture - Organic grain overlay
 *
 * KEY TECHNIQUES:
 * - dFdx/dFdy screen-space derivatives for edge detection
 * - fwidth() for consistent line widths across depth
 * - Hash-based dithering for organic fragmentation
 * - Depth cutoffs prevent silhouette artifacts
 *
 * DEBUG MODE: Press D to see RGB layer isolation
 * - RED = Contours, GREEN = Scanlines, BLUE = Stipple
 */

// ============================================
// UNIFORMS
// ============================================

// Global
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_depthMap;

// Layer toggles
uniform bool u_showContours;
uniform bool u_showStipple;
uniform bool u_showDissolution;
uniform bool u_debugMode; // Show raw depth map for debugging

// Contour layer
uniform float u_contour_interval;    // 0.05 default
uniform float u_contour_thickness;   // 1.5 default
uniform float u_contour_alpha;       // 0.8 default

// Scanline layer (Joy Division style)
uniform bool u_showScanlines;
uniform float u_scanline_count;      // Number of horizontal lines
uniform float u_scanline_displacement; // How much depth displaces the lines
uniform float u_scanline_thickness;  // Line thickness
uniform float u_scanline_scrollSpeed;  // Controls upward scroll rate

// Stipple layer
uniform float u_stipple_scale;       // 50.0 default
uniform float u_stipple_threshold;   // 0.5 default
uniform float u_stipple_alpha;       // 0.4 default

// Dissolution layer
uniform float u_dissolve_progress;   // 0.0-1.0
uniform float u_dissolve_noiseScale; // 3.0 default
uniform float u_dissolve_edgeWidth;  // 0.1 default
uniform vec3 u_dissolve_edgeColor;   // Blue accent

// Reaction-Diffusion layer
uniform bool u_showReactionDiffusion;
uniform float u_rd_feedRate;         // f: 0.01-0.1 (controls pattern type)
uniform float u_rd_killRate;         // k: 0.045-0.07 (controls pattern type)
uniform float u_rd_diffusionA;       // dA: 0.5-1.0
uniform float u_rd_diffusionB;       // dB: 0.1-0.5
uniform float u_rd_speed;            // Animation speed
uniform float u_rd_scale;            // Pattern scale

// Ridgeline layer (Joy Division / Unknown Pleasures style)
uniform bool u_showRidgeline;
uniform float u_ridge_count;         // Number of horizontal lines (20-200)
uniform float u_ridge_amplitude;     // How much depth displaces lines (0-2)
uniform float u_ridge_thickness;     // Line thickness (0.5-5)
uniform float u_ridge_glow;          // Edge glow intensity (0-3)
uniform float u_ridge_speed;         // Animation speed (0-1)
uniform float u_ridge_sharpness;     // Peak sharpness (1-10)
uniform float u_ridge_fillStyle;     // Fill style: 0=black, 0.5=gradient, 1=depth-tinted
uniform float u_ridge_waveFreq;      // Wave frequency along X axis

// Layer Z-Index system (Photoshop-like stacking)
// Lower values = behind, Higher values = in front
uniform float u_zindex_contours;     // Default: 1
uniform float u_zindex_scanlines;    // Default: 2
uniform float u_zindex_stipple;      // Default: 3
uniform float u_zindex_rd;           // Default: 4 (Reaction-Diffusion)
uniform float u_zindex_ridgeline;    // Default: 0 (base layer)

// ============================================
// NOISE FUNCTIONS
// ============================================

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
    return vec2(hash(p), hash(p + vec2(37.0, 17.0)));
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

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

// ============================================
// PERLIN 3D NOISE (for dissolution)
// ============================================

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float perlin3d(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// ============================================
// CONTOUR LINE CALCULATION
// ============================================

float calculateContour(vec2 uv, float height, float handMask, float interval, float thickness, float time) {
    // Normalize height to intervals
    float heightStep = height / interval;

    // Screen-space derivative for consistent line width
    float df = fwidth(heightStep);

    // CRITICAL FIX: If derivative is too high, we're at a silhouette edge
    // Don't draw contours there - this causes the thick white outline
    if (df > 0.8) return 0.0;

    // Also skip if depth is too low (near background)
    if (height < 0.12) return 0.0;

    // Get fractional part (creates repeating 0-1 pattern at each interval)
    float f = fract(heightStep);

    // Anti-aliased edge detection (both sides of line band)
    float line = smoothstep(df * 0.5, df * (0.5 + thickness), f);
    line *= smoothstep(df * (1.5 - thickness), df * 1.5, f);

    // Invert: 1.0 = line, 0.0 = no line
    line = 1.0 - line;

    // Fade based on derivative (softer contours where depth changes quickly)
    float dfFade = 1.0 - smoothstep(0.3, 0.8, df);
    line *= dfFade;

    return line;
}

// ============================================
// STIPPLE PATTERN
// ============================================

float stipple(vec2 uv, float density, float dotDensity) {
    vec2 cell = floor(uv * dotDensity);
    vec2 cellUV = fract(uv * dotDensity);

    float cellHash = hash(cell);
    vec2 dotPos = vec2(0.5) + (hash2(cell) - 0.5) * 0.6;
    float d = length(cellUV - dotPos);

    // Skip dots based on density threshold
    if (cellHash > 1.0 - density) return 0.0;

    float dotSize = 0.12 + cellHash * 0.08;
    return smoothstep(dotSize, dotSize * 0.2, d);
}

float multiStipple(vec2 uv, float density) {
    float result = 0.0;
    result += stipple(uv, density, 800.0) * 0.5;
    result += stipple(uv * 1.3 + 17.0, density * 0.85, 500.0) * 0.35;
    result += stipple(uv * 0.7 + 31.0, density * 0.6, 300.0) * 0.15;
    return clamp(result, 0.0, 1.0);
}

// ============================================
// RIDGELINE (Joy Division / Unknown Pleasures)
// ============================================
// Horizontal lines span FULL SCREEN WIDTH.
// Lines are FLAT where there's no depth data.
// Lines BEND UPWARD where they intersect the hand's depth.
// Fill zones go DOWN from each line, creating proper occlusion.
// Subtle wave animation travels along lines where hand exists.

struct RidgeResult {
    float line;
    float fill;
    float glow;
};

RidgeResult calculateRidgeline(vec2 uv, float time, sampler2D depthTex) {
    RidgeResult result;
    result.line = 0.0;
    result.fill = 0.0;
    result.glow = 0.0;

    float lineCount = u_ridge_count;
    float lineSpacing = 1.0 / lineCount;
    float lineWidth = u_ridge_thickness * 0.002;

    float closestDist = 1.0;
    float inFill = 0.0;

    // Optimized: only check nearby lines (±5 from current band)
    float baseIndex = floor(uv.y * lineCount);

    for (float offset = -5.0; offset <= 10.0; offset += 1.0) {
        float i = baseIndex + offset;
        if (i < 0.0 || i >= lineCount) continue;

        float baseY = i / lineCount;

        // Sample depth at this line's fixed Y position, current X
        vec2 sampleUV = vec2(1.0 - uv.x, baseY);
        float depth = texture2D(depthTex, sampleUV).r;

        // === DISPLACEMENT ===
        float displacement = depth * u_ridge_amplitude * 0.15;

        // === RICH ORGANIC ANIMATION ===
        // Only animate where hand exists
        float handPresence = smoothstep(0.05, 0.15, depth);

        // 1. MULTI-FREQUENCY WAVES (water-like ripples)
        float wave1 = sin(time * u_ridge_speed * 1.5 + uv.x * u_ridge_waveFreq) * 0.004;
        float wave2 = sin(time * u_ridge_speed * 2.3 + uv.x * u_ridge_waveFreq * 1.7 + 1.5) * 0.003;
        float wave3 = sin(time * u_ridge_speed * 0.8 + uv.x * u_ridge_waveFreq * 0.5 + 3.0) * 0.005;
        float waves = (wave1 + wave2 + wave3) * handPresence;

        // 2. NOISE DRIFT (organic randomness using existing noise function)
        vec2 noiseCoord = vec2(uv.x * 3.0 + time * u_ridge_speed * 0.3, baseY * 5.0 + time * u_ridge_speed * 0.1);
        float noiseDrift = (noise(noiseCoord) - 0.5) * 0.008 * handPresence;

        // 3. PULSE BREATHING (gentle expansion/contraction)
        float pulse = sin(time * u_ridge_speed * 0.5) * 0.003 * depth;

        // Combine all animation components
        float totalAnimation = waves + noiseDrift + pulse;

        float lineY = baseY + displacement + totalAnimation;

        // === FILL ZONE CHECK ===
        // If pixel is BELOW this line's displaced position, it's in fill zone
        // This creates the mountain silhouette effect
        if (uv.y < lineY && uv.y >= baseY) {
            inFill = 1.0;
        }

        // Track closest line for stroke
        float dist = abs(uv.y - lineY);
        if (dist < closestDist) {
            closestDist = dist;
        }
    }

    // === LINE STROKE ===
    float lineMask = smoothstep(lineWidth, lineWidth * 0.2, closestDist);
    result.line = pow(lineMask, u_ridge_sharpness);

    // Fill zone
    result.fill = inFill;

    // === GLOW ===
    float glowWidth = lineWidth * 6.0;
    result.glow = exp(-closestDist * closestDist / (glowWidth * glowWidth)) * u_ridge_glow;

    return result;
}

// ============================================
// REACTION-DIFFUSION (Pseudo Gray-Scott)
// ============================================
// Approximates R-D patterns using layered noise without frame buffer feedback.
// The feed/kill rates control pattern type (spots, stripes, coral, maze)

float calculateReactionDiffusion(vec2 uv, float depth, float handMask, float time) {
    // Scale UV by pattern scale
    vec2 scaledUV = uv * u_rd_scale * 100.0;

    // Time animation
    float t = time * u_rd_speed * 0.5;

    // Map feed/kill rates to pattern characteristics
    // f=0.055, k=0.062 = spots (mitosis)
    // f=0.039, k=0.058 = stripes
    // f=0.026, k=0.051 = maze/coral
    float patternMix = (u_rd_feedRate - 0.01) / 0.09; // 0-1 range
    float complexity = (u_rd_killRate - 0.045) / 0.025; // 0-1 range

    // Create cellular noise base (Voronoi-like)
    vec2 cellUV = scaledUV * (0.5 + complexity * 0.5);
    vec2 cell = floor(cellUV);
    vec2 f = fract(cellUV);

    float minDist = 1.0;
    float secondDist = 1.0;

    // Find two closest cell centers for edge detection
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = hash2(cell + neighbor);

            // Animate points slowly
            point = 0.5 + 0.4 * sin(t * 0.3 + 6.2831 * point);

            float d = length(f - neighbor - point);

            if (d < minDist) {
                secondDist = minDist;
                minDist = d;
            } else if (d < secondDist) {
                secondDist = d;
            }
        }
    }

    // Create different pattern types based on parameters
    float cellEdge = secondDist - minDist;

    // Pattern A: Spots (high feed rate)
    float spots = smoothstep(0.1 + patternMix * 0.2, 0.0, minDist);

    // Pattern B: Stripes/Worms (medium feed rate)
    float wormNoise = fbm(scaledUV * 0.3 + t * 0.1, 4);
    float stripes = smoothstep(0.4, 0.6, wormNoise);
    stripes *= smoothstep(0.02, 0.08, cellEdge); // Add cellular breakup

    // Pattern C: Coral/Maze (low feed rate)
    float coralNoise = fbm(scaledUV * 0.2 + vec2(t * 0.05, -t * 0.03), 5);
    float coral = smoothstep(0.35 + complexity * 0.15, 0.65 - complexity * 0.15, coralNoise);

    // Blend patterns based on feed rate
    float pattern;
    if (patternMix > 0.6) {
        // High feed = spots
        pattern = mix(stripes, spots, (patternMix - 0.6) / 0.4);
    } else if (patternMix > 0.3) {
        // Medium feed = stripes/worms
        pattern = mix(coral, stripes, (patternMix - 0.3) / 0.3);
    } else {
        // Low feed = coral/maze
        pattern = coral;
    }

    // Diffusion rates affect edge sharpness
    float edgeSharpness = u_rd_diffusionA / u_rd_diffusionB;
    pattern = smoothstep(0.5 - 0.3 / edgeSharpness, 0.5 + 0.3 / edgeSharpness, pattern);

    // Modulate by depth - more pattern in closer areas
    float depthMod = smoothstep(0.1, 0.5, depth);
    pattern *= depthMod;

    // Add subtle pulsing
    float pulse = 0.9 + 0.1 * sin(t * 2.0 + depth * 10.0);
    pattern *= pulse;

    return pattern * handMask;
}

// ============================================
// SCANLINE CALCULATION (Joy Division style)
// ============================================

float calculateScanlines(vec2 uv, float depth, float handMask, float lineCount, float displacement, float thickness, float time, float scrollSpeed) {
    // Add time-based vertical scroll
    float scrollOffset = time * scrollSpeed;
    float y = (uv.y + scrollOffset) * lineCount;

    // Get line index for per-line variation
    float lineIndex = floor(y);

    // Apply depth-based displacement
    float depthDisplace = depth * displacement * lineCount * 1.5;
    float displaced = y + depthDisplace;

    // Create line pattern using fract
    float linePhase = fract(displaced);

    // Per-line thickness variation
    float thicknessVar = 0.7 + hash(vec2(lineIndex, 0.0)) * 0.6;
    float halfThickness = thickness / lineCount * 0.5 * thicknessVar;

    // Base line shape
    float line = smoothstep(0.0, halfThickness, linePhase) *
                 smoothstep(halfThickness * 2.0, halfThickness, linePhase);

    // === EDGE FRAGMENTATION using dFdx/dFdy ===
    // Detect actual edges using screen-space derivatives
    float edgeX = dFdx(handMask);
    float edgeY = dFdy(handMask);
    float edgeStrength = length(vec2(edgeX, edgeY)) * 25.0;
    edgeStrength = smoothstep(0.1, 1.0, edgeStrength);

    // Also fragment based on low handMask (near silhouette)
    float maskEdge = 1.0 - smoothstep(0.1, 0.5, handMask);

    // Combined edge detection
    float fragmentAmount = max(edgeStrength, maskEdge * 0.8);

    // Create noise-based dithering pattern
    vec2 noiseUV = uv * 250.0 + vec2(time * 0.4, lineIndex * 3.0);
    float noiseVal = hash(floor(noiseUV));

    // Threshold varies with edge strength - more breakup at edges
    float ditherThreshold = fragmentAmount * 0.85; // Up to 85% breakup
    float ditherMask = step(ditherThreshold, noiseVal);

    // Apply dithering to line
    line *= mix(1.0, ditherMask, fragmentAmount);

    // Soft fade at very edge (but NOT zero - keep some dots visible)
    float edgeFade = smoothstep(0.0, 0.08, handMask);

    return line * max(edgeFade, fragmentAmount * 0.3);
}

// ============================================
// DISSOLUTION CALCULATION
// ============================================

struct DissolutionResult {
    float mask;      // 0 = dissolved, 1 = solid
    float edgeGlow;  // Glow intensity at dissolution edge
};

DissolutionResult calculateDissolution(vec2 uv, float progress, float noiseScale, float edgeWidth) {
    DissolutionResult result;

    // Sample noise
    vec3 noisePos = vec3(uv * noiseScale, u_time * 0.1);
    float n = perlin3d(noisePos) * 0.5 + 0.5; // Remap to 0-1

    // Threshold based on progress
    float threshold = 1.0 - progress;

    // Calculate dissolution
    float dissolve = n - threshold;

    // Mask: 0 where dissolved, 1 where solid
    result.mask = smoothstep(0.0, edgeWidth, -dissolve);

    // Edge glow: bright at dissolution boundary
    float innerEdge = smoothstep(edgeWidth * 2.0, edgeWidth, -dissolve);
    result.edgeGlow = innerEdge - result.mask;

    return result;
}

// ============================================
// MAIN
// ============================================

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // ========================================
    // SAMPLE DEPTH MAP
    // ========================================

    // Flip X only (horizontal mirror)
    vec2 depthUV = vec2(1.0 - uv.x, uv.y);

    // Sample the depth map
    float depth = texture2D(u_depthMap, depthUV).r;

    // Bounds check
    float inBounds = step(0.0, depthUV.x) * step(depthUV.x, 1.0) *
                     step(0.0, depthUV.y) * step(depthUV.y, 1.0);

    // Background threshold (mask out dark background)
    float bgThreshold = 0.08;
    float handMask = inBounds * smoothstep(bgThreshold - 0.02, bgThreshold + 0.02, depth);

    // ========================================
    // LAYER 2: CONTOUR LINES
    // ========================================

    float contour = 0.0;
    if (u_showContours && handMask > 0.0) {
        // Depth threshold: don't draw contours where depth is too low
        // This prevents the "millions of lines" at the silhouette edge
        float depthThreshold = smoothstep(0.08, 0.15, depth);

        if (depthThreshold > 0.1) {
            contour = calculateContour(uv, depth, handMask, u_contour_interval, u_contour_thickness, u_time);
            contour *= u_contour_alpha;
            contour *= depthThreshold; // Fade out contours at low depth
        }
    }

    // ========================================
    // LAYER 3: STIPPLE TEXTURE
    // ========================================

    float stipplePattern = 0.0;
    if (u_showStipple && handMask > 0.0) {
        // More dots in darker/recessed areas
        float stippleDensity = (1.0 - depth) * u_stipple_threshold;
        stipplePattern = multiStipple(uv * u_stipple_scale, stippleDensity);
        stipplePattern *= u_stipple_alpha;
    }

    // ========================================
    // LAYER 4: SCANLINES (Joy Division style)
    // ========================================

    float scanlines = 0.0;
    if (u_showScanlines) {
        scanlines = calculateScanlines(uv, depth, handMask, u_scanline_count, u_scanline_displacement, u_scanline_thickness, u_time, u_scanline_scrollSpeed);
    }

    // ========================================
    // LAYER 5: REACTION-DIFFUSION
    // ========================================

    float reactionDiffusion = 0.0;
    if (u_showReactionDiffusion && handMask > 0.0) {
        reactionDiffusion = calculateReactionDiffusion(uv, depth, handMask, u_time);
    }

    // ========================================
    // LAYER 6: RIDGELINE (Joy Division)
    // ========================================

    float ridgeline = 0.0;
    float ridgeFill = 0.0;
    float ridgeGlow = 0.0;
    if (u_showRidgeline) {
        RidgeResult ridge = calculateRidgeline(uv, u_time, u_depthMap);
        ridgeline = ridge.line;
        ridgeFill = ridge.fill;
        ridgeGlow = ridge.glow;
    }

    // ========================================
    // LAYER 7: DISSOLUTION
    // ========================================

    float dissolutionMask = 1.0;
    float edgeGlow = 0.0;

    if (u_showDissolution && u_dissolve_progress > 0.01) {
        DissolutionResult diss = calculateDissolution(
            uv,
            u_dissolve_progress,
            u_dissolve_noiseScale,
            u_dissolve_edgeWidth
        );
        dissolutionMask = diss.mask;
        edgeGlow = diss.edgeGlow;
    }

    // ========================================
    // COMPOSITION
    // ========================================

    // Background color (pure black)
    vec3 bgColor = vec3(0.0);

    // Line/dot color (cream/off-white)
    vec3 lineColor = vec3(0.88, 0.85, 0.80);

    // ========================================
    // DEBUG MODE - Layer isolation
    // Press D to cycle through debug views
    // ========================================
    if (u_debugMode) {
        // Debug: Show each layer individually with color coding
        vec3 debugColor = vec3(0.0);

        // Layer 1: Contour (RED channel)
        debugColor.r = contour;

        // Layer 2: Scanlines (GREEN channel)
        debugColor.g = scanlines;

        // Layer 3: Stipple (BLUE channel)
        debugColor.b = stipplePattern;

        // Layer 4: Reaction-Diffusion (CYAN = G+B)
        debugColor.g += reactionDiffusion * 0.7;
        debugColor.b += reactionDiffusion * 0.7;

        // Layer 5: Ridgeline (YELLOW = R+G for lines, MAGENTA for fill)
        debugColor.r += ridgeline * 0.8;
        debugColor.g += ridgeline * 0.8;
        debugColor.r += ridgeFill * 0.4;  // Fill shows as magenta
        debugColor.b += ridgeFill * 0.4;
        debugColor += vec3(ridgeGlow * 0.3); // White glow

        // Show handMask boundary as white outline
        float maskEdge = abs(dFdx(handMask)) + abs(dFdy(handMask));
        maskEdge = smoothstep(0.0, 0.1, maskEdge * 10.0);
        debugColor += vec3(maskEdge * 0.5);

        // Show depth value in corner
        if (uv.x < 0.1 && uv.y < 0.1) {
            debugColor = vec3(depth);
        }

        gl_FragColor = vec4(debugColor, 1.0);
        return;
    }

    // ========================================
    // Z-INDEX LAYER COMPOSITION SYSTEM
    // ========================================
    // Layers are composited from lowest z-index to highest (back to front)
    // This creates a Photoshop-like layer stacking system

    // Apply hand mask and dissolution
    float finalMask = handMask * dissolutionMask;

    // Start with black background
    vec3 color = bgColor;

    // Prepare layer colors and intensities
    vec3 contourColor = lineColor;
    vec3 scanlineColor = lineColor;
    vec3 stippleColor = lineColor;

    // Reaction-Diffusion color (organic teal/coral tones)
    vec3 rdColorA = vec3(0.2, 0.8, 0.7);  // Teal
    vec3 rdColorB = vec3(0.9, 0.5, 0.4);  // Coral
    float rdColorMix = (u_rd_feedRate - 0.01) / 0.09;
    vec3 rdColor = mix(rdColorA, rdColorB, rdColorMix);

    // Ridgeline base (with fill)
    vec3 ridgelineColor = vec3(0.0);
    if (u_showRidgeline) {
        vec3 fillColor = vec3(0.0);
        if (u_ridge_fillStyle > 0.0) {
            float localDepth = texture2D(u_depthMap, vec2(1.0 - uv.x, uv.y)).r;
            vec3 gradientFill = vec3(0.05, 0.05, 0.08);
            vec3 depthTint = mix(vec3(0.02, 0.02, 0.05), vec3(0.08, 0.06, 0.04), localDepth);
            if (u_ridge_fillStyle < 0.5) {
                fillColor = mix(vec3(0.0), gradientFill, u_ridge_fillStyle * 2.0);
            } else {
                fillColor = mix(gradientFill, depthTint, (u_ridge_fillStyle - 0.5) * 2.0);
            }
        }
        ridgelineColor = mix(vec3(0.0), fillColor, ridgeFill);
        ridgelineColor = mix(ridgelineColor, lineColor, ridgeline);
        ridgelineColor += vec3(0.3, 0.35, 0.4) * ridgeGlow;
    }

    // Helper function approach: composite layers by z-index
    // We check z-index 0 through 5 and apply matching layers
    for (float z = 0.0; z <= 5.0; z += 1.0) {
        // Check each layer's z-index and composite if it matches

        // Ridgeline layer
        if (u_showRidgeline && abs(u_zindex_ridgeline - z) < 0.5) {
            // Ridgeline replaces background where active
            float ridgeIntensity = max(ridgeline, ridgeFill);
            color = mix(color, ridgelineColor, ridgeIntensity);
        }

        // Contours layer
        if (u_showContours && abs(u_zindex_contours - z) < 0.5) {
            color = mix(color, contourColor, contour * finalMask * u_contour_alpha);
        }

        // Scanlines layer
        if (u_showScanlines && abs(u_zindex_scanlines - z) < 0.5) {
            color = mix(color, scanlineColor, scanlines * finalMask);
        }

        // Stipple layer
        if (u_showStipple && abs(u_zindex_stipple - z) < 0.5) {
            color = mix(color, stippleColor, stipplePattern * finalMask);
        }

        // Reaction-Diffusion layer
        if (u_showReactionDiffusion && abs(u_zindex_rd - z) < 0.5) {
            color = mix(color, rdColor, reactionDiffusion * finalMask * 0.7);
        }
    }

    // Add edge glow for dissolution
    if (u_showDissolution && edgeGlow > 0.0) {
        color += u_dissolve_edgeColor * edgeGlow * finalMask * 0.8;
    }

    // ========================================
    // SUBTLE VIGNETTE
    // ========================================

    float vignette = 1.0 - length(uv - 0.5) * 0.2;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}
