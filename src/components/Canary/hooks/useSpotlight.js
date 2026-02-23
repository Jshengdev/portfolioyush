import { useEffect } from 'react';
import { isOverDarkSection } from './useDarkSectionDetector';

export default function useSpotlight(rootRef) {
  useEffect(() => {
    const root = rootRef?.current;
    if (!root) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:1;';
    root.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let spTargetX = window.innerWidth / 2;
    let spTargetY = window.innerHeight / 2;
    let spX = spTargetX, spY = spTargetY;
    let spActive = false;
    let rafId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    function draw() {
      rafId = requestAnimationFrame(draw);
      spX += (spTargetX - spX) * 0.08;
      spY += (spTargetY - spY) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!spActive) return;

      const radius = 280;

      // Outer atmospheric glow
      const outerGrd = ctx.createRadialGradient(spX, spY, 0, spX, spY, radius * 1.8);
      outerGrd.addColorStop(0,   'rgba(79, 46, 229, 0.07)');
      outerGrd.addColorStop(0.5, 'rgba(79, 46, 229, 0.035)');
      outerGrd.addColorStop(1,   'rgba(79, 46, 229, 0)');
      ctx.beginPath();
      ctx.arc(spX, spY, radius * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = outerGrd;
      ctx.fill();

      // Core spotlight
      const coreGrd = ctx.createRadialGradient(spX, spY, 0, spX, spY, radius);
      coreGrd.addColorStop(0,    'rgba(120, 90, 255, 0.13)');
      coreGrd.addColorStop(0.35, 'rgba(90,  65, 240, 0.07)');
      coreGrd.addColorStop(0.7,  'rgba(70,  50, 200, 0.03)');
      coreGrd.addColorStop(1,    'rgba(70,  50, 200, 0)');
      ctx.beginPath();
      ctx.arc(spX, spY, radius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrd;
      ctx.fill();
    }
    rafId = requestAnimationFrame(draw);

    const onMove = (e) => {
      spTargetX = e.clientX;
      spTargetY = e.clientY;
      spActive = isOverDarkSection(e.clientX, e.clientY);
    };

    const onResize = () => resize();

    document.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      canvas.remove();
    };
  }, [rootRef]);
}
