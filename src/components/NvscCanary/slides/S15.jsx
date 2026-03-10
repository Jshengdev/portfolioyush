import { Label } from '../components'

export default function S15() {
  const caps = [
    {
      num: '01', dot: 'green', title: 'OBSERVE',
      desc: 'Full behavior traces \u2014 every click, file access, navigation, and command. See everything your agent does.',
    },
    {
      num: '02', dot: 'indigo', title: 'EVALUATE',
      desc: 'Auto-run safety, correctness, and efficiency evals. Pass/fail reports without writing a single test.',
    },
    {
      num: '03', dot: 'amber', title: 'LEARN',
      desc: 'Pattern intelligence from aggregate data. The more agents on the platform, the smarter everyone gets.',
    },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE SOLUTION</Label>
        <h1 className="hl-xl">One line of code.<br />Complete observability.</h1>
        <p className="sub-text" style={{ marginBottom: '1.5rem' }}>An <span className="kw-green">open-source SDK</span> that captures, evaluates, and learns from every agent action.</p>
        <div className="product-grid">
          <div>
            <div className="code-block">
              <span className="code-comment">{'// npm install @canary/sdk'}</span><br />
              <span className="code-kw">import</span>{' '}canary{' '}<span className="code-kw">from</span>{' '}
              <span className="code-str">'@canary/sdk'</span><br /><br />
              canary.<span className="code-fn">connect</span>(myAgent, {'{'}<br />
              &nbsp;&nbsp;apiKey:<span className="code-str"> 'pk_live_...'</span><br />
              {'}'})<br /><br />
              <span className="code-comment">{'// one line. everything else is automatic.'}</span>
            </div>
            <div className="product-claim">
              <span className="claim-dot" />
              No agent changes required. <span className="kw-green">Plug in. Ship with confidence.</span>
            </div>
          </div>
          <div className="cap-list">
            {caps.map(c => (
              <div key={c.num} className="cap-card">
                <div className="cap-num">{c.num}</div>
                <div>
                  <div className="cap-title">
                    <div className={`dot dot-${c.dot}`} />
                    {c.title}
                  </div>
                  <div className="cap-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
