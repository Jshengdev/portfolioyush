# V19: Galaxy Shader - Technical Documentation

**Created**: 2025-11-27
**Experiment**: V19 Galaxy
**Status**: Production
**Visual**: Procedural spiral galaxy with differential rotation

---

## Quick Reference

| File | Purpose |
|------|---------|
| [`src/shaders/experiments/galaxy.frag.glsl`](../../src/shaders/experiments/galaxy.frag.glsl) | Main GLSL fragment shader (436 lines) |
| [`src/components/experiments/v19/index.jsx`](../../src/components/experiments/v19/index.jsx) | React component wrapper |
| [`src/components/experiments/experimentConfig.js`](../../src/components/experiments/experimentConfig.js) | Experiment metadata (line 118-123) |

---

## Visual Overview

The Galaxy shader creates a **procedural spiral galaxy** with:
- Two logarithmic spiral arms (180° apart)
- Central hot bulge (yellow-white glow)
- Thousands of stars with temperature-based colors
- Differential rotation (inner stars orbit faster)
- Galactic dust lanes
- Mouse-controlled viewing angle

---

## Core Techniques (Reusable Patterns)

### 1. Cube Root Distribution for Uniform Density

**Problem**: Random `x, y` coordinates cluster at the center.

**Solution**: Use cube root for radius distribution.

```glsl
// File: galaxy.frag.glsl:197
float randRadius = pow(hash21(cellID * 7.13 + layer), 0.333);
```

**Why it works**: Volume scales with r³, so taking the cube root compensates, giving even density throughout a sphere/disk.

**Use cases**: Star fields, particle systems, any radial distribution.

---

### 2. Logarithmic Spiral Arms

**Equation**: `r = a × e^(b × θ)` or inverted: `θ = ln(r/a) / b`

```glsl
// File: galaxy.frag.glsl:129-132
float spiralAngle = log(max(r, 0.001) / 0.02) / SPIRAL_TIGHTNESS;
spiralAngle += armOffset;  // 0 or PI for two arms
spiralAngle += time * 0.05;  // Slow rotation
```

**Parameters**:
- `a = 0.02`: Starting radius (how close spiral starts to center)
- `b = SPIRAL_TIGHTNESS (0.3)`: How tight the spiral winds (lower = tighter)

**Density falloff from arm center**:
```glsl
// File: galaxy.frag.glsl:137-144
float angleDiff = mod(theta - spiralAngle + PI, TWO_PI) - PI;
float armWidth = 0.3 + r * 0.5;  // Wider at edges
float armStrength = exp(-abs(angleDiff) / armWidth);
```

**Use cases**: Galaxy arms, hurricane patterns, shell spirals, DNA helix.

---

### 3. Blackbody Star Colors (Temperature Mapping)

Maps a temperature factor (0-1) to realistic star colors following stellar classification.

```glsl
// File: galaxy.frag.glsl:80-113
vec3 starColor(float temp) {
    // M-type (cool, red-orange) → O-type (hot blue)
    vec3 colorM = vec3(1.0, 0.5, 0.2);   // temp < 0.15
    vec3 colorK = vec3(1.0, 0.7, 0.4);   // 0.15-0.35
    vec3 colorG = vec3(1.0, 0.9, 0.7);   // 0.35-0.5 (Sun-like)
    vec3 colorF = vec3(1.0, 0.95, 0.9);  // 0.5-0.65
    vec3 colorA = vec3(0.9, 0.9, 1.0);   // 0.65-0.85
    vec3 colorB = vec3(0.7, 0.8, 1.0);   // 0.85-1.0
    vec3 colorO = vec3(0.6, 0.7, 1.0);   // 1.0 (hottest)

    // Blend through sequence based on temp...
}
```

**Real-world reference**:

| Type | Color | Temperature | Example |
|------|-------|-------------|---------|
| M | Red-orange | ~3,000K | Betelgeuse |
| K | Orange | ~4,500K | Arcturus |
| G | Yellow | ~5,500K | Sun |
| F | Yellow-white | ~6,500K | Procyon |
| A | White | ~8,500K | Sirius |
| B | Blue-white | ~20,000K | Rigel |
| O | Blue | ~40,000K | Rare, very hot |

**Use cases**: Any heat visualization, data viz gradients, fire/plasma effects.

---

### 4. Three-Zone Soft Edge Falloff

Prevents hard circular boundaries for organic-looking edges.

```glsl
// File: galaxy.frag.glsl:156-172
float densityFalloff(float r) {
    float normalizedR = r / GALAXY_RADIUS;

    // Core zone (0-85%): full density
    if (normalizedR < 0.85) {
        return 1.0;
    }
    // Transition zone (85-100%): linear fade
    else if (normalizedR < 1.0) {
        return mix(1.0, 0.5, (normalizedR - 0.85) / 0.15);
    }
    // Outlier zone (100-200%): exponential decay
    else {
        float excess = normalizedR - 1.0;
        return 0.5 * exp(-excess * 3.0);
    }
}
```

**Zone breakdown**:

| Zone | Radius Range | Density | Behavior |
|------|--------------|---------|----------|
| Core | 0-85% | 100% | Full density |
| Transition | 85-100% | 100%→50% | Linear fade |
| Outlier | 100-200% | 50%→~8% | Exponential decay |

**Use cases**: Any circular/radial effect that needs soft edges (explosions, auras, fog).

---

### 5. Differential Rotation (Kepler-Inspired)

Inner objects orbit faster than outer objects, creating the classic spiral "wind-up" effect.

```glsl
// File: galaxy.frag.glsl:204-207, 365-367
// Angular velocity ∝ 1/√r
float angularVel = 1.0 / (sqrt(max(starR, 0.05)) * 5.0);
float rotatedTheta = starTheta + time * angularVel * 0.3;
```

**Physics basis**: Kepler's third law states orbital period² ∝ radius³, so angular velocity ∝ 1/√r.

**Use cases**: Any rotating system (solar system, accretion disk, whirlpool).

---

### 6. Grid-Based Star Rendering

Efficient technique for rendering thousands of procedural stars without actual particles.

```glsl
// File: galaxy.frag.glsl:343-408
vec2 gridUV = layerUV * scale;
vec2 gridID = floor(gridUV);
vec2 gridFract = fract(gridUV);

// Check 3x3 neighborhood
for (float y = -1.0; y <= 1.0; y++) {
    for (float x = -1.0; x <= 1.0; x++) {
        vec2 cellID = gridID + vec2(x, y);
        vec2 starOffset = hash22(cellID);  // Random position in cell

        // Calculate distance to star, render if close enough
        float dist = length(gridFract - rotatedLocal);
        float brightness = smoothstep(starSize, 0.0, dist);
    }
}
```

**Why 3x3 neighborhood?** Stars near cell edges could be visible from adjacent cells.

**Performance**: O(9) per pixel regardless of star count (vs O(n) for actual particles).

**Use cases**: Starfields, rain, snow, any dense point-based effect.

---

### 7. Hash Functions for Procedural Randomness

High-quality pseudo-random functions for consistent, repeatable randomness.

```glsl
// File: galaxy.frag.glsl:48-59

// 2D → 1D hash (returns float 0-1)
float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

// 2D → 2D hash (returns vec2, each component 0-1)
vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}
```

**Key property**: Same input always produces same output (deterministic).

**Use cases**: Any procedural content (noise, terrain, textures, particle positions).

---

### 8. Mouse-Based Viewing Angle

Interactive camera control using mouse position.

```glsl
// File: galaxy.frag.glsl:304-318
vec2 mouseOffset = (u_mouse - 0.5) * 0.3;

// Rotate view based on horizontal mouse
float viewAngle = mouseOffset.x * PI * 0.25;
mat2 viewRot = mat2(cos(viewAngle), -sin(viewAngle),
                    sin(viewAngle), cos(viewAngle));
uv = viewRot * uv;

// Compress Y for edge-on tilt effect
uv.y *= 1.0 + abs(mouseOffset.y) * 0.3;
```

**Effect**:
- Mouse left/right: Orbits around the galaxy
- Mouse up/down: Tilts between face-on and edge-on views

**Use cases**: Any 3D-like effect in 2D shaders (orbiting objects, perspective shifts).

---

### 9. Star Twinkle Animation

Subtle brightness variation using phase-shifted sine waves.

```glsl
// File: galaxy.frag.glsl:391
float twinkle = 0.7 + 0.3 * sin(time * 4.0 + hash21(cellID) * TWO_PI);
```

**Breakdown**:
- `0.7 + 0.3 * ...`: Oscillates between 0.4 and 1.0 (never fully off)
- `hash21(cellID) * TWO_PI`: Unique phase per star (not synchronized)
- `time * 4.0`: Speed of twinkle

**Use cases**: Twinkling stars, flickering lights, pulsing elements.

---

### 10. Theme-Aware Blending

Adapts rendering for dark and light modes.

```glsl
// File: galaxy.frag.glsl:325-327, 414-426
float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
bool isDarkMode = bgBrightness < 0.5;

if (isDarkMode) {
    // Additive blending - stars pop against black
    color = u_backgroundColor;
    color += dust;
    color += bulge;
    color += starColors * 1.2;
} else {
    // Subtle overlay for light mode
    float intensity = 0.4;
    vec3 galaxyColor = dust + bulge + starColors;
    color = mix(u_backgroundColor, galaxyColor, intensity);
}
```

**Use cases**: Any shader that needs to work in both light and dark themes.

---

## Constants Reference

```glsl
// File: galaxy.frag.glsl:35-41
#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define NUM_ARMS 2.0              // Number of spiral arms
#define SPIRAL_TIGHTNESS 0.3      // Lower = tighter spiral
#define GALAXY_RADIUS 0.45        // Size of galaxy (normalized)
#define BULGE_RADIUS 0.08         // Size of central bulge
#define NUM_STAR_LAYERS 5         // Depth layers for stars
```

**Tuning tips**:
- `NUM_ARMS`: Try 3 or 4 for different galaxy types
- `SPIRAL_TIGHTNESS`: 0.1 = very tight, 0.5 = loose
- `GALAXY_RADIUS`: Increase for larger galaxy
- `NUM_STAR_LAYERS`: More = denser but slower

---

## Component Structure

### galaxy.frag.glsl Functions

| Function | Lines | Purpose |
|----------|-------|---------|
| `hash21(vec2)` | 48-52 | 2D→1D hash for randomness |
| `hash22(vec2)` | 55-59 | 2D→2D hash for star positions |
| `noise(vec2)` | 62-73 | Value noise for dust turbulence |
| `starColor(float)` | 80-113 | Temperature→RGB color mapping |
| `spiralArmDensity(r, theta, time)` | 121-150 | Calculate spiral arm strength |
| `densityFalloff(r)` | 156-172 | Three-zone edge softening |
| `starField(uv, scale, time, layer)` | 178-246 | Grid-based star rendering |
| `galacticDust(uv, time)` | 252-273 | Dust lane generation |
| `centralBulge(uv)` | 279-294 | Core glow effect |
| `main()` | 300-436 | Main shader composition |

---

## Performance Considerations

| Technique | Impact | Mitigation |
|-----------|--------|------------|
| 5 star layers × 9 cells = 45 iterations | Medium | Reduce `NUM_STAR_LAYERS` on mobile |
| `spiralArmDensity` called per star | Medium | Results could be cached in texture |
| `log()` and `exp()` functions | Low | These are hardware-optimized |
| `atan()` for polar conversion | Low | Hardware-optimized |

**Mobile optimization**: Reduce `NUM_STAR_LAYERS` to 3 and increase grid scale.

---

## Borrowing Techniques

### Want just the starfield?
Copy these functions:
- `hash21`, `hash22` (lines 48-59)
- Grid-based rendering loop (lines 343-408)

### Want just the spiral pattern?
Copy these functions:
- `spiralArmDensity` (lines 121-150)
- Use result as alpha/brightness multiplier

### Want just the color ramp?
Copy:
- `starColor` function (lines 80-113)
- Works for any 0-1 temperature input

### Want soft circular edges?
Copy:
- `densityFalloff` function (lines 156-172)
- Adjust `GALAXY_RADIUS` for your use case

---

## Related Experiments

| Experiment | Shared Technique |
|------------|------------------|
| V1 Aurora | Layered sine waves, noise |
| V3 Bloom | Additive glow blending |
| V12 Constellation | Grid-based point rendering |
| V17 Atmosphere | Noise-based volumetrics |

---

## References

- **Galaxy Simulator PRD**: Original requirements document
- **Kepler's Laws**: [Wikipedia](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion)
- **Stellar Classification**: [Wikipedia](https://en.wikipedia.org/wiki/Stellar_classification)
- **Logarithmic Spiral**: [Wikipedia](https://en.wikipedia.org/wiki/Logarithmic_spiral)

---

## Changelog

| Date | Change |
|------|--------|
| 2025-11-27 | Initial creation as V19 |

---

**Document Version**: 1.0
**Maintained by**: Claude Code
