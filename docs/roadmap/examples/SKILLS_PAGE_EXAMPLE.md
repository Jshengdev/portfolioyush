# Example: Adding a Skills/Technologies Page

**Feature**: Interactive skills showcase page
**Complexity**: Medium (7 agents)
**Total Time**: ~3.5 hours
**Status**: ✅ Example template (not implemented)

This is a complete walkthrough of how to use the 7-agent workflow to add a new feature.

---

## Overview

**Goal**: Create a new `/skills` page that displays technical skills in an interactive, visually appealing way (similar to Archive's horizontal scroll concept).

**Why this example?**
- Requires new route (routing practice)
- Needs data structure (data modeling)
- Has animations (Framer Motion practice)
- Integrates with existing nav (integration practice)

---

## Agent Breakdown

### Engineer 1: Component Scaffolding (30 min)

**Goal**: Create basic Skills component and add routing

**Prompt to Claude**:
```markdown
You are Engineer 1 for the Skills Page feature.

**Task**: Create basic Skills.jsx component and set up routing

**Files to create**:
- /src/components/Skills.jsx

**Files to modify**:
- /src/App.jsx (add route)

**Requirements**:
1. Create Skills.jsx with basic structure (copy Hero.jsx pattern)
2. Add route `/skills` in App.jsx
3. Add lazy loading import
4. Use PageWrapper for consistency
5. Add basic "Skills" title

**Acceptance criteria**:
- [ ] Skills.jsx exists with basic JSX
- [ ] Route works (can navigate to /skills)
- [ ] No console errors
- [ ] Matches existing component patterns

**Time limit**: 30 minutes

**Reference files**:
- /src/components/Hero.jsx (component pattern)
- /src/App.jsx:72-162 (routing pattern)
```

**Expected Output**:
- `/src/components/Skills.jsx` created
- Route added to App.jsx
- Component renders with placeholder content

---

### Engineer 2: Core Functionality (30 min)

**Goal**: Implement skills data structure and basic rendering

**Prompt to Claude**:
```markdown
You are Engineer 2 for the Skills Page feature.

**Task**: Create skills data structure and implement rendering logic

**Files to create**:
- /src/data/skills.js

**Files to modify**:
- /src/components/Skills.jsx

**Requirements**:
1. Create skills data structure with categories:
   - Frontend (React, Styled-Components, Framer Motion, etc.)
   - Backend (Node.js, etc.)
   - Tools (Git, Vite, Figma, etc.)
   - 3D/Graphics (Three.js, WebGL, Blender, etc.)

2. Each skill should have:
   - name (string)
   - proficiency (1-5 scale)
   - category (string)
   - icon (optional, path to icon)

3. Import data in Skills.jsx
4. Map over skills and render as grid
5. Group by category

**Acceptance criteria**:
- [ ] skills.js exports data array
- [ ] At least 12 skills across 4 categories
- [ ] Skills render in categorized groups
- [ ] Data structure is clean and extensible

**Time limit**: 30 minutes

**Reference files**:
- /src/data/projectname.jsx (data pattern)
- /src/data/archive.js (data structure)
```

**Expected Output**:
- `/src/data/skills.js` created
- Skills render in basic grid layout
- Organized by category

---

### Engineer 3: Styling & Animations (30 min)

**Goal**: Apply styled-components and add Framer Motion animations

**Prompt to Claude**:
```markdown
You are Engineer 3 for the Skills Page feature.

**Task**: Style Skills page and add animations

**Files to modify**:
- /src/components/Skills.jsx

**Requirements**:
1. Use shared components from sharedStyles.js where possible
2. Create new styled-components for:
   - SkillsGrid (CSS Grid, responsive)
   - SkillCard (glass morphism effect)
   - CategoryHeader
   - ProficiencyBar (visual indicator)

3. Add Framer Motion animations:
   - Fade in on scroll for each category
   - Stagger animation for skill cards
   - Hover effects on cards

4. Color scheme: Match existing theme
   - Primary: rgba(255, 255, 255, 0.7)
   - Accent: rgba(136, 169, 215, 0.47)
   - Glass: backdrop-filter: blur(10px)

5. Responsive:
   - Desktop: 4 columns
   - Tablet: 2 columns
   - Mobile: 1 column

**Acceptance criteria**:
- [ ] Uses sharedStyles.js components (Container2, Title)
- [ ] Smooth scroll animations
- [ ] Hover effects work
- [ ] Responsive on all screen sizes
- [ ] Matches overall site aesthetic

**Time limit**: 30 minutes

**Reference files**:
- /src/components/sharedStyles.js
- /src/components/Archive.jsx (scroll animations)
- /src/theme.js (color palette)
```

**Expected Output**:
- Fully styled Skills page
- Smooth animations
- Responsive layout

---

### Engineer 4: Integration (30 min)

**Goal**: Connect to navigation and polish

**Prompt to Claude**:
```markdown
You are Engineer 4 for the Skills Page feature.

**Task**: Integrate Skills page with site navigation and add finishing touches

**Files to modify**:
- /src/components/Navbar.jsx
- /src/components/Line.jsx
- /src/components/Skills.jsx (polish)

**Requirements**:
1. Add "Skills" link to Navbar.jsx
2. Add Skills page animation state to Line.jsx
   - Choose unique line pattern (different from existing 6 states)
3. Update Skills.jsx:
   - Add metadata (for SEO)
   - Add page title
   - Ensure smooth page transition
4. Test all navigation paths to/from Skills

**Acceptance criteria**:
- [ ] Skills link appears in Navbar
- [ ] Line.jsx has Skills animation state
- [ ] Clicking Skills nav works from all pages
- [ ] Back navigation works
- [ ] Page transitions are smooth
- [ ] No routing errors

**Time limit**: 30 minutes

**Reference files**:
- /src/components/Navbar.jsx:20-40 (nav links)
- /src/components/Line.jsx:20-170 (route animations)
```

**Expected Output**:
- Skills page fully integrated
- Navigation works seamlessly
- Custom Line animation for Skills route

---

### Researcher 1: Performance Analysis (40 min)

**Goal**: Analyze performance impact and optimize

**Prompt to Claude**:
```markdown
You are Researcher 1 for the Skills Page feature.

**Task**: Analyze performance impact and identify optimizations

**Research questions**:
1. What is the bundle size impact?
2. Is lazy loading working correctly?
3. Should images/icons be optimized?
4. Are animations performant (60fps)?
5. Any unnecessary re-renders?

**Tools to use**:
- Bash: `yarn build` (check bundle size)
- Read: Analyze Skills.jsx for performance issues
- Grep: Search for similar patterns in codebase

**Deliverable**: Performance report with findings

**Time limit**: 40 minutes

**Output format**:
# Skills Page Performance Analysis

## Bundle Size Impact
- Before: [size]
- After: [size]
- Change: [+/- KB]

## Findings
- ✅ [Good thing 1]
- ✅ [Good thing 2]
- ⚠️ [Issue 1]
- ⚠️ [Issue 2]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

## Conclusion
[Overall assessment]
```

**Expected Output**:
- Performance report document
- Optimization recommendations
- Bundle size comparison

---

### Researcher 2: Documentation & Patterns (40 min)

**Goal**: Document new patterns and update project docs

**Prompt to Claude**:
```markdown
You are Researcher 2 for the Skills Page feature.

**Task**: Update documentation with new patterns and component details

**Files to modify**:
- /CLAUDE.md (update route count, component count)
- /docs/architecture/COMPONENTS.md (add Skills component)
- /docs/roadmap/ROADMAP.md (mark feature complete)

**Deliverable**: Updated documentation

**Requirements**:
1. Add Skills to component catalog
2. Document skills.js data structure
3. Update route table
4. Add Skills to architecture diagram (text)
5. Create usage example for future reference

**Time limit**: 40 minutes

**Reference files**:
- /CLAUDE.md
- /docs/architecture/COMPONENTS.md
```

**Expected Output**:
- CLAUDE.md updated
- COMPONENTS.md includes Skills
- Usage example documented

---

### QA/Security: Final Verification (60 min)

**Goal**: Ensure feature is production-ready

**Prompt to Claude**:
```markdown
You are the QA/Security Engineer for the Skills Page feature.

**Task**: Comprehensive testing and security review

**Checklist**:
- [ ] Route /skills works correctly
- [ ] Navigation to/from Skills works from all pages
- [ ] Animations are smooth (no jank)
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors or warnings
- [ ] Build succeeds: `yarn build`
- [ ] Bundle size acceptable (< 850KB main bundle)
- [ ] Security: No XSS vulnerabilities in skills data
- [ ] Security: No external script injections
- [ ] Accessibility: Keyboard navigation works
- [ ] Accessibility: Tab order is logical
- [ ] Performance: Page loads in < 2 seconds
- [ ] Cross-browser: Works in Chrome, Firefox, Safari
- [ ] Documentation updated correctly

**Tools**:
- Bash: yarn build, yarn dev
- Browser DevTools
- Read: Review all modified files

**Time limit**: 60 minutes

**Report format**:
# Skills Page QA Report

## ✅ Passed Tests
- [Test 1]
- [Test 2]

## ⚠️ Issues Found
### High Priority
- [Issue 1]

### Medium Priority
- [Issue 2]

### Low Priority
- [Issue 3]

## 🔧 Recommendations
1. [Recommendation 1]

## Final Verdict
- [ ] ✅ Ready for production
- [ ] ⚠️ Needs fixes (list above)
- [ ] ❌ Blocked (critical issues)
```

**Expected Output**:
- Complete QA report
- Security clearance
- Production readiness assessment

---

## Summary Timeline

| Agent | Duration | Cumulative |
|-------|----------|------------|
| Engineer 1 | 30 min | 30 min |
| Engineer 2 | 30 min | 1 hour |
| Engineer 3 | 30 min | 1.5 hours |
| Engineer 4 | 30 min | 2 hours |
| Researcher 1 | 40 min | 2 hours 40 min |
| Researcher 2 | 40 min | 3 hours 20 min |
| QA/Security | 60 min | **4 hours 20 min** |

**Total**: ~4.5 hours for a complete, production-ready feature

---

## Files Created/Modified

### Created
- `/src/components/Skills.jsx` (new page component)
- `/src/data/skills.js` (new data file)

### Modified
- `/src/App.jsx` (added route)
- `/src/components/Navbar.jsx` (added nav link)
- `/src/components/Line.jsx` (added animation state)
- `/CLAUDE.md` (updated counts)
- `/docs/architecture/COMPONENTS.md` (documented Skills)
- `/docs/roadmap/ROADMAP.md` (marked complete)

---

## Key Takeaways

✅ **Separation of concerns**: Each engineer had ONE clear job
✅ **Quality built-in**: Research and QA phases catch issues
✅ **Documentation maintained**: Researcher 2 ensures docs stay current
✅ **Security by default**: QA/Security reviews every feature
✅ **Predictable timing**: 30-60 min chunks, 4.5 hours total

---

## Adapting This Example

**For simpler features** (e.g., color scheme change):
- Use 1-2 engineers
- Skip researchers
- Just do QA
- Total: 1-2 hours

**For complex features** (e.g., CMS integration):
- Add more engineers (5-6)
- Add extra researcher (3 total)
- Extended QA (2 hours)
- Total: 6-8 hours

---

**Next**: Copy this pattern for your own features in `docs/roadmap/ROADMAP.md`
