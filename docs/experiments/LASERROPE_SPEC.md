# LASERROPE Visual Specification

> **Purpose**: Quality control reference during implementation. Check each system against these specs.

---

## Quick Reference Card

| Property | Value | System |
|----------|-------|--------|
| Core thickness | 0.002 normalized | Structure |
| Glow radius | 3x core | Structure |
| Node glow intensity | 2.5 | Structure |
| Tip fade start | 0.85 | Structure |
| Dash frequency | 12.0 | Structure |
| Ignition duration | 280ms | Spawn |
| Extension duration | 450ms | Extension |
| Snap flash duration | 60ms | Snap |
| Snap retraction | 200ms | Snap |
| Stretch limit | 1.5x | Snap |
| Max wrap | 180° | Curl |
| Wrap speed | 45°/sec | Curl |

---

## SYSTEM 1: STRUCTURE

### Visual Segments

```
Origin ─────[BASE]─────[BODY]─────[TIP]───── Cursor
         t=0  ←0.2→     ←0.9→     ←1.0→

BASE (t < 0.2):  Dashed, matches oscilloscope
BODY (0.2-0.9):  Solid beam + soft glow
TIP  (t > 0.9):  Opacity fade to transparent
```

### Exact Values

```yaml
core:
  thickness: 0.002  # In UV space (0-1)
  color: [1.0, 1.0, 1.0]  # Pure white
  edge_falloff: 0.3x thickness  # Soft edge

glow:
  line_radius: 0.006  # 3x core
  line_intensity: 0.15  # Subtle
  falloff: exponential  # exp(-dist²/radius²)

dash:
  frequency: 12.0
  pattern: step(0.4, fract(t * freq))  # 40% gap, 60% solid

tip:
  fade_start: 0.85
  fade_end: 1.0
  curve: smoothstep (ease-out)

blending: additive  # THREE.AdditiveBlending
```

### GLSL Reference

```glsl
// Core line
float core = smoothstep(thickness, thickness * 0.3, dist);

// Glow
float glow = exp(-dist * dist / (glowRadius * glowRadius)) * 0.15;

// Dash (base section only)
float dash = step(0.4, fract(t * 12.0));
float pattern = mix(1.0, dash, step(t, 0.2));

// Tip fade
float tipFade = 1.0 - smoothstep(0.85, 1.0, t);

// Final
float result = (core + glow) * pattern * tipFade;
```

### QA Checklist

- [ ] Base matches oscilloscope dash pattern visually
- [ ] Body is continuous (no breaks)
- [ ] Glow visible but subtle (not overwhelming)
- [ ] Tip fades smoothly (no hard cutoff)
- [ ] Additive blending active (overlaps brighten)
- [ ] Pure white color (no tinting)

---

## SYSTEM 2: SPAWN

### Ignition Timeline

```
0ms ─────[FADE IN]─────[PEAK]─────[CONTRACT]───── 280ms
              80ms        120ms        80ms

FADE IN:   Glow appears, expands
PEAK:      Max brightness, 8Hz shimmer
CONTRACT:  Shrinks as beam begins
```

### Exact Values

```yaml
ignition:
  total_duration: 0.28s

  fade_in:
    duration: 0.08s
    easing: ease-out-quad

  peak:
    duration: 0.12s
    shimmer_hz: 8.0
    shimmer_amplitude: 0.15  # ±15%

  contract:
    duration: 0.08s
    easing: ease-in-quad

  glow:
    max_radius: 0.03
    intensity: 2.5
    color: [1.0, 0.98, 0.95]  # Slight warmth
```

### Stagger Schedule

```
Hover Time    Active Ropes
──────────    ────────────
0.0 - 0.5s    1-2
0.5 - 1.5s    3-4
1.5 - 3.0s    5-6
3.0 - 5.0s    6-7 (max)

Spawn offset between ropes: 150ms ± 50ms
Cluster behavior: 2-3 spawn close together
```

### Luminance Sampling

```javascript
// Valid spawn point criteria:
// 1. luminance > 0.7 (on visible oscilloscope line)
// 2. depth > 0.1 (on hand, not background)
// 3. distance to other origins > 0.05 (spacing)

const ACTIVATION_RADIUS = 0.15;
const MIN_LUMINANCE = 0.7;
const MIN_SPACING = 0.05;
const MAX_ROPES = 7;
```

### QA Checklist

- [ ] Origins ONLY on visible oscilloscope lines
- [ ] Origins ONLY on hand (not background)
- [ ] Glow visible for ~0.28s before beam
- [ ] Shimmer visible at peak (8Hz flicker)
- [ ] Staggered feel (not all at once)
- [ ] Max 7 ropes ever
- [ ] Minimum spacing maintained

---

## SYSTEM 3: EXTENSION

### Animation Curve

```
Extension Progress
     1.0 ─────────────────────────●
         │                    ╱
         │                 ╱
         │              ╱
         │           ╱    ease-out-expo
         │        ╱
         │     ╱
     0.0 ●──╱─────────────────────
         0        0.45s        time

Cubic bezier: [0.16, 1, 0.3, 1]
```

### Exact Values

```yaml
extension:
  duration: 0.45s
  easing: ease-out-expo
  cubic_bezier: [0.16, 1, 0.3, 1]

  leading_edge:
    brightness_boost: 2.0x
    falloff_behind: 0.1  # 10% of line length

  motion_trail:
    frames: 3
    decay: 0.6  # Each frame 60% of previous

  variation:
    speed_multiplier: 0.8 - 1.2
    reach_factor: 0.4 - 1.0  # Some stop short
```

### Leading Edge GLSL

```glsl
// t = parametric position (0-1)
// extension = current progress (0-1)

float leadingEdge = smoothstep(extension - 0.1, extension, t);
float boost = leadingEdge * 2.0;
color *= (1.0 + boost);
```

### QA Checklist

- [ ] Fast start (laser-like)
- [ ] Slow settle at end
- [ ] Leading edge visibly brighter
- [ ] Different ropes reach different lengths
- [ ] Different ropes extend at different speeds
- [ ] 60fps smooth (no stuttering)

---

## SYSTEM 4: SNAP

### Trigger Conditions

```yaml
triggers:
  stretch_ratio: 1.5  # 150% of rest length
  cursor_speed: 0.05  # Normalized units/frame
  mode: either  # Either condition triggers snap
```

### Timeline

```
SNAP ─[FLASH]─[WHIP]─────[OVERSHOOT]─[SETTLE]─[FADE]─
       60ms    200ms       →origin      80ms    100ms

FLASH:     Bright burst at break point
WHIP:      Fast curved retraction
OVERSHOOT: Passes origin by 15%
SETTLE:    Bounces back to origin
FADE:      Opacity fade out
```

### Exact Values

```yaml
snap:
  flash:
    duration: 0.06s
    intensity: 3.5
    radius: 0.025
    falloff: gaussian

  retraction:
    duration: 0.2s
    easing: ease-out-cubic [0.33, 1, 0.68, 1]
    inertia_influence: 0.3  # Curved path

  overshoot:
    distance: 0.15  # 15% past origin

  settle:
    duration: 0.08s
    easing: ease-out-quad

  cooldown:
    duration: 1.0s
```

### Tension Visual Feedback

```yaml
tension_levels:
  rest: 1.0
  warning: 1.2   # Visual cues begin
  critical: 1.4  # Intense warning
  snap: 1.5      # Break point

visuals_by_tension:
  brightness: 1.0 + (stretch - 1.0) * 1.5
  # At snap: 1.0 + 0.5 * 1.5 = 1.75x brightness

  thickness: 1.0 - (stretch - 1.0) * 0.4
  # At snap: 1.0 - 0.5 * 0.4 = 0.8x thickness

  vibration:
    threshold: 1.3
    frequency: 30Hz
    amplitude: 0.005
```

### QA Checklist

- [ ] Snap at exactly 1.5x stretch
- [ ] Flash UNMISTAKABLE (bright, visible)
- [ ] Curved retraction path (not straight)
- [ ] Visible overshoot past origin
- [ ] Smooth settle (no jitter)
- [ ] 1s cooldown works
- [ ] Tension brightness visible before snap

---

## SYSTEM 5: CURL

### Wrap Schedule

```
Hover Time    Wrap State
──────────    ──────────
0 - 1.0s      Straight line approaching
1.0 - 2.0s    Tip touches bounding, begins curving
2.0 - 4.0s    Wrapping (up to 90°)
4.0 - 5.0s    Full wrap (up to 180°)
```

### Exact Values

```yaml
curl:
  bounding_radius: 0.03

  wrap:
    speed: 45  # degrees/second (0.785 rad/s)
    max: 180   # degrees (π radians)
    easing: ease-in-out-sine

  slowdown:
    start: 135  # degrees
    factor: 0.5  # Half speed in final 45°

  contact_glow:
    intensity: 1.5
    radius: 0.01

  grip_brightness:
    boost: 0.3  # +30% at full wrap
```

### Tangent Calculation

```javascript
// Calculate tangent point on cursor bounding circle
const angle = Math.acos(boundingRadius / distToCenter);
const baseAngle = Math.atan2(toCenter.y, toCenter.x);
const wrapDir = Math.sign(cross2D(toCenter, velocity));
const tangentAngle = baseAngle + wrapDir * angle;
```

### QA Checklist

- [ ] Never penetrates bounding circle
- [ ] Smooth Bezier (no kinks)
- [ ] Wrap increases with hover time
- [ ] Slows down in final 45°
- [ ] Different wrap directions per rope
- [ ] Contact glow visible
- [ ] Adjusts when cursor moves slowly

---

## EASING FUNCTIONS

```javascript
// Extension: Fast start, slow end
const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

// Snap retraction: Quick whip
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Curl: Smooth acceleration/deceleration
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

// General settle
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
```

---

## PRIORITY RANKING

If performance requires trade-offs, cut from bottom:

1. **snap_flash** - MUST be visible (the payoff moment)
2. **tension_brightness** - Primary tension indicator
3. **leading_edge_glow** - Makes extension feel energetic
4. **contact_glow** - Shows curl progress
5. **ignition_glow** - Spawn anticipation
6. **tension_thickness** - Subtle enhancement
7. **motion_trail** - Nice-to-have
8. **particle_burst** - Enhancement only
9. **tension_vibration** - Extreme tension only

---

## IMPLEMENTATION PROGRESS

### System 1: Structure
- [ ] Uniforms added
- [ ] 3-segment rendering working
- [ ] Additive blending enabled
- [ ] QA checklist passed

### System 2: Spawn
- [ ] Luminance sampling working
- [ ] Ignition glow animation
- [ ] Staggered spawning
- [ ] QA checklist passed

### System 3: Extension
- [ ] Easing functions implemented
- [ ] Leading edge glow
- [ ] Varied reach/speed
- [ ] QA checklist passed

### System 4: Snap
- [ ] Stretch detection
- [ ] Flash effect
- [ ] Whip physics
- [ ] Cooldown system
- [ ] QA checklist passed

### System 5: Curl
- [ ] Bounding collision
- [ ] Tangent calculation
- [ ] Progressive wrap
- [ ] QA checklist passed

---

*Last Updated: Phase 1 Implementation Start*
