import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/depthscan.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V7: Depth Scan Experiment
 *
 * Visual Effect:
 * - Parallax distortion using a depth map (simulated)
 * - Procedural dot grid revealed by a scanning line
 * - Interactive mouse influence on parallax
 *
 * Technical Details:
 * - GLSL port of a TSL/React-Three-Fiber effect
 * - Uses procedural SDFs to simulate image and depth map
 * - Grid generation using modulo and distance fields
 */

const CURRENT_ID = 'v7';

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
    border-color: ${props => props.theme.colors.accent.green || '#00FF00'};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ScanExperiment = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const progressRef = useRef(0);

    const prev = getPrevExperiment(CURRENT_ID);
    const next = getNextExperiment(CURRENT_ID);
    const current = getExperimentById(CURRENT_ID);

    // Custom uniform for the scan progress
    const customUniforms = {
        u_progress: { value: 0.0 }
    };

    // Animation loop for the scan progress
    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            // 3 second loop (approx 180 frames at 60fps)
            progressRef.current = (Date.now() % 3000) / 3000;

            // We can't directly update the uniform object here because BaseExperimentShader
            // creates its own copy. However, BaseExperimentShader updates u_time automatically.
            // For this specific effect, we'll pass u_progress as a prop if we could, 
            // but BaseExperimentShader doesn't expose the material ref directly.
            //
            // WORKAROUND: We'll calculate progress inside the shader using u_time
            // OR we can try to update the ref value if we passed a ref object.
            //
            // Actually, let's just use u_time in the shader for the loop to keep it simple and performant.

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
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
                title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Scan'}`}
            // We'll calculate progress in shader using u_time for smoother performance
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

export default ScanExperiment;
