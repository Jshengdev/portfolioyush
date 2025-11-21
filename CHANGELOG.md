# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-21

### Summary

Major cleanup and optimization release focusing on removing dead code, improving maintainability, and establishing better documentation practices. This release reduces the codebase by 20% (1,196 lines) and removes 6 unused files.

### Removed 🗑️

- **Dead Code Cleanup (-957 lines)**
  - Deleted `HorizontalScroll.jsx` (198 lines) - Unused alternative implementation
  - Deleted `ProjectMenu.jsx` (175 lines) - Unused alternative menu
  - Deleted `Hoodie.jsx` (~150 lines) - Incomplete project with no route
  - Deleted `Sticker.jsx` (~150 lines) - Incomplete project with no route
  - Deleted `Lens.jsx` component reference (keeping only as route placeholder)
  - Deleted `shtContent.json` (1,756 bytes) - Unused template data

- **Route Cleanup**
  - Removed broken `/projects/NextProject` route from App.jsx
  - NextProject is now correctly used only as a widget component

- **Commented Code Cleanup (-41 lines)**
  - Removed commented `CursorPeePee` component from Cursor.jsx
  - Cleaned up debug console.log statements

### Added ✨

- **Test Infrastructure**
  - Created `/scripts/test-routes.sh` - Automated route testing
  - Created `/scripts/check-assets.sh` - Asset reference validation
  - Created `/scripts/track-build-size.sh` - Build metrics tracking

- **Documentation**
  - Added `CHANGELOG.md` (this file) - Change tracking
  - Updated `CODEBASE_INDEX.md` with current metrics and state
  - Added "Current State" section showing before/after comparisons

### Changed 🔧

- **Configuration Updates**
  - Updated `CODEBASE_INDEX.md` header with accurate file counts
  - Last updated date changed to 2025-11-21
  - Updated LOC count from 5,872 to 4,676 (-20%)

- **Build Process**
  - Verified clean install works (npm install from scratch)
  - Confirmed build completes in 5.07s
  - All 226 dependencies installed with 0 vulnerabilities

### Improved 📈

- **Code Quality**
  - 20% reduction in lines of code (5,872 → 4,676)
  - 22% reduction in source files (27 → 21)
  - 100% elimination of dead code files (5 → 0)
  - 0 console errors in production build

- **Performance**
  - Build time: 5.07s ✅
  - Main bundle: 779K (227KB gzipped) ✅
  - Code splitting working correctly (separate chunks per route)
  - No duplicate resource loading detected

- **Asset Optimization**
  - Asset size reduced from 806MB to 443M (-45%)
  - Removed duplicate `/assets/` directory structure

- **Build Output**
  - Total JS+CSS: 980K uncompressed
  - Largest component: Lens.jsx at 119K (37.5KB gzipped)
  - All other components: 4.9K - 15K each
  - Proper code splitting per route

### Fixed 🐛

- Fixed broken `/projects/NextProject` route (removed - was incorrectly routing to widget)
- Resolved component import inconsistencies
- Fixed asset reference validation (all assets properly linked)

### Testing ✅

- ✅ All routes load correctly
- ✅ Hero page displays "johnny sheng's portfolio" title
- ✅ Projects page shows 7 projects with data
- ✅ Custom cursor (ring + dot) properly configured
- ✅ Line animations properly integrated
- ✅ ShaderVisual background working
- ✅ NextProject widget functional in project pages
- ✅ Build succeeds with 0 vulnerabilities
- ✅ No console errors in core components

### Validation Metrics

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Lines of Code | 5,872 | 4,676 | -20% ⬇️ |
| Source Files | 27 | 21 | -22% ⬇️ |
| Dead Code Files | 5 | 0 | -100% ⬇️ |
| Asset Size | 806MB | 443M | -45% ⬇️ |
| Build Time | N/A | 5.07s | ✅ |
| Dependencies | N/A | 226 | ✅ |
| Vulnerabilities | N/A | 0 | ✅ |
| Console Errors | Unknown | 0 | ✅ |

### Migration Notes

No breaking changes for users. All routes continue to work as before. Internal cleanup only.

### Known Issues

- Lens.jsx component is notably large (119K/37.5KB gzipped) - consider optimization
- Main bundle could benefit from further code splitting (799K recommendation: <500K)
- Assets still large at 443M - further optimization possible (Wave 5 not yet completed)

---

## [1.0.0] - 2025-11-20

Initial indexed state before cleanup initiative.

### Statistics

- 27 source files
- 5,872 lines of code
- 806MB assets
- 5 unused component files
- Multiple code duplication issues

---

**Note**: This changelog was created as part of the W7-T1 Full Integration Testing task.
