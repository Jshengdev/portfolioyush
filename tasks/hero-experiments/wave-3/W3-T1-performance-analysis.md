# W3-T1: Performance Analysis

**Wave**: 3 (Research & QA)
**Task**: 1 of 5
**Agent**: Researcher
**Time Estimate**: 25 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 2)
**Dependencies**: Wave 2 complete

---

## Prompt (Copy & Paste)

```
I need you to analyze the performance of all 5 experimental shaders.

## Task
Conduct performance analysis on each experimental shader and compare them.

## Analysis Steps

### 1. Bundle Size Impact
Run build and check output:
```bash
yarn build
```

Check the dist folder for:
- Total bundle size
- New chunk sizes for experiments
- Compare to previous build (before experiments)

### 2. Individual Shader Performance
For each shader (v1-v5), analyze:

a) **FPS Measurement**
- Open each experiment in browser
- Use browser dev tools Performance tab
- Record 10 seconds of animation
- Note average FPS

b) **GPU Usage**
- Check GPU utilization in Activity Monitor (Mac) or Task Manager (Windows)
- Note percentage during animation

c) **Memory Usage**
- Check JS heap size in dev tools Memory tab
- Note any memory leaks (growing heap over time)

### 3. Comparison Matrix
Create a comparison table:

| Shader | Avg FPS | GPU % | Memory (MB) | Complexity | Recommendation |
|--------|---------|-------|-------------|------------|----------------|
| V1 Aurora | ? | ? | ? | Medium | ? |
| V2 Fog | ? | ? | ? | High (FBM) | ? |
| V3 Bloom | ? | ? | ? | Low | ? |
| V4 Liquid | ? | ? | ? | Medium | ? |
| V5 Waves | ? | ? | ? | Low | ? |

### 4. Mobile Performance (if possible)
Test on mobile device or use Chrome DevTools device emulation:
- Throttle CPU to 4x slowdown
- Note FPS on each shader
- Identify any that struggle on mobile

### 5. Lazy Loading Verification
Check that experiments are properly code-split:
```bash
# In dist/assets, look for separate chunks for experiments
ls -la dist/assets/*.js
```

Verify each experiment loads only when navigated to.

## Report Format

Create a performance report at `/docs/reports/HERO_EXPERIMENTS_PERFORMANCE.md`:

```markdown
# Hero Experiments - Performance Analysis

**Date**: [Date]
**Analyzed by**: Researcher 1

## Executive Summary
[1-2 sentence summary of findings]

## Bundle Analysis
- Total bundle: [size]
- Experiment chunks: [list sizes]
- Impact: [+/- KB from baseline]

## FPS Analysis

| Shader | Desktop FPS | Mobile FPS | Verdict |
|--------|-------------|------------|---------|
| V1 Aurora | 60 | 45 | ✅ Good |
| ... | ... | ... | ... |

## Memory Analysis
[Memory findings]

## GPU Usage
[GPU findings]

## Recommendations

### High Performance (Best for Production)
1. [Shader name] - [Why]

### Medium Performance (Acceptable)
2. [Shader name] - [Why]

### Needs Optimization
3. [Shader name] - [What to optimize]

## Conclusion
[Final recommendation for which shader to use as Hero]
```

## Acceptance Criteria
- [ ] Bundle size documented
- [ ] FPS measured for all 5 shaders
- [ ] GPU/Memory analyzed
- [ ] Mobile performance tested
- [ ] Lazy loading verified
- [ ] Report created with recommendations

## Reference
- Read `/docs/design/SHADER_PHILOSOPHY.md` for performance targets
```

---

## Output File

**Path**: `/docs/reports/HERO_EXPERIMENTS_PERFORMANCE.md`

---

## Metrics to Collect

| Metric | Target | Method |
|--------|--------|--------|
| FPS | 60fps desktop, 30fps mobile | Dev tools Performance |
| GPU | <50% | Activity Monitor |
| Memory | <50MB heap | Dev tools Memory |
| Bundle | <50KB per chunk | Build output |

---

## Acceptance Criteria

- [ ] All 5 shaders analyzed
- [ ] Comparison matrix complete
- [ ] Mobile performance tested
- [ ] Report with recommendations created

---

## Completion Checklist

- [ ] Build run
- [ ] FPS measured
- [ ] Report written
