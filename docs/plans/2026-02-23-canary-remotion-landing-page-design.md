# Canary Landing Page Rebuild + Remotion Demo

**Date**: 2026-02-23
**Status**: Approved
**Scope**: Full landing page restructure with embedded Remotion product demo and GSAP scroll animations

---

## Overview

Rebuild the Canary landing page into a 7-beat story arc with:
1. An embedded Remotion Player replacing the HeroDemo as the hero centerpiece
2. GSAP ScrollTrigger animations on every section
3. Counter animations, typing effects, and stagger reveals
4. A new standalone "Consequence" section for the 70% stat
5. Market + CTA + Footer merged into a single "Invitation" section

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Demo format | Remotion Player embedded in landing page | Interactive, lazy-loadable, iterates with hot reload |
| Animation library | GSAP + ScrollTrigger | Already installed, used in Blickey, precise timeline control |
| Page structure | Full restructure (7-beat arc) | Follows YC landing page research + show-don't-tell storytelling |
| Demo placement | Replaces HeroDemo in hero section | Most impactful position, first thing visitors see |
| Build approach | Unified (parallel workstreams) | Remotion scenes and scroll animations built simultaneously |

## New Dependencies

```
remotion@4.0.x            # ~50-80KB minified
@remotion/player@4.0.x    # ~30-50KB minified
```

Total bundle impact: ~25-40KB gzipped

## 7-Beat Page Structure

### Beat 1: HERO (0-100vh)
- Remotion Player auto-plays, loops, no visible controls
- Title: "See what your agents actually do."
- Subtitle: "Current eval tools check what agents say. Canary watches what they do."
- CTA buttons below player
- Dither canvas background

### Beat 2: THE INVISIBLE PROBLEM (~70vh)
- Desktop window with ghost agents acting silently
- Ghost badges [UNOBSERVED] float around
- GSAP: window slides up, badges stagger in, error block bounces
- Trigger: top 75%

### Beat 3: THE CONSEQUENCE (~60vh) [NEW]
- Standalone full-viewport stat: "70%" counting up from 0
- Supporting text: "of AI agents fail at real-world tasks"
- Maximum whitespace, centered, high impact
- GSAP: counter 0->70 over 2s, text fades in after

### Beat 4: THE SOLUTION (~80vh)
- Code snippet types itself: `npm install @canary/sdk` + config
- NotifCards slide in from right as each code line completes
- Red BLOCKED card appears last with shake
- GSAP: triggered at top 70%, ~8-10s full sequence

### Beat 5: THE EVIDENCE (~60vh)
- 4 step cards: CONNECT -> RUNS -> OBSERVED -> SURFACED
- SVG connecting line draws between them
- Example NotifCard fades in below
- GSAP: 200ms stagger + line draw 1s

### Beat 6: THE SCALE (~70vh)
- Live feed ticker (existing useLiveFeedTicker)
- GSAP: headline slides in, feed container fades in
- Ticker auto-cycles once visible

### Beat 7: THE INVITATION (~80vh) [NEW - merges Market + CTA + Footer]
- Market stats with counter animations ($7.6B->$183B, 93%, 14.4%)
- CTA: "Help us make agents trustworthy."
- Email signup
- Footer branding
- GSAP: counters triggered at top 70%

## Remotion Demo (5 Scenes, 30s at 30fps)

### Scene 1: Intro (frames 0-89, 3s)
- Dark background
- Canary logo fades in with spring animation
- Tagline types: "QA for computer-use AI agents."
- Pulsing green status dot

### Scene 2: Terminal (frames 90-239, 5s)
- macOS terminal window slides up (spring)
- `$ npm install @canary/sdk` types at 2 chars/frame
- Success output appears
- 3-line canary.observe() config types in

### Scene 3: Agent Session (frames 240-539, 10s)
- Split view layout
- Left: simulated Slack-like app with agent cursor
  - Cursor moves to message, highlights it (ripple + scan)
  - Types reply, clicks send
  - Navigates to new tab
- Right: NotifCard stream
  - Green OBSERVED cards slide in with spring physics
  - Amber FLAGGED card for off-task navigation
- Bottom: session timeline progress bar fills

### Scene 4: QA Report (frames 540-779, 8s)
- Dashboard view zooms in (scale spring)
- Stats count up staggered (8 frame delay between):
  - 47 Total Tests
  - 44 Passed (green)
  - 3 Failed (red)
  - 94% Coverage
- Session timeline with 5 steps plays through (progress bars)
- Pass/fail badges spring in

### Scene 5: Close (frames 780-899, 4s)
- Everything fades to dark
- "See what your agents actually do." types in centered
- CTA text pulses
- Canary logo
- Seamless loop back to frame 0

## Remotion Player Config

```jsx
<Player
  lazyComponent={() => import('./remotion/CanaryDemo')}
  compositionWidth={1920}
  compositionHeight={1080}
  durationInFrames={900}
  fps={30}
  style={{ width: '100%', borderRadius: 12 }}
  autoPlay={true}
  loop={true}
  controls={false}
  clickToPlay={true}
/>
```

## GSAP Animation Patterns

### Shared Hook: useScrollReveal

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(sectionRef, buildTimeline) {
  const tlRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        once: true,
      },
    })

    buildTimeline(tl, el)
    tlRef.current = tl

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [sectionRef, buildTimeline])

  return tlRef
}
```

### Shared Hook: useCountUp

```jsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useCountUp(targetValue, options = {}) {
  const { duration = 2, prefix = '', suffix = '', decimals = 0 } = options
  const ref = useRef(null)
  const [display, setDisplay] = useState(prefix + '0' + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplay(prefix + obj.val.toFixed(decimals) + suffix)
          },
        })
      },
    })

    return () => st.kill()
  }, [targetValue, duration, prefix, suffix, decimals])

  return { ref, display }
}
```

## File Changes Summary

### New Files
| File | Purpose |
|------|---------|
| `remotion/CanaryDemo.jsx` | Main Remotion composition |
| `remotion/DemoPlayer.jsx` | Player wrapper for landing page |
| `remotion/scenes/IntroScene.jsx` | Scene 1: Logo + tagline |
| `remotion/scenes/TerminalScene.jsx` | Scene 2: npm install + config |
| `remotion/scenes/AgentSessionScene.jsx` | Scene 3: Agent sim + notifications |
| `remotion/scenes/QAReportScene.jsx` | Scene 4: Dashboard + stats |
| `remotion/scenes/CloseScene.jsx` | Scene 5: Final tagline |
| `sections/Consequence.jsx` | New standalone 70% stat section |
| `sections/Invitation.jsx` | Merged Market + CTA + Footer |
| `hooks/useScrollReveal.js` | Shared GSAP ScrollTrigger hook |
| `hooks/useCountUp.js` | Counter animation hook |

### Modified Files
| File | Changes |
|------|---------|
| `CanaryApp.jsx` | New section order, imports |
| `canary.css` | Section pacing, new styles, counter styles |
| `Hero.jsx` | DemoPlayer replaces HeroDemo |
| `Problem.jsx` | + useScrollReveal for entry animation |
| `Solution.jsx` | + typing effect + useScrollReveal |
| `HowItWorks.jsx` | + SVG line draw + stagger animation |
| `LiveFeed.jsx` | + useScrollReveal for entry |

### Deleted Files
| File | Reason |
|------|--------|
| `HeroDemo.jsx` | Replaced by Remotion Player |
| `useHeroDemoAnimation.js` | Replaced by Remotion scenes |
| `Market.jsx` | Merged into Invitation |
| `CallToAction.jsx` | Merged into Invitation |
| `Footer.jsx` | Merged into Invitation |

## Animation Timing Reference

| Animation | Duration | Easing |
|-----------|----------|--------|
| Section entry reveal | 600ms | power2.out |
| Card stagger | 150ms between | power2.out |
| Step stagger | 200ms between | power2.out |
| Counter (70%) | 2000ms | power2.out |
| Counter (market stats) | 2500ms | power2.out |
| Typing (code) | 35ms/char | linear |
| Error bounce | 400ms | back.out(1.7) |
| Ghost badge fade | 400ms | power1.in |
| SVG line draw | 1000ms | power2.inOut |
| Button pulse | 2000ms loop | sine.inOut |

## Build Strategy: Unified (Parallel)

**Workstream A (Remotion)**:
1. Install Remotion packages
2. Create DemoPlayer wrapper
3. Build IntroScene
4. Build TerminalScene
5. Build AgentSessionScene
6. Build QAReportScene
7. Build CloseScene
8. Wire CanaryDemo composition with Sequences

**Workstream B (Scroll Animations + Restructure)**:
1. Create useScrollReveal and useCountUp hooks
2. Create Consequence section
3. Create Invitation section (merge Market + CTA + Footer)
4. Update CanaryApp with new section order
5. Add GSAP scroll reveals to Problem
6. Add typing effect to Solution
7. Add stagger + SVG to HowItWorks
8. Add entry animation to LiveFeed
9. Add counter animations to Invitation
10. Update canary.css with new section pacing

**Integration**:
1. Wire DemoPlayer into Hero.jsx
2. Delete HeroDemo + useHeroDemoAnimation
3. Final timing/pacing polish
4. Test full scroll experience
