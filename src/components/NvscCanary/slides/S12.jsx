import { Label } from '../components'

export default function S12() {
  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE GAP</Label>
        <h1 className="hl-xl">We need <span className="kw-indigo" style={{ fontSize: '1.35em' }}>data</span> to make them better.</h1>

        <div className="missing-flow">
          <div className="missing-node missing-node--active">
            <div className="missing-node-icon">{'\u{1F5A5}'}</div>
            <div className="missing-node-label">Agent on Desktop</div>
            <div className="missing-node-sub">Actions happening in real-time</div>
          </div>
          <div className="missing-arrow">{'\u2192'}</div>
          <div className="missing-node missing-node--gap">
            <div className="missing-node-icon">{'\u2753'}</div>
            <div className="missing-node-label">MISSING LAYER</div>
            <div className="missing-node-sub">No observation. No logging. No data.</div>
          </div>
          <div className="missing-arrow">{'\u2192'}</div>
          <div className="missing-node missing-node--active">
            <div className="missing-node-icon">{'\u{1F4CA}'}</div>
            <div className="missing-node-label">Developer Dashboard</div>
            <div className="missing-node-sub">Can't see what happened</div>
          </div>
        </div>

        <div className="missing-bottom">
          Right now, there is <strong className="kw-red">no observation layer</strong> for computer-use agents.
        </div>
      </div>
    </div>
  )
}
