precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V22: LUMINOUS HAND - Wisps Shader
 * ═══════════════════════════════════════════════════════════════════
 *
 * Features:
 * - Ridged FBM for sharp tendrils (not cloud-like)
 * - Edge bleed: wisps emanate FROM edges, not just AT edges
 * - Depth brightness: brighter near hand surface
 *
 * Debug modes:
 *   0 = Normal output
 *   1 = Edge detection only
 *   2 = FBM noise only
 *   3 = Depth map only
 *
 * NOTE: u_resolution must be set to actual drawing buffer size
 * (window size * pixelRatio) for correct gl_FragCoord mapping.
 * ═══════════════════════════════════════════════════════════════════
 */

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

uniform sampler2D u_depthMap;

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

// === STANDARD FBM (for domain warping) ===
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

// === IMPROVED RIDGED FBM (sharp tendrils, not clouds) ===
float ridgedFbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float prev = 1.0;

    for (int i = 0; i < 5; i++) {
        // Sharp ridge: fold noise and invert
        float n = 1.0 - abs(noise(p) * 2.0 - 1.0);
        // Sharpen further by squaring
        n = n * n;
        // Connect ridges by weighting with previous
        n *= prev;
        prev = n;

        value += n * amplitude;
        p *= 2.2;
        amplitude *= 0.5;
    }

    return value;
}


// === WISP GENERATION (with edge bleed and depth brightness) ===
float getWisps(vec2 uv, float edge, float depth) {
    // Domain warp for organic shape (use ridgedFbm for more interesting warp)
    vec2 warp = vec2(
        ridgedFbm(uv * 2.0 + vec2(100.0, 0.0) + u_time * 0.02),
        ridgedFbm(uv * 2.0 + vec2(0.0, 100.0) + u_time * 0.015)
    );
    vec2 warpedUV = uv + warp * u_wispWarp;

    // Generate tendril pattern
    float wispPattern = ridgedFbm(warpedUV * u_wispScale);

    // KEY FIX: edgeBleed allows wisps to exist NEAR edges, not just AT edges
    // This creates the "emanating" effect rather than just edge glow
    float edgeBleed = smoothstep(0.0, 0.15, edge);

    // Combine pattern with edge mask
    float wisp = wispPattern * edgeBleed;

    // Threshold to make distinct tendrils
    wisp = smoothstep(0.15, 0.5, wisp);

    // Depth influence: brighter near hand surface, fading into void
    float depthBoost = smoothstep(0.0, 0.4, depth);
    wisp *= (0.3 + depthBoost * 0.7);

    return wisp * u_wispIntensity;
}

// === MAIN ===
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Flip X for hand orientation (like v18 does)
    vec2 depthUV = vec2(1.0 - uv.x, uv.y);

    // Sample depth
    float depth = texture2D(u_depthMap, depthUV).r;

    // === STEP 2: Calculate edge (where depth CHANGES) ===
    float edge = fwidth(depth);
    edge *= u_wispEdgeConcentration;

    // === DEBUG MODES ===
    if (u_debugMode > 0.5 && u_debugMode < 1.5) {
        // Debug 1: Edge detection only
        gl_FragColor = vec4(vec3(edge), 1.0);
        return;
    }

    if (u_debugMode > 1.5 && u_debugMode < 2.5) {
        // Debug 2: Ridged FBM noise only
        float wispPattern = ridgedFbm(uv * u_wispScale);
        gl_FragColor = vec4(vec3(wispPattern), 1.0);
        return;
    }

    if (u_debugMode > 2.5 && u_debugMode < 3.5) {
        // Debug 3: Depth map only (with aspect correction)
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }

    // === STEP 3: Generate wisps with all improvements ===
    float wisp = getWisps(uv, edge, depth);

    // === NORMAL OUTPUT ===
    gl_FragColor = vec4(vec3(wisp), 1.0);
}
