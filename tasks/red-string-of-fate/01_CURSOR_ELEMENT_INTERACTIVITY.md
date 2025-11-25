# Cursor-Element Interactivity & Hero Atmosphere Research

**Date**: 2025-11-25
**Focus**: How the red ribbon cursor can interact with website elements
**Status**: Research Complete

---

## Current Implementation Analysis

Your existing `Cursor.jsx` already has:
- **Red ribbon trail** (120 SVG segments)
- **Velocity-based thickness** (1.5px - 4px)
- **Age-based opacity fade**
- **Glow effects** with dynamic intensity
- **Snap-back animation** when stationary
- **Click state** scaling

The Hero section is minimal: title + slider with empty containers.

---

## Cursor-Element Interaction Patterns Discovered

### 1. Magnetic Pull Effect

**Concept**: Elements pull the cursor/ribbon toward them when nearby.

**Implementation**:
```javascript
// Core magnetic effect using getBoundingClientRect()
const rect = element.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

const deltaX = mouseX - centerX;
const deltaY = mouseY - centerY;
const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

if (distance < pullRadius) {
  const strength = (1 - distance / pullRadius) * 0.3;
  element.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
}
```

**Sources**:
- [Magnetic Button Effect using GSAP](https://codepen.io/gusevdigital/pen/QWoOZMV)
- [Cuberto Mouse Follower Library](https://github.com/Cuberto/mouse-follower)
- [GSAP Magnetic Parallax Effect](https://www.antstack.com/blog/gsap-effects-magnetic-parallax-effect/)

**Red Ribbon Application**:
- Navigation items pull the ribbon head toward them
- Title text letters have slight magnetic attraction
- Buttons/links magnetically attract ribbon tip

---

### 2. Rough Notation Wrapping

**Concept**: Ribbon "draws" around elements like hand-drawn annotations.

**Library**: [Rough Notation](https://roughnotation.com/) - 3.83kb gzipped

**Annotation Types**:
| Type | Visual | Use Case |
|------|--------|----------|
| `circle` | Draws around element | Highlight nav item |
| `underline` | Sketchy line below | Text emphasis |
| `box` | Rectangle around | Button highlight |
| `bracket` | Side brackets | Paragraph focus |
| `highlight` | Yellow marker effect | Important text |

**Implementation**:
```javascript
import { annotate, annotationGroup } from 'rough-notation';

const annotation = annotate(element, {
  type: 'circle',
  color: '#FF1744',
  strokeWidth: 2,
  padding: 8,
  animationDuration: 800
});

annotation.show();
```

**Red Ribbon Application**:
- When hovering nav item, ribbon "draws" a circle around it
- On click, ribbon underlines selected item
- Hero title could have animated bracket/underline on load

**Sources**:
- [Rough Notation Official](https://roughnotation.com/)
- [GitHub Repository](https://github.com/rough-stuff/rough-notation)
- [FreeCodeCamp Tutorial](https://www.freecodecamp.org/news/how-to-add-animation-to-your-site-with-rough-notation/)

---

### 3. Elastic Line Connection

**Concept**: SVG line connects cursor to element with physics-based elasticity.

**Key Resource**: [Fancy Components - Elastic Line](https://www.fancycomponents.dev/docs/components/physics/elastic-line)

**How It Works**:
```
Cursor -------- control point -------- Element
          ↓ (moves with cursor)

When cursor moves close to line (grabThreshold):
  - Control point follows cursor position
  - Creates elastic "pull" visual

When cursor exceeds releaseThreshold:
  - Control point animates back to center
  - Creates "snap" effect
```

**SVG Implementation**:
```javascript
// Quadratic bezier curve
const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

// Control point follows cursor when within threshold
if (distanceToCursor < grabThreshold) {
  controlX = cursorX;
  controlY = cursorY;
}
```

**Red Ribbon Application**:
- Ribbon connects from cursor to hovered navigation item
- Multiple elastic lines to all nav items (varying opacity by distance)
- "Threading" effect through menu items

**Sources**:
- [Codrops Elastic SVG Elements](https://tympanus.net/codrops/2014/12/15/elastic-svg-elements/)
- [Elastic Line Animation CodePen](https://codepen.io/Okba-Design/pen/gOPdypB)

---

### 4. Spotlight/Torch Reveal

**Concept**: Cursor acts as a flashlight revealing hidden content.

**Implementation**:
```css
.spotlight-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(
    circle 150px at var(--x) var(--y),
    transparent 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
}
```

```javascript
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--x', e.clientX + 'px');
  document.documentElement.style.setProperty('--y', e.clientY + 'px');
});
```

**Red Ribbon Application**:
- Hero has hidden content that ribbon's glow reveals
- Dark overlay with ribbon "illuminating" areas
- Secret messages/easter eggs revealed by ribbon proximity

**Sources**:
- [Speckyboy Flashlight Effect Trend](https://speckyboy.com/flashlight-effect-web-design-trend/)
- [Frontend Masters CSS Spotlight](https://frontendmasters.com/blog/css-spotlight-effect/)
- [Webflow Spotlight Reveal](https://webflow.com/made-in-webflow/website/spotlight-reveal-effect-with-hover)

---

### 5. Cursor Scale/Morph on Hover

**Concept**: Cursor/ribbon transforms when hovering interactive elements.

**Common Patterns**:
```javascript
// Scale up cursor ring on link hover
.hover-this:hover ~ .cursor {
  transform: scale(8);
  mix-blend-mode: difference;
}
```

**Red Ribbon Application**:
- Ribbon thickens when over clickable elements
- Glow intensifies on interactive hover
- Color shifts subtly for different element types

**Sources**:
- [Animated Cursor + Link Hover](https://codepen.io/roesinn/pen/ZEbbMbN)
- [Cursor Follow & Hover Effect](https://codepen.io/alphardex/pen/jOEgYjr)

---

## Hero Section Atmosphere Patterns

### 1. Particle Field Interaction

**Concept**: Particles in hero respond to cursor proximity.

**Implementation** (React):
```javascript
// Each particle has:
// - position (x, y)
// - velocity (vx, vy)
// - attraction force based on mouse distance

const attractionForce = 0.02;
const mouseRadius = 150;

particles.forEach(particle => {
  const dx = mouseX - particle.x;
  const dy = mouseY - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < mouseRadius) {
    const force = (1 - distance / mouseRadius) * attractionForce;
    particle.vx += dx * force;
    particle.vy += dy * force;
  }
});
```

**Red Ribbon Application**:
- Small particles float in hero background
- Particles are attracted to/repelled by ribbon
- Creates "magnetic field" around cursor

**Sources**:
- [shadcn Particles Background](https://www.shadcn.io/background/particles)
- [Cruip Canvas Particle Tutorial](https://cruip.com/how-to-create-a-beautiful-particle-animation-with-html-canvas/)
- [Mat Simon 3D Hero Animation](https://www.matsimon.dev/blog/building-an-interactive-3d-hero-animation)

---

### 2. Text Distortion/Reaction

**Concept**: Hero text reacts to cursor proximity.

**Techniques**:
- **Displacement**: Letters shift based on cursor position
- **Wave**: Text ripples from cursor point
- **Magnetic**: Individual letters pulled toward cursor
- **Blur**: Distance-based blur effect

**Implementation Example**:
```javascript
// Per-character magnetic effect
letters.forEach((letter, i) => {
  const rect = letter.getBoundingClientRect();
  const letterX = rect.left + rect.width / 2;
  const letterY = rect.top + rect.height / 2;

  const dx = cursorX - letterX;
  const dy = cursorY - letterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 100) {
    const strength = (1 - distance / 100) * 15;
    letter.style.transform = `translate(${dx * strength * 0.1}px, ${dy * strength * 0.1}px)`;
  }
});
```

**Sources**:
- [FlowRadar Exploding Text Particles](https://www.flowradar.com/cloneable-categories/mouse)

---

### 3. Layered Depth/Parallax

**Concept**: Multiple layers move at different speeds based on cursor.

**Implementation**:
```javascript
const layers = [
  { element: layer1, depth: 0.2 },
  { element: layer2, depth: 0.5 },
  { element: layer3, depth: 0.8 }
];

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX - window.innerWidth / 2) / 50;
  const y = (e.clientY - window.innerHeight / 2) / 50;

  layers.forEach(({ element, depth }) => {
    element.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
```

**Red Ribbon Application**:
- Ribbon exists at specific depth layer
- Background elements parallax behind ribbon
- Creates sense of ribbon "floating" in 3D space

---

## Portfolio Cursor Interaction Examples

### Award-Winning Examples from Awwwards

| Portfolio | Technique | Description |
|-----------|-----------|-------------|
| [IG Design](https://www.awwwards.com/inspiration/cursor-interaction-and-slick-animation-ivan-design-portfolio) | Reactive cursor + minigame | Cursor creates interactive experience |
| [Chungi Yoo](https://www.awwwards.com/inspiration/chungi-yoo-folio-playful-interaction) | Playful cursor + illustration | Cursor interacts with illustrated elements |
| [Aircord](https://www.awwwards.com/inspiration/3d-webgl-cursor-interaction-aircord-creative-studio) | 3D WebGL cursor | Cursor manipulates 3D scene |
| [Custom Trail + Blend](https://www.awwwards.com/inspiration/custom-cursor-with-trail-effect-and-blending-layers) | Trail + blend modes | Cursor trail inverts/blends with content |

**Collection**: [Hovers, Cursors and Cute Interactions](https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/)

---

## Red Ribbon Interaction Ideas for Your Portfolio

### Hero Section Ideas

#### 1. **Ribbon Reveals Title**
```
Initial state: Title text is hidden/blurred
Ribbon proximity: Text gradually reveals where ribbon passes
Effect: Like a "red string of fate" revealing your destiny
```

#### 2. **Particle Constellation**
```
Background: Subtle floating particles
Ribbon interaction: Particles connect to ribbon with thin red lines
When near: Particles cluster toward ribbon
Creates: Living, breathing atmosphere
```

#### 3. **Magnetic Typography**
```
"johnny sheng's portfolio" letters:
- Float slightly
- Are pulled toward ribbon when near
- Create ripple effect from cursor position
```

#### 4. **Ribbon Threading**
```
On hero load:
- Ribbon animates through title letters
- "Threads" through each character
- Settles into cursor-following state
```

### Navigation Ideas

#### 1. **Encircle on Hover**
```
When hovering nav item:
- Ribbon draws rough circle around item (Rough Notation style)
- Animation: 400-600ms hand-drawn effect
- On leave: Circle fades/erases
```

#### 2. **Elastic Connection**
```
Always visible:
- Thin red lines connect ribbon to all nav items
- Lines are elastic (Fancy Components style)
- Hovered item: Line thickens, pulls slightly
```

#### 3. **Active Page Indicator**
```
Current page:
- Ribbon maintains permanent connection
- Underline drawn under current nav item
- Color is brighter/more saturated
```

### Project Cards Ideas

#### 1. **Magnetic Border**
```
Card on hover:
- Red border "draws" around card (rough style)
- Ribbon intensifies glow
- Card lifts slightly toward cursor
```

#### 2. **Connection Web**
```
On Projects page:
- Thin red threads connect all visible cards
- Cursor proximity highlights nearest connections
- Creates "network of work" visual
```

### Archive Horizontal Scroll Ideas

#### 1. **Ribbon as Progress**
```
As scrolling horizontally:
- Ribbon stretches along scroll direction
- Shows "path through archive"
- Creates visual progress indicator
```

#### 2. **Item Threading**
```
Ribbon weaves through archive items:
- Thread connects chronologically
- Highlights temporal sequence
- "Red thread of fate" through career
```

---

## Technical Implementation Priority

### Phase 1: Hero Atmosphere (V6.1)
1. Add particle field to hero background
2. Particles attracted to ribbon
3. Title has subtle magnetic letter effect

### Phase 2: Navigation Wrapping (V7.1)
1. Integrate Rough Notation or custom SVG
2. Circle/underline nav items on hover
3. Active page connection

### Phase 3: Elastic Connections (V7.2)
1. Elastic lines to navigation
2. Fancy Components-style physics
3. Distance-based opacity

### Phase 4: Content Reactions (V8+)
1. Project cards respond to ribbon
2. Archive threading effect
3. Contact page "reaching out" animation

---

## Performance Considerations

| Technique | CPU Impact | Recommendation |
|-----------|-----------|----------------|
| Particle field | Medium | Limit to 50-100 particles |
| Magnetic text | Low | Use transform only |
| Rough Notation | Low | Library is 3.83kb |
| Elastic lines | Medium | Limit active connections to 5 |
| Spotlight reveal | Low | CSS radial-gradient is GPU |

**Mobile Strategy**:
- Disable particle field
- Simplify to single connection line
- Touch creates "tap highlight" instead

---

## Key Libraries to Consider

| Library | Size | Use Case |
|---------|------|----------|
| [Rough Notation](https://roughnotation.com/) | 3.83kb | Hand-drawn circles/underlines |
| [GSAP](https://gsap.com/) | Already using | Magnetic effects, morphing |
| [Fancy Components](https://www.fancycomponents.dev/) | Varies | Elastic line component |
| [anime.js](https://animejs.com/) | 17kb | Alternative to GSAP |

---

## Sources

### Cursor Effects
- [Magnetic Button Effect GSAP](https://codepen.io/gusevdigital/pen/QWoOZMV)
- [Animated Cursor Interaction](https://codepen.io/orionJoe/pen/XWBvmqe)
- [Cursor Movement Hover](https://codepen.io/hexagoncircle/pen/oKGZjL)
- [Cuberto Mouse Follower](https://github.com/Cuberto/mouse-follower)

### Wrapping/Annotation
- [Rough Notation](https://roughnotation.com/)
- [Rough Notation GitHub](https://github.com/rough-stuff/rough-notation)

### Elastic Effects
- [Fancy Components Elastic Line](https://www.fancycomponents.dev/docs/components/physics/elastic-line)
- [Codrops Elastic SVG](https://tympanus.net/codrops/2014/12/15/elastic-svg-elements/)

### Spotlight/Reveal
- [Speckyboy Flashlight Effect](https://speckyboy.com/flashlight-effect-web-design-trend/)
- [Frontend Masters CSS Spotlight](https://frontendmasters.com/blog/css-spotlight-effect/)

### Hero Atmosphere
- [shadcn Particles](https://www.shadcn.io/background/particles)
- [Cruip Particle Animation](https://cruip.com/how-to-create-a-beautiful-particle-animation-with-html-canvas/)

### Portfolio Examples
- [Awwwards Cursor Collection](https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/)
- [IG Design Portfolio](https://www.awwwards.com/inspiration/cursor-interaction-and-slick-animation-ivan-design-portfolio)
