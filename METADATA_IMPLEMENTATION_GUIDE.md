# Metadata & Tagging Implementation Guide
## Step-by-Step for Your Portfolio

**Target**: Implement searchable, filterable component metadata with minimal effort

---

## Quick Start (30 Minutes)

### Step 1: Create Taxonomy File

Create `/src/metadata/taxonomy.json`:

```json
{
  "version": "1.0",
  "last_updated": "2025-11-22",
  "taxonomy": {
    "type": {
      "label": "Component Type",
      "values": [
        { "id": "page", "label": "Page", "icon": "📄" },
        { "id": "component", "label": "Component", "icon": "🧩" },
        { "id": "utility", "label": "Utility", "icon": "🔧" },
        { "id": "data", "label": "Data/Config", "icon": "📊" }
      ]
    },
    "technology": {
      "label": "Technology Stack",
      "values": [
        { "id": "react", "label": "React", "version": "18.2.0" },
        { "id": "react-router", "label": "React Router", "version": "7.0.2" },
        { "id": "framer-motion", "label": "Framer Motion", "version": "11.15.0" },
        { "id": "styled-components", "label": "Styled Components", "version": "6.1.13" },
        { "id": "three.js", "label": "Three.js", "version": "0.171.0" }
      ]
    },
    "performance": {
      "label": "Performance Impact",
      "values": [
        { "id": "heavy", "label": "Heavy", "description": "Significant impact", "color": "red" },
        { "id": "medium", "label": "Medium", "description": "Moderate impact", "color": "yellow" },
        { "id": "light", "label": "Light", "description": "Minimal impact", "color": "green" }
      ]
    },
    "scope": {
      "label": "Component Scope",
      "values": [
        { "id": "global", "label": "Global", "description": "Used across app" },
        { "id": "route-specific", "label": "Route-Specific", "description": "Used on specific routes" },
        { "id": "project-specific", "label": "Project-Specific", "description": "Used for one project" }
      ]
    },
    "status": {
      "label": "Component Status",
      "values": [
        { "id": "active", "label": "Active", "badge": "✓" },
        { "id": "deprecated", "label": "Deprecated", "badge": "⚠" },
        { "id": "refactoring", "label": "Refactoring", "badge": "🔄" },
        { "id": "experimental", "label": "Experimental", "badge": "🧪" }
      ]
    }
  }
}
```

### Step 2: Create Component Metadata File

Create `/src/metadata/components.json`:

```json
{
  "version": "1.0",
  "generated_at": "2025-11-22T10:00:00Z",
  "last_manual_update": "2025-11-22",
  "note": "This file is partially auto-generated and manually enhanced",
  "components": [
    {
      "id": "app",
      "name": "App",
      "file": "src/App.jsx",
      "type": "component",
      "description": "Root application component with routing and layout",
      "technology": ["react", "react-router", "framer-motion"],
      "performance": "light",
      "scope": "global",
      "status": "active",
      "tags": ["routing", "layout", "page-transitions"],
      "file_size_bytes": 5873,
      "imports_count": 12,
      "last_updated": "2025-11-21"
    },
    {
      "id": "cursor",
      "name": "Cursor",
      "file": "src/Cursor.jsx",
      "type": "component",
      "description": "Custom animated cursor with ring and dot, follows mouse with lag effect",
      "technology": ["react"],
      "performance": "light",
      "scope": "global",
      "status": "active",
      "tags": ["cursor", "interaction", "animation", "custom"],
      "file_size_bytes": 3842,
      "imports_count": 1,
      "last_updated": "2025-11-21"
    },
    {
      "id": "line",
      "name": "Line",
      "file": "src/components/Line.jsx",
      "type": "component",
      "description": "Route-reactive decorative line animation system with 6 animation variants",
      "technology": ["react", "framer-motion", "react-router"],
      "performance": "medium",
      "scope": "global",
      "status": "active",
      "tags": ["animation", "route-reactive", "decorative", "keyframe-animations"],
      "file_size_bytes": 9482,
      "imports_count": 6,
      "related_to": ["ShaderVisual", "Navbar"],
      "last_updated": "2025-11-21"
    },
    {
      "id": "navbar",
      "name": "Navbar",
      "file": "src/components/Navbar.jsx",
      "type": "component",
      "description": "Left sidebar navigation with links to main pages",
      "technology": ["react", "react-router"],
      "performance": "light",
      "scope": "global",
      "status": "active",
      "tags": ["navigation", "sidebar"],
      "file_size_bytes": 2156,
      "imports_count": 3,
      "last_updated": "2025-11-21"
    },
    {
      "id": "shader-visual",
      "name": "ShaderVisual",
      "file": "src/components/ShaderVisual.jsx",
      "type": "component",
      "description": "Three.js WebGL background with custom GLSL shaders and Truchet patterns",
      "technology": ["react", "three.js"],
      "performance": "heavy",
      "scope": "global",
      "status": "active",
      "tags": ["3d", "shader", "webgl", "gpu-accelerated", "background"],
      "file_size_bytes": 7480,
      "imports_count": 2,
      "notes": "Runs continuously, consider device detection and pause on tab hidden",
      "last_updated": "2025-11-21"
    },
    {
      "id": "shared-styles",
      "name": "sharedStyles",
      "file": "src/components/sharedStyles.js",
      "type": "utility",
      "description": "Centralized library of 18 reusable styled-components for project detail pages",
      "technology": ["styled-components"],
      "performance": "light",
      "scope": "global",
      "status": "active",
      "tags": ["styling", "components-library", "shared-utilities"],
      "file_size_bytes": 8952,
      "exports": 18,
      "last_updated": "2025-11-21"
    },
    {
      "id": "hero",
      "name": "Hero",
      "file": "src/components/Hero.jsx",
      "type": "page",
      "description": "Landing page with title and animated text carousel",
      "technology": ["react"],
      "performance": "light",
      "scope": "route-specific",
      "status": "active",
      "tags": ["landing-page", "hero"],
      "file_size_bytes": 3921,
      "route": "/",
      "last_updated": "2025-11-21"
    },
    {
      "id": "about",
      "name": "About",
      "file": "src/components/About.jsx",
      "type": "page",
      "description": "Personal bio and narrative page",
      "technology": ["react"],
      "performance": "light",
      "scope": "route-specific",
      "status": "active",
      "tags": ["about", "biography"],
      "file_size_bytes": 3645,
      "route": "/about",
      "last_updated": "2025-11-21"
    },
    {
      "id": "projects",
      "name": "Projects",
      "file": "src/components/Projects.jsx",
      "type": "page",
      "description": "Main project gallery with hover preview and responsive grid",
      "technology": ["react", "styled-components"],
      "performance": "medium",
      "scope": "route-specific",
      "status": "active",
      "tags": ["gallery", "projects", "preview"],
      "file_size_bytes": 11235,
      "route": "/projects",
      "last_updated": "2025-11-21"
    },
    {
      "id": "archive",
      "name": "Archive",
      "file": "src/components/Archive.jsx",
      "type": "page",
      "description": "Horizontal scrolling archive gallery with custom wheel-to-horizontal mapping",
      "technology": ["react", "styled-components"],
      "performance": "medium",
      "scope": "route-specific",
      "status": "active",
      "tags": ["gallery", "archive", "scroll", "horizontal"],
      "file_size_bytes": 11856,
      "route": "/archive",
      "note": "Data currently hardcoded - should be externalized to /src/data/archive.js",
      "last_updated": "2025-11-21"
    },
    {
      "id": "contact",
      "name": "Contact",
      "file": "src/components/Contact.jsx",
      "type": "page",
      "description": "Contact information page with social links",
      "technology": ["react"],
      "performance": "light",
      "scope": "route-specific",
      "status": "active",
      "tags": ["contact"],
      "file_size_bytes": 2145,
      "route": "/contact",
      "last_updated": "2025-11-21"
    },
    {
      "id": "app-slider",
      "name": "AppSlider",
      "file": "src/components/AppSlider.jsx",
      "type": "component",
      "description": "Infinite scrolling text carousel with job title labels",
      "technology": ["react", "styled-components"],
      "performance": "light",
      "scope": "route-specific",
      "status": "active",
      "tags": ["carousel", "animation", "text-scroller"],
      "file_size_bytes": 3456,
      "last_updated": "2025-11-21"
    },
    {
      "id": "next-project",
      "name": "NextProject",
      "file": "src/components/NextProject.jsx",
      "type": "component",
      "description": "Project navigation widget showing preview of next project",
      "technology": ["react", "react-router"],
      "performance": "light",
      "scope": "project-specific",
      "status": "active",
      "tags": ["navigation", "widget", "project-detail"],
      "file_size_bytes": 6234,
      "used_by": ["all project detail pages"],
      "last_updated": "2025-11-21"
    },
    {
      "id": "grove",
      "name": "Grove",
      "file": "src/components/Projectfiles/Grove.jsx",
      "type": "page",
      "description": "AI-powered matching platform project detail page with narrative structure",
      "technology": ["react", "framer-motion", "styled-components"],
      "performance": "medium",
      "scope": "project-specific",
      "status": "active",
      "tags": ["project-detail", "ai-project", "narrative", "interactive"],
      "file_size_bytes": 13872,
      "route": "/projects/Grove",
      "project_name": "Grove",
      "project_type": "AI Matching Platform",
      "last_updated": "2025-11-21"
    },
    {
      "id": "capsule-machine",
      "name": "CapsuleMachine",
      "file": "src/components/Projectfiles/CapsuleMachine.jsx",
      "type": "page",
      "description": "Interactive installation project detail page",
      "technology": ["react", "framer-motion", "styled-components"],
      "performance": "medium",
      "scope": "project-specific",
      "status": "active",
      "tags": ["project-detail", "installation", "interactive"],
      "file_size_bytes": 18799,
      "route": "/projects/CapsuleMachine",
      "project_name": "Capsule Machine",
      "project_type": "Interactive Installation",
      "last_updated": "2025-11-21"
    },
    {
      "id": "the-collection",
      "name": "Collection",
      "file": "src/components/Projectfiles/Collection.jsx",
      "type": "page",
      "description": "Film portfolio project detail page",
      "technology": ["react", "framer-motion", "styled-components"],
      "performance": "medium",
      "scope": "project-specific",
      "status": "active",
      "tags": ["project-detail", "film", "portfolio"],
      "file_size_bytes": 13389,
      "route": "/projects/TheCollection",
      "project_name": "The Collection",
      "project_type": "Film Portfolio",
      "last_updated": "2025-11-21"
    },
    {
      "id": "ark",
      "name": "Ark",
      "file": "src/components/Projectfiles/Ark.jsx",
      "type": "page",
      "description": "Skincare wearable technology project detail page",
      "technology": ["react", "framer-motion", "styled-components"],
      "performance": "medium",
      "scope": "project-specific",
      "status": "active",
      "tags": ["project-detail", "wearable", "technology"],
      "file_size_bytes": 12015,
      "route": "/projects/Ark",
      "project_name": "Ark",
      "project_type": "Skincare Wearable",
      "last_updated": "2025-11-21"
    },
    {
      "id": "alaina-pamela",
      "name": "AP",
      "file": "src/components/Projectfiles/AP.jsx",
      "type": "page",
      "description": "Film internship experience project detail page",
      "technology": ["react", "framer-motion", "styled-components"],
      "performance": "medium",
      "scope": "project-specific",
      "status": "active",
      "tags": ["project-detail", "film", "internship"],
      "file_size_bytes": 11053,
      "route": "/projects/AlainaPamela",
      "project_name": "Alaina Pamela",
      "project_type": "Film Internship",
      "last_updated": "2025-11-21"
    },
    {
      "id": "lens",
      "name": "Lens",
      "file": "src/components/Projectfiles/Lens.jsx",
      "type": "page",
      "description": "Project detail page for Lens project",
      "technology": ["react", "framer-motion", "styled-components"],
      "performance": "medium",
      "scope": "project-specific",
      "status": "active",
      "tags": ["project-detail"],
      "file_size_bytes": 8234,
      "route": "/projects/Lens",
      "note": "⚠️ Has route in App.jsx but NOT in projectname.jsx data - needs resolution",
      "last_updated": "2025-11-21"
    },
    {
      "id": "projectname",
      "name": "projectname",
      "file": "src/data/projectname.jsx",
      "type": "data",
      "description": "Central registry of all projects with metadata (6 projects)",
      "technology": ["react"],
      "performance": "light",
      "scope": "global",
      "status": "active",
      "tags": ["data", "central-registry", "projects"],
      "file_size_bytes": 1456,
      "note": "Single source of truth for project data - critical file",
      "last_updated": "2025-11-21"
    }
  ]
}
```

### Step 3: Add JSDoc Tags to Top Components

Update `/src/components/Line.jsx`:

```javascript
/**
 * Route-Reactive Line Animation System
 *
 * Displays animated decorative lines that change based on the current route.
 * Uses Framer Motion variants for smooth transitions between 6 different
 * animation states corresponding to different pages.
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
 * @tags animation, decorative, route-reactive, keyframe-animations
 *
 * @example
 * import Line from './components/Line';
 * <Line />
 *
 * @performance Medium - Animates on route change, runs for ~1s per transition
 * @note Simplified from 390 → 184 lines in Nov 2025 optimization
 */
const Line = () => {
  // ... component code
}
```

Update `/src/components/ShaderVisual.jsx`:

```javascript
/**
 * Three.js WebGL Animated Background
 *
 * Renders a dynamic 3D background using Three.js with custom GLSL shaders.
 * Features Truchet tile patterns, mouse-interactive lighting, and time-based animations.
 * Runs continuously via requestAnimationFrame.
 *
 * @component ShaderVisual
 * @metadata {
 *   "type": "component",
 *   "technology": ["react", "three.js"],
 *   "purpose": ["rendering", "visual-effects"],
 *   "performance": "heavy",
 *   "scope": "global",
 *   "status": "active"
 * }
 * @tags 3d, shader, webgl, gpu-accelerated, background
 *
 * @performance Heavy - Continuous GPU rendering, ~60fps target
 * @warning May drain battery on laptops. Consider:
 *   - Device detection (disable on mobile)
 *   - Pause when tab hidden (visibility API)
 *   - Fallback for devices without WebGL support
 *
 * @note Shaders extracted to .glsl files in Nov 2025 optimization
 */
const ShaderVisual = () => {
  // ... component code
}
```

### Step 4: Done!

You now have:
- ✅ Taxonomy definitions
- ✅ Component metadata
- ✅ Documentation comments
- ✅ Searchable reference guide

**Total time**: ~30 minutes

---

## Step 5: Create Search Utility (Optional, 15 min)

Create `/src/utils/componentSearch.js`:

```javascript
/**
 * Component Metadata Search Utility
 *
 * Provides searching and filtering of component metadata
 */

import metadata from '../metadata/components.json';

class ComponentSearch {
  constructor(components = metadata.components) {
    this.components = components;
    this.buildIndex();
  }

  buildIndex() {
    this.index = new Map();

    this.components.forEach(comp => {
      // Index by type
      this.addToIndex('type', comp.type, comp.id);

      // Index by technology
      comp.technology?.forEach(tech => {
        this.addToIndex('technology', tech, comp.id);
      });

      // Index by performance
      this.addToIndex('performance', comp.performance, comp.id);

      // Index by scope
      this.addToIndex('scope', comp.scope, comp.id);

      // Index by status
      this.addToIndex('status', comp.status, comp.id);

      // Index by tags
      comp.tags?.forEach(tag => {
        this.addToIndex('tag', tag, comp.id);
      });
    });
  }

  addToIndex(facet, value, componentId) {
    const key = `${facet}:${value}`;
    if (!this.index.has(key)) {
      this.index.set(key, new Set());
    }
    this.index.get(key).add(componentId);
  }

  /**
   * Search by single facet
   * @example searchByFacet('type', 'component')
   */
  searchByFacet(facet, value) {
    const key = `${facet}:${value}`;
    const ids = this.index.get(key);
    return ids ? this.components.filter(c => ids.has(c.id)) : [];
  }

  /**
   * Search by multiple facets (AND logic)
   * @example searchByFacets({ technology: 'react', performance: 'heavy' })
   */
  searchByFacets(filters) {
    let results = new Set(this.components.map(c => c.id));

    for (const [facet, values] of Object.entries(filters)) {
      const valuesArray = Array.isArray(values) ? values : [values];
      let facetResults = new Set();

      valuesArray.forEach(value => {
        const key = `${facet}:${value}`;
        const ids = this.index.get(key);
        ids?.forEach(id => facetResults.add(id));
      });

      // Intersection with previous results
      results = new Set([...results].filter(id => facetResults.has(id)));
    }

    return this.components.filter(c => results.has(c.id));
  }

  /**
   * Text search across name, description, and tags
   */
  search(query) {
    const q = query.toLowerCase();
    return this.components.filter(comp =>
      comp.name?.toLowerCase().includes(q) ||
      comp.description?.toLowerCase().includes(q) ||
      comp.tags?.some(tag => tag.toLowerCase().includes(q)) ||
      comp.file?.toLowerCase().includes(q)
    );
  }

  /**
   * Get all possible values for a facet
   */
  getFacetValues(facet) {
    const values = new Set();
    this.components.forEach(comp => {
      const value = comp[facet];
      if (Array.isArray(value)) {
        value.forEach(v => values.add(v));
      } else if (value) {
        values.add(value);
      }
    });
    return Array.from(values).sort();
  }

  /**
   * Get all unique technologies used
   */
  getTechnologies() {
    return this.getFacetValues('technology');
  }

  /**
   * Get all types
   */
  getTypes() {
    return this.getFacetValues('type');
  }

  /**
   * Get all tags
   */
  getAllTags() {
    const tags = new Set();
    this.components.forEach(comp => {
      comp.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  /**
   * Find heavy components (optimization candidates)
   */
  findHeavyComponents() {
    return this.searchByFacet('performance', 'heavy');
  }

  /**
   * Find components by technology
   */
  findByTechnology(tech) {
    return this.searchByFacet('technology', tech);
  }

  /**
   * Find global components
   */
  findGlobalComponents() {
    return this.searchByFacet('scope', 'global');
  }

  /**
   * Get component by ID or name
   */
  getComponent(idOrName) {
    return this.components.find(c =>
      c.id === idOrName || c.name === idOrName
    );
  }
}

// Export singleton instance
export default new ComponentSearch();

// Also export class for testing/custom instances
export { ComponentSearch };
```

### Step 6: Add to .gitignore

Update `.gitignore`:

```
# Metadata
src/metadata/generated.json
```

---

## Usage Examples

### Example 1: Find All React Components

```javascript
import search from './utils/componentSearch';

const reactComponents = search.findByTechnology('react');
console.log(reactComponents);
// → [App, Cursor, Line, Navbar, Hero, About, ...]
```

### Example 2: Find Heavy Components

```javascript
const heavy = search.findHeavyComponents();
console.log(heavy.map(c => `${c.name} (${c.file_size_bytes} bytes)`));
// → [ShaderVisual, CapsuleMachine, Archive, ...]
```

### Example 3: Find by Multiple Criteria

```javascript
const results = search.searchByFacets({
  technology: 'react',
  performance: 'light',
  scope: 'global'
});
// → Find lightweight global React components
```

### Example 4: Text Search

```javascript
const animated = search.search('animation');
console.log(animated.map(c => c.name));
// → [Line, Archive, CapsuleMachine, ...]
```

---

## Automation: Generate Metadata Script

Create `/scripts/generate-metadata.js`:

```javascript
#!/usr/bin/env node

/**
 * Metadata Generation Script
 * Scans component files and generates metadata automatically
 */

const fs = require('fs');
const path = require('path');

const COMPONENT_DIR = path.join(__dirname, '../src/components');
const OUTPUT_FILE = path.join(__dirname, '../src/metadata/generated.json');

const TECHNOLOGY_PATTERNS = {
  'react': /from ['"]react['"]|import React|useState|useEffect|useRef/,
  'react-router': /useNavigate|useLocation|from ['"]react-router/,
  'framer-motion': /motion\.|from ['"]framer-motion['"]|variants/,
  'styled-components': /styled\.|from ['"]styled-components['"]|css`/,
  'three.js': /from ['"]three['"]|THREE\./,
};

function getSizeCategory(bytes) {
  if (bytes > 15000) return 'heavy';
  if (bytes > 8000) return 'medium';
  return 'light';
}

function extractTechnologies(content) {
  return Object.entries(TECHNOLOGY_PATTERNS)
    .filter(([_, pattern]) => pattern.test(content))
    .map(([tech, _]) => tech);
}

function inferType(filename) {
  if (filename[0] === filename[0].toUpperCase()) {
    return 'component';  // PascalCase
  } else if (filename.includes('Data') || filename === 'projectname.jsx') {
    return 'data';
  }
  return 'utility';
}

function scanComponents(dir, relativePath = '') {
  const results = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const newRelative = path.join(relativePath, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      results.push(...scanComponents(fullPath, newRelative));
    } else if (entry.isFile() && entry.name.match(/\.(jsx|js)$/)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const bytes = Buffer.byteLength(content, 'utf8');
        const technologies = extractTechnologies(content);
        const type = inferType(entry.name);

        const metadata = {
          id: entry.name.replace(/\.[^.]*$/, '').toLowerCase(),
          name: entry.name.replace(/\.(jsx|js)$/, ''),
          file: path.relative(path.join(__dirname, '../'), fullPath),
          type: type,
          technology: technologies,
          performance: getSizeCategory(bytes),
          file_size_bytes: bytes,
          last_generated: new Date().toISOString()
        };

        results.push(metadata);
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error.message);
      }
    }
  }

  return results;
}

// Main execution
console.log('🔍 Scanning component directory...');
const components = scanComponents(COMPONENT_DIR);

const output = {
  version: '1.0',
  generated_at: new Date().toISOString(),
  note: 'Auto-generated by scripts/generate-metadata.js - manual metadata may override',
  count: components.length,
  components
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`✅ Generated metadata for ${components.length} components`);
console.log(`📁 Written to ${OUTPUT_FILE}`);
```

Make it executable and add to package.json:

```bash
chmod +x scripts/generate-metadata.js
```

Update `package.json`:

```json
{
  "scripts": {
    "generate-metadata": "node scripts/generate-metadata.js",
    "prebuild": "npm run generate-metadata",
    "build": "vite build"
  }
}
```

---

## Maintenance Checklist

### When Adding a New Component

- [ ] Add entry to `/src/metadata/components.json` (or wait for auto-generation)
- [ ] Add JSDoc `@metadata` tag with core fields
- [ ] Add relevant `@tags` for discoverability
- [ ] Run `npm run generate-metadata` to validate

### Monthly Review (5 minutes)

- [ ] Run `npm run generate-metadata`
- [ ] Compare generated vs manual metadata
- [ ] Update any stale descriptions
- [ ] Add newly discovered patterns to taxonomy

### Quarterly Review (15 minutes)

- [ ] Review tag usage - consolidate similar tags
- [ ] Remove deprecated components from metadata
- [ ] Update status of components in refactoring
- [ ] Add new taxonomy values if needed

---

## Troubleshooting

### Q: Generated metadata doesn't match manual metadata?

**A**: This is expected! Manual metadata takes priority. The generation script provides a baseline.

**Solution**:
1. Keep manual metadata for important/complex components
2. Use generated metadata as starting point
3. Diff to find missing information

### Q: Tags are inconsistent?

**A**: Taxonomy not enforced yet.

**Solution**:
1. Review `taxonomy.json` values
2. Update components to use exact terms
3. Consider building validation script

### Q: How do I know if metadata is accurate?

**A**: Test it!

```javascript
import search from './utils/componentSearch';

// Find all react components
const react = search.findByTechnology('react');
console.log(react.length); // Should be ~15

// Find heavy components
const heavy = search.findHeavyComponents();
console.log(heavy.map(c => c.name)); // Should include ShaderVisual
```

---

## Next Steps

### Immediate (This Week)
- [ ] Create metadata files from templates above
- [ ] Add JSDoc tags to 5 core components
- [ ] Run `generate-metadata.js` manually to verify

### Soon (Next Week)
- [ ] Create `/src/utils/componentSearch.js` from template
- [ ] Add `prebuild` hook to package.json
- [ ] Test automatic generation in build process

### Later (Next Month)
- [ ] Build React UI component for search
- [ ] Create documentation of metadata for team
- [ ] Set up quarterly metadata review process

---

## File Structure Summary

After implementation, your metadata structure will be:

```
src/
├── metadata/
│   ├── taxonomy.json          # Controlled vocabulary definitions
│   ├── components.json        # Manual component metadata
│   └── generated.json         # Auto-generated (ignored in git)
├── utils/
│   └── componentSearch.js     # Search utility class
└── components/
    ├── Line.jsx              # With @metadata JSDoc
    ├── ShaderVisual.jsx      # With @metadata JSDoc
    └── ...

scripts/
└── generate-metadata.js       # Automation script
```

---

## Success Criteria

✅ **Complete when**:
1. `src/metadata/components.json` exists with at least 16 components documented
2. `src/metadata/taxonomy.json` defines controlled vocabulary
3. At least 5 components have JSDoc `@metadata` tags
4. `src/utils/componentSearch.js` enables basic searching
5. `npm run generate-metadata` runs without errors

**Estimated total time**: 1-2 hours for complete implementation

