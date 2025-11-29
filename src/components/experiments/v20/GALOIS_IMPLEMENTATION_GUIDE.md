# GALOIS: Seven-Step Shader Implementation Guide

A standalone Three.js visualization that follows the mathematical journey explaining why there's no general formula for solving quintic (degree 5+) polynomial equations.

## Overview

This experiment implements a visual exploration of Galois Theory through interactive domain coloring. The visualization helps users understand the fundamental impossibility of solving general quintic equations using radicals.

**Current Implementation**: Step 1 (Complex Plane Foundation) with interactive controls.

---

## Step 1: The Complex Plane Foundation (Implemented)

### What We're Building
The base visualization layer: a full-screen shader that colors every pixel based on polynomial evaluation.

### Transcript Anchor
> "For each pixel on the screen, we can pass that complex number into the polynomial, and see what comes out. We color the input point depending on where the output lands. The brightness shows how far it is from the origin... The color shows the angle of the output."

### Implementation Details

**Core Fragment Shader** (`galois.frag.glsl`):
- Complex number arithmetic (multiplication, division)
- Polynomial evaluation via Horner's method
- HSV to RGB conversion for phase coloring
- Grid overlay with unit circle reference

**Key Uniforms**:
```glsl
uniform vec2 u_coefficients[6]; // Complex coefficients (real, imag)
uniform int u_degree;           // Polynomial degree (2-5)
uniform float u_zoom;           // View scale
uniform vec2 u_pan;             // View offset
uniform float u_brightness;     // Color brightness
uniform float u_saturation;     // Color saturation
```

**Validation Criteria**:
- [x] Polynomial shows white spots at zeros (solutions)
- [x] Color wheel visible (phase angle encoding)
- [x] Zooming works via slider
- [x] Coefficient manipulation moves solution spots
- [x] Degree control (2-5)

---

## Step 2: Interactive Coefficient Manipulation (Future)

### What We're Building
Draggable coefficient points overlaid on the complex plane, with visible solution markers.

### Transcript Anchor
> "We can move a solution and see its effect on the coefficients, and we can move a coefficient yielding some effect on the solutions."

### Planned Implementation
- Draggable coefficient handles on canvas
- Real-time solution marker updates
- Durand-Kerner root finding algorithm
- Solution position readout

---

## Step 3: Permutation Loop Discovery (Future)

### What We're Building
Draw closed paths in coefficient space and watch solutions permute.

### Transcript Anchor
> "Swapping the solutions with each other, the coefficients go right back to where they started. The coefficients are distinct from each other, but the solutions aren't."

### Planned Features
- Path recording (draw loops by dragging)
- Path playback animation
- Permutation detection and display (cycle notation)
- Solution trail visualization

---

## Step 4: The Riemann Surface (Future)

### What We're Building
3D visualization of square/cube root functions as multi-sheeted surfaces.

### Transcript Anchor
> "We can imagine visualizing this function as jutting out of the complex plane... This is called a Riemann surface."

### Planned Features
- 2-sheet surface for square root
- 3-sheet surface for cube root
- Branch cut visualization
- Path tracing on surfaces

---

## Step 5: Commutator Mechanics (Future)

### What We're Building
Visual demonstration that "loop, loop, undo, undo" can still scramble solutions.

### Transcript Anchor
> "First, we move them in a way that swaps the left two solutions in a clockwise rotation... We did two things, then undid them both. But watch what happens!"

### Planned Features
- Commutator builder: [A, B] = A B A⁻¹ B⁻¹
- Nested commutator visualization
- Depth indicator
- Result comparison with identity

---

## Step 6: The Quintic Impossibility (Future)

### What We're Building
Demonstration that for degree 5, arbitrarily deep commutators still produce non-trivial permutations.

### Transcript Anchor
> "We can take a cycle of 3 like this, and call it A... Our double commutator simply did A!"

### Planned Features
- Quintic polynomial setup (5 solutions)
- 3-cycle construction
- Infinite depth visualization
- Side-by-side quartic vs quintic comparison

---

## Step 7: The Fractal Beauty (Future)

### What We're Building
Point clouds of all solutions for polynomials with constrained coefficients.

### Transcript Anchor
> "Let's take the simplest case imaginable - a polynomial with coefficients that are all 1 or -1... As we zoom into these point clouds, there are shapes resembling the Dragon Curve."

### Planned Features
- Binary coefficient constraint (±1)
- Batch root solving (Web Worker)
- Progressive point cloud rendering
- Zoom exploration with self-similar regions

---

## Technical Architecture

### File Structure
```
src/
├── components/experiments/v20/
│   ├── index.jsx                      # Main React component
│   └── GALOIS_IMPLEMENTATION_GUIDE.md # This file
└── shaders/experiments/
    └── galois.frag.glsl               # Fragment shader
```

### Component Flow
```
GaloisExperiment (index.jsx)
├── Three.js Scene Setup
│   ├── OrthographicCamera
│   ├── PlaneGeometry (2x2 full-screen quad)
│   └── ShaderMaterial with custom uniforms
├── Control Panel UI
│   ├── Degree slider (2-5)
│   ├── Zoom slider
│   └── Coefficient sliders (a₀, a₁, a₂ real parts)
├── Animation Loop
│   └── u_time uniform update
└── Event Handlers
    ├── Mouse move → u_mouse uniform
    ├── Touch support
    └── Keyboard navigation
```

### Shader Uniforms
| Uniform | Type | Purpose |
|---------|------|---------|
| u_time | float | Animation time |
| u_resolution | vec2 | Canvas size (actual pixels) |
| u_mouse | vec2 | Normalized mouse position |
| u_backgroundColor | vec3 | Theme-based background |
| u_coefficients | vec2[6] | Polynomial coefficients |
| u_degree | int | Polynomial degree |
| u_zoom | float | View scale |
| u_pan | vec2 | View offset |
| u_brightness | float | Color brightness |
| u_saturation | float | Color saturation |

---

## Color Theory

### Domain Coloring
- **Hue**: Encodes the phase angle (argument) of the polynomial output
- **Brightness**: Encodes the magnitude (modulus) - white near zeros
- **Grid**: Unit circle and coordinate axes for reference

### Color Interpretation
- **White regions**: Polynomial zeros (solutions)
- **Rainbow colors**: Phase rotation around the complex plane
- **Dark regions**: Large magnitude output

---

## Mathematical Background

### Galois Theory Key Concepts
1. **Polynomial roots**: Solutions to P(z) = 0
2. **Root permutations**: Symmetries that preserve polynomial structure
3. **Commutators**: Measure of non-commutativity in permutation groups
4. **Solvability**: Whether roots can be expressed with radicals

### Why No Quintic Formula
- Degree 2-4: Commutator depth eventually reaches identity
- Degree 5+: Commutators can cycle indefinitely
- This means no finite tower of radicals can express all solutions

---

## Future Enhancements

### Phase 2: Interactivity
- [ ] Draggable coefficient points on canvas
- [ ] Click-to-set polynomial roots
- [ ] Real-time root finding display

### Phase 3: Animation
- [ ] Path recording and playback
- [ ] Smooth coefficient interpolation
- [ ] Solution trail visualization

### Phase 4: 3D
- [ ] Riemann surface rendering
- [ ] Sheet transition animations
- [ ] Branch cut highlighting

### Phase 5: Education
- [ ] Guided tutorial mode
- [ ] Step-by-step explanations
- [ ] Interactive quizzes

---

## References

- 3Blue1Brown video on Galois Theory
- Visual Complex Analysis by Tristan Needham
- Domain Coloring technique by Frank Farris
- Three.js documentation
