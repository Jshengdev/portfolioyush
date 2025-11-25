/**
 * Hand Shader - Fragment Shader v18
 *
 * Features:
 * - Topographic contour lines (fract/fwidth/smoothstep)
 * - Stipple texture layer
 * - Perlin noise edge dissolution
 * - Edge glow effect
 * - Route-reactive parameters
 */

#extension GL_OES_standard_derivatives : enable

precision highp float;

// === UNIFORMS ===

// Global
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Depth map
uniform sampler2D u_depthMap;

// Layer toggles
uniform bool u_showContours;
uniform bool u_showStipple;
uniform bool u_showDissolution;

// Contour parameters
uniform float u_contourInterval;
uniform float u_contourThickness;
uniform float u_contourAlpha;
uniform vec3 u_contourColor;

// Stipple parameters
uniform float u_stippleScale;
uniform float u_stippleThreshold;
uniform float u_stippleAlpha;

// Dissolution parameters
uniform float u_dissolveProgress;
uniform float u_dissolveNoiseScale;
uniform float u_dissolveEdgeWidth;
uniform vec3 u_dissolveEdgeColor;

// Hand positioning
uniform vec2 u_handPosition;
uniform float u_handScale;
uniform float u_handRotation;

// === VARYINGS ===
varying vec2 vUv;
varying float vHeight;


// === NOISE FUNCTIONS ===

// Simplex 3D Noise (ashima/webgl-noise)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients
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

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Simple hash for stipple pattern
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}


// === CONTOUR LINE CALCULATION ===

float calculateContour(float height, float interval, float thickness) {
    // Normalize height to intervals
    float scaledHeight = height / interval;

    // Get fractional part (creates repeating 0-1 pattern)
    float f = fract(scaledHeight);

    // Screen-space derivative for consistent line width
    float df = fwidth(scaledHeight);

    // Anti-aliased line detection (both edges of line band)
    float line = smoothstep(df * 0.5, df * (0.5 + thickness), f);
    line *= smoothstep(df * (1.5 - thickness), df * 1.5, f);

    // Return line mask (1.0 = line, 0.0 = no line)
    return 1.0 - line;
}


// === STIPPLE CALCULATION ===

float calculateStipple(vec2 uv, float height, float scale, float threshold) {
    vec2 stippleUv = uv * scale;
    float stipple = hash(floor(stippleUv));

    // Density based on depth (denser in valleys)
    float adjustedThreshold = threshold + (1.0 - height) * 0.3;

    return step(adjustedThreshold, stipple);
}


// === DISSOLUTION CALCULATION ===

struct DissolutionResult {
    float mask;
    float edgeGlow;
    float edgeMask;
};

DissolutionResult calculateDissolution(vec2 uv, float height, float progress, float noiseScale, float edgeWidth) {
    DissolutionResult result;

    // Multi-octave noise for organic dissolution
    vec3 noisePos = vec3(uv * noiseScale, u_time * 0.05);
    float noise = snoise(noisePos) * 0.5 + 0.5;
    noise += snoise(noisePos * 2.0) * 0.25;
    noise += snoise(noisePos * 4.0) * 0.125;
    noise = noise / 1.875; // Normalize

    // Edge-biased dissolution (dissolve from edges first)
    float edgeBias = 1.0 - smoothstep(0.0, 0.3, height) * smoothstep(1.0, 0.7, height);
    float adjustedNoise = mix(noise, noise * edgeBias, 0.5);

    // Threshold based on progress
    float threshold = 1.0 - progress;
    float dissolve = adjustedNoise - threshold;

    // Masks
    result.mask = smoothstep(0.0, edgeWidth, -dissolve);
    result.edgeGlow = smoothstep(edgeWidth * 2.0, edgeWidth, -dissolve);
    result.edgeMask = result.edgeGlow - result.mask;

    return result;
}


// === MAIN ===

void main() {
    // Transform UV for hand positioning
    vec2 centeredUv = vUv - 0.5;

    // Apply rotation
    float cosR = cos(u_handRotation);
    float sinR = sin(u_handRotation);
    vec2 rotatedUv = vec2(
        centeredUv.x * cosR - centeredUv.y * sinR,
        centeredUv.x * sinR + centeredUv.y * cosR
    );

    // Apply scale and position
    vec2 transformedUv = rotatedUv / u_handScale + u_handPosition + 0.5;

    // Sample depth map (higher precision in fragment shader)
    float height = texture2D(u_depthMap, transformedUv).r;

    // Check bounds
    bool inBounds = transformedUv.x >= 0.0 && transformedUv.x <= 1.0 &&
                    transformedUv.y >= 0.0 && transformedUv.y <= 1.0;

    // Skip if outside depth map or no hand data
    if (!inBounds || height < 0.01) {
        discard;
    }

    // Initialize output
    vec3 finalColor = vec3(0.0);
    float finalAlpha = 0.0;

    // === CONTOUR LAYER ===
    if (u_showContours) {
        float contourMask = calculateContour(height, u_contourInterval, u_contourThickness);

        // Variable line color based on depth (subtle blue in valleys)
        vec3 valleyColor = vec3(0.53, 0.66, 0.84); // Blue accent
        vec3 lineColor = mix(valleyColor, u_contourColor, height);

        finalColor = lineColor;
        finalAlpha = contourMask * u_contourAlpha;
    }

    // === STIPPLE LAYER ===
    if (u_showStipple) {
        float stippleMask = calculateStipple(transformedUv, height, u_stippleScale, u_stippleThreshold);

        // Blend stipple with contours
        float stippleContribution = stippleMask * u_stippleAlpha * (1.0 - height * 0.5);
        finalAlpha = max(finalAlpha, stippleContribution);

        // Slightly vary stipple color
        if (stippleMask > 0.5 && finalAlpha < 0.1) {
            finalColor = u_contourColor * 0.8;
            finalAlpha = stippleContribution;
        }
    }

    // === DISSOLUTION LAYER ===
    if (u_showDissolution && u_dissolveProgress > 0.0) {
        DissolutionResult diss = calculateDissolution(
            transformedUv,
            height,
            u_dissolveProgress,
            u_dissolveNoiseScale,
            u_dissolveEdgeWidth
        );

        // Apply dissolution mask
        finalAlpha *= diss.mask;

        // Add edge glow
        if (diss.edgeMask > 0.01) {
            finalColor = mix(finalColor, u_dissolveEdgeColor, diss.edgeMask);
            finalAlpha = max(finalAlpha, diss.edgeMask * 0.8);
        }

        // Discard fully dissolved pixels
        if (diss.mask < 0.01 && diss.edgeMask < 0.01) {
            discard;
        }
    }

    // === CURSOR INTERACTION ===
    // Subtle brightness boost near cursor
    float cursorDist = distance(vUv, u_mouse);
    float cursorGlow = smoothstep(0.3, 0.0, cursorDist) * 0.15;
    finalColor += cursorGlow;

    // Final output
    if (finalAlpha < 0.01) {
        discard;
    }

    gl_FragColor = vec4(finalColor, finalAlpha);
}
