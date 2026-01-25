import { useEffect, useRef, useState, useCallback } from 'react';
import { processDotMatrix, dotMatrixConfig } from '../effects/dotMatrixEffect';

/**
 * DotMatrixImage
 *
 * A container that takes an image and applies the dot matrix effect.
 * Each instance is isolated but shares the global effect configuration.
 *
 * Usage:
 * <DotMatrixImage
 *   src="/path/to/image.png"
 *   alt="Description"
 *   className="w-full h-64"
 *   animated={true}
 *   config={{ gridSize: 3 }}  // Optional overrides
 * />
 */
export default function DotMatrixImage({
  src,
  alt = '',
  className = '',
  style = {},
  config = {},           // Override effect config for this instance
  animated = false,      // Enable scan line animation
  onLoad = () => {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animationRef = useRef(null);
  const frameCountRef = useRef(0);
  const scanXRef = useRef(0);

  const [imageLoaded, setImageLoaded] = useState(false);

  // Merge configs
  const mergedConfig = { ...dotMatrixConfig, ...config };

  // Process image callback - now passes both width and height
  const processImage = useCallback((ctx, img, width, height, overrideSettings = {}, animState = undefined) => {
    processDotMatrix(ctx, img, width, height, { ...mergedConfig, ...overrideSettings }, animState);
  }, [mergedConfig]);

  // Animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return;

    const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    frameCountRef.current++;
    scanXRef.current += mergedConfig.scanSpeed;

    if (scanXRef.current > canvasWidth + mergedConfig.scanWidth) {
      scanXRef.current = -mergedConfig.scanWidth;
    }

    processImage(ctx, imageRef.current, canvasWidth, canvasHeight, {}, {
      scanX: scanXRef.current,
      frameCount: frameCountRef.current,
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [processImage, mergedConfig.scanSpeed, mergedConfig.scanWidth]);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      onLoad(img);
    };

    img.onerror = (err) => {
      console.error('Failed to load image:', src, err);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  // Process/animate when image loads or settings change
  useEffect(() => {
    if (!imageLoaded || !imageRef.current || !canvasRef.current || !containerRef.current) return;

    const img = imageRef.current;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth || 800;
    const maxSize = mergedConfig.canvasSize || 800;

    // Use image's native aspect ratio
    const imgAspect = img.naturalWidth / img.naturalHeight;

    // Calculate canvas dimensions based on container width
    let canvasWidth = Math.min(containerWidth, maxSize);
    let canvasHeight = canvasWidth / imgAspect;

    // Ensure neither dimension exceeds maxSize
    if (canvasHeight > maxSize) {
      canvasHeight = maxSize;
      canvasWidth = canvasHeight * imgAspect;
    }

    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;

    const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (animated) {
      frameCountRef.current = 0;
      scanXRef.current = -mergedConfig.scanWidth;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      processImage(ctx, imageRef.current, canvasWidth, canvasHeight);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [imageLoaded, animated, animate, processImage, mergedConfig.canvasSize, mergedConfig.scanWidth]);

  // Re-process on config change (non-animated)
  useEffect(() => {
    if (imageLoaded && !animated && imageRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        processImage(ctx, imageRef.current, canvasWidth, canvasHeight);
      }
    }
  }, [config, imageLoaded, animated, processImage]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!imageLoaded || !canvasRef.current || !containerRef.current || !imageRef.current) return;

      const img = imageRef.current;
      const container = containerRef.current;
      const containerWidth = container.offsetWidth || 800;
      const maxSize = mergedConfig.canvasSize || 800;

      const imgAspect = img.naturalWidth / img.naturalHeight;

      let canvasWidth = Math.min(containerWidth, maxSize);
      let canvasHeight = canvasWidth / imgAspect;

      if (canvasHeight > maxSize) {
        canvasHeight = maxSize;
        canvasWidth = canvasHeight * imgAspect;
      }

      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;

      if (!animated) {
        const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          processImage(ctx, imageRef.current, canvasWidth, canvasHeight);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageLoaded, animated, processImage, mergedConfig.canvasSize]);

  return (
    <div
      ref={containerRef}
      className={`dot-matrix-container relative flex items-center justify-center ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: 'auto',
          display: 'block',
        }}
      />

      {/* Loading state */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F6F4F0]">
          <div className="w-8 h-8 border-2 border-[#9FB8A0] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Screen reader accessible description */}
      <span className="sr-only">{alt}</span>
    </div>
  );
}

/**
 * Export function to download the current canvas as PNG
 */
export function downloadDotMatrixPNG(canvasRef, filename = 'dot-matrix') {
  if (!canvasRef.current) return;

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvasRef.current.toDataURL('image/png');
  link.click();
}
