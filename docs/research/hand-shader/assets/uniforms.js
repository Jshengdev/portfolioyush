/**
 * Hand Shader Uniform Definitions
 * Copy-paste reference for Three.js ShaderMaterial
 */

import * as THREE from 'three';

// Complete uniform set for hand shader system
export const handShaderUniforms = {
    // ============================================
    // GLOBAL UNIFORMS
    // ============================================
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },

    // ============================================
    // LAYER TOGGLES (for debugging)
    // ============================================
    u_showContours: { value: true },
    u_showStipple: { value: true },
    u_showDissolution: { value: true },
    u_showParticles: { value: true },
    u_debugMode: { value: 0 }, // 0=none, 1=contours, 2=stipple, 3=depth, 4=edges

    // ============================================
    // DEPTH MAP
    // ============================================
    u_depthMap: { value: null }, // THREE.Texture

    // ============================================
    // CONTOUR LAYER
    // ============================================
    u_contour_interval: { value: 0.05 },    // Distance between lines (0.02-0.15)
    u_contour_thickness: { value: 1.5 },    // Line width in pixels (0.5-3.0)
    u_contour_alpha: { value: 0.7 },        // Line opacity (0.3-1.0)
    u_contour_color: { value: new THREE.Color(1, 1, 1) },

    // ============================================
    // STIPPLE LAYER
    // ============================================
    u_stipple_scale: { value: 50.0 },       // Dot density (20-100)
    u_stipple_threshold: { value: 0.5 },    // Density falloff (0.3-0.7)
    u_stipple_alpha: { value: 0.4 },        // Dot opacity

    // ============================================
    // DISSOLUTION LAYER
    // ============================================
    u_dissolve_progress: { value: 0.0 },    // Animation progress (0.0-1.0)
    u_dissolve_noiseScale: { value: 3.0 },  // Noise frequency (1.0-5.0)
    u_dissolve_edgeWidth: { value: 0.1 },   // Glow width (0.05-0.2)
    u_dissolve_edgeColor: { value: new THREE.Color(0.53, 0.66, 0.84) }, // Blue accent

    // ============================================
    // PARTICLE LAYER
    // ============================================
    u_particle_size: { value: 2.0 },        // Base particle size
    u_particle_color: { value: new THREE.Color(0.8, 0.9, 1.0) },
    u_particle_positionTexture: { value: null }, // GPGPU texture

    // ============================================
    // WIND PHYSICS
    // ============================================
    u_wind_strength: { value: 1.0 },        // Wind force multiplier
    u_wind_direction: { value: new THREE.Vector3(1, 0.2, 0) },
    u_wind_turbulence: { value: 0.5 },      // Noise intensity
};

// Route-specific presets
export const routePresets = {
    '/': {
        dissolve_progress: 0.0,
        wind_strength: 0.5,
        contour_alpha: 0.8,
    },
    '/about': {
        dissolve_progress: 0.2,
        wind_strength: 0.3,
        contour_alpha: 0.6,
    },
    '/projects': {
        dissolve_progress: 0.3,
        wind_strength: 1.0,
        contour_alpha: 0.7,
    },
    '/archive': {
        dissolve_progress: 0.4,
        wind_strength: 0.5,
        contour_alpha: 0.5,
    },
    '/contact': {
        dissolve_progress: 0.5,
        wind_strength: 0.3,
        contour_alpha: 0.6,
    },
};

// Helper to apply route preset
export function applyRoutePreset(uniforms, pathname) {
    const preset = routePresets[pathname] || routePresets['/'];

    Object.entries(preset).forEach(([key, value]) => {
        const uniformKey = `u_${key}`;
        if (uniforms[uniformKey]) {
            uniforms[uniformKey].value = value;
        }
    });
}

// Helper to create texture loader with correct settings
export function loadDepthMap(path) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(path);

    texture.format = THREE.LuminanceFormat;
    texture.type = THREE.UnsignedByteType;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
}
