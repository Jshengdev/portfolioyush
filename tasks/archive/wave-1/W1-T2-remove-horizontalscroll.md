# W1-T2: Remove Dead Code - HorizontalScroll.jsx

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 66-92)  
**⏱ Time**: 5 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥 (-198 lines)  
**Wave**: 1 | **Dependencies**: None | **Parallelizable**: Yes

---

## Quick Overview

Delete unused `/src/components/HorizontalScroll.jsx` (198 lines). Similar functionality exists in `Archive.jsx`. File contains wrong asset paths and is never imported.

---

## Tasks

### 1. Verify File Not Imported
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

grep -r "HorizontalScroll" src/
```
Expected: No results

### 2. Delete File
```bash
rm src/components/HorizontalScroll.jsx
```

### 3. Verify Build
```bash
npm run build
```

---

## Validation Checklist

- [ ] File deleted: `ls src/components/HorizontalScroll.jsx 2>&1 | grep "No such file"`
- [ ] No import errors: `npm run build 2>&1 | grep -i "horizontalscroll" && echo "✗ Still referenced" || echo "✓ Clean"`
- [ ] Grep shows no references: `grep -r "HorizontalScroll" src/ || echo "✓ No references"`

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Remove unused HorizontalScroll component (-198 lines)"`
- [ ] Ready for next task

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
