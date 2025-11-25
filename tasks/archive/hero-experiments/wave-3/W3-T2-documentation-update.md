# W3-T2: Documentation Update

**Wave**: 3 (Research & QA)
**Task**: 2 of 5
**Agent**: Researcher
**Time Estimate**: 30 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 2)
**Dependencies**: Wave 2 complete

---

## Prompt (Copy & Paste)

```
I need you to update all documentation to reflect the new experimental shaders feature.

## Task
Update CLAUDE.md, COMPONENTS.md, and roadmap to include the experimental shaders system.

## Files to Update

### 1. CLAUDE.md Updates

Read `/Users/johnnysheng/Documents/GitHub/portfolioyush/CLAUDE.md` and update:

a) **Key Statistics table** (near top):
- Update component count (add 7-8 new components)
- Update route count (add 6 new routes)

b) **Routes table** (in Architecture section):
Add new routes:
| `/experiments` | ExperimentNav | Experiment gallery |
| `/experiments/v1` | AuroraExperiment | Aurora shader |
| `/experiments/v2` | FogExperiment | Fog shader |
| `/experiments/v3` | BloomExperiment | Bloom shader |
| `/experiments/v4` | LiquidExperiment | Liquid shader |
| `/experiments/v5` | WavesExperiment | Waves shader |

c) **Project Structure** (update tree):
Add experiments directory to tree

d) **File Locations table**:
Add new file locations for experiments

### 2. COMPONENTS.md Updates

Read `/Users/johnnysheng/Documents/GitHub/portfolioyush/docs/architecture/COMPONENTS.md` and add:

**New section: Experimental Components**

```markdown
## Experimental Shader Components

### BaseExperimentShader
- **File**: `/src/components/experiments/BaseExperimentShader.jsx`
- **Purpose**: Reusable Three.js shader template for experiments
- **Props**: fragmentShader, title, customUniforms
- **State**: Manages Three.js scene, renderer, uniforms
- **Dependencies**: Three.js, ThemeContext

### ExperimentNav
- **File**: `/src/components/experiments/ExperimentNav.jsx`
- **Purpose**: Navigation grid for browsing experiments
- **Props**: None
- **State**: None (stateless navigation)
- **Dependencies**: React Router Link

### Experiment Pages (V1-V5)
- **Files**: `/src/components/experiments/v[1-5]/index.jsx`
- **Purpose**: Individual experiment page wrappers
- **Pattern**: Each imports shader + BaseExperimentShader
- **Shaders**:
  - V1: Aurora (aurora.frag.glsl)
  - V2: Fog (fog.frag.glsl)
  - V3: Bloom (bloom.frag.glsl)
  - V4: Liquid (liquid.frag.glsl)
  - V5: Waves (waves.frag.glsl)
```

### 3. Roadmap Update

Read `/Users/johnnysheng/Documents/GitHub/portfolioyush/docs/roadmap/ROADMAP.md` and:

a) Mark "Hero Page Experimental Effects" as complete (or in progress)
b) Update workflow checklist
c) Move to completed section when appropriate

### 4. Create/Update Shader Docs

Create or update `/docs/experiments/SHADER_EFFECTS.md` with:
- Description of each shader effect
- Technical implementation notes
- Parameter documentation
- Usage examples

## Report

After updates, create brief summary of changes:

```markdown
# Documentation Update Summary

**Date**: [Date]
**Updated by**: Researcher 2

## Files Modified
- ✅ CLAUDE.md - Statistics, routes, file locations
- ✅ docs/architecture/COMPONENTS.md - New experimental components section
- ✅ docs/roadmap/ROADMAP.md - Feature progress update
- ✅ docs/experiments/SHADER_EFFECTS.md - Created/updated

## Statistics Changes
- Components: [old] → [new]
- Routes: [old] → [new]
- New files documented: [count]

## New Patterns Documented
- BaseExperimentShader pattern
- Shader experiment architecture
- Touch event handling pattern
```

## Acceptance Criteria
- [ ] CLAUDE.md statistics updated
- [ ] New routes documented
- [ ] COMPONENTS.md has experimental section
- [ ] Roadmap reflects current status
- [ ] Shader effects documented
```

---

## Files to Update

| File | Updates |
|------|---------|
| `CLAUDE.md` | Stats, routes, file locations |
| `docs/architecture/COMPONENTS.md` | New components section |
| `docs/roadmap/ROADMAP.md` | Feature status |
| `docs/experiments/SHADER_EFFECTS.md` | Create/update |

---

## Documentation Checklist

- [ ] Component count updated
- [ ] Route count updated
- [ ] New routes listed
- [ ] Experimental components documented
- [ ] Roadmap updated
- [ ] Shader effects documented

---

## Completion Checklist

- [ ] All files updated
- [ ] Statistics accurate
- [ ] No broken links
