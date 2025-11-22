---
title: File Locations Reference
description: Complete directory of all files in the portfolio codebase with paths, purposes, and quick search
keywords: files, directory, location, paths, structure, organization, find, search
---

# File Locations Reference

Complete directory of all files with absolute paths and purposes. Use Ctrl+F / Cmd+F to search.

## Quick Search Keywords

**Looking for...**
- **Components** → Section: Components
- **Styles** → Section: Styling Files
- **Images** → Section: Assets
- **Project data** → `/src/data/projectname.jsx`
- **Routes** → `/src/App.jsx`
- **Theme** → `/src/theme.js`
- **Fonts** → `/src/assets/fonts/`
- **Config** → Section: Configuration Files

---

## File Type Index

| File Type | Location | Count | Purpose |
|-----------|----------|-------|---------|
| React Components | `/src/components/` | 16 files | UI components |
| Project Components | `/src/components/Projectfiles/` | 6 files | Project detail pages |
| Data Files | `/src/data/` | 2 files | Project metadata |
| Styling | `/src/components/sharedStyles.js`, `/src/theme.js` | 2 files | Shared styles, design tokens |
| Assets (Images) | `/public/assets/` | 443MB | Media files |
| Fonts | `/src/assets/fonts/` | 4 files | Custom fonts |
| Configuration | Root directory | 6 files | Vite, package, git configs |
| Documentation | `/docs/`, root | 12+ files | Guides and references |
| Build Output | `/dist/` | Generated | Production build (gitignored) |

---

## Configuration Files

| File | Path | Purpose | Lines |
|------|------|---------|-------|
| Vite Config | `/vite.config.js` | Build tool configuration | 12 |
| Package Config | `/package.json` | Dependencies and scripts | ~50 |
| Git Ignore | `/.gitignore` | Excluded files | 43 |
| Git Attributes | `/.gitattributes` | Git settings | - |
| Yarn Lock | `/yarn.lock` | Dependency lock file | ~7000 |
| Claude Config | `/.claude/settings.local.json` | Claude Code settings | - |

**Key Settings**:
- Dev server port: 3000 (`vite.config.js:7`)
- Build output: `/dist` (`vite.config.js:10`)
- Homepage: `https://jshengdev.github.io/portfolioyush` (`package.json`)

---

## Entry Points

| File | Path | Purpose | Lines |
|------|------|---------|-------|
| HTML Entry | `/index.html` | Main HTML file | ~40 |
| JavaScript Entry | `/src/main.jsx` | React root entry | 12 |
| App Root | `/src/App.jsx` | Main app component with routing | 175 |
| Global CSS | `/src/App.css` | Minimal global styles (cursor + reset) | 7 |

---

## Core Components

| Component | Path | Purpose | Lines | State |
|-----------|------|---------|-------|-------|
| App | `/src/App.jsx` | Root component, routing | 175 | None |
| Cursor | `/src/Cursor.jsx` | Custom animated cursor | 113 | dotX, dotY, ringX, ringY, isClicking |
| Navbar | `/src/components/Navbar.jsx` | Left sidebar navigation | 75 | None |
| Line | `/src/components/Line.jsx` | Route-reactive line animations | 184 | 6 animation states |
| ShaderVisual | `/src/components/ShaderVisual.jsx` | Three.js WebGL background | 221 | None |

---

## Page Components

| Page | Path | Purpose | Lines | State |
|------|------|---------|-------|-------|
| Hero | `/src/components/Hero.jsx` | Landing page | 114 | None |
| About | `/src/components/About.jsx` | Personal bio | 105 | None |
| Projects | `/src/components/Projects.jsx` | Project gallery | 327 | selectedProject, imageError |
| Archive | `/src/components/Archive.jsx` | Horizontal scroll gallery | 330 | None |
| Contact | `/src/components/Contact.jsx` | Contact info | 122 | None |

---

## Widget Components

| Component | Path | Purpose | Lines |
|-----------|------|---------|-------|
| AppSlider | `/src/components/AppSlider.jsx` | Animated text carousel | 103 |
| NextProject | `/src/components/NextProject.jsx` | Project navigation widget | 181 |

---

## Project Detail Components

| Project | Path | Purpose | Size | Assets Size |
|---------|------|---------|------|-------------|
| Grove | `/src/components/Projectfiles/Grove.jsx` | AI-Powered Project Matching | 13,872 bytes | 11MB |
| Capsule Machine | `/src/components/Projectfiles/CapsuleMachine.jsx` | Interactive Installation | 18,799 bytes | 278MB |
| The Collection | `/src/components/Projectfiles/Collection.jsx` | Film Portfolio | 13,389 bytes | 65MB |
| Ark | `/src/components/Projectfiles/Ark.jsx` | Skincare Wearable | 12,015 bytes | 3.2MB |
| Alaina Pamela | `/src/components/Projectfiles/AP.jsx` | Film Internship | 11,053 bytes | 54MB |
| Lens | `/src/components/Projectfiles/Lens.jsx` | Photo Project | 5,112 bytes | - |

**All use**: Components from `sharedStyles.js`, `motion` from `framer-motion`

---

## Styling Files

| File | Path | Purpose | Lines/Size |
|------|------|---------|------------|
| Theme System | `/src/theme.js` | Centralized design tokens | ~100 lines |
| Shared Styles | `/src/components/sharedStyles.js` | 18 reusable styled-components | 265 lines |
| Global CSS | `/src/App.css` | Minimal global styles | 7 lines |
| Font CSS | `/src/assets/fonts/fonts.css` | Font-face declarations | 15 lines |

---

## Data Files

| File | Path | Purpose | Data |
|------|------|---------|------|
| Project Data | `/src/data/projectname.jsx` | 6 project metadata entries | 40 lines |
| Archive Data | `/src/data/archive.js` | 17 archive project entries | ~50 lines |

**Data Structure** (projectname.jsx):
```javascript
{
  id: number,
  title: string,
  description: string,
  image: string (path)
}
```

---

## Assets (Media Files)

### Asset Directory Structure

```
/public/assets/
├── AP/              (54MB)    - 6 files (3 GIFs, 3 PNGs)
├── ARK/             (3.2MB)   - 11 PNGs
├── C/               (65MB)    - 44 images (JPGs)
├── CM/              (278MB)   - 31 PNGs + gif/ subdirectory
├── GROVE/           (11MB)    - 16 files (4 GIFs, 12 PNGs)
├── WD/              (1.9MB)   - 1 PNG
├── archive/         (27MB)    - 17 PNGs
├── background.jpg
├── Grovefrontpage.png
├── microw.png       (597KB - optimized from 5.7MB)
└── Subject 2.png    (833KB - optimized from 7.7MB)
```

**Total Size**: ~443MB

**Optimized Images**:
- `Subject 2.png`: 7.7MB → 833KB (-89%)
- `Subject 2.webp`: 115KB (WebP version)
- `microw.png`: 5.7MB → 597KB (-90%)
- `microw.webp`: 103KB (WebP version)

**Asset Paths in Code**:
```javascript
// Correct pattern (served from /public/assets/)
<img src="/assets/GROVE/hero.png" />

// Incorrect (don't use)
<img src="/public/assets/GROVE/hero.png" />
```

---

## Font Files

| File | Path | Size | Format |
|------|------|------|--------|
| Ade Display OTF | `/src/assets/fonts/AdeDisplay.otf` | 37KB | OpenType |
| Ade Display WOFF | `/src/assets/fonts/AdeDisplay.woff` | 904 bytes | Web Font |
| Ade Display WOFF2 | `/src/assets/fonts/AdeDisplay.woff2` | 600 bytes | Web Font (optimized) |
| Font CSS | `/src/assets/fonts/fonts.css` | 15 lines | Font-face declarations |

**Loaded Fonts**:
- **Custom**: Ade Display (local files)
- **Google Fonts**: Work Sans, Playfair Display, Plus Jakarta Sans (CDN)

---

## Shader Files

| File | Path | Size | Purpose |
|------|------|------|---------|
| Vertex Shader | `/src/shaders/truchet.vert.glsl` | 85 bytes | GLSL vertex shader |
| Fragment Shader | `/src/shaders/truchet.frag.glsl` | 3.7KB | GLSL fragment shader |

**Imported in**: `ShaderVisual.jsx` with `?raw` suffix

---

## Documentation Files

| File | Path | Lines | Purpose |
|------|------|-------|---------|
| Main Guide | `/CLAUDE.md` | 2,495 | Comprehensive AI assistant guide |
| Project README | `/README.md` | 652 | Main project documentation |
| Architecture Docs | `/ARCHITECTURE.md` | 495 | System architecture |
| Optimization Log | `/WAVE_VERIFICATION.md` | ~800 | Optimization tracking |
| Docs Hub | `/docs/README.md` | ~200 | Documentation navigation |

**Guides**:
- `/docs/guides/QUICK_START.md`
- `/docs/guides/ADDING_PROJECTS.md`
- `/docs/guides/STYLING.md`
- `/docs/guides/ANIMATIONS.md`
- `/docs/guides/DEPLOYMENT.md`
- `/docs/guides/TROUBLESHOOTING.md`

**References**:
- `/docs/reference/FILE_LOCATIONS.md` (this file)
- `/docs/reference/COMPONENTS.md`
- `/docs/reference/DEPENDENCIES.md`
- `/docs/reference/ASSETS.md`
- `/docs/reference/CONVENTIONS.md`
- `/docs/reference/KNOWN_ISSUES.md`

**Architecture**:
- `/docs/architecture/OVERVIEW.md`
- `/docs/architecture/DATA_FLOW.md`
- `/docs/architecture/ROUTING.md`
- `/docs/architecture/STATE_MANAGEMENT.md`

---

## Build Output

### /dist/ Directory (Generated by `yarn build`)

```
dist/
├── index.html                     (2.75 kB)
├── assets/
│   ├── AdeDisplay-[hash].otf      (37.32 kB)
│   ├── index-[hash].css           (2.29 kB, gzip: 1.62 kB)
│   ├── index-[hash].js            (797.34 kB, gzip: 227.32 kB)
│   ├── [component]-[hash].js      (15 lazy-loaded chunks)
│   └── [images]                   (copied from /public/assets/)
```

**Lazy-loaded chunks** (15 total):
- `About-[hash].js` (1.74 kB)
- `Hero-[hash].js` (2.94 kB)
- `Contact-[hash].js` (1.68 kB)
- `Projects-[hash].js` (5.58 kB)
- `Archive-[hash].js` (4.94 kB)
- `Grove-[hash].js` (10.75 kB)
- `CapsuleMachine-[hash].js` (14.36 kB)
- `Collection-[hash].js` (9.29 kB)
- `Ark-[hash].js` (8.84 kB)
- `AP-[hash].js` (7.69 kB)
- `Lens-[hash].js` (121.81 kB)
- `NextProject-[hash].js` (2.45 kB)
- `sharedStyles-[hash].js` (5.29 kB)
- `projectname-[hash].js` (0.60 kB)

**Total Bundle Size**: 797KB (227KB gzip) - 20% reduction from optimization

---

## Gitignored Files/Directories

**Not in version control**:
- `/dist/` - Build output
- `/node_modules/` - Dependencies
- `/.vite/` - Vite cache
- `.DS_Store` - macOS files
- `assets/CM/*.mov` - Large video files
- `assets/CM/*.MOV` - Large video files

**Should be ignored** (currently missing from .gitignore):
- `vite.config.js.timestamp-*` (2 files exist)
- `/.claude/` (Claude Code settings)

---

## Finding Specific Files

### "I need to modify..."

| Task | File to Edit |
|------|--------------|
| Navigation links | `/src/components/Navbar.jsx` |
| Landing page content | `/src/components/Hero.jsx` |
| Project metadata | `/src/data/projectname.jsx` |
| Archive projects | `/src/data/archive.js` |
| Routes | `/src/App.jsx` (lines 72-151) |
| Color scheme | `/src/theme.js` |
| Page transitions | `/src/App.jsx` (line 70, AnimatePresence) |
| Custom cursor | `/src/Cursor.jsx` |
| WebGL shader | `/src/components/ShaderVisual.jsx` or `/src/shaders/*.glsl` |
| Shared UI components | `/src/components/sharedStyles.js` |
| Build config | `/vite.config.js` |
| Dependencies | `/package.json` |
| Deployment script | `/package.json` (line 12) |

### "Where is the code for..."

| Feature | Location |
|---------|----------|
| Horizontal scroll gallery | `/src/components/Archive.jsx` (lines 80-150) |
| Project hover preview | `/src/components/Projects.jsx` (lines 100-200) |
| Route-reactive line animations | `/src/components/Line.jsx` |
| Cursor lag effect | `/src/Cursor.jsx` (lines 30-100) |
| Text carousel | `/src/components/AppSlider.jsx` |
| Project navigation widget | `/src/components/NextProject.jsx` |
| Page layout structure | `/src/App.jsx` (Container → Frame → components) |
| Font loading | `/src/assets/fonts/fonts.css` |
| Glass morphism effects | `/src/components/sharedStyles.js` (backdrop-filter) |

---

## Absolute Paths Quick Reference

**Project Root**: `/Users/johnnysheng/Documents/GitHub/portfolioyush/`

**Key Absolute Paths**:
```
/Users/johnnysheng/Documents/GitHub/portfolioyush/src/App.jsx
/Users/johnnysheng/Documents/GitHub/portfolioyush/src/components/Navbar.jsx
/Users/johnnysheng/Documents/GitHub/portfolioyush/src/data/projectname.jsx
/Users/johnnysheng/Documents/GitHub/portfolioyush/public/assets/
/Users/johnnysheng/Documents/GitHub/portfolioyush/vite.config.js
/Users/johnnysheng/Documents/GitHub/portfolioyush/package.json
```

**Note**: Use relative paths in code, absolute paths in documentation

---

## File Count Summary

| Category | Count |
|----------|-------|
| Total React Components | 16 |
| Page Components | 5 |
| Project Detail Components | 6 |
| Widget Components | 2 |
| Core Components | 5 |
| Data Files | 2 |
| Styling Files | 4 |
| Config Files | 6 |
| Documentation Files | 12+ |
| Asset Directories | 8 |
| Shader Files | 2 |

**Total Lines of Code**: 4,676 (down from 5,272 = -11.3% reduction)

---

## See Also

- [Components Reference](COMPONENTS.md) - Detailed component documentation
- [Assets Reference](ASSETS.md) - Asset organization and optimization
- [Quick Start Guide](../guides/QUICK_START.md) - File structure walkthrough
- [Architecture Overview](../architecture/OVERVIEW.md) - System architecture

---

**For AI Assistants**: Use Ctrl+F to search this document for file locations. All paths are relative to project root unless specified as absolute. React components are in `/src/components/`, assets in `/public/assets/`, configuration at root level.
