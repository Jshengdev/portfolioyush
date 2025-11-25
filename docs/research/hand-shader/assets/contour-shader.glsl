/**
 * Contour Line Fragment Shader
 * Core algorithm for topographic contour lines
 */

#extension GL_OES_standard_derivatives : enable

precision highp float;

// Uniforms
uniform float u_time;
uniform sampler2D u_depthMap;
uniform float u_contour_interval;
uniform float u_contour_thickness;
uniform float u_contour_alpha;
uniform vec3 u_contour_color;
uniform bool u_showContours;
uniform int u_debugMode;

// Varyings
varying vec2 vUv;
varying float vHeight;

// ============================================
// CONTOUR LINE CALCULATION
// ============================================

/**
 * Calculate contour line visibility at current fragment
 * Returns 1.0 where line should be drawn, 0.0 elsewhere
 */
float calculateContour(float height, float interval, float thickness) {
    // Normalize height to intervals
    float step = height / interval;

    // Get fractional part (creates repeating 0-1 pattern at each interval)
    float f = fract(step);

    // Screen-space derivative for consistent line width
    float df = fwidth(step);

    // Anti-aliased edge detection (both sides of line band)
    float line = smoothstep(df * 0.5, df * (0.5 + thickness), f);
    line *= smoothstep(df * (1.5 - thickness), df * 1.5, f);

    // Invert: 1.0 = line, 0.0 = no line
    return 1.0 - line;
}

/**
 * Variation: Variable thickness based on depth
 * Thicker lines in valleys, thinner on peaks
 */
float calculateContourVariable(float height, float interval, float minThickness, float maxThickness) {
    float thickness = mix(maxThickness, minThickness, height);
    return calculateContour(height, interval, thickness);
}

/**
 * Variation: Animated contours (wave effect)
 */
float calculateContourAnimated(float height, float interval, float thickness, float time, float speed) {
    float animatedHeight = height + sin(time * speed) * interval * 0.2;
    return calculateContour(animatedHeight, interval, thickness);
}

// ============================================
// MAIN
// ============================================

void main() {
    // Sample depth
    float depth = texture2D(u_depthMap, vUv).r;

    // Skip fully transparent areas
    if (depth < 0.01) discard;

    // Debug mode: show raw depth
    if (u_debugMode == 3) {
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }

    // Calculate contour
    float contour = 0.0;
    if (u_showContours) {
        contour = calculateContour(depth, u_contour_interval, u_contour_thickness);
    }

    // Debug mode: show only contours
    if (u_debugMode == 1) {
        gl_FragColor = vec4(vec3(contour), 1.0);
        return;
    }

    // Output
    vec3 color = u_contour_color;
    float alpha = contour * u_contour_alpha;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color, alpha);
}
