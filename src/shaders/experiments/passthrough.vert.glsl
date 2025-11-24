// Passthrough vertex shader for full-screen quad experiments
// All visual effects happen in fragment shader

varying vec2 vUv;

void main() {
  // Pass UV coordinates to fragment shader
  vUv = uv;

  // Standard position transformation
  gl_Position = vec4(position, 1.0);
}
