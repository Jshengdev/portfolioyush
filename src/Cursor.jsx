import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Vibrant red color
const WORM_COLOR = "#FF1744"; // Vibrant bold red

// Cursor Dot (the head of the worm)
const CursorDot = styled.div`
  position: fixed;
  width: 10px;
  height: 10px;
  background-color: ${WORM_COLOR};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10001;
  box-shadow: 0 0 10px ${WORM_COLOR}, 0 0 20px ${WORM_COLOR}80;
`;

// SVG container for the worm trail
const WormTrail = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
`;

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  // Store trail points (worm segments)
  const trailRef = useRef([]);
  const lastMoveTimeRef = useRef(Date.now());
  const targetRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);
  const pathRef = useRef("");

  // Number of segments in the worm trail
  const TRAIL_LENGTH = 20;
  const BASE_EASING = 0.15; // Base easing for continuous movement
  const CATCHUP_EASING = 0.35; // Faster easing when catching up
  const DELAY_THRESHOLD = 700; // 0.7 seconds in milliseconds

  // Initialize trail points
  useEffect(() => {
    trailRef.current = Array(TRAIL_LENGTH)
      .fill(null)
      .map(() => ({ x: 0, y: 0 }));
  }, []);

  // Track mouse movement
  useEffect(() => {
    const moveCursor = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
      setMousePos({ x: e.clientX, y: e.clientY });
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

  // Animate worm trail
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;

      // Determine easing based on how long since last movement
      const isStationary = timeSinceLastMove > DELAY_THRESHOLD;
      const easing = isStationary ? CATCHUP_EASING : BASE_EASING;

      // Update first segment (follows cursor directly)
      if (trailRef.current.length > 0) {
        trailRef.current[0] = {
          x: trailRef.current[0].x + (targetRef.current.x - trailRef.current[0].x) * easing,
          y: trailRef.current[0].y + (targetRef.current.y - trailRef.current[0].y) * easing,
        };

        // Each subsequent segment follows the previous one
        for (let i = 1; i < trailRef.current.length; i++) {
          const prev = trailRef.current[i - 1];
          const current = trailRef.current[i];

          // Segments further back have slightly slower easing for worm effect
          const segmentEasing = easing * (1 - i * 0.01);

          trailRef.current[i] = {
            x: current.x + (prev.x - current.x) * segmentEasing,
            y: current.y + (prev.y - current.y) * segmentEasing,
          };
        }

        // Generate smooth SVG path through all points
        pathRef.current = generateSmoothPath(trailRef.current);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Generate smooth curved path through points
  const generateSmoothPath = (points) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    // Create smooth curves using quadratic bezier curves
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const prev = points[i - 1];

      // Control point for smooth curve
      const cpX = (prev.x + current.x) / 2;
      const cpY = (prev.y + current.y) / 2;

      path += ` Q ${prev.x} ${prev.y}, ${cpX} ${cpY}`;
    }

    return path;
  };

  return (
    <>
      <WormTrail>
        <defs>
          <linearGradient id="wormGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={WORM_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={WORM_COLOR} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={pathRef.current}
          stroke="url(#wormGradient)"
          strokeWidth={isClicking ? "4" : "3"}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 8px ${WORM_COLOR}80)`,
            transition: 'stroke-width 0.2s ease-out'
          }}
        />
      </WormTrail>
      <CursorDot
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: isClicking
            ? "translate(-50%, -50%) scale(1.3)"
            : "translate(-50%, -50%) scale(1)",
        }}
      />
    </>
  );
};

export default Cursor;
