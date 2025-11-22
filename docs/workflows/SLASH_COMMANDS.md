# Workflow Slash Commands Reference

**Quick Guide**: Use these slash commands to execute the 7-agent workflow system.

---

## Available Commands

### `/workflow` - Full Feature Workflow

**Purpose**: Start a new feature using the complete 7-agent system

**Usage**:
```
/workflow
```

**What it does**:
1. Asks what feature you want to build
2. Proposes a 7-agent breakdown
3. Executes each agent sequentially (with your approval)
4. Updates the roadmap after each step
5. Provides final summary and deployment options

**Best for**: Complete features (new pages, complex components, integrations)

**Example**:
```
You: /workflow
Claude: What feature would you like to build?

You: Add a dark mode toggle
Claude: Here's the proposed breakdown:
        - Engineer 1: Create theme toggle component
        - Engineer 2: Implement theme state management
        - Engineer 3: Apply dark mode styles
        - Engineer 4: Integrate with all pages
        - Researcher 1: Performance analysis
        - Researcher 2: Update documentation
        - QA/Security: Comprehensive testing

        Does this look good?

You: yes
Claude: Starting Engineer 1...
```

---

### `/engineer` - Single Engineering Task

**Purpose**: Execute a specific engineering step (1-4)

**Usage**:
```
/engineer
```

**What it does**:
1. Asks which engineer you are (1-4)
2. Asks about the feature and task
3. Executes ONLY that engineering step
4. Provides completion report

**Best for**:
- Breaking down work yourself
- Fixing issues from QA
- Resuming paused workflows

**Example**:
```
You: /engineer
Claude: Which engineer are you (1-4)?

You: 2
Claude: What feature are you working on?

You: Skills Page
Claude: What is your specific task?

You: Create skills data structure in src/data/skills.js
Claude: [Executes Engineer 2 task]
        ✅ Engineer 2 Complete: Skills Data Structure
        [Provides report]
```

---

### `/researcher` - Research & Analysis

**Purpose**: Conduct performance analysis or documentation updates

**Usage**:
```
/researcher
```

**What it does**:
1. Asks which researcher you are (1 or 2)
2. Conducts focused research
3. Generates structured report

**Researcher Types**:
- **Researcher 1**: Performance analysis (bundle size, optimization)
- **Researcher 2**: Documentation updates (CLAUDE.md, COMPONENTS.md)

**Best for**:
- Performance audits
- Documentation maintenance
- Post-implementation analysis

**Example**:
```
You: /researcher
Claude: Which researcher are you (1 or 2)?

You: 1
Claude: What feature are you researching?

You: Skills Page
Claude: [Analyzes performance]
        # Skills Page - Performance Analysis

        Bundle impact: +42KB
        Status: ✅ Acceptable
        [Full report]
```

---

### `/qa` - QA & Security Verification

**Purpose**: Final comprehensive testing before production

**Usage**:
```
/qa
```

**What it does**:
1. Asks what feature to verify
2. Runs comprehensive checklist (7 categories)
3. Tests build, security, performance, accessibility
4. Generates detailed report with pass/fail status

**Best for**:
- Final verification before deployment
- Security audits
- Production readiness assessment

**Example**:
```
You: /qa
Claude: What feature are you verifying?

You: Skills Page
Claude: [Runs all tests]
        ✅ Functionality: 5/5 passed
        ✅ Security: 8/8 passed
        ✅ Performance: 6/6 passed
        ⚠️ Accessibility: 6/7 passed (1 minor issue)

        Final Verdict: ✅ Ready for production
        [Full report]
```

---

## Command Comparison

| Command | Scope | Time | Use When |
|---------|-------|------|----------|
| `/workflow` | Full feature (7 agents) | 4 hours | Building complete features |
| `/engineer` | Single task | 30 min | Focused implementation |
| `/researcher` | Analysis/docs | 40 min | Performance or documentation |
| `/qa` | Final verification | 60 min | Before deployment |

---

## Typical Workflows

### Full Feature Development

```
/workflow
→ Executes all 7 agents automatically
→ Asks for approval between each step
→ Updates roadmap automatically
```

### Manual Step-by-Step

```
/engineer (Engineer 1)
/engineer (Engineer 2)
/engineer (Engineer 3)
/engineer (Engineer 4)
/researcher (Researcher 1)
/researcher (Researcher 2)
/qa
```

### Quick Fix + Verification

```
/engineer (fix implementation)
/qa (verify fix)
```

### Documentation Update Only

```
/researcher (Researcher 2)
```

### Performance Audit

```
/researcher (Researcher 1)
```

---

## Tips

### Starting a Feature

**Option 1** - Guided (recommended for beginners):
```
/workflow
```

**Option 2** - Manual control:
1. Add feature to `docs/roadmap/ROADMAP.md`
2. Run `/engineer` for each engineering step
3. Run `/researcher` for analysis/docs
4. Run `/qa` for final verification

### Resuming Paused Work

Check `docs/roadmap/ROADMAP.md` to see which agent you left off on, then:
```
/engineer (continue from where you stopped)
```

### Fixing QA Issues

After `/qa` finds issues:
```
/engineer (fix the issues)
/qa (re-verify)
```

### Skipping Steps

For simple features, you can skip agents:
```
/engineer (combine Engineer 1-2 tasks)
/engineer (combine Engineer 3-4 tasks)
/qa (skip researchers for simple changes)
```

---

## Workflow Discipline

### DO:
✅ Wait for each agent to complete before starting the next
✅ Update roadmap as you go
✅ Always run `/qa` before deploying
✅ Be specific in task descriptions
✅ Reference existing patterns

### DON'T:
❌ Rush through agents without reviewing output
❌ Skip QA verification
❌ Try to do multiple agent tasks at once
❌ Add features beyond requirements
❌ Ignore issues found by QA

---

## Example Session (Full Feature)

```bash
# Start the workflow
You: /workflow

# Claude asks for feature details
Claude: What feature would you like to build?

You: Add a contact form with email integration

# Claude proposes breakdown
Claude: Here's the proposed breakdown:
        - Engineer 1: Create ContactForm.jsx component
        - Engineer 2: Integrate Formspree email service
        - Engineer 3: Add form validation and styling
        - Engineer 4: Update Contact page to use form
        - Researcher 1: Performance analysis
        - Researcher 2: Update documentation
        - QA/Security: Security review + testing

        Does this look good?

You: yes

# Claude executes each agent
Claude: Starting Engineer 1: Create ContactForm.jsx component
        [30 minutes of work]
        ✅ Engineer 1 Complete
        Ready for Engineer 2?

You: yes

Claude: Starting Engineer 2: Integrate Formspree
        [30 minutes of work]
        ✅ Engineer 2 Complete
        Ready for Engineer 3?

You: yes

# ... continues through all 7 agents ...

Claude: ✅ Feature Complete: Contact Form

        All tests passed!
        Ready for deployment with `yarn deploy`
```

---

## Integration with Existing Slash Commands

The workflow commands work alongside your existing commands:

| Existing Command | Purpose | Workflow Equivalent |
|------------------|---------|---------------------|
| `/issues` | View known issues | (No equivalent - standalone) |
| `/context` | Get project context | Use before `/workflow` to understand codebase |
| `/architecture` | View architecture | Reference during engineering |
| `/project` | Project overview | Reference before planning feature |

**Pro tip**: Run `/context` before `/workflow` to get full project understanding.

---

## See Also

- [Workflow Guide](WORKFLOW_GUIDE.md) - How the system works
- [Prompt Templates](PROMPT_TEMPLATES.md) - Detailed templates
- [Getting Started](GETTING_STARTED.md) - Quickstart guide
- [Roadmap](../roadmap/ROADMAP.md) - Track your features

---

**Ready to build?** Type `/workflow` to get started!
