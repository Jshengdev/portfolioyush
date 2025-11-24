//=============================================================================
// LIGHT BLOOM EFFECT
// Soft drifting circular glows like camera bokeh lights
//
// Visual Goals:
// - 4-6 soft circular glows drifting across screen
// - Each glow has different size, color, speed
// - Movement is smooth and non-repeating (harmonic)
// - Glows overlap to create additive brightness
// - Mouse acts as an additional light source
// - Camera bokeh / out-of-focus lights aesthetic
//=============================================================================

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

//=============================================================================
// SOFT CIRCLE FUNCTION
// Creates a soft circular gradient with configurable falloff
//=============================================================================

float softCircle(vec2 st, vec2 center, float radius, float softness) {
  float dist = distance(st, center);
  return smoothstep(radius + softness, radius - softness, dist);
}

//=============================================================================
// HARMONIC POSITION GENERATOR
// John Whitney-inspired non-repeating animation using irrational frequency ratios
// Creates organic, never-exactly-repeating drift patterns
//=============================================================================

vec2 harmonicPos(float seed, float time) {
  // Golden ratio and other irrational numbers for non-repeating patterns
  float phi = 1.618033988749895;
  float sqrt2 = 1.4142135623730951;
  float pi_4 = 0.7853981633974483;

  // Compose multiple sine waves at irrational frequency ratios
  float x = sin(time * 0.3 * phi + seed * 6.28) * 0.3
          + sin(time * 0.5 * sqrt2 + seed * 3.14) * 0.15
          + 0.5;

  float y = cos(time * 0.4 * phi + seed * 4.71) * 0.25
          + cos(time * 0.35 * sqrt2 + seed * 1.57) * 0.15
          + 0.5;

  return vec2(x, y);
}

//=============================================================================
// MAIN
//=============================================================================

void main() {
  // Normalize coordinates to 0-1 range
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Slow down time for gentle, dreamy movement
  float time = u_time * 0.15;

  // Accumulated glow and color
  float glow = 0.0;
  vec3 glowColor = vec3(0.0);

  //===========================================================================
  // LIGHT SOURCES
  // Each light has: seed, radius, softness, color, intensity
  //===========================================================================

  // Light 1: Large warm glow - primary focal point
  vec2 pos1 = harmonicPos(0.0, time);
  float g1 = softCircle(st, pos1, 0.25, 0.2);
  glowColor += vec3(1.0, 0.8, 0.6) * g1 * 0.4;  // Warm orange-gold
  glow += g1;

  // Light 2: Medium cool glow - balance to warm
  vec2 pos2 = harmonicPos(0.33, time * 1.1);
  float g2 = softCircle(st, pos2, 0.18, 0.15);
  glowColor += vec3(0.6, 0.8, 1.0) * g2 * 0.35;  // Cool blue
  glow += g2;

  // Light 3: Small accent - adds color interest
  vec2 pos3 = harmonicPos(0.66, time * 0.9);
  float g3 = softCircle(st, pos3, 0.12, 0.1);
  glowColor += vec3(1.0, 0.6, 0.8) * g3 * 0.3;  // Pink accent
  glow += g3;

  // Light 4: Tiny sparkle - fine detail
  vec2 pos4 = harmonicPos(0.5, time * 1.3);
  float g4 = softCircle(st, pos4, 0.08, 0.06);
  glowColor += vec3(0.9, 1.0, 0.8) * g4 * 0.25;  // Light green-yellow
  glow += g4;

  // Light 5: Background ambient - fills space
  vec2 pos5 = harmonicPos(0.15, time * 0.7);
  float g5 = softCircle(st, pos5, 0.35, 0.3);
  glowColor += vec3(0.8, 0.7, 1.0) * g5 * 0.2;  // Soft purple
  glow += g5;

  // Light 6: Secondary accent - additional depth
  vec2 pos6 = harmonicPos(0.82, time * 0.85);
  float g6 = softCircle(st, pos6, 0.14, 0.12);
  glowColor += vec3(0.7, 0.9, 0.85) * g6 * 0.28;  // Soft teal
  glow += g6;

  //===========================================================================
  // MOUSE INTERACTIVE LIGHT
  // User-controlled light source for engagement
  //===========================================================================

  float mouseGlow = softCircle(st, u_mouse, 0.15, 0.12);
  glowColor += vec3(1.0, 0.95, 0.9) * mouseGlow * 0.5;  // Warm white
  glow += mouseGlow;

  //===========================================================================
  // COLOR NORMALIZATION
  // Prevent over-saturation when glows overlap
  //===========================================================================

  if (glow > 0.01) {
    glowColor /= glow;
  }

  //===========================================================================
  // THEME-ADAPTIVE INTENSITY
  // Adjust intensity based on background brightness
  // Dark backgrounds: subtle glows (0.2 intensity)
  // Light backgrounds: stronger glows (0.35 intensity)
  //===========================================================================

  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.2, 0.35, bgBrightness);

  //===========================================================================
  // FINAL BLEND
  // Mix glow colors with background
  //===========================================================================

  vec3 finalColor = mix(u_backgroundColor, glowColor, glow * intensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
