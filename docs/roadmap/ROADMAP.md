# Portfolio Development Roadmap

**Version**: 1.1
**Last Updated**: 2025-11-24
**Project**: Johnny Sheng's Portfolio Website

---

## Active Features (In Development)

### Feature: Hero Page Experimental Effects
**Status**: 🟡 Planning
**Priority**: High
**Estimated Time**: 4-5 hours (7 agents × 40 min avg)
**Started**: 2025-11-24
**Target Completion**: TBD

**Description**:
Create experimental landing page prototypes with ambient/atmospheric light effects. Build 5 shader variations accessible via separate routes (`/experiments/v1` through `/experiments/v5`) for easy comparison and selection.

**Concepts**:
1. V1: Aurora Borealis - flowing color bands
2. V2: Fog/Mist - layered translucent clouds
3. V3: Light Bloom - soft drifting glows
4. V4: Liquid Light - organic metaball blobs
5. V5: Gradient Waves - subtle horizontal waves

**Workflow Progress**:
- [ ] Engineer 1: Create infrastructure (directory structure, base shader template, routes)
- [ ] Engineer 2: Implement V1 (Aurora) + test mouse interaction
- [ ] Engineer 3: Implement V2 (Fog) + V3 (Bloom) shaders
- [ ] Engineer 4: Implement V4 (Liquid) + V5 (Waves) + navigation component
- [ ] Researcher 1: Performance analysis of all variants
- [ ] Researcher 2: Documentation update (this file done, CLAUDE.md pending)
- [ ] QA/Security: Test all variants, device compatibility, select winner

**Documentation**:
- [Hero Experiments Plan](../experiments/HERO_EXPERIMENTS_PLAN.md) - Full technical spec

**Notes**:
- User preference: Ambient/Atmospheric direction (soft glows, gradients, subtle movements)
- Architecture: Separate routes for easy A/B comparison
- Each experiment lazy-loaded to avoid bundle bloat
- Selection will replace or augment current Hero shader

---

## Backlog (Planned Features)

### Example Ideas

#### 1. Skills/Technologies Page
**Priority**: Medium
**Effort**: Medium (4 engineers + 2 researchers + 1 QA)

**Description**:
Add a new page showcasing technical skills with interactive visualizations (similar to Archive page's horizontal scroll, but for tech stack categories).

**Workflow**:
- Engineer 1: Create Skills.jsx component + route
- Engineer 2: Implement skill categories data structure
- Engineer 3: Add interactive animations (hover effects, scroll)
- Engineer 4: Integrate with navigation + styling
- Researcher 1: Analyze performance impact
- Researcher 2: Document new patterns
- QA/Security: Verify and test

---

#### 2. Blog/Articles Section
**Priority**: Low
**Effort**: High (4 engineers + 2 researchers + 1 QA)

**Description**:
Add a blog section for design/dev articles with markdown rendering.

**Dependencies**: Need to choose markdown renderer (react-markdown vs. MDX)

---

#### 3. Contact Form Enhancement
**Priority**: Medium
**Effort**: Small (2 engineers + 1 QA)

**Description**:
Replace static contact info with working contact form (using Formspree or similar).

**Workflow**:
- Engineer 1: Set up form service integration
- Engineer 2: Add form validation + success/error states
- QA/Security: Security review (CSRF, spam protection)

---

#### 4. Dark/Light Mode Toggle
**Priority**: Low
**Effort**: Medium (3 engineers + 1 researcher + 1 QA)

**Description**:
Add theme toggle with persistent preference storage.

---

#### 5. Project Filtering/Search
**Priority**: Medium
**Effort**: Medium (3 engineers + 1 researcher + 1 QA)

**Description**:
Add ability to filter projects by category/technology on Projects page.

---

## Completed Features

### ✅ Wave 1-7 Optimizations (2025-11-19 to 2025-11-21)
- Dead code removal (-957 lines)
- Configuration fixes
- Styled-component consolidation
- Documentation creation
- Asset optimization (-12MB)
- Code splitting (15 chunks)
- Integration testing

**Result**: Health score 8/10 → 9.5/10

---

## Quick Wins (Low-Hanging Fruit)

These can be done outside the 7-agent workflow (single session):

- [ ] Remove NextProject route (2 min)
- [ ] Remove Website Dev data (5 min)
- [ ] Update .gitignore (5 min)
- [ ] Add lazy loading to images (1 hour)
- [ ] Add Error Boundary (30 min)
- [ ] Add 404 page (30 min)

**Total**: ~2 hours 12 minutes

---

## Roadmap Management

### Status Indicators
- 🔴 Blocked
- 🟡 Planning
- 🟢 In Progress
- ✅ Complete
- ⏸️ Paused

### Priority Levels
- **High**: Core functionality, user-facing features
- **Medium**: Nice-to-have improvements
- **Low**: Future enhancements, polish

### Effort Estimates
- **Small**: 1-2 agents (< 1 hour)
- **Medium**: 3-5 agents (1-3 hours)
- **High**: 6-7 agents (3-5 hours)
- **Very High**: Multiple features (> 5 hours)

---

## How to Use This Roadmap

### 1. Add a New Feature
Copy this template:

```markdown
### Feature: [Name]
**Status**: 🟡 Planning
**Priority**: High/Medium/Low
**Estimated Time**: [Hours]
**Started**: [Date]

**Description**:
[What you want to build]

**Workflow Progress**:
- [ ] Engineer 1: [Task]
- [ ] Engineer 2: [Task]
- [ ] Engineer 3: [Task]
- [ ] Engineer 4: [Task]
- [ ] Researcher 1: [Topic]
- [ ] Researcher 2: [Topic]
- [ ] QA/Security: Verification

**Dependencies**: [Any blockers]
**Notes**: [Context]
```

### 2. Start Development
1. Change status to 🟢 In Progress
2. Use workflow templates from `docs/workflows/WORKFLOW_GUIDE.md`
3. Run each agent sequentially
4. Check off completed steps

### 3. Track Progress
Update the checklist as each agent completes their work.

### 4. Mark Complete
When QA passes:
1. Change status to ✅ Complete
2. Move to "Completed Features" section
3. Update CLAUDE.md if needed

---

## See Also

- [Workflow Guide](../workflows/WORKFLOW_GUIDE.md) - Agent templates and process
- [Example: Skills Page](examples/SKILLS_PAGE_EXAMPLE.md) - Complete walkthrough
- [CLAUDE.md](../../CLAUDE.md) - Project overview
- [Known Issues](../reference/KNOWN_ISSUES.md) - Current bugs and cleanup

---

**Getting Started**: Pick a feature from the backlog, fill out the template, and follow the workflow guide!
