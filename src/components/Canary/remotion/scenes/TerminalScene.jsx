import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'
import { smoothInterpolate, SYNTAX } from '../utils'
import SceneBackground from '../SceneBackground'

const LINES = [
  { delay: 0, isCmd: true, tokens: [{ text: '$ npm install @canary/sdk', color: SYNTAX.command }] },
  { delay: 30, tokens: [{ text: 'added 12 packages in 2.1s', color: SYNTAX.output }] },
  { delay: 42, tokens: [] },
  { delay: 50, isCode: true, tokens: [
    { text: 'import', color: SYNTAX.keyword },
    { text: ' canary ', color: SYNTAX.variable },
    { text: 'from', color: SYNTAX.keyword },
    { text: " '@canary/sdk'", color: SYNTAX.string },
  ]},
  { delay: 68, tokens: [] },
  { delay: 75, isCode: true, tokens: [
    { text: 'canary', color: SYNTAX.variable },
    { text: '.', color: SYNTAX.punctuation },
    { text: 'observe', color: SYNTAX.function },
    { text: '(', color: SYNTAX.punctuation },
    { text: '{', color: SYNTAX.punctuation },
  ]},
  { delay: 88, isCode: true, tokens: [
    { text: '  agent', color: SYNTAX.property },
    { text: ': ', color: SYNTAX.punctuation },
    { text: "'my-agent'", color: SYNTAX.string },
    { text: ',', color: SYNTAX.punctuation },
  ]},
  { delay: 98, isCode: true, tokens: [
    { text: '  apiKey', color: SYNTAX.property },
    { text: ': ', color: SYNTAX.punctuation },
    { text: 'process', color: SYNTAX.variable },
    { text: '.', color: SYNTAX.punctuation },
    { text: 'env', color: SYNTAX.property },
    { text: '.', color: SYNTAX.punctuation },
    { text: 'CANARY_KEY', color: SYNTAX.variable },
    { text: ',', color: SYNTAX.punctuation },
  ]},
  { delay: 110, isCode: true, tokens: [
    { text: '}', color: SYNTAX.punctuation },
    { text: ')', color: SYNTAX.punctuation },
  ]},
]

function renderTokenized(tokens, charsToShow) {
  const spans = []
  let charCount = 0
  for (const token of tokens) {
    if (charCount >= charsToShow) break
    const remaining = charsToShow - charCount
    const text = remaining >= token.text.length ? token.text : token.text.substring(0, remaining)
    spans.push(<span key={charCount} style={{ color: token.color }}>{text}</span>)
    charCount += token.text.length
  }
  return spans
}

export default function TerminalScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Window slides up
  const windowEntry = spring({ frame, fps, config: { damping: 14, stiffness: 100 } })
  const windowY = interpolate(windowEntry, [0, 1], [80, 0])
  const windowOpacity = interpolate(windowEntry, [0, 1], [0, 1])

  // Camera: zoom into code block when canary.observe appears, then zoom out on exit
  const camScale = smoothInterpolate(
    frame,
    [0, 70, 90, 125, 149],
    [1, 1, 1.35, 1.35, 0.92]
  )
  const camY = smoothInterpolate(
    frame,
    [0, 70, 90, 125, 149],
    [0, 0, -12, -12, 0]
  )
  const exitOpacity = smoothInterpolate(frame, [140, 149], [1, 0])

  return (
    <AbsoluteFill>
      <SceneBackground primary={{ color: 'rgba(99,102,241,0.12)', x: '30%', y: '35%', radius: 50 }} />
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
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)',
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
          <div style={{ padding: '20px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: 17, lineHeight: 1.9 }}>
            {LINES.map((line, i) => {
              const lineFrame = frame - line.delay
              if (lineFrame < 0) return null
              if (line.tokens.length === 0) return <div key={i} style={{ height: 10 }} />

              const fullText = line.tokens.map(t => t.text).join('')
              const charsToShow = Math.min(Math.floor(lineFrame * 2.5), fullText.length)
              const typing = charsToShow < fullText.length

              // Highlight the canary.observe block when zoomed
              const isObserveBlock = line.delay >= 75
              const highlightOpacity = isObserveBlock
                ? interpolate(frame, [85, 95], [0, 0.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                : 0

              return (
                <div key={i} style={{
                  background: highlightOpacity > 0 ? `rgba(99,102,241,${highlightOpacity})` : 'transparent',
                  borderRadius: 4,
                  padding: highlightOpacity > 0 ? '0 6px' : 0,
                  margin: highlightOpacity > 0 ? '0 -6px' : 0,
                }}>
                  {renderTokenized(line.tokens, charsToShow)}
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
