# Engineer 3: Cursor Light Trails

**Status**: ⏳ Not Started
**Estimated Time**: 45 minutes
**Dependencies**: None (can run in parallel)
**Branch Name**: `claude/shader-cursor-trails`

---

## 🎯 Goal

Implement **Gmunk-inspired "light sculpting"** where cursor movement leaves decaying light trails in shader space. Make negative space feel interactive and alive.

---

## 📋 Task Description

Create a trail buffer system that:
1. Tracks last 20 cursor positions with timestamps
2. Passes trail data to shader
3. Renders exponentially decaying light influence
4. Creates "light deposit" effect

**Inspiration**: Gmunk's BOX installation where projection mapping responds to robot movement.

---

## 🔨 Implementation Steps

### Step 1: Create Trail Buffer System (20 min)

**File**: `src/components/ShaderVisual.jsx`

Add trail buffer ref after existing refs:

```javascript
const ShaderVisual = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  // ADD THIS:
  const trailBufferRef = useRef([]);
  const MAX_TRAIL_POINTS = 20;
```

Create trail update function:

```javascript
/**
 * Add cursor position to trail buffer with decay timestamp
 * Gmunk-inspired "light deposit" system
 */
const updateTrailBuffer = (x, y) => {
  const currentTime = Date.now();

  // Add new point
  trailBufferRef.current.unshift({
    x,
    y,
    time: currentTime,
    strength: 1.0, // Full strength when created
  });

  // Remove old points (keep last 20)
  if (trailBufferRef.current.length > MAX_TRAIL_POINTS) {
    trailBufferRef.current.pop();
  }

  // Calculate decay for all points
  trailBufferRef.current = trailBufferRef.current.map(point => {
    const age = currentTime - point.time;
    const decayTime = 2000; // 2 seconds to fully decay
    const strength = Math.max(0, 1.0 - (age / decayTime));

    return { ...point, strength };
  }).filter(point => point.strength > 0.01); // Remove nearly invisible points
};
```

---

### Step 2: Update Mouse Event Handler (10 min)

**Find existing `onMouseMove` handler** and update it:

```javascript
const onMouseMove = (e) => {
  const x = e.clientX / window.innerWidth;
  const y = 1 - e.clientY / window.innerHeight;

  // Update current mouse position (existing)
  material.uniforms.u_mouse.value.set(x, y);

  // ADD THIS: Update trail buffer
  updateTrailBuffer(x, y);

  // Update shader uniforms with trail data
  updateTrailUniforms(material);
};
```

Create trail uniform updater:

```javascript
/**
 * Convert trail buffer to shader uniforms
 * Passes last N trail points to fragment shader
 */
const updateTrailUniforms = (material) => {
  const trailCount = Math.min(trailBufferRef.current.length, 10); // Send max 10 points

  // Update trail count
  material.uniforms.u_trailCount.value = trailCount;

  // Update trail positions and strengths
  for (let i = 0; i < 10; i++) {
    if (i < trailCount) {
      const point = trailBufferRef.current[i];
      material.uniforms.u_trailPositions.value[i].set(point.x, point.y);
      material.uniforms.u_trailStrengths.value[i] = point.strength;
    } else {
      // Fill unused slots with zeros
      material.uniforms.u_trailPositions.value[i].set(0, 0);
      material.uniforms.u_trailStrengths.value[i] = 0;
    }
  }
};
```

---

### Step 3: Add Trail Uniforms to Material (10 min)

Update shader material uniforms:

```javascript
// Initialize trail arrays
const trailPositions = Array(10).fill(null).map(() => new THREE.Vector2(0, 0));
const trailStrengths = Array(10).fill(0);

const material = new THREE.ShaderMaterial({
  uniforms: {
    // ... existing uniforms ...

    // ADD THESE:
    u_trailCount: { value: 0 },
    u_trailPositions: { value: trailPositions },
    u_trailStrengths: { value: trailStrengths },
  },
  vertexShader,
  fragmentShader,
  transparent: true
});
```

---

### Step 4: Update Fragment Shader (15 min)

**File**: `src/shaders/truchet.frag.glsl`

Add uniforms at top:

```glsl
// Cursor trail system (Gmunk-inspired light sculpting)
uniform int u_trailCount;
uniform vec2 u_trailPositions[10];
uniform float u_trailStrengths[10];
```

Add trail influence function after harmonic motion section:

```glsl
/**
 * Calculate cursor trail light influence at given position
 * Gmunk-inspired: cursor deposits light that decays over time
 *
 * @param pos - Current fragment position
 * @return float - Light intensity (0.0-1.0)
 */
float getCursorTrailInfluence(vec2 pos) {
  float totalInfluence = 0.0;

  for (int i = 0; i < 10; i++) {
    if (i >= u_trailCount) break;

    vec2 trailPos = u_trailPositions[i];
    float strength = u_trailStrengths[i];

    // Distance from trail point
    float dist = distance(pos, trailPos);

    // Influence radius (0.15 = ~15% of screen)
    float radius = 0.15;

    // Smooth falloff
    float influence = smoothstep(radius, 0.0, dist) * strength;

    totalInfluence += influence;
  }

  // Clamp to reasonable range
  return min(totalInfluence, 1.0);
}
```

Apply trail influence in main function (find tile color line):

```glsl
// Before:
vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);

// After (add trail glow):
float trailGlow = getCursorTrailInfluence(st);
vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);
tileColor += vec3(trailGlow * 0.3); // Subtle additive glow
```

---

## ✅ Verification Checklist

### Build & Syntax
- [ ] JavaScript compiles (no TypeScript errors)
- [ ] GLSL compiles (no WebGL errors)
- [ ] `yarn build` successful

### Functionality
- [ ] Move cursor across screen
- [ ] See faint light trail following cursor
- [ ] Trail fades over ~2 seconds
- [ ] Multiple trails can exist simultaneously
- [ ] No performance drop (60fps maintained)

### Visual Tests
```bash
yarn dev

# Test 1: Single trail
- Move cursor slowly across screen
- Should see subtle glowing trail
- Trail should fade gradually

# Test 2: Multiple trails
- Move cursor in circular pattern
- Should see overlapping trails
- Intensity should accumulate

# Test 3: Route change
- Navigate to /about (low energy)
- Navigate to /projects (high energy)
- Trails should work on all routes
```

---

## 🎨 Visual Result

**What You Should See**:

1. **Cursor Movement**
   - Move cursor across screen
   - Subtle glowing trail appears behind cursor
   - Trail fades over 2 seconds

2. **Light Deposits**
   - Cursor "paints" light onto shader
   - Multiple trails can coexist
   - Overlapping trails brighten

3. **Subtlety**
   - Effect is noticeable but not overwhelming
   - Complements pattern, doesn't dominate
   - Gmunk aesthetic: "light as sculpture"

**Intensity Guide**:
- Too subtle? Increase `0.3` multiplier to `0.5`
- Too strong? Decrease to `0.2` or `0.15`
- Adjust to taste!

---

## 📊 Success Criteria

- [x] Trail buffer system working
- [x] Cursor positions tracked
- [x] Decay calculation correct (2 second fade)
- [x] Shader receives trail data
- [x] Visual trails visible
- [x] Performance maintained (60fps)
- [x] Works across all routes

---

## 🔗 Integration with Other Engineers

**Uses from Engineer 1**:
- Can optionally use `u_complexity` to vary trail density

**Complements Engineer 2**:
- Trails move with harmonic motion of background pattern
- Creates layered interactive effect

**Enhances Engineer 4**:
- Trails interact with multi-layer pattern system

---

## 💡 Notes & Tips

### Gmunk's Philosophy

> "Light as sculptural medium. Stage magic through illuminated geometry."

**BOX Installation** (2013):
- Robot arms move projection-mapped boxes
- Projection creates "light deposits" on surfaces
- Real-time choreography between physical and light

**Portfolio Parallel**:
- Cursor = robot arm
- Trail = projection mapping
- Shader = physical surface

---

### Performance Optimization

**Why limit to 10 trail points?**
- GLSL arrays have fixed size limits
- 10 points = 2 seconds at 5 samples/sec
- More points = more GPU calculations
- 10 is sweet spot: visible trails without performance hit

**Why exponential decay?**
```javascript
strength = 1.0 - (age / decayTime)
```
Linear decay feels mechanical. Could make it exponential:
```javascript
strength = Math.exp(-age / decayTime)
```
Try both! Exponential feels more organic.

---

### Tuning Parameters

**Trail Settings** (adjust to taste):

```javascript
MAX_TRAIL_POINTS: 20     // Storage buffer size
trailCount: 10           // Points sent to shader
decayTime: 2000          // 2 seconds (try 1500 or 3000)
radius: 0.15             // Influence radius (try 0.1-0.2)
glowMultiplier: 0.3      // Intensity (try 0.2-0.5)
```

---

## 🚨 Common Issues

**Issue**: No trails visible
**Fix**:
- Check console for WebGL errors
- Verify `u_trailCount > 0` in shader
- Increase glow multiplier (0.3 → 0.5)

**Issue**: Trails too intense/overwhelming
**Fix**: Reduce glow multiplier (0.3 → 0.15)

**Issue**: Trails stutter or jank
**Fix**:
- Check FPS (should be 60)
- Reduce MAX_TRAIL_POINTS (20 → 15)
- Reduce points sent to shader (10 → 7)

**Issue**: Trails persist after route change
**Fix**: Clear trail buffer on route change:
```javascript
useEffect(() => {
  trailBufferRef.current = []; // Clear on route change
}, [location.pathname]);
```

---

## 🎯 Performance Benchmark

**Target**: 60fps maintained

**Measurements**:
```bash
# Before cursor trails:
FPS: 60
GPU: ~30%

# After cursor trails (expected):
FPS: 60
GPU: ~32-35%

# If FPS drops below 55:
- Reduce trail count (10 → 7)
- Reduce MAX_TRAIL_POINTS (20 → 15)
- Increase decay time (2000 → 1500)
```

---

## 📸 Screenshots to Take

1. **Cursor trail screenshot** - Show subtle glow following cursor
2. **Multiple trails** - Circular pattern showing overlapping trails
3. **Decay sequence** - T=0, T=1s, T=2s showing fade

---

## 🎯 When You're Done

1. Verify trails visible and smooth
2. Test performance (60fps check)
3. Adjust intensity if needed
4. Create PR: `claude/shader-cursor-trails`
5. Mark task complete: ✅
6. Update `tasks/README.md` progress

---

**Status**: ⏳ → ✅ (update when complete)
**Time Taken**: ___ minutes
**FPS Impact**: Before: ___ / After: ___
**Intensity Setting**: ___ (0.0-1.0)
