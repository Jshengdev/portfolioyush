# Workflow System Documentation

**Version**: 1.0
**Created**: 2025-11-21
**Purpose**: Structured AI-assisted development workflow

---

## What is This?

A complete **7-agent workflow system** for building features with predictable, measurable progress.

Instead of ad-hoc development, you now have:
- ✅ Clear process (4 Engineers → 2 Researchers → 1 QA)
- ✅ Predictable timing (30-60 min per agent)
- ✅ Built-in quality (research + security review)
- ✅ Always-updated docs (Researcher 2 handles it)
- ✅ No scope creep (strict templates)

---

## Quick Start

### Easiest: Use Slash Commands

```bash
/workflow
```

That's it! The command will guide you through the entire process.

### Alternative: Manual Workflow

1. Read [GETTING_STARTED.md](GETTING_STARTED.md) (5 minutes)
2. Pick a feature from [roadmap](../roadmap/ROADMAP.md)
3. Use [prompt templates](PROMPT_TEMPLATES.md)
4. Run each agent sequentially
5. Deploy when QA passes

---

## Documentation Index

### Start Here 🚀

1. **[SLASH_COMMANDS.md](SLASH_COMMANDS.md)** ⭐
   - `/workflow`, `/engineer`, `/researcher`, `/qa` reference
   - Examples and usage patterns
   - **Read this first if you want the easiest experience**

2. **[GETTING_STARTED.md](GETTING_STARTED.md)**
   - 5-minute quickstart guide
   - Example session walkthrough
   - Tips for success
   - **Read this if you want to understand the process**

### Deep Dive 📚

3. **[WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md)**
   - Complete system explanation
   - Agent responsibilities
   - Process phases
   - When to use variations

4. **[PROMPT_TEMPLATES.md](PROMPT_TEMPLATES.md)**
   - Copy-paste templates for all agents
   - Filled-out examples
   - Customization guidance
   - **Use this if not using slash commands**

### Planning & Tracking 📋

5. **[../roadmap/ROADMAP.md](../roadmap/ROADMAP.md)**
   - Feature backlog (5 suggested features)
   - Progress tracking template
   - Quick wins list

6. **[../roadmap/examples/SKILLS_PAGE_EXAMPLE.md](../roadmap/examples/SKILLS_PAGE_EXAMPLE.md)**
   - Complete feature walkthrough
   - All 7 agents with prompts
   - Timeline breakdown
   - **Study this to understand the full process**

---

## The 7-Agent Pattern

```
Your Feature Idea
        ↓
┌───────────────────────────────────┐
│   ENGINEERING PHASE (2 hours)    │
├───────────────────────────────────┤
│ Engineer 1 → Scaffolding (30m)   │
│ Engineer 2 → Logic (30m)         │
│ Engineer 3 → Styling (30m)       │
│ Engineer 4 → Integration (30m)   │
└───────────────────────────────────┘
        ↓
┌───────────────────────────────────┐
│   RESEARCH PHASE (1h 20m)        │
├───────────────────────────────────┤
│ Researcher 1 → Performance (40m)  │
│ Researcher 2 → Docs (40m)        │
└───────────────────────────────────┘
        ↓
┌───────────────────────────────────┐
│   VERIFICATION PHASE (1 hour)    │
├───────────────────────────────────┤
│ QA/Security → Testing (60m)      │
└───────────────────────────────────┘
        ↓
Production-Ready Feature ✅
```

**Total Time**: ~4 hours for a complete, tested, documented feature

---

## Slash Commands Overview

| Command | What It Does | When To Use |
|---------|--------------|-------------|
| `/workflow` | Runs full 7-agent process | Building complete features |
| `/engineer` | Single engineering task | Focused implementation |
| `/researcher` | Analysis or documentation | Performance audits, doc updates |
| `/qa` | Comprehensive testing | Before deployment |

**Recommendation**: Start with `/workflow` for your first feature.

---

## Example Workflow

### Using Slash Commands

```bash
# Start guided workflow
You: /workflow

# Answer questions
Claude: What feature would you like to build?
You: Add a dark mode toggle

# Approve breakdown
Claude: [Shows 7-agent breakdown]
You: yes

# Let it run
Claude: Starting Engineer 1...
        ✅ Complete. Ready for Engineer 2?
You: yes

# ... continues through all 7 agents ...

Claude: ✅ Feature Complete!
        Ready to deploy with `yarn deploy`
```

**Time**: ~4 hours
**Result**: Production-ready feature with docs, tests, security review

---

## Benefits

### For You
- ⏱️ **Predictable timing** - Know how long features take
- 📊 **Progress tracking** - See exactly where you are
- 🎯 **Focus** - One task at a time, clear goals
- 📚 **Always updated** - Docs stay current
- 🔒 **Security** - Every feature reviewed

### For Your Codebase
- ✨ **Consistent quality** - Every feature follows same process
- 🔧 **Maintainable** - Well-documented, well-tested
- ⚡ **Optimized** - Performance checked on every feature
- 🛡️ **Secure** - Security review built-in
- 📖 **Documented** - No orphaned code

---

## Customization

### Simple Features (< 2 hours)
Use fewer agents:
- 1-2 Engineers
- Skip researchers
- Quick QA

### Complex Features (> 5 hours)
Use more agents:
- 5-6 Engineers (more granular)
- 3 Researchers (extra analysis)
- Extended QA (2 hours)

### Emergency Fixes
Skip workflow:
- Fix the bug directly
- Run `/qa` to verify
- Update docs manually

---

## Success Metrics

After using this system, you should see:

✅ **Fewer bugs** - QA catches issues before production
✅ **Faster development** - Clear process, no decision paralysis
✅ **Better docs** - Always up to date
✅ **Consistent quality** - Every feature follows same standards
✅ **Less technical debt** - Performance and security built-in

---

## Support & Resources

### Documentation
- **This directory**: Complete workflow system docs
- **[../../CLAUDE.md](../../CLAUDE.md)**: Project overview
- **[../architecture/](../architecture/)**: Component architecture
- **[../reference/](../reference/)**: Reference docs

### Getting Help
If stuck, check:
1. [SLASH_COMMANDS.md](SLASH_COMMANDS.md) - Quick command reference
2. [GETTING_STARTED.md](GETTING_STARTED.md) - Walkthrough
3. [SKILLS_PAGE_EXAMPLE.md](../roadmap/examples/SKILLS_PAGE_EXAMPLE.md) - Complete example

---

## What's Next?

**Ready to build your first feature?**

1. Type `/workflow`
2. Pick a feature from the [roadmap](../roadmap/ROADMAP.md) or create your own
3. Follow the prompts
4. Track progress in the roadmap
5. Deploy when QA passes

**Suggested first features** (from easiest to hardest):
1. Contact form enhancement (2-3 hours)
2. Skills/Technologies page (4 hours)
3. Project filtering/search (4-5 hours)
4. Dark/Light mode toggle (4-5 hours)
5. Blog/Articles section (6-8 hours)

---

## File Tree

```
docs/workflows/
├── README.md                 ← You are here
├── SLASH_COMMANDS.md        ← Command reference (start here!)
├── GETTING_STARTED.md       ← 5-min quickstart
├── WORKFLOW_GUIDE.md        ← System overview
└── PROMPT_TEMPLATES.md      ← Manual templates

docs/roadmap/
├── ROADMAP.md               ← Feature tracking
└── examples/
    └── SKILLS_PAGE_EXAMPLE.md  ← Complete example

.claude/commands/
├── workflow.md              ← /workflow implementation
├── engineer.md              ← /engineer implementation
├── researcher.md            ← /researcher implementation
└── qa.md                    ← /qa implementation
```

---

**Version**: 1.0
**Last Updated**: 2025-11-21
**Maintained by**: Claude Code

**Ready?** Type `/workflow` to begin! 🚀
