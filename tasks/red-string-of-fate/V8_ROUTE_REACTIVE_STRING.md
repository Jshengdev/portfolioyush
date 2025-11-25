# V8 Experiment: Route-Reactive String Personality

**Agent Pattern**: 4 Engineers + 2 Researchers + 1 QA
**Time Estimate**: 6-8 hours total
**Status**: Waiting (Depends on V6 + V7)
**Dependencies**: V6 Red Ribbon Cursor + V7 Navigation String must be complete

---

## Objective

Give the red string a unique "personality" on each route, mirroring the existing Line.jsx route-reactive system and ShaderVisual.jsx personality attributes. The string becomes an emotional/thematic indicator, expressing the mood of each section.

---

## Design Concept

### Route Personalities

| Route | Mood | String Behavior | Physics | Visual |
|-------|------|-----------------|---------|--------|
| `/` (Home) | Confident, welcoming | Smooth, gentle curves | Low gravity, high damping | Warm glow |
| `/about` | Contemplative, minimal | Slow, deliberate movement | Medium gravity, low energy | Soft fade |
| `/projects` | Dynamic, professional | Quick, responsive | Low damping, springy | Sharp definition |
| `/archive` | Rich, layered | Complex, intertwined | Multiple threads? | Layered opacity |
| `/contact` | Open, inviting | Reaching outward | Stretchy, elastic | Pulsing warmth |

### Personality Attributes (Matching ShaderVisual)

```javascript
// Route personality parameters
const routePersonalities = {
  '/': {
    complexity: 0.5,  // String segment count modifier
    energy: 0.6,      // Movement speed/bounce
    focus: 0.5,       // Cursor tracking precision
    warmth: 0.5,      // Color saturation/glow intensity
    depth: 0.4,       // 3D parallax effect (v8)
    stiffness: 0.7,   // Physics stiffness
    damping: 0.95     // Physics damping
  },
  '/about': {
    complexity: 0.3,
    energy: 0.3,
    focus: 0.7,
    warmth: 0.4,
    depth: 0.3,
    stiffness: 0.5,
    damping: 0.98
  },
  // ... etc
};
```

### Visual Transformation Examples

**Home (`/`)**
```
    ╭──────────╮
   ╱            ╲
  ○              ← Smooth, welcoming curve
   ╲            ╱    Low amplitude wave
    ╰──────────╯
```

**Projects (`/projects`)**
```
  ○╲    ╱╲    ╱╲
    ╲  ╱  ╲  ╱  ╲  ← Dynamic, springy
     ╲╱    ╲╱    ╲    Higher energy
```

**Archive (`/archive`)**
```
  ○─╮  ╭─╮  ╭─╮
    │  │ │  │ │    ← Layered, complex
    ╰──╯ ╰──╯ ╰──     Multiple depth levels
```

**Contact (`/contact`)**
```
  ○────────────────→  ← Extending outward
         ↗              Open, reaching
       ↗
```

---

## Technical Architecture

### Personality System

```javascript
// stringPersonalities.js
export const STRING_PERSONALITIES = {
  '/': {
    name: 'home',
    physics: {
      segmentCount: 10,
      segmentLength: 15,
      gravity: 0.2,
      stiffness: 0.7,
      damping: 0.95,
      constraintIterations: 3
    },
    visual: {
      color: 'rgba(255, 128, 128, 0.8)',
      glowIntensity: 0.6,
      thickness: 3,
      fadeLength: 0.7
    },
    animation: {
      idleWave: true,
      waveAmplitude: 5,
      waveFrequency: 0.5
    }
  },

  '/about': {
    name: 'about',
    physics: {
      segmentCount: 8,
      segmentLength: 18,
      gravity: 0.15,
      stiffness: 0.5,
      damping: 0.98,
      constraintIterations: 4
    },
    visual: {
      color: 'rgba(255, 128, 128, 0.6)',
      glowIntensity: 0.4,
      thickness: 2,
      fadeLength: 0.9
    },
    animation: {
      idleWave: true,
      waveAmplitude: 3,
      waveFrequency: 0.3
    }
  },

  '/projects': {
    name: 'projects',
    physics: {
      segmentCount: 12,
      segmentLength: 12,
      gravity: 0.25,
      stiffness: 0.9,
      damping: 0.9,
      constraintIterations: 2
    },
    visual: {
      color: 'rgba(255, 100, 100, 0.9)',
      glowIntensity: 0.8,
      thickness: 4,
      fadeLength: 0.5
    },
    animation: {
      idleWave: false,
      springBack: true
    }
  },

  '/archive': {
    name: 'archive',
    physics: {
      segmentCount: 15,
      segmentLength: 10,
      gravity: 0.3,
      stiffness: 0.6,
      damping: 0.93,
      constraintIterations: 5
    },
    visual: {
      color: 'rgba(255, 128, 128, 0.7)',
      glowIntensity: 0.5,
      thickness: 3,
      fadeLength: 0.8,
      layered: true,
      layerCount: 3
    },
    animation: {
      idleWave: true,
      waveAmplitude: 4,
      waveFrequency: 0.4
    }
  },

  '/contact': {
    name: 'contact',
    physics: {
      segmentCount: 8,
      segmentLength: 20,
      gravity: 0.1,
      stiffness: 0.4,
      damping: 0.96,
      constraintIterations: 3
    },
    visual: {
      color: 'rgba(255, 140, 140, 0.85)',
      glowIntensity: 0.7,
      thickness: 3,
      fadeLength: 0.6
    },
    animation: {
      idleWave: true,
      waveAmplitude: 6,
      waveFrequency: 0.6,
      pulse: true,
      pulseRate: 2000
    }
  },

  // Default for project detail pages
  'default': {
    name: 'project-detail',
    physics: {
      segmentCount: 10,
      segmentLength: 15,
      gravity: 0.2,
      stiffness: 0.7,
      damping: 0.94
    },
    visual: {
      color: 'rgba(255, 120, 120, 0.75)',
      glowIntensity: 0.6,
      thickness: 3
    }
  }
};
```

### Smooth Transitions Between Routes

```javascript
// useStringPersonality.js
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { STRING_PERSONALITIES } from './stringPersonalities';

export function useStringPersonality() {
  const location = useLocation();
  const [currentPersonality, setCurrentPersonality] = useState(
    STRING_PERSONALITIES['/']
  );
  const [transitionProgress, setTransitionProgress] = useState(1);
  const transitionRef = useRef(null);

  useEffect(() => {
    // Get personality for current route
    const newPersonality = STRING_PERSONALITIES[location.pathname]
      || STRING_PERSONALITIES['default'];

    // Start transition
    setTransitionProgress(0);
    const startTime = Date.now();
    const duration = 800; // ms

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setTransitionProgress(eased);

      if (progress < 1) {
        transitionRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentPersonality(newPersonality);
      }
    };

    transitionRef.current = requestAnimationFrame(animate);

    return () => {
      if (transitionRef.current) {
        cancelAnimationFrame(transitionRef.current);
      }
    };
  }, [location.pathname]);

  return {
    personality: currentPersonality,
    transitioning: transitionProgress < 1,
    progress: transitionProgress
  };
}

// Interpolate between two personality configs
export function interpolatePersonality(from, to, progress) {
  const result = { physics: {}, visual: {}, animation: {} };

  // Interpolate physics
  Object.keys(from.physics).forEach(key => {
    result.physics[key] = from.physics[key] +
      (to.physics[key] - from.physics[key]) * progress;
  });

  // Interpolate visual (including color)
  Object.keys(from.visual).forEach(key => {
    if (key === 'color') {
      result.visual[key] = interpolateColor(
        from.visual[key], to.visual[key], progress
      );
    } else if (typeof from.visual[key] === 'number') {
      result.visual[key] = from.visual[key] +
        (to.visual[key] - from.visual[key]) * progress;
    } else {
      result.visual[key] = progress > 0.5 ? to.visual[key] : from.visual[key];
    }
  });

  return result;
}
```

### Idle Wave Animation

```javascript
// idleAnimations.js
export class IdleWaveAnimation {
  constructor(config) {
    this.amplitude = config.waveAmplitude || 5;
    this.frequency = config.waveFrequency || 0.5;
    this.enabled = config.idleWave !== false;
    this.time = 0;
  }

  update(dt) {
    if (!this.enabled) return;
    this.time += dt * this.frequency;
  }

  applyToParticles(particles) {
    if (!this.enabled) return;

    particles.forEach((particle, i) => {
      if (particle.pinned) return;

      // Wave offset based on position in chain
      const offset = i / particles.length * Math.PI * 2;
      const wave = Math.sin(this.time + offset) * this.amplitude;

      // Apply perpendicular to string direction
      particle.pos.x += wave * 0.1;
    });
  }
}

export class PulseAnimation {
  constructor(config) {
    this.rate = config.pulseRate || 2000;
    this.enabled = config.pulse === true;
    this.intensity = 0;
    this.startTime = Date.now();
  }

  update() {
    if (!this.enabled) return 1;

    const elapsed = Date.now() - this.startTime;
    const progress = (elapsed % this.rate) / this.rate;

    // Smooth pulse using sin
    this.intensity = 0.5 + 0.5 * Math.sin(progress * Math.PI * 2);
    return this.intensity;
  }

  getGlowMultiplier() {
    return this.enabled ? 0.7 + this.intensity * 0.6 : 1;
  }
}
```

---

## Implementation Plan

### Engineer 1: Personality System (75 min)

**Objective**: Create personality configuration and state

**Deliverables**:
- [ ] `stringPersonalities.js` with all route configs
- [ ] `useStringPersonality.js` hook
- [ ] Smooth interpolation between personalities
- [ ] Default fallback for unknown routes

**Integration with V6**:
```javascript
// StringCursor.jsx modification
import { useStringPersonality } from './useStringPersonality';

const StringCursor = () => {
  const { personality, transitioning, progress } = useStringPersonality();

  // Use personality.physics for StringSystem
  // Use personality.visual for StringRenderer
  // ...
};
```

---

### Engineer 2: Physics Adaptations (60 min)

**Objective**: Make physics system configurable

**Deliverables**:
- [ ] Modify `StringPhysics.js` to accept dynamic config
- [ ] Runtime parameter updates (segment count, stiffness, etc.)
- [ ] Smooth transition handling for physics changes
- [ ] Constraint iteration configurability

**Key Changes**:
```javascript
// StringPhysics.js modifications
export class StringSystem {
  constructor(config) {
    this.config = config;
    this.reinitialize(config);
  }

  setConfig(newConfig, smooth = true) {
    if (smooth) {
      // Animate physics parameter changes
      this.targetConfig = newConfig;
      this.transitioning = true;
    } else {
      this.config = newConfig;
      this.reinitialize(newConfig);
    }
  }

  reinitialize(config) {
    const oldPositions = this.particles?.map(p => ({ ...p.pos })) || [];

    this.particles = [];
    for (let i = 0; i < config.segmentCount; i++) {
      const particle = new StringParticle(
        oldPositions[i]?.x || 0,
        oldPositions[i]?.y || 0
      );
      this.particles.push(particle);
    }
    this.particles[0].pinned = true;
    this.segmentLength = config.segmentLength;
  }

  update(cursorX, cursorY) {
    // Apply current config
    const gravity = this.config.gravity;
    const damping = this.config.damping;
    const iterations = this.config.constraintIterations;

    // Update with config-specific physics
    this.particles.forEach(p => p.update(gravity, damping));

    // Constraints
    for (let i = 0; i < iterations; i++) {
      for (let j = 0; j < this.particles.length - 1; j++) {
        constrain(this.particles[j], this.particles[j+1], this.segmentLength);
      }
    }
  }
}
```

---

### Engineer 3: Visual Adaptations (60 min)

**Objective**: Make renderer configurable with visual transitions

**Deliverables**:
- [ ] Modify `StringRenderer.js` for dynamic visuals
- [ ] Color interpolation during route changes
- [ ] Glow intensity variation
- [ ] Thickness and fade configuration
- [ ] Layered rendering for archive route

**Key Changes**:
```javascript
// StringRenderer.js modifications
export class StringRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.visualConfig = null;
  }

  setVisualConfig(config) {
    this.visualConfig = config;
  }

  render(positions, pulseIntensity = 1) {
    const ctx = this.ctx;
    const config = this.visualConfig;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (positions.length < 2) return;

    // Layered rendering for archive
    if (config.layered) {
      this.renderLayered(positions, config, pulseIntensity);
    } else {
      this.renderSingle(positions, config, pulseIntensity);
    }
  }

  renderLayered(positions, config, pulse) {
    const layers = config.layerCount || 3;

    for (let layer = 0; layer < layers; layer++) {
      const offset = layer * 3;
      const opacity = 1 - (layer / layers) * 0.5;

      // Offset positions for each layer
      const layeredPositions = positions.map((p, i) => ({
        x: p.x + offset * Math.sin(i * 0.5),
        y: p.y + offset * Math.cos(i * 0.5)
      }));

      this.renderSingle(layeredPositions, {
        ...config,
        glowIntensity: config.glowIntensity * opacity
      }, pulse);
    }
  }

  renderSingle(positions, config, pulse) {
    const ctx = this.ctx;

    // Apply glow
    ctx.save();
    ctx.shadowColor = config.color;
    ctx.shadowBlur = config.glowIntensity * 15 * pulse;

    // Draw curve
    this.drawCurve(positions, config);

    ctx.restore();
  }

  drawCurve(positions, config) {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);

    for (let i = 1; i < positions.length - 1; i++) {
      const xc = (positions[i].x + positions[i + 1].x) / 2;
      const yc = (positions[i].y + positions[i + 1].y) / 2;
      ctx.quadraticCurveTo(positions[i].x, positions[i].y, xc, yc);
    }

    // Gradient with fade
    const gradient = ctx.createLinearGradient(
      positions[0].x, positions[0].y,
      positions[positions.length - 1].x, positions[positions.length - 1].y
    );
    gradient.addColorStop(0, config.color);
    gradient.addColorStop(config.fadeLength, this.fadeColor(config.color, 0.3));
    gradient.addColorStop(1, 'transparent');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = config.thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  fadeColor(color, alpha) {
    // Parse rgba and modify alpha
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
    }
    return color;
  }
}
```

---

### Engineer 4: Idle Animations & Polish (60 min)

**Objective**: Add personality-specific idle animations

**Deliverables**:
- [ ] `idleAnimations.js` with wave and pulse systems
- [ ] Integration with main update loop
- [ ] Smooth enable/disable on route change
- [ ] Contact page "reaching" animation
- [ ] Projects page "springback" effect

**Key Code**:
```javascript
// Integrate idle animations into StringCursor
import { IdleWaveAnimation, PulseAnimation } from './idleAnimations';

useEffect(() => {
  const waveAnim = new IdleWaveAnimation(personality.animation);
  const pulseAnim = new PulseAnimation(personality.animation);

  const animate = (dt) => {
    waveAnim.update(dt);
    const pulseIntensity = pulseAnim.update();

    systemRef.current.update(mouseRef.current.x, mouseRef.current.y);
    waveAnim.applyToParticles(systemRef.current.particles);

    rendererRef.current.render(
      systemRef.current.getPositions(),
      pulseIntensity
    );

    rafRef.current = requestAnimationFrame(() => animate(16));
  };

  animate(0);
}, [personality]);
```

---

### Researcher 1: Performance & UX Analysis (60 min)

**Objective**: Verify transitions are smooth and performant

**Tasks**:
- [ ] Route transition timing analysis
- [ ] FPS during personality transitions
- [ ] Memory with different segment counts
- [ ] User perception testing (does personality feel right?)
- [ ] Compare to ShaderVisual personality changes

**Metrics**:
| Transition | Target Duration | Max FPS Drop |
|------------|-----------------|--------------|
| Home → About | 800ms | 5 FPS |
| Projects → Archive | 800ms | 5 FPS |
| Any → Contact | 800ms | 5 FPS |

---

### Researcher 2: Documentation (45 min)

**Objective**: Comprehensive personality system documentation

**Tasks**:
- [ ] Update CLAUDE.md with personality system
- [ ] Create visual diagrams for each route
- [ ] Document configuration options
- [ ] Add personality modification guide
- [ ] Sync with ShaderVisual personality docs

---

### QA: Final Verification (75 min)

**Objective**: Full system integration testing

**Checklist**:
- [ ] Home personality: confident, welcoming
- [ ] About personality: contemplative, minimal
- [ ] Projects personality: dynamic, professional
- [ ] Archive personality: rich, layered
- [ ] Contact personality: open, inviting
- [ ] Transitions smooth between all routes
- [ ] Physics feel natural on each route
- [ ] Colors adapt correctly
- [ ] Idle animations work
- [ ] Pulse works on contact
- [ ] Layer effect works on archive
- [ ] No jarring changes on fast route switching
- [ ] Works with V6 cursor physics
- [ ] Works with V7 navigation connections
- [ ] Light/dark mode maintained
- [ ] Mobile behavior appropriate
- [ ] Performance within budget
- [ ] Build succeeds

---

## Acceptance Criteria

### Must Have
- [ ] Each route has distinct string personality
- [ ] Smooth transitions between personalities
- [ ] Physics feel natural on each route
- [ ] Visual changes are perceptible but not jarring

### Should Have
- [ ] Idle wave animations on applicable routes
- [ ] Pulse effect on contact route
- [ ] Layered rendering on archive route
- [ ] Color warmth variation

### Nice to Have
- [ ] Per-project personality overrides (future)
- [ ] User customization of string (future)
- [ ] Sound integration with personality (future)

---

## Files to Create

```
src/components/StringCursor/
├── stringPersonalities.js    # NEW: Personality configurations
├── useStringPersonality.js   # NEW: Route-reactive hook
├── idleAnimations.js         # NEW: Wave, pulse, etc.
└── ... (existing V6 files)
```

## Files to Modify

```
src/components/StringCursor/StringCursor.jsx  → Use personality hook
src/components/StringCursor/StringPhysics.js  → Dynamic config
src/components/StringCursor/StringRenderer.js → Dynamic visuals
```

---

## Alignment with Existing Systems

### ShaderVisual Personality Mapping

| Shader Attribute | String Equivalent |
|------------------|-------------------|
| `u_complexity` | Segment count, visual layers |
| `u_energy` | Damping (inverse), bounce |
| `u_focus` | Cursor tracking precision |
| `u_warmth` | Color saturation, glow warmth |
| `u_depth` | Parallax (future 3D integration) |

### Line.jsx Evolution

V8 essentially makes Line.jsx's route-reactive concept apply to the string cursor. Consider:
- Deprecating Line.jsx after V8 (or keep as fallback)
- String becomes the primary route indicator
- Unified visual language with shader background

---

## Success Metrics

| Metric | Target | Verification |
|--------|--------|--------------|
| Personality Distinct | Each route feels unique | User testing |
| Transition Smooth | No jarring changes | Visual inspection |
| FPS Maintained | 60 FPS during transitions | DevTools |
| System Cohesion | String matches shader mood | Side-by-side |
| Code Quality | Clean, maintainable | Review |

---

## Creative Vision

### The Complete Red String of Fate Experience

After V8, the portfolio tells a story:

1. **You arrive** → The red string greets you warmly (Home)
2. **You explore** → The string becomes contemplative (About)
3. **You browse work** → The string becomes dynamic, connecting projects (Projects)
4. **You dive deep** → The string tangles through history (Archive)
5. **You reach out** → The string extends toward connection (Contact)

The string is not just a cursor effect - it's a character, a guide, the red thread of fate that connects the visitor to the creator's work. It has moods, it responds to the journey, it makes the portfolio memorable.

---

**Ready to Start**: After V6 + V7 are complete

---

## References

- [Current Line.jsx Implementation](../../src/components/Line.jsx)
- [ShaderVisual Personality System](../../src/components/ShaderVisual.jsx)
- [Route-Reactive Animation Patterns](../../CLAUDE.md)
- [GSAP Easing Functions](https://gsap.com/docs/v3/Eases/)
