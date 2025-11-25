# Edge Dissolution & Particle Integration Research

**Agent 5 Research Report**
**Date**: 2025-11-25
**Context**: Hand shader visual system with edge dissolution into wind-blown particles

---

## Executive Summary

This research explores techniques for creating a seamless transition from solid shader-based contour lines to particle systems that dissolve and blow away like sand. The solution combines:

1. **Edge Detection** (Sobel/gradient-based) to identify dissolution boundaries
2. **Noise-Based Erosion** (Perlin/Simplex) for organic, natural-looking dissolution
3. **GPGPU Particle Systems** (FBO ping-pong) for GPU-accelerated particle physics
4. **Wind Physics** (vector fields) for believable sand-like behavior
5. **Dual-State Rendering** (shader + particles) for smooth transitions

**Recommended Approach**: Use GPUComputationRenderer with FBO textures for particle position/velocity, spawn particles at noise-eroded edges, and drive motion with Perlin noise flow fields.

---

## 1. Edge Detection Techniques

### 1.1 Sobel Edge Detection (Most Common)

**How It Works**: Uses two 3x3 convolution kernels to detect gradients in X and Y directions.

```glsl
// Sobel kernels
mat3 sx = mat3(
    1.0, 0.0, -1.0,
    2.0, 0.0, -2.0,
    1.0, 0.0, -1.0
);

mat3 sy = mat3(
    1.0,  2.0,  1.0,
    0.0,  0.0,  0.0,
   -1.0, -2.0, -1.0
);

// Sample surrounding pixels and apply kernels
float gradient = length(vec2(sobelX, sobelY));
float isEdge = gradient > threshold;
```

**Pros**: Industry standard, well-documented, produces clean edges
**Cons**: Requires 9 texture samples per pixel (can be optimized to skip zeros)

**Sources**:
- [Sobel Edge Detection Filter - Computer Graphics Stack Exchange](https://computergraphics.stackexchange.com/questions/3646/opengl-glsl-sobel-edge-detection-filter)
- [GLSL Fragment Shader: Sobel Edge Detection - GitHub](https://gist.github.com/Hebali/6ebfc66106459aacee6a9fac029d0115)

---

### 1.2 GLSL Built-in Gradient Functions (Most Efficient)

**How It Works**: Use `dFdx()`, `dFdy()`, and `fwidth()` for hardware-accelerated gradient detection.

```glsl
float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
float gradient = fwidth(luminance);
float isEdge = gradient > threshold;
```

**Pros**: Zero texture samples, hardware-accelerated, 2x2 fragment block evaluation
**Cons**: Lower precision than Sobel, less control over kernel size

**Performance**: Fastest method for real-time edge detection

**Sources**:
- [Edge/outline detection from texture - Stack Overflow](https://stackoverflow.com/questions/43977910/edge-outline-detection-from-texture-in-fragment-shader)
- [Most efficient method for GLSL edge detection - Stack Overflow](https://stackoverflow.com/questions/5838843/most-efficient-method-for-glsl-edge-detection-shader)

---

### 1.3 Alpha Threshold (Simplest for Contours)

**How It Works**: Detect edges where alpha crosses a threshold (perfect for hand contours).

```glsl
float edgeDistance = abs(alpha - dissolveLine);
float isEdge = edgeDistance < edgeWidth;
```

**Pros**: Perfect for existing contour/alpha masks, no extra sampling
**Cons**: Only works with pre-defined alpha boundaries

**Use Case**: **RECOMMENDED for hand shader** - Your contour lines already define the edge!

---

## 2. Dissolution Shader Approaches

### 2.1 Noise-Based Erosion (Most Organic)

**Technique**: Use Perlin or Simplex noise to create organic, non-uniform dissolution patterns.

```glsl
// Perlin noise generates smooth, continuous gradients
float noise = perlin3d(position * noiseScale + time * noiseSpeed);

// Threshold determines which areas dissolve first
float dissolve = noise + dissolveProgress;
float alpha = smoothstep(dissolveThreshold - edgeSoftness,
                         dissolveThreshold + edgeSoftness,
                         dissolve);
```

**Why Perlin Over Random**: Unlike random noise, Perlin creates **continuous output** for natural-looking transitions. Ken Perlin developed it for Tron (1982) and won an Oscar for the technique.

**Animation Strategy**: Animate `dissolveProgress` from 0 → 1 to gradually erode the shape.

**Sources**:
- [Dissolve Effect in Shader Graph and URP - Daniel Ilett](https://danielilett.com/2020-04-15-tut5-4-urp-dissolve/)
- [Implementing a Dissolve Effect with Shaders and Particles in Three.js - Codrops](https://tympanus.net/codrops/2025/02/17/implementing-a-dissolve-effect-with-shaders-and-particles-in-three-js/)
- [ashima/webgl-noise - GitHub](https://github.com/ashima/webgl-noise)

---

### 2.2 Alpha Erosion (Step vs. Smoothstep)

**Step Function** (Hard Edge):
```glsl
float alpha = step(threshold, noiseValue);
// Output: 0 or 1 (fully transparent or opaque)
```

**Smoothstep** (Soft Edge):
```glsl
float alpha = smoothstep(minThreshold, maxThreshold, noiseValue);
// Output: Smooth gradient between 0 and 1
```

**Recommendation**: Use **smoothstep** for organic dissolution, **step** for stylized/geometric effects.

**Sources**:
- [Alpha Erosion - VFXDoc](https://vfxdoc.readthedocs.io/en/latest/shaders/alpha-erosion/)
- [Alpha Erosion Function - Ames' Archive](https://amesyta.wordpress.com/2018/06/14/alpha-erosion-function/)

---

### 2.3 Erosion Maps (Texture-Based)

**Technique**: Use pre-authored textures to control dissolution patterns.

```glsl
float erosionPattern = texture2D(erosionMap, uv).r;
float alpha = smoothstep(threshold, threshold + edge, erosionPattern);
```

**Pros**: Full artistic control, repeatable patterns
**Cons**: Requires texture memory, less procedural

**Import Note**: Erosion maps should be imported as **linear (sRGB off)** since they represent mathematical values, not colors.

**Sources**:
- [All Alpha Dissolve/Erosion Methods - ArtStation](https://www.artstation.com/selicatomattia/blog/3WBN/all-alpha-dissolveerosion-methods-i-know-so-far)

---

### 2.4 Edge Glow Effect (Dissolution Boundary)

**Technique**: Create emissive rim light at dissolution edge using mask math.

```glsl
// Create inner mask by shrinking the dissolve threshold
float innerMask = smoothstep(threshold - innerWidth, threshold, noise);
float outerMask = smoothstep(threshold, threshold + outerWidth, noise);

// Edge is the difference between inner and outer
float edgeMask = outerMask - innerMask;

// Apply HDR color for bloom
vec3 emission = edgeMask * edgeColor * emissionStrength;
```

**Visual Effect**: Glowing rim that travels along the dissolution boundary.

**Sources**:
- [Tutorial - Burning Edges Dissolve Shader in Unity - Code Avarice](https://www.codeavarice.com/dev-blog/tutorial-burning-edges-dissolve-shader-in-unity)

---

## 3. Particle Emission Strategies

### 3.1 GPGPU with FBO Ping-Pong (RECOMMENDED)

**Architecture**: Double framebuffer objects that swap each frame for state persistence.

```
Frame N:
  Read from FBO A (previous state) → Compute shader → Write to FBO B (new state)

Frame N+1:
  Read from FBO B (previous state) → Compute shader → Write to FBO A (new state)
```

**Data Storage**: Each pixel in the FBO texture = one particle
- **RGB channels**: XYZ position
- **Alpha channel**: Age, lifetime, or other metadata

**Three.js Implementation**: Use `GPUComputationRenderer`

```javascript
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

// Create renderer with texture size (256 = 65,536 particles)
const gpuCompute = new GPUComputationRenderer(256, 256, renderer);

// Create variables (textures) for position and velocity
const positionVariable = gpuCompute.addVariable('texturePosition',
    positionShader, initialPositionTexture);
const velocityVariable = gpuCompute.addVariable('textureVelocity',
    velocityShader, initialVelocityTexture);

// Set dependencies (velocity shader needs position)
gpuCompute.setVariableDependencies(velocityVariable,
    [positionVariable, velocityVariable]);

// Initialize and update each frame
gpuCompute.init();
gpuCompute.compute();
```

**Shader Example** (Position Update):
```glsl
uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform float delta;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(texturePosition, uv).xyz;
    vec3 velocity = texture2D(textureVelocity, uv).xyz;

    // Update position: p = p + v * dt
    position += velocity * delta;

    gl_FragColor = vec4(position, 1.0);
}
```

**Performance**: Can handle **500K particles at 60fps** on modest hardware, **millions** on high-end GPUs.

**Sources**:
- [Crafting a Dreamy Particle Effect with Three.js and GPGPU - Codrops](https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/)
- [FBO particles - Youpi!](https://barradeau.com/blog/?p=621)
- [Particle interaction on GPU shaders - Medium](https://arugl.medium.com/particle-interaction-on-gpu-shaders-particle-physics-logic-in-webgl-compute-dc31a4e7b9cc)

---

### 3.2 THREE.GPUParticleSystem (Legacy, Still Viable)

**Library**: `flimshaw/THREE.GPUParticleSystem`

**Features**:
- Spawn particles with `spawnParticle(options)`
- Entire lifecycle handled on GPU
- Stores position, velocity, lifespan, color, turbulence, size in just **2 vec4 attributes** (256 bits per particle)

**Spawn Options**:
```javascript
{
    position: new THREE.Vector3(x, y, z),
    positionRandomness: 3,
    velocity: new THREE.Vector3(vx, vy, vz),
    velocityRandomness: 5,
    color: 0xaa88ff,
    colorRandomness: 0.2,
    turbulence: 10,
    lifetime: 10,
    size: 5,
    sizeRandomness: 2
}
```

**Spawner Options**:
```javascript
{
    spawnRate: 3260,
    horizontalSpeed: 1.2,
    verticalSpeed: 1.4,
    timeScale: 1.0
}
```

**Sources**:
- [flimshaw/THREE.GPUParticleSystem - GitHub](https://github.com/flimshaw/THREE.GPUParticleSystem)
- [Particle effect (Three.js GPUParticleSystem) - CodePen](https://codepen.io/teymur/pen/pyVKrz)

---

### 3.3 Instanced Particles (Hybrid CPU/GPU)

**Technique**: Use `InstancedBufferGeometry` to render many particles with one draw call.

```javascript
const geometry = new THREE.InstancedBufferGeometry();

// Base geometry (shared by all particles)
geometry.setAttribute('position', new THREE.BufferAttribute(quadVertices, 3));

// Instance attributes (unique per particle)
geometry.setAttribute('particlePosition',
    new THREE.InstancedBufferAttribute(positions, 3));
geometry.setAttribute('particleColor',
    new THREE.InstancedBufferAttribute(colors, 3));
geometry.setAttribute('particleSize',
    new THREE.InstancedBufferAttribute(sizes, 1));

// Set instance count
geometry.instanceCount = particleCount;
```

**Vertex Shader**:
```glsl
attribute vec3 particlePosition;
attribute float particleSize;

void main() {
    vec3 worldPos = position * particleSize + particlePosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
}
```

**Pros**: More control than Points, better for textured particles
**Cons**: More complex setup than Points

**Sources**:
- [Interactive Particles with Three.js - Codrops](https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/)

---

### 3.4 Emitting Particles at Dissolving Edges

**Strategy 1: Sample Edge in Compute Shader**
```glsl
// In velocity compute shader
uniform sampler2D dissolveMask;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(texturePosition, uv).xyz;

    // Convert 3D position to 2D UV for sampling edge mask
    vec2 edgeUV = worldToScreenSpace(position);
    float edgeStrength = texture2D(dissolveMask, edgeUV).r;

    // Spawn/activate particles near edges
    if (edgeStrength > 0.5) {
        // Set initial velocity based on edge normal + wind
        velocity = edgeNormal * burstSpeed + windVelocity;
    }
}
```

**Strategy 2: Use MeshSurfaceSampler (Three.js)**
```javascript
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

// Sample random points on mesh surface
const sampler = new MeshSurfaceSampler(handMesh).build();

const position = new THREE.Vector3();
const normal = new THREE.Vector3();

for (let i = 0; i < particleCount; i++) {
    sampler.sample(position, normal);
    // Use position for particle spawn
    // Use normal to direct initial velocity
}
```

**Strategy 3: Pixel-Based Detection**
```javascript
// Convert image to particles (like Thanos effect)
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.drawImage(handImage, 0, 0);

const imageData = ctx.getImageData(0, 0, width, height);
const particles = [];

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const alpha = imageData.data[i + 3];

        // Only spawn particles at edges (use edge detection)
        if (isEdge(x, y, imageData)) {
            particles.push({
                x: (x / width) * 2 - 1,
                y: (y / height) * 2 - 1,
                color: [
                    imageData.data[i] / 255,
                    imageData.data[i + 1] / 255,
                    imageData.data[i + 2] / 255
                ]
            });
        }
    }
}
```

**Sources**:
- [Thanos Snap Effect - GitHub](https://github.com/amoldalwai/Thanos-Snap-Effect)
- [opengl-dust-effect - GitHub](https://github.com/yuzefovichalex/opengl-dust-effect)
- [Show HN: Creating flowing particle animations - Hacker News](https://news.ycombinator.com/item?id=42863867)

---

## 4. Wind Physics Methods

### 4.1 Vector Flow Fields (Most Realistic)

**Concept**: Every point in 3D space has a velocity vector that particles follow.

```glsl
vec3 getWindVelocity(vec3 position, float time) {
    // Multi-octave Perlin noise for natural turbulence
    vec3 noise1 = perlin3d(position * 0.5 + time * 0.1) * 2.0;
    vec3 noise2 = perlin3d(position * 1.0 + time * 0.2) * 1.0;
    vec3 noise3 = perlin3d(position * 2.0 + time * 0.3) * 0.5;

    // Combine octaves for complex motion
    vec3 wind = noise1 + noise2 + noise3;

    // Add global wind direction
    wind += vec3(1.0, 0.2, 0.0) * windStrength;

    return wind;
}
```

**Particle Update**:
```glsl
vec3 windForce = getWindVelocity(position, u_time);
velocity += windForce * windInfluence * delta;
velocity *= dampening; // Air resistance
position += velocity * delta;
```

**Visualization Inspiration**: [Mapbox webgl-wind visualization](https://mapbox.github.io/webgl-wind/)

**Sources**:
- [How I built a wind map with WebGL - Mapbox](https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f)
- [mapbox/webgl-wind - GitHub](https://github.com/mapbox/webgl-wind)
- [Noise in Creative Coding - Varun Vachhar](https://varun.ca/noise/)

---

### 4.2 Curl Noise (Incompressible Flow)

**Concept**: Take the curl (cross product of gradient) of noise to get divergence-free flow.

**Why**: Regular noise can cause particles to clump. Curl noise creates swirling, incompressible flow like real fluids.

```glsl
vec3 curlNoise(vec3 p) {
    float eps = 0.1;

    // Sample noise at offset positions
    float dx = perlin3d(p + vec3(eps, 0, 0)) - perlin3d(p - vec3(eps, 0, 0));
    float dy = perlin3d(p + vec3(0, eps, 0)) - perlin3d(p - vec3(0, eps, 0));
    float dz = perlin3d(p + vec3(0, 0, eps)) - perlin3d(p - vec3(0, 0, eps));

    // Return curl (gradient)
    return vec3(dy - dz, dz - dx, dx - dy) / (2.0 * eps);
}
```

**Result**: Particles swirl and flow naturally without clustering.

---

### 4.3 Turbulence (Layered Noise)

**Concept**: Add multiple octaves of noise at different scales/speeds for chaotic motion.

```glsl
float turbulence(vec3 p) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;

    for (int i = 0; i < 4; i++) {
        value += abs(perlin3d(p * frequency)) * amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}
```

**Use Case**: Apply turbulence to particle velocity for erratic, sand-like scattering.

---

### 4.4 Simple Physics Forces

**Gravity**:
```glsl
velocity.y -= gravity * delta;
```

**Air Resistance / Drag**:
```glsl
velocity *= 1.0 - drag * delta;
```

**Attraction/Repulsion**:
```glsl
vec3 toAttractor = attractorPos - position;
float distance = length(toAttractor);
vec3 force = normalize(toAttractor) * attractionStrength / (distance * distance);
velocity += force * delta;
```

**Wind Gusts** (Periodic):
```glsl
float gustStrength = sin(time * gustFrequency) * gustAmplitude;
velocity.x += gustStrength * delta;
```

---

## 5. Transition Handling (Solid → Particles)

### 5.1 Dual Rendering Approach

**Concept**: Render both the dissolving mesh AND particles simultaneously, fading between them.

```javascript
// Mesh material with dissolve
const meshMaterial = new THREE.ShaderMaterial({
    uniforms: {
        dissolveProgress: { value: 0.0 }
    },
    transparent: true
});

// Particle system
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);

// Animate transition
function animate() {
    dissolveProgress += 0.01;

    // Update mesh
    meshMaterial.uniforms.dissolveProgress.value = dissolveProgress;

    // Spawn particles at dissolving edges
    if (dissolveProgress > 0.5) {
        spawnParticlesAtEdge();
    }

    // Fade out mesh, fade in particles
    meshMaterial.opacity = 1.0 - dissolveProgress;
    particleMaterial.opacity = dissolveProgress;
}
```

---

### 5.2 Morphing Technique

**Concept**: Transition vertex positions from mesh to particle cloud.

```glsl
// Vertex shader
attribute vec3 targetPosition; // Particle target position
uniform float morphProgress; // 0 = mesh, 1 = particles

void main() {
    vec3 pos = mix(position, targetPosition, morphProgress);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

**Three.js Setup**:
```javascript
// Add target positions as attribute
geometry.setAttribute('targetPosition',
    new THREE.BufferAttribute(particlePositions, 3));

// Animate morph
material.uniforms.morphProgress.value = progress;
```

**Sources**:
- [Particles Morphing Shader - Three.js Journey](https://threejs-journey.com/lessons/particles-morphing-shader)
- [The magical world of Particles - Maxime Heckel](https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/)

---

### 5.3 State Persistence in Shaders

**Problem**: Shaders are stateless - you can't update variables between frames.

**Solution 1: FBO Feedback Loop** (RECOMMENDED)
```
Frame N:   Read state from Texture A → Compute → Write to Texture B
Frame N+1: Read state from Texture B → Compute → Write to Texture A
```

**Solution 2: JavaScript CPU Updates**
```javascript
// Update particle positions on CPU
for (let i = 0; i < particles.length; i++) {
    particles[i].velocity.y -= gravity;
    particles[i].position.add(particles[i].velocity);
}

// Update GPU buffer
geometry.attributes.position.needsUpdate = true;
```

**Performance**: FBO is **1000x faster** for large particle counts (GPU parallelism).

---

### 5.4 Particle Lifecycle Management

**States**: Inactive → Spawning → Active → Dying → Dead (Recycle)

```glsl
// Store lifecycle in alpha channel
uniform float particleLifetime;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 posAge = texture2D(texturePosition, uv);

    float age = posAge.a;
    age += delta / particleLifetime;

    // Recycle particle when it dies
    if (age > 1.0) {
        // Reset to spawn position
        posAge.xyz = getSpawnPosition();
        age = 0.0;
    }

    gl_FragColor = vec4(posAge.xyz, age);
}
```

**Vertex Shader** (Fade based on age):
```glsl
attribute float age;

void main() {
    float fadeIn = smoothstep(0.0, 0.1, age);
    float fadeOut = smoothstep(0.9, 1.0, age);
    float alpha = fadeIn * (1.0 - fadeOut);

    vAlpha = alpha;
}
```

---

## 6. Working Examples & Demos

### 6.1 Complete Tutorials

1. **Codrops - Dissolve Effect (Feb 2025)**
   - [Implementing a Dissolve Effect with Shaders and Particles in Three.js](https://tympanus.net/codrops/2025/02/17/implementing-a-dissolve-effect-with-shaders-and-particles-in-three-js/)
   - **Perfect for this project**: Shows solid mesh dissolving with particles spawning at edges
   - Uses Perlin noise, custom shaders, particle emission, bloom effects
   - Complete code examples

2. **Codrops - GPGPU Particle Effect (Dec 2024)**
   - [Crafting a Dreamy Particle Effect with Three.js and GPGPU](https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/)
   - **GPGPU deep dive**: Explains FBO ping-pong, position/velocity textures
   - Interactive particles, glow effects, MeshSurfaceSampler usage

3. **Three.js Journey - GPGPU Flow Field**
   - [GPGPU Flow Field Particles Shaders](https://threejs-journey.com/lessons/gpgpu-flow-field-particles-shaders)
   - **Flow field implementation**: Particles following vector fields
   - GPUComputationRenderer setup, compute shaders

---

### 6.2 GitHub Repositories

1. **opengl-dust-effect** (Thanos snap)
   - [yuzefovichalex/opengl-dust-effect](https://github.com/yuzefovichalex/opengl-dust-effect)
   - **Disintegration effect**: Particles spawned from dissolving image
   - WebGL implementation, adjustable particle size and duration

2. **THREE.GPUParticleSystem**
   - [flimshaw/THREE.GPUParticleSystem](https://github.com/flimshaw/THREE.GPUParticleSystem)
   - **Production-ready**: 500K+ particles at 60fps
   - Easy spawn API, turbulence, lifecycle management

3. **threejs-particle-shader**
   - [pwambach/threejs-particle-shader](https://github.com/pwambach/threejs-particle-shader)
   - **Configurable system**: Custom velocity shaders, target positions
   - Texture-based state storage (256x256 = 65K particles)

4. **webgl-wind**
   - [mapbox/webgl-wind](https://github.com/mapbox/webgl-wind)
   - **Wind visualization**: 1 million particles at 60fps
   - Vector field implementation, FBO position encoding

5. **ashima/webgl-noise**
   - [ashima/webgl-noise](https://github.com/ashima/webgl-noise)
   - **Noise library**: Perlin, Simplex noise for GLSL
   - No texture dependencies, fully procedural

---

### 6.3 Live Demos

1. **WebGL Wind Map**
   - [Demo](https://mapbox.github.io/webgl-wind/)
   - Inspiration for wind-blown particle motion

2. **WebGL Particle Physics**
   - [Demo](http://nullprogram.com/webgl-particles/)
   - GPU-based particle physics with obstacles

3. **Shader: Edge Detection**
   - [Shadertoy](https://www.shadertoy.com/view/td2yDm)
   - Interactive edge detection examples

4. **GPU Fluid Experiments**
   - [Demo](https://haxiomic.github.io/GPU-Fluid-Experiments/html5/)
   - Fluid simulation on GPU (for advanced wind effects)

---

## 7. Recommended Implementation Path

### Phase 1: Edge Detection (Week 1)

**Goal**: Detect edges of hand contour in shader

**Tasks**:
1. ✅ Already have alpha-based contours in hand shader
2. Add edge detection using alpha gradient:
   ```glsl
   float edgeDist = abs(alpha - dissolveThreshold);
   float isEdge = smoothstep(0.0, edgeWidth, edgeDist);
   ```
3. Visualize edges with glow effect (test visibility)
4. Export edge mask to a texture for particle system

**Output**: Shader renders hand with visible glowing edges where particles will spawn

---

### Phase 2: Noise-Based Dissolution (Week 1-2)

**Goal**: Make hand edges dissolve organically using Perlin noise

**Tasks**:
1. Import Perlin noise from [ashima/webgl-noise](https://github.com/ashima/webgl-noise)
2. Add to fragment shader:
   ```glsl
   float noise = perlin3d(vPosition * noiseScale + u_time * noiseSpeed);
   float dissolve = noise + u_dissolveProgress;
   alpha *= smoothstep(dissolveThreshold - 0.1, dissolveThreshold + 0.1, dissolve);
   ```
3. Add uniforms:
   - `u_dissolveProgress` (0 = solid, 1 = fully dissolved)
   - `u_noiseScale` (detail level)
   - `u_noiseSpeed` (animation speed)
4. Test with mouse interaction (dissolve on hover)

**Output**: Hand contours dissolve with organic, natural-looking erosion

---

### Phase 3: GPGPU Particle System Setup (Week 2)

**Goal**: Set up GPU-accelerated particle system

**Tasks**:
1. Install/copy `GPUComputationRenderer.js` from Three.js examples
2. Create position and velocity compute shaders:
   - `positionShader.glsl`: Updates position based on velocity
   - `velocityShader.glsl`: Updates velocity based on wind forces
3. Initialize particle positions at hand edge points
4. Render particles using `THREE.Points` with `ShaderMaterial`
5. Test with simple circular motion (no wind yet)

**Output**: Particles render and move in simple patterns

---

### Phase 4: Edge-Based Particle Spawning (Week 2-3)

**Goal**: Spawn particles specifically at dissolving edges

**Strategy**:
1. **Option A (Simpler)**: Pre-compute edge positions on CPU
   ```javascript
   const edgePositions = [];
   // Sample hand contour at regular intervals
   for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
       const x = centerX + radius * Math.cos(angle);
       const y = centerY + radius * Math.sin(angle);
       edgePositions.push(x, y, z);
   }
   ```

2. **Option B (Advanced)**: Pass edge mask texture to compute shader
   ```glsl
   uniform sampler2D edgeMask;
   // In velocity shader, spawn particles where edgeMask > 0.5
   ```

3. Sync particle spawn rate with dissolution progress
   - As `dissolveProgress` increases, spawn more particles

**Output**: Particles appear at edges of dissolving hand

---

### Phase 5: Wind Physics (Week 3)

**Goal**: Make particles blow away like sand

**Tasks**:
1. Add Perlin noise flow field to velocity shader:
   ```glsl
   vec3 windVelocity = perlin3d(position * 0.5 + u_time * 0.1);
   windVelocity += vec3(1.0, 0.2, 0.0) * windStrength; // Global wind
   velocity += windVelocity * windInfluence * delta;
   velocity *= 0.98; // Air resistance
   ```

2. Add gravity:
   ```glsl
   velocity.y -= gravity * delta;
   ```

3. Add turbulence (gusts):
   ```glsl
   float turbulence = perlin3d(position * 2.0 + u_time * 0.5) * turbulenceStrength;
   velocity += vec3(turbulence);
   ```

4. Tune parameters for sand-like behavior:
   - Low gravity (0.1)
   - High drag (0.98)
   - Moderate turbulence
   - Horizontal wind bias

**Output**: Particles scatter and swirl like wind-blown sand

---

### Phase 6: Particle Lifecycle (Week 3-4)

**Goal**: Particles fade in/out naturally

**Tasks**:
1. Store particle age in alpha channel of position texture
2. Update age in compute shader:
   ```glsl
   age += delta / lifetime;
   if (age > 1.0) age = 0.0; // Recycle
   ```

3. Fade particles based on age in vertex shader:
   ```glsl
   float fadeIn = smoothstep(0.0, 0.1, age);
   float fadeOut = smoothstep(0.9, 1.0, age);
   vAlpha = fadeIn * (1.0 - fadeOut);
   ```

4. Shrink particles as they age (optional):
   ```glsl
   gl_PointSize = baseSize * (1.0 - age * 0.5);
   ```

**Output**: Particles have natural birth/death cycle

---

### Phase 7: Integration & Polish (Week 4)

**Goal**: Seamlessly blend hand shader with particle system

**Tasks**:
1. Sync dissolution and particle spawning:
   ```javascript
   // When mouse hovers hand
   dissolveProgress += 0.01;
   particleSpawnRate = dissolveProgress * maxSpawnRate;
   ```

2. Add bloom/glow to particles (match fog aesthetic)
3. Optimize performance:
   - Reduce particle count if FPS drops
   - Use LOD (fewer particles at distance)
4. Add sound effects (wind, dissolve)
5. Test across devices (mobile, desktop)

**Output**: Complete hand dissolution effect ready for production

---

## 8. Integration Points with Existing System

### 8.1 With Contour Shader (ShaderVisual.jsx)

**Current State**: Hand contours rendered as lines with `u_depth`, `u_complexity`, etc.

**Integration**:
1. Add dissolution uniforms to existing shader:
   ```javascript
   uniforms: {
       // Existing
       u_time: { value: 0 },
       u_depth: { value: 0.4 },
       // New for dissolution
       u_dissolveProgress: { value: 0.0 },
       u_noiseScale: { value: 5.0 },
       u_edgeMask: { value: null } // For particle spawning
   }
   ```

2. Modify fragment shader to output edge mask:
   ```glsl
   // After calculating contour lines
   float edgeStrength = abs(contourValue - threshold);
   gl_FragColor = vec4(baseColor, edgeStrength); // Alpha = edge
   ```

3. Render to texture (RenderTarget) to capture edge mask

---

### 8.2 With Fog System (from Agent 4)

**Assumption**: Fog system creates atmospheric depth

**Integration**:
1. Particles should interact with fog:
   ```glsl
   // In particle fragment shader
   uniform float fogDensity;
   uniform vec3 fogColor;

   void main() {
       float depth = gl_FragCoord.z / gl_FragCoord.w;
       float fogFactor = exp(-fogDensity * depth);
       vec4 color = mix(vec4(fogColor, 1.0), particleColor, fogFactor);
       gl_FragColor = color;
   }
   ```

2. Use same depth/atmosphere parameters for visual cohesion

---

### 8.3 With Route-Reactive System (CLAUDE.md)

**Current**: Shader personality changes per route (complexity, energy, etc.)

**Integration**:
1. Map routes to dissolution behaviors:
   ```javascript
   const routeParticleSettings = {
       '/': {
           spawnRate: 100,
           windStrength: 0.5,
           lifetime: 3.0
       },
       '/about': {
           spawnRate: 50,
           windStrength: 0.2,
           lifetime: 5.0 // Slower, contemplative
       },
       '/projects': {
           spawnRate: 200,
           windStrength: 1.0,
           lifetime: 2.0 // Fast, energetic
       }
   };
   ```

2. Update particle system on route change:
   ```javascript
   useEffect(() => {
       const settings = routeParticleSettings[location.pathname] || {};
       particleSystem.setSpawnRate(settings.spawnRate);
       particleSystem.setWindStrength(settings.windStrength);
   }, [location.pathname]);
   ```

---

### 8.4 With Cursor Interaction

**Current**: Custom cursor trails (Cursor.jsx)

**Integration**:
1. Trigger dissolution on cursor proximity:
   ```javascript
   // In ShaderVisual.jsx
   const handleMouseMove = (e) => {
       const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
       const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

       // Check distance from hand
       const dist = Math.hypot(mouseX - handX, mouseY - handY);
       if (dist < dissolveTriggerRadius) {
           dissolveProgress = Math.min(1.0, dissolveProgress + 0.05);
       }
   };
   ```

2. Spawn particles at cursor position when over hand

---

## 9. Performance Considerations

### 9.1 Particle Count Optimization

**Target**: 60fps on mid-range devices

**Guidelines**:
- **Desktop**: 50K-100K particles (GPUCompute)
- **Mobile**: 5K-10K particles (reduce texture size to 128x128)
- **LOD**: Reduce count at distance, increase when close

**Detection**:
```javascript
const isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
const particleCount = isMobile ? 10000 : 100000;
const textureSize = Math.sqrt(particleCount); // 100 or 316
```

---

### 9.2 Shader Complexity

**Cost Hierarchy** (GPU time per operation):
1. Texture lookups: ~10 cycles
2. Math operations (sin, cos): ~5 cycles
3. Basic arithmetic: ~1 cycle

**Optimizations**:
- Minimize texture samples (combine into vec4)
- Use `mix()` instead of `if/else`
- Precompute constants in JavaScript
- Use lower precision: `mediump float` on mobile

**Example**:
```glsl
// Bad: 3 texture lookups
float r = texture2D(tex, uv).r;
float g = texture2D(tex, uv).g;
float b = texture2D(tex, uv).b;

// Good: 1 texture lookup
vec3 rgb = texture2D(tex, uv).rgb;
```

---

### 9.3 Update Frequency

**Strategy**: Update physics at lower frequency than rendering

```javascript
let physicsAccumulator = 0;
const physicsStep = 1 / 60; // 60 physics updates per second

function animate(time) {
    const delta = (time - lastTime) / 1000;
    physicsAccumulator += delta;

    // Update physics at fixed timestep
    while (physicsAccumulator >= physicsStep) {
        gpuCompute.compute();
        physicsAccumulator -= physicsStep;
    }

    // Render every frame
    renderer.render(scene, camera);
    lastTime = time;
}
```

---

### 9.4 Memory Management

**Texture Memory**:
- 256x256 RGBA Float texture = 256 * 256 * 4 * 4 bytes = **1MB**
- 2 textures (ping-pong) * 2 variables (pos + vel) = **4MB** per system

**Optimization**:
- Use `HalfFloatType` instead of `FloatType` (50% memory reduction)
- Pack multiple values into RGBA channels
- Recycle particles (don't create/destroy)

---

## 10. Technical Challenges & Solutions

### Challenge 1: Edge Detection Accuracy

**Problem**: Sobel filter may miss subtle edges or create noise

**Solutions**:
1. Use multiple edge detection methods (Sobel + gradient)
2. Apply Gaussian blur before edge detection to reduce noise
3. Use adaptive thresholding based on local contrast
4. For hand contours: leverage existing alpha mask (most reliable)

---

### Challenge 2: Particle Spawn Synchronization

**Problem**: Particles spawn too early/late relative to dissolution

**Solution**: Use edge erosion value as spawn probability
```glsl
float edgeErosion = smoothstep(threshold - 0.1, threshold, noiseValue);
float spawnProbability = edgeErosion * (1.0 - edgeErosion) * 4.0; // Peak at 0.5

// In compute shader
if (rand(particleId) < spawnProbability) {
    // Spawn particle
}
```

---

### Challenge 3: Wind Physics Realism

**Problem**: Uniform noise looks mechanical, not natural

**Solution**: Layer multiple noise octaves with different frequencies
```glsl
vec3 wind = vec3(0.0);
float amplitude = 1.0;
float frequency = 1.0;

for (int i = 0; i < 4; i++) {
    wind += perlin3d(position * frequency + u_time) * amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
}
```

---

### Challenge 4: Performance on Mobile

**Problem**: GPGPU may be too expensive on mobile GPUs

**Fallback Strategy**:
```javascript
const supportsFloatTextures = renderer.capabilities.isWebGL2 ||
    renderer.extensions.get('OES_texture_float');

if (!supportsFloatTextures || isMobile) {
    // Fallback to simpler particle system
    useSimpleParticleSystem();
} else {
    useGPGPUParticleSystem();
}
```

**Simple System**: Update 1K-5K particles on CPU using BufferGeometry

---

### Challenge 5: Maintaining Visual Cohesion

**Problem**: Particles may look disconnected from hand shader aesthetic

**Solution**: Match visual style
1. Use same color palette (shader theme colors)
2. Apply same bloom/glow effects
3. Match particle opacity to hand contour lines
4. Sync motion timing (same easing functions)

---

## 11. Future Enhancements

### 11.1 Interactive Dissolution

**Ideas**:
- Mouse trails leave dissolving paths
- Touch gestures "wipe away" hand
- Audio-reactive dissolution (music visualization)

---

### 11.2 Reverse Reformation

**Concept**: Particles coalesce back into solid hand

**Technique**: Reverse time in compute shader
```glsl
uniform float timeDirection; // 1.0 = forward, -1.0 = reverse

position += velocity * delta * timeDirection;
```

---

### 11.3 Advanced Wind Effects

**Ideas**:
- Vortices (swirling particle clusters)
- Collision with invisible obstacles
- Magnetic attraction to cursor

---

### 11.4 Multi-Material Particles

**Concept**: Different particle types (dust, embers, smoke)

**Implementation**: Store particle type in W channel
```glsl
vec4 data = texture2D(texturePosition, uv);
vec3 position = data.xyz;
float type = data.w; // 0 = dust, 1 = ember, 2 = smoke

if (type < 0.33) {
    // Dust behavior
} else if (type < 0.66) {
    // Ember behavior (glows, rises)
} else {
    // Smoke behavior (spreads, fades)
}
```

---

## 12. Conclusion

The recommended approach for hand edge dissolution into particles is:

1. **Edge Detection**: Use existing alpha mask from hand contours (simplest, most reliable)
2. **Dissolution**: Perlin noise-based erosion with smoothstep for organic look
3. **Particles**: GPGPU with FBO ping-pong for 50K+ particles at 60fps
4. **Wind**: Multi-octave Perlin noise flow field with turbulence
5. **Transition**: Dual rendering (mesh fades out, particles fade in)

**Timeline**: 4 weeks for full implementation
**Complexity**: Medium-High (GPGPU adds complexity but enables scale)
**Performance**: Excellent on desktop, good on mobile with LOD
**Visual Impact**: High - creates dramatic, memorable interaction

**Key Success Factors**:
- Sync dissolution timing with particle spawning
- Tune wind physics for sand-like behavior (not too fast/slow)
- Match particle aesthetic to existing shader style
- Optimize for mobile from day one

---

## Additional Resources

### Books
- *GPU Gems 3* - Chapter 29: Real-Time Rigid Body Simulation on GPUs
- *The Book of Shaders* - Noise and particle chapters

### Articles
- [FBO Particles Tutorial - Barradeau](https://barradeau.com/blog/?p=621)
- [WebGL Fundamentals - Data Textures](https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html)

### Tools
- [Shadertoy](https://www.shadertoy.com/) - Test noise and dissolution effects
- [GLSL Sandbox](http://glslsandbox.com/) - Share shader experiments
- [Three.js Examples](https://threejs.org/examples/) - gpgpu_birds, webgl_gpgpu_water

---

**Report Generated**: 2025-11-25
**Agent**: 5 (Edge Dissolution & Particle Integration Research)
**Status**: Complete
**Next Step**: Hand off to Agent 6 (QA/Security Review)
