import { DitherCanvas, NotifCard, CanaryLogo } from '../components'

export default function S17() {
  return (
    <div className="slide slide-dark">
      <DitherCanvas />
      <div className="slide-center">
        <div className="s01-logo"><CanaryLogo size={56} color="#fff" /></div>
        <div className="s01-wordmark">CANARY</div>
        <div className="s01-tagline">QA for Computer-Use AI Agents.</div>
        <p className="close-sub">
          The computer-use agent wave is here. We're building the QA layer it needs.
        </p>
        <div className="s01-card" style={{ marginTop: '1.5rem' }}>
          <NotifCard
            dot="green"
            agent="CANARY"
            action="status: first_mover · category: uncontested"
            sub="// the future is agentic. canary makes it trustworthy."
            badge="LIVE"
            type="green"
          />
        </div>
      </div>
    </div>
  )
}
