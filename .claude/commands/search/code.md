# Semantic Code Search

Search the codebase using natural language queries to find relevant code, patterns, and implementations.

## Usage
```
/search/code <natural language query>
```

## Examples
- `/search/code WebGL shader implementation` - Find Three.js shader code
- `/search/code route-reactive animations` - Find Line.jsx animation system
- `/search/code lazy loading` - Find React.lazy() usage
- `/search/code framer motion variants` - Find animation variants

---

## Task

You are tasked with searching the codebase for: **"$ARGUMENTS"**

Use a semantic search approach combining multiple strategies:

### 1. Query Understanding
First, parse the query to extract:
- **Intent**: What is the user looking for? (implementation, pattern, usage, example)
- **Technology**: Specific libraries or frameworks mentioned
- **Concepts**: High-level concepts (authentication, animation, routing, etc.)
- **Entity names**: Specific files, functions, or components

Example parsing:
```
Query: "WebGL shader implementation"
→ Intent: implementation
→ Technology: WebGL, Three.js
→ Concepts: shader, graphics
→ Likely files: ShaderVisual.jsx
```

### 2. Generate Search Variants
Create multiple search variations:
```
Original: "$ARGUMENTS"
Variants:
1. Technical terms expanded: [add framework-specific terminology]
2. Abbreviated: [common abbreviations]
3. Related concepts: [synonyms and related patterns]
4. File-specific: [likely filenames]
```

### 3. Multi-Strategy Search

**Strategy A: Direct Grep**
Search for exact matches and common variations:
```bash
# Primary search
grep -r "$ARGUMENTS" src/

# Technology-specific
grep -r "three" src/  # if query mentions 3D/WebGL
grep -r "motion" src/  # if query mentions animation
grep -r "lazy" src/  # if query mentions code splitting
```

**Strategy B: Component Analysis**
Based on query intent, search specific component types:
- **Animation queries** → Line.jsx, Cursor.jsx, AppSlider.jsx, Project detail pages
- **3D/Graphics queries** → ShaderVisual.jsx
- **Routing queries** → App.jsx, Navbar.jsx
- **Data queries** → /src/data/projectname.jsx, /src/data/archive.js
- **Styling queries** → sharedStyles.js, styled-components in files

**Strategy C: Metadata Search** (Future - when RAG implemented)
Query the metadata system:
```javascript
// Search by technology
metadata.search({ technology: "framer-motion" })

// Search by purpose
metadata.search({ purpose: "animation" })

// Search by performance
metadata.search({ performance: "heavy" })
```

**Strategy D: Import Graph**
Find components by their dependencies:
```
If query mentions "framer-motion":
→ Find all files importing from "framer-motion"
→ Prioritize by import depth (direct vs indirect)
```

### 4. Rank Results
Rank results by relevance:
1. **Exact matches** in component names or file names
2. **High-density matches** (multiple occurrences in same file)
3. **Metadata matches** (technology, purpose tags)
4. **Related files** (imported by or importing relevant files)

### 5. Present Results

Format results in this structure:

```markdown
## Search Results for "$ARGUMENTS"

Found **[N] relevant results** across [X] files:

### Top Matches

#### 1. [Component/File Name] (Relevance: High)
**File**: `[path]`
**Match**: [Why this is relevant]
**Context**:
[Code snippet or description]

**Related**:
- [Related file 1]
- [Related file 2]

---

#### 2. [Component/File Name] (Relevance: Medium)
**File**: `[path]`
**Match**: [Why this is relevant]
**Context**:
[Code snippet or description]

---

### Additional Matches
- `[file path]` - [brief description]
- `[file path]` - [brief description]

### Suggested Follow-ups
- `/load/component [Component]` - Load full context for specific match
- `/search/code [refined query]` - Refine search with more specific terms
- `/analyze/performance` - Analyze performance of heavy components found
```

### 6. Special Query Types

**"Show me all [X]" queries**:
```
Examples:
- "Show me all animated components"
- "Show me all project pages"
- "Show me all styled-components"

Response: List all matching files with brief descriptions
```

**"How does [X] work?" queries**:
```
Examples:
- "How does the cursor animation work?"
- "How does lazy loading work?"

Response: Load the relevant component + explain architecture
```

**"Where is [X]?" queries**:
```
Examples:
- "Where is authentication handled?"
- "Where are routes defined?"

Response: Provide file paths + line numbers + code snippets
```

**"What uses [X]?" queries**:
```
Examples:
- "What uses Three.js?"
- "What uses Framer Motion?"

Response: List all files importing X + usage context
```

---

## Context Stack Update
After search, update context:
```
last_search_query: "$ARGUMENTS"
search_results: [array of file paths]
search_context: "code_search"
```

---

## Performance Notes
- For large codebases, limit initial results to top 10
- Use file extensions to filter (.jsx, .js, .md only)
- Skip node_modules, dist, build directories
- Cache common queries (animation, routing, etc.)

---

## Error Handling
If no results found:
1. Suggest query refinement
2. List available technologies (React, Framer Motion, Three.js, etc.)
3. Suggest browsing by component type:
   - `/search/code page components`
   - `/search/code utility components`
   - `/search/code project details`
