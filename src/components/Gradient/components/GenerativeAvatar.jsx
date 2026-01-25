import { useEffect, useRef } from 'react';

// Seeded random number generator for consistent avatars
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

export default function GenerativeAvatar({
  name,
  size = 80,
  color = '#9FB8A0',
  secondaryColor = '#D8B4A0',
  animated = true
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const random = seededRandom(name);
    const centerX = size / 2;
    const centerY = size * 0.38;

    const particles = [];

    // Character traits based on seed
    const hasGlasses = random() > 0.6;
    const hasBeard = random() > 0.7;
    const hairStyle = Math.floor(random() * 4); // 0: short, 1: medium, 2: long, 3: spiky
    const faceShape = random(); // 0-0.5: rounder, 0.5-1: longer

    // Head dimensions - vary by character
    const headRadiusX = size * (0.20 + faceShape * 0.05);
    const headRadiusY = size * (0.24 + (1 - faceShape) * 0.06);

    // Neck and body
    const neckWidth = size * 0.10;
    const neckTop = centerY + headRadiusY * 0.9;
    const neckBottom = size * 0.58;
    const shoulderY = size * 0.60;
    const shoulderWidth = size * 0.42;
    const bodyBottom = size * 0.98;

    // === HAIR ===
    const hairParticles = 50 + Math.floor(random() * 30);
    if (hairStyle === 0) {
      // Short hair - particles on top of head
      for (let i = 0; i < hairParticles; i++) {
        const angle = Math.PI + (random() - 0.5) * Math.PI * 1.2;
        const dist = headRadiusY * (0.85 + random() * 0.3);
        const x = centerX + Math.cos(angle) * headRadiusX * 1.1;
        const y = centerY + Math.sin(angle) * dist;
        particles.push({ x, y, baseX: x, baseY: y, size: 2 + random() * 2.5, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.5 });
      }
    } else if (hairStyle === 1) {
      // Medium wavy hair
      for (let i = 0; i < hairParticles * 1.3; i++) {
        const angle = Math.PI + (random() - 0.5) * Math.PI * 1.4;
        const dist = headRadiusY * (0.9 + random() * 0.5);
        const x = centerX + Math.cos(angle) * headRadiusX * 1.15 + Math.sin(i * 0.5) * 3;
        const y = centerY + Math.sin(angle) * dist;
        particles.push({ x, y, baseX: x, baseY: y, size: 1.5 + random() * 2, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.3, amplitude: 0.8 });
      }
    } else if (hairStyle === 2) {
      // Long hair - extends down sides
      for (let i = 0; i < hairParticles * 1.5; i++) {
        const t = random();
        let x, y;
        if (t < 0.5) {
          const angle = Math.PI + (random() - 0.5) * Math.PI * 1.3;
          x = centerX + Math.cos(angle) * headRadiusX * 1.2;
          y = centerY + Math.sin(angle) * headRadiusY * 1.1;
        } else {
          const side = random() > 0.5 ? 1 : -1;
          x = centerX + side * (headRadiusX * 1.1 + random() * 5);
          y = centerY + headRadiusY * 0.3 + random() * (shoulderY - centerY);
        }
        particles.push({ x, y, baseX: x, baseY: y, size: 1.5 + random() * 2, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.25, amplitude: 1 });
      }
    } else {
      // Spiky hair
      for (let i = 0; i < hairParticles; i++) {
        const angle = Math.PI + (i / hairParticles - 0.5) * Math.PI * 1.2;
        const spikeLength = headRadiusY * (0.3 + random() * 0.4);
        for (let j = 0; j < 3; j++) {
          const dist = headRadiusY + spikeLength * (j / 3);
          const x = centerX + Math.cos(angle) * headRadiusX * 0.9 + (random() - 0.5) * 3;
          const y = centerY + Math.sin(angle) * dist;
          particles.push({ x, y, baseX: x, baseY: y, size: 2 + random() * 1.5, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.4, amplitude: 0.6 });
        }
      }
    }

    // === HEAD OUTLINE - stronger ===
    const headOutlineCount = 100;
    for (let i = 0; i < headOutlineCount; i++) {
      const angle = (i / headOutlineCount) * Math.PI * 2;
      const radiusVar = 0.95 + random() * 0.1;
      const x = centerX + Math.cos(angle) * headRadiusX * radiusVar;
      const y = centerY + Math.sin(angle) * headRadiusY * radiusVar;
      particles.push({ x, y, baseX: x, baseY: y, size: 2 + random() * 1.5, useSecondary: random() > 0.8, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.4 });
    }

    // Head fill - lighter
    for (let i = 0; i < 30; i++) {
      const angle = random() * Math.PI * 2;
      const dist = random() * 0.7;
      const x = centerX + Math.cos(angle) * headRadiusX * dist;
      const y = centerY + Math.sin(angle) * headRadiusY * dist;
      particles.push({ x, y, baseX: x, baseY: y, size: 1 + random(), useSecondary: true, phase: random() * Math.PI * 2, speed: 0.15, amplitude: 0.3 });
    }

    // === EYES - stronger, more defined ===
    const eyeY = centerY - headRadiusY * 0.05;
    const eyeSpacing = headRadiusX * 0.55;
    const eyeWidth = headRadiusX * 0.25;
    const eyeHeight = headRadiusY * 0.12;

    for (let eye = 0; eye < 2; eye++) {
      const eyeX = centerX + (eye === 0 ? -eyeSpacing : eyeSpacing);

      // Eye outline - almond shape
      for (let i = 0; i < 20; i++) {
        const t = i / 20;
        const angle = t * Math.PI * 2;
        const x = eyeX + Math.cos(angle) * eyeWidth;
        const y = eyeY + Math.sin(angle) * eyeHeight;
        particles.push({ x, y, baseX: x, baseY: y, size: 2, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.3, amplitude: 0.2 });
      }

      // Pupil - dense center
      for (let i = 0; i < 10; i++) {
        const angle = random() * Math.PI * 2;
        const dist = random() * eyeWidth * 0.4;
        const x = eyeX + Math.cos(angle) * dist;
        const y = eyeY + Math.sin(angle) * dist * 0.6;
        particles.push({ x, y, baseX: x, baseY: y, size: 2.5 + random(), useSecondary: false, phase: random() * Math.PI * 2, speed: 0.4, amplitude: 0.15 });
      }
    }

    // === GLASSES (if has them) ===
    if (hasGlasses) {
      // Left lens
      for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI * 2;
        const x = centerX - eyeSpacing + Math.cos(angle) * eyeWidth * 1.5;
        const y = eyeY + Math.sin(angle) * eyeHeight * 2;
        particles.push({ x, y, baseX: x, baseY: y, size: 1.5, useSecondary: true, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.2 });
      }
      // Right lens
      for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI * 2;
        const x = centerX + eyeSpacing + Math.cos(angle) * eyeWidth * 1.5;
        const y = eyeY + Math.sin(angle) * eyeHeight * 2;
        particles.push({ x, y, baseX: x, baseY: y, size: 1.5, useSecondary: true, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.2 });
      }
      // Bridge
      for (let i = 0; i < 8; i++) {
        const x = centerX + (i / 7 - 0.5) * eyeSpacing * 0.8;
        particles.push({ x, y: eyeY, baseX: x, baseY: eyeY, size: 1.5, useSecondary: true, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.2 });
      }
    }

    // === EYEBROWS - expressive ===
    const browY = eyeY - eyeHeight * 2.5;
    const browAngle = (random() - 0.5) * 0.3; // Varied expression
    for (let brow = 0; brow < 2; brow++) {
      const browX = centerX + (brow === 0 ? -eyeSpacing : eyeSpacing);
      const dir = brow === 0 ? 1 : -1;
      for (let i = 0; i < 12; i++) {
        const t = i / 11;
        const x = browX + (t - 0.5) * eyeWidth * 2;
        const y = browY + dir * browAngle * (t - 0.5) * eyeHeight * 3;
        particles.push({ x, y, baseX: x, baseY: y, size: 2 + random(), useSecondary: false, phase: random() * Math.PI * 2, speed: 0.25, amplitude: 0.3 });
      }
    }

    // === NOSE - vertical line with tip ===
    const noseTop = eyeY + eyeHeight * 2;
    const noseBottom = centerY + headRadiusY * 0.4;
    const noseWidth = headRadiusX * 0.15;

    // Nose bridge
    for (let i = 0; i < 8; i++) {
      const t = i / 7;
      const x = centerX + (random() - 0.5) * 2;
      const y = noseTop + t * (noseBottom - noseTop) * 0.7;
      particles.push({ x, y, baseX: x, baseY: y, size: 1.5 + random(), useSecondary: false, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.3 });
    }

    // Nose tip/nostrils
    for (let i = 0; i < 10; i++) {
      const angle = Math.PI * 0.5 + (random() - 0.5) * Math.PI * 0.8;
      const x = centerX + Math.cos(angle) * noseWidth;
      const y = noseBottom + Math.sin(angle) * noseWidth * 0.5;
      particles.push({ x, y, baseX: x, baseY: y, size: 1.5 + random(), useSecondary: false, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.25 });
    }

    // === MOUTH ===
    const mouthY = centerY + headRadiusY * 0.55;
    const mouthWidth = headRadiusX * 0.5;
    const smileAmount = (random() - 0.3) * 0.4; // Smile or neutral

    for (let i = 0; i < 15; i++) {
      const t = i / 14;
      const x = centerX + (t - 0.5) * mouthWidth * 2;
      const curve = Math.sin(t * Math.PI) * smileAmount * headRadiusY * 0.2;
      const y = mouthY + curve;
      particles.push({ x, y, baseX: x, baseY: y, size: 2, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.2 });
    }

    // === BEARD (if has one) ===
    if (hasBeard) {
      for (let i = 0; i < 40; i++) {
        const angle = random() * Math.PI * 0.6 - Math.PI * 0.3;
        const dist = headRadiusY * (0.5 + random() * 0.4);
        const x = centerX + Math.cos(angle + Math.PI * 0.5) * headRadiusX * 0.8 * (0.3 + random() * 0.7);
        const y = mouthY + Math.sin(angle + Math.PI * 0.5) * dist * 0.5 + random() * headRadiusY * 0.3;
        if (y > mouthY - 5) {
          particles.push({ x, y, baseX: x, baseY: y, size: 1.5 + random() * 1.5, useSecondary: false, phase: random() * Math.PI * 2, speed: 0.15, amplitude: 0.4 });
        }
      }
    }

    // === NECK ===
    for (let i = 0; i < 15; i++) {
      const t = random();
      const y = neckTop + t * (neckBottom - neckTop);
      const x = centerX + (random() - 0.5) * neckWidth * (1 + t * 0.3);
      particles.push({ x, y, baseX: x, baseY: y, size: 1.5 + random(), useSecondary: random() > 0.5, phase: random() * Math.PI * 2, speed: 0.2, amplitude: 0.4 });
    }

    // === SHOULDERS ===
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      let x, y;
      if (t < 0.5) {
        const st = t / 0.5;
        x = centerX - neckWidth/2 - st * (shoulderWidth - neckWidth/2);
        y = shoulderY + Math.sin(st * Math.PI * 0.5) * (bodyBottom - shoulderY) * 0.4;
      } else {
        const st = (t - 0.5) / 0.5;
        x = centerX + neckWidth/2 + st * (shoulderWidth - neckWidth/2);
        y = shoulderY + Math.sin(st * Math.PI * 0.5) * (bodyBottom - shoulderY) * 0.4;
      }
      x += (random() - 0.5) * 3;
      y += (random() - 0.5) * 3;
      particles.push({ x, y, baseX: x, baseY: y, size: 2 + random() * 2, useSecondary: random() > 0.6, phase: random() * Math.PI * 2, speed: 0.15, amplitude: 0.5 });
    }

    // Body fill
    for (let i = 0; i < 25; i++) {
      const x = centerX + (random() - 0.5) * shoulderWidth * 1.4;
      const y = shoulderY + random() * (bodyBottom - shoulderY) * 0.6;
      if (Math.abs(x - centerX) < shoulderWidth * (1 - (y - shoulderY) / (bodyBottom - shoulderY) * 0.3)) {
        particles.push({ x, y, baseX: x, baseY: y, size: 1 + random(), useSecondary: true, phase: random() * Math.PI * 2, speed: 0.1, amplitude: 0.3 });
      }
    }

    particlesRef.current = particles;

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      particlesRef.current.forEach(p => {
        if (animated) {
          p.x = p.baseX + Math.sin(time * p.speed + p.phase) * p.amplitude;
          p.y = p.baseY + Math.cos(time * p.speed * 0.7 + p.phase) * p.amplitude * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.useSecondary ? secondaryColor : color;
        ctx.globalAlpha = 0.65 + Math.sin(time * 1.5 + p.phase) * 0.25;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      time += 0.012;

      if (animated) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [name, size, color, secondaryColor, animated]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
