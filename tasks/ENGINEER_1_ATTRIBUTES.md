# Engineer 1: Shader Attribute System

**Status**: ⏳ Not Started
**Estimated Time**: 45 minutes
**Dependencies**: None (can run in parallel)
**Branch Name**: `claude/shader-attributes`

---

## 🎯 Goal

Create a semantic shader uniform system where visual characteristics are controlled by **meaningful attributes** rather than raw values. Inspired by ManvsMachine's "procedural attribute systems."

---

## 📋 Task Description

Design and implement a route-based shader personality system where each route has a visual "personality" defined by 5 semantic attributes:

1. **complexity** (0.0-1.0) - Pattern density/detail level
2. **energy** (0.0-1.0) - Animation speed/movement intensity
3. **focus** (0.0-1.0) - Contrast/sharpness/clarity
4. **warmth** (0.0-1.0) - Color temperature (cool to warm)
5. **depth** (0.0-1.0) - Perceived z-space layering

---

## 🔨 Implementation Steps

### Step 1: Define Route Personalities (15 min)

**File**: `src/components/ShaderVisual.jsx`

Add this configuration object after imports:

```javascript
/**
 * Shader personality configuration per route
 * Based on ManvsMachine's procedural attribute system
 *
 * Attributes (all 0.0-1.0):
 * - complexity: Pattern density (0=sparse, 1=dense)
 * - energy: Animation speed (0=slow/calm, 1=fast/energetic)
 * - focus: Contrast/sharpness (0=soft, 1=sharp)
 * - warmth: Color temperature (0=cool, 1=warm)
 * - depth: Z-space layering (0=flat, 1=deep)
 */
const shaderPersonalities = {
  '/': {
    // Homepage: Confident, balanced, welcoming
    complexity: 0.5,
    energy: 0.6,
    focus: 0.5,
    warmth: 0.5,
    depth: 0.4,
  },
  '/about': {
    // About: Contemplative, calm, personal
    complexity: 0.3,
    energy: 0.3,
    focus: 0.7,
    warmth: 0.6,
    depth: 0.3,
  },
  '/projects': {
    // Projects: Energetic, structured, professional
    complexity: 0.8,
    energy: 0.7,
    focus: 0.6,
    warmth: 0.4,
    depth: 0.7,
  },
  '/archive': {
    // Archive: Dense, archival, layered
    complexity: 0.9,
    energy: 0.5,
    focus: 0.5,
    warmth: 0.5,
    depth: 0.8,
  },
  '/contact': {
    // Contact: Open, inviting, warm
    complexity: 0.4,
    energy: 0.4,
    focus: 0.6,
    warmth: 0.7,
    depth: 0.4,
  },
  // Project detail pages: Contextual, focused
  'default': {
    complexity: 0.6,
    energy: 0.5,
    focus: 0.7,
    warmth: 0.5,
    depth: 0.5,
  }
};
```

---

### Step 2: Add Route Detection (10 min)

Inside the `ShaderVisual` component, add route detection:

```javascript
import { useLocation } from 'react-router-dom';

const ShaderVisual = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation(); // ADD THIS

  // Get personality for current route
  const getPersonality = (path) => {
    return shaderPersonalities[path] || shaderPersonalities['default'];
  };

  const currentPersonality = getPersonality(location.pathname);
```

---

### Step 3: Add Uniforms to Shader Material (15 min)

Update the shader material uniforms to include the 5 attributes:

```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 1.0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_lightPos: { value: new THREE.Vector2(0.5, 0.5) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_backgroundColor: { value: bgColor },

    // ADD THESE NEW UNIFORMS:
    u_complexity: { value: currentPersonality.complexity },
    u_energy: { value: currentPersonality.energy },
    u_focus: { value: currentPersonality.focus },
    u_warmth: { value: currentPersonality.warmth },
    u_depth: { value: currentPersonality.depth },
  },
  vertexShader,
  fragmentShader,
  transparent: true
});
```

---

### Step 4: Update Effect Dependencies (5 min)

Make sure the shader re-renders when route changes:

```javascript
// Update dependency array to include location.pathname
}, [isDarkMode, location.pathname]);
```

---

## 📝 Expected Code Changes

**File Modified**: `src/components/ShaderVisual.jsx`

**Lines Added**: ~60-70 lines (config object + route detection)

**New Imports**:
```javascript
import { useLocation } from 'react-router-dom';
```

---

## ✅ Verification Checklist

### Build & Syntax
- [ ] Code compiles with no TypeScript errors
- [ ] No ESLint warnings
- [ ] `yarn build` successful

### Functionality
- [ ] Navigate to `/` - shader receives homepage personality
- [ ] Navigate to `/about` - shader receives about personality
- [ ] Navigate to `/projects` - shader receives projects personality
- [ ] Console log uniforms to verify values change per route
- [ ] Project detail pages use 'default' personality

### Testing Steps
```bash
yarn dev
# Open browser console
# Add this temporarily to verify:
console.log('Personality:', currentPersonality);
# Navigate between routes
# Confirm console logs show different values
```

---

## 🎨 Visual Result (At This Stage)

**What Changes**:
- Uniforms are being passed to shader
- Values change when navigating routes

**What Doesn't Change Yet**:
- Visual appearance (shader doesn't use these uniforms yet)
- That's expected! Engineers 2-4 will use these attributes

**This is infrastructure** - next engineers will make it visible.

---

## 📊 Success Criteria

- [x] shaderPersonalities config object created
- [x] Route detection working
- [x] Uniforms passed to shader material
- [x] Values update on route change
- [x] Build successful
- [x] No console errors

---

## 🔗 What's Next

**Engineer 2** will use `u_energy` to control harmonic motion speed
**Engineer 3** will use `u_complexity` to control cursor trail density
**Engineer 4** will use `u_depth` to control layer blending

Your attribute system is the **foundation** for all subsequent engineers.

---

## 💡 Notes & Tips

### Why These 5 Attributes?

**complexity**: Saul Bass used simple vs complex shapes for emotional coding
**energy**: Territory Studio's "choreographic timing" principle
**focus**: Gmunk's sharpness variations in light sculptures
**warmth**: Luis Barragán's color temperature psychology
**depth**: SANAA's layered transparency creating z-perception

### Personality Rationale

**Homepage (balanced)**: Welcoming but not overwhelming
**About (calm)**: Reading-focused, low distraction
**Projects (energetic)**: Showcasing work, high energy
**Archive (dense)**: Rich, archival feeling
**Contact (warm)**: Inviting, approachable

Feel free to adjust values based on visual preference!

---

## 🚨 Common Issues

**Issue**: Route changes don't update shader
**Fix**: Check dependency array includes `location.pathname`

**Issue**: Uniforms show as undefined in shader
**Fix**: Verify uniform names match exactly (u_complexity not uComplexity)

**Issue**: TypeScript errors on personality config
**Fix**: Consider adding type definition:
```typescript
type ShaderPersonality = {
  complexity: number;
  energy: number;
  focus: number;
  warmth: number;
  depth: number;
};
```

---

## 📸 Screenshots to Take

None needed at this stage (visual changes come later)

---

## 🎯 When You're Done

1. Test all routes change personality values
2. Verify build succeeds
3. Create PR: `claude/shader-attributes`
4. Mark this task as complete: ✅
5. Update `tasks/README.md` progress tracker

---

**Status**: ⏳ → ✅ (update when complete)
**Time Taken**: ___ minutes (fill in actual time)
**Issues Encountered**: (document any problems)
**Notes**: (any observations or improvements)
