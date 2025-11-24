# W1-T1: Implement Aurora Shader (V1)

**Wave**: 1 (Shader Implementation)
**Task**: 1 of 5
**Agent**: Engineer
**Time Estimate**: 30 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 0)
**Dependencies**: Wave 0 complete

---

## Prompt (Copy & Paste)

```
I need you to implement the Aurora Borealis experimental shader (V1).

## Task
Create the Aurora shader experiment - flowing color bands like northern lights.

## Files to Create

### 1. Fragment Shader: `/src/shaders/experiments/aurora.frag.glsl`

```glsl
// Aurora Borealis Effect
// Flowing vertical color bands with organic movement

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Hash function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Value noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.1; // Very slow movement

  // Aurora bands
  float aurora = 0.0;

  // Create 3-4 layered bands
  for (float i = 0.0; i < 4.0; i++) {
    float yBase = 0.3 + i * 0.15;

    // Horizontal wave deformation
    float wave = sin(st.x * 4.0 + time * (1.0 + i * 0.3)) * 0.08;
    wave += sin(st.x * 7.0 - time * 1.5 + i) * 0.04;

    // Noise for organic feel
    float n = noise(vec2(st.x * 3.0 + time * 0.5, i * 10.0)) * 0.1;

    // Vertical band with soft edges
    float bandY = yBase + wave + n;
    float band = smoothstep(0.12, 0.0, abs(st.y - bandY));

    // Intensity falloff per band
    aurora += band * (1.0 - i * 0.2) * 0.6;
  }

  // Mouse influence - gently attract aurora
  float mouseInfluence = smoothstep(0.5, 0.0, distance(st, u_mouse));
  aurora *= (0.8 + mouseInfluence * 0.4);

  // Color gradient (green to cyan to purple)
  vec3 color1 = vec3(0.1, 0.9, 0.4);  // Green
  vec3 color2 = vec3(0.2, 0.7, 0.9);  // Cyan
  vec3 color3 = vec3(0.6, 0.2, 0.9);  // Purple

  float colorMix = st.y + sin(time * 0.5) * 0.2;
  vec3 auroraColor = mix(
    mix(color1, color2, smoothstep(0.3, 0.5, colorMix)),
    color3,
    smoothstep(0.5, 0.8, colorMix)
  );

  // Blend with background (subtle effect)
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.25, 0.4, bgBrightness);

  vec3 finalColor = mix(u_backgroundColor, auroraColor, aurora * intensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
```

### 2. Component: `/src/components/experiments/v1/index.jsx`

```jsx
import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/aurora.frag.glsl?raw';

const AuroraExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V1: AURORA"
    />
  );
};

export default AuroraExperiment;
```

## Visual Goals
- Soft, flowing horizontal bands
- Movement feels like curtains of light
- Green → Cyan → Purple color progression
- Very slow, hypnotic animation
- Mouse gently influences band shapes

## Reference Files
- Read `/src/components/experiments/BaseExperimentShader.jsx` (created in Wave 0)
- Read `/src/shaders/truchet.frag.glsl` for GLSL patterns

## Acceptance Criteria
- [ ] Shader renders aurora-like bands
- [ ] Colors transition smoothly (green → purple)
- [ ] Animation is slow and hypnotic
- [ ] Mouse interaction visible but subtle
- [ ] Works in dark and light mode
- [ ] 60fps performance

## Test
Navigate to `/experiments/v1` after implementation.
```

---

## Files to Create

| Path | Type |
|------|------|
| `src/shaders/experiments/aurora.frag.glsl` | Fragment shader |
| `src/components/experiments/v1/index.jsx` | React component |

---

## Visual Reference

**Inspiration**: Northern lights, aurora borealis
**Feel**: Mystical, flowing, hypnotic
**Colors**: Green → Cyan → Purple gradient
**Movement**: Slow horizontal waves, curtain-like

---

## Acceptance Criteria

- [ ] Aurora bands visible
- [ ] Smooth color transitions
- [ ] Slow animation speed
- [ ] Mouse interaction works
- [ ] Theme-aware background
- [ ] 60fps maintained

---

## Completion Checklist

- [ ] Fragment shader created
- [ ] Component created
- [ ] Renders at /experiments/v1
- [ ] Visually matches description
