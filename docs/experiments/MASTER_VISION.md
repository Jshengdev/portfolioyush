# MASTER VISION
## The Creative Manifesto for All Shader Experiments

**Status:** CAPTURED & REFINED - Vision Session 2025-11-29
**Purpose:** Define the overarching creative direction, visual identity, and philosophical goals that guide ALL experiments (v21-v30 and beyond).

---

## CRITICAL WORKFLOW RULE

> **Every experiment MUST have an inspiration element guiding it.**
> **Never start from scratch. Always have a reference image, artist, technique, or existing shader to draw from.**

This is non-negotiable. Before coding ANY experiment:
1. User provides reference/inspiration
2. LLM reads this MASTER_VISION.md
3. LLM researches codebase for similar techniques
4. LLM searches external sources if needed (Shadertoy, etc.)
5. Implementation guided by vision + specific reference

---

## HOW TO USE THIS DOCUMENT

Every experiment template should reference this document. When developing any experiment:

```
1. Read this MASTER_VISION.md first (understand the whole)
2. Read the specific experiment's index.jsx (understand the part)
3. Ensure the experiment serves the master vision
```

---

## PART 1: THE WHY
### What are these experiments trying to achieve?

**End Goal:**
> These experiments are R&D for the ultimate portfolio experience—finding textures, interactions, and visual techniques that will combine into an interactive, museum-grade portfolio that hasn't been done before.

**The Grand Vision:**
> The cursor IS the red string of fate. Homepage features a hand with shader textures blending into the background. When you wrap your cursor around the fingers, it locks on. Pull, and the red string drags you to the next page—through different walks of life (film, design, code). Each section is an experiential, interactive 3JS journey that feels 3D but is built with 2D elements.

**Technical Approach - Hand Animation:**
> **Hybrid approach**: Depth map + parallax as the BASE layer → shader-generated elements layered ON TOP. This creates literal depth from the depth map while shader techniques add surface texture and visual interest.

**Color Strategy:**
> - **Homepage accent:** RED (literal red string of fate)
> - **Section accents:** FLUID/UNDEFINED - each section gets its own bold accent color, growing organically over time
> - **Base:** Always BLACK & WHITE foundation

**Section Structure:**
> Sections are fluid and adaptive—not pre-defined. They grow over time as new walks of life are added. Current sections: film, design, code. Future sections emerge naturally.

**Success looks like:**
- Award-winning portfolio website
- Changes how portfolio websites are viewed
- Museum-grade, "this has never been done before" reaction
- Showcases 3JS in unconventional ways
- Each experiment feeds into this larger vision

**This matters because:**
> This is my story, told through interactive visuals. The red string connects every walk of my life. If someone wants, they can zoom out and see the entirety—scroll through different aspects, different places.

---

## PART 2: THE WHAT
### What is the visual identity?

**Visual Language:**
> Black and white foundation + ONE bold highlight color. Clean but textured. Modern minimalism meets retro aesthetics.

**Signature Elements:**
- Shaders and texture (not flat, not generic)
- Lens/depth visual that mimics 3D using 2D
- Liquid glass morphism
- Clean lines, clean UI
- Contrast-driven (B&W as base)
- One bold accent color

**The Formula:**
> MODERNISM (liquid glass, morphism, 3D clean lines, clean UI) + RETRO MINIMAL (textured, considered, restrained)

**Consistent Qualities:**
- Very clear, not blurry
- Very atmospheric
- Very intricate, not surface-level
- 3D feeling without 3D elements
- Planned, smooth movement
- Unique animations

**The "Feel":**
> Imagine animating this in After Effects—different scenes, different shots, different styles—but it all comes together as one cohesive, cinematic piece.

---

## PART 3: THE HOW
### How should experiments be made?

**Process Philosophy:**
> Each experiment explores a specific texture, technique, or interaction that could be used in the final portfolio. They're building blocks, not standalone pieces.

**Experiment Focus Areas (v21-v30):**

Decide per experiment—no pre-assigned phases. Master vision guides each. Areas to explore:

| Priority | Focus Area | Examples |
|----------|------------|----------|
| 1st | **Textures/Surfaces** | Dithers, halftones, ASCII, grain, creative shader styles |
| 2nd | **Depth Techniques** | 2D feeling like 3D (After Effects style), parallax, lens effects |
| 3rd | **Interactions** | Cursor wrapping, pulling, affecting visuals |
| Wild | **Unique Concepts** | Stretch creatively but follow IS/IS NOT boundaries |

**Organization:**
> Each experiment is decided individually. No predetermined "phases" or "themes" for v21-v30. The master vision provides the consistent thread—individual experiments explore specific techniques within that vision.

**Technical Approach:**
- Push 3JS in unconventional ways
- Mimic 3D depth using 2D shader techniques
- Cursor interactivity is key
- Lens effects, atmospheric depth
- Clean execution, intricate detail

**Quality Bar:**
> Museum-grade. If it looks like "just another Shadertoy shader," it's not done.

---

## PART 4: THE BOUNDARIES
### What this IS and IS NOT

**THIS IS:**
- Intricate and detailed
- Clear and crisp (not blurry)
- Atmospheric and immersive
- 3D feeling using 2D techniques
- Interactive and cursor-aware
- Part of a larger narrative (red string)
- Combination of multiple styles (modern + retro)
- Black/white + one bold color
- Planned, smooth, cinematic movement

**THIS IS NOT:**
- Generic "slap one shader and call it a day"
- Blurry or unfocused
- Surface-level decoration
- Actual 3D models (we mimic depth with 2D)
- Random Shadertoy copy-paste
- Single-style (it combines styles)
- Colorful rainbow gradients (minimal palette)
- Jerky or unplanned animation

**Differentiates from other shader artists by:**
> The combination of different styles together—modern glass morphism meets retro minimal, 2D that feels 3D, interactive cursor as narrative device (red string), cinematic planning like After Effects sequences.

---

## PART 5: THE RED STRING
### The invisible thread connecting all experiments

**Core Philosophy:**
> The red string of fate connects all walks of life—film, design, code. The cursor IS this red string. As you navigate, you're pulling the thread through my story.

**Every experiment should:**
- Serve the larger portfolio vision
- Be potentially usable in the final interactive experience
- Explore a specific technique that could combine with others
- Feel like it belongs to the same visual universe
- Consider cursor interaction possibilities

**The thread that runs through:**
> Each experiment is a scene, a texture, a technique—pieces that will weave together into the final tapestry. The red string connects them all.

---

## PART 6: THE PRACTICAL
### Constraints and Considerations

**Technical constraints:**
- Must work in browser (WebGL/3JS)
- Performance matters (smooth 60fps)
- 2D shader techniques (not 3D models)
- Cursor interaction capability

**Integration with portfolio:**
- Homepage: Hand with shader textures
- Cursor: Red string of fate
- Navigation: Pull the string to travel
- Sections: Different walks of life
- Easter egg: Zoom out to see the whole

**Future implementation vision:**
1. Hand hero with shader textures
2. Cursor wraps around fingers → locks
3. Pull gesture → red string extends
4. String pulls you to next section
5. Each section = different visual treatment
6. Option to zoom out, see everything

---

## CAPTURED VISION SESSION

**Date:** 2025-11-29
**Raw transcript:**

```
These shader experiments are really just ways of how to visually make my web thing
look really interesting. Currently, the idea I want to play with is my cursor being
the red string of fate, and then having different hero sections that are more of an
experiential, interactive type of 3JS experience where we try to replicate the
feeling that it's in 3D space because there's a lens visual to it.

It is internally something that can show different visuals of each aspect of or
each walk of my life.

The idea is having the initial home page be this hand with all these shader elements
and it blending into the background—that's what most of these experiences are:
finding out the textures on how to create them. If you do your own exploring, you
can figure it out.

Once I'm able to make these, the ideal is that I want to have your cursor be able
to interact with it. So if you do a very special action, like wrapping your cursor
around on the fingers of an initial hand, it'll lock on and it'll initialize a
visual sequence where you can pull on it and it'll bring you to the next page.
This is like the red string of fate dragging you along through each of these
visuals and walks of life.

It is about showcasing a lot of skill in terms of utilizing 3JS in ways that they
aren't normally being utilized, and I want to express these concepts and ideas in
a way where they almost feel like they're museum-grade and very cool and creative
and they have not been done before.

My signature style is a very black-and-white but using highlighting one very bold
color. I very much like the use of shaders and texture, so it should feel very
clean but it can have very retro elements. The idea is combining modernism and
modern designs feeling—modern being like liquid glass, morphism, 3D clean lines,
clean UI—with more retro but minimal feelings.

I do like playing with very minimal colors, making it very black-and-white, working
with contrast mainly, and making the movement of everything very planned, smooth
with lots of unique animations. But I wanted to also play into different feelings.

What makes it look specifically my shader and not anybody else's is the combination
of using different styles together. Basically imagine if I was working on this in
an After Effects project and animating these different scenes, different shots, and
styles, ultimately coming up with something really unique.

The red string does connect the different walks of life that I have: film design,
code, and all these other experiments. The belief is that this can be a very cool
project and change the way that portfolio websites are viewed, and they can be
placed as an award-winning website. I really want to push this idea of using the
space and creating somewhere it can make an interactive experience.

What are these experiences definitely not? It's definitely not generic; it's not a
normal just slap one shader element and call it a day. It's very intricate, it's
not very blurry, it's very clear, it's very atmospheric, and it's very 3D but it
doesn't use 3D elements—it mimics it all by using 2D elements and creating that
feeling.
```

---

## DISTILLED SPECIFICATION

LLM-readable spec for all experiments:

```yaml
master_vision:
  end_goal: "R&D for museum-grade interactive portfolio with cursor as red string of fate"

  critical_rule: "NEVER start from scratch. Every experiment MUST have inspiration guiding it."

  grand_narrative:
    concept: "Cursor is the red string of fate, pulling you through walks of life"
    homepage: "Hand with shader textures, cursor wraps fingers to initiate journey"
    hand_technique: "HYBRID - depth map + parallax as base layer, shader-generated elements on top"
    navigation: "Pull the string to travel between sections"
    sections: "Fluid/adaptive - grows over time (film, design, code, more)"
    easter_egg: "Zoom out to see the entire story"

  color_strategy:
    homepage_accent: "RED (literal red string)"
    section_accents: "Fluid/undefined - each section gets own bold color"
    base: "BLACK & WHITE foundation always"

  visual_identity:
    palette: "Black and white + ONE bold accent color"

    signature_elements:
      - "Shaders and texture (not flat)"
      - "Lens/depth that mimics 3D using 2D"
      - "Liquid glass morphism"
      - "Clean lines and UI"
      - "Contrast-driven"

    formula: "MODERNISM (glass, morphism, clean) + RETRO MINIMAL (textured, restrained)"

    consistent_qualities:
      - "Clear, not blurry"
      - "Atmospheric"
      - "Intricate, not surface-level"
      - "3D feeling without 3D elements"
      - "Planned, smooth movement"
      - "Cinematic (like After Effects sequences)"

  philosophy:
    core_belief: "The red string connects all walks of life (film, design, code)"
    every_experiment_should:
      - "Serve the larger portfolio vision"
      - "Be potentially usable in final experience"
      - "Explore a specific combinable technique"
      - "Feel like same visual universe"
      - "Consider cursor interaction"
      - "HAVE INSPIRATION - never start from scratch"
    the_red_string: "Each experiment is a piece that weaves into the final tapestry"

  focus_areas_v21_v30:
    organization: "Decide per experiment - no pre-assigned phases"
    priorities:
      - area: "Textures/Surfaces"
        examples: "Dithers, halftones, ASCII, grain, creative shader styles"
      - area: "Depth Techniques"
        examples: "2D feeling like 3D (After Effects style), parallax, lens effects"
      - area: "Interactions"
        examples: "Cursor wrapping, pulling, affecting visuals"
      - area: "Wild Concepts"
        examples: "Unique ideas that stretch creatively within IS/IS NOT boundaries"

  boundaries:
    this_is:
      - "Intricate and detailed"
      - "Clear and crisp"
      - "Atmospheric and immersive"
      - "3D feeling via 2D techniques"
      - "Interactive and cursor-aware"
      - "Part of larger narrative"
      - "Multi-style combination (modern + retro)"
      - "Minimal palette (B&W + one bold color)"
      - "Cinematic, planned movement"

    this_is_not:
      - "Generic single-shader decoration"
      - "Blurry or unfocused"
      - "Surface-level"
      - "Actual 3D models"
      - "Shadertoy copy-paste"
      - "Rainbow gradient colorful"
      - "Jerky or random animation"

    unique_because: "Combines modern glass morphism + retro minimal, 2D mimics 3D, cursor as narrative red string, cinematic After Effects planning"

  practical:
    tech_constraints:
      - "WebGL/Three.js browser-compatible"
      - "60fps performance"
      - "2D shader techniques (no 3D models)"
      - "Cursor interaction ready"

    quality_bar: "Museum-grade. If it looks like generic Shadertoy, it's not done."
```

---

## FOR INDIVIDUAL EXPERIMENTS

When developing v21-v30, each experiment should:

1. **Reference this vision** before coding
2. **Serve one purpose:** Explore a texture/technique for the final portfolio
3. **Follow the visual language:** B&W + bold accent, clear not blurry, 2D mimicking 3D
4. **Consider interaction:** How could cursor interact with this?
5. **Maintain quality bar:** Museum-grade or iterate more
6. **Connect to the whole:** This is one scene in a larger After Effects sequence

---

**Document Version:** 1.0
**Captured:** 2025-11-29
**Status:** COMPLETE - Ready for experiment development
