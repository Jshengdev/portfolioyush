import { useEffect, useRef, useState } from 'react';

/**
 * BackgroundCanvas
 *
 * Single continuous canvas that spans the entire page height.
 * Renders decorative blob shapes with dot matrix particle effect.
 */

// Shape definitions - positioned as percentage of total page height
const shapes = [
  { x: -5, y: 2, size: 400, color: '#9FB8A0', type: 'blob1' },      // Slide 1 top-left
  { x: 85, y: 5, size: 350, color: '#D8B4A0', type: 'blob2' },      // Slide 1-2 right
  { x: -8, y: 18, size: 300, color: '#D8B4A0', type: 'blob1' },     // Slide 2-3 left
  { x: 90, y: 25, size: 380, color: '#9FB8A0', type: 'blob2' },     // Slide 3 right
  { x: -5, y: 35, size: 450, color: '#9FB8A0', type: 'blob1' },     // Slide 4 left
  { x: 88, y: 42, size: 320, color: '#D8B4A0', type: 'blob2' },     // Slide 4-5 right
  { x: -10, y: 55, size: 380, color: '#D8B4A0', type: 'blob1' },    // Slide 5-6 left
  { x: 85, y: 62, size: 400, color: '#9FB8A0', type: 'blob2' },     // Slide 6-7 right
  { x: -5, y: 75, size: 350, color: '#9FB8A0', type: 'blob1' },     // Slide 7-8 left
  { x: 90, y: 82, size: 300, color: '#D8B4A0', type: 'blob2' },     // Slide 8-9 right
  { x: -8, y: 92, size: 380, color: '#D8B4A0', type: 'blob1' },     // Slide 9 left
];

// Dot matrix config for shapes
const dotConfig = {
  gridSize: 8,
  opacity: 0.35,
};

export default function BackgroundCanvas({ totalSlides = 9 }) {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  const scrollRef = useRef(0);

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight * totalSlides;
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [totalSlides]);

  // Track scroll position (not currently used for rendering but kept for future use)
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw shapes with dot matrix effect
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each shape
    shapes.forEach(shape => {
      drawDotMatrixBlob(ctx, shape, dimensions);
    });

  }, [dimensions]);

  return (
    <div
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{
        height: `${totalSlides * 100}vh`,
        zIndex: 0,
        backgroundColor: '#F6F4F0',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}

/**
 * Draw a blob shape with dot matrix effect
 */
function drawDotMatrixBlob(ctx, shape, dimensions) {
  const { width, height } = dimensions;
  const { gridSize, opacity } = dotConfig;

  // Calculate actual position
  const centerX = (shape.x / 100) * width;
  const centerY = (shape.y / 100) * height;
  const radius = shape.size;

  // Parse color to RGB
  const rgb = hexToRgb(shape.color);
  if (!rgb) return;

  // Create blob path for clipping
  ctx.save();

  // Draw dots within the blob area
  const startX = Math.max(0, centerX - radius);
  const endX = Math.min(width, centerX + radius);
  const startY = Math.max(0, centerY - radius);
  const endY = Math.min(height, centerY + radius);

  for (let x = startX; x < endX; x += gridSize) {
    for (let y = startY; y < endY; y += gridSize) {
      // Calculate distance from center
      const dx = x - centerX;
      const dy = y - centerY;

      // Blob shape distortion (organic edges)
      const angle = Math.atan2(dy, dx);
      const blobRadius = radius * (0.8 + 0.2 * Math.sin(angle * 3) * Math.cos(angle * 2));

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < blobRadius) {
        // Calculate opacity based on distance from center (softer edges)
        const edgeFade = 1 - Math.pow(distance / blobRadius, 2);
        const dotOpacity = opacity * edgeFade;

        // Vary dot size based on position
        const sizeVariation = 0.5 + 0.5 * Math.sin(x * 0.05) * Math.cos(y * 0.05);
        const dotSize = gridSize * 0.4 * sizeVariation;

        // Vary shape (circle, square, diamond)
        const shapeType = Math.floor((x + y) / gridSize) % 3;

        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${dotOpacity})`;

        drawDotShape(ctx, x, y, dotSize, shapeType);
      }
    }
  }

  ctx.restore();
}

/**
 * Draw individual dot with shape variation
 */
function drawDotShape(ctx, x, y, size, shapeType) {
  ctx.beginPath();

  switch (shapeType) {
    case 0: // Circle
      ctx.arc(x, y, size, 0, Math.PI * 2);
      break;
    case 1: // Square
      ctx.rect(x - size, y - size, size * 2, size * 2);
      break;
    case 2: // Diamond
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      break;
    default:
      ctx.arc(x, y, size, 0, Math.PI * 2);
  }

  ctx.fill();
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
