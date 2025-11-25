# W3-T3: Cross-Browser Testing

**Wave**: 3 (Research & QA)
**Task**: 3 of 5
**Agent**: QA
**Time Estimate**: 20 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 2)
**Dependencies**: Wave 2 complete

---

## Prompt (Copy & Paste)

```
I need you to test the experimental shaders across different browsers.

## Task
Verify all 5 experimental shaders work correctly in major browsers.

## Testing Steps

### 1. Start Development Server
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush
yarn dev
```

### 2. Test in Each Browser

For each browser, test:
1. Navigate to /experiments
2. Verify navigation grid displays correctly
3. Click each experiment (v1-v5)
4. For each experiment verify:
   - Shader renders without errors
   - Animation is smooth
   - Mouse interaction works
   - Navigation buttons work
   - Back button returns to /experiments
   - Theme toggle affects shader

### 3. Browsers to Test

| Browser | Version | Test |
|---------|---------|------|
| Chrome | Latest | ✓ Primary |
| Safari | Latest | ✓ Mac users |
| Firefox | Latest | ✓ Important |
| Edge | Latest | Optional |

### 4. Check Console for Errors

In each browser, open Developer Tools Console (F12 or Cmd+Option+I) and look for:
- JavaScript errors
- WebGL errors
- Shader compilation errors
- React warnings

### 5. Test Checklist per Browser

For each browser, complete this checklist:

```
Browser: [Name] [Version]
Date: [Date]

Navigation:
- [ ] /experiments loads
- [ ] Grid displays 5 cards
- [ ] Cards link to correct routes

V1 Aurora:
- [ ] Shader renders
- [ ] Animation runs
- [ ] Mouse interaction works
- [ ] No console errors

V2 Fog:
- [ ] Shader renders
- [ ] Animation runs
- [ ] Mouse interaction works
- [ ] No console errors

V3 Bloom:
- [ ] Shader renders
- [ ] Animation runs
- [ ] Mouse interaction works
- [ ] No console errors

V4 Liquid:
- [ ] Shader renders
- [ ] Animation runs
- [ ] Mouse interaction works
- [ ] No console errors

V5 Waves:
- [ ] Shader renders
- [ ] Animation runs
- [ ] Mouse interaction works
- [ ] No console errors

Overall:
- [ ] Theme toggle works
- [ ] Keyboard navigation works
- [ ] No memory leaks (stable over time)
```

### 6. Report Issues

If issues found, document:
- Browser + version
- Issue description
- Steps to reproduce
- Console error (if any)
- Screenshot (if possible)

## Report Format

Create `/docs/reports/HERO_EXPERIMENTS_BROWSER_TEST.md`:

```markdown
# Hero Experiments - Browser Testing Report

**Date**: [Date]
**Tested by**: QA Agent

## Summary
- Browsers tested: [count]
- Tests passed: [count]
- Tests failed: [count]
- Critical issues: [count]

## Results by Browser

### Chrome [version]
- Status: ✅ Pass / ❌ Fail
- Issues: [None / List issues]

### Safari [version]
- Status: ✅ Pass / ❌ Fail
- Issues: [None / List issues]

### Firefox [version]
- Status: ✅ Pass / ❌ Fail
- Issues: [None / List issues]

## Issues Found

### Issue 1: [Title]
- **Browser**: [Browser]
- **Severity**: Critical / High / Medium / Low
- **Description**: [What happened]
- **Steps to Reproduce**: [Steps]
- **Expected**: [What should happen]
- **Actual**: [What actually happened]
- **Recommendation**: [How to fix]

## Conclusion
[Overall assessment - ready for production or needs fixes]
```

## Acceptance Criteria
- [ ] Tested in Chrome
- [ ] Tested in Safari
- [ ] Tested in Firefox
- [ ] All experiments render in all browsers
- [ ] No critical console errors
- [ ] Report created
```

---

## Test Matrix

| Feature | Chrome | Safari | Firefox |
|---------|--------|--------|---------|
| Nav grid | ? | ? | ? |
| V1 Aurora | ? | ? | ? |
| V2 Fog | ? | ? | ? |
| V3 Bloom | ? | ? | ? |
| V4 Liquid | ? | ? | ? |
| V5 Waves | ? | ? | ? |
| Theme toggle | ? | ? | ? |
| Keyboard nav | ? | ? | ? |

---

## Output

**Path**: `/docs/reports/HERO_EXPERIMENTS_BROWSER_TEST.md`

---

## Completion Checklist

- [ ] Chrome tested
- [ ] Safari tested
- [ ] Firefox tested
- [ ] Report written
