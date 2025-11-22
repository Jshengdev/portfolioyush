# Engineer 4: Multi-Layer Pattern System

**Status**: ⏳ Not Started  
**Estimated Time**: 45 minutes  
**Dependencies**: None (can run in parallel)  
**Branch Name**: `claude/shader-layers`

---

## 🎯 Goal

Create perceptual **z-depth** through layered noise patterns at different scales. Inspired by SANAA's "transparent becomes opaque" principle and Refik Anadol's fluid layer blending.

---

## 📋 Task Description

Replace single-layer Truchet pattern with **3 noise layers** that create dimensional depth:
- **Layer 1** (scale 2.0): Large, slow-moving forms (background)
- **Layer 2** (scale 4.0): Medium detail (mid-ground)
- **Layer 3** (scale 8.0): Fine detail (foreground)

Blend layers using `u_depth` attribute from Engineer 1.

---

## 🔨 Implementation Steps

### Step 1: Create Multi-Scale Noise Function (15 min)

**File**: `src/shaders/truchet.frag.glsl`

Add after existing noise function:

```glsl
/**
 * Multi-layer noise for perceived depth
 * SANAA principle: "Many transparent layers create opacity"
 *
 * @param st - UV coordinates  
 * @param depth - Depth attribute (0.0-1.0)
 * @param time - Animated time value
 * @return float - Blended noise value
 */
float layeredNoise(vec2 st, float depth, float time) {
  // Layer 1: Large slow forms (background)
  float layer1 = noise(st * 2.0 + time * 0.05);
  
  // Layer 2: Medium detail (mid-ground)
  float layer2 = noise(st * 4.0 + time * 0.08);
  
  // Layer 3: Fine detail (foreground)
  float layer3 = noise(st * 8.0 + time * 0.12);
  
  // Weighted blending based on depth attribute
  // Low depth (0.0) = mostly layer 1 (flat)
  // High depth (1.0) = all layers (dimensional)
  float weight1 = 1.0;
  float weight2 = depth * 0.5;
  float weight3 = depth * depth * 0.3; // Quadratic for subtle foreground
  
  float totalWeight = weight1 + weight2 + weight3;
  
  return (layer1 * weight1 + layer2 * weight2 + layer3 * weight3) / totalWeight;
}
```

---

### Step 2: Replace Truchet with Layered System (20 min)

**Find main() function Truchet pattern section**:

**Before** (single pattern):
```glsl
vec2 stTile = st_animated - vec2(0.33, 0.4);
stTile *= 3.5;
vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);
```

**After** (multi-layer system):
```glsl
// Multi-layer noise system
float layeredPattern = layeredNoise(st_animated, u_depth, u_time);

// Apply focus attribute (sharpness)
float contrast = 0.5 + (u_focus * 0.5); // 0.5-1.0 range
layeredPattern = pow(layeredPattern, 1.0 / contrast);

// Combine with lighting
vec3 patternColor = vec3(layeredPattern * lightVal);

// Keep Truchet as subtle overlay (optional - can remove if too busy)
vec2 stTile = st_animated - vec2(0.33, 0.4);
stTile *= 3.5;
vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
vec3 truchetOverlay = vec3(tVal.x * tVal.y) * 0.1; // Very subtle

vec3 tileColor = patternColor + truchetOverlay + vec3(sphereEf);
```

---

### Step 3: Add Parallax Mouse Movement (10 min)

Create depth-based parallax effect with mouse:

```glsl
// In main(), before layeredNoise call:

// Parallax offset based on mouse and depth
vec2 parallaxOffset = (u_mouse - 0.5) * u_depth * 0.05;
vec2 st_parallax = st_animated + parallaxOffset;

// Use st_parallax instead of st_animated:
float layeredPattern = layeredNoise(st_parallax, u_depth, u_time);
```

**Result**: High-depth routes have subtle parallax, low-depth routes are static.

---

## ✅ Verification Checklist

### Build & Syntax
- [ ] GLSL compiles (no errors)
- [ ] `yarn build` successful

### Visual Tests
```bash
yarn dev

# Test depth variation:
/about (depth: 0.3)  → Mostly flat, minimal layers
/projects (depth: 0.7) → Rich depth, all layers visible
/archive (depth: 0.8)  → Maximum depth perception

# Test focus variation:
/about (focus: 0.7)  → Sharp, high contrast
/projects (focus: 0.6) → Balanced
```

### Parallax Test
- Move mouse left/right
- High-depth pages (projects/archive) should have subtle pattern shift
- Low-depth pages (about) should be mostly static

---

## 🎨 Visual Result

**What You Should See**:

**Low Depth (About page)**:
- Mostly layer 1 (large forms)
- Feels calm, minimal
- Little parallax movement

**High Depth (Projects page)**:
- All 3 layers visible
- Feels dimensional, rich
- Noticeable parallax on mouse move

**Focus Impact**:
- High focus: Sharp transitions
- Low focus: Soft, dreamy

---

## 📊 Success Criteria

- [x] 3-layer noise system working
- [x] Depth attribute controls layer blending
- [x] Focus attribute controls contrast
- [x] Parallax effect on mouse movement
- [x] Different routes show visual depth differences
- [x] 60fps maintained

---

## 💡 Notes

### SANAA Principle

> "Many layers of glass... as layers accumulate, glass changes from transparent to opaque"

**Portfolio Application**:  
Single noise = transparent/simple  
3 layers = dimensional/sophisticated

### Performance

3 noise calculations per pixel is **very cheap** on GPU. No performance impact expected.

---

## 🚨 Common Issues

**Issue**: Too busy/noisy  
**Fix**: Reduce weight2 and weight3 (0.5 → 0.3, 0.3 → 0.2)

**Issue**: Can't see depth difference  
**Fix**: Increase weight multipliers or test on /archive (depth: 0.8)

**Issue**: Parallax too strong  
**Fix**: Reduce `0.05` to `0.03`

---

## 🎯 When You're Done

1. Test all routes for depth variation
2. Verify parallax on mouse move
3. Create PR: `claude/shader-layers`
4. Mark complete: ✅

---

**Status**: ⏳ → ✅  
**Time Taken**: ___  
**Depth Most Visible On**: (route name)
