# W2-T2: Create Theme System Foundation

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 277-349)  
**⏱ Time**: 45 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥🔥🔥  
**Wave**: 2 | **Dependencies**: Wave 1 complete | **Parallelizable**: Yes (with W2-T1)

---

## Quick Overview

Create centralized theme system in `/src/theme.js` with colors, fonts, spacing, breakpoints, and transitions. Wrap App with ThemeProvider to make theme accessible throughout the app.

---

## Tasks

### 1. Create `/src/theme.js`
Create file with design tokens for:
- `colors`: text (primary/secondary/tertiary/muted), background, accent
- `fonts`: primary ('work sans'), display ('ade')
- `spacing`: frame, section, element
- `breakpoints`: mobile (768px), tablet (1024px), desktop (1440px)
- `transitions`: standard, slow

Reference lines 288-327 in EXECUTION_PLAN.md for exact structure.

### 2. Wrap App with ThemeProvider in `/src/App.jsx`
- Import `ThemeProvider` from 'styled-components'
- Import `theme` from './theme'
- Wrap entire app content with `<ThemeProvider theme={theme}>`

### 3. Test
```bash
npm run build
npm run dev
# Verify app loads
```

---

## Validation Checklist

- [ ] theme.js file created with all design tokens
- [ ] App.jsx wrapped with ThemeProvider
- [ ] App loads without errors
- [ ] Build succeeds

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Create centralized theme system with design tokens"`
- [ ] Ready for next wave

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
