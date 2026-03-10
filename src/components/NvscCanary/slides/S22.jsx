import { Label } from '../components'

export default function S22() {
  const tiers = [
    {
      name: 'FREE / OSS', price: '$0', period: '', desc: 'SDK + local logging',
      features: ['npm install @canary/sdk', 'Local behavior logs', 'Community docs', 'Unlimited agents'],
      hi: false,
    },
    {
      name: 'TEAM', price: '$499', period: '/mo', desc: 'Cloud dashboard + QA reports',
      features: ['Cloud dashboard', 'Automated QA scoring', 'Pass/fail reports + alerts', 'Up to 10 agents'],
      hi: true,
    },
    {
      name: 'GROWTH', price: '$1,999', period: '/mo', desc: 'Pattern intelligence',
      features: ['Everything in Team', 'Cross-agent patterns', 'Advanced analytics', 'Priority support'],
      hi: false,
    },
    {
      name: 'ENTERPRISE', price: '$5\u201320K', period: '/mo', desc: 'Compliance + custom QA',
      features: ['Custom eval configs', 'Compliance reports', 'SOC 2 + SLA', 'Dedicated success'],
      hi: false,
    },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>BUSINESS MODEL</Label>
        <h1 className="hl-xl" style={{ marginBottom: '0.4rem' }}>Usage-based + enterprise tiers.</h1>
        <p className="sub-text" style={{ marginBottom: '1.5rem' }}>Free OSS drives adoption. Enterprise contracts drive revenue. <span className="kw">Data flywheel = moat.</span></p>
        <div className="tiers-grid">
          {tiers.map(t => (
            <div key={t.name} className={`tier-card${t.hi ? ' tier-card--hi' : ''}`}>
              <div className="tier-name">{t.name}</div>
              <div className="tier-price">{t.price}<span className="tier-period">{t.period}</span></div>
              <div className="tier-desc">{t.desc}</div>
              <div className="tier-divider" />
              {t.features.map(f => (
                <div key={f} className="tier-feature"><span className="tier-check">{'\u2713'}</span>{f}</div>
              ))}
            </div>
          ))}
        </div>

        <div className="flywheel">
          <div className="flywheel-lbl">GROWTH MODEL (NO PAID MARKETING)</div>
          <div className="flywheel-steps">
            {['Open-source SDK', 'Free tier adoption', 'Team upgrade', 'Enterprise expansion', 'Data flywheel'].map((s, i, a) => (
              <span key={s} style={{ display: 'contents' }}>
                <div className="fly-step">{s}</div>
                {i < a.length - 1 && <div className="fly-arrow">{'\u2192'}</div>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
