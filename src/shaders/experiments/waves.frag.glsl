// Gradient Waves Effect
// Subtle horizontal waves with smooth color transitions
// Inspired by calm water, meditation apps, and zen aesthetics

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.08; // Very slow, meditative pace

  // Base wave layers
  float wave = 0.0;

  // Layer 1: Primary slow wave
  wave += sin(st.y * 3.0 + time + sin(st.x * 2.0 + time * 0.5) * 0.5) * 0.3;

  // Layer 2: Secondary wave (different frequency)
  wave += sin(st.y * 5.0 - time * 0.7 + cos(st.x * 3.0 + time * 0.3) * 0.3) * 0.2;

  // Layer 3: Subtle detail wave
  wave += sin(st.y * 8.0 + time * 1.2 + sin(st.x * 4.0 - time * 0.4) * 0.2) * 0.1;

  // Layer 4: Very fine ripple
  wave += sin(st.y * 12.0 - time * 0.5 + st.x * 5.0) * 0.05;

  // Normalize to 0-1 range
  wave = wave * 0.5 + 0.5;

  // Mouse creates gentle ripple
  float mouseDist = distance(st, u_mouse);
  float mouseRipple = sin(mouseDist * 20.0 - time * 3.0) * 0.1;
  mouseRipple *= smoothstep(0.4, 0.0, mouseDist); // Fade with distance
  wave += mouseRipple;

  // Color palette - soft gradient colors
  vec3 color1 = vec3(0.6, 0.7, 0.9);   // Soft blue
  vec3 color2 = vec3(0.7, 0.6, 0.85);  // Soft purple
  vec3 color3 = vec3(0.65, 0.8, 0.75); // Soft teal

  // Mix colors based on wave position and time
  float colorMix = wave + sin(time * 0.2) * 0.2;
  vec3 waveColor = mix(
    mix(color1, color2, smoothstep(0.3, 0.6, colorMix)),
    color3,
    smoothstep(0.5, 0.8, colorMix + st.x * 0.2)
  );

  // Determine intensity based on background brightness
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;

  // Adjust intensity for theme
  float intensity;
  if (bgBrightness < 0.5) {
    // Dark mode: subtle light waves
    intensity = 0.15;
  } else {
    // Light mode: subtle dark waves
    waveColor = mix(waveColor, vec3(0.3, 0.4, 0.5), 0.5);
    intensity = 0.1;
  }

  // Apply wave effect
  float waveIntensity = smoothstep(0.3, 0.7, wave) * intensity;

  // Blend with background
  vec3 finalColor = mix(u_backgroundColor, waveColor, waveIntensity);

  // Add very subtle highlight on wave peaks
  float highlight = smoothstep(0.6, 0.75, wave) * 0.03;
  finalColor += vec3(highlight);

  gl_FragColor = vec4(finalColor, 1.0);
}
