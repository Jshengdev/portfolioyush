# Adding New Shader Experiments

**Last Updated**: 2025-11-24
**Current Count**: 11 experiments (V1-V11)

This guide explains how to add new shader experiments to the portfolio's experimental gallery.

---

## Quick Add (4 Steps)

### Step 1: Create the Shader File

Create a new fragment shader in `src/shaders/experiments/`:

```glsl
// src/shaders/experiments/[name].frag.glsl

//=============================================================================
// [NAME] SHADER
// V[N] Experiment: [Brief description]
//
// Visual Goals:
// - [Goal 1]
// - [Goal 2]
// - [Goal 3]
//
// Base Uniforms (from BaseExperimentShader):
// - u_time: float (incrementing time in seconds)
// - u_resolution: vec2 (window width, height in pixels)
// - u_mouse: vec2 (normalized mouse position, 0-1)
// - u_backgroundColor: vec3 (theme-based: black or white)
//=============================================================================

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time * 0.1; // Adjust speed (0.02-0.3 typical range)

  // Your effect code here
  vec3 effectColor = vec3(st.x, st.y, 0.5);

  // Theme-aware blending (REQUIRED)
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  float intensity = mix(0.2, 0.4, bgBrightness);
  vec3 finalColor = mix(u_backgroundColor, effectColor, intensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
```

### Step 2: Create the Component

Create component in `src/components/experiments/v[N]/index.jsx`:

```jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/[name].frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V[N]: [Name] Experiment
 *
 * Visual Effect:
 * - [Description of the visual]
 *
 * Technical Details:
 * - [Key techniques used]
 */

const CURRENT_ID = 'v[N]';

const NavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const NavButton = styled.button`
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.theme.colors.text.secondary};
  padding: 8px 16px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: ${props => props.theme.transitions.standard};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.hover};
    border-color: ${props => props.theme.colors.accent.blue};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const [Name]Experiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft') navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight') navigate(`/experiments/${next.id}`);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || '[Name]'}`}
      />
      <NavOverlay>
        <NavButton theme={theme} onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev.id}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next.id}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
    </>
  );
};

export default [Name]Experiment;
```

### Step 3: Add to App.jsx Routes

Edit `src/App.jsx`:

```jsx
// Add lazy import (around line 27)
const ExperimentV[N] = lazy(() => import('./components/experiments/v[N]'));

// Add route (around line 218)
<Route path="/experiments/v[N]" element={
  <PageWrapper><ExperimentV[N] /></PageWrapper>
} />
```

### Step 4: Add to experimentConfig.js (SINGLE SOURCE OF TRUTH)

Edit `src/components/experiments/experimentConfig.js`:

```jsx
export const experiments = [
  // ... existing entries
  {
    id: 'v[N]',
    name: '[Name]',
    description: '[Short description for gallery card]',
    colors: ['#HEX1', '#HEX2', '#HEX3']  // 3 colors for gradient preview
  },
];
```

**This automatically updates:**
- ExperimentNav gallery grid
- Navigation prev/next cycling
- Hero page experiment count

---

## Files Summary

| Step | File | Action |
|------|------|--------|
| 1 | `src/shaders/experiments/[name].frag.glsl` | CREATE |
| 2 | `src/components/experiments/v[N]/index.jsx` | CREATE |
| 3 | `src/App.jsx` | ADD import + route |
| 4 | `src/components/experiments/experimentConfig.js` | ADD to array |

---

## Shader Styling Guidelines

### Required Uniforms

Every shader MUST use these uniforms (provided by BaseExperimentShader):

```glsl
uniform float u_time;          // Time in seconds (auto-incrementing)
uniform vec2 u_resolution;     // Window size in pixels
uniform vec2 u_mouse;          // Mouse position (0-1 normalized)
uniform vec3 u_backgroundColor; // Theme color (black or white)
```

### Animation Speed

Use time multipliers to control speed:

| Speed | Multiplier | Use Case |
|-------|------------|----------|
| Very Slow | 0.02-0.05 | Fog, clouds |
| Slow | 0.08-0.15 | Aurora, waves |
| Medium | 0.2-0.3 | Liquid, bloom |
| Fast | 0.5+ | Glitch, scan lines |

```glsl
float time = u_time * 0.1; // Slow, hypnotic
```

### Theme-Aware Blending (REQUIRED)

Always blend with the background for theme support:

```glsl
// Calculate background brightness
float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;

// Adaptive intensity (darker bg = more subtle, lighter bg = stronger)
float intensity = mix(0.2, 0.4, bgBrightness);

// Blend effect with background
vec3 finalColor = mix(u_backgroundColor, effectColor, intensity);
gl_FragColor = vec4(finalColor, 1.0);
```

### Mouse Interaction Patterns

```glsl
// Distance-based influence (effect stronger near cursor)
float mouseInfluence = smoothstep(0.5, 0.0, distance(st, u_mouse));

// Light source at cursor
float glow = 0.15 / distance(st, u_mouse);

// Parallax offset
vec2 offset = (u_mouse - 0.5) * 0.1;
```

### Color Palette Guidelines

Match the portfolio's aesthetic:

```glsl
// Cool tones (preferred for dark mode)
vec3 blue = vec3(0.2, 0.4, 0.9);
vec3 purple = vec3(0.6, 0.2, 0.9);
vec3 teal = vec3(0.2, 0.8, 0.7);

// Warm accents (use sparingly)
vec3 pink = vec3(1.0, 0.4, 0.6);
vec3 gold = vec3(1.0, 0.8, 0.3);

// Neutral (for grayscale effects)
vec3 white = vec3(1.0);
vec3 gray = vec3(0.5);
```

### Preview Colors Array

The `colors` array in experimentConfig.js is used for the gradient preview thumbnail:

```jsx
colors: ['#1AE664', '#33B3E6', '#9933E6']  // Start, middle, end of gradient
```

Choose 3 representative colors from your shader's palette.

---

## Common Shader Techniques

### Noise Functions

```glsl
// Simple hash
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

// Fractal Brownian Motion (layered noise)
float fbm(vec2 st, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < octaves; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}
```

### Metaballs (Liquid Effect)

```glsl
float metaball(vec2 st, vec2 center, float radius) {
  float dist = max(distance(st, center), 0.001); // Prevent division by zero
  return radius / dist;
}

// Sum multiple metaballs, threshold for surface
float field = metaball(st, pos1, 0.1) + metaball(st, pos2, 0.1);
float surface = smoothstep(1.0, 1.1, field);
```

### Wave Patterns

```glsl
// Simple sine wave
float wave = sin(st.x * 10.0 + u_time) * 0.5 + 0.5;

// Multiple layered waves
float waves = 0.0;
for (float i = 0.0; i < 4.0; i++) {
  waves += sin(st.x * (5.0 + i * 2.0) + u_time * (0.5 + i * 0.2)) * (1.0 - i * 0.2);
}
```

### Smooth Blending

```glsl
// Soft edge band
float band = smoothstep(0.1, 0.0, abs(st.y - 0.5));

// Circular gradient
float circle = 1.0 - length(st - 0.5) * 2.0;

// Smooth min (for blob merging)
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
```

---

## Performance Tips

1. **Avoid heavy loops**: Keep loop iterations under 10
2. **Use `mediump float`**: Add `precision mediump float;` for mobile
3. **Minimize texture lookups**: Hash functions are faster
4. **Precompute constants**: Move calculations outside loops
5. **Test on mobile**: Use Chrome DevTools device emulation

---

## Existing Experiments Reference

| ID | Name | Effect Type | Key Technique |
|----|------|-------------|---------------|
| V1 | Aurora | Atmospheric | Layered sine bands + noise |
| V2 | Fog | Atmospheric | FBM noise layers |
| V3 | Bloom | Light | Additive circular glows |
| V4 | Liquid | Organic | Metaballs / distance fields |
| V5 | Waves | Calm | Sine wave layers |
| V6 | Void | Glitch | Digital noise / static |
| V7 | Scan | Technical | Depth parallax grid |
| V8 | Web | Wireframe | Blur + depth of field |
| V9 | Lines | Topographic | Bold contour lines |
| V10 | Builder | Procedural | Texture generation |
| V11 | Halftone | Print | Raymarched dithering |

---

## Testing Checklist

Before committing:

- [ ] Shader compiles without errors
- [ ] Animation runs at 60fps on desktop
- [ ] Mouse interaction works
- [ ] Dark mode looks good
- [ ] Light mode looks good
- [ ] Navigation prev/next works
- [ ] Keyboard shortcuts work (Escape, arrows)
- [ ] `yarn build` passes
- [ ] Mobile looks acceptable (optional)

---

## Quick Commands

```bash
# Start dev server
yarn dev

# Build and check for errors
yarn build

# Test specific experiment
# Open http://localhost:3000/experiments/v[N]
```
