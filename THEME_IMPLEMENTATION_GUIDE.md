# Dark/Light Mode Implementation Guide
**Date**: 2025-11-21
**Status**: Phase 1 Complete ✅

---

## Progress Tracker

- ✅ **Phase 1**: Expand theme.js with complete dark and light theme objects (COMPLETE)
- ⏳ **Phase 2**: Update core components (NEXT)
- 📋 **Phase 3**: Update page components
- 📋 **Phase 4**: Add theme toggle mechanism
- 📋 **Phase 5**: Test both themes

---

## Phase 1: Theme Definition ✅ COMPLETE

### What Was Done
Created comprehensive dark and light theme objects in `src/theme.js`:

**New Structure**:
```javascript
export const darkTheme = {
  colors: {
    text: { primary, secondary, tertiary, muted, emphasis, hover }
    background: { primary, secondary, overlay, overlayLight }
    accent: { blue, blueBright, red, glow }
    border: { primary, secondary, subtle }
    shadow: { glow, glowStrong, accentGlow, accentGlowStrong, subtle }
    gradient: { overlayStart, overlayMid, overlayEnd }
  },
  fonts: { ... }
  spacing: { ... }
  breakpoints: { ... }
  transitions: { ... }
}

export const lightTheme = {
  // Same structure with inverted colors
}
```

**Key Features**:
- Complete color palette (30+ color values categorized)
- Shared tokens (fonts, spacing, breakpoints, transitions) remain theme-agnostic
- Backward compatibility maintained with `export const theme = darkTheme`
- Build verified ✅ (successful build after changes)

---

## Phase 2: Update Core Components ⏳ NEXT

### Files to Update (4 files)

These are the highest-impact files that will cascade changes to all other components:

#### **2.1: App.jsx** (`src/App.jsx`)
**Lines to Update**: 31, 42, 62
**Impact**: Container border, Frame border, Loading text

**Current**:
```javascript
border: 30px hsla(0, 0.00%, 0.00%, 0.90) solid;  // Line 31
border: 2.5px solid rgba(136, 169, 215, 0.47);   // Line 42
color: rgba(255, 255, 255, 0.7);                 // Line 62
```

**Change To**:
```javascript
border: 30px solid ${props => props.theme.colors.background.overlay};
border: 2.5px solid ${props => props.theme.colors.border.primary};
color: ${props => props.theme.colors.text.secondary};
```

---

#### **2.2: sharedStyles.js** (`src/components/sharedStyles.js`)
**Impact**: CRITICAL - Used by all 6 project detail pages
**Lines to Update**: 30+ color values across 18 components

**Components to Update**:
1. `ChapterCard` (lines 74, 87, 95)
2. `ProblemSolutionBox` (lines 134, 144, 152, 158, 160)
3. `ProblemBox` (line 171)
4. `SolutionBox` (line 179)
5. `TextColumn` (lines 218, 226)
6. `ImageColumn` (lines 247, 251)
7. `GifContainer` (lines 279, 284)
8. `OverviewBox` (lines 305, 316)
9. `MetadataPanel` (lines 335, 336)
10. `MetadataSection` (line 348)
11. `MetadataLabel` (line 359)
12. `Title` (lines 60, 64)
13. `Bold` (line 126)

**Example Changes**:
```javascript
// ChapterCard - Before
background-color: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.1);
color: white;
color: var(--paragraph-color);

// ChapterCard - After
background-color: ${props => props.theme.colors.background.secondary};
border: 1px solid ${props => props.theme.colors.border.subtle};
color: ${props => props.theme.colors.text.hover};
color: ${props => props.theme.colors.text.secondary};
```

---

#### **2.3: Line.jsx** (`src/components/Line.jsx`)
**Lines to Update**: 12, 22, 32, 42, 50, 62, 72
**Impact**: All decorative line backgrounds (same color used 6 times)

**Current**:
```javascript
background-color: rgba(255, 255, 255, 0.5);  // Appears 5 times
color: rgba(255, 255, 255, 0.5);             // Appears 2 times
```

**Change To**:
```javascript
background-color: ${props => props.theme.colors.text.muted};
color: ${props => props.theme.colors.text.muted};
```

---

#### **2.4: Navbar.jsx** (`src/components/Navbar.jsx`)
**Lines to Update**: 31, 38
**Impact**: Navigation link colors

**Current**:
```javascript
color: rgba(255, 255, 255, 0.7);  // Line 31
color: white;                      // Line 38 (hover)
```

**Change To**:
```javascript
color: ${props => props.theme.colors.text.secondary};
color: ${props => props.theme.colors.text.hover};
```

---

### Prompts to Run for Phase 2

#### **Prompt 2.1: Update App.jsx**
```
Update src/App.jsx to use theme colors from theme.js:
- Line 31: Container border → use theme.colors.background.overlay
- Line 42: Frame border → use theme.colors.border.primary
- Line 62: LoadingContainer color → use theme.colors.text.secondary

Replace hardcoded rgba() values with ${props => props.theme.colors.X} pattern.
Verify the file still builds successfully after changes.
```

---

#### **Prompt 2.2: Update sharedStyles.js**
```
Update src/components/sharedStyles.js to use theme colors. This file has 18 components with 30+ color values.

Replace ALL hardcoded colors with theme references:
- White text colors → theme.colors.text.*
- Background rgba(255,255,255,0.03) → theme.colors.background.secondary
- Border rgba(255,255,255,0.1) → theme.colors.border.subtle
- Blue borders rgba(136,169,215,X) → theme.colors.accent.blue
- Red borders rgba(255,128,128,X) → theme.colors.accent.red
- Shadow colors → theme.colors.shadow.*
- var(--paragraph-color) → theme.colors.text.secondary
- var(--font-heading) → theme.fonts.display
- var(--font-body) → theme.fonts.primary

Components to update: ChapterCard, ProblemSolutionBox, ProblemBox, SolutionBox, TextColumn, ImageColumn, GifContainer, OverviewBox, MetadataPanel, MetadataSection, MetadataLabel, Title, Bold.

Verify build after changes.
```

---

#### **Prompt 2.3: Update Line.jsx**
```
Update src/components/Line.jsx to use theme colors:
- Replace all instances of rgba(255, 255, 255, 0.5) with ${props => props.theme.colors.text.muted}
- Update both background-color and color properties
- Lines to change: 12, 22, 32, 42, 50, 62, 72

This affects all 6 line components: LineStyled, SecondLine, ThirdLine, LineWithDot, CLetter, CLetter2.

Verify build after changes.
```

---

#### **Prompt 2.4: Update Navbar.jsx**
```
Update src/components/Navbar.jsx to use theme colors:
- Line 31: ListItem color → use theme.colors.text.secondary
- Line 38: ListItem hover → use theme.colors.text.hover

Verify build after changes.
```

---

#### **Prompt 2.5: Verify Phase 2 Complete**
```
Run the following checks:
1. yarn build (verify successful build)
2. yarn dev (test in browser - should still look identical to original dark mode)
3. Check that no hardcoded colors remain in: App.jsx, sharedStyles.js, Line.jsx, Navbar.jsx

Once verified, mark Phase 2 complete and provide summary of changes.
```

---

## Phase 3: Update Page Components

### Files to Update (2 files + inherited)

#### **3.1: Projects.jsx** (`src/components/Projects.jsx`)
**Impact**: High - Main project gallery page
**Lines with colors**: 20+ instances

**Colors to Replace**:
- Text colors (lines 90, 114, 195, etc.)
- Border colors (line 60)
- Shadow/glow colors (lines 11-21, 153-156, etc.)
- Gradient overlay (lines 170-177)
- Blend modes can stay as-is

**Prompt**:
```
Update src/components/Projects.jsx to use theme colors:
- Replace all text rgba(255,255,255,X) with theme.colors.text.*
- Replace border rgba(255,255,255,0.3) with theme.colors.border.secondary
- Update softGlow keyframe shadows (lines 11-21) to use theme.colors.shadow.*
- Update PreviewImage shadows (lines 153-156) to use theme.colors.shadow.*
- Update ImageOverlay gradient (lines 170-177) to use theme.colors.gradient.*
- Keep mix-blend-mode: exclusion as-is (theme-agnostic)

Verify build and visual appearance after changes.
```

---

#### **3.2: Cursor.jsx** (`src/Cursor.jsx`)
**Impact**: Low - Blend mode makes it mostly theme-agnostic
**Lines to Update**: 9, 22

**Note**: Cursor uses `mix-blend-mode: difference` which automatically inverts on any background. Color changes are optional but recommended for consistency.

**Prompt**:
```
Update src/Cursor.jsx border and background colors (optional but recommended):
- Line 9: CursorRing border → use theme.colors.text.hover
- Line 22: CursorDot background → use theme.colors.text.hover

Note: Blend mode 'difference' will auto-invert these, so visual appearance stays consistent.

Verify build after changes.
```

---

#### **3.3: All Project Detail Pages** (Inherited)
**Files**: Grove.jsx, CapsuleMachine.jsx, Ark.jsx, AP.jsx, Collection.jsx, Lens.jsx
**Impact**: Automatic - These files import and use sharedStyles.js

**Action**: NO CHANGES NEEDED
- All 6 project pages use components from sharedStyles.js
- Once sharedStyles.js is updated (Phase 2.2), these pages automatically inherit theme support
- Only need to verify visual appearance

**Prompt**:
```
Verify that all project detail pages look correct after sharedStyles.js update:
1. Navigate to each project page: Grove, Capsule Machine, The Collection, Ark, Alaina Pamela, Lens
2. Check that text, cards, borders, and shadows display correctly
3. Confirm no visual regressions

No code changes needed - these inherit from sharedStyles.js.
```

---

## Phase 4: Add Theme Toggle Mechanism

### Files to Create/Update

#### **4.1: Create Theme Context** (`src/context/ThemeContext.jsx`)
**New File**

**Prompt**:
```
Create src/context/ThemeContext.jsx with the following features:
- React Context for theme state management
- useState hook to track current theme ('dark' or 'light')
- useEffect to load theme preference from localStorage on mount
- useEffect to save theme preference to localStorage on change
- toggleTheme function to switch between dark and light
- Export ThemeContext and ThemeProvider component

Provide the current theme object (darkTheme or lightTheme) to consumers.
```

**Expected Code Structure**:
```javascript
import React, { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

#### **4.2: Update App.jsx to Use Theme Context**
**File**: `src/App.jsx`

**Prompt**:
```
Update src/App.jsx to use the new ThemeContext:
1. Import ThemeProvider from './context/ThemeContext'
2. Import useContext hook
3. Create inner AppContent component that uses useContext(ThemeContext)
4. Wrap Router in ThemeProvider (outer wrapper)
5. Pass theme from context to styled-components ThemeProvider

Structure:
<ThemeProvider>  {/* Our context */}
  <Router>
    <AppContent />
  </Router>
</ThemeProvider>

Inside AppContent:
const { theme } = useContext(ThemeContext);
return (
  <StyledThemeProvider theme={theme}>
    {/* existing app structure */}
  </StyledThemeProvider>
);
```

---

#### **4.3: Create Theme Toggle Button** (`src/components/ThemeToggle.jsx`)
**New File**

**Prompt**:
```
Create src/components/ThemeToggle.jsx - a button component to toggle between dark and light modes:
- Import useContext hook and ThemeContext
- Access toggleTheme and isDarkMode from context
- Create a styled button (position: fixed, bottom-right corner)
- Display sun icon (☀️) for dark mode, moon icon (🌙) for light mode
- Add smooth transitions and hover effects
- Use theme colors for button styling

Style considerations:
- Fixed position: bottom: 30px, right: 30px
- Z-index: 10000 (above all other elements)
- Size: 60px x 60px circle
- Background: theme.colors.background.secondary with backdrop-filter
- Border: theme.colors.border.primary
- Font-size: 24px for emoji
- Hover: scale(1.1)
- Transition: all 0.3s ease
```

**Expected Code Structure**:
```javascript
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background.secondary};
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.theme.colors.border.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 24px;
  cursor: pointer;
  z-index: 10000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${props => props.theme.colors.shadow.accentGlow};
  }
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme}>
      {isDarkMode ? '☀️' : '🌙'}
    </ToggleButton>
  );
};

export default ThemeToggle;
```

---

#### **4.4: Add ThemeToggle to App**
**File**: `src/App.jsx`

**Prompt**:
```
Add the ThemeToggle component to App.jsx:
1. Import ThemeToggle from './components/ThemeToggle'
2. Place <ThemeToggle /> inside the Container component, after Frame
3. Position: Should appear above all content

Add after line 213 (before closing </Container> tag).
```

---

#### **4.5: Test Theme Toggle**
**Prompt**:
```
Test the theme toggle functionality:
1. yarn dev - start development server
2. Open in browser
3. Click the theme toggle button (sun/moon icon bottom-right)
4. Verify:
   - Theme switches between dark and light
   - All colors invert correctly
   - Text remains readable
   - Borders and shadows adjust appropriately
   - Theme preference persists on page reload (localStorage)
5. Test on all pages: Home, About, Projects, Archive, Contact, individual project pages

Report any visual issues or contrast problems.
```

---

## Phase 5: Testing & Refinement

### Testing Checklist

#### **5.1: Visual Regression Testing**
**Prompt**:
```
Perform visual regression testing on both themes:

DARK MODE (original):
- ✓ Text hierarchy clear (primary/secondary/muted)
- ✓ Frame border visible (blue accent)
- ✓ Glass morphism cards visible
- ✓ Glow effects appropriate
- ✓ Line decorations visible
- ✓ Navbar readable
- ✓ Projects page preview works
- ✓ All project detail pages readable

LIGHT MODE (new):
- ✓ Text hierarchy clear (dark text on white)
- ✓ Frame border visible
- ✓ Glass morphism cards visible (subtle)
- ✓ Shadows appropriate (not too strong)
- ✓ Line decorations visible (not washed out)
- ✓ Navbar readable
- ✓ Projects page preview works
- ✓ All project detail pages readable

Take screenshots of both modes for comparison.
```

---

#### **5.2: Contrast Ratio Testing**
**Prompt**:
```
Test WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text):

Use browser DevTools or WebAIM Contrast Checker:
1. Dark mode:
   - Primary text on background
   - Secondary text on background
   - Muted text on background (decorative only)

2. Light mode:
   - Primary text on background
   - Secondary text on background
   - Muted text on background (decorative only)

Report any failures. Adjust theme.colors.text.* opacity if needed.
```

---

#### **5.3: Animation & Transition Testing**
**Prompt**:
```
Test that all animations work correctly in both themes:
1. Page transitions (route changes)
2. Line animations (change routes, verify line movements)
3. Hover effects (navbar, project titles, images)
4. Scroll animations (whileInView on project pages)
5. Glow animations (softGlow, glowAnimation keyframes)
6. Theme toggle transition (smooth color change)

Verify no jarring visual jumps when switching themes.
```

---

#### **5.4: Browser Compatibility**
**Prompt**:
```
Test theme toggle in multiple browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

Check for:
- Backdrop-filter support (fallback needed?)
- Color rendering consistency
- localStorage persistence
- Theme toggle button positioning

Report any browser-specific issues.
```

---

#### **5.5: Mobile Responsiveness**
**Prompt**:
```
Test both themes on mobile viewport:
1. Open DevTools, switch to mobile view (375px width)
2. Test dark mode navigation and readability
3. Test light mode navigation and readability
4. Verify theme toggle button accessible (not overlapping content)
5. Check contrast ratios on small screens

May need to adjust theme toggle button size/position for mobile.
```

---

#### **5.6: Refinement - Adjust Colors if Needed**
**Prompt**:
```
Based on testing results, refine colors in src/theme.js if needed:

Common adjustments:
- Light mode text may need higher opacity (0.85 instead of 0.8)
- Light mode shadows may need adjustment (too strong or too weak)
- Light mode card backgrounds may need tweaking (visibility)
- Accent colors may need brightness adjustment in light mode

Make iterative changes and re-test. Document final color values.
```

---

## Phase Completion Checklist

### Phase 2 Complete When:
- [ ] App.jsx using theme colors (3 changes)
- [ ] sharedStyles.js using theme colors (30+ changes)
- [ ] Line.jsx using theme colors (7 changes)
- [ ] Navbar.jsx using theme colors (2 changes)
- [ ] Build successful
- [ ] Visual appearance identical to original dark mode

---

### Phase 3 Complete When:
- [ ] Projects.jsx using theme colors (20+ changes)
- [ ] Cursor.jsx using theme colors (2 changes, optional)
- [ ] All project detail pages verified (visual check)
- [ ] Build successful
- [ ] Still looks identical to original

---

### Phase 4 Complete When:
- [ ] ThemeContext.jsx created and working
- [ ] App.jsx updated to use context
- [ ] ThemeToggle.jsx created and styled
- [ ] Theme toggle button visible on all pages
- [ ] Theme switches between dark and light
- [ ] localStorage persistence working
- [ ] Build successful

---

### Phase 5 Complete When:
- [ ] Visual regression testing passed (both themes)
- [ ] WCAG contrast ratios verified
- [ ] Animations working in both themes
- [ ] Browser compatibility confirmed
- [ ] Mobile responsiveness verified
- [ ] Any color refinements completed
- [ ] Final build successful
- [ ] Documentation updated

---

## Quick Reference: Key Files

| File | Purpose | Phase |
|------|---------|-------|
| `src/theme.js` | Theme definitions (dark & light) | 1 ✅ |
| `src/App.jsx` | Main app, add context wrapper | 2, 4 |
| `src/components/sharedStyles.js` | Shared components (high impact) | 2 |
| `src/components/Line.jsx` | Decorative lines | 2 |
| `src/components/Navbar.jsx` | Navigation | 2 |
| `src/components/Projects.jsx` | Gallery page | 3 |
| `src/Cursor.jsx` | Custom cursor | 3 |
| `src/context/ThemeContext.jsx` | Theme state management | 4 |
| `src/components/ThemeToggle.jsx` | Toggle button UI | 4 |

---

## Estimated Time per Phase

- ✅ Phase 1: 1 hour (COMPLETE)
- Phase 2: 2-3 hours (4 files, 40+ color replacements)
- Phase 3: 1-2 hours (2 files + verification)
- Phase 4: 1-2 hours (2 new files, 1 update)
- Phase 5: 2-3 hours (comprehensive testing)

**Total**: 7-11 hours remaining

---

## Tips for Success

1. **Work in Order**: Complete each phase fully before moving to next
2. **Test After Each File**: Run `yarn build` after updating each file
3. **Use Find/Replace**: Many color replacements are repetitive
4. **Keep Dark Mode Working**: Until Phase 4, everything should still look identical to original
5. **Take Screenshots**: Before/after comparisons help catch regressions
6. **Commit Often**: Commit after each phase completion
7. **Check THEME_ANALYSIS.md**: Reference for color mappings

---

## Next Step

**Run Prompt 2.1** to start Phase 2 by updating App.jsx.

Each prompt is designed to be copy/pasted to me (Claude) for autonomous execution. I'll make the changes, verify the build, and report back before moving to the next step.

Ready to proceed with Phase 2? Just paste Prompt 2.1!
