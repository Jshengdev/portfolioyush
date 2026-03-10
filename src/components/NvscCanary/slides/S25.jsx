import { Label } from '../components'

export default function S25() {
  const milestones = [
    { date: 'NOW', label: 'Customer discovery + MVP design', sub: 'Building the observation layer + cloud infrastructure', now: true },
    { date: 'WEEKS 4\u20136', label: 'QA reports + beta launch', sub: 'First developer teams running live QA on their agents', now: false },
    { date: 'APR 16', label: '10 beta teams with quantified data', sub: 'Measurable results on what the platform catches', now: false },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>MILESTONES</Label>
        <h1 className="hl-xl">Where we are.</h1>
        <p className="sub-text" style={{ marginBottom: '2rem' }}>Building, validating, shipping.</p>

        <div className="milestones" style={{ maxWidth: 560 }}>
          {milestones.map((m, i) => (
            <div key={i} className="milestone">
              <div className="ms-line">
                <div className={`ms-dot${m.now ? ' ms-dot--now' : ''}`} />
                {i < milestones.length - 1 && <div className="ms-track" />}
              </div>
              <div className="ms-content">
                <div className="ms-date">{m.date}</div>
                <div className="ms-label">{m.label}</div>
                <div className="ms-sub">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
