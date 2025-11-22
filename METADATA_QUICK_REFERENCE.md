# Metadata & Tagging Quick Reference
## Quick Copy-Paste Patterns for Your Portfolio

---

## Taxonomy Quick Reference

### Types
```
page        → Route-level components (Hero, About, Projects, etc.)
component   → Reusable UI components (Line, Cursor, Navbar, etc.)
utility     → Helper components (sharedStyles, data files, etc.)
data        → Configuration/data files (projectname.jsx)
```

### Technologies
```
react
react-router
framer-motion
styled-components
three.js
```

### Performance
```
heavy   → >15KB or continuous processing (ShaderVisual, CapsuleMachine)
medium  → 8-15KB with animations (Line, Archive, Grove)
light   → <8KB or simple rendering (Cursor, Navbar, buttons)
```

### Scope
```
global             → Used across entire app (Cursor, Line, Navbar)
route-specific     → Used on specific routes (Hero, Archive, About)
project-specific   → Used only in one project (Grove, Ark, etc.)
```

### Status
```
active       → Production ready
deprecated   → To be removed
refactoring  → Currently being refactored
experimental → Not yet stable
```

---

## Component Metadata Template

```json
{
  "id": "unique-kebab-case-id",
  "name": "ComponentName",
  "file": "src/components/ComponentName.jsx",
  "type": "component",
  "description": "What this component does in one sentence",
  "technology": ["react", "framer-motion"],
  "performance": "medium",
  "scope": "global",
  "status": "active",
  "tags": ["tag1", "tag2", "tag3"],
  "file_size_bytes": 9482,
  "last_updated": "2025-11-22"
}
```

### Minimal Template

```json
{
  "id": "component-id",
  "name": "ComponentName",
  "file": "src/components/ComponentName.jsx",
  "type": "component",
  "technology": ["react"],
  "performance": "light",
  "tags": ["relevant", "tags"]
}
```

---

## JSDoc Metadata Tag Template

### Full Template

```javascript
/**
 * Brief description of what component does
 *
 * Longer description with context and behavior.
 * Explain the purpose and any important details.
 *
 * @component ComponentName
 * @metadata {
 *   "type": "component",
 *   "technology": ["react", "framer-motion"],
 *   "purpose": ["animation"],
 *   "performance": "medium",
 *   "scope": "global",
 *   "status": "active"
 * }
 * @tags tag1, tag2, tag3
 *
 * @example
 * import Component from './Component';
 * <Component prop="value" />
 *
 * @note Important information about the component
 */
```

### Minimal Template

```javascript
/**
 * Component description
 *
 * @component ComponentName
 * @metadata {
 *   "type": "component",
 *   "technology": ["react"],
 *   "performance": "light"
 * }
 * @tags tag1, tag2
 */
```

### Quick Copy-Paste Examples

#### Line.jsx Template
```javascript
/**
 * Route-Reactive Line Animation System
 *
 * Animated decorative lines that change based on current route.
 * Uses Framer Motion for smooth transitions between 6 animation states.
 *
 * @component Line
 * @metadata {
 *   "type": "component",
 *   "technology": ["react", "framer-motion", "react-router"],
 *   "purpose": ["animation", "route-reactive"],
 *   "performance": "medium",
 *   "scope": "global",
 *   "status": "active"
 * }
 * @tags animation, route-reactive, decorative, keyframe-animations
 */
```

#### ShaderVisual.jsx Template
```javascript
/**
 * Three.js WebGL Animated Background
 *
 * Dynamic 3D background with custom GLSL shaders, Truchet patterns,
 * and mouse-interactive lighting. Runs at 60fps continuously.
 *
 * @component ShaderVisual
 * @metadata {
 *   "type": "component",
 *   "technology": ["react", "three.js"],
 *   "purpose": ["rendering"],
 *   "performance": "heavy",
 *   "scope": "global",
 *   "status": "active"
 * }
 * @tags 3d, shader, webgl, gpu-accelerated, background
 * @note Consider device detection - may not work on mobile
 */
```

#### Project Detail Page Template (Grove.jsx)
```javascript
/**
 * Grove Project Detail Page
 *
 * Displays AI-powered matching platform project information using
 * narrative structure (Overview, Acts I-II-III, Reflection).
 *
 * @component Grove
 * @metadata {
 *   "type": "page",
 *   "technology": ["react", "framer-motion", "styled-components"],
 *   "purpose": ["project-detail", "storytelling"],
 *   "performance": "medium",
 *   "scope": "project-specific",
 *   "status": "active"
 * }
 * @tags project-detail, ai-project, narrative, interactive
 * @route /projects/Grove
 */
```

#### Utility/Shared Styles Template (sharedStyles.js)
```javascript
/**
 * Shared Component Library
 *
 * Centralized styled-components used across all project detail pages.
 * Exports 18 reusable components following consistent design patterns.
 *
 * @component sharedStyles
 * @metadata {
 *   "type": "utility",
 *   "technology": ["styled-components"],
 *   "purpose": ["styling"],
 *   "performance": "light",
 *   "scope": "global",
 *   "status": "active"
 * }
 * @tags styling, shared-library, design-system
 * @exports Container2, Title, MetadataPanel, ChapterCard, (15 more)
 */
```

---

## Tag Suggestions by Category

### Animation-Related
```
animation
keyframe-animations
route-reactive
decorative
smooth-transitions
scroll-triggered
hover-effects
```

### Performance-Related
```
optimization-target
heavy-component
lazy-loadable
code-splitting-candidate
bundle-impact
```

### Architecture-Related
```
core-layout
navigation-system
global-utility
shared-library
project-detail-page
```

### Feature-Related
```
custom-cursor
shader-effects
3d-rendering
horizontal-scroll
responsive
interactive
```

### Status-Related
```
needs-documentation
needs-refactoring
optimization-needed
deprecated-use-instead:ComponentName
```

---

## Search Examples

### Using ComponentSearch Utility

```javascript
import search from './utils/componentSearch';

// Find all React components
search.findByTechnology('react');

// Find heavy components
search.findHeavyComponents();

// Find global components
search.findGlobalComponents();

// Find components with tag
search.searchByFacet('tag', 'animation');

// Multi-criteria search (AND logic)
search.searchByFacets({
  technology: ['react'],
  performance: 'light',
  scope: 'global'
});

// Text search
search.search('animation');

// Get all values for a facet
search.getTechnologies();
search.getTypes();
search.getAllTags();
```

---

## Common Tasks

### Task 1: Find All Components Using Three.js

```javascript
const threeJsComponents = search.findByTechnology('three.js');
// Result: [ShaderVisual]
```

### Task 2: Find Heavy Components (Optimization Targets)

```javascript
const heavy = search.findHeavyComponents();
// Result: [ShaderVisual, CapsuleMachine, Archive, Grove, ...]

heavy.forEach(c => {
  console.log(`${c.name}: ${c.file_size_bytes} bytes`);
});
```

### Task 3: Find Animated Components

```javascript
const animated = search.search('animation');
// Searches name, description, and tags
```

### Task 4: Find Global Components Using Framer Motion

```javascript
const results = search.searchByFacets({
  technology: 'framer-motion',
  scope: 'global'
});
// Result: [Line]
```

### Task 5: Find All Project Detail Pages

```javascript
const projectPages = search.searchByFacet('type', 'page')
  .filter(c => c.scope === 'project-specific');
// Result: [Grove, CapsuleMachine, Collection, Ark, AP, Lens]
```

### Task 6: Find Project Detail Pages Not Using Framer Motion

```javascript
const projectPages = search.searchByFacet('type', 'page')
  .filter(c => c.scope === 'project-specific')
  .filter(c => !c.technology.includes('framer-motion'));
// Result: [] (all use framer-motion)
```

---

## Metadata Maintenance

### When Adding a New Component

**Checklist**:
```
☐ Decide: type (component/page/utility/data)
☐ Pick technology stack from approved list
☐ Estimate performance (light/medium/heavy)
☐ Assign scope (global/route-specific/project-specific)
☐ Write 2-3 relevant tags
☐ Add JSDoc @metadata tag
☐ Run: npm run generate-metadata
```

### When Refactoring a Component

**Update metadata**:
```
☐ Change status to "refactoring"
☐ Update description if purpose changed
☐ Update technology if dependencies changed
☐ Note date of last update
☐ Add note about refactoring in progress
```

### When Deprecating a Component

**Steps**:
```
☐ Set status to "deprecated"
☐ Add tag: "deprecated-use-instead:NewComponentName"
☐ Update description with migration path
☐ Remove from production searches
☐ Plan removal date
```

---

## Performance Analysis Using Metadata

### Identify Heavy Components

```javascript
const heavy = search.findHeavyComponents();
heavy.forEach(c => {
  console.log(`${c.name}: ${(c.file_size_bytes / 1024).toFixed(1)}KB`);
});
```

Output:
```
ShaderVisual: 7.5KB (+ Three.js library)
CapsuleMachine: 18.8KB
Archive: 11.9KB
Grove: 13.9KB
```

### Find Optimization Candidates

```javascript
// Components over 10KB
const candidates = search.components
  .filter(c => c.file_size_bytes > 10000)
  .sort((a, b) => b.file_size_bytes - a.file_size_bytes);

candidates.forEach(c => {
  console.log(`${c.name}: ${c.file_size_bytes} bytes`);
});
```

### Analyze Technology Stack Distribution

```javascript
const techCounts = {};
search.components.forEach(c => {
  c.technology?.forEach(tech => {
    techCounts[tech] = (techCounts[tech] || 0) + 1;
  });
});

console.log('Technology usage:');
Object.entries(techCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([tech, count]) => {
    console.log(`  ${tech}: ${count} components`);
  });
```

Output:
```
Technology usage:
  react: 16 components
  framer-motion: 8 components
  styled-components: 8 components
  react-router: 6 components
  three.js: 1 component
```

---

## File Quick Reference

### Main Metadata Files
- `/src/metadata/taxonomy.json` - Vocabulary definitions
- `/src/metadata/components.json` - Manual component metadata
- `/src/metadata/generated.json` - Auto-generated (git ignore)

### Scripts
- `/scripts/generate-metadata.js` - Auto-generation tool

### Utilities
- `/src/utils/componentSearch.js` - Search class
- `/src/utils/componentSearch.test.js` - Tests (optional)

---

## Useful Commands

```bash
# Generate metadata automatically
npm run generate-metadata

# Build with auto-generation
npm run build

# (If you add these to package.json)
```

---

## Common Mistakes to Avoid

### ❌ Inconsistent Technology Names
```javascript
// Bad - spelling varies
technology: ["ReactRouter", "react-router", "Router"]

// Good - consistent
technology: ["react-router"]
```

### ❌ Vague Descriptions
```javascript
// Bad
description: "Component for stuff"

// Good
description: "Route-reactive line animation system with 6 animation variants"
```

### ❌ Missing Tags
```javascript
// Bad
tags: []

// Good
tags: ["animation", "route-reactive", "decorative"]
```

### ❌ Wrong Performance Classification
```javascript
// Bad - ShaderVisual is not "light"
performance: "light"

// Good
performance: "heavy"
```

### ❌ Orphaned Metadata
```javascript
// Bad - component deleted but metadata remains
{
  "id": "deleted-component",
  "status": "active"
}

// Good
{
  "id": "deleted-component",
  "status": "deprecated"  // Mark as deprecated before removing
}
```

---

## Integration with IDE

### VS Code

Add to `.vscode/settings.json`:

```json
{
  "editor.snippets.customSnippets": {
    "javascript": ".vscode/metadata.snippets.json"
  }
}
```

Create `.vscode/metadata.snippets.json`:

```json
{
  "JSDoc Metadata Tag": {
    "prefix": "metadata",
    "body": [
      "/**",
      " * $1",
      " *",
      " * @component ${TM_FILENAME_BASE}",
      " * @metadata {",
      " *   \"type\": \"${2|component,page,utility,data|}\",",
      " *   \"technology\": [\"${3|react,framer-motion,three.js|}\"],",
      " *   \"performance\": \"${4|light,medium,heavy|}\",",
      " *   \"scope\": \"${5|global,route-specific,project-specific|}\",",
      " *   \"status\": \"active\"",
      " * }",
      " * @tags $6",
      " */",
      ""
    ],
    "description": "Add JSDoc metadata tag"
  }
}
```

Now type `metadata` in any JS file to insert template!

---

## Decision Trees

### Deciding Component Type

```
Is it a route?
  ├─ Yes → type: "page"
  └─ No ─→ Is it reusable across multiple files?
           ├─ Yes → type: "component"
           └─ No ──→ Is it styling/configuration?
                    ├─ Yes → type: "utility"
                    └─ No ──→ type: "data"
```

### Deciding Performance Impact

```
File size?
  ├─ >15KB → Start with "heavy"
  ├─ 8-15KB → Start with "medium"
  └─ <8KB → Start with "light"

Does it run continuously?
  ├─ Yes (like ShaderVisual) → "heavy"
  └─ No ──→ Keep initial estimate

Can it be lazy loaded?
  ├─ No (critical path) → Keep as-is
  └─ Yes → Could reduce impact with code-splitting
```

### Deciding Scope

```
Used in multiple routes?
  ├─ Yes ──→ scope: "global"
  └─ No ────→ Is it used in one route?
             ├─ Yes → scope: "route-specific"
             └─ No ──→ Is it used in one project?
                      ├─ Yes → scope: "project-specific"
                      └─ No ──→ scope: "global" (probably)
```

---

## Validation Checklist

Before committing metadata changes:

```
☐ All metadata fields present
☐ File path is correct and exists
☐ Type is from approved list
☐ Technology uses approved terms
☐ Performance is logical (heavy components > 15KB, etc.)
☐ Scope makes sense (global components used across app, etc.)
☐ Status is correct (active for production code)
☐ Tags are relevant and from approved list
☐ Description is clear and specific
☐ No typos in component names
☐ URL escaping correct (spaces → hyphens)
```

---

## Next Steps

1. **Now**: Copy taxonomy and components JSON from Implementation Guide
2. **Today**: Add JSDoc tags to 5 core components
3. **This Week**: Create search utility and run first auto-generation
4. **Next Week**: Add to build process
5. **Monthly**: Review and update metadata

**Questions?** Check the full research document at:
`/METADATA_TAGGING_RESEARCH.md`

**Implementation details?** Check the implementation guide at:
`/METADATA_IMPLEMENTATION_GUIDE.md`

