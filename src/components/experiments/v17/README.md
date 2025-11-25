# V17 Atmosphere Shader - Controls Documentation

## Overview

The V17 Atmosphere experiment features a **real-time shader controls panel** that allows you to adjust all visual parameters dynamically.

## How to Access

1. **Open the experiment**: Navigate to `/experiments/v17`
2. **Show controls**:
   - Click the `⚙ CONTROLS` button (bottom-left)
   - OR press the `C` key on your keyboard

## Controls Panel Features

### Panel Navigation
- **Drag to reposition**: Click and drag the header to move the panel
- **Collapsible sections**: Click category headers to expand/collapse
- **Close panel**: Click the `✕` button or press `ESC`

### Preset Buttons
Quick access to pre-configured visual styles:

- **Cinematic** - Soft, filmic atmosphere (default)
- **Retro** - Heavy grain, strong vignette
- **Clean** - Minimal grain, soft light
- **Experimental** - Extreme fog, heavy depth

### Parameter Categories

#### FOG & ATMOSPHERE
- **Fog Density** (0-1) - Overall fog intensity
- **Noise Scale** (0.1-3) - Size of fog patches (larger = bigger patches)
- **Patch Strength** (0-1) - Visibility of thick/thin fog variations
- **Depth Layers** (1-5) - Number of parallax fog layers

#### FILM GRAIN
- **Grain Intensity** (0-0.3) - Strength of analog film grain
- **Grain Scale** (1000-10000) - Grain particle size (higher = finer)

#### LIGHT & DIFFUSION
- **Light Radius** (0.3-3) - Width of light spread
- **Light Softness** (0.5-15) - Softness of light falloff (higher = softer)

#### VIGNETTE
- **Vignette Strength** (0-2) - Darkness of edge vignette
- **Vignette Size** (0.1-2) - Size of vignette area

#### COLOR GRADING
- **Color Noise** (0-0.1) - Subtle color variation for organic feel
- **Breath Amount** (0-0.05) - Breathing/pulsing effect intensity
- **Breath Speed** (0.1-1) - Speed of breathing animation

## Footer Actions

- **Reset All** - Reset all parameters to default values
- **Copy Values** - Copy current parameter values as JSON to clipboard

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `C` | Toggle controls panel |
| `ESC` | Close controls (if open) or exit experiment |
| `←` | Previous experiment |
| `→` | Next experiment |

## Technical Details

### Integration Pattern

```jsx
// v17/index.jsx
const [customUniforms] = useState({
  u_fogDensity: { value: 0.65 },
  u_grainIntensity: { value: 0.1 },
  // ... other uniforms
});

<BaseExperimentShader
  fragmentShader={fragmentShader}
  customUniforms={customUniforms}
/>

<ShaderControls
  uniforms={uniformsRef}
  onUpdate={handleUniformUpdate}
  visible={showControls}
  onClose={() => setShowControls(false)}
/>
```

### Shader Uniforms

All parameters are passed as `uniform float` values to the fragment shader:

```glsl
uniform float u_fogDensity;
uniform float u_grainIntensity;
uniform float u_noiseScale;
// ... etc
```

## Adding New Parameters

To add a new controllable parameter:

1. **Define in ShaderControls.jsx** (`SHADER_PARAMS` array):
```javascript
{
  name: 'u_myParam',
  label: 'My Parameter',
  min: 0,
  max: 1,
  step: 0.01,
  default: 0.5,
  category: 'MY CATEGORY',
  description: 'What this parameter does'
}
```

2. **Add uniform to v17/index.jsx**:
```javascript
const [customUniforms] = useState({
  // ... existing uniforms
  u_myParam: { value: 0.5 },
});
```

3. **Declare in shader** (`atmosphere.frag.glsl`):
```glsl
uniform float u_myParam;
```

4. **Use in shader code**:
```glsl
void main() {
  // ... use u_myParam in calculations
}
```

## File Locations

- **Controls Component**: `/src/components/experiments/v17/ShaderControls.jsx`
- **Experiment Page**: `/src/components/experiments/v17/index.jsx`
- **Fragment Shader**: `/src/shaders/experiments/atmosphere.frag.glsl`

## Performance Notes

- All uniform updates are real-time (60fps)
- No re-compilation of shader needed (uniforms only)
- Draggable panel uses optimized event handlers
- Control panel is lazy-rendered (only when visible)

## Design System

The controls panel follows the portfolio's design tokens:
- Uses `styled-components` with `theme` prop
- Glass morphism with `backdrop-filter: blur(10px)`
- Blue accent colors from portfolio theme
- Consistent typography and spacing

---

**Last Updated**: 2025-11-25
**Component Version**: 1.0
