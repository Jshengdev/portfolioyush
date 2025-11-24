//=============================================================================
// FOG/MIST EFFECT
// Layered translucent clouds with depth perception
// V2 Shader Experiment
//=============================================================================

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

//=============================================================================
// HASH & NOISE UTILITIES

// Hash function for pseudo-random values
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Smooth 2D noise using hash at cell corners
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // Smooth interpolation (Hermite curve)
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

//=============================================================================
// FRACTAL BROWNIAN MOTION
// Creates natural cloud-like shapes through layered noise

float fbm(vec2 st, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

//=============================================================================
// MAIN FRAGMENT SHADER

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.02; // Very slow drift for calming effect

  // Accumulated fog from multiple layers (parallax depth)
  float fog = 0.0;

  //--- Layer 1: Far background (slowest, largest shapes) ---
  vec2 st1 = st * 1.5 + vec2(time * 0.3, time * 0.1);
  float layer1 = fbm(st1, 4);
  fog += layer1 * 0.4;

  //--- Layer 2: Mid-ground (medium speed and detail) ---
  vec2 st2 = st * 2.5 + vec2(time * 0.5, -time * 0.2);
  float layer2 = fbm(st2, 5);
  fog += layer2 * 0.3;

  //--- Layer 3: Near foreground (fastest, finest detail) ---
  vec2 st3 = st * 4.0 + vec2(time * 0.8, time * 0.15);
  float layer3 = fbm(st3, 6);
  fog += layer3 * 0.2;

  //--- Layer 4: Wispy detail overlay ---
  vec2 st4 = st * 6.0 + vec2(-time * 0.4, time * 0.3);
  float layer4 = fbm(st4, 3);
  fog += layer4 * 0.1;

  //--- Mouse interaction: gentle "parting" effect ---
  // Fog parts slightly around the cursor position
  float mouseDist = distance(st, u_mouse);
  float parting = smoothstep(0.0, 0.3, mouseDist);
  fog *= (0.7 + parting * 0.3);

  //--- Theme-aware coloring ---
  // Determine if dark or light mode based on background brightness
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;

  vec3 effectColor;
  float intensity;

  if (bgBrightness < 0.5) {
    // Dark mode: lighter fog on dark background (white/grey mist)
    effectColor = vec3(0.9, 0.92, 0.95);
    intensity = fog * 0.15;
  } else {
    // Light mode: darker fog on light background (grey mist)
    effectColor = vec3(0.5, 0.55, 0.6);
    intensity = fog * 0.12;
  }

  // Blend fog with background
  vec3 finalColor = mix(u_backgroundColor, effectColor, intensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
