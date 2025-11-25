/**
 * Hand Particle System - Vertex Shader v18
 * Renders particles from GPGPU position texture
 */

uniform sampler2D u_positionTexture;
uniform float u_particleSize;
uniform float u_time;

attribute vec2 reference; // UV coordinate into GPGPU texture

varying float vAge;
varying float vAlpha;
varying float vSize;

void main() {
    // Sample position from GPGPU texture
    vec4 posData = texture2D(u_positionTexture, reference);
    vec3 pos = posData.xyz;
    float age = posData.w;

    // Pass to fragment shader
    vAge = age;

    // Fade in at birth, fade out at death
    float fadeIn = smoothstep(0.0, 0.3, age);
    float fadeOut = 1.0 - smoothstep(3.5, 5.0, age);
    vAlpha = fadeIn * fadeOut;

    // Size variation based on age
    float ageSizeFactor = 1.0 - age * 0.1;
    vSize = u_particleSize * ageSizeFactor;

    // Project position
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size with distance attenuation
    float sizeAttenuation = 300.0 / max(-mvPosition.z, 1.0);
    gl_PointSize = vSize * sizeAttenuation;

    // Ensure minimum visibility
    gl_PointSize = max(gl_PointSize, 1.0);
}
