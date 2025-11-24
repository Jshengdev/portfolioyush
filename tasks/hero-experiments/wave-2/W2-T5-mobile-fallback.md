# W2-T5: Add Mobile Fallback and Touch Support

**Wave**: 2 (Integration & Polish)
**Task**: 5 of 5
**Agent**: Engineer
**Time Estimate**: 20 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete

---

## Prompt (Copy & Paste)

```
I need you to add mobile/touch support and fallbacks for the experimental shaders.

## Task
Ensure experimental shaders work on mobile devices with touch input, and add fallbacks for devices with poor WebGL performance.

## Files to Update
1. `/src/components/experiments/BaseExperimentShader.jsx` - Add touch support
2. Each experiment's index.jsx - Handle mobile layout

## Requirements

### 1. Touch Support in BaseExperimentShader
Convert mouse events to touch events:

```jsx
// In BaseExperimentShader useEffect:

// Mouse handler (existing)
const onMouseMove = (e) => {
  const x = e.clientX / window.innerWidth;
  const y = 1 - e.clientY / window.innerHeight;
  material.uniforms.u_mouse.value.set(x, y);
};

// Touch handler (new)
const onTouchMove = (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const x = touch.clientX / window.innerWidth;
    const y = 1 - touch.clientY / window.innerHeight;
    material.uniforms.u_mouse.value.set(x, y);
  }
};

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove, { passive: true });
window.addEventListener("touchstart", onTouchMove, { passive: true });

// Cleanup
return () => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchstart", onTouchMove);
  // ... rest of cleanup
};
```

### 2. Performance Detection
Add simple performance check and reduce quality on slow devices:

```jsx
// At start of BaseExperimentShader
const [isLowPerf, setIsLowPerf] = useState(false);

useEffect(() => {
  // Simple performance heuristic
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  if (isMobile || isLowEnd) {
    setIsLowPerf(true);
  }
}, []);

// In animation loop:
const animate = () => {
  // Reduce animation speed on low-perf devices
  const timeIncrement = isLowPerf ? 0.005 : 0.01;
  material.uniforms.u_time.value += timeIncrement;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
```

### 3. WebGL Fallback
Show static gradient if WebGL fails:

```jsx
const FallbackGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${props => props.isDarkMode ? '#0a0a0a' : '#f5f5f5'} 0%,
    ${props => props.isDarkMode ? '#1a1a2e' : '#e8e8f0'} 50%,
    ${props => props.isDarkMode ? '#0f0f1a' : '#f0f0f8'} 100%
  );
  z-index: -1;
`;

// In component:
const [webGLSupported, setWebGLSupported] = useState(true);

useEffect(() => {
  // Check WebGL support
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
    }
  } catch (e) {
    setWebGLSupported(false);
  }
}, []);

// In render:
if (!webGLSupported) {
  return <FallbackGradient isDarkMode={isDarkMode} />;
}
```

### 4. Responsive Navigation (ExperimentNav)
Ensure navigation grid stacks on mobile:

```jsx
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
```

## Reference
- Read `/src/components/experiments/BaseExperimentShader.jsx`
- Read `/src/components/experiments/ExperimentNav.jsx`

## Acceptance Criteria
- [ ] Touch events work on mobile
- [ ] Mouse position updates via touch
- [ ] Performance reduction on low-end devices
- [ ] WebGL fallback displays if not supported
- [ ] Navigation grid responsive on mobile
- [ ] No errors on mobile browsers

## Test
Open /experiments on mobile device or use browser dev tools mobile emulation.
```

---

## Files to Update

| Path | Changes |
|------|---------|
| `src/components/experiments/BaseExperimentShader.jsx` | Touch events, performance detection, WebGL fallback |
| `src/components/experiments/ExperimentNav.jsx` | Responsive grid |

---

## Mobile Considerations

| Feature | Implementation |
|---------|----------------|
| Touch input | touchmove, touchstart events |
| Performance | Detect mobile, reduce animation speed |
| WebGL fallback | Static gradient if WebGL unavailable |
| Layout | Responsive grid stacking |

---

## Acceptance Criteria

- [ ] Touch events work
- [ ] Low-perf mode activates on mobile
- [ ] Fallback displays without WebGL
- [ ] Responsive navigation

---

## Completion Checklist

- [ ] Touch support added
- [ ] Performance detection added
- [ ] Fallback implemented
- [ ] Mobile layout responsive
