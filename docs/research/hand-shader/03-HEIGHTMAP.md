# 03 - Heightmap & Depth Map Generation

## Recommended Method: Depth-Anything V2 (Online)

**Why**: Easiest, highest quality, 5 minutes, free

### Step-by-Step

1. **Prepare hand photo**
   - Good lighting (avoid harsh shadows)
   - Clear background contrast
   - Save as JPG or PNG

2. **Generate depth map**
   - Go to: [Depth-Anything V2 Hugging Face](https://huggingface.co/spaces/depth-anything/Depth-Anything-V2)
   - Upload hand photo
   - Wait 5-10 seconds
   - Download **grayscale** depth map (not colored)

3. **Save to project**
   - Path: `/public/assets/hand_depth.png`

4. **(Optional) Refine in GIMP**
   - Check orientation: White = high (knuckles), Black = low (palm)
   - If inverted: `Colors > Invert`
   - Adjust contrast: `Colors > Levels`
   - Smooth noise: `Filters > Blur > Gaussian Blur` (2-3px)

---

## Three.js Texture Loading

```javascript
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const depthMap = textureLoader.load('/assets/hand_depth.png', (texture) => {
    console.log('Depth map loaded:', texture.image.width, 'x', texture.image.height);
});

// Configure for 8-bit grayscale
depthMap.format = THREE.LuminanceFormat;  // WebGL1 compatible
depthMap.type = THREE.UnsignedByteType;   // 8-bit (0-255)
depthMap.minFilter = THREE.LinearFilter;  // Smooth interpolation
depthMap.magFilter = THREE.LinearFilter;
depthMap.wrapS = THREE.ClampToEdgeWrapping;
depthMap.wrapT = THREE.ClampToEdgeWrapping;
```

### WebGL2 Alternative (More Efficient)
```javascript
// If WebGL2 context detected
depthMap.format = THREE.RedFormat;
depthMap.internalFormat = 'R8';
depthMap.type = THREE.UnsignedByteType;
```

---

## Format Requirements

| Property | Requirement | Notes |
|----------|-------------|-------|
| **Bit depth** | 8-bit | 256 levels sufficient for contours |
| **Color mode** | Grayscale | Red channel only needed |
| **Resolution** | 512x512 - 1024x1024 | Start with 512, increase if banding |
| **Encoding** | Linear | Not sRGB (no gamma) |
| **Format** | PNG | Lossless compression |

**Depth convention**:
- White (1.0) = closest to camera (knuckles, fingertips)
- Black (0.0) = farthest from camera (palm valleys)

---

## Alternative Methods

### Method 2: MiDaS (Alternative ML)
- URL: [MiDaS Hugging Face](https://huggingface.co/spaces/pytorch/MiDaS)
- Similar quality to Depth-Anything
- Good fallback if primary is down

### Method 3: Manual GIMP Painting
- Time: 30-60 minutes
- Steps:
  1. Open hand photo
  2. Convert to grayscale: `Image > Mode > Grayscale`
  3. Adjust levels for contrast
  4. Paint with Dodge (lighten) / Burn (darken) tools
  5. Gaussian blur (2-5px) for smoothness
- Quality: Medium (requires artistic skill)

### Method 4: Browser-Based ML (Transformers.js)
```javascript
import { pipeline } from '@huggingface/transformers';

const depthEstimator = await pipeline(
    'depth-estimation',
    'Xenova/depth-anything-small-hf'
);

const image = document.getElementById('handImage');
const result = await depthEstimator(image);
// result.depth contains depth tensor
```
- More complex setup
- Fully client-side (no server needed)

---

## Shader Access (GLSL)

```glsl
uniform sampler2D u_depthMap;
varying vec2 vUv;

void main() {
    // Sample depth (0.0 = far, 1.0 = close)
    float depth = texture2D(u_depthMap, vUv).r;

    // Use depth for contours
    float contourInterval = 0.05;
    float scaled = depth / contourInterval;
    float f = fract(scaled);
    float df = fwidth(scaled);

    float line = smoothstep(df, df * 2.0, f);
    line = min(line, smoothstep(df * 2.0, df, 1.0 - f));

    gl_FragColor = vec4(vec3(1.0 - line), 1.0);
}
```

---

## Troubleshooting

**Depth map appears inverted**:
- Invert in GIMP: `Colors > Invert`
- Or invert in shader: `float depth = 1.0 - texture2D(u_depthMap, vUv).r;`

**Contours don't follow hand shape**:
- Check UV mapping on geometry
- Verify texture is loading (check Network tab)
- Ensure depth map has good contrast

**Banding/stepping artifacts**:
- Increase texture resolution (512 → 1024)
- Reduce `u_contourInterval` (fewer lines)
- Apply slight blur in GIMP

**WebGL1 texture error**:
- Use `LuminanceFormat` not `RedFormat`
- Use `UnsignedByteType` not `UnsignedShortType`

---

## Quality Assessment Checklist

Before moving on, verify:
- [ ] Depth map loads without errors
- [ ] White areas correspond to knuckles/fingertips
- [ ] Black areas correspond to palm/valleys
- [ ] Good contrast (uses full 0-255 range)
- [ ] No harsh edges or artifacts
- [ ] Resolution sufficient (512x512 minimum)

---

## Sources

- [Depth-Anything V2 Demo](https://huggingface.co/spaces/depth-anything/Depth-Anything-V2)
- [MiDaS Demo](https://huggingface.co/spaces/pytorch/MiDaS)
- [Transformers.js Docs](https://huggingface.co/docs/transformers.js/index)
- [GIMP Height Map Tutorial](https://randommomentania.com/2018/09/gimp-bump-map-tutorial/)
