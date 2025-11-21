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

**Validation**:
- [ ] `/assets/` directory deleted
- [ ] Build succeeds without errors
- [ ] No console warnings about missing assets
- [ ] At least one image loads correctly in browser

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
- [ ] File deleted
- [ ] No import errors in build
- [ ] Grep shows no references

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
- [ ] File deleted
- [ ] No import errors
- [ ] Projects page still loads correctly

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

1. **Replace `/README.md`** with comprehensive documentation:

```markdown
# Portfolio Website - Ayush

> Modern portfolio website built with React + Vite, showcasing design and creative projects

## Tech Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 6.0.7
- **Routing**: React Router DOM 7.0.2
- **Styling**: styled-components 6.1.13 with centralized theme system
- **Animation**: Framer Motion 11.15.0
- **3D Graphics**: Three.js 0.171.0 (shader background)
- **Markdown**: react-markdown 9.0.3

## Project Structure

```
portfolioyush/
├── src/
│   ├── components/          # React components
│   │   ├── Projectfiles/    # Individual project pages
│   │   ├── sharedStyles.js  # Centralized styled-components
│   │   ├── Navbar.jsx       # Navigation menu
│   │   ├── Line.jsx         # Decorative animations
│   │   └── ...
│   ├── data/                # Centralized data layer
│   │   ├── projectname.jsx  # Project metadata
│   │   └── archive.js       # Archive gallery items
│   ├── theme.js             # Design system (colors, fonts, spacing)
│   ├── App.jsx              # Router and layout
│   ├── main.jsx             # Entry point
│   └── Cursor.jsx           # Custom cursor component
├── public/
│   └── assets/              # Images, videos, fonts (455MB)
├── dist/                    # Build output
└── package.json

```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Opens on http://localhost:3000
```

### Build
```bash
npm run build
# Output to dist/
```

### Deploy
```bash
npm run deploy
# Deploys to GitHub Pages
```

## Key Features

1. **Fixed Frame Layout**: Unique border frame design across all pages
2. **Custom Cursor**: Animated cursor with ring and dot
3. **3D Shader Background**: Three.js Truchet pattern shader
4. **Smooth Animations**: Framer Motion page transitions and hover effects
5. **Responsive Design**: Mobile-friendly with breakpoints
6. **Theme System**: Centralized design tokens in `src/theme.js`

## Routes

- `/` - Home (Hero component)
- `/about` - About page
- `/archive` - Horizontal scrolling gallery
- `/contact` - Contact information
- `/projects` - Project grid
- `/projects/:projectId` - Individual project pages

**Project Routes**:
- `/projects/CapsuleMachine`
- `/projects/AlainaPamela`
- `/projects/ShootingTheSht`
- `/projects/ARK`
- `/projects/TheCollection`
- `/projects/Lens`

## Architecture Decisions

### Design System
- All colors, fonts, spacing in `src/theme.js`
- Uses styled-components ThemeProvider
- Consistent design tokens across components

### Shared Components
- Common styled-components in `src/components/sharedStyles.js`
- Includes: Container, Title, SectionTitle, ProjectImage, etc.
- Reduces duplication and ensures consistency

### Data Layer
- Project metadata in `src/data/projectname.jsx`
- Archive items in `src/data/archive.js`
- Centralized for easy updates

### Performance
- Custom cursor uses requestAnimationFrame (60fps)
- Optimized animations with Framer Motion
- Vite for fast builds and HMR

## Component Overview

### Core Components
- **App.jsx**: Router, layout, frame structure
- **Cursor.jsx**: Custom animated cursor
- **Navbar.jsx**: Vertical navigation menu
- **Line.jsx**: Decorative line animations

### Page Components
- **Hero.jsx**: Landing page
- **About.jsx**: Bio and information
- **Projects.jsx**: Project grid with previews
- **Archive.jsx**: Horizontal scrolling gallery
- **Contact.jsx**: Contact links

### Project Pages
- **Grove.jsx**: "Shooting the Sht" project
- **CapsuleMachine.jsx**: Capsule Machine project
- **Ark.jsx**: ARK project
- **AP.jsx**: Alaina Pamela project
- **Collection.jsx**: The Collection project
- **Lens.jsx**: Lens project

### Utility Components
- **ShaderVisual.jsx**: Three.js shader background
- **NextProject.jsx**: Navigation widget
- **sharedStyles.js**: Reusable styled-components

## Styling System

### Theme Structure
```javascript
theme = {
  colors: { text, background, accent },
  fonts: { primary, display },
  spacing: { frame, section, element },
  breakpoints: { mobile, tablet, desktop },
  transitions: { standard, slow }
}
```

### Usage
```javascript
import styled from 'styled-components'

const Component = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.primary};
`
```

## Adding a New Project

1. Create project component in `src/components/Projectfiles/`
2. Add route in `src/App.jsx`
3. Add metadata to `src/data/projectname.jsx`
4. Add assets to `public/assets/PROJECTNAME/`

## Maintenance

### Code Quality
- All duplicate components consolidated
- Dead code removed
- Consistent naming conventions
- Comments for complex logic

### Assets
- Images in `public/assets/`
- Reference with `/assets/...` in code
- Optimize images before adding

### Dependencies
- Keep dependencies up to date
- Run `npm audit` regularly
- Remove unused packages

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private portfolio project

## Contact

- LinkedIn: [Add link]
- Email: [Add email]

---

**For AI Agents**: This codebase follows React best practices with centralized theming and shared components. Key files to understand: `src/theme.js`, `src/components/sharedStyles.js`, `src/App.jsx`, and `src/data/` directory.
```

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

1. **Update `/index.html`**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>Ayush's Portfolio - Product Designer</title>
    <meta name="title" content="Ayush's Portfolio - Product Designer">
    <meta name="description" content="Portfolio showcasing product design work, UX/UI projects, and creative explorations. Built with React, Framer Motion, and Three.js.">
    <meta name="author" content="Ayush">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://jshengdev.github.io/portfolioyush/">
    <meta property="og:title" content="Ayush's Portfolio - Product Designer">
    <meta property="og:description" content="Portfolio showcasing product design work, UX/UI projects, and creative explorations.">
    <meta property="og:image" content="/assets/og-image.jpg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://jshengdev.github.io/portfolioyush/">
    <meta property="twitter:title" content="Ayush's Portfolio - Product Designer">
    <meta property="twitter:description" content="Portfolio showcasing product design work, UX/UI projects, and creative explorations.">
    <meta property="twitter:image" content="/assets/og-image.jpg">

    <!-- Existing font imports -->
    <!-- ... keep existing code ... -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

2. **Create `/ARCHITECTURE.md`** - Component map for agents:
```markdown
# Architecture Documentation

## Component Hierarchy

```
App (ThemeProvider)
├── Cursor (global)
├── Navbar (fixed navigation)
├── Line (decorative animations)
├── ShaderVisual (background)
└── Routes
    ├── Hero (/)
    ├── About (/about)
    ├── Archive (/archive)
    ├── Contact (/contact)
    ├── Projects (/projects)
    └── Project Pages (/projects/:id)
        ├── Grove
        ├── CapsuleMachine
        ├── Ark
        ├── AP
        ├── Collection
        └── Lens
```

## Data Flow

```
Data Sources → Components
├── theme.js → ThemeProvider → All components
├── data/projectname.jsx → Projects.jsx
└── data/archive.js → Archive.jsx
```

## Styling Architecture

```
Theme System (theme.js)
  ↓
ThemeProvider (App.jsx)
  ↓
Shared Components (sharedStyles.js)
  ↓
Page Components
```

## Key Patterns

1. **All styling uses theme variables**: `${props => props.theme.colors.text.primary}`
2. **Shared components imported from sharedStyles.js**
3. **Data centralized in /src/data/ directory**
4. **Assets in /public/assets/ referenced as /assets/ in code**

## Performance Optimizations

- Custom cursor uses requestAnimationFrame (60fps)
- Framer Motion for GPU-accelerated animations
- Vite for fast builds and HMR

## For AI Agents

When modifying this codebase:
1. Always use theme variables, never hardcode colors/fonts
2. Check sharedStyles.js before creating new styled-components
3. Keep data in /src/data/ directory
4. Follow existing naming conventions (PascalCase for components, camelCase for functions)
```

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

## Wave 6: Advanced Optimization (OPTIONAL - 3 PARALLEL - 4 hours)

**Goal**: Advanced refactoring for maximum maintainability
**Dependencies**: All previous waves complete
**Can run**: 3 parallel Claude Code sessions
**Note**: These are optional but high-value

### W6-T1: Implement Code Splitting with Lazy Loading
**Time**: 1.5 hours | **Risk**: Medium | **Impact**: 🔥🔥🔥

**Context**:
- All routes load on initial page load
- Can reduce initial bundle by 38% with lazy loading

**Tasks**:

1. **Update `/src/App.jsx`** to use lazy loading:

```javascript
import { lazy, Suspense } from 'react'

// Lazy load page components
const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Archive = lazy(() => import('./components/Archive'))
const Contact = lazy(() => import('./components/Contact'))

// Lazy load project pages
const Grove = lazy(() => import('./components/Projectfiles/Grove'))
const CapsuleMachine = lazy(() => import('./components/Projectfiles/CapsuleMachine'))
const Ark = lazy(() => import('./components/Projectfiles/Ark'))
const AP = lazy(() => import('./components/Projectfiles/AP'))
const Collection = lazy(() => import('./components/Projectfiles/Collection'))
const Lens = lazy(() => import('./components/Projectfiles/Lens'))

// Wrap routes with Suspense
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* routes */}
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}
```

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

1. **Read `/src/components/Line.jsx`** thoroughly

2. **Create simplified version** using position lookup:

```javascript
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// Position lookup (much simpler than 288 lines of variants)
const positions = {
  '/': { x: -280, y: -235, rotate: 0, height: 1000 },
  '/about': { x: 150, y: -135, rotate: 90, height: 1650 },
  '/archive': { x: -280, y: -235, rotate: 0, height: 1000 },
  '/contact': { x: 150, y: -135, rotate: 90, height: 1650 },
  '/projects': { x: -280, y: -235, rotate: 0, height: 1000 },
  '/projects/CapsuleMachine': { x: -865, y: -235, rotate: 0, height: 1000 },
  '/projects/AlainaPamela': { x: -865, y: -235, rotate: 0, height: 1000 },
  '/projects/ShootingTheSht': { x: -865, y: -235, rotate: 0, height: 1000 },
  '/projects/ARK': { x: -865, y: -235, rotate: 0, height: 1000 },
  '/projects/TheCollection': { x: -865, y: -235, rotate: 0, height: 1000 },
  '/projects/Lens': { x: -865, y: -235, rotate: 0, height: 1000 },
}

export function Line() {
  const location = useLocation()
  const position = positions[location.pathname] || positions['/']

  return (
    <motion.div
      animate={position}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        width: '1px',
        background: 'white',
        opacity: 1,
      }}
    />
  )
}
```

3. **Backup original**:
```bash
cp src/components/Line.jsx src/components/Line.jsx.backup
```

4. **Replace with simplified version**

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

Test every route:
- [ ] / (Home) - Verify hero, images load
- [ ] /about - Verify content, layout
- [ ] /archive - Verify horizontal scroll works
- [ ] /contact - Verify links work
- [ ] /projects - Verify grid, hover effects
- [ ] /projects/CapsuleMachine - Verify content, navigation
- [ ] /projects/AlainaPamela - Verify content, navigation
- [ ] /projects/ShootingTheSht - Verify content, navigation
- [ ] /projects/ARK - Verify content, navigation
- [ ] /projects/TheCollection - Verify content, navigation
- [ ] /projects/Lens - Verify content, navigation

Test features:
- [ ] Custom cursor follows mouse
- [ ] Line animations work on route changes
- [ ] Shader background displays
- [ ] Navigation menu works
- [ ] All images load
- [ ] No console errors

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
