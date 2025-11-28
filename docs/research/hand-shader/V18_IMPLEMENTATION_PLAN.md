# V18 Hand Shader Refinements - Implementation Plan

**Version**: 1.0
**Created**: 2025-11-25
**Goal**: Transform current state (static lines + unwanted blob dissolution) into target state (scrolling lines + edge particle breakup)
**Executor**: Project LLM (Claude Code or similar)
**Verification**: Screenshot comparison + visual checklist after each checkpoint

---

## CODEBASE CONTEXT FOR NEW SESSION

### Project Overview

This is a React + Three.js portfolio website with a shader experiments gallery. V18 is one of 18 shader experiments that visualizes a hand using depth map data with topographic contour lines.

### Key Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI framework |
| Three.js | 0.171 | WebGL rendering |
| Vite | 6.0 | Build tool, HMR |
| Styled-Components | 6.1 | CSS-in-JS |
| GLSL | ES 3.0 | Shader language (WebGL2) |

### File Structure Reference

```
portfolioyush/
├── src/
│   ├── components/
│   │   └── experiments/
│   │       ├── v18/
│   │       │   └── index.jsx          # V18 React component (370 lines)
│   │       ├── BaseExperimentShader.jsx  # Shared Three.js setup (300 lines)
│   │       └── experimentConfig.js    # Gallery registration
│   └── shaders/
│       └── experiments/
│           └── topographic_hand.frag.glsl  # V18 fragment shader (394 lines)
├── public/
│   └── assets/
│       └── hand/
│           └── hand_depth.png         # Grayscale depth map texture
└── docs/
    └── research/
        └── hand-shader/
            ├── V18_ARCHITECTURE.md    # Full technical reference
            └── V18_IMPLEMENTATION_PLAN.md  # This file
```

### How the Rendering System Works

1. **BaseExperimentShader.jsx** creates:
   - THREE.Scene with OrthographicCamera
   - 2x2 PlaneGeometry (full-screen quad)
   - ShaderMaterial with custom fragment shader
   - Animation loop updating `u_time` uniform

2. **V18 index.jsx** provides:
   - Custom uniforms (layer toggles, effect parameters)
   - Texture loading (depth map)
   - Keyboard controls (1/2/3/D keys)
   - React state for visual modes

3. **Fragment shader** receives:
   - Base uniforms: `u_time`, `u_resolution`, `u_mouse`, `u_backgroundColor`
   - Custom uniforms: All effect parameters
   - Depth map texture: `u_depthMap`

### Current Layer System

```
Layer 6: POST-PROCESSING (Vignette) - Always on
Layer 5: DISSOLUTION - BROKEN (causes blob artifacts)
Layer 4: SCANLINES (Joy Division) - u_showScanlines
Layer 3: STIPPLE - u_showStipple
Layer 2: CONTOURS - u_showContours
Layer 1: HAND MASK - Always on
Layer 0: BACKGROUND - Always on
```

### Running the Project

```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush
yarn install
yarn dev
# Opens at http://localhost:3000 (or next available port)
# Navigate to: /experiments/v18
```

### Key Shader Patterns Used

**UV Calculation:**
```glsl
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 depthUV = vec2(1.0 - uv.x, uv.y);  // X-flipped
```

**Depth Sampling:**
```glsl
float depth = texture2D(u_depthMap, depthUV).r;
float handMask = smoothstep(0.06, 0.1, depth);
```

**Layer Composition:**
```glsl
float combinedPattern = max(max(contour, stipple), scanlines);
vec3 color = mix(bgColor, lineColor, combinedPattern * handMask);
```

**Adding New Uniforms:**
1. Declare in shader: `uniform float u_newParam;`
2. Add to JSX customUniforms: `u_newParam: { value: 0.5 }`

---

## PRE-IMPLEMENTATION CHECKLIST

Before starting, verify these conditions:

```
[ ] File exists: src/shaders/experiments/topographic_hand.frag.glsl
[ ] File exists: src/components/experiments/v18/index.jsx
[ ] Current mode 3 shows floating dark blobs (confirms dissolution is active)
[ ] Pressing key "1" shows contours without blobs
[ ] Project runs without shader compilation errors
```

---

## PHASE 1: STABILIZE - Disable Broken Dissolution

**Objective**: Remove the floating blob artifacts by disabling dissolution, establishing a clean baseline.

### Step 1.1: Modify Default Uniform Values

**File**: `src/components/experiments/v18/index.jsx`

**Action**: Find the customUniforms object and change dissolution defaults.

**Find this pattern** (around line 193-196):
```javascript
u_showDissolution: { value: false },
u_dissolve_progress: { value: 0.0 },
```

**Verify it's set to false.** If `true`, change to:
```javascript
u_showDissolution: { value: false },
u_dissolve_progress: { value: 0.0 },
```

**Also find mode 3 logic** (around line 263-268) and modify:
```javascript
// Find something like:
if (visualMode === 3) {
    customUniforms.u_showDissolution.value = true;
}

// Change to:
if (visualMode === 3) {
    customUniforms.u_showDissolution.value = false;  // Disabled until fixed
}
```

### Step 1.2: Verify Checkpoint 1

**Action:** Run the project and take a screenshot.

**Verification checklist:**
```
[ ] No floating dark blobs anywhere on screen
[ ] Hand silhouette is fully visible with contour lines
[ ] Scanlines still render across the hand
[ ] Mode 3 now looks similar to Mode 2 (no dissolution artifacts)
[ ] No shader compilation errors in console
```

**Screenshot comparison:**
- Before: Dark animated blobs floating over hand
- After: Clean hand with continuous line patterns

**If verification fails:**
- Check console for errors
- Verify uniform name matches exactly (`u_showDissolution` vs `u_dissolution` etc.)
- Confirm the mode logic is actually being executed

---

## PHASE 2: ANIMATE - Add Scanline Scrolling

**Objective**: Make the horizontal lines scroll upward continuously.

### Step 2.1: Add Scroll Speed Uniform to Shader

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Find the scanline uniforms section (around lines 35-39) and add new uniform.

**Find this section:**
```glsl
// Scanline layer (Joy Division style)
uniform bool u_showScanlines;
uniform float u_scanline_count;      // Number of horizontal lines
uniform float u_scanline_displacement; // How much depth displaces the lines
uniform float u_scanline_thickness;  // Line thickness
```

**Add after `u_scanline_thickness`:**
```glsl
uniform float u_scanline_scrollSpeed;  // NEW: Controls upward scroll rate
```

### Step 2.2: Add Uniform to JavaScript

**File**: `src/components/experiments/v18/index.jsx`

**Action**: Add the new uniform to customUniforms object (around line 207).

**Find the scanline section and add:**
```javascript
// Scanline layer (Joy Division style)
u_showScanlines: { value: true },
u_scanline_count: { value: 80.0 },
u_scanline_displacement: { value: 0.3 },
u_scanline_thickness: { value: 2.0 },
u_scanline_scrollSpeed: { value: 0.08 },  // NEW: Slow upward drift
```

### Step 2.3: Modify Scanline Calculation Function

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Find `calculateScanlines` function (around lines 213-228) and modify.

**Find current function:**
```glsl
float calculateScanlines(vec2 uv, float depth, float lineCount, float displacement, float thickness) {
    // Create horizontal lines that get displaced by depth
    float lineY = uv.y * lineCount;
    float lineIndex = floor(lineY);
    float linePhase = fract(lineY);

    // Sample depth at this scanline position for displacement
    // Displace the line vertically based on depth value
    float displacedY = linePhase - (depth * displacement);

    // Create the line with anti-aliasing
    float lineWidth = thickness / lineCount;
    float line = smoothstep(0.0, lineWidth, displacedY) * smoothstep(lineWidth * 2.0, lineWidth, displacedY);

    return line;
}
```

**Replace entire function with:**
```glsl
float calculateScanlines(vec2 uv, float depth, float lineCount, float displacement, float thickness, float time, float scrollSpeed) {
    // Add time-based vertical scroll
    float scrollOffset = time * scrollSpeed;
    float y = (uv.y + scrollOffset) * lineCount;

    // Apply depth-based displacement
    float displaced = y + depth * displacement * lineCount;

    // Create line pattern using fract
    float linePhase = fract(displaced);

    // Smoothstep for anti-aliased lines
    float halfThickness = thickness / lineCount * 0.5;
    float line = smoothstep(0.0, halfThickness, linePhase) *
                 smoothstep(halfThickness * 2.0, halfThickness, linePhase);

    return line;
}
```

### Step 2.4: Update Function Call in Main

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Find where `calculateScanlines` is called in `main()` (around line 315) and update the call.

**Find:**
```glsl
scanlines = calculateScanlines(uv, depth, u_scanline_count, u_scanline_displacement, u_scanline_thickness);
```

**Replace with:**
```glsl
scanlines = calculateScanlines(uv, depth, u_scanline_count, u_scanline_displacement, u_scanline_thickness, u_time, u_scanline_scrollSpeed);
```

### Step 2.5: Verify Checkpoint 2

**Action:** Run project, observe for 10 seconds, take screenshot.

**Verification checklist:**
```
[ ] Lines visibly move upward (watch for 5+ seconds)
[ ] Movement is smooth, not jerky
[ ] Speed feels slow and organic (not racing)
[ ] Lines still displace around hand depth correctly
[ ] No shader compilation errors
[ ] Performance still 60fps (check dev tools)
```

**Visual test:**
- Pick a specific line near the bottom of hand
- Watch it travel upward and exit the top
- New lines should appear from bottom continuously

**If verification fails:**
- If no movement: Check `u_time` is being updated in render loop (it is, via BaseExperimentShader)
- If too fast: Reduce `u_scanline_scrollSpeed` to `0.03`
- If too slow: Increase to `0.15`
- If jerky: Check frame rate, might be performance issue
- If shader error: Check function signature matches call

---

## PHASE 3: EDGE BREAKUP - Lines to Stipple Transition

**Objective**: Lines should break into dots/stipple as they approach the hand edges.

### Step 3.1: Add Edge Breakup Uniforms to Shader

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Add new uniforms after the scanline section (around line 40).

**Add:**
```glsl
// Edge Breakup (NEW)
uniform float u_edgeBreakupStart;    // Depth where breakup begins
uniform float u_edgeBreakupEnd;      // Depth where fully stippled
uniform float u_edgeStippleScale;    // Scale of edge stipple dots
uniform float u_edgeStippleDensity;  // Density of edge dots
```

### Step 3.2: Add Uniforms to JavaScript

**File**: `src/components/experiments/v18/index.jsx`

**Action**: Add new uniforms to customUniforms (after scanline section).

```javascript
// Edge Breakup (NEW)
u_edgeBreakupStart: { value: 0.25 },    // Start breaking up at this depth
u_edgeBreakupEnd: { value: 0.08 },      // Fully stippled at this depth
u_edgeStippleScale: { value: 500.0 },   // Dot pattern scale
u_edgeStippleDensity: { value: 0.4 },   // How many dots
```

### Step 3.3: Create Edge Stipple Function

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Add new function after existing `multiStipple` function (around line 207).

**Add this new function:**
```glsl
// Edge-aware stipple that increases density toward edges
float edgeStipple(vec2 uv, float depth, float breakupStart, float breakupEnd, float scale, float density, float time) {
    // Calculate how much we're in the "edge zone"
    // 0.0 = solid interior, 1.0 = full edge (should be stipple)
    float edgeFactor = 1.0 - smoothstep(breakupEnd, breakupStart, depth);

    // Don't compute stipple if we're fully in interior
    if (edgeFactor < 0.01) return 0.0;

    // Animated stipple UV (slight drift)
    vec2 stippleUV = uv * scale + vec2(time * 0.02, time * 0.05);

    // Multi-scale stipple for organic feel
    float dots = 0.0;
    dots += hash(floor(stippleUV)) < density ? 1.0 : 0.0;
    dots += hash(floor(stippleUV * 0.5)) < density * 0.7 ? 0.8 : 0.0;
    dots += hash(floor(stippleUV * 2.0)) < density * 0.3 ? 0.5 : 0.0;
    dots = clamp(dots, 0.0, 1.0);

    // Only show stipple in edge zone
    return dots * edgeFactor;
}
```

### Step 3.4: Integrate Edge Stipple into Composition

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Find the composition section in `main()` (around lines 336-347) and modify.

**Find this pattern:**
```glsl
// Combine contours, stipple, and scanlines
float combinedPattern = max(max(contour, stipplePattern), scanlines);
```

**Replace with:**
```glsl
// Calculate edge stipple
float edgeDots = edgeStipple(uv, depth, u_edgeBreakupStart, u_edgeBreakupEnd, u_edgeStippleScale, u_edgeStippleDensity, u_time);

// Calculate blend factor: interior = lines, edge = stipple
float interiorFactor = smoothstep(u_edgeBreakupEnd, u_edgeBreakupStart, depth);

// Blend scanlines with edge stipple
float blendedLines = mix(edgeDots, scanlines, interiorFactor);

// Combine all patterns
float combinedPattern = max(max(contour, stipplePattern), blendedLines);
```

### Step 3.5: Verify Checkpoint 3

**Action:** Run project, zoom in on hand edges, take screenshot.

**Verification checklist:**
```
[ ] Interior of hand still shows clean scanlines
[ ] Edges of hand show dotted/stippled pattern
[ ] Transition from lines to dots is gradual, not abrupt
[ ] Edge dots have slight animation/drift
[ ] Contour lines still visible on top
[ ] Hand silhouette still readable overall
[ ] No shader compilation errors
```

**Visual comparison test:**
```
INTERIOR (high depth)     EDGE (low depth)
━━━━━━━━━━━━━━━━━━━━     · · · · · · · ·
Solid scanlines           Scattered dots
```

**Zoom test:**
- Zoom browser to 150%
- Look at fingertip edges
- Should see individual dots, not solid lines

**If verification fails:**
- If no dots visible: Increase `u_edgeStippleScale` to `800.0`
- If too many dots: Decrease `u_edgeStippleDensity` to `0.2`
- If transition too harsh: Widen gap between `u_edgeBreakupStart` (0.35) and `u_edgeBreakupEnd` (0.05)
- If dots not animating: Verify `u_time` passed to function

---

## PHASE 4: PARTICLE DRIFT - Edge Particles Float Away

**Objective**: Add particles at the very edge that drift outward/upward, creating dissolution feel without the blob artifacts.

### Step 4.1: Add Drift Uniforms to Shader

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Add particle drift uniforms after edge breakup uniforms.

```glsl
// Particle Drift (NEW)
uniform vec2 u_particleDrift;         // Direction particles float (x, y)
uniform float u_particleSpawnZone;    // How far from edge particles spawn
uniform float u_particleFadeDistance; // How far particles travel before fading
```

### Step 4.2: Add Uniforms to JavaScript

**File**: `src/components/experiments/v18/index.jsx`

**Action**: Add to customUniforms. Note: `THREE` is already imported.

```javascript
// Particle Drift (NEW)
u_particleDrift: { value: new THREE.Vector2(-0.03, 0.02) },  // Drift left and up
u_particleSpawnZone: { value: 0.05 },    // Spawn very close to edge
u_particleFadeDistance: { value: 0.15 }, // Fade over this distance
```

### Step 4.3: Create Drifting Particle Function

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: Add after `edgeStipple` function.

```glsl
// Particles that spawn at edge and drift away
float driftingParticles(vec2 uv, float handMask, float depth, vec2 drift, float spawnZone, float fadeDistance, float time) {
    // Detect edge of hand mask using derivatives
    float maskDx = dFdx(handMask);
    float maskDy = dFdy(handMask);
    float maskEdge = length(vec2(maskDx, maskDy));

    // Also use depth edge
    float depthDx = dFdx(depth);
    float depthDy = dFdy(depth);
    float depthEdge = length(vec2(depthDx, depthDy));

    // Combined edge detection
    float edge = max(maskEdge * 5.0, depthEdge * 3.0);
    edge = smoothstep(0.0, spawnZone, edge);

    // Create multiple particle layers with different drift speeds
    float particles = 0.0;

    // Layer 1: Slow large particles
    vec2 uv1 = uv + drift * time * 0.5;
    float p1 = hash(floor(uv1 * 300.0));
    particles += (p1 < 0.03) ? 1.0 : 0.0;

    // Layer 2: Medium particles
    vec2 uv2 = uv + drift * time * 1.0;
    float p2 = hash(floor(uv2 * 500.0));
    particles += (p2 < 0.02) ? 0.7 : 0.0;

    // Layer 3: Fast small particles
    vec2 uv3 = uv + drift * time * 1.5;
    float p3 = hash(floor(uv3 * 800.0));
    particles += (p3 < 0.015) ? 0.4 : 0.0;

    particles = clamp(particles, 0.0, 1.0);

    // Fade particles based on distance from hand
    float distanceFromHand = 1.0 - handMask;
    float fadeFactor = 1.0 - smoothstep(0.0, fadeDistance, distanceFromHand);

    // Only show particles near edges AND outside hand
    float spawnMask = edge * (1.0 - step(0.5, handMask));

    return particles * fadeFactor * max(spawnMask, edge * 0.3);
}
```

### Step 4.4: Integrate Drifting Particles

**File**: `src/shaders/experiments/topographic_hand.frag.glsl`

**Action**: In `main()`, after the edge stipple calculation (after `float combinedPattern = ...`), add:

```glsl
// Calculate drifting particles at edges
float driftParticles = driftingParticles(uv, handMask, depth, u_particleDrift, u_particleSpawnZone, u_particleFadeDistance, u_time);

// Add particles to combined pattern
combinedPattern = max(combinedPattern, driftParticles * 0.8);
```

### Step 4.5: Verify Checkpoint 4

**Action:** Run project, watch edges for 15 seconds, take screenshot.

**Verification checklist:**
```
[ ] Particles visible at hand edges
[ ] Particles drift in consistent direction (left and up)
[ ] Particles fade as they move away from hand
[ ] Multiple particle sizes visible (large slow, small fast)
[ ] Particles don't appear in hand interior
[ ] Edge of hand now feels "fuzzy" not "sharp"
[ ] Overall effect feels like sand/dust blowing off
[ ] Performance still acceptable (50+ fps)
```

**Motion test:**
- Focus on one fingertip edge
- Watch particles spawn and drift away
- Should see continuous stream, not bursts

**If verification fails:**
- If no particles: Check `dFdx`/`dFdy` are available (they are in WebGL2)
- If particles everywhere: Reduce `u_particleSpawnZone` to `0.02`
- If particles too dense: Reduce the `< 0.03` thresholds to `< 0.01`
- If particles don't move: Verify `u_time` is updating and `u_particleDrift` is non-zero
- If performance drops: Reduce particle layers from 3 to 2

---

## PHASE 5: POLISH - Tuning and Debug Modes

**Objective**: Add tuning configuration for easy adjustment.

### Step 5.1: Create Tuning Config Object

**File**: `src/components/experiments/v18/index.jsx`

**Action**: Add a config object at top of file (after imports, before component).

```javascript
// Tuning configuration for easy adjustment
const V18_CONFIG = {
    // Scanlines
    scanline: {
        count: 80,
        displacement: 0.3,
        thickness: 2.0,
        scrollSpeed: 0.08,  // 0 = static, 0.1 = slow, 0.3 = fast
    },

    // Edge Breakup
    edgeBreakup: {
        start: 0.25,       // Depth where lines start becoming dots
        end: 0.08,         // Depth where fully dots
        stippleScale: 500,
        stippleDensity: 0.4,
    },

    // Particle Drift
    particles: {
        drift: { x: -0.03, y: 0.02 },
        spawnZone: 0.05,
        fadeDistance: 0.15,
    },
};
```

### Step 5.2: Apply Config to Uniforms

**File**: `src/components/experiments/v18/index.jsx`

**Action**: Update customUniforms to reference config:

```javascript
// Scanline layer
u_scanline_count: { value: V18_CONFIG.scanline.count },
u_scanline_displacement: { value: V18_CONFIG.scanline.displacement },
u_scanline_thickness: { value: V18_CONFIG.scanline.thickness },
u_scanline_scrollSpeed: { value: V18_CONFIG.scanline.scrollSpeed },

// Edge Breakup
u_edgeBreakupStart: { value: V18_CONFIG.edgeBreakup.start },
u_edgeBreakupEnd: { value: V18_CONFIG.edgeBreakup.end },
u_edgeStippleScale: { value: V18_CONFIG.edgeBreakup.stippleScale },
u_edgeStippleDensity: { value: V18_CONFIG.edgeBreakup.stippleDensity },

// Particle Drift
u_particleDrift: { value: new THREE.Vector2(V18_CONFIG.particles.drift.x, V18_CONFIG.particles.drift.y) },
u_particleSpawnZone: { value: V18_CONFIG.particles.spawnZone },
u_particleFadeDistance: { value: V18_CONFIG.particles.fadeDistance },
```

### Step 5.3: Final Verification Checkpoint

**Action:** Complete visual review against original reference images.

**Full verification checklist:**
```
[ ] Lines scroll upward smoothly
[ ] Lines displace correctly around hand depth (Joy Division effect)
[ ] Hand interior has clean, solid lines
[ ] Hand edges transition to stipple/dots
[ ] Particles drift away from edges
[ ] Particles fade as they travel
[ ] No blob artifacts from old dissolution
[ ] Contour lines still visible and correct
[ ] Overall composition matches reference aesthetic
[ ] Performance: 60fps on desktop
[ ] No console errors
```

---

## ROLLBACK PLAN

If any phase breaks the shader:

### Quick Git Rollback
```bash
git stash                    # Save broken changes
git checkout -- src/shaders  # Restore shaders
git checkout -- src/components/experiments/v18  # Restore component
```

### Manual Rollback
Keep backup copies before each phase:
```bash
cp topographic_hand.frag.glsl topographic_hand.frag.glsl.backup-phase1
```

### Phase-specific rollbacks:
- **Phase 1 breaks**: Re-enable dissolution uniforms
- **Phase 2 breaks**: Remove scrollSpeed uniform and revert function signature
- **Phase 3 breaks**: Remove edgeStipple function and composition changes
- **Phase 4 breaks**: Remove driftingParticles function

---

## SUCCESS CRITERIA SUMMARY

| Phase | Success Metric |
|-------|----------------|
| 1 | No blobs, clean hand render |
| 2 | Lines visibly scroll upward |
| 3 | Edges show dots, interior shows lines |
| 4 | Particles drift away from edges |
| 5 | All tunable via config object |

**Final deliverable**: A hand shader that matches the reference aesthetic with animated, living lines that dissolve into particles at the edges, without any blob artifacts.

---

## QUICK REFERENCE: UNIFORM VALUES

| Uniform | Conservative | Default | Dramatic |
|---------|--------------|---------|----------|
| `u_scanline_scrollSpeed` | 0.02 | 0.08 | 0.2 |
| `u_edgeBreakupStart` | 0.15 | 0.25 | 0.4 |
| `u_edgeBreakupEnd` | 0.03 | 0.08 | 0.15 |
| `u_edgeStippleScale` | 300 | 500 | 800 |
| `u_edgeStippleDensity` | 0.2 | 0.4 | 0.6 |
| `u_particleDrift.x` | -0.01 | -0.03 | -0.08 |
| `u_particleDrift.y` | 0.01 | 0.02 | 0.05 |
| `u_particleSpawnZone` | 0.02 | 0.05 | 0.1 |
| `u_particleFadeDistance` | 0.1 | 0.15 | 0.25 |

---

## COMPANION DOCUMENTS

- **V18_ARCHITECTURE.md** - Full technical reference (scene setup, render pipeline, all uniforms)
- **README.md** - Research library navigation
- **07-IMPLEMENTATION.md** - Original implementation guide

---

**End of Implementation Plan**
