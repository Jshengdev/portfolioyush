/**
 * Centralized configuration for all shader experiments
 *
 * This is the single source of truth for experiment metadata.
 * When adding new experiments (v6, v7, etc.), simply add an entry here
 * and the navigation will automatically update across all pages.
 *
 * @module experimentConfig
 */

/**
 * Array of all experiment configurations
 * Order determines navigation sequence (prev/next)
 */
export const experiments = [
  {
    id: 'v1',
    name: 'Aurora',
    description: 'Flowing color bands like northern lights',
    colors: ['#1AE664', '#33B3E6', '#9933E6']
  },
  {
    id: 'v2',
    name: 'Fog',
    description: 'Layered translucent clouds that drift',
    colors: ['#E6E8F0', '#8C919A', '#5A5F66']
  },
  {
    id: 'v3',
    name: 'Bloom',
    description: 'Soft drifting light glows',
    colors: ['#FFD4A3', '#E6A3FF', '#A3FFE6']
  },
  {
    id: 'v4',
    name: 'Liquid',
    description: 'Organic blob shapes that merge',
    colors: ['#FF6B9D', '#C44BFF', '#4B9DFF']
  },
  {
    id: 'v5',
    name: 'Waves',
    description: 'Subtle horizontal gradient waves',
    colors: ['#6B8CFF', '#B86BFF', '#6BFFD4']
  },
  {
    id: 'v6',
    name: 'Void',
    description: 'Interactive digital noise and static',
    colors: ['#111111', '#444444', '#CCCCCC']
  },
  {
    id: 'v7',
    name: 'Scan',
    description: 'Depth map parallax and scanning grid',
    colors: ['#000000', '#00FF00', '#FFFFFF']
  },
  {
    id: 'v8',
    name: 'Web',
    description: 'Blurry wireframe with depth of field',
    colors: ['#000000', '#FFFFFF', '#888888']
  },
  {
    id: 'v9',
    name: 'Lines',
    description: 'Topographic bold lines',
    colors: ['#000000', '#FFFFFF', '#444444']
  },
  {
    id: 'v10',
    name: 'Builder',
    description: 'Procedural texture generator',
    colors: ['#111111', '#888888', '#FFFFFF']
  },
  {
    id: 'v11',
    name: 'Halftone',
    description: 'Raymarched dithering effect',
    colors: ['#111111', '#999999', '#FFFFFF']
  },
  {
    id: 'v12',
    name: 'Constellation',
    description: 'Red threads connect cursor to floating particles',
    colors: ['#FF1744', '#FF4444', '#220000']
  },
  {
    id: 'v13',
    name: 'Ripples',
    description: 'Expanding fate ripples radiate from cursor',
    colors: ['#FF1744', '#FF6B6B', '#1A0000']
  },
  {
    id: 'v14',
    name: 'Magnetism',
    description: 'Tension threads reveal invisible connections',
    colors: ['#FF1744', '#FF3366', '#330011']
  },
  {
    id: 'v15',
    name: 'Fate',
    description: 'Halftone hand dissolving into particle dust',
    colors: ['#1A1A1A', '#E8DFD0', '#FF1744']
  },
  {
    id: 'v16',
    name: 'Scanline',
    description: 'Topographic contour hand with horizontal scanlines',
    colors: ['#000000', '#FFFFFF', '#88A9D7']
  },
  {
    id: 'v17',
    name: 'Atmosphere',
    description: 'Cinematic grainy fog with warm light diffusion',
    colors: ['#1A1A1A', '#E8E0D5', '#2A2A35']
  },
  {
    id: 'v19',
    name: 'Galaxy',
    description: 'Procedural spiral galaxy with differential rotation',
    colors: ['#0A0A1A', '#FFE4B5', '#6B8CFF']
    id: 'v18',
    name: 'Topographic',
    description: 'Depth map hand with toggleable contour layers',
    colors: ['#000000', '#FFFFFF', '#88A9D7']
  },
];

/**
 * Get experiment by ID
 * @param {string} id - Experiment ID (e.g., 'v1', 'v2')
 * @returns {Object|undefined} Experiment config object
 */
export const getExperimentById = (id) => experiments.find(e => e.id === id);

/**
 * Get index of experiment in array
 * @param {string} id - Experiment ID
 * @returns {number} Index in experiments array, or -1 if not found
 */
export const getExperimentIndex = (id) => experiments.findIndex(e => e.id === id);

/**
 * Get previous experiment (wraps around to end)
 * @param {string} id - Current experiment ID
 * @returns {Object} Previous experiment config
 */
export const getPrevExperiment = (id) => {
  const idx = getExperimentIndex(id);
  const prevIdx = idx <= 0 ? experiments.length - 1 : idx - 1;
  return experiments[prevIdx];
};

/**
 * Get next experiment (wraps around to beginning)
 * @param {string} id - Current experiment ID
 * @returns {Object} Next experiment config
 */
export const getNextExperiment = (id) => {
  const idx = getExperimentIndex(id);
  const nextIdx = idx >= experiments.length - 1 ? 0 : idx + 1;
  return experiments[nextIdx];
};

/**
 * Get total number of experiments
 * @returns {number} Total count
 */
export const getExperimentCount = () => experiments.length;
