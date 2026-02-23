export default function StatCard({ num, numColor, label, light = false }) {
  return (
    <div className={`stat-card${light ? ' stat-card--light' : ''}`}>
      <div className={`stat-card-num ${numColor}`}>{num}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  )
}
