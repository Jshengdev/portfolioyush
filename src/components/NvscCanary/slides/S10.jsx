import { Label, CanaryLogo } from '../components'

export default function S10() {
  const actions = [
    { time: '14:32:01', action: 'opened Chrome → navigated to Gmail', pass: true, badge: 'OBSERVED', type: 'green' },
    { time: '14:32:04', action: 'composed new message to john@company.com', pass: true, badge: 'OBSERVED', type: 'green' },
    { time: '14:32:08', action: 'attached file: /reports/q4_summary.pdf', pass: true, badge: 'OBSERVED', type: 'green' },
    { time: '14:32:11', action: 'attempted read: /admin/passwords.txt', pass: false, badge: 'BLOCKED', type: 'red' },
    { time: '14:32:15', action: 'sent message to wrong-contact@external.com', pass: false, badge: 'FLAGGED', type: 'red' },
    { time: '14:32:18', action: 'task.complete: email_report_done', pass: true, badge: 'COMPLETE', type: 'green' },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner slide-inner--wide">
        <Label>FEATURE 01</Label>
        <div className="demo-grid">
          <div>
            <h2 className="hl-lg">See what your<br />agent actually did.</h2>
            <p className="sub-text" style={{ marginTop: '0.75rem', maxWidth: 300 }}>
              Full behavior traces. Every click, every navigation, every file operation.<br /><br />
              This data doesn't exist anywhere else. <em className="hi-indigo">No tool captures it. We do.</em>
            </p>
          </div>

          <div className="dashboard-mock">
            <div className="dash-header">
              <CanaryLogo size={12} color="var(--indigo-soft)" />
              CANARY DASHBOARD
              <span className="dash-live">● LIVE</span>
            </div>
            <div className="dash-body">
              <div className="dash-sidebar">
                <div className="dash-sidebar-label">SESSIONS</div>
                {[
                  { id: 'email_042', status: 'flagged', dot: 'amber', active: true },
                  { id: 'file_031', status: 'complete', dot: 'green', active: false },
                  { id: 'ops_028', status: 'complete', dot: 'green', active: false },
                  { id: 'msg_017', status: 'running', dot: 'indigo', active: false },
                ].map(s => (
                  <div key={s.id} className={`sess-item${s.active ? ' sess-active' : ''}`}>
                    <div className={`dot dot-${s.dot}`} style={{ width: 6, height: 6 }} />
                    <div>
                      <div className="sess-id">{s.id}</div>
                      <div className="sess-status">{s.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dash-main">
                <div className="dash-session-title">SESSION: email_agent_042</div>
                <div className="dash-trace-label">ACTION TRACE</div>
                {actions.map((a, i) => (
                  <div key={i} className={`trace-row${!a.pass ? ' trace-row--fail' : ''}`}>
                    <span className={`trace-mark ${a.pass ? 'pass' : 'fail'}`}>{a.pass ? '✓' : '✗'}</span>
                    <span className="trace-time">{a.time}</span>
                    <span className="trace-action">{a.action}</span>
                    <div className={`badge badge-${a.type}`} style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '0.48rem' }}>
                      [{a.badge}]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
