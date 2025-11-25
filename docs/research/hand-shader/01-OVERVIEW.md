# 01 - System Overview

## What We're Building

A WebGL/Three.js hand visualization with:
1. **Topographic contour lines** that follow the hand's depth topology
2. **Stipple texture** adding organic grain/dots
3. **Edge dissolution** where the hand dissolves into particles at boundaries
4. **Particle system** with wind physics for blown-sand effect
5. **Integration** with existing atmospheric fog system

---

## Visual Reference

**North Star Aesthetic**: "Data-Driven Organic Cartography"

- **50% Scientific**: Authentic topographic technique (even intervals, precise contours)
- **30% Artistic**: Ed Fairburn's organic line quality, Tyler Hobbs' flow elegance
- **20% Interactive**: Cursor trails sculpt the visualization

**Closest References**:
- Joy Division "Unknown Pleasures" album cover (stacked waveforms)
- Ed Fairburn map portraits (contour lines forming faces)
- Tyler Hobbs' "Fidenza" (flow field line elegance)
- Refik Anadol data sculptures (data as immersive art)

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        INPUT LAYER                                │
├──────────────────────────────────────────────────────────────────┤
│  Hand Depth Map (PNG)     Time Uniform      Cursor Position       │
│  512x512 or 1024x1024     Animation tick    Mouse interaction     │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                     SHADER LAYER STACK                            │
├──────────────────────────────────────────────────────────────────┤
│  Pass 1: Single-Pass Multi-Layer                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Layer 0: Background (existing fog system)                  │  │
│  │ Layer 1: Hand Silhouette (depth map alpha mask)            │  │
│  │ Layer 2: Contour Lines (fract + fwidth + smoothstep)       │  │
│  │ Layer 3: Stipple Texture (noise-based dot pattern)         │  │
│  │ → Output: Solid hand with contours + stipple               │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                │                                  │
│                                ▼                                  │
│  Pass 2: Edge Dissolution                                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Input: Pass 1 result                                       │  │
│  │ Process: Perlin noise erosion on edges                     │  │
│  │ Output: Hand with dissolving edges + edge mask             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                │                                  │
│                                ▼                                  │
│  Pass 3: Particle System (GPGPU)                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Input: Edge mask from Pass 2                               │  │
│  │ Process: Spawn particles at dissolving edges               │  │
│  │ Physics: Wind flow field + turbulence                      │  │
│  │ Output: Additive particle layer                            │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                        OUTPUT LAYER                               │
├──────────────────────────────────────────────────────────────────┤
│  Final Composite: Pass 1 + Pass 2 + Pass 3 (additive blend)       │
│  → Rendered to WebGL canvas                                       │
└──────────────────────────────────────────────────────────────────┘
```

---

## Key Algorithms

### Contour Lines
```
height → normalize by interval → fract() → detect 0-crossing → smoothstep for AA
```

### Dissolution
```
position → Perlin noise → threshold comparison → discard pixels → emit edge mask
```

### Particles
```
edge mask → spawn particles → apply wind (flow field) → update position → render points
```

---

## Performance Budget

| Component | GPU Time | Notes |
|-----------|----------|-------|
| Pass 1 (Contours + Stipple) | 5ms | Single draw call |
| Pass 2 (Dissolution) | 2ms | Single draw call |
| Pass 3 (Particles) | 2ms | 50K particles, instanced |
| **Total** | **9ms** | 60fps = 16.6ms budget ✅ |

---

## Integration Points

### With Existing ShaderVisual.jsx
- Add uniforms: `u_depthMap`, `u_dissolveProgress`, `u_contourInterval`
- Modify fragment shader to sample depth texture
- Keep existing fog/atmosphere as background layer

### With Route-Reactive System
- Map routes to hand behaviors:
  - `/` (Home): Full hand, minimal dissolution
  - `/about`: Contemplative, slow dissolution
  - `/projects`: Dynamic, fast particle emission
  - `/archive`: Archival, layered depth
  - `/contact`: Open, inviting, dissolved palm

### With Cursor Interaction
- Cursor proximity triggers local dissolution
- Light trails interact with contour lines
- Parallax on high-depth areas

---

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Three.js | WebGL renderer | 0.171 |
| GLSL | Shader language | ES 3.0 (WebGL2) / ES 1.0 (WebGL1) |
| Depth-Anything V2 | Depth estimation | Online demo |
| GPUComputationRenderer | Particle physics | Three.js addon |

---

## Success Criteria

**Visual**:
- [ ] Contour lines visibly follow hand topology
- [ ] Lines are smooth, anti-aliased, consistent thickness
- [ ] Edges dissolve organically (not uniform/harsh)
- [ ] Particles drift convincingly like sand in wind
- [ ] Overall aesthetic matches "data-driven organic cartography"

**Technical**:
- [ ] 60fps on mid-range hardware (GTX 1060 / iPhone 12)
- [ ] No memory leaks (proper texture disposal)
- [ ] WebGL1 compatible (LuminanceFormat textures)
- [ ] Each layer toggleable for debugging

**Integration**:
- [ ] Layers on top of existing fog system
- [ ] Route-reactive personality changes
- [ ] Cursor interaction works smoothly

---

## Next Steps

1. **Generate depth map**: [03-HEIGHTMAP.md](03-HEIGHTMAP.md)
2. **Implement contours**: [02-CONTOURS.md](02-CONTOURS.md)
3. **Add dissolution**: [04-DISSOLUTION.md](04-DISSOLUTION.md)
4. **Full implementation guide**: [07-IMPLEMENTATION.md](07-IMPLEMENTATION.md)
