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
