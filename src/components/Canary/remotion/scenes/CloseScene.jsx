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
