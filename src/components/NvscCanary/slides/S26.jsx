import { Label } from '../components'

export default function S26() {
  const milestones = [
    { date: 'MONTH 6', label: 'Production launch', sub: 'Enterprise pilots \u00B7 full platform live', now: false },
    { date: 'MONTH 12', label: '~43 customers', sub: '$774K ARR \u00B7 organic, developer-first growth', now: false, hi: true },
  ]

  const projections = [
    { year: 'Year 2', customers: '~170 customers', arr: '$5.1M ARR' },
    { year: 'Year 3', customers: '~500 customers', arr: '$12\u201315M ARR' },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>GROWTH</Label>
        <h1 className="hl-xl">Where we're going.</h1>

        <div className="roadmap-grid">
          <div className="milestones">
            {milestones.map((m, i) => (
              <div key={i} className="milestone">
                <div className="ms-line">
                  <div className="ms-dot" />
                  {i < milestones.length - 1 && <div className="ms-track" />}
                </div>
                <div className="ms-content">
                  <div className="ms-date">{m.date}</div>
                  <div className={`ms-label${m.hi ? ' ms-label--hi' : ''}`}>{m.label}</div>
                  <div className="ms-sub">{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="projection-cards">
            <div className="projection-lbl">PATH TO SCALE</div>
            {projections.map(p => (
              <div key={p.year} className="projection-card">
                <div className="projection-year">{p.year}</div>
                <div className="projection-customers">{p.customers}</div>
                <div className="projection-arr">{p.arr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
