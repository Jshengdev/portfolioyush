# Dark/Light Mode + Special Enhancements - Complete Workflow Checklist
**Date Created**: 2025-11-21
**Status**: Ready for Implementation
**Estimated Time**: 16-22 hours total

---

## 📊 Overview

This document combines:
1. **Base Theme Implementation** (from THEME_IMPLEMENTATION_GUIDE.md)
2. **Special Enhancements** (from research reports)
3. **Workflow Integration** (using the 7-agent system)

---

## 🎯 Special Enhancement Opportunities (From Research)

### From Research Agent 1 (Motion Graphics & Cinema)
**Impact**: HIGH - Transform shader and animations

1. **Route-Reactive Shader States** (Saul Bass / Ash Thorp)
   - Shader patterns change personality per route
   - Homepage: exploratory grids
   - Projects: structured density
   - About: organic curves
   - **Estimated Time**: 4-6 hours

2. **Harmonic Oscillators for Non-Repeating Motion** (John Whitney)
   - Replace linear time with sine/cosine combinations
   - Endless variation without loops
   - **Estimated Time**: 2-3 hours

3. **Choreographic Inertia in Transitions** (Territory Studio / Gmunk)
   - Spring physics with momentum transfer
   - Weighted elements (titles = heavy, lines = light)
   - **Estimated Time**: 3-4 hours

4. **Cursor Light Trails in Shader Space** (Gmunk)
   - Cursor leaves "light deposits" that fade
   - Trail buffer with exponential decay
   - **Estimated Time**: 5-7 hours

5. **Hero State Pre-Warming** (Saul Bass)
   - Jump shader to interesting seed on mount
   - First 3 seconds establish visual contract
   - **Estimated Time**: 1 hour

### From Research Agent 8 (Portfolio Strategies)
**Impact**: MEDIUM - Improve content presentation

6. **Philosophy-First About Page**
   - Lead with methodology, not credentials
   - Add "Currently" section
   - Vulnerable moment + invitation
   - **Estimated Time**: 2-3 hours

7. **Question-Driven Project Titles**
   - Grove → "Can AI Understand Creative Chemistry?"
   - Ark → "What If Self-Care Was Wearable?"
   - **Estimated Time**: 1 hour

8. **Process Documentation Enhancement**
   - Add "messy middle" images
   - Include "What I Learned" sections
   - Show pivot moments
   - **Estimated Time**: 3-4 hours

### From MA (間) / Negative Space Research
**Impact**: HIGH - Deepen spatial sophistication

9. **Active Void - Route-Reactive Hollow Box**
   - Different shapes/sizes per route
   - Home: large centered square
   - Projects: smaller aligned
   - Contact: tall thin rectangle
   - **Estimated Time**: 3-4 hours

10. **Varied Border Frame Thickness**
    - Home: 45px (maximum breathing room)
    - Projects: 30px (standard)
    - Archive: 20px (density)
    - **Estimated Time**: 1-2 hours

11. **Graduated Blur Hierarchy** (SANAA Principle)
    - Surface panels: blur(5px)
    - Mid-depth: blur(10px)
    - Deep background: blur(15-20px)
    - **Estimated Time**: 2-3 hours

12. **Enhanced Threshold Transitions**
    - Progressive blur on route change
    - Temporal pause (200-300ms)
    - Enhanced hover micro-thresholds
    - **Estimated Time**: 2-3 hours

---

## 🚀 Implementation Strategy

### Approach A: Focused (Recommended)
**Do theme first, then choose 3-5 special enhancements**
- Total Time: 16-22 hours
- Lower risk, systematic progress
- Use /engineer agents for implementation

### Approach B: Comprehensive
**Do theme + all enhancements in parallel**
- Total Time: 30-40 hours
- Higher complexity but maximum impact
- Use full /workflow with all 7 agents

---

## ✅ Phase Breakdown with Special Enhancements

### PHASE 1: Theme Foundation ✅ COMPLETE
- [x] Expand theme.js with dark and light themes
- [x] Build verified

---

### PHASE 2: Core Component Theme Integration (Base)
**Goal**: Get all colors using theme references

#### Task 2.1: Update App.jsx
- [ ] Line 31: Container border → theme.colors.background.overlay
- [ ] Line 42: Frame border → theme.colors.border.primary
- [ ] Line 62: LoadingContainer color → theme.colors.text.secondary
- [ ] Verify build successful
- **Time**: 30 minutes

#### Task 2.2: Update sharedStyles.js (CRITICAL - 18 components)
- [ ] ChapterCard colors (4 instances)
- [ ] ProblemSolutionBox colors (5 instances)
- [ ] ProblemBox + SolutionBox borders (2 instances)
- [ ] TextColumn colors (2 instances)
- [ ] ImageColumn shadow colors (2 instances)
- [ ] GifContainer shadow colors (2 instances)
- [ ] OverviewBox colors (2 instances)
- [ ] MetadataPanel colors (3 instances)
- [ ] MetadataSection + Label + Value (3 instances)
- [ ] Title colors (2 instances)
- [ ] Bold color (1 instance)
- [ ] Replace all var(--paragraph-color), var(--font-heading), var(--font-body)
- [ ] Verify build successful
- **Time**: 2 hours

#### Task 2.3: Update Line.jsx
- [ ] Replace all 7 instances of rgba(255, 255, 255, 0.5)
- [ ] Use theme.colors.text.muted
- [ ] Verify build successful
- **Time**: 20 minutes

#### Task 2.4: Update Navbar.jsx
- [ ] Line 31: theme.colors.text.secondary
- [ ] Line 38: theme.colors.text.hover
- [ ] Verify build successful
- **Time**: 15 minutes

**Phase 2 Total**: 3 hours

---

### PHASE 3: Page Components Theme Integration
**Goal**: Extend theme to all pages

#### Task 3.1: Update Projects.jsx
- [ ] Text colors (20+ instances)
- [ ] Border colors
- [ ] softGlow keyframe shadows
- [ ] PreviewImage shadows
- [ ] ImageOverlay gradients
- [ ] Verify build and visual appearance
- **Time**: 1.5 hours

#### Task 3.2: Update Cursor.jsx (Optional)
- [ ] Line 9: border → theme.colors.text.hover
- [ ] Line 22: background → theme.colors.text.hover
- [ ] Verify build
- **Time**: 15 minutes

#### Task 3.3: Verify Project Detail Pages (Inherited)
- [ ] Navigate to all 6 project pages
- [ ] Verify visual appearance (no code changes needed)
- **Time**: 30 minutes

**Phase 3 Total**: 2 hours

---

### PHASE 4: Theme Toggle Mechanism
**Goal**: Allow users to switch themes

#### Task 4.1: Create ThemeContext.jsx
- [ ] Create file: src/context/ThemeContext.jsx
- [ ] useState for theme state
- [ ] useEffect for localStorage load
- [ ] useEffect for localStorage save
- [ ] toggleTheme function
- [ ] Export ThemeContext and ThemeProvider
- **Time**: 45 minutes

#### Task 4.2: Update App.jsx for Context
- [ ] Import ThemeProvider
- [ ] Create AppContent component
- [ ] Wrap Router in ThemeProvider
- [ ] Use useContext(ThemeContext)
- [ ] Pass theme to styled-components ThemeProvider
- **Time**: 30 minutes

#### Task 4.3: Create ThemeToggle.jsx
- [ ] Create file: src/components/ThemeToggle.jsx
- [ ] Styled button (fixed bottom-right)
- [ ] Sun/moon emoji icons
- [ ] Smooth transitions
- [ ] Use theme colors for styling
- **Time**: 45 minutes

#### Task 4.4: Add ThemeToggle to App
- [ ] Import ThemeToggle
- [ ] Add to Container
- [ ] Verify positioning
- **Time**: 15 minutes

#### Task 4.5: Test Theme Toggle
- [ ] Click toggle button
- [ ] Verify dark → light switch
- [ ] Verify light → dark switch
- [ ] Test localStorage persistence
- [ ] Test on all pages
- **Time**: 30 minutes

**Phase 4 Total**: 3 hours

---

### PHASE 5: Testing & Refinement
**Goal**: Ensure both themes work perfectly

#### Task 5.1: Visual Regression Testing
- [ ] Dark mode checklist (8 items)
- [ ] Light mode checklist (8 items)
- [ ] Take screenshots
- **Time**: 1 hour

#### Task 5.2: Contrast Ratio Testing
- [ ] Test dark mode text/background ratios
- [ ] Test light mode text/background ratios
- [ ] Adjust if needed (WCAG AA compliance)
- **Time**: 30 minutes

#### Task 5.3: Animation & Transition Testing
- [ ] Page transitions
- [ ] Line animations
- [ ] Hover effects
- [ ] Scroll animations
- [ ] Glow animations
- [ ] Theme toggle transition
- **Time**: 45 minutes

#### Task 5.4: Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Check backdrop-filter support
- **Time**: 30 minutes

#### Task 5.5: Mobile Responsiveness
- [ ] Test at 375px width
- [ ] Dark mode navigation
- [ ] Light mode navigation
- [ ] Toggle button accessibility
- **Time**: 30 minutes

#### Task 5.6: Color Refinement
- [ ] Based on testing, adjust colors if needed
- [ ] Document final values
- **Time**: 1 hour

**Phase 5 Total**: 4 hours

---

## 🎨 SPECIAL ENHANCEMENTS (Post-Theme)

### ENHANCEMENT 1: Route-Reactive Shader States ⭐ HIGHEST IMPACT
**From**: Research Agent 1 - Takeaway 1

#### Engineer 1: Shader State Machine Setup (30 min)
- [ ] Create shaderPersonalities config object in ShaderVisual.jsx
- [ ] Define 5 route personality objects (/, /about, /projects, /archive, /contact)
- [ ] Each with: complexity, gridScale, noiseOctaves, colorTemp, animSpeed
- [ ] Add useLocation hook (like Line.jsx)

#### Engineer 2: Shader Uniform System (30 min)
- [ ] Add new uniforms to shader material
- [ ] u_complexity, u_gridScale, u_noiseOctaves, u_colorTemp, u_animSpeed
- [ ] Create updateShaderUniforms function
- [ ] Call on route change

#### Engineer 3: GLSL Shader Adaptation (45 min)
- [ ] Update fragment shader to use new uniforms
- [ ] Adjust noise frequency based on u_complexity
- [ ] Scale grid based on u_gridScale
- [ ] Modulate color temperature
- [ ] Test each route personality

#### Engineer 4: Smooth Interpolation (45 min)
- [ ] Add Framer Motion or custom interpolation
- [ ] Transition uniforms over 0.8s
- [ ] Spring physics for organic feel
- [ ] Verify smooth transitions

**Total Time**: 3 hours
**Impact**: Transformative - each route feels emotionally distinct

---

### ENHANCEMENT 2: Harmonic Oscillators ⭐ MEDIUM IMPACT
**From**: Research Agent 1 - Takeaway 2

#### Engineer 1: Implement Oscillator Math (90 min)
- [ ] Replace linear u_time with harmonic functions
- [ ] Add multiple sine/cosine waves with different frequencies
- [ ] Create 3 noise layers (2.0, 4.0, 8.0 scale)
- [ ] Blend layers with weights
- [ ] Test non-repeating pattern

**Total Time**: 1.5 hours
**Impact**: Shader feels "alive" and never repeats exactly

---

### ENHANCEMENT 3: Choreographic Inertia ⭐ HIGH IMPACT
**From**: Research Agent 1 - Takeaway 3

#### Engineer 1: Spring Physics Config (45 min)
- [ ] Create choreoSprings config in Line.jsx
- [ ] Define mass/damping/stiffness per element type
- [ ] Title: mass 2.0, damping 20, stiffness 80
- [ ] Line: mass 0.5, damping 15, stiffness 150
- [ ] Shader: mass 5.0, damping 30, stiffness 40

#### Engineer 2: Apply to Route Transitions (45 min)
- [ ] Update AnimatePresence transitions
- [ ] Use Framer Motion spring type
- [ ] Apply element-specific configs
- [ ] Test staggered choreography

**Total Time**: 1.5 hours
**Impact**: Transitions feel crafted like cinematic title sequences

---

### ENHANCEMENT 4: Cursor Light Trails ⭐ MEDIUM-HIGH IMPACT
**From**: Research Agent 1 - Takeaway 4

#### Engineer 1: Trail Buffer System (90 min)
- [ ] Create trailBuffer ref in ShaderVisual.jsx
- [ ] Store {x, y, time, strength} objects
- [ ] Maintain last 20 points
- [ ] Handle mouse move updates

#### Engineer 2: Shader Integration (90 min)
- [ ] Pass trail data as uniform array
- [ ] Implement getCursorInfluence() GLSL function
- [ ] Exponential falloff calculation
- [ ] Apply to pattern brightness/color

#### Engineer 3: Performance & Refinement (60 min)
- [ ] Test performance with 60fps
- [ ] Adjust decay rate for subtle effect
- [ ] Tune influence radius
- [ ] Polish visual quality

**Total Time**: 4 hours
**Impact**: Negative space becomes interactive, Gmunk-inspired

---

### ENHANCEMENT 5: Hero State Pre-Warming ⭐ QUICK WIN
**From**: Research Agent 1 - Takeaway 5

#### Engineer 1: Implement (30 min)
- [ ] Define heroSeeds array [10.5, 23.7, 47.2, 91.3]
- [ ] Scout interesting u_time values (spend 20 min scrubbing)
- [ ] Set initial u_time to random seed on mount
- [ ] Verify compelling first impression

**Total Time**: 30 minutes
**Impact**: Users never see "boring" shader initialization

---

### ENHANCEMENT 6: Active Void - Route-Reactive Hollow Box ⭐ HIGH IMPACT
**From**: MA (間) Research - Takeaway 1

#### Engineer 1: Void Config System (60 min)
- [ ] Create voidConfig object with route mappings
- [ ] Define shape, size, position, rotation per route
- [ ] Home: square, 0.3, centered, 45deg
- [ ] Projects: square, 0.2, centered, 0deg
- [ ] About: circle, 0.25, offset-right
- [ ] Contact: rectangle [0.15, 0.3], lower-third
- [ ] Archive: horizontal-bars, stacked

#### Engineer 2: Shader Implementation (90 min)
- [ ] Add uniforms: u_voidShape, u_voidSize, u_voidPosition, u_voidRotation
- [ ] Update fragment shader to render different shapes
- [ ] Test each route's void configuration
- [ ] Smooth transitions between shapes

**Total Time**: 2.5 hours
**Impact**: Void becomes active participant in navigation

---

### ENHANCEMENT 7: Graduated Blur Hierarchy ⭐ MEDIUM IMPACT
**From**: MA (間) Research - Takeaway 4

#### Engineer 1: Blur Level System (60 min)
- [ ] Define BlurLevels config (surface 5px, mid 10px, deep 15px, deepest 20px)
- [ ] Identify panel z-index hierarchy
- [ ] Apply graduated blur based on depth
- [ ] Test atmospheric layering

**Total Time**: 1 hour
**Impact**: Portfolio feels more three-dimensional (SANAA principle)

---

### ENHANCEMENT 8: Varied Border Frame Thickness ⭐ QUICK WIN
**From**: MA (間) Research - Takeaway 1

#### Engineer 1: Implement (45 min)
- [ ] Create frameThickness config by route
- [ ] Home: 45px, About: 35px, Projects: 30px, Archive: 20px, Contact: 40px
- [ ] Apply via Container borderWidth prop
- [ ] Add Framer Motion animated transitions
- [ ] Test breathing effect

**Total Time**: 45 minutes
**Impact**: Spatial hierarchy through frame variation

---

### ENHANCEMENT 9: Philosophy-First About Page ⭐ CONTENT
**From**: Research Agent 8 - Takeaway 1-5

#### Researcher 1: Content Strategy (30 min)
- [ ] Draft philosophy statement
- [ ] Create methodology statement
- [ ] Write vulnerable moment
- [ ] Draft invitation/currently section

#### Engineer 1: Implement (30 min)
- [ ] Update About.jsx with new content
- [ ] Format properly
- [ ] Test readability

**Total Time**: 1 hour
**Impact**: About page more compelling and authentic

---

### ENHANCEMENT 10: Question-Driven Project Titles ⭐ QUICK WIN
**From**: Research Agent 8 - Takeaway 2

#### Engineer 1: Update Titles (30 min)
- [ ] Grove → "Can AI Understand Creative Chemistry?"
- [ ] Capsule Machine → "Can Vending Machines Tell Stories?"
- [ ] Ark → "What If Self-Care Was Wearable?"
- [ ] Collection → Update to question format
- [ ] Lens → Update to question format
- [ ] AP → Update to question format

**Total Time**: 30 minutes
**Impact**: Projects framed as investigations, not just deliverables

---

## 📋 Recommended Implementation Order

### Priority 1: Foundation (Required)
1. ✅ Phase 1: Theme Definition (COMPLETE)
2. ⏳ Phase 2: Core Component Theme (3 hours)
3. ⏳ Phase 3: Page Component Theme (2 hours)
4. ⏳ Phase 4: Theme Toggle (3 hours)
5. ⏳ Phase 5: Testing & Refinement (4 hours)

**Subtotal**: 12 hours

---

### Priority 2: Quick Wins (Highest ROI)
6. Enhancement 5: Hero State Pre-Warming (30 min) ⭐
7. Enhancement 8: Varied Border Thickness (45 min) ⭐
8. Enhancement 10: Question-Driven Titles (30 min) ⭐

**Subtotal**: 1.75 hours

---

### Priority 3: High Impact Enhancements
9. Enhancement 1: Route-Reactive Shader (3 hours) ⭐⭐⭐
10. Enhancement 6: Active Void Hollow Box (2.5 hours) ⭐⭐
11. Enhancement 3: Choreographic Inertia (1.5 hours) ⭐⭐

**Subtotal**: 7 hours

---

### Priority 4: Polish & Depth (Optional)
12. Enhancement 2: Harmonic Oscillators (1.5 hours)
13. Enhancement 7: Graduated Blur (1 hour)
14. Enhancement 9: Philosophy About Page (1 hour)

**Subtotal**: 3.5 hours

---

### Priority 5: Advanced (If Time Permits)
15. Enhancement 4: Cursor Light Trails (4 hours)

---

## 🎯 Recommended Approach

### **OPTION A: MVP + Quick Wins** (13.75 hours)
- Do Priority 1 (Foundation) + Priority 2 (Quick Wins)
- Result: Dark/light mode working + immediate visual improvements
- Good for: Getting something deployed quickly

### **OPTION B: Foundation + High Impact** (20 hours)
- Do Priority 1 + Priority 2 + Priority 3
- Result: Theme + transformative shader/void enhancements
- Good for: Maximum impact without excessive time

### **OPTION C: Full Enhancement Suite** (24.5 hours)
- Do Priority 1 through Priority 4
- Result: Comprehensive upgrade with deep sophistication
- Good for: Portfolio redesign with research-backed depth

### **OPTION D: Everything** (28.5 hours)
- Do all priorities including cursor trails
- Result: Every research insight implemented
- Good for: Ultimate portfolio transformation

---

## 🔄 Using the Workflow System

### For Foundation (Priority 1)
**Use**: `/engineer` slash command for each task
- Each task is straightforward implementation
- No need for full /workflow

### For Enhancements (Priority 2-5)
**Use**: Full `/workflow` for each enhancement
- Engineer agents handle implementation
- Researcher 1: Performance analysis
- Researcher 2: Documentation updates
- QA: Verify functionality

**Example Workflow Prompt**:
```
/workflow

Feature: Route-Reactive Shader States

Goal: Implement Saul Bass-inspired shader personalities per route

Agent Breakdown:
- Engineer 1: Create shader personality config system
- Engineer 2: Add shader uniforms and update system
- Engineer 3: Update GLSL fragment shader to use new uniforms
- Engineer 4: Implement smooth interpolation between states
- Researcher 1: Analyze bundle size impact and performance
- Researcher 2: Update COMPONENTS.md and CLAUDE.md
- QA: Test all routes, verify transitions, check 60fps performance
```

---

## 📊 Progress Tracking

Use the TodoWrite tool to track progress. Example structure:

```javascript
[
  { content: "Phase 2.1: Update App.jsx", status: "pending", activeForm: "Updating App.jsx" },
  { content: "Phase 2.2: Update sharedStyles.js", status: "pending", activeForm: "Updating sharedStyles.js" },
  // etc.
]
```

Update after each task completion to maintain progress visibility.

---

## 🎬 Next Steps

### To Start Foundation:
```
I'm ready to start Phase 2. Let's begin with updating App.jsx to use theme colors.
```

### To Start with Quick Wins First:
```
Let's start with the quick wins before doing the full theme implementation:
1. Hero State Pre-Warming (30 min)
2. Varied Border Thickness (45 min)
3. Question-Driven Project Titles (30 min)

Then we'll do the full theme system.
```

### To Use Full Workflow:
```
/workflow

Feature: Dark/Light Mode Theme System

Let's implement the complete theme foundation (Phases 2-5) using the 7-agent workflow.
```

---

## 📝 Documentation Updates Required

After implementation, update:
1. **CLAUDE.md** - Add dark/light mode feature
2. **COMPONENTS.md** - Document theme usage patterns
3. **KNOWN_ISSUES.md** - Remove color-related issues
4. **README.md** - Add theme toggle screenshot

---

**Document Version**: 1.0
**Created**: 2025-11-21
**Next Review**: After Phase 1 completion
**Maintained By**: Claude Code + Johnny Sheng
