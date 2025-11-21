# Architecture Documentation

**Project**: Johnny Sheng's Portfolio
**Last Updated**: 2025-11-21
**Purpose**: Technical documentation for developers and AI agents working on this codebase

---

## Table of Contents

1. [Component Hierarchy](#component-hierarchy)
2. [Data Flow](#data-flow)
3. [Styling Architecture](#styling-architecture)
4. [Key Patterns](#key-patterns)
5. [For AI Agents](#for-ai-agents)

---

## Component Hierarchy

The application follows a hierarchical component structure with clear separation between layout, navigation, and content components.

### Component Tree

```
App (Root)
├── Router (React Router v7)
│   └── ThemeProvider (Styled-Components)
│       ├── Cursor (Global custom cursor)
│       └── Container (Fixed border frame)
│           └── Frame (Inner border)
│               ├── ShaderVisual (WebGL background - Three.js)
│               ├── Left (Sidebar container)
│               │   └── Navbar (Navigation links)
│               ├── Line (Route-reactive decorative animations)
│               └── AnimatedRoutes (AnimatePresence wrapper)
│                   ├── Route: / → Hero
│                   │   └── AppSlider (Animated text carousel)
│                   ├── Route: /about → About
│                   ├── Route: /projects → Projects
│                   │   └── NextProject (Navigation widget)
│                   ├── Route: /archive → Archive
│                   ├── Route: /contact → Contact
│                   └── Project Detail Routes (/projects/*)
│                       ├── /projects/Grove → Grove
│                       ├── /projects/CapsuleMachine → CapsuleMachine
│                       ├── /projects/Lens → Lens
│                       ├── /projects/TheCollection → Collection
│                       ├── /projects/Ark → Ark
│                       └── /projects/AlainaPamela → AP
│                       (All project pages use NextProject widget)
```

### Route Summary (11 total routes)

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Hero | Landing page |
| `/about` | About | Personal bio |
| `/projects` | Projects | Project gallery listing |
| `/archive` | Archive | Horizontal scrolling archive gallery |
| `/contact` | Contact | Contact information |
| `/projects/Grove` | Grove | AI matching platform project |
| `/projects/CapsuleMachine` | CapsuleMachine | Interactive installation project |
| `/projects/Lens` | Lens | Lens project details |
| `/projects/TheCollection` | Collection | Film portfolio project |
| `/projects/Ark` | Ark | Skincare wearable project |
| `/projects/AlainaPamela` | AP | Film internship project |

### Component Organization

```
src/
├── App.jsx                    # Root application with routing
├── Cursor.jsx                 # Custom cursor with lag effect
├── main.jsx                   # React root entry
├── theme.js                   # Theme configuration
├── components/
│   ├── About.jsx             # About page
│   ├── Archive.jsx           # Archive gallery page
│   ├── AppSlider.jsx         # Animated text carousel
│   ├── Contact.jsx           # Contact page
│   ├── Hero.jsx              # Landing page
│   ├── Line.jsx              # Route-reactive decorative lines
│   ├── Navbar.jsx            # Left sidebar navigation
│   ├── NextProject.jsx       # Project navigation widget
│   ├── Projects.jsx          # Project gallery listing
│   ├── ShaderVisual.jsx      # Three.js WebGL background
│   ├── sharedStyles.js       # Centralized styled-components
│   └── Projectfiles/
│       ├── AP.jsx            # Alaina Pamela project
│       ├── Ark.jsx           # Ark project
│       ├── CapsuleMachine.jsx # Capsule Machine project
│       ├── Collection.jsx    # Collection project
│       ├── Grove.jsx         # Grove project
│       └── Lens.jsx          # Lens project
└── data/
    ├── projectname.jsx       # Project metadata (projectParty array)
    └── archive.js            # Archive gallery items
```

---

## Data Flow

The application uses a centralized data approach with clear separation between configuration, content data, and presentation.

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Configuration Layer                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────┐
        │         src/theme.js (Theme)           │
        │  • colors, fonts, spacing, breakpoints │
        └────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────┐
        │   App.jsx → ThemeProvider (context)    │
        └────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
          All Components        sharedStyles.js
          (via ${props => props.theme})


┌─────────────────────────────────────────────────────────────┐
│                      Content Data Layer                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────┐
        │   src/data/projectname.jsx             │
        │   • projectParty array (6 projects)    │
        │   • id, title, description, image      │
        └────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
            Projects.jsx         NextProject.jsx
          (displays list)      (navigation widget)
                              Used in all project pages

        ┌────────────────────────────────────────┐
        │   src/data/archive.js                  │
        │   • archiveItems array (17 items)      │
        │   • caption, image                     │
        └────────────────────────────────────────┘
                              ↓
                        Archive.jsx
                    (horizontal scroll)


┌─────────────────────────────────────────────────────────────┐
│                       Asset Layer                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────┐
        │   public/assets/                       │
        │   • GROVE/, AP/, ARK/, CM/, C/, WD/    │
        │   • archive/                           │
        │   • Background images, thumbnails      │
        └────────────────────────────────────────┘
                              ↓
              Referenced by data files
              and components via paths
              (e.g., "/assets/GROVE/...")
```

### Key Data Files

| File | Purpose | Used By |
|------|---------|---------|
| `src/theme.js` | Centralized theme configuration | All components via ThemeProvider |
| `src/data/projectname.jsx` | Project metadata array (projectParty) | Projects.jsx, NextProject.jsx, all project pages |
| `src/data/archive.js` | Archive gallery items array | Archive.jsx |
| `src/components/sharedStyles.js` | Reusable styled-components | All project detail pages |

---

## Styling Architecture

The project uses **100% Styled-Components** with a centralized theme system. No traditional CSS files except for font declarations and minimal global resets.

### Styling Flow

```
┌──────────────────────────────────────────────────────────────┐
│                        Theme System                           │
└──────────────────────────────────────────────────────────────┘
                              ↓
        src/theme.js (Single source of truth)
        ├── colors (text, background, accent)
        ├── fonts (primary, display)
        ├── spacing (frame, section, element)
        ├── breakpoints (mobile, tablet, desktop)
        └── transitions (standard, slow)

                              ↓
        ┌────────────────────────────────────────┐
        │   App.jsx → ThemeProvider              │
        │   Wraps entire application             │
        └────────────────────────────────────────┘

                              ↓
        ┌────────────────────────────────────────┐
        │   Shared Component Library             │
        │   src/components/sharedStyles.js       │
        │   • Container, Container2, Title       │
        │   • ChapterCard, OverviewBox           │
        │   • MetadataPanel, SideBySideWrapper   │
        │   • TextColumn, ImageColumn            │
        │   • ProblemBox, SolutionBox, etc.      │
        └────────────────────────────────────────┘

                              ↓
        ┌────────────────────────────────────────┐
        │   Individual Component Styles          │
        │   • Import from sharedStyles.js first  │
        │   • Create component-specific styles   │
        │   • Access theme via props.theme       │
        └────────────────────────────────────────┘

                              ↓
        ┌────────────────────────────────────────┐
        │   Page Components                      │
        │   • Compose shared components          │
        │   • Override with props when needed    │
        │   • Maintain consistent design system  │
        └────────────────────────────────────────┘
```

### Theme Access Pattern

**In styled-components:**
```javascript
const StyledComponent = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.primary};
  padding: ${props => props.theme.spacing.element};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;
```

**Common imports:**
```javascript
import styled from 'styled-components';
import { Container, Title, ChapterCard } from './sharedStyles';
```

### Color Scheme

| Category | Usage | Value |
|----------|-------|-------|
| `theme.colors.text.primary` | Main headings | `rgba(255, 255, 255, 0.9)` |
| `theme.colors.text.secondary` | Body text | `rgba(255, 255, 255, 0.7)` |
| `theme.colors.text.tertiary` | Muted text | `rgba(255, 255, 255, 0.6)` |
| `theme.colors.text.muted` | Decorative text | `rgba(255, 255, 255, 0.5)` |
| `theme.colors.background.primary` | Main background | `#000000` |
| `theme.colors.background.overlay` | Overlays | `rgba(0, 0, 0, 0.8)` |
| `theme.colors.accent.glow` | Hover effects | `rgba(255, 255, 255, 0.8)` |

---

## Key Patterns

Follow these 4 core patterns when working with this codebase:

### 1. Always Use Theme Variables

**❌ DON'T:**
```javascript
const Heading = styled.h1`
  color: rgba(255, 255, 255, 0.9);
  font-family: 'work sans', sans-serif;
`;
```

**✅ DO:**
```javascript
const Heading = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.primary};
`;
```

**Why**: Centralized theme ensures design consistency and makes global changes easier.

---

### 2. Import from sharedStyles First

**❌ DON'T:**
```javascript
// Creating duplicate styled-components
const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh;
`;
```

**✅ DO:**
```javascript
import { Container, Title, ChapterCard } from './sharedStyles';

// Use existing components
function ProjectPage() {
  return (
    <Container>
      <Title>Project Title</Title>
      <ChapterCard>
        {/* content */}
      </ChapterCard>
    </Container>
  );
}
```

**Why**: Reduces duplication, maintains consistency across project pages, and makes updates centralized.

---

### 3. Centralize Data in /src/data/

**❌ DON'T:**
```javascript
// Hardcoding data in components
const projects = [
  { title: "Grove", description: "AI-Powered...", image: "/assets/..." },
  // ... more projects
];
```

**✅ DO:**
```javascript
// src/data/projectname.jsx
export const projectParty = [
  { id: 1, title: "Grove", description: "...", image: "/assets/..." },
  // ...
];

// Component file
import { projectParty } from '../data/projectname';
```

**Why**: Single source of truth for content data, easier to update, supports future CMS integration.

---

### 4. Asset Paths Follow Convention

**❌ DON'T:**
```javascript
<img src="/public/assets/GROVE/image.png" />  // Wrong!
<img src="assets/GROVE/image.png" />           // Wrong!
```

**✅ DO:**
```javascript
<img src="/assets/GROVE/image.png" />  // Correct!
```

**Why**: Vite serves `/public/` directory as root. Assets in `/public/assets/` are accessed via `/assets/`.

**Asset Organization:**
```
public/assets/
├── GROVE/          # Grove project images
├── AP/             # Alaina Pamela project
├── ARK/            # Ark project
├── CM/             # Capsule Machine project
├── C/              # Collection project
├── WD/             # Website Dev project
├── archive/        # Archive gallery images
├── background.jpg  # Shared background
└── [other shared assets]
```

---

## For AI Agents

Guidelines for AI agents modifying this codebase.

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **React Components** | PascalCase | `Hero.jsx`, `AppSlider.jsx` |
| **Data files** | camelCase | `projectname.jsx`, `archive.js` |
| **Styled-components** | PascalCase | `const Container = styled.div` |
| **Variables/Functions** | camelCase | `projectParty`, `handleClick` |
| **Constants** | camelCase | `theme`, `archiveItems` |
| **CSS files** | kebab-case | `fonts.css` |

### File Organization Rules

**When adding a new project:**

1. **Add data** to `/src/data/projectname.jsx`:
   ```javascript
   { id: 7, title: "Project Name", description: "...", image: "/assets/..." }
   ```

2. **Create component** in `/src/components/Projectfiles/ProjectName.jsx`:
   - Use Grove.jsx or AP.jsx as template
   - Import shared components from `sharedStyles.js`
   - Follow Act I-II-III narrative structure

3. **Add route** in `/src/App.jsx`:
   ```javascript
   <Route path="/projects/ProjectName" element={
     <PageWrapper><ProjectName /></PageWrapper>
   } />
   ```

4. **Add assets** to `/public/assets/PROJECT_CODE/`

**When modifying styles:**

1. Check if component exists in `sharedStyles.js` first
2. If modifying global colors/spacing, update `theme.js`
3. Use theme variables via `${props => props.theme.*}`
4. Avoid hardcoded colors or spacing values

**When adding data:**

1. Use existing data files in `/src/data/`
2. If new data category, create new file in `/src/data/`
3. Export as named constant (e.g., `export const archiveItems = [...]`)
4. Document structure with JSDoc comments

### Common Pitfalls to Avoid

**❌ Creating unused components**: Before creating new components, check if similar exists in `sharedStyles.js`

**❌ Hardcoding routes**: Always use React Router's `useNavigate` hook, never `window.location`

**❌ Inline styles**: Use styled-components, not inline `style={{}}` props

**❌ Breaking animations**: Line.jsx has route-specific animations; new routes need variant definitions

**❌ Forgetting responsive**: Add mobile breakpoints for new components using `theme.breakpoints`

### Quick Reference Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Deploy to GitHub Pages
yarn deploy

# Find all imports of a component
grep -r "import.*ComponentName" src/

# Find all theme variable usages
grep -r "props.theme" src/

# List all routes
grep -A 2 "<Route path=" src/App.jsx
```

### Project-Specific Notes

1. **NextProject widget**: Used in all project detail pages for navigation, receives `currentProject` and `nextProject` props

2. **Route formatting**: Project routes use PascalCase without spaces (e.g., "The Collection" → `/projects/TheCollection`)

3. **Animation system**: Line.jsx has 6 animation states triggered by route changes via `useLocation`

4. **Custom cursor**: Disabled globally in App.css (`cursor: none`), replaced by Cursor.jsx component

5. **ShaderVisual**: Three.js WebGL background runs continuously; may need pause logic for performance

6. **PageWrapper**: All routes wrapped in `PageWrapper` component for consistent fade transitions

---

**Document Maintenance**: Update this file when adding new routes, data sources, or architectural changes.

**Questions?** Refer to CLAUDE.md for comprehensive codebase documentation.
