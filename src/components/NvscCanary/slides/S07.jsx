import { Label } from '../components'

export default function S07() {
  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE GAP</Label>
        <h1 className="hl-xl">We need data to make them better.</h1>

        <div className="missing-problems">
          <div className="missing-item">
            <span className="missing-num">01</span>
            <span>No way to <strong>monitor</strong> your desktop and capture every agent action</span>
          </div>
          <div className="missing-item">
            <span className="missing-num">02</span>
            <span>No way to <strong>log</strong> them all</span>
          </div>
          <div className="missing-item">
            <span className="missing-num">03</span>
            <span>No way to <strong>return that data</strong> to the developer</span>
          </div>
        </div>

        <div className="missing-flow">
          <div className="missing-node missing-node--active">
            <div className="missing-node-icon">🖥</div>
            <div className="missing-node-label">Agent on Desktop</div>
          </div>
          <div className="missing-arrow">→</div>
          <div className="missing-node missing-node--gap">
            <div className="missing-node-icon">❓</div>
            <div className="missing-node-label">MISSING LAYER</div>
            <div className="missing-node-sub">No observation. No logging. No data.</div>
          </div>
          <div className="missing-arrow">→</div>
          <div className="missing-node missing-node--active">
            <div className="missing-node-icon">📊</div>
            <div className="missing-node-label">Developer Dashboard</div>
          </div>
        </div>

        <div className="pv2-real">
          <div className="pv2-real-lbl">THE REAL PROBLEM</div>
          <div className="pv2-real-items">
            <div className="pv2-item">Computer-use agents work at the <strong>OS level</strong> — not through an API</div>
            <div className="pv2-item">No current tools to <strong>monitor</strong> what the agent is doing on your desktop</div>
            <div className="pv2-item">No way to <strong>log</strong> every action. No way to <strong>evaluate</strong> it. No way to use that data to make it <strong>better</strong>.</div>
          </div>
        </div>

        <div className="missing-bottom">
          Right now, there is <strong>no observation layer</strong> for computer-use agents.
        </div>
      </div>
    </div>
  )
}
