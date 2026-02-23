import { AbsoluteFill, Sequence } from 'remotion'
import IntroScene from './scenes/IntroScene'
import TerminalScene from './scenes/TerminalScene'
import AgentSessionScene from './scenes/AgentSessionScene'
import QAReportScene from './scenes/QAReportScene'
import CloseScene from './scenes/CloseScene'

// Timeline: 45 + 150 + 300 + 180 + 90 = 765 frames (25.5s @ 30fps)
export const CanaryDemo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <Sequence from={0} durationInFrames={45}>
        <IntroScene />
      </Sequence>
      <Sequence from={45} durationInFrames={150}>
        <TerminalScene />
      </Sequence>
      <Sequence from={195} durationInFrames={300}>
        <AgentSessionScene />
      </Sequence>
      <Sequence from={495} durationInFrames={180}>
        <QAReportScene />
      </Sequence>
      <Sequence from={675} durationInFrames={90}>
        <CloseScene />
      </Sequence>
    </AbsoluteFill>
  )
}
