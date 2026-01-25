/**
 * SlideSection - Consistent slide wrapper for the presentation
 * Ensures proper centering, scroll-snap, and consistent styling
 */
export default function SlideSection({
  children,
  id,
  className = '',
  bgColor = 'var(--color-background)',
  ariaLabel,
}) {
  return (
    <section
      id={id}
      className={`min-h-screen w-full scroll-snap-align-start relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-label={ariaLabel}
    >
      <div className="w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-16 py-16">
        {children}
      </div>
    </section>
  );
}
