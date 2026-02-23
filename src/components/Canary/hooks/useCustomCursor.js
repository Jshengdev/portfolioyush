import { useEffect, useRef } from 'react';
import { isOverDarkSection } from './useDarkSectionDetector';
import { CURSOR } from '../lib/constants';

export default function useCustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const C = CURSOR.CENTER;

    let cursorX = -300, cursorY = -300;
    let targetX = -300, targetY = -300;
    let pulseT = 0;
    let rafId;

    function drawCursor() {
      rafId = requestAnimationFrame(drawCursor);
      pulseT += CURSOR.PULSE_SPEED;

      cursorX += (targetX - cursorX) * CURSOR.EASING;
      cursorY += (targetY - cursorY) * CURSOR.EASING;

      canvas.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;

      ctx.clearRect(0, 0, CURSOR.SIZE, CURSOR.SIZE);

      const glowPulse = 0.55 + Math.sin(pulseT) * CURSOR.PULSE_AMP;
      const outerPulse = CURSOR.OUTER_RADIUS + Math.sin(pulseT * CURSOR.OUTER_FREQ) * CURSOR.OUTER_VARIANCE;

      // Outer diffuse glow
      const grd = ctx.createRadialGradient(C, C, 0, C, C, outerPulse + 20);
      grd.addColorStop(0,   `rgba(140, 100, 255, ${0.18 * glowPulse})`);
      grd.addColorStop(0.4, `rgba(99,  70, 229, ${0.10 * glowPulse})`);
      grd.addColorStop(1,   `rgba(79,  46, 229, 0)`);
      ctx.beginPath();
      ctx.arc(C, C, outerPulse + 20, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(C, C, outerPulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(140, 110, 255, ${0.35 * glowPulse})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Middle ring
      const midR = outerPulse * 0.55;
      ctx.beginPath();
      ctx.arc(C, C, midR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(160, 130, 255, ${0.55 * glowPulse})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Inner dot
      const innerGrd = ctx.createRadialGradient(C, C, 0, C, C, 5);
      innerGrd.addColorStop(0,   'rgba(220, 200, 255, 0.95)');
      innerGrd.addColorStop(0.5, `rgba(140, 100, 255, ${0.9 * glowPulse})`);
      innerGrd.addColorStop(1,   'rgba(99, 70, 229, 0)');
      ctx.beginPath();
      ctx.arc(C, C, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = innerGrd;
      ctx.fill();
    }
    rafId = requestAnimationFrame(drawCursor);

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      canvas.style.opacity = isOverDarkSection(e.clientX, e.clientY) ? '1' : '0.35';
    };

    document.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return canvasRef;
}
