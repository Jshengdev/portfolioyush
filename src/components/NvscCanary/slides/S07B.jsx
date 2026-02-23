import { DitherCanvas, CanaryLogo } from '../components'

export default function S07B() {
  return (
    <div className="slide slide-dark">
      <DitherCanvas />
      <div className="slide-center">
        <div className="s01-logo"><CanaryLogo size={56} color="#fff" /></div>
        <div className="s01-wordmark">CANARY</div>
        <div className="s01-tagline">Introducing Canary.</div>
      </div>
    </div>
  )
}
