# 05 - Multi-Pass Shader Architecture

## Recommended Architecture: Hybrid Approach

Combine single-pass efficiency with multi-pass flexibility:

```
Pass 1 (Single-Pass): Base + Contours + Stipple
  ↓
Pass 2 (Separate): Edge Dissolution
  ↓
Pass 3 (GPGPU): Particles
  ↓
Final Composite
```

---

## Why Hybrid?

| Approach | Pros | Cons |
|----------|------|------|
| **Single-pass only** | Fastest, 1 draw call | Can't isolate layers, limited effects |
| **Multi-pass only** | Full flexibility | Slower, more memory |
| **Hybrid** | Best of both | Slightly more complex |

**Our choice**: Hybrid because:
- Contours + stipple can share depth data → combine in Pass 1
- Dissolution needs result of Pass 1 → separate Pass 2
- Particles are point sprites → must be separate geometry

---

## Pass 1: Single-Pass Multi-Layer

All non-dependent effects in one fragment shader:

```glsl
// Fragment shader with multiple layers
uniform bool u_showContours;
uniform bool u_showStipple;
uniform sampler2D u_depthMap;

void main() {
    float depth = texture2D(u_depthMap, vUv).r;
    vec4 result = vec4(0.0);

    // Layer 1: Base silhouette
    float silhouette = step(0.01, depth);
    result.a = silhouette;

    // Layer 2: Contour lines
    if (u_showContours) {
        float contour = calculateContours(depth);
        result.rgb = mix(result.rgb, vec3(1.0), contour);
    }

    // Layer 3: Stipple texture
    if (u_showStipple) {
        float stipple = calculateStipple(vUv, depth);
        result.rgb = mix(result.rgb, vec3(1.0), stipple * 0.3);
    }

    gl_FragColor = result;
}
```

### Uniform Toggle Pattern
```javascript
uniforms: {
    // Layer toggles
    u_showContours: { value: true },
    u_showStipple: { value: true },

    // Contour params
    u_contourInterval: { value: 0.05 },
    u_contourThickness: { value: 1.5 },

    // Stipple params
    u_stippleScale: { value: 50.0 },
    u_stippleThreshold: { value: 0.5 },
}
```

---

## Pass 2: Edge Dissolution (EffectComposer)

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// Create composer
const composer = new EffectComposer(renderer);

// Pass 1: Render scene normally
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Pass 2: Dissolution effect
const dissolutionPass = new ShaderPass({
    uniforms: {
        tDiffuse: { value: null },  // Auto-filled by EffectComposer
        u_dissolveProgress: { value: 0.0 },
        u_noiseScale: { value: 3.0 },
        u_time: { value: 0.0 },
    },
    vertexShader: /* passthrough vertex shader */,
    fragmentShader: dissolutionFragmentShader,
});
composer.addPass(dissolutionPass);

// Render loop
function animate() {
    composer.render();
}
```

### Dissolution Shader (Post-Process)
```glsl
uniform sampler2D tDiffuse;  // Previous pass output
uniform float u_dissolveProgress;
uniform float u_noiseScale;
uniform float u_time;

varying vec2 vUv;

float perlin2d(vec2 p) { /* noise function */ }

void main() {
    vec4 color = texture2D(tDiffuse, vUv);

    // Calculate dissolution
    float noise = perlin2d(vUv * u_noiseScale + u_time * 0.1);
    float threshold = 1.0 - u_dissolveProgress;

    // Erode based on noise
    float dissolve = smoothstep(threshold - 0.1, threshold + 0.1, noise);

    // Discard dissolved pixels
    if (dissolve > 0.5) discard;

    // Add edge glow
    float edgeGlow = smoothstep(threshold - 0.2, threshold - 0.1, noise);
    color.rgb += vec3(0.2, 0.4, 0.8) * edgeGlow;

    gl_FragColor = color;
}
```

---

## Pass 3: Particles (Separate Geometry)

Particles are rendered as a separate `THREE.Points` object with additive blending:

```javascript
// Particle material
const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_positionTexture: { value: null },  // From GPGPU
        u_particleSize: { value: 2.0 },
    },
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,  // Glow effect
});

// Add to scene (renders after solid geometry)
scene.add(particles);
```

---

## Debug Visualization

### Layer Toggle UI (lil-gui)
```javascript
import GUI from 'lil-gui';

const gui = new GUI();
const params = {
    showContours: true,
    showStipple: true,
    showDissolution: true,
    showParticles: true,
    debugMode: 'none',  // 'none', 'contours', 'stipple', 'depth'
};

gui.add(params, 'showContours').onChange(v => {
    material.uniforms.u_showContours.value = v;
});
gui.add(params, 'showStipple').onChange(v => {
    material.uniforms.u_showStipple.value = v;
});
gui.add(params, 'debugMode', ['none', 'contours', 'stipple', 'depth']).onChange(v => {
    material.uniforms.u_debugMode.value = v;
});
```

### Debug Mode in Shader
```glsl
uniform int u_debugMode;

void main() {
    // Debug: Show only contours
    if (u_debugMode == 1) {
        float contour = calculateContours(depth);
        gl_FragColor = vec4(vec3(contour), 1.0);
        return;
    }

    // Debug: Show only stipple
    if (u_debugMode == 2) {
        float stipple = calculateStipple(vUv, depth);
        gl_FragColor = vec4(vec3(stipple), 1.0);
        return;
    }

    // Debug: Show raw depth
    if (u_debugMode == 3) {
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }

    // Normal rendering
    // ...
}
```

### Screenshot Individual Passes
```javascript
function screenshotPass(passName) {
    // Render only specific pass
    composer.passes.forEach(pass => {
        pass.enabled = (pass.name === passName);
    });
    composer.render();

    // Save canvas
    const dataURL = renderer.domElement.toDataURL('image/png');
    downloadImage(dataURL, `${passName}.png`);

    // Re-enable all passes
    composer.passes.forEach(pass => { pass.enabled = true; });
}
```

---

## Uniform Organization Best Practice

Namespace by layer for clarity:

```javascript
const uniforms = {
    // === GLOBAL ===
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },

    // === LAYER TOGGLES ===
    u_showContours: { value: true },
    u_showStipple: { value: true },
    u_showDissolution: { value: true },
    u_showParticles: { value: true },

    // === DEPTH MAP ===
    u_depthMap: { value: depthTexture },

    // === CONTOUR LAYER ===
    u_contour_interval: { value: 0.05 },
    u_contour_thickness: { value: 1.5 },
    u_contour_alpha: { value: 0.7 },
    u_contour_color: { value: new THREE.Color(1, 1, 1) },

    // === STIPPLE LAYER ===
    u_stipple_scale: { value: 50.0 },
    u_stipple_threshold: { value: 0.5 },
    u_stipple_alpha: { value: 0.4 },

    // === DISSOLUTION LAYER ===
    u_dissolve_progress: { value: 0.0 },
    u_dissolve_noiseScale: { value: 3.0 },
    u_dissolve_edgeWidth: { value: 0.1 },
    u_dissolve_edgeColor: { value: new THREE.Color(0.5, 0.7, 1.0) },

    // === PARTICLE LAYER ===
    u_particle_size: { value: 2.0 },
    u_particle_color: { value: new THREE.Color(0.8, 0.9, 1.0) },

    // === WIND ===
    u_wind_strength: { value: 1.0 },
    u_wind_direction: { value: new THREE.Vector3(1, 0.2, 0) },
    u_wind_turbulence: { value: 0.5 },
};
```

---

## Performance Optimization

| Optimization | Impact | When to Use |
|--------------|--------|-------------|
| Single-pass composition | 3-5x faster | Always for non-dependent layers |
| Reuse framebuffers | 100x faster | Pre-allocate at init |
| Half-resolution post | 75% faster | Mobile, blur effects |
| `#ifdef` compilation | 20-30% faster | Production builds |
| Instanced particles | 10-50x faster | 10K+ particles |

### Memory Management
```javascript
// Pre-allocate render targets at init
const renderTargetA = new THREE.WebGLRenderTarget(width, height);
const renderTargetB = new THREE.WebGLRenderTarget(width, height);

// NEVER create textures in render loop
// BAD:
function animate() {
    const rt = new THREE.WebGLRenderTarget(w, h);  // MEMORY LEAK!
}

// GOOD:
function animate() {
    renderer.setRenderTarget(renderTargetA);
    // ...
}
```

---

## Sources

- [Three.js EffectComposer](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer)
- [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) (optimized alternative)
- [SpectorJS](https://spector.babylonjs.com/) (WebGL debugging)
- [Firefox Shader Editor](https://firefox-source-docs.mozilla.org/devtools-user/shader_editor/)
