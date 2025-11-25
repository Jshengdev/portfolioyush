import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/boldlines.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V9: Bold Lines Experiment
 *
 * Visual Effect:
 * - Topographic / Joy Division style lines
 * - Bold, high-contrast horizontal lines
 * - Displaced by noise and mouse interaction
 *
 * Technical Details:
 * - GLSL procedural line generation
 * - Vertical displacement based on Simplex Noise
 */

const CURRENT_ID = 'v9';

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
    border-color: ${props => props.theme.colors.accent.primary};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const LinesExperiment = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [textTexture, setTextTexture] = React.useState(null);

    const prev = getPrevExperiment(CURRENT_ID);
    const next = getNextExperiment(CURRENT_ID);
    const current = getExperimentById(CURRENT_ID);

    // Generate text texture on mount
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const size = 1024; // High res for sharp text
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, size, size);

        // White text
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 300px "Helvetica Neue", Arial, sans-serif';

        // Draw text
        ctx.fillText('YUSH', size / 2, size / 2);

        // Create texture
        const texture = new THREE.CanvasTexture(canvas);
        setTextTexture(texture);
    }, []);

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
                title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Lines'}`}
                customUniforms={{
                    u_textTexture: { value: textTexture }
                }}
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

export default LinesExperiment;
