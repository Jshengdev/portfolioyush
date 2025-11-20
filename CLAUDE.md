# CLAUDE.md - AI Assistant Guide

**Last Updated**: 2025-11-20
**Project**: Johnny Sheng's Portfolio Website
**Repository**: portfolioyush

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Codebase Structure](#codebase-structure)
3. [Key Technologies & Dependencies](#key-technologies--dependencies)
4. [Component Architecture](#component-architecture)
5. [Styling & Design System](#styling--design-system)
6. [Development Workflows](#development-workflows)
7. [Conventions & Patterns](#conventions--patterns)
8. [Common Tasks & Commands](#common-tasks--commands)
9. [Important Notes & Gotchas](#important-notes--gotchas)
10. [File Location Reference](#file-location-reference)

---

## Project Overview

This is a React-based portfolio website for Johnny Sheng, a designer/developer/filmmaker. The site showcases creative projects with a focus on smooth animations, interactive 3D graphics, and compelling visual storytelling.

**Homepage**: https://goofybugga.github.io/thewebsite

### Key Features
- Custom WebGL shader background (Three.js)
- Custom animated cursor
- Horizontal scrolling archive gallery
- Project detail pages with narrative structure
- Smooth page transitions (Framer Motion)
- Animated decorative line system
- Responsive design with modern aesthetics

### Statistics
- **Components**: 26+ React components
- **Lines of Code**: ~2,633 lines
- **Routes**: 11 total (1 home + 4 main pages + 6 project details)
- **Assets**: 132 media files across 9 directories
- **Dependencies**: 14 production packages

---

## Codebase Structure

```
/home/user/portfolioyush/
├── src/
│   ├── assets/
│   │   └── fonts/              # Custom 'Ade Display' font files
│   ├── components/
│   │   ├── Projectfiles/       # Individual project page components
│   │   │   ├── Grove.jsx       # AI project matching platform
│   │   │   ├── AP.jsx          # Film internship
│   │   │   ├── Collection.jsx  # Film portfolio
│   │   │   ├── Ark.jsx         # Skincare wearable
│   │   │   ├── CapsuleMachine.jsx
│   │   │   ├── Sticker.jsx
│   │   │   ├── Hoodie.jsx
│   │   │   └── Lens.jsx
│   │   ├── About.jsx           # About page
│   │   ├── AppSlider.jsx       # Animated text carousel
│   │   ├── Archive.jsx         # Horizontal scroll gallery
│   │   ├── Contact.jsx         # Contact page
│   │   ├── Hero.jsx            # Landing page
│   │   ├── HorizontalScroll.jsx # Reusable horizontal scroll
│   │   ├── Line.jsx            # Animated decorative lines
│   │   ├── Navbar.jsx          # Navigation menu
│   │   ├── NextProject.jsx     # Project navigation component
│   │   ├── ProjectMenu.jsx     # Alternative project browser
│   │   ├── Projects.jsx        # Projects gallery/listing
│   │   ├── ShaderVisual.jsx    # WebGL background
│   │   └── sharedStyles.js     # Shared styled-components
│   ├── data/
│   │   └── projectname.jsx     # Project data array (6 projects)
│   ├── App.css                 # Minimal global styles
│   ├── App.jsx                 # Main app with routing
│   ├── Cursor.jsx              # Custom cursor component
│   └── main.jsx                # App entry point
├── public/
│   └── assets/                 # Media files organized by project
│       ├── archive/            # Archive project images (17 files)
│       ├── AP/                 # Alaina Pamela assets
│       ├── ARK/                # Ark project assets
│       ├── C/                  # Collection (28+ images)
│       ├── CM/                 # Capsule Machine (30+ photos)
│       ├── GROVE/              # Grove project assets
│       └── WD/                 # Website Dev assets
├── dist/                       # Build output (gitignored)
├── node_modules/               # Dependencies (gitignored)
├── index.html                  # HTML entry point
├── package.json                # Project configuration
├── vite.config.js              # Vite configuration
└── yarn.lock                   # Dependency lock file
```

---

## Key Technologies & Dependencies

### Core Framework
- **React 18.2.0** - Modern React with concurrent features
- **React-DOM 18.2.0** - DOM rendering
- **React Router DOM 7.0.2** - Client-side routing (latest version)

### Animation & Interaction
- **Framer Motion 11.15.0** - Declarative animations
  - Page transitions via `AnimatePresence`
  - Scroll-triggered animations with `whileInView`
  - Hover effects and layout animations
  - Variant-based animation system

### 3D Graphics
- **Three.js 0.171.0** - WebGL 3D rendering
  - Used in `ShaderVisual.jsx` component
  - Custom GLSL shaders for background effects
  - Mouse-interactive lighting and noise patterns
  - Truchet tile pattern generation

### Styling
- **Styled-Components 6.1.13** - CSS-in-JS solution
  - 100% of styling uses styled-components
  - Component-scoped styles
  - Dynamic styling with props
  - Keyframe animations
  - No external CSS files except fonts

### Content
- **React-Markdown 9.0.3** - Markdown rendering (available but not actively used)
- **Rehype-Highlight 7.0.1** - Syntax highlighting for code blocks

### Build Tools
- **Vite 6.0.7** - Lightning-fast build tool
  - HMR (Hot Module Replacement)
  - Optimized bundling
  - Modern ES modules support
  - Dev server on port 3000
- **@vitejs/plugin-react 4.3.4** - JSX transformation and Fast Refresh

### Deployment
- **gh-pages 6.3.0** - GitHub Pages deployment automation

---

## Component Architecture

### State Management
**No formal state management library** - all state is local component state using React hooks.

**Patterns Used**:
- `useState` for local component state
- `useEffect` for side effects (event listeners, animations)
- `useRef` for DOM references and persistent values
- `useNavigate` for programmatic navigation
- `useLocation` for route detection

**Data Flow**:
```
projectname.jsx (data source)
     ↓
Projects.jsx (selection state)
     ↓
NextProject.jsx (display)
```

### Routing Structure

```javascript
Routes:
/ - Hero (landing page)
/about - About page
/projects - Projects listing page
/archive - Archive horizontal gallery
/contact - Contact information

Project Detail Routes:
/projects/Grove
/projects/CapsuleMachine
/projects/Lens
/projects/TheCollection
/projects/Ark
/projects/AlainaPamela
```

### Core Layout Components

**App.jsx** (`src/App.jsx`)
- Main application container with routing
- Fixed border frame design (30px border + nested frame)
- Page transition animations
- Global layout with Navbar, Line, ShaderVisual, and Cursor

**Cursor.jsx** (`src/Cursor.jsx`)
- Custom animated cursor with ring and dot
- Lag effect for smooth following
- Click animations
- Uses `mix-blend-mode: difference`

**Navbar.jsx** (`src/components/Navbar.jsx`)
- Fixed left-side vertical navigation
- Links: About, Projects, Archive, Contact
- Custom 'Ade' font with extensive letter-spacing

**Line.jsx** (`src/components/Line.jsx`)
- Complex animated line system
- Responds to route changes with different animations
- Multiple line components with Framer Motion variants
- Creates visual interest with "C" letters and dots

**ShaderVisual.jsx** (`src/components/ShaderVisual.jsx`)
- Three.js WebGL background
- Custom GLSL shaders with Truchet patterns
- Mouse-interactive lighting
- Fixed background (z-index: -1)

### Page Components

**Hero.jsx** - Landing page with title and AppSlider
**About.jsx** - Personal narrative text
**Projects.jsx** - Gallery with hover preview system
**Archive.jsx** - Custom horizontal scrolling gallery
**Contact.jsx** - Contact links and information

### Project Detail Pattern

All project pages follow this narrative structure:
1. Hero Section with title
2. Metadata Panel (Role, Timeline, Skills)
3. Overview Box
4. Problem/Solution Wrapper
5. Act I, II, III sections
6. Reflections/Chapter Card
7. Next Project navigation

**Shared Components** (from `sharedStyles.js`):
- `ChapterCard`, `ProblemBox`, `SolutionBox`
- `GifContainer`, `ImageGrid`, `VideoContainer`
- `MetadataPanel`, `ContentContainer`
- `SideBySideSection`

---

## Styling & Design System

### Color Scheme
- **Primary**: `rgba(255, 255, 255, 0.7)` - Semi-transparent white
- **Accents**: `rgba(136, 169, 215, 0.47)` - Blue tint
- **Background**: Dark with blur effects
- Heavy use of transparency and `backdrop-filter: blur()`

### Typography
- **Headings**: 'Ade Display' (custom font loaded from `/src/assets/fonts/`)
- **Body**: 'Work Sans' (Google Fonts)
- **Fallbacks**: 'Playfair Display', 'Plus Jakarta Sans'
- Extensive use of `letter-spacing` for aesthetic effect

### CSS Custom Properties
Defined in `sharedStyles.js`:
- `--font-heading`
- `--paragraph-color`
- Consistent spacing and typography scales

### Layout Techniques
- **CSS Grid** for complex layouts (Projects, Archive)
- **Flexbox** for simpler alignments
- **Fixed positioning** for persistent elements (Navbar, titles)
- **Absolute positioning** for overlays and decorative elements

### Visual Effects
```javascript
// Backdrop blur
background: rgba(20, 20, 20, 0.3);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);

// Glow effects
box-shadow:
  0 0 30px rgba(255, 255, 255, 0.1),
  0 0 20px rgba(136, 169, 215, 0.2);

// Blend modes
mix-blend-mode: difference; // Cursor
mix-blend-mode: exclusion;  // Decorative text
```

### Responsive Breakpoints
```javascript
@media (max-width: 768px) { /* tablet */ }
@media (max-width: 480px) { /* mobile */ }
```

### Animation Patterns

**Framer Motion Variants**:
```javascript
const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

<motion.div
  variants={itemVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: .1 }}
/>
```

**CSS Keyframes**:
```javascript
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
```

**Performance Optimizations**:
- `will-change: transform;` on animated elements
- `loading="lazy"` on images
- `font-display: swap;` for custom fonts

---

## Development Workflows

### Prerequisites
- Node.js (for npm/yarn)
- Yarn package manager (preferred)
- Git for version control

### Setup
```bash
# Install dependencies
yarn install

# Start development server (port 3000)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Deploy to GitHub Pages
yarn deploy
```

### Development Server
- Runs on `http://localhost:3000`
- Hot Module Replacement (HMR) enabled
- Fast refresh for React components

### Build Process
1. `yarn build` - Vite bundles to `/dist` directory
2. Optimizes and minifies code
3. Generates production-ready assets
4. Output directory: `/dist`

### Deployment
- Target: GitHub Pages
- Command: `yarn deploy`
- Process: Builds to `/dist` then deploys using `gh-pages`
- Live URL: https://goofybugga.github.io/thewebsite

### Git Workflow
```bash
# Current branch pattern
claude/claude-md-mi82ei6jpvrn4lqz-01QkzPFkjLpsd6w2fp5AwoJd

# Standard workflow
git status
git add .
git commit -m "Description of changes"
git push -u origin <branch-name>
```

**Important**: Branch names must start with `claude/` and end with matching session ID for pushes to succeed.

---

## Conventions & Patterns

### Naming Conventions

**Files**:
- **PascalCase** for component files: `Hero.jsx`, `AppSlider.jsx`
- **camelCase** for data files: `projectname.jsx`
- **kebab-case** for CSS: `fonts.css`

**Components**:
- Styled components use semantic names: `Container`, `Left`, `Right`, `Section`
- Descriptive prefixes: `Hero-`, `Project-`, `Gallery-`

**Variables**:
- State: camelCase - `selectedProject`, `imageError`
- Constants: camelCase - `projectParty`
- Animation variants: descriptive objects - `lineVariants`, `cVariants`

### Component Structure

Standard component organization:
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 2. Styled components definitions
const Container = styled.div`...`;
const Section = styled.section`...`;

// 3. Helper components (if any)
const HelperComponent = () => { ... };

// 4. Main component
const MainComponent = () => {
  // State
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => { ... }, []);

  // Render
  return ( ... );
};

// 5. Export
export default MainComponent;
```

### Import Order
1. React imports
2. Third-party libraries (styled-components, framer-motion)
3. Router utilities (useNavigate, useLocation)
4. Local components
5. Shared styles
6. Data files

### Common Patterns

**Container/Content Pattern**:
```javascript
<Container>
  <Left>Sidebar content</Left>
  <Right>
    <ContentContainer>
      Main content
    </ContentContainer>
  </Right>
</Container>
```

**Side-by-Side Content**:
```javascript
<SideBySideSection
  title="ACT I"
  text="Descriptive text..."
  image="/path/to/image.png"
  gif="/path/to/animation.gif"
/>
```

**Custom Scroll Implementation**:
- Archive.jsx implements wheel-to-horizontal scroll
- Converts vertical wheel events to horizontal scroll
- Uses `requestAnimationFrame` for smooth easing
- Pattern: `targetScroll += e.deltaY * 1.5`

---

## Common Tasks & Commands

### Adding a New Project

1. **Add project data** to `/src/data/projectname.jsx`:
```javascript
{
  id: 7,
  title: "Project Name",
  description: "Brief description",
  image: "/assets/PROJECT_CODE/hero.png"
}
```

2. **Create assets folder**: `/public/assets/PROJECT_CODE/`

3. **Create component**: `/src/components/Projectfiles/ProjectName.jsx`
   - Follow existing project structure (Grove.jsx as template)
   - Use components from `sharedStyles.js`
   - Include: HeroSection, MetadataPanel, Act sections, NextProject

4. **Add route** in `/src/App.jsx`:
```javascript
<Route path="/projects/ProjectName" element={<ProjectName />} />
```

### Modifying Styles

**Global styles**: Edit `/src/App.css` (minimal changes recommended)

**Component styles**: Edit styled-components in component files or `sharedStyles.js`

**Custom fonts**: Add to `/src/assets/fonts/` and update `fonts.css`

### Working with Animations

**Page transitions** (App.jsx):
```javascript
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    ...
  </Routes>
</AnimatePresence>
```

**Scroll animations** (use in any component):
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

**Custom cursor modifications**: Edit `/src/Cursor.jsx`

**Line animations**: Modify `/src/components/Line.jsx` variants

### Adding Assets

1. Place in appropriate folder: `/public/assets/{PROJECT_CODE}/`
2. Reference in component: `src="/assets/PROJECT_CODE/filename.ext"`
3. Supported formats: `.png`, `.jpg`, `.gif`
4. **Note**: `.MOV` files are gitignored (see `.gitignore:40-41`)

### Modifying Navigation

**Navbar links**: Edit `/src/components/Navbar.jsx`

**Routing**: Update `/src/App.jsx` routes

**Project navigation**: Modify `/src/components/NextProject.jsx`

---

## Important Notes & Gotchas

### Assets & Media

1. **Large video files** (`.MOV`) are gitignored
   - Add them manually after cloning
   - Or convert to web-friendly formats (`.mp4`, `.webm`)

2. **Asset paths** use absolute paths from `/public`:
   ```javascript
   // Correct
   <img src="/assets/GROVE/hero.png" />

   // Incorrect
   <img src="assets/GROVE/hero.png" />
   <img src="../public/assets/GROVE/hero.png" />
   ```

3. **Image optimization**: Images are not currently optimized
   - Consider adding image compression for production

### Styling Gotchas

1. **Custom cursor disabled globally** in `index.html`:
   ```css
   body { cursor: none; }
   ```
   This is intentional for the custom Cursor component

2. **Styled-components dynamic props**:
   ```javascript
   // Access props with arrow function
   const Div = styled.div`
     opacity: ${props => props.isVisible ? 1 : 0};
   `;
   ```

3. **Motion components with styled-components**:
   ```javascript
   // Correct way to combine
   const AnimatedDiv = styled(motion.div)`
     /* styles */
   `;
   ```

### Performance Considerations

1. **Three.js shader** in ShaderVisual runs continuously
   - May impact performance on low-end devices
   - Consider adding performance detection/fallback

2. **Framer Motion animations** can be expensive
   - Use `viewport={{ once: true }}` if animation should only play once
   - Current setting: `once: false` (re-animates on scroll)

3. **Archive horizontal scroll** uses `requestAnimationFrame`
   - Performance optimized but watch for scroll jank

### Browser Compatibility

1. **Backdrop-filter** requires prefixes:
   ```css
   backdrop-filter: blur(10px);
   -webkit-backdrop-filter: blur(10px);
   ```

2. **CSS Grid** support is excellent (modern browsers)

3. **WebGL** (Three.js) requires hardware acceleration
   - May not work on some mobile devices

### Git & Deployment

1. **Branch naming**: Must start with `claude/` for CI/CD
2. **Deploy command**: Only run `yarn deploy` from main branch
3. **Homepage URL**: Set in `package.json:2`
4. **Build artifacts**: `/dist` and `/node_modules` are gitignored

### Development

1. **Port 3000**: Ensure it's not in use before `yarn dev`
2. **Hot reload**: Sometimes requires manual refresh for CSS changes
3. **Font loading**: Custom fonts may flash on first load (FOUT)

### Code Organization

1. **sharedStyles.js**: Centralized styled-components library
   - Use these before creating new styled-components
   - Ensures design consistency

2. **Project data**: Only source of truth is `/src/data/projectname.jsx`
   - Update here when adding/removing projects

3. **No TypeScript**: Pure JavaScript project
   - Be cautious with prop types and data structures

---

## File Location Reference

### Quick Reference for Common Files

**Configuration**:
- Vite config: `/vite.config.js`
- Package config: `/package.json`
- Git ignore: `/.gitignore`

**Entry Points**:
- HTML: `/index.html`
- JavaScript: `/src/main.jsx`
- App root: `/src/App.jsx`

**Routing**:
- Route definitions: `/src/App.jsx`
- Project data: `/src/data/projectname.jsx`

**Styling**:
- Global CSS: `/src/App.css`
- Font CSS: `/src/assets/fonts/fonts.css`
- Shared components: `/src/components/sharedStyles.js`

**Core Components**:
- Custom cursor: `/src/Cursor.jsx`
- Navigation: `/src/components/Navbar.jsx`
- 3D background: `/src/components/ShaderVisual.jsx`
- Animated lines: `/src/components/Line.jsx`

**Pages**:
- Landing: `/src/components/Hero.jsx`
- About: `/src/components/About.jsx`
- Projects: `/src/components/Projects.jsx`
- Archive: `/src/components/Archive.jsx`
- Contact: `/src/components/Contact.jsx`

**Project Details**:
- `/src/components/Projectfiles/Grove.jsx`
- `/src/components/Projectfiles/AP.jsx`
- `/src/components/Projectfiles/Collection.jsx`
- `/src/components/Projectfiles/Ark.jsx`
- `/src/components/Projectfiles/CapsuleMachine.jsx`
- `/src/components/Projectfiles/Lens.jsx`
- `/src/components/Projectfiles/Sticker.jsx`
- `/src/components/Projectfiles/Hoodie.jsx`

**Assets**:
- Custom fonts: `/src/assets/fonts/`
- Project media: `/public/assets/{PROJECT_CODE}/`

### Finding Things

**Need to modify...**:
- Navigation links → `/src/components/Navbar.jsx`
- Page transitions → `/src/App.jsx` (AnimatePresence)
- Custom cursor behavior → `/src/Cursor.jsx`
- Background shader → `/src/components/ShaderVisual.jsx`
- Project data → `/src/data/projectname.jsx`
- Shared UI components → `/src/components/sharedStyles.js`
- Typography → `/src/assets/fonts/fonts.css` or styled-components
- Color scheme → Update styled-components in individual files
- Routes → `/src/App.jsx`
- Landing page → `/src/components/Hero.jsx`
- Horizontal scroll → `/src/components/Archive.jsx`
- Project preview → `/src/components/Projects.jsx`

---

## Best Practices for AI Assistants

### When Making Changes

1. **Always read the file first** before editing
2. **Check related files** for context (imports, data files)
3. **Follow existing patterns** - consistency is key
4. **Test locally** with `yarn dev` after changes
5. **Check all routes** if modifying routing
6. **Verify asset paths** are absolute from `/public`

### When Adding Features

1. **Explore existing components** in `sharedStyles.js` first
2. **Follow the project pattern** for new project pages
3. **Use Framer Motion** for animations (already included)
4. **Use styled-components** for styling (no raw CSS)
5. **Consider performance** - test with animations on

### When Debugging

1. **Check browser console** for errors
2. **Verify asset paths** (common issue)
3. **Check route definitions** in App.jsx
4. **Inspect animation variants** in Line.jsx
5. **Test custom cursor** (may need hard refresh)
6. **Clear build cache** with `rm -rf dist && yarn build`

### Communication with Users

1. **Reference line numbers** when discussing code: `App.jsx:45`
2. **Explain animation patterns** clearly (Framer Motion syntax)
3. **Provide asset path guidance** (public vs src)
4. **Warn about performance impacts** (Three.js, animations)
5. **Suggest testing in browser** for visual changes

---

## Architecture Insights

### Design Philosophy
This portfolio prioritizes **visual storytelling** and **smooth user experience** over traditional web patterns. Key principles:

1. **Animation-First**: Every interaction should feel fluid
2. **Narrative Structure**: Projects follow Act I-II-III storytelling
3. **Creative Technical Skills**: Custom shaders, scroll implementations
4. **Minimalist Aesthetics**: Focus on content, not chrome
5. **Performance Balance**: Rich visuals that remain performant

### Technical Highlights

**Custom Implementations**:
- WebGL shader background (not a library component)
- Wheel-to-horizontal scroll (custom JavaScript)
- Lag-effect cursor (custom animation loop)
- Route-reactive line animations (complex Framer Motion)

**Modular Reusability**:
- `sharedStyles.js` provides consistent design system
- Project pages reuse common patterns
- Styled-components enable props-based variations

**State Management Philosophy**:
- No Redux/MobX needed - simple data flow
- Local state with hooks is sufficient
- Props drilling is minimal and manageable

### Scalability Notes

**Current Scale**: 6 projects, 11 routes, ~2,600 LOC
**Can easily scale to**: 15-20 projects without refactoring

**If scaling beyond that, consider**:
- Context API for global state
- Code splitting per route
- Image CDN for assets
- Lazy loading for project components

---

## Conclusion

This CLAUDE.md provides comprehensive guidance for understanding and working with Johnny Sheng's portfolio website. The codebase is well-organized, follows consistent patterns, and prioritizes creative visual experiences through modern React practices.

For questions or clarifications, refer to:
- Component files for implementation details
- `sharedStyles.js` for available UI components
- `projectname.jsx` for project data structure
- Existing project pages (especially `Grove.jsx`) as templates

**Remember**: This is a portfolio showcasing creative work - changes should enhance, not detract from, the visual storytelling and user experience.
