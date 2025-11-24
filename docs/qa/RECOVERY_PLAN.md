# Shader Redesign Recovery Plan

**Status**: 🔴 URGENT - Feature Implementation Not on Main Branch
**Created**: 2025-11-21
**Estimated Recovery Time**: 2-3 hours

---

## 🎯 Objective

Merge shader redesign feature branches to main and verify functionality before deployment.

---

## 📋 Pre-Flight Checklist

**Confirmed Working**:
- ✅ Feature branches exist on origin (6 branches)
- ✅ Implementation code exists in commits
- ✅ Current main builds successfully (801 KB)
- ✅ Documentation already created
- ✅ Performance benchmarks already done

**Confirmed Broken**:
- ❌ Implementation NOT on main branch
- ❌ PRs merged but code reverted/lost
- ❌ Production has old shader code

---

## 🚀 Recovery Steps (Fast Track)

### Option A: Sequential Merge (Safest - 2 hours)

**Step 1: Fetch Latest** (1 min)
```bash
git fetch origin
git checkout main
git pull origin main
```

**Step 2: Create Integration Branch** (1 min)
```bash
git checkout -b integration/shader-redesign-recovery
```

**Step 3: Merge Features in Order** (30 min)

```bash
# 1. Base: Shader personality attributes
git merge origin/claude/shader-attributes-01CXXUzmbUqQtxiN1ecdWcY5
# Resolve conflicts if any, test build
yarn build

# 2. Add: Harmonic motion
git merge origin/claude/shader-harmonics-01VAaL1hLCQgwU2hvWWjokx9
yarn build

# 3. Add: Cursor trails
git merge origin/claude/shader-cursor-trails-01Gj8AVoPku4JhEVjZ4UELKU
yarn build

# 4. Add: Multi-layer depth
git merge origin/claude/shader-layers-018dYKtgJLbJio7ZzcE3naMu
yarn build
```

**Step 4: Verify Implementation** (10 min)
```bash
# Check ShaderVisual.jsx has new uniforms
grep -E "u_complexity|u_energy|u_focus|u_warmth|u_depth" src/components/ShaderVisual.jsx

# Should see:
# - shaderPersonalities object
# - 5 personality uniforms
# - harmonic oscillator functions
# - cursor trail buffers
# - multi-layer noise
```

**Step 5: Test Locally** (20 min)
```bash
yarn dev
# Open http://localhost:3000
# Test each route: /, /about, /projects, /archive, /contact
# Verify:
#   - Different visual patterns per route
#   - Cursor trails on mouse move
#   - Smooth animations
#   - No console errors
```

**Step 6: Run Full Build** (5 min)
```bash
yarn build
# Verify:
#   - Build succeeds
#   - Bundle size <850KB (target: ~805KB)
#   - No errors
```

**Step 7: Create PR to Main** (5 min)
```bash
git push origin integration/shader-redesign-recovery
# Create PR on GitHub
# Title: "🔧 Fix: Merge shader redesign features to main"
# Body: "Recovers shader personality system, harmonic motion, cursor trails, and multi-layer depth. See docs/qa/SHADER_REDESIGN_QA_REPORT.md for details."
```

**Step 8: Merge to Main** (2 min)
```bash
# After PR approval
git checkout main
git merge integration/shader-redesign-recovery
git push origin main
```

**Step 9: Re-run QA** (60 min)
- Use docs/qa/SHADER_REDESIGN_QA_REPORT.md checklist
- Verify all 11 routes
- Test theme system
- Performance benchmarks
- Cross-browser testing

---

### Option B: Cherry-Pick (Faster - 1 hour)

**Step 1: Create Clean Branch** (1 min)
```bash
git checkout main
git pull origin main
git checkout -b fix/shader-redesign-cherry-pick
```

**Step 2: Cherry-Pick Implementation Commits** (10 min)
```bash
# Get the specific implementation commits
git cherry-pick 4367b03  # Shader attributes
git cherry-pick 26d6da2  # Harmonic motion
git cherry-pick ed9f0f1  # Multi-layer depth
# Add cursor-trails commit hash here
```

**Step 3: Test & Deploy** (50 min)
```bash
yarn build
yarn dev
# Quick smoke test
# Create PR
# Merge to main
```

---

### Option C: Manual Integration (Nuclear Option - 3 hours)

**Only if Options A & B fail due to conflicts**

1. Fetch latest feature branch ShaderVisual.jsx
2. Copy to main branch
3. Manually resolve any import/dependency issues
4. Test extensively
5. Commit as new implementation

---

## 🧪 Post-Recovery Verification

**Required Tests** (from QA report):
- [ ] Build succeeds (yarn build)
- [ ] Bundle size 800-850KB
- [ ] All 11 routes render shader
- [ ] Route personalities visible (test /about vs /projects)
- [ ] Theme toggle works (dark/light mode)
- [ ] Cursor trails appear on mouse move
- [ ] 60fps maintained on all routes
- [ ] No console errors

**Success Criteria**:
- Main branch has ShaderVisual.jsx with 15+ uniforms
- `yarn dev` shows different patterns per route
- Documentation matches implementation

---

## 🚨 If Recovery Fails

**Fallback Plan**:
1. Document feature branches as "complete but unmerged"
2. Mark shader redesign as "v2.0 future enhancement"
3. Deploy current main branch (old shader)
4. Schedule proper integration for next sprint

**Do NOT**:
- ❌ Force push to main
- ❌ Delete feature branches
- ❌ Abandon documentation work
- ❌ Rush merge without testing

---

## 📊 Expected Outcomes

### After Successful Recovery

**Codebase**:
- ✅ Main branch has full shader redesign
- ✅ All 11 routes have distinct personalities
- ✅ Theme integration working
- ✅ Performance maintained (60fps)

**Documentation**:
- ✅ Accurate (docs match reality)
- ✅ Deployment ready
- ✅ QA report updated to PASS

**Deployment**:
- ✅ Can deploy to production
- ✅ Feature complete
- ✅ User-facing improvements visible

---

## 📝 Lessons for Future

**Process Improvements**:
1. **Merge Verification**: After PR merge, verify code on main
2. **QA Before Docs**: Run QA before researchers document
3. **Smoke Test Gate**: Quick test on main before marking complete
4. **Deployment Checklist**: Add "Code on main?" to checklist

**Workflow Updates Needed**:
- Add "Integration Checkpoint" between Engineer 4 and Researcher 1
- QA does smoke test on main branch
- If fails, block researchers and return to engineers
- Update docs/workflows/WORKFLOW_GUIDE.md

---

## 🔗 Related Documents

- **QA Failure Report**: docs/qa/SHADER_REDESIGN_QA_REPORT.md
- **Feature Design**: docs/design/SHADER_PHILOSOPHY.md
- **Research Analysis**: docs/research/SHADER_REDESIGN_ANALYSIS.md (based on feature branches)

---

## 🎯 Next Actions

**For User**:
1. Review this recovery plan
2. Choose Option A (safest) or B (faster)
3. Execute merge steps
4. Verify locally before PR
5. Request QA re-verification

**For QA Agent**:
- Wait for merge completion
- Re-run full QA checklist
- Update QA report to PASS/FAIL
- Approve deployment or request fixes

---

**Recovery Plan Status**: READY TO EXECUTE
**Recommended Option**: A (Sequential Merge)
**Risk Level**: LOW (feature branches intact, documentation exists)
**Time Investment**: Worth it (6+ hours of work completed, just needs merge)

---

**Prepared by**: QA Agent (Claude Code)
**Date**: 2025-11-21
**Version**: 1.0
