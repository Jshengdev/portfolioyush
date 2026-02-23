import React, { useRef, useEffect, useImperativeHandle, forwardRef, type CSSProperties } from 'react';

export type AnimationState = 'idle' | 'wave' | 'concerned' | 'jump';

type JumpState = 'waiting' | 'jumping';

interface AnimState {
  current: AnimationState;
  frame: number;
  offsetX: number;
  offsetY: number;
  leftArmAngle: number;
  rightArmAngle: number;
  leftArmBend: number;
  rightArmBend: number;
  leftLegAngle: number;
  rightLegAngle: number;
  bobAmount: number;
  jumpState: JumpState;
}

interface CharMetrics {
  shape: string;
  bodyWidth: number;
  bodyHeight: number;
  armLength: number;
  legLength: number;
  pixelSize: number;
}

export interface BlikiCharacterProps {
  x?: number;
  y?: number;
  size?: number;
  animationState?: AnimationState;
  style?: CSSProperties;
}

export interface BlikiCharacterHandle {
  getWrapper: () => HTMLDivElement | null;
  setPaused: (p: boolean) => void;
}

/**
 * BlikiCharacter -- Canvas-based animated character
 * Body: #667eea, Eyes: black, Pixel-art circle shape
 */
const BlikiCharacter = forwardRef<BlikiCharacterHandle, BlikiCharacterProps>(
  function BlikiCharacter(
    { x = 0, y = 0, size = 80, animationState = 'idle', style },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<AnimState>({
      current: animationState,
      frame: 0,
      offsetX: 0,
      offsetY: 0,
      leftArmAngle: 0,
      rightArmAngle: 0,
      leftArmBend: 0,
      rightArmBend: 0,
      leftLegAngle: 0,
      rightLegAngle: 0,
      bobAmount: 0,
      jumpState: 'waiting',
    });
    const rafRef = useRef<number | null>(null);
    const pausedRef = useRef(false);

    const char = useRef<CharMetrics>({
      shape: 'circle',
      bodyWidth: 12,
      bodyHeight: 12,
      armLength: 4,
      legLength: 4,
      pixelSize: (size / 140) * 10,
    });

    useImperativeHandle(ref, () => ({
      getWrapper: () => wrapperRef.current,
      setPaused: (p: boolean) => { pausedRef.current = p; },
    }));

    // Sync animationState changes
    useEffect(() => {
      animRef.current.current = animationState;
      animRef.current.frame = 0;
      if (animationState === 'jump') animRef.current.jumpState = 'waiting';
    }, [animationState]);

    // Sync size
    useEffect(() => {
      char.current.pixelSize = (size / 140) * 10;
    }, [size]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = size;
      canvas.height = size;
      const maybeCtx = canvas.getContext('2d');
      if (!maybeCtx) return;
      const ctx: CanvasRenderingContext2D = maybeCtx;

      function update(): void {
        const anim = animRef.current;
        anim.frame++;
        const speed = 0.08;
        const t = anim.frame * speed;

        switch (anim.current) {
          case 'idle':
            anim.offsetY = Math.sin(t * 0.8) * 0.8;
            anim.bobAmount = Math.sin(t * 0.8) * 0.02;
            anim.leftArmAngle = 0; anim.rightArmAngle = 0;
            anim.leftArmBend = 0; anim.rightArmBend = 0;
            anim.leftLegAngle = 0; anim.rightLegAngle = 0;
            anim.offsetX = 0;
            break;
          case 'wave':
            anim.offsetY = Math.sin(t * 1.5) * 1.5;
            anim.bobAmount = 0;
            anim.rightArmAngle = -0.6 + Math.sin(t * 3) * 0.4;
            anim.rightArmBend = 0.3;
            anim.leftArmAngle = 0; anim.leftArmBend = 0;
            anim.leftLegAngle = 0; anim.rightLegAngle = 0;
            anim.offsetX = 0;
            break;
          case 'concerned':
            anim.offsetY = Math.sin(t * 0.6) * 1.2;
            anim.bobAmount = Math.sin(t * 0.6) * 0.015;
            anim.leftArmAngle = -0.5 + Math.sin(t * 1.5) * 0.15;
            anim.rightArmAngle = -0.5 + Math.sin(t * 1.5) * 0.15;
            anim.leftArmBend = 0.4; anim.rightArmBend = 0.4;
            anim.leftLegAngle = 0; anim.rightLegAngle = 0;
            anim.offsetX = 0;
            break;
          case 'jump': {
            const cycleLength = 120;
            const cycleFrame = anim.frame % cycleLength;
            if (cycleFrame < 80) {
              anim.jumpState = 'waiting';
              anim.offsetY = 0; anim.bobAmount = 0;
              anim.leftArmAngle = 0; anim.rightArmAngle = 0;
              anim.leftArmBend = 0; anim.rightArmBend = 0;
              anim.leftLegAngle = 0; anim.rightLegAngle = 0;
            } else {
              const jumpFrame = cycleFrame - 80;
              const jumpProgress = jumpFrame / 40;
              const jumpCurve = Math.sin(jumpProgress * Math.PI);
              anim.jumpState = 'jumping';
              anim.offsetY = -jumpCurve * 30 * (char.current.pixelSize / 10);
              anim.bobAmount = jumpCurve * 0.1;
              if (jumpProgress > 0.2 && jumpProgress < 0.8) {
                anim.leftArmAngle = -0.5; anim.rightArmAngle = -0.5;
                anim.leftArmBend = 0.5; anim.rightArmBend = 0.5;
                anim.leftLegAngle = 0.2; anim.rightLegAngle = 0.2;
              } else {
                anim.leftArmAngle = 0; anim.rightArmAngle = 0;
                anim.leftArmBend = 0; anim.rightArmBend = 0;
                anim.leftLegAngle = 0; anim.rightLegAngle = 0;
              }
            }
            anim.offsetX = 0;
            break;
          }
        }
      }

      function drawPixelCircle(ctx2: CanvasRenderingContext2D, cx: number, cy: number): void {
        const ps = char.current.pixelSize;
        const radiusX = char.current.bodyWidth * ps / 2;
        const radiusY = char.current.bodyHeight * ps / 2;
        const maxRX = Math.floor(radiusX / ps);
        const maxRY = Math.floor(radiusY / ps);
        for (let py = -maxRY; py <= maxRY; py++) {
          for (let px = -maxRX; px <= maxRX; px++) {
            const pcx = px * ps;
            const pcy = py * ps;
            const nx = pcx / (radiusX - ps / 2);
            const ny = pcy / (radiusY - ps / 2);
            if (nx * nx + ny * ny <= 0.95) {
              ctx2.fillRect(cx + pcx - ps / 2, cy + pcy - ps / 2, ps, ps);
            }
          }
        }
      }

      function drawBentLimb(
        ctx2: CanvasRenderingContext2D,
        endX: number,
        endY: number,
        bendAngle: number,
        thickness: number,
        isLeft: boolean,
        isVertical = false
      ): void {
        if (Math.abs(bendAngle) < 0.01) {
          if (isVertical) {
            ctx2.fillRect(-thickness / 2, 0, thickness, endY);
          } else {
            if (isLeft) ctx2.fillRect(endX, -thickness / 2, -endX, thickness);
            else ctx2.fillRect(0, -thickness / 2, endX, thickness);
          }
        } else {
          const steps = 50;
          let controlX: number;
          let controlY: number;
          if (isVertical) {
            controlX = Math.sin(bendAngle) * Math.abs(endY) * 0.5;
            controlY = endY / 2;
          } else {
            controlX = endX * 0.3;
            controlY = Math.sin(bendAngle) * Math.abs(endX) * 1.5;
          }
          ctx2.strokeStyle = '#667eea';
          ctx2.lineWidth = thickness;
          ctx2.lineCap = 'square';
          ctx2.lineJoin = 'round';
          ctx2.beginPath();
          for (let i = 0; i <= steps; i++) {
            const t2 = i / steps;
            const px = 2 * (1 - t2) * t2 * controlX + t2 * t2 * endX;
            const py = 2 * (1 - t2) * t2 * controlY + t2 * t2 * endY;
            if (i === 0) ctx2.moveTo(px, py);
            else ctx2.lineTo(px, py);
          }
          ctx2.stroke();
        }
      }

      function draw(): void {
        const anim = animRef.current;
        const ps = char.current.pixelSize;
        const bodyWPx = char.current.bodyWidth * ps;
        const bodyHPx = char.current.bodyHeight * ps;
        const armLPx = char.current.armLength * ps;
        const legLPx = char.current.legLength * ps;
        const cx = size / 2 + anim.offsetX;
        const cy = size / 2 + anim.offsetY;

        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = '#667eea';

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1 + anim.bobAmount, 1 - anim.bobAmount);

        // Body (circle)
        drawPixelCircle(ctx, 0, 0);
        const radiusX = bodyWPx / 2;
        const radiusY = bodyHPx / 2;
        const avgR = (radiusX + radiusY) / 2;
        const eyeOffset = avgR * 0.35;
        const eyeY = -avgR * 0.3;
        const armAttachX = radiusX * 0.85;
        const legX = radiusX * 0.4;
        const legStartY = radiusY * 0.85;

        // Eyes
        const shouldBlink = anim.frame % 180 > 175 && anim.frame % 180 < 180;
        ctx.fillStyle = '#000000';
        const eyeSize = ps * 1.5;
        if (shouldBlink) {
          ctx.fillRect(-eyeOffset - eyeSize / 2, eyeY, eyeSize, ps * 0.3);
          ctx.fillRect(eyeOffset - eyeSize / 2, eyeY, eyeSize, ps * 0.3);
        } else {
          ctx.fillRect(-eyeOffset - eyeSize / 2, eyeY - eyeSize / 2, eyeSize, eyeSize);
          ctx.fillRect(eyeOffset - eyeSize / 2, eyeY - eyeSize / 2, eyeSize, eyeSize);
        }

        // Arms
        ctx.fillStyle = '#667eea';
        ctx.save();
        ctx.translate(-armAttachX, 0);
        ctx.rotate(-anim.leftArmAngle);
        drawBentLimb(ctx, -armLPx, 0, -anim.leftArmBend, ps, true);
        ctx.restore();

        ctx.save();
        ctx.translate(armAttachX, 0);
        ctx.rotate(anim.rightArmAngle);
        drawBentLimb(ctx, armLPx, 0, anim.rightArmBend, ps, false);
        ctx.restore();

        ctx.restore();

        // Legs
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = '#667eea';

        ctx.save();
        ctx.translate(-legX, legStartY);
        ctx.rotate(anim.leftLegAngle);
        drawBentLimb(ctx, 0, legLPx, anim.leftLegAngle, ps, true, true);
        ctx.restore();

        ctx.save();
        ctx.translate(legX, legStartY);
        ctx.rotate(anim.rightLegAngle);
        drawBentLimb(ctx, 0, legLPx, anim.rightLegAngle, ps, false, true);
        ctx.restore();

        // Circle shape connectors
        ctx.fillRect(-legX - ps / 2, legStartY - ps, ps, ps);
        ctx.fillRect(legX - ps / 2, legStartY - ps, ps, ps);

        ctx.restore();
      }

      function loop(): void {
        if (!canvasRef.current) return;
        if (pausedRef.current) {
          rafRef.current = null;
          return;
        }
        update();
        draw();
        rafRef.current = requestAnimationFrame(loop);
      }

      rafRef.current = requestAnimationFrame(loop);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [size]);

    return (
      <div
        ref={wrapperRef}
        className="bliki-character"
        style={{
          left: x,
          top: y,
          width: size,
          height: size,
          ...style,
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', width: size, height: size }} />
      </div>
    );
  }
);

export default BlikiCharacter;
