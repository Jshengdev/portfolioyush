import { Label } from '../components'

export default function S07() {
  const signals = [
    { name: 'OpenClaw', sub: 'Open-source computer-use agent', img: '/assets/NvscCanary/s04-openclaw.webp' },
    { name: 'Manus AI', sub: 'Acquired by Meta \u00B7 $2B', img: '/assets/NvscCanary/s04-manus.avif' },
    { name: 'Claude Computer Use', sub: 'Anthropic', img: '/assets/NvscCanary/s04-claude-computer-use.avif' },
    { name: 'OpenAI Operator', sub: 'OpenAI', img: '/assets/NvscCanary/s04-openai-operator.webp' },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>THE SIGNAL</Label>
        <p className="sub-text" style={{ marginBottom: '1.5rem' }}>Every major lab is now shipping computer control.</p>
        <div className="signal-grid-lg">
          {signals.map(s => (
            <div key={s.name} className="signal-card signal-card--lg">
              <div className="signal-img-wrap signal-img-wrap--lg">
                <img src={s.img} alt={s.name} className="signal-img" />
              </div>
              <div className="signal-name" style={{ fontSize: '0.9rem' }}>{s.name}</div>
              <div className="signal-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
