# Researcher 1: Visual Comparison & Performance Analysis

**Status**: ⏳ Not Started  
**Estimated Time**: 40 minutes  
**Dependencies**: All 4 engineers must complete first  
**Output**: `docs/research/SHADER_REDESIGN_ANALYSIS.md`

---

## 🎯 Goal

Compare old vs new shader system, measure performance impact, provide visual documentation.

---

## 📋 Tasks

### 1. Visual Comparison (15 min)

Take screenshots of all 11 routes:

**Before** (old flat Truchet):
- Home, About, Projects, Archive, Contact
- All 6 project pages

**After** (new multi-system):
- Same 11 routes
- Document visual differences

**Format**: Side-by-side comparison table

---

### 2. Performance Benchmarking (15 min)

Measure:
- FPS (before/after) on each route
- GPU usage (Chrome DevTools Performance)
- Bundle size impact
- Initial load time

**Tools**:
```bash
# FPS Counter
Chrome DevTools > Rendering > FPS meter

# Performance
Chrome DevTools > Performance > Record 10 seconds

# Bundle size
yarn build
# Check dist/assets/index-*.js size
```

---

### 3. Analysis Report (10 min)

Create `docs/research/SHADER_REDESIGN_ANALYSIS.md`:

```markdown
# Shader Redesign Analysis

## Visual Comparison
[Screenshots before/after]

## Performance Metrics
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| FPS (average) | 60 | 60 | 0% |
| GPU Usage | 30% | 35% | +5% |
| Bundle Size | 800KB | 805KB | +0.6% |

## Route Personality Evaluation
- /about: ✅ Calm, minimal (as intended)
- /projects: ✅ Energetic, dimensional (as intended)
[etc.]

## Recommendations
- [Any optimizations needed]
- [Visual tuning suggestions]
```

---

## ✅ Success Criteria

- [x] 11 routes screenshot (before/after)
- [x] FPS measured on all routes
- [x] Performance impact documented
- [x] Report created with findings
- [x] No performance regressions >5%

---

**Status**: ⏳ → ✅  
**Findings**: (summarize key metrics)
