# Load Topical Context

Load comprehensive context for a specific topic, concept, or area of the codebase.

## Usage
```
/load/context <topic>
```

## Examples
- `/load/context routing` - Load all routing-related information
- `/load/context animations` - Load animation system context
- `/load/context optimization-history` - Load Wave 1-7 optimization details
- `/load/context deployment` - Load deployment configuration and scripts
- `/load/context architecture` - Load overall architecture context

---

## Task

You are tasked with loading context for: **$ARGUMENTS**

Follow this structured approach based on the topic type:

---

## Topic Categories & Loading Strategies

### 1. Architecture Topics
**Keywords**: architecture, structure, design, patterns, organization

**Load**:
- ARCHITECTURE.md (if exists) or CLAUDE.md Architecture section
- Component hierarchy and relationships
- Data flow patterns
- Key design decisions

**Present**:
```markdown
## Architecture Context

### System Overview
[High-level architecture description]

### Component Organization
- Core: [list core components]
- Pages: [list page components]
- Utilities: [list utilities]
- Widgets: [list widgets]

### Key Patterns
- [Pattern 1]: [description]
- [Pattern 2]: [description]

### Design Decisions
- Why React 18.2.0
- Why Vite for bundling
- Why styled-components for styling
```

---

### 2. Technology Topics
**Keywords**: react, framer-motion, three.js, vite, styled-components

**Load**:
- All files using the specified technology
- Version from package.json
- Usage patterns across codebase

**Present**:
```markdown
## Technology Context: [Technology]

### Version
[Package]: [version] (from package.json)

### Usage
Used in [N] files:
- [Component 1]: [usage description]
- [Component 2]: [usage description]

### Patterns
Common usage patterns:
1. [Pattern 1 with code example]
2. [Pattern 2 with code example]

### Performance Considerations
[Any performance notes about this technology]
```

---

### 3. Feature Topics
**Keywords**: animations, routing, styling, lazy-loading, shaders

**Load**:
- All components implementing this feature
- Configuration files
- Related documentation sections

**For "animations"**:
```markdown
## Animation System Context

### Animation Technologies
- Framer Motion 11.15.0
- CSS keyframes
- RequestAnimationFrame (custom)

### Animated Components
1. **Line.jsx** (391 lines)
   - 6 route-reactive animation variants
   - Complex transforms: translateX, rotate, skewX, scale

2. **Cursor.jsx** (113 lines)
   - Custom cursor with lag effect
   - Interval-based easing

3. **AppSlider.jsx** (103 lines)
   - Infinite horizontal scroll
   - 12s linear animation

4. **Project Pages**
   - Scroll-triggered animations (whileInView)
   - Page transitions (AnimatePresence)

### Animation Patterns
[Code examples of common animation patterns]

### Performance Notes
- Line.jsx: Many transforms, may impact mobile
- ShaderVisual: 60fps continuous (GPU intensive)
- Cursor: RAF-optimized for smooth 60fps
```

**For "routing"**:
```markdown
## Routing Context

### Router Setup
- React Router DOM 7.0.2 (latest)
- AnimatePresence for transitions
- PageWrapper pattern

### Routes (11 functional)
- `/` → Hero.jsx
- `/about` → About.jsx
- `/projects` → Projects.jsx
- `/archive` → Archive.jsx
- `/contact` → Contact.jsx
- `/projects/[project]` → Project detail pages (6 active)

### Routing Patterns
[Code examples of navigation patterns]

### Issues
⚠️ Broken route: /projects/NextProject (should be removed)
```

---

### 4. Optimization Topics
**Keywords**: optimization, performance, cleanup, waves, technical-debt

**Load**:
- CLAUDE.md Optimization History section (Wave 1-7)
- Current health score
- Remaining technical debt
- Performance metrics

**Present**:
```markdown
## Optimization Context

### Current Status
- Health Score: 9.5/10
- Total Effort: ~12 hours (2 days)
- Completed: Wave 1-7 (100%)

### Wave Summary
**Wave 1: Cleanup** (-957 lines dead code)
**Wave 2: Configuration** (Theme system)
**Wave 3: Consolidation** (-270 lines duplicates)
**Wave 4: Documentation** (README, ARCHITECTURE.md)
**Wave 5: Asset Optimization** (-12MB assets)
**Wave 6: Advanced** (Lazy loading, -20% bundle)
**Wave 7: Integration Testing** (Production ready)

### Key Metrics
- Code: 5,272 → 4,676 lines (-11.3%)
- Bundle: ~995KB → 797KB (-20%)
- Assets: 455MB → 443MB (-2.6%)
- Components: 26 → 16 files (-38.5%)

### Remaining Issues
[List from Technical Debt section]
```

---

### 5. Deployment Topics
**Keywords**: deployment, build, deploy, github-pages, vite

**Load**:
- package.json scripts
- vite.config.js
- .github/workflows (if exists)
- Deployment documentation

**Present**:
```markdown
## Deployment Context

### Build Configuration
- Tool: Vite 6.0.7
- Output: /dist directory
- Dev server: port 3000

### Deploy Scripts
[package.json scripts]

### Deployment Target
- Platform: GitHub Pages
- URL: https://jshengdev.github.io/portfolioyush
- Branch: Main

### Build Process
1. `yarn build` - Bundles to /dist
2. `yarn deploy` - Deploys via gh-pages

### Current Issues
[Any deployment issues from CLAUDE.md]
```

---

### 6. Data Topics
**Keywords**: data, content, projects, archive

**Load**:
- /src/data/projectname.jsx
- /src/data/archive.js
- Hardcoded data in components

**Present**:
```markdown
## Data Context

### Project Data
Location: `/src/data/projectname.jsx`
Projects: 6 defined

[List all projects with metadata]

### Archive Data
Location: `/src/data/archive.js`
Items: 17 defined

### Data Patterns
- Single source of truth pattern
- Export as named array
- Imported by: [list components using data]

### Data Issues
[Any data-related technical debt]
```

---

## General Loading Strategy

For ANY topic:

1. **Search CLAUDE.md first**
   - Check Table of Contents for relevant section
   - Load the entire section if found

2. **Search codebase**
   - Grep for topic keywords
   - Find all related files

3. **Check documentation**
   - README.md
   - ARCHITECTURE.md (if exists)
   - Component-level documentation

4. **Analyze relationships**
   - Which components are related
   - Which files import/export related functionality

5. **Extract metadata**
   - File locations
   - Line counts
   - Dependencies
   - Technologies used

---

## Context Stack Update
After loading:
```
current_topic: "$ARGUMENTS"
loaded_sections: [list of sections loaded]
related_files: [list of files]
context_type: "topic"
```

---

## Output Format

Always structure the response as:
1. **Overview** (2-3 sentences)
2. **Detailed Context** (organized by subtopic)
3. **Code Examples** (where relevant)
4. **Related Information** (links to other topics/components)
5. **Next Steps** (suggested follow-up commands)

---

## Error Handling

If topic not found:
1. Suggest similar topics
2. List available topic categories:
   - Architecture
   - Technologies (React, Framer Motion, Three.js, etc.)
   - Features (Animations, Routing, Styling, etc.)
   - Optimization
   - Deployment
   - Data
3. Offer to search: `/search/code [topic]`
