precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V22: LUMINOUS HAND - Wisps Shader
 * ═══════════════════════════════════════════════════════════════════
 *
 * Creates organic, flowing luminous wisps that trace the hand's contours.
 * Uses domain-warped FBM to generate ethereal, smoke-like strands.
 *
 * The hand emerges through:
 *   1. Wisps concentrated along depth edges (contours)
 *   2. Intensity modulated by depth value
 *   3. Domain warping for organic, non-uniform flow
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
uniform float u_wispIntensity;        // Overall brightness (default: 1.0)
uniform float u_wispScale;            // FBM scale (default: 5.0)
uniform float u_wispWarp;             // Domain warp amount (default: 0.5)
uniform float u_wispEdgeConcentration; // Edge focus multiplier (default: 2.0)

// === HASH FUNCTIONS ===
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
}

// === VALUE NOISE ===
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    // Cubic Hermite interpolation
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
// Creates organic, swirling patterns by warping coordinates with noise
float warpedFbm(vec2 st, int octaves, float warpAmount) {
    // First FBM pass for distortion field
    vec2 warp = vec2(
        fbm(st + vec2(0.0, 0.0), octaves),
        fbm(st + vec2(5.2, 1.3), octaves)
    );

    // Second FBM with warped coordinates
    return fbm(st + warp * warpAmount, octaves);
}

// === MULTI-LAYER WISPS ===
// Creates multiple layers of ethereal strands
float calculateWisps(vec2 uv, vec2 depthUV, float depth, float edge) {
    float wisps = 0.0;

    // Layer 1: Large-scale flowing forms
    vec2 st1 = uv * u_wispScale * 0.5;
    st1 += vec2(u_time * 0.02, u_time * 0.01); // Slow drift
    float layer1 = warpedFbm(st1, 5, u_wispWarp * 1.2);

    // Layer 2: Medium detail
    vec2 st2 = uv * u_wispScale;
    st2 += vec2(u_time * -0.015, u_time * 0.025);
    float layer2 = warpedFbm(st2 + vec2(3.3, 7.7), 4, u_wispWarp);

    // Layer 3: Fine detail wisps
    vec2 st3 = uv * u_wispScale * 2.0;
    st3 += vec2(u_time * 0.03, u_time * -0.02);
    float layer3 = warpedFbm(st3 + vec2(11.1, 2.9), 3, u_wispWarp * 0.8);

    // Combine layers with different weights
    wisps = layer1 * 0.5 + layer2 * 0.35 + layer3 * 0.15;

    // Create tendril-like shapes by sharpening
    wisps = pow(wisps, 1.5);

    // Modulate by depth - brighter near hand surface
    float depthInfluence = smoothstep(0.05, 0.4, depth);
    wisps *= depthInfluence;

    // Concentrate along edges (contours)
    float edgeBoost = 1.0 + edge * u_wispEdgeConcentration;
    wisps *= edgeBoost;

    // Fade wisps at silhouette edges to avoid hard cutoff
    float silhouetteFade = smoothstep(0.0, 0.15, depth);
    wisps *= silhouetteFade;

    return wisps * u_wispIntensity;
}

// === MAIN ===
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Flip X for hand orientation (mirror)
    vec2 depthUV = vec2(1.0 - uv.x, uv.y);

    // Sample depth map
    float depth = texture2D(u_depthMap, depthUV).r;

    // Background threshold
    float bgThreshold = 0.05;
    float handMask = smoothstep(bgThreshold - 0.02, bgThreshold + 0.05, depth);

    // Edge detection using fwidth (screen-space derivatives)
    float edge = fwidth(depth) * 25.0;
    edge = smoothstep(0.0, 0.5, edge);

    // Skip extremely high derivatives (silhouette artifacts)
    if (fwidth(depth) > 0.3) {
        edge *= 0.3;
    }

    // Calculate wisps
    float wisps = calculateWisps(uv, depthUV, depth, edge);

    // Add subtle ambient glow in the void
    float ambientNoise = fbm(uv * 3.0 + u_time * 0.01, 3);
    float ambient = ambientNoise * 0.03 * (1.0 - handMask * 0.5);

    // Final color (additive on black)
    float luminosity = wisps + ambient;

    // Subtle color tint (very slight warm/cool variation)
    vec3 color = vec3(luminosity);

    // Add very subtle blue tint to edges
    color += vec3(-0.02, 0.0, 0.03) * edge * wisps;

    // Ensure no negative values
    color = max(color, vec3(0.0));

    gl_FragColor = vec4(color, 1.0);
}
