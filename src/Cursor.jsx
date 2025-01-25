import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components for Cursor
const CursorRing = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out; /* Smooth transition */
`;

const CursorDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 10000;
  transition: opacity 0.2s ease-out; /* Smooth fade effect */
`;

const CursorPeePee = styled.div`
  position: absolute;
  width: 39px;
  height: 39px;
  background-color: rgb(151, 209, 237);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: exclusion; /* Cool blend mode */
  z-index: 10000;
`;

const Cursor = () => {
  const [dotX, setDotX] = useState(0);
  const [dotY, setDotY] = useState(0);
  const [ringX, setRingX] = useState(0);
  const [ringY, setRingY] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRingX((prev) => prev + (dotX - prev) * 0.1);
      setRingY((prev) => prev + (dotY - prev) * 0.1);
    }, 5); // smoothness

    return () => clearInterval(interval);
  }, [dotX, dotY]);

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

  return (
    <>
      <CursorRing
        style={{
          left: `${ringX}px`,
          top: `${ringY}px`,
          transform: isClicking
            ? "translate(-50%, -50%) scale(1.2)" 
            : "translate(-50%, -50%) scale(1)",
          opacity: isClicking ? 0.8 : 1, 
        }}
      />
      <CursorDot
        style={{
          left: `${dotX}px`,
          top: `${dotY}px`,
          opacity: isClicking ? 0.5 : 1, // Dot disappears on click
        }}
      />
      {/* <CursorPeePee
        style={{
          left: `${dotX}px`,
          top: `${dotY}px`,
          opacity: isClicking ? 0.5 : 1, // Dot disappears on click
        }}
      /> */}
    </>
  );
};

export default Cursor;
