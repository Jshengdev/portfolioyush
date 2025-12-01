// ═══════════════════════════════════════════════════════════════════
// PΕBL PARTICLE FIELD
// Ambient floating particles for atmosphere
// ═══════════════════════════════════════════════════════════════════

import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { PARTICLES, COLORS } from './onboardingConfig';
import { particleFadeVariants } from './animations';

// ═══════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

// Vertical drift animation using CSS custom properties
const drift = keyframes`
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  5% {
    opacity: var(--particle-opacity);
  }
  95% {
    opacity: var(--particle-opacity);
  }
  100% {
    transform: translateY(-10vh) translateX(var(--drift-x));
    opacity: 0;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS - Using attrs for dynamic styles
// ═══════════════════════════════════════════════════════════════════

const ParticleContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
  overflow: hidden;
`;

// Use attrs to pass dynamic styles without generating new classes
const Particle = styled.div.attrs(props => ({
  style: {
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    left: `${props.$left}%`,
    animationDuration: `${props.$duration}s`,
    animationDelay: `${props.$delay}s`,
    '--particle-opacity': props.$opacity,
    '--drift-x': `${props.$driftX}px`,
  },
}))`
  position: absolute;
  background-color: ${COLORS.particleColor};
  border-radius: 50%;
  animation-name: ${drift};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const generateParticles = () => {
  const count = Math.floor(randomBetween(PARTICLES.count.min, PARTICLES.count.max));
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: randomBetween(PARTICLES.size.min, PARTICLES.size.max),
      left: randomBetween(5, 95), // Keep away from edges
      duration: randomBetween(
        PARTICLES.driftSpeed.min / 1000,
        PARTICLES.driftSpeed.max / 1000
      ),
      delay: randomBetween(0, 15), // Stagger start times
      opacity: randomBetween(PARTICLES.opacity.min, PARTICLES.opacity.max),
      driftX: randomBetween(-30, 30), // Horizontal drift
    });
  }

  return particles;
};

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

function ParticleField({ isActive = true }) {
  // Generate particles once on mount
  const particles = useMemo(() => generateParticles(), []);

  if (!isActive) return null;

  return (
    <ParticleContainer
      variants={particleFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          $size={particle.size}
          $left={particle.left}
          $duration={particle.duration}
          $delay={particle.delay}
          $opacity={particle.opacity}
          $driftX={particle.driftX}
        />
      ))}
    </ParticleContainer>
  );
}

export default ParticleField;
