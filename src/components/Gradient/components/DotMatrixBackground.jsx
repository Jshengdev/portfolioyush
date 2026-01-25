import { useEffect, useRef, useState, useCallback } from 'react';
import { processDotMatrix, dotMatrixConfig } from '../effects/dotMatrixEffect';

/**
 * DotMatrixBackground
 *
 * Full-section background that processes an image through the dot matrix effect.
 * Based on the terralabs-slideshow pattern - image becomes a stylized background.
 *
 * Usage:
 * <DotMatrixBackground
 *   src="/path/to/screenshot.png"
 *   animated={true}
 *   overlayOpacity={0.5}  // White overlay for text readability
 * >
 *   <YourContent />
 * </DotMatrixBackground>
 */
export default function DotMatrixBackground({
  children,
  src,
  alt = '',
  className = '',
  style = {},
  config = {},
  animated = true,
  overlayOpacity = 0.5,    // White overlay for text readability (0-1)
  overlayColor = '#F6F4F0', // Warm off-white from palette
  imageFit = 'cover',       // 'cover', 'contain', 'small-right'
  backgroundColor = '#F6F4F0',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animationRef = useRef(null);
  const frameCountRef = useRef(0);
  const scanXRef = useRef(0);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });

  const mergedConfig = { ...dotMatrixConfig, ...config };

  // Calculate image dimensions based on fit mode
  const getImageDimensions = useCallback((img, canvasW, canvasH) => {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasW / canvasH;

    let drawWidth, drawHeight, drawX, drawY;

    switch (imageFit) {
      case 'contain':
        // Fit entire image, centered at 85% size
        if (imgAspect > canvasAspect) {
          drawWidth = canvasW * 0.85;
          drawHeight = drawWidth / imgAspect;
        } else {
          drawHeight = canvasH * 0.85;
          drawWidth = drawHeight * imgAspect;
        }
        drawX = (canvasW - drawWidth) / 2;
        drawY = (canvasH - drawHeight) / 2;
        break;

      case 'small-right':
        // Small image positioned to the right (35% size)
        drawHeight = canvasH * 0.35;
        drawWidth = drawHeight * imgAspect;
        drawX = canvasW - drawWidth;
        drawY = (canvasH - drawHeight) / 2;
        break;

      case 'cover':
      default:
        // Fill canvas, cropping as needed
        if (imgAspect > canvasAspect) {
          drawHeight = canvasH;
          drawWidth = drawHeight * imgAspect;
          drawX = (canvasW - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = canvasW;
          drawHeight = drawWidth / imgAspect;
          drawX = 0;
          drawY = (canvasH - drawHeight) / 2;
        }
        break;
    }

    return { drawWidth, drawHeight, drawX, drawY };
  }, [imageFit]);

  // Process image with dot matrix effect
  const processImage = useCallback((ctx, img, animState = undefined) => {
    const { width, height } = canvasSize;

    // Clear and fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Create temp canvas for positioned image
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    // Fill with background color
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, width, height);

    // Draw image with proper positioning
    const dims = getImageDimensions(img, width, height);
    tempCtx.drawImage(img, dims.drawX, dims.drawY, dims.drawWidth, dims.drawHeight);

    // Process through dot matrix
    processDotMatrix(ctx, tempCanvas, Math.max(width, height), mergedConfig, animState);
  }, [canvasSize, backgroundColor, getImageDimensions, mergedConfig]);

  // Animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return;

    const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    frameCountRef.current++;
    scanXRef.current += mergedConfig.scanSpeed;

    const maxDim = Math.max(canvasSize.width, canvasSize.height);
    if (scanXRef.current > maxDim + mergedConfig.scanWidth) {
      scanXRef.current = -mergedConfig.scanWidth;
    }

    processImage(ctx, imageRef.current, {
      scanX: scanXRef.current,
      frameCount: frameCountRef.current,
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [processImage, mergedConfig.scanSpeed, mergedConfig.scanWidth, canvasSize]);

  // Load image
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };

    img.onerror = (err) => {
      console.error('Failed to load background image:', src, err);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Set canvas size
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasSize.width;
      canvasRef.current.height = canvasSize.height;
    }
  }, [canvasSize]);

  // Process/animate when ready
  useEffect(() => {
    if (!imageLoaded || !imageRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    if (animated) {
      frameCountRef.current = 0;
      scanXRef.current = -mergedConfig.scanWidth;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      processImage(ctx, imageRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [imageLoaded, animated, animate, processImage, mergedConfig.scanWidth]);

  return (
    <div
      ref={containerRef}
      className={`dot-matrix-bg relative w-full ${className}`}
      style={{ backgroundColor, minHeight: '100vh', ...style }}
    >
      {/* Dot matrix canvas background */}
      {src && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: 'auto' }}
          aria-hidden="true"
        />
      )}

      {/* White/color overlay for text readability */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content on top */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Screen reader description */}
      {alt && <span className="sr-only">{alt}</span>}
    </div>
  );
}
