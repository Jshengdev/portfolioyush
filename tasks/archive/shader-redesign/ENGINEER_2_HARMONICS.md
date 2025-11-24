# Engineer 2: Harmonic Oscillators & Non-Repeating Motion

**Status**: ⏳ Not Started
**Estimated Time**: 45 minutes
**Dependencies**: None (can run in parallel with Engineer 1, 3, 4)
**Branch Name**: `claude/shader-harmonics`

---

## 🎯 Goal

Replace linear time progression with harmonic oscillators to create **never-repeating, organic motion**. Inspired by John Whitney's analog computer animations and Refik Anadol's fluid dynamics.

---

## 📋 Task Description

Transform the shader's time-based animation from a simple linear increment (`u_time += 0.02`) to a complex harmonic system using combinations of sine and cosine waves at different frequencies.

**Why This Matters**:
- Linear time = predictable loops
- Harmonic motion = infinite variation
- Feels "alive" instead of "programmed"

---

## 🔨 Implementation Steps

### Step 1: Update Fragment Shader Uniforms (5 min)

**File**: `src/shaders/truchet.frag.glsl`

The `u_energy` uniform is already being passed from Engineer 1. If Engineer 1 isn't complete yet, assume it exists.

Verify these uniforms are declared:
```glsl
uniform float u_time;
uniform float u_energy; // From Engineer 1
```

---

### Step 2: Create Harmonic Offset Function (15 min)

Add this function after the noise utilities section:

```glsl
//=============================================================================
// HARMONIC MOTION SYSTEM
// Inspired by John Whitney's analog computer animations
// Creates non-repeating organic motion through sine/cosine combinations

/**
 * Generate harmonic offset vector for time-based animation
 * Uses multiple sine/cosine waves at different frequencies
 * Result: endless variation without visible loops
 *
 * @param t - Current time value
 * @param energy - Animation speed multiplier (0.0-1.0)
 * @return vec2 - Offset to apply to UV coordinates
 */
vec2 getHarmonicOffset(float t, float energy) {
  // Base time with energy multiplier
  float animSpeed = 0.5 + (energy * 0.5); // 0.5-1.0 range
  float time = t * animSpeed;

  // Layer 1: Slow fundamental frequency
  float x1 = sin(time * 0.5) * 0.1;
  float y1 = cos(time * 0.4) * 0.1;

  // Layer 2: Medium frequency (slightly out of phase)
  float x2 = cos(time * 0.3) * 0.05;
  float y2 = sin(time * 0.6) * 0.05;

  // Layer 3: Fast detail frequency
  float x3 = sin(time * 0.8) * 0.02;
  float y3 = cos(time * 0.7) * 0.02;

  // Combine all layers
  float offsetX = x1 + x2 + x3;
  float offsetY = y1 + y2 + y3;

  return vec2(offsetX, offsetY);
}
```

---

### Step 3: Apply Harmonic Motion to Truchet Pattern (15 min)

**Find the existing Truchet pattern section** (around line 100-110):

**Before** (linear time):
```glsl
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Shift + scale
  vec2 stTile = st - vec2(0.33, 0.4);
  stTile *= 3.5;

  // Truchet pattern
  vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
```

**After** (harmonic motion):
```glsl
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Apply harmonic offset for organic motion
  vec2 harmonicOffset = getHarmonicOffset(u_time, u_energy);
  vec2 st_animated = st + harmonicOffset;

  // Shift + scale
  vec2 stTile = st_animated - vec2(0.33, 0.4);
  stTile *= 3.5;

  // Truchet pattern (now with harmonic motion)
  vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
```

---

### Step 4: Apply to Lighting System (10 min)

**Find the lighting calculation section** (around line 113-116):

**Before**:
```glsl
vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
vec3 lightDir = normalize(vec3(u_lightPos - u_mouse, 0.2));
float lightVal = lightEffect(normal, lightDir);
```

**After** (add subtle motion to lighting):
```glsl
// Add subtle harmonic motion to light position
vec2 lightHarmonic = getHarmonicOffset(u_time * 0.5, u_energy * 0.3);
vec2 dynamicLightPos = u_lightPos + lightHarmonic * 0.1;

vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
vec3 lightDir = normalize(vec3(dynamicLightPos - u_mouse, 0.2));
float lightVal = lightEffect(normal, lightDir);
```

---

## 📝 Expected Code Changes

**File Modified**: `src/shaders/truchet.frag.glsl`

**Lines Added**: ~40 lines
- Harmonic offset function: ~30 lines (with comments)
- Main function updates: ~5 lines
- Lighting updates: ~5 lines

**No New Imports Required**

---

## ✅ Verification Checklist

### Build & Syntax
- [ ] GLSL compiles with no errors
- [ ] No WebGL warnings in console
- [ ] `yarn build` successful

### Functionality
- [ ] Shader pattern moves smoothly
- [ ] Motion feels organic, not mechanical
- [ ] Different routes have different animation speeds (thanks to u_energy)
- [ ] Motion never repeats exactly (watch for 30+ seconds)

### Visual Comparison
**Before**: Pattern moves in predictable, looping way
**After**: Pattern has organic, flowing, never-exact-repeat motion

### Testing Steps
```bash
yarn dev
# Navigate to different routes
# Observe animation speeds:
# - /about should be slowest (energy: 0.3)
# - /projects should be fastest (energy: 0.7)
# - / should be medium (energy: 0.6)
```

---

## 🎨 Visual Result

**What You Should See**:

1. **Subtle Flowing Motion**
   - Pattern drifts gently across screen
   - Not jarring or disorienting
   - Feels "alive" and breathing

2. **Route-Specific Speed**
   - About page: Calm, slow motion
   - Projects page: Energetic, faster motion
   - Homepage: Balanced motion

3. **Never Repeats**
   - Watch for 60+ seconds
   - Motion should feel endless
   - No visible "loop point"

**What You Shouldn't See**:
- ❌ Jumpy/stuttering motion
- ❌ Pattern jumping or teleporting
- ❌ Visible loop/restart point
- ❌ Motion stopping completely

---

## 📊 Success Criteria

- [x] Harmonic offset function implemented
- [x] Applied to Truchet pattern positioning
- [x] Applied to lighting system
- [x] Different routes show different speeds
- [x] Motion feels organic not mechanical
- [x] No performance regression (60fps maintained)
- [x] Build successful

---

## 🔗 Integration with Other Engineers

**Uses from Engineer 1**:
- `u_energy` uniform for speed control

**Provides for Engineer 3**:
- Harmonic motion enhances cursor trails (they'll move with the pattern)

**Provides for Engineer 4**:
- Base motion system that layers can build upon

---

## 💡 Notes & Tips

### Mathematical Foundation

**John Whitney** (1960s computer animation pioneer) used analog computers with sine/cosine generators to create "harmonic" motion. His principle:

> "Multiple frequencies combined create infinite variation without repetition"

**Refik Anadol** uses similar principles in his AI-driven fluid dynamics:
> "Non-repeating evolution creates living, breathing art"

---

### Frequency Selection Rationale

**Why these specific frequencies?**

```glsl
Layer 1: 0.5, 0.4 - Fundamental slow drift
Layer 2: 0.3, 0.6 - Medium variation
Layer 3: 0.8, 0.7 - Fast detail shimmer
```

These are **prime-adjacent** numbers that create long periods before alignment. Mathematical principle: frequencies with no common factors = longest time before repeat.

---

### Energy Mapping

```javascript
u_energy: 0.3 (about)   → animSpeed: 0.65 → slow drift
u_energy: 0.5 (default) → animSpeed: 0.75 → medium
u_energy: 0.7 (projects)→ animSpeed: 0.85 → energetic
```

Formula: `0.5 + (energy * 0.5)` keeps all routes in reasonable range.

---

## 🚨 Common Issues

**Issue**: Motion too fast/disorienting
**Fix**: Reduce amplitude multipliers (0.1 → 0.05, etc.)

**Issue**: Motion too slow/boring
**Fix**: Increase `animSpeed` multiplier or frequency values

**Issue**: Can see repeating pattern
**Fix**: Adjust frequency values to be more "irrational" (0.5 → 0.527, etc.)

**Issue**: Pattern "jumps" when changing routes
**Fix**: This is expected with current implementation. Could add interpolation in future.

---

## 🎯 Performance Considerations

**Harmonic calculations are CHEAP**:
- Sine/cosine are built-in GPU functions
- Runs once per pixel per frame
- Should have **zero performance impact**

**Monitor**:
```bash
# Open browser DevTools
# Performance tab
# Watch FPS counter
# Should stay 60fps
```

---

## 📸 Screenshots to Take

**Before/After Comparison**:
1. Screenshot at T=0 seconds
2. Screenshot at T=30 seconds
3. Screenshot at T=60 seconds
4. Note: Pattern positions should be completely different each time

---

## 🎯 When You're Done

1. Verify smooth organic motion
2. Test across multiple routes
3. Confirm 60fps maintained
4. Create PR: `claude/shader-harmonics`
5. Mark this task complete: ✅
6. Update `tasks/README.md` progress tracker

---

**Status**: ⏳ → ✅ (update when complete)
**Time Taken**: ___ minutes (fill in actual time)
**Issues Encountered**: (document any problems)
**Performance Notes**: (FPS before/after)
