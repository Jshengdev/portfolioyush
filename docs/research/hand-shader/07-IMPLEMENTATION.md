# 07 - Step-by-Step Implementation Guide

## Phase Overview

| Phase | Task | Time | Dependencies |
|-------|------|------|--------------|
| 1 | Generate depth map | 15 min | None |
| 2 | Base shader setup | 1 hr | Phase 1 |
| 3 | Contour lines | 2 hrs | Phase 2 |
| 4 | Stipple texture | 1 hr | Phase 3 |
| 5 | Edge dissolution | 2 hrs | Phase 4 |
| 6 | GPGPU particles | 3 hrs | Phase 5 |
| 7 | Wind physics | 1 hr | Phase 6 |
| 8 | Integration | 2 hrs | All |

---

## Phase 1: Generate Depth Map (15 min)

### Steps
1. Take/find a hand photo (good lighting, clear background)
2. Go to [Depth-Anything V2](https://huggingface.co/spaces/depth-anything/Depth-Anything-V2)
3. Upload photo
4. Download **grayscale** depth map
5. Save as `/public/assets/hand_depth.png`

### Verify
- White = knuckles/fingertips (close)
- Black = palm valleys (far)
- Good contrast (uses full 0-255 range)

### Optional: GIMP Refinement
```
1. Colors > Invert (if needed)
2. Colors > Levels (increase contrast)
3. Filters > Blur > Gaussian Blur (2-3px)
4. Export as PNG
```

---

## Phase 2: Base Shader Setup (1 hr)

### Create HandShader Component

```jsx
// /src/components/HandShader.jsx
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../ThemeContext';

const HandShader = () => {
    const containerRef = useRef();
    const { theme } = useTheme();

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Load depth map
        const textureLoader = new THREE.TextureLoader();
        const depthMap = textureLoader.load('/assets/hand_depth.png');
        depthMap.format = THREE.LuminanceFormat;
        depthMap.type = THREE.UnsignedByteType;
        depthMap.minFilter = THREE.LinearFilter;
        depthMap.magFilter = THREE.LinearFilter;

        // Shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0 },
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                u_depthMap: { value: depthMap },
                u_contourInterval: { value: 0.05 },
                u_contourThickness: { value: 1.5 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
        });

        // Full-screen quad
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Animation loop
        const animate = () => {
            material.uniforms.u_time.value = performance.now() / 1000;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />;
};

export default HandShader;
```

### Verify
- [ ] Component renders without errors
- [ ] Depth map loads (check Network tab)
- [ ] Canvas fills viewport

---

## Phase 3: Contour Lines (2 hrs)

### Vertex Shader
```glsl
varying vec2 vUv;
varying float vHeight;

uniform sampler2D u_depthMap;

void main() {
    vUv = uv;
    vHeight = texture2D(u_depthMap, uv).r;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shader
```glsl
#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float u_contourInterval;
uniform float u_contourThickness;
uniform float u_time;

varying vec2 vUv;
varying float vHeight;

void main() {
    // Skip transparent areas
    if (vHeight < 0.01) discard;

    // Contour calculation
    float step = vHeight / u_contourInterval;
    float f = fract(step);
    float df = fwidth(step);

    // Anti-aliased line
    float line = smoothstep(df * 0.5, df * (0.5 + u_contourThickness), f);
    line *= smoothstep(df * (1.5 - u_contourThickness), df * 1.5, f);

    float lineMask = 1.0 - line;

    // Output
    vec3 color = vec3(1.0);
    float alpha = lineMask * 0.7;

    gl_FragColor = vec4(color, alpha);
}
```

### Verify
- [ ] Lines visible following hand shape
- [ ] Lines are anti-aliased (no jaggies)
- [ ] Adjust `u_contourInterval` to get 15-25 lines

---

## Phase 4: Stipple Texture (1 hr)

Add to fragment shader:

```glsl
uniform float u_stippleScale;
uniform float u_stippleThreshold;
uniform bool u_showStipple;

// Simple hash function for stipple noise
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    // ... existing contour code ...

    // Stipple layer
    if (u_showStipple) {
        vec2 stippleUv = vUv * u_stippleScale;
        float stipple = hash(floor(stippleUv));

        // Density based on depth (denser in valleys)
        float threshold = u_stippleThreshold + (1.0 - vHeight) * 0.2;
        float stippleMask = step(threshold, stipple);

        // Blend with contours
        lineMask = max(lineMask, stippleMask * 0.3);
    }

    gl_FragColor = vec4(color, lineMask * 0.7);
}
```

### Verify
- [ ] Dots visible in darker areas
- [ ] Dots don't overwhelm contours
- [ ] Toggle works (u_showStipple)

---

## Phase 5: Edge Dissolution (2 hrs)

### Add Perlin Noise Function
```glsl
// Classic 3D Perlin noise (include in shader)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float perlin3d(vec3 v) {
    // ... Ashima noise implementation ...
    // Get from: https://github.com/ashima/webgl-noise
}
```

### Dissolution Logic
```glsl
uniform float u_dissolveProgress;
uniform float u_dissolveNoiseScale;
uniform float u_dissolveEdgeWidth;

void main() {
    // ... existing code ...

    // Dissolution
    vec3 noisePos = vec3(vUv * u_dissolveNoiseScale, u_time * 0.1);
    float noise = perlin3d(noisePos) * 0.5 + 0.5;

    float threshold = 1.0 - u_dissolveProgress;
    float dissolve = noise - threshold;

    // Soft edge
    float dissolveMask = smoothstep(-u_dissolveEdgeWidth, 0.0, dissolve);

    // Discard dissolved
    if (dissolve > 0.0) discard;

    // Edge glow
    float glowMask = smoothstep(-u_dissolveEdgeWidth * 2.0, -u_dissolveEdgeWidth, dissolve);
    color = mix(color, vec3(0.53, 0.66, 0.84), glowMask - dissolveMask);

    gl_FragColor = vec4(color, alpha * dissolveMask);
}
```

### Verify
- [ ] Dissolution animates when `u_dissolveProgress` changes
- [ ] Edges have blue glow
- [ ] Noise creates organic patterns

---

## Phase 6: GPGPU Particles (3 hrs)

### Setup GPUComputationRenderer
```javascript
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

// In useEffect:
const WIDTH = 256;  // 256x256 = 65K particles
const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

// Position texture
const positionTexture = gpuCompute.createTexture();
const positionData = positionTexture.image.data;
for (let i = 0; i < positionData.length; i += 4) {
    positionData[i] = (Math.random() - 0.5) * 2;      // X
    positionData[i + 1] = (Math.random() - 0.5) * 2;  // Y
    positionData[i + 2] = 0;                           // Z
    positionData[i + 3] = Math.random() * 5;           // Age
}

// Add variable
const positionVariable = gpuCompute.addVariable(
    'texturePosition',
    positionShaderCode,
    positionTexture
);

gpuCompute.setVariableDependencies(positionVariable, [positionVariable]);

// Add uniforms
positionVariable.material.uniforms.u_time = { value: 0 };
positionVariable.material.uniforms.u_delta = { value: 0.016 };
positionVariable.material.uniforms.u_wind = { value: new THREE.Vector3(1, 0.2, 0) };

gpuCompute.init();
```

### Position Update Shader
```glsl
uniform float u_time;
uniform float u_delta;
uniform vec3 u_wind;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);

    // Age
    pos.w += u_delta;

    // Respawn if too old
    if (pos.w > 5.0) {
        // Respawn at random edge position
        pos.x = (fract(sin(u_time * uv.x * 12.9898) * 43758.5453) - 0.5) * 2.0;
        pos.y = (fract(sin(u_time * uv.y * 78.233) * 43758.5453) - 0.5) * 2.0;
        pos.w = 0.0;
    }

    // Wind movement
    pos.xyz += u_wind * u_delta;

    // Turbulence
    float turb = sin(pos.x * 3.0 + u_time) * 0.01;
    pos.y += turb;

    gl_FragColor = pos;
}
```

### Verify
- [ ] Particles visible
- [ ] Particles move with wind
- [ ] Particles respawn correctly

---

## Phase 7: Wind Physics (1 hr)

Enhance position shader with Perlin turbulence:

```glsl
// Add turbulence
vec3 turbPos = pos.xyz * 0.5 + vec3(u_time * 0.1);
vec3 turbulence = vec3(
    perlin3d(turbPos),
    perlin3d(turbPos + vec3(100.0)),
    perlin3d(turbPos + vec3(200.0))
) * 0.5;

pos.xyz += (u_wind + turbulence) * u_delta;
```

### Verify
- [ ] Particles have organic, non-uniform motion
- [ ] Wind direction affects overall drift
- [ ] No sudden jumps or glitches

---

## Phase 8: Integration (2 hrs)

### Connect Dissolution to Particle Spawn
```javascript
// Render dissolution to texture
const dissolutionTarget = new THREE.WebGLRenderTarget(512, 512);

function animate() {
    // Render dissolution pass
    renderer.setRenderTarget(dissolutionTarget);
    renderer.render(dissolutionScene, camera);
    renderer.setRenderTarget(null);

    // Pass edge mask to particles
    positionVariable.material.uniforms.u_edgeMask = { value: dissolutionTarget.texture };

    // Update GPGPU
    gpuCompute.compute();

    // Render final scene
    const posTexture = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
    particleMaterial.uniforms.u_positionTexture.value = posTexture;

    renderer.render(scene, camera);
}
```

### Add to App.jsx
```jsx
import HandShader from './components/HandShader';

// In routes, add as background layer:
<HandShader />
```

### Route-Reactive Behavior
```javascript
const { pathname } = useLocation();

useEffect(() => {
    // Adjust dissolution based on route
    const behaviors = {
        '/': { dissolve: 0.0, wind: 0.5 },
        '/about': { dissolve: 0.2, wind: 0.3 },
        '/projects': { dissolve: 0.3, wind: 1.0 },
        '/archive': { dissolve: 0.4, wind: 0.5 },
        '/contact': { dissolve: 0.5, wind: 0.3 },
    };

    const behavior = behaviors[pathname] || behaviors['/'];
    material.uniforms.u_dissolveProgress.value = behavior.dissolve;
    material.uniforms.u_windStrength.value = behavior.wind;
}, [pathname]);
```

---

## Final Checklist

### Visual
- [ ] Contour lines follow hand topology
- [ ] Lines are smooth and anti-aliased
- [ ] Stipple adds texture without overwhelming
- [ ] Dissolution edges glow blue
- [ ] Particles drift organically
- [ ] Overall aesthetic matches "data-driven organic cartography"

### Technical
- [ ] 60fps on target hardware
- [ ] No memory leaks (check DevTools)
- [ ] WebGL1 compatible
- [ ] Each layer toggleable

### Integration
- [ ] Layers on existing fog system
- [ ] Route-reactive personality
- [ ] Cursor interaction works

---

## Debug Commands (Browser Console)

```javascript
// Toggle layers
handShader.uniforms.u_showContours.value = false;
handShader.uniforms.u_showStipple.value = false;

// Adjust dissolution live
handShader.uniforms.u_dissolveProgress.value = 0.5;

// Check particle count
console.log('Particles:', gpuCompute.sizeX * gpuCompute.sizeY);

// Screenshot current state
renderer.domElement.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    window.open(url);
});
```

---

## Troubleshooting

**Blank screen**: Check depth map path, WebGL extension enabled
**No contours**: Verify vHeight range matches contourInterval
**Jagged lines**: Enable `OES_standard_derivatives`, increase thickness
**Particles not moving**: Check GPGPU init errors in console
**Performance issues**: Reduce particle texture size (256→128)
**Memory leaks**: Dispose textures and geometries in cleanup
