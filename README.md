# Johnny Sheng's Portfolio

A modern, interactive portfolio website showcasing design and creative projects with smooth animations, WebGL graphics, and compelling visual storytelling.

**Live Site**: [https://jshengdev.github.io/portfolioyush](https://jshengdev.github.io/portfolioyush)

---

## Tech Stack

### Core Framework
- **React** `18.2.0` - Modern React with hooks and concurrent features
- **React DOM** `18.2.0` - DOM rendering
- **React Router DOM** `7.0.2` - Client-side routing (latest version)

### Build Tools
- **Vite** `6.0.7` - Lightning-fast build tool with HMR
- **@vitejs/plugin-react** `4.3.4` - JSX transformation and Fast Refresh

### Styling & Animation
- **Styled-Components** `6.1.13` - CSS-in-JS solution with component-scoped styles
- **Framer Motion** `11.15.0` - Declarative animations and page transitions
- **Three.js** `0.171.0` - WebGL 3D rendering for custom shader background

### Deployment
- **gh-pages** `6.3.0` - GitHub Pages deployment automation

---

## Project Structure

```
portfolioyush/
├── public/
│   └── assets/              # Static media assets (455MB)
│       ├── AP/              # Alaina Pamela project (54MB)
│       ├── ARK/             # Ark project (3.2MB)
│       ├── C/               # The Collection films (65MB)
│       ├── CM/              # Capsule Machine (278MB)
│       ├── GROVE/           # Grove project (11MB)
│       ├── WD/              # Website Dev (1.9MB)
│       └── archive/         # Archive gallery (27MB)
│
├── src/
│   ├── assets/
│   │   └── fonts/           # Custom fonts (Ade Display)
│   ├── components/
│   │   ├── Projectfiles/    # Project detail pages
│   │   │   ├── Grove.jsx
│   │   │   ├── AP.jsx
│   │   │   ├── Collection.jsx
│   │   │   ├── Ark.jsx
│   │   │   ├── CapsuleMachine.jsx
│   │   │   └── Lens.jsx
│   │   ├── About.jsx        # Personal bio page
│   │   ├── Hero.jsx         # Landing page
│   │   ├── Projects.jsx     # Project gallery
│   │   ├── Archive.jsx      # Horizontal scroll archive
│   │   ├── Contact.jsx      # Contact page
│   │   ├── Navbar.jsx       # Left sidebar navigation
│   │   ├── Line.jsx         # Route-reactive line animations
│   │   ├── ShaderVisual.jsx # Three.js WebGL background
│   │   ├── AppSlider.jsx    # Animated text carousel
│   │   ├── NextProject.jsx  # Project navigation widget
│   │   └── sharedStyles.js  # Shared styled-components (18 components)
│   ├── data/
│   │   └── projectname.jsx  # Project metadata (6 projects)
│   ├── App.jsx              # Main app with routing (175 lines)
│   ├── App.css              # Global styles (cursor + reset)
│   ├── Cursor.jsx           # Custom animated cursor
│   ├── theme.js             # Centralized design system
│   └── main.jsx             # React root entry
│
├── dist/                    # Build output (generated)
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
├── CLAUDE.md                # Comprehensive AI assistant guide
└── README.md                # This file
```

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Jshengdev/portfolioyush.git
cd portfolioyush

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server (runs on http://localhost:3000)
npm run dev
# or
yarn dev
```

The development server features:
- Hot Module Replacement (HMR)
- Fast Refresh for React components
- Instant feedback on code changes

### Build

```bash
# Build for production
npm run build
# or
yarn build
```

Outputs optimized bundle to `/dist` directory with:
- Minified JavaScript and CSS
- Asset optimization
- Hash-based cache busting

### Preview

```bash
# Preview production build locally
npm run preview
# or
yarn preview
```

### Deploy

```bash
# Deploy to GitHub Pages
npm run deploy
# or
yarn deploy
```

Automatically builds and deploys to GitHub Pages. The `predeploy` script runs the build first.

---

## Routes

The application uses React Router v7 with 11 functional routes:

### Main Pages
- `/` - Landing page with animated title
- `/about` - Personal bio and narrative
- `/projects` - Project gallery with hover previews
- `/archive` - Horizontal scrolling archive gallery
- `/contact` - Contact information with links

### Project Detail Pages
- `/projects/Grove` - AI-Powered Project Matching platform
- `/projects/AlainaPamela` - Film internship documentation
- `/projects/TheCollection` - Film portfolio
- `/projects/Ark` - Skincare wearable design
- `/projects/CapsuleMachine` - Interactive installation
- `/projects/Lens` - Lens project (WIP)

All routes feature:
- Smooth page transitions with `AnimatePresence mode="wait"`
- Fade animations (0.5s duration)
- Consistent layout with navigation and decorative elements

---

## Architecture

### Theme System

Centralized design tokens in `/src/theme.js` accessed via styled-components `ThemeProvider`:

```javascript
// Usage in styled-components
const Text = styled.p`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.primary};
`;
```

**Theme Structure**:
- **Colors**: Text variants (primary, secondary, tertiary, muted), backgrounds, accents
- **Fonts**: Primary (Work Sans), Display (Ade)
- **Spacing**: Frame (20px), Section (60px), Element (20px)
- **Breakpoints**: Mobile (768px), Tablet (1024px), Desktop (1440px)
- **Transitions**: Standard (0.3s), Slow (0.5s)

### Shared Components

The `/src/components/sharedStyles.js` library provides 18 reusable styled-components:

**Layout Components**:
- `Container`, `Container2` - Main layout containers
- `SideBySideWrapper` - Two-column layout
- `ProblemSolutionWrapper` - Problem/solution sections

**Content Components**:
- `Title`, `Bold` - Typography
- `ChapterCard`, `OverviewBox`, `ProblemBox`, `SolutionBox` - Content cards
- `TextColumn`, `ImageColumn` - Column layouts
- `GifContainer` - Media containers

**Metadata Components**:
- `MetadataPanel`, `MetadataSection`, `MetadataLabel`, `MetadataValue`

All project detail pages use these components for consistent styling.

### Data Layer

Project metadata is centralized in `/src/data/projectname.jsx`:

```javascript
export const projectParty = [
  {
    id: 1,
    title: "Grove",
    description: "AI-Powered Project Matching",
    image: "/assets/GROVE/landingpage wide.png"
  },
  // ... 5 more projects
]
```

This single source of truth powers:
- Projects.jsx gallery
- NextProject.jsx navigation widget
- Route generation

### Performance Patterns

**Animation Optimizations**:
- `will-change: transform` on animated elements
- `requestAnimationFrame` for smooth 60fps animations
- Framer Motion's optimized animation engine

**Font Loading**:
- `font-display: swap` prevents FOUT (Flash of Unstyled Text)
- WOFF2 format for optimal compression

**Code Organization**:
- Component-scoped styles (no global CSS conflicts)
- Lazy animation triggers with `whileInView`
- Proper cleanup in useEffect hooks

---

## Component Overview

### Layout & Navigation
- **App.jsx** - Root component with routing, ThemeProvider, and fixed frame layout
- **Navbar.jsx** - Fixed left-side vertical navigation with 4 links
- **Cursor.jsx** - Custom animated cursor with ring and dot (lag effect, mix-blend-mode)

### Visual Effects
- **ShaderVisual.jsx** - Three.js WebGL background with custom GLSL shaders
  - Truchet tile pattern generation
  - Mouse-interactive lighting
  - Noise-based animations
  - Runs continuously at 60fps
- **Line.jsx** - Route-reactive animated decorative line system (6 animation states)

### Page Components
- **Hero.jsx** - Landing page with title and AppSlider carousel
- **About.jsx** - Personal narrative with right-aligned text layout
- **Projects.jsx** - Project gallery with hover preview system and glow effects
- **Archive.jsx** - Horizontal scrolling gallery with custom wheel-to-horizontal scroll
- **Contact.jsx** - Contact information with external links

### Utility Components
- **AppSlider.jsx** - Infinite horizontal scroll text carousel (12s animation loop)
- **NextProject.jsx** - Project navigation widget with preview and circular logic

### Project Detail Components
All follow a consistent narrative structure:
1. Hero section with title
2. MetadataPanel (Role, Timeline, Skills)
3. OverviewBox (Project summary)
4. ProblemSolutionWrapper (Challenge and approach)
5. SideBySideWrapper sections (Acts I, II, III)
6. ChapterCard (Reflections)
7. NextProject navigation

---

## Styling System

### Theme Access Pattern

All components wrapped in `ThemeProvider` can access design tokens:

```javascript
import { theme } from './theme';

// In App.jsx
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>

// In any styled-component
const Component = styled.div`
  color: ${props => props.theme.colors.text.primary};
  padding: ${props => props.theme.spacing.section};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.element};
  }
`;
```

### Styled-Components Patterns

**Basic Usage**:
```javascript
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  transition: ${props => props.theme.transitions.standard};
`;
```

**With Framer Motion**:
```javascript
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedDiv = styled(motion.div)`
  opacity: 0.9;
  /* styles */
`;
```

**Dynamic Props**:
```javascript
const Container = styled.div`
  max-width: ${props => props.maxWidth || '600px'};
  opacity: ${props => props.isVisible ? 1 : 0};
`;
```

### Animation Patterns

**Page Transitions** (AnimatePresence):
```javascript
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    {/* routes */}
  </Routes>
</AnimatePresence>
```

**Scroll Animations**:
```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Keyframe Animations**:
```javascript
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Component = styled.div`
  animation: ${fadeUp} 0.5s ease;
`;
```

---

## Adding a New Project

Follow these 4 steps to add a new project to the portfolio:

### 1. Create Assets
```bash
# Create project folder in public/assets
mkdir public/assets/PROJECT_CODE

# Add your images, GIFs, etc.
# Use consistent naming (no spaces, lowercase preferred)
```

### 2. Add Project Data

Edit `/src/data/projectname.jsx`:

```javascript
export const projectParty = [
  // ... existing projects
  {
    id: 7,  // Next sequential ID
    title: "Project Name",
    description: "Brief description",
    image: "/assets/PROJECT_CODE/thumbnail.png"
  },
]
```

### 3. Create Project Component

Create `/src/components/Projectfiles/ProjectName.jsx`:

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Container2,
  Title,
  MetadataPanel,
  OverviewBox,
  ChapterCard,
  // ... other shared components
} from '../sharedStyles';
import NextProject from '../NextProject';
import { projectParty } from '../../data/projectname';

function ProjectName() {
  const navigate = useNavigate();
  const currentIndex = projectParty.findIndex(p => p.title === "Project Name");
  const currentProject = projectParty[currentIndex];
  const nextProject = projectParty[(currentIndex + 1) % projectParty.length];

  return (
    <Container>
      <Container2>
        <Title onClick={() => navigate('/')}>Project Name</Title>
      </Container2>

      {/* MetadataPanel, content sections, etc. */}

      <NextProject
        currentProject={currentProject}
        nextProject={nextProject}
      />
    </Container>
  );
}

export default ProjectName;
```

Use existing project components (Grove.jsx, CapsuleMachine.jsx) as templates.

### 4. Add Route

Edit `/src/App.jsx`:

```javascript
// Import at top
import ProjectName from './components/Projectfiles/ProjectName';

// Add route inside <Routes>
<Route path="/projects/ProjectName"
  element={
    <PageWrapper>
      <ProjectName />
    </PageWrapper>
  }
/>
```

**URL Format**: `/projects/{TitleWithoutSpaces}` (e.g., "The Collection" → `/projects/TheCollection`)

### Verify

```bash
# Test in development
npm run dev

# Navigate to http://localhost:3000/projects/ProjectName
# Check Projects gallery shows new project
# Verify NextProject navigation works
```

---

## Maintenance

### Code Quality Standards

**Styling**:
- Use `sharedStyles.js` components before creating new styled-components
- Access theme via `props.theme` for consistency
- Follow existing naming conventions (PascalCase for components)

**Components**:
- Keep components focused and single-purpose
- Use proper cleanup in `useEffect` hooks
- Prefer functional components and hooks
- Add PropTypes or TypeScript for complex props

**Data**:
- Keep project data in `/src/data/projectname.jsx`
- Don't hardcode project lists in components
- Use absolute paths for assets (`/assets/...`)

### Asset Management

**Best Practices**:
- Optimize images before adding (target <10MB per file)
- Use WebP format where possible for better compression
- Add `loading="lazy"` attribute for images below the fold
- Compress GIFs with tools like gifsicle or ezgif.com

**Current Asset Sizes**:
- Total: 455MB (needs optimization)
- Target: <100MB total

**Asset Organization**:
```
/public/assets/
  /{PROJECT_CODE}/      # One folder per project
    thumbnail.png       # Used in gallery
    image1.png
    image2.gif
    etc.
```

### Dependency Updates

Check for updates regularly:

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all dependencies (test thoroughly after)
npm update
```

**Critical Dependencies**:
- React & React-DOM (stay on same version)
- Vite (check breaking changes)
- Framer Motion (animation library)
- Three.js (WebGL graphics)

### Performance Monitoring

**Key Metrics**:
- Lighthouse score (aim for 90+ performance)
- First Contentful Paint (FCP) <2s
- Time to Interactive (TTI) <5s
- Total bundle size <1MB (after gzip)

**Optimization Opportunities**:
1. Code splitting by route (lazy load project pages)
2. Image optimization and lazy loading
3. Shader performance detection (pause on low FPS)
4. Tab visibility detection (pause animations when hidden)

---

## For AI Agents

### Key Files for Understanding

**Entry Points**:
- `/src/main.jsx` - React root entry (12 lines)
- `/src/App.jsx` - Main app with routing (175 lines)
- `/index.html` - HTML entry point

**Configuration**:
- `/src/theme.js` - **Central design system** with all tokens (colors, fonts, spacing, breakpoints, transitions)
- `/src/components/sharedStyles.js` - **18 reusable styled-components** used across all project pages
- `/vite.config.js` - Vite configuration (dev server port 3000, build to dist/)
- `/package.json` - Dependencies and scripts

**Data Sources**:
- `/src/data/projectname.jsx` - **Single source of truth** for project metadata (6 projects)
- Project routes use title without spaces (e.g., "The Collection" → "TheCollection")

**Component Patterns**:
- All styling uses styled-components (no CSS modules)
- All project pages follow same structure (see Component Overview)
- Animation via Framer Motion with `whileInView` triggers
- Custom cursor, shader, and line animations add visual interest

**Route Structure**:
- React Router v7 with `AnimatePresence mode="wait"`
- 5 main pages + 6 project detail pages (11 routes total)
- PageWrapper provides consistent fade transitions (0.5s)

**Architecture Notes**:
- No state management library (local state only with useState)
- ThemeProvider wraps entire app for consistent theming
- Fixed frame layout (30px border + 2.5px inner frame)
- WebGL shader runs continuously at 60fps (performance consideration)

**Common Tasks**:
- Adding project: Update `/src/data/projectname.jsx`, create component, add route
- Changing colors: Edit `/src/theme.js` colors object
- Modifying layout: Check `/src/components/sharedStyles.js` first
- Route changes: Edit `/src/App.jsx` Routes section (lines 72-151)

**Technical Debt Notes** (see CLAUDE.md for full details):
- Some unused components remain (Hoodie, Sticker)
- Asset optimization needed (455MB → target <100MB)
- Route `/projects/NextProject` exists but shouldn't (NextProject is a widget, not a page)

**Documentation**:
- `/CLAUDE.md` - **Comprehensive AI guide** (5,000+ lines) with codebase audit, conventions, component details, and cleanup priorities

---

## License

Private portfolio project - All rights reserved.

---

## Contact

**Johnny Sheng**
- Portfolio: [https://jshengdev.github.io/portfolioyush](https://jshengdev.github.io/portfolioyush)
- LinkedIn: [linkedin.com/in/johnny-sheng](https://www.linkedin.com/in/johnny-sheng/)

---

**Last Updated**: 2025-11-21
**Version**: 1.0.0
