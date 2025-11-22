---
title: Quick Start Guide
description: Get up and running with the portfolio website in 5 minutes - installation, development server, making changes, and deployment
keywords: quickstart, installation, setup, getting started, development server, vite, yarn
---

# Quick Start Guide

Get the portfolio website running locally in 5 minutes or less.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Yarn** package manager - Install with `npm install -g yarn`
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Jshengdev/portfolioyush.git
cd portfolioyush
```

### 2. Install Dependencies

```bash
yarn install
```

This installs all required packages (React, Vite, Framer Motion, Three.js, etc.)

**Expected output**: ~6 production + 4 dev dependencies installed

## Running the Development Server

### 3. Start Dev Server

```bash
yarn dev
```

**Output**:
```
VITE v6.0.7  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 4. Open in Browser

Navigate to: **http://localhost:3000**

You should see:
- Landing page with animated title
- WebGL shader background (Truchet patterns)
- Custom cursor with lag effect
- Horizontal text slider (BATMANN, DESIGNER, FILMMAKER...)

**Hot Module Replacement (HMR)**: Changes to code will automatically refresh the browser

---

## Making Your First Change

### 5. Edit Landing Page Text

Open `src/components/Hero.jsx` in your editor:

```javascript
// Find line ~40
<StyledTitle>johnny sheng's portfolio</StyledTitle>

// Change to:
<StyledTitle>your name's portfolio</StyledTitle>
```

**Save the file** → Browser auto-refreshes → See your change instantly

### 6. Modify Color Scheme

Open `src/theme.js`:

```javascript
// Find the colors object
colors: {
  primary: 'rgba(255, 255, 255, 0.7)',  // Main text color
  accent: 'rgba(136, 169, 215, 0.47)',  // Blue accent
  // ...
}

// Change accent color to green:
accent: 'rgba(136, 215, 169, 0.47)',
```

**Save** → Browser refreshes → Borders and glows are now green

---

## Committing Your Changes

### 7. Create a Branch

```bash
# Branch names must start with "claude/" for Claude Code integration
git checkout -b claude/my-first-change
```

### 8. Stage and Commit

```bash
git status                        # See your changes
git add src/components/Hero.jsx   # Stage specific files
git commit -m "Update landing page title"
```

### 9. Push to Remote

```bash
git push -u origin claude/my-first-change
```

**Create a Pull Request** on GitHub to merge into `main`

---

## Building for Production

### 10. Build the Project

```bash
yarn build
```

**Output**: Creates `/dist` directory with optimized assets

```
dist/index.html                   2.75 kB │ gzip: 0.88 kB
dist/assets/index-[hash].js     797.34 kB │ gzip: 227.32 kB
dist/assets/index-[hash].css      2.29 kB │ gzip: 1.62 kB
+ 15 lazy-loaded JS chunks
✓ built in 3-5 seconds
```

### 11. Preview Production Build

```bash
yarn preview
```

Opens preview server at: **http://localhost:4173**

**Test**: Verify all routes work, animations smooth, images load

---

## Deploying to GitHub Pages

### 12. Deploy Command

```bash
yarn deploy
```

**What happens**:
1. `predeploy` script runs `yarn build` automatically
2. `gh-pages` deploys `/dist` directory to `gh-pages` branch
3. GitHub Pages serves the site

**URL**: https://jshengdev.github.io/portfolioyush/

**Deployment time**: ~30-60 seconds

### 13. Verify Deployment

1. Visit the URL above
2. Check all routes load correctly
3. Verify assets display properly

---

## Troubleshooting Common Issues

### Port 3000 Already in Use

**Error**: `Port 3000 is in use`

**Solution**:
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill

# Or change port in vite.config.js
server: {
  port: 3001  // Change to different port
}
```

### Vite Build Fails

**Error**: `Cannot find module...`

**Solution**:
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### Deployment Fails

**Error**: `ENOENT: no such file or directory, stat 'build'`

**Solution**: This was fixed in Wave 2 optimization. Verify `package.json:12` reads:
```json
"deploy": "gh-pages -d dist"  // NOT "build"
```

### HMR Not Working

**Solution**:
1. Stop dev server (Ctrl+C)
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Restart: `yarn dev`

---

## Next Steps

Now that you're set up:

- **Add a Project**: [Adding Projects Guide](ADDING_PROJECTS.md)
- **Modify Styles**: [Styling Guide](STYLING.md)
- **Understand Architecture**: [Architecture Overview](../architecture/OVERVIEW.md)
- **Work with Animations**: [Animations Guide](ANIMATIONS.md)

---

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `yarn install` |
| Start dev server | `yarn dev` |
| Build for production | `yarn build` |
| Preview production | `yarn preview` |
| Deploy to GitHub Pages | `yarn deploy` |
| Run tests | *(not configured)* |

---

## Development Server Features

**Vite DevServer** provides:
- ⚡ Lightning-fast HMR (Hot Module Replacement)
- 🔄 Instant page refresh on file save
- 🎯 Error overlay with stack traces
- 📦 Optimized imports (no bundling in dev)
- 🔍 Source maps for debugging

**Port**: 3000 (configurable in `vite.config.js`)

**Auto-refresh triggers**:
- `.jsx` file changes → Component hot reload
- `.css` file changes → Style injection (no full reload)
- `vite.config.js` changes → **Requires manual restart**

---

## File Structure Quick Reference

```
portfolioyush/
├── src/
│   ├── components/      # React components
│   ├── data/           # Project data files
│   ├── assets/         # Fonts
│   ├── theme.js        # Design tokens
│   └── App.jsx         # Main app component
├── public/
│   └── assets/         # Images, videos (served as-is)
├── dist/               # Build output (gitignored)
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

---

## See Also

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment process
- [File Locations Reference](../reference/FILE_LOCATIONS.md) - Complete file directory
- [Components Reference](../reference/COMPONENTS.md) - Component catalog
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues and solutions

---

**Estimated time to complete this guide**: 5-10 minutes

**You are now ready to develop!** 🎉
