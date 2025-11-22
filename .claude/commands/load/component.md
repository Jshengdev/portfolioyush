# Load Component Context

Load comprehensive context for a specific React component including source code, dependencies, usage, and related files.

## Usage
```
/load/component <ComponentName>
```

## Examples
- `/load/component Line` - Load Line.jsx animation system
- `/load/component ShaderVisual` - Load WebGL shader component
- `/load/component Grove` - Load Grove project detail page

---

## Task

You are tasked with loading and analyzing the component: **$ARGUMENTS**

Follow this structured approach:

### 1. Locate Component File
First, find the component file:
```
Priority search locations:
- /src/components/$ARGUMENTS.jsx
- /src/components/Projectfiles/$ARGUMENTS.jsx
- /src/components/*/$ARGUMENTS.jsx (subdirectories)
```

### 2. Load Component Source
Read the component file and extract:
- **Imports**: All dependencies (React hooks, libraries, local imports)
- **Exports**: Default export and named exports
- **Props**: Expected props interface
- **State**: useState, useRef, useEffect hooks
- **Styled Components**: All styled-component definitions
- **Key Functions**: Main logic and event handlers

### 3. Analyze Dependencies
For each imported dependency:
- **External libraries**: Check package.json for version
- **Local components**: Note if they should be loaded too
- **Hooks**: Identify custom vs built-in React hooks
- **Utils/Data**: Note data sources and utilities

### 4. Find Usage
Search where this component is used:
```
Grep for: "import.*$ARGUMENTS" or "<$ARGUMENTS"
Check: App.jsx, other components, project pages
```

### 5. Load Related Context
Based on component type, load relevant context:

**For Page Components** (Hero, About, Projects, etc.):
- Route definition in App.jsx
- Parent container (PageWrapper)
- Child components used

**For Project Detail Components** (Grove, CapsuleMachine, etc.):
- Project data from /src/data/projectname.jsx
- Asset locations in /public/assets/
- NextProject navigation

**For Utility Components** (Line, Cursor, Navbar):
- Global usage patterns
- Performance considerations
- Animation configurations

**For Styled Components**:
- Check if it's in /src/components/sharedStyles.js
- Find all components using it

### 6. Extract Metadata
Generate component metadata:
```json
{
  "component": "$ARGUMENTS",
  "type": "[page|component|widget|utility]",
  "location": "[file path]",
  "size": "[lines of code]",
  "dependencies": {
    "react": ["hooks used"],
    "libraries": ["external packages"],
    "local": ["local imports"]
  },
  "technologies": ["react", "framer-motion", "styled-components", "three.js"],
  "performance": "[light|medium|heavy]",
  "scope": "[global|page-specific|project-specific]",
  "status": "[active|deprecated]"
}
```

### 7. Provide Context Summary
Summarize in this format:

```markdown
## Component: $ARGUMENTS

**Location**: `[file path]`
**Type**: [type]
**Size**: [lines] lines
**Performance**: [light/medium/heavy]

### Purpose
[1-2 sentence description of what this component does]

### Key Features
- Feature 1
- Feature 2
- Feature 3

### Dependencies
**React**: [hooks]
**Libraries**: [external packages]
**Local**: [components/utils]

### Usage
Used in [X] places:
- [Location 1]
- [Location 2]

### Related Files
- [Related component 1]
- [Related component 2]
- [Data/config files]

### Performance Notes
[Any performance considerations - animations, heavy rendering, etc.]

### Next Steps
Suggest relevant follow-up actions:
- "Load related component X with /load/component X"
- "Search for similar patterns with /search/code [query]"
- "Analyze performance with /analyze/performance"
```

---

## Context Stack Update
After loading, update the context stack:
```
current_component: $ARGUMENTS
current_file: [component file path]
related_files: [list of related files]
context_type: "component"
```

This allows follow-up commands to use this context automatically.

---

## Error Handling
If component not found:
1. Search for similar names (typos, abbreviations)
2. List all available components
3. Suggest correct spelling

If component is deprecated or unused:
1. Note its status
2. Explain why it's deprecated (check CLAUDE.md technical debt section)
3. Suggest active alternatives
