# Library Panel Guide

## Overview

The **LibraryPanel** component provides a curated preset library for the V17 Atmosphere Experiment. It allows users to browse and instantly apply pre-configured shader looks organized by aesthetic category.

## Features

### 1. Organized Preset Categories

The library includes **16 presets** across **4 aesthetic categories**:

- **Retro Film** (4 presets) - Vintage analog aesthetics
- **Organic Nature** (4 presets) - Natural atmospheric effects
- **Sci-Fi Digital** (4 presets) - Futuristic digital looks
- **Ethereal Dream** (4 presets) - Dreamy, soft atmospheres

### 2. Visual Indicators

Each preset card features:
- **Gradient color bar** - Visual representation of the preset's color palette
- **Preset name** - Clear, descriptive title
- **Brief description** - What the preset achieves visually
- **Selected indicator** - Checkmark (✓) on currently applied preset

### 3. Collapsible Categories

- Accordion-style navigation
- Category badges showing preset count
- Smooth expand/collapse transitions
- Start with first category expanded by default

### 4. User Controls

**Toggle Library:**
- Click the `📚 LIBRARY` button (bottom-right)
- Press `L` key to toggle

**Apply Preset:**
- Click any preset card
- All uniforms update instantly
- Visual feedback on selection

**Close Library:**
- Click the `✕` button in header
- Press `Escape` key
- Click `✕ CLOSE` button (bottom-right)

### 5. Draggable Panel

- Drag from header to reposition
- Panel position persists during session
- Smooth cursor feedback (grab/grabbing)

## Integration

The LibraryPanel is integrated into the V17 experiment with:

```jsx
<LibraryPanel
  currentValues={uniformsRef}      // Current uniform values
  onApplyPreset={handleApplyPreset} // Callback to apply preset
  visible={showLibrary}             // Visibility state
  onClose={() => setShowLibrary(false)} // Close handler
/>
```

## Preset Structure

Each preset includes:

```javascript
{
  description: 'Brief visual description',
  colors: ['#color1', '#color2', '#color3'], // Gradient indicator colors
  values: {
    u_fogDensity: 0.65,
    u_grainIntensity: 0.1,
    // ... all shader uniforms
  }
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `L` | Toggle Library Panel |
| `Escape` | Close Library (if open) |
| `C` | Toggle Controls Panel |

## Styling

The LibraryPanel uses the same design language as ShaderControls:
- Dark glass morphism background
- Theme-aware colors from ThemeContext
- Smooth transitions and hover effects
- Consistent typography and spacing

## Preset Highlights

### Retro Film

- **70s Kodachrome** - Warm, saturated colors with heavy grain
- **Noir Smoke** - High contrast B&W with dramatic vignette
- **VHS Decay** - Scanlines, chromatic aberration, tape artifacts
- **Silent Film** - Sepia tone with subtle flicker

### Organic Nature

- **Morning Mist** - Soft, cool fog with gentle diffusion
- **Forest Canopy** - Dappled light through organic patches
- **Desert Haze** - Shimmering heat waves with warm particles
- **Ocean Depths** - Deep blue volumetric fog

### Sci-Fi Digital

- **Cyberpunk Neon** - Glitchy digital fog with aberration
- **Holographic Interface** - Clean digital with scanlines
- **Matrix Rain** - Green monochrome with artifacts
- **Alien Atmosphere** - Otherworldly color shifts

### Ethereal Dream

- **Soft Focus** - Dreamy, gentle atmosphere
- **Celestial Glow** - Radiant bloom with soft fog
- **Twilight Vapor** - Purple-blue gradient with glow
- **Liminal Space** - Unsettling clean fog

## Technical Notes

- Presets apply all uniform values at once (batch update)
- No interpolation between presets (instant application)
- Selected preset indicator uses full category/preset path
- Library can be extended by passing custom `presets` prop
- Default library is built-in (PRESET_LIBRARY constant)

## Future Enhancements

Potential additions:
- Preset interpolation/morphing
- Custom preset saving
- Export/import preset configurations
- Preset search/filter
- Favorite presets system
- Random preset button
