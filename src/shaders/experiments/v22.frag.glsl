precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V22: LUMINOUS HAND - Wisps Shader (REWRITTEN)
 * ═══════════════════════════════════════════════════════════════════
 *
 * KEY INSIGHT: Wisps appear where depth CHANGES, not where depth EXISTS.
 *
 * WRONG: wisp = fbm * depth  → creates blob
 * RIGHT: wisp = fbm * edge   → creates contour strands
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

uniform float u_wispIntensity;         // Overall brightness
uniform float u_wispScale;             // FBM scale
uniform float u_wispWarp;              // Domain warp amount
uniform float u_wispEdgeConcentration; // Edge amplification (10-50)
uniform float u_debugMode;             // 0=normal, 1=edge, 2=fbm, 3=depth

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

// === FRACTAL BROWNIAN MOTION ===
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

// === MAIN ===
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Flip X for hand orientation
    vec2 depthUV = vec2(1.0 - uv.x, uv.y);

    // === STEP 1: Sample depth ===
    float depth = texture2D(u_depthMap, depthUV).r;

    // === STEP 2: Calculate edge (where depth CHANGES) ===
    // fwidth = |dFdx| + |dFdy| = magnitude of change across pixels
    float edge = fwidth(depth);

    // Amplify edge signal
    edge *= u_wispEdgeConcentration; // 10-50 range works well

    // === STEP 3: Create organic wisp shape with domain-warped FBM ===
    // Create warp offset using FBM
    vec2 warp = vec2(
        fbm(uv * 2.0 + vec2(100.0, 0.0) + u_time * 0.02),
        fbm(uv * 2.0 + vec2(0.0, 100.0) + u_time * 0.015)
    );

    // Apply warp to UV before main FBM
    vec2 warpedUV = uv + warp * u_wispWarp;

    // Generate wisp noise
    float wispNoise = fbm(warpedUV * u_wispScale);

    // === STEP 4: MULTIPLY wisp noise BY edge (THE KEY FIX) ===
    // Wisps only appear where edges exist
    float wisp = wispNoise * edge;

    // === STEP 5: Threshold to make wisps wispy, not cloudy ===
    wisp = smoothstep(0.05, 0.4, wisp) * u_wispIntensity;

    // === DEBUG MODES ===
    if (u_debugMode > 0.5 && u_debugMode < 1.5) {
        // Debug 1: Edge detection only
        gl_FragColor = vec4(vec3(edge), 1.0);
        return;
    }

    if (u_debugMode > 1.5 && u_debugMode < 2.5) {
        // Debug 2: FBM noise only
        gl_FragColor = vec4(vec3(wispNoise), 1.0);
        return;
    }

    if (u_debugMode > 2.5 && u_debugMode < 3.5) {
        // Debug 3: Depth map only
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }

    // === NORMAL OUTPUT ===
    gl_FragColor = vec4(vec3(wisp), 1.0);
}
