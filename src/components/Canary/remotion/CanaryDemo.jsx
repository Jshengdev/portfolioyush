import { AbsoluteFill, Sequence } from 'remotion'
import IntroScene from './scenes/IntroScene'
import TerminalScene from './scenes/TerminalScene'
import AgentSessionScene from './scenes/AgentSessionScene'
import QAReportScene from './scenes/QAReportScene'
import CloseScene from './scenes/CloseScene'

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
        <AgentSessionScene />
      </Sequence>
      <Sequence from={540} durationInFrames={240}>
        <QAReportScene />
      </Sequence>
      <Sequence from={780} durationInFrames={120}>
        <CloseScene />
      </Sequence>
    </AbsoluteFill>
  )
}
