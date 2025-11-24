import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/waves.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V5: Waves Experiment
 *
 * A calming gradient wave shader inspired by:
 * - Calm ocean water
 * - Meditation apps
 * - Zen garden aesthetics
 *
 * Features:
 * - Multiple layered horizontal waves at different frequencies
 * - Very slow, meditative animation pace
 * - Soft pastel color palette (blue, purple, teal)
 * - Mouse-reactive ripple effect
 * - Theme-aware (dark/light mode support)
 */

const CURRENT_ID = 'v5';

const NavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const NavButton = styled.button`
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.theme.colors.text.secondary};
  padding: 8px 16px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: ${props => props.theme.transitions.standard};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.hover};
    border-color: ${props => props.theme.colors.accent.blue};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const WavesExperiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Data-driven navigation - automatically adapts when new experiments are added
  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft') navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight') navigate(`/experiments/${next.id}`);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Waves'}`}
      />
      <NavOverlay>
        <NavButton theme={theme} onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev.id}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next.id}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
    </>
  );
};

export default WavesExperiment;
