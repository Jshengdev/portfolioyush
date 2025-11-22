# Master Prompt Template for Independent Agents

## How to Use This System

This repository now has **22 individual task files** split from the main `EXECUTION_PLAN.md`. Each task can be executed by an independent AI agent in parallel with others in the same wave.

---

## Directory Structure

```
/tasks/
├── wave-1/          # 6 parallel tasks (30 min total)
│   ├── W1-T1-delete-duplicate-assets.md
│   ├── W1-T2-remove-horizontalscroll.md
│   ├── W1-T3-remove-projectmenu.md
│   ├── W1-T4-remove-hoodie-sticker.md
│   ├── W1-T5-remove-shtcontent-clean-cursor.md
│   └── W1-T6-remove-babel-dependencies.md
│
├── wave-2/          # 2 parallel tasks (45 min total)
│   ├── W2-T1-fix-package-json.md
│   └── W2-T2-create-theme-system.md
│
├── wave-3/          # 5 parallel tasks (2 hours total)
│   ├── W3-T1-consolidate-container.md
│   ├── W3-T2-consolidate-title.md
│   ├── W3-T3-consolidate-container2-glow.md
│   ├── W3-T4-centralize-archive-data.md
│   └── W3-T5-optimize-cursor-animation.md
│
├── wave-4/          # 3 parallel tasks (1.5 hours total)
│   ├── W4-T1-create-readme.md
│   ├── W4-T2-add-jsdoc-comments.md
│   └── W4-T3-update-meta-tags.md
│
├── wave-5/          # 2 parallel tasks (1.5 hours total)
│   ├── W5-T1-optimize-images.md
│   └── W5-T2-consolidate-fonts.md
│
├── wave-6/          # 3 optional parallel tasks (4 hours total)
│   ├── W6-T1-lazy-loading.md
│   ├── W6-T2-simplify-line.md (⚠️ HIGH RISK - skip unless approved)
│   └── W6-T3-extract-shaders.md
│
└── wave-7/          # 1 task (1 hour)
    └── W7-T1-integration-test.md
```

---

## Execution Strategy

### Option 1: Sequential Waves (Recommended)
Complete all tasks in a wave before moving to the next wave.

**Example for Wave 1**:
- Start 6 independent Claude sessions
- Assign one task file to each session
- Wait for all 6 to complete before starting Wave 2

### Option 2: Single Agent Sequential
Execute all tasks sequentially with one agent.

---

## Agent Prompt Template

Copy and paste this into each new Claude session:

```
I need you to execute a specific task from the portfolio optimization plan.

**Repository**: /Users/johnnysheng/Documents/GitHub/portfolioyush

**Your Task File**: /tasks/wave-{WAVE}/{TASK-ID}.md

**Instructions**:
1. Read and execute ONLY the task in YOUR assigned task file
2. Follow all steps in the "Tasks" section
3. Run all validation checks in the "Validation Checklist" section  
4. Mark "Final Confirmation" checkboxes when complete
5. Commit your changes with the specified commit message
6. Do NOT modify files outside your task scope to avoid merge conflicts

**Core Reference**: /EXECUTION_PLAN.md (for detailed context if needed)

**Start now**: Read your task file and begin execution.
```

### Example Usage

**For W1-T1 (Delete Assets)**:
```
I need you to execute a specific task from the portfolio optimization plan.

**Repository**: /Users/johnnysheng/Documents/GitHub/portfolioyush
**Your Task File**: /tasks/wave-1/W1-T1-delete-duplicate-assets.md

Read and execute this task following all validation steps. Commit when complete.
```

**For W2-T2 (Theme System)**:
```
I need you to execute a specific task from the portfolio optimization plan.

**Repository**: /Users/johnnysheng/Documents/GitHub/portfolioyush
**Your Task File**: /tasks/wave-2/W2-T2-create-theme-system.md

Read and execute this task following all validation steps. Commit when complete.
```

---

## Wave Completion Checklist

### Wave 1 ✅/⬜
- [ ] W1-T1: Delete duplicate assets (-351MB)
- [ ] W1-T2: Remove HorizontalScroll.jsx (-198 lines)
- [ ] W1-T3: Remove ProjectMenu.jsx (-175 lines)
- [ ] W1-T4: Remove Hoodie & Sticker (-524 lines)
- [ ] W1-T5: Remove shtContent & clean Cursor (-68 lines)
- [ ] W1-T6: Remove Babel dependencies

### Wave 2 ✅/⬜
- [ ] W2-T1: Fix package.json
- [ ] W2-T2: Create theme system

### Wave 3 ✅/⬜
- [ ] W3-T1: Consolidate Container
- [ ] W3-T2: Consolidate Title
- [ ] W3-T3: Consolidate Container2 & Glow
- [ ] W3-T4: Centralize Archive data
- [ ] W3-T5: Optimize Cursor animation

### Wave 4 ✅/⬜
- [ ] W4-T1: Create README
- [ ] W4-T2: Add JSDoc comments
- [ ] W4-T3: Update Meta Tags

### Wave 5 ✅/⬜
- [ ] W5-T1: Optimize images (-13MB)
- [ ] W5-T2: Consolidate fonts

### Wave 6 (Optional) ✅/⬜
- [ ] W6-T1: Lazy loading (-38% bundle)
- [ ] W6-T2: Simplify Line.jsx (⚠️ SKIP unless approved)
- [ ] W6-T3: Extract shaders

### Wave 7 (Integration) ✅/⬜
- [ ] W7-T1: Full integration test

---

## Merge Conflict Prevention

Each task file is designed to touch different files, minimizing conflicts:

**Wave 1**: All delete operations (different files)
**Wave 2**: package.json vs theme.js/App.jsx
**Wave 3**: Different component files
**Wave 4**: README vs JSDoc vs index.html
**Wave 5**: Images vs fonts  
**Wave 6**: App.jsx vs Line.jsx vs ShaderVisual.jsx
**Wave 7**: Testing only (no file changes)

If conflicts occur:
```bash
git pull --rebase
# Resolve conflicts manually
git rebase --continue
```

---

## Quick Start

1. **Choose your wave** (start with Wave 1)
2. **Start parallel agents** (6 sessions for Wave 1)
3. **Assign each agent a task file** using the prompt template above
4. **Wait for all to complete** before moving to next wave
5. **Verify integration** after each wave with `npm run build && npm run dev`

**Estimated Total Time**: 4-5 hours (with full parallelization)
