// ═══════════════════════════════════════════════════════════════════
// PΕBL RIPPLE DEMO
// Auto-triggering ripple animation for How It Works screen
// ═══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS, TIMING } from './onboardingConfig';

// ═══════════════════════════════════════════════════════════════════
// ANIMATIONS - Match PeblMap organicRipple
// ═══════════════════════════════════════════════════════════════════

const organicRipple = keyframes`
  0% {
    width: 10px;
    height: 10px;
    opacity: 0.6;
    border-width: 1.5px;
  }
  40% {
    border-width: 1px;
  }
  100% {
    width: 160px;
    height: 160px;
    opacity: 0;
    border-width: 0.5px;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const DemoContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
  z-index: 60;
`;

const Ripple = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border: 1.5px solid ${COLORS.rippleColor};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${organicRipple} ${TIMING.rippleDuration}ms ease-out forwards;
`;

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

function RippleDemo({ isActive = true }) {
  const [ripples, setRipples] = useState([]);

  // Spawn ripples at interval
  const spawnRipple = useCallback(() => {
    const id = Date.now();
    setRipples(prev => [...prev, { id }]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, TIMING.rippleDuration);
  }, []);

  // Auto-trigger ripples when active
  useEffect(() => {
    if (!isActive) {
      setRipples([]);
      return;
    }

    // Initial ripple
    const initialTimeout = setTimeout(() => {
      spawnRipple();
    }, 500);

    // Interval for subsequent ripples
    const interval = setInterval(() => {
      spawnRipple();
    }, TIMING.rippleInterval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isActive, spawnRipple]);

  if (!isActive) return null;

  return (
    <DemoContainer>
      {ripples.map(ripple => (
        <Ripple key={ripple.id} />
      ))}
    </DemoContainer>
  );
}

export default RippleDemo;
