# Researcher 2: Documentation & Design Philosophy

**Status**: ⏳ Not Started  
**Estimated Time**: 40 minutes  
**Dependencies**: Researcher 1 complete  
**Output**: Updated docs + design philosophy

---

## 🎯 Goal

Document the new shader system, explain research connections, update all relevant docs.

---

## 📋 Tasks

### 1. Update CLAUDE.md (10 min)

Add shader personality system to features:

```markdown
### Shader Visual System
- **Route-Reactive Personalities**: Each route has unique visual character
- **Harmonic Motion**: John Whitney-inspired non-repeating animation
- **Cursor Light Trails**: Gmunk-inspired interactive light sculpting
- **Multi-Layer Depth**: SANAA-inspired dimensional perception
- **Theme-Responsive**: Adapts to dark/light modes
```

---

### 2. Update COMPONENTS.md (10 min)

Add detailed ShaderVisual.jsx documentation:

```markdown
## ShaderVisual.jsx

**Purpose**: WebGL procedural background with route-reactive personalities

**State Management**:
- useContext(ThemeContext) - Dark/light mode
- useLocation() - Route detection
- useRef(trailBuffer) - Cursor trail buffer

**Shader Uniforms** (15 total):
- u_time, u_resolution, u_mouse (standard)
- u_backgroundColor (theme)
- u_complexity, u_energy, u_focus, u_warmth, u_depth (personality)
- u_trailCount, u_trailPositions, u_trailStrengths (cursor)

**Route Personalities**:
[Copy from Engineer 1 config]
```

---

### 3. Create Design Philosophy Doc (15 min)

Create `docs/design/SHADER_PHILOSOPHY.md`:

```markdown
# Shader Visual System - Design Philosophy

## Research Foundation

### Saul Bass - Emotional Priming
Geometric abstraction encodes emotion before conscious processing.

**Application**: Route personalities prime emotional state.

### Gmunk - Light as Sculpture
Projection mapping creates interactive light deposits.

**Application**: Cursor trails sculpt light in shader space.

### ManvsMachine - Procedural Attributes
Semantic parameters scale systems elegantly.

**Application**: 5 attributes (complexity/energy/focus/warmth/depth).

[Etc. for each research source]

## Technical Decisions

**Why harmonic motion?**
John Whitney proved sine combinations = infinite variation.

**Why 3 layers?**
SANAA: "Glass becomes opaque through accumulation."

[Etc.]
```

---

### 4. Add Code Comments (5 min)

Review all shader code for inline documentation quality.

---

## ✅ Success Criteria

- [x] CLAUDE.md updated with shader features
- [x] COMPONENTS.md has ShaderVisual details
- [x] Design philosophy documented
- [x] Research connections explained
- [x] Code comments clear and complete

---

**Status**: ⏳ → ✅  
**Docs Updated**: (list files)
