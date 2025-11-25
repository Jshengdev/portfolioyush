# 06 - Visual Direction & Art References

## North Star: "Data-Driven Organic Cartography"

**The aesthetic should feel like**:
- 50% Scientific: Authentic topographic technique
- 30% Artistic: Ed Fairburn's organic lines, Tyler Hobbs' flow elegance
- 20% Interactive: Cursor trails sculpt the visualization

---

## Primary Inspiration Sources

### 1. Ed Fairburn - "Topopointillism"
**What**: Portraits made from topographic map contour lines
**Why it matters**: Proves contours CAN read as human anatomy
**Extract**: Variable line density to communicate depth—dense for shadows, sparse for highlights

### 2. Tyler Hobbs - Flow Fields ("Fidenza")
**What**: Perlin noise-driven grids generating never-overlapping curves
**Why it matters**: Technical implementation for organic, elegant lines
**Extract**: Flow field drives contour placement; hand depth map → flow field → organic lines

### 3. Joy Division - "Unknown Pleasures"
**What**: Stacked plot of radio pulsar emissions
**Why it matters**: Horizontal stacking creates 3D illusion on 2D plane
**Extract**: Lines follow topology with subtle perspective depth cueing

### 4. Anna Von Mertens - "Body Topography"
**What**: Stitch patterns as topographic maps following laser-measured body elevations
**Why it matters**: Precise elevation intervals create authenticity
**Extract**: Use actual depth buffer gradients for contour intervals

### 5. Refik Anadol - Data Sculptures
**What**: EEG/medical data visualized as flowing sculptural forms
**Why it matters**: Data-as-art philosophy—accuracy AND emotional resonance
**Extract**: Treating depth scan as both accurate representation AND compelling visual

---

## Line Density Principles

| Zone | Density | Line Weight | Purpose |
|------|---------|-------------|---------|
| Palm valleys | 40-60 lines/cm | 0.5px | Maximum detail, shadows |
| Knuckle peaks | 10-20 lines/cm | 0.3px | Highlights, focus |
| Fingertips | 5-10 lines/cm | 0.2px → stipple | Dissolving, ephemeral |
| Between fingers | Sparse | — | Negative space, silhouette |

---

## Edge Treatment: Three-Zone System

```
Zone 1 (Core):        Solid contour lines, high density, sharp
Zone 2 (Transition):  Dashed lines, density -50%
Zone 3 (Dissolution): Stipple points → particles, alpha fade
```

**Implementation**:
```glsl
float edgeDist = distanceFromEdge(vUv, u_depthMap);

// Zone 1: Core (edgeDist > 0.3)
float zone1 = smoothstep(0.2, 0.3, edgeDist);

// Zone 2: Transition (0.1 < edgeDist < 0.3)
float zone2 = smoothstep(0.1, 0.2, edgeDist) * (1.0 - zone1);

// Zone 3: Dissolution (edgeDist < 0.1)
float zone3 = 1.0 - smoothstep(0.0, 0.1, edgeDist);
```

---

## Color Palette

```css
/* Primary */
--contour-main:     rgba(255, 255, 255, 0.7);   /* Main lines */
--contour-shadow:   rgba(255, 255, 255, 0.4);   /* Valley lines */
--accent-blue:      rgba(136, 169, 215, 0.47);  /* Key landmarks */

/* Particles */
--particle-core:    rgba(255, 255, 255, 0.6);   /* Fresh particles */
--particle-glow:    rgba(136, 169, 215, 0.8);   /* Glow effect */
--particle-fade:    rgba(136, 169, 215, 0.0);   /* Faded out */

/* Background */
--bg-dark:          rgba(20, 20, 20, 0.3);      /* Glass morphism */
```

**In GLSL**:
```glsl
vec3 contourMain = vec3(1.0, 1.0, 1.0);
vec3 contourShadow = vec3(0.7, 0.7, 0.7);
vec3 accentBlue = vec3(0.53, 0.66, 0.84);  // #88a9d7
```

---

## Negative Space Usage

**Principles**:
- What you DON'T draw is as important as what you do
- Large empty areas make dense regions feel intentional
- Agent-based systems create organic voids through repulsion

**Application**:
| Area | Coverage | Treatment |
|------|----------|-----------|
| Palm center | 30% | Let background show through |
| Between fingers | 80% empty | Pure silhouette emphasis |
| Around hand | 100% empty | Only dissolving particles |
| Knuckles | 60% | Dense focal points via contrast |

---

## Animation Principles

### Contour Animation
```glsl
// Subtle line drift (not constant, not jarring)
float animatedInterval = u_contourInterval + sin(u_time * 0.1) * 0.005;
```

### Dissolution Animation
```glsl
// Progress tied to user interaction or time
float progress = u_dissolveProgress;  // 0.0 to 1.0

// Or automatic breathing:
float autoProgress = sin(u_time * 0.5) * 0.5 + 0.5;
progress = mix(progress, autoProgress * 0.3, u_autoAnimate);
```

### Particle Lifecycle
```
Spawn → Accelerate (0-1s) → Drift (1-4s) → Fade (4-5s) → Respawn
```

---

## What to AVOID

❌ **Generic "particle explosion" effects** (overused)
❌ **Overly smooth gradients** (loses data authenticity)
❌ **RGB color chaos** (stick to monochrome + single accent)
❌ **Uniform line density** (no depth perception)
❌ **Perfect geometric regularity** (feels robotic)
❌ **Excessive motion** (distracting, not contemplative)

---

## Mood Board Description

*Imagine walking into a dark exhibition space...*

At the center, a large projection shows a **ghostly white hand floating in darkness**. As you approach, you notice the hand isn't solid—it's constructed from **hundreds of thin, horizontal contour lines** stacked like a topographic map, each line representing elevation change.

The **palm is densest**, lines packed tightly mapping every crease. Moving toward **fingertips**, lines **break into dashes**, dissolve into **stippled points**, then **shed into a gentle particle swarm** drifting outward like smoke.

The aesthetic is **cold data visualization meets organic human form**—Joy Division's "Unknown Pleasures" merged with a medical ultrasound, rendered with Ed Fairburn's technique.

**Emotional Response Target**:
*"This is both a clinical scan AND a work of art. It shows me something true about the human form through data visualization, but it feels poetic, not cold. I want to reach out and touch it."*

---

## Visual Hierarchy

1. **Hero**: Dense topographic contours across palm/fingers (primary focus)
2. **Secondary**: Stipple texture filling valleys (adds richness)
3. **Tertiary**: Dissolving particle swarm at edges (dynamic motion)
4. **Ambient**: Cursor light trails interact with hand (subtle)

---

## Sources

- [Ed Fairburn Map Art](https://mymodernmet.com/map-art-ed-fairburn/)
- [Tyler Hobbs - Flow Fields](https://www.tylerxhobbs.com/words/flow-fields)
- [Joy Division Unknown Pleasures](https://www.rollingstone.com/music/music-news/joy-divisions-unknown-pleasures-cover-the-science-behind-an-image-191126/)
- [Anna Von Mertens - Body Topography](https://annavonmertens.com/Archive/body-topography/)
- [Refik Anadol](https://refikanadol.com/)
- [Memo Akten](https://www.memo.tv/)
- [inconvergent - Anders Hoff](https://inconvergent.net/)
