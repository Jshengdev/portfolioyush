/**
 * Hand Particle System - Fragment Shader v18
 * Renders soft, glowing particles
 */

precision highp float;

uniform vec3 u_particleColor;
uniform float u_time;

varying float vAge;
varying float vAlpha;
varying float vSize;

void main() {
    // Skip dead particles
    if (vAlpha < 0.01) {
        discard;
    }

    // Circular shape with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    // Hard circle cutoff
    if (dist > 0.5) {
        discard;
    }

    // Soft edge falloff
    float softness = smoothstep(0.5, 0.15, dist);

    // Color shift based on age (white -> blue as ages)
    vec3 youngColor = vec3(1.0, 1.0, 1.0);
    vec3 oldColor = u_particleColor;
    vec3 color = mix(youngColor, oldColor, vAge * 0.15);

    // Subtle sparkle effect
    float sparkle = sin(vAge * 10.0 + u_time * 5.0) * 0.1 + 0.9;
    color *= sparkle;

    // Final alpha
    float alpha = softness * vAlpha;

    gl_FragColor = vec4(color, alpha);
}
