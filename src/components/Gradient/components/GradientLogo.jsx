// Arrow/Bird logo for Gradient brand
export default function GradientLogo({ className = "", color = "white", size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arrow/Bird shape pointing right-up */}
      <path
        d="M25 95 L60 60 L25 25 L60 25 L95 60 L60 95 L60 60 L25 95Z"
        fill={color}
      />
      {/* Simplified arrow pointing direction */}
      <path
        d="M35 85 L55 60 L35 35 L55 35 L85 60 L55 85 Z"
        fill={color}
      />
    </svg>
  );
}

// Simplified arrow version matching the PDF more closely
export function ArrowLogo({ className = "", color = "white", size = 100 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main arrow shape */}
      <path
        d="M20 80 L50 50 L20 20 L50 20 L80 50 L50 80 L50 50 Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
}

// More accurate recreation based on PDF
export function BrandArrow({ className = "", color = "white", size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Chevron/Arrow pointing right-up */}
      <path
        d="M15 65 L40 40 L15 15 L25 15 L55 40 L55 45 L25 70 L15 70 L15 65Z
           M25 55 L40 40 L25 25 L35 25 L55 40 L55 45 L35 60 L25 60 L25 55Z"
        fill={color}
      />
    </svg>
  );
}
