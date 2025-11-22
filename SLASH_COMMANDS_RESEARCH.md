# Slash Commands Architecture for Developer Tools

**Author**: Claude Code Research
**Date**: 2025-11-22
**Purpose**: Research patterns and best practices for designing powerful, scalable slash command systems
**Target**: Claude Code on the Web - AI-assisted code analysis and project management

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Command Pattern Fundamentals](#command-pattern-fundamentals)
3. [Industry Analysis](#industry-analysis)
4. [Naming Conventions & Discoverability](#naming-conventions--discoverability)
5. [Parameter Passing & Templating](#parameter-passing--templating)
6. [Context Injection Patterns](#context-injection-patterns)
7. [Composable Command Architecture](#composable-command-architecture)
8. [Documentation & Help Systems](#documentation--help-systems)
9. [Portfolio-Specific Recommendations](#portfolio-specific-recommendations)
10. [Implementation Roadmap](#implementation-roadmap)

---

## Executive Summary

### Key Findings

**Best Practices from Industry Leaders:**
1. **Hierarchical Taxonomy** - Nested command structures improve discoverability (Slack: `/remind`, `/remind me`, `/remind me in`)
2. **Context Awareness** - Commands that auto-detect file context reduce friction (VS Code: `/find` defaults to current file)
3. **Composability** - Commands can be chained or composed (Shell pipes, Unix philosophy)
4. **Discoverable Aliases** - Shortcuts for power users without sacrificing clarity
5. **Fail-Safe Help** - Built-in documentation and examples on parameter errors
6. **Progressive Disclosure** - Basic mode vs advanced mode for complex operations

### Recommended Command Taxonomy for Code Projects

```
/load-*              Load context from various sources
  /load-file        Load single file content
  /load-component   Load React component with dependencies
  /load-context     Load entire folder context
  /load-git         Load git history/diffs

/analyze-*           Run various analyses
  /analyze-code     Code quality, patterns, anti-patterns
  /analyze-perf     Performance metrics
  /analyze-deps     Dependency analysis
  /analyze-types    Type checking and inference

/generate-*          Create new code/docs
  /generate-docs    Auto-generate documentation
  /generate-tests   Create test stubs
  /generate-types   Generate TypeScript definitions

/search-*            Find and query
  /search-code      Full-text search
  /search-refs      Find references
  /search-pattern   Regex pattern search

/manage-*            Project management
  /manage-todos     View/update task list
  /manage-deps      Dependency management
  /manage-build     Build configuration

/config-*            Configuration
  /config-theme     Theme/styling settings
  /config-linters   Linter configuration

/dev-*               Development workflows
  /dev-start        Start dev environment
  /dev-test         Run tests
  /dev-deploy       Deploy commands
  /dev-watch        Watch mode operations
```

---

## Command Pattern Fundamentals

### The Slash Command Model

A slash command is a structured interaction pattern that:
1. **Initiates with a trigger** (`/` prefix)
2. **Specifies an action** (verb-noun pairing: `/load-file`, `/analyze-code`)
3. **Accepts parameters** (structured or unstructured)
4. **Returns structured output** (data, state changes, or guidance)
5. **Maintains context** (remembers previous command state)

```
/command-name param1 param2 --flag value --toggle
        │        │      │     │    │      │      │
       verb    required optional flag  value  option
```

### Command Lifecycle

```
Input → Parsing → Validation → Context Loading → Execution → Output → State Update
  │       │           │            │               │          │          │
  ↓       ↓           ↓            ↓               ↓          ↓          ↓
User    Tokenize   Type Check   Inject Data    Run Logic  Format     Remember
enters  parameters  parameters   dependencies  resolver   results    for next
command            find file    from file     or query    for user   command
        │           │            system       system      display
        └─ Fail: Show suggestions
```

---

## Industry Analysis

### 1. Slack Command Patterns

**Strength**: Natural language, progressive disclosure, excellent help system

```
/remind me to check metrics in 5 minutes
/remind me on Wednesday at 2pm to review PRs
/remind me every Friday at 9am

// Slack's approach:
- Main command: /remind
- Flexible sub-commands (nested, not explicit)
- Natural time parsing (NLP)
- Remembers context from conversation
- Error messages show examples
```

**Key Pattern**: **Contextual defaults**
- `/remind` followed by natural language uses conversation context
- System asks clarifying questions if ambiguous
- Remembers who you asked for reminders from (conversation history)

**Discoverability**: Type `/` to see all commands, `?` for help on any command

### 2. Discord Command Patterns

**Strength**: Hierarchical organization, prefix flexibility, server context

```
/music play Radiohead
/music pause
/music shuffle
/music queue

/moderation ban @user reason:"spam" duration:"24h"
/moderation warn @user reason:"off-topic"

// Discord's approach:
- Hierarchical: command → subcommand → parameters
- Named parameters with `:` syntax
- Server-wide context (permissions, settings)
- Rich responses with embeds
- Command aliases (/p instead of /pause)
```

**Key Pattern**: **Subcommand groups for organization**
```
/[parent] [subcommand] [subcommand-group] [options]
/moderation ban @user reason:"spam"
/music play track:"Never Gonna Give You Up"
```

**Parameter Syntax**:
- Positional: `/ban @user 24h`
- Named: `/ban user:@user duration:24h`
- Hybrid: `/ban @user duration:24h` (first positional, rest named)

### 3. VS Code Command Palette Pattern

**Strength**: Fuzzy search, categorization, keyboard-driven

```
File: Open
File: Save
File: Recent
Debug: Start
Debug: Continue
Search: Find
Search: Replace
Refactor: Extract Method

// VS Code's approach:
- Fuzzy matching: type "fod" finds "File: Open Document"
- Categories with `:` separator (File:, Edit:, View:)
- Keyboard shortcut hints
- Recently used tracking
- Personalized ranking (your most-used commands first)
```

**Key Pattern**: **Fuzzy search + categorization**
- Commands organized by domain
- Powerful search reduces need to know exact names
- Frequently used commands bubble up

### 4. GitHub CLI (gh) Command Patterns

**Strength**: Composability, piping, subcommand depth

```
gh repo clone owner/repo
gh issue create --title "Bug report" --body "Details"
gh pr create --base main --head feature-branch
gh issue list --assignee @me --state open
gh workflow run --ref main deploy.yml
gh secret set DATABASE_URL --body "postgres://..."

// GitHub CLI's approach:
- Subcommands: gh [resource] [action] [flags]
- Flag-based parameters (Unix philosophy)
- Piping support: gh issue list --json | jq
- Progressive flags (basic → advanced)
- --help on any command
```

**Key Pattern**: **Unix-style flags and piping**
```
gh issue list | grep "bug" | xargs -I {} gh issue close {}
```

### 5. Figma Plugin Command System

**Strength**: Stateful, event-driven, context preservation

```
/export-selection format:"pdf" quality:"high"
/align-objects direction:"center-vertical"
/generate-components from:"board"

// Figma's approach:
- Selection context automatically injected
- Commands update selection state
- Undo/redo integration
- Visual feedback during command execution
- Nested menus for complex options
```

**Key Pattern**: **Selection/focus state as implicit context**
- Commands know what's selected
- No need to specify: `/delete` (not `/delete selection`)
- State mutation is tracked

---

## Naming Conventions & Discoverability

### 1. Verb-Noun Structure

**Most Effective Pattern**:
```
[verb]-[noun]     Examples:
load-file         /load-file src/App.jsx
load-component    /load-component Button (auto-finds Button.jsx)
load-context      /load-context src/components
analyze-code      /analyze-code (analyzes last loaded file)
generate-docs     /generate-docs src/components
search-refs       /search-refs "useState"
```

**Rationale**:
- Verbs are discoverable (users know what action they want)
- Nouns specify scope
- Hyphenation is standard across tools (VS Code, GitHub CLI)
- Prevents confusion with subcommands

### 2. Hierarchy Over Nesting

**Good** (three levels, clear):
```
/load-file
/load-component
/load-context
```

**Avoid** (too deep):
```
/load file single
/load component local
/load context global
```

**Why**: Autocomplete works better with full command names, easier to type consistently

### 3. Progressive Naming

**Tier 1: Essential** (what 80% of users need)
```
/load           Load file
/analyze        Analyze loaded file
/search         Search codebase
```

**Tier 2: Specific** (what 15% need frequently)
```
/load-file      Load specific file
/load-component Load React component with dependencies
/analyze-code   Code quality analysis
/analyze-perf   Performance metrics
```

**Tier 3: Expert** (what 5% need occasionally)
```
/load-file --with-ast      Include AST output
/analyze-code --rules custom.config.json
```

### 4. Alias Strategy

```
Primary Command          →  Alias        →  Keyboard Shortcut
/load-file               →  /lf          →  Ctrl+L
/analyze-code            →  /ac          →  Ctrl+A
/generate-docs           →  /gd          →  Ctrl+G
/search-refs             →  /sr          →  Ctrl+F
```

**Rules for Aliases**:
- Keep to 2-3 characters maximum
- Use first letter of each word (intuitive)
- Reserve common shortcuts (Ctrl+S, Ctrl+C)
- Document aliases prominently

### 5. Discoverability Features

**Feature A: Command Browser**
```
/help commands     Lists all commands with descriptions
/help load-*       Shows all commands starting with "load-"
/help --search analyze    Shows commands matching "analyze"
```

**Feature B: Contextual Help**
```
User types: /load-f
System suggests:
  /load-file          Load a single file
  /load-folder        Load entire folder
  /load-fixture       Load test fixture
```

**Feature C: Smart Defaults**
```
/load             Loads currently open file
/analyze          Analyzes last loaded file
/search           Searches for last search term
```

---

## Parameter Passing & Templating

### 1. Parameter Styles

**Style A: Positional** (Simple, natural)
```
/load-file src/App.jsx
/search-refs useState src/hooks
/generate-docs src/components output/docs
```

**Style B: Named** (Explicit, clearer for complex commands)
```
/load-file path:"src/App.jsx"
/search-refs pattern:"useState" dir:"src/hooks"
/generate-docs source:"src/components" output:"output/docs"
```

**Style C: Flags** (Unix-style, powerful)
```
/load-file src/App.jsx --include-ast --depth 2
/search-refs useState --in-tests --exclude-node_modules
/generate-docs src/components --output docs --format markdown
```

**Style D: Hybrid** (Recommended)
```
/load-file src/App.jsx --with-ast --depth 2
             ↑                      ↑
        positional               flags (optional)

/load-component Button --in-folder src/components --with-tests
                 ↑      ↑                            ↑
            positional named-positional             flag-optional
```

**Best Practice**: Primary operation → main parameters → optional flags

### 2. Parameter Validation & Error Handling

```javascript
// Smart parameter validation with helpful errors

Command: /load-file path.jsx
Error: File not found at "path.jsx"

Suggestions:
  • Did you mean: /load-file src/path.jsx? (nearest match)
  • Similar files:
    - src/Path.jsx
    - src/pages/path.jsx
    - src/utils/path.js

Use /help load-file for examples
```

**Validation Strategy**:
1. **Path normalization** - Handle relative paths, typos
2. **Fuzzy matching** - Suggest closest file if exact match not found
3. **Type coercion** - Try to understand what user meant
4. **Helpful errors** - Show similar options, not just "error"

### 3. Template System

**Use Case**: Reduce repetition for common workflows

```
// Define a template
/template define quick-analysis
  /load-file $1
  /analyze-code --profile=quality
  /generate-docs --output=analysis-$timestamp.md

// Use the template
/template use quick-analysis src/App.jsx

// Run with different inputs
/template quick-analysis src/components/Button.jsx
```

**Template Variables**:
- `$1, $2, ...` - Positional parameters
- `$timestamp` - Current timestamp
- `$date` - Current date
- `$cwd` - Current working directory
- `$selected` - Currently selected text
- `$lastfile` - File from last command

### 4. Chaining Commands

```
// Sequential execution (remembers output)
/load-component Button
/analyze-code                    // Analyzes Button (from context)
/generate-docs --from-analysis   // Uses analysis from previous step

// Parallel (Unix-style)
/search-refs useState | /analyze-code

// Conditional
/analyze-code --if-failed /load-file src/App.jsx --retry
```

---

## Context Injection Patterns

### 1. Implicit Context Stack

**The Problem**: Users shouldn't repeat themselves
```
User: /load-file src/App.jsx
System: ✓ Loaded src/App.jsx (347 lines)

User: /analyze-code              // Should analyze App.jsx
User: /generate-docs             // Should document App.jsx
```

**Solution: Context Stack**
```
CONTEXT STACK:
├─ loaded_file: src/App.jsx
├─ loaded_component: null
├─ last_search: null
├─ last_analysis: null
└─ selected_text: null
```

**Implementation**:
```
When user enters command:
1. Check if file argument provided → use that
2. If not, use loaded_file from context
3. If not, ask user
4. Update context stack for next command
```

**Code Example**:
```
/load-file src/App.jsx
Context: { loaded_file: "src/App.jsx" }

/analyze-code
Resolves to: /analyze-code src/App.jsx (from context)
Context: { loaded_file: "src/App.jsx", last_analysis: {...} }

/generate-docs --from-analysis
Resolves to: /generate-docs src/App.jsx --from-analysis
Uses: last_analysis from context + App.jsx
```

### 2. Project Context Auto-Detection

**Smart defaults based on project structure**:
```
Detected: React + TypeScript + Jest
├─ Source: src/
├─ Tests: src/__tests__/
├─ Components: src/components/
├─ Hooks: src/hooks/
├─ Styles: src/styles/
└─ Config: tsconfig.json, jest.config.js

When user enters /load-component Button
System searches in order:
1. src/components/Button.tsx
2. src/components/Button/Button.tsx
3. src/components/Button/index.tsx
4. src/Button.tsx
```

**Detection Logic**:
```javascript
detectProjectType() {
  if (has('package.json') && has('tsconfig.json')) {
    return 'typescript-react'
  }
  if (has('package.json') && has('jest.config.js')) {
    return 'javascript-jest'
  }
  // ... more checks
}
```

### 3. Selection/Focus Context

Inspired by Figma's model:

```
User selects text in editor:
Text: "useState(initialValue)"

Commands can use this:
/search-refs                 // Searches for useState (from selection)
/analyze-code               // Analyzes the selected code
/generate-types             // Generates types for selected code
/document                   // Documents selected code
```

**API**:
```
getSelection() → selected text
getSelectedFile() → file containing selection
getSelectedLine() → line number
getSelectedRange() → start/end positions
```

### 4. File Tree Context

```
Command: /load-context src/components

This injects:
├─ Source files in folder
├─ Directory structure
├─ Import relationships
├─ File sizes
└─ Git history (if available)

Available in subsequent commands:
/analyze-code --scope=loaded-context
/search-refs --scope=loaded-context
/generate-docs --from-loaded-context
```

---

## Composable Command Architecture

### 1. Core Command Structure

```javascript
// Command definition format
{
  name: "load-file",
  aliases: ["lf", "load"],
  category: "context",
  description: "Load a file into context",

  parameters: {
    path: {
      type: "string",
      required: true,
      description: "File path (relative or absolute)",
      placeholder: "src/App.jsx"
    },
    "with-ast": {
      type: "boolean",
      default: false,
      description: "Include AST output"
    },
    depth: {
      type: "number",
      default: 2,
      description: "Import depth to analyze"
    }
  },

  examples: [
    "/load-file src/App.jsx",
    "/load-file src/App.jsx --with-ast",
    "/load-file src/App.jsx --depth 3"
  ],

  context: {
    provides: ["loaded_file", "loaded_ast", "file_stats"],
    requires: []
  },

  execute: async (params, context) => {
    // Implementation
  }
}
```

### 2. Command Composition Pattern

**Pattern A: Sequential Composition**
```
/load-file → /analyze-code → /generate-docs
   ↓             ↓               ↓
File content  Analysis data  Documentation
```

**Pattern B: Parallel Composition**
```
        ┌─→ /analyze-code
        │
/load-file ┼─→ /analyze-deps
        │
        └─→ /search-refs
```

**Pattern C: Conditional Composition**
```
/load-file
  ├─→ /analyze-code
  │     ├─→ (if pass) /generate-docs
  │     └─→ (if fail) /suggest-fixes
```

### 3. Middleware Pattern

```javascript
// Middleware runs before command execution

middlewares = [
  validateParameters,      // Check types, required fields
  resolveContext,         // Inject implicit context
  expandAliases,          // Convert /lf → /load-file
  normalizeFilePaths,     // Handle relative paths
  checkPermissions,       // Can user run this?
  recordMetrics,          // Track usage
  executeCommand,         // Run the actual command
  updateContextStack,     // Update for next command
  formatOutput,           // Pretty-print results
  recordHistory           // Remember for undo/redo
]
```

**Example Middleware**:
```javascript
resolveContext: (command, params, context) => {
  // If no file param, use loaded_file
  if (!params.path && context.loaded_file) {
    params.path = context.loaded_file
  }

  // If searching but no search term, use last_search
  if (command === 'search' && !params.query && context.last_search) {
    params.query = context.last_search
  }

  return { command, params, context }
}
```

### 4. Event System

```javascript
// Commands emit events, triggering other commands

events = {
  'file:loaded': (file) => {
    // Auto-run analysis if file > 1000 lines
    if (file.lines > 1000) {
      console.log("⚠️ Large file detected. Run /analyze-code?")
    }
  },

  'analysis:complete': (results) => {
    // Offer next steps
    if (results.issues > 5) {
      console.log("Found {results.issues} issues. Run /suggest-fixes?")
    }
  },

  'search:complete': (results) => {
    // Show stats
    console.log(`Found ${results.count} matches in ${results.time}ms`)
  }
}
```

---

## Documentation & Help Systems

### 1. Command Discovery

**Approach A: Help Index**
```
/help                          List all commands by category
/help --category context       Show all context commands
/help load-file               Show detailed help for specific command
/help --search "import"       Find commands mentioning imports
```

**Output Format**:
```
Context Commands (7 total)
├─ /load-file              Load a single file
├─ /load-component         Load React component + dependencies
├─ /load-context           Load entire folder context
├─ /load-git               Load git history
├─ /load-fixture           Load test fixture
├─ /clear-context          Clear all context
└─ /show-context           Show current context stack

Analyze Commands (5 total)
├─ /analyze-code           Code quality metrics
├─ /analyze-perf           Performance analysis
├─ /analyze-deps           Dependency graph
└─ /analyze-types          Type inference

Type '/help [command-name]' for details
```

### 2. Inline Help & Examples

```
User enters: /load-file
System returns:

Usage: /load-file <path> [options]

Description: Load a file into the analysis context

Parameters:
  path (required)          File path, e.g., src/App.jsx
  --with-ast              Include AST representation
  --depth <number>        Import resolution depth (default: 2)

Examples:
  /load-file src/App.jsx
  /load-file src/components/Button.jsx --with-ast
  /load-file src/App.jsx --depth 3

Related Commands:
  /load-component  Load React component with deps
  /load-context    Load entire folder
  /clear-context   Clear loaded context
```

### 3. Progressive Disclosure

**Basic Mode** (first-time users):
```
/help
Shows 5 most common commands:
├─ /load-file
├─ /analyze-code
├─ /generate-docs
├─ /search-refs
└─ /generate-tests

Type '/help [command]' for details
Type '/help advanced' for more commands
```

**Advanced Mode**:
```
/help advanced
Shows all 40+ commands organized by category

Also available:
  /template list           List saved command templates
  /config show             Show current configuration
  /metrics show            Show usage metrics
```

### 4. Error Messages as Teaching

**Bad Error** ❌:
```
Error: file not found
```

**Good Error** ✅:
```
Error: File not found at "path.jsx"

Suggestions:
  1. Check spelling (did you mean: src/Path.jsx?)
  2. List files: /search-files "path*"
  3. Load current file: /load-file
  4. Show file tree: /show-tree src/

For help: /help load-file
```

### 5. Smart Suggestions

```
User enters: /load-file src/app.jsx
System: File not found at "src/app.jsx"

Found similar files:
  • src/App.jsx         (92% match - case difference)
  • src/apps/index.jsx  (67% match - path difference)
  • src/app/main.js     (60% match - multiple differences)

Load one of these? (type number or full path)
```

---

## Portfolio-Specific Recommendations

### Portfolio Analysis Commands

```
/portfolio              Main command group
  /portfolio analyze    Analyze entire portfolio structure
  /portfolio audit      Code quality audit
  /portfolio health     Overall health score with metrics
  /portfolio stats      Statistics (LOC, components, etc.)
  /portfolio routes     Visualize routing structure

/component             Component analysis
  /component list      List all components
  /component analyze   Analyze specific component
  /component deps      Show component dependencies
  /component usage     Show where component is used
  /component test      Show/generate tests

/performance           Performance analysis
  /performance analyze Analyze bundle and assets
  /performance audit   Performance audit report
  /performance suggest Optimization suggestions

/project               Project management
  /project status      Current project health
  /project cleanup     Suggest cleanup actions
  /project optimize    Run optimization analysis
  /project deploy      Deployment checklist

/documentation         Documentation
  /documentation gen   Generate documentation
  /documentation audit Documentation completeness audit
  /documentation sync  Sync docs with code
```

### Context Stack for Portfolio

```
PORTFOLIO CONTEXT:
├─ loaded_file: null
├─ loaded_component: null
├─ loaded_folder: "src/components"
├─ portfolio_structure: { routes: 11, components: 16, ... }
├─ analysis_result: null
├─ optimization_focus: "bundle-size"
└─ last_command: "/portfolio audit"
```

### Recommended Command Implementation Order

**Phase 1: Essential (Week 1)**
```
/load-file
/load-component
/analyze-code
/search-refs
/help
```

**Phase 2: Portfolio-Specific (Week 2)**
```
/portfolio analyze
/portfolio health
/component list
/component analyze
```

**Phase 3: Advanced (Week 3)**
```
/generate-docs
/performance analyze
/template system
/project cleanup
```

**Phase 4: Polish (Week 4)**
```
Advanced help system
Command suggestions
Integration with IDE
Metrics/analytics
```

---

## Implementation Roadmap

### Architecture Overview

```
User Input
    ↓
Command Parser (tokenize, extract parameters)
    ↓
Command Registry (find command definition)
    ↓
Middleware Pipeline
  ├─ Parameter Validation
  ├─ Context Resolution
  ├─ Permission Check
  └─ Pre-execution Hooks
    ↓
Command Executor
    ↓
Output Formatter
    ↓
Context Update
    ↓
Display to User
```

### File Structure for Commands

```
.claude/
├── commands/
│   ├── _base/
│   │   ├── command.template.md
│   │   ├── help.system.md
│   │   └── context.manager.md
│   │
│   ├── context/
│   │   ├── load-file.md
│   │   ├── load-component.md
│   │   ├── load-context.md
│   │   └── clear-context.md
│   │
│   ├── analysis/
│   │   ├── analyze-code.md
│   │   ├── analyze-performance.md
│   │   └── analyze-dependencies.md
│   │
│   ├── portfolio/
│   │   ├── portfolio-health.md
│   │   ├── portfolio-audit.md
│   │   └── portfolio-analyze.md
│   │
│   └── index.md (Registry of all commands)
│
├── templates/
│   ├── quick-analysis.md
│   ├── full-audit.md
│   └── optimization-workflow.md
│
├── config.json
│   ├── command-aliases
│   ├── default-parameters
│   └── middleware-config
│
└── settings.local.json
```

### Command Definition Format (Markdown-based)

```markdown
# /load-file

## Description
Load a single file into the analysis context for subsequent commands.

## Usage
/load-file <path> [--with-ast] [--depth N]

## Parameters
- `path` (required) - File path relative to project root
- `--with-ast` (optional) - Include AST representation in output
- `--depth` (optional) - Import resolution depth (default: 2)

## Examples
```
/load-file src/App.jsx
/load-file src/components/Button.jsx --with-ast
```

## Context
**Provides**: loaded_file, loaded_ast (if --with-ast)
**Requires**: None (works at project root)

## Related Commands
- /load-component - Load React component with dependencies
- /load-context - Load entire folder

## See Also
- /help load-* - See all load commands
- /clear-context - Clear loaded context
```

### Context Manager Implementation

```javascript
class ContextManager {
  constructor() {
    this.stack = {
      loaded_file: null,
      loaded_component: null,
      loaded_context: null,
      last_search: null,
      last_analysis: null,
      selected_text: null,
      last_command: null
    }
    this.history = []
  }

  set(key, value) {
    this.stack[key] = value
    this.history.push({
      timestamp: Date.now(),
      key,
      value,
      command: this.stack.last_command
    })
    return this
  }

  get(key) {
    return this.stack[key]
  }

  resolve(commandName, parameters) {
    // Auto-fill missing parameters from context
    if (!parameters.path && commandName === 'analyze-code') {
      parameters.path = this.get('loaded_file')
    }
    return parameters
  }

  clear() {
    this.stack = { ...this.stack, loaded_file: null, loaded_component: null }
  }

  show() {
    return JSON.stringify(this.stack, null, 2)
  }

  undo() {
    // Restore previous state
  }
}
```

### Parameter Parser Implementation

```javascript
class ParameterParser {
  parse(commandString) {
    // /load-file src/App.jsx --with-ast --depth 3

    const parts = commandString.trim().split(/\s+/)
    const command = parts[0].slice(1) // Remove /
    const params = {}

    let positionalIndex = 0
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i]

      if (part.startsWith('--')) {
        const [key, value] = part.slice(2).split('=')
        params[key] = value || true
      } else if (positionalIndex === 0) {
        params.path = part
        positionalIndex++
      }
    }

    return { command, params }
  }

  validate(command, params, schema) {
    // Check required parameters
    // Check parameter types
    // Return { valid: boolean, errors: [...] }
  }
}
```

### Example Command Implementation

```javascript
// File: context/load-file.js

export default {
  name: 'load-file',
  aliases: ['lf', 'load'],
  category: 'context',

  description: 'Load a file into analysis context',

  parameters: {
    path: { required: true, type: 'string' },
    'with-ast': { required: false, type: 'boolean', default: false },
    depth: { required: false, type: 'number', default: 2 }
  },

  middleware: [
    'validateParams',
    'resolveFilePath',
    'checkFileExists',
    'readFileContent',
    'updateContext'
  ],

  async execute(params, context) {
    const { path, 'with-ast': withAst, depth } = params

    // Load file
    const content = await fs.readFile(path, 'utf-8')
    const stats = {
      lines: content.split('\n').length,
      bytes: content.length,
      lastModified: (await fs.stat(path)).mtime
    }

    // Optional: Parse AST
    let ast = null
    if (withAst) {
      ast = parseAST(content) // Using appropriate parser
    }

    // Update context
    context.set('loaded_file', path)
    context.set('file_content', content)
    context.set('file_stats', stats)
    if (ast) context.set('loaded_ast', ast)
    context.set('last_command', 'load-file')

    // Return formatted output
    return {
      success: true,
      message: `✓ Loaded ${path} (${stats.lines} lines)`,
      data: {
        path,
        stats,
        ast: withAst ? ast : undefined
      }
    }
  },

  examples: [
    '/load-file src/App.jsx',
    '/load-file src/App.jsx --with-ast',
    '/load-file src/App.jsx --depth 3'
  ]
}
```

---

## Summary: Best Practices Checklist

### Command Design ✓
- [ ] Use verb-noun naming (/load-file, /analyze-code)
- [ ] Keep command hierarchy shallow (max 2 levels)
- [ ] Provide 2-3 character aliases for power users
- [ ] Default to implicit context when possible
- [ ] Make first parameter positional, rest flags

### Parameters ✓
- [ ] Validate all parameters with helpful errors
- [ ] Suggest corrections for typos
- [ ] Support fuzzy matching for file paths
- [ ] Use Unix-style flags (--flag value)
- [ ] Provide examples in help text

### Context ✓
- [ ] Maintain command context stack
- [ ] Auto-resolve missing parameters from context
- [ ] Detect project type automatically
- [ ] Support file selection context
- [ ] Allow context inspection (/show-context)

### Documentation ✓
- [ ] Build help system with examples
- [ ] Show suggestions on errors
- [ ] Organize commands by category
- [ ] Provide progressive disclosure (basic → advanced)
- [ ] Use error messages as teaching moments

### Discoverability ✓
- [ ] Implement /help command
- [ ] Suggest next steps after command execution
- [ ] Track frequently used commands
- [ ] Offer related command suggestions
- [ ] Rank search results by relevance

### Composability ✓
- [ ] Design commands to work together
- [ ] Support piping between commands
- [ ] Allow command templates/macros
- [ ] Implement undo/redo
- [ ] Track command history

---

## Advanced Patterns: For Future Implementation

### 1. Fuzzy Logic Command Matching

```
User types: /ldc src/components
System interprets as: /load-component src/components
Confidence: 87%

Ask user: "Did you mean: /load-component src/components?"
```

### 2. Natural Language Commands

```
User: "Show me all React hooks being used"
System: Interprets as: /search-refs --pattern "use[A-Z]" --in "src"

User: "Generate tests for Button component"
System: Interprets as: /generate-tests --component Button
```

### 3. Learning from Usage

```
User frequently runs:
  1. /load-file src/App.jsx
  2. /analyze-code --profile quality
  3. /generate-docs

System suggests: Create template "quick-analysis"?
/template use quick-analysis src/components/Button.jsx
```

### 4. Collaborative Commands

```
/share-context user@example.com
  → Sends current context to another developer

/import-context from:"john:portfolio-audit"
  → Load someone else's analysis results

/comment-on-issue #123
  → Create comment from analysis results
```

---

## Conclusion

Effective slash commands for developer tools follow established patterns from industry leaders while being adapted to project-specific needs. The key principles are:

1. **Discoverability** - Commands are easy to find and remember
2. **Context-aware** - Commands minimize repetition through implicit context
3. **Composable** - Commands work together in workflows
4. **Helpful** - Errors guide users toward solutions
5. **Learnable** - Progressive disclosure from simple to advanced

For your portfolio project, start with essential context-loading commands, build out portfolio-specific analysis tools, then add advanced features like templates and automation.

---

**Next Steps**:
1. Create `.claude/commands/` directory structure
2. Implement command registry system
3. Build context manager
4. Create 5-10 essential commands
5. Develop help system
6. Test with real workflows

