import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'
import { smoothInterpolate } from '../utils'
import SceneBackground from '../SceneBackground'

const MESSAGES = [
  { id: 1, sender: 'sarah.chen', text: 'Hey, can you review the Q4 contract?', time: '2:31 PM' },
  { id: 2, sender: 'design-bot', text: 'New mockups uploaded to /shared/v3', time: '2:32 PM' },
]

// Viewport-relative cursor path (% of full 1920x1080)
// Cursor can now cross from left panel to right panel
const CURSOR_PATH = [
  { frame: 0,   x: 50, y: 50 },   // Center start
  { frame: 22,  x: 16, y: 17 },   // First message (sarah.chen)
  { frame: 55,  x: 16, y: 17 },   // Dwell/click on message
  { frame: 80,  x: 79, y: 12 },   // Move RIGHT to first notif card
  { frame: 108, x: 79, y: 16 },   // Scanning card details
  { frame: 128, x: 29, y: 92 },   // Move to input bar
  { frame: 172, x: 29, y: 92 },   // Typing dwell
  { frame: 185, x: 57, y: 92 },   // Move to send button
  { frame: 198, x: 57, y: 92 },   // Click send
  { frame: 215, x: 79, y: 20 },   // Move to second notif
  { frame: 238, x: 79, y: 28 },   // Scanning down to third notif
  { frame: 252, x: 15, y: 6 },    // Move to #analytics tab
  { frame: 260, x: 15, y: 6 },    // Click tab
  { frame: 275, x: 79, y: 34 },   // Move to FLAGGED notif
  { frame: 290, x: 79, y: 34 },   // Dwell on flagged
]

const NOTIFS = [
  { frame: 45,  type: 'click',    model: 'gpt-4o', mode: 'autonomous', dot: 'green', agent: 'AGENT_01', action: 'opened thread from @sarah.chen', detail: 'eval: on_task · 89ms', badge: 'OBSERVED', variant: 'green' },
  { frame: 145, type: 'input',    model: 'gpt-4o', mode: 'autonomous', dot: 'green', agent: 'AGENT_01', action: 'input.fill on #compose', detail: 'eval: safe_content · no PII', badge: 'OBSERVED', variant: 'green' },
  { frame: 195, type: 'click',    model: 'gpt-4o', mode: 'autonomous', dot: 'green', agent: 'AGENT_01', action: 'button.click → dispatched reply', detail: 'eval: correct_action · verified', badge: 'OBSERVED', variant: 'green' },
  { frame: 258, type: 'navigate', model: 'gpt-4o', mode: 'autonomous', dot: 'amber', agent: 'AGENT_01', action: 'navigated to /analytics — off scope', detail: 'eval: off_path · drift: 0.72', badge: 'FLAGGED', variant: 'amber' },
]

const TAG_COLORS = {
  click: { bg: 'rgba(99,102,241,0.15)', text: '#A5B4FC' },
  input: { bg: 'rgba(16,185,129,0.15)', text: '#6EE7B7' },
  navigate: { bg: 'rgba(245,158,11,0.15)', text: '#FCD34D' },
}

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

// Camera keyframes: 21 points following the cursor
const CF = [0, 12, 22, 38, 55, 70, 85, 100, 112, 128, 140, 180, 198, 215, 232, 242, 252, 262, 272, 286, 299]

export default function AgentSessionScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const cursor = getCursorPos(frame)

  // Reply typing text
  const replyText = 'Looks good, approved for Q4 launch'
  const typingStart = 130
  const typingChars = Math.max(0, Math.min(Math.floor((frame - typingStart) * 0.8), replyText.length))

  // Highlight first message when cursor is there
  const msg1Highlighted = frame >= 22 && frame < 260

  // Timeline progress
  const progress = interpolate(frame, [0, 290], [0, 100], { extrapolateRight: 'clamp' })

  // Active tab switches when cursor clicks #analytics
  const activeTab = frame >= 260 ? 2 : 0

  // Camera zoom keyframes — corrected signs: +TX=left, -TX=right, +TY=up, -TY=down
  const camScale = smoothInterpolate(frame, CF,
    [0.92, 1, 1, 1.25, 1.25, 1, 1, 1.25, 1.25, 1, 1.3, 1.3, 1, 1, 1.25, 1.25, 1, 1.3, 1.35, 1.35, 0.92]
  )
  const camX = smoothInterpolate(frame, CF,
    [0, 0, 0, 10, 10, 0, 0, -14, -14, 0, 12, 12, 0, 0, -14, -14, 0, 22, -12, -12, 0]
  )
  const camY = smoothInterpolate(frame, CF,
    [0, 0, 0, 10, 10, 0, 0, 8, 8, 0, -14, -14, 0, 0, 4, 4, 0, 20, 4, 4, 0]
  )
  const exitOpacity = smoothInterpolate(frame, [288, 299], [1, 0])

  return (
    <AbsoluteFill>
      <SceneBackground
        primary={{ color: 'rgba(99,102,241,0.1)', x: '30%', y: '50%', radius: 45 }}
        secondary={{ color: 'rgba(16,185,129,0.08)', x: '75%', y: '40%', radius: 40 }}
      />
      <div style={{
        width: '100%',
        height: '100%',
        transform: `scale(${camScale}) translate(${camX}%, ${camY}%)`,
        transformOrigin: 'center center',
        opacity: exitOpacity,
        position: 'relative',
      }}>
        <div style={{ display: 'flex', width: '100%', height: '100%', padding: 40, gap: 24 }}>
          {/* Left: Simulated Slack */}
          <div style={{
            flex: 1.2,
            background: '#1A1B2E',
            borderRadius: 12,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)',
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
                  color: i === activeTab ? '#E2E0F0' : '#7B7899',
                  fontSize: 15,
                  fontFamily: 'JetBrains Mono, monospace',
                  borderBottom: i === activeTab ? '2px solid #6366F1' : '2px solid transparent',
                }}>
                  {tab}
                </div>
              ))}
            </div>

            {/* Messages */}
            <div style={{ padding: '16px 20px' }}>
              {MESSAGES.map((msg) => (
                <div key={msg.id} style={{
                  padding: '12px 14px',
                  marginBottom: 8,
                  borderRadius: 8,
                  background: msg.id === 1 && msg1Highlighted ? 'rgba(99,102,241,0.12)' : 'transparent',
                  border: msg.id === 1 && msg1Highlighted ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: '#A5B4FC', fontSize: 14, fontWeight: 600 }}>{msg.sender}</span>
                    <span style={{ color: '#4B4869', fontSize: 12 }}>{msg.time}</span>
                  </div>
                  <div style={{ color: '#C4C1D9', fontSize: 16 }}>{msg.text}</div>
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
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: typingChars > 0 ? '#E2E0F0' : '#4B4869',
                fontSize: 15,
                fontFamily: 'system-ui',
              }}>
                {typingChars > 0 ? replyText.substring(0, typingChars) : 'Type a message...'}
              </div>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: frame >= 185 && frame <= 210 ? '#6366F1' : 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E2E0F0',
                fontSize: 18,
              }}>
                ↑
              </div>
            </div>
          </div>

          {/* Right: Notification stream */}
          <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              color: '#7B7899',
              fontSize: 12,
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

              // Pulse the FLAGGED card border
              const isFlagged = n.variant === 'amber'
              const flagPulse = isFlagged && localFrame > 15
                ? interpolate(Math.sin(localFrame * 0.15), [-1, 1], [0.3, 0.7])
                : 0

              // Metadata tag colors
              const tagStyle = TAG_COLORS[n.type] || TAG_COLORS.click

              return (
                <div key={i} style={{
                  transform: `translateX(${x}px)`,
                  opacity,
                  background: '#1A1B2E',
                  border: isFlagged && localFrame > 10
                    ? `1px solid rgba(245,158,11,${0.2 + flagPulse * 0.4})`
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  boxShadow: isFlagged && localFrame > 10
                    ? `0 0 ${12 + flagPulse * 8}px rgba(245,158,11,0.1)`
                    : '0 2px 12px rgba(0,0,0,0.2)',
                }}>
                  {/* Action line */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor }} />
                    <span style={{ color: '#A5B4FC', fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{n.agent}</span>
                    <span style={{ color: '#4B4869', fontSize: 13 }}>→</span>
                    <span style={{ color: '#C4C1D9', fontSize: 13 }}>{n.action}</span>
                  </div>
                  {/* Metadata tags: type, model, mode */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: tagStyle.text,
                      background: tagStyle.bg,
                      padding: '2px 8px',
                      borderRadius: 3,
                    }}>{n.type}</span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#7B7899',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '2px 8px',
                      borderRadius: 3,
                    }}>{n.model}</span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#7B7899',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '2px 8px',
                      borderRadius: 3,
                    }}>{n.mode}</span>
                  </div>
                  {/* Eval line + badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#4B4869', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>{n.detail}</span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: badgeText,
                      background: badgeColor,
                      padding: '3px 10px',
                      borderRadius: 4,
                    }}>[{n.badge}]</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Agent cursor — SVG arrow, positioned in camera wrapper (viewport-relative) */}
        <svg style={{
          position: 'absolute',
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
          width: 24,
          height: 28,
          overflow: 'visible',
          opacity: frame > 10 ? 1 : 0,
          filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.6))',
          transform: 'translate(-2px, -2px)',
          zIndex: 100,
          pointerEvents: 'none',
        }} viewBox="0 0 24 28">
          <path d="M2 2L2 24L8 18L14 26L18 24L12 16L20 14L2 2Z" fill="#6366F1" stroke="#A5B4FC" strokeWidth="1.5" />
        </svg>

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
      </div>
    </AbsoluteFill>
  )
}
