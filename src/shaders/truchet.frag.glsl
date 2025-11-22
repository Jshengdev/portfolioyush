//=============================================================================
// UNIFORMS
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_lightPos;
uniform vec2 u_mouse;

// Cursor trail system (Gmunk-inspired light sculpting)
uniform int u_trailCount;
uniform vec2 u_trailPositions[10];
uniform float u_trailStrengths[10];

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
// 4) CURSOR TRAIL LIGHT INFLUENCE

/**
 * Calculate cursor trail light influence at given position
 * Gmunk-inspired: cursor deposits light that decays over time
 *
 * @param pos - Current fragment position
 * @return float - Light intensity (0.0-1.0)
 */
float getCursorTrailInfluence(vec2 pos) {
  float totalInfluence = 0.0;

  for (int i = 0; i < 10; i++) {
    if (i >= u_trailCount) break;

    vec2 trailPos = u_trailPositions[i];
    float strength = u_trailStrengths[i];

    // Distance from trail point
    float dist = distance(pos, trailPos);

    // Influence radius (0.15 = ~15% of screen)
    float radius = 0.15;

    // Smooth falloff
    float influence = smoothstep(radius, 0.0, dist) * strength;

    totalInfluence += influence;
  }

  // Clamp to reasonable range
  return min(totalInfluence, 1.0);
}

//=============================================================================
// 5) MAIN FRAGMENT: COMBINE EVERYTHING

void main() {
  // Normalize screen coordinates
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // --- PART A: TRUCHET + SPHERE + LIGHTING ---
  // Shift + scale
  vec2 stTile = st - vec2(0.33, 0.4);
  stTile *= 3.5;

  // Truchet pattern
  vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));

  // Sphere near the mouse (radius=0.0 => small effect)
  float sphereEf = sphere(stTile, u_mouse, 0.0);

  // Lighting
  vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
  vec3 lightDir = normalize(vec3(u_lightPos - u_mouse, 0.2));
  float lightVal = lightEffect(normal, lightDir);

  // Cursor trail influence (Gmunk light sculpting)
  float trailGlow = getCursorTrailInfluence(st);

  // Tile color with trail glow
  vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);
  tileColor += vec3(trailGlow * 0.3); // Subtle additive glow

  // --- PART B: HOLLOW BOX (square ring) ---
  float ringVal = hollowBox(
    st,
    vec2(0.5, 0.5),
    0.25,  // halfSize => 0.5 total
    0.03   // thickness
  );

  // ringVal = 1 => ring region, 0 => outside ring

  // Negative space ring => black ring
  float shapeMask = 1.0 - ringVal;
  vec3 finalColor = tileColor * shapeMask;

  // Output
  gl_FragColor = vec4(finalColor, 0.5); // lower opacity
}
