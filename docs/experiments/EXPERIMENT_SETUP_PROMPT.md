# Experiment Setup Prompt (v21-v30)

## Overview

This prompt sets up the scaffolding for shader experiments v21 through v30. Each experiment follows a consistent pattern with proper file structure, validation checklist, and merge-ready comments.

---

## Task: Setup Experiment Structure

Read this document and create the folder structure, template files, and update the central configuration for experiments v21-v30.

### Files to Read First

Before implementing, read these files to understand existing patterns:

```
src/components/experiments/experimentConfig.js    # Central config - ADD entries here
src/components/experiments/BaseExperimentShader.jsx  # Base shader component
src/components/experiments/v1/index.jsx           # Simple example
src/components/experiments/v18/index.jsx          # Complex example with custom uniforms
src/shaders/experiments/                          # GLSL shader files
```

---

## Step 1: Update experimentConfig.js

Add entries for v21-v30 to the `experiments` array:

```javascript
// Add after v20 entry:
{
  id: 'v21',
  name: 'TBD',
  description: 'Placeholder - define effect here',
  colors: ['#000000', '#888888', '#FFFFFF']
},
{
  id: 'v22',
  name: 'TBD',
  description: 'Placeholder - define effect here',
  colors: ['#000000', '#888888', '#FFFFFF']
},
// ... continue through v30
```

---

## Step 2: Create Folder Structure

For each experiment (v21-v30), create:

```
src/components/experiments/v{N}/
├── index.jsx           # React component
├── README.md           # Experiment documentation
└── MERGE_NOTES.md      # Integration notes for combining with other experiments
```

```
src/shaders/experiments/
├── v{N}.frag.glsl      # Fragment shader
```

---

## Step 3: Template Files

### Template: index.jsx

```jsx
import React, { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/v{N}.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V{N}: {EXPERIMENT_NAME}
 *
 * Description: {BRIEF_DESCRIPTION}
 *
 * Features:
 * - {FEATURE_1}
 * - {FEATURE_2}
 * - {FEATURE_3}
 *
 * Controls:
 * - Escape: Return to gallery
 * - Arrow keys: Navigate experiments
 * - {CUSTOM_CONTROLS}
 *
 * ============================================
 * VALIDATION CHECKLIST (complete before merge)
 * ============================================
 * [ ] Shader compiles without errors
 * [ ] No console errors on load
 * [ ] Responsive to window resize
 * [ ] Mouse/touch interaction works (if applicable)
 * [ ] Navigation works (ESC, arrows)
 * [ ] Theme switching works (dark/light)
 * [ ] Performance acceptable (60fps target)
 * [ ] Mobile touch events work
 * [ ] Cleanup runs on unmount (no memory leaks)
 * [ ] README.md updated with effect description
 *
 * ============================================
 * MERGE INTEGRATION POINTS
 * ============================================
 * If merging features from other experiments:
 *
 * FROM V18 (Topographic Hand):
 * - Image switching: See imageOptions pattern
 * - Layer system: See z-index uniforms
 * - Custom uniforms: See customUniforms pattern
 *
 * FROM V17 (Atmosphere):
 * - Film grain: Copy grain calculation
 * - Vignette: Copy vignette calculation
 *
 * FROM V15-V16:
 * - Depth map usage: See u_depthMap texture loading
 * - Contour lines: See calculateContour function
 *
 * See MERGE_NOTES.md for specific integration instructions.
 * ============================================
 */

const CURRENT_ID = 'v{N}';

// ============================================
// STYLED COMPONENTS
// ============================================

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
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

// Add more styled components as needed for controls

// ============================================
// COMPONENT
// ============================================

const Experiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // ========================================
  // STATE
  // ========================================
  // Add experiment-specific state here
  // Example: const [intensity, setIntensity] = useState(1.0);

  // ========================================
  // CUSTOM UNIFORMS
  // ========================================
  // Define custom uniforms for the shader
  // These are passed to BaseExperimentShader
  const [customUniforms] = useState(() => ({
    // Example uniforms:
    // u_intensity: { value: 1.0 },
    // u_color: { value: new THREE.Vector3(1.0, 0.5, 0.2) },
  }));

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft' && prev) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/experiments/${next.id}`);

      // Add custom key bindings here
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  // ========================================
  // RENDER
  // ========================================
  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Experiment'}`}
        customUniforms={customUniforms}
      />

      {/* Navigation */}
      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev?.id || 'v20'}`)}>
            ← PREV
          </NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next?.id || 'v1'}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>

      {/* Add control panels, info panels, etc. here */}
    </>
  );
};

export default Experiment;
```

### Template: v{N}.frag.glsl

```glsl
precision highp float;

// ============================================
// BASE UNIFORMS (provided by BaseExperimentShader)
// ============================================
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// ============================================
// CUSTOM UNIFORMS
// ============================================
// Add experiment-specific uniforms here
// uniform float u_intensity;
// uniform vec3 u_color;

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Hash function for noise
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Value noise
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

// ============================================
// MAIN EFFECT FUNCTIONS
// ============================================

// TODO: Add your effect functions here
// Example:
// float calculateEffect(vec2 uv, float time) {
//     return 0.0;
// }

// ============================================
// MAIN
// ============================================

void main() {
    // Normalized coordinates (0-1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Centered coordinates (-0.5 to 0.5)
    vec2 centered = uv - 0.5;

    // Aspect-corrected coordinates
    float aspect = u_resolution.x / u_resolution.y;
    vec2 aspectCorrected = vec2(centered.x * aspect, centered.y);

    // Base color
    vec3 color = u_backgroundColor;

    // ========================================
    // EFFECT IMPLEMENTATION
    // ========================================
    // TODO: Implement your effect here

    // Example: Simple gradient based on UV
    // color = mix(color, vec3(1.0), uv.y * 0.5);

    // ========================================
    // OUTPUT
    // ========================================
    gl_FragColor = vec4(color, 1.0);
}
```

### Template: README.md

```markdown
# V{N}: {EXPERIMENT_NAME}

## Description

{DETAILED_DESCRIPTION}

## Visual Effect

{DESCRIBE_WHAT_IT_LOOKS_LIKE}

## Technical Approach

{EXPLAIN_THE_ALGORITHM}

## Controls

| Key | Action |
|-----|--------|
| ESC | Return to gallery |
| ←/→ | Navigate experiments |
| {KEY} | {ACTION} |

## Parameters

| Uniform | Type | Range | Description |
|---------|------|-------|-------------|
| u_time | float | 0+ | Animation time |
| {UNIFORM} | {TYPE} | {RANGE} | {DESCRIPTION} |

## Inspiration / References

- {LINK_OR_REFERENCE}

## Performance Notes

- Target: 60fps
- {PERFORMANCE_CONSIDERATIONS}

## TODO

- [ ] {FUTURE_ENHANCEMENT}
```

### Template: MERGE_NOTES.md

```markdown
# V{N} Merge Notes

## Compatible Features from Other Experiments

### From V18 (Topographic Hand)

**Image Switching System**
```jsx
// Copy these patterns if you need multiple texture inputs:
const imageOptions = [
  { name: 'Option 1', path: '/assets/path/image1.png' },
  { name: 'Option 2', path: '/assets/path/image2.png' },
];
const [activeImage, setActiveImage] = useState(0);
const texturesRef = useRef([]);
```

**Layer Z-Index System**
```glsl
// Uniforms needed:
uniform float u_zindex_layer1;
uniform float u_zindex_layer2;

// Composition pattern:
for (float z = 0.0; z <= 5.0; z += 1.0) {
    if (abs(u_zindex_layer1 - z) < 0.5) {
        color = mix(color, layer1Color, layer1Intensity);
    }
    // ... more layers
}
```

**Ridgeline Effect**
```glsl
// Key uniforms:
uniform float u_ridge_count;
uniform float u_ridge_amplitude;
uniform float u_ridge_thickness;
uniform float u_ridge_bgOpacity;
uniform float u_ridge_bgSpacing;
uniform float u_ridge_bgScroll;
```

### From V17 (Atmosphere)

**Film Grain**
```glsl
float grain = hash(uv * u_resolution.xy + u_time * 1000.0) * 0.1;
color += grain;
```

**Vignette**
```glsl
float vignette = 1.0 - length(uv - 0.5) * 0.3;
color *= vignette;
```

### From V15-V16 (Depth Map)

**Depth Texture Loading**
```jsx
const textureLoader = new THREE.TextureLoader();
textureLoader.load('/assets/hand/hand_depth.png', (texture) => {
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  customUniforms.u_depthMap.value = texture;
});
```

**Contour Lines**
```glsl
float contour = fract(depth / interval);
float line = smoothstep(0.0, thickness, contour) *
             smoothstep(thickness * 2.0, thickness, contour);
```

## Integration Checklist

When merging features:

- [ ] Copy required uniforms to both JSX and GLSL
- [ ] Add state variables for any new controls
- [ ] Add useEffect for uniform synchronization
- [ ] Copy styled components for UI controls
- [ ] Test performance impact
- [ ] Update README.md with new controls
- [ ] Document any modifications made

## Conflict Resolution

If two features conflict:

1. Identify the conflicting uniforms/functions
2. Namespace them: `u_effect1_param` vs `u_effect2_param`
3. Add toggle to switch between modes if needed
4. Document the resolution in this file
```

---

## Step 4: Update App.jsx Routes

Add lazy imports and routes for v21-v30:

```jsx
// Add imports (around line 30-40)
const V21 = lazy(() => import('./components/experiments/v21'));
const V22 = lazy(() => import('./components/experiments/v22'));
// ... through V30

// Add routes (in the experiments route section)
<Route path="v21" element={<V21 />} />
<Route path="v22" element={<V22 />} />
// ... through V30
```

---

## Step 5: Validation Checklist (Global)

Before any experiment is considered complete:

### Functionality
- [ ] Shader compiles without GLSL errors
- [ ] No JavaScript console errors
- [ ] Effect renders correctly centered
- [ ] Animation runs smoothly (60fps target)

### Responsiveness
- [ ] Window resize updates resolution uniform
- [ ] Effect scales correctly on different screen sizes
- [ ] Works on mobile viewport sizes

### Interaction
- [ ] Mouse position tracked correctly
- [ ] Touch events work on mobile
- [ ] Custom controls (if any) update uniforms

### Navigation
- [ ] ESC returns to gallery
- [ ] Arrow keys navigate prev/next
- [ ] Back button works
- [ ] URL routing works directly

### Theme
- [ ] Responds to dark/light mode toggle
- [ ] Colors are readable in both modes

### Performance
- [ ] No memory leaks (check with DevTools)
- [ ] Cleanup runs on unmount
- [ ] Animation frame cancelled on unmount
- [ ] Event listeners removed on unmount

### Documentation
- [ ] README.md describes the effect
- [ ] MERGE_NOTES.md lists integration points
- [ ] Code comments explain complex logic
- [ ] experimentConfig.js entry is complete

---

## Execution Command

Run this in a new Claude Code session:

```
Read /Users/johnnysheng/Documents/GitHub/portfolioyush/docs/experiments/EXPERIMENT_SETUP_PROMPT.md

Then execute the following tasks:
1. Update experimentConfig.js with placeholder entries for v21-v30
2. Create folder structure for each experiment (v21-v30)
3. Create template files (index.jsx, README.md, MERGE_NOTES.md)
4. Create template shader files (v21.frag.glsl through v30.frag.glsl)
5. Update App.jsx with lazy imports and routes
6. Verify the setup by checking that navigation works

Do NOT implement actual effects - just create the scaffolding.
Each experiment folder should be ready for a future session to implement the unique effect.
```

---

## Notes for Future Sessions

When implementing a specific experiment (e.g., v25):

1. Read `src/components/experiments/v25/README.md` for the planned effect
2. Read `src/components/experiments/v25/MERGE_NOTES.md` if combining features
3. Implement the effect in `src/shaders/experiments/v25.frag.glsl`
4. Add any custom uniforms and controls to `v25/index.jsx`
5. Complete the validation checklist in the component header
6. Update the name/description in `experimentConfig.js`

---

*Generated for portfolioyush experiment framework*
*Last updated: 2024-11*
