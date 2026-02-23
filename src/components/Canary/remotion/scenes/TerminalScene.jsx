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
