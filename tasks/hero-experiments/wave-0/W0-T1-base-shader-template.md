# W0-T1: Create Base Shader Template Component

**Wave**: 0 (Infrastructure)
**Task**: 1 of 6
**Agent**: Engineer
**Time Estimate**: 15 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (no dependencies)

---

## Prompt (Copy & Paste)

```
I need you to create a reusable base shader template component for experimental hero page effects.

## Task
Create `/src/components/experiments/BaseExperimentShader.jsx` - a reusable Three.js shader component.

## Requirements
1. Accept `fragmentShader` as a prop (string - the GLSL code)
2. Accept `title` as a prop (string - displayed in corner)
3. Accept optional `customUniforms` prop (object - additional uniforms)
4. Use ThemeContext for dark/light mode awareness
5. Handle mouse position tracking (normalized 0-1)
6. Handle window resize
7. Proper cleanup on unmount (dispose renderer, geometry, material)
8. Full-screen positioning (100vw x 100vh)

## Base Uniforms (always included)
- u_time: float (incrementing time)
- u_resolution: vec2 (window size)
- u_mouse: vec2 (normalized mouse position)
- u_backgroundColor: vec3 (from theme - black or white)

## Reference Files
- Read `/src/components/ShaderVisual.jsx` for Three.js setup patterns
- Read `/src/context/ThemeContext.jsx` for theme integration

## Code Structure
```jsx
import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { ThemeContext } from '../../context/ThemeContext';

const BaseExperimentShader = ({ fragmentShader, title, customUniforms = {} }) => {
  // ... implementation
};

export default BaseExperimentShader;
```

## Acceptance Criteria
- [ ] Component renders without errors
- [ ] Mouse position updates smoothly
- [ ] Window resize updates resolution
- [ ] Theme changes update background color
- [ ] Memory properly cleaned up on unmount
- [ ] Title displays in top-left corner

Do NOT create any other files. Only create BaseExperimentShader.jsx.
```

---

## File to Create

**Path**: `/src/components/experiments/BaseExperimentShader.jsx`

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/components/ShaderVisual.jsx` | Three.js setup patterns |
| `src/context/ThemeContext.jsx` | Theme context usage |

---

## Acceptance Criteria

- [ ] Component created at correct path
- [ ] Accepts fragmentShader, title, customUniforms props
- [ ] Uses ThemeContext correctly
- [ ] Mouse tracking works
- [ ] Resize handling works
- [ ] Proper cleanup on unmount
- [ ] Title overlay displays

---

## Completion Checklist

- [ ] File created
- [ ] No import errors
- [ ] Component exports correctly
