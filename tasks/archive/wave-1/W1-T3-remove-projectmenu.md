# W1-T3: Remove Dead Code - ProjectMenu.jsx

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 95-120)  
**⏱ Time**: 5 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥 (-175 lines)  
**Wave**: 1 | **Dependencies**: None | **Parallelizable**: Yes

---

## Quick Overview

Delete unused `/src/components/ProjectMenu.jsx` (175 lines). Replaced by current `Projects.jsx` implementation. Contains duplicate Container and glow animation.

---

## Tasks

### 1. Verify File Not Imported
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

grep -r "ProjectMenu" src/
```
Expected: No results

### 2. Delete File
```bash
rm src/components/ProjectMenu.jsx
```

### 3. Verify Build
```bash
npm run build
```

---

## Validation Checklist

- [ ] File deleted: `ls src/components/ProjectMenu.jsx 2>&1 | grep "No such file"`
- [ ] No import errors: `npm run build && echo "✓ Build passes"`
- [ ] Projects page loads: Open http://localhost:3000/projects, verify grid displays 6 projects

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Remove unused ProjectMenu component (-175 lines)"`
- [ ] Ready for next task

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
