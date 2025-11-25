/**
 * V12 - Constellation Threads (Enhanced)
 *
 * A field of floating particles that connect to the cursor when nearby,
 * creating a "weaving fate" effect with glowing red thread lines.
 *
 * Visual Character:
 * - Bold, visible particles with soft glow halos
 * - Thick glowing thread connections with bloom effect
 * - Large connection radius for dramatic web effect
 * - Particles pulse and brighten when connected
 * - Cursor creates a "fate weaving" visual
 */

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Pseudo-random hash function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D hash for particle position generation
vec2 hash2(vec2 p) {
  return vec2(
    hash(p),
    hash(p + vec2(37.0, 17.0))
  );
}

// Signed distance field for line segment
float lineSDF(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Aspect-corrected coordinates
  float aspectRatio = u_resolution.x / u_resolution.y;
  vec2 uv = st;
  uv.x *= aspectRatio;

  // Mouse in same coordinate space
  vec2 mouse = u_mouse;
  mouse.x *= aspectRatio;

  // Red string color (matches cursor #FF1744)
  vec3 threadColor = vec3(1.0, 0.09, 0.27);
  vec3 glowColor = vec3(1.0, 0.3, 0.4); // Softer glow

  // Accumulate effects
  vec3 effectColor = vec3(0.0);
  float totalGlow = 0.0;

  // MUCH larger connection radius - half the screen!
  float connectionRadius = 0.5;

  // More particles for denser field
  const int particleCount = 40;

  // Cursor glow at center
  float cursorDist = distance(uv, mouse);
  float cursorGlow = 0.015 / (cursorDist + 0.01);
  effectColor += threadColor * cursorGlow * 0.5;

  for (int i = 0; i < particleCount; i++) {
    float fi = float(i);

    // Generate particle position - spread across full screen
    vec2 particleBase = hash2(vec2(fi * 0.17, fi * 1.31));
    particleBase.x *= aspectRatio; // Match aspect ratio

    // Larger, slower floating motion
    float drift = u_time * 0.12;
    vec2 offset = vec2(
      sin(drift + fi * 1.1) * 0.05,
      cos(drift * 0.7 + fi * 0.6) * 0.04
    );

    vec2 particlePos = particleBase + offset;

    // Distances
    float distToMouse = distance(particlePos, mouse);
    float particleDist = distance(uv, particlePos);

    // BIGGER particle core
    float coreSize = 0.008;
    float core = smoothstep(coreSize, coreSize * 0.3, particleDist);

    // Soft glow halo around particle
    float haloSize = 0.04;
    float halo = smoothstep(haloSize, 0.0, particleDist) * 0.4;

    float particleGlow = core + halo;

    // Connection check
    bool isConnected = distToMouse < connectionRadius;

    if (isConnected) {
      // Connection strength based on distance (closer = stronger)
      float connectionStrength = 1.0 - (distToMouse / connectionRadius);
      connectionStrength = pow(connectionStrength, 0.5); // Ease out for smoother falloff

      // Brighten connected particles significantly
      particleGlow *= 1.0 + connectionStrength * 3.0;

      // Pulse effect - faster when closer
      float pulseSpeed = 3.0 + connectionStrength * 2.0;
      float pulse = sin(u_time * pulseSpeed + fi) * 0.3 + 1.0;
      particleGlow *= pulse;

      // === THREAD DRAWING ===
      float lineDist = lineSDF(uv, mouse, particlePos);

      // Multiple layers for glow effect
      // Inner core - bright thin line
      float threadCore = smoothstep(0.003, 0.0, lineDist);

      // Middle glow
      float threadMid = smoothstep(0.015, 0.0, lineDist) * 0.6;

      // Outer bloom
      float threadBloom = smoothstep(0.04, 0.0, lineDist) * 0.25;

      float threadTotal = threadCore + threadMid + threadBloom;

      // Add thread with connection strength
      effectColor += threadColor * threadTotal * connectionStrength;

      // Extra glow accumulation for bloom
      totalGlow += threadTotal * connectionStrength * 0.3;
    }

    // Add particle to effect
    effectColor += glowColor * particleGlow * 0.8;
    totalGlow += particleGlow * 0.2;
  }

  // === FINAL COMPOSITING ===

  // Add bloom/glow overlay
  effectColor += vec3(1.0, 0.5, 0.5) * totalGlow * 0.15;

  // For dark backgrounds, we want the effect to POP
  // Don't blend too much with background - let the red shine
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;

  // High intensity for visibility
  float intensity = mix(0.9, 0.7, bgBrightness); // 90% on dark, 70% on light

  // Additive blending for glow effect on dark backgrounds
  vec3 finalColor;
  if (bgBrightness < 0.5) {
    // Dark mode: additive blending (glow effect)
    finalColor = u_backgroundColor + effectColor * intensity;
  } else {
    // Light mode: multiply blend
    finalColor = mix(u_backgroundColor, effectColor, intensity * 0.6);
  }

  // Subtle vignette
  float vignette = 1.0 - length(st - 0.5) * 0.2;
  finalColor *= vignette;

  // Clamp to prevent oversaturation
  finalColor = clamp(finalColor, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, 1.0);
}
