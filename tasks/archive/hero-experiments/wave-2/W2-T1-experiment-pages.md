# W2-T1: Create Full Experiment Page Wrappers

**Wave**: 2 (Integration & Polish)
**Task**: 1 of 5
**Agent**: Engineer
**Time Estimate**: 20 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete

---

## Prompt (Copy & Paste)

```
I need you to enhance each experiment page with navigation controls and back button.

## Task
Update each experiment's index.jsx to include:
1. Back button to /experiments
2. Previous/Next navigation between experiments (data-driven for extensibility)
3. Keyboard shortcuts (left/right arrows, Escape)
4. Experiment title overlay

## IMPORTANT: Extensibility Requirement
The navigation should be DATA-DRIVEN so adding new experiments (v6, v7, etc.) is simple.
Create a shared navigation config that all experiment pages use.

## Files to Update
- `/src/components/experiments/v1/index.jsx`
- `/src/components/experiments/v2/index.jsx`
- `/src/components/experiments/v3/index.jsx`
- `/src/components/experiments/v4/index.jsx`
- `/src/components/experiments/v5/index.jsx`

## NEW: Create Shared Navigation Config
Create `/src/components/experiments/experimentConfig.js`:

```jsx
// Central config for all experiments - add new ones here
export const experiments = [
  { id: 'v1', name: 'Aurora', description: 'Flowing color bands like northern lights', colors: ['#1AE664', '#33B3E6', '#9933E6'] },
  { id: 'v2', name: 'Fog', description: 'Layered translucent clouds that drift', colors: ['#E6E8F0', '#8C919A', '#5A5F66'] },
  { id: 'v3', name: 'Bloom', description: 'Soft drifting light glows', colors: ['#FFD4A3', '#E6A3FF', '#A3FFE6'] },
  { id: 'v4', name: 'Liquid', description: 'Organic blob shapes that merge', colors: ['#FF6B9D', '#C44BFF', '#4B9DFF'] },
  { id: 'v5', name: 'Waves', description: 'Subtle horizontal gradient waves', colors: ['#6B8CFF', '#B86BFF', '#6BFFD4'] },
];

// Helper functions for navigation
export const getExperimentById = (id) => experiments.find(e => e.id === id);
export const getExperimentIndex = (id) => experiments.findIndex(e => e.id === id);
export const getPrevExperiment = (id) => {
  const idx = getExperimentIndex(id);
  const prevIdx = idx === 0 ? experiments.length - 1 : idx - 1;
  return experiments[prevIdx];
};
export const getNextExperiment = (id) => {
  const idx = getExperimentIndex(id);
  const nextIdx = idx === experiments.length - 1 ? 0 : idx + 1;
  return experiments[nextIdx];
};
```

## Template for Each File (Updated for Extensibility)

```jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/[NAME].frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';

// NOTE: NavOverlay and NavButton can be extracted to sharedStyles.js for reuse

const NavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CURRENT_ID = 'v[N]'; // e.g., 'v1', 'v2', etc.

const [NAME]Experiment = () => {
  const navigate = useNavigate();

  // Data-driven navigation - automatically adapts when new experiments are added
  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft') navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight') navigate(`/experiments/${next.id}`);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || '[NAME]'}`}
      />
      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev.id}`)}>
            ← PREV
          </NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next.id}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
    </>
  );
};

export default [NAME]Experiment;
```

## Benefits of Data-Driven Navigation
1. Adding V6: Just add to experimentConfig.js - navigation auto-updates
2. No manual prev/next updates needed per file
3. Single source of truth for experiment metadata

## Navigation Map
| Experiment | Prev | Next |
|------------|------|------|
| v1 (Aurora) | v5 | v2 |
| v2 (Fog) | v1 | v3 |
| v3 (Bloom) | v2 | v4 |
| v4 (Liquid) | v3 | v5 |
| v5 (Waves) | v4 | v1 |

## Reference Files
- Read existing `/src/components/experiments/v1/index.jsx` from Wave 1
- Read `/src/theme.js` for color tokens

## Acceptance Criteria
- [ ] All 5 experiments have navigation overlay
- [ ] Back button returns to /experiments
- [ ] Prev/Next cycle through all experiments
- [ ] Keyboard shortcuts work (Escape, Left, Right arrows)
- [ ] Navigation is visually unobtrusive
- [ ] Theme-aware styling

## Test
Navigate through all experiments using buttons and keyboard.
```

---

## Files to Update

| Path | Name | Prev | Next |
|------|------|------|------|
| `src/components/experiments/v1/index.jsx` | Aurora | v5 | v2 |
| `src/components/experiments/v2/index.jsx` | Fog | v1 | v3 |
| `src/components/experiments/v3/index.jsx` | Bloom | v2 | v4 |
| `src/components/experiments/v4/index.jsx` | Liquid | v3 | v5 |
| `src/components/experiments/v5/index.jsx` | Waves | v4 | v1 |

---

## Acceptance Criteria

- [ ] Navigation overlay on all 5 experiments
- [ ] Back button works
- [ ] Prev/Next cycling works
- [ ] Keyboard shortcuts work
- [ ] Theme-aware styling

---

## Completion Checklist

- [ ] All 5 files updated
- [ ] Navigation works in all directions
- [ ] Keyboard tested
