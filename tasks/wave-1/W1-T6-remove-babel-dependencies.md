# W1-T6: Remove Unnecessary Dependencies

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 193-220)  
**⏱ Time**: 5 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥 (-5MB node_modules)  
**Wave**: 1 | **Dependencies**: None | **Parallelizable**: Yes

---

## Quick Overview

Remove unnecessary Babel packages (`@babel/core`, `@babel/preset-env`, `@babel/preset-react`). Vite uses esbuild for JSX transformation, so these are redundant.

---

## Tasks

### 1. Remove Packages
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

npm uninstall @babel/core @babel/preset-env @babel/preset-react
```

### 2. Verify Build
```bash
npm run build
```

### 3. Verify Dev Server
```bash
npm run dev
# Test for 30 seconds, verify hot reload works, then Ctrl+C
```

---

## Validation Checklist

- [ ] Packages removed from package.json
- [ ] Build succeeds
- [ ] Dev server starts without errors
- [ ] Hot reload works

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Remove unnecessary Babel dependencies (Vite handles JSX)"`
- [ ] Ready for next task

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
