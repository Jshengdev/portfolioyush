# Development Workflow Guide

**Version**: 1.0
**Last Updated**: 2025-11-21
**Purpose**: Structured workflow for AI-assisted development

---

## Workflow Overview

Your development workflow follows a **7-agent pattern** for each feature:

```
Feature → [4 Engineers] → [2 Researchers] → [1 QA/Security] → Done
```

### Agent Responsibilities

| Agent Type | Count | Role | Time Estimate |
|------------|-------|------|---------------|
| **Engineer** | 4 | Simple, individual implementation steps | 15-30 min each |
| **Researcher** | 2 | Investigation, analysis, documentation | 20-40 min each |
| **QA/Security** | 1 | Verification, testing, security audit | 30-60 min |

---

## Workflow Phases

### Phase 1: Engineering (Steps 1-4)
Each engineer handles ONE isolated task:

**Engineer 1**: Component scaffolding
- Create file structure
- Set up basic component
- Add routing (if needed)

**Engineer 2**: Core functionality
- Implement main feature logic
- Add state management
- Connect data sources

**Engineer 3**: Styling & UX
- Apply styled-components
- Add animations (Framer Motion)
- Responsive design

**Engineer 4**: Integration
- Connect to existing components
- Add navigation links
- Update shared data files

### Phase 2: Research (Steps 5-6)

**Researcher 1**: Performance Analysis
- Bundle size impact
- Lazy loading opportunities
- Asset optimization needs

**Researcher 2**: Documentation & Patterns
- Update CLAUDE.md
- Document new patterns
- Create usage examples

### Phase 3: QA & Security (Step 7)

**QA/Security Engineer**:
- Test all routes and interactions
- Check for security vulnerabilities
- Verify accessibility (a11y)
- Build and deploy verification
- Performance regression testing

---

## Prompt Templates

### For Engineer Agents

```markdown
## Engineer [1-4]: [Task Name]

**Goal**: [Single, specific outcome]

**Files to modify**:
- [File path 1]
- [File path 2]

**Requirements**:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

**Acceptance criteria**:
- [ ] [Criteria 1]
- [ ] [Criteria 2]

**Time limit**: 30 minutes
**Dependencies**: [Previous engineer steps, if any]

**Reference files**:
- [Example file to follow pattern from]
```

### For Researcher Agents

```markdown
## Researcher [1-2]: [Research Topic]

**Goal**: Investigate and document [specific aspect]

**Research questions**:
1. [Question 1]
2. [Question 2]

**Deliverable**: Markdown report with findings

**Tools to use**:
- Grep (search codebase)
- Read (analyze files)
- WebSearch (if external research needed)

**Time limit**: 40 minutes

**Output format**:
- Summary (3-5 bullet points)
- Detailed findings
- Recommendations
```

### For QA/Security Agent

```markdown
## QA/Security: Final Verification

**Goal**: Ensure feature is production-ready and secure

**Checklist**:
- [ ] All routes work correctly
- [ ] No console errors
- [ ] Build succeeds (`yarn build`)
- [ ] Security: No XSS vulnerabilities
- [ ] Security: No command injection risks
- [ ] Performance: Bundle size acceptable
- [ ] Accessibility: Keyboard navigation works
- [ ] Responsive: Works on mobile/tablet/desktop
- [ ] Documentation updated

**Time limit**: 60 minutes

**Report format**:
- ✅ Passed tests
- ⚠️ Issues found (with severity)
- 🔧 Recommendations
```

---

## How to Use This Workflow

### Step 1: Create a Roadmap Item

Go to `docs/roadmap/ROADMAP.md` and add your feature:

```markdown
### Feature: [Name]
**Status**: Planning
**Priority**: High/Medium/Low
**Estimated Time**: [Total hours]

**Description**: [What you want to build]

**Workflow**:
- [ ] Engineer 1: [Task]
- [ ] Engineer 2: [Task]
- [ ] Engineer 3: [Task]
- [ ] Engineer 4: [Task]
- [ ] Researcher 1: [Topic]
- [ ] Researcher 2: [Topic]
- [ ] QA/Security: Verification
```

### Step 2: Run Each Agent Sequentially

Copy the prompt template, fill in specifics, and give to Claude:

```
You are Engineer 1 for the [Feature Name] feature.

[Paste filled-out Engineer 1 template]

Follow the workflow strictly. Only complete YOUR step.
```

### Step 3: Track Progress

Update the roadmap checklist as each agent completes their step.

### Step 4: Review & Deploy

After QA/Security passes, merge and deploy:

```bash
git add .
git commit -m "feat: [Feature Name]"
git push
yarn deploy
```

---

## Example: Adding a New "Skills" Page

See `docs/roadmap/examples/SKILLS_PAGE_EXAMPLE.md` for a complete walkthrough.

---

## Benefits of This Workflow

✅ **Clear separation of concerns** - Each agent has ONE job
✅ **Predictable time estimates** - 30 min chunks
✅ **Quality assurance built-in** - Research + QA phases
✅ **Security by default** - Security check on every feature
✅ **Documentation always updated** - Researcher 2 handles it
✅ **No scope creep** - Engineers follow strict templates

---

## Customization

Adjust agent counts based on feature complexity:

**Simple feature** (e.g., color change):
- 1 Engineer + 1 QA = 2 agents

**Medium feature** (e.g., new page):
- 2 Engineers + 1 Researcher + 1 QA = 4 agents

**Complex feature** (e.g., 3D integration):
- 4 Engineers + 2 Researchers + 1 QA = 7 agents

---

## See Also

- [Roadmap](../roadmap/ROADMAP.md) - Current features in development
- [Examples](../roadmap/examples/) - Reference implementations
- [CLAUDE.md](../../CLAUDE.md) - Project overview

---

**Next**: Create your first roadmap item in `docs/roadmap/ROADMAP.md`
