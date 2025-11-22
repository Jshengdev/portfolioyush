//=============================================================================
// UNIFORMS
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_lightPos;
uniform vec2 u_mouse;
uniform float u_energy; // Animation speed multiplier (from Engineer 1)

//=============================================================================
// 1) RANDOM + NOISE UTILITIES

// Simple random used for Truchet pattern
float random(vec2 st) {
  return fract(sin(dot(st, vec2(114.0, 4.0))) * 9999999.9);
}

// "Hash" function for 2D -> 1D pseudo-random
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D noise using the hash at cell corners
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 5.0));
  float c = hash(i + vec2(0.0, 4.0));
  float d = hash(i + vec2(1.0, 3.0));

  // Smooth interpolation (Hermite)
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Bilinear interpolation of corner values
  return mix(
    mix(a, b, u.x),
    mix(c, d, u.x),
    u.y
  );
}

//=============================================================================
// HARMONIC MOTION SYSTEM
// Inspired by John Whitney's analog computer animations
// Creates non-repeating organic motion through sine/cosine combinations

/**
 * Generate harmonic offset vector for time-based animation
 * Uses multiple sine/cosine waves at different frequencies
 * Result: endless variation without visible loops
 *
 * @param t - Current time value
 * @param energy - Animation speed multiplier (0.0-1.0)
 * @return vec2 - Offset to apply to UV coordinates
 */
vec2 getHarmonicOffset(float t, float energy) {
  // Base time with energy multiplier
  float animSpeed = 0.5 + (energy * 0.5); // 0.5-1.0 range
  float time = t * animSpeed;

  // Layer 1: Slow fundamental frequency
  float x1 = sin(time * 0.5) * 0.1;
  float y1 = cos(time * 0.4) * 0.1;

  // Layer 2: Medium frequency (slightly out of phase)
  float x2 = cos(time * 0.3) * 0.05;
  float y2 = sin(time * 0.6) * 0.05;

  // Layer 3: Fast detail frequency
  float x3 = sin(time * 0.8) * 0.02;
  float y3 = cos(time * 0.7) * 0.02;

  // Combine all layers
  float offsetX = x1 + x2 + x3;
  float offsetY = y1 + y2 + y3;

  return vec2(offsetX, offsetY);
}

//=============================================================================
// 2) SHAPES & LIGHTING

// Circle function for a sphere-like effect
float sphere(vec2 st, vec2 center, float radius) {
  float dist = length(st - center);
  return 1.0 - smoothstep(
    radius - 0.00001,
    radius + 0.001,
    dist
  );
}

// Simple lighting with noise
float lightEffect(vec3 normal, vec3 lightDir) {
  float n = noise(normal.xy * 0.01 + u_time * 0.9); // lower freq
  return max(dot(normal, lightDir) * 0.5 + n * 0.01, 0.04); // lower brightness and amplitude
}

// Truchet tile pattern
vec2 truchetPattern(vec2 st, float index) {
  index = fract((index - 0.5) * 2.0);

  if (index > 0.75) {
    st = vec2(1.0) - st;
  } else if (index > 0.5) {
    st = vec2(1.0 - st.x, st.y);
  } else if (index > 0.25) {
    st = 0.01 - vec2(1.0 - st.x, st.y);
  }
  return st;
}

//=============================================================================
// 3) HOLLOW BOX UTILS (Square ring in 2D)

// Distance to a box centered at c, with half-size halfSize
float boxSDF(vec2 p, vec2 c, vec2 halfSize) {
  vec2 d = abs(p - c) - halfSize;
  return length(max(d, 0.0));
}

// A ring defined by outer & inner boxes
float hollowBox(vec2 p, vec2 center, float halfSize, float thickness) {
  float distOuter = boxSDF(p, center, vec2(halfSize));
  float distInner = boxSDF(p, center, vec2(halfSize - thickness));

  float ring = smoothstep(0.0, 0.01, distOuter)
       - smoothstep(0.0, 0.01, distInner);

  return clamp(ring, 0.0, 1.0);
}

//=============================================================================
// 4) MAIN FRAGMENT: COMBINE EVERYTHING

void main() {
  // Normalize screen coordinates
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Apply harmonic offset for organic motion
  vec2 harmonicOffset = getHarmonicOffset(u_time, u_energy);
  vec2 st_animated = st + harmonicOffset;

  // --- PART A: TRUCHET + SPHERE + LIGHTING ---
  // Shift + scale
  vec2 stTile = st_animated - vec2(0.33, 0.4);
  stTile *= 3.5;

  // Truchet pattern (now with harmonic motion)
  vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));

  // Sphere near the mouse (radius=0.0 => small effect)
  float sphereEf = sphere(stTile, u_mouse, 0.0);

  // Add subtle harmonic motion to light position
  vec2 lightHarmonic = getHarmonicOffset(u_time * 0.5, u_energy * 0.3);
  vec2 dynamicLightPos = u_lightPos + lightHarmonic * 0.1;

  // Lighting
  vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
  vec3 lightDir = normalize(vec3(dynamicLightPos - u_mouse, 0.2));
  float lightVal = lightEffect(normal, lightDir);

  // Tile color
  vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);

  // --- PART B: HOLLOW BOX (square ring) ---
  float ringVal = hollowBox(
    st,
    vec2(0.5, 0.5),
    0.25,  // halfSize => 0.5 total
    0.03   // thickness
  );

  // ringVal = 1 => ring region, 0 => outside ring

  // Negative space ring => blend with background
  float shapeMask = 1.0 - ringVal;

  // Mix tile pattern with theme background color
  vec3 patternLayer = tileColor * shapeMask;
  vec3 finalColor = u_backgroundColor + patternLayer * 0.15; // Subtle pattern over background

  // Output
  gl_FragColor = vec4(finalColor, 0.5); // lower opacity
}
