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
// Creates clean horizontal lines displaced by depth, with sharp peaks
// and optional glow. Pure mathematics - no noise, just elegance.

struct RidgeResult {
    float line;      // The line itself (0-1)
    float glow;      // Glow around peaks (0-1)
    float peak;      // Peak intensity for coloring (0-1)
};

RidgeResult calculateRidgeline(vec2 uv, float time, sampler2D depthTex) {
    RidgeResult result;
    result.line = 0.0;
    result.glow = 0.0;
    result.peak = 0.0;

    // Flip UV for depth sampling (match main)
    vec2 depthUV = vec2(1.0 - uv.x, uv.y);

    // Line parameters
    float lineCount = u_ridge_count;
    float amplitude = u_ridge_amplitude;
    float thickness = u_ridge_thickness;
    float sharpness = u_ridge_sharpness;

    // Subtle time-based vertical drift
    float drift = time * u_ridge_speed * 0.02;

    // Current line Y position (which horizontal band are we in?)
    float y = (uv.y + drift) * lineCount;
    float lineIndex = floor(y);
    float linePhase = fract(y);

    // For each line, we need to check if THIS pixel should draw
    // by sampling the depth at this X position for the line's Y

    // Calculate the Y coordinate of the current line in UV space
    float lineY = (lineIndex + 0.5) / lineCount - drift;

    // Sample depth at this line's Y position but our X position
    vec2 sampleUV = vec2(depthUV.x, clamp(lineY, 0.0, 1.0));
    float depth = texture2D(depthTex, sampleUV).r;

    // Background threshold
    float bgThreshold = 0.08;
    float isHand = smoothstep(bgThreshold - 0.02, bgThreshold + 0.02, depth);

    // Calculate vertical displacement based on depth
    // Higher depth = line gets pushed UP (negative Y in screen space)
    float displacement = depth * amplitude;

    // The line's displaced Y position relative to where we are
    float displacedLineY = linePhase - displacement * lineCount * 0.5;

    // Create sharp line using smoothstep for anti-aliasing
    // Sharpness controls the falloff steepness
    float halfThick = thickness / lineCount * 0.5;

    // Main line - sharper peaks with adjustable sharpness
    float lineShape = 1.0 - abs(displacedLineY) / halfThick;
    lineShape = pow(max(lineShape, 0.0), sharpness);

    // Only draw if we're close to the line
    result.line = lineShape * isHand;

    // Calculate gradient for peak detection (where depth changes rapidly)
    vec2 texelSize = 1.0 / u_resolution;
    float depthL = texture2D(depthTex, sampleUV - vec2(texelSize.x * 2.0, 0.0)).r;
    float depthR = texture2D(depthTex, sampleUV + vec2(texelSize.x * 2.0, 0.0)).r;
    float gradient = abs(depthR - depthL) * 10.0;

    // Peak intensity - brighter where the line makes sharp turns
    result.peak = gradient * result.line;

    // Glow - exponential falloff from the line
    float glowDist = abs(displacedLineY);
    float glowFalloff = exp(-glowDist * lineCount * 0.5);
    result.glow = glowFalloff * depth * u_ridge_glow * isHand * 0.5;

    // Add subtle secondary lines for depth
    float secondaryY = fract(y * 2.0);
    float secondaryDisp = depth * amplitude * 0.3;
    float secondaryLine = 1.0 - abs(secondaryY - 0.5 - secondaryDisp) / (halfThick * 0.3);
    secondaryLine = pow(max(secondaryLine, 0.0), sharpness * 2.0) * 0.15;
    result.line += secondaryLine * isHand;

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
    float ridgeGlow = 0.0;
    float ridgePeak = 0.0;
    if (u_showRidgeline) {
        RidgeResult ridge = calculateRidgeline(uv, u_time, u_depthMap);
        ridgeline = ridge.line;
        ridgeGlow = ridge.glow;
        ridgePeak = ridge.peak;
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

        // Layer 5: Ridgeline (YELLOW = R+G)
        debugColor.r += ridgeline * 0.8;
        debugColor.g += ridgeline * 0.8;
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

    // Combine all patterns (excluding ridgeline - it has special rendering)
    float combinedPattern = max(max(max(contour, stipplePattern), scanlines), reactionDiffusion);

    // Apply hand mask and dissolution
    float finalMask = handMask * dissolutionMask;

    // Base color
    vec3 color = mix(bgColor, lineColor, combinedPattern * finalMask);

    // Add special coloring for Reaction-Diffusion (organic teal/coral tones)
    if (u_showReactionDiffusion && reactionDiffusion > 0.0) {
        // Create organic color based on pattern intensity and depth
        vec3 rdColorA = vec3(0.2, 0.8, 0.7);  // Teal for spots
        vec3 rdColorB = vec3(0.9, 0.5, 0.4);  // Coral for stripes
        float colorMix = (u_rd_feedRate - 0.01) / 0.09;
        vec3 rdColor = mix(rdColorA, rdColorB, colorMix);

        // Blend R-D color with base
        color = mix(color, rdColor, reactionDiffusion * finalMask * 0.6);
    }

    // Add Ridgeline effect (Joy Division style)
    if (u_showRidgeline) {
        // Pure white lines
        color += lineColor * ridgeline;

        // Subtle glow beneath lines
        color += vec3(0.3, 0.4, 0.5) * ridgeGlow;

        // Brighter peaks where lines curve sharply
        color += vec3(1.0) * ridgePeak * 0.5;
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
