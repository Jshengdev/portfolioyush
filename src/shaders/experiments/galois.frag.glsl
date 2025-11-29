/**
 * GALOIS Shader - Complex Polynomial Domain Coloring
 *
 * Visualizes polynomial solutions through domain coloring:
 * - White/bright regions indicate zeros (solutions)
 * - Hue encodes the phase/angle of the polynomial output
 * - Brightness encodes the magnitude
 *
 * This is Step 1 of the 7-step GALOIS implementation guide.
 * See: src/components/experiments/v20/GALOIS_IMPLEMENTATION_GUIDE.md
 */

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Polynomial configuration
uniform vec2 u_coefficients[6]; // Complex coefficients (real, imag) - up to degree 5
uniform int u_degree;
uniform float u_zoom;
uniform vec2 u_pan;

// Visual settings
uniform float u_brightness;
uniform float u_saturation;

/**
 * Complex number multiplication
 * (a + bi)(c + di) = (ac - bd) + (ad + bc)i
 */
vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

/**
 * Complex number division
 * (a + bi)/(c + di) = ((ac + bd) + (bc - ad)i) / (c² + d²)
 */
vec2 cdiv(vec2 a, vec2 b) {
    float denom = b.x * b.x + b.y * b.y;
    return vec2(
        (a.x * b.x + a.y * b.y) / denom,
        (a.y * b.x - a.x * b.y) / denom
    );
}

/**
 * Evaluate polynomial at complex point z
 * P(z) = a₀ + a₁z + a₂z² + ... + aₙzⁿ
 */
vec2 evalPoly(vec2 z) {
    vec2 result = u_coefficients[0];
    vec2 zPower = z;

    // Horner's method would be more efficient, but this is clearer
    for (int i = 1; i <= 5; i++) {
        if (i > u_degree) break;
        result += cmul(u_coefficients[i], zPower);
        zPower = cmul(zPower, z);
    }

    return result;
}

/**
 * HSV to RGB color conversion
 * Standard algorithm for mapping hue/saturation/value to RGB
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

/**
 * Domain coloring function
 * Maps complex output to color:
 * - Hue from phase angle (argument)
 * - Brightness from magnitude (modulus)
 */
vec3 domainColor(vec2 w) {
    float magnitude = length(w);
    float phase = atan(w.y, w.x);

    // Brightness: white near zeros (where magnitude → 0)
    // Using inverse relationship so small magnitudes = bright
    float brightness = 1.0 - 1.0 / (1.0 + magnitude * u_brightness);

    // Hue from phase angle, normalized to [0, 1]
    float hue = phase / (2.0 * 3.14159265) + 0.5;

    // Create color with configurable saturation
    return hsv2rgb(vec3(hue, u_saturation, brightness));
}

/**
 * Grid overlay for visual reference
 * Shows unit circle and coordinate axes
 */
float grid(vec2 z, float lineWidth) {
    // Unit circle
    float circle = abs(length(z) - 1.0);
    float circleAlpha = 1.0 - smoothstep(0.0, lineWidth, circle);

    // Axes
    float xAxis = abs(z.y);
    float yAxis = abs(z.x);
    float axisAlpha = 1.0 - smoothstep(0.0, lineWidth * 0.5, min(xAxis, yAxis));

    // Grid lines at integer values
    float gridX = abs(fract(z.x + 0.5) - 0.5);
    float gridY = abs(fract(z.y + 0.5) - 0.5);
    float gridAlpha = 1.0 - smoothstep(0.0, lineWidth * 0.3, min(gridX, gridY));

    return max(max(circleAlpha * 0.3, axisAlpha * 0.2), gridAlpha * 0.1);
}

/**
 * Animated highlight for solution regions
 * Creates a subtle pulsing effect around zeros
 */
float solutionGlow(float magnitude, float time) {
    float pulse = sin(time * 2.0) * 0.5 + 0.5;
    float glow = exp(-magnitude * 3.0) * (0.5 + 0.5 * pulse);
    return glow;
}

void main() {
    // Map pixel coordinates to complex plane
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 z = uv * u_zoom + u_pan;

    // Evaluate polynomial at this point
    vec2 w = evalPoly(z);

    // Get base domain coloring
    vec3 color = domainColor(w);

    // Add solution glow effect
    float glow = solutionGlow(length(w), u_time);
    color = mix(color, vec3(1.0), glow * 0.5);

    // Optional: Add grid overlay
    float lineWidth = 0.02 * u_zoom;
    float gridAlpha = grid(z, lineWidth);
    vec3 gridColor = vec3(1.0, 1.0, 1.0);
    color = mix(color, gridColor, gridAlpha * 0.3);

    // Mouse interaction: highlight region near cursor
    vec2 mouseComplex = (u_mouse - 0.5) * u_zoom * 2.0 + u_pan;
    float mouseDist = length(z - mouseComplex);
    float mouseHighlight = exp(-mouseDist * mouseDist * 2.0) * 0.2;
    color = mix(color, vec3(1.0, 0.9, 0.8), mouseHighlight);

    // Blend with background color for dark theme support
    color = mix(u_backgroundColor, color, 0.95);

    gl_FragColor = vec4(color, 1.0);
}
