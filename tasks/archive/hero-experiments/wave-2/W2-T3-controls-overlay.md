# W2-T3: Add Parameter Controls Overlay (Optional)

**Wave**: 2 (Integration & Polish)
**Task**: 3 of 5
**Agent**: Engineer
**Time Estimate**: 30 minutes
**Status**: ⏳ Not Started
**Can Run In Parallel**: ✅ Yes (after Wave 1)
**Dependencies**: Wave 1 complete

---

## Prompt (Copy & Paste)

```
I need you to add an optional parameter controls overlay to experiment pages for live tweaking.

## Task
Create a collapsible controls panel that allows real-time adjustment of shader parameters. This is useful for fine-tuning the visual effects.

## File to Create
`/src/components/experiments/ControlsOverlay.jsx`

## Requirements
1. Collapsible panel (toggle with keyboard "C" or button)
2. Sliders for common parameters
3. Real-time uniform updates
4. Position in bottom-right corner
5. Semi-transparent, unobtrusive design

## Component Structure

```jsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

const OverlayContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: ${props => props.theme.colors.background.overlay || 'rgba(0,0,0,0.7)'};
  border: 1px solid ${props => props.theme.colors.border.primary || 'rgba(255,255,255,0.2)'};
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  z-index: 200;
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: ${props => props.theme.colors.background.overlay || 'rgba(0,0,0,0.5)'};
  border: 1px solid ${props => props.theme.colors.border.primary || 'rgba(255,255,255,0.2)'};
  color: ${props => props.theme.colors.text.primary || 'rgba(255,255,255,0.7)'};
  padding: 8px 12px;
  font-family: 'Work Sans', sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 199;
  display: ${props => props.isOpen ? 'none' : 'block'};

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const SliderGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.text.secondary || 'rgba(255,255,255,0.5)'};
  font-family: 'Work Sans', sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Value = styled.span`
  color: ${props => props.theme.colors.text.primary || 'rgba(255,255,255,0.7)'};
  font-family: 'Work Sans', sans-serif;
  font-size: 11px;
  float: right;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: rgba(255,255,255,0.8);
  }
`;

const ControlsOverlay = ({ params, onParamChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  // Keyboard toggle
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const defaultParams = {
    speed: { value: 1.0, min: 0.1, max: 3.0, step: 0.1, label: 'Speed' },
    intensity: { value: 0.5, min: 0.0, max: 1.0, step: 0.05, label: 'Intensity' },
    scale: { value: 1.0, min: 0.5, max: 2.0, step: 0.1, label: 'Scale' },
    ...params
  };

  return (
    <>
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(true)}>
        CONTROLS (C)
      </ToggleButton>
      <OverlayContainer isOpen={isOpen}>
        <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
        {Object.entries(defaultParams).map(([key, param]) => (
          <SliderGroup key={key}>
            <Label>
              {param.label}
              <Value>{param.value.toFixed(2)}</Value>
            </Label>
            <Slider
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={param.value}
              onChange={(e) => onParamChange(key, parseFloat(e.target.value))}
            />
          </SliderGroup>
        ))}
      </OverlayContainer>
    </>
  );
};

export default ControlsOverlay;
```

## Usage in Experiment Component

```jsx
import ControlsOverlay from '../ControlsOverlay';

const [params, setParams] = useState({
  speed: { value: 1.0, min: 0.1, max: 3.0, step: 0.1, label: 'Speed' },
  intensity: { value: 0.5, min: 0.0, max: 1.0, step: 0.05, label: 'Intensity' },
});

const handleParamChange = (key, value) => {
  setParams(prev => ({
    ...prev,
    [key]: { ...prev[key], value }
  }));
  // Update shader uniform here
};

return (
  <>
    <BaseExperimentShader ... />
    <ControlsOverlay params={params} onParamChange={handleParamChange} />
  </>
);
```

## Note
This is an OPTIONAL enhancement. The experiments should work without it. Add this only if time permits and you want parameter tweaking capability.

## Acceptance Criteria
- [ ] Controls panel renders
- [ ] Toggle works (button + keyboard "C")
- [ ] Sliders move smoothly
- [ ] Theme-aware styling
- [ ] Doesn't block experiment viewing

## Test
Press "C" on any experiment page to toggle controls.
```

---

## File to Create

**Path**: `/src/components/experiments/ControlsOverlay.jsx`

---

## Features

| Feature | Implementation |
|---------|----------------|
| Toggle | Button + Keyboard "C" |
| Position | Bottom-right corner |
| Styling | Semi-transparent, blur backdrop |
| Sliders | Speed, Intensity, Scale |

---

## Acceptance Criteria

- [ ] Controls component created
- [ ] Toggle works
- [ ] Sliders functional
- [ ] Theme-aware

---

## Completion Checklist

- [ ] Component created
- [ ] Can toggle open/closed
- [ ] Styling matches portfolio aesthetic
