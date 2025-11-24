//=============================================================================
// COMMON GLSL UTILITIES FOR SHADER EXPERIMENTS
//
// This file contains shared utility functions for all experimental shaders.
// Since Vite doesn't support GLSL imports natively, these functions should
// be copy-pasted into each shader that needs them, or concatenated during
// the build process.
//
// Categories:
//   1. Hash Functions - Pseudo-random number generation
//   2. Noise Functions - Value noise and fractal patterns
//   3. Math Utilities - Common mathematical operations
//   4. Color Utilities - Color space conversions and blending
//
// Usage: Copy the functions you need into your fragment shader.
//=============================================================================

//=============================================================================
// 1) HASH FUNCTIONS
// Generate pseudo-random values from input coordinates.
// Useful for procedural textures, noise, and randomization.
//=============================================================================

/**
 * Simple 2D hash function
 * Generates a pseudo-random value from 2D coordinates.
 * Uses classic sin-fract method for fast computation.
 *
 * @param p - Input 2D coordinates
 * @return float - Pseudo-random value in range [0.0, 1.0)
 */
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

/**
 * Alternative 2D hash with different magic numbers
 * Provides a different distribution than hash().
 * Useful when you need multiple uncorrelated random streams.
 *
 * @param p - Input 2D coordinates
 * @return float - Pseudo-random value in range [0.0, 1.0)
 */
float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

/**
 * 3D hash function for volumetric effects
 * Extends the hash concept to 3D inputs.
 *
 * @param p - Input 3D coordinates
 * @return float - Pseudo-random value in range [0.0, 1.0)
 */
float hash31(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}

/**
 * 2D to 2D hash - returns pseudo-random 2D vector
 * Useful for displacement and direction fields.
 *
 * @param p - Input 2D coordinates
 * @return vec2 - Pseudo-random 2D vector, each component in [0.0, 1.0)
 */
vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

//=============================================================================
// 2) NOISE FUNCTIONS
// Generate smooth, continuous pseudo-random patterns.
// Foundation for organic textures and procedural effects.
//=============================================================================

/**
 * Value noise - smooth interpolated random values
 * Creates coherent noise by interpolating hash values at grid corners.
 * Uses cubic Hermite interpolation for smoothness.
 *
 * @param st - Input 2D coordinates (texture space)
 * @return float - Noise value in range [0.0, 1.0]
 */
float noise(vec2 st) {
  vec2 i = floor(st);  // Integer part (grid cell)
  vec2 f = fract(st);  // Fractional part (position within cell)

  // Sample hash at four corners of the cell
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // Smooth interpolation using cubic Hermite curve (3t^2 - 2t^3)
  // This eliminates discontinuities at cell boundaries
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Bilinear interpolation of corner values
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

/**
 * Fractal Brownian Motion (fBm)
 * Layered noise for natural-looking detail at multiple scales.
 * Each octave adds finer detail with decreasing amplitude.
 *
 * @param st - Input 2D coordinates
 * @param octaves - Number of noise layers (more = finer detail, slower)
 * @return float - fBm value, approximately in range [0.0, 1.0]
 *
 * Common octave counts:
 *   2-3: Soft clouds, gentle gradients
 *   4-5: Terrain, smoke, general purpose
 *   6-8: Highly detailed, fractal-like
 */
float fbm(vec2 st, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  float maxValue = 0.0;  // For normalization

  for (int i = 0; i < 8; i++) {  // Max 8 octaves (GLSL loop limitation)
    if (i >= octaves) break;

    value += amplitude * noise(st * frequency);
    maxValue += amplitude;

    frequency *= 2.0;   // Double frequency each octave
    amplitude *= 0.5;   // Halve amplitude each octave (persistence)
  }

  return value / maxValue;  // Normalize to [0, 1]
}

/**
 * Domain-warped fBm for more organic patterns
 * Applies fBm to distort the coordinates before final fBm.
 * Creates swirly, flowing patterns.
 *
 * @param st - Input 2D coordinates
 * @param octaves - Number of octaves for both passes
 * @param warpAmount - How much to distort (0.0 = none, 1.0+ = heavy)
 * @return float - Warped noise value
 */
float warpedFbm(vec2 st, int octaves, float warpAmount) {
  // First fBm pass for distortion
  vec2 warp = vec2(
    fbm(st + vec2(0.0, 0.0), octaves),
    fbm(st + vec2(5.2, 1.3), octaves)
  );

  // Second fBm with warped coordinates
  return fbm(st + warp * warpAmount, octaves);
}

//=============================================================================
// 3) MATH UTILITIES
// Common mathematical operations for shader effects.
//=============================================================================

/**
 * Smooth minimum (polynomial)
 * Blends between two values smoothly near their intersection.
 * Essential for metaballs and organic shape blending.
 *
 * @param a - First value
 * @param b - Second value
 * @param k - Blend radius (0.0 = sharp min, larger = smoother blend)
 * @return float - Smooth minimum of a and b
 *
 * Example: Metaball distance fields
 *   float d1 = length(p - center1) - radius1;
 *   float d2 = length(p - center2) - radius2;
 *   float combined = smin(d1, d2, 0.5);
 */
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

/**
 * Smooth maximum (polynomial)
 * Opposite of smin - smooth blend for maximum.
 *
 * @param a - First value
 * @param b - Second value
 * @param k - Blend radius
 * @return float - Smooth maximum of a and b
 */
float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}

/**
 * 2D rotation matrix
 * Creates a rotation transformation matrix.
 *
 * @param angle - Rotation angle in radians
 * @return mat2 - 2x2 rotation matrix
 *
 * Usage: vec2 rotated = rotate2d(PI / 4.0) * originalPoint;
 */
mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

/**
 * Remap value from one range to another
 * Linear interpolation between input and output ranges.
 *
 * @param value - Input value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @return float - Remapped value
 *
 * Example: remap(0.5, 0.0, 1.0, -1.0, 1.0) returns 0.0
 */
float remap(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

/**
 * Clamped remap - same as remap but clamps output to range
 *
 * @param value - Input value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @return float - Remapped and clamped value
 */
float remapClamped(float value, float inMin, float inMax, float outMin, float outMax) {
  float t = clamp((value - inMin) / (inMax - inMin), 0.0, 1.0);
  return mix(outMin, outMax, t);
}

/**
 * Signed distance to a circle
 * Returns negative inside, positive outside, zero on edge.
 *
 * @param p - Point to test
 * @param center - Circle center
 * @param radius - Circle radius
 * @return float - Signed distance (negative = inside)
 */
float sdCircle(vec2 p, vec2 center, float radius) {
  return length(p - center) - radius;
}

/**
 * Signed distance to a box (axis-aligned)
 *
 * @param p - Point to test
 * @param center - Box center
 * @param halfSize - Half dimensions of box
 * @return float - Signed distance (negative = inside)
 */
float sdBox(vec2 p, vec2 center, vec2 halfSize) {
  vec2 d = abs(p - center) - halfSize;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

/**
 * Signed distance to a line segment
 *
 * @param p - Point to test
 * @param a - Line start point
 * @param b - Line end point
 * @return float - Distance to line segment
 */
float sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

//=============================================================================
// 4) COLOR UTILITIES
// Color space conversions and blending operations.
//=============================================================================

/**
 * HSV to RGB color conversion
 * Converts hue-saturation-value to red-green-blue.
 *
 * @param c - HSV color (h: 0-1, s: 0-1, v: 0-1)
 * @return vec3 - RGB color (each component 0-1)
 *
 * Hue values:
 *   0.0 = Red
 *   0.17 = Yellow
 *   0.33 = Green
 *   0.5 = Cyan
 *   0.67 = Blue
 *   0.83 = Magenta
 *   1.0 = Red (wraps)
 */
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

/**
 * RGB to HSV color conversion
 * Converts red-green-blue to hue-saturation-value.
 *
 * @param c - RGB color (each component 0-1)
 * @return vec3 - HSV color (h: 0-1, s: 0-1, v: 0-1)
 */
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Adaptive blend based on background brightness
 * Adjusts blend intensity to maintain visibility on any background.
 * Dark backgrounds get subtle patterns, light backgrounds get stronger.
 *
 * @param color - Foreground color to blend
 * @param background - Background color
 * @param intensity - Base blend intensity (0.0-1.0)
 * @return vec3 - Blended color
 */
vec3 adaptiveBlend(vec3 color, vec3 background, float intensity) {
  // Calculate background luminance (perceptual brightness)
  float bgBrightness = dot(background, vec3(0.299, 0.587, 0.114));

  // Adapt intensity: darker backgrounds get less pattern, lighter get more
  float adaptedIntensity = mix(intensity * 0.3, intensity, bgBrightness);

  return mix(background, color, adaptedIntensity);
}

/**
 * Screen blend mode
 * Lightens by inverting, multiplying, and inverting again.
 * Result is always lighter than either input.
 *
 * @param base - Base color
 * @param blend - Blend color
 * @return vec3 - Screen blended result
 */
vec3 screenBlend(vec3 base, vec3 blend) {
  return 1.0 - (1.0 - base) * (1.0 - blend);
}

/**
 * Overlay blend mode
 * Combines multiply and screen for contrast enhancement.
 * Dark values darken, light values lighten.
 *
 * @param base - Base color
 * @param blend - Blend color
 * @return vec3 - Overlay blended result
 */
vec3 overlayBlend(vec3 base, vec3 blend) {
  return mix(
    2.0 * base * blend,
    1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
    step(0.5, base)
  );
}

/**
 * Soft light blend mode
 * Gentle version of overlay, less extreme contrast.
 *
 * @param base - Base color
 * @param blend - Blend color
 * @return vec3 - Soft light blended result
 */
vec3 softLightBlend(vec3 base, vec3 blend) {
  return mix(
    2.0 * base * blend + base * base * (1.0 - 2.0 * blend),
    sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
    step(0.5, blend)
  );
}

/**
 * Palette function (cosine gradient)
 * Creates smooth color palettes using cosine waves.
 * Based on Inigo Quilez's technique.
 *
 * @param t - Position in palette (0.0-1.0, can exceed for cycling)
 * @param a - Palette DC offset
 * @param b - Palette amplitude
 * @param c - Palette frequency
 * @param d - Palette phase
 * @return vec3 - Color at position t
 *
 * Example palettes:
 *   Rainbow: palette(t, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.33, 0.67))
 *   Sunset: palette(t, vec3(0.5,0.5,0.5), vec3(0.5,0.5,0.5), vec3(1.0,0.7,0.4), vec3(0.0,0.15,0.2))
 */
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

//=============================================================================
// 5) EASING FUNCTIONS
// Smooth timing functions for animations.
//=============================================================================

/**
 * Ease in (quadratic)
 * Slow start, fast end.
 */
float easeIn(float t) {
  return t * t;
}

/**
 * Ease out (quadratic)
 * Fast start, slow end.
 */
float easeOut(float t) {
  return 1.0 - (1.0 - t) * (1.0 - t);
}

/**
 * Ease in-out (quadratic)
 * Slow start and end, fast middle.
 */
float easeInOut(float t) {
  return t < 0.5 ? 2.0 * t * t : 1.0 - pow(-2.0 * t + 2.0, 2.0) / 2.0;
}

/**
 * Smooth step with configurable edges
 * More control than built-in smoothstep.
 */
float smootherStep(float edge0, float edge1, float x) {
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

//=============================================================================
// USAGE EXAMPLE
//
// To use these functions in your shader, copy the ones you need:
//
//   // At the top of your fragment shader:
//   float hash(vec2 p) { ... }
//   float noise(vec2 st) { ... }
//   // etc.
//
//   void main() {
//     vec2 st = gl_FragCoord.xy / u_resolution.xy;
//     float n = fbm(st * 4.0, 4);
//     vec3 color = palette(n, ...);
//     gl_FragColor = vec4(color, 1.0);
//   }
//
//=============================================================================
