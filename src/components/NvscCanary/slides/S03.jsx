import { Label } from '../components'

export default function S03() {
  const eras = [
    { year: '2022', title: 'CHATBOTS', desc: 'Talk to AI', stat: 'ChatGPT: 100M users in 2 months', icon: '\u{1F4AC}' },
    { year: '2023', title: 'PROMPT ENG.', desc: 'Talk to AI better', stat: 'Prompt engineering becomes a job title', icon: '\u2728' },
    { year: '2024', title: 'CONTEXT & MEMORY', desc: 'AI remembers you', stat: 'RAG / vector databases explode', icon: '\u{1F9E0}' },
    { year: '2025', title: 'TOOL-USING AGENTS', desc: 'AI uses your tools', stat: 'MCP protocol: 100M+ monthly SDK downloads', icon: '\u{1F527}' },
    { year: '2026', title: 'PROACTIVE AUTONOMY', desc: 'AI acts on its own', stat: 'Computer-use agents go mainstream', icon: '\u26A1', hi: true },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE EVOLUTION</Label>
        <h1 className="hl-xl">The evolution of AI.</h1>
        <p className="sub-text" style={{ marginBottom: '2rem' }}>
          From chatbots to <span className="kw-glow" style={{ fontSize: '1.45em' }}>proactive autonomy</span>. AI that acts on its own.
        </p>
        <div className="timeline">
          {eras.map((e, i) => (
            <div key={e.year} className={`timeline-era${e.hi ? ' timeline-era--hi' : ''}`}>
              <div className="era-icon" style={{ fontSize: '1.2rem' }}>{e.icon}</div>
              <div className="era-year">{e.year}</div>
              <div className="era-title">{e.title}</div>
              <div className="era-desc">{e.desc}</div>
              <div className="era-stat">{e.stat}</div>
              {i < eras.length - 1 && <div className="era-connector">{'\u2192'}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
