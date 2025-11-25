# V7 Experiment: Navigation String

**Agent Pattern**: 4 Engineers + 2 Researchers + 1 QA
**Time Estimate**: 5-7 hours total
**Status**: Waiting (Depends on V6)
**Dependencies**: V6 Red Ribbon Cursor must be complete

---

## Objective

Extend the V6 string cursor to create visual connections between the cursor and navigation items, making the "Red String of Fate" metaphor literal - the string connects you to your destinations.

---

## Design Concept

### Visual Design

```
                                           ╭─ ABOUT (nav item)
                                          ╱
     Cursor (head) ─────────────────────╮╱
          │                              ╲
          │ Physics string               ╲╮
          │ from V6                        ╲─ PROJECTS (nav item, hovered)
          ↓                                   ← Brighter connection on hover

     ╰──────────────────────────────────────╮
                                             ╲
                                              ╲─ CONTACT (nav item)
```

### Connection Types

| Type | Appearance | When |
|------|------------|------|
| **Ambient** | Faint, thin lines to all nav items | Always visible |
| **Active** | Bright, thicker line to current page | Current route |
| **Hover** | Pulsing, glowing line | Hovering nav item |
| **Pull** | Stretching, elastic line | Dragging toward item |

### Behavior States

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   AMBIENT   │────→│   HOVER     │────→│  NAVIGATE   │
│  (passive)  │     │  (active)   │     │  (action)   │
└─────────────┘     └─────────────┘     └─────────────┘
     ↑                                        │
     └────────────────────────────────────────┘
```

---

## Technical Architecture

### Connection System

```javascript
// NavigationString.js
class NavigationConnection {
  constructor(targetElement) {
    this.target = targetElement;
    this.active = false;
    this.hovering = false;

    // Bezier control points
    this.startPoint = { x: 0, y: 0 };
    this.endPoint = this.getTargetCenter();
    this.controlPoint = this.calculateControl();
  }

  getTargetCenter() {
    const rect = this.target.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  calculateControl() {
    // Control point creates natural curve
    // Positioned below the line for "hanging string" effect
    const mid = {
      x: (this.startPoint.x + this.endPoint.x) / 2,
      y: Math.max(this.startPoint.y, this.endPoint.y) + 50
    };
    return mid;
  }

  update(cursorPos) {
    this.startPoint = cursorPos;
    this.endPoint = this.getTargetCenter();
    this.controlPoint = this.calculateControl();
  }
}
```

### Magnetic Pull Effect

```javascript
// MagneticPull.js
export function calculateMagneticPull(cursorPos, targets, pullRadius = 100) {
  let totalPull = { x: 0, y: 0 };

  targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    const dx = center.x - cursorPos.x;
    const dy = center.y - cursorPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < pullRadius) {
      const strength = 1 - (distance / pullRadius);
      totalPull.x += dx * strength * 0.1;
      totalPull.y += dy * strength * 0.1;
    }
  });

  return totalPull;
}
```

### Component Structure

```
src/components/
├── StringCursor/              # From V6
│   └── ...
├── NavigationString/
│   ├── NavigationString.jsx   # Main component
│   ├── ConnectionRenderer.js  # SVG/Canvas rendering
│   ├── useMagneticPull.js     # Magnetic cursor hook
│   ├── useNavConnections.js   # Connection state management
│   └── index.js
```

---

## Implementation Plan

### Engineer 1: Connection System (60 min)

**Objective**: Create connection manager for nav items

**Deliverables**:
- [ ] `NavigationConnection` class
- [ ] Bezier curve calculation
- [ ] Dynamic control point (gravity sag)
- [ ] Target position tracking

**Key Code**:
```javascript
// useNavConnections.js
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavConnections(navRefs) {
  const location = useLocation();
  const [connections, setConnections] = useState([]);
  const [activeConnection, setActiveConnection] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);

  useEffect(() => {
    // Initialize connections to all nav items
    const conns = navRefs.map(ref => new NavigationConnection(ref.current));
    setConnections(conns);

    // Set active based on current route
    const currentIndex = navRefs.findIndex(ref =>
      ref.current?.href?.includes(location.pathname)
    );
    if (currentIndex >= 0) {
      setActiveConnection(conns[currentIndex]);
    }
  }, [navRefs, location.pathname]);

  const handleNavHover = useCallback((index) => {
    setHoveredConnection(connections[index]);
  }, [connections]);

  const handleNavLeave = useCallback(() => {
    setHoveredConnection(null);
  }, []);

  return {
    connections,
    activeConnection,
    hoveredConnection,
    handleNavHover,
    handleNavLeave
  };
}
```

---

### Engineer 2: Connection Renderer (75 min)

**Objective**: Render bezier curves with visual states

**Deliverables**:
- [ ] SVG path generation for curves
- [ ] Gradient along path (head to tail fade)
- [ ] Glow effect on hover
- [ ] Pulse animation for active
- [ ] Line thickness variation

**Key Code**:
```jsx
// ConnectionRenderer.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 0.5; stroke-width: 1; }
  50% { opacity: 1; stroke-width: 2; }
`;

const ConnectionPath = styled.path`
  fill: none;
  stroke: ${props => props.$color};
  stroke-width: ${props => props.$thickness};
  stroke-linecap: round;
  opacity: ${props => props.$opacity};
  filter: ${props => props.$glow ? 'url(#glow)' : 'none'};
  animation: ${props => props.$active ? pulse : 'none'} 2s ease-in-out infinite;
  transition: stroke-width 0.3s, opacity 0.3s;
`;

const GlowFilter = () => (
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

export const ConnectionRenderer = ({
  connections,
  activeConnection,
  hoveredConnection,
  cursorPos
}) => {
  const generatePath = (connection) => {
    const { startPoint, controlPoint, endPoint } = connection;
    return `M ${startPoint.x} ${startPoint.y}
            Q ${controlPoint.x} ${controlPoint.y}
              ${endPoint.x} ${endPoint.y}`;
  };

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998
      }}
    >
      <GlowFilter />

      {/* Ambient connections */}
      {connections.map((conn, i) => (
        <ConnectionPath
          key={i}
          d={generatePath(conn)}
          $color="rgba(255, 128, 128, 0.2)"
          $thickness={1}
          $opacity={0.3}
          $glow={false}
          $active={false}
        />
      ))}

      {/* Active connection */}
      {activeConnection && (
        <ConnectionPath
          d={generatePath(activeConnection)}
          $color="rgba(255, 128, 128, 0.8)"
          $thickness={2}
          $opacity={0.8}
          $glow={true}
          $active={true}
        />
      )}

      {/* Hovered connection */}
      {hoveredConnection && (
        <ConnectionPath
          d={generatePath(hoveredConnection)}
          $color="rgba(255, 100, 100, 1)"
          $thickness={3}
          $opacity={1}
          $glow={true}
          $active={false}
        />
      )}
    </svg>
  );
};
```

---

### Engineer 3: Magnetic Pull Integration (60 min)

**Objective**: String cursor head is pulled toward nav items

**Deliverables**:
- [ ] `useMagneticPull` hook
- [ ] Integration with V6 StringPhysics
- [ ] Pull strength based on distance
- [ ] Smooth blending with normal movement

**Key Code**:
```javascript
// useMagneticPull.js
import { useMemo, useCallback } from 'react';

export function useMagneticPull(navRefs, options = {}) {
  const {
    pullRadius = 150,
    pullStrength = 0.15,
    enabled = true
  } = options;

  const calculatePull = useCallback((cursorPos) => {
    if (!enabled) return { x: 0, y: 0 };

    let pull = { x: 0, y: 0 };
    let closestDist = Infinity;

    navRefs.forEach(ref => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      const dx = center.x - cursorPos.x;
      const dy = center.y - cursorPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < pullRadius && dist < closestDist) {
        closestDist = dist;
        const strength = (1 - dist / pullRadius) * pullStrength;
        pull.x = dx * strength;
        pull.y = dy * strength;
      }
    });

    return pull;
  }, [navRefs, pullRadius, pullStrength, enabled]);

  return { calculatePull };
}
```

---

### Engineer 4: Navbar Integration (60 min)

**Objective**: Connect system to existing Navbar.jsx

**Deliverables**:
- [ ] Add refs to nav items in Navbar.jsx
- [ ] Pass refs to NavigationString
- [ ] Hover event handlers
- [ ] Route change animation (string "snaps" to new target)

**Key Changes to Navbar.jsx**:
```jsx
// Navbar.jsx modifications
import { forwardRef, useRef, useImperativeHandle } from 'react';

const NavItem = forwardRef(({ to, children, onHover, onLeave }, ref) => (
  <NavLink
    ref={ref}
    to={to}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    {children}
  </NavLink>
));

const Navbar = ({ onNavRefsReady }) => {
  const homeRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const archiveRef = useRef();
  const contactRef = useRef();

  useEffect(() => {
    onNavRefsReady?.([
      homeRef, aboutRef, projectsRef, archiveRef, contactRef
    ]);
  }, [onNavRefsReady]);

  return (
    <Nav>
      <NavItem ref={homeRef} to="/">Home</NavItem>
      <NavItem ref={aboutRef} to="/about">About</NavItem>
      <NavItem ref={projectsRef} to="/projects">Projects</NavItem>
      <NavItem ref={archiveRef} to="/archive">Archive</NavItem>
      <NavItem ref={contactRef} to="/contact">Contact</NavItem>
    </Nav>
  );
};
```

---

### Researcher 1: Performance Analysis (45 min)

**Objective**: Verify no performance regression from V6

**Tasks**:
- [ ] FPS with 5 simultaneous connections
- [ ] SVG vs Canvas rendering comparison
- [ ] Bezier calculation overhead
- [ ] Memory with dynamic connections
- [ ] Mobile: disable ambient connections?

**Performance Budget**:
| Addition | Target Impact |
|----------|--------------|
| SVG Connections | < 1ms render time |
| Bezier Calculation | < 0.5ms per connection |
| Total FPS Impact | < 5 FPS drop from V6 |

---

### Researcher 2: Documentation (30 min)

**Objective**: Document navigation string system

**Tasks**:
- [ ] Update CLAUDE.md with Navigation String section
- [ ] Add connection type documentation
- [ ] Configuration options reference
- [ ] Integration guide with Navbar
- [ ] Visual diagrams of connection states

---

### QA: Final Verification (60 min)

**Objective**: End-to-end testing of string + navigation

**Checklist**:
- [ ] Ambient connections visible to all nav items
- [ ] Active connection highlights current page
- [ ] Hover brightens connection
- [ ] Route change transitions smoothly
- [ ] Magnetic pull feels natural (not too strong)
- [ ] String from V6 integrates seamlessly
- [ ] No z-index issues (connections behind content)
- [ ] Works with keyboard navigation (focus states)
- [ ] Light/dark mode adaptation
- [ ] Mobile: connections hidden or simplified
- [ ] No blocking of click events
- [ ] Console clean
- [ ] Build succeeds

---

## Acceptance Criteria

### Must Have
- [ ] Visual connections to all navigation items
- [ ] Current page connection is highlighted
- [ ] Hover state brightens connection
- [ ] Smooth 60fps maintained

### Should Have
- [ ] Magnetic pull on cursor near nav items
- [ ] Gravity sag on connection curves
- [ ] Pulse animation on active connection
- [ ] Route change animation

### Nice to Have
- [ ] Particle effects along connections (v8)
- [ ] Sound on connection "snap" (future)
- [ ] Project cards get connections too (v8)

---

## Files to Create

```
src/components/NavigationString/
├── NavigationString.jsx
├── ConnectionRenderer.js
├── useMagneticPull.js
├── useNavConnections.js
├── connectionConfig.js
└── index.js
```

## Files to Modify

```
src/components/Navbar.jsx     → Add refs, hover handlers
src/App.jsx                   → Import NavigationString, pass nav refs
```

---

## Integration with V6

```jsx
// App.jsx
import StringCursor from './components/StringCursor';
import NavigationString from './components/NavigationString';

function App() {
  const [navRefs, setNavRefs] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      {/* V6 - String cursor */}
      <StringCursor onPositionChange={setCursorPos} />

      {/* V7 - Navigation connections */}
      <NavigationString
        navRefs={navRefs}
        cursorPos={cursorPos}
      />

      {/* Navbar with refs */}
      <Navbar onNavRefsReady={setNavRefs} />

      {/* Rest of app */}
    </>
  );
}
```

---

## Visual Reference

### Connection States

```
AMBIENT (all items, always visible)
├─ Color: rgba(255, 128, 128, 0.2)
├─ Thickness: 1px
├─ Glow: none
└─ Animation: none

ACTIVE (current page)
├─ Color: rgba(255, 128, 128, 0.8)
├─ Thickness: 2px
├─ Glow: yes (blur 3px)
└─ Animation: pulse (2s cycle)

HOVER (hovered item)
├─ Color: rgba(255, 100, 100, 1.0)
├─ Thickness: 3px
├─ Glow: yes (blur 5px)
└─ Animation: none (instant bright)
```

---

## Success Metrics

| Metric | Target | Verification |
|--------|--------|--------------|
| FPS | 60 | Chrome DevTools |
| Connection Render | < 2ms | Performance profiler |
| Visual Clarity | Connections don't clutter | User testing |
| Magnetic Feel | Subtle, not jarring | Manual testing |
| A11y | Keyboard navigation works | Tab through nav |

---

## References

- [Connecting Dots Particles](https://codepen.io/rawnix/pen/YRYpqg)
- [SVG Path Drawing](https://css-tricks.com/svg-line-animation-works/)
- [Magnetic Cursor](https://codepen.io/nikhil-ladhani-nl/pen/bGpWmXd)
- [Leader Line Library](https://anseki.github.io/leader-line/)

---

**Ready to Start**: After V6 is complete
