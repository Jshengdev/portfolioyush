varying vec3 vViewPosition;
varying float vDistance;

uniform float u_focus;
uniform float u_aperture;
uniform float u_maxBlur;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // View position for fog/depth calculations
  vViewPosition = -mvPosition.xyz;
  vDistance = -mvPosition.z;
  
  // Calculate Circle of Confusion (CoC) for point size
  // CoC = | 1 - focusDistance / distance | * aperture * focalLength
  // Simplified:
  float coc = abs(vDistance - u_focus) * u_aperture;
  coc = clamp(coc, 0.0, u_maxBlur);
  
  // Scale point size by CoC and perspective
  gl_PointSize = (10.0 + coc * 20.0) * (10.0 / vDistance);
}
