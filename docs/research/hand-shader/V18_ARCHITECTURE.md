# V18 Topographic Hand - Architecture Document

**Version**: 1.0
**Last Updated**: 2025-11-25
**Purpose**: Complete technical reference for LLM-assisted development and effect replication

---

## 1. SCENE ARCHITECTURE

### 1.1 Three.js Scene Setup

| Component | Type | Value | Notes |
|-----------|------|-------|-------|
| **Scene** | `THREE.Scene` | Default | Empty scene, single mesh |
| **Camera** | `THREE.OrthographicCamera` | `(-1, 1, 1, -1, 0.1, 10)` | Full-screen orthographic projection |
| **Camera Position** | `Vector3` | `(0, 0, 5)` | Looking at origin along -Z |
| **Lights** | None | N/A | Pure shader-based rendering, no lighting |
| **Renderer** | `THREE.WebGLRenderer` | `alpha: true, antialias: true` | High-performance preference |
| **Pixel Ratio** | `float` | `min(devicePixelRatio, 2)` | Capped at 2x for performance |

### 1.2 Geometry & Mesh

| Component | Type | Value | Notes |
|-----------|------|-------|-------|
| **Geometry** | `THREE.PlaneGeometry` | `(2, 2)` | Full-screen quad in NDC space |
| **Mesh Count** | `int` | `1` | Single full-screen quad |
| **Render Order** | Default | N/A | Single mesh, no sorting needed |

### 1.3 Material

| Property | Type | Value |
|----------|------|-------|
| **Type** | `THREE.ShaderMaterial` | Custom vertex + fragment |
| **Vertex Shader** | Pass-through | `gl_Position = vec4(position, 1.0)` |
| **Fragment Shader** | Custom | `topographic_hand.frag.glsl` (394 lines) |
| **Transparent** | `bool` | `true` |
| **Side** | Default | `FrontSide` |

---

## 2. RENDER PIPELINE

```
┌─────────────────────────────────────────────────────────────────┐
│                      RENDER PIPELINE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INPUT STAGE                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  u_time      │  │  u_mouse     │  │  u_depthMap  │           │
│  │  (float)     │  │  (vec2)      │  │  (sampler2D) │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         │                 │                 │                    │
│         └────────────────┬┴─────────────────┘                    │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   UV CALCULATION                         │    │
│  │  uv = gl_FragCoord.xy / u_resolution.xy                 │    │
│  │  depthUV = vec2(1.0 - uv.x, uv.y)  // X-flip            │    │
│  └─────────────────────────┬───────────────────────────────┘    │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 DEPTH MAP SAMPLING                       │    │
│  │  depth = texture2D(u_depthMap, depthUV).r               │    │
│  │  handMask = smoothstep(threshold, depth)                │    │
│  └─────────────────────────┬───────────────────────────────┘    │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              LAYER CALCULATION (PARALLEL)                │    │
│  │                                                          │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐    │    │
│  │  │CONTOURS │ │STIPPLE  │ │SCANLINES│ │DISSOLUTION  │    │    │
│  │  │Layer 2  │ │Layer 3  │ │Layer 4  │ │Layer 5      │    │    │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └──────┬──────┘    │    │
│  │       │           │           │             │            │    │
│  └───────┼───────────┼───────────┼─────────────┼────────────┘    │
│          │           │           │             │                  │
│          └───────────┴─────┬─────┴─────────────┘                  │
│                            ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                    COMPOSITION                           │     │
│  │  combinedPattern = max(contour, stipple, scanlines)     │     │
│  │  finalMask = handMask * dissolutionMask                 │     │
│  │  color = mix(bgColor, lineColor, pattern * finalMask)   │     │
│  └─────────────────────────┬───────────────────────────────┘     │
│                            ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                   POST-PROCESSING                        │     │
│  │  vignette = 1.0 - length(uv - 0.5) * 0.2               │     │
│  │  color *= vignette                                       │     │
│  └─────────────────────────┬───────────────────────────────┘     │
│                            ▼                                      │
│                     gl_FragColor                                  │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 3. SHADER INVENTORY

### 3.1 Fragment Shader Structure

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`
**Lines**: 394
**Language**: GLSL ES 3.0 (WebGL2)

```
topographic_hand.frag.glsl
├── [1-12]     Header comment
├── [14-51]    UNIFORMS declaration
├── [52-89]    NOISE FUNCTIONS (hash, noise, fbm)
├── [91-158]   PERLIN 3D NOISE (for dissolution)
├── [160-180]  CONTOUR LINE CALCULATION
├── [182-207]  STIPPLE PATTERN
├── [209-228]  SCANLINE CALCULATION (Joy Division)
├── [230-260]  DISSOLUTION CALCULATION
├── [262-393]  MAIN function
│   ├── [266-286]  Depth map sampling
│   ├── [287-295]  Layer 2: Contours
│   ├── [297-307]  Layer 3: Stipple
│   ├── [309-316]  Layer 4: Scanlines
│   ├── [318-334]  Layer 5: Dissolution
│   ├── [336-358]  Composition
│   ├── [360-383]  Debug mode
│   └── [385-392]  Post-processing (vignette)
```

### 3.2 Shader Functions

| Function | Lines | Purpose | Inputs | Output |
|----------|-------|---------|--------|--------|
| `hash(vec2)` | 56-58 | Pseudo-random hash | `vec2 p` | `float` (0-1) |
| `hash2(vec2)` | 60-62 | 2D pseudo-random | `vec2 p` | `vec2` (0-1, 0-1) |
| `noise(vec2)` | 64-75 | Value noise | `vec2 p` | `float` (0-1) |
| `fbm(vec2, int)` | 77-89 | Fractal Brownian Motion | `vec2 p, int octaves` | `float` |
| `perlin3d(vec3)` | 100-158 | 3D Perlin noise | `vec3 v` | `float` (-1 to 1) |
| `calculateContour(float, float, float)` | 164-180 | Contour line detection | `height, interval, thickness` | `float` (0-1) |
| `stipple(vec2, float, float)` | 186-198 | Single stipple layer | `uv, density, dotDensity` | `float` (0-1) |
| `multiStipple(vec2, float)` | 201-207 | Multi-scale stipple | `uv, density` | `float` (0-1) |
| `calculateScanlines(vec2, float, float, float, float)` | 213-228 | Joy Division lines | `uv, depth, count, displacement, thickness` | `float` (0-1) |
| `calculateDissolution(vec2, float, float, float)` | 239-260 | Edge dissolution | `uv, progress, noiseScale, edgeWidth` | `DissolutionResult` |

---

## 4. UNIFORM INVENTORY

### 4.1 Base Uniforms (from BaseExperimentShader)

| Uniform | Type | Default | Source | Description |
|---------|------|---------|--------|-------------|
| `u_time` | `float` | `0.0` | Animation loop | Elapsed time in seconds |
| `u_resolution` | `vec2` | `(width*dpr, height*dpr)` | Window resize | Actual drawing buffer size |
| `u_mouse` | `vec2` | `(0.5, 0.5)` | Mouse move | Normalized mouse position (0-1) |
| `u_backgroundColor` | `vec3` | `(0,0,0)` or `(1,1,1)` | Theme | Dark/light mode background |

### 4.2 Custom Uniforms (V18-specific)

| Uniform | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| **Texture** |
| `u_depthMap` | `sampler2D` | placeholder | N/A | Hand depth map texture |
| **Layer Toggles** |
| `u_showContours` | `bool` | `true` | - | Enable contour lines |
| `u_showStipple` | `bool` | `false` | - | Enable stipple texture |
| `u_showDissolution` | `bool` | `false` | - | Enable dissolution effect |
| `u_showScanlines` | `bool` | `true` | - | Enable Joy Division scanlines |
| `u_debugMode` | `bool` | `true` | - | Show raw depth map |
| **Contour Layer** |
| `u_contour_interval` | `float` | `0.015` | 0.01-0.1 | Distance between lines (smaller = more) |
| `u_contour_thickness` | `float` | `1.0` | 0.5-3.0 | Line thickness multiplier |
| `u_contour_alpha` | `float` | `0.9` | 0.0-1.0 | Line opacity |
| **Scanline Layer** |
| `u_scanline_count` | `float` | `80.0` | 20-200 | Number of horizontal lines |
| `u_scanline_displacement` | `float` | `0.3` | 0.0-1.0 | Depth displacement amount |
| `u_scanline_thickness` | `float` | `2.0` | 0.5-5.0 | Line thickness |
| **Stipple Layer** |
| `u_stipple_scale` | `float` | `1.0` | 0.5-5.0 | UV scale for stipple pattern |
| `u_stipple_threshold` | `float` | `0.6` | 0.0-1.0 | Density threshold |
| `u_stipple_alpha` | `float` | `0.35` | 0.0-1.0 | Pattern opacity |
| **Dissolution Layer** |
| `u_dissolve_progress` | `float` | `0.0` | 0.0-1.0 | Animation progress |
| `u_dissolve_noiseScale` | `float` | `4.0` | 1.0-10.0 | Noise frequency |
| `u_dissolve_edgeWidth` | `float` | `0.08` | 0.01-0.3 | Edge glow width |
| `u_dissolve_edgeColor` | `vec3` | `(0.53, 0.66, 0.84)` | RGB | Edge glow color (blue accent) |

---

## 5. LAYER SYSTEM

### 5.1 Layer Stack (Bottom to Top)

```
┌────────────────────────────────────────────────┐
│ Layer 6: POST-PROCESSING (Vignette)            │ Always on
├────────────────────────────────────────────────┤
│ Layer 5: DISSOLUTION (Perlin noise erosion)    │ u_showDissolution
├────────────────────────────────────────────────┤
│ Layer 4: SCANLINES (Joy Division horizontal)   │ u_showScanlines
├────────────────────────────────────────────────┤
│ Layer 3: STIPPLE (Multi-scale dot pattern)     │ u_showStipple
├────────────────────────────────────────────────┤
│ Layer 2: CONTOURS (Topographic lines)          │ u_showContours
├────────────────────────────────────────────────┤
│ Layer 1: HAND MASK (Depth threshold)           │ Always on
├────────────────────────────────────────────────┤
│ Layer 0: BACKGROUND (Black)                    │ Always on
└────────────────────────────────────────────────┘
```

### 5.2 Layer Composition Method

Layers are combined using `max()` (additive blend of patterns):

```glsl
float combinedPattern = max(max(contour, stipplePattern), scanlines);
float finalMask = handMask * dissolutionMask;
vec3 color = mix(bgColor, lineColor, combinedPattern * finalMask);
```

**Blend Mode**: Effectively "screen" for white-on-black patterns.

---

## 6. TEXTURE ASSETS

### 6.1 Depth Map

| Property | Value |
|----------|-------|
| **File** | `/public/assets/hand/hand_depth.png` |
| **Size** | 47KB |
| **Format** | PNG, grayscale |
| **Resolution** | ~800x600 (landscape) |
| **Encoding** | Lighter = closer, Darker = farther |
| **minFilter** | `THREE.LinearFilter` |
| **magFilter** | `THREE.LinearFilter` |
| **wrapS/wrapT** | `THREE.ClampToEdgeWrapping` |

### 6.2 UV Transformation

```glsl
// Screen UV
vec2 uv = gl_FragCoord.xy / u_resolution.xy;

// Texture UV (X-flipped for correct hand orientation)
vec2 depthUV = vec2(1.0 - uv.x, uv.y);
```

---

## 7. CONTROLS & INTERACTION

### 7.1 Keyboard Controls

| Key | Action |
|-----|--------|
| `1` | Mode 1: Contours only |
| `2` | Mode 2: Contours + Stipple |
| `3` | Mode 3: Full effect (+ Dissolution) |
| `D` | Toggle debug mode |
| `←` | Previous experiment |
| `→` | Next experiment |
| `Esc` | Return to gallery |

### 7.2 Visual Modes

| Mode | Layers Active |
|------|---------------|
| 1 | Contours, Scanlines |
| 2 | Contours, Scanlines, Stipple |
| 3 | Contours, Scanlines, Stipple, Dissolution |
| Debug | Raw depth map with mask overlay |

### 7.3 React State

```javascript
const [visualMode, setVisualMode] = useState(1);      // 1, 2, or 3
const [debugMode, setDebugMode] = useState(true);     // Show raw depth
const [textureLoaded, setTextureLoaded] = useState(false);
```

---

## 8. INTEGRATION POINTS

### 8.1 Where to Add New Effects

| Location | How to Integrate |
|----------|------------------|
| **New Layer** | Add between Layer 4-5 in shader, add uniform toggle, add to composition |
| **New Uniform** | Add to shader uniforms section, add to customUniforms in JSX |
| **New Post-Process** | Add after composition, before final vignette |
| **New Texture** | Load in useEffect, add sampler2D uniform |
| **New Mode** | Add case in mode switch logic, update modeDescriptions |

### 8.2 Adding a New Layer (Template)

**In Shader (topographic_hand.frag.glsl):**
```glsl
// Add uniform
uniform bool u_showNewLayer;
uniform float u_newLayer_param;

// Add calculation function
float calculateNewLayer(vec2 uv, float depth, float param) {
    // Your effect logic
    return result;
}

// Add in main() after existing layers
float newLayer = 0.0;
if (u_showNewLayer) {
    newLayer = calculateNewLayer(uv, depth, u_newLayer_param);
}

// Add to composition
float combinedPattern = max(max(max(contour, stipplePattern), scanlines), newLayer);
```

**In React (index.jsx):**
```javascript
// Add to customUniforms
u_showNewLayer: { value: false },
u_newLayer_param: { value: 1.0 },

// Add to mode logic
if (visualMode === 4) {
    customUniforms.u_showNewLayer.value = true;
}
```

---

## 9. KNOWN ISSUES & CONSTRAINTS

### 9.1 Current Issues

| Issue | Severity | Description |
|-------|----------|-------------|
| Debug mode defaults ON | Minor | Should probably default OFF for production |
| Scanlines not masked | Minor | Scanlines render everywhere, not just on hand |
| No aspect ratio correction | Minor | Hand stretches with window resize |
| Site nav overlays experiment | Visual | ABOUT/PROJECTS etc. show through |

### 9.2 Performance Constraints

| Constraint | Value | Notes |
|------------|-------|-------|
| Max pixel ratio | 2.0 | Capped for performance |
| Stipple dot density | 800 | Higher causes slowdown |
| FBM octaves | 6 max | Loop unrolling limit |
| Dissolution noise | 3D Perlin | Most expensive operation |

### 9.3 Browser Compatibility

| Feature | Requirement |
|---------|-------------|
| WebGL | WebGL 2.0 preferred, 1.0 fallback |
| `fwidth()` | Built-in WebGL2, extension in WebGL1 |
| GLSL | ES 3.0 |

---

## 10. FILE REFERENCES

| File | Path | Purpose |
|------|------|---------|
| React Component | `src/components/experiments/v18/index.jsx` | Main component, uniforms, controls |
| Fragment Shader | `src/shaders/experiments/topographic_hand.frag.glsl` | All visual effects |
| Base Shader | `src/components/experiments/BaseExperimentShader.jsx` | Three.js setup, animation loop |
| Experiment Config | `src/components/experiments/experimentConfig.js` | Gallery registration |
| Depth Map | `public/assets/hand/hand_depth.png` | Input texture |
| Research Docs | `docs/research/hand-shader/` | Design documentation |

---

## 11. REPLICATION CHECKLIST

To verify each layer independently:

- [ ] **Layer 0 (Background)**: Set all toggles false → solid black screen
- [ ] **Layer 1 (Hand Mask)**: Enable debug mode → see grayscale hand + green tint on mask
- [ ] **Layer 2 (Contours)**: `u_showContours=true`, others false → topographic lines only
- [ ] **Layer 3 (Stipple)**: `u_showStipple=true`, others false → dot pattern on hand
- [ ] **Layer 4 (Scanlines)**: `u_showScanlines=true`, others false → Joy Division lines
- [ ] **Layer 5 (Dissolution)**: `u_showDissolution=true`, progress > 0 → edge erosion + glow
- [ ] **Layer 6 (Vignette)**: Always on, darkens corners

---

**Document Version**: 1.0
**Maintained by**: Claude Code
**For LLM Context**: This document is structured for machine parsing. Each section is self-contained with tables for quick lookup.
