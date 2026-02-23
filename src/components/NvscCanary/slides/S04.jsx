import { Label } from '../components'

export default function S04() {
  const signals = [
    { name: 'OpenClaw', sub: 'Open-source computer-use agent', img: '/assets/NvscCanary/s04-openclaw.webp' },
    { name: 'Manus AI', sub: 'Acquired by Meta · $2B', img: '/assets/NvscCanary/s04-manus.avif' },
    { name: 'Claude Computer Use', sub: 'Anthropic', img: '/assets/NvscCanary/s04-claude-computer-use.avif' },
    { name: 'OpenAI Operator', sub: 'OpenAI', img: '/assets/NvscCanary/s04-openai-operator.webp' },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-center">
        <div className="happening-block">
          <Label>THE SIGNAL</Label>
          <div className="happening-quote">
            2026 is the year AI<br />acts on its own.
          </div>
          <div className="happening-logos">
            {signals.map(s => (
              <div key={s.name} className="signal-card">
                <div className="signal-img-wrap">
                  <img src={s.img} alt={s.name} className="signal-img" />
                </div>
                <div className="signal-name">{s.name}</div>
                <div className="signal-sub">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="happening-sub">
            This isn't a future prediction. The signals are already here. This is happening now.
          </div>
        </div>
      </div>
    </div>
  )
}
