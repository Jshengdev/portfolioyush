# Getting Started with the Workflow System

**Quick Guide**: How to use the 7-agent workflow system for your first feature

---

## What You Have Now

A complete workflow system for AI-assisted development with:

✅ **Workflow Guide** - How the 7-agent system works
✅ **Roadmap Template** - Feature tracking & progress
✅ **Prompt Templates** - Copy-paste prompts for each agent
✅ **Complete Example** - Skills Page walkthrough

---

## 5-Minute Quickstart

### Step 1: Pick or Add a Feature (2 min)

Open `docs/roadmap/ROADMAP.md` and either:

**Option A**: Use a suggested feature from the backlog
- Skills/Technologies Page
- Contact Form Enhancement
- Project Filtering/Search
- Dark/Light Mode Toggle
- Blog/Articles Section

**Option B**: Add your own feature using the template in ROADMAP.md

### Step 2: Fill Out the Workflow (1 min)

In the roadmap, list what each agent will do:

```markdown
### Feature: [Your Feature Name]
**Status**: 🟢 In Progress
**Priority**: High
**Estimated Time**: 4 hours

**Workflow Progress**:
- [ ] Engineer 1: [Create component + route]
- [ ] Engineer 2: [Implement data layer]
- [ ] Engineer 3: [Add styling + animations]
- [ ] Engineer 4: [Integrate with navigation]
- [ ] Researcher 1: [Performance analysis]
- [ ] Researcher 2: [Update documentation]
- [ ] QA/Security: [Final verification]
```

### Step 3: Copy First Prompt Template (1 min)

Go to `docs/workflows/PROMPT_TEMPLATES.md` and copy the **Engineering Prompt Template**.

Fill in the placeholders:
- `[FEATURE_NAME]` → Your feature name
- `[ONE SPECIFIC TASK]` → What Engineer 1 should do
- List files to create/modify
- Add 3-5 specific requirements

### Step 4: Give to Claude (30 sec)

Paste the filled-out prompt and say:

```
Here's the prompt for Engineer 1. Please follow it exactly.
```

### Step 5: Repeat for Each Agent (30 min each)

After Engineer 1 completes:
1. Check off their task in the roadmap
2. Copy the Engineer 2 template
3. Fill it out based on what Engineer 1 built
4. Give to Claude
5. Repeat for all 7 agents

---

## Example Session

Here's what a real session looks like:

### You:
```markdown
I want to add a Skills page to my portfolio.

Here's the workflow I'd like:
- Engineer 1: Create basic Skills.jsx component
- Engineer 2: Add skills data structure
- Engineer 3: Style it with animations
- Engineer 4: Integrate with navigation

Let's start with Engineer 1. Here's the prompt:

[Paste filled-out Engineer 1 template from PROMPT_TEMPLATES.md]
```

### Claude:
```
I've created Skills.jsx and added the route to App.jsx.
The page is now accessible at /skills with a basic title.

Files created:
- /src/components/Skills.jsx

Files modified:
- /src/App.jsx (added route + lazy import)

Next: Hand off to Engineer 2 for data structure implementation.
```

### You:
```markdown
Great! Marking Engineer 1 as complete.

Now Engineer 2, here's your prompt:

[Paste filled-out Engineer 2 template]
```

...and so on through all 7 agents.

---

## Tips for Success

### 1. Be Specific in Requirements
**Bad**: "Make it look nice"
**Good**: "Use Container2 and Title from sharedStyles.js, add fade-in animation on scroll, responsive grid (4 columns desktop, 2 tablet, 1 mobile)"

### 2. Reference Existing Patterns
**Bad**: "Create a new component"
**Good**: "Create Skills.jsx using Hero.jsx as the structural pattern (lines 1-114)"

### 3. Set Clear Acceptance Criteria
**Bad**: "Component should work"
**Good**:
- [ ] Skills.jsx renders without errors
- [ ] Route /skills is accessible
- [ ] Uses shared components from sharedStyles.js
- [ ] Follows existing code patterns

### 4. Keep Engineers Focused
Each engineer should do ONE thing:
- Engineer 1: Scaffolding ONLY (no styling, no data)
- Engineer 2: Data ONLY (no styling, no integration)
- Engineer 3: Styling ONLY (no new functionality)
- Engineer 4: Integration ONLY (connect everything)

### 5. Let Researchers Do Research
Don't ask engineers to analyze performance or update docs. That's what Researchers 1 & 2 are for.

### 6. QA Must Pass Before Deploy
The QA/Security agent is your safety net. Don't skip it, even for "simple" features.

---

## Workflow Variations

### Simple Feature (1-2 hours)
**Example**: Change color scheme

Use just:
- 1 Engineer (do all implementation)
- 1 QA (verify changes)

### Medium Feature (2-4 hours)
**Example**: Add new page

Use:
- 2-3 Engineers (split work logically)
- 1 Researcher (performance or docs)
- 1 QA

### Complex Feature (4-8 hours)
**Example**: Add CMS integration

Use all:
- 4 Engineers (detailed separation)
- 2 Researchers (performance + docs)
- 1 QA (extended testing)

---

## Common Questions

### Q: Can I combine agents?
A: Yes! For simple tasks, combine Engineer roles. The 7-agent pattern is for complex features.

### Q: What if an agent fails a task?
A: That's OK! Give feedback and let them retry, or adjust the next agent's prompt to fix it.

### Q: Do I need to be strict about time limits?
A: Not strictly, but they help scope tasks. If an agent takes 2+ hours, the task is too big - split it.

### Q: Can I skip researchers?
A: For quick features, yes. But performance analysis and documentation updates are valuable.

### Q: Must I go in order?
A: Generally yes - each engineer builds on the previous. But Researchers can run in parallel with later engineers.

---

## Next Steps

**Ready to start?**

1. Open `docs/roadmap/ROADMAP.md`
2. Pick a feature from the backlog (or add your own)
3. Copy Engineer 1 template from `docs/workflows/PROMPT_TEMPLATES.md`
4. Fill it out with specifics
5. Give it to Claude
6. Track progress in the roadmap

**Need inspiration?**

See the complete example: `docs/roadmap/examples/SKILLS_PAGE_EXAMPLE.md`

---

## File Reference

| File | Purpose |
|------|---------|
| `WORKFLOW_GUIDE.md` | How the system works (theory) |
| `PROMPT_TEMPLATES.md` | Copy-paste prompts (practice) |
| `GETTING_STARTED.md` | This file (quickstart) |
| `../roadmap/ROADMAP.md` | Feature tracking (your work) |
| `../roadmap/examples/SKILLS_PAGE_EXAMPLE.md` | Complete example (reference) |

---

**Good luck! You're ready to build features with predictable, measurable progress.**

Questions? Check the [Workflow Guide](WORKFLOW_GUIDE.md) for detailed explanations.
