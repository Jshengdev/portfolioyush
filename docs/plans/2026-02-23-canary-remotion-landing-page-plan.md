# Canary Landing Page Rebuild + Remotion Demo — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Canary landing page into a 7-beat story arc with an embedded Remotion product demo and GSAP scroll-triggered animations.

**Architecture:** Two parallel workstreams — (A) Remotion demo scenes rendered via `@remotion/player` embedded in the hero, and (B) GSAP ScrollTrigger animations on all sections with page restructure (new Consequence section, merged Invitation section). Both workstreams integrate at the end by wiring the Player into Hero.jsx and deleting replaced files.

**Tech Stack:** React 18, Remotion 4.0 (`remotion` + `@remotion/player`), GSAP 3.14 + ScrollTrigger (already installed), CSS (scoped to `.canary-root`)

**Design Doc:** `docs/plans/2026-02-23-canary-remotion-landing-page-design.md`

---

## Workstream A: Remotion Demo

### Task 1: Install Remotion Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install packages with exact versions**

Run:
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush && yarn add --exact remotion @remotion/player
```

Expected: packages added to `package.json` dependencies, no caret prefix

**Step 2: Verify installation**

Run:
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush && node -e "require('remotion'); require('@remotion/player'); console.log('OK')"
```

Expected: `OK` with no errors

**Step 3: Verify dev server still works**

Run:
```bash
cd /Users/johnnysheng/Documents/GitHub/portfolioyush && timeout 15 yarn dev 2>&1 | head -20
```

Expected: Vite dev server starts without errors

**Step 4: Commit**

```bash
git add package.json yarn.lock
git commit -m "feat(canary): add remotion and @remotion/player dependencies"
```

---

### Task 2: Create DemoPlayer Wrapper

**Files:**
- Create: `src/components/Canary/remotion/DemoPlayer.jsx`

**Step 1: Create the Player wrapper component**

```jsx
import { useCallback } from 'react'
import { Player } from '@remotion/player'

export default function DemoPlayer() {
  const lazyComponent = useCallback(
    () => import('./CanaryDemo').then(m => ({ default: m.CanaryDemo })),
    []
  )

  return (
    <div className="demo-player-wrap">
      <Player
        lazyComponent={lazyComponent}
        compositionWidth={1920}
        compositionHeight={1080}
        durationInFrames={900}
        fps={30}
        style={{
          width: '100%',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        autoPlay
        loop
        clickToPlay
        showVolumeControls={false}
        renderLoading={useCallback(() => (
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            background: '#0D0F1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7B7899',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 14,
          }}>
            loading demo...
          </div>
        ), [])}
      />
    </div>
  )
}
```

**Step 2: Verify file created**

Run:
```bash
ls -la /Users/johnnysheng/Documents/GitHub/portfolioyush/src/components/Canary/remotion/DemoPlayer.jsx
```

Expected: file exists

---

### Task 3: Create CanaryDemo Composition (Shell)

**Files:**
- Create: `src/components/Canary/remotion/CanaryDemo.jsx`

**Step 1: Create composition that sequences all 5 scenes**

Start with a placeholder that renders colored frames for each scene so the Player works end-to-end before scenes are built:

```jsx
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion'

// Placeholder scenes — will be replaced by real scene components
const PlaceholderScene = ({ label, color }) => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      <div style={{ opacity, textAlign: 'center' }}>
        <div style={{ color, fontSize: 48, fontWeight: 700 }}>{label}</div>
        <div style={{ color: '#7B7899', fontSize: 16, marginTop: 12 }}>Frame {frame}</div>
      </div>
    </AbsoluteFill>
  )
}

export const CanaryDemo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <Sequence from={0} durationInFrames={90}>
        <PlaceholderScene label="INTRO" color="#10B981" />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <PlaceholderScene label="TERMINAL" color="#6366F1" />
      </Sequence>
      <Sequence from={240} durationInFrames={300}>
        <PlaceholderScene label="AGENT SESSION" color="#F59E0B" />
      </Sequence>
      <Sequence from={540} durationInFrames={240}>
        <PlaceholderScene label="QA REPORT" color="#22C55E" />
      </Sequence>
      <Sequence from={780} durationInFrames={120}>
        <PlaceholderScene label="CLOSE" color="#E2E0F0" />
      </Sequence>
    </AbsoluteFill>
  )
}
```

**Step 2: Temporarily wire into Hero to test Player works**

In `src/components/Canary/components/sections/Hero.jsx`, add below HeroDemo temporarily:

```jsx
import DemoPlayer from '../../remotion/DemoPlayer'
// Add inside hero-content div, after HeroDemo:
<DemoPlayer />
```

**Step 3: Test in browser**

Run: `yarn dev`, navigate to the Canary page, verify the Remotion Player renders with cycling placeholder scenes.

**Step 4: Revert the Hero.jsx test wire** (will be permanently wired in Task 14)

**Step 5: Commit**

```bash
git add src/components/Canary/remotion/
git commit -m "feat(canary): add Remotion CanaryDemo shell with DemoPlayer wrapper"
```

---

### Task 4: Build IntroScene

**Files:**
- Create: `src/components/Canary/remotion/scenes/IntroScene.jsx`
- Modify: `src/components/Canary/remotion/CanaryDemo.jsx` (swap placeholder)

**Step 1: Create IntroScene**

```jsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

export default function IntroScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Logo fade + scale
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } })
  const logoOpacity = interpolate(logoScale, [0, 1], [0, 1])

  // Pulsing dot
  const dotOpacity = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1])

  // Tagline typing: starts at frame 30
  const tagline = 'QA for computer-use AI agents.'
  const typingStart = 30
  const charsVisible = Math.max(0, Math.min(
    Math.floor((frame - typingStart) * 1.2),
    tagline.length
  ))
  const taglineText = tagline.substring(0, charsVisible)
  const showCursor = frame >= typingStart && charsVisible < tagline.length

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    }}>
      {/* Logo */}
      <div style={{
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
      }}>
        <div style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#10B981',
          opacity: dotOpacity,
          boxShadow: `0 0 ${12 * dotOpacity}px rgba(16, 185, 129, 0.6)`,
        }} />
        <span style={{
          color: '#E2E0F0',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '0.12em',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          CANARY
        </span>
      </div>

      {/* Tagline */}
      <div style={{
        color: '#7B7899',
        fontSize: 22,
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 400,
        height: 30,
      }}>
        {taglineText}
        {showCursor && (
          <span style={{
            color: '#6366F1',
            opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
          }}>|</span>
        )}
      </div>
    </AbsoluteFill>
  )
}
```

**Step 2: Update CanaryDemo.jsx — replace first placeholder**

Replace the first `<Sequence>` placeholder with:
```jsx
import IntroScene from './scenes/IntroScene'
// ...
<Sequence from={0} durationInFrames={90}>
  <IntroScene />
</Sequence>
```

**Step 3: Verify in browser** — Player shows logo fade-in + tagline typing for first 3 seconds

**Step 4: Commit**

```bash
git add src/components/Canary/remotion/scenes/IntroScene.jsx src/components/Canary/remotion/CanaryDemo.jsx
git commit -m "feat(canary): add Remotion IntroScene with logo and typing tagline"
```

---

### Task 5: Build TerminalScene

**Files:**
- Create: `src/components/Canary/remotion/scenes/TerminalScene.jsx`
- Modify: `src/components/Canary/remotion/CanaryDemo.jsx`

**Step 1: Create TerminalScene**

```jsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const LINES = [
  { text: '$ npm install @canary/sdk', delay: 0, isCmd: true },
  { text: 'added 12 packages in 2.1s', delay: 40, isCmd: false },
  { text: '', delay: 55, isCmd: false },
  { text: "import canary from '@canary/sdk'", delay: 65, isCmd: false, isCode: true },
  { text: '', delay: 85, isCmd: false },
  { text: 'canary.observe({', delay: 90, isCmd: false, isCode: true },
  { text: "  agent: 'my-agent',", delay: 105, isCmd: false, isCode: true },
  { text: "  apiKey: process.env.CANARY_KEY,", delay: 115, isCmd: false, isCode: true },
  { text: '})', delay: 128, isCmd: false, isCode: true },
]

export default function TerminalScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Window slides up
  const windowEntry = spring({ frame, fps, config: { damping: 14, stiffness: 100 } })
  const windowY = interpolate(windowEntry, [0, 1], [80, 0])
  const windowOpacity = interpolate(windowEntry, [0, 1], [0, 1])

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        transform: `translateY(${windowY}px)`,
        opacity: windowOpacity,
        width: 720,
        background: '#1A1B2E',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        {/* Titlebar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ color: '#7B7899', fontSize: 12, marginLeft: 8, fontFamily: 'JetBrains Mono, monospace' }}>
            terminal
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: '16px 20px', fontFamily: 'JetBrains Mono, monospace', fontSize: 15, lineHeight: 1.8 }}>
          {LINES.map((line, i) => {
            const lineFrame = frame - line.delay
            if (lineFrame < 0) return null
            if (line.text === '') return <div key={i} style={{ height: 8 }} />

            const charsToShow = Math.min(Math.floor(lineFrame * 2), line.text.length)
            const displayText = line.text.substring(0, charsToShow)
            const typing = charsToShow < line.text.length

            return (
              <div key={i} style={{
                color: line.isCmd ? '#E2E0F0' : line.isCode ? '#A5B4FC' : '#7B7899',
              }}>
                {displayText}
                {typing && (
                  <span style={{
                    color: '#10B981',
                    opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                  }}>|</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}
```

**Step 2: Update CanaryDemo.jsx — replace second placeholder**

**Step 3: Verify in browser** — terminal slides up, commands type, code appears

**Step 4: Commit**

```bash
git add src/components/Canary/remotion/scenes/TerminalScene.jsx src/components/Canary/remotion/CanaryDemo.jsx
git commit -m "feat(canary): add Remotion TerminalScene with typing animation"
```

---

### Task 6: Build AgentSessionScene

**Files:**
- Create: `src/components/Canary/remotion/scenes/AgentSessionScene.jsx`
- Modify: `src/components/Canary/remotion/CanaryDemo.jsx`

**Step 1: Create AgentSessionScene**

This is the largest scene — split view with agent simulation on left and notification stream on right. The agent cursor moves through a simulated Slack-like interface while Canary notification cards slide in.

```jsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const MESSAGES = [
  { id: 1, sender: 'sarah.chen', text: 'Hey, can you review the Q4 contract?', time: '2:31 PM' },
  { id: 2, sender: 'design-bot', text: 'New mockups uploaded to /shared/v3', time: '2:32 PM' },
]

const CURSOR_PATH = [
  { frame: 0,   x: 50, y: 50 },
  { frame: 30,  x: 25, y: 30 },   // Move to first message
  { frame: 50,  x: 25, y: 30 },   // Click (dwell)
  { frame: 80,  x: 55, y: 82 },   // Move to input
  { frame: 160, x: 55, y: 82 },   // Typing dwell
  { frame: 180, x: 88, y: 82 },   // Move to send
  { frame: 200, x: 88, y: 82 },   // Click send
  { frame: 230, x: 35, y: 8 },    // Navigate to #analytics tab
  { frame: 250, x: 35, y: 8 },    // Click tab
]

const NOTIFS = [
  { frame: 55,  dot: 'green', agent: 'AGENT_01', action: 'opened thread from @sarah.chen', detail: 'eval: on_task · 89ms', badge: 'OBSERVED', variant: 'green' },
  { frame: 140, dot: 'green', agent: 'AGENT_01', action: 'input.fill on #compose', detail: 'eval: safe_content · no PII', badge: 'OBSERVED', variant: 'green' },
  { frame: 205, dot: 'green', agent: 'AGENT_01', action: 'button.click → dispatched reply', detail: 'eval: correct_action · verified', badge: 'OBSERVED', variant: 'green' },
  { frame: 255, dot: 'amber', agent: 'AGENT_01', action: 'navigated to /analytics — off scope', detail: 'eval: off_path · drift: 0.72', badge: 'FLAGGED', variant: 'amber' },
]

function getCursorPos(frame) {
  let prev = CURSOR_PATH[0]
  let next = CURSOR_PATH[0]
  for (let i = 0; i < CURSOR_PATH.length - 1; i++) {
    if (frame >= CURSOR_PATH[i].frame && frame <= CURSOR_PATH[i + 1].frame) {
      prev = CURSOR_PATH[i]
      next = CURSOR_PATH[i + 1]
      break
    }
    if (i === CURSOR_PATH.length - 2 && frame > CURSOR_PATH[i + 1].frame) {
      prev = next = CURSOR_PATH[i + 1]
    }
  }
  const range = next.frame - prev.frame
  const t = range > 0 ? Math.min((frame - prev.frame) / range, 1) : 1
  const ease = t * t * (3 - 2 * t) // smoothstep
  return {
    x: prev.x + (next.x - prev.x) * ease,
    y: prev.y + (next.y - prev.y) * ease,
  }
}

export default function AgentSessionScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const cursor = getCursorPos(frame)

  // Reply typing text
  const replyText = 'Looks good, approved for Q4 launch'
  const typingStart = 90
  const typingChars = Math.max(0, Math.min(Math.floor((frame - typingStart) * 0.8), replyText.length))

  // Highlight first message
  const msg1Highlighted = frame >= 40 && frame < 230

  // Timeline progress
  const progress = interpolate(frame, [0, 280], [0, 100], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: 40, gap: 24 }}>
        {/* Left: Simulated Slack */}
        <div style={{
          flex: 1.2,
          background: '#1A1B2E',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Header tabs */}
          <div style={{
            display: 'flex',
            gap: 0,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['#design', '#general', '#analytics'].map((tab, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                color: (i === 0 && frame < 230) || (i === 2 && frame >= 230) ? '#E2E0F0' : '#7B7899',
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                borderBottom: (i === 0 && frame < 230) || (i === 2 && frame >= 230) ? '2px solid #6366F1' : '2px solid transparent',
              }}>
                {tab}
              </div>
            ))}
          </div>

          {/* Messages */}
          <div style={{ padding: '16px 20px' }}>
            {MESSAGES.map((msg) => (
              <div key={msg.id} style={{
                padding: '10px 12px',
                marginBottom: 8,
                borderRadius: 8,
                background: msg.id === 1 && msg1Highlighted ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: msg.id === 1 && msg1Highlighted ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                transition: 'all 0.3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#A5B4FC', fontSize: 13, fontWeight: 600 }}>{msg.sender}</span>
                  <span style={{ color: '#4B4869', fontSize: 11 }}>{msg.time}</span>
                </div>
                <div style={{ color: '#C4C1D9', fontSize: 14 }}>{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            display: 'flex',
            gap: 8,
          }}>
            <div style={{
              flex: 1,
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: typingChars > 0 ? '#E2E0F0' : '#4B4869',
              fontSize: 14,
              fontFamily: 'system-ui',
            }}>
              {typingChars > 0 ? replyText.substring(0, typingChars) : 'Type a message...'}
            </div>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: frame >= 180 && frame <= 210 ? '#6366F1' : 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E2E0F0',
              fontSize: 16,
            }}>
              ↑
            </div>
          </div>

          {/* Agent cursor */}
          <div style={{
            position: 'absolute',
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            width: 0,
            height: 0,
            borderLeft: '8px solid #6366F1',
            borderTop: '4px solid transparent',
            borderBottom: '12px solid transparent',
            filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.5))',
            opacity: frame > 10 ? 1 : 0,
            transition: 'opacity 0.3s',
          }} />
        </div>

        {/* Right: Notification stream */}
        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            color: '#7B7899',
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 8px rgba(16,185,129,0.5)',
            }} />
            CANARY · OBSERVING
          </div>

          {NOTIFS.map((n, i) => {
            const localFrame = frame - n.frame
            if (localFrame < 0) return null

            const slideIn = spring({
              frame: localFrame,
              fps,
              config: { damping: 15, stiffness: 120 },
            })
            const x = interpolate(slideIn, [0, 1], [60, 0])
            const opacity = interpolate(slideIn, [0, 1], [0, 1])

            const dotColor = { green: '#10B981', amber: '#F59E0B', red: '#EF4444' }[n.dot]
            const badgeColor = { green: 'rgba(16,185,129,0.15)', amber: 'rgba(245,158,11,0.15)' }[n.variant]
            const badgeText = { green: '#10B981', amber: '#F59E0B' }[n.variant]

            return (
              <div key={i} style={{
                transform: `translateX(${x}px)`,
                opacity,
                background: '#1A1B2E',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8,
                padding: '10px 14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor }} />
                  <span style={{ color: '#A5B4FC', fontSize: 12, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{n.agent}</span>
                  <span style={{ color: '#4B4869', fontSize: 12 }}>→</span>
                  <span style={{ color: '#C4C1D9', fontSize: 12 }}>{n.action}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#4B4869', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>{n.detail}</span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: badgeText,
                    background: badgeColor,
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}>[{n.badge}]</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom: Session timeline */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 40,
        right: 40,
        height: 4,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 2,
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #6366F1, #10B981)',
          borderRadius: 2,
        }} />
      </div>
    </AbsoluteFill>
  )
}
```

**Step 2: Update CanaryDemo.jsx — swap placeholder**

**Step 3: Verify** — agent cursor moves through Slack sim, notifications slide in, timeline fills

**Step 4: Commit**

```bash
git add src/components/Canary/remotion/scenes/AgentSessionScene.jsx src/components/Canary/remotion/CanaryDemo.jsx
git commit -m "feat(canary): add Remotion AgentSessionScene with cursor + notifications"
```

---

### Task 7: Build QAReportScene

**Files:**
- Create: `src/components/Canary/remotion/scenes/QAReportScene.jsx`
- Modify: `src/components/Canary/remotion/CanaryDemo.jsx`

**Step 1: Create QAReportScene**

```jsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const STATS = [
  { label: 'Total Tests', value: 47, delay: 0, color: '#E2E0F0' },
  { label: 'Passed', value: 44, delay: 8, color: '#22C55E' },
  { label: 'Failed', value: 3, delay: 16, color: '#EF4444' },
  { label: 'Coverage', value: 94, delay: 24, color: '#6366F1', suffix: '%' },
]

const STEPS = [
  { label: 'Navigate to login', status: 'pass', start: 40, dur: 25 },
  { label: 'Enter credentials', status: 'pass', start: 65, dur: 20 },
  { label: 'Click submit', status: 'pass', start: 85, dur: 15 },
  { label: 'Verify dashboard', status: 'pass', start: 100, dur: 25 },
  { label: 'Search products', status: 'fail', start: 125, dur: 20 },
]

export default function QAReportScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Dashboard zoom in
  const zoomIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 } })
  const scale = interpolate(zoomIn, [0, 1], [0.9, 1])
  const opacity = interpolate(zoomIn, [0, 1], [0, 1])

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        width: 800,
        background: '#1A1B2E',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        padding: 32,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}>
          <div>
            <div style={{ color: '#E2E0F0', fontSize: 20, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, system-ui' }}>
              QA Report — Session #247
            </div>
            <div style={{ color: '#7B7899', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>
              AGENT_01 · checkout_flow · 14:32:07
            </div>
          </div>
          <div style={{
            padding: '6px 16px',
            borderRadius: 6,
            background: 'rgba(34,197,94,0.12)',
            color: '#22C55E',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            PASSED
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {STATS.map((stat, i) => {
            const enter = spring({
              frame: frame - stat.delay,
              fps,
              config: { damping: 12, stiffness: 100 },
            })
            const s = interpolate(enter, [0, 1], [0.5, 1])
            const o = interpolate(enter, [0, 1], [0, 1])

            // Count up
            const countStart = stat.delay + 10
            const countDur = 30
            const displayVal = Math.round(interpolate(
              frame,
              [countStart, countStart + countDur],
              [0, stat.value],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            ))

            return (
              <div key={i} style={{
                transform: `scale(${s})`,
                opacity: o,
                textAlign: 'center',
                padding: '16px 0',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: stat.color, fontFamily: 'Plus Jakarta Sans' }}>
                  {displayVal}{stat.suffix || ''}
                </div>
                <div style={{ fontSize: 12, color: '#7B7899', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STEPS.map((step, i) => {
            const prog = interpolate(
              frame, [step.start, step.start + step.dur], [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
            const isDone = frame >= step.start + step.dur
            const isActive = frame >= step.start && !isDone
            const barColor = step.status === 'pass' ? '#22C55E' : '#EF4444'
            const dotColor = isDone ? barColor : isActive ? '#F59E0B' : '#2A2B40'

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: dotColor,
                  boxShadow: isActive ? `0 0 8px ${dotColor}` : 'none',
                  flexShrink: 0,
                }} />
                <div style={{
                  flex: 1,
                  height: 4,
                  background: '#2A2B40',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${prog * 100}%`,
                    height: '100%',
                    background: barColor,
                    borderRadius: 2,
                  }} />
                </div>
                <span style={{
                  color: isDone ? '#7B7899' : isActive ? '#E2E0F0' : '#4B4869',
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono, monospace',
                  width: 180,
                }}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}
```

**Step 2: Update CanaryDemo.jsx**

**Step 3: Verify** — dashboard zooms in, stats count up, timeline plays through

**Step 4: Commit**

```bash
git add src/components/Canary/remotion/scenes/QAReportScene.jsx src/components/Canary/remotion/CanaryDemo.jsx
git commit -m "feat(canary): add Remotion QAReportScene with animated dashboard"
```

---

### Task 8: Build CloseScene

**Files:**
- Create: `src/components/Canary/remotion/scenes/CloseScene.jsx`
- Modify: `src/components/Canary/remotion/CanaryDemo.jsx`

**Step 1: Create CloseScene**

```jsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'

export default function CloseScene() {
  const frame = useCurrentFrame()

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  // Tagline typing
  const tagline = 'See what your agents actually do.'
  const charsVisible = Math.max(0, Math.min(Math.floor((frame - 15) * 1.5), tagline.length))
  const taglineText = tagline.substring(0, charsVisible)
  const showCursor = frame >= 15 && charsVisible < tagline.length

  // CTA pulse
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.85, 1])

  // Dot
  const dotGlow = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1])

  // Fade to black at end (for seamless loop)
  const fadeOut = interpolate(frame, [100, 119], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeIn * fadeOut,
      fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    }}>
      {/* Tagline */}
      <div style={{
        color: '#E2E0F0',
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 24,
        height: 44,
      }}>
        {taglineText}
        {showCursor && (
          <span style={{
            color: '#6366F1',
            opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
          }}>|</span>
        )}
      </div>

      {/* CTA */}
      <div style={{
        opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        transform: `scale(${pulse})`,
        padding: '12px 28px',
        borderRadius: 8,
        background: '#4F46E5',
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
      }}>
        Request early access →
      </div>

      {/* Logo */}
      <div style={{
        opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
      }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#10B981',
          opacity: dotGlow,
          boxShadow: `0 0 ${8 * dotGlow}px rgba(16, 185, 129, 0.5)`,
        }} />
        <span style={{
          color: '#7B7899',
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.1em',
        }}>
          CANARY
        </span>
      </div>
    </AbsoluteFill>
  )
}
```

**Step 2: Update CanaryDemo.jsx — replace final placeholder. Remove all PlaceholderScene references.**

**Step 3: Verify** — full 30-second loop plays: Intro → Terminal → Agent Session → QA Report → Close → loops

**Step 4: Commit**

```bash
git add src/components/Canary/remotion/scenes/CloseScene.jsx src/components/Canary/remotion/CanaryDemo.jsx
git commit -m "feat(canary): add Remotion CloseScene, complete 5-scene demo loop"
```

---

## Workstream B: Page Restructure + Scroll Animations

### Task 9: Create Shared GSAP Hooks

**Files:**
- Create: `src/components/Canary/hooks/useScrollReveal.js`
- Create: `src/components/Canary/hooks/useCountUp.js`

**Step 1: Create useScrollReveal**

```jsx
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(buildTimeline, triggerOpts = {}) {
  const sectionRef = useRef(null)

  const build = useCallback(buildTimeline, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        once: true,
        ...triggerOpts,
      },
    })

    build(tl, el)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [build, triggerOpts])

  return sectionRef
}
```

**Step 2: Create useCountUp**

```jsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

**Step 3: Commit**

```bash
git add src/components/Canary/hooks/useScrollReveal.js src/components/Canary/hooks/useCountUp.js
git commit -m "feat(canary): add useScrollReveal and useCountUp GSAP hooks"
```

---

### Task 10: Create Consequence Section (Beat 3)

**Files:**
- Create: `src/components/Canary/components/sections/Consequence.jsx`
- Modify: `src/components/Canary/styles/canary.css` (add styles)

**Step 1: Create Consequence.jsx**

```jsx
import useCountUp from '../../hooks/useCountUp'

export default function Consequence() {
  const { ref: numRef, display } = useCountUp(70, { suffix: '%', duration: 2 })

  return (
    <section className="consequence">
      <div className="consequence-inner">
        <div className="consequence-stat" ref={numRef}>{display}</div>
        <p className="consequence-sub">of AI agents fail at real-world tasks.</p>
        <p className="consequence-detail">Developers are deploying blind.</p>
      </div>
    </section>
  )
}
```

**Step 2: Add CSS to `canary.css`** (at end of file)

```css
/* Beat 3: Consequence */
.consequence {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--canary-light-bg, #F7F6F3);
  position: relative;
}

.consequence-inner {
  text-align: center;
  max-width: 600px;
  padding: 80px 24px;
}

.consequence-stat {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: clamp(80px, 12vw, 160px);
  font-weight: 900;
  color: #EF4444;
  line-height: 1;
  margin-bottom: 16px;
}

.consequence-sub {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  color: #1a1a2e;
  font-weight: 600;
  margin: 0 0 8px;
}

.consequence-detail {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #7B7899;
  margin: 0;
}
```

**Step 3: Commit**

```bash
git add src/components/Canary/components/sections/Consequence.jsx src/components/Canary/styles/canary.css
git commit -m "feat(canary): add Consequence section with 70% counter animation"
```

---

### Task 11: Create Invitation Section (Beat 7 — merge Market + CTA + Footer)

**Files:**
- Create: `src/components/Canary/components/sections/Invitation.jsx`
- Modify: `src/components/Canary/styles/canary.css`

**Step 1: Create Invitation.jsx**

```jsx
import NotifCard from '../design-system/NotifCard'
import NotifCardMulti from '../design-system/NotifCardMulti'
import Button from '../design-system/Button'
import useBayerDither from '../../hooks/useBayerDither'
import useCountUp from '../../hooks/useCountUp'
import { CTA_DITHER_OPTS } from '../../lib/constants'

export default function Invitation() {
  const canvasRef = useBayerDither(CTA_DITHER_OPTS)
  const { ref: tamRef, display: tamDisplay } = useCountUp(183, { prefix: '$', suffix: 'B', duration: 2.5 })
  const { ref: execRef, display: execDisplay } = useCountUp(93, { suffix: '%', duration: 2 })
  const { ref: approvalRef, display: approvalDisplay } = useCountUp(14.4, { suffix: '%', duration: 2, decimals: 1 })

  return (
    <section className="invitation" id="early-access">
      <canvas ref={canvasRef} className="dither-canvas dither-canvas--80" />
      <div className="section-inner z-elevated">
        {/* Market stats */}
        <div className="invitation-market">
          <span className="section-label">(MARKET)</span>
          <div className="invitation-market-hero">
            $7.6B → <span ref={tamRef}>{tamDisplay}</span>
          </div>
          <p className="invitation-market-sub">AI agent market, 2025–2033 · 49.6% CAGR</p>

          <div className="invitation-stats">
            <div className="invitation-stat-card">
              <div className="invitation-stat-num green" ref={execRef}>{execDisplay}</div>
              <div className="invitation-stat-label">of IT executives want to deploy agentic AI</div>
            </div>
            <div className="invitation-stat-card">
              <div className="invitation-stat-num amber" ref={approvalRef}>{approvalDisplay}</div>
              <div className="invitation-stat-label">have received security approval — the trust gap is the market</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="invitation-cta">
          <h2 className="section-headline section-headline--centered">
            Help us make agents<br />trustworthy.
          </h2>

          <div className="cta-notifications">
            <NotifCardMulti>
              <NotifCard dot="indigo" agent="CANARY" action="stage: pre-seed · seeking: early access beta" badge="OPEN" badgeVariant="indigo" />
              <NotifCard dot="amber" agent="CANARY" action="target: every agent developer on the planet" badge="AMBITIOUS" badgeVariant="amber" />
              <NotifCard dot="indigo" agent="CANARY" action="vision: agents that are observed, trusted, deployed" badge="INEVITABLE" badgeVariant="indigo" />
            </NotifCardMulti>
          </div>

          <Button href="mailto:hello@canary.dev" className="btn-centered">
            Request early access →
          </Button>
          <p className="cta-tagline">// the future is agentic. canary makes it trustworthy.</p>
        </div>

        {/* Footer */}
        <footer className="invitation-footer">
          <div className="footer-logo">
            <div className="nav-dot nav-dot--sm" />
            CANARY
          </div>
          <span>NVSC 2026 · USC Marshall</span>
          <span>© 2026 Canary · All rights reserved</span>
        </footer>
      </div>
    </section>
  )
}
```

**Step 2: Add CSS to canary.css**

```css
/* Beat 7: Invitation */
.invitation {
  position: relative;
  background: var(--canary-dark-bg, #0D0F1A);
  padding-bottom: 0;
}

.invitation-market {
  text-align: center;
  padding: 80px 0 60px;
}

.invitation-market-hero {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: var(--canary-text, #E2E0F0);
  margin: 16px 0 8px;
}

.invitation-market-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--canary-dim, #7B7899);
}

.invitation-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 700px;
  margin: 32px auto 0;
}

.invitation-stat-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.invitation-stat-num {
  font-family: 'Plus Jakarta Sans', system-ui;
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 8px;
}

.invitation-stat-num.green { color: #10B981; }
.invitation-stat-num.amber { color: #F59E0B; }

.invitation-stat-label {
  font-size: 14px;
  color: var(--canary-dim, #7B7899);
  line-height: 1.5;
}

.invitation-cta {
  padding: 60px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.invitation-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 40px;
  font-size: 12px;
  color: var(--canary-dim, #7B7899);
}
```

**Step 3: Commit**

```bash
git add src/components/Canary/components/sections/Invitation.jsx src/components/Canary/styles/canary.css
git commit -m "feat(canary): add Invitation section (merged Market + CTA + Footer)"
```

---

### Task 12: Add GSAP Scroll Reveals to Problem Section

**Files:**
- Modify: `src/components/Canary/components/sections/Problem.jsx`

**Step 1: Add scroll reveal animations**

Wrap the component with `useScrollReveal`. Add `.gsap-hidden` initial state to elements that will animate:

```jsx
import { useRef, useCallback } from 'react'
import DesktopWindow from '../design-system/DesktopWindow'
import DesktopRow from '../design-system/DesktopRow'
import GhostBadge from '../design-system/GhostBadge'
import StatHighlight from '../design-system/StatHighlight'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function Problem() {
  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    tl.from(el.querySelector('.problem-grid > div:first-child'), {
      opacity: 0, y: 40, duration: 0.6, ease: 'power2.out',
    })
    tl.from(el.querySelector('.agent-desktop-graphic'), {
      opacity: 0, y: 60, duration: 0.6, ease: 'power2.out',
    }, '-=0.3')
    tl.from(el.querySelectorAll('.ghost-badge'), {
      opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.15, ease: 'power2.out',
    }, '-=0.2')
    tl.from(el.querySelector('.desktop-error-block'), {
      opacity: 0, y: 20, duration: 0.4, ease: 'back.out(1.7)',
    }, '-=0.1')
  }, []))

  return (
    <section className="section-light" id="problem" ref={sectionRef}>
      {/* ... existing JSX unchanged ... */}
    </section>
  )
}
```

**Step 2: Verify** — scroll to Problem, elements animate in with stagger

**Step 3: Commit**

```bash
git add src/components/Canary/components/sections/Problem.jsx
git commit -m "feat(canary): add GSAP scroll reveal to Problem section"
```

---

### Task 13: Add Typing Effect + Scroll Reveal to Solution

**Files:**
- Modify: `src/components/Canary/components/sections/Solution.jsx`

**Step 1: Add typing animation and scroll reveal**

Replace the static code block with a ref-based typing animation triggered by ScrollTrigger:

```jsx
import { useRef, useCallback, useEffect, useState } from 'react'
import NotifCard from '../design-system/NotifCard'
import useBayerDither from '../../hooks/useBayerDither'
import { STATIC_DITHER_OPTS } from '../../lib/constants'
import useScrollReveal from '../../hooks/useScrollReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CODE_LINES = [
  '// npm install @canary/sdk',
  "import canary from '@canary/sdk'",
  "canary.connect(myAgent, { apiKey: 'ck_...' })",
]

const NOTIF_DATA = [
  { dot: 'green', agent: 'AGENT_01', action: 'opened /contracts/Q4_vendor.pdf', detail: '14:32:07 · eval: on_task · 89ms', badge: 'OBSERVED', badgeVariant: 'green' },
  { dot: 'green', agent: 'AGENT_01', action: 'input.fill on #compose_message', detail: '14:32:09 · eval: safe_content · no PII', badge: 'OBSERVED', badgeVariant: 'green' },
  { dot: 'red', agent: 'AGENT_02', action: 'attempted policy-restricted file write', detail: '14:32:17 · intervention triggered', badge: 'BLOCKED', badgeVariant: 'red' },
]

export default function Solution() {
  const canvasRef = useBayerDither(STATIC_DITHER_OPTS)
  const codeRef = useRef(null)
  const notifsRef = useRef(null)
  const [codeText, setCodeText] = useState('')
  const [visibleNotifs, setVisibleNotifs] = useState(0)

  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    // Fade in the text content
    tl.from(el.querySelector('.z-elevated:first-child'), {
      opacity: 0, y: 40, duration: 0.6, ease: 'power2.out',
    })
  }, []))

  // Typing + notification orchestration triggered by scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const codeEl = codeRef.current
    if (!codeEl) return

    let typingInterval = null
    const fullText = CODE_LINES.join('\n')
    let charIndex = 0

    const st = ScrollTrigger.create({
      trigger: codeEl,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        typingInterval = setInterval(() => {
          charIndex++
          setCodeText(fullText.substring(0, charIndex))

          // Show notifications at line boundaries
          const typed = fullText.substring(0, charIndex)
          const lineCount = typed.split('\n').length
          setVisibleNotifs(Math.min(lineCount, NOTIF_DATA.length))

          if (charIndex >= fullText.length) {
            clearInterval(typingInterval)
          }
        }, 35)
      },
    })

    return () => {
      if (typingInterval) clearInterval(typingInterval)
      st.kill()
    }
  }, [sectionRef])

  return (
    <section id="solution" className="section-dark" ref={sectionRef}>
      <canvas ref={canvasRef} className="dither-canvas dither-canvas--70" />
      <div className="section-inner">
        <div className="solution-grid">
          <div className="z-elevated">
            <span className="section-label">{'{SOLUTION}'}</span>
            <h2 className="section-headline">One line of code.<br />Every action traced.</h2>
            <p className="section-body">
              Canary automatically observes every computer-use action, scores it against your
              requirements, and surfaces patterns across all your agents.
            </p>
            <div className="solution-code" ref={codeRef}>
              {codeText || '\u00A0'}
              {codeText.length < CODE_LINES.join('\n').length && codeText.length > 0 && (
                <span className="typing-cursor">|</span>
              )}
            </div>
          </div>
          <div className="z-elevated" ref={notifsRef}>
            <div className="solution-notifs">
              {NOTIF_DATA.slice(0, visibleNotifs).map((item, i) => (
                <div className="solution-notif-item" key={i}>
                  <NotifCard
                    dot={item.dot}
                    agent={item.agent}
                    action={item.action}
                    detail={item.detail}
                    badge={item.badge}
                    badgeVariant={item.badgeVariant}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add CSS for typing cursor and notification animation**

```css
.typing-cursor {
  color: #10B981;
  animation: blink 0.6s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.solution-notifs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.solution-notif-item {
  animation: slideInRight 0.4s ease-out both;
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
```

**Step 3: Verify** — scroll to Solution, code types, notifications slide in per line

**Step 4: Commit**

```bash
git add src/components/Canary/components/sections/Solution.jsx src/components/Canary/styles/canary.css
git commit -m "feat(canary): add typing animation and scroll reveal to Solution"
```

---

### Task 14: Add Stagger + SVG Line to HowItWorks

**Files:**
- Modify: `src/components/Canary/components/sections/HowItWorks.jsx`

**Step 1: Add GSAP stagger animation and SVG connecting line**

```jsx
import { useCallback } from 'react'
import StepItem from '../design-system/StepItem'
import NotifCard from '../design-system/NotifCard'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function HowItWorks() {
  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    // Header
    tl.from(el.querySelector('.section-center'), {
      opacity: 0, y: 30, duration: 0.5, ease: 'power2.out',
    })
    // Steps stagger
    tl.from(el.querySelectorAll('.step-item'), {
      opacity: 0, y: 40, duration: 0.5, stagger: 0.2, ease: 'power2.out',
    }, '-=0.2')
    // SVG line draw
    const line = el.querySelector('.steps-connector')
    if (line) {
      const length = line.getTotalLength()
      tl.fromTo(line,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' },
        '-=0.8'
      )
    }
    // Example notif
    tl.from(el.querySelector('.how-example'), {
      opacity: 0, y: 20, duration: 0.4, ease: 'power2.out',
    }, '-=0.3')
  }, []))

  return (
    <section className="section-light" id="how" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-center">
          <span className="section-label">[HOW IT WORKS]</span>
          <h2 className="section-headline">Plug in. Watch everything.</h2>
        </div>

        <div className="steps-row-wrap">
          {/* SVG connector line */}
          <svg className="steps-svg" aria-hidden="true">
            <line className="steps-connector" x1="12.5%" y1="50%" x2="87.5%" y2="50%" />
          </svg>

          <div className="steps-row">
            <StepItem num={1} title="CONNECT SDK" desc={<>One npm install.<br />Three lines of code.</>} code="npm install @canary/sdk" />
            <StepItem num={2} title="AGENT RUNS" desc="Your agent does its work normally. No changes." />
            <StepItem num={3} title="ACTIONS OBSERVED" desc="Every click, file access, and command. Automatically." />
            <StepItem num={4} title="PATTERNS SURFACED" desc="Dashboard, alerts, and cross-agent intelligence." />
          </div>
        </div>

        <div className="how-example">
          <NotifCard dot="green" agent="AGENT_01" action="form.submit() on /checkout" detail="eval: correct · 142ms · task_complete: true · safety: pass" badge="OBSERVED · 142ms" badgeVariant="green" theme="light" />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add CSS for SVG connector**

```css
.steps-row-wrap {
  position: relative;
}

.steps-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.steps-connector {
  stroke: rgba(99, 102, 241, 0.25);
  stroke-width: 2;
  stroke-dasharray: 6 4;
}
```

**Step 3: Verify** — steps stagger in, line draws, example card fades in

**Step 4: Commit**

```bash
git add src/components/Canary/components/sections/HowItWorks.jsx src/components/Canary/styles/canary.css
git commit -m "feat(canary): add GSAP stagger and SVG line to HowItWorks"
```

---

### Task 15: Add Scroll Reveal to LiveFeed

**Files:**
- Modify: `src/components/Canary/components/sections/LiveFeed.jsx`

**Step 1: Wrap with useScrollReveal**

Add import and wrap the section ref. Animate headline slide-in and feed container fade-in:

```jsx
import { useCallback } from 'react'
import NotifCard from '../design-system/NotifCard'
import useBayerDither from '../../hooks/useBayerDither'
import useLiveFeedTicker from '../../hooks/useLiveFeedTicker'
import useScrollReveal from '../../hooks/useScrollReveal'
import { STATIC_DITHER_OPTS } from '../../lib/constants'

// ... initialFeedItems unchanged ...

export default function LiveFeed() {
  const canvasRef = useBayerDither(STATIC_DITHER_OPTS)
  const items = useLiveFeedTicker(initialFeedItems)

  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    tl.from(el.querySelector('.feed-grid > div:first-child'), {
      opacity: 0, x: -40, duration: 0.6, ease: 'power2.out',
    })
    tl.from(el.querySelector('.feed-grid > div:last-child'), {
      opacity: 0, x: 40, duration: 0.6, ease: 'power2.out',
    }, '-=0.4')
  }, []))

  return (
    <section id="live" className="section-dark" ref={sectionRef}>
      {/* ... rest unchanged ... */}
    </section>
  )
}
```

**Step 2: Verify** — scroll to LiveFeed, content slides in from sides

**Step 3: Commit**

```bash
git add src/components/Canary/components/sections/LiveFeed.jsx
git commit -m "feat(canary): add GSAP scroll reveal to LiveFeed section"
```

---

## Integration

### Task 16: Wire DemoPlayer into Hero + Update CanaryApp

**Files:**
- Modify: `src/components/Canary/components/sections/Hero.jsx`
- Modify: `src/components/Canary/CanaryApp.jsx`

**Step 1: Replace HeroDemo with DemoPlayer in Hero.jsx**

```jsx
import { useRef } from 'react'
import DemoPlayer from '../../remotion/DemoPlayer'
import Button from '../design-system/Button'
import useBayerDither from '../../hooks/useBayerDither'
import { HERO_DITHER_OPTS } from '../../lib/constants'

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useBayerDither(HERO_DITHER_OPTS, true, sectionRef)

  return (
    <section className="hero" ref={sectionRef}>
      <canvas ref={canvasRef} className="dither-canvas dither-canvas--75" />

      <div className="hero-content">
        <div className="hero-label">
          <span>●</span> THE FUTURE OF AGENTS IS ON DESKTOP
        </div>

        <h1 className="hero-title">
          See what your<br /><em>agents actually do.</em>
        </h1>

        <p className="hero-sub">
          Current eval tools check what agents say.<br />
          Canary watches what they do — every click, file, command.
        </p>

        <DemoPlayer />

        <div className="hero-actions">
          <Button href="#early-access">Request early access →</Button>
          <Button href="#how" variant="ghost">See how it works</Button>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Update CanaryApp.jsx with new section order**

```jsx
import { useEffect, useRef } from 'react'
import './styles/canary.css'
import Nav from './components/sections/Nav'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Consequence from './components/sections/Consequence'
import Solution from './components/sections/Solution'
import HowItWorks from './components/sections/HowItWorks'
import LiveFeed from './components/sections/LiveFeed'
import Invitation from './components/sections/Invitation'
import useCustomCursor from './hooks/useCustomCursor'
import useSpotlight from './hooks/useSpotlight'

export default function CanaryApp() {
  const rootRef = useRef(null)
  const cursorRef = useCustomCursor()
  useSpotlight(rootRef)

  useEffect(() => {
    const prev = {
      bg: document.body.style.backgroundColor,
      overflow: document.body.style.overflow,
      cursor: document.body.style.cursor,
      margin: document.body.style.margin,
      padding: document.body.style.padding,
    }
    document.body.style.backgroundColor = '#0D0F1A'
    document.body.style.overflow = 'auto'
    document.body.style.cursor = 'none'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    return () => {
      document.body.style.backgroundColor = prev.bg
      document.body.style.overflow = prev.overflow
      document.body.style.cursor = prev.cursor
      document.body.style.margin = prev.margin
      document.body.style.padding = prev.padding
    }
  }, [])

  return (
    <div className="canary-root" ref={rootRef}>
      <canvas ref={cursorRef} id="canary-cursor" width="120" height="120" />
      <Nav />
      <Hero />
      <Problem />
      <Consequence />
      <Solution />
      <HowItWorks />
      <LiveFeed />
      <Invitation />
    </div>
  )
}
```

**Step 3: Verify** — full page loads with all 7 beats in order, Remotion Player plays in hero

**Step 4: Commit**

```bash
git add src/components/Canary/components/sections/Hero.jsx src/components/Canary/CanaryApp.jsx
git commit -m "feat(canary): wire DemoPlayer into Hero, update CanaryApp with 7-beat structure"
```

---

### Task 17: Delete Replaced Files

**Files:**
- Delete: `src/components/Canary/components/sections/HeroDemo.jsx`
- Delete: `src/components/Canary/hooks/useHeroDemoAnimation.js`
- Delete: `src/components/Canary/components/sections/Market.jsx`
- Delete: `src/components/Canary/components/sections/CallToAction.jsx`
- Delete: `src/components/Canary/components/sections/Footer.jsx`

**Step 1: Delete files**

Run:
```bash
rm src/components/Canary/components/sections/HeroDemo.jsx \
   src/components/Canary/hooks/useHeroDemoAnimation.js \
   src/components/Canary/components/sections/Market.jsx \
   src/components/Canary/components/sections/CallToAction.jsx \
   src/components/Canary/components/sections/Footer.jsx
```

**Step 2: Verify no import errors**

Run: `yarn dev` — page should load without errors

**Step 3: Commit**

```bash
git add -A
git commit -m "chore(canary): remove replaced HeroDemo, Market, CTA, Footer files"
```

---

### Task 18: Update CSS Pacing + Demo Player Styles

**Files:**
- Modify: `src/components/Canary/styles/canary.css`

**Step 1: Add section pacing and DemoPlayer styles**

Add to canary.css:

```css
/* Demo Player */
.demo-player-wrap {
  width: 100%;
  max-width: 960px;
  margin: 32px auto;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 60px rgba(99, 102, 241, 0.08);
}

/* Section pacing overrides */
.hero {
  min-height: 100vh;
}

.section-light#problem {
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.section-dark#solution {
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.section-light#how {
  min-height: 60vh;
}

.section-dark#live {
  min-height: 70vh;
}

.invitation {
  min-height: 80vh;
}
```

**Step 2: Verify** — sections have appropriate vertical pacing

**Step 3: Commit**

```bash
git add src/components/Canary/styles/canary.css
git commit -m "style(canary): add DemoPlayer styles and section pacing"
```

---

### Task 19: Final Scroll Test + Polish

**Files:** None created — this is verification only

**Step 1: Full scroll test**

Run `yarn dev`, navigate to Canary page. Verify each beat:

1. **Hero**: Remotion Player auto-plays, loops, dither canvas behind it
2. **Problem**: Desktop window + ghost badges animate on scroll
3. **Consequence**: 70% counter counts up, text fades in
4. **Solution**: Code types, notifications slide in per line
5. **HowItWorks**: Steps stagger, SVG line draws, example card fades
6. **LiveFeed**: Content slides in, ticker runs
7. **Invitation**: Market stats count up, CTA section visible, footer present

**Step 2: Check for console errors**

Open browser DevTools → Console. Should be clean (no errors, no warnings from Remotion or GSAP).

**Step 3: Check mobile responsiveness**

Resize browser to 375px width. Verify nothing overflows or breaks.

**Step 4: Commit any fixes discovered during testing**

```bash
git add -A
git commit -m "fix(canary): polish scroll animations and responsive layout"
```

---

## Summary

| Task | Workstream | What |
|------|-----------|------|
| 1 | A | Install Remotion dependencies |
| 2 | A | Create DemoPlayer wrapper |
| 3 | A | Create CanaryDemo shell composition |
| 4 | A | Build IntroScene |
| 5 | A | Build TerminalScene |
| 6 | A | Build AgentSessionScene |
| 7 | A | Build QAReportScene |
| 8 | A | Build CloseScene |
| 9 | B | Create useScrollReveal + useCountUp hooks |
| 10 | B | Create Consequence section |
| 11 | B | Create Invitation section |
| 12 | B | Add scroll reveals to Problem |
| 13 | B | Add typing effect to Solution |
| 14 | B | Add stagger + SVG to HowItWorks |
| 15 | B | Add scroll reveal to LiveFeed |
| 16 | Integration | Wire DemoPlayer into Hero + update CanaryApp |
| 17 | Integration | Delete replaced files |
| 18 | Integration | CSS pacing + DemoPlayer styles |
| 19 | Integration | Final scroll test + polish |
