import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion'
import IntroScene from './scenes/IntroScene'
import TerminalScene from './scenes/TerminalScene'

// Placeholder scenes — will be replaced by real scene components
const PlaceholderScene = ({ label, color }) => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      <div style={{ opacity, textAlign: 'center' }}>
        <div style={{ color, fontSize: 48, fontWeight: 700 }}>{label}</div>
        <div style={{ color: '#7B7899', fontSize: 16, marginTop: 12 }}>Frame {frame}</div>
      </div>
    </AbsoluteFill>
  )
}

export const CanaryDemo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <Sequence from={0} durationInFrames={90}>
        <IntroScene />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <TerminalScene />
      </Sequence>
      <Sequence from={240} durationInFrames={300}>
        <PlaceholderScene label="AGENT SESSION" color="#F59E0B" />
      </Sequence>
      <Sequence from={540} durationInFrames={240}>
        <PlaceholderScene label="QA REPORT" color="#22C55E" />
      </Sequence>
      <Sequence from={780} durationInFrames={120}>
        <PlaceholderScene label="CLOSE" color="#E2E0F0" />
      </Sequence>
    </AbsoluteFill>
  )
}
