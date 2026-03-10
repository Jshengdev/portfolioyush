import { DitherCanvas, CanaryLogo } from '../components'

export default function S27() {
  return (
    <div className="slide slide-dark">
      <DitherCanvas />
      <div className="slide-center">
        <div className="s01-logo"><CanaryLogo size={56} color="#fff" /></div>
        <div className="s01-wordmark">CANARY</div>
        <p className="close-sub">
          The future is agentic. We're building the <span className="kw-glow">QA layer</span>.
        </p>
      </div>
    </div>
  )
}
