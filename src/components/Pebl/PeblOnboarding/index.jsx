// ═══════════════════════════════════════════════════════════════════
// PΕBL ONBOARDING - Main Orchestrator
// State machine managing the 6-screen activation sequence
// ═══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingOverlay from './OnboardingOverlay';
import ParticleField from './ParticleField';
import SplashScreen from './SplashScreen';
import {
  SCREENS,
  SCREEN_NAMES,
  COLORS,
  TIMING,
  ROCK_DETECTION,
} from './onboardingConfig';
import { portalFlashVariants } from './animations';

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const OnboardingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  pointer-events: ${props => props.$active ? 'auto' : 'none'};
`;

const ClickArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: ${props => props.$isEnterScreen ? 'crosshair' : 'pointer'};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`;

const PortalFlash = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.cream};
  pointer-events: none;
  z-index: 300;
`;

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

function PeblOnboarding({
  onComplete,
  onScreenChange,
  isActive = true,
}) {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [showTapIndicator, setShowTapIndicator] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPortalFlash, setShowPortalFlash] = useState(false);

  // Auto-advance from splash screen
  useEffect(() => {
    if (!isActive) return;
    if (currentScreen !== SCREENS.SPLASH) return;

    const timer = setTimeout(() => {
      setCurrentScreen(SCREENS.AWAKENING);
    }, TIMING.splashDuration);

    return () => clearTimeout(timer);
  }, [isActive, currentScreen]);

  // Show tap indicator after delay (not on splash or awakening)
  useEffect(() => {
    if (!isActive) return;
    if (currentScreen <= SCREENS.AWAKENING) return; // No tap hint on splash/awakening

    const timer = setTimeout(() => {
      setShowTapIndicator(true);
    }, TIMING.tapIndicatorDelay);

    return () => clearTimeout(timer);
  }, [currentScreen, isActive]);

  // Reset tap indicator on screen change
  useEffect(() => {
    setShowTapIndicator(false);
  }, [currentScreen]);

  // Notify parent of screen changes
  useEffect(() => {
    if (onScreenChange) {
      onScreenChange(currentScreen, SCREEN_NAMES[currentScreen]);
    }
  }, [currentScreen, onScreenChange]);

  // Advance to next screen
  const advanceScreen = useCallback(() => {
    if (isTransitioning) return;
    if (currentScreen >= SCREENS.ENTER) return;
    if (currentScreen === SCREENS.SPLASH) return; // Splash auto-advances

    setIsTransitioning(true);

    // Advance after brief delay for animation
    setTimeout(() => {
      setCurrentScreen(prev => prev + 1);
      setIsTransitioning(false);
    }, 100);
  }, [currentScreen, isTransitioning]);

  // Check if click is on rock (for Enter screen)
  const isClickOnRock = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const dist = Math.sqrt(
      Math.pow(x - ROCK_DETECTION.center.x, 2) +
      Math.pow(y - ROCK_DETECTION.center.y, 2)
    );

    return dist < ROCK_DETECTION.radius;
  }, []);

  // Handle portal transition (Enter screen → Map)
  const triggerPortalTransition = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Flash effect
    setShowPortalFlash(true);

    // Complete after full transition
    setTimeout(() => {
      setShowPortalFlash(false);
      if (onComplete) {
        onComplete();
      }
    }, TIMING.portalTotal);
  }, [isTransitioning, onComplete]);

  // Handle click/tap
  const handleClick = useCallback((e) => {
    if (!isActive || isTransitioning) return;
    if (currentScreen === SCREENS.SPLASH) return; // No clicks on splash

    // Enter screen: only rock click triggers exit
    if (currentScreen === SCREENS.ENTER) {
      if (isClickOnRock(e)) {
        triggerPortalTransition();
      }
      return;
    }

    // Other screens: tap anywhere to advance
    advanceScreen();
  }, [
    isActive,
    isTransitioning,
    currentScreen,
    isClickOnRock,
    triggerPortalTransition,
    advanceScreen,
  ]);

  if (!isActive) return null;

  const showParticles = currentScreen > SCREENS.SPLASH;
  const showClickArea = currentScreen > SCREENS.SPLASH;

  return (
    <OnboardingContainer $active={isActive}>
      {/* Splash screen - black with PEBL logo */}
      <AnimatePresence>
        {currentScreen === SCREENS.SPLASH && (
          <SplashScreen isActive={true} />
        )}
      </AnimatePresence>

      {/* Ambient particles - only after splash */}
      {showParticles && <ParticleField isActive={isActive} />}

      {/* Clickable area - only after splash */}
      {showClickArea && (
        <ClickArea
          onClick={handleClick}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleClick(e);
          }}
          $isEnterScreen={currentScreen === SCREENS.ENTER}
        />
      )}

      {/* Text overlay */}
      <OnboardingOverlay
        currentScreen={currentScreen}
        showTapIndicator={showTapIndicator}
      />

      {/* Portal flash effect */}
      <AnimatePresence>
        {showPortalFlash && (
          <PortalFlash
            variants={portalFlashVariants}
            initial="initial"
            animate="flash"
          />
        )}
      </AnimatePresence>
    </OnboardingContainer>
  );
}

export default PeblOnboarding;
export { SCREENS, SCREEN_NAMES };
