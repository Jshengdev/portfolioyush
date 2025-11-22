# Slash Commands: Quick Reference Guide

**Status**: Research Complete & Ready for Implementation
**Format**: One-page reference for developers
**Created**: 2025-11-22

---

## Document Overview

Three comprehensive research documents have been created:

| Document | Purpose | Key Content |
|----------|---------|------------|
| **SLASH_COMMANDS_RESEARCH.md** | Deep dive into patterns | Industry analysis, command taxonomy, context patterns |
| **SLASH_COMMANDS_IMPLEMENTATION.md** | Ready-to-use templates | 5 core commands, config files, help system |
| **SLASH_COMMANDS_COMPARISON.md** | Analysis & recommendations | Tool comparison, parameter design, best practices |

**Total**: 50+ pages of research and templates
**Time to Read**: 2-3 hours (can skim for quick start)
**Time to Implement**: 2-4 weeks (phased approach)

---

## Quick Start: Command Architecture

### Recommended Design Pattern

```
Naming:        /[verb]-[noun]
Examples:      /load-file, /analyze-code, /search-refs
Aliases:       2-3 chars (/lf, /ac, /sr)
Parameters:    [required] [--optional]
Context:       Stack-based (remembers previous commands)
Help:          Fuzzy search + progressive disclosure
Composability: Sequential with context passing
```

### Why This Design?

| Aspect | Benefit |
|--------|---------|
| **Verb-Noun** | Predictable, memorable (/load-*, /analyze-*, /generate-*) |
| **2-Level Max** | Simple hierarchy, easy to navigate |
| **Aliases** | Power users get shortcuts, beginners use full names |
| **Context Stack** | Minimal typing, smart defaults, reduced repetition |
| **Fuzzy Help** | Discoverable even without knowing exact names |
| **Progressive** | Beginners see simple; experts see advanced |
| **Composable** | Commands work together in workflows |

---

## Command Categories (Recommended)

### Load Commands (Context)
```
/load-file              Load single file into context
/load-component         Load React component + dependencies
/load-folder            Load entire folder
/load-git               Load git history
/clear-context          Clear loaded context
```

### Analyze Commands (Quality)
```
/analyze-code           Code quality metrics
/analyze-perf           Performance analysis
/analyze-deps           Dependency analysis
/analyze-sec            Security audit
```

### Generate Commands (Creation)
```
/generate-docs          Auto-generate documentation
/generate-tests         Create test stubs
/generate-types         TypeScript definitions
/generate-fixes         Suggest code improvements
```

### Search Commands (Discovery)
```
/search-refs            Find references
/search-files           Find files by pattern
/search-pattern         Regex search
/search-deps            Find dependency usages
```

### Portfolio Commands (Project)
```
/portfolio              Main group
  /portfolio analyze    Analyze structure
  /portfolio health     Health check
  /portfolio audit      Full audit
  /portfolio stats      Statistics
  /portfolio routes     Routing visualization
```

### Component Commands (Detailed)
```
/component list         List all components
/component analyze      Analyze specific
/component usage        Show where used
/component test         View/create tests
```

### Dev Commands (Development)
```
/dev-start              Start dev server
/dev-test               Run tests
/dev-build              Build production
/dev-watch              Watch mode
```

---

## Core Patterns Summary

### 1. Context Stack Pattern

**Concept**: Commands remember what you're working on

```
User: /load-file src/App.jsx
Context: { loaded_file: "src/App.jsx" }

User: /analyze-code
System: Analyzes src/App.jsx (from context)
Context: { loaded_file: "...", last_analysis: {...} }

User: /generate-docs --from-analysis
System: Creates docs for App.jsx using analysis
Context: { ..., last_docs: {...} }
```

**Benefit**: Less typing, fewer parameters needed

### 2. Implicit Context Resolution

**Concept**: Smart parameter filling from context

```
No explicit parameter:        With implicit resolution:
/analyze-code --profile deep  /load-file src/App.jsx
Error: No file loaded         /analyze-code --profile deep
                              ✓ Analyzes loaded file

User types: /search-refs      After /load-component Button
Error: Not found              /search-refs
                              ✓ Searches for Button references
```

**Benefit**: Intuitive, minimal friction

### 3. Progressive Disclosure

**Concept**: Simple to advanced based on user needs

```
Beginner:         /help
                  Shows 5 most common commands

Intermediate:     /help commands
                  Shows all 20+ commands by category

Expert:           /help advanced
                  Shows 40+ commands, templates, integrations
```

**Benefit**: Low barrier to entry, power user support

### 4. Error Messages as Teaching

**Concept**: Errors guide users to solution

```
User: /load-file path.jsx
Bad:    Error: file not found

Good:   Error: File not found at "path.jsx"
        Did you mean?
        ① src/Path.jsx (92% match)
        ② src/pages/path.jsx

        Help: /help load-file

        Tips:
        • Use relative paths: src/App.jsx
        • Use /search-files "path*" to find files
```

**Benefit**: Users self-heal, learn command patterns

### 5. Contextual Suggestions

**Concept**: Offer next logical steps

```
✓ Loaded src/App.jsx (175 lines)

Next Steps:
① /analyze-code        - Check quality
② /search-refs         - See where used (12 places)
③ /generate-docs       - Document it
④ /load-component      - Load a dependency
```

**Benefit**: Discovery without explicit help request

---

## Implementation Phases

### Phase 1: Foundation (Week 1) ⭐ START HERE

**Effort**: 8-10 hours
**Payoff**: 80% of use cases
**Commands to build**:
1. `/load-file` - Load file into context
2. `/analyze-code` - Analyze loaded file
3. `/search-refs` - Find references
4. `/portfolio health` - Quick status check
5. `/help` - Help system

**Deliverables**:
- Command definitions
- Parameter validation
- Context stack implementation
- Basic help system
- Error handling

**Test cases**:
```
✓ /load-file src/App.jsx (works)
✓ /analyze-code (uses loaded file from context)
✓ /search-refs useState (finds references)
✓ /portfolio health (shows health score)
✓ /help load-file (shows help)
✓ /load-file path.jsx (smart error suggestion)
```

### Phase 2: Expansion (Week 2)

**Effort**: 6-8 hours
**Payoff**: 95% of use cases
**Commands to add**:
1. `/load-component` - Load component + deps
2. `/portfolio analyze` - Full analysis
3. `/portfolio audit` - Detailed audit
4. `/component list` - List all components
5. `/component analyze` - Analyze specific

**New features**:
- Fuzzy file matching
- Auto-detection of project structure
- Component dependency graph
- Usage statistics

### Phase 3: Generation (Week 3)

**Effort**: 10-12 hours
**Payoff**: Advanced workflows
**Commands to add**:
1. `/generate-docs` - Auto-documentation
2. `/generate-tests` - Test stubs
3. `/suggest-fixes` - Improvement suggestions
4. `/performance analyze` - Performance metrics

**New features**:
- AST parsing
- Template system
- Performance profiling
- Automated suggestions

### Phase 4: Polish (Week 4)

**Effort**: 8-10 hours
**Payoff**: Professional experience
**Enhancements**:
1. Advanced help (fuzzy search, categories)
2. Command templates (reusable workflows)
3. IDE integration (VS Code, etc.)
4. Metrics & analytics

---

## Parameter Design Pattern

### Positional + Flags Hybrid ✅ RECOMMENDED

```
/command-name <required1> <required2> [--optional-flag value]

Examples:
/load-file src/App.jsx                          ✓ Simple
/load-file src/App.jsx --with-ast               ✓ With flag
/load-file src/App.jsx --with-ast --depth 3    ✓ Multiple flags
/analyze-code --profile deep --focus security   ✓ Flags only

Why this works:
• First param is positional (minimal syntax)
• Optional params as flags (clear intent)
• Flags can be combined (powerful)
• Order doesn't matter for flags (flexible)
```

### Parameter Validation Strategy

```
User Input → Normalize → Validate → Fuzzy Match → Confirm → Execute

Example:
/load-file path.jsx
  ↓ normalize (handle relative/absolute paths)
  ↓ validate (check syntax)
  ↓ fuzzy match (find closest file)
    "path.jsx" → "src/Path.jsx" (92% match)
  ↓ confirm (ask user)
    Did you mean: src/Path.jsx? (y/n)
  ↓ execute
    ✓ Loaded src/Path.jsx
```

---

## Context Stack API

### Basic Operations

```javascript
// Set context value
context.set('loaded_file', 'src/App.jsx')

// Get context value
const file = context.get('loaded_file')  // 'src/App.jsx'

// Resolve parameters (fill from context)
params = context.resolve('analyze-code', {})  // Adds path from context

// Clear context
context.clear()  // Clear all
context.clear('loaded_file')  // Clear specific

// Show context
context.show()  // Display current state

// Undo (restore previous state)
context.undo()
```

### Context Structure

```javascript
{
  loaded_file: "src/App.jsx",
  loaded_component: "Button",
  loaded_folder: null,
  last_analysis: { issues: 3, score: 7 },
  last_search: { term: "useState", count: 12 },
  last_command: "analyze-code",
  project_type: "react-typescript",
  history: [
    { timestamp, command, params },
    ...
  ]
}
```

---

## Help System Design

### Three Help Modes

**Quick Help** (`/help`)
```
Most Common Commands:
├─ /load-file
├─ /analyze-code
├─ /search-refs
└─ /portfolio health

Type "/help [command]" for details
```

**Detailed Help** (`/help load-file`)
```
/load-file <path> [--with-ast] [--depth N]

Load a file into analysis context.

Examples:
  /load-file src/App.jsx
  /load-file src/App.jsx --with-ast

See: /help load-file --examples
```

**Expert Help** (`/help advanced`)
```
All commands by category:
├─ Load Commands (5)
├─ Analysis Commands (5)
├─ Generation Commands (4)
├─ Search Commands (4)
└─ Portfolio Commands (5)

Also:
├─ /help templates
├─ /help keyboard
├─ /help best-practices
```

### Error-Based Learning

```
User makes mistake:
  /load-file /absolute/path.jsx

System response:
  Error: Please use relative paths

  Correct format:
    /load-file src/App.jsx

  Why relative paths?
    • Portable across machines
    • Works with .gitignore
    • Matches project structure

  Related:
    /help load-file
    /search-files
```

---

## Key Recommendations

### DO ✅

- [ ] **Use verb-noun naming**: `/load-file`, `/analyze-code` (not `/file-load` or `/code-analyze`)
- [ ] **Keep hierarchy shallow**: Max 2 levels (`/portfolio health`, not `/portfolio/status/health`)
- [ ] **Provide 2-3 aliases**: `/lf` for `/load-file` (not 10 aliases)
- [ ] **Make first param positional**: `/load-file src/App.jsx` (not `/load-file path:"src/App.jsx"`)
- [ ] **Use context stack**: Remember loaded file between commands (smart defaults)
- [ ] **Offer smart suggestions**: Fuzzy matching, next steps, error guidance
- [ ] **Build help progressively**: Basic → intermediate → advanced
- [ ] **Test with real workflows**: Ensure commands compose naturally
- [ ] **Document with examples**: Every command needs 3-5 working examples
- [ ] **Support piping/chaining**: Commands should work in sequences

### DON'T ❌

- [ ] **Don't use inconsistent naming**: Mix of `/load-file`, `/analyze_code`, `/search refs`
- [ ] **Don't create deep hierarchies**: 3+ levels confuses users
- [ ] **Don't make everything named parameters**: `/load-file path:"src/App.jsx"` (too verbose)
- [ ] **Don't require context**: Support both `/analyze-code` and `/analyze-code src/App.jsx`
- [ ] **Don't silently fail**: Always show feedback, even if "command successful"
- [ ] **Don't have cryptic error messages**: Guide users to solution, not just error code
- [ ] **Don't forget discoverability**: /help command essential for all commands
- [ ] **Don't ignore typos**: Fuzzy matching handles "path.jsx" → "src/Path.jsx"
- [ ] **Don't nest beyond 2 levels**: `/portfolio/analyze/code/quality` is too deep
- [ ] **Don't assume users remember exact syntax**: Support variations and abbreviations

---

## File Structure Reference

```
.claude/
├── commands/
│   ├── _base/
│   │   ├── command.template.md        Template for new commands
│   │   ├── help.system.md             Help system implementation
│   │   └── context.manager.md         Context stack system
│   │
│   ├── context/
│   │   ├── load-file.md               Load single file
│   │   ├── load-component.md          Load component + deps
│   │   ├── load-folder.md             Load entire folder
│   │   └── clear-context.md           Clear context stack
│   │
│   ├── analysis/
│   │   ├── analyze-code.md            Code quality
│   │   ├── analyze-perf.md            Performance
│   │   └── analyze-deps.md            Dependencies
│   │
│   ├── portfolio/
│   │   ├── portfolio.md               Main command group
│   │   ├── portfolio-health.md        Health check
│   │   └── portfolio-audit.md         Full audit
│   │
│   └── index.md                        Registry of all commands
│
├── templates/
│   ├── quick-review.md                5-min code review
│   ├── component-docs.md              Component documentation
│   └── perf-optimize.md               Performance optimization
│
├── config/
│   ├── aliases.json                   Command aliases
│   └── defaults.json                  Default parameters
│
└── settings.local.json                User settings
```

---

## Metrics for Success

### Adoption Metrics

**Week 1**:
- [ ] Users discover without explicit help
- [ ] 80% of first-time users succeed
- [ ] Average execution time < 2 seconds
- [ ] Fuzzy matching catches typos

**Week 2**:
- [ ] Users chain 2+ commands
- [ ] Context stack prevents repetition
- [ ] Error messages prevent 80% of user mistakes
- [ ] Help system answers 95% of questions

**Week 4**:
- [ ] 50% of users use 5+ different commands
- [ ] Complex workflows work intuitively
- [ ] Users create command templates
- [ ] Measurable productivity improvement

### Quality Metrics

**Correctness**:
- [ ] 100% of parameters work as documented
- [ ] Fuzzy matching accuracy > 95%
- [ ] Error messages lead to resolution
- [ ] No silent failures

**Performance**:
- [ ] Command execution < 100ms (P95)
- [ ] Help lookup < 50ms
- [ ] Fuzzy search < 200ms
- [ ] Context operations < 10ms

**Usability**:
- [ ] 100% of commands have examples
- [ ] Examples work when copy-pasted
- [ ] Next steps offered after each command
- [ ] Help covers all edge cases

---

## Quick Links

| Document | Section | Purpose |
|----------|---------|---------|
| SLASH_COMMANDS_RESEARCH.md | Command Pattern Fundamentals | Learn the theory |
| SLASH_COMMANDS_RESEARCH.md | Industry Analysis | See how Slack/Discord/VS Code do it |
| SLASH_COMMANDS_RESEARCH.md | Context Injection Patterns | Understand smart context |
| SLASH_COMMANDS_RESEARCH.md | Composable Command Architecture | Learn how to chain commands |
| SLASH_COMMANDS_IMPLEMENTATION.md | Core Commands (Ready to Use) | Copy-paste ready implementations |
| SLASH_COMMANDS_IMPLEMENTATION.md | Configuration Files | Aliases, defaults, registry |
| SLASH_COMMANDS_IMPLEMENTATION.md | Help System Implementation | Build discoverable help |
| SLASH_COMMANDS_COMPARISON.md | Command Pattern Comparison | Compare different approaches |
| SLASH_COMMANDS_COMPARISON.md | Portfolio-Specific Recommendations | Use for your project |
| SLASH_COMMANDS_COMPARISON.md | Anti-Patterns to Avoid | Don't do these |

---

## Next Steps

### Immediate (Today)
1. **Read** - Skim `SLASH_COMMANDS_RESEARCH.md` (key sections)
2. **Decide** - Confirm recommended design pattern
3. **Plan** - Align with team on phase schedule

### Short-term (This Week)
1. **Setup** - Create `.claude/commands/` directory structure
2. **Implement** - Build 5 Phase 1 commands
3. **Test** - Run through workflows manually
4. **Document** - Update README with command usage

### Medium-term (This Month)
1. **Expand** - Add Phase 2 commands (component tools)
2. **Polish** - Improve help system, add fuzzy search
3. **Integrate** - Add IDE integration (VS Code, etc.)
4. **Refine** - Based on user feedback

### Long-term (Next Month)
1. **Generate** - Build Phase 3 generation commands
2. **Templates** - Create reusable workflows
3. **Analytics** - Track usage patterns
4. **Improve** - Optimize based on metrics

---

## Resources Included

**Total Pages**: 50+
**Total Time Investment**: 2-4 weeks (phased implementation)
**Expected Outcome**: Professional, scalable command system
**Maintenance**: ~5 hours per new command
**User Impact**: Significant productivity improvement

---

## Summary

A slash command system for your portfolio project should:

1. **Use clear naming**: `/verb-noun` format
2. **Have smart context**: Remember previous commands
3. **Be discoverable**: Fuzzy help + suggestions
4. **Support composition**: Commands work together
5. **Guide users**: Errors teach, not just fail
6. **Scale gracefully**: Simple to advanced usage

**Recommended first step**: Build 5 Phase 1 commands this week. See `SLASH_COMMANDS_IMPLEMENTATION.md` for ready-to-use templates.

---

**Research Complete** ✓
**Ready for Implementation** ✓
**Questions?** Refer to appropriate research document above.

