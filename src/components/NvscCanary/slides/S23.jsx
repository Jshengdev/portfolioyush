import { Label } from '../components'

export default function S23() {
  const whyNow = [
    { num: '01', icon: '\u{1F195}', text: "Category didn't exist until 3 months ago", sub: 'Computer-use agents just launched — no incumbents' },
    { num: '02', icon: '\u{1F500}', text: 'Chatbot QA \u2260 computer-use QA', sub: 'Fundamentally different architecture — screen vs. API' },
    { num: '03', icon: '\u{1F4C9}', text: 'Vision AI costs just dropped 95%', sub: 'Now economically viable to observe agent behavior continuously' },
    { num: '04', icon: '\u{1F512}', text: 'Incumbents locked into API-level architecture', sub: "They can't just add a feature — they'd have to rebuild" },
  ]

  return (
    <div className="slide slide-light">
      <div className="slide-inner">
        <Label light>WHY NOW</Label>
        <h1 className="hl-xl hl-xl--light">We're here <span className="kw-indigo">first</span>.</h1>

        <div className="whynow-cards">
          {whyNow.map(w => (
            <div key={w.num} className="whynow-card">
              <div className="whynow-icon">{w.icon}</div>
              <div className="whynow-body">
                <div className="whynow-title">{w.text}</div>
                <div className="whynow-sub">{w.sub}</div>
              </div>
              <div className="whyus-num">{w.num}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
