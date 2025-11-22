# Component Architecture

This document provides a comprehensive guide to all React components in the portfolio, including their purpose, state management, props, and interdependencies.

## State Management

**No formal state management library** - all state is local component state using React hooks.

### Patterns Used
- `useState` - Local component state (7 components use state)
- `useEffect` - Side effects, event listeners, animations, cleanup
- `useRef` - DOM references (scrollRef, mountRef, canvasRef)
- `useNavigate` - Programmatic navigation (11 components)
- `useLocation` - Route detection (Line.jsx for route-reactive animations)

### State Inventory

| Component | State Variables | Purpose |
|-----------|----------------|---------|
| Cursor.jsx | dotX, dotY, ringX, ringY, isClicking | Cursor position & click animation |
| Projects.jsx | selectedProject, imageError | Preview hover state |
| Line.jsx | 6 animation states | Route-specific animation variants |

### Data Flow

```
projectname.jsx (source of truth)
     ↓
Projects.jsx (selection state)
     ↓
NextProject.jsx (display)
```

**No Props Drilling Issues** - Flat component hierarchy

## Routing Structure

```javascript
Routes (11 functional + 1 broken):
/ → Hero.jsx (Landing page)
/about → About.jsx (Personal bio)
/projects → Projects.jsx (Gallery listing)
/archive → Archive.jsx (Horizontal scroll gallery)
/contact → Contact.jsx (Contact info)

Project Detail Routes (6 active projects):
/projects/Grove → Grove.jsx
/projects/CapsuleMachine → CapsuleMachine.jsx
/projects/TheCollection → Collection.jsx
/projects/Ark → Ark.jsx
/projects/AlainaPamela → AP.jsx
/projects/Lens → Lens.jsx ⚠️ Component exists but NOT in projectParty data

Broken Route (needs removal):
/projects/NextProject → NextProject component ⚠️ App.jsx:158-162
  (NextProject is a widget, not a standalone page)
```

### Route Formatting Pattern

**Current** (App.jsx, Projects.jsx):
```javascript
const formattedTitle = projectTitle.replace(/\s+/g, "");
// "The Collection" → "TheCollection"
// "Alaina Pamela" → "AlainaPamela"
```

**Issue**: Not URL-safe (mixed case, no hyphens)

**Recommendation**: Use kebab-case for SEO
```javascript
const formattedTitle = projectTitle.toLowerCase().replace(/\s+/g, "-");
// "The Collection" → "the-collection"
// "Alaina Pamela" → "alaina-pamela"
```

## Core Layout Components

### App.jsx (`src/App.jsx:1-175`)

- **Purpose**: Root application container with routing
- **Key Features**:
  - React Router v7 implementation with Routes
  - AnimatePresence for page transitions (mode="wait")
  - Fixed border frame design (30px border + nested frame 2.5px)
  - PageWrapper component for consistent transitions
- **Layout**: Container → Frame → ShaderVisual + Left (Navbar) + Line + AnimatedRoutes
- **Dependencies**: All page components + Router + Cursor
- **State**: None (routing only)
- **Issues**: Route `/projects/NextProject` exists but shouldn't (lines 158-162)

### Cursor.jsx (`src/Cursor.jsx:1-113`)

- **Purpose**: Custom animated cursor with ring and dot
- **State**: dotX, dotY, ringX, ringY (for lag effect), isClicking
- **Animation**: requestAnimationFrame-based easing (optimized in Wave 3)
- **Styles**: `mix-blend-mode: difference` for contrast
- **Performance**: Uses `will-change: transform`
- **Clean**: Optimized during Wave 3 cleanup

### Navbar.jsx (`src/components/Navbar.jsx:1-75`)

- **Purpose**: Fixed left-side vertical navigation
- **Links**: About, Projects, Archive, Contact (no Home link - click title returns home)
- **Navigation**: Uses `useNavigate` with onClick handlers (not Link components)
- **Font**: 'Ade' custom font, 7px letter-spacing
- **Position**: Absolute positioning in Left container
- **State**: Stateless functional component

### Line.jsx (`src/components/Line.jsx:1-184`)

- **Purpose**: Complex animated decorative line system
- **Optimization**: Simplified from 390 → 184 lines in Wave 6 (-52.8% reduction)
- **State**: Route-reactive animation config via `routeAnimations` object
- **Route Detection**: `useLocation` + `getRouteKey()` function
- **Components**: 5 line variations + 2 "C" letter animations
- **Animations**: Framer Motion variants with complex transforms:
  - translateX, translateY, rotate, skewX, scale, scaleX
- **Routes Supported**:
  - `/` - Home diagonal lines
  - `/about` - Horizontal stretched lines
  - `/archive` - Double horizontal lines
  - `/projects` - Vertical aligned lines
  - `/contact` - Complex C-letter animations
  - `/projects/*` - Project detail lines
- **Performance**: Optimized animation system, consider mobile performance

### ShaderVisual.jsx (`src/components/ShaderVisual.jsx:1-221`)

- **Purpose**: Three.js WebGL procedural background with route-reactive visual personalities
- **Technology**: Custom GLSL vertex + fragment shaders (extracted to `.glsl` files in Wave 6)

**State Management**:
- `useContext(ThemeContext)` - Dark/light mode detection
- `useLocation()` - Route detection for personality selection
- `useRef(mountRef)` - DOM reference for Three.js canvas
- `useRef(trailBufferRef)` - Cursor trail buffer (20 points with decay)
- `useEffect()` - Scene setup, animation loop, event handlers, cleanup

**Route Personalities** (5 attributes define visual character):
- **Home** (`/`): complexity: 0.5, energy: 0.6, focus: 0.5, warmth: 0.5, depth: 0.4
- **About** (`/about`): complexity: 0.3, energy: 0.3, focus: 0.7, warmth: 0.4, depth: 0.3
- **Projects** (`/projects`): complexity: 0.8, energy: 0.7, focus: 0.6, warmth: 0.5, depth: 0.7
- **Archive** (`/archive`): complexity: 0.9, energy: 0.5, focus: 0.5, warmth: 0.5, depth: 0.8
- **Contact** (`/contact`): complexity: 0.4, energy: 0.4, focus: 0.5, warmth: 0.7, depth: 0.4

**Key Features**:
1. **Harmonic Motion System** (John Whitney-inspired)
   - 3 sine waves with irrational frequency ratios (phi, sqrt(2), pi/4)
   - Applied to pattern coordinates and light position
   - Never-repeating organic motion
   - Speed controlled by `u_energy` attribute

2. **Cursor Light Trails** (Gmunk-inspired)
   - 20-point trail buffer with position and strength
   - Decay over 2 seconds
   - Additive glow rendering
   - Interactive light sculpting effect

3. **Multi-Layer Depth System** (SANAA-inspired)
   - 3 noise layers at 2x, 4x, 8x scales
   - Depth-based blending (low depth = flat, high depth = dimensional)
   - Focus attribute controls contrast/sharpness
   - Parallax mouse offset on high-depth routes

4. **Theme Integration**
   - Background color adapts to dark/light mode
   - Accessed via ThemeContext
   - Passed as `u_backgroundColor` uniform

**Shader Uniforms** (15 total):
- **Standard**: `u_time` (animation clock), `u_resolution` (screen size), `u_mouse` (cursor position)
- **Theme**: `u_backgroundColor` (vec3, from ThemeContext)
- **Personality Attributes**: `u_complexity` (pattern density), `u_energy` (animation speed), `u_focus` (contrast/sharpness), `u_warmth` (color temperature), `u_depth` (z-space layering)
- **Cursor Trails**: `u_trailCount` (active points), `u_trailPositions[10]` (vec2 array), `u_trailStrengths[10]` (float array)

**Shader Functions**:
- `getHarmonicOffset()` - 3-wave harmonic oscillator
- `layeredNoise()` - 3-layer noise system with depth blending
- `getCursorTrailInfluence()` - Trail glow calculation
- `truchetPattern()` - Subtle pattern overlay (reduced prominence)

**Performance**:
- Runs continuously via `requestAnimationFrame`
- 60fps target on modern GPUs
- Bundle impact: +6KB (+0.7%)
- GPU usage: 30-40%

**Positioning**: Fixed, z-index: -1 (always behind content)

**Cleanup**: Removes event listeners, cancels animation frame on unmount

**Shader Files**:
- `src/shaders/truchet.vert.glsl` (85 bytes)
- `src/shaders/truchet.frag.glsl` (~5KB after additions)

**Design Philosophy**: See [docs/design/SHADER_PHILOSOPHY.md](../design/SHADER_PHILOSOPHY.md)

## Page Components

### Hero.jsx (`src/components/Hero.jsx:1-114`)

- **Purpose**: Landing page
- **Layout**: Title + AppSlider
- **Content**: "johnny sheng's portfolio"
- **Navigation**: Click title to return home (useNavigate)
- **Lazy Loaded**: Yes (Wave 6 optimization)

### About.jsx (`src/components/About.jsx:1-105`)

- **Purpose**: Personal narrative/bio page
- **Content**: 4-paragraph personal story
- **Layout**: Right-aligned text box (Left: empty, Right: ContentContainer)
- **Navigation**: Click title to return home
- **Lazy Loaded**: Yes (Wave 6 optimization)
- **Status**: Clean, no issues

### Projects.jsx (`src/components/Projects.jsx:1-327`)

- **Purpose**: Main project gallery/listing page
- **State**: `selectedProject` (hover state), `imageError` (fallback)
- **Layout**: Grid (1fr 1fr) - List on left, Preview on right
- **Features**:
  - Hover preview system (updates on mouse enter)
  - 3D perspective on preview (`rotateY: -2deg`)
  - Animated title with glow effect (`softGlow` keyframe)
  - Gradient overlay on preview images
  - NextProject widget integration
- **Data Source**: `projectParty` from `/data/projectname.jsx`
- **Navigation**: Click project → `/projects/{FormattedTitle}`
- **Image Handling**: Error state fallback to placeholder text
- **Lazy Loaded**: Yes (Wave 6 optimization)

### Archive.jsx (`src/components/Archive.jsx:1-330`)

- **Purpose**: Horizontal scrolling gallery of archival work
- **Data**: Externalized to `src/data/archive.js` (17 projects, completed in Wave 3)
- **Custom Scroll**: Wheel-to-horizontal implementation
  - `requestAnimationFrame` animation loop
  - Easing coefficient: 0.1
  - Multiplier: 1.5x on deltaY
  - Smooth easing: `currentScroll += (targetScroll - currentScroll) * 0.1`
- **Layout**: Random margins (140-270px) and skew transforms (-8 to 8deg)
- **No routing**: Archive items don't link to detail pages
- **Performance**: Good - uses RAF optimization
- **Lazy Loaded**: Yes (Wave 6 optimization)

### Contact.jsx (`src/components/Contact.jsx:1-122`)

- **Purpose**: Contact information page
- **Links**: LinkedIn (external), Email (mailto:)
- **Content**: "Website under redesign (coming back soon)" message
- **Layout**: Right-aligned content box
- **Lazy Loaded**: Yes (Wave 6 optimization)
- **Status**: Clean, no issues

## Utility Components

### AppSlider.jsx (`src/components/AppSlider.jsx:1-103`)

- **Purpose**: Animated text carousel on Hero page
- **Animation**: Infinite horizontal scroll
  - Keyframe: `autoRun` (12s linear infinite)
  - Translates from 0% to -50% (duplicated items create seamless loop)
- **Items**: 8 labels (BATMANN, DESIGNER, FILMMAKER, PHOTOGRAPHER, WEB DEVELOPER, ART DIRECTOR, CREATIVE DIRECTOR, 3D ARTIST)
- **Pattern**: Duplicates array twice for seamless infinite effect
- **Decorative**: ASCII art position labels ("LEFT", "TOP", "RIGHT")
- **Status**: Well-implemented, no issues

### NextProject.jsx (`src/components/NextProject.jsx:1-181`)

- **Purpose**: Project navigation widget (embedded in project pages)
- **Props**: `currentProject`, `nextProject`
- **Features**:
  - Preview image with hover scale effect
  - Title and description display
  - Arrow button navigation
  - Circular layout logic (wraps to first project after last)
- **Navigation**: `useNavigate` to next project route
- **Issue**: Has `handlePrevClick` function but no prev button in UI
- **Lazy Loaded**: Yes (Wave 6 optimization)

### sharedStyles.js (`src/components/sharedStyles.js:1-265`)

- **Purpose**: Centralized styled-components library
- **Created**: Wave 3 consolidation
- **Exports**: 18 styled components
- **Key Components**:
  - Layout: `Container2`, `SideBySideWrapper`, `ProblemSolutionWrapper`
  - Headers: `Title`, `Bold`
  - Cards: `ChapterCard`, `OverviewBox`, `ProblemBox`, `SolutionBox`
  - Columns: `TextColumn`, `ImageColumn`
  - Media: `GifContainer`
  - Metadata: `MetadataPanel`, `MetadataSection`, `MetadataLabel`, `MetadataValue`
- **Keyframes**: `fadeUp` animation (opacity 0→1, translateY 20px→0)
- **CSS Variables Referenced** (but not defined):
  - `var(--font-heading)` - Fallback to inline styles
  - `var(--font-body)` - Fallback to inline styles
  - `var(--paragraph-color)` - Fallback to inline styles
- **Recommendation**: Define variables in App.css or remove references

## Project Detail Components

All 6 active project pages follow this structure:

### Common Pattern
1. Hero Section with title (Container2 + Title)
2. MetadataPanel (Role, Timeline, Skills)
3. OverviewBox (Project summary)
4. ProblemSolutionWrapper (ProblemBox + SolutionBox)
5. SideBySideWrapper sections for Act I, II, III
6. ChapterCard for Reflections
7. NextProject navigation widget

### Active Project Pages

| Component | Size | Project | Assets | Notes |
|-----------|------|---------|--------|-------|
| Grove.jsx | 13,872 bytes | AI-Powered Project Matching | 16 files (11MB) | Lazy loaded (Wave 6) |
| CapsuleMachine.jsx | 18,799 bytes | Interactive Installation | 31 PNGs + gifs (278MB) | **Largest file & assets**, Lazy loaded |
| Collection.jsx | 13,389 bytes | Film Portfolio | 44 images (65MB) | JPG files, Lazy loaded |
| Ark.jsx | 12,015 bytes | Skincare Wearable | 11 PNGs (3.2MB) | Clean, Lazy loaded |
| AP.jsx | 11,053 bytes | Film Internship | 6 files (54MB) | 3 GIFs, 3 PNGs, Lazy loaded |
| Lens.jsx | 5,112 bytes | (Lens project) | Unknown | ⚠️ Has route but NOT in projectParty data, Lazy loaded |

### All Project Pages
- Import from `sharedStyles.js`
- Use `projectParty` data for NextProject
- Use `motion.div` with `whileInView` for scroll animations
- Follow narrative storytelling structure
- All lazy loaded via React.lazy() (Wave 6 optimization)

## Component Dependency Graph

```
main.jsx
  └── App.jsx
      ├── Cursor.jsx (global, no dependencies)
      ├── Container (styled-component)
      │   └── Frame (styled-component)
      │       ├── ShaderVisual.jsx
      │       │   └── THREE.js (3D library)
      │       │   └── GLSL shaders (truchet.vert.glsl, truchet.frag.glsl)
      │       ├── Left (styled-component)
      │       │   └── Navbar.jsx
      │       │       └── useNavigate (router)
      │       ├── Line.jsx
      │       │   ├── useLocation (router, for route detection)
      │       │   └── motion (framer-motion, simplified animation system)
      │       └── AnimatedRoutes
      │           ├── PageWrapper (motion wrapper)
      │           └── Routes (React.lazy() for all pages)
      │               ├── / → Hero.jsx
      │               │   └── AppSlider.jsx (infinite scroll animation)
      │               ├── /about → About.jsx
      │               ├── /projects → Projects.jsx
      │               │   ├── projectParty (data)
      │               │   ├── useState (selectedProject, imageError)
      │               │   └── NextProject.jsx
      │               │       └── projectParty (data)
      │               ├── /archive → Archive.jsx
      │               │   ├── archiveProjects data (src/data/archive.js)
      │               │   └── Custom scroll (RAF + easing)
      │               ├── /contact → Contact.jsx
      │               └── /projects/* → Project Detail Pages
      │                   ├── Grove.jsx
      │                   ├── CapsuleMachine.jsx
      │                   ├── Collection.jsx
      │                   ├── Ark.jsx
      │                   ├── AP.jsx
      │                   └── Lens.jsx ⚠️ (has route but not in data)
      │                   All project pages use:
      │                   ├── sharedStyles.js (18 components)
      │                   ├── projectParty (for NextProject)
      │                   ├── NextProject.jsx
      │                   └── motion.div (scroll animations)

Data Files:
- projectname.jsx (projectParty array - 6 projects)
  └── Used by: Projects.jsx, NextProject.jsx, all project pages
- archive.js (archiveProjects array - 17 projects)
  └── Used by: Archive.jsx
```

## Import Statistics

- **Most Imported**: styled-components (all 16 components), react (all 16)
- **Second Most**: framer-motion (13 components), useNavigate (11 components)
- **Third Most**: projectParty (7 components)
- **Circular Dependencies**: None detected ✅

## Lazy Loading Implementation (Wave 6)

**Components Lazy Loaded**: 11 total
- **Pages**: About, Hero, Contact, Projects, Archive
- **Project Details**: Grove, CapsuleMachine, Ark, AP, Lens, Collection
- **Widget**: NextProject

**Benefits**:
- Main bundle: 797KB (down from ~995KB = -20% reduction)
- 15 separate JS chunks for optimal caching
- Faster initial page load
- Chunks load on-demand when routes accessed

**Implementation**:
```javascript
// Example from App.jsx
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
// ... etc

<Suspense fallback={<LoadingContainer>Loading...</LoadingContainer>}>
  <Routes location={location} key={location.pathname}>
    {/* routes */}
  </Routes>
</Suspense>
```

---

**Last Updated**: 2025-11-21 (Post-Wave 7 Integration Testing)
**Total Active Components**: 16
**Unused Components Removed**: 10 (Wave 1 cleanup)
