# V6 Experiment: Red Ribbon Cursor

**Agent Pattern**: 4 Engineers + 2 Researchers + 1 QA
**Time Estimate**: 4-6 hours total
**Status**: Ready to Start
**Dependencies**: None (standalone feature)

---

## Objective

Replace the current custom cursor (`Cursor.jsx`) with a physics-based red ribbon that follows the mouse with realistic string-like behavior, creating the foundation for the "Red String of Fate" concept.

---

## Design Concept

### Visual Design

```
                    ╭─ Current cursor position (red dot, 8px)
                    │
        ~~~~~~~~~~~~╯ ← Ribbon trail (5-10 segments)
       ↙               ← Each segment follows the previous
      Trail fades and narrows toward tail
```

### Behavior

| State | Ribbon Behavior |
|-------|-----------------|
| **Idle** | Gentle sway, gravity pulls slightly down |
| **Moving Slow** | Smooth following, maintains shape |
| **Moving Fast** | Stretches, segments spread out |
| **Stopping** | Bounces/settles with damping |
| **Hovering Link** | Subtle glow intensifies |

### Color Palette

```css
/* Primary */
--string-color: rgba(255, 128, 128, 0.8);     /* Soft red */
--string-glow: rgba(255, 100, 100, 0.4);      /* Outer glow */
--string-core: rgba(255, 200, 200, 1.0);      /* Inner highlight */

/* Light Mode Adaptation */
--string-color-light: rgba(200, 50, 50, 0.7); /* Darker for contrast */
```

---

## Technical Architecture

### Physics Engine (Verlet Integration)

```javascript
// Particle chain representing string segments
class StringParticle {
  constructor(x, y) {
    this.pos = { x, y };
    this.oldPos = { x, y };
    this.pinned = false; // First particle is pinned to cursor
  }

  update(gravity = 0.3, damping = 0.99) {
    if (this.pinned) return;

    const vx = (this.pos.x - this.oldPos.x) * damping;
    const vy = (this.pos.y - this.oldPos.y) * damping;

    this.oldPos = { ...this.pos };
    this.pos.x += vx;
    this.pos.y += vy + gravity;
  }
}

// Constraint to maintain string length between particles
function constrain(p1, p2, distance) {
  const dx = p2.pos.x - p1.pos.x;
  const dy = p2.pos.y - p1.pos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const diff = (distance - dist) / dist / 2;

  if (!p1.pinned) {
    p1.pos.x -= dx * diff;
    p1.pos.y -= dy * diff;
  }
  if (!p2.pinned) {
    p2.pos.x += dx * diff;
    p2.pos.y += dy * diff;
  }
}
```

### Component Structure

```
src/components/
├── StringCursor/
│   ├── StringCursor.jsx       # Main React component
│   ├── StringPhysics.js       # Verlet physics engine
│   ├── StringRenderer.js      # Canvas rendering
│   ├── useStringState.js      # React hooks for state
│   └── stringConfig.js        # Configuration constants
```

### Configuration

```javascript
// stringConfig.js
export const STRING_CONFIG = {
  // Physics
  SEGMENT_COUNT: 10,
  SEGMENT_LENGTH: 15,
  GRAVITY: 0.3,
  DAMPING: 0.97,
  CONSTRAINT_ITERATIONS: 3,

  // Rendering
  HEAD_SIZE: 8,
  TAIL_SIZE: 2,
  COLOR: 'rgba(255, 128, 128, 0.8)',
  GLOW_BLUR: 8,

  // Performance
  UPDATE_RATE: 60, // fps
  MOBILE_SEGMENT_COUNT: 5,

  // Accessibility
  REDUCED_MOTION: {
    SEGMENT_COUNT: 3,
    GRAVITY: 0,
    DAMPING: 0.5
  }
};
```

---

## Implementation Plan

### Engineer 1: Physics Engine (60 min)

**Objective**: Create Verlet integration physics system

**Deliverables**:
- [ ] `StringPhysics.js` with particle class
- [ ] Constraint solver for string segments
- [ ] Gravity and damping parameters
- [ ] Boundary detection (keep string on screen)

**Key Code**:
```javascript
// StringPhysics.js
export class StringSystem {
  constructor(particleCount, segmentLength) {
    this.particles = [];
    this.segmentLength = segmentLength;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new StringParticle(0, 0));
    }
    this.particles[0].pinned = true; // Head follows cursor
  }

  update(cursorX, cursorY) {
    // Move head to cursor
    this.particles[0].pos.x = cursorX;
    this.particles[0].pos.y = cursorY;

    // Update all particles
    this.particles.forEach(p => p.update());

    // Apply constraints multiple times for stability
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.particles.length - 1; j++) {
        constrain(this.particles[j], this.particles[j + 1], this.segmentLength);
      }
    }
  }

  getPositions() {
    return this.particles.map(p => ({ x: p.pos.x, y: p.pos.y }));
  }
}
```

---

### Engineer 2: Canvas Renderer (60 min)

**Objective**: Render string with glow and smooth curves

**Deliverables**:
- [ ] `StringRenderer.js` with canvas drawing
- [ ] Smooth bezier curves through particles
- [ ] Gradient color from head to tail
- [ ] Glow effect using shadow

**Key Code**:
```javascript
// StringRenderer.js
export class StringRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
  }

  render(positions, config) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (positions.length < 2) return;

    // Draw glow layer first
    ctx.save();
    ctx.shadowColor = config.COLOR;
    ctx.shadowBlur = config.GLOW_BLUR;
    this.drawCurve(positions, config);
    ctx.restore();

    // Draw solid string
    this.drawCurve(positions, config);

    // Draw head (cursor point)
    this.drawHead(positions[0], config);
  }

  drawCurve(positions, config) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);

    // Smooth curve through all points
    for (let i = 1; i < positions.length - 1; i++) {
      const xc = (positions[i].x + positions[i + 1].x) / 2;
      const yc = (positions[i].y + positions[i + 1].y) / 2;
      ctx.quadraticCurveTo(positions[i].x, positions[i].y, xc, yc);
    }

    // Gradient from head to tail
    const gradient = ctx.createLinearGradient(
      positions[0].x, positions[0].y,
      positions[positions.length - 1].x, positions[positions.length - 1].y
    );
    gradient.addColorStop(0, config.COLOR);
    gradient.addColorStop(1, 'rgba(255, 128, 128, 0.1)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = config.HEAD_SIZE;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  drawHead(position, config) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(position.x, position.y, config.HEAD_SIZE / 2, 0, Math.PI * 2);
    ctx.fillStyle = config.COLOR;
    ctx.fill();
  }
}
```

---

### Engineer 3: React Integration (60 min)

**Objective**: Create React component with proper lifecycle

**Deliverables**:
- [ ] `StringCursor.jsx` component
- [ ] Mouse event handling
- [ ] RequestAnimationFrame loop
- [ ] Cleanup on unmount
- [ ] Integration with existing Cursor.jsx events

**Key Code**:
```jsx
// StringCursor.jsx
import React, { useRef, useEffect, useState } from 'react';
import { StringSystem } from './StringPhysics';
import { StringRenderer } from './StringRenderer';
import { STRING_CONFIG } from './stringConfig';

const StringCursor = () => {
  const canvasRef = useRef(null);
  const systemRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    systemRef.current = new StringSystem(
      STRING_CONFIG.SEGMENT_COUNT,
      STRING_CONFIG.SEGMENT_LENGTH
    );
    rendererRef.current = new StringRenderer(canvas);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      systemRef.current.update(mouseRef.current.x, mouseRef.current.y);
      rendererRef.current.render(
        systemRef.current.getPositions(),
        STRING_CONFIG
      );
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default StringCursor;
```

---

### Engineer 4: Theme & Accessibility (60 min)

**Objective**: Theme integration and reduced motion support

**Deliverables**:
- [ ] Light/dark mode color adaptation
- [ ] `prefers-reduced-motion` support
- [ ] Mobile touch support (optional for v6)
- [ ] Performance optimizations

**Key Code**:
```javascript
// useStringState.js
import { useContext, useMemo } from 'react';
import { ThemeContext } from '../../theme';
import { STRING_CONFIG } from './stringConfig';

export function useStringConfig() {
  const theme = useContext(ThemeContext);
  const prefersReducedMotion = useMemo(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  []);

  return useMemo(() => {
    let config = { ...STRING_CONFIG };

    // Theme adaptation
    if (theme.mode === 'light') {
      config.COLOR = 'rgba(200, 50, 50, 0.7)';
    }

    // Reduced motion
    if (prefersReducedMotion) {
      config = {
        ...config,
        ...STRING_CONFIG.REDUCED_MOTION
      };
    }

    return config;
  }, [theme.mode, prefersReducedMotion]);
}
```

---

### Researcher 1: Performance Analysis (45 min)

**Objective**: Verify 60fps performance

**Tasks**:
- [ ] FPS benchmarking across browsers
- [ ] Memory profiling (no leaks)
- [ ] CPU usage analysis
- [ ] Mobile device testing
- [ ] Compare vs. original Cursor.jsx

**Metrics**:
| Device | Target FPS | CPU Target |
|--------|------------|------------|
| Desktop (Chrome) | 60 | < 5% |
| Desktop (Safari) | 60 | < 5% |
| Desktop (Firefox) | 60 | < 7% |
| Mobile (iOS Safari) | 30 | < 10% |
| Mobile (Chrome) | 30 | < 10% |

---

### Researcher 2: Documentation (30 min)

**Objective**: Update documentation

**Tasks**:
- [ ] Update CLAUDE.md with StringCursor section
- [ ] Add usage examples
- [ ] Document configuration options
- [ ] Add to component architecture diagram
- [ ] Create troubleshooting section

---

### QA: Final Verification (45 min)

**Objective**: Comprehensive testing

**Checklist**:
- [ ] String follows cursor smoothly
- [ ] Physics feel natural (gravity, bounce)
- [ ] Glow effect renders correctly
- [ ] No visual artifacts on fast movement
- [ ] Works in dark mode
- [ ] Works in light mode
- [ ] Reduced motion respected
- [ ] No console errors
- [ ] No memory leaks (5 min test)
- [ ] Click events still work (through canvas)
- [ ] Works on mobile (basic functionality)
- [ ] Build succeeds
- [ ] Deploy preview works

---

## Acceptance Criteria

### Must Have
- [ ] Red string follows cursor with physics
- [ ] Smooth 60fps on desktop
- [ ] Glow effect visible
- [ ] No interference with click events
- [ ] Dark/light theme support

### Should Have
- [ ] Reduced motion support
- [ ] Natural settling animation when stopped
- [ ] Gradient fade toward tail

### Nice to Have
- [ ] Sound effect on fast movement (future)
- [ ] Particle sparks at head (future)
- [ ] 3D depth integration (v8)

---

## Files to Create

```
src/components/StringCursor/
├── StringCursor.jsx
├── StringPhysics.js
├── StringRenderer.js
├── useStringState.js
├── stringConfig.js
└── index.js
```

## Files to Modify

```
src/App.jsx          → Import StringCursor, position after Cursor or replace
src/Cursor.jsx       → Keep for click events, or merge functionality
```

---

## Rollback Plan

If issues arise:
1. Comment out `<StringCursor />` in App.jsx
2. Ensure original `<Cursor />` is still functional
3. Debug in isolation with StringCursor test page

---

## Success Metrics

| Metric | Target | Verification |
|--------|--------|--------------|
| FPS | 60 | Chrome DevTools |
| Bundle Impact | < 5KB | Build stats |
| CPU Usage | < 5% | Performance profiler |
| User Perception | "Feels alive" | Manual testing |
| Accessibility | Works without | Feature detection |

---

## References

- [Verlet Physics Rope](https://github.com/guerrillacontra/html5-es6-physics-rope)
- [Codrops Custom Cursors](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/)
- [Elastic Cursor CodePen](https://codepen.io/gusevdigital/pen/MWxyXRa)

---

**Ready to Start**: Run `/engineer` with this document
