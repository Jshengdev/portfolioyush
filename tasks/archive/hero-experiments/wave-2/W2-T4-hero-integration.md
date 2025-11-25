# W2-T4: Add Link to Experiments from Hero Page (UPDATED for Extensibility)

**Wave**: 2 (Integration & Polish)
**Task**: 4 of 5
**Agent**: Engineer
**Time Estimate**: 10 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete, W2-T1 (for experimentConfig.js)

---

## Prompt (Copy & Paste)

```
I need you to add a subtle link from the Hero page to the experiments section with dynamic experiment count.

## IMPORTANT: Extensibility Requirement
The link should show the current experiment count from experimentConfig.js so it auto-updates when new experiments are added.

## Task
Add a small, unobtrusive link on the Hero page that:
1. Links to /experiments
2. Shows dynamic count: "experiments (5) →"
3. Auto-updates when experimentConfig.js changes

## File to Update
`/src/components/Hero.jsx`

## Requirements
1. Add small text link in corner (e.g., bottom-right or top-right)
2. Text: "experiments (N) →" where N is dynamic from config
3. Styled to be subtle (low opacity, small font)
4. Links to /experiments
5. Optional: Keyboard shortcut (Ctrl/Cmd + E)

## Implementation

```jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { experiments } from './experiments/experimentConfig';

const ExperimentsLink = styled(Link)`
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Work Sans', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s ease;
  z-index: 50;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

// In Hero component JSX (dynamic count!):
<ExperimentsLink to="/experiments">
  experiments ({experiments.length}) →
</ExperimentsLink>
```

## Benefits
When you add V6, V7, etc. to experimentConfig.js, the Hero link automatically shows the updated count!

## Alternative: Keyboard Shortcut Only
If you want it even more hidden, only allow access via keyboard:

```jsx
import { useNavigate } from 'react-router-dom';

// In Hero component:
const navigate = useNavigate();

useEffect(() => {
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + E to go to experiments
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      navigate('/experiments');
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [navigate]);
```

## Reference
- Read `/src/components/Hero.jsx` for current structure

## Acceptance Criteria
- [ ] Link or keyboard shortcut to /experiments exists
- [ ] Subtle, doesn't distract from main content
- [ ] Works correctly
- [ ] Theme-aware if using visible link

## Test
From Hero page, navigate to experiments via link or keyboard shortcut.
```

---

## File to Update

**Path**: `/src/components/Hero.jsx`

---

## Options

| Option | Implementation | Visibility |
|--------|----------------|------------|
| Visible Link | Small text in corner | Low opacity, hover reveal |
| Keyboard | Ctrl/Cmd + E | Hidden, power-user feature |
| Both | Link + Keyboard | Maximum accessibility |

---

## Acceptance Criteria

- [ ] Navigation to /experiments possible
- [ ] Implementation is subtle
- [ ] Works correctly

---

## Completion Checklist

- [ ] Hero.jsx updated
- [ ] Link/shortcut tested
- [ ] Styling is subtle
