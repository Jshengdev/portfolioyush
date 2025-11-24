//=============================================================================
// AURORA BOREALIS SHADER
// V1 Experiment: Flowing vertical color bands like northern lights
//
// Visual Goals:
// - Soft, flowing horizontal bands
// - Movement feels like curtains of light
// - Green → Cyan → Purple color progression
// - Very slow, hypnotic animation
// - Mouse gently influences band shapes
//
// Base Uniforms (from BaseExperimentShader):
// - u_time: float (incrementing time in seconds)
// - u_resolution: vec2 (window width, height in pixels)
// - u_mouse: vec2 (normalized mouse position, 0-1)
// - u_backgroundColor: vec3 (theme-based: black or white)
//=============================================================================

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

//=============================================================================
// HASH & NOISE FUNCTIONS
//=============================================================================

/**
 * Simple 2D hash function
 * Generates a pseudo-random value from 2D coordinates.
 */
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

/**
 * Value noise - smooth interpolated random values
 * Creates coherent noise by interpolating hash values at grid corners.
 */
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Sample hash at four corners of the cell
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // Smooth interpolation using cubic Hermite curve
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

//=============================================================================
// MAIN FRAGMENT SHADER
//=============================================================================

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.1; // Very slow movement for hypnotic effect

  // Aurora bands accumulator
  float aurora = 0.0;

  // Create 4 layered bands with organic movement
  for (float i = 0.0; i < 4.0; i++) {
    // Base vertical position for each band
    float yBase = 0.3 + i * 0.15;

    // Horizontal wave deformation - creates curtain-like movement
    float wave = sin(st.x * 4.0 + time * (1.0 + i * 0.3)) * 0.08;
    wave += sin(st.x * 7.0 - time * 1.5 + i) * 0.04;

    // Add noise for organic, unpredictable feel
    float n = noise(vec2(st.x * 3.0 + time * 0.5, i * 10.0)) * 0.1;

    // Calculate vertical band position with deformation
    float bandY = yBase + wave + n;

    // Create soft-edged band using smoothstep
    float band = smoothstep(0.12, 0.0, abs(st.y - bandY));

    // Intensity falloff per band - front bands brighter
    aurora += band * (1.0 - i * 0.2) * 0.6;
  }

  // Mouse influence - gently attract aurora toward cursor
  float mouseInfluence = smoothstep(0.5, 0.0, distance(st, u_mouse));
  aurora *= (0.8 + mouseInfluence * 0.4);

  // Aurora color palette (green → cyan → purple)
  vec3 color1 = vec3(0.1, 0.9, 0.4);  // Vibrant green
  vec3 color2 = vec3(0.2, 0.7, 0.9);  // Electric cyan
  vec3 color3 = vec3(0.6, 0.2, 0.9);  // Deep purple

  // Dynamic color mixing based on vertical position and time
  float colorMix = st.y + sin(time * 0.5) * 0.2;
  vec3 auroraColor = mix(
    mix(color1, color2, smoothstep(0.3, 0.5, colorMix)),
    color3,
    smoothstep(0.5, 0.8, colorMix)
  );

  // Adaptive intensity based on background brightness
  // Dark backgrounds: subtle aurora (25% intensity)
  // Light backgrounds: stronger aurora (40% intensity)
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.25, 0.4, bgBrightness);

  // Blend aurora with background color
  vec3 finalColor = mix(u_backgroundColor, auroraColor, aurora * intensity);

  // Output fully opaque
  gl_FragColor = vec4(finalColor, 1.0);
}
