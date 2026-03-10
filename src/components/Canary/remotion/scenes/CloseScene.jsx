import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { smoothInterpolate } from '../utils'
import SceneBackground from '../SceneBackground'

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
  const fadeOut = smoothInterpolate(frame, [72, 89], [1, 0])

  // Gentle scale breath
  const breathScale = smoothInterpolate(frame, [0, 45, 89], [0.95, 1.02, 0.98])

  return (
    <AbsoluteFill>
      <SceneBackground primary={{ color: 'rgba(99,102,241,0.2)', x: '50%', y: '40%', radius: 55 }} />
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
          fontSize: 44,
          fontWeight: 700,
          marginBottom: 28,
          height: 56,
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
          padding: '16px 36px',
          borderRadius: 10,
          background: 'linear-gradient(135deg, #6366F1, #4F46E5, #7C3AED)',
          color: '#fff',
          fontSize: 20,
          fontWeight: 600,
          boxShadow: '0 0 30px rgba(99,102,241,0.4), 0 4px 20px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Shimmer sweep */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
            transform: `translateX(${interpolate(frame % 90, [0, 90], [-120, 120])}%)`,
          }} />
          <span style={{ position: 'relative' }}>Request early access →</span>
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
