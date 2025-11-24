/**
 * Centralized Experiment Configuration
 * Single source of truth for all shader experiments
 *
 * Adding a new experiment? Just add an entry here!
 * ExperimentNav and other components will auto-update.
 *
 * @module experimentConfig
 */

/**
 * Experiment definitions
 * @typedef {Object} Experiment
 * @property {string} id - URL slug (v1, v2, etc.)
 * @property {string} name - Display name
 * @property {string} description - Short description for cards
 * @property {string[]} colors - CSS color strings for gradient preview
 * @property {string} gradientAngle - CSS gradient angle (optional, defaults to 135deg)
 */

export const experiments = [
  {
    id: 'v1',
    name: 'Aurora',
    description: 'Flowing color bands like northern lights',
    colors: ['#1AE666', '#33B3E6', '#9933E6'],
    gradientAngle: '135deg',
  },
  {
    id: 'v2',
    name: 'Fog',
    description: 'Layered translucent clouds that drift',
    colors: ['#E6EBF2', '#A0A8B0', '#808C99'],
    gradientAngle: '180deg',
  },
  {
    id: 'v3',
    name: 'Bloom',
    description: 'Soft drifting light glows',
    colors: ['#FFCC99', '#99CCFF', '#FF99CC', '#CCB3FF'],
    gradientAngle: '45deg',
  },
  {
    id: 'v4',
    name: 'Liquid',
    description: 'Organic blob shapes that merge',
    colors: ['#6699FF', '#E680B3', '#6699FF'],
    gradientAngle: '135deg',
  },
  {
    id: 'v5',
    name: 'Waves',
    description: 'Subtle horizontal gradient waves',
    colors: ['#99B3E6', '#B399D9', '#A6CCBF'],
    gradientAngle: '90deg',
  },
];

/**
 * Get experiment by ID
 * @param {string} id - Experiment ID (v1, v2, etc.)
 * @returns {Experiment|undefined}
 */
export const getExperimentById = (id) => {
  return experiments.find((exp) => exp.id === id);
};

/**
 * Generate CSS gradient string from experiment colors
 * @param {Experiment} experiment
 * @returns {string} CSS linear-gradient value
 */
export const getGradient = (experiment) => {
  const angle = experiment.gradientAngle || '135deg';
  return `linear-gradient(${angle}, ${experiment.colors.join(', ')})`;
};

export default experiments;
