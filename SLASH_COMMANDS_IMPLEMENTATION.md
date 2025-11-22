# Slash Commands Implementation Guide

**For**: Claude Code Portfolio Project
**Purpose**: Ready-to-use templates and examples for slash commands
**Status**: Production-ready templates

---

## Quick Start: Essential Commands

### Setup

Create this directory structure:
```
.claude/
├── commands/
│   ├── _base/
│   │   └── command.template.md
│   ├── context/
│   ├── analysis/
│   ├── portfolio/
│   └── index.md
├── config/
│   └── aliases.json
└── settings.local.json
```

---

## Core Commands (Ready to Implement)

### 1. /load-file - Load a single file

**File**: `.claude/commands/context/load-file.md`

```markdown
# /load-file

## Description
Load a file into context for analysis. Subsequent commands will use this file.

## Usage
/load-file <path> [--include-imports] [--depth N]

## Parameters
- `path` - File path relative to project root (e.g., `src/App.jsx`)
- `--include-imports` - Include imported module content (default: false)
- `--depth` - How many import levels to traverse (default: 2)

## Examples
```
/load-file src/App.jsx
/load-file src/components/Button.jsx --include-imports --depth 3
/load-file public/index.html
```

## What It Does
✓ Reads the file content
✓ Counts lines and estimates complexity
✓ Detects file type (React, Vue, CSS, HTML, etc.)
✓ Extracts imports and dependencies
✓ Stores in context for next commands
✓ Shows file statistics

## Output Format
```
✓ Loaded src/App.jsx (175 lines, React component)

Statistics:
├─ File type: React JSX
├─ Lines of code: 175
├─ Imports: 12
├─ Exports: 1 default
└─ Complexity: Medium

Next Steps:
• /analyze-code - Analyze this file
• /search-refs - Find where this is used
• /generate-docs - Generate documentation
```

## Related Commands
- `/load-component` - Load React component + dependencies
- `/load-folder` - Load entire folder
- `/clear-context` - Clear loaded file
- `/show-context` - Show what's loaded

## Context
**Provides**: loaded_file, file_content, file_stats, imports
**Requires**: None

## Aliases
- `/lf` - Quick shortcut
- `/load` - When context is clear

## Notes
- File paths are relative to project root
- Respects .gitignore when loading imports
- Updates context for next commands
```

---

### 2. /analyze-code - Analyze loaded code

**File**: `.claude/commands/analysis/analyze-code.md`

```markdown
# /analyze-code

## Description
Analyze the currently loaded file for code quality, patterns, and improvements.

## Usage
/analyze-code [--focus AREA] [--profile PROFILE]

## Parameters
- `--focus` - What to focus on: `quality`, `performance`, `security`, `style` (default: quality)
- `--profile` - Analysis profile: `quick`, `standard`, `deep` (default: standard)
- `--show-examples` - Show code examples (default: true)

## Examples
```
/analyze-code
/analyze-code --focus performance
/analyze-code --profile deep --focus security
```

## What It Does
✓ Code quality metrics (complexity, duplication, etc.)
✓ Anti-patterns detection
✓ Performance issues
✓ Security vulnerabilities
✓ Style violations
✓ Improvement suggestions

## Output Format
```
Code Analysis: src/App.jsx
═══════════════════════════════════════════

Quality Score: 7/10 (Good)
├─ Complexity: 4/10 (good)
├─ Duplication: 2/10 (minimal)
├─ Test Coverage: ?/10 (unknown)
└─ Documentation: 3/10 (needs work)

Issues Found (3):
├─ [MEDIUM] Missing PropTypes (line 42)
├─ [LOW] Unused import: styled-components (line 8)
└─ [LOW] Inconsistent spacing (lines 50-60)

Anti-patterns:
├─ useCallback on every render (line 45) - consider memoization
├─ Inline object creation in useEffect (line 62)

Performance Tips:
├─ Component renders 3+ times when props change
├─ Consider React.memo for optimization

Next Steps:
• /generate-docs - Document this component
• /generate-tests - Create test stubs
• /search-refs - Find where this is used
```

## Focus Areas

### Quality (Default)
- Code complexity (cyclomatic complexity)
- Code duplication (duplicate code blocks)
- Unused variables and imports
- Inconsistent naming
- Missing documentation

### Performance
- Render performance (React.memo candidates)
- Bundle impact
- Runtime complexity
- Memory leaks
- Unnecessary re-renders

### Security
- SQL injection risks
- XSS vulnerabilities
- Unsafe eval usage
- Dependency vulnerabilities
- Authentication/authorization issues

### Style
- Naming conventions
- Code formatting
- Comment style
- Documentation completeness

## Profiles

### Quick (1-2 seconds)
- Basic quality metrics
- Obvious issues only
- No deep analysis

### Standard (5-10 seconds)
- Full quality analysis
- Anti-patterns detection
- Improvement suggestions

### Deep (30+ seconds)
- Performance profiling
- Security audit
- Dependency analysis
- Impact assessment

## Context
**Provides**: last_analysis, analysis_results
**Requires**: loaded_file

## Aliases
- `/ac` - Quick shortcut
- `/analyze` - When context is clear

## Related Commands
- `/load-file` - Load file first
- `/generate-docs` - Document findings
- `/generate-tests` - Create tests based on analysis
- `/suggest-fixes` - Get specific fixes

## Tips
- Run `/analyze-code --profile quick` for instant feedback
- Use `/analyze-code --focus performance` for optimization
- Chain with `/generate-docs` to document issues
```

---

### 3. /load-component - Load React component with dependencies

**File**: `.claude/commands/context/load-component.md`

```markdown
# /load-component

## Description
Load a React component and automatically find and include its dependencies.

## Usage
/load-component <component-name> [--folder PATH] [--include-tests]

## Parameters
- `component-name` - Component name (e.g., Button, UserCard, etc.)
  - Auto-detects from common locations: src/components/, src/
  - Supports both Component and component.jsx naming
- `--folder` - Specific folder to search (default: searches src/components/)
- `--include-tests` - Also load associated test files (default: false)
- `--include-styles` - Load CSS/styled-components (default: true)

## Examples
```
/load-component Button
/load-component UserCard --include-tests
/load-component HeroSection --folder src/components/sections
/load-component AppSlider --include-tests --include-styles
```

## What It Does
✓ Searches for component file
✓ Loads main component
✓ Finds all imports
✓ Loads dependencies
✓ Detects styled-components or CSS
✓ Shows dependency tree
✓ Lists where component is used

## Output Format
```
✓ Loaded Component: Button

Location: src/components/Button.jsx (156 lines)
Type: Functional React Component
Exports: Button (default), ButtonGroup (named)

Dependencies:
├─ react (3 hooks used: useState, useEffect, useRef)
├─ styled-components (2 files)
├─ src/utils/hooks.js
└─ src/theme.js

Files Loaded:
├─ Button.jsx (156 lines)
├─ Button.styles.js (89 lines)
└─ hooks.js (partial - 4 functions used)

Component Tree:
Button
├─ IconWrapper
├─ StyledButton
└─ Loading Spinner (conditional)

Used In (3 places):
├─ src/components/Form.jsx (line 42)
├─ src/pages/Settings.jsx (line 18)
└─ src/App.jsx (line 95)

Tests:
├─ src/__tests__/Button.test.jsx (12 tests)

Next Steps:
• /analyze-code - Analyze component
• /search-refs - Find all usages
• /generate-docs - Document component
• /generate-tests - Create/update tests
```

## Smart Detection
- Detects component location automatically:
  1. `src/components/[ComponentName]/`
  2. `src/components/[ComponentName].jsx`
  3. `src/components/index.js` (named export)
  4. `src/[ComponentName].jsx`
  5. Root `src/` search

- Handles naming variations:
  - Button / button / Button.jsx / button.jsx
  - ComponentName / component-name / component_name

## Context
**Provides**: loaded_component, component_deps, component_locations, component_tests
**Requires**: None (project context auto-detected)

## Aliases
- `/lc` - Quick shortcut
- `/load-comp` - Medium shortcut

## Related Commands
- `/load-file` - Load single file instead
- `/component list` - List all components
- `/component usage` - Show where used
- `/analyze-code` - Analyze component
- `/search-refs` - Find all usages

## Tips
- Use `/load-component Button --include-tests` to see tests
- Chain with `/analyze-code` to analyze component
- Use `/component usage` to see impact of changes
```

---

### 4. /portfolio - Portfolio management command group

**File**: `.claude/commands/portfolio/portfolio.md`

```markdown
# /portfolio

## Description
Main command for portfolio analysis, auditing, and optimization.

## Available Subcommands

### /portfolio analyze
Analyze entire portfolio structure

```
/portfolio analyze

Output:
╔═══════════════════════════════════════════╗
║     Portfolio Structure Analysis         ║
╚═══════════════════════════════════════════╝

Project: Johnny Sheng's Portfolio
├─ Framework: React 18.2.0 + Vite
├─ TypeScript: No
├─ Styling: Styled-components (100%)
└─ Deployment: GitHub Pages

Statistics:
├─ Components: 16 active, 5 unused (unused: Hoodie, Sticker, etc.)
├─ Routes: 11 active + 1 broken (/projects/NextProject)
├─ Pages: 5 (Hero, About, Projects, Archive, Contact)
├─ Project Details: 5 active (Grove, Ark, Collection, AP, CapsuleMachine)
├─ Lines of Code: 4,676 (down from 5,272 after optimization)
└─ Bundle Size: 797KB main (gzip: 227KB)

Assets:
├─ Total Size: 443MB (needs optimization)
├─ Largest: CM/ (278MB - Capsule Machine project)
├─ Optimized: Subject 2.png (833KB), microw.png (597KB)
└─ Recommendations: Compress GIFs, resize large PNGs

Code Quality:
├─ Dead Code: 0 (all removed)
├─ Unused Imports: 0
├─ Style Consistency: ✓ Good (sharedStyles.js)
├─ Documentation: ✓ Excellent (CLAUDE.md, README.md)
└─ Performance: ✓ Good (lazy loading, RAF optimization)

Health Score: 9.5/10
├─ Code Quality: 10/10
├─ Performance: 8/10
├─ Documentation: 10/10
├─ Architecture: 9/10
└─ Asset Optimization: 7/10

Next Steps:
1. Fix broken /projects/NextProject route
2. Remove unused components (Hoodie, Sticker, Lens)
3. Optimize remaining assets (443MB → target <100MB)
4. Add error boundaries
5. Implement lazy loading for images
```

### /portfolio health
Quick health check with scores

```
/portfolio health

Portfolio Health: 9.5/10 ✓

├─ Code: 10/10 ✓
│  ├─ Unused code: 0 lines
│  ├─ Complexity: Balanced
│  └─ Maintainability: Excellent
│
├─ Performance: 8/10
│  ├─ Bundle: 797KB (good)
│  ├─ Assets: 443MB (needs work)
│  └─ Lazy Loading: ✓ Implemented
│
├─ Documentation: 10/10 ✓
│  ├─ README.md: Complete
│  ├─ CLAUDE.md: Comprehensive
│  ├─ ARCHITECTURE.md: Detailed
│  └─ JSDoc: Present
│
├─ Testing: 0/10 (missing)
│  └─ Recommendation: Add unit tests (Vitest)
│
└─ Deployment: 8/10
   ├─ Build: Working
   ├─ Deploy Script: Fixed
   └─ GitHub Pages: Configured

Quick Wins (2 hours):
• Remove /projects/NextProject route
• Delete unused components
• Update .gitignore

Medium Effort (1 day):
• Compress asset files
• Add error boundaries
• Implement image lazy loading

Longer Term:
• Add unit tests
• Set up CI/CD
• Add analytics
```

### /portfolio audit
Full audit with detailed report

```
/portfolio audit [--format json|markdown|html]

Generates comprehensive audit covering:
✓ Code quality metrics
✓ Performance bottlenecks
✓ Security scan
✓ Asset optimization opportunities
✓ Accessibility audit
✓ SEO check
✓ Build analysis
✓ Dependency audit
```

### /portfolio stats
Show statistics

```
/portfolio stats

╔════════════════════════════════════════════╗
║         Portfolio Statistics              ║
╚════════════════════════════════════════════╝

Code Metrics:
├─ Total Lines: 4,676
├─ Components: 16
├─ Hooks Used: 8 (useState, useEffect, useRef, useNavigate, etc.)
├─ Styled Components: 18 shared styles
└─ Data Files: 2

Route Metrics:
├─ Total Routes: 11 active + 1 broken
├─ Depth: 2 levels (root, /projects/*)
├─ Page Transitions: Smooth (AnimatePresence)
└─ 404 Handling: Missing

Component Breakdown:
├─ Pages: 5 (Hero, About, Projects, Archive, Contact)
├─ Project Details: 5 (Grove, Ark, Collection, AP, CapsuleMachine)
├─ Utilities: 3 (AppSlider, NextProject, Navbar)
├─ Layout: 2 (Cursor, Line)
└─ Core: 1 (ShaderVisual)

Asset Metrics:
├─ Total: 443MB
├─ Images: 428MB
├─ Fonts: 37KB
├─ Largest File: AP-BTSsample2.gif (19.8MB)
└─ Unused Assets: 0 (all referenced)

Performance Metrics:
├─ Bundle Size: 797KB (main), 15 chunks
├─ Gzip: 227KB
├─ Lazy Loaded: 11 components
├─ Code Splitting: ✓ Enabled (Vite)
└─ Critical Resources: ShaderVisual.jsx (runs 60fps)

Dependencies:
├─ Production: 6 packages
├─ Development: 4 packages
├─ Unused: 0 (all removed)
└─ Security Issues: 0
```

### /portfolio routes
Visualize routing structure

```
/portfolio routes

Portfolio Routes Visualization:
════════════════════════════════════════════

/                          (Hero - Landing)
├─ Title: Johnny Sheng's Portfolio
├─ Animation: Diagonal lines
├─ Components: AppSlider
└─ Time: Instant load

/about                     (About - Bio)
├─ Animation: Horizontal stretched lines
└─ Components: Text content

/projects                  (Projects - Gallery)
├─ Animation: Vertical aligned lines
├─ Components: Projects.jsx, NextProject.jsx
└─ Subpages:
   ├─ /projects/Grove               ✓ Component exists
   ├─ /projects/Ark                 ✓ Component exists
   ├─ /projects/TheCollection       ✓ Component exists
   ├─ /projects/AlainaPamela        ✓ Component exists
   ├─ /projects/CapsuleMachine      ✓ Component exists
   ├─ /projects/Lens                ⚠ Has route but no data
   └─ /projects/NextProject         ✗ Broken route (should delete)

/archive                   (Archive - Horizontal Scroll)
├─ Animation: Double horizontal lines
├─ Components: Archive.jsx (17 projects)
└─ Note: Hardcoded data (should externalize)

/contact                   (Contact - Info)
├─ Animation: Complex C-letter animations
├─ Components: Contact links
└─ External: LinkedIn, Email

Issues Found:
❌ /projects/NextProject route should be deleted
   Reason: NextProject is a widget, not a page

⚠ /projects/Lens route has no data entry
   Options: Add to projectParty data or delete route

Missing:
• 404 page (undefined routes show blank)
• Loading page (during code-split chunk load)
```

## Context
**Provides**: portfolio_structure, portfolio_stats, audit_results
**Requires**: None (analyzes entire project)

## Related Commands
- `/component list` - List all components
- `/component analyze` - Analyze specific component
- `/search-refs` - Find usage patterns
- `/performance analyze` - Performance audit

## Examples
```
/portfolio analyze
/portfolio health
/portfolio audit --format markdown
/portfolio stats
/portfolio routes
```

## Aliases
- `/p` - Super quick shortcut
- `/pf` - Portfolio focus shortcut
```

---

### 5. /search-refs - Find references and usage

**File**: `.claude/commands/analysis/search-refs.md`

```markdown
# /search-refs

## Description
Search for references to the loaded file/component throughout the codebase.

## Usage
/search-refs [--pattern REGEX] [--scope SCOPE] [--show-context]

## Parameters
- `pattern` - Search pattern or reference name (auto-detected from loaded file)
- `--scope` - Where to search: `all`, `components`, `pages`, `tests` (default: all)
- `--show-context` - Show lines around matches (default: true)
- `--max-results` - Limit results (default: 50)

## Examples
```
/search-refs
/search-refs --pattern "useState" --scope components
/search-refs --scope tests --show-context
/search-refs "Button" --max-results 20
```

## Output Format
```
References Found: 12

src/components/Form.jsx
├─ Line 42: const form = <Button onClick={...} />
├─ Line 85: <Button variant="primary">Submit</Button>
└─ Context: Inside Form component

src/pages/Settings.jsx
├─ Line 18: import Button from '../components/Button'
├─ Line 156: <Button disabled>{isLoading && 'Loading...'}</Button>
└─ Context: Form submission area

src/App.jsx
├─ Line 95: <Button to="/about">Learn More</Button>
└─ Context: Hero section

Tests:
src/__tests__/Button.test.jsx
├─ Line 5: import Button from '../components/Button'
├─ Line 12: render(<Button>Click me</Button>)
└─ 12 test cases found

Usage Statistics:
├─ Total References: 12
├─ In Components: 8
├─ In Pages: 2
├─ In Tests: 2
└─ Imports: 1

Impact Analysis:
├─ Direct Dependents: 3 components
├─ Transitive Dependents: 7 components
└─ Changing this will affect: 3 pages
```

## Scopes

- `all` - All files in project
- `components` - src/components/ only
- `pages` - src/pages/ (or /components/Projectfiles/)
- `tests` - *test.* files
- `styles` - Styled-components and CSS
- `imports` - Just import statements

## Context
**Provides**: search_results, reference_locations
**Requires**: loaded_file (optional - can search without)

## Aliases
- `/sr` - Quick shortcut
- `/find` - Intuitive name

## Related Commands
- `/load-file` - Load context first
- `/load-component` - Load component first
- `/analyze-code` - Analyze references

## Tips
- Use after `/load-component Button` to see where Button is used
- Use `/search-refs --scope tests` to find test files
- Chain with `/analyze-code` to understand impact
```

---

## Configuration Files

### Aliases Configuration

**File**: `.claude/config/aliases.json`

```json
{
  "context-commands": {
    "/lf": "/load-file",
    "/load": "/load-file",
    "/lc": "/load-component",
    "/load-comp": "/load-component",
    "/lf": "/load-folder",
    "/folder": "/load-folder"
  },

  "analysis-commands": {
    "/ac": "/analyze-code",
    "/analyze": "/analyze-code",
    "/sr": "/search-refs",
    "/find": "/search-refs",
    "/perf": "/performance analyze",
    "/health": "/portfolio health"
  },

  "portfolio-commands": {
    "/p": "/portfolio",
    "/pf": "/portfolio",
    "/pa": "/portfolio analyze",
    "/ph": "/portfolio health",
    "/ps": "/portfolio stats",
    "/pr": "/portfolio routes"
  },

  "generation-commands": {
    "/gd": "/generate-docs",
    "/gt": "/generate-tests",
    "/gs": "/generate-snippets"
  },

  "development": {
    "/dev": "/dev-start",
    "/test": "/dev-test",
    "/build": "/dev-build"
  }
}
```

### Default Settings

**File**: `.claude/config/defaults.json`

```json
{
  "load-file": {
    "include-imports": false,
    "depth": 2
  },

  "analyze-code": {
    "profile": "standard",
    "focus": "quality",
    "show-examples": true
  },

  "search-refs": {
    "scope": "all",
    "show-context": true,
    "max-results": 50
  },

  "portfolio": {
    "format": "markdown",
    "include-stats": true,
    "include-recommendations": true
  },

  "dev-environment": {
    "port": 3000,
    "auto-reload": true,
    "linter": "eslint"
  }
}
```

---

## Command Registry

**File**: `.claude/commands/index.md`

```markdown
# Command Registry

## Quick Reference

| Command | Alias | Purpose | Status |
|---------|-------|---------|--------|
| `/load-file` | `/lf` | Load file into context | ✓ Core |
| `/load-component` | `/lc` | Load component + deps | ✓ Core |
| `/load-folder` | `/lf` | Load entire folder | ⏳ Planned |
| `/analyze-code` | `/ac` | Analyze loaded code | ✓ Core |
| `/search-refs` | `/sr` | Find references | ✓ Core |
| `/portfolio` | `/p` | Portfolio management | ✓ Core |
| `/component list` | - | List all components | ⏳ Phase 2 |
| `/component analyze` | - | Analyze component | ⏳ Phase 2 |
| `/generate-docs` | `/gd` | Generate documentation | ⏳ Phase 2 |
| `/generate-tests` | `/gt` | Generate test stubs | ⏳ Phase 2 |
| `/performance` | `/perf` | Performance analysis | ⏳ Phase 3 |
| `/help` | - | Show help | ✓ Built-in |

## Categories

### Core Commands (Essential)
- `/load-file` - Load file into context
- `/load-component` - Load component with dependencies
- `/analyze-code` - Analyze code quality
- `/search-refs` - Find references
- `/portfolio` - Portfolio management
- `/help` - Help system

### Phase 2: Component Tools
- `/component list` - List all components
- `/component analyze` - Analyze specific component
- `/component usage` - Show where component is used
- `/component test` - View/generate tests

### Phase 3: Generation Tools
- `/generate-docs` - Generate documentation
- `/generate-tests` - Create test stubs
- `/generate-types` - Generate TypeScript definitions

### Phase 4: Advanced
- `/performance analyze` - Performance metrics
- `/security audit` - Security analysis
- `/template` - Command templates
- `/project` - Project management

## Implementing a New Command

### Step 1: Create command file
```
.claude/commands/[category]/[command-name].md
```

### Step 2: Define structure
```markdown
# /command-name

## Description
What it does

## Usage
/command-name [params]

## Examples
/command-name example1
```

### Step 3: Add to registry
Update `.claude/commands/index.md` with new command

### Step 4: Add aliases (optional)
Update `.claude/config/aliases.json`

### Step 5: Add to index
Update main help with new command

## Progress Tracking

### Week 1: Foundation ✓
- [x] /load-file
- [x] /analyze-code
- [x] /search-refs
- [x] /portfolio (main)
- [x] /help system

### Week 2: Expansion
- [ ] /load-component (enhanced)
- [ ] /load-folder
- [ ] /component list
- [ ] /component analyze
- [ ] /portfolio audit

### Week 3: Generation
- [ ] /generate-docs
- [ ] /generate-tests
- [ ] /generate-types
- [ ] /suggest-fixes

### Week 4: Polish
- [ ] /performance analyze
- [ ] /security audit
- [ ] /template system
- [ ] Advanced /help

## Help Topics

### For Users
- [Command Naming](../docs/naming-conventions.md)
- [Parameters Guide](../docs/parameters.md)
- [Context Stacking](../docs/context.md)
- [Command Chains](../docs/composability.md)

### For Developers
- [Command API](../docs/api.md)
- [Middleware System](../docs/middleware.md)
- [Adding Commands](../docs/adding-commands.md)
- [Testing Commands](../docs/testing.md)
```

---

## Help System Implementation

**File**: `.claude/commands/_base/help.system.md`

```markdown
# Help System

## Main Help

```
/help

╔════════════════════════════════════════════╗
║         Claude Code Command Help          ║
╚════════════════════════════════════════════╝

Most Common Commands:
├─ /load-file src/App.jsx        Load a file
├─ /analyze-code                 Analyze loaded file
├─ /search-refs                  Find references
├─ /portfolio health             Check portfolio health
└─ /generate-docs                Create documentation

Getting Started:
1. /load-file [path]              Load a file to work with
2. /analyze-code                  See what can be improved
3. /search-refs                   Find where it's used
4. /generate-docs                 Create documentation

Learning Resources:
├─ /help quick-start              5-minute introduction
├─ /help commands                 All available commands
├─ /help examples                 Real-world examples
├─ /help keyboard                 Keyboard shortcuts
└─ /help contact                  Get help

Type "/help [command]" for detailed help
Type "/help [topic]" for topic overview
```

## Command-Specific Help

```
/help load-file

╔════════════════════════════════════════════╗
║            /load-file Help                ║
╚════════════════════════════════════════════╝

Description:
Load a file into context for analysis.
Subsequent commands will use this file.

Usage:
/load-file <path> [--include-imports] [--depth N]

Parameters:
• path (required)          File path: src/App.jsx
• --include-imports        Load dependencies (default: no)
• --depth                  Import depth: 1-5 (default: 2)

Quick Examples:
/load-file src/App.jsx
/load-file src/components/Button.jsx --include-imports

Common Patterns:
Pattern 1: Quick analysis
  /load-file src/App.jsx
  /analyze-code

Pattern 2: Impact analysis
  /load-component Button
  /search-refs

Next Commands You Might Want:
├─ /analyze-code          Analyze this file
├─ /search-refs           Find where it's used
├─ /generate-docs         Document it
└─ /show-context          See what's loaded

Tips:
✓ Use Tab to autocomplete file paths
✓ Use /load-file (no path) to reload last file
✓ Use /clear-context to start fresh
✓ Use /show-context to see what's loaded

Related Commands:
/load-component, /load-folder, /clear-context
```

## Error Help

When user makes a mistake:

```
/load-file src/app.jsx
Error: File not found at "src/app.jsx"

Did you mean?
① src/App.jsx (92% match - case issue)
② src/apps/index.jsx (68% match)
③ src/app/main.js (60% match)

Type the number to load, or try /load-file [new-path]

Other options:
├─ /search-files "app*"   Find files matching pattern
├─ /list-files src/       Show files in folder
└─ /help load-file        See full help

Most similar: /load-file src/App.jsx
```

## Contextual Suggestions

When command completes, suggest next steps:

```
✓ Loaded src/App.jsx (175 lines)

Quick Analysis: Medium complexity component

Next Steps:
① /analyze-code               Analyze this file
② /search-refs                See where it's used (12 places)
③ /generate-docs              Document component
④ /load-component Button      Load a dependency

Keyboard Shortcut:
Press Tab to see available commands
```

## Progressive Disclosure

### Beginner Mode
```
/help

Shows:
- 5 most common commands
- Quick examples
- Link to tutorial
```

### Intermediate Mode
```
/help all

Shows:
- All commands by category
- Common patterns
- Tips and tricks
```

### Expert Mode
```
/help advanced

Shows:
- All 40+ commands
- Advanced patterns
- Customization options
- Performance tips
```

## Context Help

### Contextual Commands
When user has loaded a file:
```
Loaded: src/App.jsx (175 lines)

Available Commands:
├─ /analyze-code      ← Analyze this file
├─ /search-refs       ← Find where used
├─ /load-imports      ← Load dependencies
└─ /generate-docs     ← Document

Type command or /help [command]
```

### Smart Suggestions
```
You just loaded 5 large files.

Tip: You can chain commands!
/load-file src/App.jsx | /analyze-code

This will analyze each file automatically.
```
```

---

## Template Examples

### Template 1: Quick Code Review

**File**: `.claude/templates/quick-review.md`

```markdown
# Quick Review Template

## Purpose
Fast 5-minute code review workflow

## Steps

1. Load the file
   /load-file $1

2. Quick analysis
   /analyze-code --profile quick

3. Check usages
   /search-refs

4. Review summary
   /portfolio health

## Usage
/template use quick-review src/components/Button.jsx

## Output
- Code metrics
- Issues found
- Usage statistics
- Health score
```

### Template 2: Component Documentation

**File**: `.claude/templates/component-docs.md`

```markdown
# Component Documentation Template

## Purpose
Comprehensive component documentation workflow

## Steps

1. Load component
   /load-component $1 --include-tests

2. Analyze component
   /analyze-code --focus quality

3. Find usages
   /search-refs

4. Generate docs
   /generate-docs --from-analysis

5. Generate tests
   /generate-tests

## Usage
/template use component-docs Button

## Outputs
- Component analysis
- Usage map
- Generated documentation
- Test stubs
```

### Template 3: Performance Optimization

**File**: `.claude/templates/perf-optimize.md`

```markdown
# Performance Optimization Template

## Purpose
Identify and fix performance issues

## Steps

1. Load project
   /load-context src/

2. Performance analysis
   /analyze-code --focus performance --profile deep

3. Bundle analysis
   /performance analyze --focus bundle

4. Asset audit
   /performance analyze --focus assets

5. Optimization suggestions
   /suggest-fixes --focus performance

## Usage
/template use perf-optimize

## Outputs
- Performance bottlenecks
- Bundle size report
- Asset optimization tips
- Code suggestions
```

---

## Integration Points

### Integration with VS Code

**.claude/config/vscode-integration.json**

```json
{
  "keybindings": {
    "ctrl+alt+l": "/load-file ${selectedFile}",
    "ctrl+alt+a": "/analyze-code",
    "ctrl+alt+f": "/search-refs",
    "ctrl+alt+p": "/portfolio health",
    "ctrl+alt+d": "/generate-docs"
  },

  "context-menu": {
    "load-file": "Load this file",
    "analyze-code": "Analyze",
    "search-refs": "Find references",
    "generate-docs": "Generate docs"
  }
}
```

### Integration with Git

**.claude/config/git-integration.json**

```json
{
  "hooks": {
    "pre-commit": "/analyze-code --scope staged-files",
    "pre-push": "/portfolio health --threshold 8",
    "post-merge": "/portfolio analyze --since-merge"
  },

  "commands": {
    "changed-files": "/load-file --git-changed",
    "uncommitted": "/analyze-code --git-unstaged",
    "since-commit": "/search-refs --since-commit $1"
  }
}
```

---

## Next Steps

1. **Create directory structure**
   ```bash
   mkdir -p .claude/commands/{context,analysis,portfolio}
   mkdir -p .claude/config
   mkdir -p .claude/templates
   ```

2. **Copy command files**
   - Save each command as `.claude/commands/[category]/[name].md`

3. **Create configuration**
   - Save aliases to `.claude/config/aliases.json`
   - Save defaults to `.claude/config/defaults.json`

4. **Test commands**
   - Try `/load-file src/App.jsx`
   - Try `/analyze-code`
   - Try `/portfolio health`

5. **Expand as needed**
   - Add more commands
   - Create templates
   - Build integrations

6. **Documentation**
   - Update main README with commands
   - Add command tutorial
   - Create quickstart guide

---

**Ready to implement!** Start with the 5 core commands and expand from there.

