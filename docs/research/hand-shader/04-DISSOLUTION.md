# 04 - Edge Dissolution & Particle System

## Overview

The dissolution effect has two parts:
1. **Shader dissolution**: Perlin noise erodes edges, revealing transparency
2. **Particle system**: Spawn particles at dissolving edges that blow away like sand

---

## Part 1: Dissolution Shader

### Core Algorithm
```glsl
float noise = perlin3d(position * noiseScale + time * speed);
float dissolve = noise + dissolveProgress;
alpha *= smoothstep(threshold - edgeWidth, threshold + edgeWidth, dissolve);
```

### Complete Fragment Shader
```glsl
#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float u_dissolveProgress;    // 0.0 = solid, 1.0 = fully dissolved
uniform float u_dissolveNoiseScale;  // Noise frequency (3.0 default)
uniform float u_dissolveEdgeWidth;   // Edge glow width (0.1 default)
uniform vec3 u_dissolveEdgeColor;    // Edge glow color
uniform float u_time;

varying vec2 vUv;
varying float vHeight;

// Perlin noise function (include from assets/perlin.glsl)
float perlin3d(vec3 p) { /* ... */ }

void main() {
    // Sample base color from contour pass
    vec4 baseColor = texture2D(u_contourTexture, vUv);

    // Calculate dissolution
    vec3 noisePos = vec3(vUv * u_dissolveNoiseScale, u_time * 0.1);
    float noise = perlin3d(noisePos) * 0.5 + 0.5;  // Remap to 0-1

    // Dissolve threshold (higher = more dissolved)
    float dissolve = noise - (1.0 - u_dissolveProgress);

    // Soft edge with glow
    float edgeMask = smoothstep(-u_dissolveEdgeWidth, 0.0, dissolve);
    float glowMask = smoothstep(-u_dissolveEdgeWidth * 2.0, -u_dissolveEdgeWidth, dissolve);

    // Discard fully dissolved pixels
    if (dissolve > 0.0) discard;

    // Add edge glow
    vec3 finalColor = mix(baseColor.rgb, u_dissolveEdgeColor, glowMask - edgeMask);
    float finalAlpha = baseColor.a * edgeMask;

    gl_FragColor = vec4(finalColor, finalAlpha);

    // Output edge mask for particle spawning
    // gl_FragData[1] = vec4(glowMask - edgeMask, 0.0, 0.0, 1.0);
}
```

---

## Part 2: GPGPU Particle System

### Architecture: FBO Ping-Pong

```
Frame N:   Read Texture A → Compute → Write Texture B
Frame N+1: Read Texture B → Compute → Write Texture A
```

Each pixel = one particle:
- RGB = XYZ position
- A = age/lifetime

### Setup with GPUComputationRenderer

```javascript
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

// Initialize GPGPU renderer
const WIDTH = 256;  // 256x256 = 65,536 particles
const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

// Create position texture
const positionTexture = gpuCompute.createTexture();
initPositions(positionTexture);  // Fill with spawn positions

// Create velocity texture
const velocityTexture = gpuCompute.createTexture();
initVelocities(velocityTexture);  // Fill with initial velocities

// Add computation variables
const positionVariable = gpuCompute.addVariable(
    'texturePosition',
    positionShader,
    positionTexture
);

const velocityVariable = gpuCompute.addVariable(
    'textureVelocity',
    velocityShader,
    velocityTexture
);

// Set dependencies
gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);
gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);

// Add uniforms
positionVariable.material.uniforms.u_time = { value: 0 };
positionVariable.material.uniforms.u_delta = { value: 0.016 };
velocityVariable.material.uniforms.u_windStrength = { value: 1.0 };
velocityVariable.material.uniforms.u_windDirection = { value: new THREE.Vector3(1, 0.2, 0) };

// Initialize
const error = gpuCompute.init();
if (error !== null) console.error(error);
```

### Position Update Shader
```glsl
uniform float u_time;
uniform float u_delta;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Read current position and velocity
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    // Age check (w component = lifetime)
    float age = pos.w + u_delta;
    if (age > 5.0) {
        // Respawn at edge
        pos.xyz = respawnPosition();
        age = 0.0;
    }

    // Update position
    pos.xyz += vel.xyz * u_delta;
    pos.w = age;

    gl_FragColor = pos;
}
```

### Velocity Update Shader (Wind Physics)
```glsl
uniform float u_windStrength;
uniform vec3 u_windDirection;
uniform float u_time;

// Perlin noise for wind turbulence
float perlin3d(vec3 p) { /* ... */ }

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Read current state
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    // Base wind direction
    vec3 wind = u_windDirection * u_windStrength;

    // Add turbulence (multi-octave Perlin noise)
    vec3 turbulence = vec3(0.0);
    turbulence += perlin3d(pos.xyz * 0.5 + u_time * 0.1) * 2.0;
    turbulence += perlin3d(pos.xyz * 1.0 + u_time * 0.2) * 1.0;
    turbulence += perlin3d(pos.xyz * 2.0 + u_time * 0.3) * 0.5;

    // Apply forces
    vel.xyz += (wind + turbulence * 0.5) * u_delta;

    // Damping
    vel.xyz *= 0.98;

    // Gravity (subtle)
    vel.y -= 0.1 * u_delta;

    gl_FragColor = vel;
}
```

---

## Part 3: Rendering Particles

### Particle Mesh Setup
```javascript
// Create geometry with position attributes
const geometry = new THREE.BufferGeometry();

// Position attribute (will be updated from GPGPU texture)
const positions = new Float32Array(WIDTH * WIDTH * 3);
const uvs = new Float32Array(WIDTH * WIDTH * 2);

for (let i = 0; i < WIDTH * WIDTH; i++) {
    const u = (i % WIDTH) / WIDTH;
    const v = Math.floor(i / WIDTH) / WIDTH;
    uvs[i * 2] = u;
    uvs[i * 2 + 1] = v;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

// Material that reads from GPGPU texture
const material = new THREE.ShaderMaterial({
    uniforms: {
        u_positionTexture: { value: null },
        u_particleSize: { value: 2.0 },
        u_particleColor: { value: new THREE.Color(0.8, 0.9, 1.0) },
    },
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);
```

### Particle Vertex Shader
```glsl
uniform sampler2D u_positionTexture;
uniform float u_particleSize;

varying float vAge;
varying float vAlpha;

void main() {
    // Sample position from GPGPU texture
    vec4 posData = texture2D(u_positionTexture, uv);
    vec3 pos = posData.xyz;
    float age = posData.w;

    // Pass to fragment shader
    vAge = age;
    vAlpha = 1.0 - smoothstep(3.0, 5.0, age);  // Fade out over time

    // Project position
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    gl_PointSize = u_particleSize * (300.0 / -mvPosition.z);
}
```

### Particle Fragment Shader
```glsl
uniform vec3 u_particleColor;

varying float vAge;
varying float vAlpha;

void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Soft edges
    float alpha = smoothstep(0.5, 0.3, dist) * vAlpha;

    gl_FragColor = vec4(u_particleColor, alpha);
}
```

---

## Integration: Spawning at Dissolving Edges

### Key Technique
1. Render dissolution pass to texture
2. Read back edge mask (where dissolution is happening)
3. Use edge mask to control particle spawn rate

```javascript
// In animation loop
function animate() {
    // Update GPGPU
    gpuCompute.compute();

    // Get current position texture
    const positionTexture = gpuCompute.getCurrentRenderTarget(positionVariable).texture;

    // Pass to particle material
    particles.material.uniforms.u_positionTexture.value = positionTexture;

    // Pass edge mask to GPGPU for respawn logic
    velocityVariable.material.uniforms.u_edgeMask = { value: dissolutionRenderTarget.texture };
}
```

---

## Uniforms Reference

```javascript
// Dissolution
u_dissolveProgress: 0.0 - 1.0      // Animation progress
u_dissolveNoiseScale: 3.0          // Noise frequency
u_dissolveEdgeWidth: 0.1           // Edge glow width
u_dissolveEdgeColor: vec3(0.8, 0.9, 1.0)  // Edge glow color

// Particles
u_particleCount: 50000             // Total particles (256x256 texture = 65K)
u_particleSize: 2.0                // Base size
u_particleColor: vec3(0.8, 0.9, 1.0)

// Wind
u_windStrength: 1.0                // Base wind force
u_windDirection: vec3(1, 0.2, 0)   // Primary wind vector
u_turbulence: 0.5                  // Noise intensity
```

---

## Performance Tips

- **Desktop**: 50K-100K particles (256x256 or 512x256 texture)
- **Mobile**: 5K-10K particles (64x64 or 128x128 texture)
- Use `HalfFloatType` for GPGPU textures (50% memory)
- Fixed timestep physics (60 updates/sec max)
- LOD: Reduce particle count/size at distance

---

## Sources

- [Codrops - Dissolve Effect with Shaders and Particles](https://tympanus.net/codrops/2025/02/17/implementing-a-dissolve-effect-with-shaders-and-particles-in-three-js/)
- [Codrops - GPGPU Particle Effect](https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/)
- [Mapbox - WebGL Wind Visualization](https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f)
- [FBO Particles - Barradeau](https://barradeau.com/blog/?p=621)
- [ashima/webgl-noise](https://github.com/ashima/webgl-noise)
