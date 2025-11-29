import React, { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/contour_luminance.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V21: Contour - Luminance-Driven Horizontal Lines
 *
 * Renders a hand photograph as horizontal contour lines where line density
 * is driven by image luminance. Brighter areas have denser lines,
 * darker areas have sparser lines.
 *
 * The effect creates a topographic feel where lines appear to wrap around
 * the form's volume. Clean, crisp, graphic style - black background, white lines.
 *
 * Controls:
 * - Line Count: Base number of horizontal lines
 * - Line Thickness: Width of each line
 * - Density Power: How strongly luminance affects line spacing
 * - Min Spacing: Minimum spacing in dark areas
 * - Wave Amount: Subtle distortion to enhance form
 * - Wave Frequency: Frequency of wave pattern
 */

const CURRENT_ID = 'v21';

// ============================================
// STYLED COMPONENTS
// ============================================

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
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlPanel = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const SectionLabel = styled.div`
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-top: 12px;
  margin-bottom: 4px;
  padding-left: 4px;
`;

const SliderContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 14px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  span {
    font-size: 10px;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
  }

  .value {
    color: rgba(136, 169, 215, 0.9);
    font-family: monospace;
    font-size: 11px;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: rgba(136, 169, 215, 0.9);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: rgba(136, 169, 215, 0.9);
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const ImageSwitcher = styled.div`
  display: flex;
  gap: 6px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const ImageButton = styled.button`
  flex: 1;
  background: ${props => props.$active ? 'rgba(136, 169, 215, 0.3)' : 'rgba(0, 0, 0, 0.4)'};
  border: 1px solid ${props => props.$active ? 'rgba(136, 169, 215, 0.6)' : 'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)'};
  padding: 8px 12px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(136, 169, 215, 0.2);
    border-color: rgba(136, 169, 215, 0.4);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const InfoPanel = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  max-width: 280px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;

  h3 {
    margin: 0 0 10px 0;
    font-size: 14px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    font-weight: 400;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
  }

  .mode-info {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(136, 169, 215, 0.8);
    font-size: 11px;
  }
`;

// ============================================
// COMPONENT
// ============================================

const ContourLuminanceExperiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const textureRef = useRef(null);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // State
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Image switching
  const [activeImage, setActiveImage] = useState(0);
  const texturesRef = useRef([]);
  const imageOptions = [
    { name: 'Hand 1', path: '/assets/hand/hand_depth.png' },
    { name: 'Hand 2', path: '/assets/hand/hand2_depth.png' },
    { name: 'Ideal', path: '/assets/hand/idealhand.png' },
    { name: 'Photo', path: '/assets/hand/imagehand.png' },
  ];

  // Slider values
  const [lineCount, setLineCount] = useState(100);
  const [lineThickness, setLineThickness] = useState(1.5);
  const [densityPower, setDensityPower] = useState(2.0);
  const [minSpacing, setMinSpacing] = useState(0.2);
  const [waveAmount, setWaveAmount] = useState(0.3);
  const [waveFrequency, setWaveFrequency] = useState(4.0);

  // Create a placeholder texture
  const createPlaceholderTexture = () => {
    const data = new Uint8Array([128, 128, 128, 255]);
    const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  };

  // Initialize custom uniforms
  const [customUniforms] = useState(() => {
    const placeholder = createPlaceholderTexture();

    return {
      u_handTexture: { value: placeholder },
      u_lineCount: { value: 100.0 },
      u_lineThickness: { value: 1.5 },
      u_densityPower: { value: 2.0 },
      u_minSpacing: { value: 0.2 },
      u_waveAmount: { value: 0.3 },
      u_waveFrequency: { value: 4.0 },
    };
  });

  // Load textures
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const loadPromises = imageOptions.map((img, index) => {
      return new Promise((resolve) => {
        textureLoader.load(
          img.path,
          (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texturesRef.current[index] = texture;
            console.log(`V21: Loaded texture ${index}: ${img.name}`);
            resolve(texture);
          },
          undefined,
          (error) => {
            console.warn(`V21: Could not load ${img.path}:`, error);
            resolve(null);
          }
        );
      });
    });

    // Set first texture when loaded
    Promise.race(loadPromises).then(() => {
      if (texturesRef.current[0]) {
        customUniforms.u_handTexture.value = texturesRef.current[0];
        textureRef.current = texturesRef.current[0];
        setTextureLoaded(true);
      }
    });

    return () => {
      texturesRef.current.forEach(tex => {
        if (tex) tex.dispose();
      });
    };
  }, []);

  // Switch texture when activeImage changes
  useEffect(() => {
    if (texturesRef.current[activeImage]) {
      customUniforms.u_handTexture.value = texturesRef.current[activeImage];
      textureRef.current = texturesRef.current[activeImage];
      console.log(`V21: Switched to image ${activeImage}: ${imageOptions[activeImage].name}`);
    }
  }, [activeImage]);

  // Update uniforms when sliders change
  useEffect(() => {
    customUniforms.u_lineCount.value = lineCount;
    customUniforms.u_lineThickness.value = lineThickness;
    customUniforms.u_densityPower.value = densityPower;
    customUniforms.u_minSpacing.value = minSpacing;
    customUniforms.u_waveAmount.value = waveAmount;
    customUniforms.u_waveFrequency.value = waveFrequency;
  }, [lineCount, lineThickness, densityPower, minSpacing, waveAmount, waveFrequency]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft' && prev) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/experiments/${next.id}`);
      if (e.key === 'i' || e.key === 'I') {
        setActiveImage(prev => (prev + 1) % imageOptions.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Contour'}`}
        customUniforms={customUniforms}
      />

      {/* Navigation */}
      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev?.id || 'v20'}`)}>
            ← PREV
          </NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next?.id || 'v1'}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>

      {/* Control Panel */}
      <ControlPanel>
        {/* Image Switcher */}
        <SectionLabel>Source Image</SectionLabel>
        <ImageSwitcher>
          {imageOptions.map((img, index) => (
            <ImageButton
              key={index}
              $active={activeImage === index}
              onClick={() => setActiveImage(index)}
              disabled={!texturesRef.current[index]}
            >
              {img.name}
            </ImageButton>
          ))}
        </ImageSwitcher>

        {/* Line Parameters */}
        <SectionLabel>Line Parameters</SectionLabel>
        <SliderContainer>
          <SliderLabel>
            <span>LINE COUNT</span>
            <span className="value">{lineCount}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="30"
            max="200"
            step="5"
            value={lineCount}
            onChange={(e) => setLineCount(parseInt(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>THICKNESS</span>
            <span className="value">{lineThickness.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="4.0"
            step="0.1"
            value={lineThickness}
            onChange={(e) => setLineThickness(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Density Parameters */}
        <SectionLabel>Density Control</SectionLabel>
        <SliderContainer>
          <SliderLabel>
            <span>DENSITY POWER</span>
            <span className="value">{densityPower.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="4.0"
            step="0.1"
            value={densityPower}
            onChange={(e) => setDensityPower(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>MIN SPACING</span>
            <span className="value">{minSpacing.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.05"
            max="0.5"
            step="0.01"
            value={minSpacing}
            onChange={(e) => setMinSpacing(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Wave Parameters */}
        <SectionLabel>Form Wrapping</SectionLabel>
        <SliderContainer>
          <SliderLabel>
            <span>WAVE AMOUNT</span>
            <span className="value">{waveAmount.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1.0"
            step="0.05"
            value={waveAmount}
            onChange={(e) => setWaveAmount(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>WAVE FREQ</span>
            <span className="value">{waveFrequency.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={waveFrequency}
            onChange={(e) => setWaveFrequency(parseFloat(e.target.value))}
          />
        </SliderContainer>
      </ControlPanel>

      {/* Info Panel */}
      <InfoPanel>
        <h3>Luminance Contours</h3>
        <p>
          Horizontal lines with density driven by image brightness.
          Brighter areas = denser lines. Lines wrap around form.
        </p>
        <p className="mode-info">
          Press I to cycle images
          {!textureLoaded && ' (Loading...)'}
        </p>
      </InfoPanel>
    </>
  );
};

export default ContourLuminanceExperiment;
