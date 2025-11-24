//=============================================================================
// LIQUID LIGHT EFFECT
// Metaball-style organic blobs that merge and separate like a lava lamp
//
// Features:
// - 5 animated organic blobs with varying sizes
// - Mouse-controlled interactive blob
// - Smooth metaball merging using inverse distance fields
// - John Whitney-inspired harmonic motion (never-repeating)
// - Theme-responsive coloring
//
// Based on: Lava lamps, viscous fluid dynamics, oil in water
// Feel: Organic, hypnotic, fluid
//=============================================================================

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

//=============================================================================
// HARMONIC MOTION
// John Whitney-inspired animation using irrational frequency ratios
// Creates organic, never-repeating movement patterns
//=============================================================================

vec2 blobPos(float seed, float time) {
  // Irrational frequency ratios for non-repeating motion
  float phi = 1.618033988749895;
  float sqrt2 = 1.4142135623730951;

  // Combine multiple sine waves for organic movement
  float x = sin(time * 0.2 * phi + seed * 6.28) * 0.3
          + cos(time * 0.15 * sqrt2 + seed * 3.14) * 0.2
          + 0.5;

  float y = cos(time * 0.18 * phi + seed * 4.71) * 0.3
          + sin(time * 0.22 * sqrt2 + seed * 1.57) * 0.2
          + 0.5;

  return vec2(x, y);
}

//=============================================================================
// METABALL FIELD
// Each blob contributes to a field based on inverse distance
// When accumulated field exceeds threshold, surface is visible
//=============================================================================

float blobField(vec2 st, vec2 center, float baseRadius, float time, float seed) {
  // Pulsing radius for organic breathing effect
  float pulse = sin(time * 0.5 + seed * 3.14) * 0.02;
  float radius = baseRadius + pulse;

  // Inverse distance creates smooth metaball blending
  float dist = distance(st, center);
  return radius / max(dist, 0.001); // Prevent division by zero
}

//=============================================================================
// MAIN
//=============================================================================

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Correct aspect ratio for circular blobs
  float aspect = u_resolution.x / u_resolution.y;
  vec2 stCorrected = st;
  stCorrected.x *= aspect;

  // Slow down time for viscous, lava-lamp feel
  float time = u_time * 0.3;

  // Metaball field accumulator
  float field = 0.0;

  //=============================================================================
  // BLOB POSITIONS AND SIZES
  // Each blob has unique seed for movement, base radius, and speed multiplier
  //=============================================================================

  // Blob 1: Large, slow - anchor blob
  vec2 p1 = blobPos(0.0, time);
  p1.x *= aspect;
  field += blobField(stCorrected, p1, 0.12, time, 0.0);

  // Blob 2: Medium
  vec2 p2 = blobPos(0.25, time * 1.1);
  p2.x *= aspect;
  field += blobField(stCorrected, p2, 0.09, time, 0.25);

  // Blob 3: Medium
  vec2 p3 = blobPos(0.5, time * 0.9);
  p3.x *= aspect;
  field += blobField(stCorrected, p3, 0.1, time, 0.5);

  // Blob 4: Small, fast
  vec2 p4 = blobPos(0.75, time * 1.3);
  p4.x *= aspect;
  field += blobField(stCorrected, p4, 0.07, time, 0.75);

  // Blob 5: Tiny accent
  vec2 p5 = blobPos(0.15, time * 1.5);
  p5.x *= aspect;
  field += blobField(stCorrected, p5, 0.05, time, 0.15);

  //=============================================================================
  // MOUSE INTERACTION
  // User-controlled blob for tactile feedback
  //=============================================================================

  vec2 mousePos = u_mouse;
  mousePos.x *= aspect;
  field += blobField(stCorrected, mousePos, 0.08, time, 0.0) * 0.8;

  //=============================================================================
  // METABALL SURFACE RENDERING
  // Threshold creates surface, smoothstep creates soft edges
  //=============================================================================

  float threshold = 1.0;
  float blob = smoothstep(threshold - 0.1, threshold + 0.3, field);

  // Inner glow (brighter center for depth)
  float innerGlow = smoothstep(threshold + 0.2, threshold + 1.0, field);

  //=============================================================================
  // COLOR
  // Blue-pink gradient with subtle position-based rainbow
  //=============================================================================

  // Base blob color: blue edges, pink centers
  vec3 blobColor = mix(
    vec3(0.4, 0.6, 1.0),   // Blue edge
    vec3(0.9, 0.5, 0.7),   // Pink center
    innerGlow
  );

  // Subtle rainbow based on position for visual interest
  vec3 rainbow = vec3(
    sin(stCorrected.x * 3.0 + time) * 0.1,
    sin(stCorrected.y * 3.0 + time + 2.0) * 0.1,
    sin((stCorrected.x + stCorrected.y) * 2.0 + time + 4.0) * 0.1
  );
  blobColor += rainbow;

  //=============================================================================
  // BACKGROUND ADAPTATION
  // Adjust intensity based on background brightness
  //=============================================================================

  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.25, 0.4, bgBrightness);

  // Blend with background
  vec3 finalColor = mix(u_backgroundColor, blobColor, blob * intensity);

  // Add subtle outer glow for softness
  float outerGlow = smoothstep(threshold - 0.5, threshold - 0.1, field);
  finalColor += blobColor * outerGlow * 0.05;

  gl_FragColor = vec4(finalColor, 1.0);
}
