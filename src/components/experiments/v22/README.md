# V22: Luminous Hand

> **CRITICAL**: Read `docs/experiments/MASTER_VISION.md` before modifying.

## Inspiration

**Reference Image:** `docs/experiments/references/particles.png`

**What to steal from reference:**
- Hand form revealed through particle/wisp density (not solid rendering)
- Organic, smoke-like luminous strands tracing contours
- Sparse particles scattered in void, denser near hand
- Pure black background with additive white luminosity
- Bioluminescent "disturbed medium" aesthetic

**Why this serves the master vision:**
- Explores depth-based particle distribution (useful for hand hero)
- Tests FBM domain warping for organic effects
- B&W + atmospheric = master vision signature
- Cursor could disturb particle medium in future phases

---

## Research Log

### Codebase Exploration
- `common.glsl` - FBM, hash, noise functions (reused)
- `v18/index.jsx` - Texture loading pattern with switching (adapted)
- `topographic_hand.frag.glsl` - fwidth edge detection (used)
- `galaxy.frag.glsl` - Particle rendering patterns (referenced)
- `atmosphere.frag.glsl` - Atmospheric/fog patterns (studied)

### External Research
- The Book of Shaders Ch.13: FBM domain warping
- Inigo Quilez: Domain warping techniques
- Shadertoy: "domain warp fbm" searches

### Reference Images
- `docs/experiments/references/particles.png` - Primary visual target

---

## Concept

**What is this?**
A hand emerging from a disturbed particle medium with organic flowing wisps. The hand doesn't render directly—it's revealed through the density and behavior of particles/wisps that respond to the depth map.

**What feeling or idea?**
"Hand reaching into bioluminescent water" - the void is made of particles that glow when displaced. Ethereal, otherworldly presence.

**Key visual elements:**
- Domain-warped FBM wisps tracing hand contours
- THREE.Points particles with depth-based distribution
- Edge concentration using fwidth derivatives
- Additive compositing on pure black
- B&W only (no color yet)

---

## Boundaries

**This experiment IS:**
- Static proof-of-concept (animation is subtle/ambient only)
- Depth-map driven particle/wisp distribution
- FBM domain warping exploration
- B&W atmospheric effect

**This experiment is NOT:**
- Fully animated particle physics simulation
- Cursor interactive (future phase)
- Colorful (master vision: B&W + one bold accent later)
- Don't duplicate: v15 (halftone), v17 (fog), v18 (topographic)

---

## Technical Notes

**Architecture:**
- `index.jsx`: Custom Three.js scene (not BaseExperimentShader)
  - Fullscreen shader plane for wisps
  - THREE.Points overlay for particles
  - Depth map texture loading with switching
  - UI controls for all parameters

- `v22.frag.glsl`: Wisp shader
  - Multi-layer domain-warped FBM
  - Depth-based intensity modulation
  - Edge concentration via fwidth
  - Subtle ambient glow in void

**Particle Generation:**
- Rejection sampling weighted by depth
- ~50k particles (adjustable)
- Size/brightness scaled by depth value
- Additive blending for glow effect

**Performance Notes:**
- THREE.Points is efficient for 100k+ particles
- FBM with 5 octaves is main shader cost
- Watch fwidth calls (derivative computation)

**Parameter Sweet Spots:**
- Wisp Intensity: 1.0-1.5
- Wisp Scale: 4.0-7.0
- Wisp Warp: 0.3-0.7
- Edge Focus: 1.5-3.0
- Particle Count: 30k-70k
- Particle Size: 0.8-1.5

---

## Status

- [x] Research complete
- [x] Core effect working (wisps + particles)
- [ ] Polished & 60fps (needs testing)
- [x] experimentConfig.js updated

---

## Future Phases

**Phase 2: Animation**
- Add gentle particle drift
- Wisp flow animation (already has subtle time-based movement)
- Depth-based particle velocity

**Phase 3: Interaction**
- Cursor disturbs particle medium
- "Pull" interaction revealing hand
- Red string of fate integration
