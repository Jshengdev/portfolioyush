varying float vDistance;
uniform float u_focus;
uniform float u_aperture;
uniform float u_maxBlur;

// Pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Soft circle shape
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  
  if (dist > 0.5) discard;
  
  // Sharper edge for "high contrast" look
  float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
  
  // Calculate blur amount
  float coc = abs(vDistance - u_focus) * u_aperture;
  coc = clamp(coc, 0.0, u_maxBlur);
  
  // Make out-of-focus points more transparent
  float blurAlpha = 1.0 / (1.0 + coc * 2.0); // Sharper falloff
  
  // --- Grain / Noise ---
  // Screen-space noise for "sharpness"
  float noise = random(gl_FragCoord.xy * 0.01); // High frequency
  
  // Boost contrast of the noise
  noise = smoothstep(0.2, 0.8, noise);
  
  // Combine:
  // - Base alpha (circle shape)
  // - Blur alpha (depth of field)
  // - Noise (texture)
  
  float finalAlpha = alpha * blurAlpha;
  
  // Apply noise: modulate opacity to create "dissolve" look
  finalAlpha *= (0.5 + 0.5 * noise);
  
  // Boost contrast: make brights brighter, darks darker
  finalAlpha = pow(finalAlpha, 1.5);
  
  // Color: Pure white with noise variation
  vec3 color = vec3(1.0);
  // Subtle tinting based on noise for "gritty" feel
  color -= vec3(0.1) * (1.0 - noise);

  gl_FragColor = vec4(color, finalAlpha);
}
