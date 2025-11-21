# W1-T1: Delete Duplicate Assets Directory

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 26-63)  
**⏱ Time**: 5 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥🔥🔥 (-351MB)  
**Wave**: 1 | **Dependencies**: None | **Parallelizable**: Yes

---

## Quick Overview

Delete the root `/assets/` directory (351MB) which duplicates `/public/assets/`. All code uses `/assets/` paths which Vite resolves to `/public/assets/` in production.

---

## Tasks

### 1. Verify No Hard-Coded References
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

# Check for bad paths
grep -r "\"../../../assets" src/
grep -r "\"../../assets" src/ | grep -v "public/assets"
```
Expected: No results (all paths should use relative `/assets/`)

### 2. Delete Duplicate Directory
```bash
rm -rf assets/
```

### 3. Verify Build
```bash
npm run build
```

---

## If Errors Occur

```bash
# If build fails after deletion
1. Check error: npm run build 2>&1 | grep -i "asset"
2. Search for hard-coded paths: grep -r '/assets' src/ --exclude-dir=node_modules | grep -v "public/assets"
3. Fix any incorrect paths before re-attempting deletion
```

---

## Validation Checklist

- [ ] `/assets/` directory deleted: `ls -la assets/ 2>&1 | grep "No such file"`
- [ ] Build succeeds: `npm run build && echo "✓ Build successful"`
- [ ] Dev server starts: `npm run dev` (wait 5s, check http://localhost:3000)
- [ ] Verify image loads: Open /, check if background/hero images display
- [ ] Check console: DevTools Console shows 0 errors

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Remove duplicate assets directory (-351MB)"`
- [ ] Ready for next task

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
