# W3-T4: Accessibility Check

**Wave**: 3 (Research & QA)
**Task**: 4 of 5
**Agent**: QA
**Time Estimate**: 15 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 2)
**Dependencies**: Wave 2 complete

---

## Prompt (Copy & Paste)

```
I need you to check accessibility for the experimental shaders feature.

## Task
Verify the experimental shaders section meets basic accessibility requirements.

## Accessibility Checks

### 1. Reduced Motion Support
Check if shaders respect `prefers-reduced-motion`:

```jsx
// Should be implemented in BaseExperimentShader
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// If reduced motion preferred:
// - Reduce or pause animation
// - Keep static visual
```

**Test**:
- In Mac: System Preferences → Accessibility → Display → Reduce motion
- In Windows: Settings → Ease of Access → Display → Show animations
- Verify shader behavior changes

### 2. Keyboard Navigation
Test all keyboard interactions:

| Key | Expected Action |
|-----|-----------------|
| Tab | Focus moves between navigation elements |
| Enter | Activates focused link/button |
| Escape | Returns to /experiments |
| Arrow Left | Previous experiment |
| Arrow Right | Next experiment |
| C | Toggle controls (if implemented) |

### 3. Focus Indicators
Verify visible focus states on:
- [ ] Navigation cards in ExperimentNav
- [ ] Back button on experiment pages
- [ ] Prev/Next buttons
- [ ] Any interactive elements

### 4. Color Contrast
For text overlays (title, navigation):
- Check contrast ratio against shader background
- Should be at least 4.5:1 for normal text
- Consider adding text shadow or background for visibility

### 5. Screen Reader Compatibility
For navigation elements, check:
- [ ] Cards have meaningful text
- [ ] Buttons have descriptive labels
- [ ] Links have clear destinations

### 6. Alternative Content
For users who can't see shaders:
- [ ] Alt text or descriptions available
- [ ] Fallback for WebGL not supported
- [ ] Static representation possible

## Implementation Recommendations

### Add Reduced Motion Support

```jsx
// In BaseExperimentShader.jsx
const [reducedMotion, setReducedMotion] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  setReducedMotion(mediaQuery.matches);

  const handler = (e) => setReducedMotion(e.matches);
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}, []);

// In animation loop:
const animate = () => {
  if (!reducedMotion) {
    material.uniforms.u_time.value += 0.01;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
```

### Add ARIA Labels

```jsx
// ExperimentNav cards
<Link
  to={`/experiments/${experiment.id}`}
  aria-label={`View ${experiment.name} shader experiment: ${experiment.description}`}
>

// Navigation buttons
<NavButton aria-label="Go back to experiments list">← BACK</NavButton>
<NavButton aria-label="Go to previous experiment">← PREV</NavButton>
<NavButton aria-label="Go to next experiment">NEXT →</NavButton>
```

### Add Visible Focus Styles

```jsx
const NavButton = styled.button`
  // ... existing styles

  &:focus {
    outline: 2px solid rgba(136, 169, 215, 0.8);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid rgba(136, 169, 215, 0.8);
    outline-offset: 2px;
  }
`;
```

## Report Format

Add accessibility findings to QA report or create:

```markdown
## Accessibility Assessment

### Reduced Motion
- [ ] Implemented
- [ ] Tested
- Behavior: [Description]

### Keyboard Navigation
- [ ] All elements reachable
- [ ] Focus order logical
- [ ] Shortcuts documented

### Focus Indicators
- [ ] Visible on all interactive elements
- [ ] High enough contrast

### Screen Reader
- [ ] Labels present
- [ ] Navigation logical

### Recommendations
1. [Priority 1 fix]
2. [Priority 2 fix]
```

## Acceptance Criteria
- [ ] Reduced motion preference checked
- [ ] Keyboard navigation tested
- [ ] Focus indicators verified
- [ ] ARIA labels present (or recommendations made)
- [ ] Findings documented
```

---

## Accessibility Checklist

| Category | Status | Notes |
|----------|--------|-------|
| Reduced motion | ? | |
| Keyboard nav | ? | |
| Focus indicators | ? | |
| Color contrast | ? | |
| Screen reader | ? | |
| Fallbacks | ? | |

---

## Priority Fixes

1. **Critical**: Reduced motion support
2. **High**: Keyboard navigation
3. **Medium**: Focus indicators
4. **Low**: Enhanced ARIA labels

---

## Completion Checklist

- [ ] Motion preference tested
- [ ] Keyboard tested
- [ ] Focus states checked
- [ ] Findings documented
