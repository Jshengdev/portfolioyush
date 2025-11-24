# W2-T2: Add Live Preview Thumbnails to ExperimentNav

**Wave**: 2 (Integration & Polish)
**Task**: 2 of 5
**Agent**: Engineer
**Time Estimate**: 25 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete

---

## Prompt (Copy & Paste)

```
I need you to add live shader preview thumbnails to the ExperimentNav component.

## Task
Enhance the ExperimentNav component to show small live shader previews for each experiment card, using small canvases with the actual shaders running.

## File to Update
`/src/components/experiments/ExperimentNav.jsx`

## Requirements
1. Each experiment card shows a small live preview
2. Previews are small (150x100px) to conserve resources
3. Previews run at reduced framerate (~15fps) for performance
4. Hover scales up the card slightly
5. Cards link to full experiment page

## Implementation Approach

### Option A: Static Preview Images (Simpler)
Create static screenshot images of each shader and display those:
```jsx
const experiments = [
  { id: 'v1', name: 'Aurora', description: '...', preview: '/assets/experiments/aurora-preview.png' },
  // ...
];
```

### Option B: Live Mini Shaders (More Complex)
Create a MiniShaderPreview component that renders a small Three.js canvas:

```jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MiniShaderPreview = ({ fragmentShader, width = 150, height = 100 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_backgroundColor: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Reduced framerate for thumbnails
    let lastFrame = 0;
    const targetFPS = 15;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp) => {
      if (timestamp - lastFrame >= frameInterval) {
        material.uniforms.u_time.value += 0.02;
        renderer.render(scene, camera);
        lastFrame = timestamp;
      }
      requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [fragmentShader, width, height]);

  return (
    <div
      ref={mountRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    />
  );
};
```

## Recommended: Option A (Static Images)
For v1, use static preview images. This is simpler and more performant. Live previews can be added in a future enhancement.

## Static Preview Approach

1. Create placeholder images or generate screenshots
2. Store in `/public/assets/experiments/`
3. Reference in ExperimentNav

```jsx
const experiments = [
  {
    id: 'v1',
    name: 'Aurora',
    description: 'Flowing color bands like northern lights',
    preview: '/assets/experiments/aurora-preview.svg'
  },
  // ... etc
];

// In Card component:
<PreviewImage src={experiment.preview} alt={experiment.name} />
```

## For Static Previews (simple colored placeholder)
Create simple colored SVG placeholders that hint at the effect:

- aurora-preview.svg: Green/purple gradient
- fog-preview.svg: Grey misty gradient
- bloom-preview.svg: Circular soft glows
- liquid-preview.svg: Organic blob shapes
- waves-preview.svg: Horizontal wave pattern

## Acceptance Criteria
- [ ] Each experiment card has visual preview
- [ ] Previews load without errors
- [ ] Cards maintain consistent size
- [ ] Hover effect works
- [ ] Performance is acceptable (no lag with 5 previews)

## Test
Navigate to `/experiments` and verify all previews display correctly.
```

---

## File to Update

**Path**: `/src/components/experiments/ExperimentNav.jsx`

---

## Assets to Create (if using static previews)

| Path | Description |
|------|-------------|
| `public/assets/experiments/aurora-preview.svg` | Green/purple gradient |
| `public/assets/experiments/fog-preview.svg` | Grey mist gradient |
| `public/assets/experiments/bloom-preview.svg` | Soft circular glows |
| `public/assets/experiments/liquid-preview.svg` | Organic shapes |
| `public/assets/experiments/waves-preview.svg` | Horizontal lines |

---

## Acceptance Criteria

- [ ] Visual previews on all cards
- [ ] Consistent card sizes
- [ ] Hover effects work
- [ ] Good performance

---

## Completion Checklist

- [ ] ExperimentNav updated
- [ ] Preview assets created (if static)
- [ ] All 5 previews display
