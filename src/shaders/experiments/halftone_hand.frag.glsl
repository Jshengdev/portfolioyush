/**
 * V15 - Halftone Hand (Red String of Fate)
 *
 * NOTE: This shader is now embedded in v15/index.jsx for
 * self-contained rendering without BaseExperimentShader.
 * This file is kept for reference/documentation.
 *
 * Visual Effect:
 * - Outstretched hand rendered with dense stipple/grain texture
 * - Hand enters from right side, facing left
 * - Edges dissolve into sand particles blown by wind
 * - The hand IS made of sand - particles break away at boundaries
 *
 * Technical Approach:
 * - 2D SDF hand silhouette (capsules + ellipse for palm)
 * - Multi-layer stipple pattern (600, 400, 200 dot density)
 * - Density varies with luminance (darker = more dots)
 * - 300 sand particles with wind physics
 * - Edge dissolution using FBM noise
 */

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Noise functions
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
  return vec2(hash(p), hash(p + vec2(37.0, 17.0)));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// SDF primitives
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdCapsule2D(vec2 p, vec2 a, vec2 b, float r) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

float sdTaperedCapsule2D(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  float r = mix(ra, rb, h);
  return length(pa - ba * h) - r;
}

float sdEllipse2D(vec2 p, vec2 r) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / k1;
}

// Complete hand SDF
float sdHand2D(vec2 p) {
  p.x += 0.3;
  float angle = -0.05;
  float c = cos(angle);
  float s = sin(angle);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  p *= 2.5;

  float palm = sdEllipse2D(p, vec2(0.32, 0.38));
  float wrist = sdCapsule2D(p, vec2(0.4, 0.0), vec2(0.9, 0.0), 0.22);

  // Fingers
  float indexF = smin(
    sdTaperedCapsule2D(p, vec2(-0.22, 0.18), vec2(-0.48, 0.2), 0.07, 0.055),
    sdTaperedCapsule2D(p, vec2(-0.48, 0.2), vec2(-0.68, 0.19), 0.055, 0.04),
    0.02);
  float middleF = smin(
    sdTaperedCapsule2D(p, vec2(-0.25, 0.0), vec2(-0.55, 0.0), 0.072, 0.058),
    sdTaperedCapsule2D(p, vec2(-0.55, 0.0), vec2(-0.78, 0.0), 0.058, 0.042),
    0.02);
  float ringF = smin(
    sdTaperedCapsule2D(p, vec2(-0.22, -0.17), vec2(-0.46, -0.19), 0.065, 0.052),
    sdTaperedCapsule2D(p, vec2(-0.46, -0.19), vec2(-0.64, -0.2), 0.052, 0.038),
    0.02);
  float pinkyF = smin(
    sdTaperedCapsule2D(p, vec2(-0.18, -0.32), vec2(-0.36, -0.36), 0.055, 0.045),
    sdTaperedCapsule2D(p, vec2(-0.36, -0.36), vec2(-0.48, -0.38), 0.045, 0.032),
    0.02);
  float thumbF = smin(
    sdTaperedCapsule2D(p, vec2(0.05, 0.32), vec2(-0.1, 0.48), 0.08, 0.065),
    sdTaperedCapsule2D(p, vec2(-0.1, 0.48), vec2(-0.22, 0.56), 0.065, 0.048),
    0.025);

  float fingers = smin(indexF, middleF, 0.025);
  fingers = smin(fingers, ringF, 0.025);
  fingers = smin(fingers, pinkyF, 0.025);
  fingers = smin(fingers, thumbF, 0.03);

  float hand = smin(palm, wrist, 0.08);
  hand = smin(hand, fingers, 0.05);

  return hand;
}

// Stipple
float stipple(vec2 uv, float density, float dotDensity) {
  vec2 cell = floor(uv * dotDensity);
  vec2 cellUV = fract(uv * dotDensity);
  float cellHash = hash(cell);
  vec2 dotPos = vec2(0.5) + (hash2(cell) - 0.5) * 0.7;
  float d = length(cellUV - dotPos);
  if (cellHash > 1.0 - density) return 0.0;
  float dotSize = 0.15 + cellHash * 0.1;
  return smoothstep(dotSize, dotSize * 0.3, d);
}

float multiStipple(vec2 uv, float density) {
  float result = 0.0;
  result += stipple(uv, density, 600.0) * 0.6;
  result += stipple(uv * 1.3 + 17.0, density * 0.8, 400.0) * 0.3;
  result += stipple(uv * 0.8 + 31.0, density * 0.5, 200.0) * 0.1;
  return clamp(result, 0.0, 1.0);
}

// Sand particles
float sandParticles(vec2 uv, float time, float handDist) {
  float sand = 0.0;
  float edgeZone = smoothstep(0.1, 0.0, handDist) * smoothstep(-0.15, -0.02, handDist);
  if (edgeZone < 0.01) return 0.0;

  const int PARTICLE_COUNT = 300;
  for (int i = 0; i < PARTICLE_COUNT; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 0.137, fi * 0.719);
    vec2 spawnPos = vec2(0.45 + hash(seed) * 0.35, 0.25 + hash(seed + 1.0) * 0.5);
    float lifeSpeed = 0.03 + hash(seed + 2.0) * 0.04;
    float life = fract(time * lifeSpeed + hash(seed + 3.0));
    vec2 windDir = vec2(-1.0, -0.1) + vec2(sin(time * 0.4 + fi * 0.08) * 0.15, cos(time * 0.5 + fi * 0.12) * 0.08);
    vec2 pos = spawnPos + windDir * life * 0.5;
    pos.y -= life * life * 0.08;
    pos += (hash2(seed + 4.0 + floor(time)) - 0.5) * life * 0.15;
    float d = length(uv - pos);
    float size = 0.0008 + hash(seed + 5.0) * 0.0012;
    float fade = smoothstep(0.0, 0.05, life) * smoothstep(1.0, 0.4, life);
    sand += smoothstep(size, size * 0.2, d) * fade * 0.6;
  }
  return clamp(sand, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centeredUV = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  float handDist = sdHand2D(centeredUV);
  float handMask = smoothstep(0.01, -0.01, handDist);

  float shade = 0.0;
  if (handMask > 0.0) {
    float edgeLight = smoothstep(-0.2, 0.0, handDist);
    vec2 lightDir = normalize(vec2(-0.5, 0.3));
    float directional = dot(normalize(centeredUV + vec2(0.3, 0.0)), lightDir) * 0.5 + 0.5;
    shade = mix(0.3, 0.9, edgeLight * directional);
    shade += fbm(centeredUV * 15.0) * 0.15 - 0.075;
    shade = clamp(shade, 0.0, 1.0);
  }

  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  bool isDark = bgBrightness < 0.5;

  vec3 bgColor = u_backgroundColor;
  vec3 dotColor = isDark ? vec3(0.85, 0.82, 0.78) : vec3(0.08, 0.08, 0.08);
  vec3 sandColor = isDark ? vec3(0.7, 0.65, 0.58) : vec3(0.3, 0.28, 0.25);

  float stippleDensity = 1.0 - shade;
  float stipplePattern = multiStipple(uv, stippleDensity);

  float edgeDissolve = smoothstep(-0.02, 0.02, handDist);
  float dissolveNoise = fbm(centeredUV * 30.0 + u_time * 0.3);
  float dissolveMask = handMask * (1.0 - edgeDissolve * dissolveNoise * 0.5);

  vec3 handColor = mix(bgColor, dotColor, stipplePattern);
  float sand = sandParticles(uv, u_time, handDist);

  vec3 color = bgColor;
  color = mix(color, handColor, dissolveMask);
  color = mix(color, sandColor, sand * 0.8);
  color *= 1.0 - length(uv - 0.5) * 0.25;

  gl_FragColor = vec4(color, 1.0);
}
