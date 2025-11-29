precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V24 SHADER
 * ═══════════════════════════════════════════════════════════════════
 *
 * BEFORE WRITING CODE:
 *
 * 1. Browse existing shaders for inspiration:
 *    /src/shaders/experiments/aurora.frag.glsl     - layered waves
 *    /src/shaders/experiments/fog.frag.glsl        - atmospheric depth
 *    /src/shaders/experiments/void.frag.glsl       - glitch/noise
 *    /src/shaders/experiments/galaxy.frag.glsl     - particle systems
 *    /src/shaders/experiments/galois.frag.glsl     - complex math
 *
 * 2. Research techniques you might need:
 *    - Shadertoy.com (search by effect name)
 *    - thebookofshaders.com (fundamentals)
 *    - iquilezles.org (SDF, noise, math)
 *
 * 3. Technique categories to consider:
 *
 *    NOISE & RANDOMNESS          SHAPES & SDF
 *    ├─ hash()                   ├─ sdCircle()
 *    ├─ noise()                  ├─ sdBox()
 *    ├─ fbm()                    ├─ sdLine()
 *    ├─ voronoi()                └─ boolean ops (union, subtract)
 *    └─ curl noise
 *
 *    COLOR                       SPACE & DISTORTION
 *    ├─ hsv2rgb()                ├─ rotate2d()
 *    ├─ palette()                ├─ polar coordinates
 *    ├─ gradient mapping         ├─ domain warping
 *    └─ color blending           └─ kaleidoscope
 *
 *    PATTERNS                    ADVANCED
 *    ├─ truchet tiles            ├─ raymarching
 *    ├─ wave interference        ├─ reaction-diffusion
 *    ├─ moiré                    ├─ fluid simulation
 *    └─ cellular automata        └─ fractals
 *
 * ═══════════════════════════════════════════════════════════════════
 */

// === PROVIDED BY BaseExperimentShader ===
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;           // normalized 0-1
uniform vec3 u_backgroundColor;

// === YOUR CUSTOM UNIFORMS ===
// Must match customUniforms in index.jsx



// === YOUR FUNCTIONS ===
// Add helper functions here



// === MAIN ===
void main() {
    // Normalized pixel coordinates
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Centered and aspect-corrected (-0.5 to 0.5, then scaled)
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;

    // Start with background
    vec3 color = u_backgroundColor;

    // ───────────────────────────────────────────────────────────────
    // YOUR EFFECT HERE
    // ───────────────────────────────────────────────────────────────



    // ───────────────────────────────────────────────────────────────

    gl_FragColor = vec4(color, 1.0);
}
