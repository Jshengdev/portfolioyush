# Analyze Performance

Analyze the performance characteristics of the codebase, specific components, or build output.

## Usage
```
/analyze/performance [optional: component-name]
/analyze/performance --profile [quick|deep]
```

## Examples
- `/analyze/performance` - Analyze overall codebase performance
- `/analyze/performance ShaderVisual` - Analyze specific component
- `/analyze/performance --profile deep` - Deep performance analysis

---

## Task

Perform performance analysis based on the target: **$ARGUMENTS**

---

## Analysis Types

### 1. No Arguments: Overall Performance Analysis

Analyze the entire codebase:

#### A. Bundle Size Analysis
```
Build Output (from dist/):
- Main bundle: 797.34 KB (gzip: 227.32 KB)
- Total chunks: 15 separate JS files
- CSS: 2.29 KB (gzip: 1.62 KB)

Breakdown:
- Largest chunks:
  1. index-naHL2ETq.js (797KB) - Main bundle
  2. Lens-CX5CoJKa.js (121KB) - Lens component
  3. CapsuleMachine-Cl_zUD3b.js (14KB)

Assessment: [Good/Needs Optimization]
```

#### B. Component Performance
```
Heavy Components (>10KB):
1. ShaderVisual.jsx (221 lines)
   - Issue: 60fps continuous Three.js rendering
   - GPU usage: High
   - Recommendation: Add visibility detection, pause when tab hidden

2. Line.jsx (184 lines, post-optimization)
   - Issue: 6 complex animation variants
   - Transforms: Many (translateX, rotate, skewX, scale)
   - Recommendation: Monitor mobile performance

3. Archive.jsx (330 lines)
   - Custom scroll: RAF-optimized ✓
   - Performance: Good

Medium Components (5-10KB):
[List components]

Light Components (<5KB):
[List components]
```

#### C. Asset Performance
```
Total Assets: 443MB

Large Assets (>5MB):
- [None after Wave 5 optimization]

Asset Breakdown by Directory:
- /public/assets/CM/: 278MB (61% of total) ⚠️
- /public/assets/C/: 65MB (14%)
- /public/assets/AP/: 54MB (12%)
- /public/assets/archive/: 27MB (6%)
- Other: <20MB

Optimized Assets:
✓ Subject 2.png: 7.7MB → 833KB (-89%)
✓ microw.png: 5.7MB → 597KB (-90%)
✓ WebP versions created

Recommendations:
- Consider lazy loading for /public/assets/CM/ (278MB)
- Add loading="lazy" to <img> tags
```

#### D. Animation Performance
```
Animation Systems:
1. Framer Motion
   - Components: 11 components
   - Settings: viewport={{ once: false, amount: 0.1 }}
   - Issue: Re-animates on every scroll
   - Recommendation: Use once: true for one-time animations

2. CSS Keyframes
   - autoRun (AppSlider): 12s infinite ✓
   - glow/softGlow: Optimized ✓
   - shake (Archive): 2s infinite ✓

3. RequestAnimationFrame
   - Archive.jsx: RAF-optimized ✓
   - Cursor.jsx: RAF-optimized ✓
   - ShaderVisual.jsx: Continuous (consider pause)

Overall: Good, minor optimizations possible
```

#### E. Build Performance
```
Build Time: 3.38s ✓ (Fast)
Dev Server: Vite HMR (instant updates) ✓
Code Splitting: 15 chunks ✓ (Optimal)

Lazy Loaded Routes:
✓ About, Hero, Contact, Projects, Archive
✓ Grove, CapsuleMachine, Ark, AP, Lens, Collection
✓ NextProject

Assessment: Excellent (Wave 6 optimization complete)
```

---

### 2. Component-Specific Analysis

For: **[Component Name]**

#### A. Component Size
```
File: [path]
Lines of Code: [N]
Bundle Size: [KB] (estimated from chunk)
Performance Category: [Light/Medium/Heavy]
```

#### B. Dependencies Analysis
```
External Dependencies:
- react: [hooks used]
- framer-motion: [Yes/No]
- three.js: [Yes/No]
- styled-components: [number of styled components]

Dependency Weight:
- Heavy (>100KB): [list]
- Medium (10-100KB): [list]
- Light (<10KB): [list]

Total Dependency Weight: [estimated]
```

#### C. Performance Characteristics
```
Rendering:
- Re-renders: [Frequent/Moderate/Rare]
- useEffect hooks: [count]
- State updates: [frequency]

Animations:
- Type: [Framer Motion/CSS/RAF/None]
- Frequency: [Continuous/On-event/One-time]
- GPU usage: [High/Medium/Low/None]

Heavy Operations:
- [List any expensive operations]

Optimization Status:
✓ [List optimizations applied]
⚠️ [List potential optimizations]
```

#### D. Recommendations
```
Priority: [High/Medium/Low]

Immediate Optimizations:
1. [Specific recommendation]
2. [Specific recommendation]

Future Considerations:
- [Longer-term optimization]
```

---

### 3. Deep Profile Analysis

For `--profile deep`:

#### A. Import Graph Analysis
```
Import Depth:
- Level 1 (direct): [N] files
- Level 2 (indirect): [N] files
- Level 3+: [N] files

Circular Dependencies: [None/List if found]

Heavy Import Chains:
[Component] → [imports] → [imports] → ...
Total weight: [estimated KB]
```

#### B. Code Metrics
```
Total Lines: 4,676 (verified)
Active Components: 16
Unused Code: 0 (Wave 1 cleanup complete) ✓

Code by Category:
- Components: [lines]
- Styled Components: [lines]
- Utilities: [lines]
- Data: [lines]

Code Efficiency:
- Lines per component: [average]
- Duplicate code: [minimal after Wave 3]
```

#### C. Network Performance
```
Initial Load:
- HTML: 2.75 KB
- CSS: 2.29 KB (gzip: 1.62 KB)
- Main JS: 797 KB (gzip: 227 KB)
- Total: ~230 KB (gzipped)

Lazy Loaded:
- Average chunk: ~5-15 KB
- Load time: <500ms (estimated)

Asset Loading:
- Fonts: 37.32 KB (AdeDisplay.otf)
- Images: Loaded on-demand
- Recommendation: Add loading="lazy"
```

#### D. Runtime Performance
```
JavaScript Execution:
- Parse time: [estimated based on bundle size]
- Initialization: [fast with lazy loading]

Memory Usage:
- Estimated heap: [based on component complexity]
- Potential leaks: [check useEffect cleanup] ✓

Frame Rate:
- ShaderVisual: 60fps (continuous)
- Animations: 60fps (RAF-optimized)
- Scroll: Smooth (RAF easing)
```

---

## Output Format

Always provide:

1. **Executive Summary** (1-2 sentences)
2. **Performance Metrics** (quantitative data)
3. **Analysis** (qualitative assessment)
4. **Recommendations** (actionable improvements)
5. **Priority** (High/Medium/Low for each recommendation)

Example:
```markdown
## Performance Analysis: ShaderVisual.jsx

### Summary
Heavy component with continuous 60fps Three.js rendering. GPU-intensive but well-optimized.

### Metrics
- Size: 221 lines
- Bundle: ~30KB (estimated)
- GPU Usage: High
- Frame Rate: 60fps continuous

### Analysis
✓ Proper cleanup (removeEventListener, cancelAnimationFrame)
✓ Efficient shader code
⚠️ No pause mechanism when tab hidden
⚠️ No mobile detection

### Recommendations
1. **[High]** Add visibility detection
   ```javascript
   document.addEventListener('visibilitychange', () => {
     if (document.hidden) pauseAnimation();
     else resumeAnimation();
   });
   ```

2. **[Medium]** Add device detection, disable on mobile
3. **[Low]** Add FPS counter, throttle if <30fps

### Impact
Implementing recommendations 1-2 would reduce battery drain by ~60% on laptops.
```

---

## Context Stack Update
After analysis:
```
last_analysis: "$ARGUMENTS"
analysis_type: "performance"
analysis_date: [timestamp]
findings: [key findings]
```

---

## Performance Benchmark Targets

Use these targets for assessment:

| Metric | Target | Your Portfolio | Status |
|--------|--------|----------------|--------|
| Bundle Size | <1MB | 797KB | ✓ Excellent |
| Gzip Size | <250KB | 227KB | ✓ Excellent |
| Build Time | <5s | 3.38s | ✓ Excellent |
| Chunks | >10 | 15 | ✓ Optimal |
| Asset Size | <100MB | 443MB | ⚠️ Heavy |
| Image Lazy Loading | Yes | No | ⚠️ Missing |
| Code Splitting | Yes | Yes | ✓ Complete |

---

## Error Handling

If component not found:
- List all components with estimated performance impact
- Suggest running general analysis: `/analyze/performance`
