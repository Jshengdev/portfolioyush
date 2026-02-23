import { Label } from '../components'

export default function S05() {
  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE EXPLOSION</Label>
        <h1 className="hl-xl">The agent wave is here.</h1>
        <div className="explosion-grid">
          <div>
            <div className="wave-card">
              <div className="wave-emoji">⚡</div>
              <div className="wave-co">OPENCLAW</div>
              <div className="wave-stat">220,000+ GitHub Stars</div>
              <div className="wave-sub">
                1.5 million agents created · 600K–900K weekly npm downloads · 10,700+ community-contributed skills
              </div>
              <div className="badge badge-green">[VIRAL]</div>
              <div className="explosion-note">Fastest-growing open-source AI project since ChatGPT</div>
            </div>
            <img src="/assets/NvscCanary/slide5-openclawgithubstars.png" alt="OpenClaw GitHub page showing 220k stars" style={{ width: '100%', borderRadius: 8, marginTop: '0.75rem' }} />
          </div>

          <div>
            <div className="wave-card">
              <div className="wave-emoji">💰</div>
              <div className="wave-co">ENTERPRISE SIGNALS</div>
              <div className="wave-stat">$2B — Meta Acquires Manus AI</div>
              <div className="wave-sub">
                OpenAI hired the OpenClaw founder (2026) · Microsoft, Anthropic, Google — all shipping computer control
              </div>
              <div className="badge badge-amber">[BIG CO.]</div>
            </div>
            <div className="wave-bottom">
              <strong>The industry isn't debating whether agents will control our computers.</strong>{' '}
              They already do. Every new YC startup is building tool-use agents, not chatbot wrappers.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
