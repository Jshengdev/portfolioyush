//=============================================================================
// UNIFORMS
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_lightPos;
uniform vec2 u_mouse;
uniform float u_depth;   // Depth attribute (0.0-1.0) for layer blending
uniform float u_focus;   // Focus/sharpness attribute (0.0-1.0)
uniform vec3 u_backgroundColor;

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

/**
 * Multi-layer noise for perceived depth
 * SANAA principle: "Many transparent layers create opacity"
 *
 * @param st - UV coordinates
 * @param depth - Depth attribute (0.0-1.0)
 * @param time - Animated time value
 * @return float - Blended noise value
 */
float layeredNoise(vec2 st, float depth, float time) {
  // Layer 1: Large slow forms (background)
  float layer1 = noise(st * 2.0 + time * 0.05);

  // Layer 2: Medium detail (mid-ground)
  float layer2 = noise(st * 4.0 + time * 0.08);

  // Layer 3: Fine detail (foreground)
  float layer3 = noise(st * 8.0 + time * 0.12);

  // Weighted blending based on depth attribute
  // Low depth (0.0) = mostly layer 1 (flat)
  // High depth (1.0) = all layers (dimensional)
  float weight1 = 1.0;
  float weight2 = depth * 0.5;
  float weight3 = depth * depth * 0.3; // Quadratic for subtle foreground

  float totalWeight = weight1 + weight2 + weight3;

  return (layer1 * weight1 + layer2 * weight2 + layer3 * weight3) / totalWeight;
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

  // --- PART A: MULTI-LAYER PATTERN + PARALLAX ---
  // Parallax offset based on mouse and depth
  vec2 parallaxOffset = (u_mouse - 0.5) * u_depth * 0.05;
  vec2 st_parallax = st + parallaxOffset;

  // Multi-layer noise system
  float layeredPattern = layeredNoise(st_parallax, u_depth, u_time);

  // Apply focus attribute (sharpness)
  float contrast = 0.5 + (u_focus * 0.5); // 0.5-1.0 range
  layeredPattern = pow(layeredPattern, 1.0 / contrast);

  // Shift + scale for additional effects
  vec2 stTile = st - vec2(0.33, 0.4);
  stTile *= 3.5;

  // Sphere near the mouse (radius=0.0 => small effect)
  float sphereEf = sphere(stTile, u_mouse, 0.0);

  // Lighting
  vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
  vec3 lightDir = normalize(vec3(u_lightPos - u_mouse, 0.2));
  float lightVal = lightEffect(normal, lightDir);

  // Combine layered pattern with lighting
  vec3 patternColor = vec3(layeredPattern * lightVal);

  // Keep Truchet as subtle overlay (optional)
  vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
  vec3 truchetOverlay = vec3(tVal.x * tVal.y) * 0.1; // Very subtle

  // Tile color combines pattern, overlay, and sphere effect
  vec3 tileColor = patternColor + truchetOverlay + vec3(sphereEf);

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
