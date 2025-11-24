# W2-T4: Add Link to Experiments from Hero Page

**Wave**: 2 (Integration & Polish)
**Task**: 4 of 5
**Agent**: Engineer
**Time Estimate**: 10 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete

---

## Prompt (Copy & Paste)

```
I need you to add a subtle link from the Hero page to the experiments section.

## Task
Add a small, unobtrusive link on the Hero page that allows navigation to the experimental shaders section. This should be subtle - like a hidden easter egg or development tool link.

## File to Update
`/src/components/Hero.jsx`

## Requirements
1. Add small text link in corner (e.g., bottom-right or top-right)
2. Text: "experiments →" or similar
3. Styled to be subtle (low opacity, small font)
4. Links to /experiments
5. Optional: Only visible on hover or with specific keyboard shortcut

## Implementation

```jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

// In Hero component JSX:
<ExperimentsLink to="/experiments">
  experiments →
</ExperimentsLink>
```

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
