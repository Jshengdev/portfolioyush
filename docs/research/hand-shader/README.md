# Hand Shader Visual System - Research Library

**Status**: Complete (2025-11-25)
**Agents Used**: 5 parallel research agents
**Total Research Time**: ~30 minutes

---

## Quick Navigation

| Section | Purpose | Start Here If... |
|---------|---------|------------------|
| [01-OVERVIEW.md](01-OVERVIEW.md) | High-level architecture & decisions | You need the big picture |
| [02-CONTOURS.md](02-CONTOURS.md) | Contour line shader implementation | You're implementing contour lines |
| [03-HEIGHTMAP.md](03-HEIGHTMAP.md) | Depth map generation methods | You need to create/get a depth map |
| [04-DISSOLUTION.md](04-DISSOLUTION.md) | Edge dissolution & particles | You're implementing the dissolve effect |
| [05-LAYERING.md](05-LAYERING.md) | Multi-pass shader architecture | You're structuring the shader system |
| [06-AESTHETICS.md](06-AESTHETICS.md) | Visual direction & art references | You need design guidance |
| [07-IMPLEMENTATION.md](07-IMPLEMENTATION.md) | Step-by-step build guide | You're ready to code |
| [assets/](assets/) | Code snippets, uniforms reference | You need copy-paste code |

---

## Project Goal

Build a WebGL/Three.js hero section featuring a **hand rendered with topographic contour lines**, **stipple texture**, and **edge dissolution into particles**. The hand should appear 3D through shader techniques on a 2D plane, with horizontal lines that warp based on surface topology.

**Visual Target**: Joy Division "Unknown Pleasures" meets Ed Fairburn topographic portraits meets data visualization

---

## System Architecture (High-Level)

```
┌─────────────────────────────────────────────────────────────┐
│                     Hand Shader System                       │
├─────────────────────────────────────────────────────────────┤
│  INPUT                                                       │
│  ├── Hand depth map (PNG, 512x512 or 1024x1024)             │
│  ├── Time uniform (animation)                                │
│  └── Cursor position (interaction)                           │
├─────────────────────────────────────────────────────────────┤
│  LAYER STACK (bottom to top)                                 │
│  ├── Layer 0: Background (existing fog system)               │
│  ├── Layer 1: Hand silhouette (depth map alpha)              │
│  ├── Layer 2: Contour lines (fract + fwidth + smoothstep)    │
│  ├── Layer 3: Stipple texture (noise-based dot pattern)      │
│  ├── Layer 4: Edge dissolution (Perlin noise erosion)        │
│  └── Layer 5: Particles (GPGPU, spawn at dissolving edges)   │
├─────────────────────────────────────────────────────────────┤
│  OUTPUT                                                      │
│  └── Composited WebGL canvas                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Depth map source** | Depth-Anything V2 (online) | Easiest, highest quality, 5 min |
| **Contour algorithm** | fract + fwidth + smoothstep | Standard, performant, anti-aliased |
| **Texture format** | 8-bit grayscale PNG | WebGL1 compatible, sufficient precision |
| **Rendering approach** | Hybrid (single-pass + multi-pass) | Balance flexibility & performance |
| **Particle system** | GPGPU with FBO ping-pong | 50K+ particles at 60fps |
| **Wind physics** | Multi-octave Perlin noise | Organic, non-repetitive motion |
| **Dissolution method** | Perlin noise erosion | Most organic edge treatment |

---

## Implementation Timeline

| Phase | Task | Est. Time |
|-------|------|-----------|
| 1 | Generate hand depth map | 15 min |
| 2 | Base contour shader | 2-3 hrs |
| 3 | Stipple texture layer | 1-2 hrs |
| 4 | Edge dissolution shader | 2-3 hrs |
| 5 | GPGPU particle system | 3-4 hrs |
| 6 | Wind physics | 1-2 hrs |
| 7 | Integration & polish | 2-3 hrs |
| **Total** | | **12-18 hrs** |

---

## Critical Dependencies

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──┐
(Depth map)  (Contours)  (Stipple)  (Dissolve) │
                                               ▼
                         Phase 6 ◄── Phase 5 ◄─┘
                         (Wind)      (Particles)
                                               │
                                               ▼
                                          Phase 7
                                       (Integration)
```

---

## Asset Checklist

- [ ] Hand photo (for depth estimation)
- [ ] Hand depth map PNG (`/public/assets/hand_depth.png`) //or related name with depth.png
- [ ] Perlin noise functions (GLSL)
- [ ] Stipple pattern texture (optional, can be procedural)

---

## Uniform Control Panel (All Layers)

```javascript
// Master uniform reference - all tweakable values
uniforms: {
  // Global
  u_time: 0,
  u_resolution: vec2,
  u_mouse: vec2,

  // Layer toggles (for debugging)
  u_showContours: true,
  u_showStipple: true,
  u_showDissolution: true,
  u_showParticles: true,

  // Contour layer
  u_contourInterval: 0.05,     // Distance between lines (0.02-0.1)
  u_contourThickness: 1.5,     // Line width in pixels (0.5-3.0)
  u_contourAlpha: 0.7,         // Line opacity (0.3-1.0)

  // Stipple layer
  u_stippleScale: 50.0,        // Dot density (20-100)
  u_stippleThreshold: 0.5,     // Density falloff (0.3-0.7)

  // Dissolution layer
  u_dissolveProgress: 0.0,     // Animation progress (0.0-1.0)
  u_dissolveNoiseScale: 3.0,   // Noise frequency (1.0-5.0)
  u_dissolveEdgeWidth: 0.1,    // Glow width (0.05-0.2)

  // Particle layer
  u_particleCount: 50000,
  u_particleSize: 2.0,
  u_windStrength: 1.0,
  u_windDirection: vec3(1, 0.2, 0),
}
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Depth map quality insufficient | Low | Medium | Manual GIMP refinement as fallback |
| Performance issues (particles) | Medium | High | LOD system, reduce count on mobile |
| WebGL1 compatibility | Low | Medium | Use LuminanceFormat, avoid R16 textures |
| Shader complexity bugs | Medium | Medium | Build incrementally, debug each layer |
| Browser crashes | Low | High | Memory limits on textures, dispose properly |

---

## File Structure

```
docs/research/hand-shader/
├── README.md                 # This file (navigation hub)
├── 01-OVERVIEW.md           # Architecture & decisions
├── 02-CONTOURS.md           # Contour line implementation
├── 03-HEIGHTMAP.md          # Depth map generation
├── 04-DISSOLUTION.md        # Edge dissolution & particles
├── 05-LAYERING.md           # Multi-pass architecture
├── 06-AESTHETICS.md         # Visual direction & references
├── 07-IMPLEMENTATION.md     # Step-by-step build guide
└── assets/
    ├── uniforms.js          # Copy-paste uniform definitions
    ├── contour-shader.glsl  # Core contour algorithm
    ├── dissolution.glsl     # Perlin dissolution snippet
    ├── particles.glsl       # GPGPU particle snippet
    └── sources.md           # All research sources
```

---

## Quick Start

1. **Read**: [01-OVERVIEW.md](01-OVERVIEW.md) for full context
2. **Generate**: Depth map via [Depth-Anything V2](https://huggingface.co/spaces/depth-anything/Depth-Anything-V2)
3. **Implement**: Follow [07-IMPLEMENTATION.md](07-IMPLEMENTATION.md) step-by-step
4. **Reference**: [assets/](assets/) for copy-paste code

---

## Research Sources Summary

- **Technical**: ShaderToy, Three.js docs, Stack Overflow (30+ sources)
- **Artistic**: Ed Fairburn, Tyler Hobbs, Refik Anadol, Joy Division (15+ references)
- **Tutorials**: Codrops, Maxime Heckel, Daniel Ilett, Three.js Journey (10+ tutorials)
- **GitHub**: mapbox/webgl-wind, flimshaw/THREE.GPUParticleSystem, ashima/webgl-noise

Full source list: [assets/sources.md](assets/sources.md)
