# Hero Experiments - Parallel Execution Guide

**Feature**: Experimental Landing Page Effects
**Total Tasks**: 21 tasks across 4 waves
**Estimated Time**: 3-4 hours (with parallel execution)
**Created**: 2025-11-24

---

## Quick Start

Each wave contains tasks that can run **simultaneously**. Copy all prompts from a wave, run them in parallel, wait for completion, then move to the next wave.

---

## WAVE 0: Infrastructure (6 Parallel Tasks)

**Run these 6 prompts simultaneously. All are independent.**

### W0-T1: Base Shader Template
```
I need you to create a reusable base shader template component for experimental hero page effects.

Create `/src/components/experiments/BaseExperimentShader.jsx` - a reusable Three.js shader component.

Requirements:
1. Accept `fragmentShader` as a prop (string - the GLSL code)
2. Accept `title` as a prop (string - displayed in corner)
3. Accept optional `customUniforms` prop (object)
4. Use ThemeContext for dark/light mode awareness
5. Handle mouse position tracking (normalized 0-1)
6. Handle window resize
7. Proper cleanup on unmount (dispose renderer, geometry, material)
8. Full-screen positioning (100vw x 100vh)

Base Uniforms (always included):
- u_time: float (incrementing time)
- u_resolution: vec2 (window size)
- u_mouse: vec2 (normalized mouse position)
- u_backgroundColor: vec3 (from theme - black or white)

Reference: Read `/src/components/ShaderVisual.jsx` for Three.js patterns.

Only create BaseExperimentShader.jsx.
```

---

### W0-T2: Directory Structure
```
Create the directory structure for experimental hero page shaders.

Create directories:
- src/components/experiments/v1/
- src/components/experiments/v2/
- src/components/experiments/v3/
- src/components/experiments/v4/
- src/components/experiments/v5/

Create placeholder files:
- src/components/experiments/v1/index.jsx (content: "// Aurora experiment - placeholder")
- src/components/experiments/v2/index.jsx (content: "// Fog experiment - placeholder")
- src/components/experiments/v3/index.jsx (content: "// Bloom experiment - placeholder")
- src/components/experiments/v4/index.jsx (content: "// Liquid experiment - placeholder")
- src/components/experiments/v5/index.jsx (content: "// Waves experiment - placeholder")

Use Bash: mkdir -p src/components/experiments/v1 src/components/experiments/v2 src/components/experiments/v3 src/components/experiments/v4 src/components/experiments/v5

Then create each placeholder with Write tool.
```

---

### W0-T3: App Routes
```
Add routes for experimental hero page shaders to App.jsx.

Edit `/src/App.jsx`:

1. Add lazy imports (after line 18, after NextProject):
const ExperimentNav = lazy(() => import('./components/experiments/ExperimentNav'));
const ExperimentV1 = lazy(() => import('./components/experiments/v1'));
const ExperimentV2 = lazy(() => import('./components/experiments/v2'));
const ExperimentV3 = lazy(() => import('./components/experiments/v3'));
const ExperimentV4 = lazy(() => import('./components/experiments/v4'));
const ExperimentV5 = lazy(() => import('./components/experiments/v5'));

2. Add routes (inside AnimatedRoutes, after AlainaPamela route ~line 176):
<Route path="/experiments" element={<PageWrapper><ExperimentNav /></PageWrapper>} />
<Route path="/experiments/v1" element={<PageWrapper><ExperimentV1 /></PageWrapper>} />
<Route path="/experiments/v2" element={<PageWrapper><ExperimentV2 /></PageWrapper>} />
<Route path="/experiments/v3" element={<PageWrapper><ExperimentV3 /></PageWrapper>} />
<Route path="/experiments/v4" element={<PageWrapper><ExperimentV4 /></PageWrapper>} />
<Route path="/experiments/v5" element={<PageWrapper><ExperimentV5 /></PageWrapper>} />

Read App.jsx first to understand current patterns.
```

---

### W0-T4: Experiment Navigation
```
Create a navigation component for browsing experimental shader pages.

Create `/src/components/experiments/ExperimentNav.jsx`:

Requirements:
1. Display a grid of experiment cards (responsive)
2. Each card shows: Version (V1-V5), Name, Brief description, Link
3. Style with styled-components
4. Use ThemeContext for theme-aware colors
5. Match portfolio aesthetic (Work Sans font, subtle borders)

Data:
const experiments = [
  { id: 'v1', name: 'Aurora', description: 'Flowing color bands like northern lights' },
  { id: 'v2', name: 'Fog', description: 'Layered translucent clouds that drift' },
  { id: 'v3', name: 'Bloom', description: 'Soft drifting light glows' },
  { id: 'v4', name: 'Liquid', description: 'Organic blob shapes that merge' },
  { id: 'v5', name: 'Waves', description: 'Subtle horizontal gradient waves' },
];

Use Link from react-router-dom. Reference `/src/components/sharedStyles.js` for patterns.
```

---

### W0-T5: Shared Shader Utilities
```
Create shared GLSL utility functions for experimental shaders.

Create `/src/shaders/experiments/common.glsl`:

Include:
1. Hash functions: hash(vec2), hash21(vec2)
2. Noise: noise(vec2), fbm(vec2, int octaves)
3. Math: smin(float, float, float), rotate2d(float), remap(float, float, float, float, float)
4. Color: hsv2rgb(vec3), adaptiveBlend(vec3, vec3, float)

This is a reference file. Functions will be copy-pasted into shaders.
Reference `/src/shaders/truchet.frag.glsl` for existing patterns.
```

---

### W0-T6: Vertex Shader
```
Create a simple pass-through vertex shader for experiments.

Create `/src/shaders/experiments/passthrough.vert.glsl`:

Content:
void main() {
  gl_Position = vec4(position, 1.0);
}

That's it - a minimal vertex shader. All visual effects happen in fragment shaders.
```

---

**⏸️ WAIT: Complete all Wave 0 tasks before proceeding to Wave 1**

---

## WAVE 1: Shader Implementation (5 Parallel Tasks)

**Run these 5 prompts simultaneously. All are independent.**

### W1-T1: Aurora Shader (V1)
```
Implement the Aurora Borealis experimental shader (V1).

Create 2 files:

1. `/src/shaders/experiments/aurora.frag.glsl`:
Aurora effect with:
- 3-4 layered horizontal bands
- Green → Cyan → Purple color gradient
- Slow wave deformation (sin waves)
- Noise for organic feel
- Mouse influence on band shapes
- Theme-aware background blending

Key uniforms: u_time, u_resolution, u_mouse, u_backgroundColor

2. `/src/components/experiments/v1/index.jsx`:
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/aurora.frag.glsl?raw';

const AuroraExperiment = () => (
  <BaseExperimentShader fragmentShader={fragmentShader} title="V1: AURORA" />
);
export default AuroraExperiment;

Visual: Soft flowing bands like northern lights. Very slow, hypnotic.
```

---

### W1-T2: Fog Shader (V2)
```
Implement the Fog/Mist experimental shader (V2).

Create 2 files:

1. `/src/shaders/experiments/fog.frag.glsl`:
Fog effect with:
- 4 layered noise (fbm) at different scales
- Far layers = slow, large; Near = fast, fine
- Mouse creates gentle "parting" effect
- Theme-aware (light fog on dark, dark fog on light)

Use fbm (fractal brownian motion) for cloud shapes.
Very slow drift animation.

2. `/src/components/experiments/v2/index.jsx`:
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/fog.frag.glsl?raw';

const FogExperiment = () => (
  <BaseExperimentShader fragmentShader={fragmentShader} title="V2: FOG" />
);
export default FogExperiment;

Visual: Layered translucent mist. Calming, atmospheric depth.
```

---

### W1-T3: Bloom Shader (V3)
```
Implement the Light Bloom experimental shader (V3).

Create 2 files:

1. `/src/shaders/experiments/bloom.frag.glsl`:
Bloom effect with:
- 5 soft circular glows drifting (harmonic motion)
- Each glow: different size, color (warm/cool mix)
- Overlapping glows = additive brightness
- Mouse acts as additional light source
- Theme-aware intensity

Use harmonic motion (sin/cos with irrational ratios like phi) for non-repeating paths.

2. `/src/components/experiments/v3/index.jsx`:
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/bloom.frag.glsl?raw';

const BloomExperiment = () => (
  <BaseExperimentShader fragmentShader={fragmentShader} title="V3: BLOOM" />
);
export default BloomExperiment;

Visual: Camera bokeh, out-of-focus lights. Dreamy, soft.
```

---

### W1-T4: Liquid Shader (V4)
```
Implement the Liquid Light experimental shader (V4).

Create 2 files:

1. `/src/shaders/experiments/liquid.frag.glsl`:
Liquid/metaball effect with:
- 5 organic blobs moving (harmonic paths)
- Blobs merge when close (metaball technique)
- Use inverse distance sum, threshold for surface
- Mouse creates/attracts additional blob
- Color gradient within blobs (blue edge, pink center)
- Aspect ratio correction for circular blobs

Key: smin() for smooth blending, distance field for metaballs.

2. `/src/components/experiments/v4/index.jsx`:
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/liquid.frag.glsl?raw';

const LiquidExperiment = () => (
  <BaseExperimentShader fragmentShader={fragmentShader} title="V4: LIQUID" />
);
export default LiquidExperiment;

Visual: Lava lamp, viscous fluid. Organic, hypnotic.
```

---

### W1-T5: Waves Shader (V5)
```
Implement the Gradient Waves experimental shader (V5).

Create 2 files:

1. `/src/shaders/experiments/waves.frag.glsl`:
Waves effect with:
- Multiple layered horizontal sine waves
- Soft color palette (blue, purple, teal pastels)
- Very slow animation (~0.08 time multiplier)
- Mouse creates gentle ripple effect
- Theme-aware intensity

Simple sine wave layers at different frequencies. Very calming, meditative.

2. `/src/components/experiments/v5/index.jsx`:
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/waves.frag.glsl?raw';

const WavesExperiment = () => (
  <BaseExperimentShader fragmentShader={fragmentShader} title="V5: WAVES" />
);
export default WavesExperiment;

Visual: Calm ocean, meditation app. Serene, peaceful.
```

---

**⏸️ WAIT: Complete all Wave 1 tasks before proceeding to Wave 2**

---

## WAVE 2: Integration & Polish (5 Parallel Tasks) - UPDATED FOR EXTENSIBILITY

**Run these 5 prompts simultaneously. All are independent.**

**NOTE**: W2-T1 creates `experimentConfig.js` which W2-T2 and W2-T4 depend on. Run W2-T1 first, OR have W2-T2/T4 create the config if it doesn't exist.

### W2-T1: Experiment Page Navigation + Config (RUN FIRST)
```
Enhance each experiment page with DATA-DRIVEN navigation controls.

## IMPORTANT: Create Shared Config First
Create `/src/components/experiments/experimentConfig.js`:

export const experiments = [
  { id: 'v1', name: 'Aurora', description: 'Flowing color bands like northern lights', colors: ['#1AE664', '#33B3E6', '#9933E6'] },
  { id: 'v2', name: 'Fog', description: 'Layered translucent clouds that drift', colors: ['#E6E8F0', '#8C919A', '#5A5F66'] },
  { id: 'v3', name: 'Bloom', description: 'Soft drifting light glows', colors: ['#FFD4A3', '#E6A3FF', '#A3FFE6'] },
  { id: 'v4', name: 'Liquid', description: 'Organic blob shapes that merge', colors: ['#FF6B9D', '#C44BFF', '#4B9DFF'] },
  { id: 'v5', name: 'Waves', description: 'Subtle horizontal gradient waves', colors: ['#6B8CFF', '#B86BFF', '#6BFFD4'] },
];

export const getExperimentById = (id) => experiments.find(e => e.id === id);
export const getExperimentIndex = (id) => experiments.findIndex(e => e.id === id);
export const getPrevExperiment = (id) => {
  const idx = getExperimentIndex(id);
  return experiments[idx === 0 ? experiments.length - 1 : idx - 1];
};
export const getNextExperiment = (id) => {
  const idx = getExperimentIndex(id);
  return experiments[idx === experiments.length - 1 ? 0 : idx + 1];
};

## Then Update All 5 Experiments
Update all 5 experiment files (v1-v5 index.jsx) to:
1. Import navigation helpers from experimentConfig.js
2. Use data-driven prev/next (auto-adapts when V6+ added)
3. Add Back button, Prev/Next, keyboard shortcuts

See task file W2-T1 for full template.
```

---

### W2-T2: Preview Thumbnails (Uses Config)
```
Add visual previews to ExperimentNav using the shared config.

## KEY: Use experimentConfig.js (Single Source of Truth)

Update `/src/components/experiments/ExperimentNav.jsx`:

1. Import from config:
   import { experiments } from './experimentConfig';

2. Use colors array for gradient previews:
   <GradientPreview $gradient={`linear-gradient(135deg, ${experiment.colors.join(', ')})`} />

3. Show dynamic count in title:
   <Title>Experimental Shaders ({experiments.length})</Title>

## Benefits
- Adding V6: Just update experimentConfig.js - nav auto-updates!
- No hardcoded experiment lists
- Gradient colors match shader themes
```

---

### W2-T3: Controls Overlay (Optional)
```
Create an optional parameter controls overlay for experiments.

Create `/src/components/experiments/ControlsOverlay.jsx`:

Features:
1. Toggle with keyboard "C" or button
2. Position: bottom-right corner, semi-transparent
3. Sliders for: Speed (0.1-3.0), Intensity (0-1), Scale (0.5-2.0)
4. Backdrop blur, theme-aware styling
5. Close button

Props: params (object), onParamChange (callback)

This is OPTIONAL. If time is short, skip this task.
The experiments work without it.
```

---

### W2-T4: Hero Page Link (Uses Config)
```
Add a subtle link from Hero page to experiments with DYNAMIC COUNT.

Edit `/src/components/Hero.jsx`:

## KEY: Import experiment count from config

import { experiments } from './experiments/experimentConfig';

Add a small, unobtrusive link in bottom-right corner:
- Text: "experiments (N) →" where N = experiments.length
- Very low opacity (0.3), small font (10px)
- Increases opacity on hover (0.6)
- Links to /experiments

Example:
<ExperimentsLink to="/experiments">
  experiments ({experiments.length}) →
</ExperimentsLink>

Also add keyboard shortcut: Ctrl/Cmd + E navigates to /experiments

## Benefits
When you add V6, the Hero link automatically shows "experiments (6) →"
```

---

### W2-T5: Mobile & Touch Support
```
Add mobile/touch support to experimental shaders.

Update `/src/components/experiments/BaseExperimentShader.jsx`:

1. Add touch event handlers:
   - touchmove: update u_mouse same as mousemove
   - touchstart: initial touch position
   - Add { passive: true } for performance

2. Add performance detection:
   - Check if mobile/low-end device
   - Reduce animation speed if so (0.005 instead of 0.01)

3. Add WebGL fallback:
   - Check WebGL support on mount
   - If not supported, show static gradient fallback

4. Update ExperimentNav with responsive grid:
   - 3 columns on desktop
   - 2 columns on tablet (max-width: 768px)
   - 1 column on mobile (max-width: 480px)
```

---

**⏸️ WAIT: Complete all Wave 2 tasks before proceeding to Wave 3**

---

## WAVE 3: Research & QA (5 Parallel Tasks)

**Run these 5 prompts simultaneously. All are independent.**

### W3-T1: Performance Analysis
```
Analyze performance of all 5 experimental shaders.

1. Run `yarn build` and check bundle sizes
2. For each shader (v1-v5), measure:
   - FPS (use browser dev tools Performance tab)
   - GPU usage
   - Memory (JS heap)
3. Verify lazy loading works (separate chunks)
4. Test on mobile emulation (Chrome DevTools)

Create report at `/docs/reports/HERO_EXPERIMENTS_PERFORMANCE.md`:
- Bundle analysis table
- FPS comparison table
- Recommendations for production
- Identify best/worst performers
```

---

### W3-T2: Documentation Update
```
Update documentation to reflect new experiments feature.

1. Update `/CLAUDE.md`:
   - Statistics table (component count, route count)
   - Routes table (add 6 new routes)
   - File locations (add experiment files)

2. Update `/docs/architecture/COMPONENTS.md`:
   - Add "Experimental Components" section
   - Document BaseExperimentShader, ExperimentNav, V1-V5

3. Update `/docs/roadmap/ROADMAP.md`:
   - Mark Hero Experiments feature progress/complete

4. Create `/docs/experiments/SHADER_EFFECTS.md`:
   - Document each shader's visual character
   - Technical notes
```

---

### W3-T3: Browser Testing
```
Test experimental shaders across browsers.

Start dev server: yarn dev

Test in Chrome, Safari, Firefox:
1. /experiments loads, grid displays
2. Each experiment (v1-v5) renders, animates, interacts
3. Navigation works (back, prev, next)
4. Keyboard shortcuts work
5. Theme toggle affects shaders
6. No console errors

Create report at `/docs/reports/HERO_EXPERIMENTS_BROWSER_TEST.md`:
- Results by browser
- Any issues found
- Pass/Fail verdict
```

---

### W3-T4: Accessibility Check
```
Check accessibility for experiments feature.

Test:
1. Reduced motion: Does animation respect prefers-reduced-motion?
2. Keyboard navigation: Tab, Enter, Escape, Arrows all work?
3. Focus indicators: Visible focus states on buttons?
4. Screen reader: Are labels present and meaningful?
5. Color contrast: Is text readable over shaders?

Recommendations for implementation:
- Add prefers-reduced-motion check to BaseExperimentShader
- Add ARIA labels to navigation elements
- Add visible focus-visible styles

Document findings in QA report or separate accessibility notes.
```

---

### W3-T5: Final QA
```
Conduct final QA verification of experiments feature.

1. Run `yarn build` - verify passes
2. Test all 6 routes load correctly
3. For each shader, verify:
   - Renders without errors
   - Animation smooth (60fps)
   - Mouse interaction works
   - Theme toggle works
4. Test navigation flow (grid → experiment → back → different experiment)
5. Check for console errors
6. Verify no memory leaks

Create final report at `/docs/reports/HERO_EXPERIMENTS_QA_FINAL.md`:
- Pass/Fail for each component
- Any issues found
- Overall verdict: APPROVED or NOT APPROVED for production
```

---

## Post-Completion

After all waves complete:

1. **Review**: Visit `/experiments` and compare all 5 shaders
2. **Select**: Choose your favorite effect
3. **Integrate**: Optionally replace Hero shader with winner
4. **Archive**: Move task files to `/tasks/archive/hero-experiments/`
5. **Commit**: Create git commit for the feature

---

## Task Summary

| Wave | Tasks | Focus | Parallel |
|------|-------|-------|----------|
| 0 | 6 | Infrastructure | ✅ |
| 1 | 5 | Shader Implementation | ✅ |
| 2 | 5 | Integration & Polish | ✅ |
| 3 | 5 | Research & QA | ✅ |
| **Total** | **21** | | |

---

## Troubleshooting

**Shader doesn't render?**
→ Check WebGL context, console for GLSL errors

**Route 404?**
→ Verify lazy import path in App.jsx

**Mouse not working?**
→ Check event listener cleanup, u_mouse uniform update

**Performance issues?**
→ Reduce animation speed, simplify shader math

---

**Ready? Start with Wave 0!**
