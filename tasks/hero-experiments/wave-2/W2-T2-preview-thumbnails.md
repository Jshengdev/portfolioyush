# W2-T2: Add Preview Thumbnails to ExperimentNav (UPDATED for Extensibility)

**Wave**: 2 (Integration & Polish)
**Task**: 2 of 5
**Agent**: Engineer
**Time Estimate**: 25 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete, W2-T1 (for experimentConfig.js)

---

## Prompt (Copy & Paste)

```
I need you to add visual preview thumbnails to the ExperimentNav component using the centralized experiment config.

## IMPORTANT: Extensibility Requirement
The ExperimentNav should import experiment data from the shared config file (experimentConfig.js) so adding new experiments only requires updating ONE file.

## Task
Enhance the ExperimentNav component to:
1. Import experiments array from experimentConfig.js (single source of truth)
2. Show gradient previews based on each experiment's `colors` array
3. Auto-generate the grid from the config (no hardcoded cards)

## Files to Update
- `/src/components/experiments/ExperimentNav.jsx` - Use shared config
- `/src/components/experiments/experimentConfig.js` - Should already exist from W2-T1

## Key Change: Import from Config

```jsx
// OLD (hardcoded):
const experiments = [
  { id: 'v1', name: 'Aurora', description: '...' },
  // ...
];

// NEW (extensible):
import { experiments } from './experimentConfig';
// Now ExperimentNav auto-updates when config changes!
```

## CSS Gradient Previews (No assets needed)

Use the `colors` array from config to generate gradient previews:

```jsx
const GradientPreview = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background: ${props => props.$gradient};
`;

// Usage in card:
<GradientPreview
  $gradient={`linear-gradient(135deg, ${experiment.colors.join(', ')})`}
/>
```

## Dynamic Experiment Count

Show total count in header:

```jsx
<Title>Experimental Shaders ({experiments.length})</Title>
```

## Requirements
1. Import experiments from experimentConfig.js
2. Generate gradient preview from colors array
3. Show dynamic experiment count
4. Hover scales up the card slightly
5. Cards link to full experiment page

## Implementation Approach

### Option A: CSS Gradient Previews (Recommended - Simple & Extensible)
Uses the `colors` array from experimentConfig.js:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { experiments } from './experimentConfig';

const GradientPreview = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background: ${props => props.$gradient};
  margin-bottom: 12px;
`;

const Card = styled(Link)`
  // ... card styles
`;

// In render:
{experiments.map((experiment) => (
  <Card key={experiment.id} to={`/experiments/${experiment.id}`}>
    <GradientPreview
      $gradient={`linear-gradient(135deg, ${experiment.colors.join(', ')})`}
    />
    <Name>{experiment.name}</Name>
    <Description>{experiment.description}</Description>
  </Card>
))}
```

### Option B: Live Mini Shaders (More Complex - Future Enhancement)

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
