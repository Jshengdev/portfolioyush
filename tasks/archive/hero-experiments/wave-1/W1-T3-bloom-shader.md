# W1-T3: Implement Bloom Shader (V3)

**Wave**: 1 (Shader Implementation)
**Task**: 3 of 5
**Agent**: Engineer
**Time Estimate**: 30 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 0)
**Dependencies**: Wave 0 complete

---

## Prompt (Copy & Paste)

```
I need you to implement the Light Bloom experimental shader (V3).

## Task
Create the Bloom shader experiment - soft drifting light glows like camera bokeh.

## Files to Create

### 1. Fragment Shader: `/src/shaders/experiments/bloom.frag.glsl`

```glsl
// Light Bloom Effect
// Soft drifting circular glows like bokeh lights

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Soft circular gradient
float softCircle(vec2 st, vec2 center, float radius, float softness) {
  float dist = distance(st, center);
  return smoothstep(radius + softness, radius - softness, dist);
}

// Harmonic position for organic movement
vec2 harmonicPos(float seed, float time) {
  float phi = 1.618033988749895;
  float sqrt2 = 1.4142135623730951;

  float x = sin(time * 0.3 * phi + seed * 6.28) * 0.3
          + sin(time * 0.5 * sqrt2 + seed * 3.14) * 0.15
          + 0.5;

  float y = cos(time * 0.4 * phi + seed * 4.71) * 0.25
          + cos(time * 0.35 * sqrt2 + seed * 1.57) * 0.15
          + 0.5;

  return vec2(x, y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.15;

  // Accumulated glow
  float glow = 0.0;
  vec3 glowColor = vec3(0.0);

  // Define light sources with different properties
  // Each has: seed, radius, softness, color
  const int NUM_LIGHTS = 5;

  // Light 1: Large warm glow
  vec2 pos1 = harmonicPos(0.0, time);
  float g1 = softCircle(st, pos1, 0.25, 0.2);
  glowColor += vec3(1.0, 0.8, 0.6) * g1 * 0.4;
  glow += g1;

  // Light 2: Medium cool glow
  vec2 pos2 = harmonicPos(0.33, time * 1.1);
  float g2 = softCircle(st, pos2, 0.18, 0.15);
  glowColor += vec3(0.6, 0.8, 1.0) * g2 * 0.35;
  glow += g2;

  // Light 3: Small accent
  vec2 pos3 = harmonicPos(0.66, time * 0.9);
  float g3 = softCircle(st, pos3, 0.12, 0.1);
  glowColor += vec3(1.0, 0.6, 0.8) * g3 * 0.3;
  glow += g3;

  // Light 4: Tiny sparkle
  vec2 pos4 = harmonicPos(0.5, time * 1.3);
  float g4 = softCircle(st, pos4, 0.08, 0.06);
  glowColor += vec3(0.9, 1.0, 0.8) * g4 * 0.25;
  glow += g4;

  // Light 5: Background ambient
  vec2 pos5 = harmonicPos(0.15, time * 0.7);
  float g5 = softCircle(st, pos5, 0.35, 0.3);
  glowColor += vec3(0.8, 0.7, 1.0) * g5 * 0.2;
  glow += g5;

  // Mouse acts as additional light source
  float mouseGlow = softCircle(st, u_mouse, 0.15, 0.12);
  glowColor += vec3(1.0, 0.95, 0.9) * mouseGlow * 0.5;
  glow += mouseGlow;

  // Normalize color by glow intensity (prevent over-saturation)
  if (glow > 0.01) {
    glowColor /= glow;
  }

  // Determine intensity based on background
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.2, 0.35, bgBrightness);

  // Blend with background
  vec3 finalColor = mix(u_backgroundColor, glowColor, glow * intensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
```

### 2. Component: `/src/components/experiments/v3/index.jsx`

```jsx
import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/bloom.frag.glsl?raw';

const BloomExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V3: BLOOM"
    />
  );
};

export default BloomExperiment;
```

## Visual Goals
- 4-6 soft circular glows drifting across screen
- Each glow has different size, color, speed
- Movement is smooth and non-repeating (harmonic)
- Glows overlap to create additive brightness
- Mouse acts as an additional light source
- Camera bokeh / out-of-focus lights aesthetic

## Reference Files
- Read `/src/components/experiments/BaseExperimentShader.jsx` (created in Wave 0)
- Read `/docs/design/SHADER_PHILOSOPHY.md` for harmonic motion patterns

## Acceptance Criteria
- [ ] Multiple soft glows visible
- [ ] Glows drift smoothly (harmonic motion)
- [ ] Different colors per glow (warm, cool, accent)
- [ ] Mouse creates interactive light
- [ ] Overlapping glows create brightness
- [ ] Works in both dark and light mode
- [ ] 60fps performance

## Test
Navigate to `/experiments/v3` after implementation.
```

---

## Files to Create

| Path | Type |
|------|------|
| `src/shaders/experiments/bloom.frag.glsl` | Fragment shader |
| `src/components/experiments/v3/index.jsx` | React component |

---

## Visual Reference

**Inspiration**: Camera bokeh, out-of-focus lights, lens flare
**Feel**: Dreamy, soft, gentle
**Colors**: Warm + cool mixed (orange, blue, pink, green tints)
**Movement**: Harmonic drift, non-repeating paths

---

## Acceptance Criteria

- [ ] Multiple glows visible
- [ ] Smooth harmonic movement
- [ ] Color variety
- [ ] Mouse light interaction
- [ ] Additive blending where overlaps
- [ ] 60fps maintained

---

## Completion Checklist

- [ ] Fragment shader created
- [ ] Component created
- [ ] Renders at /experiments/v3
- [ ] Visually matches description
