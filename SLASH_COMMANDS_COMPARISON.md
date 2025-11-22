# Slash Command Patterns Comparison Matrix

**For**: Claude Code Portfolio Project
**Purpose**: Compare command patterns from industry leaders and select best practices
**Date**: 2025-11-22

---

## Command Pattern Comparison

### Tool Analysis Matrix

| Aspect | Slack | Discord | VS Code | GitHub CLI | Figma | Recommended |
|--------|-------|---------|---------|------------|-------|-------------|
| **Naming** | Natural lang | verb-object | category:verb | verb-object | verb-object | **verb-object** |
| **Hierarchy** | Flat + NLP | 3-level deep | Category:Cmd | 2-level | Flat | **2-level max** |
| **Aliases** | Few | None | Many | Yes | None | **2-3 char** |
| **Parameters** | Natural | Named flags | Named | Unix flags | Unnamed | **Hybrid** |
| **Context** | Conversation | Server | File/selection | Implicit | Selection | **Stack-based** |
| **Discovery** | Auto-suggest | Listed | Fuzzy search | --help | Menus | **Fuzzy + help** |
| **Composability** | Limited | Moderate | Good | Excellent | Limited | **Sequential** |
| **Help System** | Minimal | Detailed | Excellent | Good | Good | **Progressive** |

---

## Detailed Comparison

### 1. Slack Style: Natural Language + Context

**Strengths** ✓
- Most natural feeling for users
- Conversation remembers context
- Progressive clarification
- Forgiving of mistakes

**Weaknesses** ✗
- Hard to implement (NLP required)
- Inconsistent parsing
- Difficult to discover (no command list)
- Performance overhead

**Best For**: Chat interfaces, conversational AI

**Example**:
```
/remind me to check metrics in 5 minutes
↓ Understood context from message
✓ Remember set for 5 minutes from now
```

---

### 2. Discord Style: Hierarchical + Named Parameters

**Strengths** ✓
- Very organized (command → subcommand)
- Clear parameter naming
- Scalable to many commands
- Server-aware context

**Weaknesses** ✗
- Deep nesting (3+ levels frustrating)
- Verbose syntax
- Harder to memorize
- Slow to type

**Best For**: Large command sets, complex operations

**Example**:
```
/moderation ban @user reason:"spam" duration:"24h"
/music play track:"Never Gonna Give You Up"
/settings server-name:"My Server" nsfw:true
```

---

### 3. VS Code Style: Fuzzy Search + Categories

**Strengths** ✓
- Incredibly discoverable
- Remembers frequently used
- Ranked search results
- Keyboard-driven

**Weaknesses** ✗
- Requires learning search syntax
- Less suitable for command chaining
- Categories somewhat arbitrary
- Heavy on RAM/performance

**Best For**: IDE/editor commands, when discovery is priority

**Example**:
```
Cmd+Shift+P opens command palette
Type "for" → finds:
  • File: Open Recent
  • Format: Format Document
  • File: Open Folder
```

---

### 4. GitHub CLI Style: Unix Philosophy + Piping

**Strengths** ✓
- Composable (command chaining)
- Learnable pattern (standard flags)
- Scriptable/automatable
- Powerful for power users

**Weaknesses** ✗
- Steeper learning curve
- Less intuitive for beginners
- More verbose
- Requires understanding pipes

**Best For**: Developer tools, scripting, automation

**Example**:
```
gh issue list --assignee @me | grep "bug" | xargs -I {} gh issue close {}
gh pr create --base main --head feature-branch
gh secret set DATABASE_URL --body "postgres://..."
```

---

### 5. Figma Style: Selection State + Implicit Context

**Strengths** ✓
- No need to specify current selection
- Commands feel "just work" magical
- Minimal typing
- Context is visual

**Weaknesses** ✗
- Only works for selection-based systems
- Requires UI context
- Can be ambiguous
- Hard to compose

**Best For**: Visual editors, design tools

**Example**:
```
Select button → /delete (doesn't need "delete selection")
Select shapes → /align-center (aligns selected items)
Has selection context → /export (exports selected)
```

---

## Recommendations for Portfolio Project

### Recommended Pattern: Hybrid (Best of All Worlds)

```
Design Principles:
1. Verb-noun naming (clear, memorable)
2. 2-level hierarchy max (simple structure)
3. Implicit context (less typing)
4. Hybrid parameters (positional + flags)
5. Fuzzy help search (discoverable)
6. Unix-style piping (composable)
```

**Selected Style**:
```
/[verb]-[noun] [required-params] [--optional-flags]

Examples:
/load-file src/App.jsx
/load-component Button --include-tests
/analyze-code --profile deep
/search-refs --scope components
/portfolio health
/generate-docs --output ./docs
```

### Why This Works for Portfolio

1. **Memorable** - Consistent naming (all start with /load-, /analyze-, /generate-)
2. **Discoverable** - Help system with fuzzy search
3. **Flexible** - Parameters work positional or named
4. **Powerful** - Can be chained together
5. **Learnable** - Small set, clear patterns
6. **Scalable** - Can add 10+ commands without confusion

---

## Command Taxonomy: Detailed Breakdown

### Load Commands (Context)

```
/load-file              → Load single file
  └─ /lf (alias)

/load-component         → Load React component + deps
  └─ /lc (alias)

/load-folder            → Load entire folder
  └─ /ld or /lf (alias)

/load-git               → Load git history/diffs
  └─ /lg (alias)

/load-context           → Smart context detection
  └─ /ctx (alias)
```

**Pattern**: All start with `/load-` for discoverability

**Optional Parameters**:
```
/load-file path [--include-imports] [--depth N] [--with-ast]
/load-component name [--include-tests] [--include-styles]
```

### Analyze Commands (Quality)

```
/analyze-code           → Code quality metrics
  └─ /ac (alias)

/analyze-perf           → Performance analysis
  └─ /ap (alias)

/analyze-deps           → Dependency analysis
  └─ /ad (alias)

/analyze-sec            → Security audit
  └─ /as (alias)

/analyze-types          → Type inference check
  └─ /at (alias)
```

**Pattern**: All start with `/analyze-` for consistency

### Generate Commands (Creation)

```
/generate-docs          → Auto-generate documentation
  └─ /gd (alias)

/generate-tests         → Create test stubs
  └─ /gt (alias)

/generate-types         → Generate TypeScript defs
  └─ /gts (alias)

/generate-fixes         → Suggest code fixes
  └─ /gf (alias)
```

**Pattern**: All start with `/generate-` for clarity

### Search Commands (Discovery)

```
/search-refs            → Find references
  └─ /sr (alias)

/search-files           → Find files matching pattern
  └─ /sf (alias)

/search-pattern         → Regex pattern search
  └─ /sp (alias)

/search-deps            → Find dependency usages
  └─ /sd (alias)
```

**Pattern**: All start with `/search-` for consistency

### Portfolio Commands (Project)

```
/portfolio              → Main group
  ├─ /portfolio analyze → Analyze structure
  ├─ /portfolio health → Health check
  ├─ /portfolio audit → Detailed audit
  ├─ /portfolio stats → Statistics
  └─ /portfolio routes → Routing visualization
```

**Pattern**: Subcommands with `/portfolio` prefix

### Component Commands (Detailed)

```
/component list         → List all components
/component analyze      → Analyze specific
/component usage        → Show where used
/component test         → View/create tests
```

**Pattern**: All start with `/component`

### Development Commands

```
/dev-start              → Start dev server
/dev-test               → Run tests
/dev-build              → Build for production
/dev-watch              → Watch mode
```

**Pattern**: All start with `/dev-` for dev workflows

---

## Parameter Design

### Style Comparison

#### Option A: Positional Only ❌ Not Recommended
```
/load-file src/App.jsx true 2
              path      ast   depth
```
**Problem**: Hard to remember order

#### Option B: Named Only ⚠ Too Verbose
```
/load-file path:"src/App.jsx" ast:true depth:2
```
**Problem**: Too much typing

#### Option C: Positional + Flags ✅ Recommended
```
/load-file src/App.jsx --with-ast --depth 2
           path          flags
```
**Sweet Spot**: Clear + concise

### Parameter Validation Strategy

```
User Input: /load-file path.jsx
            └─ File not found

System Response:
1. Normalize path
   "path.jsx" → "src/path.jsx", "/path.jsx", etc.

2. Fuzzy match
   "path.jsx" → Suggests "src/Path.jsx" (92% match)

3. Show options
   Found similar:
   • src/Path.jsx (exact match would be)
   • src/pages/path.jsx
   • src/utils/path.js

4. Ask for confirmation
   Load src/Path.jsx? (y/n or type full path)

5. Helpful error
   /help load-file for examples
```

### Required vs Optional

**Required** - Must be provided or error
```
/load-file src/App.jsx
           └─ Required
```

**Optional with Default** - Can be omitted
```
/analyze-code [--profile standard] [--focus quality]
              └─ Uses defaults      └─ Uses defaults
```

**Optional with Smart Default** - Inferred from context
```
/analyze-code
└─ Analyzes last loaded file (from context)
```

---

## Context Stack Architecture

### Stack Structure

```
CONTEXT:
{
  loaded_file: "src/App.jsx",
  loaded_component: null,
  loaded_folder: null,
  last_analysis: { issues: 3, score: 7 },
  last_search: { term: "useState", results: 12 },
  selected_text: "function App() {",
  last_command: "analyze-code",
  project_type: "react-typescript",
  project_root: "/home/user/portfolioyush",
  metadata: {
    timestamp: 1234567890,
    history: [ { cmd: "load-file", params: {...} }, ...]
  }
}
```

### Stack Operations

**Set** - Update context
```
context.set('loaded_file', 'src/App.jsx')
```

**Get** - Retrieve value
```
context.get('loaded_file')  // "src/App.jsx"
```

**Resolve** - Auto-fill parameters
```
// User: /analyze-code (no file specified)
params = context.resolve('analyze-code', {})
// Returns: { path: 'src/App.jsx' } (from loaded_file)
```

**Clear** - Reset context
```
context.clear()  // Clears all
context.clear('loaded_file')  // Clears just file
```

**Undo** - Restore previous state
```
context.undo()  // Go back one step
```

### Context Lifetime

```
User Session:
├─ Start: Empty context
├─ /load-file src/App.jsx
│  └─ Context: { loaded_file: "src/App.jsx" }
├─ /analyze-code
│  └─ Context: { loaded_file: "...", last_analysis: {...} }
├─ /search-refs
│  └─ Context: { ..., last_search: {...} }
└─ /clear-context
   └─ Context: {} (empty again)
```

### Context Persistence

**Session Storage** (stays during session):
- loaded_file
- loaded_component
- last_analysis
- last_search

**Permanent Storage** (survives restart):
- command history
- frequently used commands
- user preferences

**Ephemeral** (forgotten after command):
- selected text
- temporary parameters

---

## Composability Patterns

### Pattern 1: Sequential with Context

```
/load-file src/App.jsx
  ↓ (context: loaded_file = src/App.jsx)
/analyze-code
  ↓ (context: last_analysis = {...})
/generate-docs --from-analysis
  ↓ (uses loaded_file + last_analysis)
Documentation created
```

### Pattern 2: Pipe/Chain

```
/load-file src/App.jsx | /analyze-code | /generate-docs
Shorthand for: sequential with data passing
```

### Pattern 3: Parallel

```
/load-component Button
├─ /analyze-code (in separate analysis)
├─ /search-refs (in separate search)
└─ /generate-docs (in separate docs)
Results combined
```

### Pattern 4: Conditional

```
/analyze-code
├─ If issues found: /suggest-fixes
└─ If no issues: /generate-docs
```

### Pattern 5: Looped

```
/load-component $1
/analyze-code
→ Repeat for each component in: /component list
```

---

## Discovery & Help Strategy

### Help Levels

**Level 1: Minimal** (Type /help)
```
Available Commands:
├─ /load-file       Load a file
├─ /analyze-code    Analyze code
├─ /search-refs     Find references
└─ /portfolio       Portfolio tools

Type "/help [command]" for details
```

**Level 2: Detailed** (Type /help load-file)
```
/load-file <path> [--with-ast] [--depth N]

Load a file into context for analysis.

Examples:
/load-file src/App.jsx
/load-file src/components/Button.jsx --with-ast

See more: /help load-file --examples
```

**Level 3: Deep** (Type /help load-file --examples)
```
Examples with context:

Ex 1: Quick analysis
  /load-file src/App.jsx
  /analyze-code

Ex 2: Component deep-dive
  /load-component Button --include-tests
  /analyze-code --profile deep
  /search-refs --scope components

...
```

### Discovery Methods

**Method 1: Autocomplete**
```
User types: /loa
System suggests:
  /load-file
  /load-component
  /load-folder
  /load-context
```

**Method 2: Help Search**
```
/help search "import"
Found commands:
  /load-file --with-ast (includes imports)
  /analyze-deps (analyzes imports)
  /search-refs (searches in imports)
```

**Method 3: Contextual Suggestions**
```
✓ Loaded src/App.jsx

Suggested next steps:
① /analyze-code - Analyze this file
② /search-refs - Find where used
③ /generate-docs - Document it

Type command or /help [topic]
```

**Method 4: Command Categories**
```
/help all

Context Commands
├─ /load-file
├─ /load-component
└─ /load-folder

Analysis Commands
├─ /analyze-code
├─ /analyze-perf
└─ /analyze-deps

...
```

---

## Error Handling Philosophy

### Principle: Errors as Teaching Moments

**Bad Approach** ❌
```
Error: file not found
```

**Good Approach** ✅
```
Error: File not found at "path.jsx"

Did you mean?
① src/Path.jsx (92% match - case difference)
② src/pages/path.jsx (68% match)
③ src/utils/path.js (60% match)

Command help:
/help load-file

Common issues:
• File paths are relative to project root
• Use src/components/... for components
• Use quotes for paths with spaces: "/my path/file.jsx"
```

### Error Categories

**User Errors** → Helpful guidance
```
/load-file /absolute/path.jsx
→ "Please use relative paths: src/App.jsx"
```

**System Errors** → Recovery suggestions
```
/search-refs --scope invalid-scope
→ Valid scopes: all, components, pages, tests
→ Suggestion: /search-refs --scope all
```

**Missing Context** → Smart defaults
```
/analyze-code (when no file loaded)
→ "No file loaded. Do you want to:"
  1. Load a file: /load-file src/App.jsx
  2. Load component: /load-component [name]
  3. Load folder: /load-folder src/
```

---

## Portfolio-Specific Recommendations

### Phase 1: Essential Commands (Week 1)

```
Implement these 5 commands:
1. /load-file          (core context loading)
2. /analyze-code       (core analysis)
3. /search-refs        (find usages)
4. /portfolio health   (quick health check)
5. /help               (help system)

Estimated effort: 8-10 hours
Expected value: 80% of use cases covered
```

### Phase 2: Portfolio Tools (Week 2)

```
Implement these 5 commands:
1. /load-component     (component-specific loading)
2. /portfolio analyze  (full analysis)
3. /portfolio audit    (detailed audit)
4. /component list     (list components)
5. /component analyze  (analyze specific)

Estimated effort: 6-8 hours
Expected value: Covers 95% of use cases
```

### Phase 3: Generation Tools (Week 3)

```
Implement these 4 commands:
1. /generate-docs     (auto-documentation)
2. /generate-tests    (test stub generation)
3. /suggest-fixes     (improvement suggestions)
4. /performance analyze (performance metrics)

Estimated effort: 10-12 hours
Expected value: Covers advanced workflows
```

### Phase 4: Polish & Integration (Week 4)

```
Polish & extend:
1. Advanced help system (fuzzy search, categories)
2. Template system (reusable workflows)
3. IDE integration (VS Code, etc.)
4. Metrics/analytics (track usage)

Estimated effort: 8-10 hours
Expected value: Professional experience
```

---

## Anti-Patterns to Avoid

### ❌ Too Many Top-Level Commands

```
/load /analyze /search /generate /performance /security
/quality /docs /tests /components /portfolio /project /git /npm

Problem: Hard to discover, no clear organization
Solution: Use hierarchies: /load-file, /analyze-code, /portfolio health
```

### ❌ Inconsistent Naming

```
/load-file, /analyze_code, /search refs, /portfolio-health

Problem: Users can't predict command names
Solution: Always use hyphenated format: /load-file, /analyze-code
```

### ❌ Too Many Aliases

```
/load-file = /lf, /load, /ld, /l, /file, /open, /import

Problem: Confusing which alias to use
Solution: Stick with 2-3 letter primary, 1-2 common aliases
```

### ❌ Deep Nesting

```
/project analysis code quality metrics report

Problem: Too much typing, hard to remember
Solution: Max 2 levels: /portfolio health, /component analyze
```

### ❌ Cryptic Parameters

```
/load-file src/App.jsx 1 2 true false 3

Problem: Can't remember what parameters mean
Solution: Use named flags: /load-file src/App.jsx --with-ast --depth 2
```

### ❌ No Feedback

```
/load-file src/App.jsx
[silent - nothing happens]

Problem: User thinks command failed
Solution: Always show feedback: "✓ Loaded src/App.jsx (175 lines)"
```

### ❌ No Help Integration

```
/help
[generic help, doesn't know what user wants]

Problem: Users give up
Solution: Context-aware help, suggestions, examples
```

---

## Success Metrics

### User Adoption

```
Week 1 Goals:
□ Users try 3+ different commands
□ 80% of first-time users get help successfully
□ Average command execution < 2 seconds
□ Zero "command not found" errors (fuzzy match catches them)

Week 2 Goals:
□ Users discover commands without explicit help request
□ Command chaining works intuitively
□ Users create/save templates
□ Context stack prevents repetition

Week 4 Goals:
□ Users execute complex workflows (3+ command chains)
□ Fuzzy search handles typos gracefully
□ Meaningful help suggestions reduce errors by 90%
□ Users report increased productivity
```

### Quality Metrics

```
Correctness:
□ 100% of valid parameters work
□ Fuzzy matching accuracy > 95%
□ Error messages actionable
□ No silent failures

Performance:
□ Command execution < 100ms (P95)
□ Help lookup < 50ms
□ Fuzzy search < 200ms
□ Context operations < 10ms

Usability:
□ Help system covers 100% of commands
□ Examples work when copied/pasted
□ Errors suggest solutions
□ Next steps offered after command
```

---

## Conclusion

**For your portfolio project, use this approach**:

1. **Naming**: Verb-noun with hyphens (`/load-file`, `/analyze-code`)
2. **Structure**: 2-level max (`/portfolio health`, not `/portfolio/status/health`)
3. **Parameters**: Positional + flags (`/load-file path --with-ast`)
4. **Context**: Stack-based with implicit resolution (smart defaults)
5. **Discovery**: Fuzzy search + help system + suggestions
6. **Help**: Progressive disclosure (basic → advanced)
7. **Errors**: Teaching moments with examples
8. **Composability**: Sequential with context passing

**Implementation Priority**:
- Phase 1 (Week 1): 5 essential commands
- Phase 2 (Week 2): 5 portfolio-specific commands
- Phase 3 (Week 3): 4 generation commands
- Phase 4 (Week 4): Polish & integrations

**Expected Outcome**: Professional, discoverable command system that feels natural and powerful.

---

## References

- Slack API: https://api.slack.com/slash-commands
- Discord Commands: https://discord.com/developers/docs/interactions/application-commands
- VS Code Command API: https://code.visualstudio.com/api/references/commands
- GitHub CLI: https://cli.github.com/manual
- Figma Plugins: https://www.figma.com/plugin-docs/

---

**Document Complete** ✓

Next step: Begin implementation with Phase 1 commands.

