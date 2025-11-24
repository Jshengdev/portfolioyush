# Portfolio Documentation Hub

**Last Updated**: 2025-11-24
**Project**: Johnny Sheng's Portfolio Website
**Repository**: [portfolioyush](https://github.com/Jshengdev/portfolioyush)

---

## 📚 Documentation Structure

```
docs/
├── README.md (you are here)
├── architecture/           # System design & components
├── design/                # Visual design principles
├── guides/                # How-to guides (planned)
├── history/               # Optimization history
├── qa/                    # Quality assurance reports
├── reference/             # Technical reference
├── research/              # Research findings
├── roadmap/               # Feature planning
├── workflows/             # Development workflows
└── archive/               # Completed/outdated docs
    ├── completed-work/    # Finished features
    ├── execution/         # Old task executions
    ├── experiments/       # Failed/abandoned attempts
    ├── planning/          # Old planning docs
    └── research/          # Old research notes
```

---

## 🚀 Quick Start

**New to the project?** Start here:
1. Read `/CLAUDE.md` (main project guide in root)
2. Check `/README.md` (project overview in root)
3. Browse `/docs/architecture/COMPONENTS.md` (component catalog)

**Need to understand the architecture?**
- Component details: `docs/architecture/COMPONENTS.md`
- Shader system: `docs/design/SHADER_PHILOSOPHY.md`
- Optimization history: `docs/history/OPTIMIZATIONS.md`

**Want to add features?**
- Workflow system: `docs/workflows/WORKFLOW_GUIDE.md`
- Slash commands: `docs/workflows/SLASH_COMMANDS.md`
- Roadmap: `docs/roadmap/ROADMAP.md`

---

## 📂 Directory Guide

### `/architecture` - System Design
**What's here**: Component architecture, data flow, state management

**Key Files**:
- `COMPONENTS.md` - Complete component catalog (16 components, routes, state)

### `/design` - Visual Design Principles
**What's here**: Design philosophy, shader system, visual references

**Key Files**:
- `SHADER_PHILOSOPHY.md` - Shader design principles (Bass, Gmunk, Thorp, SANAA)

### `/history` - Optimization History
**What's here**: Wave-by-wave optimization documentation (Waves 1-7)

**Key Files**:
- `OPTIMIZATIONS.md` - Complete optimization timeline (-11.3% LOC, -20% bundle)

### `/qa` - Quality Assurance
**What's here**: QA reports, test results, security audits

**Key Files**:
- `SHADER_REDESIGN_QA_REPORT.md` - Shader system QA (11 routes tested)
- `QA_SUMMARY.md` - General QA status
- `RECOVERY_PLAN.md` - Deployment recovery procedures (archived)

### `/reference` - Technical Reference
**What's here**: Dependencies, assets, conventions, known issues

**Key Files**:
- `KNOWN_ISSUES.md` - Active bugs and workarounds

**Planned**:
- `DEPENDENCIES.md` - Package inventory
- `ASSETS.md` - Asset optimization guide
- `CONVENTIONS.md` - Code standards

### `/research` - Research Findings
**What's here**: Performance analysis, design research

**Key Files**:
- `SHADER_REDESIGN_ANALYSIS.md` - Before/after comparison (screenshots, metrics)

**Planned**:
- Game UI research findings (archived in /archive/research/)

### `/roadmap` - Feature Planning
**What's here**: Feature backlog, planning docs, examples

**Key Files**:
- `ROADMAP.md` - Current features & backlog
- `examples/SKILLS_PAGE_EXAMPLE.md` - Complete workflow example

### `/workflows` - Development Workflows
**What's here**: 7-agent workflow system, prompt templates, guides

**Key Files**:
- `WORKFLOW_GUIDE.md` - How the 7-agent system works
- `SLASH_COMMANDS.md` - `/workflow`, `/engineer`, `/researcher`, `/qa` commands
- `PROMPT_TEMPLATES.md` - Copy-paste prompts for each agent
- `GETTING_STARTED.md` - 5-minute quickstart

### `/archive` - Completed/Outdated
**What's here**: Old docs, completed features, abandoned experiments

**Subfolders**:
- `completed-work/` - Finished features (theme system, shader fixes, old architecture)
- `execution/` - Old CLAUDE.md versions, execution docs
- `experiments/` - Failed attempts, prototypes
- `planning/` - Old planning docs (shader redesign kickoff)
- `research/` - Old research notes (game UI research)

---

## 🎯 Documentation Principles

### 1. **Living Documentation**
Docs are updated as features are built, not after the fact.

### 2. **Archive Aggressively**
Completed work moves to `/archive` to keep main docs clean.

### 3. **Single Source of Truth**
Each topic has ONE authoritative doc:
- Project overview: `/CLAUDE.md` (root)
- Component catalog: `/docs/architecture/COMPONENTS.md`
- Shader system: `/docs/design/SHADER_PHILOSOPHY.md`
- Known issues: `/docs/reference/KNOWN_ISSUES.md`

### 4. **Discoverable Structure**
Folder names are self-explanatory, README files guide navigation.

---

## 📝 Recent Updates

### 2025-11-24: Light Mode Integration & Cleanup
- ✅ Fixed ShaderVisual theme integration
- ✅ Fixed AppSlider hardcoded colors
- ✅ Moved theme docs to archive (feature complete)
- ✅ Moved old architecture docs to archive
- ✅ Updated tasks README with completion status

### 2025-11-21: Shader Redesign Complete
- ✅ 7-agent workflow system executed
- ✅ Shader personality system implemented
- ✅ Performance analysis documented
- ✅ Design philosophy documented

### 2025-11-20 to 2025-11-21: Optimization Waves 1-7
- ✅ -11.3% lines of code (-596 lines)
- ✅ -20% bundle size (-198KB)
- ✅ Code splitting (15 chunks)
- ✅ Asset optimization (-12MB)
- ✅ Documentation overhaul

---

## 🔍 Finding What You Need

**"How do I add a new project page?"**
→ `CLAUDE.md` (main guide, "Add a New Project" section)

**"What components are available?"**
→ `docs/architecture/COMPONENTS.md`

**"How does the shader system work?"**
→ `docs/design/SHADER_PHILOSOPHY.md`

**"What are the current bugs?"**
→ `docs/reference/KNOWN_ISSUES.md`

**"How do I use the workflow system?"**
→ `docs/workflows/GETTING_STARTED.md`

**"What was changed in optimization waves?"**
→ `docs/history/OPTIMIZATIONS.md`

**"What's the project status?"**
→ `/CLAUDE.md` (section: "Current Status")

---

## 🗂️ Archived Documentation

Old docs are preserved in `/docs/archive/` for historical reference:

**Theme System Docs** (completed work):
- `THEME_ANALYSIS.md` - Original theme analysis
- `THEME_IMPLEMENTATION_GUIDE.md` - Implementation guide
- `THEME_IMPLEMENTATION_STATUS.md` - Status report
- `THEME_VISUAL_STATUS.md` - Visual verification
- `THEME_WORKFLOW_CHECKLIST.md` - Completion checklist
- `SHADER_THEME_FIX.md` - Original theme fix attempt

**Old Architecture** (superseded):
- `ARCHITECTURE.md` - Old architecture doc (replaced by COMPONENTS.md)

**Planning Docs** (completed):
- `SHADER_REDESIGN_KICKOFF.md` - Shader redesign planning

**QA Results** (completed):
- `QA_RESULTS.md` - Old QA report (superseded by SHADER_REDESIGN_QA_REPORT.md)

---

## 🚧 Planned Documentation

Docs to be created (extracted from old CLAUDE.md):

**Reference**:
- `DEPENDENCIES.md` - Package inventory & tech stack
- `ASSETS.md` - Asset inventory & optimization
- `CONVENTIONS.md` - Naming patterns & code organization

**Guides**:
- `QUICK_START.md` - Expanded setup guide
- `ADDING_PROJECTS.md` - Step-by-step project workflow
- `STYLING.md` - Design system & color scheme
- `DEPLOYMENT.md` - Build & deploy process
- `TROUBLESHOOTING.md` - Common issues & fixes

**Architecture**:
- `DATA_FLOW.md` - Data structures & flow
- `ROUTING.md` - Route configuration details
- `STATE_MANAGEMENT.md` - State patterns & hooks

---

**Maintained by**: Claude Code
**Last Major Update**: 2025-11-24 (Light mode integration)
**Documentation Health**: 🟢 Good - Recent cleanup, clear structure
