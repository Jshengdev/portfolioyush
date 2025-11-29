precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V22: LUMINOUS HAND - Wisps Shader (ASPECT RATIO FIXED)
 * ═══════════════════════════════════════════════════════════════════
 *
 * FIX 1: Aspect ratio correction for depth map
 * FIX 2: Ridged FBM for tendril-like wisps (not clouds)
 *
 * Debug modes:
 *   0 = Normal output
 *   1 = Edge detection only
 *   2 = FBM noise only
 *   3 = Depth map only
 * ═══════════════════════════════════════════════════════════════════
 */

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

uniform sampler2D u_depthMap;
uniform float u_imageAspect;  // depth map width/height

uniform float u_wispIntensity;
uniform float u_wispScale;
uniform float u_wispWarp;
uniform float u_wispEdgeConcentration;
uniform float u_debugMode;

// === HASH ===
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// === VALUE NOISE ===
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// === STANDARD FBM ===
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

// === RIDGED FBM (for tendril-like wisps) ===
// Creates sharp, vein-like patterns instead of soft clouds
float ridgedNoise(vec2 st) {
    float n = noise(st);
    // Fold the noise to create ridges
    n = abs(n - 0.5) * 2.0;
    // Invert so ridges are bright
    return 1.0 - n;
}

float ridgedFbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float weight = 1.0;

    for (int i = 0; i < 5; i++) {
        float n = ridgedNoise(st);
        // Weight successive octaves by previous
        n *= weight;
        weight = clamp(n * 2.0, 0.0, 1.0);

        value += amplitude * n;
        st *= 2.2;
        amplitude *= 0.5;
    }

    return value;
}

// === ASPECT RATIO CORRECTION ===
vec2 correctAspectRatio(vec2 uv) {
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageAspect;

    vec2 correctedUV = uv;

    if (screenAspect > imageAspect) {
        // Screen is wider than image - pillarbox (black bars on sides)
        float scale = imageAspect / screenAspect;
        correctedUV.x = (uv.x - 0.5) / scale + 0.5;
    } else {
        // Screen is taller than image - letterbox (black bars top/bottom)
        float scale = screenAspect / imageAspect;
        correctedUV.y = (uv.y - 0.5) / scale + 0.5;
    }

    return correctedUV;
}

// === MAIN ===
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // === FIX 1: Correct aspect ratio for depth map ===
    vec2 depthUV = correctAspectRatio(uv);

    // Flip X for hand orientation
    depthUV.x = 1.0 - depthUV.x;

    // Check if we're outside the image bounds
    float inBounds = step(0.0, depthUV.x) * step(depthUV.x, 1.0) *
                     step(0.0, depthUV.y) * step(depthUV.y, 1.0);

    // Sample depth (black outside bounds)
    float depth = texture2D(u_depthMap, depthUV).r * inBounds;

    // === STEP 2: Calculate edge (where depth CHANGES) ===
    float edge = fwidth(depth);
    edge *= u_wispEdgeConcentration;

    // === FIX 2: Use RIDGED FBM for tendrils, not clouds ===
    // Create warp offset
    vec2 warp = vec2(
        fbm(uv * 2.0 + vec2(100.0, 0.0) + u_time * 0.02),
        fbm(uv * 2.0 + vec2(0.0, 100.0) + u_time * 0.015)
    );

    // Apply warp
    vec2 warpedUV = uv + warp * u_wispWarp;

    // Generate RIDGED wisp noise (tendrils, not clouds)
    float wispNoise = ridgedFbm(warpedUV * u_wispScale);

    // Sharpen further with threshold
    wispNoise = smoothstep(0.3, 0.8, wispNoise);

    // === STEP 4: MULTIPLY wisp noise BY edge ===
    float wisp = wispNoise * edge;

    // Final threshold
    wisp = smoothstep(0.02, 0.3, wisp) * u_wispIntensity;

    // === DEBUG MODES ===
    if (u_debugMode > 0.5 && u_debugMode < 1.5) {
        // Debug 1: Edge detection only
        gl_FragColor = vec4(vec3(edge), 1.0);
        return;
    }

    if (u_debugMode > 1.5 && u_debugMode < 2.5) {
        // Debug 2: Ridged FBM noise only
        gl_FragColor = vec4(vec3(wispNoise), 1.0);
        return;
    }

    if (u_debugMode > 2.5 && u_debugMode < 3.5) {
        // Debug 3: Depth map only (with aspect correction)
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }

    // === NORMAL OUTPUT ===
    gl_FragColor = vec4(vec3(wisp), 1.0);
}
