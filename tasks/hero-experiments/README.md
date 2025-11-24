# Hero Page Experiments - Parallel Task System

**Feature**: Experimental Landing Page Effects
**Created**: 2025-11-24
**Status**: 🟡 Ready to Execute
**Total Waves**: 4
**Total Tasks**: 21
**Estimated Total Time**: 3-4 hours (with parallel execution)

---

## Quick Start

**👉 See [EXECUTE.md](./EXECUTE.md) for copy-paste prompts organized by wave.**

---

## Overview

This task system is designed for **maximum parallel execution**. Each wave contains 5-6 independent tasks that can run simultaneously.

---

## Wave Structure

| Wave | Focus | Tasks | Parallel? | Dependencies |
|------|-------|-------|-----------|--------------|
| **Wave 0** | Infrastructure | 6 tasks | ✅ Yes | None |
| **Wave 1** | Shader Implementation | 5 tasks | ✅ Yes | Wave 0 complete |
| **Wave 2** | Integration & Polish | 5 tasks | ✅ Yes | Wave 1 complete |
| **Wave 3** | Research & QA | 5 tasks | ✅ Yes | Wave 2 complete |

---

## Quick Execution Guide

### Wave 0: Infrastructure (Run All 6 in Parallel)
```
Copy and run these 6 prompts simultaneously:
├── W0-T1-base-shader-template.md
├── W0-T2-directory-structure.md
├── W0-T3-app-routes.md
├── W0-T4-experiment-nav.md
├── W0-T5-shared-utilities.md
└── W0-T6-vertex-shader.md
```

### Wave 1: Shaders (Run All 5 in Parallel)
```
After Wave 0 completes, run these 5 simultaneously:
├── W1-T1-aurora-shader.md
├── W1-T2-fog-shader.md
├── W1-T3-bloom-shader.md
├── W1-T4-liquid-shader.md
└── W1-T5-waves-shader.md
```

### Wave 2: Integration (Run All 5 in Parallel)
```
After Wave 1 completes, run these 5 simultaneously:
├── W2-T1-experiment-pages.md
├── W2-T2-preview-thumbnails.md
├── W2-T3-controls-overlay.md
├── W2-T4-hero-integration.md
└── W2-T5-mobile-fallback.md
```

### Wave 3: Research & QA (Run All 5 in Parallel)
```
After Wave 2 completes, run these 5 simultaneously:
├── W3-T1-performance-analysis.md
├── W3-T2-documentation-update.md
├── W3-T3-browser-testing.md
├── W3-T4-accessibility-check.md
└── W3-T5-final-qa.md
```

---

## File Reference Map

Tasks reference these existing files:

| Reference | Path | Purpose |
|-----------|------|---------|
| Current Shader | `src/components/ShaderVisual.jsx` | Base implementation reference |
| Fragment Shader | `src/shaders/truchet.frag.glsl` | GLSL patterns reference |
| Vertex Shader | `src/shaders/truchet.vert.glsl` | Pass-through vertex shader |
| App Routes | `src/App.jsx` | Route configuration |
| Theme Context | `src/context/ThemeContext.jsx` | Theme integration |
| Shader Philosophy | `docs/design/SHADER_PHILOSOPHY.md` | Design principles |
| Roadmap | `docs/roadmap/ROADMAP.md` | Progress tracking |

---

## Success Criteria (Final)

After all waves complete:

- [ ] 5 distinct experimental shaders working
- [ ] Navigation between experiments functional
- [ ] All experiments lazy-loaded
- [ ] 60fps on modern desktop
- [ ] Theme-aware (dark/light)
- [ ] Mouse interaction on all variants
- [ ] Performance analysis complete
- [ ] Documentation updated
- [ ] QA verification passed
- [ ] Ready to select winner

---

## Troubleshooting

**Shader not rendering?**
→ Check WebGL context creation in browser console

**Route not found?**
→ Verify lazy import path in App.jsx

**Performance issues?**
→ Check animation loop is using requestAnimationFrame

**Theme not applying?**
→ Ensure ThemeContext is imported and used

---

## Next Steps After Completion

1. Review all 5 experiments at `/experiments`
2. Compare side-by-side
3. Select winner (or combine elements)
4. Integrate into production Hero page
5. Archive task files to `/tasks/archive/hero-experiments/`

---

**Execute Wave 0 first, then proceed to each subsequent wave after completion.**
