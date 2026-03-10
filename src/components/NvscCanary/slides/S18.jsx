import { Label } from '../components'

export default function S18() {
  const insights = [
    {
      type: 'green',
      title: 'SUCCESS PATTERN',
      text: 'Agents that complete email tasks correctly follow this 4-step sequence 90% of the time',
    },
    {
      type: 'red',
      title: 'FAILURE PATTERN',
      text: 'Agents that fail at file management skip step 2 in 73% of cases',
    },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>FEATURE 03</Label>
        <h1 className="hl-xl">Learn what makes agents <span className="kw-green">better</span>.</h1>
        <p className="sub-text" style={{ marginBottom: '1.5rem' }}>
          Aggregate data across all agents on the platform {'\u2192'} patterns that make products stronger.
        </p>

        <div className="pattern-grid">
          <div>
            <div className="insight-list">
              {insights.map(ins => (
                <div key={ins.title} className="insight-card">
                  <div className={`badge badge-${ins.type}`} style={{ marginBottom: '0.5rem' }}>[{ins.title}]</div>
                  <div className="insight-text">{ins.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flywheel">
              <div className="flywheel-lbl">DATA FLYWHEEL</div>
              <div className="flywheel-steps">
                {['More agents', 'More behavior data', 'Better patterns', 'Stronger agents', 'More adoption'].map((s, i, a) => (
                  <span key={s} style={{ display: 'contents' }}>
                    <div className="fly-step">{s}</div>
                    {i < a.length - 1 && <div className="fly-arrow">{'\u2192'}</div>}
                  </span>
                ))}
              </div>
              <div className="flywheel-coda">
                <span className="kw">The <span className="kw">data compounds</span>.</span> More agents {'\u2192'} better patterns {'\u2192'} stronger products {'\u2192'} more agents.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
