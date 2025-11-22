# Documentation Action Plan: Portfolio Project

**Objective**: Transform CLAUDE.md from 4,600 lines into a living, maintainable documentation system
**Timeline**: 3-4 weeks, phased approach
**Effort**: ~40-50 hours (spread across multiple weeks)

---

## Current State

```
📊 METRICS
├─ CLAUDE.md: 4,676 lines (monolithic, hard to navigate)
├─ ARCHITECTURE.md: 495 lines (good, keep it)
├─ README.md: 2 lines (minimal)
├─ Components: 16 active, well-structured
├─ Routes: 11 functional
├─ Documentation coverage: Comprehensive but unsustainable
└─ Auto-generation: None (statistics are hardcoded)

🎯 PROBLEMS
├─ User doesn't know where to start in 4,600 lines
├─ Statistics become stale immediately (hardcoded)
├─ No quick reference for "how do I add a project?"
├─ Design decisions not captured (no ADRs)
├─ All docs in single file (hard to update)
└─ No automation to keep docs current

⭐ STRENGTHS
├─ Already using docs-as-code (markdown in repo)
├─ Strong foundation (ARCHITECTURE.md exists)
├─ Well-organized codebase (easy to document)
├─ Git integration ready (for living docs)
└─ CI/CD pipeline exists (GitHub Actions)
```

---

## Phase 1: Foundation & Quick Wins (Week 1-2, ~12 hours)

**Goal**: Establish new documentation structure without breaking current docs

### Step 1.1: Create /docs Directory Structure (2 hours)

```bash
# Run these commands
mkdir -p docs/{01-tutorials,02-how-to,03-reference,04-explanation}

# Create placeholder files
touch docs/_index.md
touch docs/{01-tutorials,02-how-to,03-reference,04-explanation}/.gitkeep
```

**File Structure**:
```
docs/
├── _index.md                 # Navigation hub (Diátaxis-based)
├── 01-tutorials/             # Learning-focused (3-5 files)
│   ├── setup.md             # Environment setup
│   ├── first-component.md   # Creating your first component
│   └── deploy.md            # Deploy to GitHub Pages
├── 02-how-to/               # Task-focused (5-7 files, ~500 words each)
│   ├── add-project.md
│   ├── modify-colors.md
│   ├── customize-fonts.md
│   ├── optimize-images.md
│   ├── add-animation.md
│   └── fix-build-errors.md
├── 03-reference/            # Lookup reference (4-5 files, exhaustive)
│   ├── components.md        # All components (auto-generated)
│   ├── routes.md            # All routes (auto-generated)
│   ├── dependencies.md      # All packages
│   ├── file-structure.md    # Directory tree
│   └── project-data.md      # Data structure
├── 04-explanation/          # Conceptual deep-dives (4-6 files)
│   ├── architecture.md      # Move ARCHITECTURE.md here
│   ├── animation-system.md  # Detailed explanation
│   ├── shader-pipeline.md   # WebGL/Three.js approach
│   ├── design-system.md     # Colors, typography, spacing
│   └── decisions.md         # ADRs: Why decisions were made
└── QUICKSTART.md            # Move from root to docs/

# Total: ~8,000 words organized, vs 4,600 in single file
```

### Step 1.2: Create docs/_index.md (Navigation Hub) (2 hours)

```markdown
---
title: Portfolio Documentation
type: index
updated: 2025-11-22
---

# Johnny Sheng's Portfolio Documentation

Welcome! This documentation uses the **Diátaxis framework** — choose what you need:

## I'm a new developer onboarding

Start here to get the project running:
1. [Quick Start (15 minutes)](./QUICKSTART.md) - Get it running locally
2. [First Component Tutorial](./01-tutorials/first-component.md) - Build something simple
3. [File Structure Reference](./03-reference/file-structure.md) - Understand the layout

**Estimated time**: 1-2 hours to be productive

---

## I want to add/modify something

Find your task:
- [How to: Add a new project](./02-how-to/add-project.md)
- [How to: Modify colors/design](./02-how-to/modify-colors.md)
- [How to: Customize typography](./02-how-to/customize-fonts.md)
- [How to: Optimize images](./02-how-to/optimize-images.md)
- [How to: Add animations](./02-how-to/add-animation.md)

**All guides**: 5-15 minutes, step-by-step

---

## I need to look something up

Quick reference for specific information:
- [Component Reference](./03-reference/components.md) - All components
- [Route Reference](./03-reference/routes.md) - All routes
- [File Structure](./03-reference/file-structure.md) - Where things live
- [Dependencies](./03-reference/dependencies.md) - Why each package
- [Project Data Structure](./03-reference/project-data.md) - Data format

**Lookup time**: < 5 minutes

---

## I want to understand the design

Deep dives into how/why the system works:
- [Architecture Explained](./04-explanation/architecture.md) - System design
- [Animation System](./04-explanation/animation-system.md) - How animations work
- [Shader Pipeline](./04-explanation/shader-pipeline.md) - WebGL implementation
- [Design System](./04-explanation/design-system.md) - Colors, typography, spacing
- [Design Decisions](./04-explanation/decisions.md) - Why certain choices were made

**Deep dive**: 20-60 minutes per topic

---

## Quick Help

**Common Issues**:
- [Troubleshooting Build Errors](./02-how-to/fix-build-errors.md)
- [Deployment Issues](./02-how-to/deploy.md#troubleshooting)
- [Performance Problems](./04-explanation/optimization.md)

**Need Something Else?**
- Search the docs (Ctrl+F)
- Check [ARCHITECTURE.md](./04-explanation/architecture.md) for system overview
- See [DECISIONS.md](./04-explanation/decisions.md) for "why" questions

---

## Contributing to Documentation

- Found an error? File an issue or PR
- Docs out of date? Look at frontmatter `updated` field
- Want to add a guide? Follow the [template](./02-how-to/_TEMPLATE.md)

**Last updated**: 2025-11-22
```

### Step 1.3: Extract 4 Quick How-To Guides (4 hours)

Create `/docs/02-how-to/add-project.md`:
```markdown
---
title: How to Add a New Project
type: how-to
difficulty: beginner
duration: "10 minutes"
steps: 4
related:
  - ../03-reference/components.md#NextProject
  - ../03-reference/project-data.md
  - ../04-explanation/architecture.md#project-detail-pages
updated: 2025-11-22
---

# How to Add a New Project

Add your new project to the portfolio in 4 simple steps.

## Prerequisites
- You know how to use Git
- You have cloned the repository
- You have ran `yarn install` and `yarn dev`

## Step 1: Add Project Data (1 minute)

Edit `src/data/projectname.jsx`:

\`\`\`javascript
// Add this object to the projectParty array
{
  id: 7,                                          // Next ID after last
  title: "Your Project Title",                    // Display name
  description: "Brief description (1 sentence)", // Shown in gallery
  image: "/assets/YOUR_CODE/thumbnail.png"      // Path to preview image
}
\`\`\`

✅ **Verify**: Run `yarn dev`, go to `/projects`, you should see your project in the list

## Step 2: Create Assets Folder & Add Images (2 minutes)

Create folder: `public/assets/YOUR_CODE/`
Add images there (PNG, JPG, GIF format supported)

Image recommendations:
- Thumbnail: 800x600px (shown in projects list)
- Detail images: max 2000px wide
- Format: PNG or JPG (compress first)

✅ **Verify**: Images appear when you hover over project in `/projects`

## Step 3: Create Project Component (5 minutes)

Create file: `src/components/Projectfiles/YourProject.jsx`

**Template** (copy from Grove.jsx):
```jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Container2, Title, MetadataPanel, OverviewBox,
  // ... other imports
} from '../sharedStyles';

const YourProject = () => {
  return (
    <Container2>
      <Title>Your Project Title</Title>

      <MetadataPanel>
        <MetadataSection>
          <MetadataLabel>Role</MetadataLabel>
          <MetadataValue>Your role here</MetadataValue>
        </MetadataSection>
        {/* ... more metadata */}
      </MetadataPanel>

      {/* Your project content */}
    </Container2>
  );
};

export default YourProject;
```

✅ **Verify**: File exists and has no syntax errors

## Step 4: Add Route (1 minute)

Edit `src/App.jsx`, find the routes section, add:

```javascript
<Route path="/projects/YourProjectTitle"
  element={
    <PageWrapper>
      <YourProject />
    </PageWrapper>
  }
/>
```

Also add import at top:
```javascript
import YourProject from './components/Projectfiles/YourProject';
```

✅ **Final Verify**:
1. Run `yarn dev`
2. Go to `/projects`
3. Click your project
4. See: Title + metadata + content
5. See "Next Project" button at bottom

## Common Issues

**Images not showing?**
- Check path in projectname.jsx (should be `/assets/YOUR_CODE/...`)
- Check file actually exists in `public/assets/YOUR_CODE/`
- Check file name spelling (case-sensitive)

**Route not working?**
- Check spelling: `/projects/YourProjectTitle` matches component filename
- Check import statement is present at top of App.jsx
- Run `yarn dev` again to reload

**Component not showing?**
- Check JSX syntax (matching parentheses, imports)
- Check filename matches route (YourProject → YourProjectTitle)

## Next Steps
- [Customize project styling](../04-explanation/design-system.md)
- [Add animations](../02-how-to/add-animation.md)
- [Optimize images](../02-how-to/optimize-images.md)
```

Create 3 more guides:
- `/docs/02-how-to/modify-colors.md` (400 words)
- `/docs/02-how-to/customize-fonts.md` (350 words)
- `/docs/02-how-to/optimize-images.md` (400 words)

### Step 1.4: Create Quick Reference Files (2 hours)

Create `/docs/03-reference/components.md` (scan codebase):
```markdown
---
title: Component Reference
type: reference
generated: 2025-11-22
---

# Component Reference

## Core Components

### Cursor
- **File**: `src/Cursor.jsx`
- **Purpose**: Custom animated cursor with lag effect
- **Usage**: Auto-rendered in App.jsx
- **State**: dotX, dotY, ringX, ringY, isClicking
- **Key Feature**: Smooth easing animation (0.1 coefficient)

### Navbar
- **File**: `src/components/Navbar.jsx`
- **Purpose**: Fixed left-side navigation
- **Usage**: Auto-rendered in App.jsx
- **Links**: About, Projects, Archive, Contact
- **Styling**: 'Ade' custom font, 7px letter-spacing

### Line
- **File**: `src/components/Line.jsx`
- **Purpose**: Route-reactive decorative line animations
- **Usage**: Auto-rendered, responds to route changes
- **Variants**: 6 different animation styles based on route
- **Key Feature**: Complex Framer Motion animations

### ShaderVisual
- **File**: `src/components/ShaderVisual.jsx`
- **Purpose**: Three.js WebGL animated background
- **Usage**: Auto-rendered behind all content
- **Technology**: Custom GLSL shaders (Truchet patterns)
- **Performance**: Continuous 60fps animation

## Page Components

| Component | Route | Purpose | Size |
|-----------|-------|---------|------|
| Hero | / | Landing page | 114 lines |
| About | /about | Personal bio | 105 lines |
| Projects | /projects | Project gallery | 327 lines |
| Archive | /archive | Scrolling archive | 330 lines |
| Contact | /contact | Contact info | 122 lines |

## Project Detail Components

| Component | Route | Project | Size |
|-----------|-------|---------|------|
| Grove | /projects/Grove | AI Matching | 13,872 bytes |
| AP | /projects/AlainaPamela | Film Internship | 11,053 bytes |
| Collection | /projects/TheCollection | Film Portfolio | 13,389 bytes |
| Ark | /projects/Ark | Skincare Wearable | 12,015 bytes |
| CapsuleMachine | /projects/CapsuleMachine | Installation | 18,799 bytes |
| Lens | /projects/Lens | (Check status) | 5,112 bytes |

## Utility Components

| Component | Purpose | File |
|-----------|---------|------|
| AppSlider | Text carousel animation | Hero.jsx |
| NextProject | Project navigation widget | Used in project pages |
| sharedStyles | Reusable styled-components (18 total) | sharedStyles.js |

---

**Need details on a specific component?** Check [Architecture Explained](../04-explanation/architecture.md#component-architecture)
```

Create `/docs/03-reference/routes.md`:
```markdown
---
title: Route Reference
type: reference
updated: 2025-11-22
---

# Route Reference

## All Routes

| Route | Component | Type | Purpose |
|-------|-----------|------|---------|
| `/` | Hero | Page | Landing page |
| `/about` | About | Page | Personal bio |
| `/projects` | Projects | Page | Project gallery |
| `/archive` | Archive | Page | Scrolling archive |
| `/contact` | Contact | Page | Contact information |
| `/projects/Grove` | Grove | Project | AI matching project |
| `/projects/AlainaPamela` | AP | Project | Film internship |
| `/projects/TheCollection` | Collection | Project | Film portfolio |
| `/projects/Ark` | Ark | Project | Skincare wearable |
| `/projects/CapsuleMachine` | CapsuleMachine | Project | Interactive installation |
| `/projects/Lens` | Lens | Project | Lens project |

## Route Formatting

Project routes use **PascalCase** formatting:
- "The Collection" → `/projects/TheCollection`
- "Alaina Pamela" → `/projects/AlainaPamela`

See [DECISIONS.md](../04-explanation/decisions.md) for discussion about URL formatting.

## Adding New Routes

See [How to: Add a New Project](../02-how-to/add-project.md#step-4-add-route)
```

Create `/docs/03-reference/file-structure.md` (reference the existing structure in CLAUDE.md).

### Step 1.5: Create QUICKSTART.md (2 hours)

Create `/docs/QUICKSTART.md`:
```markdown
---
title: Quick Start
type: tutorial
duration: "15 minutes"
difficulty: beginner
updated: 2025-11-22
---

# Quick Start

Get this portfolio running locally in 15 minutes.

## 1. Prerequisites (2 min)

Install these first:
- [Node.js](https://nodejs.org/) (v16 or newer)
- [Yarn](https://yarnpkg.com/) (npm works too, but project uses yarn)
- [Git](https://git-scm.com/)

Verify: `node --version`, `yarn --version`, `git --version`

## 2. Clone & Install (3 min)

\`\`\`bash
# Clone repository
git clone https://github.com/Jshengdev/portfolioyush.git
cd portfolioyush

# Install dependencies
yarn install
\`\`\`

## 3. Start Development Server (1 min)

\`\`\`bash
yarn dev
\`\`\`

Open browser: http://localhost:3000

You should see: Landing page with animated background and custom cursor

## 4. Explore

- Click title → Home
- Click "About" → About page
- Click "Projects" → Project gallery (hover to preview)
- Click project → Detailed project page
- Check console: No errors
- Move cursor: Custom cursor with lag effect follows

## 5. Build for Production (2 min)

\`\`\`bash
yarn build
\`\`\`

Output goes to `/dist` directory (ready for deployment)

## 6. Deploy to GitHub Pages (2 min)

\`\`\`bash
yarn deploy
\`\`\`

Site deployed to: https://jshengdev.github.io/portfolioyush/

## Troubleshooting

**Port 3000 already in use?**
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
yarn dev
\`\`\`

**Modules not found?**
\`\`\`bash
rm -rf node_modules
yarn install
\`\`\`

**Build fails?**
\`\`\`bash
yarn build 2>&1  # Shows full error
# Common fix: yarn install again
\`\`\`

## Next Steps

✅ **You can now:**
- See the portfolio running
- Navigate all pages
- Understand the file structure

🎯 **What to do next:**
- Read [Architecture](./04-explanation/architecture.md) to understand how it works
- Follow [First Component](./01-tutorials/first-component.md) to modify something
- Check [How-To Guides](./02-how-to/) for specific tasks

---

**Questions?** See [Troubleshooting](./02-how-to/fix-build-errors.md)
```

### Summary of Phase 1

**Deliverables**:
- ✅ /docs directory structure created
- ✅ _index.md with Diátaxis navigation
- ✅ 4 how-to guides
- ✅ 3 reference files
- ✅ QUICKSTART.md
- ✅ Total new docs: ~6,500 words

**Time**: ~12 hours (spread over 2 weeks)

**Result**: Users can now find information within 2-3 clicks instead of scanning 4,600 lines

---

## Phase 2: Depth & Organization (Week 2-3, ~15 hours)

### Step 2.1: Move & Expand Explanation Docs (8 hours)

**Move** existing ARCHITECTURE.md → `docs/04-explanation/architecture.md`

**Create** new explanation docs:

#### `docs/04-explanation/animation-system.md` (~2,000 words)
- Explain Line.jsx animation system
- How route-reactive animations work
- Framer Motion patterns used
- Examples of each animation type
- Why Framer Motion chosen

#### `docs/04-explanation/shader-pipeline.md` (~1,500 words)
- WebGL/Three.js basics
- Truchet tile pattern explanation
- Uniforms: u_time, u_resolution, u_lightPos, u_mouse
- Fragment shader: How colors are generated
- Vertex shader: How geometry is positioned
- Performance considerations

#### `docs/04-explanation/design-system.md` (~1,000 words)
- Color palette with hex codes
- Typography: Fonts & sizing
- Spacing scale
- Animation timing
- CSS patterns
- Backdrop blur effects

#### `docs/04-explanation/decisions.md` (ADRs, ~1,500 words)
Create Architectural Decision Records for major choices:

```markdown
# Design Decisions & Architecture Decision Records

## ADR-001: Code Splitting Strategy

### Status: Accepted

### Context
Bundle size was large (995KB), affecting initial load time.

### Decision
Implement lazy loading with React.lazy() and code splitting.

### Rationale
- Reduces main bundle from 995KB → 797KB (-20%)
- Creates 15 separate chunks for better caching
- Lazy-loads pages/projects only when needed

### Consequences
- Positive: Faster initial load, better caching
- Negative: Slight delay when navigating to new page (minimal with good network)
- Mitigated by: Using Suspense with loading fallback

---

## ADR-002: Shader Extraction Pattern

### Status: Accepted

### Context
GLSL shader code (600+ lines) mixed with JavaScript.

### Decision
Extract to separate .glsl files (truchet.vert.glsl, truchet.frag.glsl).

### Rationale
- Better syntax highlighting
- Easier debugging (GLSL-specific issues)
- Cleaner separation of concerns
- Easier to iterate on shader code

### Consequences
- Positive: Cleaner codebase, better developer experience
- Negative: Requires import syntax `?raw` (Vite feature, not standard)
- Future: Could port shaders between projects more easily

---

[4-5 more ADRs for significant decisions]
```

### Step 2.2: Write Tutorials (4 hours)

Create `/docs/01-tutorials/first-component.md` (~1,500 words)
- Step-by-step: Modify a component
- Change a color
- Test locally
- See change immediately

Create `/docs/01-tutorials/deploy.md` (~1,000 words)
- Understanding the deploy process
- What happens in CI/CD
- How to roll back

### Step 2.3: Refactor CLAUDE.md (3 hours)

**Reduce from 4,600 → ~400 lines**

Keep only:
- High-level project overview (100 lines)
- Link to /docs for details (20 lines)
- Quick statistics (updated from auto-generation, 20 lines)
- Navigation to important resources (50 lines)
- Remaining: Heavily condensed version control notes, development setup (210 lines)

**New CLAUDE.md Structure**:
```markdown
# CLAUDE.md - AI Assistant Guide (Condensed)

## Quick Overview
[100 lines of high-level project info]

## Documentation
For comprehensive documentation, see:
- [Documentation Index](./docs/_index.md) - Start here
- [Quick Start](./docs/QUICKSTART.md) - Get running in 15 min
- [Architecture](./docs/04-explanation/architecture.md) - System design
- [How-To Guides](./docs/02-how-to/) - Specific tasks

## Key Statistics

[Auto-generated from scripts/generate-metrics.js]

| Metric | Value |
|--------|-------|
| Components | 16 |
| Lines of Code | 4,676 |
| Routes | 11 |
| Last Updated | [auto] |

## Codebase Health

✅ All documentation links in `/docs/`
✅ Statistics auto-generated
✅ See [DECISIONS.md](./docs/04-explanation/decisions.md) for design choices

## For AI Assistants
- See [ARCHITECTURE.md](./docs/04-explanation/architecture.md) for system overview
- See [Component Reference](./docs/03-reference/components.md) for all components
- See [How-To Guides](./docs/02-how-to/) for common tasks

[~300 more lines of technical reference for AI use only]
```

---

## Phase 3: Automation (Week 3, ~15 hours)

### Step 3.1: Auto-Generate Component Reference (5 hours)

**Create** `scripts/generate-component-docs.js`:
```javascript
const fs = require('fs');
const path = require('path');

// Scan components directory
// Extract JSDoc comments
// Generate markdown table
// Write to docs/03-reference/components.md
```

**Add JSDoc comments** to all components:
```javascript
/**
 * @component Hero - Landing page
 * @description Main landing page with animated title and AppSlider carousel
 * @example return <Hero />
 * @see {@link AppSlider} For text carousel
 */
export default function Hero() { ... }
```

**Add to CI/CD**:
```yaml
# .github/workflows/docs.yml
- run: node scripts/generate-component-docs.js
```

### Step 3.2: Auto-Generate Metrics (3 hours)

**Create** `scripts/generate-metrics.js`:
```javascript
// Counts components, lines, etc.
// Generates JSON file
// Update README/CLAUDE.md with latest metrics
```

**Usage**:
```bash
node scripts/generate-metrics.js
# Output: docs/.generated/metrics.json
```

### Step 3.3: Add CI/CD Validation (4 hours)

**Create** `.github/workflows/docs-check.yml`:
```yaml
name: Documentation Checks
on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      # 1. Check code changed, docs updated
      - name: Ensure docs updated
        run: |
          if git diff --name-only | grep -qE '^src/'; then
            if ! git diff --name-only | grep -qE '\.md|docs/'; then
              echo "⚠️ Code changed but docs not updated"
              exit 1
            fi
          fi

      # 2. Generate latest metrics
      - run: node scripts/generate-metrics.js

      # 3. Check links
      - uses: gaurav-nelson/github-action-markdown-link-check@v1

      # 4. Check for stale docs
      - run: node scripts/check-doc-freshness.js
```

### Step 3.4: Add Stale Doc Detection (3 hours)

**Create** `scripts/check-doc-freshness.js`:
```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Find all .md files with frontmatter
// Check "updated" date
// Warn if older than 90 days
// Create issues for old docs
```

---

## Phase 4: Maintenance Setup (Ongoing)

### Step 4.1: Create GitHub Issue Template

**File**: `.github/ISSUE_TEMPLATE/stale-documentation.md`
```markdown
---
name: Stale Documentation
about: Auto-created when documentation is > 90 days old
labels: documentation, stale
---

# Stale Documentation Review Required

Documentation file: [FILENAME]
Last updated: [DATE]
Days stale: [DAYS]

**Action needed**: Please review and update this documentation.

- [ ] Update content if needed
- [ ] Update "updated" field in frontmatter
- [ ] Run `yarn docs:validate` to verify

When complete, close this issue.
```

### Step 4.2: Create Code Review Checklist

**File**: `.github/PULL_REQUEST_TEMPLATE.md`
```markdown
## Description
[Standard PR description]

## Documentation Checklist
- [ ] I've updated relevant documentation
- [ ] I've added/removed docs if changing component structure
- [ ] I've updated CLAUDE.md if this is a major change
- [ ] All doc links are valid

## Type of Change
- [ ] Bug fix (docs might need update)
- [ ] New feature (needs documentation)
- [ ] Breaking change (needs DECISIONS.md update)
- [ ] Documentation only
```

### Step 4.3: Add npm Scripts

**Edit** `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "gh-pages -d dist",
    "docs:generate": "node scripts/generate-*.js",
    "docs:check-freshness": "node scripts/check-doc-freshness.js",
    "docs:check-links": "markdown-link-check docs/**/*.md"
  }
}
```

### Step 4.4: Quarterly Documentation Review

**Create calendar event**: "Documentation Review" every 3 months
- Review all docs for accuracy
- Update statistics
- Remove obsolete docs
- Fill gaps in documentation

---

## File Changes Summary

### New Files Created

```
docs/
├── _index.md                                (Navigation hub)
├── QUICKSTART.md
├── 01-tutorials/
│   ├── first-component.md
│   ├── deploy.md
│   └── deploy-custom-domain.md
├── 02-how-to/
│   ├── add-project.md
│   ├── modify-colors.md
│   ├── customize-fonts.md
│   ├── optimize-images.md
│   └── fix-build-errors.md
├── 03-reference/
│   ├── components.md
│   ├── routes.md
│   ├── file-structure.md
│   ├── dependencies.md
│   └── project-data.md
├── 04-explanation/
│   ├── architecture.md (moved from root)
│   ├── animation-system.md
│   ├── shader-pipeline.md
│   ├── design-system.md
│   └── decisions.md (ADRs)
└── .generated/ (auto-generated files)

scripts/
├── generate-component-docs.js
├── generate-metrics.js
├── generate-routes.js
└── check-doc-freshness.js

.github/
├── ISSUE_TEMPLATE/stale-documentation.md
├── PULL_REQUEST_TEMPLATE.md
└── workflows/docs-check.yml
```

### Modified Files

```
CLAUDE.md                                   (4,600 → 400 lines, restructured)
CLAUDE.md → docs/04-explanation/architecture.md  (Moved)
package.json                                (Add docs scripts)
.gitignore                                  (Add docs/.generated/)
```

### Metrics

| Aspect | Before | After | Change |
|--------|--------|-------|--------|
| **Documentation Files** | 2 (README, CLAUDE.md) | 20+ | +1000% |
| **CLAUDE.md Length** | 4,600 lines | 400 lines | -91% |
| **Organization** | Single file | Diátaxis 4-folder | Better |
| **Auto-generated** | None | Metrics, components, routes | +3 |
| **CI/CD Checks** | None | 4 automated checks | Better |
| **User Navigation Time** | ~20 min to find info | <2 min | -90% |

---

## Implementation Checklist

### Phase 1: Weeks 1-2
- [ ] Create /docs directory structure
- [ ] Create docs/_index.md (Diátaxis navigation)
- [ ] Create 4 how-to guides
- [ ] Create 3 reference files
- [ ] Create QUICKSTART.md
- [ ] Add test: Can new developer get running in 15 min?

### Phase 2: Week 2-3
- [ ] Create animation-system.md explanation
- [ ] Create shader-pipeline.md explanation
- [ ] Create design-system.md explanation
- [ ] Create decisions.md (ADRs)
- [ ] Create 2 tutorials
- [ ] Refactor CLAUDE.md to ~400 lines

### Phase 3: Week 3-4
- [ ] Implement component doc generation
- [ ] Implement metrics generation
- [ ] Implement routes generation
- [ ] Set up GitHub Actions doc checks
- [ ] Implement stale doc detection

### Phase 4: Ongoing
- [ ] Add docs checklist to PRs
- [ ] Set up quarterly review calendar
- [ ] Monitor stale doc issues
- [ ] Update docs with each code change

---

## Expected Outcomes

### Immediate (Week 1-2)
- New developers find setup instructions in < 5 minutes
- Common tasks have step-by-step guides
- 90% faster to answer "how do I...?" questions
- Navigation is clear and organized

### Medium-term (Week 3-4)
- Statistics auto-update (never stale)
- CI/CD enforces doc updates with code
- Design decisions are recorded (ADRs)
- Documentation maintenance is predictable

### Long-term (Ongoing)
- Documentation stays current (automation alerts)
- Onboarding time: 2 hours instead of half-day
- Fewer "why was this decision made?" questions
- Living documentation that evolves with code

---

## Rollback Plan

If this approach doesn't work:
- Keep old CLAUDE.md as backup (CLAUDE.md.backup)
- New docs are separate from old docs
- Can revert by deleting /docs folder
- No risk to existing codebase

---

**Ready to implement?** Start with Phase 1, Week 1.
**Questions?** Refer to DOCUMENTATION_STRATEGY.md for theory.

---

**Document Version**: 1.0
**Created**: 2025-11-22
**Target Implementation**: 3-4 weeks
**Estimated Effort**: 40-50 hours (spread across phases)
