# W0-T4: Create Experiment Navigation Component

**Wave**: 0 (Infrastructure)
**Task**: 4 of 6
**Agent**: Engineer
**Time Estimate**: 20 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (no dependencies)

---

## Prompt (Copy & Paste)

```
I need you to create a navigation component for browsing experimental shader pages.

## Task
Create `/src/components/experiments/ExperimentNav.jsx` - a grid-based navigation page showing all 5 experiments.

## Requirements
1. Display a 3x2 grid (or responsive) of experiment cards
2. Each card shows:
   - Version number (V1, V2, etc.)
   - Effect name (Aurora, Fog, Bloom, Liquid, Waves)
   - Brief description
   - Link to that experiment
3. Style using styled-components
4. Use ThemeContext for theme-aware colors
5. Match portfolio aesthetic (Work Sans font, subtle borders, glass morphism optional)

## Experiment Data
```javascript
const experiments = [
  { id: 'v1', name: 'Aurora', description: 'Flowing color bands like northern lights' },
  { id: 'v2', name: 'Fog', description: 'Layered translucent clouds that drift' },
  { id: 'v3', name: 'Bloom', description: 'Soft drifting light glows' },
  { id: 'v4', name: 'Liquid', description: 'Organic blob shapes that merge' },
  { id: 'v5', name: 'Waves', description: 'Subtle horizontal gradient waves' },
];
```

## Component Structure
```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

const ExperimentNav = () => {
  // ... implementation
};

export default ExperimentNav;
```

## Styled Components Needed
- Container (full page, centered content)
- Title (page header)
- Grid (responsive grid layout)
- Card (individual experiment card)
- CardTitle
- CardDescription

## Reference Files
- Read `/src/components/sharedStyles.js` for existing styled patterns
- Read `/src/theme.js` for color tokens

## Acceptance Criteria
- [ ] Component renders without errors
- [ ] All 5 experiments displayed in grid
- [ ] Links navigate to correct routes (/experiments/v1, etc.)
- [ ] Theme-aware colors (works in dark/light mode)
- [ ] Responsive layout (stacks on mobile)
- [ ] Hover effects on cards

Do NOT create actual shader implementations. Only the navigation component.
```

---

## File to Create

**Path**: `/src/components/experiments/ExperimentNav.jsx`

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/components/sharedStyles.js` | Styled component patterns |
| `src/theme.js` | Color tokens |
| `src/context/ThemeContext.jsx` | Theme integration |

---

## Experiment Data

| ID | Name | Description |
|----|------|-------------|
| v1 | Aurora | Flowing color bands like northern lights |
| v2 | Fog | Layered translucent clouds that drift |
| v3 | Bloom | Soft drifting light glows |
| v4 | Liquid | Organic blob shapes that merge |
| v5 | Waves | Subtle horizontal gradient waves |

---

## Acceptance Criteria

- [ ] Component created at correct path
- [ ] Grid displays all 5 experiments
- [ ] Links work correctly
- [ ] Theme-aware styling
- [ ] Responsive design
- [ ] Hover states

---

## Completion Checklist

- [ ] File created
- [ ] All cards display
- [ ] Navigation works
- [ ] Styling matches portfolio
