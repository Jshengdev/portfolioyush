# W0-T5: Create Shared Shader Utilities

**Wave**: 0 (Infrastructure)
**Task**: 5 of 6
**Agent**: Engineer
**Time Estimate**: 15 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (no dependencies)

---

## Prompt (Copy & Paste)

```
I need you to create shared GLSL utility functions that all experimental shaders will use.

## Task
Create `/src/shaders/experiments/common.glsl` - shared GLSL functions for noise, math utilities, and common patterns.

## Requirements
Include these utility functions that experiments will import:

### 1. Hash Functions
```glsl
// Simple hash for pseudo-random
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
```

### 2. Noise Functions
```glsl
// Value noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Fractal Brownian Motion
float fbm(vec2 st, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < octaves; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}
```

### 3. Math Utilities
```glsl
// Smooth min for metaballs
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// Rotation matrix
mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

// Remap value from one range to another
float remap(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}
```

### 4. Color Utilities
```glsl
// HSV to RGB conversion
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Blend colors based on background brightness
vec3 adaptiveBlend(vec3 color, vec3 background, float intensity) {
  float bgBrightness = (background.r + background.g + background.b) / 3.0;
  float adaptedIntensity = mix(intensity * 0.5, intensity, bgBrightness);
  return mix(background, color, adaptedIntensity);
}
```

## Note on GLSL Imports
Since Vite doesn't support GLSL imports natively, these will be copy-pasted into each shader or concatenated during development. The file serves as a reference.

## Reference Files
- Read `/src/shaders/truchet.frag.glsl` for existing patterns

## Acceptance Criteria
- [ ] File created with all utility functions
- [ ] Code is valid GLSL
- [ ] Comments explain each function
- [ ] Functions are generic and reusable

Do NOT modify any existing shader files. Only create the new common.glsl file.
```

---

## File to Create

**Path**: `/src/shaders/experiments/common.glsl`

---

## Functions to Include

| Category | Functions |
|----------|-----------|
| Hash | hash(), hash21() |
| Noise | noise(), fbm() |
| Math | smin(), rotate2d(), remap() |
| Color | hsv2rgb(), adaptiveBlend() |

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/shaders/truchet.frag.glsl` | Existing GLSL patterns |

---

## Acceptance Criteria

- [ ] File created at correct path
- [ ] All functions included
- [ ] Valid GLSL syntax
- [ ] Well-commented

---

## Completion Checklist

- [ ] File created
- [ ] Functions documented
- [ ] Syntax valid
