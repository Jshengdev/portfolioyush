# W1-T4: Remove Dead Code - Hoodie & Sticker Project Pages

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 124-156)  
**⏱ Time**: 5 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥🔥 (-524 lines)  
**Wave**: 1 | **Dependencies**: None | **Parallelizable**: Yes

---

## Quick Overview

Delete unused Hoodie.jsx and Sticker.jsx (262 lines each). No routes exist in App.jsx, not listed in `/src/data/projectname.jsx`. Completely orphaned components.

---

## Tasks

### 1. Verify Not in Routes
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

grep -r "Hoodie" src/App.jsx
grep -r "Sticker" src/App.jsx
```
Expected: No results

### 2. Verify Not in Data
```bash
grep -r "Hoodie" src/data/
grep -r "Sticker" src/data/
```
Expected: No results

### 3. Delete Files
```bash
rm src/components/Projectfiles/Hoodie.jsx
rm src/components/Projectfiles/Sticker.jsx
```

### 4. Verify Build
```bash
npm run build
```

---

## Validation Checklist

- [ ] Both files deleted
- [ ] No import errors
- [ ] All project pages still accessible

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Remove unused Hoodie and Sticker project pages (-524 lines)"`
- [ ] Ready for next task

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
