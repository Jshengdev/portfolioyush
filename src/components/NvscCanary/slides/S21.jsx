import { Label } from '../components'

export default function S21() {
  const timeline = [
    { date: 'Oct 2024', text: 'Claude Computer Use (beta)', color: 'indigo' },
    { date: 'Jan 2025', text: 'OpenAI Operator launches', color: 'indigo' },
    { date: 'Mar 2025', text: 'Amazon Nova Act SDK', color: 'indigo' },
    { date: 'Apr 2025', text: 'Microsoft Copilot Studio Computer Use', color: 'indigo' },
    { date: 'Mid 2025', text: 'Browser Use goes viral (50K+ stars)', color: 'green' },
    { date: 'Nov 2025', text: 'OpenClaw launches', color: 'green' },
    { date: 'Dec 2025', text: 'Meta acquires Manus ($2B)', color: 'amber' },
    { date: 'Feb 2026', text: 'Braintrust raises $80M at $800M', color: 'amber' },
    { date: 'Aug 2026', text: 'EU AI Act full enforcement', color: 'red' },
  ]

  return (
    <div className="slide slide-light">
      <div className="slide-inner">
        <Label light>MARKET</Label>
        <h1 className="hl-xl hl-xl--light">The agent economy<br /><span className="kw-indigo">needs QA.</span></h1>

        <div className="market-grid">
          {/* Left column: signal timeline */}
          <div className="market-left">
            <div className="signal-timeline-lbl">SIGNAL TIMELINE</div>
            <div className="signal-timeline">
              {timeline.map(t => (
                <div key={t.date} className="signal-entry">
                  <div className={`dot dot-${t.color}`} style={{ width: 6, height: 6, marginTop: 5 }} />
                  <div className="signal-date">{t.date}</div>
                  <div className="signal-text">{t.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: TAM/SAM/SOM diagram + stats */}
          <div className="market-right">
            <div className="tam-diagram">
              {/* Concentric circles */}
              <div className="tam-circles-v2">
                <div className="tam-c tam-c--tam">
                  <span className="tam-c-label">TAM</span>
                  <div className="tam-c tam-c--sam">
                    <span className="tam-c-label">SAM</span>
                    <div className="tam-c tam-c--som">
                      <span className="tam-c-label">SOM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Annotation lines + data */}
              <div className="tam-annotations">
                <div className="tam-anno tam-anno--tam">
                  <div className="tam-anno-line" />
                  <div className="tam-anno-data">
                    <span className="tam-anno-value c-indigo">$12{'\u2013'}13B</span>
                    <span className="tam-anno-desc">Agent infrastructure + observability</span>
                  </div>
                </div>
                <div className="tam-anno tam-anno--sam">
                  <div className="tam-anno-line" />
                  <div className="tam-anno-data">
                    <span className="tam-anno-value c-indigo">~$2B</span>
                    <span className="tam-anno-desc">Computer-use agent builders</span>
                  </div>
                </div>
                <div className="tam-anno tam-anno--som">
                  <div className="tam-anno-line" />
                  <div className="tam-anno-data">
                    <span className="tam-anno-value c-green">$774K</span>
                    <span className="tam-anno-desc">SOM Year 1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tam-bottom-stats">
              <div className="tam-stat-row">
                <span className="tam-n c-amber">$5.1M</span>
                <span className="tam-d">SOM Year 2 {'\u00B7'} ~170 customers</span>
              </div>
              <div className="tam-stat-row">
                <span className="tam-n c-indigo">46%</span>
                <span className="tam-d">CAGR {'\u00B7'} market growing to $52B+ by 2030</span>
              </div>
              <div className="tam-stat-row">
                <span className="tam-n c-amber">70+</span>
                <span className="tam-d">agent companies per YC batch {'\u00B7'} every one needs QA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
