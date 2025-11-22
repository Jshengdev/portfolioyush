#!/bin/bash

# This script creates the remaining task files for Waves 3-7
# based on the EXECUTION_PLAN.md structure

cd /Users/johnnysheng/Documents/GitHub/portfolioyush

# Helper function to create task file
create_task() {
  local wave=$1
  local task_num=$2
  local task_id=$3
  local filename=$4
  local title=$5
  local time=$6
  local risk=$7
  local impact=$8
  local lines=$9
  local brief=${10}
  
  cat > "tasks/wave-$wave/$task_id-$filename.md" << EOF
# $task_id: $title

**📍 Core Plan**: \`/EXECUTION_PLAN.md\` (Lines $lines)  
**⏱ Time**: $time | **⚠️ Risk**: $risk | **🎯 Impact**: $impact  
**Wave**: $wave | **Dependencies**: Wave $((wave-1)) complete | **Parallelizable**: Yes

---

## Quick Overview

$brief

---

## Tasks

Refer to \`/EXECUTION_PLAN.md\` lines $lines for detailed step-by-step instructions.

Key actions:
- Read relevant source files
- Make specified changes
- Test build and functionality
- Commit changes

---

## Validation Checklist

Refer to validation section in \`/EXECUTION_PLAN.md\` lines $lines.

---

## Final Confirmation

- [ ] All validation checks passed
- [ ] Changes committed with appropriate message
- [ ] Ready for next wave

**Completion Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
EOF
}

# Wave 3 Tasks
create_task 3 1 "W3-T1" "consolidate-container" "Consolidate Container Styled-Component" "30 min" "Low" "🔥🔥" "355-400" "Consolidate 9 duplicate Container styled-components across files into /src/sharedStyles.js"

create_task 3 2 "W3-T2" "consolidate-title" "Consolidate Title Styled-Component" "20 min" "Low" "🔥🔥" "402-445" "Consolidate 8 duplicate Title styled-components into /src/sharedStyles.js"

create_task 3 3 "W3-T3" "consolidate-container2-glow" "Consolidate Container2 & Glow" "30 min" "Low" "🔥🔥" "447-490" "Consolidate Container2 (7 instances) and glow animation (9 instances) into sharedStyles.js"

create_task 3 4 "W3-T4" "centralize-archive-data" "Centralize Archive Data" "30 min" "Low" "🔥" "492-535" "Move hardcoded archive data from Archive.jsx to /src/data/archive.js"

create_task 3 5 "W3-T5" "optimize-cursor-animation" "Optimize Cursor Animation" "30 min" "Low" "🔥🔥" "537-580" "Optimize Cursor.jsx animation loop with requestAnimationFrame for 60fps performance"

# Wave 4 Tasks  
create_task 4 1 "W4-T1" "create-readme" "Create Comprehensive README" "45 min" "Low" "🔥🔥🔥" "602-690" "Create detailed README.md with Tech Stack, Getting Started, Routes, Architecture, and Component sections"

create_task 4 2 "W4-T2" "add-jsdoc-comments" "Add JSDoc Comments" "30 min" "Low" "🔥🔥" "692-740" "Add JSDoc comments to theme.js, sharedStyles.js, and key utility files"

create_task 4 3 "W4-T3" "update-meta-tags" "Update Meta Tags & Architecture Docs" "30 min" "Low" "🔥" "742-770" "Add SEO meta tags to index.html and create ARCHITECTURE.md documenting component hierarchy"

# Wave 5 Tasks
create_task 5 1 "W5-T1" "optimize-images" "Optimize Image Assets" "1 hour" "Medium" "🔥🔥🔥" "792-850" "Compress images in /public/assets/images/ to reduce ~13MB asset size"

create_task 5 2 "W5-T2" "consolidate-fonts" "Consolidate Font Loading" "30 min" "Low" "🔥🔥" "852-880" "Remove duplicate font loading from index.html and src/assets/fonts/fonts.css"

# Wave 6 Tasks (Optional)
create_task 6 1 "W6-T1" "lazy-loading" "Implement Code Splitting with Lazy Loading" "1.5 hour" "Low" "🔥🔥🔥" "995-1020" "Add React lazy loading to reduce initial bundle by 38%"

create_task 6 2 "W6-T2" "simplify-line" "Simplify Line.jsx Animation System" "2 hours" "HIGH" "��🔥🔥" "1022-1085" "⚠️ HIGH RISK: Refactor Line.jsx from 288 lines to ~80 lines using position lookup"

create_task 6 3 "W6-T3" "extract-shaders" "Extract GLSL Shaders" "1 hour" "Low" "🔥" "1087-1130" "Extract inline GLSL shaders to separate .glsl files for better maintainability"

# Wave 7 Task
create_task 7 1 "W7-T1" "integration-test" "Full Integration Testing" "1 hour" "Low" "🔥🔥🔥" "1152-1240" "Run comprehensive integration tests across all routes and features"

echo "✓ Created all remaining task files"
ls -la tasks/wave-*/

