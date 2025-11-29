precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V22: LUMINOUS HAND - Wisps Shader (FIXED)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Creates organic, flowing luminous wisps that trace the hand's CONTOURS.
 * Wisps should appear AT EDGES, not fill the hand solid.
 *
 * Key principle: Hand interior = dark, edges = glowing wisps
 *
 * Reference: docs/experiments/references/particles.png
 * ═══════════════════════════════════════════════════════════════════
 */

// === PROVIDED UNIFORMS ===
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// === DEPTH MAP ===
uniform sampler2D u_depthMap;

// === WISP PARAMETERS ===
uniform float u_wispIntensity;         // Overall brightness (default: 1.0)
uniform float u_wispScale;             // FBM scale (default: 5.0)
uniform float u_wispWarp;              // Domain warp amount (default: 0.5)
uniform float u_wispEdgeConcentration; // Edge focus multiplier (default: 2.0)

// === HASH FUNCTIONS ===
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
float fbm(vec2 st, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float maxValue = 0.0;

    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * noise(st * frequency);
        maxValue += amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value / maxValue;
}

// === DOMAIN-WARPED FBM ===
float warpedFbm(vec2 st, int octaves, float warpAmount) {
    vec2 warp = vec2(
        fbm(st + vec2(0.0, 0.0), octaves),
        fbm(st + vec2(5.2, 1.3), octaves)
    );
    return fbm(st + warp * warpAmount, octaves);
}

// === EDGE-ONLY WISPS ===
// Wisps appear ONLY at contours, not filling the hand
float calculateWisps(vec2 uv, float depth, float edge, float edgeWidth) {
    // Base FBM pattern (organic texture)
    vec2 st = uv * u_wispScale;
    st += vec2(u_time * 0.015, u_time * 0.01);

    float pattern = warpedFbm(st, 4, u_wispWarp);

    // Second layer for more detail
    vec2 st2 = uv * u_wispScale * 1.5 + vec2(3.7, 2.1);
    st2 += vec2(u_time * -0.01, u_time * 0.02);
    float pattern2 = warpedFbm(st2, 3, u_wispWarp * 0.8);

    // Combine patterns
    float wisps = pattern * 0.6 + pattern2 * 0.4;

    // Create tendril shapes
    wisps = pow(wisps, 2.0);

    // KEY FIX: Wisps ONLY appear at edges, scaled by edge strength
    // edgeWidth controls how far from edge wisps extend
    float edgeMask = smoothstep(0.0, edgeWidth, edge);

    // Also allow wisps to "leak" slightly into void near edges
    float nearEdge = smoothstep(0.02, 0.15, depth) * smoothstep(0.5, 0.1, depth);

    // Combine: strong at edges, fading into void
    float wispMask = edgeMask * u_wispEdgeConcentration + nearEdge * 0.3;
    wispMask = min(wispMask, 1.0);

    wisps *= wispMask;

    return wisps * u_wispIntensity * 0.15; // Much lower base intensity
}

// === MAIN ===
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Flip X for hand orientation (mirror)
    vec2 depthUV = vec2(1.0 - uv.x, uv.y);

    // Sample depth map
    float depth = texture2D(u_depthMap, depthUV).r;

    // Edge detection using fwidth (screen-space derivatives)
    float rawEdge = fwidth(depth);

    // Normalize edge detection
    float edge = rawEdge * 30.0;
    edge = smoothstep(0.1, 0.8, edge);

    // Reduce artifacts at silhouette
    if (rawEdge > 0.25) {
        edge *= 0.2;
    }

    // Edge width for wisp spread (how far from contour wisps extend)
    float edgeWidth = 0.3 + u_wispEdgeConcentration * 0.2;

    // Calculate wisps (edge-focused)
    float wisps = calculateWisps(uv, depth, edge, edgeWidth);

    // Subtle ambient particles in void (very faint)
    float voidNoise = fbm(uv * 8.0 + u_time * 0.005, 3);
    float ambient = voidNoise * 0.02 * (1.0 - smoothstep(0.0, 0.2, depth));

    // Final luminosity
    float luminosity = wisps + ambient;

    // Output
    vec3 color = vec3(luminosity);
    color = max(color, vec3(0.0));

    gl_FragColor = vec4(color, 1.0);
}
