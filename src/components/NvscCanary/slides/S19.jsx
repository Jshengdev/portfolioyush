import { Label, CanaryLogo } from '../components'

export default function S19() {
  return (
    <div className="slide slide-light">
      <div className="slide-inner">
        <Label light>COMPETITION</Label>
        <h1 className="hl-xl hl-xl--light"><span className="kw-red">Nobody</span> QAs computer-use agents.</h1>

        <div className="matrix-wrapper">
          {/* Y-axis — flipped: Agent-Specific on top */}
          <div className="matrix-y">
            <div className="matrix-y-txt">AGENT-SPECIFIC</div>
            <div className="matrix-y-arrow">{'\u2195'}</div>
            <div className="matrix-y-txt">GENERAL LLM EVAL</div>
          </div>

          <div className="matrix-right">
            {/* X-axis */}
            <div className="matrix-x">
              <div className="mx-half">API / CHATBOT LEVEL</div>
              <div className="mx-arrow">{'\u2192'}</div>
              <div className="mx-half">COMPUTER-USE LEVEL</div>
            </div>

            {/* 2x2 — Canary in top-right */}
            <div className="matrix-grid">
              {/* Top-left: Agent-Specific + API */}
              <div className="q q-tl">
                <div className="comp-pill">AgentOps <span className="comp-val">$2.6M raised</span></div>
                <div className="comp-pill">Langfuse <span className="comp-val">acquired by ClickHouse</span></div>
              </div>

              {/* Top-right: Agent-Specific + Computer-Use — CANARY */}
              <div className="q q-br">
                <div className="we-here">
                  <div className="we-badge">{'\u2190'} WE ARE HERE</div>
                  <CanaryLogo size={28} color="var(--indigo)" />
                  <div className="we-name">CANARY</div>
                  <div className="we-sub">Screen-level agent QA.<br />Completely uncontested.</div>
                  <div className="we-owns">OWNS ENTIRE QUADRANT</div>
                </div>
              </div>

              {/* Bottom-left: General LLM + API */}
              <div className="q q-bl" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.12)' }}>
                <div className="comp-pill">LangSmith <span className="comp-val">$1.25B val.</span></div>
                <div className="comp-pill">Braintrust <span className="comp-val">$800M {'\u00B7'} raised $80M</span></div>
                <div className="comp-pill">Arize <span className="comp-val">$131M raised</span></div>
              </div>

              {/* Bottom-right: General LLM + Computer-Use — EMPTY */}
              <div className="q q-tr">
                <div className="q-empty">
                  <div className="q-empty-tag">EMPTY</div>
                  <div className="q-empty-sub">No general screen-level eval tool exists</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="matrix-footer">
          These tools QA chatbots. <strong><span className="kw-red">Nobody</span> QAs computer-use agents.</strong>
        </div>
      </div>
    </div>
  )
}
