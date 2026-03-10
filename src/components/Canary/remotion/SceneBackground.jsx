import { AbsoluteFill } from 'remotion'

/**
 * Shared scene background with radial glows and subtle noise overlay.
 *
 * Props:
 *   primary   — { color, x, y, radius } first radial glow
 *   secondary — { color, x, y, radius } optional second glow
 */
export default function SceneBackground({ primary, secondary }) {
  const p = primary || { color: 'rgba(99,102,241,0.12)', x: '50%', y: '50%', radius: 60 }
  const s = secondary || null

  // Build radial gradient layers
  const gradients = [
    `radial-gradient(ellipse ${p.radius}% ${p.radius}% at ${p.x} ${p.y}, ${p.color}, transparent)`,
  ]
  if (s) {
    gradients.push(
      `radial-gradient(ellipse ${s.radius}% ${s.radius}% at ${s.x} ${s.y}, ${s.color}, transparent)`
    )
  }

  return (
    <>
      <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }} />

      {/* Radial glow layers */}
      <AbsoluteFill style={{
        background: gradients.join(', '),
      }} />

      {/* SVG noise texture overlay */}
      <AbsoluteFill style={{ opacity: 0.03, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="sceneNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sceneNoise)" />
        </svg>
      </AbsoluteFill>
    </>
  )
}
