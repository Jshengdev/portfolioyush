# .claude Directory

This directory contains Claude Code configuration, slash commands, hooks, and context management for the portfolio project.

**Last Updated**: 2025-11-22
**Purpose**: RAG-enhanced Claude Code workflow with intelligent context loading

---

## Directory Structure

```
.claude/
├── README.md                   # This file - documentation
├── settings.json               # Project-level settings (version controlled)
├── settings.local.json         # Personal overrides (gitignored)
├── commands/                   # Slash command definitions
│   ├── load/                   # Context loading commands
│   │   ├── component.md       # /load/component <name>
│   │   └── context.md         # /load/context <topic>
│   ├── search/                 # Search commands
│   │   └── code.md            # /search/code <query>
│   ├── analyze/                # Analysis commands
│   │   └── performance.md     # /analyze/performance
│   └── docs/                   # Documentation commands
│       └── update.md          # /docs/update
├── hooks/                      # Hook scripts
│   ├── session-start.sh       # Load context on session start
│   ├── pre-read.sh            # Augment Read with RAG suggestions
│   └── stop-hook-git-check.sh # Git status check on stop (existing)
├── context/                    # RAG context storage
│   ├── embeddings/            # Vector embeddings (gitignored)
│   ├── metadata/              # Component metadata
│   │   ├── components.json   # Auto-generated component metadata
│   │   └── taxonomy.json     # Classification taxonomy
│   └── knowledge/             # Curated knowledge files
│       └── knowledge-base.md # Project knowledge summary
└── agents/                     # Specialized agent definitions
    ├── researcher.md          # Research-focused agent
    ├── coder.md               # Code-focused agent
    └── optimizer.md           # Performance optimization agent
```

---

## Quick Start

### 1. Available Commands

```bash
# Load component context
/load/component Line           # Load Line.jsx with full context
/load/component ShaderVisual   # Load WebGL shader component

# Load topical context
/load/context animations       # Load animation system context
/load/context routing          # Load routing information
/load/context optimization-history  # Load Wave 1-7 details

# Search codebase
/search/code "WebGL shader"    # Semantic code search
/search/code "lazy loading"    # Find React.lazy() usage

# Analyze performance
/analyze/performance           # Overall performance analysis
/analyze/performance ShaderVisual  # Component-specific analysis

# Update documentation
/docs/update                   # Update all docs
/docs/update Line.jsx          # Update for specific file
```

### 2. Context Stack

Commands remember what you're working on:

```bash
# Load a component
> /load/component Line

# Now other commands use this context automatically
> /analyze/performance
  → Analyzes Line.jsx (from context)

> /search/code "similar animations"
  → Prioritizes results related to Line.jsx
```

### 3. Hooks

Hooks automatically enhance your workflow:

- **SessionStart**: Loads recent context summaries on startup
- **PreRead**: Suggests related files when reading code
- **Stop**: Checks git status (prevents uncommitted changes)

---

## Command Documentation

### /load/component <name>

Loads comprehensive context for a React component.

**What it does**:
1. Locates component file
2. Loads source code with imports, exports, state
3. Analyzes dependencies
4. Finds usage across codebase
5. Loads related context (routes, data, assets)
6. Generates metadata
7. Updates context stack

**Example**:
```bash
> /load/component Grove

## Component: Grove

**Location**: `src/components/Projectfiles/Grove.jsx`
**Type**: Project Detail Page
**Size**: 13,872 bytes

### Purpose
AI-Powered Project Matching platform with Act I-II-III narrative structure.

### Dependencies
- React: useState, useNavigate
- Framer Motion: motion, whileInView animations
- Styled Components: 12 styled components from sharedStyles.js
- Data: projectParty for NextProject navigation

### Assets
- /public/assets/GROVE/ (16 files, 11MB)
- 4 GIFs, 12 PNGs

### Related
- NextProject.jsx (navigation)
- sharedStyles.js (styling)
- projectname.jsx (data source)
```

---

### /load/context <topic>

Loads context for a specific topic or area of the codebase.

**Supported Topics**:
- Architecture
- Technologies (react, framer-motion, three.js, vite, styled-components)
- Features (animations, routing, styling, lazy-loading, shaders)
- Optimization (wave history, technical debt, health score)
- Deployment (build, deploy, github-pages)
- Data (projects, archive)

**Example**:
```bash
> /load/context animations

## Animation System Context

### Technologies
- Framer Motion 11.15.0
- CSS keyframes
- RequestAnimationFrame

### Animated Components
1. Line.jsx (184 lines) - 6 route-reactive variants
2. Cursor.jsx (113 lines) - Custom cursor with lag
3. AppSlider.jsx (103 lines) - Infinite scroll
4. All project pages - Scroll-triggered whileInView

### Performance Notes
- Line.jsx: Many transforms, monitor mobile
- ShaderVisual: 60fps continuous, GPU intensive
- Cursor: RAF-optimized ✓
```

---

### /search/code <query>

Semantic code search using natural language queries.

**How it works**:
1. Parses query to extract intent, technology, concepts
2. Generates search variants
3. Multi-strategy search (grep, component analysis, metadata)
4. Ranks results by relevance
5. Presents top matches with context

**Example**:
```bash
> /search/code "route-reactive animations"

## Search Results

Found 3 relevant results:

### 1. Line.jsx (Relevance: High)
**File**: `src/components/Line.jsx`
**Match**: 6 animation variants based on route detection
**Context**: Uses useLocation to detect route, applies different
transform animations per route (/, /about, /projects, etc.)

### 2. App.jsx (Relevance: Medium)
**File**: `src/App.jsx`
**Match**: AnimatePresence for route transitions
**Context**: PageWrapper with mode="wait" for smooth transitions
```

---

### /analyze/performance [component]

Analyzes performance characteristics.

**Without Arguments**: Overall codebase analysis
- Bundle size breakdown
- Component performance categorization
- Asset performance
- Animation performance
- Build performance

**With Component**: Component-specific analysis
- Component size and dependencies
- Performance characteristics
- Optimization recommendations
- Priority levels

**Example**:
```bash
> /analyze/performance ShaderVisual

## Performance Analysis: ShaderVisual.jsx

### Summary
Heavy component with continuous 60fps Three.js rendering.
GPU-intensive but well-optimized.

### Metrics
- Size: 221 lines
- GPU Usage: High
- Frame Rate: 60fps continuous

### Recommendations
1. [High] Add visibility detection to pause when tab hidden
2. [Medium] Add device detection, disable on mobile
3. [Low] Add FPS counter, throttle if <30fps

### Impact
Implementing 1-2 would reduce battery drain by ~60%.
```

---

### /docs/update [file]

Updates CLAUDE.md and other documentation.

**What it updates**:
- Statistics (component count, lines, assets)
- Component Architecture
- File Location Reference
- Codebase Structure
- Technical Debt
- Optimization History (if applicable)

**Example**:
```bash
> /docs/update src/components/NewComponent.jsx

## Documentation Updated

### Changes Made
1. Statistics: Component count 16 → 17
2. Component Architecture: Added NewComponent.jsx
3. File Location Reference: Added file path
4. Verified all statistics accurate

### Next Steps
- Commit: git add CLAUDE.md && git commit -m "docs: add NewComponent"
```

---

## Hooks

### SessionStart Hook

**File**: `.claude/hooks/session-start.sh`
**Trigger**: When Claude Code session starts
**Purpose**: Load recent context to continue where you left off

**What it does**:
```bash
#!/bin/bash
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
CONTEXT_DIR="$PROJECT_DIR/.claude/context"

# Load knowledge base
cat "$CONTEXT_DIR/knowledge/knowledge-base.md"

# Load recent research summaries
find "$CONTEXT_DIR/knowledge" -name "*.md" -mtime -7 | head -5

# Show recent git activity
git log --oneline -5

echo "✅ Context loaded. Ready to continue work."
```

### PreRead Hook (Future)

**File**: `.claude/hooks/pre-read.sh`
**Trigger**: Before reading a file with Read tool
**Purpose**: Suggest related files based on RAG

**What it does**:
```bash
#!/bin/bash
FILE_PATH="$1"

# When reading Line.jsx, suggest:
# "Related: App.jsx (imports Line), sharedStyles.js (animations)"

# When reading Grove.jsx, suggest:
# "Related: projectname.jsx (data), NextProject.jsx (navigation)"
```

---

## Context System

### Context Stack

Commands remember your working context:

```javascript
{
  current_component: "Line.jsx",
  current_file: "src/components/Line.jsx",
  current_topic: "animations",
  related_files: [
    "src/App.jsx",
    "src/components/sharedStyles.js"
  ],
  last_search_query: "route-reactive animations",
  search_results: ["Line.jsx", "App.jsx"],
  context_type: "component"
}
```

**Benefits**:
- Follow-up commands auto-fill from context
- Related files prioritized in searches
- 60% less typing for common workflows

### Knowledge Base

**File**: `.claude/context/knowledge/knowledge-base.md`

Quick facts always available:
```markdown
# Portfolio Knowledge Base

## Quick Facts
- React 18.2.0 + Vite 6.0.7
- 16 active components, 4,676 lines
- Build: 797KB (227KB gzip), 15 chunks
- Health Score: 9.5/10

## Recent Optimizations
- Wave 1-7 complete (production-ready)
- Bundle -20%, Code -11.3%, Assets -12MB

## Common Tasks
→ Add project: See CLAUDE.md "Adding a New Project"
→ Deploy: yarn build && yarn deploy
→ Update docs: /docs/update
```

---

## Metadata System

### Component Metadata

**File**: `.claude/context/metadata/components.json`

Auto-generated metadata for all components:

```json
{
  "components": [
    {
      "name": "Line",
      "path": "src/components/Line.jsx",
      "type": "component",
      "technology": ["react", "framer-motion"],
      "performance": "medium",
      "scope": "global",
      "purpose": ["animation", "route-reactive"],
      "status": "active",
      "size": 184,
      "dependencies": ["motion", "useLocation"]
    }
  ]
}
```

### Taxonomy

**File**: `.claude/context/metadata/taxonomy.json`

Classification system:

```json
{
  "type": ["page", "component", "widget", "utility"],
  "technology": ["react", "framer-motion", "three.js", "styled-components"],
  "performance": ["light", "medium", "heavy"],
  "scope": ["global", "page-specific", "project-specific"],
  "purpose": ["animation", "navigation", "layout", "data", "3d"],
  "status": ["active", "deprecated", "experimental"]
}
```

**Auto-generation**:
```bash
# Run this to regenerate metadata
node scripts/generate-metadata.js
```

---

## RAG Integration (Future)

When RAG is implemented:

### Vector Embeddings

**Location**: `.claude/context/embeddings/` (gitignored)

- ChromaDB database file
- Component embeddings (350 tokens/chunk)
- Documentation embeddings (400 tokens/chunk)
- Total size: ~650KB

### Search Enhancement

Commands will use hybrid search:
- 70% vector search (semantic understanding)
- 30% BM25 search (exact keyword matches)
- Reranking with BGE-reranker-base

**Expected Performance**:
- Query time: <1 second (20ms search + 800ms generation)
- Accuracy: 85-95% recall
- Cost: $0/month (Ollama local embeddings)

---

## Configuration

### settings.json

**File**: `.claude/settings.json` (version controlled)

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": ["Skill", "Task"]
  },
  "hooks": {
    "SessionStart": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh"
      }]
    }],
    "Stop": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/stop-hook-git-check.sh"
      }]
    }]
  }
}
```

### settings.local.json

**File**: `.claude/settings.local.json` (gitignored)

Personal overrides - create this for machine-specific settings.

---

## Best Practices

### Using Commands

1. **Start with /load** - Load context before working
2. **Use /search for discovery** - Find patterns, not just files
3. **Use /analyze for decisions** - Before optimizing, measure
4. **Use /docs/update regularly** - Keep docs current

### Context Management

1. **Load component context** before modifying it
2. **Search semantically** ("how does X work?" not "grep X")
3. **Trust the context stack** - Follow-up commands use prior context
4. **Clear context** when switching tasks (use /clear if needed)

### Documentation

1. **Update docs immediately** after code changes
2. **Use /docs/update** rather than manual editing
3. **Verify statistics** with actual commands
4. **Commit docs with code** in same PR

---

## Troubleshooting

### Command not found
```bash
# Check command file exists
ls .claude/commands/load/component.md

# Check settings.json is valid JSON
cat .claude/settings.json | jq .
```

### Hook not running
```bash
# Check hook file is executable
chmod +x .claude/hooks/session-start.sh

# Check hook path in settings.json
# Must use $CLAUDE_PROJECT_DIR/ prefix
```

### Context not loading
```bash
# Check context files exist
ls .claude/context/knowledge/

# Check knowledge-base.md has content
cat .claude/context/knowledge/knowledge-base.md
```

---

## Future Enhancements

### Phase 1: Current (Week 1-2)
✅ Directory structure created
✅ Slash commands defined
✅ Context system designed
⏳ Hooks implemented (session-start, pre-read)

### Phase 2: RAG Integration (Week 2-3)
⏳ ChromaDB setup
⏳ Ollama embeddings
⏳ Component chunking
⏳ Metadata auto-generation

### Phase 3: Advanced Features (Week 3-4)
⏳ Hybrid search
⏳ Query optimization
⏳ Semantic code search
⏳ Performance analysis automation

### Phase 4: Polish (Week 4+)
⏳ MCP server integration
⏳ Auto-documentation generation
⏳ CI/CD doc validation
⏳ Usage analytics

---

## Resources

### Documentation
- **Main Guide**: `CLAUDE.md` (root directory)
- **This README**: `.claude/README.md`
- **RAG Research**: See 28 documents in root (RAG_*.md, EMBEDDING_*.md, etc.)

### Quick Links
- Component Architecture: CLAUDE.md lines 140-280
- File Locations: CLAUDE.md lines 650-720
- Optimization History: CLAUDE.md lines 85-340
- Technical Debt: CLAUDE.md lines 560-640

---

## Getting Help

### Common Questions

**Q: How do I add a new command?**
A: Create a new .md file in `.claude/commands/[category]/[command-name].md`

**Q: How do I modify the context stack?**
A: Context stack is automatic. Commands update it based on what you load.

**Q: How do I regenerate metadata?**
A: Run `node scripts/generate-metadata.js` (when implemented)

**Q: How do I test a hook?**
A: Run it manually: `bash .claude/hooks/session-start.sh`

---

**Last Updated**: 2025-11-22
**Version**: 1.0 (Initial RAG-enhanced setup)
**Status**: Phase 1 Complete, Phase 2-4 Pending
