import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const WORM_COLOR = "#FF1744";

const CursorRing = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid ${WORM_COLOR};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10002;
  transition: transform 0.15s ease-out;
`;

const CursorDot = styled.div`
  position: fixed;
  width: 6px;
  height: 6px;
  background-color: ${WORM_COLOR};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10001;
  box-shadow:
    0 0 10px ${WORM_COLOR},
    0 0 20px ${WORM_COLOR}80,
    0 0 30px ${WORM_COLOR}60;
`;

const WormTrail = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
`;

// Constants
const TRAIL_LENGTH = 120;
const BASE_EASING = 0.28;
const CATCHUP_EASING = 0.7;
const STATIONARY_THRESHOLD = 600;
const SNAP_BACK_DELAY = 700; // Snap back after 700ms of no movement
const MIN_STROKE = 1.5; // Thinner for worm-like feel
const MAX_STROKE = 4; // Reduced maximum

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  const trailRef = useRef([]);
  const segmentAgeRef = useRef([]); // Track how long since segment was at head
  const lastMoveTimeRef = useRef(Date.now());
  const targetRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);
  const pathRef = useRef("");
  const velocityRef = useRef(0);
  const isSnappingRef = useRef(false); // Track if snap back animation has started

  // Initialize trail points and ages
  useEffect(() => {
    trailRef.current = Array(TRAIL_LENGTH)
      .fill(null)
      .map(() => ({ x: 0, y: 0 }));
    segmentAgeRef.current = Array(TRAIL_LENGTH).fill(0);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const moveCursor = (e) => {
      const prevTarget = targetRef.current;
      targetRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
      setMousePos({ x: e.clientX, y: e.clientY });

      // Calculate and smooth velocity
      const dx = e.clientX - prevTarget.x;
      const dy = e.clientY - prevTarget.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = velocityRef.current * 0.8 + distance * 0.2;

      // Reset snap back flag when moving
      if (distance > 2) {
        isSnappingRef.current = false;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  // Track clicking
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Animate worm trail and ring
  useEffect(() => {
    const animate = () => {
      const timeSinceMove = Date.now() - lastMoveTimeRef.current;
      const isStationary = timeSinceMove > STATIONARY_THRESHOLD;
      const shouldSnapBack = timeSinceMove > SNAP_BACK_DELAY;
      const easing = isStationary ? CATCHUP_EASING : BASE_EASING;

      velocityRef.current *= 0.95; // Slower decay for better thickness variation

      // Start snapping if delay reached
      if (shouldSnapBack && !isSnappingRef.current) {
        isSnappingRef.current = true;
      }

      // Update trail segments
      if (trailRef.current.length > 0) {
        const trail = trailRef.current;
        const target = targetRef.current;

        // First segment follows cursor
        trail[0].x += (target.x - trail[0].x) * easing;
        trail[0].y += (target.y - trail[0].y) * easing;

        // Only reset head age if not snapping
        if (!isSnappingRef.current) {
          segmentAgeRef.current[0] = 0; // Head is always fresh when drawing
        } else {
          segmentAgeRef.current[0] = Math.min(segmentAgeRef.current[0] + 0.03, 2);
        }

        // Subsequent segments follow previous with smooth decay
        for (let i = 1; i < trail.length; i++) {
          // Smooth exponential decay - each segment follows slightly slower
          const decay = Math.pow(0.98, i);
          let segmentEasing = easing * (0.9 + decay * 0.1);

          // If snapping (continues at consistent rate even if moving again)
          if (isSnappingRef.current) {
            const dx = trail[i - 1].x - trail[i].x;
            const dy = trail[i - 1].y - trail[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Consistent snap rate with exponential acceleration
            const indexFactor = Math.pow(1.015, i);
            const snapBoost = 0.05 + indexFactor * 0.01;

            segmentEasing = Math.min(segmentEasing + snapBoost, 0.75);
          }

          trail[i].x += (trail[i - 1].x - trail[i].x) * segmentEasing;
          trail[i].y += (trail[i - 1].y - trail[i].y) * segmentEasing;

          // Continue aging when snapping, reset when not snapping
          if (!isSnappingRef.current) {
            segmentAgeRef.current[i] = 0; // Keep all segments fresh while drawing
          } else {
            segmentAgeRef.current[i] = Math.min(segmentAgeRef.current[i] + 0.03, 2);
          }
        }

        // Generate smooth path
        pathRef.current = generateSmoothPath(trail);

        // Ring is glued to trail head (segment 0)
        setRingPos({ x: trail[0].x, y: trail[0].y });
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  // Generate smooth curved path through points
  const generateSmoothPath = (points) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const prev = points[i - 1];
      const prevPrev = i > 1 ? points[i - 2] : prev;
      const nextPoint = i < points.length - 1 ? points[i + 1] : current;

      const cp1x = prev.x + (current.x - prevPrev.x) / 6;
      const cp1y = prev.y + (current.y - prevPrev.y) / 6;
      const cp2x = current.x - (nextPoint.x - prev.x) / 6;
      const cp2y = current.y - (nextPoint.y - prev.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${current.x} ${current.y}`;
    }

    return path;
  };

  // Calculate dynamic values
  const velocity = Math.min(velocityRef.current / 15, 1); // More sensitive to movement
  const strokeWidth = MIN_STROKE + (MAX_STROKE - MIN_STROKE) * velocity + (isClicking ? 1 : 0);
  const glowIntensity = 1.5 + velocity * 1.5;

  // Generate path segments with age-based opacity
  const renderAgedSegments = () => {
    if (trailRef.current.length < 2) return null;

    const segments = [];
    const chunkSize = 10; // Group segments for performance

    for (let start = 0; start < trailRef.current.length - 1; start += chunkSize) {
      const end = Math.min(start + chunkSize + 1, trailRef.current.length);
      const chunk = trailRef.current.slice(start, end);

      // Calculate average age for this chunk
      const ages = segmentAgeRef.current.slice(start, end);
      const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length;

      // Opacity based on age: fresh (0) = 1.0, old (2+) = 0 (invisible)
      const opacity = Math.max(0, 1 - avgAge * 0.5);

      // Skip rendering if fully faded
      if (opacity < 0.01) continue;

      // Thickness based on freshness, velocity, and position along trail
      const freshness = Math.max(0, 1 - avgAge * 0.5);

      // Calculate position-based taper (segments further back are thinner)
      const avgIndex = start + chunkSize / 2;
      const positionFactor = Math.max(0, 1 - avgIndex / TRAIL_LENGTH); // 1.0 at head, 0.0 at tail
      const taper = Math.pow(positionFactor, 2); // Quadratic falloff for stronger thinning

      let chunkStrokeWidth;
      if (isSnappingRef.current) {
        chunkStrokeWidth = MIN_STROKE + (MAX_STROKE - MIN_STROKE) * freshness * 0.5 * taper;
      } else {
        const velocityThickness = (MAX_STROKE - MIN_STROKE) * velocity;
        chunkStrokeWidth = MIN_STROKE + velocityThickness * freshness * taper + (isClicking ? 1 : 0);
      }

      const chunkPath = generateSmoothPath(chunk);

      segments.push(
        <path
          key={start}
          d={chunkPath}
          stroke={WORM_COLOR}
          strokeOpacity={opacity}
          strokeWidth={chunkStrokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: avgAge < 0.3
              ? `drop-shadow(0 0 ${8 * glowIntensity}px ${WORM_COLOR}AA)`
              : 'none'
          }}
        />
      );
    }

    return segments;
  };

  return (
    <>
      <WormTrail>
        {renderAgedSegments()}
      </WormTrail>
      <CursorRing
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          transform: isClicking
            ? "translate(-50%, -50%) scale(1.2)"
            : "translate(-50%, -50%) scale(1)",
          opacity: isClicking ? 0.8 : 0.6,
        }}
      />
      <CursorDot
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: isClicking
            ? "translate(-50%, -50%) scale(1.5)"
            : "translate(-50%, -50%) scale(1)",
          boxShadow: `
            0 0 ${15 * glowIntensity}px ${WORM_COLOR},
            0 0 ${30 * glowIntensity}px ${WORM_COLOR}DD,
            0 0 ${50 * glowIntensity}px ${WORM_COLOR}99
          `,
        }}
      />
    </>
  );
};

export default Cursor;
