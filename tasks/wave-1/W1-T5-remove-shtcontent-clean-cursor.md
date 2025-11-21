# W1-T5: Remove Dead Code - shtContent.json & Clean Cursor.jsx

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 159-190)  
**⏱ Time**: 10 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥 (-68 lines)  
**Wave**: 1 | **Dependencies**: None | **Parallelizable**: Yes

---

## Quick Overview

Delete unused `shtContent.json` (27 lines) and remove commented dead code from `Cursor.jsx` (41 lines of commented CursorPeePee component).

---

## Tasks

### 1. Verify JSON Not Imported
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

grep -r "shtContent" src/
```
Expected: No results

### 2. Delete JSON File
```bash
rm src/components/Projectfiles/shtContent.json
```

### 3. Edit Cursor.jsx
Open `/src/components/Cursor.jsx` and:
- Read the file to identify exact lines with commented `CursorPeePee` component (lines 1-41)
- Remove all commented styled-component code
- Keep only the active Cursor component

### 4. Verify Build
```bash
npm run build
npm run dev
```

---

## Validation Checklist

- [ ] shtContent.json deleted
- [ ] Cursor.jsx has no commented code
- [ ] Custom cursor still works in browser (ring follows mouse with lag, dot tracks exactly)
- [ ] Build succeeds

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Remove unused shtContent.json and clean Cursor.jsx dead code (-68 lines)"`
- [ ] Ready for next task

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
