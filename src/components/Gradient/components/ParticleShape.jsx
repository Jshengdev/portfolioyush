// Simple CSS-based particle/grain shape component
// Uses SVG noise filter for the grainy texture effect

export default function ParticleShape({
  className = "",
  colors = ['#9FB8A0', '#D8B4A0'], // Default green to peach gradient
  shape = 'blob1', // 'blob1', 'blob2', 'circle'
  opacity = 0.6,
  style = {}
}) {
  // Define organic blob shapes using CSS clip-path or border-radius
  const shapes = {
    blob1: {
      borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
    },
    blob2: {
      borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%',
    },
    blob3: {
      borderRadius: '60% 40% 50% 50% / 40% 60% 40% 60%',
    },
    circle: {
      borderRadius: '50%',
    }
  };

  const shapeStyle = shapes[shape] || shapes.blob1;

  // Create gradient string from colors
  const gradient = colors.length > 1
    ? `linear-gradient(135deg, ${colors.join(', ')})`
    : colors[0];

  return (
    <div
      className={`relative ${className}`}
      style={{
        opacity,
        ...style
      }}
    >
      {/* Base gradient shape */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          ...shapeStyle,
        }}
      />

      {/* Noise/grain overlay */}
      <div
        className="absolute inset-0"
        style={{
          ...shapeStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          opacity: 0.6,
        }}
      />

      {/* Secondary noise layer for more texture */}
      <div
        className="absolute inset-0"
        style={{
          ...shapeStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// Star decoration component
export function StarDecor({ className = "", color = "#FFFFFF", size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={color}
    >
      <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5Z" />
    </svg>
  );
}
