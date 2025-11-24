# W0-T2: Create Directory Structure

**Wave**: 0 (Infrastructure)
**Task**: 2 of 6
**Agent**: Engineer
**Time Estimate**: 5 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (no dependencies)

---

## Prompt (Copy & Paste)

```
I need you to create the directory structure for experimental hero page shaders.

## Task
Create the following empty directory structure and placeholder files:

## Directories to Create
```
src/components/experiments/
├── v1/           # Aurora shader
├── v2/           # Fog shader
├── v3/           # Bloom shader
├── v4/           # Liquid shader
└── v5/           # Waves shader
```

## Placeholder Files to Create
Create these placeholder files with minimal content so other tasks can reference them:

1. `/src/components/experiments/v1/index.jsx`
   Content: `// Aurora experiment - placeholder`

2. `/src/components/experiments/v2/index.jsx`
   Content: `// Fog experiment - placeholder`

3. `/src/components/experiments/v3/index.jsx`
   Content: `// Bloom experiment - placeholder`

4. `/src/components/experiments/v4/index.jsx`
   Content: `// Liquid experiment - placeholder`

5. `/src/components/experiments/v5/index.jsx`
   Content: `// Waves experiment - placeholder`

## Method
Use the Bash tool to create directories:
```bash
mkdir -p src/components/experiments/v1 src/components/experiments/v2 src/components/experiments/v3 src/components/experiments/v4 src/components/experiments/v5
```

Then use Write tool to create each placeholder file.

## Acceptance Criteria
- [ ] All 5 version directories exist
- [ ] Each directory has an index.jsx placeholder
- [ ] No errors when navigating to directories

Do NOT implement actual shader logic. Only create structure and placeholders.
```

---

## Directories to Create

```
src/components/experiments/
├── v1/
├── v2/
├── v3/
├── v4/
└── v5/
```

---

## Files to Create

| Path | Content |
|------|---------|
| `src/components/experiments/v1/index.jsx` | `// Aurora experiment - placeholder` |
| `src/components/experiments/v2/index.jsx` | `// Fog experiment - placeholder` |
| `src/components/experiments/v3/index.jsx` | `// Bloom experiment - placeholder` |
| `src/components/experiments/v4/index.jsx` | `// Liquid experiment - placeholder` |
| `src/components/experiments/v5/index.jsx` | `// Waves experiment - placeholder` |

---

## Acceptance Criteria

- [ ] 5 directories created under experiments/
- [ ] 5 placeholder index.jsx files created
- [ ] Structure matches specification

---

## Completion Checklist

- [ ] Directories created
- [ ] Placeholder files created
- [ ] No errors
