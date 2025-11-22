---
title: Adding Projects Guide
description: Step-by-step guide to add new project pages to the portfolio with assets, data, routing, and components
keywords: add project, new project, project page, routing, assets, components, tutorial, guide
---

# Adding Projects Guide

Complete step-by-step guide to add a new project to the portfolio.

## Overview

Adding a project involves 5 steps:
1. Add project data entry
2. Create assets folder and add images
3. Create project component
4. Add route in App.jsx
5. Test and verify

**Estimated time**: 30-45 minutes

---

## Step 1: Add Project Data

### Location
`/src/data/projectname.jsx`

### Add Entry

```javascript
export const projectParty = [
  // Existing projects...
  {
    id: 7,  // Increment from last ID
    title: "Your Project Name",
    description: "Brief one-sentence description",
    image: "/assets/YOUR_PROJECT/thumbnail.png"
  }
];
```

**Fields**:
- `id`: Sequential number (check last project's ID)
- `title`: Display name (used in routing - avoid special characters)
- `description`: Short tagline shown on Projects page
- `image`: Path to thumbnail (relative to /public)

**Example**:
```javascript
{
  id: 7,
  title: "Smart Garden",
  description: "IoT-powered automated garden system",
  image: "/assets/GARDEN/thumbnail.png"
}
```

---

## Step 2: Create Assets Folder

### Location
`/public/assets/`

### Create Folder

```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush/public/assets
mkdir YOUR_PROJECT  # Use UPPERCASE convention
```

**Naming Convention**: Use UPPERCASE (e.g., GROVE, ARK, CM)

### Add Images

**Required**:
- `thumbnail.png` - Preview image (for Projects page hover)

**Recommended**:
- `hero.png` - Large hero image
- `act1-*.png` - Images for Act I section
- `act2-*.png` - Images for Act II section
- `act3-*.png` - Images for Act III section
- `*.gif` - Animations/demos

**Optimization Tips**:
1. **Resize**: Max 1920px wide for photos
2. **Compress**: Use TinyPNG or ImageOptim
3. **Format**: PNG for graphics, JPG for photos, WebP for best compression
4. **Target**: < 2MB per image

**Example Structure**:
```
/public/assets/GARDEN/
├── thumbnail.png      (500KB)
├── hero.png           (1.2MB)
├── act1-prototype.png (800KB)
├── act2-final.png     (900KB)
├── demo.gif           (3MB)
└── mockup.png         (600KB)
```

---

## Step 3: Create Project Component

### Location
`/src/components/Projectfiles/`

### Use Template

**Copy existing project** as template (Grove.jsx is good reference):

```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush/src/components/Projectfiles
cp Grove.jsx YourProject.jsx
```

### Edit Component

```javascript
import React from "react";
import { motion } from "framer-motion";
import {
  Container2,
  Title,
  MetadataPanel,
  MetadataSection,
  MetadataLabel,
  MetadataValue,
  OverviewBox,
  ProblemSolutionWrapper,
  ProblemBox,
  SolutionBox,
  SideBySideWrapper,
  TextColumn,
  ImageColumn,
  ChapterCard,
  Bold
} from "../sharedStyles";
import NextProject from "../NextProject";
import { projectParty } from "../../data/projectname";

function YourProject() {
  // Find current project in data
  const currentProject = projectParty.find(p => p.id === 7);  // Your project ID

  // Find next project (circular)
  const nextProject = projectParty[(projectParty.indexOf(currentProject) + 1) % projectParty.length];

  // Animation variant
  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Container2>
        <Title>Your Project Name</Title>
      </Container2>

      {/* Metadata */}
      <MetadataPanel
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <MetadataSection>
          <MetadataLabel>ROLE</MetadataLabel>
          <MetadataValue>Designer, Developer</MetadataValue>
        </MetadataSection>
        <MetadataSection>
          <MetadataLabel>TIMELINE</MetadataLabel>
          <MetadataValue>Jan 2024 - Mar 2024</MetadataValue>
        </MetadataSection>
        <MetadataSection>
          <MetadataLabel>SKILLS</MetadataLabel>
          <MetadataValue>React, IoT, Figma, Arduino</MetadataValue>
        </MetadataSection>
      </MetadataPanel>

      {/* Overview */}
      <OverviewBox
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <h2>OVERVIEW</h2>
        <p>
          Brief project summary. What was the goal? What did you build?
          Keep it 2-3 sentences.
        </p>
      </OverviewBox>

      {/* Problem & Solution */}
      <ProblemSolutionWrapper
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <ProblemBox>
          <h2>THE PROBLEM</h2>
          <p>
            Describe the problem or challenge. What were users struggling with?
          </p>
        </ProblemBox>
        <SolutionBox>
          <h2>THE SOLUTION</h2>
          <p>
            How did your project solve the problem? What was your approach?
          </p>
        </SolutionBox>
      </ProblemSolutionWrapper>

      {/* ACT I - Research/Discovery */}
      <SideBySideWrapper
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <TextColumn>
          <h2>ACT I</h2>
          <h3>
            <Bold>Research & Discovery</Bold>
          </h3>
          <p>
            Describe your research phase. What did you learn?
            Include user interviews, competitive analysis, etc.
          </p>
        </TextColumn>
        <ImageColumn>
          <img src="/assets/GARDEN/act1-research.png" alt="Research" />
        </ImageColumn>
      </SideBySideWrapper>

      {/* ACT II - Design/Development */}
      <SideBySideWrapper
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <TextColumn>
          <h2>ACT II</h2>
          <h3>
            <Bold>Design & Development</Bold>
          </h3>
          <p>
            Describe your design process. What iterations did you go through?
            Include wireframes, prototypes, technical decisions.
          </p>
        </TextColumn>
        <ImageColumn>
          <img src="/assets/GARDEN/act2-design.png" alt="Design" />
        </ImageColumn>
      </SideBySideWrapper>

      {/* ACT III - Implementation/Results */}
      <SideBySideWrapper
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <TextColumn>
          <h2>ACT III</h2>
          <h3>
            <Bold>Implementation & Results</Bold>
          </h3>
          <p>
            Describe final implementation. What were the results?
            Include metrics, user feedback, lessons learned.
          </p>
        </TextColumn>
        <ImageColumn>
          <img src="/assets/GARDEN/act3-final.png" alt="Final Product" />
        </ImageColumn>
      </SideBySideWrapper>

      {/* Reflections */}
      <ChapterCard
        as={motion.div}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <h2>REFLECTIONS</h2>
        <p>
          What did you learn from this project? What would you do differently?
          What are you most proud of?
        </p>
      </ChapterCard>

      {/* Next Project Widget */}
      <NextProject currentProject={currentProject} nextProject={nextProject} />
    </>
  );
}

export default YourProject;
```

### Component Checklist

- [ ] Update project ID in `currentProject` find
- [ ] Replace title in `<Title>` component
- [ ] Update metadata (role, timeline, skills)
- [ ] Write overview text
- [ ] Write problem and solution text
- [ ] Write Act I, II, III sections
- [ ] Update all image paths (`/assets/YOUR_PROJECT/...`)
- [ ] Add alt text to all images
- [ ] Write reflections section
- [ ] Verify NextProject widget included

---

## Step 4: Add Route

### Location
`/src/App.jsx`

### Import Component

Add to imports (around line 20-40):

```javascript
import YourProject from './components/Projectfiles/YourProject';
```

**Tip**: Use React.lazy() for code splitting:
```javascript
const YourProject = React.lazy(() => import('./components/Projectfiles/YourProject'));
```

### Add Route

Add in `<Routes>` section (around line 100-150):

```javascript
<Route
  path="/projects/YourProjectName"  // Match title from projectname.jsx (no spaces)
  element={
    <PageWrapper>
      <YourProject />
    </PageWrapper>
  }
/>
```

**Route Formatting**:
- Remove spaces from project title
- Example: "Smart Garden" → `/projects/SmartGarden`
- Case-sensitive (use PascalCase)

**Full Example**:
```javascript
// In imports
const SmartGarden = React.lazy(() => import('./components/Projectfiles/SmartGarden'));

// In Routes
<Route
  path="/projects/SmartGarden"
  element={
    <PageWrapper>
      <SmartGarden />
    </PageWrapper>
  }
/>
```

---

## Step 5: Test and Verify

### 1. Start Dev Server

```bash
yarn dev
```

Visit: http://localhost:3000

### 2. Check Projects Page

Navigate to `/projects`

**Verify**:
- [ ] New project appears in list
- [ ] Hover shows preview image
- [ ] Click navigates to project page

### 3. Check Project Page

Navigate to `/projects/YourProjectName`

**Verify**:
- [ ] Page loads without errors
- [ ] Title displays correctly
- [ ] All images load
- [ ] Scroll animations work
- [ ] NextProject widget appears
- [ ] NextProject click navigates correctly

### 4. Check Navigation

**Test sequence**:
1. Home → Projects → Your Project ✅
2. Your Project → Next Project (via widget) ✅
3. Browser back button ✅
4. Direct URL: `/projects/YourProjectName` ✅

### 5. Check Console

Open DevTools (F12) → Console

**Should be clean** (no errors or warnings)

**Common errors**:
- 404 for images → Check image paths
- Component not found → Check import/export
- Route not matching → Check URL formatting

---

## Common Issues & Solutions

### Image Not Loading

**Problem**: 404 error in console

**Solutions**:
1. **Check path**: Use `/assets/` not `/public/assets/`
2. **Check spelling**: Case-sensitive, check exact filename
3. **Check file exists**: Verify file is in `/public/assets/YOUR_PROJECT/`

**Example**:
```javascript
// Correct
<img src="/assets/GARDEN/hero.png" alt="Garden" />

// Incorrect
<img src="/public/assets/GARDEN/hero.png" alt="Garden" />
<img src="/assets/garden/hero.png" alt="Garden" />  // Case mismatch
```

### Route Not Working

**Problem**: 404 or blank page

**Solutions**:
1. **Check route path**: Must match URL exactly
2. **Check import**: Component imported correctly
3. **Check export**: Component exported as default
4. **Check capitalization**: Route is case-sensitive

**Debugging**:
```javascript
// In App.jsx, add console log
<Route path="/projects/SmartGarden" element={
  <PageWrapper>
    {console.log('SmartGarden route hit')}
    <SmartGarden />
  </PageWrapper>
} />
```

### Project Not in List

**Problem**: Doesn't appear on Projects page

**Solutions**:
1. **Check data file**: Entry added to `projectname.jsx`?
2. **Check ID**: Must be unique, sequential
3. **Check syntax**: Valid JavaScript object

**Verify**:
```javascript
// In projectname.jsx
export const projectParty = [
  // ... existing projects
  { id: 7, title: "...", description: "...", image: "/assets/..." },  // Comma!
];
```

### NextProject Widget Not Working

**Problem**: Widget doesn't appear or crashes

**Solutions**:
1. **Check currentProject**: Verify `find` returns project
2. **Check projectParty import**: Import statement present
3. **Check ID**: ID in data matches ID in `find`

**Debugging**:
```javascript
const currentProject = projectParty.find(p => p.id === 7);
console.log('Current Project:', currentProject);  // Should log object, not undefined
```

---

## Advanced: Using GIFs and Videos

### GIFs

**Usage**:
```javascript
import { GifContainer } from "../sharedStyles";

<GifContainer>
  <img src="/assets/GARDEN/demo.gif" alt="Demo" />
</GifContainer>
```

**Optimization**:
- Use tools like ezgif.com to compress
- Target < 5MB per GIF
- Consider converting to video (better compression)

### Videos (MP4)

**Usage**:
```javascript
<video controls loop muted autoPlay>
  <source src="/assets/GARDEN/demo.mp4" type="video/mp4" />
</video>
```

**Note**: `.MOV` files are gitignored (too large). Convert to `.mp4` or `.webm`

---

## Checklist Summary

**Before committing**:

- [ ] Project data added to `projectname.jsx` with unique ID
- [ ] Assets folder created in `/public/assets/YOUR_PROJECT/`
- [ ] All images added and optimized (< 2MB each)
- [ ] Component created in `/src/components/Projectfiles/`
- [ ] Component imports sharedStyles components
- [ ] All text content written (overview, acts, reflections)
- [ ] All image paths correct (`/assets/YOUR_PROJECT/...`)
- [ ] Component imported in App.jsx
- [ ] Route added in App.jsx with correct path
- [ ] Tested on Projects page (hover preview works)
- [ ] Tested project detail page (all sections load)
- [ ] Tested NextProject widget (navigation works)
- [ ] No console errors
- [ ] Animations working on scroll

**After verification**:

```bash
git add .
git commit -m "Add [Project Name] to portfolio"
git push
```

---

## Example: Full Workflow

**Add "Smart Garden" project**:

1. **Data** (`projectname.jsx`):
```javascript
{ id: 7, title: "Smart Garden", description: "IoT garden", image: "/assets/GARDEN/thumb.png" }
```

2. **Assets** (`/public/assets/GARDEN/`):
```
thumb.png, hero.png, act1.png, act2.png, act3.png, demo.gif
```

3. **Component** (`SmartGarden.jsx`):
```javascript
import ... // imports
function SmartGarden() { ... }
export default SmartGarden;
```

4. **Route** (`App.jsx`):
```javascript
const SmartGarden = React.lazy(() => import('./components/Projectfiles/SmartGarden'));
<Route path="/projects/SmartGarden" element={<PageWrapper><SmartGarden /></PageWrapper>} />
```

5. **Test**: Visit `/projects`, click "Smart Garden", verify page loads

**Done!** 🎉

---

## See Also

- [File Locations Reference](../reference/FILE_LOCATIONS.md) - File paths
- [Components Reference](../reference/COMPONENTS.md) - sharedStyles components
- [Assets Reference](../reference/ASSETS.md) - Asset optimization
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues

---

**Estimated time to add a project**: 30-45 minutes (excluding asset creation)
