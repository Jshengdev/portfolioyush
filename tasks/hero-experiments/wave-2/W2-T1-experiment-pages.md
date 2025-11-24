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
2. Previous/Next navigation between experiments
3. Keyboard shortcuts (left/right arrows, Escape)
4. Experiment title overlay

## Files to Update
- `/src/components/experiments/v1/index.jsx`
- `/src/components/experiments/v2/index.jsx`
- `/src/components/experiments/v3/index.jsx`
- `/src/components/experiments/v4/index.jsx`
- `/src/components/experiments/v5/index.jsx`

## Template for Each File

```jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/[NAME].frag.glsl?raw';
import { ThemeContext } from '../../../context/ThemeContext';

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
  background: ${props => props.theme.colors.background.overlay || 'rgba(0,0,0,0.3)'};
  border: 1px solid ${props => props.theme.colors.border.primary || 'rgba(255,255,255,0.2)'};
  color: ${props => props.theme.colors.text.primary || 'rgba(255,255,255,0.7)'};
  padding: 8px 16px;
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background.overlay || 'rgba(0,0,0,0.5)'};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const [NAME]Experiment = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft') navigate('/experiments/v[PREV]');
      if (e.key === 'ArrowRight') navigate('/experiments/v[NEXT]');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title="V[N]: [NAME]"
      />
      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate('/experiments/v[PREV]')}>
            ← PREV
          </NavButton>
          <NavButton onClick={() => navigate('/experiments/v[NEXT]')}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
    </>
  );
};

export default [NAME]Experiment;
```

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
