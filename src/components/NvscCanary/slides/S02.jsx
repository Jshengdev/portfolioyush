import { Label } from '../components'

export default function S02() {
  const eras = [
    { year: '2022', title: 'CHATBOTS', desc: 'Talk to AI', stat: 'ChatGPT: 100M users in 2 months', icon: '💬' },
    { year: '2023', title: 'PROMPT ENG.', desc: 'Talk to AI better', stat: 'Prompt engineering becomes a job title', icon: '✨' },
    { year: '2024', title: 'CONTEXT & MEMORY', desc: 'AI remembers you', stat: 'RAG / vector databases explode', icon: '🧠' },
    { year: '2025', title: 'TOOL-USING AGENTS', desc: 'AI uses your tools', stat: 'MCP protocol: 100M+ monthly SDK downloads', icon: '🔧' },
    { year: '2026', title: 'PROACTIVE AUTONOMY', desc: 'AI acts on its own', stat: 'Computer-use agents go mainstream', icon: '⚡', hi: true },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE EVOLUTION</Label>
        <h1 className="hl-xl">The evolution of AI.</h1>
        <p className="sub-text" style={{ marginBottom: '2rem' }}>
          From chatbots to agents that control your computer.
        </p>
        <div className="timeline">
          {eras.map((e, i) => (
            <div key={e.year} className={`timeline-era${e.hi ? ' timeline-era--hi' : ''}`}>
              <div className="era-icon" style={{ fontSize: '1.2rem' }}>{e.icon}</div>
              <div className="era-year">{e.year}</div>
              <div className="era-title">{e.title}</div>
              <div className="era-desc">{e.desc}</div>
              <div className="era-stat">{e.stat}</div>
              {i < eras.length - 1 && <div className="era-connector">→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
