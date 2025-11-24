# W0-T6: Create Experiment Vertex Shader

**Wave**: 0 (Infrastructure)
**Task**: 6 of 6
**Agent**: Engineer
**Time Estimate**: 5 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (no dependencies)

---

## Prompt (Copy & Paste)

```
I need you to create a simple pass-through vertex shader for experimental shaders.

## Task
Create `/src/shaders/experiments/passthrough.vert.glsl` - a minimal vertex shader that all experiments will use.

## Requirements
A simple pass-through vertex shader that:
1. Passes position to clip space
2. Optionally passes UV coordinates to fragment shader

## Code
```glsl
// Passthrough vertex shader for full-screen quad experiments
// All visual effects happen in fragment shader

varying vec2 vUv;

void main() {
  // Pass UV coordinates to fragment shader
  vUv = uv;

  // Standard position transformation
  gl_Position = vec4(position, 1.0);
}
```

## Alternative (Simpler)
If UV not needed:
```glsl
void main() {
  gl_Position = vec4(position, 1.0);
}
```

## Reference
- Read `/src/shaders/truchet.vert.glsl` for existing vertex shader

## Acceptance Criteria
- [ ] File created at correct path
- [ ] Valid GLSL vertex shader syntax
- [ ] Works with Three.js PlaneGeometry

This is a simple task - the vertex shader just passes data through. All visual magic happens in fragment shaders.
```

---

## File to Create

**Path**: `/src/shaders/experiments/passthrough.vert.glsl`

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/shaders/truchet.vert.glsl` | Existing vertex shader |

---

## Acceptance Criteria

- [ ] File created at correct path
- [ ] Valid GLSL syntax
- [ ] Minimal pass-through implementation

---

## Completion Checklist

- [ ] File created
- [ ] Syntax valid
