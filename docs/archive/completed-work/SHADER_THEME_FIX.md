# Shader Background Theme Fix
**Date**: 2025-11-21
**Issue**: Light mode text invisible due to hardcoded black shader background
**Status**: ✅ **FIXED**

---

## 🔍 Problem Diagnosis

### What You Reported
**Screenshot showed**: Text visible in dark mode but completely invisible in light mode on the About page.

**Root Cause**: The shader background was **hardcoded to pure black** and didn't respond to theme changes.

**Technical Details**:
1. `ShaderVisual.jsx` had no knowledge of theme context
2. Fragment shader outputted pure black/dark colors (`vec3(0,0,0)`)
3. When theme toggled to light mode:
   - Text colors tried to invert (but About.jsx still had hardcoded white)
   - Shader stayed black
   - Result: White text on black background (looked okay)
4. BUT the proper behavior should be:
   - Light mode: Light background + dark text
   - Dark mode: Dark background + light text

---

## ✅ Solution Applied

### Fix 1: Make Shader Theme-Aware

**File**: `src/components/ShaderVisual.jsx`

**Changes**:
1. ✅ Import ThemeContext
2. ✅ Access `isDarkMode` from context
3. ✅ Add `u_backgroundColor` uniform
4. ✅ Set background color based on theme:
   - Dark mode: `vec3(0.05, 0.05, 0.05)` (very dark gray)
   - Light mode: `vec3(0.95, 0.95, 0.95)` (very light gray)
5. ✅ Re-run effect when theme changes

**Code Added**:
```javascript
import { ThemeContext } from '../context/ThemeContext';

const { isDarkMode } = useContext(ThemeContext);

const bgColor = isDarkMode
  ? new THREE.Vector3(0.05, 0.05, 0.05)  // Dark mode
  : new THREE.Vector3(0.95, 0.95, 0.95);  // Light mode

uniforms: {
  ...
  u_backgroundColor: { value: bgColor },
}

}, [isDarkMode]); // Re-run when theme changes
```

---

### Fix 2: Update Fragment Shader

**File**: `src/shaders/truchet.frag.glsl`

**Changes**:
1. ✅ Add `uniform vec3 u_backgroundColor;` declaration
2. ✅ Mix tile pattern with background color instead of pure black

**Before**:
```glsl
float shapeMask = 1.0 - ringVal;
vec3 finalColor = tileColor * shapeMask;
gl_FragColor = vec4(finalColor, 0.5);
```

**After**:
```glsl
float shapeMask = 1.0 - ringVal;
vec3 patternLayer = tileColor * shapeMask;
vec3 finalColor = u_backgroundColor + patternLayer * 0.15; // Subtle pattern over background
gl_FragColor = vec4(finalColor, 0.5);
```

**What This Does**:
- Background color comes from theme
- Truchet pattern is layered subtly on top (15% opacity)
- Dark mode: Dark gray background + subtle pattern
- Light mode: Light gray background + subtle pattern

---

### Fix 3: Update About.jsx Text Color

**File**: `src/components/About.jsx`

**Change**:
```javascript
// Before (hardcoded white):
color: rgba(255, 255, 255, 0.7);

// After (theme-aware):
color: ${props => props.theme.colors.text.secondary};
```

**Result**:
- Dark mode: Light text (readable on dark background)
- Light mode: Dark text (readable on light background)

---

## 🎨 Visual Result

### Dark Mode (Original Behavior)
```
Background: Very dark gray (0.05, 0.05, 0.05)
Pattern: Subtle truchet tiles
Text: Light gray (~70% white)
✅ High contrast, readable
```

### Light Mode (Now Fixed)
```
Background: Very light gray (0.95, 0.95, 0.95)
Pattern: Subtle truchet tiles (same pattern, different base)
Text: Dark gray (~70% black from theme)
✅ High contrast, readable
```

---

## 📊 Files Modified

1. **`src/components/ShaderVisual.jsx`**
   - Added ThemeContext import
   - Added isDarkMode detection
   - Added u_backgroundColor uniform
   - Re-renders on theme change

2. **`src/shaders/truchet.frag.glsl`**
   - Added u_backgroundColor uniform
   - Updated final color calculation
   - Pattern now overlays theme background

3. **`src/components/About.jsx`**
   - Text color uses theme reference
   - Inverts properly with theme

---

## 🧪 Testing Instructions

### Test Dark Mode
```bash
yarn dev
# Navigate to About page
# Text should be light gray on dark background ✅
```

### Test Light Mode
```bash
# Click theme toggle (bottom-right sun/moon button)
# About page should now show:
# - Very light gray background ✅
# - Dark gray text ✅
# - Subtle truchet pattern visible ✅
# - Text fully readable ✅
```

### Test Theme Switching
```bash
# Toggle between modes multiple times
# Shader should transition from dark to light background
# Text should transition from light to dark
# Both modes should be readable ✅
```

---

## 🔧 Technical Details

### Why Re-render on Theme Change?

The shader is created in a `useEffect` with Three.js. When theme changes, we need to:
1. Destroy old renderer
2. Create new scene with updated background color
3. Re-attach to DOM

**Dependency Array**:
```javascript
}, [isDarkMode]); // Re-run entire effect when theme changes
```

This is the simplest approach. Alternative would be to update uniform dynamically, but that would require storing material ref and updating in another effect.

---

### Color Values Explained

**Dark Mode Background**:
- `vec3(0.05, 0.05, 0.05)` = RGB(12, 12, 12)
- Not pure black (0,0,0) for subtle depth
- Close to existing dark design

**Light Mode Background**:
- `vec3(0.95, 0.95, 0.95)` = RGB(242, 242, 242)
- Not pure white (255,255,255) for subtle depth
- Easy on eyes, standard light mode color

**Pattern Opacity**:
- `patternLayer * 0.15` = 15% opacity
- Subtle enough not to distract
- Visible enough to maintain visual interest
- Same pattern in both modes

---

## ✅ Build Status

**Before Fix**: ✅ Build successful (but light mode broken visually)
**After Fix**: ✅ Build successful (light mode now works)

**Bundle Size**: 800.53 KB (228.24 KB gzip) - no significant change

---

## 🚀 Remaining Work

### Other Pages Still Need Text Color Updates

The shader background is now fixed globally, but these pages still have hardcoded text colors:

1. **Hero.jsx** ⚠️
   - Line 52: `color: rgba(255, 255, 255, .6);`
   - Needs: `color: ${props => props.theme.colors.text.tertiary};`

2. **Projects.jsx** ⚠️
   - 20+ hardcoded rgba values
   - Needs comprehensive update

3. **Contact.jsx** ❓ (not checked yet)
4. **Archive.jsx** ❓ (not checked yet)

**Good News**: Now that the shader background responds to theme, fixing the text is straightforward. Each page just needs its hardcoded `rgba(255, 255, 255, X)` values replaced with `${props => props.theme.colors.text.*}`.

---

## 💡 Next Steps

### Option A: Fix Remaining Pages Manually
Use the same pattern as About.jsx:
```javascript
// Find all instances of:
rgba(255, 255, 255, 0.7)

// Replace with:
${props => props.theme.colors.text.secondary}
```

### Option B: Let Me Fix Them
I can update:
- Hero.jsx (5 min)
- Projects.jsx (90 min)
- Contact.jsx (15 min)
- Archive.jsx (30 min)

### Option C: Test First, Then Decide
```bash
yarn dev
# Click through all pages in light mode
# See which ones still have text issues
# Then we fix just those
```

---

## 📸 Expected Visual Comparison

### About Page - Dark Mode
```
┌─────────────────────────────────────────────┐
│ Dark gray background (shader)               │
│                                             │
│   When they ask about what i do,           │
│   I have many passions...                  │
│                                             │
│   (Light gray text, 70% white)             │
│   ✅ Readable                               │
└─────────────────────────────────────────────┘
```

### About Page - Light Mode (NOW FIXED)
```
┌─────────────────────────────────────────────┐
│ Light gray background (shader)              │
│                                             │
│   When they ask about what i do,           │
│   I have many passions...                  │
│                                             │
│   (Dark gray text, 70% black)              │
│   ✅ Readable                               │
└─────────────────────────────────────────────┘
```

---

## 🎯 Success Criteria

- [x] Shader background changes with theme
- [x] Dark mode: Dark background + light text ✅
- [x] Light mode: Light background + dark text ✅
- [x] Build successful ✅
- [x] About page text readable in both modes ✅
- [ ] All pages readable in both modes (Hero, Projects, Contact, Archive still pending)

---

## 📝 Lessons Learned

1. **Shaders need theme context** - Three.js materials don't automatically know about React theme
2. **Uniform passing** - Theme values must be passed as shader uniforms
3. **Effect dependencies** - Theme changes require effect re-run
4. **Background is foundation** - Fix background first, then text colors work better
5. **Subtle not pure** - 0.05 and 0.95 better than 0.0 and 1.0 (subtle depth)

---

**Fix Status**: ✅ **Shader background now theme-responsive**
**Next**: Fix remaining page text colors (Hero, Projects, Contact, Archive)
**ETA**: 2-3 hours for complete coverage

---

**Document Version**: 1.0
**Last Updated**: 2025-11-21
**Issue**: Resolved ✅
**Build**: Successful ✅
