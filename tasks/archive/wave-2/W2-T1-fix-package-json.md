# W2-T1: Fix package.json Configuration

**📍 Core Plan**: `/EXECUTION_PLAN.md` (Lines 239-274)  
**⏱ Time**: 15 minutes | **⚠️ Risk**: Low | **🎯 Impact**: 🔥🔥  
**Wave**: 2 | **Dependencies**: Wave 1 complete | **Parallelizable**: Yes (with W2-T2)

---

## Quick Overview

Fix incorrect package.json fields: name ("react-app" → "portfolioyush"), homepage (wrong repo URL), and deploy script (uses "build" instead of "dist").

---

## Tasks

### 1. Read Current package.json
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush

cat package.json
```

### 2. Update These Fields
Edit `/package.json`:
```json
{
  "name": "portfolioyush",
  "version": "1.0.0",
  "description": "Portfolio website showcasing design and creative projects",
  "homepage": "https://jshengdev.github.io/portfolioyush",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Verify Build and Deploy Script
```bash
npm run build
ls -la dist/
```

---

## Validation Checklist

- [ ] package.json updated with correct values
- [ ] Build creates dist/ directory
- [ ] No errors in build

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed: `git add -A && git commit -m "Fix package.json configuration (name, homepage, deploy script)"`
- [ ] Ready for next wave

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
