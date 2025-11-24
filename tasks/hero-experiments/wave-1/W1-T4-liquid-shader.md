# W1-T4: Implement Liquid Shader (V4)

**Wave**: 1 (Shader Implementation)
**Task**: 4 of 5
**Agent**: Engineer
**Time Estimate**: 35 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 0)
**Dependencies**: Wave 0 complete

---

## Prompt (Copy & Paste)

```
I need you to implement the Liquid Light experimental shader (V4).

## Task
Create the Liquid shader experiment - organic blob shapes that merge and separate like a lava lamp.

## Files to Create

### 1. Fragment Shader: `/src/shaders/experiments/liquid.frag.glsl`

```glsl
// Liquid Light Effect
// Metaball-style organic blobs that merge and separate

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Smooth minimum for metaball blending
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// Harmonic position for organic movement
vec2 blobPos(float seed, float time) {
  float phi = 1.618033988749895;
  float sqrt2 = 1.4142135623730951;

  float x = sin(time * 0.2 * phi + seed * 6.28) * 0.3
          + cos(time * 0.15 * sqrt2 + seed * 3.14) * 0.2
          + 0.5;

  float y = cos(time * 0.18 * phi + seed * 4.71) * 0.3
          + sin(time * 0.22 * sqrt2 + seed * 1.57) * 0.2
          + 0.5;

  return vec2(x, y);
}

// Distance to a blob with varying radius
float blobField(vec2 st, vec2 center, float baseRadius, float time, float seed) {
  // Pulsing radius
  float pulse = sin(time * 0.5 + seed * 3.14) * 0.02;
  float radius = baseRadius + pulse;

  return radius / distance(st, center);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Correct aspect ratio
  float aspect = u_resolution.x / u_resolution.y;
  vec2 stCorrected = st;
  stCorrected.x *= aspect;

  float time = u_time * 0.3;

  // Metaball field accumulator
  float field = 0.0;

  // Blob 1: Large, slow
  vec2 p1 = blobPos(0.0, time);
  p1.x *= aspect;
  field += blobField(stCorrected, p1, 0.12, time, 0.0);

  // Blob 2: Medium
  vec2 p2 = blobPos(0.25, time * 1.1);
  p2.x *= aspect;
  field += blobField(stCorrected, p2, 0.09, time, 0.25);

  // Blob 3: Medium
  vec2 p3 = blobPos(0.5, time * 0.9);
  p3.x *= aspect;
  field += blobField(stCorrected, p3, 0.1, time, 0.5);

  // Blob 4: Small, fast
  vec2 p4 = blobPos(0.75, time * 1.3);
  p4.x *= aspect;
  field += blobField(stCorrected, p4, 0.07, time, 0.75);

  // Blob 5: Tiny accent
  vec2 p5 = blobPos(0.15, time * 1.5);
  p5.x *= aspect;
  field += blobField(stCorrected, p5, 0.05, time, 0.15);

  // Mouse blob
  vec2 mousePos = u_mouse;
  mousePos.x *= aspect;
  field += blobField(stCorrected, mousePos, 0.08, time, 0.0) * 0.8;

  // Threshold for metaball surface
  float threshold = 1.0;
  float blob = smoothstep(threshold - 0.1, threshold + 0.3, field);

  // Inner glow (brighter center)
  float innerGlow = smoothstep(threshold + 0.2, threshold + 1.0, field);

  // Color based on field strength
  vec3 blobColor = mix(
    vec3(0.4, 0.6, 1.0),   // Blue edge
    vec3(0.9, 0.5, 0.7),   // Pink center
    innerGlow
  );

  // Add subtle rainbow based on position
  vec3 rainbow = vec3(
    sin(stCorrected.x * 3.0 + time) * 0.1,
    sin(stCorrected.y * 3.0 + time + 2.0) * 0.1,
    sin((stCorrected.x + stCorrected.y) * 2.0 + time + 4.0) * 0.1
  );
  blobColor += rainbow;

  // Determine intensity based on background
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.25, 0.4, bgBrightness);

  // Blend with background
  vec3 finalColor = mix(u_backgroundColor, blobColor, blob * intensity);

  // Add subtle glow outside blobs
  float outerGlow = smoothstep(threshold - 0.5, threshold - 0.1, field);
  finalColor += blobColor * outerGlow * 0.05;

  gl_FragColor = vec4(finalColor, 1.0);
}
```

### 2. Component: `/src/components/experiments/v4/index.jsx`

```jsx
import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/liquid.frag.glsl?raw';

const LiquidExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V4: LIQUID"
    />
  );
};

export default LiquidExperiment;
```

## Visual Goals
- 4-6 organic blob shapes
- Blobs merge smoothly when close (metaball effect)
- Blobs separate when far apart
- Smooth, viscous movement (like lava lamp)
- Mouse attracts/creates additional blob
- Subtle color variations within blobs

## Technical Notes
- Metaball: Sum of inverse distances, threshold for surface
- smin() function creates smooth merge between blobs
- Aspect ratio correction needed for circular blobs

## Reference Files
- Read `/src/components/experiments/BaseExperimentShader.jsx` (created in Wave 0)
- Read `/docs/design/SHADER_PHILOSOPHY.md` for harmonic motion patterns

## Acceptance Criteria
- [ ] Multiple organic blobs visible
- [ ] Blobs merge when close (metaball effect)
- [ ] Smooth, organic movement
- [ ] Mouse interaction creates/attracts blob
- [ ] Circular blobs (aspect ratio corrected)
- [ ] Works in both dark and light mode
- [ ] 60fps performance

## Test
Navigate to `/experiments/v4` after implementation.
```

---

## Files to Create

| Path | Type |
|------|------|
| `src/shaders/experiments/liquid.frag.glsl` | Fragment shader |
| `src/components/experiments/v4/index.jsx` | React component |

---

## Visual Reference

**Inspiration**: Lava lamps, viscous fluid, oil in water
**Feel**: Organic, hypnotic, fluid
**Colors**: Blue/pink gradient with subtle rainbow
**Movement**: Slow, viscous, blobs merge and separate

---

## Acceptance Criteria

- [ ] Organic blob shapes
- [ ] Metaball merge effect
- [ ] Smooth movement
- [ ] Mouse blob interaction
- [ ] Correct aspect ratio
- [ ] 60fps maintained

---

## Completion Checklist

- [ ] Fragment shader created
- [ ] Component created
- [ ] Renders at /experiments/v4
- [ ] Visually matches description
