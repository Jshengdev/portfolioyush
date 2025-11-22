# Metadata & Tagging Systems Research
## For Portfolio Code Documentation

**Document Version**: 1.0
**Date**: 2025-11-22
**Research Focus**: Taxonomy design, metadata extraction, and searchable code organization

---

## Table of Contents
1. [Taxonomy Design Principles](#taxonomy-design-principles)
2. [Core Taxonomies: Folksonomy vs Controlled Vocabulary](#core-taxonomies-folksonomy-vs-controlled-vocabulary)
3. [Faceted Classification Systems](#faceted-classification-systems)
4. [Hierarchical vs Flat Tagging](#hierarchical-vs-flat-tagging)
5. [Automatic Metadata Extraction](#automatic-metadata-extraction)
6. [Semantic Tagging Approaches](#semantic-tagging-approaches)
7. [Real-World Examples](#real-world-examples)
8. [Recommended Implementation for Your Portfolio](#recommended-implementation-for-your-portfolio)
9. [Metadata Schema Design](#metadata-schema-design)
10. [Tag Hierarchy for Portfolio](#tag-hierarchy-for-portfolio)
11. [Automatic Generation Strategies](#automatic-generation-strategies)
12. [Searchability & Filtering](#searchability--filtering)
13. [Minimal Effective Metadata Patterns](#minimal-effective-metadata-patterns)

---

## Taxonomy Design Principles

### What is a Taxonomy?

A taxonomy is a **closed list of acceptable terms** that are:
- Arranged hierarchically
- Used to describe and classify content
- Called **controlled vocabularies** in information science
- Purpose-driven for specific consumer audiences

**Key Benefit**: Allows precise content retrieval through consistent, standardized descriptive metadata.

### Core Design Principles (MECE Framework)

#### **1. MECE Principle** (Mutually Exclusive, Collectively Exhaustive)
- **Mutually Exclusive**: Each item belongs to only ONE category (at that level)
- **Collectively Exhaustive**: All items fit into the taxonomy (no orphans)
- **Benefit**: Makes categorization unambiguous and complete

**Example for Portfolio**:
```
Components (Mutually Exclusive):
├── Layout Components
├── Feature Components
├── Page Components
└── Utility Components

NOT GOOD (overlapping):
├── Interactive Components
├── Animations Components  ← Could be interactive + animated
└── Visual Components     ← Could contain animations
```

#### **2. Purpose-Driven Design**
**Rule**: Define taxonomy purpose BEFORE designing it

**Purposes for Your Portfolio**:
- Navigation & discovery (for users)
- Performance analysis (for development)
- Dependency tracking (for refactoring)
- Asset management (for optimization)
- Documentation organization (for future devs)

**Design Changes Based on Purpose**:
```
NAVIGATION PURPOSE: Users should find projects by medium
├── Film Projects
├── Web Projects
├── Installation Projects
└── Design Projects

PERFORMANCE PURPOSE: Code should be organized by rendering impact
├── Heavy Components (Shaders, 3D)
├── Medium Components (Animations, Lists)
└── Light Components (Layout, Text)
```

#### **3. Content & User Focus**
- Design concepts based on **actual content** in portfolio
- Create relationships that **guide users** to relevant items
- Consider both expert and novice terminology

**Content-Focused Example**:
```
✓ GOOD (based on actual content):
"Grove" → AI Project, Interactive, Web, 13.8KB
"Capsule Machine" → Installation, Interactive, Physics, 18.8KB

✗ BAD (generic):
"Project1", "Project2"
```

#### **4. Consistency & Governance**
- Use consistent terminology across all metadata
- Define clear rules for tagging
- Establish single source of truth

**Governance for Your Portfolio**:
```
Rule 1: Always use kebab-case for tags
Rule 2: Technology tags must be from approved list
Rule 3: Component tags must match actual file structure
Rule 4: All new components require at least 3 tags
```

#### **5. Simplicity & Maintainability**
- Start small: 10-20 core tags
- Expand gradually: Add tags as patterns emerge
- Remove unused tags: Quarterly review

**Your Portfolio - Start Simple**:
```
CORE TAGS (15 total):
Technology: react, three, framer-motion, styled-components
Type: component, page, utility, layout, feature
Scope: global, route-specific, project-specific
Performance: heavy, medium, light
Status: active, deprecated, refactoring
```

---

## Core Taxonomies: Folksonomy vs Controlled Vocabulary

### Folksonomy (User-Generated Tagging)

**Definition**: Free-form tagging where users create tags without restrictions

**Characteristics**:
- No predefined list
- Users create tags naturally
- Multiple terms for same concept (synonyms)
- Emerges from actual usage patterns

**Advantages**:
- Captures real user language
- Highly adaptable
- Low barrier to entry
- Finds long-tail relationships

**Disadvantages**:
- Inconsistent terminology
- Difficult to navigate (100+ variations of "animation")
- Poor data quality
- Hard to automate searching

**Example (Bad for Code)**:
```
React component tags created by different developers:
- "hook"
- "hooks"
- "custom hook"
- "custom-hook"
- "react-hook"
All mean same thing = searchability nightmare
```

### Controlled Vocabulary (Taxonomy)

**Definition**: Pre-defined list of acceptable terms managed by domain experts

**Characteristics**:
- Predefined terms only
- Consistency enforced
- Relationships defined upfront
- Expert-managed vocabulary

**Advantages**:
- Consistent across project
- Easy to search and filter
- Automation-friendly
- Scalable
- Enables sophisticated queries

**Disadvantages**:
- Slower to create
- Requires expert input
- Less flexible
- Takes time to learn

**Example (Good for Code)**:
```
Approved React component tags:
- "custom-hook" (not "hook", "hooks", "react-hook")
- "render-prop"
- "compound-component"
All developers use same term = excellent searchability
```

### Hybrid Approach (RECOMMENDED for Your Portfolio)

**Pattern**: Use controlled vocabulary + allow custom tags in specific categories

```json
{
  "tags": {
    "type": ["component", "page", "utility", "layout", "feature"],    // Controlled
    "technology": ["react", "three.js", "framer-motion", "..."],      // Controlled
    "custom": ["free-form", "tags", "allowed", "here"]               // Folksonomy
  }
}
```

**Best of Both Worlds**:
- Core tags are consistent (controlled vocabulary)
- Custom tags capture unique aspects (folksonomy)
- Can convert popular custom tags to official vocabulary over time

---

## Faceted Classification Systems

### What is Faceted Classification?

**Definition**: A system that classifies content across multiple **independent dimensions** (facets), allowing complex filtering combinations

**Key Concept**: Instead of one category path (hierarchical), an item has values in multiple facets

**Visual Analogy** (E-commerce):
```
One Item can have multiple facets:
- Color: Red
- Size: Large
- Brand: Nike
- Price: $80-$100
- Material: Cotton

You can filter by ANY combination:
"Show Red AND Large" → finds all matches
"Show Nike AND Cotton" → finds all matches
"Show Red AND Nike AND Large" → narrows further
```

### Why Faceted Classification for Code Documentation

**Traditional Hierarchical Problem**:
```
Grove Component could be in ONE place:
❌ /React/Interactive
❌ /AI-Projects/Grove
❌ /Animations/Framer

Where do you look? Depends on your mental model!
```

**Faceted Solution**:
```
Grove Component has values in MULTIPLE facets:

Facet: Type
  Value: "component"

Facet: Technology Stack
  Values: ["react", "framer-motion"]

Facet: Purpose
  Values: ["ai-matching", "interactive"]

Facet: Performance Impact
  Value: "medium"

Facet: File Location
  Value: "src/components/Projectfiles/Grove.jsx"

Search Examples:
- Find all "components" with "react" ✓ Works!
- Find "medium" performance "pages" ✓ Works!
- Find all files in "Projectfiles" ✓ Works!
```

### Faceted Classification Design for Your Portfolio

```yaml
Facets for Code:
  1. Component Type
     Values: [page, component, utility, layout, feature]
     Usage: Organize by structural role

  2. Technology
     Values: [react, react-router, framer-motion, three.js, styled-components]
     Usage: Filter by tech dependency

  3. Purpose
     Values: [navigation, animation, rendering, styling, data-management]
     Usage: Find components by function

  4. Performance Impact
     Values: [heavy, medium, light]
     Usage: Identify optimization targets

  5. Scope
     Values: [global, route-specific, project-specific]
     Usage: Understand component reach

  6. File Location
     Values: [components, pages, utilities, projectfiles]
     Usage: Navigate source tree

  7. Status
     Values: [active, deprecated, refactoring, experimental]
     Usage: Manage code lifecycle

Query Examples:
- Pages + Heavy Performance + Active
  → Find all active pages that need optimization

- Components + Framer-Motion + Route-Specific
  → Find animation components that are route-aware

- Utility + Light Performance
  → Find reusable helpers with minimal overhead
```

### Implementation Pattern for Faceted Search

**JSON Format**:
```json
{
  "file": "src/components/Line.jsx",
  "facets": {
    "type": "component",
    "technology": ["react", "framer-motion"],
    "purpose": ["animation", "navigation"],
    "performance": "medium",
    "scope": "global",
    "location": "components",
    "status": "active"
  }
}
```

**Filtering Logic**:
```javascript
// Find heavy components with react
const results = components.filter(c =>
  c.facets.technology.includes("react") &&
  c.facets.performance === "heavy"
);

// Find active utilities
const utils = components.filter(c =>
  c.facets.type === "utility" &&
  c.facets.status === "active"
);
```

---

## Hierarchical vs Flat Tagging

### Hierarchical Tagging (Tree Structure)

**Definition**: Tags organized in a parent-child hierarchy

**Visual Structure**:
```
Technology
├── Frontend
│   ├── React
│   │   ├── Hooks
│   │   ├── Components
│   │   └── Router
│   ├── Animation
│   │   ├── Framer-Motion
│   │   └── CSS-Animations
│   └── Styling
│       ├── Styled-Components
│       └── CSS-in-JS
└── Backend
    └── (not used in your portfolio)
```

**Advantages**:
- Shows concept relationships
- Narrows searches (drill down from broad to specific)
- Reflects natural organizational structure
- Good for large taxonomies (100+ tags)

**Disadvantages**:
- Rigid structure (item in ONE place)
- Not optimal for items fitting multiple categories
- Navigation requires knowing path
- Requires upfront design

**Example (Problem)**:
```
Framer-Motion could be under:
  Technology > Frontend > Animation > Framer-Motion
  OR
  Technology > Frontend > React-Libraries > Animation

Which path should users take?
```

### Flat Tagging (Simple List)

**Definition**: All tags are at same level, no hierarchy

**Visual Structure**:
```
Tags (all equal level):
react, framer-motion, styled-components,
animation, component, page, heavy, light,
active, deprecated, global, project-specific
```

**Advantages**:
- Simple to create and maintain
- Multiple tags per item (more flexible)
- No navigation complexity
- Good for discovery (browse all tags)
- Easy to implement

**Disadvantages**:
- All tags appear equal (no relationships)
- Can become overwhelming (500+ tags)
- Hard to understand concept connections
- Less effective for large taxonomies

**Example (Problem)**:
```
With 50+ flat tags, users don't see that:
- "animation" and "framer-motion" are related
- "component" and "page" are different role types
- "heavy" and "light" are performance-related
```

### Hybrid Approach (RECOMMENDED)

**Pattern**: Flat tags with implicit hierarchy through naming

```
Tags with semantic prefixes:
tech--react           ← Technology facet
tech--framer-motion
tech--three-js

type--component       ← Type facet
type--page
type--utility

perf--heavy          ← Performance facet
perf--light
perf--medium

status--active       ← Status facet
status--deprecated
status--refactoring
```

**Benefits**:
- Flat structure (simple to maintain)
- Implicit hierarchy through naming (relationships clear)
- Group-based filtering ("tech--*" gives all tech tags)
- Scales to 100+ tags without complexity

**Better Yet: Faceted + Flat**:
```
Combine faceted classification with flat tags:

{
  "file": "Line.jsx",
  "metadata": {
    "facets": {
      "type": "component",
      "technology": ["react", "framer-motion"],
      "performance": "medium"
    },
    "tags": [         ← Flat tags for flexibility
      "animation",
      "route-reactive",
      "decorative-system"
    ]
  }
}
```

### Decision Matrix: When to Use What

| Scenario | Recommendation | Reason |
|----------|---|---|
| < 30 tags | Flat | Simple, easy to manage |
| 30-100 tags | Flat with prefixes | Groups emerge naturally |
| 100+ tags | Hierarchical | Need structure to navigate |
| Complex relationships | Faceted | Better for filtering |
| Multiple categorization needs | Faceted + Flat | Best flexibility |
| **Your Portfolio** | **Faceted + Flat** | Mix of navigation, tech, and descriptive needs |

---

## Automatic Metadata Extraction

### Why Automate Metadata?

**Problem with Manual Metadata**:
- Time-consuming to create and maintain
- Gets stale as code evolves
- Inconsistent across team
- Easy to forget

**Solution**: Extract metadata automatically from code

**Research Finding**: Sourcegraph, GitHub, and modern documentation systems use automatic extraction combined with manual enhancement

### Extraction Strategies

#### **1. File System-Based Extraction**

**Source**: Directory structure itself contains metadata

**How It Works**:
```
Directory structure:
src/components/
├── Projectfiles/
│   ├── Grove.jsx        → location: "projectfiles"
│   ├── AP.jsx           → location: "projectfiles"
├── Hero.jsx             → location: "root"
└── Navbar.jsx           → location: "root"

Automatic extraction:
{
  "file": "Grove.jsx",
  "facets": {
    "location": "projectfiles"
  }
}
```

**Implementation** (Node.js):
```javascript
const path = require('path');
const fs = require('fs');

function extractLocationMetadata(filePath) {
  const relative = path.relative('src/components', filePath);
  const folders = relative.split(path.sep);

  return {
    location: folders.length > 1 ? folders[0] : 'root',
    isProjectFile: folders.includes('Projectfiles')
  };
}
```

#### **2. Filename Pattern Extraction**

**Source**: Filename conventions contain metadata

**How It Works**:
```
Filename patterns in your codebase:
- Grove.jsx           → Component (PascalCase)
- projectname.jsx     → Data file (camelCase)
- sharedStyles.js     → Shared utility (camelCase + 'Shared')
- theme.js            → Config (camelCase)

Automatic extraction:
{
  "file": "Grove.jsx",
  "facets": {
    "type": "component",        ← PascalCase = component
    "isShared": false,
    "isConfig": false
  }
}
```

**Implementation**:
```javascript
function extractTypeFromFilename(filename) {
  if (filename[0] === filename[0].toUpperCase()) {
    return 'component';  // PascalCase
  } else if (filename.includes('data') || filename === 'projectname.jsx') {
    return 'data';
  } else if (filename.includes('Config') || filename.includes('config')) {
    return 'config';
  } else if (filename.includes('Styles') || filename.includes('styles')) {
    return 'styles';
  }
  return 'utility';
}
```

#### **3. File Content Analysis**

**Source**: Code imports and exports tell us about dependencies

**How It Works**:
```javascript
// Line.jsx imports reveal its technology stack
import React from 'react';           → uses React
import styled from 'styled-components'; → uses styled-components
import { motion } from 'framer-motion'; → uses framer-motion
import { useLocation } from 'react-router-dom'; → uses routing

Automatic extraction:
{
  "file": "Line.jsx",
  "facets": {
    "technology": ["react", "framer-motion", "styled-components"]
  }
}
```

**Implementation**:
```javascript
const fs = require('fs');
const path = require('path');

function extractTechnology(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const technologies = [];

  const imports = {
    'react': /from ['"]react['"]|import React/,
    'framer-motion': /from ['"]framer-motion['"]|motion/,
    'styled-components': /from ['"]styled-components['"]|styled\./,
    'three.js': /from ['"]three['"]|THREE\./,
    'react-router': /from ['"]react-router[^']*['"]|useNavigate|useLocation/,
  };

  for (const [tech, regex] of Object.entries(imports)) {
    if (regex.test(content)) {
      technologies.push(tech);
    }
  }

  return technologies;
}
```

#### **4. Comment/JSDoc Extraction**

**Source**: Structured comments in code

**How It Works**:
```javascript
/**
 * Advanced line animation system for route transitions
 *
 * @component Line
 * @perf heavy
 * @scope global
 * @purpose animation, route-reactive
 * @tags route-reactive, decorative-system, animation
 */
const Line = () => { ... }
```

**Automatic Parsing**:
```javascript
function extractJSDocMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);

  if (!jsdocMatch) return {};

  const jsdoc = jsdocMatch[1];
  const metadata = {
    description: jsdoc.split('@')[0].trim(),
    performance: extractTag(jsdoc, '@perf'),
    scope: extractTag(jsdoc, '@scope'),
    purpose: extractTag(jsdoc, '@purpose')?.split(','),
    tags: extractTag(jsdoc, '@tags')?.split(',')
  };

  return metadata;
}

function extractTag(text, tag) {
  const match = text.match(new RegExp(`${tag}\\s+([^@]+)`, 'i'));
  return match?.[1]?.trim();
}
```

#### **5. File Size & Complexity Analysis**

**Source**: Static analysis of code

**How It Works**:
```javascript
function analyzeCodeComplexity(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const bytes = Buffer.byteLength(content, 'utf8');

  // Categorize by size
  if (bytes > 15000) return 'heavy';
  if (bytes > 8000) return 'medium';
  return 'light';
}
```

**Correlation with Performance**:
- Larger files → more code → more processing → heavier
- Accurate metric for your portfolio's optimization tracking

---

## Semantic Tagging Approaches

### What is Semantic Tagging?

**Definition**: Tags that capture **meaning and relationships** between content, not just labels

**vs Regular Tags**:
```
Regular Tags (Simple Labels):
- "animation"
- "react"
- "component"

Semantic Tags (Meaning + Relationships):
- "animation-system:route-reactive" (What + Where)
- "tech-dependency:react:v18" (Tech + Package + Version)
- "component-type:feature:ui-interaction" (Type + Role + Feature)
```

### Semantic Tagging in Knowledge Management

**Research Finding**: Modern KMS systems (Shelf, SKMT) use semantic layers to understand content relationships

**How It Works**:
```
Content: "Grove is an AI-powered matching component"

Regular tags:
- "grove"
- "ai"
- "component"
- "matching"

Semantic relationships:
- Grove instanceof Component ✓
- Grove uses AI ✓
- Grove purpose is Matching ✓
- Grove.technology includes React ✓
- Grove.file_size = "heavy" ✓
```

### Implementation Patterns for Your Portfolio

#### **Pattern 1: Entity-Based Tagging**

Tag items in relation to entities (components, technologies, projects)

```json
{
  "file": "Grove.jsx",
  "semantic_tags": {
    "entity_type": "React Component",
    "entities": [
      {
        "type": "Project",
        "value": "Grove",
        "relationship": "implements"
      },
      {
        "type": "Technology",
        "value": "Framer-Motion",
        "relationship": "uses"
      },
      {
        "type": "Technology",
        "value": "Styled-Components",
        "relationship": "uses"
      },
      {
        "type": "Pattern",
        "value": "Animation System",
        "relationship": "is-part-of"
      }
    ]
  }
}
```

#### **Pattern 2: Capability-Based Tagging**

Tag what a component CAN DO

```json
{
  "file": "ShaderVisual.jsx",
  "capabilities": [
    "renders-3d-graphics",
    "responds-to-mouse-movement",
    "animates-based-on-time",
    "uses-gpu-acceleration"
  ],
  "requires": [
    "gpu-capable-device",
    "webgl-support"
  ]
}
```

#### **Pattern 3: Impact-Based Tagging**

Tag the consequences of using a component

```json
{
  "file": "ShaderVisual.jsx",
  "impacts": {
    "performance": "heavy",
    "bundle_size": "significant",
    "device_compatibility": "limited",
    "battery_usage": "high",
    "visual_quality": "high"
  }
}
```

#### **Pattern 4: Relationship-Based Tagging**

Tag relationships to other code

```json
{
  "file": "Line.jsx",
  "relationships": {
    "depends_on": [
      "framer-motion",
      "react-router",
      "react"
    ],
    "used_by": [
      "App.jsx",
      "all-pages"
    ],
    "similar_to": [
      "Archive.jsx#custom-scroll"
    ],
    "related_to": [
      "ShaderVisual.jsx",
      "Cursor.jsx"
    ]
  }
}
```

### Semantic Tagging Schema for Your Portfolio

```javascript
{
  // File metadata
  "file": "Grove.jsx",
  "file_size_bytes": 13872,
  "lines_of_code": 380,

  // Semantic classification
  "semantic_type": "Project Detail Page",
  "semantic_role": "Present project information with narrative structure",

  // Entity relationships
  "entities": {
    "project": { name: "Grove", type: "ai-matching-platform" },
    "technologies": [
      { name: "React", version: "18.2.0", role: "framework" },
      { name: "Framer-Motion", version: "11.15.0", role: "animations" },
      { name: "Styled-Components", version: "6.1.13", role: "styling" }
    ],
    "patterns": ["project-detail-page", "narrative-structure", "scroll-animations"],
    "components": ["NextProject", "sharedStyles", "projectname data"]
  },

  // Capability semantics
  "capabilities": [
    "display-project-metadata",
    "render-narrative-content",
    "animate-on-scroll",
    "show-project-navigation"
  ],

  // Impact semantics
  "impacts": {
    "performance": "medium",
    "bundle_contribution": "medium",
    "user_interaction": "required",
    "accessibility": "partial"
  },

  // Relationship semantics
  "relationships": {
    "is_instance_of": "ProjectDetailPage",
    "depends_on": ["NextProject", "sharedStyles", "projectname"],
    "used_by": ["App.jsx"],
    "related_projects": ["Ark", "CapsuleMachine", "Collection", "AP", "Lens"],
    "dependency_chain": ["React", "Framer-Motion", "Styled-Components", "Vite"]
  }
}
```

---

## Real-World Examples

### 1. Docusaurus Documentation System

**Approach**: Front Matter + Flat Tags

```markdown
---
id: getting-started
title: Getting Started
description: Quick start guide
tags: [tutorial, beginner, setup]
keywords: [docusaurus, quick start]
sidebar_position: 1
---

Content here...
```

**Metadata Strategy**:
- **Front matter** for structural metadata (id, title, position)
- **Tags** for content categorization (flat list)
- **Keywords** for SEO

**Good For**: Documentation that needs both structure and discoverability

### 2. GitHub Repository Tagging

**Approach**: Labels + Topics (flat, not hierarchical)

```
Repository Metadata:
- Topics: react, animation, portfolio, three.js
- Issue Labels: bug, feature, documentation, help-wanted
- PR Labels: enhancement, breaking-change, testing
```

**Limitation**: Topics don't support filtering in code search
**Workaround**: Use repository metadata API for custom tag management

**For Your Portfolio**: Could use GitHub topics:
```
Topics: react, three.js, framer-motion, portfolio,
        web-design, interactive, animations, webgl
```

### 3. Sourcegraph Code Intelligence

**Approach**: Language-aware metadata + LSIF indexing

**Capabilities**:
- Automatic extraction of definitions, references, documentation
- Language-specific AST parsing
- Custom repository metadata (key-value pairs)

**Implementation for Your Portfolio**:
```bash
# Add custom metadata to repo
src repos add-metadata \
  -repo=portfolioyush \
  -metadata='{"owner": "johnny-sheng", "type": "portfolio"}'
```

**Limitation**: Primarily for code search, not semantic understanding

### 4. Digital Asset Management (DAM) Systems

**Approach**: Controlled vocabulary + Faceted metadata

**Example (Adobe AEM)**:
```
Asset: Subject 2.png

Metadata Fields:
├── Technical
│   ├── File Type: PNG
│   ├── Resolution: 3840x2160
│   ├── File Size: 833KB
│   └── Color Space: RGB
├── Descriptive
│   ├── Title: Portrait Photography
│   ├── Description: High-resolution portrait
│   ├── Keywords: portrait, photography, art
│   └── Copyright: Johnny Sheng
└── Categorical
    ├── Category: Photography
    ├── Usage: Portfolio Feature
    ├── Rights: All Rights Reserved
    └── Status: Published
```

**Key Insight**: Separates metadata into categories (Technical, Descriptive, Categorical)

**Applicable to Your Portfolio**:
```
Metadata Categories:
- Technical (file size, type, location)
- Descriptive (purpose, content)
- Organizational (component type, technology)
- Management (status, optimization level)
```

### 5. Knowledge Management Systems (SKMT, Shelf, Mondeca)

**Approach**: Semantic layer + Automatic tagging

**Process**:
1. Parse content automatically
2. Extract entities and relationships
3. Apply controlled vocabulary tags
4. Build knowledge graph
5. Enable semantic search

**Example for Your Portfolio**:
```
Document: Grove.jsx

Automatic Extraction:
- Entities: Component, React, Framer-Motion, AI Project
- Concepts: Animation, Interaction, Matching
- Technologies: JavaScript, JSX, CSS-in-JS
- Relationships: Uses Framer-Motion, Part of AI Matching Project

Generated Tags:
- tech:react
- tech:framer-motion
- domain:ai
- pattern:animation
- project:grove
```

---

## Recommended Implementation for Your Portfolio

### Phase 1: Foundation (Week 1)

**Goal**: Establish core metadata structure with minimal overhead

#### **Step 1a: Define Metadata File Format**

Create `/src/metadata/components.json`:

```json
{
  "components": [
    {
      "id": "line-jsx",
      "file": "src/components/Line.jsx",
      "name": "Line",
      "description": "Route-reactive line animation system",
      "type": "component",
      "scope": "global",
      "facets": {
        "type": "component",
        "technology": ["react", "framer-motion"],
        "purpose": ["animation", "route-reactive"],
        "performance": "medium",
        "scope": "global",
        "status": "active"
      },
      "tags": ["animation", "decorative", "route-reactive", "keyframe-animations"],
      "file_size_bytes": 9482,
      "dependencies": ["react", "framer-motion", "react-router-dom"],
      "used_by": ["App.jsx"],
      "last_updated": "2025-11-21"
    },
    {
      "id": "grove-jsx",
      "file": "src/components/Projectfiles/Grove.jsx",
      "name": "Grove",
      "description": "AI-powered project matching platform project detail page",
      "type": "page",
      "scope": "route-specific",
      "facets": {
        "type": "page",
        "technology": ["react", "framer-motion", "styled-components"],
        "purpose": ["project-detail", "storytelling"],
        "performance": "medium",
        "scope": "route-specific",
        "status": "active"
      },
      "tags": ["project-detail", "narrative", "ai-project", "interactive"],
      "file_size_bytes": 13872,
      "dependencies": ["react", "framer-motion", "styled-components", "NextProject"],
      "related_projects": ["Ark", "CapsuleMachine", "Collection", "AP", "Lens"],
      "last_updated": "2025-11-21"
    }
  ]
}
```

#### **Step 1b: Create Controlled Vocabulary**

File: `/src/metadata/taxonomy.json`

```json
{
  "taxonomy": {
    "type": {
      "name": "Component Type",
      "description": "Structural role of the component",
      "values": [
        { "id": "component", "label": "Component", "description": "Reusable UI component" },
        { "id": "page", "label": "Page", "description": "Route-level page component" },
        { "id": "utility", "label": "Utility", "description": "Helper/service component" },
        { "id": "layout", "label": "Layout", "description": "Layout container component" },
        { "id": "feature", "label": "Feature", "description": "Feature/widget component" }
      ]
    },
    "technology": {
      "name": "Technology Stack",
      "description": "Libraries and frameworks used",
      "values": [
        { "id": "react", "label": "React", "version": "18.2.0" },
        { "id": "react-router", "label": "React Router", "version": "7.0.2" },
        { "id": "framer-motion", "label": "Framer Motion", "version": "11.15.0" },
        { "id": "styled-components", "label": "Styled Components", "version": "6.1.13" },
        { "id": "three.js", "label": "Three.js", "version": "0.171.0" }
      ]
    },
    "purpose": {
      "name": "Purpose/Function",
      "description": "What the component does",
      "values": [
        { "id": "animation", "label": "Animation", "description": "Handles motion/animation" },
        { "id": "route-reactive", "label": "Route-Reactive", "description": "Responds to route changes" },
        { "id": "project-detail", "label": "Project Detail", "description": "Shows project information" },
        { "id": "navigation", "label": "Navigation", "description": "Provides navigation" },
        { "id": "rendering", "label": "Rendering", "description": "Renders 3D or complex graphics" },
        { "id": "styling", "label": "Styling", "description": "Provides shared styles" }
      ]
    },
    "performance": {
      "name": "Performance Impact",
      "description": "Relative performance impact",
      "values": [
        { "id": "heavy", "label": "Heavy", "description": "Significant performance impact" },
        { "id": "medium", "label": "Medium", "description": "Moderate performance impact" },
        { "id": "light", "label": "Light", "description": "Minimal performance impact" }
      ]
    },
    "scope": {
      "name": "Component Scope",
      "description": "Where component is used",
      "values": [
        { "id": "global", "label": "Global", "description": "Used across entire app" },
        { "id": "route-specific", "label": "Route-Specific", "description": "Used on specific routes" },
        { "id": "project-specific", "label": "Project-Specific", "description": "Used for specific project only" }
      ]
    },
    "status": {
      "name": "Component Status",
      "description": "Lifecycle status",
      "values": [
        { "id": "active", "label": "Active", "description": "In active use" },
        { "id": "deprecated", "label": "Deprecated", "description": "To be removed" },
        { "id": "refactoring", "label": "Refactoring", "description": "Under refactoring" },
        { "id": "experimental", "label": "Experimental", "description": "Not yet stable" }
      ]
    }
  }
}
```

#### **Step 1c: Add JSDoc Tags (Optional)**

Update component files with metadata comments:

```javascript
/**
 * Route-reactive line animation system
 *
 * Displays animated decorative lines that change based on current route.
 * Uses Framer Motion variants for smooth transitions across 6 route states.
 *
 * @component Line
 * @metadata {
 *   "type": "component",
 *   "technology": ["react", "framer-motion"],
 *   "purpose": ["animation", "route-reactive"],
 *   "performance": "medium",
 *   "scope": "global"
 * }
 * @tags animation, decorative, route-reactive, keyframe-animations
 *
 * @example
 * import Line from './components/Line';
 * <Line />
 */
const Line = () => { ... }
```

### Phase 2: Automation (Week 2)

**Goal**: Generate metadata automatically from code

#### **Step 2a: Create Metadata Generator Script**

File: `/scripts/generate-metadata.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Scans component files and generates metadata
 */

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

function extractJSDocMetadata(content) {
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) return {};

  const jsdoc = jsdocMatch[1];

  // Extract metadata object if present
  const metadataMatch = jsdoc.match(/@metadata\s*\{([\s\S]*?)\}/);
  if (metadataMatch) {
    try {
      return JSON.parse('{' + metadataMatch[1] + '}');
    } catch (e) {
      console.warn(`Failed to parse metadata in ${jsdocMatch}`);
    }
  }

  return {};
}

function scanComponents(dir, relativePath = '') {
  const results = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const newRelative = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      results.push(...scanComponents(fullPath, newRelative));
    } else if (entry.isFile() && entry.name.match(/\.(jsx|js)$/)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const bytes = Buffer.byteLength(content, 'utf8');
        const technologies = extractTechnologies(content);
        const jsdocMeta = extractJSDocMetadata(content);

        const metadata = {
          id: entry.name.replace(/\.[^.]*$/, '').toLowerCase(),
          file: path.relative(
            path.join(__dirname, '../'),
            fullPath
          ),
          name: entry.name.replace(/\.(jsx|js)$/, ''),
          type: entry.name[0] === entry.name[0].toUpperCase() ? 'component' : 'utility',
          file_size_bytes: bytes,
          performance: getSizeCategory(bytes),
          technology: technologies,
          ...jsdocMeta,
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

console.log('Generating metadata...');
const components = scanComponents(COMPONENT_DIR);

const output = {
  generated_at: new Date().toISOString(),
  count: components.length,
  components
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`✓ Generated metadata for ${components.length} components`);
console.log(`✓ Written to ${OUTPUT_FILE}`);
```

**Usage**:
```bash
node scripts/generate-metadata.js
```

#### **Step 2b: Add to Build Process**

Update `package.json`:

```json
{
  "scripts": {
    "prebuild": "node scripts/generate-metadata.js",
    "build": "vite build"
  }
}
```

Now metadata generates automatically before each build!

---

## Metadata Schema Design

### Minimal Core Schema (4 Fields)

For a quick start, use just these fields:

```json
{
  "file": "src/components/Line.jsx",
  "type": "component",
  "technology": ["react", "framer-motion"],
  "performance": "medium"
}
```

**Why These 4?**:
- **file**: Locate the code
- **type**: Understand its role
- **technology**: Know dependencies
- **performance**: Identify optimization targets

### Recommended Expanded Schema (12 Fields)

```json
{
  "id": "line-jsx",
  "file": "src/components/Line.jsx",
  "name": "Line",
  "type": "component",
  "description": "Route-reactive line animation system",
  "technology": ["react", "framer-motion"],
  "purpose": ["animation", "route-reactive"],
  "performance": "medium",
  "scope": "global",
  "status": "active",
  "tags": ["animation", "decorative", "route-reactive"],
  "file_size_bytes": 9482,
  "dependencies": ["react", "framer-motion", "react-router-dom"],
  "used_by": ["App.jsx"],
  "related_to": ["ShaderVisual.jsx", "Cursor.jsx"],
  "last_updated": "2025-11-21"
}
```

### TypeScript Interface (Optional)

```typescript
interface ComponentMetadata {
  // Identification
  id: string;
  file: string;
  name: string;

  // Classification
  type: 'component' | 'page' | 'utility' | 'layout' | 'feature';
  description?: string;

  // Technical
  technology: string[];
  dependencies?: string[];
  file_size_bytes: number;

  // Categorical
  purpose?: string[];
  performance: 'heavy' | 'medium' | 'light';
  scope: 'global' | 'route-specific' | 'project-specific';
  status: 'active' | 'deprecated' | 'refactoring' | 'experimental';

  // Organization
  tags?: string[];
  used_by?: string[];
  related_to?: string[];

  // Maintenance
  last_updated: string;
}
```

---

## Tag Hierarchy for Portfolio

### Recommended Tag Structure (Faceted Approach)

```
Core Facets:
├── tech:: Technology Stack
│   ├── tech::react
│   ├── tech::framer-motion
│   ├── tech::styled-components
│   ├── tech::three.js
│   └── tech::react-router
│
├── type:: Component Type
│   ├── type::page
│   ├── type::component
│   ├── type::utility
│   ├── type::layout
│   └── type::feature
│
├── purpose:: Functional Purpose
│   ├── purpose::animation
│   ├── purpose::navigation
│   ├── purpose::rendering
│   ├── purpose::data
│   └── purpose::styling
│
├── perf:: Performance Tier
│   ├── perf::heavy
│   ├── perf::medium
│   └── perf::light
│
├── scope:: Reusability Scope
│   ├── scope::global
│   ├── scope::route-specific
│   └── scope::project-specific
│
├── status:: Component Status
│   ├── status::active
│   ├── status::deprecated
│   ├── status::refactoring
│   └── status::experimental
│
└── domain:: Business Domain
    ├── domain::ai-projects
    ├── domain::interactive
    ├── domain::portfolio
    └── domain::web-design

Flexible Tags (Folksonomy):
├── animation-system
├── route-reactive
├── decorative
├── narrative-structure
├── custom-cursor
├── shader-effects
└── [add as patterns emerge]
```

### Tag Usage Examples

```
Line.jsx Tags:
✓ tech::react, tech::framer-motion
✓ type::component
✓ purpose::animation, purpose::navigation
✓ perf::medium
✓ scope::global
✓ status::active
+ animation-system, route-reactive, decorative

Grove.jsx Tags:
✓ tech::react, tech::framer-motion, tech::styled-components
✓ type::page
✓ purpose::data, purpose::storytelling
✓ perf::medium
✓ scope::project-specific
✓ status::active
+ domain::ai-projects, narrative-structure

ShaderVisual.jsx Tags:
✓ tech::react, tech::three.js
✓ type::feature
✓ purpose::rendering
✓ perf::heavy
✓ scope::global
✓ status::active
+ shader-effects, gpu-accelerated
```

---

## Automatic Generation Strategies

### Strategy 1: File Structure Conventions

**Assumption**: Directory structure encodes metadata

```javascript
// Extract scope from location
function inferScope(filePath) {
  if (filePath.includes('Projectfiles')) return 'project-specific';
  if (filePath.includes('pages')) return 'route-specific';
  if (filePath.includes('shared')) return 'global';
  return 'unknown';
}

// Usage
const scope = inferScope('src/components/Projectfiles/Grove.jsx');
// → 'project-specific' ✓
```

### Strategy 2: Import Analysis

**Assumption**: What you import reveals your dependencies

```javascript
// Extract imports from file
function extractImports(content) {
  const importPattern = /from ['"]([^'"]+)['"]|import ([^ ]+) from/g;
  const imports = new Set();

  let match;
  while ((match = importPattern.exec(content)) !== null) {
    imports.add(match[1] || match[2]);
  }

  return Array.from(imports);
}

// Map imports to technologies
function technologyFromImports(imports) {
  const mapping = {
    'react': 'tech::react',
    'framer-motion': 'tech::framer-motion',
    'styled-components': 'tech::styled-components',
    'three': 'tech::three.js',
    'react-router': 'tech::react-router',
  };

  return imports
    .filter(imp => Object.keys(mapping).some(key => imp.includes(key)))
    .map(imp => {
      const key = Object.keys(mapping).find(k => imp.includes(k));
      return mapping[key];
    });
}
```

### Strategy 3: Code Metrics

**Assumption**: Code size/complexity indicates type and performance

```javascript
function inferType(lines, hasExport) {
  // Short, single export = utility
  if (lines < 50 && hasExport) return 'utility';

  // Medium size with JSX = component
  if (lines < 200 && hasExport && /return\s+</.test(content)) {
    return 'component';
  }

  // Large file = page or complex component
  if (lines > 200) return 'page';

  return 'unknown';
}

function inferPerformance(bytes) {
  const sizeImpact = bytes / 1024; // KB

  if (sizeImpact > 15) return 'perf::heavy';
  if (sizeImpact > 8) return 'perf::medium';
  return 'perf::light';
}
```

### Strategy 4: Dependency Depth Analysis

**Assumption**: How many dependencies = how complex

```javascript
function inferScope(imports, fileName) {
  // Many dependencies = global utility
  if (imports.length > 5) return 'scope::global';

  // File in Projectfiles = project-specific
  if (fileName.includes('Projectfiles')) return 'scope::project-specific';

  // Few dependencies = route-specific
  return 'scope::route-specific';
}
```

### Strategy 5: Naming Conventions

**Assumption**: Names follow patterns

```javascript
function inferTypeFromName(fileName) {
  const base = fileName.replace(/\.[^.]+$/, '');

  if (base[0] === base[0].toUpperCase()) {
    // PascalCase = Component or Page
    return 'type::component';
  } else if (base.includes('Styles') || base.includes('styles')) {
    return 'type::utility';
  } else if (base.includes('data') || base.includes('Data')) {
    return 'type::utility';
  } else if (base.includes('hook')) {
    return 'type::utility';
  }

  return 'type::component';
}
```

### Complete Automation Pipeline

```javascript
/**
 * Automated metadata generation pipeline
 */

function generateMetadata(filePath, content) {
  const fileName = path.basename(filePath);
  const lines = content.split('\n').length;
  const bytes = Buffer.byteLength(content, 'utf8');
  const imports = extractImports(content);

  return {
    file: filePath,
    type: inferTypeFromName(fileName),
    technology: technologyFromImports(imports),
    performance: inferPerformance(bytes),
    scope: inferScope(imports, filePath),
    description: extractJSDocDescription(content),
    tags: extractJSDocTags(content),
    dependencies: imports,
    file_size_bytes: bytes,
    last_generated: new Date().toISOString()
  };
}

// Process all files
const components = fs.readdirSync(COMPONENT_DIR)
  .filter(f => f.endsWith('.jsx'))
  .map(f => {
    const content = fs.readFileSync(path.join(COMPONENT_DIR, f), 'utf8');
    return generateMetadata(path.join(COMPONENT_DIR, f), content);
  });

fs.writeFileSync('src/metadata/generated.json', JSON.stringify(components, null, 2));
```

---

## Searchability & Filtering

### Implementing Faceted Search

#### **1. Simple In-Memory Search (Client-Side)**

```javascript
// search.js
import metadata from '../metadata/generated.json';

class ComponentSearch {
  constructor(components) {
    this.components = components;
    this.buildIndex();
  }

  // Build search index
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

      // Index by tags
      comp.tags?.forEach(tag => {
        this.addToIndex('tags', tag, comp.id);
      });
    });
  }

  addToIndex(category, value, componentId) {
    const key = `${category}:${value}`;
    if (!this.index.has(key)) {
      this.index.set(key, new Set());
    }
    this.index.get(key).add(componentId);
  }

  // Search by single facet
  searchByFacet(category, value) {
    const key = `${category}:${value}`;
    const ids = this.index.get(key);
    return ids ? this.components.filter(c => ids.has(c.id)) : [];
  }

  // Search by multiple facets (AND logic)
  searchByFacets(filters) {
    // filters = { technology: ['react', 'framer-motion'], performance: 'heavy' }

    let results = new Set(this.components.map(c => c.id));

    for (const [category, values] of Object.entries(filters)) {
      const valuesArray = Array.isArray(values) ? values : [values];
      let categoryResults = new Set();

      valuesArray.forEach(value => {
        const key = `${category}:${value}`;
        const ids = this.index.get(key);
        ids?.forEach(id => categoryResults.add(id));
      });

      // Intersection with previous results
      results = new Set([...results].filter(id => categoryResults.has(id)));
    }

    return this.components.filter(c => results.has(c.id));
  }

  // Text search
  search(query) {
    const q = query.toLowerCase();
    return this.components.filter(comp =>
      comp.name?.toLowerCase().includes(q) ||
      comp.description?.toLowerCase().includes(q) ||
      comp.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  }
}

// Usage
const search = new ComponentSearch(metadata.components);

// Single facet
search.searchByFacet('technology', 'react');
// → [Line, Grove, Projects, ...]

// Multiple facets (AND)
search.searchByFacets({
  technology: 'react',
  performance: 'heavy'
});
// → [ShaderVisual, Archive, ...]

// Text search
search.search('animation');
// → [Line, Archive, ...]
```

#### **2. REST API Search Endpoint**

```javascript
// api/search.js
import express from 'express';
import metadata from '../metadata/generated.json';

const router = express.Router();
const search = new ComponentSearch(metadata.components);

router.get('/components', (req, res) => {
  const { type, technology, performance, scope, tags, q } = req.query;

  let results;

  if (q) {
    // Text search
    results = search.search(q);
  } else {
    // Faceted search
    const filters = {};
    if (type) filters.type = type;
    if (technology) filters.technology = technology.split(',');
    if (performance) filters.performance = performance;
    if (scope) filters.scope = scope;
    if (tags) filters.tags = tags.split(',');

    results = search.searchByFacets(filters);
  }

  res.json({
    count: results.length,
    results
  });
});

// Get all taxonomy values
router.get('/taxonomy', (req, res) => {
  const taxonomy = {
    types: [...new Set(metadata.components.map(c => c.type))],
    technologies: [...new Set(metadata.components.flatMap(c => c.technology || []))],
    performances: [...new Set(metadata.components.map(c => c.performance))],
    scopes: [...new Set(metadata.components.map(c => c.scope))],
    tags: [...new Set(metadata.components.flatMap(c => c.tags || []))]
  };
  res.json(taxonomy);
});

export default router;
```

**Usage**:
```
GET /api/components?technology=react
GET /api/components?performance=heavy&scope=global
GET /api/components?q=animation
GET /api/components?type=component&technology=framer-motion,react
GET /api/taxonomy
```

#### **3. UI Component for Filtered Search**

```jsx
// components/ComponentSearch.jsx
import React, { useState, useMemo } from 'react';
import metadata from '../metadata/generated.json';

function ComponentSearch() {
  const [filters, setFilters] = useState({
    type: null,
    technology: [],
    performance: null,
    scope: null
  });
  const [searchText, setSearchText] = useState('');

  // Get unique values from metadata
  const taxonomy = useMemo(() => ({
    types: [...new Set(metadata.components.map(c => c.type))],
    technologies: [...new Set(metadata.components.flatMap(c => c.technology || []))],
    performances: [...new Set(metadata.components.map(c => c.performance))],
    scopes: [...new Set(metadata.components.map(c => c.scope))]
  }), []);

  // Filter components
  const results = useMemo(() => {
    let filtered = metadata.components;

    // Apply facet filters
    if (filters.type) {
      filtered = filtered.filter(c => c.type === filters.type);
    }
    if (filters.technology.length > 0) {
      filtered = filtered.filter(c =>
        filters.technology.some(t => c.technology?.includes(t))
      );
    }
    if (filters.performance) {
      filtered = filtered.filter(c => c.performance === filters.performance);
    }
    if (filters.scope) {
      filtered = filtered.filter(c => c.scope === filters.scope);
    }

    // Apply text search
    if (searchText) {
      const q = searchText.toLowerCase();
      filtered = filtered.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [filters, searchText]);

  return (
    <div className="component-search">
      <input
        type="text"
        placeholder="Search components..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select
        value={filters.type || ''}
        onChange={(e) => setFilters({ ...filters, type: e.target.value || null })}
      >
        <option value="">All Types</option>
        {taxonomy.types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select
        multiple
        value={filters.technology}
        onChange={(e) => setFilters({
          ...filters,
          technology: Array.from(e.target.selectedOptions, opt => opt.value)
        })}
      >
        {taxonomy.technologies.map(tech => (
          <option key={tech} value={tech}>{tech}</option>
        ))}
      </select>

      <select
        value={filters.performance || ''}
        onChange={(e) => setFilters({ ...filters, performance: e.target.value || null })}
      >
        <option value="">All Performance Levels</option>
        {taxonomy.performances.map(perf => (
          <option key={perf} value={perf}>{perf}</option>
        ))}
      </select>

      <div className="results">
        <h3>Results ({results.length})</h3>
        {results.map(comp => (
          <div key={comp.id} className="component-result">
            <h4>{comp.name}</h4>
            <p>{comp.description}</p>
            <div className="metadata">
              <span className="type">{comp.type}</span>
              {comp.technology?.map(tech => (
                <span key={tech} className="tag">{tech}</span>
              ))}
              <span className="perf">{comp.performance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentSearch;
```

---

## Minimal Effective Metadata Patterns

### The 80/20 Rule: Start Ultra-Minimal

**Observation**: 80% of search value comes from 20% of metadata

**Ultra-Minimal Schema (5 fields)**:

```json
{
  "file": "src/components/Line.jsx",
  "type": "component",
  "technology": ["react", "framer-motion"],
  "tags": ["animation", "route-reactive"],
  "performance": "medium"
}
```

**What You Get**:
- Can search by type ✓
- Can filter by technology ✓
- Can filter by performance ✓
- Can find by tags ✓
- Know file location ✓

**Time to Implement**: 1 hour
**Time to Maintain**: <5 min per new file

### Iteration: Expand Based on Value

**Phase 1 (MVP)**: 5 fields above

**Phase 2 (After 1 month)**: Add based on actual usage patterns
- Did developers ask "which components use X?"
  → Add `dependencies` field
- Did developers need "related components?"
  → Add `related_to` field

**Phase 3 (After 3 months)**: Add advanced metadata
- Performance optimization tracking
- Dependency graphs
- Component relationships

### Pattern: Metadata by File Type

```javascript
// Metadata for different file types

// Component file
{
  file: "src/components/Line.jsx",
  type: "component",
  technology: ["react"],
  performance: "medium",
  tags: ["animation"]
}

// Page file
{
  file: "src/components/Grove.jsx",
  type: "page",
  technology: ["react", "framer-motion"],
  performance: "medium",
  tags: ["project-detail"]
}

// Data file
{
  file: "src/data/projectname.jsx",
  type: "data",
  technology: [],
  performance: "light",
  tags: ["central-registry"]
}

// Utility file
{
  file: "src/components/sharedStyles.js",
  type: "utility",
  technology: ["styled-components"],
  performance: "light",
  tags: ["shared-styling"]
}
```

### Pattern: Progressive Enhancement

**Level 1 (0 minutes)**: No metadata
- Can't search or filter
- Manual discovery only

**Level 2 (30 minutes)**: Filename conventions + auto-detection
```bash
yarn run generate-metadata
```
- Auto-generated from file structure
- Searchable by filename patterns
- Performance detected from file size

**Level 3 (1 hour)**: Add JSDoc tags
```javascript
/**
 * @type component
 * @technology react framer-motion
 * @tags animation route-reactive
 */
```
- Enhanced description
- Developer-provided context
- Still mostly automated

**Level 4 (2 hours)**: Create search UI
```bash
yarn run build-search-index
```
- Faceted search interface
- Multi-field filtering
- Full-text search

### Quick Reference: Minimum Viable Metadata

```json
// ABSOLUTE MINIMUM (1 field!)
{
  "file": "src/components/Line.jsx"
}
// You can still search by filename = some value!

// BETTER MINIMUM (3 fields)
{
  "file": "src/components/Line.jsx",
  "type": "component",
  "tags": ["animation"]
}
// Can find by type + search by tags

// RECOMMENDED MINIMUM (5 fields)
{
  "file": "src/components/Line.jsx",
  "type": "component",
  "technology": ["react", "framer-motion"],
  "tags": ["animation"],
  "performance": "medium"
}
// Full faceted search capability with minimal overhead
```

---

## Implementation Roadmap for Your Portfolio

### Week 1: Foundation
- [x] Design metadata schema (completed above)
- [x] Create `src/metadata/taxonomy.json` (copy from Phase 1 section)
- [x] Create `src/metadata/components.json` (template provided)
- [ ] Add JSDoc comments to top 5 components
- [ ] Create `/scripts/generate-metadata.js`

### Week 2: Automation
- [ ] Run metadata generator script
- [ ] Validate generated metadata
- [ ] Add `prebuild` hook to package.json
- [ ] Test auto-generation in build process

### Week 3: Discoverability
- [ ] Create search utility class (`src/utils/search.js`)
- [ ] Add TypeScript interfaces (optional)
- [ ] Create search API endpoints (if needed)
- [ ] Build search UI component

### Week 4: Documentation & Maintenance
- [ ] Document metadata guidelines in CLAUDE.md
- [ ] Create developer guide for metadata tagging
- [ ] Set up quarterly metadata review process
- [ ] Monitor for stale/incorrect metadata

---

## Conclusion & Recommendations

### Key Findings from Research

1. **Taxonomies Work** - Controlled vocabularies significantly improve searchability
2. **Faceted Classification is Powerful** - Multiple dimensions allow flexible discovery
3. **Automation is Essential** - Manual metadata creation doesn't scale
4. **Hybrid Approaches Win** - Combining facets + flat tags gives flexibility
5. **Start Small** - Begin with 5-10 core fields, expand as needed
6. **Semantic Understanding** - Relationships between components matter more than just labels

### Recommendations for Your Portfolio

#### **Immediate Actions (This Week)**

1. **Adopt 5-Field Minimum Schema**
   - File, Type, Technology, Tags, Performance
   - Takes 30 minutes to implement
   - Gives immediate search capability

2. **Create Metadata File**
   - `/src/metadata/components.json`
   - Document all 16 active components
   - Use taxonomy.json as vocabulary source

3. **Add JSDoc Tags**
   - Top priority: Line.jsx, ShaderVisual.jsx, App.jsx
   - Pattern: `@type`, `@technology`, `@tags`
   - Takes 10 minutes per file

#### **Short Term (Next Month)**

4. **Automate Generation**
   - Create metadata generation script
   - Hook into build process
   - Keep manual metadata up-to-date

5. **Build Search Interface**
   - React component with filters
   - Faceted search dropdown
   - Text search capability

#### **Long Term (Q1 2026)**

6. **Track Dependencies**
   - Analyze component relationships
   - Build dependency graph
   - Identify optimization opportunities

7. **Performance Monitoring**
   - Use metadata to track optimization
   - Identify heavy components
   - Plan refactoring work

8. **Advanced Semantics**
   - Understand component purpose
   - Build component interaction graph
   - Enable intelligent suggestions

### Final Score

**Implementation Difficulty**: ⭐⭐☆☆☆ (Easy)
**Time to Value**: ⭐⭐⭐⭐☆ (Fast)
**Maintenance Overhead**: ⭐⭐☆☆☆ (Light)
**Scalability**: ⭐⭐⭐⭐★ (Excellent)

---

## Sources

Research conducted from following documentation systems and resources:

- [Taxonomy Creation for Content Tagging - Society for Technical Communication](https://www.stc.org/course/taxonomy-creation-for-content-tagging-june-2024/)
- [Taxonomy 101 - NN/G](https://www.nngroup.com/articles/taxonomy-101/)
- [Faceted Classification - Wikipedia](https://en.wikipedia.org/wiki/Faceted_classification)
- [Hedden Information Management - Taxonomies for Technical Documentation](https://www.hedden-information.com/taxonomies-for-technical-documentation/)
- [Sourcegraph Custom Repository Metadata](https://sourcegraph.com/docs/admin/repo/metadata)
- [Docusaurus Documentation - Create a Doc](https://docusaurus.io/docs/create-doc)
- [GitHub Code Search Documentation](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests)
- [Digital Asset Management Best Practices - OpenAsset](https://openasset.com/blog/digital-asset-metadata/)
- [Markdoc Frontmatter Documentation](https://markdoc.dev/docs/frontmatter)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.1.html)
- [JSDoc Official Documentation](https://jsdoc.app/)
- [Designing File Organization with Tags - Nayuki](https://www.nayuki.io/page/designing-better-file-organization-around-tags-not-hierarchies)

