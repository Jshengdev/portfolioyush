import { Label } from '../components'

export default function S03() {
  const actions = [
    {
      icon: '📋',
      app: 'TO-DO',
      action: 'Scanning your files → generating tasks',
      detail: '☑ Finish proposal draft  ·  ☑ Review budget.xlsx  ·  ☑ Sign contract_v2.pdf',
      result: '3 tasks created',
    },
    {
      icon: '✉️',
      app: 'MAIL',
      action: 'Drafting replies in your writing style',
      detail: 'Re: Q4 Report — "Hey Sarah, looks great. One note on slide 12..."',
      result: '4 emails organized',
    },
    {
      icon: '📝',
      app: 'NOTES',
      action: 'Auto-generating meeting notes',
      detail: 'Key decisions: launch date moved to March · action items assigned to 3 people',
      result: 'notes saved',
    },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner slide-inner--wide">
        <div className="imagine-split">
          <div className="imagine-text-side">
            <Label>THE VISION</Label>
            <div className="imagine-lead">
              Imagine AI that<br />knows you better<br />than yourself.
            </div>
            <div className="imagine-lines">
              <div className="imagine-line">AI that reads through your files and creates to-do lists for you.</div>
              <div className="imagine-line">AI that recognizes your writing style and responds to messages for you.</div>
              <div className="imagine-line">AI that recognizes your patterns and automates them — like taking notes after a meeting.</div>
            </div>
            <div className="imagine-coda">
              This isn't a chatbot.<br />
              This is a new kind of relationship with your computer.
            </div>
          </div>

          <div className="imagine-desktop">
            <div className="desktop-win desktop-win--dark">
              <div className="win-titlebar win-titlebar--dark">
                <div className="win-dots">
                  <span className="wd wd-red" /><span className="wd wd-amber" /><span className="wd wd-green" />
                </div>
                <div className="win-title" style={{ color: 'var(--text-dim)' }}>ai_assistant</div>
                <span className="imagine-active">
                  <span className="imagine-active-dot" />
                  ACTIVE
                </span>
              </div>
              <div className="win-body imagine-win-body">
                {actions.map((a, i) => (
                  <div key={i} className="ag-action">
                    <div className="ag-header">
                      <span className="ag-icon" style={{ fontSize: '0.85rem' }}>{a.icon}</span>
                      <span className="ag-app">{a.app}</span>
                    </div>
                    <div className="ag-text">{a.action}</div>
                    <div className="ag-detail">{a.detail}</div>
                    <div className="ag-footer">
                      <div className="ag-progress"><div className="ag-progress-fill" /></div>
                      <span className="ag-result">{a.result}</span>
                      <span className="ag-tag">done</span>
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
