import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/builder.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V10: Shader Texture Builder
 *
 * Visual Effect:
 * - Complex procedural texture (Domain Warped FBM)
 * - "Technical Brutalist" / "Glassmorphism" UI overlay
 * - Real-time parameter tweaking
 *
 * Technical Details:
 * - Custom UI components for sliders
 * - State management for shader uniforms
 */

const CURRENT_ID = 'v10';

// --- UI Components ---

const UIContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  width: 280px;
  padding: 30px;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const Status = styled.div`
  font-size: 10px;
  font-family: 'Roboto Mono', monospace;
  color: #00ff9d;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background: #00ff9d;
    border-radius: 50%;
    box-shadow: 0 0 8px #00ff9d;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Label = styled.label`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`;

const Value = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.9);
`;

// Custom Slider Styling
const SliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  cursor: pointer;
  margin: 10px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%; // Circle handle
    cursor: pointer;
    transition: transform 0.1s;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
`;

const NavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 90; // Below UIContainer
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

const BuilderExperiment = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const prev = getPrevExperiment(CURRENT_ID);
    const next = getNextExperiment(CURRENT_ID);
    const current = getExperimentById(CURRENT_ID);

    // Shader Parameters State
    const [params, setParams] = useState({
        scale: 3.0,
        distortion: 1.5,
        detail: 4.0,
        contrast: 1.2,
        speed: 0.5
    });

    const handleChange = (key, value) => {
        setParams(prev => ({ ...prev, [key]: parseFloat(value) }));
    };

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
                title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Builder'}`}
                customUniforms={{
                    u_scale: { value: params.scale },
                    u_distortion: { value: params.distortion },
                    u_detail: { value: params.detail },
                    u_contrast: { value: params.contrast },
                    u_speed: { value: params.speed }
                }}
            />

            {/* Custom UI Overlay */}
            <UIContainer>
                <Header>
                    <Title>Texture Gen</Title>
                    <Status>ACTIVE</Status>
                </Header>

                <ControlGroup>
                    <LabelRow>
                        <Label>Scale</Label>
                        <Value>{params.scale.toFixed(2)}</Value>
                    </LabelRow>
                    <SliderInput
                        type="range" min="0.1" max="10.0" step="0.1"
                        value={params.scale}
                        onChange={(e) => handleChange('scale', e.target.value)}
                    />
                </ControlGroup>

                <ControlGroup>
                    <LabelRow>
                        <Label>Distortion</Label>
                        <Value>{params.distortion.toFixed(2)}</Value>
                    </LabelRow>
                    <SliderInput
                        type="range" min="0.0" max="5.0" step="0.1"
                        value={params.distortion}
                        onChange={(e) => handleChange('distortion', e.target.value)}
                    />
                </ControlGroup>

                <ControlGroup>
                    <LabelRow>
                        <Label>Detail</Label>
                        <Value>{params.detail.toFixed(0)}</Value>
                    </LabelRow>
                    <SliderInput
                        type="range" min="1" max="6" step="1"
                        value={params.detail}
                        onChange={(e) => handleChange('detail', e.target.value)}
                    />
                </ControlGroup>

                <ControlGroup>
                    <LabelRow>
                        <Label>Contrast</Label>
                        <Value>{params.contrast.toFixed(2)}</Value>
                    </LabelRow>
                    <SliderInput
                        type="range" min="0.5" max="3.0" step="0.1"
                        value={params.contrast}
                        onChange={(e) => handleChange('contrast', e.target.value)}
                    />
                </ControlGroup>

                <ControlGroup>
                    <LabelRow>
                        <Label>Flow Speed</Label>
                        <Value>{params.speed.toFixed(2)}</Value>
                    </LabelRow>
                    <SliderInput
                        type="range" min="0.0" max="2.0" step="0.1"
                        value={params.speed}
                        onChange={(e) => handleChange('speed', e.target.value)}
                    />
                </ControlGroup>

            </UIContainer>

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

export default BuilderExperiment;
