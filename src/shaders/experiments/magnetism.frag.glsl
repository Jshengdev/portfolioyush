precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

#define NUM_ANCHORS 10
#define PI 3.14159265359

// Pseudo-random function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// 2D noise for atmosphere
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

// FBM for atmosphere
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

// Generate anchor positions (deterministic based on index)
vec2 getAnchorPosition(int index) {
  float fi = float(index);
  float angle = fi * 2.399963; // Golden angle for even distribution
  float radius = 0.2 + 0.25 * fract(fi * 0.618034); // Golden ratio distribution

  // Add subtle animation to anchors
  float timeOffset = fi * 0.7;
  float wobble = 0.03 * sin(u_time * 0.3 + timeOffset);

  return vec2(
    0.5 + radius * cos(angle + u_time * 0.05) + wobble,
    0.5 + radius * sin(angle + u_time * 0.05) + wobble * 0.7
  );
}

// Get anchor strength (some are stronger than others)
float getAnchorStrength(int index) {
  float fi = float(index);
  return 0.5 + 0.5 * fract(fi * 0.382); // Varies between 0.5 and 1.0
}

// Catenary curve approximation (simplified parabola for performance)
// Returns y-offset (sag) for a point along the thread
float catenarySag(float t, float tension) {
  // t goes from 0 to 1 along the thread
  // Maximum sag at t=0.5
  float sag = 4.0 * t * (1.0 - t); // Parabola: 0 at ends, 1 at middle
  float sagAmount = (1.0 - tension) * 0.15; // Less tension = more sag
  return sag * sagAmount;
}

// Distance from point to curved thread (catenary)
float threadDistance(vec2 p, vec2 start, vec2 end, float tension) {
  vec2 dir = end - start;
  float len = length(dir);
  if (len < 0.001) return 1000.0;

  vec2 norm = dir / len;
  vec2 perp = vec2(-norm.y, norm.x);

  // Project point onto line
  float t = dot(p - start, norm) / len;
  t = clamp(t, 0.0, 1.0);

  // Point on straight line
  vec2 linePoint = start + t * dir;

  // Add catenary sag perpendicular to line (always sag downward)
  float sag = catenarySag(t, tension);
  vec2 sagDir = vec2(0.0, -1.0); // Always sag down
  vec2 curvePoint = linePoint + sagDir * sag * len;

  return length(p - curvePoint);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;

  // Aspect-corrected coordinates for distance calculations
  vec2 uvAspect = vec2(uv.x * aspect, uv.y);
  vec2 mouseAspect = vec2(u_mouse.x * aspect, u_mouse.y);

  // Determine if dark mode
  float isDark = step(0.5, 1.0 - u_backgroundColor.r);

  // Base colors
  vec3 threadColor = isDark > 0.5
    ? vec3(1.0, 0.09, 0.27)  // Bright red for dark mode
    : vec3(0.8, 0.0, 0.15);   // Darker red for light mode

  vec3 glowColor = isDark > 0.5
    ? vec3(1.0, 0.2, 0.4)     // Pink-red glow
    : vec3(0.9, 0.1, 0.2);

  // Accumulate thread contributions
  vec3 totalThread = vec3(0.0);
  float totalGlow = 0.0;

  // Draw threads from cursor to each anchor
  for (int i = 0; i < NUM_ANCHORS; i++) {
    vec2 anchor = getAnchorPosition(i);
    vec2 anchorAspect = vec2(anchor.x * aspect, anchor.y);
    float strength = getAnchorStrength(i);

    // Distance from cursor to anchor
    float anchorDist = length(mouseAspect - anchorAspect);

    // Tension based on distance (closer = more tension)
    float maxRange = 0.8;
    float tension = 1.0 - smoothstep(0.0, maxRange, anchorDist);
    tension = tension * tension; // Quadratic falloff

    // Skip if too far
    if (tension < 0.01) continue;

    // Calculate distance to thread
    float threadDist = threadDistance(uvAspect, mouseAspect, anchorAspect, tension);

    // Thread core (sharp, thin line)
    float coreWidth = 0.002 + 0.001 * tension;
    float core = smoothstep(coreWidth, coreWidth * 0.3, threadDist);

    // Thread glow (soft, wider)
    float glowWidth = 0.015 + 0.01 * tension;
    float glow = smoothstep(glowWidth, 0.0, threadDist);
    glow = glow * glow; // Softer falloff

    // Bloom (very soft, atmospheric)
    float bloomWidth = 0.05 + 0.03 * tension;
    float bloom = smoothstep(bloomWidth, 0.0, threadDist);
    bloom = bloom * bloom * bloom;

    // Pulsing based on tension
    float pulse = 0.8 + 0.2 * sin(u_time * 2.0 + float(i) * 0.5);

    // Accumulate with strength and tension
    float intensity = strength * tension * pulse;
    totalThread += threadColor * core * intensity;
    totalThread += glowColor * glow * intensity * 0.5;
    totalGlow += bloom * intensity * 0.3;

    // Anchor visualization (subtle pulsing dot)
    float anchorRadius = 0.008 + 0.004 * sin(u_time * 1.5 + float(i));
    float anchorDot = smoothstep(anchorRadius, anchorRadius * 0.5, length(uvAspect - anchorAspect));
    float anchorGlow = smoothstep(anchorRadius * 4.0, 0.0, length(uvAspect - anchorAspect));

    totalThread += threadColor * anchorDot * strength * 0.6;
    totalGlow += anchorGlow * strength * 0.15;
  }

  // Cursor energy core
  float cursorDist = length(uvAspect - mouseAspect);
  float cursorCore = smoothstep(0.015, 0.005, cursorDist);
  float cursorGlow = smoothstep(0.08, 0.0, cursorDist);
  cursorGlow = cursorGlow * cursorGlow;

  totalThread += vec3(1.0, 0.3, 0.4) * cursorCore;
  totalGlow += cursorGlow * 0.4;

  // Atmospheric background with FBM
  vec2 noiseCoord = uv * 3.0 + u_time * 0.05;
  float atmosphere = fbm(noiseCoord) * 0.08;

  // Combine everything
  vec3 finalColor = u_backgroundColor;

  // Add subtle atmosphere
  finalColor += glowColor * atmosphere * isDark;

  // Add bloom
  finalColor += glowColor * totalGlow;

  // Add threads (additive blending)
  finalColor += totalThread;

  // Subtle vignette
  float vignette = 1.0 - length(uv - 0.5) * 0.5;
  finalColor *= vignette;

  // Particle dust effect
  float dust = 0.0;
  for (int i = 0; i < 20; i++) {
    float fi = float(i);
    vec2 dustPos = vec2(
      fract(fi * 0.127 + u_time * 0.02),
      fract(fi * 0.269 + sin(u_time * 0.1 + fi) * 0.1)
    );
    dustPos = vec2(dustPos.x * aspect, dustPos.y);
    float dustDist = length(uvAspect - dustPos);
    float dustBright = smoothstep(0.01, 0.005, dustDist);

    // Only show dust near cursor
    float nearCursor = smoothstep(0.4, 0.1, length(dustPos - mouseAspect));
    dust += dustBright * nearCursor * 0.3;
  }
  finalColor += threadColor * dust * isDark;

  gl_FragColor = vec4(finalColor, 1.0);
}
