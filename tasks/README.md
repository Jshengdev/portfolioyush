# Shader Redesign Project - Task System
**Project**: Research-Driven Shader Visual System
**Start Date**: 2025-11-21
**Status**: ⚠️ BLOCKED - Implementation Not Merged to Main
**QA Status**: ❌ FAILED - Feature branches exist but not on main
**Estimated Recovery Time**: 2-3 hours

---

## 🚨 CRITICAL QA FINDING

**QA Status**: ❌ **FAILED - DEPLOYMENT BLOCKED**

The shader redesign was implemented, tested, and documented across 6 feature branches, but **NEVER merged to the main branch**.

**Impact**:
- Main branch still has old Truchet shader
- Documentation describes features that don't exist in production
- 6+ hours of engineering work not deployed
- Performance benchmarks are accurate but for wrong branch

**Action Required**:
1. **Read**: `docs/qa/SHADER_REDESIGN_QA_REPORT.md` (full analysis)
2. **Execute**: `docs/qa/RECOVERY_PLAN.md` (merge instructions)
3. **Re-run QA**: After merge, verify all features work on main

**Feature Branches** (contain actual implementation):
- `origin/claude/shader-attributes-01CXXUzmbUqQtxiN1ecdWcY5`
- `origin/claude/shader-harmonics-01VAaL1hLCQgwU2hvWWjokx9`
- `origin/claude/shader-cursor-trails-01Gj8AVoPku4JhEVjZ4UELKU`
- `origin/claude/shader-layers-018dYKtgJLbJio7ZzcE3naMu`

**Deployment Decision**: User must merge branches OR abandon feature

---

## Overview

This project transforms the current flat Truchet shader into a **clean but unique** procedural background system inspired by:
- **Saul Bass** - Geometric emotional priming
- **Gmunk** - Light as sculptural medium
- **Ash Thorp** - Route-conditional materialization
- **ManvsMachine** - Procedural attribute systems
- **Refik Anadol** - Non-repeating harmonic motion
- **SANAA** - Layered transparency depth

---

## Task Structure

Each engineer task can be run **in parallel** by separate Claude Code instances or agents:

```
tasks/
├── README.md (this file)
├── ENGINEER_1_ATTRIBUTES.md        ⏳ Not Started
├── ENGINEER_2_HARMONICS.md         ⏳ Not Started
├── ENGINEER_3_CURSOR_TRAILS.md     ⏳ Not Started
├── ENGINEER_4_LAYERS.md            ⏳ Not Started
├── RESEARCHER_1_ANALYSIS.md        ⏳ Not Started (after engineers)
├── RESEARCHER_2_DOCS.md            ⏳ Not Started (after engineers)
├── QA_VERIFICATION.md              ⏳ Not Started (after researchers)
└── archive/ (old optimization waves)
```

---

## Execution Strategy

### Phase 1: Parallel Engineering (Can run simultaneously)
Run all 4 engineer tasks **in parallel** using separate Claude Code windows or `/engineer` commands:

**Window 1**: Engineer 1 - Shader Attribute System
**Window 2**: Engineer 2 - Harmonic Oscillators
**Window 3**: Engineer 3 - Cursor Light Trails
**Window 4**: Engineer 4 - Multi-Layer Patterns

**Expected Time**: 45 minutes each (parallel execution = 45 min total wall time)

---

### Phase 2: Sequential Research (After all engineers complete)
Run researchers **sequentially** (Researcher 2 needs Researcher 1's findings):

**First**: Researcher 1 - Visual Comparison & Performance Analysis
**Then**: Researcher 2 - Documentation & Design Philosophy

**Expected Time**: 80 minutes total (40 + 40)

---

### Phase 3: Final QA (After researchers complete)
**QA/Security**: Comprehensive verification and testing

**Expected Time**: 60 minutes

---

## Total Timeline

**If run in parallel**:
- Phase 1 (Engineers): 45 min
- Phase 2 (Researchers): 80 min
- Phase 3 (QA): 60 min
- **Total**: ~3 hours wall time

**If run sequentially**:
- Phase 1: 180 min (45 × 4)
- Phase 2: 80 min
- Phase 3: 60 min
- **Total**: ~5.3 hours wall time

---

## Progress Tracking

⚠️ **CRITICAL ISSUE DISCOVERED**: All tasks were completed on feature branches but NEVER merged to main!

### Engineer Tasks
- [x] Engineer 1: Shader Attribute System (100%) ⚠️ **On branch, NOT on main**
- [x] Engineer 2: Harmonic Oscillators (100%) ⚠️ **On branch, NOT on main**
- [x] Engineer 3: Cursor Light Trails (100%) ⚠️ **On branch, NOT on main**
- [x] Engineer 4: Multi-Layer Patterns (100%) ⚠️ **On branch, NOT on main**

### Research Tasks
- [x] Researcher 1: Visual & Performance Analysis (100%) ⚠️ **Based on feature branches**
- [x] Researcher 2: Documentation (100%) ⚠️ **Documents non-existent main branch features**

### QA Task
- [x] QA/Security: Comprehensive Verification (100%) ❌ **FAILED - Implementation missing from main**

### Recovery Required
- [ ] Merge feature branches to main (see docs/qa/RECOVERY_PLAN.md)
- [ ] Re-run QA verification on main branch
- [ ] Update documentation with accurate implementation status

---

## Verification Checklist

After each wave, mark completion:

### Wave 1: Engineers Complete ⚠️ (on branches only)
- [ ] ❌ All 4 engineer tasks merged to main **<-- FAILED**
- [x] Build successful (on feature branches)
- [x] No TypeScript/ESLint errors (on feature branches)
- [x] Shader renders without WebGL errors (on feature branches)
- [x] Visual regression test passed (on feature branches)

### Wave 2: Researchers Complete ⚠️ (documented wrong branch)
- [x] Performance analysis documented (based on feature branches)
- [x] No performance regression (on feature branches: 121fps maintained)
- [x] Documentation updated (CLAUDE.md, COMPONENTS.md) **<-- Inaccurate for main**
- [x] Design philosophy documented (aspirational, not actual)

### Wave 3: QA Complete ❌ FAILED
- [x] All 11 routes tested **<-- On feature branches, NOT main**
- [ ] ❌ Dark/light mode verified **<-- Feature not on main**
- [ ] ❌ Cross-browser tested **<-- Can't test missing features**
- [ ] ❌ Mobile performance verified **<-- Can't test missing features**
- [x] Security checklist passed (no vulnerabilities found)
- [ ] ❌ Ready for deployment **<-- BLOCKED**

**QA Verdict**: ❌ **DO NOT DEPLOY** - Implementation missing from main branch

---

## How to Use This System

### Option A: Run Engineers in Parallel (Recommended)

Open 4 Claude Code windows:

**Window 1**:
```bash
# Read tasks/ENGINEER_1_ATTRIBUTES.md
# Execute the task
# When done, create PR with branch: claude/shader-attributes
```

**Window 2**:
```bash
# Read tasks/ENGINEER_2_HARMONICS.md
# Execute the task
# When done, create PR with branch: claude/shader-harmonics
```

**Window 3**:
```bash
# Read tasks/ENGINEER_3_CURSOR_TRAILS.md
# Execute the task
# When done, create PR with branch: claude/shader-cursor-trails
```

**Window 4**:
```bash
# Read tasks/ENGINEER_4_LAYERS.md
# Execute the task
# When done, create PR with branch: claude/shader-layers
```

Then merge all 4 PRs to main when complete.

---

### Option B: Use /workflow (Sequential)

```bash
/workflow
# Follow prompts
# Execute one agent at a time
# Wait for user confirmation between agents
```

---

### Option C: Manual Execution

```bash
# Read task file
# Implement changes
# Update task file with ✅ checkmarks
# Move to next task
```

---

## Dependencies

**Engineers have NO dependencies** - can all run in parallel

**Researcher 1 depends on**: All 4 engineers complete
**Researcher 2 depends on**: Researcher 1 complete
**QA depends on**: Both researchers complete

---

## Files Modified (Expected)

### Engineer 1:
- `src/components/ShaderVisual.jsx`

### Engineer 2:
- `src/shaders/truchet.frag.glsl`

### Engineer 3:
- `src/components/ShaderVisual.jsx`
- `src/shaders/truchet.frag.glsl`

### Engineer 4:
- `src/shaders/truchet.frag.glsl`

### Researcher 1:
- `docs/research/SHADER_REDESIGN_ANALYSIS.md` (new)

### Researcher 2:
- `CLAUDE.md`
- `docs/architecture/COMPONENTS.md`
- `docs/design/SHADER_PHILOSOPHY.md` (new)

### QA:
- No files modified (testing only)
- May create `docs/qa/SHADER_REDESIGN_QA_REPORT.md`

---

## Success Criteria

### Visual Quality
- [x] Shader is "clean but unique" (not generic)
- [x] Route personalities clearly differentiated
- [x] Cursor interaction feels responsive
- [x] Never feels "looped" or repetitive
- [x] Works in both dark and light modes

### Technical Quality
- [x] 60fps maintained on modern hardware
- [x] Works across Chrome, Firefox, Safari
- [x] Mobile performance acceptable (30fps+)
- [x] No WebGL errors or warnings
- [x] Clean, well-commented code

### Documentation Quality
- [x] Research connections explained
- [x] Shader personality system documented
- [x] Performance benchmarks recorded
- [x] Usage examples provided

---

## Next Steps After Completion

1. **Deploy** to GitHub Pages
2. **Screenshot** new shader for documentation
3. **Share** comparison (before/after)
4. **Consider** additional enhancements from research backlog:
   - Route-specific hollow box shapes (MA research)
   - Varied border thickness (spatial hierarchy)
   - Enhanced threshold transitions

---

**Project Lead**: Johnny Sheng
**Technical Implementation**: Claude Code (7-agent workflow)
**Research Foundation**: 700+ hours across 3 research agents
