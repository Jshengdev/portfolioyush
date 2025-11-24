# Tasks Directory

**Purpose**: Workspace for active feature development tasks
**Status**: 🟢 Active (currently empty - all tasks completed)
**Last Updated**: 2025-11-24

---

## Current Status

**No active tasks** - All shader redesign work has been completed and archived.

---

## Recent Completion

### Shader Redesign Project ✅
**Completion Date**: 2025-11-24
**Status**: All tasks completed and moved to archive

**What Was Completed**:
- ✅ 4 Engineer tasks (shader personality system)
- ✅ 2 Researcher tasks (analysis & documentation)
- ✅ 1 QA task (comprehensive verification)
- ✅ Light mode integration fix (2025-11-24)

**Results**:
- Shader system with 5 personality attributes (complexity, energy, focus, warmth, depth)
- John Whitney-inspired harmonic motion (non-repeating animation)
- Gmunk-inspired cursor light trails
- SANAA-inspired multi-layer depth perception
- Full dark/light theme integration
- 121fps performance maintained

**Task Files Archived**: See `/tasks/archive/shader-redesign/`

---

## How to Use This Directory

### For New Features

When starting a new feature development cycle:

1. **Create task files** in this directory:
   ```
   /tasks/FEATURE_NAME_TASK_1.md
   /tasks/FEATURE_NAME_TASK_2.md
   etc.
   ```

2. **Use the 7-agent workflow** (see `/docs/workflows/`):
   - Engineers (parallel execution)
   - Researchers (sequential)
   - QA (final verification)

3. **Track progress** by updating task files

4. **Archive when complete** by moving to `/tasks/archive/[feature-name]/`

### Task File Template

```markdown
# [Task Name]

**Agent**: Engineer 1 / Researcher 1 / QA
**Time Estimate**: X minutes
**Status**: ⏳ Not Started / 🔄 In Progress / ✅ Complete

## Objective
[Clear description of what needs to be done]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Implementation Notes
[Technical details, file locations, etc.]

## Completion Checklist
- [ ] Implementation complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

## Archive Structure

```
tasks/archive/
├── shader-redesign/        # Completed shader system (2025-11-21 to 2025-11-24)
├── wave-1/                 # Portfolio optimization wave 1
├── wave-2/                 # Portfolio optimization wave 2
├── wave-3/                 # Portfolio optimization wave 3
├── wave-4/                 # Portfolio optimization wave 4
├── wave-5/                 # Portfolio optimization wave 5
├── wave-6/                 # Portfolio optimization wave 6
└── wave-7/                 # Portfolio optimization wave 7
```

---

## Related Documentation

**Workflow System**: `/docs/workflows/WORKFLOW_GUIDE.md`
**Slash Commands**: `/docs/workflows/SLASH_COMMANDS.md`
**Prompt Templates**: `/docs/workflows/PROMPT_TEMPLATES.md`
**Roadmap**: `/docs/roadmap/ROADMAP.md`

---

## Quick Commands

```bash
# Start a new workflow (guided)
/workflow

# Run a single engineer task
/engineer

# Run research analysis
/researcher

# Run QA verification
/qa
```

---

**Maintained by**: Claude Code workflow system
**Current Features**: See `/docs/roadmap/ROADMAP.md`
**Active Development**: None (awaiting next feature)
