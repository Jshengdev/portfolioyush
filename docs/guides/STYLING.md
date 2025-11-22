---
title: Styling Guide
description: Complete guide to the design system including colors, typography, layout techniques, visual effects, and responsive breakpoints
keywords: styling, design system, styled-components, colors, typography, css, theme, glassmorphism, responsive
---

# Styling Guide

Complete reference for the portfolio's design system and styling approach.

## Quick Reference

| Aspect | Location | Description |
|--------|----------|-------------|
| Color Palette | Below, `src/theme.js` | RGBA values for all colors |
| Typography | Below, `index.html`, `src/assets/fonts/` | Font families and sizes |
| Theme System | `src/theme.js` | Centralized design tokens |
| Shared Components | `src/components/sharedStyles.js` | 18 reusable styled-components |
| Global Styles | `src/App.css` | Minimal global styles (cursor + reset) |
| Keyframe Animations | Various components | fadeUp, glow, softGlow, autoRun, shake |

---

## Styling Approach

### 100% Styled-Components

This project uses **styled-components** exclusively for all styling (CSS-in-JS).

**No traditional CSS files** except:
- `/src/App.css` (7 lines) - Only sets `cursor: none` + reset
- `/src/assets/fonts/fonts.css` (15 lines) - Font-face declarations

**Benefits**:
- Component-scoped styles (no global conflicts)
- Dynamic styling with props
- TypeScript-like autocomplete in editors
- Automatic critical CSS extraction

**Pattern**:
```javascript
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background: rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(10px);
`;
```

---

## Color Scheme

### Primary Colors

```javascript
// Main Text
rgba(255, 255, 255, 0.7)      // Semi-transparent white (primary text)
rgba(255, 255, 255, 0.5)      // Dimmer white (lines, decorative elements)

// Accents
rgba(136, 169, 215, 0.47)     // Blue accent (borders, glows, highlights)
rgba(255, 128, 128, 0.5)      // Red accent (problem boxes, warnings)
```

### Background Colors

```javascript
// Dark Backgrounds
rgba(20, 20, 20, 0.3)         // Main dark blur backgrounds
rgba(0, 0, 0, 0.16)           // Lighter blur overlays
rgba(255, 255, 255, 0.03)     // Very subtle white backgrounds
```

### Changing Colors

**Option 1: Update theme.js** (Recommended)
```javascript
// src/theme.js
export const theme = {
  colors: {
    primary: 'rgba(255, 255, 255, 0.7)',
    accent: 'rgba(136, 169, 215, 0.47)',  // Change this
    // ...
  }
};
```

**Option 2: Direct Component Change**
```javascript
// In any styled-component
const Title = styled.h1`
  color: rgba(136, 215, 169, 0.47);  // Green instead of blue
`;
```

**Color Picker Tool**: Use RGBA format with alpha channel for glass morphism effect

---

## Typography

### Font Families

**Headings (Custom Font)**:
- **Name**: 'Ade Display'
- **Location**: `/src/assets/fonts/`
- **Files**:
  - `AdeDisplay.otf` (37KB) - Desktop font
  - `AdeDisplay.woff` (904 bytes) - Web font
  - `AdeDisplay.woff2` (600 bytes) - Optimized web font
- **font-display**: `swap` (prevents FOUT - Flash of Unstyled Text)

**Body (Google Fonts)**:
- **Primary**: 'Work Sans' (sans-serif)
- **Fallbacks**: 'Playfair Display' (serif), 'Plus Jakarta Sans' (sans-serif)
- **Loaded in**: `index.html` (Google Fonts CDN)

### Font Loading

**Location**: `index.html`
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;600&family=Work+Sans:wght@300;400;600&display=swap" rel="stylesheet">
```

**Custom Font Declaration**: `src/assets/fonts/fonts.css`
```css
@font-face {
  font-family: 'Ade Display';
  src: url('./AdeDisplay.woff2') format('woff2'),
       url('./AdeDisplay.woff') format('woff'),
       url('./AdeDisplay.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;  /* Prevents FOUT */
}
```

### Letter Spacing

Extensive use of letter-spacing for aesthetic effect:

```javascript
// Navbar links
letter-spacing: 7px;

// Page titles
letter-spacing: 2px;

// Line.jsx "C" letters
letter-spacing: custom (negative for artistic effect)
```

### Adding a New Font

1. **Add font files** to `/src/assets/fonts/`
2. **Update fonts.css**:
```css
@font-face {
  font-family: 'New Font';
  src: url('./NewFont.woff2') format('woff2');
  font-display: swap;
}
```
3. **Update theme.js**:
```javascript
fonts: {
  heading: "'New Font', 'Ade Display', serif",
  // ...
}
```

---

## Layout Techniques

### 1. CSS Grid (Complex Layouts)

**Projects Page** (src/components/Projects.jsx):
```javascript
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  // List on left, Preview on right
  gap: 2rem;
`;
```

**Archive Page** (src/components/Archive.jsx):
```javascript
const Layout = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;  // Controls + Gallery
`;
```

**Project Details**:
```javascript
const Content = styled.div`
  display: grid;
  grid-template-columns: 10% 92%;  // Margin + Content
`;
```

### 2. Flexbox (Simple Alignments)

**Navbar** (Vertical):
```javascript
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
```

**Hero, About, Contact** (Centered):
```javascript
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
```

### 3. Fixed Positioning (Persistent Elements)

**Elements that stay in place**:
- `Container` - 30px border frame around entire site
- `Navbar` - Left sidebar navigation
- `ShaderVisual` - WebGL background (z-index: -1)
- `Container2` - Fixed page titles

```javascript
const Frame = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
  border: 2.5px solid rgba(136, 169, 215, 0.47);
`;
```

### 4. Absolute Positioning (Overlays)

**Decorative elements**:
- `Line.jsx` components (route-reactive animations)
- `Cursor.jsx` (custom cursor)

```javascript
const Line = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
`;
```

---

## Visual Effects

### Glass Morphism (Backdrop Blur)

**Pattern** (used throughout):
```javascript
const Card = styled.div`
  background: rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);  /* Safari support */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
```

**Browser Support**:
- ✅ Chrome, Firefox, Safari (with `-webkit-` prefix)
- ❌ IE11 (no fallback)

### Glow Effects

**Soft glow** (Projects.jsx):
```javascript
box-shadow:
  0 0 30px rgba(255, 255, 255, 0.1),
  0 0 20px rgba(136, 169, 215, 0.2);
```

**Animated glow** (keyframe):
```css
@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
  50% { text-shadow: 0 0 30px rgba(136, 169, 215, 0.8); }
}
```

### Blend Modes

**Cursor** (inverts colors underneath):
```javascript
const Cursor = styled.div`
  mix-blend-mode: difference;  /* Inverts colors */
`;
```

**Decorative text**:
```javascript
const Text = styled.span`
  mix-blend-mode: exclusion;  /* Creative blend effect */
`;
```

### Hover Transforms

**Subtle scale**:
```javascript
const Card = styled.div`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);  /* Gentle zoom */
  }
`;
```

**3D perspective**:
```javascript
const PreviewImage = styled.img`
  transform: rotateY(-2deg);  /* Slight 3D tilt */
  transition: transform 0.3s ease;

  &:hover {
    transform: rotateY(0deg);
  }
`;
```

---

## Responsive Breakpoints

### Breakpoints

```javascript
// Tablet
@media (max-width: 768px) {
  /* Styles for screens ≤ 768px */
}

// Mobile
@media (max-width: 480px) {
  /* Styles for screens ≤ 480px */
}
```

### Current Coverage

**Has responsive styles**:
- ✅ Most project detail pages
- ✅ Navbar (collapses on mobile)
- ✅ Hero page

**Needs responsive work**:
- ⚠️ Archive.jsx (horizontal scroll may break)
- ⚠️ Fixed positioning elements (may need adjustment)
- ⚠️ ShaderVisual (may be too heavy for mobile)

### Adding Responsive Styles

**Example**:
```javascript
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Desktop: 2 columns */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;  /* Tablet: 1 column */
  }

  @media (max-width: 480px) {
    padding: 1rem;  /* Mobile: Less padding */
  }
`;
```

---

## Theme System

### Location

`src/theme.js` - Centralized design tokens

### Structure

```javascript
export const theme = {
  colors: {
    primary: 'rgba(255, 255, 255, 0.7)',
    accent: 'rgba(136, 169, 215, 0.47)',
    // ... more colors
  },
  fonts: {
    heading: "'Ade Display', 'Playfair Display', serif",
    body: "'Work Sans', sans-serif",
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};
```

### Using Theme

**In App.jsx**:
```javascript
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* components */}
    </ThemeProvider>
  );
}
```

**In Components**:
```javascript
const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.heading};
  transition: ${props => props.theme.transitions.medium};
`;
```

---

## Shared Components Library

### Location

`src/components/sharedStyles.js` - 18 reusable styled-components

### Available Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `Container2` | Fixed title containers | Project page headers |
| `Title` | Consistent heading styles | All page titles |
| `Bold` | Emphasized text | Section headings |
| `SideBySideWrapper` | Text + Image layout | Act I, II, III sections |
| `TextColumn` | Text content column | Left side of side-by-side |
| `ImageColumn` | Image content column | Right side of side-by-side |
| `ProblemSolutionWrapper` | Problem/Solution layout | Project challenges |
| `ProblemBox` | Problem statement card | Red accent boxes |
| `SolutionBox` | Solution statement card | Blue accent boxes |
| `ChapterCard` | Reflection sections | Epilogue, learnings |
| `OverviewBox` | Project summary card | Project overview |
| `GifContainer` | Media container | GIFs and videos |
| `MetadataPanel` | Project metadata grid | Role, timeline, skills |
| `MetadataSection` | Metadata item | Individual metadata row |
| `MetadataLabel` | Metadata key | "Role:", "Timeline:" |
| `MetadataValue` | Metadata value | Actual data |

### Example Usage

```javascript
import {
  Container2,
  Title,
  SideBySideWrapper,
  TextColumn,
  ImageColumn
} from './sharedStyles';

function ProjectPage() {
  return (
    <>
      <Container2>
        <Title>Project Title</Title>
      </Container2>

      <SideBySideWrapper>
        <TextColumn>
          <h2>ACT I</h2>
          <p>Description...</p>
        </TextColumn>
        <ImageColumn>
          <img src="/assets/project/image.png" alt="Screenshot" />
        </ImageColumn>
      </SideBySideWrapper>
    </>
  );
}
```

---

## CSS Custom Properties Issue

### Problem

`sharedStyles.js` references CSS variables that are **NOT defined**:

```javascript
// Referenced but undefined:
color: var(--paragraph-color);
font-family: var(--font-heading);
font-family: var(--font-body);
```

### Current Behavior

Falls back to inline styles in components (works but inconsistent)

### Solution Options

**Option 1: Define in App.css** (Recommended)
```css
/* Add to src/App.css */
:root {
  --font-heading: 'Ade Display', 'Playfair Display', serif;
  --font-body: 'Work Sans', sans-serif;
  --paragraph-color: rgba(255, 255, 255, 0.7);
}
```

**Option 2: Remove references**
Remove `var()` calls and use direct values in `sharedStyles.js`

---

## Keyframe Animations

### fadeUp (sharedStyles.js)

Used for scroll-triggered animations:

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage**: Applied to project page sections

### glow (Projects.jsx)

Pulsing text shadow:

```css
@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
  50% { text-shadow: 0 0 30px rgba(136, 169, 215, 0.8); }
}
```

**Usage**: Project title hover effect

### softGlow (Projects.jsx)

Pulsing box shadow:

```css
@keyframes softGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(136, 169, 215, 0.4); }
}
```

**Usage**: Preview image container

### autoRun (AppSlider.jsx)

Infinite horizontal scroll:

```css
@keyframes autoRun {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}
/* Duration: 12s linear infinite */
```

**Usage**: Text carousel on Hero page

### shake (Archive.jsx)

Vertical bounce:

```css
@keyframes shake {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
/* Duration: 2s ease-in-out infinite */
```

**Usage**: Archive gallery hover effect

---

## Performance Optimizations

### will-change Property

Applied to animated elements for better performance:

```javascript
const AnimatedElement = styled(motion.div)`
  will-change: transform;  /* Hints browser to optimize */
`;
```

**Use sparingly**: Only on elements that animate frequently

### Font Loading Optimization

```css
@font-face {
  font-family: 'Ade Display';
  src: url('./AdeDisplay.woff2') format('woff2');
  font-display: swap;  /* Prevents FOUT */
}
```

**font-display: swap** shows fallback font while custom font loads

### Lazy Loading Images

**Not currently implemented** but recommended:

```javascript
<img src="/assets/image.png" loading="lazy" alt="Description" />
```

**Benefits**: Defers offscreen images, faster initial load

---

## Common Styling Tasks

### Change Accent Color

**File**: `src/theme.js`
```javascript
colors: {
  accent: 'rgba(200, 100, 255, 0.47)',  // Purple instead of blue
}
```

**Rebuild**: Save file → HMR auto-refreshes

### Adjust Border Frame

**File**: `src/App.jsx` (around line 20-40)
```javascript
const Frame = styled.div`
  border: 2.5px solid rgba(136, 169, 215, 0.47);  // Change width or color
`;
```

### Modify Blur Amount

**Pattern** (various components):
```javascript
backdrop-filter: blur(15px);  // Increase from 10px
-webkit-backdrop-filter: blur(15px);
```

**Higher values** = more blur (heavier performance cost)

### Change Navbar Letter Spacing

**File**: `src/components/Navbar.jsx`
```javascript
const NavLink = styled.button`
  letter-spacing: 5px;  // Change from 7px
`;
```

---

## Troubleshooting

### Styles Not Applying

1. **Check import**: Verify `import styled from 'styled-components'`
2. **Check ThemeProvider**: Ensure `<ThemeProvider>` wraps app in `App.jsx`
3. **Check syntax**: Styled-components use backticks, not quotes

### Blur Effect Not Working (Safari)

Add `-webkit-` prefix:
```javascript
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);  /* Required for Safari */
```

### Font Not Loading

1. **Check path**: Verify `./AdeDisplay.woff2` exists
2. **Check network tab**: Ensure font file loads (not 404)
3. **Check CORS**: Font files must be same-origin

### HMR Not Refreshing Styles

Styled-components sometimes needs manual refresh:
1. Stop dev server (Ctrl+C)
2. Clear cache: `rm -rf node_modules/.vite`
3. Restart: `yarn dev`

---

## See Also

- [Animations Guide](ANIMATIONS.md) - Framer Motion and keyframe details
- [Components Reference](../reference/COMPONENTS.md) - Component-specific styling
- [Theme System (theme.js)](../../src/theme.js) - Design tokens source code
- [Shared Components (sharedStyles.js)](../../src/components/sharedStyles.js) - Reusable styled-components

---

**For AI Assistants**: This document contains all color values, typography settings, layout patterns, and visual effect code for the portfolio website. Use RGBA format for colors, styled-components syntax for styles, and reference theme.js for centralized tokens.
