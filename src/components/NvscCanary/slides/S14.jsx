import { DitherCanvas, CanaryLogo } from '../components'

export default function S14() {
  return (
    <div className="slide slide-dark">
      <DitherCanvas />
      <div className="slide-center">
        <div className="s01-logo"><CanaryLogo size={56} color="#fff" /></div>
        <div className="s01-wordmark">CANARY</div>
        <div className="s01-tagline">That's what we're building.</div>
      </div>
    </div>
  )
}
