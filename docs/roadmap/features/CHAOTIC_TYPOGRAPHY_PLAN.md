# Chaotic Typography Implementation Plan
**Feature**: Cursor-Reactive Chromatic Aberration Typography
**Status**: Planning Phase
**Estimated Time**: 8-12 hours across 6 phases
**Target Route**: `/playground/typography` or dedicated experimental page

---

## Overview

Create an experimental typography effect with:
- **Static chaotic layout**: Random letter positions, rotations, scales
- **Chromatic aberration**: RGB color split (prism/glitch effect)
- **Cursor reactivity**: Letters jiggle when cursor approaches
- **Performance**: 60fps on desktop, 30fps on mobile
- **Integration**: Fits portfolio's dark/light theme system

**Design Inspiration**: Chaotic brutalist web design + chromatic aberration glitch aesthetics

---

## Architecture Analysis

### Existing Patterns to Leverage

1. **Cursor System** (`/src/Cursor.jsx`):
   - Already tracks mouse position globally via `mousemove` event
   - Uses `requestAnimationFrame` for 60fps updates
   - Implements easing for smooth motion
   - **Reuse**: Hook into same mouse tracking, add distance calculations

2. **Animation System** (`/src/components/Line.jsx`):
   - Route-reactive animations with Framer Motion
   - Complex transforms (translate, rotate, skew)
   - **Reuse**: Similar animation patterns for letter jiggle

3. **Theme System** (`/src/theme.js`):
   - Dark/light mode with `ThemeContext`
   - Design tokens for colors, spacing, fonts
   - **Reuse**: Typography colors, accent colors for aberration

4. **WebGL Background** (`/src/components/ShaderVisual.jsx`):
   - Continuous animation loop with Three.js
   - Mouse position tracking for interactivity
   - **Alternative Approach**: Could implement entire effect in WebGL for max performance

### Technical Constraints

- ✅ **React 18.2**: Hooks-based (useState, useEffect, useRef, useMemo)
- ✅ **Styled-Components 6.1**: All styling via CSS-in-JS
- ✅ **Framer Motion 11.15**: Available for animations (but RAF may be better for cursor tracking)
- ✅ **React Router 7.0**: Lazy-loaded route with Suspense
- ⚠️ **No Canvas 2D library**: Pure DOM or Three.js only
- ⚠️ **Performance**: 16ms frame budget (60fps), 33ms on mobile (30fps)

---

## Phase 1: Static Chaotic Layout

### Goal
Generate 200-500 letters filling viewport with random positions, rotations, and scales.

### Implementation Strategy

**Approach A: Pure DOM (Recommended for MVP)**
- Generate array of letter objects with transform data
- Render as styled `<span>` elements with `position: absolute`
- Use CSS transforms for positioning
- **Pros**: Simple, theme-integrated, inspectable
- **Cons**: Performance ceiling ~300 letters

**Approach B: Canvas 2D**
- Render letters to canvas element
- **Pros**: Higher performance (500+ letters)
- **Cons**: No CSS styling, harder debugging, accessibility issues

**Approach C: WebGL/Three.js**
- Render as textured quads or instanced geometry
- **Pros**: Best performance (1000+ letters)
- **Cons**: Complex implementation, shader learning curve

**DECISION**: Start with **Approach A** (Pure DOM), migrate to **Approach C** if performance issues.

### Code Structure

**File**: `/src/components/Playground/ChaoticTypography.jsx`

```javascript
import React, { useMemo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled container
const TypographyCanvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background.primary};
`;

// Individual letter component
const Letter = styled(motion.span)`
  position: absolute;
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.size}px;
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.weight};
  pointer-events: none;
  user-select: none;
  will-change: transform; /* GPU acceleration */
`;

const ChaoticTypography = () => {
  const containerRef = useRef(null);

  // Generate random letter data (memoized)
  const letters = useMemo(() => generateLetters(300), []);

  return (
    <TypographyCanvas ref={containerRef}>
      {letters.map((letter, i) => (
        <Letter
          key={i}
          size={letter.size}
          weight={letter.weight}
          style={{
            left: `${letter.x}%`,
            top: `${letter.y}%`,
            transform: `rotate(${letter.rotation}deg) scale(${letter.scale})`,
          }}
        >
          {letter.char}
        </Letter>
      ))}
    </TypographyCanvas>
  );
};

// Letter generation algorithm
function generateLetters(count) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const letters = [];

  for (let i = 0; i < count; i++) {
    letters.push({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,          // 0-100% viewport width
      y: Math.random() * 100,          // 0-100% viewport height
      rotation: (Math.random() - 0.5) * 30,  // -15° to +15°
      scale: 0.8 + Math.random() * 0.4,      // 0.8x to 1.2x
      size: 20 + Math.random() * 40,          // 20-60px font size
      weight: Math.random() > 0.5 ? 300 : 700, // Light or bold
    });
  }

  return letters;
}

export default ChaoticTypography;
```

### Distribution Algorithm Options

**Option 1: Pure Random** (Simplest)
```javascript
x: Math.random() * 100,
y: Math.random() * 100,
```
- **Pros**: Fast, unpredictable chaos
- **Cons**: May have empty areas or clumps

**Option 2: Grid with Jitter** (Recommended)
```javascript
const gridX = (i % cols) * cellWidth;
const gridY = Math.floor(i / cols) * cellHeight;
x: gridX + (Math.random() - 0.5) * cellWidth * 0.8,  // 80% jitter
y: gridY + (Math.random() - 0.5) * cellHeight * 0.8,
```
- **Pros**: Even distribution, controlled chaos
- **Cons**: Slightly more complex

**Option 3: Poisson Disk Sampling** (Best Visual Quality)
- Uses algorithm to ensure minimum distance between letters
- **Pros**: Professional look, no clumping
- **Cons**: Complex implementation, may use library

**DECISION**: Start with **Option 2** (Grid with Jitter), upgrade to **Option 3** if needed.

### Verification Checklist

- [ ] **Visual Check**: 300 letters visible, no letters cut off
- [ ] **Distribution**: Letters evenly distributed across viewport
- [ ] **Rotation Range**: Verify -15° to +15° rotation (inspect devtools)
- [ ] **Scale Range**: Verify 0.8x to 1.2x scale (inspect devtools)
- [ ] **Font Size Range**: 20-60px (inspect computed styles)
- [ ] **Font Weights**: Mix of 300 and 700 weight
- [ ] **Character Variety**: All character sets present
- [ ] **Performance**: Check FPS in Chrome DevTools Performance tab
  - Target: 60fps idle (16.67ms frames)
  - Acceptable: 50fps+ (20ms frames)
- [ ] **Responsive**: Test on different viewport sizes
- [ ] **Theme**: Letters change color in light/dark mode

### Performance Benchmarks

| Letter Count | Target FPS | Frame Budget | Acceptable |
|--------------|-----------|--------------|------------|
| 100 letters  | 60fps     | 16.67ms      | ✅ Easy    |
| 300 letters  | 60fps     | 16.67ms      | ✅ Target  |
| 500 letters  | 50fps+    | 20ms         | ⚠️ Limit   |
| 1000+ letters| 30fps+    | 33ms         | ❌ Canvas/WebGL needed |

**Measurement**:
```javascript
// Add to useEffect
let frameCount = 0;
let lastTime = performance.now();

const measureFPS = () => {
  frameCount++;
  const now = performance.now();
  if (now - lastTime > 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
};
measureFPS();
```

### Rollback Plan

**If performance < 50fps**:
1. Reduce letter count to 200
2. Simplify distribution (pure random instead of grid)
3. Remove font weight variation (single weight)
4. Consider canvas-based rendering (Phase 5 fallback)

**If layout looks cluttered**:
1. Increase letter spacing (reduce count to 200)
2. Limit font size range (30-50px instead of 20-60px)
3. Reduce rotation angle (-10° to +10°)

---

## Phase 2: Chromatic Aberration Effect

### Goal
Apply RGB color separation to each letter for prism/glitch effect.

### Implementation Strategy

**Approach A: CSS text-shadow (Recommended)**
```css
text-shadow:
  -2px 0 red,
  2px 0 cyan;
```
- **Pros**: Simple, GPU-accelerated, works with DOM
- **Cons**: Limited to 2-3 color channels, can't animate per-letter

**Approach B: CSS filter + SVG**
```css
filter: url(#chromatic-aberration);
```
- **Pros**: More control, can animate filter
- **Cons**: Applies to entire element group, not per-letter

**Approach C: Duplicate Elements (Best Control)**
Render each letter 3 times (R, G, B) with offsets
- **Pros**: Full control, can vary per letter, animatable
- **Cons**: 3x DOM nodes (900 elements for 300 letters)

**DECISION**: Start with **Approach A** (CSS text-shadow), upgrade to **Approach C** if animation needed.

### Code Implementation

**Enhanced Letter Component**:
```javascript
const Letter = styled(motion.span)`
  position: absolute;
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.size}px;
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.weight};
  pointer-events: none;
  user-select: none;
  will-change: transform;

  /* Chromatic aberration effect */
  text-shadow:
    -${props => props.aberrationOffset}px 0 ${props => props.theme.colors.accent.red},
    ${props => props.aberrationOffset}px 0 ${props => props.theme.colors.accent.blueBright},
    0 0 20px ${props => props.theme.colors.shadow.glow};
`;
```

**Letter Generation Update**:
```javascript
function generateLetters(count) {
  // ... existing code ...
  letters.push({
    // ... existing properties ...
    aberrationOffset: 1 + Math.random() * 3,  // 1-4px offset
  });
}
```

### Color Choices (Theme-Aware)

**Dark Mode**:
- Red channel: `rgba(255, 0, 0, 0.7)` (vibrant red)
- Cyan channel: `rgba(0, 255, 255, 0.7)` (bright cyan)
- Base letter: `rgba(255, 255, 255, 0.9)` (white)

**Light Mode**:
- Red channel: `rgba(220, 0, 0, 0.6)` (darker red)
- Blue channel: `rgba(0, 0, 220, 0.6)` (darker blue)
- Base letter: `rgba(0, 0, 0, 0.9)` (black)

**Implementation**:
```javascript
// Add to theme.js
export const darkTheme = {
  colors: {
    // ... existing colors ...
    chromatic: {
      red: 'rgba(255, 0, 0, 0.7)',
      cyan: 'rgba(0, 255, 255, 0.7)',
    },
  },
};

export const lightTheme = {
  colors: {
    // ... existing colors ...
    chromatic: {
      red: 'rgba(220, 0, 0, 0.6)',
      blue: 'rgba(0, 0, 220, 0.6)',
    },
  },
};
```

### Alternative: Duplicate Elements Approach

**If Approach A is insufficient**:
```javascript
const LetterGroup = styled.div`
  position: absolute;
  /* Center the group */
`;

const RedLetter = styled.span`
  position: absolute;
  color: ${props => props.theme.colors.chromatic.red};
  mix-blend-mode: screen; /* Additive blending */
  transform: translateX(-2px);
`;

const CyanLetter = styled.span`
  position: absolute;
  color: ${props => props.theme.colors.chromatic.cyan};
  mix-blend-mode: screen;
  transform: translateX(2px);
`;

const BaseLetter = styled.span`
  position: absolute;
  color: ${props => props.theme.colors.text.primary};
  opacity: 0.3; /* Dimmed base layer */
`;

// Render
<LetterGroup style={{...}}>
  <RedLetter>{letter.char}</RedLetter>
  <CyanLetter>{letter.char}</CyanLetter>
  <BaseLetter>{letter.char}</BaseLetter>
</LetterGroup>
```

### Verification Checklist

- [ ] **Visual Effect**: Red/cyan color split visible on all letters
- [ ] **Offset Variation**: Different aberration amounts per letter
- [ ] **Glow Effect**: Subtle glow around letters
- [ ] **Theme Integration**: Colors adapt to dark/light mode
- [ ] **No Blur**: Letters remain sharp (not blurry text-shadow)
- [ ] **Blend Mode**: Colors add/multiply correctly (check cyan+red = white)
- [ ] **Performance Check**: FPS still 60fps (text-shadow is GPU-accelerated)
  - If FPS drops: Reduce aberrationOffset range (1-2px instead of 1-4px)
- [ ] **Mobile Test**: Effect visible on mobile screens
- [ ] **Accessibility**: Ensure text is still readable with reduced motion preference

### Performance Benchmarks

| Approach | DOM Nodes | GPU Load | FPS Impact |
|----------|-----------|----------|------------|
| CSS text-shadow | 300 | Low | 0-5fps drop |
| SVG filter | 300 | Medium | 5-10fps drop |
| Duplicate elements | 900 | Medium | 10-20fps drop |

**Measurement**:
```javascript
// Before/after FPS comparison
const fpsBefore = measureAverageFPS(2000); // 2 second sample
// Apply chromatic aberration
const fpsAfter = measureAverageFPS(2000);
console.log(`FPS impact: ${fpsBefore - fpsAfter}fps`);
```

### Rollback Plan

**If FPS drops below 50fps**:
1. Reduce aberration offset (1-2px instead of 1-4px)
2. Remove glow effect (third text-shadow)
3. Apply aberration to only 50% of letters (random selection)
4. Simplify to 2-color aberration (red/blue only)

**If effect is too subtle**:
1. Increase aberration offset (3-6px)
2. Increase color opacity (0.8-0.9 instead of 0.7)
3. Switch to duplicate elements approach for stronger effect

**If colors clash with theme**:
1. Use theme accent colors instead of pure red/cyan
2. Lower opacity for subtler effect
3. Add conditional logic for light mode color adjustment

---

## Phase 3: Cursor Detection System

### Goal
Track mouse position, calculate distance to each letter, identify "hot zone" letters.

### Implementation Strategy

**Approach A: Per-Frame Distance Calculation (Brute Force)**
- Calculate distance from cursor to all 300 letters every frame
- **Pros**: Simple, accurate
- **Cons**: 300 calculations per frame (expensive)

**Approach B: Spatial Grid Optimization (Recommended)**
- Divide viewport into grid cells (e.g., 10x10)
- Only check letters in nearby cells
- **Pros**: ~30 calculations per frame (10x faster)
- **Cons**: More complex implementation

**Approach C: Quadtree/R-Tree (Overkill)**
- Spatial indexing data structure
- **Pros**: Log(n) query time
- **Cons**: Complex, diminishing returns for 300 objects

**DECISION**: Start with **Approach A** (Brute Force), optimize to **Approach B** if needed.

### Code Implementation

**Add to ChaoticTypography component**:

```javascript
const ChaoticTypography = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hotLetters, setHotLetters] = useState(new Set());
  const rafRef = useRef(null);

  const letters = useMemo(() => generateLetters(300), []);

  // Track mouse position (similar to Cursor.jsx pattern)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate hot letters every frame
  useEffect(() => {
    const TRIGGER_RADIUS = 100; // pixels

    const updateHotLetters = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newHotLetters = new Set();

      letters.forEach((letter, i) => {
        // Convert percentage to pixels
        const letterX = containerRect.left + (letter.x / 100) * containerRect.width;
        const letterY = containerRect.top + (letter.y / 100) * containerRect.height;

        // Calculate distance
        const dx = mousePos.x - letterX;
        const dy = mousePos.y - letterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < TRIGGER_RADIUS) {
          newHotLetters.add(i);
        }
      });

      // Only update state if changed (avoid unnecessary re-renders)
      if (newHotLetters.size !== hotLetters.size ||
          ![...newHotLetters].every(id => hotLetters.has(id))) {
        setHotLetters(newHotLetters);
      }

      rafRef.current = requestAnimationFrame(updateHotLetters);
    };

    rafRef.current = requestAnimationFrame(updateHotLetters);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos, letters, hotLetters]);

  return (
    <TypographyCanvas ref={containerRef}>
      {letters.map((letter, i) => (
        <Letter
          key={i}
          data-hot={hotLetters.has(i)} // Debug attribute
          // ... rest of props
        />
      ))}
    </TypographyCanvas>
  );
};
```

### Optimization: Spatial Grid

**If brute force is too slow**:

```javascript
// Generate grid index (one-time during initialization)
const gridIndex = useMemo(() => {
  const GRID_SIZE = 10;
  const grid = Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => [])
  );

  letters.forEach((letter, i) => {
    const gridX = Math.floor((letter.x / 100) * GRID_SIZE);
    const gridY = Math.floor((letter.y / 100) * GRID_SIZE);
    grid[gridY][gridX].push({ letter, index: i });
  });

  return grid;
}, [letters]);

// Only check nearby cells
const updateHotLetters = () => {
  const containerRect = containerRef.current.getBoundingClientRect();
  const GRID_SIZE = 10;
  const TRIGGER_RADIUS = 100;

  // Convert mouse position to grid coordinates
  const mouseGridX = Math.floor(((mousePos.x - containerRect.left) / containerRect.width) * GRID_SIZE);
  const mouseGridY = Math.floor(((mousePos.y - containerRect.top) / containerRect.height) * GRID_SIZE);

  const newHotLetters = new Set();

  // Check 3x3 grid around cursor (9 cells instead of all letters)
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const checkX = mouseGridX + dx;
      const checkY = mouseGridY + dy;

      if (checkX >= 0 && checkX < GRID_SIZE && checkY >= 0 && checkY < GRID_SIZE) {
        gridIndex[checkY][checkX].forEach(({ letter, index }) => {
          // Distance calculation (same as before)
          const letterX = containerRect.left + (letter.x / 100) * containerRect.width;
          const letterY = containerRect.top + (letter.y / 100) * containerRect.height;
          const distance = Math.sqrt(
            (mousePos.x - letterX) ** 2 +
            (mousePos.y - letterY) ** 2
          );

          if (distance < TRIGGER_RADIUS) {
            newHotLetters.add(index);
          }
        });
      }
    }
  }

  setHotLetters(newHotLetters);
  rafRef.current = requestAnimationFrame(updateHotLetters);
};
```

### Verification Checklist

- [ ] **Console Logging**: Add `console.log('Hot letters:', hotLetters.size)` to verify detection
- [ ] **Visual Debug**: Add `data-hot` attribute, use browser devtools to inspect
- [ ] **Trigger Radius**: Move cursor, verify 100px detection radius (use ruler tool)
- [ ] **Update Frequency**: Check RAF is called 60 times/second (console.log frame count)
- [ ] **Edge Cases**: Test at viewport edges, corners
- [ ] **Multiple Letters**: Verify multiple letters can be hot simultaneously
- [ ] **Performance**: Check CPU usage in Performance tab
  - Target: <5% CPU for distance calculations
  - Acceptable: <10% CPU
- [ ] **Memory**: Check for memory leaks (should be flat line in Memory profiler)
- [ ] **State Updates**: Verify hotLetters Set updates only when changed (optimization)

### Performance Benchmarks

| Approach | Checks per Frame | CPU Impact | Memory |
|----------|------------------|------------|--------|
| Brute force (300) | 300 | ~3-5ms | Low |
| Grid (10x10, ~30/cell) | 30-90 | ~0.5-1ms | Low |
| Quadtree | ~10-20 | ~1-2ms | Medium |

**Measurement**:
```javascript
const startTime = performance.now();
// Run distance calculations
const endTime = performance.now();
console.log(`Distance calc time: ${endTime - startTime}ms`);
```

### Rollback Plan

**If performance < 60fps**:
1. Implement spatial grid optimization (Approach B)
2. Increase calculation throttle (every 2nd frame instead of every frame)
3. Reduce trigger radius (50px instead of 100px)
4. Only calculate for visible viewport area

**If too many/few letters detected**:
1. Adjust TRIGGER_RADIUS (50-150px range)
2. Add distance-based intensity (fade effect)
3. Limit max hot letters (e.g., closest 10 only)

**If state updates cause jank**:
1. Use useRef instead of useState for hotLetters (avoid re-renders)
2. Only re-render affected letters (React.memo + props comparison)
3. Debounce state updates (update every 3rd frame)

---

## Phase 4: Jiggle Animation

### Goal
Animate hot letters with subtle rotation and position jiggle, smooth easing when entering/leaving hot zone.

### Implementation Strategy

**Approach A: CSS Animations (Least Control)**
```css
@keyframes jiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}
animation: jiggle 0.2s infinite;
```
- **Pros**: GPU-accelerated, simple
- **Cons**: Same animation for all letters, can't vary by distance

**Approach B: Framer Motion (Recommended)**
```javascript
<motion.span
  animate={isHot ? { rotate: [0, 5, -5, 0], x: [0, 2, -2, 0] } : {}}
  transition={{ duration: 0.3, repeat: Infinity }}
/>
```
- **Pros**: Smooth transitions, spring physics, easy to control
- **Cons**: Potential re-render overhead for 300 components

**Approach C: Direct RAF Manipulation (Best Performance)**
Directly modify transform via `element.style.transform` in RAF loop
- **Pros**: Best performance, full control, no React re-renders
- **Cons**: Complex, harder to maintain, loses React benefits

**DECISION**: Start with **Approach B** (Framer Motion), optimize to **Approach C** if needed.

### Code Implementation

**Enhanced Letter Component**:
```javascript
const Letter = styled(motion.span)`
  position: absolute;
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.size}px;
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.weight};
  pointer-events: none;
  user-select: none;
  will-change: transform;
  text-shadow:
    -${props => props.aberrationOffset}px 0 ${props => props.theme.colors.chromatic.red},
    ${props => props.aberrationOffset}px 0 ${props => props.theme.colors.chromatic.cyan},
    0 0 20px ${props => props.theme.colors.shadow.glow};
`;

// In component
{letters.map((letter, i) => {
  const isHot = hotLetters.has(i);

  return (
    <Letter
      key={i}
      size={letter.size}
      weight={letter.weight}
      aberrationOffset={letter.aberrationOffset}
      style={{
        left: `${letter.x}%`,
        top: `${letter.y}%`,
        transform: `rotate(${letter.rotation}deg) scale(${letter.scale})`,
      }}
      animate={isHot ? {
        rotate: [
          letter.rotation - 5,
          letter.rotation + 5,
          letter.rotation - 5,
        ],
        x: [0, 2, -2, 0],
        y: [0, -2, 2, 0],
        scale: letter.scale * 1.1,
      } : {
        rotate: letter.rotation,
        x: 0,
        y: 0,
        scale: letter.scale,
      }}
      transition={{
        duration: 0.15,
        repeat: isHot ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {letter.char}
    </Letter>
  );
})}
```

### Animation Variations

**Option 1: Distance-Based Intensity**
Stronger jiggle for closer letters:
```javascript
const distance = calculateDistance(mousePos, letter);
const intensity = Math.max(0, 1 - distance / TRIGGER_RADIUS); // 0-1

animate={isHot ? {
  rotate: [
    letter.rotation - 5 * intensity,
    letter.rotation + 5 * intensity,
    letter.rotation - 5 * intensity,
  ],
  x: [0, 2 * intensity, -2 * intensity, 0],
  y: [0, -2 * intensity, 2 * intensity, 0],
} : {...}}
```

**Option 2: Randomized Jiggle**
Each letter jiggles differently:
```javascript
const jigglePattern = useMemo(() => ({
  rotateOffset: (Math.random() - 0.5) * 10,  // -5 to +5
  xOffset: (Math.random() - 0.5) * 4,        // -2 to +2
  yOffset: (Math.random() - 0.5) * 4,
  speed: 0.1 + Math.random() * 0.1,          // 0.1-0.2s
}), []);

animate={isHot ? {
  rotate: [
    letter.rotation + jigglePattern.rotateOffset,
    letter.rotation - jigglePattern.rotateOffset,
    letter.rotation + jigglePattern.rotateOffset,
  ],
  // ... similar for x, y
} : {...}}
transition={{ duration: jigglePattern.speed, repeat: Infinity }}
```

**Option 3: Spring Physics (Most Natural)**
```javascript
transition={{
  type: 'spring',
  stiffness: 300,
  damping: 10,
  repeat: isHot ? Infinity : 0,
}}
```

**DECISION**: Use **Option 2** (Randomized) + **Option 1** (Distance-based intensity).

### Performance Optimization: React.memo

**Prevent unnecessary re-renders**:
```javascript
const LetterComponent = React.memo(({ letter, isHot, index }) => {
  return (
    <Letter
      // ... props
    />
  );
}, (prevProps, nextProps) => {
  // Only re-render if isHot changed
  return prevProps.isHot === nextProps.isHot;
});

// In main component
{letters.map((letter, i) => (
  <LetterComponent
    key={i}
    letter={letter}
    isHot={hotLetters.has(i)}
    index={i}
  />
))}
```

### Alternative: Direct RAF Manipulation

**If Framer Motion causes re-render issues**:
```javascript
useEffect(() => {
  const letterElements = containerRef.current.querySelectorAll('[data-letter-id]');

  const animate = () => {
    const time = Date.now() * 0.001; // Convert to seconds

    hotLetters.forEach(index => {
      const el = letterElements[index];
      if (!el) return;

      const letter = letters[index];
      const jiggle = Math.sin(time * 10 + index) * 5; // Oscillate -5 to +5
      const jiggleX = Math.cos(time * 10 + index) * 2;
      const jiggleY = Math.sin(time * 8 + index) * 2;

      el.style.transform = `
        translate(calc(-50% + ${jiggleX}px), calc(-50% + ${jiggleY}px))
        rotate(${letter.rotation + jiggle}deg)
        scale(${letter.scale})
      `;
    });

    rafRef.current = requestAnimationFrame(animate);
  };

  rafRef.current = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(rafRef.current);
}, [hotLetters]);
```

### Verification Checklist

- [ ] **Jiggle Visible**: Hover cursor over letters, verify rotation/position jiggle
- [ ] **Smooth Entry**: Letters ease into jiggle (not instant snap)
- [ ] **Smooth Exit**: Letters ease back to rest state when cursor leaves
- [ ] **No Jank**: Jiggle is smooth, no stuttering
- [ ] **Variation**: Different letters jiggle differently (not synchronized)
- [ ] **Distance Intensity**: Letters closer to cursor jiggle more
- [ ] **Performance**: FPS still 60fps during jiggle
  - Check Chrome DevTools Performance tab
  - Record 5 seconds of cursor movement, analyze frame times
- [ ] **Multiple Letters**: Multiple letters can jiggle simultaneously
- [ ] **Edge Cases**: Letters at viewport edges jiggle correctly
- [ ] **No Layout Shift**: Jiggle doesn't push other letters (position: absolute)
- [ ] **Transform Origin**: Letters rotate around center, not corner

### Performance Benchmarks

| Approach | Re-renders per Frame | CPU Impact | FPS Drop |
|----------|---------------------|------------|----------|
| Framer Motion (all) | 300 | High | 20-30fps |
| Framer Motion + memo | 10-30 (hot only) | Medium | 5-10fps |
| Direct RAF | 0 | Low | 0-5fps |

**Measurement**:
```javascript
// React DevTools Profiler
import { Profiler } from 'react';

<Profiler id="Typography" onRender={(id, phase, actualDuration) => {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}}>
  {/* Component tree */}
</Profiler>
```

### Rollback Plan

**If FPS < 50fps**:
1. Switch to Direct RAF approach (Approach C)
2. Reduce jiggle frequency (0.3s duration instead of 0.15s)
3. Limit jiggle to closest 10 letters only
4. Simplify animation (rotation only, no x/y translation)

**If animation feels too chaotic**:
1. Reduce rotation range (3° instead of 5°)
2. Reduce translation range (1px instead of 2px)
3. Slow down animation (0.3s duration)
4. Synchronize some letters (group by character)

**If letters don't return to rest smoothly**:
1. Add explicit exit animation:
   ```javascript
   exit={{ rotate: letter.rotation, x: 0, y: 0, transition: { duration: 0.5 } }}
   ```
2. Use spring physics for natural easing
3. Increase transition duration (0.5s instead of 0.15s)

---

## Phase 5: Polish & Optimization

### Goal
60fps on desktop, 30fps on mobile, accessibility, touch support, cross-browser testing.

### Optimization Checklist

#### Performance Optimizations

**1. GPU Acceleration**
```javascript
const Letter = styled(motion.span)`
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
  backface-visibility: hidden; /* Prevent subpixel rendering issues */
`;
```

**2. Reduce Paint/Layout**
- Only animate `transform` and `opacity` (no width/height/color changes)
- Use `position: absolute` (remove from document flow)
- Avoid box-shadow on animated elements (pre-render or use text-shadow)

**3. Throttle Calculations**
```javascript
// Only update hot letters every 2nd frame
let frameCount = 0;
const updateHotLetters = () => {
  frameCount++;
  if (frameCount % 2 === 0) {
    calculateHotLetters();
  }
  rafRef.current = requestAnimationFrame(updateHotLetters);
};
```

**4. Virtualization (If 500+ letters)**
Only render letters in visible viewport + buffer:
```javascript
const visibleLetters = useMemo(() => {
  return letters.filter(letter => {
    return letter.x >= -10 && letter.x <= 110 &&
           letter.y >= -10 && letter.y <= 110;
  });
}, [letters]);
```

**5. Web Worker (Advanced)**
Move distance calculations to Web Worker:
```javascript
// worker.js
self.onmessage = (e) => {
  const { mousePos, letters, radius } = e.data;
  const hotIndices = [];

  letters.forEach((letter, i) => {
    const distance = Math.sqrt(
      (mousePos.x - letter.x) ** 2 +
      (mousePos.y - letter.y) ** 2
    );
    if (distance < radius) hotIndices.push(i);
  });

  self.postMessage(hotIndices);
};
```

#### Touch Support

```javascript
useEffect(() => {
  const handleTouch = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      setMousePos({ x: touch.clientX, y: touch.clientY });
    }
  };

  window.addEventListener('touchmove', handleTouch, { passive: true });
  window.addEventListener('touchstart', handleTouch, { passive: true });

  return () => {
    window.removeEventListener('touchmove', handleTouch);
    window.removeEventListener('touchstart', handleTouch);
  };
}, []);
```

#### Accessibility

**1. Reduced Motion Preference**
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<Letter
  animate={isHot && !prefersReducedMotion ? jiggleAnimation : restAnimation}
/>
```

**2. Semantic HTML**
```javascript
<TypographyCanvas role="img" aria-label="Decorative chaotic typography background">
  {letters.map((letter, i) => (
    <Letter aria-hidden="true">{letter.char}</Letter>
  ))}
</TypographyCanvas>
```

**3. Focus Indicators (If Interactive)**
Not needed since letters are `pointer-events: none`, but if interactive:
```javascript
const Letter = styled(motion.span)`
  &:focus {
    outline: 2px solid ${props => props.theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;
```

#### Mobile Optimizations

**1. Reduce Letter Count**
```javascript
const isMobile = window.innerWidth < 768;
const letterCount = isMobile ? 150 : 300;
const letters = useMemo(() => generateLetters(letterCount), [letterCount]);
```

**2. Simplify Effects on Mobile**
```javascript
const aberrationOffset = isMobile ? 1 : letter.aberrationOffset;
const jiggleIntensity = isMobile ? 0.5 : 1.0;
```

**3. Throttle More Aggressively**
```javascript
const updateInterval = isMobile ? 3 : 1; // Every 3rd frame on mobile
```

#### Cross-Browser Testing

**Test Matrix**:
- ✅ Chrome 120+ (Desktop/Mobile)
- ✅ Firefox 120+ (Desktop/Mobile)
- ✅ Safari 17+ (Desktop/iOS)
- ✅ Edge 120+ (Desktop)
- ⚠️ Samsung Internet (Mobile)

**Known Issues**:
- **Safari**: `will-change` can cause rendering bugs → test thoroughly
- **Firefox**: `mix-blend-mode: screen` behaves differently → adjust colors
- **Mobile Safari**: Touch events may not fire properly → add touch-action CSS

#### Loading State

```javascript
const [isReady, setIsReady] = useState(false);

useEffect(() => {
  // Wait for fonts to load
  document.fonts.ready.then(() => {
    setIsReady(true);
  });
}, []);

if (!isReady) {
  return <LoadingContainer>Preparing typography...</LoadingContainer>;
}
```

### Verification Checklist

- [ ] **Desktop FPS**: 60fps on Chrome/Firefox/Safari
- [ ] **Mobile FPS**: 30fps+ on iOS/Android
- [ ] **Touch Support**: Works on touch devices (test on phone/tablet)
- [ ] **Reduced Motion**: Animations disabled when `prefers-reduced-motion: reduce`
- [ ] **Screen Reader**: VoiceOver/NVDA ignores decorative letters
- [ ] **Focus Management**: No focus trap, keyboard navigation works
- [ ] **Memory Leaks**: Run for 5 minutes, check Memory tab (should be flat)
- [ ] **Event Cleanup**: All event listeners removed on unmount
- [ ] **RAF Cleanup**: All requestAnimationFrame cancelled on unmount
- [ ] **Theme Toggle**: Works correctly in dark/light mode
- [ ] **Responsive**: Adapts to viewport resize
- [ ] **Mobile**: Touch cursor tracking works, reduced letter count
- [ ] **Cross-Browser**: Tested on Chrome, Firefox, Safari, Edge
- [ ] **Loading State**: Smooth loading experience, no FOUT (Flash of Unstyled Text)

### Performance Benchmarks (Target)

| Device | Browser | Letter Count | FPS | Frame Time |
|--------|---------|--------------|-----|------------|
| Desktop | Chrome 120+ | 300 | 60fps | <16.67ms |
| Desktop | Firefox 120+ | 300 | 60fps | <16.67ms |
| Desktop | Safari 17+ | 300 | 55fps+ | <18ms |
| Mobile (High) | Safari iOS | 150 | 40fps+ | <25ms |
| Mobile (Mid) | Chrome Android | 150 | 30fps+ | <33ms |
| Mobile (Low) | Samsung Internet | 100 | 30fps | <33ms |

### Rollback Plan

**If mobile performance < 30fps**:
1. Reduce letter count to 100
2. Disable chromatic aberration on mobile
3. Disable jiggle animation on mobile (static letters only)
4. Consider canvas-based rendering

**If memory leaks detected**:
1. Audit all useEffect cleanup functions
2. Use WeakMap for letter references
3. Debounce hot letter calculations
4. Profile with Chrome DevTools Memory tab, find allocation sources

**If accessibility issues**:
1. Add skip link: "Skip decorative background"
2. Ensure focus never enters letter elements
3. Add keyboard shortcut to disable effect (e.g., Esc key)

---

## Phase 6: Portfolio Integration

### Goal
Create route, add to navigation, match theme, add page transitions.

### File Structure

```
/src
├── components/
│   ├── Playground/
│   │   ├── ChaoticTypography.jsx     # Main component
│   │   ├── LetterComponent.jsx       # Memoized letter
│   │   ├── utils/
│   │   │   ├── letterGenerator.js    # generateLetters()
│   │   │   ├── distanceCalculator.js # calculateDistance()
│   │   │   └── gridOptimizer.js      # spatial grid logic
│   │   └── index.js                  # Re-exports
│   └── ... (existing components)
├── data/
│   └── playgroundItems.jsx           # Playground project metadata
└── App.jsx                            # Add route
```

### Route Implementation

**1. Add to App.jsx**:
```javascript
// Import
const ChaoticTypography = lazy(() => import('./components/Playground/ChaoticTypography'));

// Add route
<Route
  path="/playground/typography"
  element={
    <PageWrapper>
      <ChaoticTypography />
    </PageWrapper>
  }
/>
```

**2. Add to Navbar.jsx** (Optional):
```javascript
<StyledLink to="/playground/typography">Playground</StyledLink>
```

**3. Add to projectname.jsx** (If listing in Projects):
```javascript
{
  id: 7,
  title: 'Chaotic Typography',
  category: 'Experimental',
  description: 'Cursor-reactive chromatic aberration typography experiment',
  image: '/assets/playground/typography-thumb.png',
  link: '/playground/typography',
  tags: ['WebGL', 'Interactive', 'Typography'],
}
```

### Theme Integration

**Match Portfolio Theme**:
```javascript
const TypographyCanvas = styled.div`
  background-color: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};

  /* Use theme accent colors for aberration */
  --chromatic-red: ${props => props.theme.colors.chromatic.red};
  --chromatic-cyan: ${props => props.theme.colors.chromatic.cyan};
`;
```

**Add Experimental Badge**:
```javascript
const ExperimentalBadge = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  padding: 10px 20px;
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text.tertiary};
  z-index: 1000;
`;

// In component
<ExperimentalBadge>Experimental</ExperimentalBadge>
```

### Page Transitions

**Fade in letters on mount**:
```javascript
<Letter
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: letter.scale }}
  transition={{
    delay: i * 0.001, // Stagger by 1ms (300ms total for 300 letters)
    duration: 0.5
  }}
/>
```

**Exit animation on route change**:
Already handled by PageWrapper in App.jsx.

### Meta Information

**Add Helmet for SEO** (if using react-helmet):
```javascript
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Chaotic Typography | Johnny Sheng</title>
  <meta name="description" content="Experimental cursor-reactive typography with chromatic aberration effects" />
  <meta property="og:image" content="/assets/playground/typography-og.png" />
</Helmet>
```

### Navigation Experience

**Back Button**:
```javascript
import { useNavigate } from 'react-router-dom';

const BackButton = styled.button`
  position: fixed;
  top: 40px;
  left: 40px;
  background: ${props => props.theme.colors.background.secondary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  color: ${props => props.theme.colors.text.primary};
  padding: 10px 20px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background: ${props => props.theme.colors.background.overlay};
  }
`;

const navigate = useNavigate();
<BackButton onClick={() => navigate('/projects')}>← Back</BackButton>
```

### Deployment Checklist

- [ ] **Route Added**: `/playground/typography` in App.jsx
- [ ] **Lazy Loading**: Component wrapped in `React.lazy()`
- [ ] **Suspense**: LoadingContainer fallback works
- [ ] **Theme Context**: Uses ThemeContext for dark/light mode
- [ ] **Navigation**: Link added to Navbar or Projects page
- [ ] **Page Transition**: Fade in/out works with AnimatePresence
- [ ] **Meta Tags**: Title, description, og:image set
- [ ] **Back Button**: Returns to previous page
- [ ] **Experimental Badge**: Visible and styled
- [ ] **Assets**: Thumbnail image added to `/public/assets/playground/`
- [ ] **Build Test**: `yarn build` succeeds, no errors
- [ ] **Production Test**: Deploy to staging, test live
- [ ] **Analytics**: Track page views (if using Google Analytics)

### Verification Checklist

- [ ] **Routing**: Navigate to `/playground/typography` successfully
- [ ] **Theme Toggle**: Works correctly on this page
- [ ] **Frame/Border**: Portfolio frame visible (30px border + 2.5px inner border)
- [ ] **Navbar**: Sidebar navigation visible and functional
- [ ] **Line Animations**: Line.jsx animations work (project route animation)
- [ ] **ShaderVisual**: WebGL background renders correctly
- [ ] **Cursor**: Red worm trail cursor visible and working
- [ ] **Typography Layer**: Renders above ShaderVisual, below Cursor
- [ ] **Page Transition**: Smooth fade in/out when navigating to/from page
- [ ] **Loading State**: Shows "Loading..." during code split load
- [ ] **Responsive**: Works on mobile (reduced letter count)
- [ ] **Cross-Browser**: Chrome, Firefox, Safari all work

### Rollback Plan

**If integration breaks existing pages**:
1. Remove route from App.jsx
2. Remove import (lazy load)
3. Revert any theme.js changes
4. Check git diff, revert specific commits

**If theme colors don't match**:
1. Use eyedropper tool to sample exact colors from other pages
2. Update chromatic.red/cyan in theme.js
3. Test in both dark/light modes
4. Adjust opacity if too vibrant

**If routing conflicts**:
1. Change route to `/experimental/typography`
2. Ensure no other routes match pattern
3. Check React Router devtools for route tree

---

## Implementation Timeline

### Estimated Hours per Phase

| Phase | Description | Time | Dependencies |
|-------|-------------|------|--------------|
| **Phase 1** | Static Layout | 2-3 hours | None |
| **Phase 2** | Chromatic Aberration | 1-2 hours | Phase 1 |
| **Phase 3** | Cursor Detection | 2-3 hours | Phase 1 |
| **Phase 4** | Jiggle Animation | 2-3 hours | Phase 3 |
| **Phase 5** | Polish & Optimization | 2-3 hours | Phase 4 |
| **Phase 6** | Portfolio Integration | 1-2 hours | Phase 5 |
| **Total** | | **10-16 hours** | |

### Phased Rollout Strategy

**Week 1: Core Functionality (Phases 1-3)**
- Day 1: Phase 1 (Static layout)
- Day 2: Phase 2 (Chromatic aberration)
- Day 3: Phase 3 (Cursor detection)
- **Checkpoint**: Static effect with cursor detection working

**Week 2: Animation & Polish (Phases 4-5)**
- Day 4: Phase 4 (Jiggle animation)
- Day 5: Phase 5 (Optimization, accessibility)
- **Checkpoint**: Full effect at 60fps, accessible

**Week 3: Integration (Phase 6)**
- Day 6: Phase 6 (Portfolio integration, testing)
- **Checkpoint**: Deployed to production

### Testing Checkpoints

After each phase, run this verification script:

```bash
# Automated testing checklist
echo "=== Phase Verification ==="
echo "1. Visual inspection: PASS/FAIL"
echo "2. Console errors: PASS/FAIL"
echo "3. FPS (Chrome DevTools): __fps"
echo "4. CPU usage: __%"
echo "5. Memory leaks: PASS/FAIL"
echo "6. Mobile test: PASS/FAIL"
echo "7. Theme toggle: PASS/FAIL"
```

---

## Success Metrics

### Technical Metrics

| Metric | Target | Acceptable | Fail |
|--------|--------|-----------|------|
| **Desktop FPS** | 60fps | 50fps+ | <50fps |
| **Mobile FPS** | 40fps | 30fps+ | <30fps |
| **Letter Count** | 300 | 200+ | <150 |
| **CPU Usage** | <10% | <20% | >20% |
| **Memory Growth** | 0 MB/min | <5 MB/min | >10 MB/min |
| **Load Time** | <1s | <2s | >3s |

### User Experience Metrics

- ✅ **Visual Impact**: Effect is noticeable and impressive
- ✅ **Interactivity**: Cursor reaction is immediate and smooth
- ✅ **Accessibility**: Works with screen readers, respects reduced motion
- ✅ **Mobile UX**: Touch tracking works, performance acceptable
- ✅ **Theme Integration**: Looks native to portfolio design

### Development Quality Metrics

- ✅ **Code Quality**: ESLint passes, no warnings
- ✅ **Documentation**: Inline comments, README updated
- ✅ **Maintainability**: Modular structure, easy to modify
- ✅ **Reusability**: Can adapt for other experimental pages
- ✅ **Bundle Size**: Code splitting keeps main bundle small

---

## Troubleshooting Guide

### Common Issues

#### Issue: FPS Drops Below 50fps

**Symptoms**: Stuttering, jank during cursor movement

**Diagnosis**:
```javascript
// Check frame times in Performance tab
// Look for long tasks (>50ms) or excessive layout/paint
```

**Solutions**:
1. Reduce letter count (300 → 200 → 150)
2. Implement spatial grid optimization (Phase 3)
3. Switch to Direct RAF animation (Phase 4)
4. Disable chromatic aberration (Phase 2)
5. Use canvas-based rendering

#### Issue: Letters Not Detecting Cursor

**Symptoms**: No jiggle when cursor hovers

**Diagnosis**:
```javascript
console.log('Mouse pos:', mousePos);
console.log('Hot letters:', hotLetters.size);
console.log('Container rect:', containerRef.current.getBoundingClientRect());
```

**Solutions**:
1. Check `containerRef.current` is not null
2. Verify mouse position is in viewport coordinates
3. Increase TRIGGER_RADIUS (100px → 150px)
4. Check letter position calculation (% to pixels conversion)

#### Issue: Memory Leak

**Symptoms**: Memory usage grows over time, page slows down

**Diagnosis**:
```javascript
// Chrome DevTools > Memory > Take Heap Snapshot
// Look for detached DOM nodes or growing arrays
```

**Solutions**:
1. Audit all `useEffect` cleanup functions
2. Cancel all `requestAnimationFrame` calls
3. Remove event listeners on unmount
4. Use WeakMap/WeakSet for letter references

#### Issue: Theme Colors Don't Match

**Symptoms**: Colors too vibrant or wrong hue

**Diagnosis**:
```javascript
// Use DevTools eyedropper to sample existing colors
console.log(theme.colors.chromatic.red);
```

**Solutions**:
1. Adjust opacity (0.7 → 0.5)
2. Match exact RGB values from other components
3. Test in both dark/light modes
4. Use color picker to sample from reference design

#### Issue: Mobile Performance Poor

**Symptoms**: <30fps on mobile, jank, lag

**Solutions**:
1. Reduce letter count (150 → 100 → 50)
2. Disable chromatic aberration on mobile
3. Disable jiggle animation on mobile
4. Increase throttle interval (every frame → every 3rd frame)
5. Use `passive: true` on touch event listeners

---

## Future Enhancements (Post-Launch)

### Phase 7 Ideas

1. **WebGL Rendering** (Performance)
   - Port to Three.js instanced rendering
   - Target: 1000+ letters at 60fps
   - Particle system approach

2. **Word Mode** (Readability)
   - Instead of random letters, display actual words
   - Chaotic layout of meaningful text (portfolio description, skills, etc.)
   - Word-level jiggle instead of letter-level

3. **Color Palette Variations** (Visual Variety)
   - Different chromatic aberration color schemes
   - RGB (current), CMY (cyan/magenta/yellow), RYB (red/yellow/blue)
   - Route-reactive colors (match ShaderVisual personalities)

4. **Physics-Based Animation** (Natural Feel)
   - Spring physics for letter jiggle
   - Gravity effect (letters fall when page loads, settle into position)
   - Repulsion force (letters push away from cursor)

5. **Sound Reactivity** (Audio-Visual)
   - Integrate Web Audio API
   - Letters jiggle to music beat
   - Amplitude-based chromatic aberration intensity

6. **Click Interactions** (Engagement)
   - Click letter to explode/scatter
   - Click and drag to "push" letters
   - Double-click to randomize layout

7. **Customization UI** (User Control)
   - Slider for letter count (100-500)
   - Color picker for chromatic aberration
   - Toggle for jiggle animation
   - Export as image/video

8. **Multiple Layouts** (Variety)
   - Switch between: Random, Grid, Circle, Wave, Spiral
   - Animated transitions between layouts
   - Preset buttons for each layout

---

## Appendix

### A. Code Templates

#### Full Component Template

See `/src/components/Playground/ChaoticTypography.jsx` (to be created)

#### Utility Functions

**letterGenerator.js**:
```javascript
export function generateLetters(count, options = {}) {
  const {
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    minSize = 20,
    maxSize = 60,
    rotationRange = 15,
    scaleRange = [0.8, 1.2],
    weights = [300, 700],
  } = options;

  const letters = [];
  for (let i = 0; i < count; i++) {
    letters.push({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * rotationRange * 2,
      scale: scaleRange[0] + Math.random() * (scaleRange[1] - scaleRange[0]),
      size: minSize + Math.random() * (maxSize - minSize),
      weight: weights[Math.floor(Math.random() * weights.length)],
      aberrationOffset: 1 + Math.random() * 3,
    });
  }
  return letters;
}
```

**distanceCalculator.js**:
```javascript
export function calculateDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function findLettersInRadius(mousePos, letters, containerRect, radius) {
  const hotIndices = [];

  letters.forEach((letter, i) => {
    const letterX = containerRect.left + (letter.x / 100) * containerRect.width;
    const letterY = containerRect.top + (letter.y / 100) * containerRect.height;

    const distance = calculateDistance(mousePos, { x: letterX, y: letterY });

    if (distance < radius) {
      hotIndices.push({ index: i, distance, intensity: 1 - distance / radius });
    }
  });

  return hotIndices;
}
```

### B. Performance Testing Script

```javascript
// Add to component for performance monitoring
const usePerformanceMonitor = () => {
  const framesRef = useRef([]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const measureFrame = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      framesRef.current.push(delta);

      // Keep last 60 frames
      if (framesRef.current.length > 60) {
        framesRef.current.shift();
      }

      lastTimeRef.current = now;
      requestAnimationFrame(measureFrame);
    };

    const rafId = requestAnimationFrame(measureFrame);

    // Log stats every 5 seconds
    const intervalId = setInterval(() => {
      const avgFrameTime = framesRef.current.reduce((a, b) => a + b, 0) / framesRef.current.length;
      const avgFps = 1000 / avgFrameTime;
      const minFrameTime = Math.min(...framesRef.current);
      const maxFrameTime = Math.max(...framesRef.current);

      console.log(`Performance Stats:
        Avg FPS: ${avgFps.toFixed(1)}
        Avg Frame Time: ${avgFrameTime.toFixed(2)}ms
        Min Frame Time: ${minFrameTime.toFixed(2)}ms
        Max Frame Time: ${maxFrameTime.toFixed(2)}ms
      `);
    }, 5000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
    };
  }, []);
};

// Usage in component
usePerformanceMonitor();
```

### C. Browser Compatibility Matrix

| Feature | Chrome 120+ | Firefox 120+ | Safari 17+ | Edge 120+ |
|---------|------------|-------------|-----------|----------|
| CSS text-shadow | ✅ | ✅ | ✅ | ✅ |
| CSS mix-blend-mode | ✅ | ✅ | ⚠️ Different | ✅ |
| will-change | ✅ | ✅ | ⚠️ Buggy | ✅ |
| requestAnimationFrame | ✅ | ✅ | ✅ | ✅ |
| Touch events | ✅ | ✅ | ✅ | ✅ |
| Framer Motion | ✅ | ✅ | ✅ | ✅ |
| prefers-reduced-motion | ✅ | ✅ | ✅ | ✅ |

### D. Related Documentation

- **[Cursor.jsx Pattern](/src/Cursor.jsx)** - Mouse tracking, RAF loops, easing
- **[ShaderVisual.jsx](/src/components/ShaderVisual.jsx)** - WebGL rendering, uniforms, cleanup
- **[Line.jsx](/src/components/Line.jsx)** - Route-reactive animations, transform patterns
- **[theme.js](/src/theme.js)** - Design tokens, color system, theme switching
- **[COMPONENTS.md](/docs/architecture/COMPONENTS.md)** - Component architecture, patterns

### E. Git Workflow

**Branch Naming**:
```bash
git checkout -b claude/feature-chaotic-typography
```

**Commit Messages**:
```bash
# Phase 1
git commit -m "feat: add static chaotic typography layout (Phase 1)"

# Phase 2
git commit -m "feat: add chromatic aberration effect (Phase 2)"

# Phase 3
git commit -m "feat: implement cursor detection system (Phase 3)"

# Phase 4
git commit -m "feat: add jiggle animation on cursor proximity (Phase 4)"

# Phase 5
git commit -m "perf: optimize animations, add accessibility (Phase 5)"

# Phase 6
git commit -m "feat: integrate typography page into portfolio (Phase 6)"
```

**Pull Request Template**:
```markdown
## Chaotic Typography Feature

### Summary
Adds experimental cursor-reactive typography page with chromatic aberration effects.

### Changes
- [x] Phase 1: Static chaotic layout (300 letters)
- [x] Phase 2: RGB chromatic aberration via CSS text-shadow
- [x] Phase 3: Cursor proximity detection with spatial grid optimization
- [x] Phase 4: Framer Motion jiggle animation
- [x] Phase 5: Performance optimization (60fps desktop, 30fps mobile)
- [x] Phase 6: Portfolio integration (/playground/typography route)

### Performance
- Desktop: 60fps (300 letters)
- Mobile: 35fps (150 letters)
- Bundle size impact: +25KB (code split)

### Testing
- ✅ Chrome 120 (Desktop/Mobile)
- ✅ Firefox 120 (Desktop)
- ✅ Safari 17 (iOS)
- ✅ Accessibility (screen reader, reduced motion)

### Screenshots
[Add screenshots/video of effect]

### Related Issues
Closes #[issue number if applicable]
```

---

## Document Metadata

**Version**: 1.0
**Created**: 2025-11-24
**Author**: Claude Code
**Status**: Planning Phase
**Estimated Completion**: 2-3 weeks (10-16 hours)
**Dependencies**: React 18.2, Styled-Components 6.1, Framer Motion 11.15

**Next Steps**:
1. Review this plan with stakeholder
2. Create feature branch: `claude/feature-chaotic-typography`
3. Begin Phase 1 implementation
4. Set up performance monitoring
5. Iterate based on testing results

---

**Document Length**: ~1,850 lines
**Token Estimate**: ~18,000 tokens
**Repository**: [portfolioyush](https://github.com/Jshengdev/portfolioyush)
