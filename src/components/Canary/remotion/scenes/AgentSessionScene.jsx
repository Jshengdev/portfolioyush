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

  // Camera zoom keyframes:
  // 0-25: zoom in from overview (entry)
  // 25-50: zoom into left panel (message click)
  // 50-80: ease back to overview
  // 80-160: zoom into input area (typing)
  // 160-200: ease to overview
  // 200-245: overview (send + observe)
  // 245-275: zoom into right notification panel (FLAGGED card)
  // 275-299: zoom out for scene exit
  const camScale = interpolate(
    frame,
    [0, 10, 35, 55, 80, 85, 155, 165, 200, 245, 260, 275, 299],
    [0.9, 1, 1.25, 1.25, 1, 1, 1.2, 1.2, 1, 1, 1.3, 1.3, 0.92],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const camX = interpolate(
    frame,
    [0, 10, 35, 55, 80, 85, 155, 165, 200, 245, 260, 275, 299],
    [0, 0, -12, -12, 0, 0, -8, -8, 0, 0, 15, 15, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const camY = interpolate(
    frame,
    [0, 10, 35, 55, 80, 85, 155, 165, 200, 245, 260, 275, 299],
    [0, 0, -8, -8, 0, 0, 15, 15, 0, 0, 5, 5, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const exitOpacity = interpolate(frame, [288, 299], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <div style={{
        width: '100%',
        height: '100%',
        transform: `scale(${camScale}) translate(${camX}%, ${camY}%)`,
        transformOrigin: 'center center',
        opacity: exitOpacity,
      }}>
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
                  fontSize: 14,
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
                  <div style={{ color: '#C4C1D9', fontSize: 15 }}>{msg.text}</div>
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
                background: frame >= 180 && frame <= 210 ? '#6366F1' : 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E2E0F0',
                fontSize: 18,
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
              borderLeft: '10px solid #6366F1',
              borderTop: '5px solid transparent',
              borderBottom: '14px solid transparent',
              filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.6))',
              opacity: frame > 10 ? 1 : 0,
            }} />
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

              return (
                <div key={i} style={{
                  transform: `translateX(${x}px)`,
                  opacity,
                  background: '#1A1B2E',
                  border: isFlagged && localFrame > 10
                    ? `1px solid rgba(245,158,11,${0.2 + flagPulse * 0.4})`
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  boxShadow: isFlagged && localFrame > 10
                    ? `0 0 ${12 + flagPulse * 8}px rgba(245,158,11,0.1)`
                    : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor }} />
                    <span style={{ color: '#A5B4FC', fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{n.agent}</span>
                    <span style={{ color: '#4B4869', fontSize: 13 }}>→</span>
                    <span style={{ color: '#C4C1D9', fontSize: 13 }}>{n.action}</span>
                  </div>
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
