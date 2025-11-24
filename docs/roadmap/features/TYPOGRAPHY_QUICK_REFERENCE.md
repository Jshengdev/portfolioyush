# Chaotic Typography - Quick Reference

**Full Plan**: [CHAOTIC_TYPOGRAPHY_PLAN.md](./CHAOTIC_TYPOGRAPHY_PLAN.md)

---

## Phase Checklist

### ☐ Phase 1: Static Layout (2-3 hours)
- [ ] Create `/src/components/Playground/ChaoticTypography.jsx`
- [ ] Generate 300 random letters (grid + jitter distribution)
- [ ] Styled-components with `position: absolute`
- [ ] Random rotation (-15° to +15°), scale (0.8-1.2x), size (20-60px)
- **Verify**: 60fps idle, letters evenly distributed

### ☐ Phase 2: Chromatic Aberration (1-2 hours)
- [ ] Add CSS `text-shadow` with red/cyan offsets
- [ ] Theme-aware colors (dark/light mode)
- [ ] Variable aberration offset (1-4px per letter)
- **Verify**: RGB split visible, 0-5fps drop

### ☐ Phase 3: Cursor Detection (2-3 hours)
- [ ] Track mouse position with `mousemove` event
- [ ] Calculate distance to all letters every frame (RAF loop)
- [ ] Identify letters within 100px radius
- [ ] Optimize with spatial grid if needed
- **Verify**: Console logs hot letters, <5ms per frame

### ☐ Phase 4: Jiggle Animation (2-3 hours)
- [ ] Framer Motion `animate` prop for hot letters
- [ ] Rotate (-5° to +5°), translate (±2px)
- [ ] Randomized jiggle patterns per letter
- [ ] Distance-based intensity (closer = stronger jiggle)
- [ ] React.memo optimization
- **Verify**: Smooth jiggle at 60fps

### ☐ Phase 5: Polish & Optimization (2-3 hours)
- [ ] GPU acceleration (`will-change: transform`)
- [ ] Touch support (`touchmove`, `touchstart`)
- [ ] Reduced motion preference check
- [ ] Mobile: 150 letters, throttle to 30fps
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- **Verify**: 60fps desktop, 30fps+ mobile, accessible

### ☐ Phase 6: Portfolio Integration (1-2 hours)
- [ ] Add route `/playground/typography` to App.jsx
- [ ] Lazy load component
- [ ] Match theme colors (chromatic.red/cyan in theme.js)
- [ ] Add experimental badge
- [ ] Add back button
- [ ] Test with ShaderVisual, Cursor, Navbar
- **Verify**: Integrates seamlessly with portfolio

---

## Quick Code Snippets

### Letter Generation
```javascript
function generateLetters(count) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array(count).fill(null).map((_, i) => ({
    char: chars[Math.floor(Math.random() * chars.length)],
    x: Math.random() * 100,  // % of viewport
    y: Math.random() * 100,
    rotation: (Math.random() - 0.5) * 30,
    scale: 0.8 + Math.random() * 0.4,
    size: 20 + Math.random() * 40,
    weight: Math.random() > 0.5 ? 300 : 700,
    aberrationOffset: 1 + Math.random() * 3,
  }));
}
```

### Chromatic Aberration CSS
```javascript
const Letter = styled(motion.span)`
  text-shadow:
    -${props => props.aberrationOffset}px 0 ${props => props.theme.colors.chromatic.red},
    ${props => props.aberrationOffset}px 0 ${props => props.theme.colors.chromatic.cyan},
    0 0 20px ${props => props.theme.colors.shadow.glow};
`;
```

### Distance Calculation
```javascript
const TRIGGER_RADIUS = 100;

const updateHotLetters = () => {
  const newHotLetters = new Set();

  letters.forEach((letter, i) => {
    const letterX = (letter.x / 100) * window.innerWidth;
    const letterY = (letter.y / 100) * window.innerHeight;
    const distance = Math.sqrt(
      (mousePos.x - letterX) ** 2 +
      (mousePos.y - letterY) ** 2
    );

    if (distance < TRIGGER_RADIUS) {
      newHotLetters.add(i);
    }
  });

  setHotLetters(newHotLetters);
  rafRef.current = requestAnimationFrame(updateHotLetters);
};
```

### Jiggle Animation
```javascript
<Letter
  animate={isHot ? {
    rotate: [letter.rotation - 5, letter.rotation + 5, letter.rotation - 5],
    x: [0, 2, -2, 0],
    y: [0, -2, 2, 0],
  } : {
    rotate: letter.rotation,
    x: 0,
    y: 0,
  }}
  transition={{
    duration: 0.15,
    repeat: isHot ? Infinity : 0,
    ease: 'easeInOut',
  }}
/>
```

---

## Performance Targets

| Device | Letter Count | Target FPS | Max Frame Time |
|--------|--------------|-----------|----------------|
| Desktop | 300 | 60fps | 16.67ms |
| Mobile (High) | 150 | 40fps+ | 25ms |
| Mobile (Mid) | 150 | 30fps+ | 33ms |

**Measurement**:
```javascript
// Chrome DevTools > Performance > Record 5 seconds
// Look for frame drops (red bars)
// Check CPU usage, should be <10%
```

---

## Key Decisions

1. **Distribution**: Grid with jitter (even coverage)
2. **Aberration**: CSS text-shadow (simple, fast)
3. **Detection**: Brute force → Grid optimization if needed
4. **Animation**: Framer Motion + React.memo
5. **Mobile**: 150 letters, simplified effects

---

## Rollback Strategies

**If FPS < 50fps**:
1. Reduce letter count (300 → 200 → 150)
2. Spatial grid optimization
3. Direct RAF animation (skip Framer Motion)
4. Disable chromatic aberration
5. Canvas rendering

**If Too Complex**:
1. Simplify to static layout only (Phases 1-2)
2. Disable jiggle animation
3. Use as background, not interactive

**If Integration Issues**:
1. Keep as standalone page (no Navbar/Frame)
2. Adjust z-index layers
3. Disable ShaderVisual on this page

---

## File Structure

```
/src/components/Playground/
├── ChaoticTypography.jsx      # Main component (300 lines)
├── LetterComponent.jsx         # Memoized letter (50 lines)
├── utils/
│   ├── letterGenerator.js     # generateLetters() (30 lines)
│   ├── distanceCalculator.js  # findLettersInRadius() (40 lines)
│   └── gridOptimizer.js       # Spatial grid (60 lines, optional)
└── index.js                    # Re-exports (5 lines)
```

**Total**: ~400-500 lines of code

---

## Testing Commands

```bash
# Dev server
yarn dev

# Build test
yarn build

# Performance test
# Chrome DevTools > Performance > Record
# Look for: FPS, Frame time, CPU %, Memory growth

# Accessibility test
# Enable "Reduce motion" in OS settings
# Test with screen reader (VoiceOver/NVDA)

# Mobile test
# Chrome DevTools > Device toolbar
# Test on real device via local network
```

---

## Git Workflow

```bash
# Create branch
git checkout -b claude/feature-chaotic-typography

# Commit after each phase
git add .
git commit -m "feat: add static chaotic typography layout (Phase 1)"

# Push and create PR
git push -u origin claude/feature-chaotic-typography
```

---

## Timeline

- **Week 1 (Days 1-3)**: Phases 1-3 (Core functionality)
- **Week 2 (Days 4-5)**: Phases 4-5 (Animation & polish)
- **Week 3 (Day 6)**: Phase 6 (Integration & deployment)

**Total**: 10-16 hours across 3 weeks

---

## Success Criteria

✅ **Technical**:
- 60fps desktop, 30fps+ mobile
- 300 letters (desktop), 150 (mobile)
- <10% CPU usage
- No memory leaks

✅ **User Experience**:
- Immediate cursor reaction
- Smooth jiggle animation
- Theme-integrated colors
- Accessible (reduced motion support)

✅ **Integration**:
- Works with existing portfolio layout
- Doesn't break other pages
- Lazy-loaded, small bundle impact
- Looks native to portfolio design

---

**Full Details**: See [CHAOTIC_TYPOGRAPHY_PLAN.md](./CHAOTIC_TYPOGRAPHY_PLAN.md) (1,850 lines)
