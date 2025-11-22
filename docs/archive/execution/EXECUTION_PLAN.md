# Codebase Cleanup Execution Plan - Parallelizable Tasks

> **Goal**: Clean and optimize codebase for maximum AI agent readability with minimal context
> **Current State**: 5,872 LOC, 806MB assets, 40% redundancy
> **Target State**: 3,500 LOC, 200MB assets, 5% redundancy, fully documented
> **Total Time**: 4-5 days (with parallel execution)

---

## How to Use This Plan

1. **Each task is independent within its wave** - Run all tasks in a wave in parallel
2. **Complete all tasks in a wave before moving to the next** - Waves have dependencies
3. **Each task has a unique ID** for tracking (e.g., W1-T1 = Wave 1, Task 1)
4. **Validation criteria** included for each task
5. **Estimated time** assumes single developer/agent per task

---

## Wave 1: Cleanup & Removal (ALL PARALLEL - 30 minutes total)

**Goal**: Remove all dead code, duplicate assets, and unused dependencies
**Dependencies**: None - all tasks are independent
**Can run**: 6 parallel Claude Code sessions

### W1-T1: Delete Duplicate Assets Directory
**Time**: 5 minutes | **Risk**: Low | **Impact**: 🔥🔥🔥

**Context**:
- `/assets/` (351MB) is a complete duplicate of `/public/assets/` (455MB)
- All code references should use `/assets/...` which resolves to `/public/assets/` in production
- Root `/assets/` directory is orphaned

**Tasks**:
```bash
# 1. Verify no code references the root /assets directory
grep -r "\"../../../assets" src/
grep -r "\"../../assets" src/ | grep -v "public/assets"

# 2. Delete the duplicate directory
rm -rf assets/

# 3. Verify build still works
npm run build
```

**If errors occur**:
```bash
# If build fails after deletion
1. Check error: npm run build 2>&1 | grep -i "asset"
2. Search for hard-coded paths: grep -r '/assets' src/ --exclude-dir=node_modules | grep -v "public/assets"
3. Fix any incorrect paths before re-attempting deletion
```

**Validation**:
- [ ] `/assets/` directory deleted: `ls -la assets/ 2>&1 | grep "No such file"`
- [ ] Build succeeds: `npm run build && echo "✓ Build successful"`
- [ ] Dev server starts: `npm run dev` (wait 5s, check http://localhost:3000)
- [ ] Verify image loads: Open /, check if background/hero images display
- [ ] Check console: DevTools Console shows 0 errors

**Output**: Commit with message "Remove duplicate assets directory (-351MB)"

---

### W1-T2: Remove Dead Code - HorizontalScroll.jsx
**Time**: 5 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- `/src/components/HorizontalScroll.jsx` (198 lines) is never imported
- Similar functionality exists in `Archive.jsx`
- Contains wrong asset paths (`/public/assets/...` instead of `/assets/...`)

**Tasks**:
```bash
# 1. Verify file is not imported anywhere
grep -r "HorizontalScroll" src/

# 2. Delete the file
rm src/components/HorizontalScroll.jsx

# 3. Verify build
npm run build
```

**Validation**:
- [ ] File deleted: `ls src/components/HorizontalScroll.jsx 2>&1 | grep "No such file"`
- [ ] No import errors: `npm run build 2>&1 | grep -i "horizontalscroll" && echo "✗ Still referenced" || echo "✓ Clean"`
- [ ] Grep shows no references: `grep -r "HorizontalScroll" src/ || echo "✓ No references"`

**Output**: Commit with message "Remove unused HorizontalScroll component (-198 lines)"

---

### W1-T3: Remove Dead Code - ProjectMenu.jsx
**Time**: 5 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- `/src/components/ProjectMenu.jsx` (175 lines) is never imported
- Replaced by current `Projects.jsx` implementation
- Contains duplicate `Container` and `glow` animation

**Tasks**:
```bash
# 1. Verify file is not imported
grep -r "ProjectMenu" src/

# 2. Delete the file
rm src/components/ProjectMenu.jsx

# 3. Verify build
npm run build
```

**Validation**:
- [ ] File deleted: `ls src/components/ProjectMenu.jsx 2>&1 | grep "No such file"`
- [ ] No import errors: `npm run build && echo "✓ Build passes"`
- [ ] Projects page loads: Open http://localhost:3000/projects, verify grid displays 6 projects

**Output**: Commit with message "Remove unused ProjectMenu component (-175 lines)"

---

### W1-T4: Remove Dead Code - Hoodie & Sticker Project Pages
**Time**: 5 minutes | **Risk**: Low | **Impact**: 🔥🔥

**Context**:
- `Hoodie.jsx` (262 lines) and `Sticker.jsx` (262 lines) have no routes in App.jsx
- Not listed in `/src/data/projectname.jsx`
- Completely orphaned components

**Tasks**:
```bash
# 1. Verify not in routes
grep -r "Hoodie" src/App.jsx
grep -r "Sticker" src/App.jsx

# 2. Verify not in data
grep -r "Hoodie" src/data/
grep -r "Sticker" src/data/

# 3. Delete files
rm src/components/Projectfiles/Hoodie.jsx
rm src/components/Projectfiles/Sticker.jsx

# 4. Verify build
npm run build
```

**Validation**:
- [ ] Both files deleted
- [ ] No import errors
- [ ] All project pages still accessible

**Output**: Commit with message "Remove unused Hoodie and Sticker project pages (-524 lines)"

---

### W1-T5: Remove Dead Code - shtContent.json & Clean Cursor.jsx
**Time**: 10 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- `shtContent.json` (27 lines) is never imported despite being for Grove project
- `Cursor.jsx` has 41 lines of commented dead code (CursorPeePee component)

**Tasks**:
```bash
# 1. Verify JSON not imported
grep -r "shtContent" src/

# 2. Delete JSON file
rm src/components/Projectfiles/shtContent.json

# 3. Edit Cursor.jsx - remove lines 1-41 (commented CursorPeePee component)
# Open file and delete the commented component definition
```

**Specific edit for Cursor.jsx**:
- Read the file first to identify exact lines
- Remove all commented `CursorPeePee` styled-component code
- Keep only the active Cursor component

**Validation**:
- [ ] shtContent.json deleted
- [ ] Cursor.jsx has no commented code
- [ ] Custom cursor still works in browser
- [ ] Build succeeds

**Output**: Commit with message "Remove unused shtContent.json and clean Cursor.jsx dead code (-68 lines)"

---

### W1-T6: Remove Unnecessary Dependencies
**Time**: 5 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- Babel packages (`@babel/core`, `@babel/preset-env`, `@babel/preset-react`) not needed
- Vite uses esbuild for JSX transformation
- Saves 5MB in node_modules

**Tasks**:
```bash
# 1. Remove packages
npm uninstall @babel/core @babel/preset-env @babel/preset-react

# 2. Verify build still works
npm run build

# 3. Verify dev server works
npm run dev
# (Test for 30 seconds, then Ctrl+C)
```

**Validation**:
- [ ] Packages removed from package.json
- [ ] Build succeeds
- [ ] Dev server starts without errors
- [ ] Hot reload works

**Output**: Commit with message "Remove unnecessary Babel dependencies (Vite handles JSX)"

---

**Wave 1 Summary**:
- **Total Time**: 30 minutes (if run in parallel)
- **LOC Removed**: 1,025 lines
- **Assets Removed**: 351 MB
- **Dependencies Removed**: 3 packages
- **Commits**: 6 separate commits

---

## Wave 2: Configuration & Foundation (2 PARALLEL - 45 minutes total)

**Goal**: Fix configs and create foundation for consolidation
**Dependencies**: Wave 1 complete (clean slate)
**Can run**: 2 parallel Claude Code sessions

### W2-T1: Fix package.json Configuration
**Time**: 15 minutes | **Risk**: Low | **Impact**: 🔥🔥

**Context**:
- Name is generic "react-app" instead of "portfolioyush"
- Homepage points to wrong repo "goofybugga.github.io/thewebsite"
- Deploy script uses wrong directory "build" instead of "dist"

**Tasks**:
1. Read current package.json
2. Update these fields:
```json
{
  "name": "portfolioyush",
  "version": "1.0.0",
  "description": "Portfolio website showcasing design and creative projects",
  "homepage": "https://jshengdev.github.io/portfolioyush",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```
3. Verify build and deploy script
```bash
npm run build
# Verify dist/ directory exists
ls -la dist/
```

**Validation**:
- [ ] package.json updated with correct values
- [ ] Build creates dist/ directory
- [ ] No errors in build

**Output**: Commit with message "Fix package.json configuration (name, homepage, deploy script)"

---

### W2-T2: Create Theme System Foundation
**Time**: 45 minutes | **Risk**: Low | **Impact**: 🔥🔥🔥

**Context**:
- Colors, fonts, spacing hardcoded 200+ times across files
- No centralized design system
- Makes updates difficult

**Tasks**:

1. **Create `/src/theme.js`**:
```javascript
export const theme = {
  colors: {
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.6)',
      muted: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      primary: '#000000',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    accent: {
      glow: 'rgba(255, 255, 255, 0.8)',
    },
  },

  fonts: {
    primary: "'work sans', sans-serif",
    display: "'ade', serif",
  },

  spacing: {
    frame: '20px',
    section: '60px',
    element: '20px',
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },

  transitions: {
    standard: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
}
```

2. **Wrap App with ThemeProvider in `/src/App.jsx`**:
- Import ThemeProvider from styled-components
- Import theme from './theme'
- Wrap the entire app content with `<ThemeProvider theme={theme}>`

3. **Test**:
```bash
npm run build
npm run dev
# Verify app loads
```

**Validation**:
- [ ] theme.js file created with all design tokens
- [ ] App.jsx wrapped with ThemeProvider
- [ ] App loads without errors
- [ ] Build succeeds

**Output**: Commit with message "Create centralized theme system with design tokens"

---

**Wave 2 Summary**:
- **Total Time**: 45 minutes
- **Files Created**: 1 (theme.js)
- **Files Modified**: 2 (package.json, App.jsx)
- **Commits**: 2 separate commits

---

## Wave 3: Consolidation (5 PARALLEL - 2 hours total)

**Goal**: Consolidate duplicate styled-components and centralize data
**Dependencies**: Wave 2 complete (theme.js exists, ThemeProvider active)
**Can run**: 5 parallel Claude Code sessions

### W3-T1: Consolidate Container Components
**Time**: 45 minutes | **Risk**: Low | **Impact**: 🔥🔥🔥

**Context**:
- `Container` styled-component duplicated in 16 files
- Each is ~20 lines, totaling 320 redundant lines
- Should be in sharedStyles.js

**Tasks**:

1. **Add to `/src/components/sharedStyles.js`**:
```javascript
export const Container = styled.div`
  position: fixed;
  top: ${props => props.theme.spacing.frame};
  left: ${props => props.theme.spacing.frame};
  right: ${props => props.theme.spacing.frame};
  bottom: ${props => props.theme.spacing.frame};
  overflow: hidden;
  background: ${props => props.theme.colors.background.primary};
`
```

2. **Update these files to import instead of define**:
- App.jsx
- Navbar.jsx
- About.jsx
- Contact.jsx
- Hero.jsx
- Projects.jsx
- Archive.jsx
- Grove.jsx
- CapsuleMachine.jsx
- Ark.jsx
- AP.jsx
- Collection.jsx
- Lens.jsx

3. **Process for each file**:
- Add import: `import { Container } from './sharedStyles'` (or `'./components/sharedStyles'`)
- Remove local Container definition
- Verify no other code depends on the local version

4. **Test**:
```bash
npm run build
npm run dev
# Navigate to each page and verify layout looks correct
```

**Validation**:
- [ ] Container added to sharedStyles.js
- [ ] All 13+ files import Container instead of defining it
- [ ] No local Container definitions remain
- [ ] All pages render correctly
- [ ] Build succeeds

**Output**: Commit with message "Consolidate Container styled-component to sharedStyles (-300 lines)"

---

### W3-T2: Consolidate Title Components
**Time**: 45 minutes | **Risk**: Low | **Impact**: 🔥🔥

**Context**:
- `Title` styled-component duplicated in 9 files
- Each is ~15 lines, totaling 135 redundant lines

**Tasks**:

1. **Add to `/src/components/sharedStyles.js`**:
```javascript
export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  font-size: 36px;
  letter-spacing: -1px;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.text.primary};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`
```

2. **Update these files**:
- About.jsx
- Contact.jsx
- Hero.jsx
- Archive.jsx
- Projects.jsx
- Grove.jsx (check if has Title)
- CapsuleMachine.jsx
- Ark.jsx
- AP.jsx

3. **Process**:
- Import Title from sharedStyles
- Remove local Title definition
- Verify styling matches

4. **Test**:
```bash
npm run build
# Test each page with Title
```

**Validation**:
- [ ] Title added to sharedStyles.js with theme variables
- [ ] All files import Title
- [ ] No local Title definitions
- [ ] All titles display correctly
- [ ] Build succeeds

**Output**: Commit with message "Consolidate Title styled-component to sharedStyles (-120 lines)"

---

### W3-T3: Consolidate Container2 & Add Global Animations
**Time**: 45 minutes | **Risk**: Low | **Impact**: 🔥🔥

**Context**:
- `Container2` duplicated in 5 files (About, Archive, Contact, Hero, plus sharedStyles)
- `glow` animation duplicated in 3 files (Projects, NextProject, ProjectMenu)
- Container2 already in sharedStyles but not used everywhere

**Tasks**:

1. **Verify Container2 exists in sharedStyles.js**
   - If not, add it with theme variables

2. **Add glow animation to sharedStyles.js**:
```javascript
import styled, { keyframes } from 'styled-components'

export const glowAnimation = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`
```

3. **Update files using Container2**:
- About.jsx
- Archive.jsx
- Contact.jsx
- Hero.jsx
- (Remove local definitions, import from sharedStyles)

4. **Update files using glow animation**:
- Projects.jsx
- NextProject.jsx
- (Remove local definitions, import glowAnimation from sharedStyles)

5. **Test**:
```bash
npm run build
npm run dev
# Verify glow animations still work
# Verify page layouts correct
```

**Validation**:
- [ ] Container2 in sharedStyles with theme variables
- [ ] glowAnimation exported from sharedStyles
- [ ] All files import instead of define
- [ ] Animations work correctly
- [ ] Build succeeds

**Output**: Commit with message "Consolidate Container2 and glow animation to sharedStyles (-150 lines)"

---

### W3-T4: Centralize Data Layer - Create data/archive.js
**Time**: 30 minutes | **Risk**: Low | **Impact**: 🔥🔥

**Context**:
- Archive data (17 items) hardcoded in Archive.jsx (lines 7-120)
- Should be in separate data file for easier maintenance

**Tasks**:

1. **Create `/src/data/archive.js`**:
- Copy the archiveItems array from Archive.jsx lines 7-120
- Export as named export

```javascript
export const archiveItems = [
  {
    name: "Grove",
    image: "/assets/GROVE/Grovefrontpage.png",
  },
  // ... copy all 17 items
]
```

2. **Update `/src/components/Archive.jsx`**:
- Remove the hardcoded archiveItems array (lines 7-120)
- Add import: `import { archiveItems } from '../data/archive'`
- Verify component still works

3. **Test**:
```bash
npm run build
npm run dev
# Navigate to /archive and verify gallery works
```

**Validation**:
- [ ] archive.js created with all 17 items
- [ ] Archive.jsx imports archiveItems
- [ ] No hardcoded data in Archive.jsx
- [ ] Archive page displays correctly
- [ ] Build succeeds

**Output**: Commit with message "Extract archive data to centralized data file"

---

### W3-T5: Optimize Cursor Animation (setInterval → RAF)
**Time**: 30 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- Cursor.jsx uses setInterval (runs every 5ms regardless of frame rate)
- Should use requestAnimationFrame for better performance and 60fps sync

**Tasks**:

1. **Read `/src/Cursor.jsx`** - identify the setInterval code

2. **Replace setInterval logic with RAF**:

Current (around lines 65-68):
```javascript
const interval = setInterval(() => {
  setRingX((prev) => prev + (dotX - prev) * 0.1);
  setRingY((prev) => prev + (dotY - prev) * 0.1);
}, 5);
```

Replace with:
```javascript
useEffect(() => {
  let rafId

  const animate = () => {
    setRingX(prev => prev + (dotX - prev) * 0.1)
    setRingY(prev => prev + (dotY - prev) * 0.1)
    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)

  return () => {
    if (rafId) cancelAnimationFrame(rafId)
  }
}, [dotX, dotY])
```

3. **Remove the setInterval cleanup code**

4. **Test**:
```bash
npm run dev
# Move mouse around and verify cursor follows smoothly
# Open dev tools performance tab and verify 60fps
```

**Validation**:
- [ ] setInterval removed
- [ ] requestAnimationFrame implemented
- [ ] Cursor animation smooth
- [ ] No performance warnings
- [ ] Build succeeds

**Output**: Commit with message "Optimize cursor animation with requestAnimationFrame (60fps)"

---

**Wave 3 Summary**:
- **Total Time**: 2 hours (45min + 45min + 45min + 30min + 30min)
- **LOC Removed**: ~570 lines of duplication
- **Files Created**: 1 (data/archive.js)
- **Files Modified**: 20+
- **Commits**: 5 separate commits

---

## Wave 4: Documentation & Meta (3 PARALLEL - 1.5 hours total)

**Goal**: Add comprehensive documentation for AI agent comprehension
**Dependencies**: Wave 3 complete (codebase consolidated)
**Can run**: 3 parallel Claude Code sessions

### W4-T1: Create Comprehensive README.md
**Time**: 45 minutes | **Risk**: Low | **Impact**: 🔥🔥🔥

**Context**:
- Current README is minimal ("# thewebsite")
- Needs comprehensive documentation for agents to understand project

**Tasks**:

1. **Create comprehensive `/README.md`** with these sections:

   **Required Sections**:
   - **Tech Stack**: List React 18.2, Vite 6.0, Router 7.0, styled-components 6.1, Framer Motion 11.15, Three.js 0.171
   - **Project Structure**: Tree diagram showing src/, public/assets/, dist/ with key files
   - **Getting Started**: npm install, npm run dev (port 3000), npm run build, npm run deploy
   - **Routes**: Document 11 routes (/, /about, /archive, /contact, /projects, 6 project detail routes)
   - **Architecture**: Explain theme system, shared components, data layer, performance patterns
   - **Component Overview**: Brief description of 13 core components organized by category
   - **Styling System**: Describe theme.js structure and usage with styled-components
   - **Adding a New Project**: 4-step process (create component, add route, update data, add assets)
   - **Maintenance**: Code quality standards, asset management, dependency updates

   **Final Note**: Add "For AI Agents" section referencing key files: theme.js, sharedStyles.js, App.jsx, data/

2. **Test**:
- Verify markdown renders correctly
- Check all links

**Validation**:
- [ ] README.md comprehensive and clear
- [ ] All sections complete
- [ ] Accurate project structure
- [ ] Helpful for AI agents

**Output**: Commit with message "Add comprehensive README with architecture and usage documentation"

---

### W4-T2: Add JSDoc Comments to Key Files
**Time**: 45 minutes | **Risk**: Low | **Impact**: 🔥🔥

**Context**:
- Key files lack documentation
- AI agents benefit from JSDoc comments
- Improves code comprehension

**Tasks**:

1. **Add JSDoc to `/src/theme.js`**:
```javascript
/**
 * Centralized design system with all design tokens
 * @module theme
 *
 * Usage: Access via styled-components ThemeProvider
 * Example: ${props => props.theme.colors.text.primary}
 */
export const theme = {
  // ... existing code
}
```

2. **Add JSDoc to `/src/components/sharedStyles.js`**:
```javascript
/**
 * Shared styled-components used across the application
 * Reduces duplication and ensures consistent styling
 * @module sharedStyles
 */

/**
 * Main container with fixed positioning and frame spacing
 * Used by: All page components
 */
export const Container = styled.div`...`

/**
 * Page title component
 * Responsive with mobile breakpoint
 */
export const Title = styled.h1`...`

// ... add comments for each export
```

3. **Add JSDoc to `/src/App.jsx`**:
```javascript
/**
 * Main application component with routing and layout
 * - Defines all routes
 * - Provides ThemeProvider context
 * - Implements fixed frame layout
 * - Handles page transitions with Framer Motion
 */
function App() {
  // ... existing code
}
```

4. **Add JSDoc to `/src/data/projectname.jsx` and `/src/data/archive.js`**:
```javascript
/**
 * Project metadata for main projects displayed on /projects page
 * @type {Array<{name: string, paragraph: string, link: string, image: string}>}
 */
export const projectParty = [...]

/**
 * Archive gallery items for horizontal scrolling gallery
 * @type {Array<{name: string, image: string}>}
 */
export const archiveItems = [...]
```

**Validation**:
- [ ] theme.js has module and usage docs
- [ ] sharedStyles.js has comments for all exports
- [ ] App.jsx has component description
- [ ] Data files have type annotations
- [ ] Build succeeds

**Output**: Commit with message "Add JSDoc comments to key files for better AI comprehension"

---

### W4-T3: Update index.html Meta Tags & Add Component Documentation
**Time**: 30 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- index.html missing SEO meta tags
- Need proper page title and description
- Helps with discoverability

**Tasks**:

1. **Update `/index.html`** with SEO meta tags:
   - Add primary meta tags: title, description, author
   - Add Open Graph tags: og:type, og:url, og:title, og:description, og:image
   - Add Twitter Card tags: twitter:card, twitter:url, twitter:title, twitter:description, twitter:image
   - Use "Johnny Sheng's Portfolio - Designer/Developer" as title
   - Keep existing font imports and script tags

2. **Create `/ARCHITECTURE.md`** documenting:
   - **Component Hierarchy**: Tree showing App → Cursor/Navbar/Line/ShaderVisual/Routes with all 11 routes
   - **Data Flow**: Diagram showing theme.js, projectname.jsx, archive.js flowing to components
   - **Styling Architecture**: Theme System → ThemeProvider → Shared Components → Pages
   - **Key Patterns**: 4 rules (use theme variables, import from sharedStyles, centralize data, asset paths)
   - **For AI Agents**: Guidelines on modifying codebase (naming conventions, file organization)

**Validation**:
- [ ] index.html has comprehensive meta tags
- [ ] ARCHITECTURE.md created
- [ ] Documentation is clear and helpful

**Output**: Commit with message "Add SEO meta tags and architecture documentation"

---

**Wave 4 Summary**:
- **Total Time**: 1.5 hours
- **Files Created**: 2 (README.md rewrite, ARCHITECTURE.md)
- **Files Modified**: Several with JSDoc comments
- **Commits**: 3 separate commits

---

## Wave 5: Asset Optimization (2 PARALLEL - 2 hours total)

**Goal**: Optimize images and assets for performance
**Dependencies**: Wave 4 complete (documentation in place)
**Can run**: 2 parallel Claude Code sessions

### W5-T1: Optimize Oversized Images
**Time**: 1 hour | **Risk**: Medium | **Impact**: 🔥🔥🔥

**Context**:
- `Subject 2.png` is 8MB (should be <500KB)
- `microw.png` is 5.9MB (should be <300KB)
- Total savings: ~13MB

**Tasks**:

1. **Find the oversized images**:
```bash
find public/assets -type f -size +1M -name "*.png" -o -name "*.jpg"
```

2. **Use online tools** (since imagemin might require setup):
- Go to squoosh.app or tinypng.com
- Upload `Subject 2.png` and `microw.png`
- Export as WebP with quality 80%
- Download optimized versions

3. **Replace images**:
```bash
# Backup originals first
cp public/assets/[path]/Subject\ 2.png public/assets/[path]/Subject\ 2.png.backup
cp public/assets/[path]/microw.png public/assets/[path]/microw.png.backup

# Replace with optimized versions
# (manual copy from downloads)
```

4. **Verify**:
```bash
npm run build
npm run dev
# Check that images load correctly
# Verify file sizes are smaller
```

**Validation**:
- [ ] Subject 2.png reduced from 8MB to <500KB
- [ ] microw.png reduced from 5.9MB to <300KB
- [ ] Images still display correctly
- [ ] No visual quality loss

**Output**: Commit with message "Optimize oversized images (13MB → <1MB)"

---

### W5-T2: Consolidate Font Loading
**Time**: 30 minutes | **Risk**: Low | **Impact**: 🔥

**Context**:
- Fonts loaded in TWO places:
  - index.html (Google Fonts CDN)
  - src/assets/fonts/fonts.css (also imports Google Fonts)
- Causes duplicate requests

**Tasks**:

1. **Check `/index.html`** - verify Google Fonts link exists

2. **Check `/src/assets/fonts/fonts.css`** - identify what it imports

3. **Remove duplicate**:
- Keep Google Fonts CDN in index.html (better caching)
- Remove or comment out duplicate imports in fonts.css
- Keep only local font files if any exist

4. **Update index.html** to use font-display for performance:
```html
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

5. **Test**:
```bash
npm run dev
# Verify fonts load correctly
# Check Network tab - no duplicate font requests
```

**Validation**:
- [ ] Fonts load from single source
- [ ] No duplicate network requests
- [ ] All fonts display correctly
- [ ] font-display=swap added

**Output**: Commit with message "Consolidate font loading and add font-display optimization"

---

**Wave 5 Summary**:
- **Total Time**: 1.5 hours
- **Assets Optimized**: ~13MB saved
- **Performance**: Faster font loading
- **Commits**: 2 separate commits

---

## Rollback Strategy

### Per-Task Rollback
If a task breaks something, revert the specific commit:
```bash
git log --oneline -10  # Find the commit
git revert <commit-hash>  # Creates new commit undoing changes
npm run build && npm run dev  # Verify fix
```

### Per-Wave Rollback
If an entire wave causes issues:
```bash
# Option 1: Revert all commits in wave
git log --oneline | grep "Wave 3"  # Find Wave 3 commits
git revert <newest-hash>^..<oldest-hash>

# Option 2: Hard reset (DESTRUCTIVE - only if not pushed)
git reset --hard <wave-start-hash>
```

### Best Practice: Branch Strategy
```bash
# At start of each wave
git checkout main
git checkout -b wave-1-cleanup

# After wave completion and testing
git checkout main
git merge wave-1-cleanup --no-ff -m "Complete Wave 1: Cleanup"
git tag wave-1-complete
```

###Emergency Recovery
If everything is broken:
```bash
git stash                  # Save current changes
git checkout main          # Return to main
git pull origin main       # Get latest good state
npm install && npm run build && npm run dev
```

---

## Wave 6: Advanced Optimization (OPTIONAL - Choose Based on Risk Tolerance)

**Goal**: Advanced refactoring for maximum maintainability  
**Dependencies**: All previous waves complete  
**Risk Level**: MIXED (Low to High)

### Task Risk Assessment

| Task | Risk | Impact | Time | Recommendation |
|------|------|--------|------|----------------|
| W6-T1: Lazy Loading | Low | 🔥🔥🔥 | 1.5h | ✅ **Execute** - Standard React pattern |
| W6-T2: Simplify Line.jsx | **HIGH** | 🔥🔥🔥 | 2h | ⚠️ **Skip** unless design approved |
| W6-T3: Extract Shaders | Low | 🔥 | 1h | ✅ **Execute** - Low risk |

**Recommended**: Execute W6-T1 and W6-T3. Skip W6-T2 unless you can QA all routes visually.

### W6-T1: Implement Code Splitting with Lazy Loading
**Time**: 1.5 hours | **Risk**: Medium | **Impact**: 🔥🔥🔥

**Context**:
- All routes load on initial page load
- Can reduce initial bundle by 38% with lazy loading

**Tasks**:

1. **Update `/src/App.jsx`** to use React lazy loading:
   - Import `lazy` and `Suspense` from 'react'
   - Convert 11 component imports to lazy: `const Hero = lazy(() => import('./components/Hero'))`
   - Wrap Routes with `<Suspense fallback={<div>Loading...</div>}>`
   - Keep Cursor, Navbar, Line, ShaderVisual as regular imports (always needed)

2. **Test**:
```bash
npm run build
# Check dist/ for code-split chunks
npm run dev
# Navigate between pages and verify they load
```

**Validation**:
- [ ] All components lazy loaded
- [ ] Suspense fallback works
- [ ] Build creates multiple chunks
- [ ] Pages load correctly
- [ ] Initial bundle size reduced

**Output**: Commit with message "Implement code splitting with lazy loading (-38% initial bundle)"

---

### W6-T2: Simplify Line.jsx Animation System
**Time**: 2 hours | **Risk**: High | **Impact**: 🔥🔥🔥

**Context**:
- Line.jsx has 288 lines of hardcoded pixel values
- Not responsive, hard to maintain
- Can be simplified to ~50 lines

**Tasks**:

1. **Read `/src/components/Line.jsx`** thoroughly to understand current animation logic

2. **Create simplified version** using position lookup:
   - Replace 288 lines of variants with single position object mapping routes to {x, y, rotate, height}
   - Use `useLocation()` to get current route
   - Single `<motion.div>` with `animate={positions[location.pathname]}` 
   - Fallback to home position if route not found

3. **Backup original**: `cp src/components/Line.jsx src/components/Line.jsx.backup`

4. **Replace with simplified version**: ~80 lines vs 391 lines

5. **Test thoroughly**:
```bash
npm run dev
# Navigate to EVERY page and verify line animations
# Compare with backup visuals
```

**Validation**:
- [ ] Line.jsx reduced from 391 to ~80 lines
- [ ] All animations work correctly
- [ ] No visual regressions
- [ ] Build succeeds

**Output**: Commit with message "Simplify Line.jsx animation system (-311 lines)"

**Note**: This is HIGH RISK - may require design approval if animations look different

---

### W6-T3: Extract GLSL Shaders to Separate Files
**Time**: 1 hour | **Risk**: Low | **Impact**: 🔥

**Context**:
- ShaderVisual.jsx has 140 lines of embedded GLSL code
- Hard to edit without syntax highlighting
- Should be in .glsl files

**Tasks**:

1. **Create shader directory**:
```bash
mkdir -p src/shaders
```

2. **Create `/src/shaders/truchet.vert.glsl`**:
- Extract vertex shader from ShaderVisual.jsx
- Save as separate file

3. **Create `/src/shaders/truchet.frag.glsl`**:
- Extract fragment shader from ShaderVisual.jsx
- Save as separate file

4. **Update Vite config** to handle .glsl files:
```javascript
// vite.config.js
export default {
  plugins: [react()],
  assetsInclude: ['**/*.glsl'],
  server: { port: 3000 },
  build: { outDir: 'dist' }
}
```

5. **Update `/src/components/ShaderVisual.jsx`**:
```javascript
import vertexShader from '../shaders/truchet.vert.glsl?raw'
import fragmentShader from '../shaders/truchet.frag.glsl?raw'

// Use imported shaders instead of inline strings
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: { /* ... */ }
})
```

6. **Test**:
```bash
npm run build
npm run dev
# Verify shader background displays correctly
```

**Validation**:
- [ ] 2 .glsl files created
- [ ] ShaderVisual.jsx imports shaders
- [ ] Shader background displays correctly
- [ ] Build succeeds

**Output**: Commit with message "Extract GLSL shaders to separate files for better maintainability"

---

**Wave 6 Summary**:
- **Total Time**: 4.5 hours
- **LOC Removed**: ~311 lines (if Line.jsx simplified)
- **Maintainability**: Significantly improved
- **Commits**: 3 separate commits

---

## Automated Testing Scripts

Create these helper scripts for faster validation:

### 1. Route Checker (`/scripts/test-routes.sh`)
```bash
#!/bin/bash
echo "Testing routes..."
npm run build &>/dev/null || { echo "✗ Build failed"; exit 1; }
npm run dev &>/dev/null &
PID=$!
sleep 5

ROUTES=("/ " "/about" "/archive" "/contact" "/projects" "/projects/Grove")
for route in "${ROUTES[@]}"; do
  curl -s "http://localhost:3000$route" | grep -q "root" && echo "✓ $route" || echo "✗ $route FAILED"
done

kill $PID
```

### 2. Asset Checker (/scripts/check-assets.sh`)
```bash
#!/bin/bash
echo "Checking for broken image references..."
grep -r 'src="/assets' public/ src/ | while read line; do
  path=$(echo $line | sed 's/.*src="\([^"]*\)".*/\1/')
  [ -f "public$path" ] || echo "✗ Missing: $path"
done
echo "✓ Asset check complete"
```

### 3. Build Size Tracker (`/scripts/track-build-size.sh`)
```bash
#!/bin/bash
npm run build &>/dev/null
du -sh dist/ | awk '{print "Build size: " $1}'
du -sh public/assets/ | awk '{print "Asset size: " $1}'
find src -name "*.jsx" -o -name "*.js" | xargs wc -l | tail -1 | awk '{print "LOC: " $1}'
```

**Usage in Wave 7**:
```bash
chmod +x scripts/*.sh
./scripts/test-routes.sh
./scripts/check-assets.sh
./scripts/track-build-size.sh
```

---

## Final Wave: Integration & Testing (1 task - 1 hour)

**Goal**: Verify everything works together
**Dependencies**: All chosen waves complete
**Must run**: Single session to test integration

### W7-T1: Full Integration Test & Final Documentation
**Time**: 1 hour | **Risk**: Low | **Impact**: 🔥🔥🔥

**Context**:
- All changes need integration testing
- Need final cleanup and documentation update

**Tasks**:

1. **Full build test**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Verify build output
ls -lh dist/
```

2. **Comprehensive manual testing**:
```bash
npm run dev
```

**If errors occur**:
```bash
# If routes fail loading
1. Check browser console for specific errors
2. Verify lazy loading: grep -r "lazy(" src/App.jsx
3. Check Suspense wrapper exists
4. Test route by route to isolate issue
```

**Validation** (use automated script above or manual):
- [ ] Run `./scripts/test-routes.sh` - All routes return ✓
- [ ] / - Hero title "johnny sheng's portfolio" visible, AppSlider animating
- [ ] /projects - Grid shows 6 projects with hover previews
- [ ] /projects/CapsuleMachine - Content loads, NextProject widget at bottom
- [ ] Custom cursor - Ring follows with lag, dot tracks exactly
- [ ] Line animations - Line moves/transforms on route change
- [ ] DevTools Console - 0 errors

3. **Performance check**:
- Open DevTools Network tab
- Check bundle sizes
- Verify no duplicate resource loading
- Check initial load time

4. **Update CODEBASE_INDEX.md** with final stats:
```markdown
## Final State (After Optimization)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Lines of Code | 5,872 | ~3,500 | -40% |
| Asset Size | 806MB | ~200MB | -75% |
| Dead Code | 957 lines | 0 lines | -100% |
| Component Files | 27 | 18 | -33% |
| Duplicate Code | ~2,100 lines | ~100 lines | -95% |
```

5. **Create CHANGELOG.md**:
```markdown
# Changelog

## [2.0.0] - 2025-11-21

### Removed
- Deleted duplicate /assets directory (-351MB)
- Removed 5 dead code files (-957 lines)
- Removed unnecessary Babel dependencies
- Cleaned Cursor.jsx commented code (-41 lines)

### Added
- Centralized theme system (theme.js)
- Comprehensive README and documentation
- JSDoc comments for key files
- SEO meta tags in index.html
- ARCHITECTURE.md for AI agents

### Changed
- Consolidated 16 Container components to sharedStyles.js
- Consolidated 9 Title components to sharedStyles.js
- Moved archive data to centralized data/archive.js
- Optimized cursor animation with requestAnimationFrame
- Fixed package.json configuration
- Optimized oversized images (13MB → <1MB)
- Consolidated font loading

### Improved
- 40% less code
- 75% smaller assets
- Better performance (60fps animations)
- Better maintainability (no duplication)
- Better documentation (comprehensive docs)
```

**Validation**:
- [ ] All routes work correctly
- [ ] No console errors
- [ ] All features functional
- [ ] Build succeeds
- [ ] Documentation updated

**Output**: Commit with message "Final integration test and documentation update"

---

## Summary

### Execution Order (Waves)

**Required Waves** (4.5 hours total with parallelization):
1. **Wave 1**: Cleanup (6 parallel tasks) - 30 min
2. **Wave 2**: Configuration (2 parallel tasks) - 45 min
3. **Wave 3**: Consolidation (5 parallel tasks) - 2 hrs
4. **Wave 4**: Documentation (3 parallel tasks) - 1.5 hrs
5. **Wave 5**: Assets (2 parallel tasks) - 1.5 hrs
6. **Wave 7**: Integration (1 task) - 1 hr

**Optional Wave** (4.5 hours):
- **Wave 6**: Advanced Optimization (3 parallel tasks) - 4.5 hrs

### Total Impact

**With Required Waves Only**:
- LOC: 5,872 → ~4,000 (-32%)
- Assets: 806MB → ~200MB (-75%)
- Dead code: 0%
- Duplication: ~10%
- Time: 4.5 hours (parallelized)

**With All Waves**:
- LOC: 5,872 → ~3,500 (-40%)
- Assets: 806MB → ~200MB (-75%)
- Dead code: 0%
- Duplication: ~5%
- Code splitting: -38% initial bundle
- Time: 9 hours (parallelized)

### Parallelization Strategy

**Maximum parallel sessions**:
- Wave 1: 6 sessions simultaneously
- Wave 2: 2 sessions simultaneously
- Wave 3: 5 sessions simultaneously
- Wave 4: 3 sessions simultaneously
- Wave 5: 2 sessions simultaneously
- Wave 6: 3 sessions simultaneously
- Wave 7: 1 session (integration)

**Optimal approach**: Assign each task to separate Claude Code session, complete wave fully before moving to next wave.

---

## Task Tracking Template

Copy this to track progress:

```
WAVE 1 - Cleanup (30 min)
[ ] W1-T1: Delete duplicate assets (-351MB)
[ ] W1-T2: Remove HorizontalScroll.jsx (-198 lines)
[ ] W1-T3: Remove ProjectMenu.jsx (-175 lines)
[ ] W1-T4: Remove Hoodie & Sticker (-524 lines)
[ ] W1-T5: Remove shtContent.json & clean Cursor (-68 lines)
[ ] W1-T6: Remove Babel dependencies

WAVE 2 - Configuration (45 min)
[ ] W2-T1: Fix package.json
[ ] W2-T2: Create theme system

WAVE 3 - Consolidation (2 hrs)
[ ] W3-T1: Consolidate Container (-300 lines)
[ ] W3-T2: Consolidate Title (-120 lines)
[ ] W3-T3: Consolidate Container2 & glow (-150 lines)
[ ] W3-T4: Create data/archive.js
[ ] W3-T5: Optimize cursor animation (RAF)

WAVE 4 - Documentation (1.5 hrs)
[ ] W4-T1: Create comprehensive README
[ ] W4-T2: Add JSDoc comments
[ ] W4-T3: Update meta tags & ARCHITECTURE.md

WAVE 5 - Assets (1.5 hrs)
[ ] W5-T1: Optimize oversized images (-13MB)
[ ] W5-T2: Consolidate font loading

WAVE 6 - Advanced (OPTIONAL - 4.5 hrs)
[ ] W6-T1: Implement lazy loading
[ ] W6-T2: Simplify Line.jsx (-311 lines)
[ ] W6-T3: Extract GLSL shaders

WAVE 7 - Integration (1 hr)
[ ] W7-T1: Full integration test & final docs
```

---

**Ready to execute**: Start with Wave 1, run all 6 tasks in parallel, then proceed wave by wave!

---

## Troubleshooting Appendix

### Common Issues & Solutions

#### "Cannot find module 'styled-components'"
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Build fails with "Module not found: Error: Can't resolve './theme'"
- Verify `src/theme.js` exists
- Check import path matches file location: `import { theme } from './theme'`
- Ensure file has `export const theme = {...}`

#### Images don't load (404 errors)
```bash
# Check if assets are referenced correctly
grep -r 'src="/assets' src/ | head -5

# Verify files exist in public/assets/
ls -la public/assets/
```

#### Cursor doesn't follow mouse
- Check browser console for JavaScript errors
- Verify `App.css` has `cursor: none` body style
- Ensure `Cursor.jsx` is imported and rendered in `App.jsx`
- Check z-index isn't being overridden

#### Shader background not visible
- Check WebGL support: Visit https://get.webgl.org/
- Open console, look for Three.js errors
- Verify `ShaderVisual.jsx` is imported and rendered
- Check if z-index: -1 is applied correctly

#### Deploy fails with "dist/ not found"
- Verify `package.json`: `"deploy": "gh-pages -d dist"`
- Check `vite.config.js`: `build: { outDir: 'dist' }`
- Run build first: `npm run build && npm run deploy`

### Quick Diagnostic Commands

```bash
# Check project health
npm run build && echo "✓ Build passes" || echo "✗ Build fails"
grep -r "console.log" src/ | wc -l  # Should be 0
find src -name "*.jsx" | wc -l  # Should be ~18 after cleanup

# Check for common issues
grep -r "import.*from '.*//" src/  # Double slashes in imports (bad)
grep -r "undefined" src/ | grep -v node_modules  # Potential undefined references
find public/assets -name "* *"  # Files with spaces (problematic)
```
