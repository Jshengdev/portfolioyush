# W1-T2: Implement Fog Shader (V2)

**Wave**: 1 (Shader Implementation)
**Task**: 2 of 5
**Agent**: Engineer
**Time Estimate**: 30 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 0)
**Dependencies**: Wave 0 complete

---

## Prompt (Copy & Paste)

```
I need you to implement the Fog/Mist experimental shader (V2).

## Task
Create the Fog shader experiment - layered translucent clouds that drift slowly.

## Files to Create

### 1. Fragment Shader: `/src/shaders/experiments/fog.frag.glsl`

```glsl
// Fog/Mist Effect
// Layered translucent clouds with depth perception

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Hash function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Smooth noise
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

// Fractal Brownian Motion for cloud shapes
float fbm(vec2 st, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.02; // Very slow drift

  // Accumulated fog from multiple layers
  float fog = 0.0;

  // Layer 1: Far background (slowest, largest)
  vec2 st1 = st * 1.5 + vec2(time * 0.3, time * 0.1);
  float layer1 = fbm(st1, 4);
  fog += layer1 * 0.4;

  // Layer 2: Mid-ground
  vec2 st2 = st * 2.5 + vec2(time * 0.5, -time * 0.2);
  float layer2 = fbm(st2, 5);
  fog += layer2 * 0.3;

  // Layer 3: Near foreground (fastest, finest detail)
  vec2 st3 = st * 4.0 + vec2(time * 0.8, time * 0.15);
  float layer3 = fbm(st3, 6);
  fog += layer3 * 0.2;

  // Layer 4: Wispy detail
  vec2 st4 = st * 6.0 + vec2(-time * 0.4, time * 0.3);
  float layer4 = fbm(st4, 3);
  fog += layer4 * 0.1;

  // Mouse creates gentle "parting" effect
  float mouseDist = distance(st, u_mouse);
  float parting = smoothstep(0.0, 0.3, mouseDist);
  fog *= (0.7 + parting * 0.3);

  // Fog color - slight blue/grey tint
  vec3 fogColor = vec3(0.7, 0.75, 0.85);

  // Determine if dark or light mode
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;

  // In dark mode: lighter fog on dark background
  // In light mode: darker fog on light background
  vec3 effectColor;
  float intensity;

  if (bgBrightness < 0.5) {
    // Dark mode: white/grey fog
    effectColor = vec3(0.9, 0.92, 0.95);
    intensity = fog * 0.15;
  } else {
    // Light mode: grey fog
    effectColor = vec3(0.5, 0.55, 0.6);
    intensity = fog * 0.12;
  }

  vec3 finalColor = mix(u_backgroundColor, effectColor, intensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
```

### 2. Component: `/src/components/experiments/v2/index.jsx`

```jsx
import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/fog.frag.glsl?raw';

const FogExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V2: FOG"
    />
  );
};

export default FogExperiment;
```

## Visual Goals
- Multiple layers of translucent fog/mist
- Layers move at different speeds (parallax depth)
- Far layers = slow, large shapes
- Near layers = faster, finer detail
- Mouse creates subtle "parting" effect
- Very atmospheric and calming

## Reference Files
- Read `/src/components/experiments/BaseExperimentShader.jsx` (created in Wave 0)
- Read `/src/shaders/truchet.frag.glsl` for noise patterns

## Acceptance Criteria
- [ ] Multiple fog layers visible
- [ ] Depth perception through speed differences
- [ ] Very slow, calming movement
- [ ] Mouse parting effect works
- [ ] Works in both dark and light mode
- [ ] 60fps performance

## Test
Navigate to `/experiments/v2` after implementation.
```

---

## Files to Create

| Path | Type |
|------|------|
| `src/shaders/experiments/fog.frag.glsl` | Fragment shader |
| `src/components/experiments/v2/index.jsx` | React component |

---

## Visual Reference

**Inspiration**: Morning mist, atmospheric fog, clouds
**Feel**: Calming, mysterious, depth
**Colors**: Subtle grey/blue tints
**Movement**: Very slow drift, layered parallax

---

## Acceptance Criteria

- [ ] Multiple fog layers visible
- [ ] Parallax depth effect
- [ ] Slow, calming animation
- [ ] Mouse parting works
- [ ] Theme-aware
- [ ] 60fps maintained

---

## Completion Checklist

- [ ] Fragment shader created
- [ ] Component created
- [ ] Renders at /experiments/v2
- [ ] Visually matches description
