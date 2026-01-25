import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { createSprayPaintSketch, effectConfig } from '../effects/sprayPaintEffect';

/**
 * ParticleImageContainer
 *
 * A container that takes an image and applies the spray paint particle effect.
 * Each instance is isolated but shares the same effect configuration.
 *
 * Usage:
 * <ParticleImageContainer
 *   src="/path/to/image.png"
 *   alt="Description"
 *   className="w-full h-64"
 *   config={{ particleDensity: 0.2 }}  // Optional overrides
 * />
 */
export default function ParticleImageContainer({
  src,
  alt = '',
  className = '',
  style = {},
  config = {},        // Override effect config for this instance
  showOriginal = false, // Show original image underneath
  originalOpacity = 0,  // Opacity of original image (0-1)
  onLoad = () => {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Load image and get dimensions
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      setImageLoaded(true);
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
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

  // Initialize p5 sketch when image is loaded
  useEffect(() => {
    if (!imageLoaded || !containerRef.current || !canvasRef.current) return;

    // Get container dimensions
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create the image element for p5
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      // Remove existing p5 instance
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }

      // Create new p5 instance
      const sketch = createSprayPaintSketch(img, {
        ...effectConfig,
        ...config,
      });

      // Custom sketch wrapper to set canvas size
      const wrappedSketch = (p) => {
        const originalSetup = sketch(p).setup;

        p.setup = () => {
          p.createCanvas(width, height);
          // Run the original setup logic
          sketch(p);
        };

        // Copy other methods
        const sketchInstance = sketch(p);
        Object.keys(sketchInstance).forEach((key) => {
          if (key !== 'setup') {
            p[key] = sketchInstance[key];
          }
        });
      };

      // Create p5 instance attached to canvas container
      p5InstanceRef.current = new p5((p) => {
        p.setup = () => {
          const canvas = p.createCanvas(width, height);
          canvas.parent(canvasRef.current);
          p.noStroke();

          // Initialize particles from image
          const particles = [];
          const mergedConfig = { ...effectConfig, ...config };

          // Load image into p5
          p.loadImage(src, (pImg) => {
            pImg.loadPixels();

            const numParticles = Math.floor(
              width * height * mergedConfig.particleDensity
            );
            const scaleX = pImg.width / width;
            const scaleY = pImg.height / height;

            for (let i = 0; i < numParticles; i++) {
              const x = p.random(width);
              const y = p.random(height);

              const imgX = Math.floor(x * scaleX);
              const imgY = Math.floor(y * scaleY);
              const idx = (imgY * pImg.width + imgX) * 4;

              let r = pImg.pixels[idx] || 0;
              let g = pImg.pixels[idx + 1] || 0;
              let b = pImg.pixels[idx + 2] || 0;
              let a = pImg.pixels[idx + 3] || 255;

              // Skip transparent pixels
              if (a < 10) continue;

              // Apply color variation
              if (mergedConfig.colorPalette && mergedConfig.colorPalette.length > 0) {
                const paletteColor = p.random(mergedConfig.colorPalette);
                const c = p.color(paletteColor);
                r = p.red(c) + p.random(-mergedConfig.colorVariation, mergedConfig.colorVariation);
                g = p.green(c) + p.random(-mergedConfig.colorVariation, mergedConfig.colorVariation);
                b = p.blue(c) + p.random(-mergedConfig.colorVariation, mergedConfig.colorVariation);
              } else {
                r += p.random(-mergedConfig.colorVariation, mergedConfig.colorVariation);
                g += p.random(-mergedConfig.colorVariation, mergedConfig.colorVariation);
                b += p.random(-mergedConfig.colorVariation, mergedConfig.colorVariation);
              }

              r = p.constrain(r, 0, 255);
              g = p.constrain(g, 0, 255);
              b = p.constrain(b, 0, 255);

              particles.push({
                x: x + p.random(-mergedConfig.spraySpread, mergedConfig.spraySpread),
                y: y + p.random(-mergedConfig.spraySpread, mergedConfig.spraySpread),
                baseX: x,
                baseY: y,
                size: p.random(mergedConfig.minParticleSize, mergedConfig.maxParticleSize),
                color: [r, g, b],
                alpha: p.random(mergedConfig.minAlpha, mergedConfig.maxAlpha),
                noiseOffsetX: p.random(1000),
                noiseOffsetY: p.random(1000),
              });
            }

            // Store particles for draw loop
            p._particles = particles;
            p._config = mergedConfig;
            p._noiseOffset = 0;
          });
        };

        p.draw = () => {
          if (!p._particles || p._particles.length === 0) return;

          p.clear();
          const config = p._config;

          for (const particle of p._particles) {
            let x = particle.baseX;
            let y = particle.baseY;

            if (config.animated) {
              const noiseX = p.noise(
                particle.noiseOffsetX + p._noiseOffset,
                particle.noiseOffsetY
              );
              const noiseY = p.noise(
                particle.noiseOffsetX,
                particle.noiseOffsetY + p._noiseOffset
              );

              x += (noiseX - 0.5) * config.noiseStrength * 10;
              y += (noiseY - 0.5) * config.noiseStrength * 10;
            }

            p.fill(
              particle.color[0],
              particle.color[1],
              particle.color[2],
              particle.alpha
            );

            p.ellipse(x, y, particle.size, particle.size);
          }

          if (config.animated) {
            p._noiseOffset += config.animationSpeed;
          }
        };
      });
    };

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [imageLoaded, src, config]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (p5InstanceRef.current && containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        p5InstanceRef.current.resizeCanvas(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`particle-image-container relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Original image (optional, for reference/blending) */}
      {showOriginal && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: originalOpacity }}
        />
      )}

      {/* P5 Canvas container */}
      <div
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Screen reader accessible description */}
      <span className="sr-only">{alt}</span>
    </div>
  );
}
