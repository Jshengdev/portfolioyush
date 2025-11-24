import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * ControlsOverlay - Interactive parameter controls panel for shader experiments
 *
 * Features:
 * - Collapsible panel (toggle with "C" key or button)
 * - Theme-aware styling (adapts to dark/light mode)
 * - Real-time slider controls for shader parameters
 * - Semi-transparent glassmorphism design
 * - Positioned in bottom-right corner
 *
 * @param {Object} props
 * @param {Object} props.params - Parameter definitions with value, min, max, step, label
 * @param {Function} props.onParamChange - Callback when parameter value changes (key, value)
 * @param {boolean} [props.defaultOpen=false] - Whether panel starts open
 */

const OverlayContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: ${props => props.$isDarkMode
    ? 'rgba(0, 0, 0, 0.85)'
    : 'rgba(255, 255, 255, 0.85)'};
  border: 1px solid ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(0, 0, 0, 0.15)'};
  padding: 24px 20px 20px;
  border-radius: 8px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 200;
  min-width: 220px;
  max-width: 280px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(10px)'};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  box-shadow: ${props => props.$isDarkMode
    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
    : '0 4px 20px rgba(0, 0, 0, 0.1)'};
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: ${props => props.$isDarkMode
    ? 'rgba(0, 0, 0, 0.7)'
    : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.2)'};
  color: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.7)'
    : 'rgba(0, 0, 0, 0.7)'};
  padding: 10px 14px;
  font-family: 'Work Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.5px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 199;
  opacity: ${props => props.$isOpen ? 0 : 1};
  visibility: ${props => props.$isOpen ? 'hidden' : 'visible'};
  transition: opacity 0.2s ease, visibility 0.2s ease, background 0.15s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &:hover {
    background: ${props => props.$isDarkMode
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
`;

const PanelTitle = styled.span`
  color: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.6)'
    : 'rgba(0, 0, 0, 0.6)'};
  font-family: 'Work Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.4)'
    : 'rgba(0, 0, 0, 0.4)'};
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: ${props => props.$isDarkMode
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    background: ${props => props.$isDarkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const SliderGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.label`
  color: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.5)'
    : 'rgba(0, 0, 0, 0.5)'};
  font-family: 'Work Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const Value = styled.span`
  color: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(0, 0, 0, 0.8)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(0, 0, 0, 0.15)'};
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: ${props => props.$isDarkMode ? '#fff' : '#000'};
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    box-shadow: ${props => props.$isDarkMode
      ? '0 2px 6px rgba(0, 0, 0, 0.3)'
      : '0 2px 6px rgba(0, 0, 0, 0.2)'};
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  &::-webkit-slider-thumb:active {
    transform: scale(1.1);
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: ${props => props.$isDarkMode ? '#fff' : '#000'};
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: transform 0.1s ease;
    box-shadow: ${props => props.$isDarkMode
      ? '0 2px 6px rgba(0, 0, 0, 0.3)'
      : '0 2px 6px rgba(0, 0, 0, 0.2)'};
  }

  &::-moz-range-track {
    background: ${props => props.$isDarkMode
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)'};
    border-radius: 2px;
    height: 4px;
  }
`;

const KeyboardHint = styled.span`
  color: ${props => props.$isDarkMode
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(0, 0, 0, 0.3)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.5px;
`;

const ControlsOverlay = ({ params = {}, onParamChange, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isDarkMode } = useContext(ThemeContext);

  // Toggle panel open/closed
  const togglePanel = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Keyboard toggle (C key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'c' || e.key === 'C') {
        togglePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePanel]);

  // Handle slider change
  const handleSliderChange = useCallback((key, value) => {
    if (onParamChange) {
      onParamChange(key, parseFloat(value));
    }
  }, [onParamChange]);

  // If no params provided, show nothing
  const paramEntries = Object.entries(params);
  if (paramEntries.length === 0) {
    return null;
  }

  return (
    <>
      {/* Toggle Button (visible when panel is closed) */}
      <ToggleButton
        $isOpen={isOpen}
        $isDarkMode={isDarkMode}
        onClick={() => setIsOpen(true)}
        aria-label="Open controls panel"
      >
        CONTROLS (C)
      </ToggleButton>

      {/* Controls Panel */}
      <OverlayContainer $isOpen={isOpen} $isDarkMode={isDarkMode}>
        <PanelHeader $isDarkMode={isDarkMode}>
          <PanelTitle $isDarkMode={isDarkMode}>Parameters</PanelTitle>
          <CloseButton
            $isDarkMode={isDarkMode}
            onClick={() => setIsOpen(false)}
            aria-label="Close controls panel"
          >
            ×
          </CloseButton>
        </PanelHeader>

        {paramEntries.map(([key, param]) => (
          <SliderGroup key={key}>
            <LabelRow>
              <Label $isDarkMode={isDarkMode}>
                {param.label || key}
              </Label>
              <Value $isDarkMode={isDarkMode}>
                {typeof param.value === 'number' ? param.value.toFixed(2) : param.value}
              </Value>
            </LabelRow>
            <Slider
              type="range"
              min={param.min ?? 0}
              max={param.max ?? 1}
              step={param.step ?? 0.01}
              value={param.value}
              $isDarkMode={isDarkMode}
              onChange={(e) => handleSliderChange(key, e.target.value)}
              aria-label={param.label || key}
            />
          </SliderGroup>
        ))}

        <KeyboardHint $isDarkMode={isDarkMode}>
          Press C to toggle
        </KeyboardHint>
      </OverlayContainer>
    </>
  );
};

export default ControlsOverlay;
