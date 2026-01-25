export default function Logo({ className = '', size = 36 }) {
  return (
    <div className={className}>
      {/* Bar chart icon with soft green to oak gradient */}
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A9A7A" />
            <stop offset="35%" stopColor="#9FB8A0" />
            <stop offset="65%" stopColor="#B8A080" />
            <stop offset="100%" stopColor="#D8B4A0" />
          </linearGradient>
        </defs>
        {/* Bar 1 - tall */}
        <rect x="2" y="8" width="6" height="28" rx="2" fill="url(#logoGradient)" />
        {/* Bar 2 - taller */}
        <rect x="11" y="4" width="6" height="32" rx="2" fill="url(#logoGradient)" opacity="0.85" />
        {/* Bar 3 - medium */}
        <rect x="20" y="14" width="6" height="22" rx="2" fill="url(#logoGradient)" opacity="0.65" />
        {/* Bar 4 - short */}
        <rect x="29" y="20" width="6" height="16" rx="2" fill="url(#logoGradient)" opacity="0.45" />
      </svg>
    </div>
  );
}
