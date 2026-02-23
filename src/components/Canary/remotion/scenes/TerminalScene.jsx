import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const LINES = [
  { text: '$ npm install @canary/sdk', delay: 0, isCmd: true },
  { text: 'added 12 packages in 2.1s', delay: 30, isCmd: false },
  { text: '', delay: 42, isCmd: false },
  { text: "import canary from '@canary/sdk'", delay: 50, isCmd: false, isCode: true },
  { text: '', delay: 68, isCmd: false },
  { text: 'canary.observe({', delay: 75, isCmd: false, isCode: true },
  { text: "  agent: 'my-agent',", delay: 88, isCmd: false, isCode: true },
  { text: "  apiKey: process.env.CANARY_KEY,", delay: 98, isCmd: false, isCode: true },
  { text: '})', delay: 110, isCmd: false, isCode: true },
]

export default function TerminalScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Window slides up
  const windowEntry = spring({ frame, fps, config: { damping: 14, stiffness: 100 } })
  const windowY = interpolate(windowEntry, [0, 1], [80, 0])
  const windowOpacity = interpolate(windowEntry, [0, 1], [0, 1])

  // Camera: zoom into code block when canary.observe appears, then zoom out on exit
  // Frames 0-70: normal overview (scale 1)
  // Frames 70-90: zoom into lower code area (scale 1.35, shift up to focus on observe block)
  // Frames 90-125: hold zoom on code
  // Frames 125-149: zoom out for scene exit
  const camScale = interpolate(
    frame,
    [0, 70, 90, 125, 149],
    [1, 1, 1.35, 1.35, 0.92],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const camY = interpolate(
    frame,
    [0, 70, 90, 125, 149],
    [0, 0, -12, -12, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const exitOpacity = interpolate(frame, [140, 149], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${camScale}) translateY(${camY}%)`,
        transformOrigin: 'center 60%',
        opacity: exitOpacity,
      }}>
        <div style={{
          transform: `translateY(${windowY}px)`,
          opacity: windowOpacity,
          width: 780,
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
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ color: '#7B7899', fontSize: 13, marginLeft: 8, fontFamily: 'JetBrains Mono, monospace' }}>
              terminal
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '20px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: 16, lineHeight: 1.9 }}>
            {LINES.map((line, i) => {
              const lineFrame = frame - line.delay
              if (lineFrame < 0) return null
              if (line.text === '') return <div key={i} style={{ height: 10 }} />

              const charsToShow = Math.min(Math.floor(lineFrame * 2.5), line.text.length)
              const displayText = line.text.substring(0, charsToShow)
              const typing = charsToShow < line.text.length

              // Highlight the canary.observe block when zoomed
              const isObserveBlock = line.delay >= 75
              const highlightOpacity = isObserveBlock
                ? interpolate(frame, [85, 95], [0, 0.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                : 0

              return (
                <div key={i} style={{
                  color: line.isCmd ? '#E2E0F0' : line.isCode ? '#A5B4FC' : '#7B7899',
                  background: highlightOpacity > 0 ? `rgba(99,102,241,${highlightOpacity})` : 'transparent',
                  borderRadius: 4,
                  padding: highlightOpacity > 0 ? '0 6px' : 0,
                  margin: highlightOpacity > 0 ? '0 -6px' : 0,
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
      </div>
    </AbsoluteFill>
  )
}
