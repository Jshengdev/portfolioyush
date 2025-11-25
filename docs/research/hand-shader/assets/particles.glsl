/**
 * GPGPU Particle Shaders
 * Position update, velocity/wind, and rendering
 */

// ============================================
// POSITION UPDATE SHADER (GPGPU Compute)
// ============================================

// uniforms
uniform float u_time;
uniform float u_delta;
uniform vec3 u_wind_direction;
uniform float u_wind_strength;
uniform sampler2D u_edgeMask; // Where to spawn particles

// Perlin noise (same as dissolution.glsl)
float perlin3d(vec3 v) { /* ... */ }

void mainPosition() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Read current position (xyz) and age (w)
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    // Update age
    float age = pos.w + u_delta;

    // Respawn conditions
    bool shouldRespawn = age > 5.0;

    if (shouldRespawn) {
        // Sample edge mask to find spawn point
        vec2 spawnUv = vec2(
            fract(sin(u_time * uv.x * 12.9898) * 43758.5453),
            fract(sin(u_time * uv.y * 78.233) * 43758.5453)
        );

        float edgeStrength = texture2D(u_edgeMask, spawnUv).r;

        // Only spawn if edge is dissolving
        if (edgeStrength > 0.1) {
            pos.xy = spawnUv * 2.0 - 1.0; // Map to -1 to 1
            pos.z = 0.0;
            age = 0.0;
        }
    }

    // Apply velocity
    pos.xyz += vel.xyz * u_delta;

    // Store updated position and age
    pos.w = age;

    gl_FragColor = pos;
}


// ============================================
// VELOCITY UPDATE SHADER (GPGPU Compute)
// ============================================

void mainVelocity() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Read current state
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    // Base wind
    vec3 wind = u_wind_direction * u_wind_strength;

    // Multi-octave turbulence
    vec3 turbPos = pos.xyz + vec3(u_time * 0.1);
    vec3 turbulence = vec3(0.0);

    // Octave 1: Large swirls
    turbulence += vec3(
        perlin3d(turbPos * 0.5),
        perlin3d(turbPos * 0.5 + vec3(100.0, 0.0, 0.0)),
        perlin3d(turbPos * 0.5 + vec3(0.0, 100.0, 0.0))
    ) * 2.0;

    // Octave 2: Medium turbulence
    turbulence += vec3(
        perlin3d(turbPos * 1.0),
        perlin3d(turbPos * 1.0 + vec3(100.0, 0.0, 0.0)),
        perlin3d(turbPos * 1.0 + vec3(0.0, 100.0, 0.0))
    ) * 1.0;

    // Octave 3: Fine detail
    turbulence += vec3(
        perlin3d(turbPos * 2.0),
        perlin3d(turbPos * 2.0 + vec3(100.0, 0.0, 0.0)),
        perlin3d(turbPos * 2.0 + vec3(0.0, 100.0, 0.0))
    ) * 0.5;

    // Apply forces
    vel.xyz += (wind + turbulence * 0.3) * u_delta;

    // Damping (air resistance)
    vel.xyz *= 0.98;

    // Subtle gravity
    vel.y -= 0.05 * u_delta;

    gl_FragColor = vel;
}


// ============================================
// PARTICLE VERTEX SHADER (Rendering)
// ============================================

// vertex shader
uniform sampler2D u_particle_positionTexture;
uniform float u_particle_size;

attribute vec2 reference; // UV coordinate into GPGPU texture

varying float vAge;
varying float vAlpha;

void mainVertex() {
    // Sample position from GPGPU texture
    vec4 posData = texture2D(u_particle_positionTexture, reference);
    vec3 pos = posData.xyz;
    float age = posData.w;

    // Pass to fragment
    vAge = age;

    // Fade out over lifetime (solid 0-3s, fade 3-5s)
    vAlpha = 1.0 - smoothstep(3.0, 5.0, age);

    // Fade in at birth
    vAlpha *= smoothstep(0.0, 0.2, age);

    // Project position
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size with distance attenuation
    float sizeAttenuation = 300.0 / -mvPosition.z;
    gl_PointSize = u_particle_size * sizeAttenuation * (1.0 - age * 0.1);
}


// ============================================
// PARTICLE FRAGMENT SHADER (Rendering)
// ============================================

uniform vec3 u_particle_color;

varying float vAge;
varying float vAlpha;

void mainFragment() {
    // Skip dead particles
    if (vAlpha < 0.01) discard;

    // Circular shape with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    // Hard circle cutoff
    if (dist > 0.5) discard;

    // Soft edge falloff
    float softness = smoothstep(0.5, 0.2, dist);

    // Color (slightly blue shift as age increases)
    vec3 color = mix(u_particle_color, vec3(0.5, 0.7, 1.0), vAge * 0.1);

    // Final alpha
    float alpha = softness * vAlpha;

    gl_FragColor = vec4(color, alpha);
}
