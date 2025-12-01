// ═══════════════════════════════════════════════════════════════════
// PΕBL SPLASH SCREEN
// Black grain background with centered PEBL logo - auto fades out
// ═══════════════════════════════════════════════════════════════════

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TIMING } from './onboardingConfig';

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const SplashContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;

  /* Grain overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
`;

const LogoWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 1;
`;

const Logo = styled(motion.img)`
  width: 180px;
  height: auto;
  filter: brightness(0) invert(1); /* Make it white */
  opacity: 0.9;
`;

// ═══════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════

const containerVariants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: TIMING.splashFadeOut / 1000,
      ease: [0.4, 0, 0.2, 1], // Apple-style ease
    },
  },
};

const logoVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 0.9,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

function SplashScreen({ isActive }) {
  if (!isActive) return null;

  return (
    <SplashContainer
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <LogoWrapper>
        <Logo
          src="/assets/pebl/P5C PEBL.png"
          alt="PΕBL"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        />
      </LogoWrapper>
    </SplashContainer>
  );
}

export default SplashScreen;
