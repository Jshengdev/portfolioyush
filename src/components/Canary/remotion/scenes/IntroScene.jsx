import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

export default function IntroScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Logo fade + scale — snappy entry
  const logoScale = spring({ frame, fps, config: { damping: 10, stiffness: 120 } })
  const logoOpacity = interpolate(logoScale, [0, 1], [0, 1])

  // Pulsing dot
  const dotOpacity = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.4, 1])

  // Tagline typing: starts at frame 10, speed 2.5 chars/frame (fast)
  const tagline = 'QA for computer-use AI agents.'
  const typingStart = 10
  const charsVisible = Math.max(0, Math.min(
    Math.floor((frame - typingStart) * 2.5),
    tagline.length
  ))
  const taglineText = tagline.substring(0, charsVisible)
  const showCursor = frame >= typingStart && charsVisible < tagline.length

  // Exit zoom-out for smooth scene transition
  const exitScale = interpolate(frame, [35, 44], [1, 0.92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const exitOpacity = interpolate(frame, [38, 44], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
        transform: `scale(${exitScale})`,
        opacity: exitOpacity,
      }}>
        {/* Logo */}
        <div style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 32,
        }}>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#10B981',
            opacity: dotOpacity,
            boxShadow: `0 0 ${16 * dotOpacity}px rgba(16, 185, 129, 0.6)`,
          }} />
          <span style={{
            color: '#E2E0F0',
            fontSize: 42,
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
          fontSize: 26,
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 400,
          height: 36,
        }}>
          {taglineText}
          {showCursor && (
            <span style={{
              color: '#6366F1',
              opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
            }}>|</span>
          )}
        </div>
      </div>
    </AbsoluteFill>
  )
}
