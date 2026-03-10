import { Label } from '../components'

export default function S08() {
  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE EXPLOSION</Label>
        <h1 className="hl-xl">The agent wave is here.</h1>
        <div className="explosion-stats">
          <div className="explosion-stat-card">
            <div className="explosion-stat-num kw-green">220,000+</div>
            <div className="explosion-stat-lbl">GitHub Stars</div>
            <div className="explosion-stat-sub">OpenClaw — fastest-growing open-source AI project since ChatGPT</div>
          </div>
          <div className="explosion-stat-card">
            <div className="explosion-stat-num kw-amber">$2B</div>
            <div className="explosion-stat-lbl">Acquisition</div>
            <div className="explosion-stat-sub">Meta acquires Manus AI — proactive agent with its own simulated computer</div>
          </div>
        </div>
      </div>
    </div>
  )
}
