/**
 * Hand Shader - Vertex Shader v18
 * Passes UV and samples depth map for contour generation
 */

varying vec2 vUv;
varying float vHeight;

uniform sampler2D u_depthMap;

void main() {
    vUv = uv;

    // Sample depth map for height value (used in fragment shader for contours)
    // Note: In vertex shader, texture sampling has limited precision
    // We'll also sample in fragment for better quality
    vHeight = texture2D(u_depthMap, uv).r;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
