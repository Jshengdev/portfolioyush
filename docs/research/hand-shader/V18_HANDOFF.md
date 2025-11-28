# V18 Topographic Hand - Handoff Document

**Date**: 2025-11-27
**Version**: 3.1.0 (Clean Build)
**Status**: Core effect working, ready for polish

---

## Current State

The V18 hand shader visualization is now working with three main layers:

1. **Contour Lines** - Topographic elevation lines that follow the hand's depth map
2. **Scanlines** - Joy Division style horizontal lines that scroll upward and displace based on depth
3. **Stipple Texture** - Organic grain overlay for texture

### Key Achievement: Edge Fragmentation
The scanlines now break apart into scattered dots at the hand's silhouette edges, creating a natural dissolution effect where the hand meets the background.

---

## File Locations

| File | Purpose |
|------|---------|
| `src/shaders/experiments/topographic_hand.frag.glsl` | Main GLSL fragment shader |
| `src/components/experiments/v18/index.jsx` | React component with uniforms |
| `public/assets/hand/hand_depth.png` | Depth map texture |

---

## What Was Fixed

### 1. Blob Dissolution Artifacts
- **Problem**: Mode 3 dissolution effect created ugly blob artifacts
- **Solution**: Disabled dissolution entirely (`u_showDissolution = false`)

### 2. Scanline Scrolling
- **Problem**: Static lines with no animation
- **Solution**: Added `u_scanline_scrollSpeed` uniform with time-based vertical scroll
- **Value**: `0.03` (slow, organic drift upward)

### 3. Edge Fragmentation
- **Problem**: Lines needed to break into dots at hand silhouette
- **Solution**: Used `dFdx/dFdy` screen-space derivatives to detect edges, then applied hash-based dithering
- **Key Code**: Lines 259-287 in shader (`calculateScanlines` function)

### 4. Thick White Outline
- **Problem**: Contour lines created a thick white outline at silhouette edges
- **Cause**: `fwidth()` derivative became huge at rapid depth transitions
- **Solution**: Added cutoffs in `calculateContour`:
  ```glsl
  if (df > 0.8) return 0.0;  // Skip high derivative (silhouette)
  if (height < 0.12) return 0.0;  // Skip low depth (near background)
  ```

---

## Controls

| Key | Action |
|-----|--------|
| `1` | Mode 1: Contours only |
| `2` | Mode 2: Contours + Stipple |
| `3` | Mode 3: Contours + Stipple + Scanlines |
| `D` | Toggle debug mode (RGB layer isolation) |
| `Esc` | Return to gallery |
| `←/→` | Previous/Next experiment |

### Debug Mode Colors
- **RED** = Contour layer
- **GREEN** = Scanline layer
- **BLUE** = Stipple layer
- **WHITE outline** = Hand mask boundary

---

## Tuneable Parameters

### Scanlines (Joy Division effect)
```javascript
u_scanline_count: 80.0,        // Number of horizontal lines
u_scanline_displacement: 0.3,  // How much depth pushes lines
u_scanline_thickness: 2.0,     // Line thickness
u_scanline_scrollSpeed: 0.03,  // Upward scroll rate
```

### Contours
```javascript
u_contour_interval: 0.015,    // Smaller = more lines
u_contour_thickness: 1.0,     // Line weight
u_contour_alpha: 0.9,         // Opacity
```

### Stipple
```javascript
u_stipple_scale: 1.0,         // Overall scale
u_stipple_threshold: 0.6,     // Density threshold
u_stipple_alpha: 0.35,        // Opacity
```

---

## Potential Next Steps

### Polish & Tuning
1. **Particle drift at edges** - Add subtle horizontal drift to the fragmented dots
2. **Color variations** - Experiment with warm/cool color schemes
3. **Depth-based line color** - Darker lines in recessed areas
4. **Mouse interaction** - Lines react to cursor proximity

### New Effects
1. **Fix dissolution** - Reimplement Mode 3 dissolution without blob artifacts
2. **Breathing animation** - Subtle pulsing of the entire effect
3. **Multiple depth maps** - Support different hand poses
4. **Particle emission** - Actual particles drifting off the silhouette (separate layer)

### Performance
1. **Mobile optimization** - Reduce line count for lower-end devices
2. **Resolution scaling** - Adapt effect density to screen resolution

---

## Code Architecture

```
topographic_hand.frag.glsl
├── Noise Functions
│   ├── hash() - 2D hash for randomness
│   ├── hash2() - Returns vec2
│   ├── noise() - Value noise
│   ├── fbm() - Fractal brownian motion
│   └── perlin3d() - 3D simplex (for dissolution, currently unused)
│
├── Layer Functions
│   ├── calculateContour() - Topographic lines with edge threshold
│   ├── calculateScanlines() - Joy Division + edge dithering
│   ├── stipple() - Single stipple layer
│   ├── multiStipple() - Multi-layer stipple
│   └── calculateDissolution() - Noise-based dissolve (disabled)
│
└── main()
    ├── Sample depth map
    ├── Calculate each layer (if enabled)
    ├── Debug mode (if active)
    └── Compose final color with vignette
```

---

## Prompt for Next Session

```
Continue developing V18 Topographic Hand shader.

Current state: Version 3.1.0 with working contours, scanlines with edge fragmentation,
and stipple texture. The scanlines scroll upward and break into scattered dots at the
hand's silhouette edges.

Files:
- src/shaders/experiments/topographic_hand.frag.glsl (main shader)
- src/components/experiments/v18/index.jsx (React component)
- docs/research/hand-shader/V18_HANDOFF.md (this document)

Suggested tasks:
1. Add particle drift - make the fragmented edge dots drift outward/leftward over time
2. Tune the effect - adjust line count, thickness, scroll speed for best visual
3. Add color - introduce subtle depth-based coloring
4. Fix dissolution - reimplement Mode 3 without blob artifacts

Start by reading V18_HANDOFF.md for full context on what was implemented and why.
```

---

## Technical Notes

### Why dFdx/dFdy for Edge Detection?
Screen-space derivatives (`dFdx`, `dFdy`) detect where values change rapidly between adjacent pixels. This naturally finds edges without needing to sample neighboring pixels manually. Combined with `fwidth()` (which is `abs(dFdx) + abs(dFdy)`), it provides robust edge detection that scales with screen resolution.

### Why Hash-Based Dithering?
Using `hash(floor(uv * scale))` creates a grid of random values. By comparing against a threshold that varies with edge strength, we get probabilistic line breakup - lines are more likely to have gaps near edges, creating the fragmented dot effect.

### Depth Map Format
The hand depth map (`hand_depth.png`) encodes distance as grayscale:
- **White (1.0)** = Close to camera (fingertips, palm surface)
- **Black (0.0)** = Far from camera / background
- The hand silhouette is determined by `depth > 0.08`
