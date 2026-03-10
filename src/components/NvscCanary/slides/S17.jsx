import { Label, CanaryLogo } from '../components'

export default function S17() {
  const checks = [
    { pass: true, label: 'Completed task as specified' },
    { pass: true, label: 'Stayed within app boundaries' },
    { pass: true, label: 'Correct recipient for message' },
    { pass: true, label: 'Used expected navigation path' },
    { pass: true, label: 'Completed within time limit' },
    { pass: true, label: 'No unauthorized external requests' },
    { pass: true, label: 'Followed file access policy' },
    { pass: false, label: 'Accessed restricted file (passwords.txt)' },
    { pass: false, label: 'Deviated from expected navigation path' },
    { pass: false, label: 'Shared private data externally' },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner slide-inner--wide">
        <Label>FEATURE 02</Label>
        <div className="demo-grid">
          <div>
            <h2 className="hl-lg">Automatic<br /><span className="kw-indigo">pass/fail</span> reports.</h2>
            <p className="sub-text" style={{ marginTop: '0.75rem', maxWidth: 300 }}>
              Set your requirements — what should the agent do, what should it never do.
              We check against them <em className="hi-indigo">automatically</em>.<br /><br />
              <span className="kw">QA that runs itself.</span> No manual checking. No test writing.
            </p>
          </div>

          <div className="report-card">
            <div className="report-header">
              <CanaryLogo size={12} color="var(--indigo-soft)" />
              CANARY QA REPORT
              <span className="report-score">
                <span className="report-score-num">7</span>/10
              </span>
            </div>
            <div className="report-body">
              {checks.map((c, i) => (
                <div key={i} className={`report-row${!c.pass ? ' report-row--fail' : ''}`}>
                  <span className={`report-mark ${c.pass ? 'pass' : 'fail'}`}>
                    {c.pass ? '\u2713' : '\u2717'}
                  </span>
                  <span className="report-label">{c.label}</span>
                  <div className={`badge badge-${c.pass ? 'green' : 'red'}`} style={{ marginLeft: 'auto', fontSize: '0.48rem' }}>
                    [{c.pass ? 'PASS' : 'FAIL'}]
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
