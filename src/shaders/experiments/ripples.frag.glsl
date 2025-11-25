// V13 - Fate Ripples
// Expanding red ring ripples from cursor trail with interference patterns
// "Memory of your path" - fate radiating from touch

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Hash function for pseudo-random trail positions
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// Single expanding ring
float ring(vec2 uv, vec2 center, float radius, float thickness) {
  float dist = distance(uv, center);
  return smoothstep(thickness, 0.0, abs(dist - radius));
}

// Create multiple concentric rings from a single origin
float multiRing(vec2 uv, vec2 center, float baseRadius, float fade, int ringCount) {
  float totalRing = 0.0;

  for (int i = 0; i < 4; i++) {
    if (i >= ringCount) break;

    float fi = float(i);
    float ringRadius = baseRadius + fi * 0.03; // Spacing between rings
    float ringThickness = 0.008; // Ring width

    // Each successive ring is slightly dimmer
    float ringFade = fade * (1.0 - fi * 0.15);

    float r = ring(uv, center, ringRadius, ringThickness);
    totalRing += r * ringFade;
  }

  return totalRing;
}

void main() {
  // Setup coordinates with aspect ratio correction
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float aspectRatio = u_resolution.x / u_resolution.y;
  vec2 uv = st;
  uv.x *= aspectRatio;

  vec2 mouse = u_mouse;
  mouse.x *= aspectRatio;

  // Red ripple color (#FF1744)
  vec3 rippleColor = vec3(1.0, 0.09, 0.27);
  vec3 effectColor = vec3(0.0);

  // === CURRENT MOUSE RIPPLE ===
  // Always show expanding rings at cursor position
  float currentRippleTime = mod(u_time * 1.5, 2.0); // Fast cycle
  float currentRadius = currentRippleTime * 0.2;
  float currentFade = 1.0 - currentRippleTime / 2.0;

  float currentRipple = multiRing(uv, mouse, currentRadius, currentFade, 3);
  effectColor += rippleColor * currentRipple * 1.2; // Bright at cursor

  // === HISTORICAL RIPPLES (Trail Memory) ===
  // Create a trail of ripples behind the cursor
  const int rippleCount = 12;

  for (int i = 0; i < rippleCount; i++) {
    float fi = float(i);

    // Time offset for this ripple (staggered spawning)
    float spawnInterval = 0.25; // New ripple every 0.25 seconds
    float timeOffset = fi * spawnInterval;

    // Ripple lifetime cycle (4 seconds before respawn)
    float maxLifetime = 4.0;
    float rippleAge = mod(u_time - timeOffset, maxLifetime);

    // Calculate ripple origin (simulate trail from mouse position)
    // Use time-based hash to create deterministic but varied positions
    float hashSeed = floor((u_time - timeOffset) / maxLifetime);
    vec2 hashInput = vec2(hashSeed, fi);
    vec2 randomOffset = (hash22(hashInput) - 0.5) * 0.3; // Random variation

    // Blend between historical position and current mouse
    // Older ripples have more randomness (simulating mouse movement)
    float age = rippleAge / maxLifetime;
    vec2 rippleOrigin = mouse + randomOffset * age;

    // Ripple expansion
    float expansionSpeed = 0.15;
    float radius = rippleAge * expansionSpeed;

    // Fade out as ripple ages and expands
    float ageFade = 1.0 - smoothstep(0.0, maxLifetime, rippleAge);
    float distanceFade = 1.0 - smoothstep(0.0, 0.6, radius);
    float totalFade = ageFade * distanceFade;

    // Render multiple concentric rings for this ripple origin
    float ripple = multiRing(uv, rippleOrigin, radius, totalFade, 3);

    // Add to effect with slight variation per ripple
    float intensity = 0.8 - fi * 0.03; // Older ripples slightly dimmer
    effectColor += rippleColor * ripple * intensity;
  }

  // === ADDITIONAL AMBIENT RIPPLES ===
  // Create some slower, larger ambient ripples for depth
  for (int i = 0; i < 4; i++) {
    float fi = float(i);

    float ambientTime = u_time * 0.3 + fi * 1.5;
    float ambientAge = mod(ambientTime, 6.0);

    // Fixed positions for ambient ripples
    vec2 ambientOrigin = vec2(
      0.3 + sin(fi * 2.1) * 0.3,
      0.3 + cos(fi * 1.7) * 0.3
    );
    ambientOrigin.x *= aspectRatio;

    float ambientRadius = ambientAge * 0.1;
    float ambientFade = (1.0 - ambientAge / 6.0) * 0.3; // Subtle

    float ambient = multiRing(uv, ambientOrigin, ambientRadius, ambientFade, 2);
    effectColor += rippleColor * ambient * 0.5;
  }

  // === INTERFERENCE GLOW ===
  // Add extra brightness where effect is strong (interference pattern)
  float effectStrength = length(effectColor);
  vec3 interferenceGlow = rippleColor * pow(effectStrength, 2.0) * 0.5;
  effectColor += interferenceGlow;

  // === CENTER GLOW AT MOUSE ===
  // Subtle glow at cursor position
  float mouseGlow = 1.0 - smoothstep(0.0, 0.15, distance(uv, mouse));
  mouseGlow = pow(mouseGlow, 3.0);
  effectColor += rippleColor * mouseGlow * 0.3;

  // === COMPOSITING ===
  // Additive blending on background
  vec3 finalColor = u_backgroundColor + effectColor;

  // Boost overall brightness for visibility
  finalColor = finalColor * 1.2;

  // Subtle vignette to focus attention
  float vignette = 1.0 - length(st - 0.5) * 0.4;
  finalColor *= vignette;

  gl_FragColor = vec4(finalColor, 1.0);
}
