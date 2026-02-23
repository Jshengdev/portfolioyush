import { Label, CanaryLogo } from '../components'

export default function S09() {
  return (
    <div className="slide slide-light">
      <div className="slide-inner">
        <Label light>COMPETITION</Label>
        <h1 className="hl-xl hl-xl--light">Nobody QAs computer-use agents.</h1>

        <div className="matrix-wrapper">
          {/* Y-axis */}
          <div className="matrix-y">
            <div className="matrix-y-txt">GENERAL LLM EVAL</div>
            <div className="matrix-y-arrow">↕</div>
            <div className="matrix-y-txt">AGENT-SPECIFIC</div>
          </div>

          <div className="matrix-right">
            {/* X-axis */}
            <div className="matrix-x">
              <div className="mx-half">API / CHATBOT LEVEL</div>
              <div className="mx-arrow">→</div>
              <div className="mx-half">COMPUTER-USE LEVEL</div>
            </div>

            {/* 2x2 */}
            <div className="matrix-grid">
              {/* Top-left: General + API */}
              <div className="q q-tl">
                <div className="comp-pill">LangSmith <span className="comp-val">$1.25B val.</span></div>
                <div className="comp-pill">Braintrust <span className="comp-val">$800M · raised $80M Feb 2026</span></div>
                <div className="comp-pill">Arize <span className="comp-val">$131M raised</span></div>
              </div>

              {/* Top-right: General + Screen — EMPTY */}
              <div className="q q-tr">
                <div className="q-empty">
                  <div className="q-empty-tag">EMPTY</div>
                  <div className="q-empty-sub">No tool evaluates general screen-level agent behavior</div>
                </div>
              </div>

              {/* Bottom-left: Agent + API */}
              <div className="q q-bl">
                <div className="comp-pill">AgentOps <span className="comp-val">$2.6M raised</span></div>
                <div className="comp-pill">Langfuse <span className="comp-val">acquired by ClickHouse</span></div>
              </div>

              {/* Bottom-right: Agent + Screen — CANARY */}
              <div className="q q-br">
                <div className="we-here">
                  <div className="we-badge">← WE ARE HERE</div>
                  <CanaryLogo size={28} color="var(--indigo)" />
                  <div className="we-name">CANARY</div>
                  <div className="we-sub">Screen-level agent QA.<br />Completely uncontested.</div>
                  <div className="we-owns">OWNS ENTIRE QUADRANT</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="matrix-footer">
          These tools QA chatbots. <strong>Nobody QAs computer-use agents.</strong>
        </div>
      </div>
    </div>
  )
}
