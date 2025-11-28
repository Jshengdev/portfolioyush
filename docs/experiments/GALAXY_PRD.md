# V19 Galaxy Shader - Product Requirements Document

**Created**: 2025-11-27
**Status**: ✅ Complete
**Experiment**: V19 Galaxy
**Live at**: `/experiments/v19`

---

## 1. Original Prompt (User Input)

The user provided a PRD extracted from a "Galaxy Simulator" transcript, filtered for techniques applicable to Three.js/WebGL portfolio projects:

```
Galaxy Simulator → Portfolio Website Techniques
Filtered from: Untitled Galaxy Simulator transcript
Purpose: Extract patterns applicable to Three.js/WebGL portfolio projects

1. Particle Distribution Math
- Uniform Sphere Distribution using cube root for radius
- Logarithmic Spirals: r = a × e^(b × θ)
- Two-component system: Central bulge (15%) + Disk (85%)
- Spiral arm density with exponential falloff
- Three-zone soft edge falloff (Core 0-85%, Transition 85-100%, Outlier 100-200%)

2. Color/Temperature Mapping
- Star Classification: O, B, A, F, G, K, M types
- Blackbody Radiation for heat visualization

3. Animation Patterns
- Orbital Motion: angularVelocity ∝ 1/√(orbitRadius)
- Turbulence via phase-shifted sine waves

4. Performance Patterns
- Culling by zoom level
- Level-of-Detail transitions
- Fake physics scales better than real N-body simulation

5. Layered Transparency (Glow Effects)
- Multiple overlapping layers with decreasing opacity

6. Seed-Based Reproducibility
- Store random seed for consistent output
```

---

## 2. Implementation Approach

### Constraint: Fragment Shader Only

The existing experiment system uses `BaseExperimentShader.jsx` which renders a full-screen quad with a fragment shader. This means:

- ❌ No vertex-based particle systems
- ❌ No instanced rendering
- ✅ Must simulate everything procedurally per-pixel

### Solution: Grid-Based Procedural Stars

Instead of actual particles, we render stars by:
1. Dividing screen into grid cells
2. Placing one potential star per cell (hash-based position)
3. Checking if current pixel is close enough to render star
4. Applying density/color based on spiral arm distance

---

## 3. PRD Techniques → Shader Implementation

| PRD Requirement | Implementation | File Reference |
|-----------------|----------------|----------------|
| **Cube root distribution** | `pow(hash, 0.333)` for radius | `galaxy.frag.glsl:197` |
| **Logarithmic spirals** | `log(r/a) / b` for arm angle | `galaxy.frag.glsl:129-132` |
| **Central bulge + disk** | `bulgeFactor = smoothstep()` blend | `galaxy.frag.glsl:222, 380` |
| **Spiral arm density** | `exp(-angleDiff / armWidth)` falloff | `galaxy.frag.glsl:144` |
| **Three-zone falloff** | `if/else` with linear + exponential | `galaxy.frag.glsl:156-172` |
| **Star classification colors** | 7-step color ramp M→O | `galaxy.frag.glsl:80-113` |
| **Differential rotation** | `angularVel = 1/sqrt(r)` | `galaxy.frag.glsl:206, 366` |
| **Phase-shifted animation** | `sin(time + hash * TWO_PI)` twinkle | `galaxy.frag.glsl:391` |
| **Layered depth** | 5 star layers with different scales | `galaxy.frag.glsl:336-409` |
| **Reproducibility** | Hash functions (deterministic) | `galaxy.frag.glsl:48-59` |

### Not Implemented (Out of Scope)

| PRD Feature | Reason |
|-------------|--------|
| Zoom-level culling | Single zoom level, not interactive |
| LOD transitions | Fixed resolution shader |
| Seed input | Could add as uniform, not prioritized |

---

## 4. Files Created

| File | Lines | Purpose |
|------|-------|---------|
| `src/shaders/experiments/galaxy.frag.glsl` | 436 | Main GLSL shader |
| `src/components/experiments/v19/index.jsx` | 113 | React component |
| `docs/experiments/GALAXY_SHADER.md` | 417 | Technical documentation |
| `docs/experiments/GALAXY_PRD.md` | This file | PRD & process doc |

### Files Modified

| File | Change |
|------|--------|
| `src/components/experiments/experimentConfig.js` | Added V19 entry |
| `src/App.jsx` | Added lazy import + route |
| `docs/experiments/ADDING_EXPERIMENTS.md` | Updated experiment table |

---

## 5. Current Status

### ✅ Complete

- [x] Fragment shader with all core techniques
- [x] React component with navigation
- [x] Route and config integration
- [x] Dark/light mode support
- [x] Mouse interaction (viewing angle)
- [x] Technical documentation
- [x] Pushed to `thirsty-buck` branch

### Visual Features Working

| Feature | Status |
|---------|--------|
| Spiral arms (2, logarithmic) | ✅ |
| Differential rotation | ✅ |
| Star temperature colors | ✅ |
| Central bulge glow | ✅ |
| Galactic dust lanes | ✅ |
| Soft edge falloff | ✅ |
| Star twinkle | ✅ |
| Mouse orbit/tilt | ✅ |
| Theme adaptation | ✅ |

---

## 6. Possible Next Steps

### Enhancements (If Desired)

| Enhancement | Effort | Description |
|-------------|--------|-------------|
| **Seed uniform** | Low | Add `u_seed` to generate different galaxies |
| **Arm count control** | Low | Make `NUM_ARMS` a uniform (2, 3, 4 arms) |
| **Galaxy type presets** | Medium | Spiral, barred spiral, elliptical modes |
| **Zoom interaction** | Medium | Mouse wheel to zoom in/out with LOD |
| **Click to set center** | Low | Click to pan galaxy center |
| **Nebula clouds** | Medium | Add FBM-based emission nebulae |
| **Star clusters** | Medium | Globular clusters around edges |
| **Black hole center** | Low | Add gravitational lensing at core |
| **Export as image** | Low | Button to download current frame |
| **Audio reactivity** | High | Pulse to music (requires audio input) |

### Performance Optimizations

| Optimization | Current | Improvement |
|--------------|---------|-------------|
| Star layers | 5 layers | Reduce to 3 on mobile |
| Grid neighbors | 3×3 (9 checks) | Could use 2×2 with larger cells |
| Noise calls | Multiple per pixel | Precompute to texture |

### Documentation Additions

| Doc | Purpose |
|-----|---------|
| Video walkthrough | Screen recording of the effect |
| Parameter tuning guide | How to adjust constants |
| Mobile optimization guide | Specific tips for performance |

---

## 7. Reusable Patterns for Future Experiments

These techniques from V19 can be borrowed for other shaders:

| Pattern | Future Use Cases |
|---------|------------------|
| Grid-based point rendering | Rain, snow, fireflies, bokeh |
| Logarithmic spiral | Hurricanes, shells, DNA, whirlpools |
| Temperature color ramp | Any heat map, data viz |
| Differential rotation | Solar system, accretion disk |
| Three-zone falloff | Any circular effect needing soft edges |
| Hash functions | Any procedural content |
| Mouse viewing angle | Pseudo-3D effects |

See [`GALAXY_SHADER.md`](./GALAXY_SHADER.md) for copy-paste code snippets.

---

## 8. Commands Used

```bash
# Development
yarn dev                    # Start dev server
# Visit http://localhost:3000/experiments/v19

# Build verification
yarn build                  # Check for compile errors

# Git workflow
git add .
git commit -m "Add V19: Galaxy shader experiment"
git push -u origin thirsty-buck

# Create PR
# https://github.com/Jshengdev/portfolioyush/pull/new/thirsty-buck
```

---

## 9. Lessons Learned

### What Worked Well

1. **PRD as input** - Having specific techniques listed made implementation focused
2. **Fragment shader constraint** - Forced creative solutions (grid-based stars)
3. **Existing system** - `BaseExperimentShader` + config made integration trivial
4. **Documentation-first** - Writing docs revealed edge cases

### Challenges

1. **No actual particles** - Had to fake everything procedurally
2. **Performance balance** - 5 layers × 9 cells = 45 iterations per pixel
3. **Spiral math** - Logarithmic spiral inversion took iteration to get right

### For Next Time

1. Consider adding uniform controls for key parameters
2. Test on mobile earlier in process
3. Could use texture-based noise for better performance

---

**Document Version**: 1.0
**PR Link**: https://github.com/Jshengdev/portfolioyush/pull/new/thirsty-buck
