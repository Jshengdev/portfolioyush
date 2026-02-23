import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'

export default function CloseScene() {
  const frame = useCurrentFrame()

  // Fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  // Tagline typing — faster
  const tagline = 'See what your agents actually do.'
  const charsVisible = Math.max(0, Math.min(Math.floor((frame - 8) * 2), tagline.length))
  const taglineText = tagline.substring(0, charsVisible)
  const showCursor = frame >= 8 && charsVisible < tagline.length

  // CTA pulse
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.9, 1])

  // Dot
  const dotGlow = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1])

  // Fade to black at end (for seamless loop)
  const fadeOut = interpolate(frame, [72, 89], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Gentle scale breath
  const breathScale = interpolate(frame, [0, 45, 89], [0.95, 1.02, 0.98], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeIn * fadeOut,
        transform: `scale(${breathScale})`,
        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
      }}>
        {/* Tagline */}
        <div style={{
          color: '#E2E0F0',
          fontSize: 38,
          fontWeight: 700,
          marginBottom: 28,
          height: 50,
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
          opacity: interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `scale(${pulse})`,
          padding: '14px 32px',
          borderRadius: 8,
          background: '#4F46E5',
          color: '#fff',
          fontSize: 18,
          fontWeight: 600,
        }}>
          Request early access →
        </div>

        {/* Logo */}
        <div style={{
          opacity: interpolate(frame, [50, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 44,
        }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#10B981',
            opacity: dotGlow,
            boxShadow: `0 0 ${10 * dotGlow}px rgba(16, 185, 129, 0.5)`,
          }} />
          <span style={{
            color: '#7B7899',
            fontSize: 16,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.1em',
          }}>
            CANARY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
