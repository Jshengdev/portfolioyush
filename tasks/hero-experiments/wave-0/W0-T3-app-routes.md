# W0-T3: Add Experiment Routes to App.jsx

**Wave**: 0 (Infrastructure)
**Task**: 3 of 6
**Agent**: Engineer
**Time Estimate**: 10 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (no dependencies)

---

## Prompt (Copy & Paste)

```
I need you to add routes for experimental hero page shaders to App.jsx.

## Task
Add lazy-loaded routes for 5 experimental shader pages plus a navigation page.

## File to Edit
`/src/App.jsx`

## Changes Required

### 1. Add Lazy Imports (after line 18, after NextProject import)

```javascript
// Experimental shader pages
const ExperimentNav = lazy(() => import('./components/experiments/ExperimentNav'));
const ExperimentV1 = lazy(() => import('./components/experiments/v1'));
const ExperimentV2 = lazy(() => import('./components/experiments/v2'));
const ExperimentV3 = lazy(() => import('./components/experiments/v3'));
const ExperimentV4 = lazy(() => import('./components/experiments/v4'));
const ExperimentV5 = lazy(() => import('./components/experiments/v5'));
```

### 2. Add Routes (inside AnimatedRoutes, after line 176 - after AlainaPamela route)

```javascript
{/* Experimental shader pages */}
<Route path="/experiments" element={
  <PageWrapper>
    <ExperimentNav />
  </PageWrapper>
} />
<Route path="/experiments/v1" element={
  <PageWrapper>
    <ExperimentV1 />
  </PageWrapper>
} />
<Route path="/experiments/v2" element={
  <PageWrapper>
    <ExperimentV2 />
  </PageWrapper>
} />
<Route path="/experiments/v3" element={
  <PageWrapper>
    <ExperimentV3 />
  </PageWrapper>
} />
<Route path="/experiments/v4" element={
  <PageWrapper>
    <ExperimentV4 />
  </PageWrapper>
} />
<Route path="/experiments/v5" element={
  <PageWrapper>
    <ExperimentV5 />
  </PageWrapper>
} />
```

## Reference
Read `/src/App.jsx` to understand current routing patterns.

## Acceptance Criteria
- [ ] 6 lazy imports added (ExperimentNav + 5 versions)
- [ ] 6 routes added (/experiments + /experiments/v1-v5)
- [ ] All routes wrapped in PageWrapper
- [ ] No syntax errors in App.jsx
- [ ] Build still completes (yarn build)

Note: The actual components don't exist yet - that's fine. Lazy loading will handle missing files gracefully during development.
```

---

## File to Edit

**Path**: `/src/App.jsx`

---

## Changes Summary

| Location | Change |
|----------|--------|
| After line 18 | Add 6 lazy imports |
| After line 176 | Add 6 route definitions |

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Current route patterns |

---

## Acceptance Criteria

- [ ] 6 lazy imports added
- [ ] 6 routes added with correct paths
- [ ] PageWrapper wrapping all routes
- [ ] No syntax errors
- [ ] Build completes

---

## Completion Checklist

- [ ] Imports added
- [ ] Routes added
- [ ] Tested with `yarn build`
