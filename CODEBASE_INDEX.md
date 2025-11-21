# Portfolio Codebase Index for RAG System

> **Last Updated**: 2025-11-21
> **Purpose**: Structured index for easy retrieval and code analysis
> **Total Lines of Code**: ~4,676 across 21 source files (was 5,872 across 27 files)
> **Tech Stack**: React 18 + Vite + Framer Motion + styled-components

---

## Current State (Post-Integration Testing - 2025-11-21)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Lines of Code | 5,872 | 4,676 | -20% |
| Source Files | 27 | 21 | -22% |
| Build Size (JS+CSS) | N/A | 980K (227KB gzipped) | ✅ Optimized |
| Asset Size | 806MB | 443M | -45% |
| Dead Code Files | 5 files | 0 files | -100% |
| Build Time | N/A | 5.07s | ✅ Fast |
| Console Errors | Unknown | 0 | ✅ Clean |

**Key Improvements:**
- ✅ Removed 5 unused component files (Hoodie, Sticker, HorizontalScroll, ProjectMenu, shtContent.json)
- ✅ Cleaned up commented code in Cursor.jsx
- ✅ Fixed broken NextProject route
- ✅ All routes properly configured and tested
- ✅ Code splitting working (separate chunks per route)
- ✅ No duplicate resource loading
- ✅ Build succeeds with 0 vulnerabilities

**Performance Metrics:**
- Main bundle: 779K (227KB gzipped)
- Largest component: Lens.jsx at 119K (37.5KB gzipped)
- All other components: 4.9K - 15K each
- Total dependencies: 226 packages

---

## Quick Navigation

| Category | Files | Total Lines | Status |
|----------|-------|-------------|--------|
| **Core Application** | 3 files | 300 lines | ✅ Clean |
| **Layout Components** | 3 files | 687 lines | ⚠️ Line.jsx needs simplification |
| **Page Components** | 4 files | 884 lines | ⚠️ Duplicate patterns |
| **Project Pages** | 8 files | 2,942 lines | 🔴 70% redundancy |
| **Utility Components** | 3 files | 623 lines | ⚠️ 2 unused files |
| **Data Layer** | 2 files | 67 lines | ⚠️ Scattered, inconsistent |
| **Assets** | 198 files | 806MB | 🔴 50% duplication |

---

## 1. Core Application Layer

### 🎯 Entry Point
**File**: `/src/main.jsx` (12 lines)
**Purpose**: React 18 application bootstrap
**Dependencies**: React, ReactDOM
**Complexity**: Low ⭐
**Notes**: Standard React entry point with StrictMode

```javascript
// Key exports: None (entry point)
// Key imports: App.jsx
```

---

### 🎯 Router & Layout
**File**: `/src/App.jsx` (175 lines)
**Purpose**: Main router, route definitions, fixed frame layout
**Dependencies**: react-router-dom, framer-motion, styled-components
**Complexity**: Medium ⭐⭐
**Routes Defined**: 11 routes (/, /about, /archive, /contact, /projects, 6 project pages)

**Key Sections**:
- Lines 1-10: Imports (all page components)
- Lines 12-150: Styled components (Container, Frame)
- Lines 152-175: Route definitions with Framer Motion page transitions

**Issues**:
- ❌ Container styled-component duplicated in 15 other files
- ❌ Hardcoded frame border styles (not responsive)

```javascript
// Routes: /, /about, /archive, /contact, /projects,
//         /projects/CapsuleMachine, /projects/AlainaPamela,
//         /projects/ShootingTheSht, /projects/ARK,
//         /projects/TheCollection, /projects/Lens
```

---

### 🎯 Custom Cursor
**File**: `/src/Cursor.jsx` (113 lines)
**Purpose**: Custom animated cursor with ring and dot
**Dependencies**: React hooks, styled-components
**Complexity**: Medium ⭐⭐

**Key Sections**:
- Lines 1-40: Imports and dead code (CursorPeePee component - unused)
- Lines 42-80: Main Cursor component with state management
- Lines 82-113: Styled components (CursorRing, CursorDot)

**Issues**:
- 🔴 Uses setInterval instead of requestAnimationFrame (inefficient)
- ❌ 41 lines of commented dead code (CursorPeePee)
- ⚠️ No accessibility fallback

**Optimization Opportunity**: Replace setInterval with RAF loop

---

## 2. Layout Components

### 🧭 Navigation
**File**: `/src/components/Navbar.jsx` (75 lines)
**Purpose**: Vertical navigation menu
**Dependencies**: react-router-dom, styled-components
**Complexity**: Low ⭐

**Navigation Items**:
- home → "/"
- archive → "/archive"
- about → "/about"
- contact → "/contact"

**Issues**:
- ❌ Container styled-component duplicated (could import from sharedStyles)

---

### 🎨 Decorative Animations
**File**: `/src/components/Line.jsx` (391 lines)
**Purpose**: Animated decorative lines that respond to route changes
**Dependencies**: framer-motion, react-router-dom, styled-components
**Complexity**: Very High ⭐⭐⭐⭐⭐

**Key Sections**:
- Lines 1-10: Imports
- Lines 12-300: **Hardcoded animation variants** (complexity hotspot)
- Lines 302-391: Component logic and styled-components

**Animation States**: 11 different states matching routes

**Critical Issues**:
- 🔴 288 lines of hardcoded pixel values (not maintainable)
- 🔴 Not responsive - breaks on different screen sizes
- 🔴 Tightly coupled to routing structure
- ⚠️ Could be replaced with algorithmic approach or CSS

**Example Complexity**:
```javascript
const lineVariants = {
  projectSht: { x: -865, y: -235, opacity: 1, skewX: 0 },
  projects: { x: -280, y: -235, opacity: 1, skewX: 0 },
  about: { x: 150, y: -135, rotate: 90, opacity: 1, skewX: 0, height: 1650 },
  // ... 100+ more lines of variants
}
```

**Refactor Priority**: 🔥 HIGH - Simplify to ~50 lines

---

### 🌌 Background Shader
**File**: `/src/components/ShaderVisual.jsx` (221 lines)
**Purpose**: Three.js shader background with Truchet pattern
**Dependencies**: three, react
**Complexity**: High ⭐⭐⭐⭐

**Key Sections**:
- Lines 1-5: Imports
- Lines 7-140: **Embedded GLSL fragment shader** (should be external file)
- Lines 142-180: Vertex shader and material setup
- Lines 182-221: React component and rendering logic

**Issues**:
- ⚠️ GLSL shaders embedded as strings (hard to edit/maintain)
- ⚠️ Runs continuously even when not visible (performance)
- ⚠️ No error handling for WebGL context failures

**Optimization**:
```
Recommended structure:
src/shaders/
  ├── truchet.vert.glsl
  └── truchet.frag.glsl
```

---

## 3. Page Components

### 🏠 Home Page
**File**: `/src/components/Hero.jsx` (114 lines)
**Purpose**: Landing page with slider
**Dependencies**: AppSlider, styled-components
**Complexity**: Low ⭐

**Issues**:
- ❌ Title styled-component duplicated (9 times across codebase)
- ❌ Container duplicated
- ❌ Commented dead code (lines 50-53)

---

### 👤 About Page
**File**: `/src/components/About.jsx` (105 lines)
**Purpose**: About/bio page
**Dependencies**: styled-components
**Complexity**: Low ⭐

**Issues**:
- ❌ Container2, Title, Text duplicated from other files
- ✅ Clean content, good readability

---

### 📂 Projects Listing
**File**: `/src/components/Projects.jsx` (327 lines)
**Purpose**: Grid of project cards with hover previews
**Dependencies**: projectname.jsx data, framer-motion, styled-components
**Complexity**: High ⭐⭐⭐⭐

**Key Sections**:
- Lines 1-20: Imports and data
- Lines 22-100: Component logic with hover states
- Lines 102-327: Styled components (15 components)

**Features**:
- Grid layout with 6 project cards
- Preview images on hover
- Framer Motion animations
- NextProject component integration

**Issues**:
- ❌ Container, Title duplicated
- ❌ `glow` keyframe animation duplicated (also in NextProject, ProjectMenu)
- ⚠️ Heavy component (could split styled components to separate file)

**Data Dependency**: Uses `projectParty` from `/src/data/projectname.jsx`

---

### 🎞️ Archive Gallery
**File**: `/src/components/Archive.jsx` (330 lines)
**Purpose**: Horizontal scrolling gallery of archive items
**Dependencies**: styled-components, custom scroll logic
**Complexity**: High ⭐⭐⭐⭐

**Key Sections**:
- Lines 1-5: Imports
- Lines 7-120: **Hardcoded archive data** (17 project objects - should be in data file)
- Lines 122-195: Component with custom wheel scroll handling
- Lines 197-330: Styled components

**Critical Issues**:
- 🔴 Archive data hardcoded in component (violates separation of concerns)
- ⚠️ Custom smooth scroll (67 lines) - browsers provide this natively
- ❌ Container2, Title duplicated

**Data Structure** (lines 7-120):
```javascript
const archiveItems = [
  { name: "Grove", image: "/assets/GROVE/..." },
  // ... 16 more items
]
```

**Refactor Priority**: 🔥 MEDIUM - Extract data, simplify scroll logic

---

### 📧 Contact Page
**File**: `/src/components/Contact.jsx` (122 lines)
**Purpose**: Contact info with LinkedIn and email links
**Dependencies**: styled-components
**Complexity**: Low ⭐

**Issues**:
- ❌ Container2, Title duplicated
- ✅ Simple, clean implementation

---

## 4. Project Detail Pages

> **Critical Redundancy Zone**: 8 files, 2,942 total lines, ~70% duplicated code

### Common Structure (All Project Pages)

All 8 project pages follow identical structure:
```
Container (48 lines of identical styled-component)
  ├── Left panel (navigation)
  ├── Right panel (content)
  │   ├── ContentContainer
  │   │   ├── Title
  │   │   ├── ProjectMedia (images/videos)
  │   │   ├── SectionTitle, SectionText
  │   │   └── Multiple sections
```

### 📄 Project Files Inventory

| File | Lines | Route | In Data? | Status |
|------|-------|-------|----------|--------|
| **Grove.jsx** | 412 | `/projects/ShootingTheSht` | ✅ Yes | ✅ Active |
| **CapsuleMachine.jsx** | 532 | `/projects/CapsuleMachine` | ✅ Yes | ✅ Active |
| **Ark.jsx** | 377 | `/projects/ARK` | ✅ Yes | ✅ Active |
| **AP.jsx** | 370 | `/projects/AlainaPamela` | ✅ Yes | ✅ Active |
| **Collection.jsx** | 465 | `/projects/TheCollection` | ✅ Yes | ✅ Active |
| **Lens.jsx** | 262 | `/projects/Lens` | ✅ Yes | ✅ Active |
| **Hoodie.jsx** | 262 | ❌ None | ❌ No | 🔴 UNUSED |
| **Sticker.jsx** | 262 | ❌ None | ❌ No | 🔴 UNUSED |

---

### 🎯 Grove (Shooting the Sht)
**File**: `/src/components/Projectfiles/Grove.jsx` (412 lines)
**Route**: `/projects/ShootingTheSht`
**Complexity**: Medium ⭐⭐⭐

**Content Sections**:
1. Hero image
2. Overview (concept, role, year, tools)
3. Process explanation
4. Multiple detail sections with images/videos

**Issues**:
- ❌ Imports 6 components from sharedStyles but still duplicates Container/Left/Right
- ⚠️ Has associated `shtContent.json` file that is never used

---

### 🎯 Capsule Machine
**File**: `/src/components/Projectfiles/CapsuleMachine.jsx` (532 lines)
**Route**: `/projects/CapsuleMachine`
**Complexity**: Medium ⭐⭐⭐

**Unique Features**:
- Longest project page (most content sections)
- Multiple embedded videos
- Detailed process documentation

**Issues**: Same as Grove (duplicated structure)

---

### 🎯 ARK
**File**: `/src/components/Projectfiles/Ark.jsx` (377 lines)
**Route**: `/projects/ARK`
**Complexity**: Medium ⭐⭐⭐

**Issues**: Same structural duplication

---

### 🎯 Alaina Pamela (AP)
**File**: `/src/components/Projectfiles/AP.jsx` (370 lines)
**Route**: `/projects/AlainaPamela`
**Complexity**: Medium ⭐⭐⭐

**Issues**: Same structural duplication

---

### 🎯 The Collection
**File**: `/src/components/Projectfiles/Collection.jsx` (465 lines)
**Route**: `/projects/TheCollection`
**Complexity**: Medium ⭐⭐⭐

**Issues**: Same structural duplication

---

### 🎯 Lens
**File**: `/src/components/Projectfiles/Lens.jsx` (262 lines)
**Route**: `/projects/Lens`
**Complexity**: Medium ⭐⭐⭐

**Issues**: Same structural duplication

---

### 🔴 UNUSED: Hoodie
**File**: `/src/components/Projectfiles/Hoodie.jsx` (262 lines)
**Status**: 🗑️ Dead code - no route, not in data
**Action**: DELETE

---

### 🔴 UNUSED: Sticker
**File**: `/src/components/Projectfiles/Sticker.jsx` (262 lines)
**Status**: 🗑️ Dead code - no route, not in data
**Action**: DELETE

---

### 💡 Refactor Recommendation: ProjectTemplate

**Current**: 8 files × ~370 lines = 2,942 lines
**Proposed**: 1 template + 6 data files = ~800 lines
**Savings**: ~2,100 lines (71% reduction)

```javascript
// Proposed structure:
<ProjectTemplate
  project={projectData}
  hero={<ProjectHero image={...} />}
  sections={sectionsData}
/>
```

---

## 5. Utility Components

### 🎨 Shared Styles Library
**File**: `/src/components/sharedStyles.js` (265 lines)
**Purpose**: Reusable styled-components for project pages
**Complexity**: Low ⭐

**Exports** (14 components):
1. `SectionTitle` - Section headings
2. `SectionText` - Body text
3. `ProjectImage` - Responsive images
4. `ProjectVideo` - Embedded videos
5. `ProjectDetails` - Metadata grid
6. `DetailsRow` - Individual detail rows
7. `Label` - Detail labels
8. `Value` - Detail values
9. `Tools` - Tools list
10. `ToolItem` - Individual tools
11. `VideoContainer` - Video wrapper
12. `MediaSection` - Media sections
13. `OverviewText` - Overview paragraphs
14. `ProcessSection` - Process containers

**Status**: ✅ Good pattern, well-organized

**Issues**:
- ⚠️ Underutilized - only project pages use it
- ⚠️ Should include Container, Title, etc. to reduce duplication

**Expansion Opportunity**:
```javascript
// Add to sharedStyles.js:
export const Container = styled.div`...` (used in 16 files)
export const Title = styled.h1`...` (used in 9 files)
export const Container2 = styled.div`...` (used in 5 files)
```

---

### 🔄 Next Project Widget
**File**: `/src/components/NextProject.jsx` (180 lines)
**Purpose**: "View next project" navigation button with hover effect
**Dependencies**: framer-motion, styled-components
**Complexity**: Medium ⭐⭐

**Used In**: Projects.jsx only

**Issues**:
- ❌ `glow` keyframe animation duplicated (also in Projects, ProjectMenu)
- ⚠️ Single-use component with high complexity

---

### 🔴 UNUSED: Horizontal Scroll
**File**: `/src/components/HorizontalScroll.jsx` (198 lines)
**Purpose**: Alternative horizontal scroll gallery implementation
**Status**: 🗑️ Dead code - never imported
**Action**: DELETE

**Issues**:
- Contains wrong asset paths: `/public/assets/GROVE/...` (includes /public in path)
- Same custom scroll logic as Archive.jsx (duplicated pattern)

---

### 🔴 UNUSED: Project Menu
**File**: `/src/components/ProjectMenu.jsx` (175 lines)
**Purpose**: Alternative project navigation menu
**Status**: 🗑️ Dead code - never imported
**Action**: DELETE

**Issues**:
- ❌ Container duplicated
- ❌ `glow` animation duplicated
- Replaced by current Projects.jsx implementation

---

## 6. Data Layer

### 📊 Project Metadata
**File**: `/src/data/projectname.jsx` (40 lines)
**Purpose**: Array of project metadata for main projects
**Exports**: `projectParty` (6 projects)

**Structure**:
```javascript
export const projectParty = [
  {
    name: "Capsule Machine",
    paragraph: "Description...",
    link: "/projects/CapsuleMachine",
    image: "/assets/CM/..."
  },
  // ... 5 more projects
]
```

**Projects Included**:
1. Capsule Machine
2. Shooting the Sht (Grove)
3. Alaina Pamela
4. ARK
5. The Collection
6. Lens (❌ included in data but not linked from Projects.jsx)

**Used By**: Projects.jsx

**Issues**:
- ⚠️ Only 6 projects, but 8 project page files exist
- ⚠️ Lens is in data but not shown in Projects.jsx
- ⚠️ Hoodie and Sticker have files but not in data (dead code)

---

### 🔴 UNUSED: Grove Content
**File**: `/src/components/Projectfiles/shtContent.json` (27 lines)
**Purpose**: Content data for Grove project
**Status**: 🗑️ Dead code - never imported
**Action**: DELETE

**Structure**:
```json
{
  "title": "Shooting the Sht",
  "overview": "...",
  "concept": "...",
  "sections": [...]
}
```

**Why Unused**: Grove.jsx has content hardcoded directly in component

---

### ⚠️ Scattered Data Issues

**Problem**: Project data exists in 3 different locations:

1. **Project metadata**: `/src/data/projectname.jsx` (6 projects)
2. **Archive data**: Hardcoded in `/src/components/Archive.jsx` (17 items)
3. **Route definitions**: Hardcoded in `/src/App.jsx` (11 routes)

**Recommendation**: Consolidate to single source:
```
src/data/
  ├── projects.js          (all project metadata)
  ├── archive.js           (archive items)
  └── routes.js            (route definitions)
```

---

## 7. Assets

### 📁 Asset Structure

```
/assets/                     (🔴 DELETE - 66 files, 351MB duplicate)
  ├── AP/
  ├── ARK/
  ├── CM/
  ├── GROVE/
  ├── fonts/
  └── misc files

/public/assets/              (✅ KEEP - 132 files, 455MB)
  ├── AP/
  ├── ARK/
  ├── C/                     (Collection)
  ├── CM/                    (Capsule Machine)
  ├── GROVE/
  ├── WD/
  └── archive/
```

### 🔴 Critical Asset Issues

**1. Complete Duplication**:
- Both `/assets/` and `/public/assets/` exist
- Same files in both locations
- **Waste**: 351MB of duplicate files

**2. Oversized Images**:
| File | Current Size | Optimized Size | Savings |
|------|--------------|----------------|---------|
| Subject 2.png | 8.0 MB | ~500 KB | 93% |
| microw.png | 5.9 MB | ~300 KB | 95% |
| Grovefrontpage.png | 483 KB | ~50 KB | 90% |

**3. Wrong Path References**:
In HorizontalScroll.jsx (unused):
```javascript
image: '/public/assets/GROVE/V3 profile.png'  // ❌ Wrong!
// Should be: '/assets/GROVE/V3 profile.png'
```

**4. No WebP Format**:
- All images are PNG/JPG
- WebP could reduce size by 30-50%

---

### 🎨 Fonts

**Location**: `/src/assets/fonts/`
**Files**:
- ADE-regular.otf
- ADE-thin.otf
- fonts.css (imports Google Fonts)

**Issue**: Fonts loaded in TWO places:
1. `index.html` (Google Fonts CDN)
2. `fonts.css` (also imports same Google Fonts)

**Recommendation**: Choose one method (prefer CDN for caching)

---

## 8. Configuration Files

### 📦 Package Configuration
**File**: `/package.json`
**Issues**:
- ❌ Name: "react-app" (generic, should be "portfolioyush")
- ❌ Homepage: Points to wrong repo ("goofybugga.github.io/thewebsite")
- ❌ Deploy script: `gh-pages -d build` (Vite outputs to `dist/`)
- ❌ TypeScript types installed but no TypeScript used

**Dependencies** (7 core):
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.0.2",
  "framer-motion": "^11.15.0",
  "styled-components": "^6.1.13",
  "three": "^0.171.0",
  "react-markdown": "^9.0.3"
}
```

**Unused DevDependencies** (can remove):
```json
{
  "@babel/core": "^7.26.0",           // ❌ Vite handles JSX
  "@babel/preset-env": "^7.26.0",     // ❌ Not needed
  "@babel/preset-react": "^7.26.3"    // ❌ Not needed
}
```

---

### ⚙️ Build Configuration
**File**: `/vite.config.js`
**Status**: ✅ Clean and minimal

```javascript
export default {
  plugins: [react()],
  server: { port: 3000 },
  build: { outDir: 'dist' }
}
```

---

### 🚫 Git Ignore
**File**: `/.gitignore`
**Status**: ✅ Appropriate

Ignores:
- node_modules
- dist
- .DS_Store
- *.mov (large video files)

---

## 9. Complexity Metrics

### Lines of Code by Category

| Category | Files | LOC | Redundancy | Priority |
|----------|-------|-----|------------|----------|
| Core App | 3 | 300 | 0% | ✅ Low |
| Layout | 3 | 687 | 15% | ⚠️ Medium |
| Pages | 4 | 884 | 30% | ⚠️ Medium |
| **Projects** | **8** | **2,942** | **70%** | 🔥 **HIGH** |
| Utilities | 3 | 623 | 100% (2 unused) | 🔥 HIGH |
| Data | 2 | 67 | 50% (1 unused) | ⚠️ Medium |
| **TOTAL** | **23** | **5,503** | **~40%** | - |

### Duplication Analysis

**Duplicated Styled Components**:
- `Container`: 16 occurrences × 20 lines = 320 lines
- `Title`: 9 occurrences × 15 lines = 135 lines
- `Container2`: 5 occurrences × 25 lines = 125 lines
- `glow` keyframe: 3 occurrences × 10 lines = 30 lines
- **Total**: ~610 lines of duplicate styling

**Project Page Structure**:
- 8 files with 70% shared structure
- ~2,100 lines could be reduced to ~400 lines with template pattern

**Dead Code**:
- HorizontalScroll.jsx: 198 lines
- ProjectMenu.jsx: 175 lines
- Hoodie.jsx: 262 lines
- Sticker.jsx: 262 lines
- Commented code: ~60 lines
- **Total**: ~957 lines can be deleted

---

## 10. Dependency Graph

```
main.jsx
  └─ App.jsx
      ├─ Hero.jsx
      │   └─ AppSlider (not in codebase - external?)
      ├─ About.jsx
      ├─ Projects.jsx
      │   ├─ projectname.jsx (data)
      │   └─ NextProject.jsx
      ├─ Archive.jsx
      ├─ Contact.jsx
      ├─ Navbar.jsx
      ├─ Line.jsx (decorative)
      ├─ ShaderVisual.jsx (background)
      ├─ Cursor.jsx (global)
      └─ Project Pages/
          ├─ Grove.jsx ──────┐
          ├─ CapsuleMachine.jsx ─┤
          ├─ Ark.jsx ────────┤
          ├─ AP.jsx ─────────┤
          ├─ Collection.jsx ──┤
          ├─ Lens.jsx ────────┤
          ├─ Hoodie.jsx (unused) ──┼─► sharedStyles.js
          └─ Sticker.jsx (unused) ─┘
```

**Orphaned Files** (not in dependency graph):
- HorizontalScroll.jsx
- ProjectMenu.jsx
- shtContent.json

---

## 11. Search Index

### By Functionality

**Routing & Navigation**:
- Main Router: `/src/App.jsx:152-175`
- Navigation Menu: `/src/components/Navbar.jsx:1-75`
- Project Links: `/src/components/Projects.jsx:102-230`
- Next Project: `/src/components/NextProject.jsx:1-180`

**Styling System**:
- Shared Styles: `/src/components/sharedStyles.js:1-265`
- Theme Colors: Scattered (no centralized theme)
- Fonts: `/src/assets/fonts/fonts.css`

**Animations**:
- Page Transitions: `/src/App.jsx:152-175` (Framer Motion)
- Line Animations: `/src/components/Line.jsx:12-300`
- Cursor Animation: `/src/Cursor.jsx:42-80`
- Hover Effects: `/src/components/Projects.jsx:22-100`
- Scroll Animations: `/src/components/Archive.jsx:122-195`

**Data Sources**:
- Project Metadata: `/src/data/projectname.jsx:1-40`
- Archive Data: `/src/components/Archive.jsx:7-120` (⚠️ should be in data/)
- Routes: `/src/App.jsx:152-175` (⚠️ should be in data/)

**3D Graphics**:
- Shader Background: `/src/components/ShaderVisual.jsx:1-221`
- Fragment Shader: `/src/components/ShaderVisual.jsx:7-140`
- Vertex Shader: `/src/components/ShaderVisual.jsx:142-180`

**Project Content**:
- Grove: `/src/components/Projectfiles/Grove.jsx:1-412`
- Capsule Machine: `/src/components/Projectfiles/CapsuleMachine.jsx:1-532`
- ARK: `/src/components/Projectfiles/Ark.jsx:1-377`
- Alaina Pamela: `/src/components/Projectfiles/AP.jsx:1-370`
- Collection: `/src/components/Projectfiles/Collection.jsx:1-465`
- Lens: `/src/components/Projectfiles/Lens.jsx:1-262`

---

### By Technology

**React Hooks Usage**:
- useState: All components (23 files)
- useEffect: Cursor.jsx, ShaderVisual.jsx, Archive.jsx
- useLocation: Line.jsx, Projects.jsx
- useNavigate: Navbar.jsx, Projects.jsx

**Framer Motion**:
- Page transitions: App.jsx
- Line animations: Line.jsx
- Hover animations: Projects.jsx
- Variants pattern: Line.jsx:12-300

**Styled-Components**:
- Global usage: All files
- Keyframe animations: Projects.jsx, NextProject.jsx, ProjectMenu.jsx
- Theme provider: ❌ Not used (opportunity)

**Three.js**:
- Only in: ShaderVisual.jsx
- GLSL shaders: Lines 7-180

---

## 12. Quick Reference: Common Tasks

### Adding a New Project

**Files to modify**:
1. Create: `/src/components/Projectfiles/NewProject.jsx` (copy template from Grove.jsx)
2. Update: `/src/data/projectname.jsx` (add to projectParty array)
3. Update: `/src/App.jsx` (add route import and Route component)
4. Update: `/src/components/Archive.jsx` (add to archiveItems if applicable)
5. Add assets: `/public/assets/NEWPROJECT/...`

**Better approach** (after refactor):
1. Create: `/src/data/projects/newproject.md`
2. Add metadata to `/src/data/projects.js`
3. Assets to `/public/assets/NEWPROJECT/`

---

### Modifying Styles

**Global colors/fonts**:
- Currently: Search and replace across all files (❌ bad)
- After refactor: Update theme in `/src/theme.js`

**Component-specific**:
- Check `/src/components/sharedStyles.js` first
- If exists: modify there
- If new: add to sharedStyles.js

**Animation timing**:
- Page transitions: `/src/App.jsx:152-175`
- Line animations: `/src/components/Line.jsx:12-300`
- Hover effects: Individual component files

---

### Asset Management

**Adding images**:
- Location: `/public/assets/[PROJECT_NAME]/filename.ext`
- Reference: `"/assets/[PROJECT_NAME]/filename.ext"`
- ⚠️ Do NOT use relative paths
- ⚠️ Do NOT include `/public` in path

**Optimizing images**:
- Current: Manual optimization needed
- Targets: Subject 2.png (8MB), microw.png (5.9MB)
- Recommended: Use WebP format, compress to <500KB

---

### Routing

**Current routes** (`/src/App.jsx:152-175`):
```
/                          → Hero.jsx
/about                     → About.jsx
/archive                   → Archive.jsx
/contact                   → Contact.jsx
/projects                  → Projects.jsx
/projects/CapsuleMachine   → CapsuleMachine.jsx
/projects/AlainaPamela     → AP.jsx
/projects/ShootingTheSht   → Grove.jsx
/projects/ARK              → Ark.jsx
/projects/TheCollection    → Collection.jsx
/projects/Lens             → Lens.jsx
```

---

## 13. RAG Query Examples

> **How to use this index**: Use these example queries to quickly find relevant code sections

**Q: "Where is the navigation menu defined?"**
**A**: `/src/components/Navbar.jsx` (75 lines) - vertical menu with 4 links

**Q: "How are project pages structured?"**
**A**: See section 4 (Project Detail Pages) - all follow Container/Left/Right pattern, shared styles in `/src/components/sharedStyles.js`

**Q: "Where is project data stored?"**
**A**: `/src/data/projectname.jsx` (metadata for 6 projects), `/src/components/Archive.jsx:7-120` (archive items - should be moved)

**Q: "What causes the large bundle size?"**
**A**:
1. Asset duplication (806MB, 50% redundant)
2. Oversized images (Subject 2.png: 8MB, microw.png: 5.9MB)
3. Code duplication (~2,100 lines in project pages)
4. Dead code (~957 lines unused)

**Q: "How do page transitions work?"**
**A**: `/src/App.jsx:152-175` - Framer Motion `<AnimatePresence>` with opacity fade

**Q: "Where are the decorative animations?"**
**A**: `/src/components/Line.jsx:12-300` - 288 lines of hardcoded variants (complexity hotspot)

**Q: "What can be deleted safely?"**
**A**:
- Files: HorizontalScroll.jsx, ProjectMenu.jsx, Hoodie.jsx, Sticker.jsx, shtContent.json
- Directory: `/assets/` (entire folder - 351MB)
- Dependencies: @babel/* packages (3 packages)

**Q: "Where is styling duplicated?"**
**A**:
- Container: 16 files
- Title: 9 files
- Container2: 5 files
- See section 9 (Complexity Metrics) for full breakdown

**Q: "How is the custom cursor implemented?"**
**A**: `/src/Cursor.jsx:42-80` - uses setInterval (should use RAF), tracks mouse position with ring/dot elements

**Q: "Where is the 3D shader background?"**
**A**: `/src/components/ShaderVisual.jsx:1-221` - Three.js with embedded GLSL shaders (Truchet pattern)

---

## 14. File Status Summary

### ✅ Clean Files (No Changes Needed)
- `/src/main.jsx`
- `/src/components/sharedStyles.js`
- `/vite.config.js`

### ⚠️ Needs Optimization
- `/src/App.jsx` (duplicate Container)
- `/src/components/Navbar.jsx` (duplicate Container)
- `/src/components/Projects.jsx` (duplicate styles)
- `/src/components/About.jsx` (duplicate styles)
- `/src/components/Contact.jsx` (duplicate styles)
- `/src/components/Archive.jsx` (extract data, simplify scroll)
- `/src/components/NextProject.jsx` (duplicate animation)

### 🔥 High Priority Refactor
- `/src/components/Line.jsx` (288 lines of hardcoded values)
- `/src/Cursor.jsx` (setInterval → RAF, remove dead code)
- `/src/components/ShaderVisual.jsx` (extract shaders)
- All 6 active project pages (template pattern)

### 🗑️ Delete
- `/src/components/HorizontalScroll.jsx`
- `/src/components/ProjectMenu.jsx`
- `/src/components/Projectfiles/Hoodie.jsx`
- `/src/components/Projectfiles/Sticker.jsx`
- `/src/components/Projectfiles/shtContent.json`
- `/assets/` directory (entire folder)

---

## 15. Next Steps

### Immediate Actions (1-2 hours)
1. ✅ Delete unused files and `/assets/` directory
2. ✅ Remove Babel dependencies
3. ✅ Fix package.json (name, homepage, deploy script)
4. ✅ Create theme.js with design tokens

### Short Term (1-2 days)
5. ⚠️ Consolidate Container/Title to sharedStyles
6. ⚠️ Extract archive data to `/src/data/archive.js`
7. ⚠️ Optimize images (compress + WebP)
8. ⚠️ Fix Cursor.jsx animation (RAF)

### Medium Term (1 week)
9. 🔥 Create ProjectTemplate component
10. 🔥 Simplify Line.jsx animation system
11. 🔥 Extract GLSL shaders to separate files
12. 🔥 Implement code splitting (lazy loading)

---

**End of Index** | Total indexed files: 27 | Total LOC: ~5,872 | Redundancy: ~40%
