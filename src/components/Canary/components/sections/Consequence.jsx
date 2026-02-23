import useCountUp from '../../hooks/useCountUp'

export default function Consequence() {
  const { ref: numRef, display } = useCountUp(70, { suffix: '%', duration: 2 })

  return (
    <section className="consequence">
      <div className="consequence-inner">
        <div className="consequence-stat" ref={numRef}>{display}</div>
        <p className="consequence-sub">of AI agents fail at real-world tasks.</p>
        <p className="consequence-detail">Developers are deploying blind.</p>
      </div>
    </section>
  )
}
