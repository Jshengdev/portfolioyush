# VISION CAPTURE WORKFLOW
## From Raw Ideas → LLM-Developable Specifications

**Purpose:** Transform freeform creative vision into structured, unique, implementable shader experiments.

**Philosophy:** Like the [Red String of Fate](https://en.wikipedia.org/wiki/Red_thread_of_fate) from East Asian mythology—an invisible thread that connects destined souls, stretching and tangling but never breaking—this document captures the invisible threads of your creative vision and makes them visible, traceable, implementable.

---

## PHASE 1: VISION EXCAVATION
### The "Yap Session"

*Let the user speak freely. Capture everything. Judge nothing.*

---

### 1.1 THE SPARK
**What made you want to create this?**

> *Prompt the user:*
> - "Describe the moment or image that sparked this idea"
> - "What feeling hit you first?"
> - "Was it triggered by something you saw, heard, experienced?"

**Capture verbatim:**
```
[USER'S RAW RESPONSE HERE]
```

**Extracted seeds:**
- Trigger:
- Feeling:
- Source:

---

### 1.2 THE FEELING
**What emotion or atmosphere should this create?**

> *Prompt the user:*
> - "If someone sees this, what should they feel in their body?"
> - "Is it calming or energizing? Eerie or comforting? Nostalgic or futuristic?"
> - "What music would play in the background?"

**Capture verbatim:**
```
[USER'S RAW RESPONSE HERE]
```

**Extracted atmosphere:**
- Primary emotion:
- Secondary tension:
- Sonic equivalent:

---

### 1.3 THE REFERENCE CONSTELLATION
**What existing things feel adjacent?**

> *Prompt the user:*
> - "Name 3 things (art, films, games, experiences) that have a similar vibe"
> - "What do they share? What's the common thread?"
> - "What would you steal from each?"

**Capture verbatim:**
```
[USER'S RAW RESPONSE HERE]
```

**Reference map:**
| Reference | What to steal | What to avoid |
|-----------|---------------|---------------|
| 1.        |               |               |
| 2.        |               |               |
| 3.        |               |               |

---

### 1.4 THE RED STRING
**What connects this to your larger body of work?**

> *Prompt the user:*
> - "How does this relate to your portfolio's philosophy?"
> - "What thread runs through your other experiments that this continues?"
> - "Is this extending something or breaking from it?"

**Reference:** Your portfolio DNA from [RESEARCH_AGENT_8](../research/RESEARCH_AGENT_8_PORTFOLIO_STRATEGIES.md):
- Core belief: "People thrive when they connect, not specialize"
- Methodology: Translation between technical and human worlds
- Voice: Stream-of-consciousness, vulnerability, process-forward

**Capture verbatim:**
```
[USER'S RAW RESPONSE HERE]
```

**Connection identified:**
- Extends theme of:
- Breaks from:
- New territory:

---

### 1.5 THE ANTI-VISION
**What is this definitely NOT?**

> *Prompt the user:*
> - "What would make this fail?"
> - "What similar things exist that you want to differentiate from?"
> - "What would make this feel generic or derivative?"

**Capture verbatim:**
```
[USER'S RAW RESPONSE HERE]
```

**Avoid list:**
- Must NOT be:
- Must NOT feel like:
- Must NOT remind of:

---

## PHASE 2: VISION TRANSLATION
### From Yap → Structure

---

### 2.1 CONCEPT DISTILLATION

**One-sentence essence:**
> [DISTILL USER'S VISION INTO ONE SENTENCE]

**Three-word tagline:**
> [WORD] + [WORD] + [WORD]

**The "what if" question:**
> "What if [VISUAL ELEMENT] could [DO SOMETHING UNEXPECTED]?"

---

### 2.2 VISUAL VOCABULARY

Based on user's descriptions, map to shader language:

| User Said | Visual Translation | Technique |
|-----------|-------------------|-----------|
| "[feeling word]" | [visual equivalent] | [shader technique] |
| "[reference]" | [extractable element] | [how to implement] |
| "[anti-example]" | [what to avoid] | [alternative approach] |

**Dominant visual elements:**
1.
2.
3.

**Movement quality:**
- Speed: [slow/medium/fast/variable]
- Flow: [smooth/jerky/organic/mechanical]
- Direction: [expanding/contracting/circular/chaotic]

**Color intention:**
- Palette mood:
- Temperature: [warm/cool/neutral/shifting]
- Saturation: [muted/vivid/monochrome]

---

### 2.3 UNIQUENESS AUDIT

**Check against existing experiments:**

| Experiment | Similarity Risk | Differentiation Strategy |
|------------|-----------------|--------------------------|
| v1 Aurora  | [high/medium/low/none] | |
| v2 Fog     | [high/medium/low/none] | |
| v3 Bloom   | [high/medium/low/none] | |
| v4 Liquid  | [high/medium/low/none] | |
| v5 Waves   | [high/medium/low/none] | |
| v6 Void    | [high/medium/low/none] | |
| v7 Scan    | [high/medium/low/none] | |
| v8 Web     | [high/medium/low/none] | |
| v9 Lines   | [high/medium/low/none] | |
| v10 Builder | [high/medium/low/none] | |
| v11 Halftone | [high/medium/low/none] | |
| v12-v20    | [assess based on current] | |

**Unique value proposition:**
> "This experiment is the ONLY one that [UNIQUE QUALITY]"

---

## PHASE 3: IMPLEMENTATION SPECIFICATION
### LLM-Readable Development Brief

---

### 3.1 THE SPECIFICATION

```yaml
experiment_id: v[XX]
name: "[NAME]"
tagline: "[THREE WORDS]"

concept:
  one_sentence: "[DISTILLED ESSENCE]"
  what_if: "[WHAT IF QUESTION]"

emotional_target:
  primary: "[EMOTION]"
  secondary: "[TENSION]"
  atmosphere: "[ADJECTIVE] [ADJECTIVE] [NOUN]"

visual_elements:
  dominant:
    - element: "[VISUAL 1]"
      technique: "[SHADER TECHNIQUE]"
    - element: "[VISUAL 2]"
      technique: "[SHADER TECHNIQUE]"
    - element: "[VISUAL 3]"
      technique: "[SHADER TECHNIQUE]"

  movement:
    speed: "[slow/medium/fast/variable]"
    flow: "[smooth/jerky/organic/mechanical]"
    direction: "[pattern]"

  color:
    palette: "[DESCRIPTION]"
    temperature: "[warm/cool/shifting]"
    key_colors:
      - "[HEX or description]"
      - "[HEX or description]"
      - "[HEX or description]"

boundaries:
  this_is:
    - "[WHAT IT IS 1]"
    - "[WHAT IT IS 2]"
    - "[WHAT IT IS 3]"

  this_is_not:
    - "[WHAT IT ISN'T 1]"
    - "[WHAT IT ISN'T 2]"
    - "[WHAT IT ISN'T 3]"

  differentiates_from:
    - experiment: "v[X]"
      how: "[DIFFERENTIATION]"

research_required:
  codebase:
    - file: "[PATH]"
      reason: "[WHAT TO LEARN]"
  external:
    - source: "[URL or description]"
      reason: "[WHAT TO EXTRACT]"

red_string_connection:
  portfolio_theme: "[HOW IT CONNECTS]"
  extends: "[WHAT IT BUILDS ON]"
  innovates: "[WHAT'S NEW]"

technical_hints:
  suggested_techniques:
    - "[TECHNIQUE 1]"
    - "[TECHNIQUE 2]"
  avoid_techniques:
    - "[TECHNIQUE TO AVOID]"
  performance_notes: "[CONSIDERATIONS]"

success_criteria:
  - "[CRITERION 1]"
  - "[CRITERION 2]"
  - "[CRITERION 3]"
```

---

### 3.2 THE PROMPT

**Copy-paste this to start development:**

```
Read src/components/experiments/v[XX]/index.jsx

Then implement this vision:

CONCEPT: [ONE SENTENCE]
FEELING: [PRIMARY EMOTION] with [SECONDARY TENSION]
LOOK: [VISUAL DESCRIPTION]

THIS IS:
- [WHAT IT IS 1]
- [WHAT IT IS 2]

THIS IS NOT:
- [WHAT IT ISN'T 1]
- [WHAT IT ISN'T 2]

RESEARCH FIRST:
- Check [SIMILAR EXPERIMENT] for [TECHNIQUE]
- Search Shadertoy for "[KEYWORD]"

UNIQUE BECAUSE: [DIFFERENTIATION]
```

---

## PHASE 4: VALIDATION
### "Is this the best solution for your vision?"

---

### 4.1 REFLECTION QUESTIONS

Present back to user:

1. **Accuracy Check:**
   > "I heard your vision as: [SUMMARY]. Does this capture it?"

2. **Feeling Check:**
   > "The primary emotion I'm targeting is [EMOTION]. Is that right, or is there a deeper layer?"

3. **Uniqueness Check:**
   > "This differentiates from existing work by [DIFFERENTIATION]. Does that feel meaningfully different?"

4. **Feasibility Check:**
   > "This requires [TECHNIQUES]. Are there any constraints I should know about?"

5. **Red String Check:**
   > "This connects to your larger work through [CONNECTION]. Does that thread feel authentic?"

---

### 4.2 ITERATION PROMPT

If user says "not quite":

> "Tell me more. What's missing? What's off? Let's dig deeper."

Capture additional yapping, return to Phase 1, refine.

---

### 4.3 FINAL CONFIRMATION

When user confirms:

> "Perfect. Here's your development-ready specification. The next LLM session just needs to read this and the experiment template to begin implementation."

Save final spec to: `docs/experiments/v[XX]/VISION.md`

---

## APPENDIX: QUESTION BANK

### For Stuck Users

**Spark questions:**
- "Close your eyes. What do you see?"
- "If this was a place, where would it be?"
- "What time of day is it in this world?"

**Feeling questions:**
- "Fast or slow?"
- "Loud or quiet?"
- "Comforting or unsettling?"
- "Ancient or futuristic?"

**Reference questions:**
- "What movie scene has this vibe?"
- "What album cover looks like this?"
- "What video game world feels similar?"

**Anti-vision questions:**
- "What's the obvious, boring version of this idea?"
- "What would a lazy AI generate?"
- "What's been done to death?"

**Red string questions:**
- "Why does this matter to YOU specifically?"
- "What does this say about how you see the world?"
- "How does this connect to [previous project]?"

---

## APPENDIX: RED STRING OF FATE CONTEXT

From [Japanese mythology](https://japanese.mythologyworldwide.com/the-legend-of-the-red-string-fate-and-connection/):

> "Two people who are destined to be together are connected by an invisible red thread tied around their ankles. This thread may stretch or tangle, but it will never break."

**Applied to creative work:**
- Your experiments are connected by invisible threads
- The thread stretches across mediums (film, code, design)
- The thread tangles (non-linear exploration)
- The thread never breaks (consistent philosophy)

**In portfolio context:**
- Each experiment should feel connected to the whole
- The "red string" is your core belief: "People thrive when they connect"
- Every shader visualizes some aspect of connection, translation, or bridging

---

## USAGE

### For a new experiment:

1. Create `docs/experiments/v[XX]/` folder
2. Run through Phase 1-3 with user
3. Save final spec as `docs/experiments/v[XX]/VISION.md`
4. User starts new LLM session with:
   ```
   Read docs/experiments/v[XX]/VISION.md
   Read src/components/experiments/v[XX]/index.jsx
   Implement the vision.
   ```

### For vision refinement:

1. Read existing `VISION.md`
2. Return to Phase 1 questions
3. Update specification
4. Re-validate with user

---

**Document Version:** 1.0
**Created:** 2025-11-29
**Integrates:**
- [RESEARCH_AGENT_8_PORTFOLIO_STRATEGIES.md](../research/RESEARCH_AGENT_8_PORTFOLIO_STRATEGIES.md)
- [Red String of Fate mythology](https://en.wikipedia.org/wiki/Red_thread_of_fate)
- Experiment template philosophy
