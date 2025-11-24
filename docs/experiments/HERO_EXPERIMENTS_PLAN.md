# Hero Page Experiments - Development Plan

**Created**: 2025-11-24
**Author**: Researcher 2
**Status**: Planning
**Goal**: Prototype multiple creative landing page effects for selection

---

## Executive Summary

This document outlines the architecture and approach for creating experimental hero page variations using ambient/atmospheric light effects. The system allows rapid prototyping via separate routes (`/experiments/v1`, `/experiments/v2`, etc.) for easy A/B comparison.

---

## Current State Analysis

### Existing Shader System (ShaderVisual.jsx)

**Strengths** (to build upon):
- Route-reactive personality system (5 attributes)
- Theme-aware background (dark/light mode)
- Harmonic motion (John Whitney-inspired)
- Cursor trail light sculpting (Gmunk-inspired)
- Multi-layer depth perception (SANAA-inspired)

**Current Uniforms Available**:
```glsl
// Core
u_time, u_resolution, u_mouse, u_lightPos

// Theme
u_backgroundColor

// Personality (5 attributes)
u_complexity, u_energy, u_focus, u_warmth, u_depth

// Cursor trails
u_trailCount, u_trailPositions[10], u_trailStrengths[10]
```

**Current Visual Character** (Home `/`):
- complexity: 0.5 (balanced pattern density)
- energy: 0.6 (medium animation speed)
- focus: 0.5 (balanced sharpness)
- warmth: 0.5 (neutral temperature)
- depth: 0.4 (subtle layering)

---

## Ambient/Atmospheric Light Concepts

Based on your direction ("ambient/atmospheric - soft glows, gradients, subtle movements like fog/aurora"), here are prototype concepts:

### V1: Aurora Borealis
**Inspiration**: Northern lights - flowing color bands
**Effect**: Smooth, flowing vertical color gradients that shift slowly
**Technical Approach**:
- Multi-layer horizontal noise bands
- Color interpolation along Y-axis
- Slow harmonic wave deformation
- Mouse influence on flow direction

### V2: Fog/Mist
**Inspiration**: Morning fog, atmospheric depth
**Effect**: Layered translucent clouds that drift and reveal/obscure
**Technical Approach**:
- 4-5 alpha-blended noise layers at different speeds
- Depth-based opacity (far = more opaque)
- Mouse creates gentle "parting" effect
- Very slow animation (~0.02 time multiplier)

### V3: Light Bloom/Glow
**Inspiration**: Camera bokeh, soft light sources
**Effect**: Multiple soft circular glows that drift and overlap
**Technical Approach**:
- 3-5 soft radial gradients
- Each glow moves on unique harmonic path
- Overlapping creates additive brightness
- Cursor acts as additional light source

### V4: Liquid Light
**Inspiration**: Lava lamps, viscous fluid
**Effect**: Organic blob shapes that merge and separate
**Technical Approach**:
- Metaball/signed-distance-field approach
- 4-6 moving centers with varying radii
- Smooth threshold creates organic edges
- Mouse influences nearest blob

### V5: Gradient Waves
**Inspiration**: Calm ocean, meditation apps
**Effect**: Subtle horizontal gradient waves
**Technical Approach**:
- Layered sine waves on gradient positions
- Color transitions between 2-3 complementary tones
- Very gentle vertical oscillation
- Mouse adds subtle ripple

---

## Architecture: Separate Routes Approach

### File Structure

```
src/
├── components/
│   ├── experiments/           # NEW: Experimental components
│   │   ├── ExperimentNav.jsx  # Navigation between experiments
│   │   ├── v1/
│   │   │   ├── AuroraShader.jsx
│   │   │   └── aurora.frag.glsl
│   │   ├── v2/
│   │   │   ├── FogShader.jsx
│   │   │   └── fog.frag.glsl
│   │   ├── v3/
│   │   │   ├── BloomShader.jsx
│   │   │   └── bloom.frag.glsl
│   │   ├── v4/
│   │   │   ├── LiquidShader.jsx
│   │   │   └── liquid.frag.glsl
│   │   └── v5/
│   │       ├── WavesShader.jsx
│   │       └── waves.frag.glsl
│   └── ShaderVisual.jsx       # Existing (unchanged)
├── shaders/
│   └── truchet.frag.glsl      # Existing (unchanged)
```

### Route Configuration (App.jsx additions)

```javascript
// Lazy load experimental components
const ExperimentV1 = lazy(() => import('./components/experiments/v1/AuroraShader'));
const ExperimentV2 = lazy(() => import('./components/experiments/v2/FogShader'));
// ... etc

// Routes (add inside AnimatedRoutes)
<Route path="/experiments" element={<ExperimentNav />} />
<Route path="/experiments/v1" element={<ExperimentV1 />} />
<Route path="/experiments/v2" element={<ExperimentV2 />} />
// ... etc
```

### Navigation Component (ExperimentNav.jsx)

Simple grid showing all experiments with live previews:
- Thumbnail preview of each shader
- Click to view full-screen
- "Select" button to mark favorite
- Notes field for annotations

---

## Development Workflow

### Phase 1: Infrastructure (Engineer 1)
**Time**: 30-45 min
**Tasks**:
1. Create `/src/components/experiments/` directory structure
2. Create base `ExperimentShader.jsx` template (shared Three.js setup)
3. Add `/experiments/*` routes to App.jsx
4. Create `ExperimentNav.jsx` navigation component

### Phase 2: First Prototype (Engineer 2)
**Time**: 45-60 min
**Tasks**:
1. Implement V1 (Aurora) shader using base template
2. Test mouse interaction
3. Tune animation speed and color palette
4. Verify lazy loading works

### Phase 3: Variations (Engineer 3)
**Time**: 60-90 min
**Tasks**:
1. Implement V2 (Fog) shader
2. Implement V3 (Bloom) shader
3. Ensure each has distinct visual character
4. Add parameter controls (optional: on-screen sliders)

### Phase 4: Polish & Selection (Engineer 4)
**Time**: 45-60 min
**Tasks**:
1. Implement V4 (Liquid) and V5 (Waves)
2. Add ExperimentNav preview thumbnails
3. Performance optimization pass
4. Create comparison mode (side-by-side)

### Phase 5: Research & Documentation (Researcher 1 & 2)
**Time**: 40 min each
**Tasks**:
- Researcher 1: Performance analysis of each variant
- Researcher 2: Document patterns, update CLAUDE.md

### Phase 6: Selection & Integration (QA)
**Time**: 30 min
**Tasks**:
1. Test all variants on different devices
2. User selects winner
3. Integrate winner as new Hero default (or keep as option)

---

## Base Shader Template

Create once, reuse for all experiments:

```jsx
// src/components/experiments/BaseExperimentShader.jsx
import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { ThemeContext } from '../../context/ThemeContext';

const BaseExperimentShader = ({
  fragmentShader,
  title,
  customUniforms = {}
}) => {
  const mountRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (!mountRef.current) return;

    const bgColor = isDarkMode
      ? new THREE.Vector3(0.0, 0.0, 0.0)
      : new THREE.Vector3(1.0, 1.0, 1.0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    // Base uniforms + custom
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_backgroundColor: { value: bgColor },
        ...customUniforms
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      material.uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      material.uniforms.u_mouse.value.set(x, y);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isDarkMode, fragmentShader]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div style={{
        position: 'absolute',
        top: 40,
        left: 40,
        color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        fontFamily: 'Work Sans, sans-serif',
        fontSize: '12px',
        letterSpacing: '2px'
      }}>
        {title}
      </div>
    </div>
  );
};

export default BaseExperimentShader;
```

---

## Example Shader: Aurora (V1)

```glsl
// src/components/experiments/v1/aurora.frag.glsl
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Simplex noise function (or use hash-based)
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

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

  // Aurora effect: horizontal bands with vertical noise displacement
  float time = u_time * 0.1; // Very slow

  // Multiple aurora bands
  float aurora = 0.0;

  for (float i = 0.0; i < 3.0; i++) {
    float offset = i * 0.2;
    float yPos = 0.3 + offset;

    // Horizontal wave deformation
    float wave = sin(st.x * 3.0 + time + i) * 0.1;
    wave += sin(st.x * 5.0 - time * 1.2 + i * 2.0) * 0.05;

    // Noise for organic feel
    float n = noise(vec2(st.x * 2.0 + time, i)) * 0.15;

    // Band intensity
    float band = smoothstep(0.15, 0.0, abs(st.y - yPos - wave - n));
    aurora += band * (1.0 - i * 0.2);
  }

  // Mouse influence: gently push aurora
  float mouseInfluence = 1.0 - distance(st, u_mouse) * 0.5;
  aurora *= (0.8 + mouseInfluence * 0.2);

  // Color gradient (green to purple aurora colors)
  vec3 auroraColor = mix(
    vec3(0.1, 0.8, 0.3),  // Green
    vec3(0.5, 0.2, 0.8),  // Purple
    st.y + sin(time) * 0.2
  );

  // Blend with background
  vec3 color = mix(u_backgroundColor, auroraColor, aurora * 0.4);

  gl_FragColor = vec4(color, 1.0);
}
```

---

## Quick Start Commands

```bash
# 1. Start development
yarn dev

# 2. Navigate to experiments
# http://localhost:3000/experiments

# 3. View individual experiment
# http://localhost:3000/experiments/v1
# http://localhost:3000/experiments/v2
# etc.
```

---

## Success Criteria

- [ ] 5 distinct visual experiments created
- [ ] Each experiment lazy-loaded (no bundle bloat)
- [ ] Smooth 60fps on desktop
- [ ] Mouse interaction working on all variants
- [ ] Theme-aware (dark/light mode)
- [ ] Easy navigation between experiments
- [ ] Clear visual differentiation between variants
- [ ] User can select preferred variant

---

## Next Steps

1. **Approve this plan** - Confirm the 5 concepts are the direction you want
2. **Start Engineer 1** - Create infrastructure
3. **Iterate through engineers** - Build variants
4. **Research & QA** - Analyze and test
5. **Select winner** - Choose preferred effect
6. **Integrate** - Apply to production Hero page

---

## References

- [SHADER_PHILOSOPHY.md](../design/SHADER_PHILOSOPHY.md) - Existing shader design principles
- [COMPONENTS.md](../architecture/COMPONENTS.md) - Component patterns
- [ShaderVisual.jsx](../../src/components/ShaderVisual.jsx) - Reference implementation
