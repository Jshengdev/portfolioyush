---
title: Known Issues and Technical Debt
description: Current bugs, technical debt items, and cleanup priorities with severity levels and recommended fixes
keywords: bugs, issues, technical debt, cleanup, fixes, todo, priorities
---

# Known Issues and Technical Debt

Live tracker of current issues, technical debt, and cleanup priorities.

**Last Updated**: 2025-11-21 (Post-Wave 7 Optimization)

---

## Status Summary

| Category | Count | Status |
|----------|-------|--------|
| **Critical** (Breaks functionality) | 0 | ✅ All fixed |
| **High Priority** (Code quality) | 2 | ⚠️ Remaining |
| **Medium Priority** (Improvements) | 4 | ⚠️ Optional |
| **Low Priority** (Nice to have) | 8 | ℹ️ Future |

**Health Score**: 9.5/10

---

## High Priority (Remaining)

### 1. Remove Broken Route: /projects/NextProject

**Severity**: High
**Status**: ⚠️ Not fixed yet
**Impact**: Route leads nowhere, NextProject is a widget not a page

**Location**: `/src/App.jsx:158-162`

**Issue**:
```javascript
<Route path="/projects/NextProject"
  element={
    <PageWrapper>
      <NextProject />
    </PageWrapper>
  }
/>
```

**Fix**:
Delete lines 158-162 from App.jsx

**Reason**: NextProject is a reusable widget component embedded in project pages, not a standalone page route.

**Estimated Time**: 2 minutes

---

### 2. Handle "Website Dev" Project (ID: 6)

**Severity**: High
**Status**: ⚠️ Incomplete
**Impact**: Project data exists but no component created

**Location**: `/src/data/projectname.jsx` (lines 47-52)

**Issue**:
```javascript
{
  id: 6,
  title: "Website Dev",
  description: "WIP",
  image: "/assets/WD/WD-landing.png"
}
```

**Options**:
1. **Create component**: Add `/src/components/Projectfiles/WebsiteDev.jsx`
2. **Remove from data**: Delete lines 47-52 (Recommended - marked as "WIP")

**Recommended Fix**: Remove from data
```javascript
// Delete this entry from projectParty array
```

**Estimated Time**: 5 minutes

---

## Medium Priority (Improvements)

### 3. Update .gitignore

**Severity**: Medium
**Status**: ⚠️ Missing entries
**Impact**: Unnecessary files committed to repo

**Location**: `/.gitignore`

**Missing Entries**:
```gitignore
# Vite timestamp files
vite.config.js.timestamp-*

# Claude Code settings (optional)
.claude/
```

**Current Issue**: 2 timestamp files currently committed:
- `vite.config.js.timestamp-1732058400000-c5cecd13eb2ad.mjs`
- `vite.config.js.timestamp-1732141200000-1ca6d9bf36c29.mjs`

**Fix**:
1. Add lines to `.gitignore`
2. Remove tracked files: `git rm --cached vite.config.js.timestamp-*`
3. Commit changes

**Estimated Time**: 5 minutes

---

### 4. Add Error Boundary

**Severity**: Medium
**Status**: ⚠️ Not implemented
**Impact**: App could crash without fallback UI

**Location**: New file `/src/components/ErrorBoundary.jsx`

**Implementation**:
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>Please <a href="/">return to home</a></p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Usage** (in `main.jsx`):
```javascript
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Estimated Time**: 30 minutes

---

### 5. Add 404 Page

**Severity**: Medium
**Status**: ⚠️ Not implemented
**Impact**: Undefined routes show blank page

**Location**: New file `/src/components/NotFound.jsx`

**Implementation**:
```javascript
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: rgba(255, 255, 255, 0.7);
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </Container>
  );
}

export default NotFound;
```

**Add Route** (in `App.jsx`):
```javascript
<Route path="*" element={<NotFound />} />
```

**Estimated Time**: 30 minutes

---

### 6. Image Lazy Loading

**Severity**: Medium
**Status**: ⚠️ Not implemented
**Impact**: Slower initial page load, unnecessary data usage

**Affected Files**: All components with images (15+ files)

**Current**:
```javascript
<img src="/assets/image.png" alt="Description" />
```

**Should be**:
```javascript
<img src="/assets/image.png" alt="Description" loading="lazy" />
```

**Implementation Strategy**:
1. Add `loading="lazy"` to all `<img>` tags except above-the-fold images
2. Priority files: Archive.jsx (17 images), project detail pages

**Estimated Time**: 1 hour (find and replace)

---

## Low Priority (Future Enhancements)

### 7. Asset Optimization

**Severity**: Low
**Status**: ℹ️ Partially optimized
**Impact**: Large asset size (443MB)

**Current Stats**:
- Total: 443MB
- CM/ directory: 278MB (61%)
- C/ directory: 65MB (14%)
- AP/ directory: 54MB (12%)

**Optimization Targets**:
1. **Compress large GIFs**:
   - `AP-BTSsample2.gif`: 19.8MB → Target < 5MB
   - `AP-sample1.gif`: 13.7MB → Target < 5MB

2. **Resize oversized PNGs**:
   - Many are 4000px+ wide → Max 1920px

3. **Convert to WebP**:
   - Better compression than PNG/JPG
   - Already implemented for `Subject 2` and `microw`

**Tools**:
- TinyPNG, ImageOptim (PNGs)
- ezgif.com, gifsicle (GIFs)
- cwebp (WebP conversion)

**Goal**: Reduce from 443MB → < 200MB

**Estimated Time**: 2-3 hours

---

### 8. CSS Variables Issue

**Severity**: Low
**Status**: ℹ️ Falls back to inline styles
**Impact**: Inconsistent styling (works but not ideal)

**Location**: `/src/components/sharedStyles.js`

**Issue**: References undefined CSS custom properties:
```javascript
color: var(--paragraph-color);      // Undefined
font-family: var(--font-heading);   // Undefined
font-family: var(--font-body);      // Undefined
```

**Current Behavior**: Falls back to inline styled-components values

**Fix Option 1**: Define in App.css (Recommended)
```css
/* Add to src/App.css */
:root {
  --font-heading: 'Ade Display', 'Playfair Display', serif;
  --font-body: 'Work Sans', sans-serif;
  --paragraph-color: rgba(255, 255, 255, 0.7);
}
```

**Fix Option 2**: Remove var() references
Replace with direct values in sharedStyles.js

**Estimated Time**: 15 minutes

---

### 9. Responsive Design Gaps

**Severity**: Low
**Status**: ℹ️ Partial coverage
**Impact**: Some components may break on mobile

**Issues**:
- Archive.jsx: Horizontal scroll may not work on touch
- Fixed positioning elements: May overlap on small screens
- ShaderVisual: May be too heavy for mobile devices

**Needs Mobile Testing**:
- [ ] Archive page (< 768px)
- [ ] Projects page (< 480px)
- [ ] Navigation (< 768px)
- [ ] Shader performance on mobile

**Estimated Time**: 4-5 hours

---

### 10. Accessibility (a11y)

**Severity**: Low
**Status**: ℹ️ Basic compliance
**Impact**: Not fully accessible to screen readers/keyboard users

**Missing**:
- Focus styles for keyboard navigation
- ARIA labels on interactive elements
- Skip links ("Skip to main content")
- Color contrast (some text may not meet WCAG AA)

**Tools to Use**:
- axe DevTools
- WAVE browser extension
- Lighthouse accessibility audit

**Estimated Time**: 4-5 hours

---

### 11. Performance Monitoring

**Severity**: Low
**Status**: ℹ️ Not implemented
**Impact**: No visibility into performance issues

**ShaderVisual Issues**:
- Runs at 60fps continuously (even when tab hidden)
- No device detection (mobile may lag)
- No FPS counter or performance fallback

**Recommended Additions**:
1. Tab visibility detection (pause when hidden)
2. Device/GPU detection (disable on low-end devices)
3. FPS monitoring (auto-disable if < 30fps)

**Estimated Time**: 3-4 hours

---

### 12. SEO Optimization

**Severity**: Low
**Status**: ℹ️ Basic meta tags added (Wave 4)
**Impact**: Could improve search ranking and social sharing

**Current**: Basic Open Graph and Twitter card meta tags

**Missing**:
- Custom favicon (still using Vite default)
- Sitemap.xml
- robots.txt
- Schema.org markup

**Implementation**:
1. Create favicons (16x16, 32x32, apple-touch-icon)
2. Generate sitemap.xml
3. Add robots.txt
4. Update meta descriptions

**Estimated Time**: 2-3 hours

---

### 13. Testing Infrastructure

**Severity**: Low
**Status**: ℹ️ Not implemented
**Impact**: Manual testing only

**Missing**:
- Unit tests (Vitest)
- Component tests (Testing Library)
- E2E tests (Playwright)
- CI/CD pipeline (GitHub Actions)

**Estimated Time**: 1-2 weeks

---

### 14. Code Splitting Optimization

**Severity**: Low
**Status**: ✅ Implemented (Wave 6) but could improve
**Impact**: Already optimized (15 chunks)

**Current**: All routes lazy-loaded with React.lazy()

**Potential Improvements**:
- Split large components (Lens.jsx is 121KB)
- Preload next route on hover
- Service worker for offline support

**Estimated Time**: 1-2 days

---

## Fixed Issues (Completed in Waves 1-7)

### ✅ Cleanup & Removal (Wave 1)
- Deleted duplicate `/assets/` directory (-351MB)
- Removed HorizontalScroll.jsx (-198 lines)
- Removed ProjectMenu.jsx (-175 lines)
- Removed Hoodie.jsx & Sticker.jsx (-524 lines)
- Removed shtContent.json & debug code (-68 lines)
- Removed Babel dependencies (-4 packages)

### ✅ Configuration (Wave 2)
- Fixed deploy script (build → dist)
- Created theme system (src/theme.js)
- Verified homepage URL

### ✅ Consolidation (Wave 3)
- Consolidated Container component (-9 duplicates)
- Consolidated Title component (-8 duplicates)
- Centralized Archive data (src/data/archive.js)
- Optimized Cursor animation (RAF)

### ✅ Documentation (Wave 4)
- Created README.md (652 lines)
- Added JSDoc comments
- Updated meta tags
- Created ARCHITECTURE.md (495 lines)

### ✅ Asset Optimization (Wave 5)
- Optimized Subject 2.png (7.7MB → 833KB)
- Optimized microw.png (5.7MB → 597KB)
- Created WebP versions
- Consolidated font loading

### ✅ Advanced Optimization (Wave 6)
- Implemented lazy loading (-20% bundle size)
- Simplified Line.jsx (390 → 184 lines)
- Extracted shaders to .glsl files

### ✅ Integration (Wave 7)
- Build verification
- Route testing
- Documentation updates
- Full integration testing

---

## Priority Recommendation

**Quick wins** (< 30 minutes):
1. Remove /projects/NextProject route (2 min)
2. Remove "Website Dev" from data (5 min)
3. Update .gitignore (5 min)

**High impact** (1-2 hours):
4. Add Error Boundary (30 min)
5. Add 404 page (30 min)
6. Add lazy loading to images (1 hour)

**Future enhancements** (2+ hours):
7. Asset optimization (2-3 hours)
8. Responsive design testing (4-5 hours)
9. Accessibility improvements (4-5 hours)
10. Performance monitoring (3-4 hours)

---

## See Also

- [Quick Start Guide](../guides/QUICK_START.md) - Setup instructions
- [Troubleshooting Guide](../guides/TROUBLESHOOTING.md) - Common issues
- [File Locations](FILE_LOCATIONS.md) - Where to find files
- [Wave Verification](../../WAVE_VERIFICATION.md) - Optimization history

---

**For AI Assistants**: This is a live document. Update as issues are resolved or new ones discovered. Include severity, location, fix instructions, and estimated time for each issue.
