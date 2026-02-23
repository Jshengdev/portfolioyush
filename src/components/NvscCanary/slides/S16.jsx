import { Label } from '../components'

export default function S16() {
  const milestones = [
    { date: 'NOW', label: 'Customer discovery + MVP design', sub: 'Building observation layer + cloud infrastructure', now: true },
    { date: 'WEEKS 4–6', label: 'QA reports + beta launch', sub: 'First developer teams running live QA', now: false },
    { date: 'APR 16', label: '10 beta teams with quantified data', sub: 'Measurable results on what the platform catches', now: false },
    { date: 'MONTH 6', label: 'Production launch', sub: 'Enterprise pilots · full platform live', now: false },
    { date: 'MONTH 12', label: '~43 customers · $774K ARR', sub: 'Organic, developer-first growth', now: false },
  ]

  const projections = [
    { year: 'Year 2', customers: '~170', arr: '$5.1M ARR' },
    { year: 'Year 3', customers: '~500', arr: '$12–15M ARR' },
  ]

  return (
    <div className="slide slide-dark">
      <div className="slide-inner">
        <Label>MILESTONES</Label>
        <h1 className="hl-xl">Where we are.<br />Where we're going.</h1>

        <div className="roadmap-grid">
          <div className="milestones">
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

          <div className="projection-cards">
            <div className="projection-lbl">PATH TO SCALE</div>
            {projections.map(p => (
              <div key={p.year} className="projection-card">
                <div className="projection-year">{p.year}</div>
                <div className="projection-customers">{p.customers} customers</div>
                <div className="projection-arr">{p.arr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
