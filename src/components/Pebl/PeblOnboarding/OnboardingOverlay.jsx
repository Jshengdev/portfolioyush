// ═══════════════════════════════════════════════════════════════════
// PΕBL ONBOARDING OVERLAY
// UI layer with text content and visual effects
// ═══════════════════════════════════════════════════════════════════

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SCREENS,
  COLORS,
  TYPOGRAPHY,
  SCREEN_CONTENT,
  TIMING,
} from './onboardingConfig';
import {
  screenVariants,
  textFadeVariants,
  staggerContainerVariants,
  staggeredLineVariants,
  tapIndicatorVariants,
} from './animations';
import RippleDemo from './RippleDemo';

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled(motion.div)`
  position: absolute;
  bottom: 30%;
  left: calc(60% + 38px); /* Moved more right */
  transform: translateX(-50%);
  text-align: left;
  pointer-events: auto; /* Enable hover */
  z-index: 200;
  cursor: default;
`;

const TextLine = styled(motion.p)`
  font-family: ${TYPOGRAPHY.fontFamily};
  font-weight: 400;
  font-size: ${props => props.$size ? `calc(${props.$size} * 1.2)` : '36px'}; /* Slightly smaller */
  color: #FFFFFF;
  letter-spacing: ${TYPOGRAPHY.letterSpacing};
  text-transform: ${TYPOGRAPHY.textTransform};
  line-height: 1.2;
  margin: 0;
  padding: 0.2em 0;
  mix-blend-mode: difference;
  filter: blur(4px); /* Initial blur */
  transition: filter 0.4s ease-out;

  ${TextContainer}:hover & {
    filter: blur(0px); /* Clear on hover */
  }
`;

const TapIndicator = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${TYPOGRAPHY.fontFamily};
  font-weight: ${TYPOGRAPHY.fontWeight};
  font-size: ${TYPOGRAPHY.sizes.hint};
  color: ${COLORS.earth};
  letter-spacing: 0.15em;
  text-transform: ${TYPOGRAPHY.textTransform};
  opacity: 0.5;
`;

const StaggerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WordmarkContainer = styled(motion.div)`
  position: absolute;
  top: 40px;
  left: 40px;
  transform: none;
  pointer-events: none;
`;

const Wordmark = styled.img`
  width: 240px;
  height: auto;
  opacity: 0.7;
`;

// ═══════════════════════════════════════════════════════════════════
// SCREEN CONTENT COMPONENT
// ═══════════════════════════════════════════════════════════════════

const PeblWord = styled.span`
  font-family: 'Cubao-Variable', sans-serif; /* Switch to Variable font */
  font-variation-settings: 'wdth' 125; /* Force width if supported */
  font-stretch: 125%; /* Extra Expanded equivalent */
  text-transform: uppercase;
  display: inline-block;
  margin-left: 0.2em;
  vertical-align: middle;
  margin-top: -0.1em;
  letter-spacing: -0.02em;
  font-size: 1.0em;
`;

const Letter = styled.span`
  color: ${props => props.$color};
  display: inline-block;
`;

const ScreenText = ({ screen }) => {
  const content = SCREEN_CONTENT[screen];

  if (!content || !content.text) {
    return null;
  }

  // Helper to render text with custom formatting
  const renderLine = (text) => {
    if (text.includes('pebl')) {
      const parts = text.split('pebl');
      return (
        <>
          {parts[0]}
          <PeblWord>
            <Letter $color={COLORS.sage}>P</Letter><Letter $color={COLORS.rose}>E</Letter><Letter $color="#FFFFFF">B</Letter><Letter $color={COLORS.rose}>L</Letter>
          </PeblWord>
          {parts[1]}
        </>
      );
    }

    if (text.includes('rubbbbb')) {
      return (
        <span style={{ fontFamily: "'Cubao-ExtraCondensed', sans-serif", color: COLORS.rose, letterSpacing: '0.02em', fontSize: '1.4em' }}>
          rubbbbb
        </span>
      );
    }

    return text;
  };

  // Staggered multi-line text
  if (content.staggered && content.text.length > 1) {
    return (
      <TextContainer>
        <StaggerContainer
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {content.text.map((line, index) => (
            <TextLine
              key={index}
              $size={content.fontSize}
              variants={staggeredLineVariants}
            >
              {renderLine(line)}
            </TextLine>
          ))}
        </StaggerContainer>
      </TextContainer>
    );
  }

  // Single line or multiple lines without stagger
  return (
    <TextContainer
      variants={textFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {content.text.map((line, index) => (
        <TextLine key={index} $size={content.fontSize}>
          {renderLine(line)}
        </TextLine>
      ))}
    </TextContainer>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN OVERLAY COMPONENT
// ═══════════════════════════════════════════════════════════════════

// Wordmark animation variants
const wordmarkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 0.7,
    y: 0,
    transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6 },
  },
};

function OnboardingOverlay({ currentScreen, showTapIndicator }) {
  // Show wordmark after splash, hide on enter
  const showWordmark = currentScreen > SCREENS.SPLASH && currentScreen < SCREENS.ENTER;

  return (
    <OverlayContainer>
      {/* PEBL Wordmark - shows during onboarding */}
      <AnimatePresence>
        {showWordmark && (
          <WordmarkContainer
            variants={wordmarkVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Wordmark src="/assets/pebl/P5C PEBL.png" alt="PΕBL" />
          </WordmarkContainer>
        )}
      </AnimatePresence>

      {/* Ripple demo for How It Works screen */}
      <RippleDemo isActive={currentScreen === SCREENS.HOW_IT_WORKS} />

      {/* Screen-specific text content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ScreenText screen={currentScreen} />
        </motion.div>
      </AnimatePresence>

      {/* Tap indicator - shows after delay on screens 0-3 */}
      <AnimatePresence>
        {showTapIndicator && currentScreen < SCREENS.ENTER && (
          <TapIndicator
            variants={tapIndicatorVariants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            tap anywhere
          </TapIndicator>
        )}
      </AnimatePresence>

      {/* Enter screen has different hint */}
      <AnimatePresence>
        {currentScreen === SCREENS.ENTER && showTapIndicator && (
          <TapIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            tap the rock
          </TapIndicator>
        )}
      </AnimatePresence>
    </OverlayContainer>
  );
}

export default OnboardingOverlay;
