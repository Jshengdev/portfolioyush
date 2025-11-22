# Update Documentation

Automatically update CLAUDE.md and other documentation after code changes.

## Usage
```
/docs/update [optional: file-path]
```

## Examples
- `/docs/update` - Update all documentation based on recent changes
- `/docs/update src/components/Line.jsx` - Update docs for specific file changes
- `/docs/update --stats` - Regenerate statistics only

---

## Task

Update project documentation to reflect current codebase state.

Target: **$ARGUMENTS**

---

## Update Strategy

### 1. Detect Changes
```bash
# Check git diff since last doc update
git diff --name-only HEAD~5..HEAD

# Focus on:
- New components
- Modified components
- Deleted files
- Changed dependencies (package.json)
- Changed configuration (vite.config.js)
```

### 2. Identify Documentation Sections to Update

Based on changed files, update these sections:

#### Component Changes → Update Multiple Sections
```
Changed: src/components/NewComponent.jsx

Update in CLAUDE.md:
- Component Architecture (add to component inventory)
- File Location Reference (add file path)
- Codebase Structure (update tree)
- Statistics (increment component count)
```

#### Dependency Changes → Update Dependencies Section
```
Changed: package.json

Update:
- Key Technologies & Dependencies
- Statistics (package counts)
```

#### Route Changes → Update Routing Section
```
Changed: src/App.jsx (routes)

Update:
- Routing Structure
- Component Architecture (Routes section)
- File Location Reference
```

#### Asset Changes → Update Asset Section
```
Changed: /public/assets/

Update:
- Assets & Media section
- Codebase Structure (asset tree)
- Statistics (asset sizes)
```

---

## Documentation Sections Reference

### CLAUDE.md Sections (by importance)
1. **Statistics** (Lines 20-40) - CRITICAL, update frequently
2. **Component Architecture** (Lines 140-280) - Update on new/deleted components
3. **Codebase Structure** (Lines 45-80) - Update on file structure changes
4. **File Location Reference** (Lines 650-720) - Update on new files
5. **Technical Debt** (Lines 560-640) - Update when issues resolved
6. **Optimization History** (Lines 85-340) - Add new waves if applicable

---

## Update Procedures

### A. Update Statistics
```
Current Statistics (verify and update):
- Total Components: [count .jsx files in src/components/]
- Lines of Code: [count lines with cloc or wc -l]
- Routes: [count Route elements in App.jsx]
- Assets: [du -sh public/assets/]
- Dependencies: [count in package.json]
```

Example verification:
```bash
# Count components
find src/components -name "*.jsx" -type f | wc -l

# Count lines
find src -name "*.jsx" -o -name "*.js" | xargs wc -l | tail -1

# Asset size
du -sh public/assets/
```

### B. Update Component Inventory
```
For new component:
1. Add to Component Architecture section
2. Categorize: Page/Component/Widget/Utility
3. Add description, file size, dependencies
4. Add to File Location Reference
5. Update component count in Statistics
```

Template:
```markdown
#### **[ComponentName].jsx** (`src/components/[path]`)
- **Purpose**: [1-sentence description]
- **State**: [useState variables]
- **Key Features**: [bullet points]
- **Dependencies**: [imports]
- **Issues**: [any known issues]
```

### C. Update Technical Debt
```
When issue resolved:
1. Move from "Quick Fixes" to "Completed"
2. Update health score if significant
3. Document what was fixed and why
```

When new issue found:
```markdown
## New Issues

### [Priority Level]
**Issue**: [Description]
**Location**: [File:Line]
**Impact**: [What's broken or inefficient]
**Solution**: [Recommended fix]
**Effort**: [Time estimate]
```

### D. Update File Structure Tree
```
When files added/moved:
1. Locate relevant section in Codebase Structure
2. Update directory tree with new files
3. Add file size if significant
4. Add warning flags (⚠️) if issues
5. Mark status (ACTIVE/UNUSED/DEPRECATED)
```

---

## Automation Strategies

### Option 1: Manual Update (Current)
1. Read changed files
2. Manually update relevant sections
3. Verify statistics
4. Commit updated docs

### Option 2: Semi-Automated (Recommended)
```bash
# Generate statistics automatically
node scripts/generate-docs-stats.js > .claude/context/stats.md

# Then manually integrate into CLAUDE.md
```

### Option 3: Fully Automated (Future)
```bash
# CI/CD hook checks if code changed but docs didn't
if [[ $(git diff --name-only HEAD~1 | grep "^src/") ]] && \
   [[ ! $(git diff --name-only HEAD~1 | grep "CLAUDE.md") ]]; then
  echo "⚠️ Code changed but CLAUDE.md not updated"
  exit 1
fi
```

---

## Update Checklist

Use this checklist for manual updates:

```markdown
Documentation Update Checklist:

Pre-Update:
- [ ] Run `git status` to see what changed
- [ ] Run `git diff` to see specific changes
- [ ] Identify which doc sections are affected

Statistics Update:
- [ ] Count components (find src/components -name "*.jsx" | wc -l)
- [ ] Count lines (cloc src/ or wc -l)
- [ ] Measure asset size (du -sh public/assets/)
- [ ] Update dependency counts
- [ ] Update build size (check dist/ after build)

Content Update:
- [ ] Add/remove components in Component Architecture
- [ ] Update File Location Reference
- [ ] Update Codebase Structure tree
- [ ] Update Technical Debt (issues resolved)
- [ ] Update Optimization History (if new wave)

Verification:
- [ ] All statistics accurate
- [ ] All file paths correct
- [ ] No broken internal links
- [ ] Consistent formatting
- [ ] Updated "Last Updated" date at top

Post-Update:
- [ ] Commit with message: "docs: update CLAUDE.md for [changes]"
- [ ] Verify docs render correctly
```

---

## Specific Update Scenarios

### Scenario 1: New Component Added
```
File: src/components/NewComponent.jsx

Updates needed:
1. Component Architecture → Add full component description
2. File Location Reference → Add file path
3. Statistics → Increment component count
4. Codebase Structure → Add to tree

Estimated time: 10 minutes
```

### Scenario 2: Component Deleted
```
File: src/components/OldComponent.jsx (deleted)

Updates needed:
1. Component Architecture → Remove or mark as deleted
2. File Location Reference → Remove entry
3. Statistics → Decrement component count
4. Technical Debt → Remove related issues
5. Codebase Structure → Remove from tree

Estimated time: 5 minutes
```

### Scenario 3: Major Refactoring
```
Example: Wave 6 Optimization (Lazy Loading)

Updates needed:
1. Optimization History → Add new wave section
2. Statistics → Update bundle size, chunk count
3. Component Architecture → Note lazy-loaded components
4. Health Score → Update if improved
5. Technical Debt → Mark completed issues

Estimated time: 30-45 minutes
```

### Scenario 4: Dependency Changes
```
Example: Added new library or upgraded version

Updates needed:
1. Key Technologies & Dependencies → Update version
2. Statistics → Update dependency count
3. Component Architecture → Note which components use it
4. Technical Debt → Remove if it fixes issues

Estimated time: 10 minutes
```

---

## Output Format

After update, provide summary:
```markdown
## Documentation Updated: [Date]

### Changes Made
1. **Statistics**
   - Component count: 16 → 17 (+1)
   - Lines of code: 4,676 → 4,820 (+144)

2. **Component Architecture**
   - Added: NewComponent.jsx (144 lines)
   - Description: [brief description]

3. **File Location Reference**
   - Added: src/components/NewComponent.jsx

4. **Technical Debt**
   - No changes

### Verification
✓ All statistics verified accurate
✓ File paths tested
✓ Formatting consistent

### Next Steps
- Commit changes: `git add CLAUDE.md && git commit -m "docs: add NewComponent documentation"`
- Consider: [any additional recommendations]
```

---

## Context Stack Update
```
last_doc_update: [timestamp]
updated_sections: [list]
files_documented: [list]
```

---

## Best Practices

1. **Update immediately after major changes** - Don't let docs get stale
2. **Verify statistics** - Run actual commands, don't guess
3. **Be consistent** - Match existing formatting and style
4. **Cross-reference** - Ensure all mentions of a component are updated
5. **Test paths** - Make sure file paths are correct
6. **Use precise language** - Avoid vague terms like "some files" or "many components"
7. **Include evidence** - Show command output or calculations

---

## Error Prevention

Common mistakes to avoid:
- ❌ Forgetting to update statistics
- ❌ Leaving orphaned references to deleted files
- ❌ Inconsistent formatting
- ❌ Wrong line counts (counting comments vs code)
- ❌ Breaking internal links
- ❌ Updating one section but not related sections
