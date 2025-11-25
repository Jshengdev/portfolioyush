//=============================================================================
// ATMOSPHERE SHADER - ENHANCED EDITION
// V18 Experiment: Cinematic grainy fog with customizable post-processing effects
//
// Visual Goals:
// - Base fog layer with smooth gradient (lighter center, darker edges)
// - Consistent film grain across everything (analog feel)
// - Noise-based density variation (organic thicker/thinner patches)
// - Subtle color shift (warm in light center, cool blue-gray at edges)
// - 7 customizable post-processing effects:
//   1. Halftone (print media dots)
//   2. Dithering (Bayer matrix quantization)
//   3. Scanlines (CRT aesthetic)
//   4. Color grading (exposure, contrast, saturation, temperature)
//   5. Chromatic aberration (lens imperfection)
//   6. Enhanced vignette (customizable radius & softness)
//   7. Bloom (soft glow in bright areas)
//
// References:
// - Cinematographer fog (Gordon Willis, Roger Deakins)
// - Analog film grain texture
// - Atmospheric perspective in painting
// - Print media halftone techniques
// - CRT scanline effects
// - Lens aberrations and bloom
//=============================================================================

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

// Customizable uniforms (controllable via UI)
uniform float u_fogDensity;           // How much fog patches affect color
uniform float u_grainIntensity;       // Visible grain everywhere
uniform float u_noiseScale;           // Scale of fog patches
uniform float u_lightRadius;          // Light spread width (unused but kept for future)
uniform float u_lightSoftness;        // Light falloff softness
uniform float u_grainScale;           // Grain particle size (unused - uses resolution instead)
uniform float u_depthLayers;          // Fog depth layers (parallax)
uniform float u_fogPatchStrength;     // Visibility of fog patches
uniform float u_vignetteStrength;     // Vignette darkness
uniform float u_vignetteSize;         // Vignette area size
uniform float u_colorNoiseAmount;     // Color variation amount
uniform float u_breathAmount;         // Breathing/pulsing intensity
uniform float u_breathSpeed;          // Breathing animation speed

// NEW POST-PROCESSING UNIFORMS

// 1. HALFTONE EFFECT
uniform float u_halftoneEnabled;      // 0-1
uniform float u_halftoneScale;        // 2-50 dots per unit
uniform float u_halftoneAngle;        // 0-90 rotation degrees
uniform float u_halftoneContrast;     // 0.5-2.0

// 2. DITHERING
uniform float u_ditherEnabled;        // 0-1
uniform float u_ditherScale;          // 1-8 pixel size
uniform float u_ditherIntensity;      // 0-1

// 3. CHROMATIC ABERRATION
uniform float u_chromaticEnabled;     // 0-1
uniform float u_chromaticStrength;    // 0-0.02
uniform vec2 u_chromaticOffset;       // directional offset

// 4. ENHANCED VIGNETTE (additional controls)
uniform float u_vignetteRadius;       // 0.3-1.5
uniform float u_vignetteSoftness;     // 0.1-1.0

// 5. COLOR GRADING
uniform float u_contrast;             // 0.5-2.0
uniform float u_saturation;           // 0-2.0
uniform float u_colorTemperature;     // -1 to 1 (cool to warm)
uniform float u_exposure;             // -2 to 2

// 6. SCANLINES
uniform float u_scanlinesEnabled;     // 0-1
uniform float u_scanlinesIntensity;   // 0-1
uniform float u_scanlinesCount;       // 100-800

// 7. BLOOM
uniform float u_bloomEnabled;         // 0-1
uniform float u_bloomThreshold;       // 0.3-1.0
uniform float u_bloomIntensity;       // 0-2
uniform float u_bloomRadius;          // 0.001-0.02

// 8. VOLUMETRIC GRAIN (grain embedded in fog, not screen overlay)
uniform float u_grainDepthEnabled;    // 0-1 (0=screen grain, 1=volumetric grain)
uniform float u_grainFogBinding;      // 0-1 (how much grain follows fog density)
uniform float u_grainLightFalloff;    // 0-1 (grain fades in bright light areas)
uniform float u_grainLayerVariation;  // 0-1 (grain varies per depth layer)
uniform float u_grainParticleSize;    // 0.5-3.0 (size of grain "particles" in fog)

// 9. PER-LAYER GRAIN SIZE (front layers = bigger grain, back = smaller)
uniform float u_grainSizeFront;       // 0.5-4.0, default 2.0 - grain size for nearest layer
uniform float u_grainSizeBack;        // 0.2-2.0, default 0.5 - grain size for farthest layer
uniform float u_grainSizeVariation;   // 0-1, default 0.7 - how much size varies between layers

// 10. GRAIN CLUSTERING (organic clumping)
uniform float u_grainClustering;      // 0-1, default 0.3 - how much grain clumps together
uniform float u_grainClusterSize;     // 1-10, default 3 - size of grain clusters

// 11. DEPTH FOG CONTROL
uniform float u_fogLayerSeparation;   // 0-1, default 0.5 - visual separation between fog layers
uniform float u_fogFrontOpacity;      // 0-1, default 0.8 - opacity of front fog layer
uniform float u_fogBackOpacity;       // 0-1, default 0.4 - opacity of back fog layer

// 12. CINEMATIC LIGHTING
uniform float u_lightWarmth;          // 0-1, default 0.3 - warm tint in light areas
uniform float u_shadowCoolness;       // 0-1, default 0.2 - cool tint in shadow areas
uniform float u_lightContrast;        // 0.5-2.0, default 1.2 - light/shadow contrast

//-----------------------------------------------------------------------------
// Noise Functions
//-----------------------------------------------------------------------------

// Hash function for randomness
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D noise (must be defined before grainCluster which uses it)
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  // Smooth interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Four corners
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Hash with clustering behavior for film-like grain
float hashClustered(vec2 p, float time) {
  // Base hash
  float h = hash(p + fract(time * 60.0));

  // Add clustering - nearby pixels influence each other slightly
  float cluster = hash(floor(p * 0.5) + fract(time * 60.0));

  return mix(h, cluster, 0.3);
}

// Grain clustering function - groups nearby grain particles organically
float grainCluster(vec2 p, float time, float clusterSize, float clusterStrength) {
  // Base grain
  float baseGrain = hash(p + fract(time * 60.0));

  // Cluster influence from neighboring cells
  vec2 cellPos = floor(p / clusterSize);
  float clusterNoise = noise(cellPos + time * 0.1);

  // Larger clusters based on cluster size
  float largeCluster = noise(cellPos * 0.5 + time * 0.05);

  // Mix base grain with cluster influence
  float clustered = mix(baseGrain, clusterNoise, clusterStrength * 0.5);
  clustered = mix(clustered, largeCluster, clusterStrength * 0.3);

  return clustered;
}

// Fractal Brownian Motion - layered noise for organic feel
float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

//-----------------------------------------------------------------------------
// Film Grain - More organic, visible across ALL brightness levels
//-----------------------------------------------------------------------------

float filmGrain(vec2 uv, float time, float brightness) {
  // Multiple grain layers with varying sizes (film-like)
  vec2 grainUV = uv * u_resolution.xy;

  // Primary grain layer - larger particles
  float grain1 = hashClustered(grainUV / 2.0, time);

  // Secondary grain - medium particles
  float grain2 = hashClustered(grainUV / 1.5, time + 0.33);

  // Fine grain layer
  float grain3 = hash(grainUV + fract(time * 60.0));

  // Combine with varying weights for organic texture
  float grain = grain1 * 0.5 + grain2 * 0.35 + grain3 * 0.15;

  // IMPORTANT: Grain should be equally visible in darks AND lights
  // Boost grain in bright areas (film grain is often more visible there)
  float brightBoost = mix(1.0, 1.3, brightness);

  // Center around 0 for additive blending
  return (grain - 0.5) * 2.0 * brightBoost;
}

//-----------------------------------------------------------------------------
// Light Diffusion - MUCH softer gaussian-like falloff
//-----------------------------------------------------------------------------

float lightFalloff(vec2 uv, vec2 lightPos, float softness) {
  float dist = distance(uv, lightPos);

  // Very soft exponential falloff - extends much further
  // exp(-dist * 0.5) instead of exp(-dist * 4.5)
  float falloff = exp(-dist * softness);

  // Squared falloff for even softer feel
  falloff = falloff * falloff;

  // Gentle gaussian-like bloom in center
  float glow = exp(-dist * dist * 2.0) * 0.4;

  return clamp(falloff + glow, 0.0, 1.0);
}

//-----------------------------------------------------------------------------
// Fog Density - More visible patches, organic breathing
//-----------------------------------------------------------------------------

float fogDensity(vec2 uv, float time, float noiseScale, float depthLayers) {
  // Slow drifting noise for fog patches
  vec2 drift = vec2(time * 0.015, time * 0.012);

  // Multi-layer depth fog - each layer at different "distance"
  float density = 0.0;
  float amplitude = 1.0;
  float totalAmplitude = 0.0;

  for (float i = 0.0; i < 5.0; i++) {
    if (i >= depthLayers) break;

    // Layer progress (0 = front, 1 = back)
    float layerProgress = i / max(1.0, depthLayers - 1.0);

    // Interpolate layer opacity from front to back
    float layerOpacity = mix(u_fogFrontOpacity, u_fogBackOpacity, layerProgress);

    // Each layer has different scale and drift speed (parallax depth)
    float layerScale = noiseScale * (0.8 + i * 0.4);
    vec2 layerDrift = drift * (0.8 + i * 0.4);

    // Offset each layer for more variation (enhanced by separation control)
    vec2 layerOffset = vec2(i * 0.3, i * 0.2) * (1.0 + u_fogLayerSeparation);

    // FBM for organic variation at this depth
    float layerDensity = fbm(uv * layerScale + layerDrift + layerOffset, 4);

    // Distant layers are more diffuse
    layerDensity = mix(layerDensity, 0.5, i * 0.1);

    // Apply layer opacity
    layerDensity *= layerOpacity;

    density += layerDensity * amplitude;
    totalAmplitude += amplitude;
    amplitude *= 0.55;
  }

  // Normalize and boost contrast for more visible patches
  density = density / totalAmplitude;

  // Push contrast - make thick patches thicker, thin patches thinner
  density = smoothstep(0.3, 0.7, density);

  return density;
}

//-----------------------------------------------------------------------------
// NEW POST-PROCESSING EFFECTS
//-----------------------------------------------------------------------------

// 1. HALFTONE EFFECT
vec3 applyHalftone(vec3 color, vec2 uv) {
  if (u_halftoneEnabled < 0.01) return color;

  // Convert to grayscale
  float gray = dot(color, vec3(0.299, 0.587, 0.114));

  // Rotate UV for halftone angle
  float angle = radians(u_halftoneAngle);
  mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 rotatedUV = rotation * (uv - 0.5) + 0.5;

  // Scale UV for dot density
  vec2 halftoneUV = rotatedUV * u_halftoneScale * u_resolution.y;

  // Calculate distance to nearest dot center
  vec2 cellCenter = floor(halftoneUV) + 0.5;
  float distToCenter = length(halftoneUV - cellCenter);

  // Dot size based on brightness (brighter = larger dots)
  float dotRadius = gray * 0.5 * u_halftoneContrast;

  // Create dot pattern
  float dotPattern = smoothstep(dotRadius + 0.05, dotRadius - 0.05, distToCenter);

  // Mix halftone with original color
  vec3 halftoneColor = mix(vec3(0.0), color, dotPattern);
  return mix(color, halftoneColor, u_halftoneEnabled);
}

// 2. DITHERING (Bayer matrix)
vec3 applyDither(vec3 color, vec2 uv) {
  if (u_ditherEnabled < 0.01) return color;

  // Bayer matrix 4x4
  float bayerMatrix[16];
  bayerMatrix[0] = 0.0/16.0;   bayerMatrix[1] = 8.0/16.0;   bayerMatrix[2] = 2.0/16.0;   bayerMatrix[3] = 10.0/16.0;
  bayerMatrix[4] = 12.0/16.0;  bayerMatrix[5] = 4.0/16.0;   bayerMatrix[6] = 14.0/16.0;  bayerMatrix[7] = 6.0/16.0;
  bayerMatrix[8] = 3.0/16.0;   bayerMatrix[9] = 11.0/16.0;  bayerMatrix[10] = 1.0/16.0;  bayerMatrix[11] = 9.0/16.0;
  bayerMatrix[12] = 15.0/16.0; bayerMatrix[13] = 7.0/16.0;  bayerMatrix[14] = 13.0/16.0; bayerMatrix[15] = 5.0/16.0;

  // Get Bayer matrix value for this pixel
  vec2 ditherCoord = mod(floor(uv * u_resolution.xy / u_ditherScale), 4.0);
  int index = int(ditherCoord.x) + int(ditherCoord.y) * 4;
  float bayerValue = bayerMatrix[index];

  // Apply dithering
  vec3 dithered = color + (bayerValue - 0.5) * u_ditherIntensity * 0.1;
  return mix(color, dithered, u_ditherEnabled);
}

// 3. CHROMATIC ABERRATION
vec3 applyChromaticAberration(vec2 uv, vec3 baseColor) {
  if (u_chromaticEnabled < 0.01) return baseColor;

  // Simulate channel separation based on distance from center
  vec2 centerOffset = (uv - 0.5) * 2.0;
  float distFromCenter = length(centerOffset);

  // Shift channels radially
  float r = baseColor.r;
  float g = baseColor.g;
  float b = baseColor.b;

  // Apply chromatic shift (R and B shift outward, G stays centered)
  r = mix(r, r * 1.05, distFromCenter * u_chromaticStrength * 20.0);
  b = mix(b, b * 1.05, distFromCenter * u_chromaticStrength * 20.0);

  vec3 aberrated = vec3(r, g, b);
  return mix(baseColor, aberrated, u_chromaticEnabled);
}

// 4. ENHANCED VIGNETTE
vec3 applyEnhancedVignette(vec3 color, vec2 uv) {
  // Distance from center
  vec2 center = uv - 0.5;
  float dist = length(center);

  // Smooth vignette with customizable radius and softness
  float vignette = smoothstep(u_vignetteRadius, u_vignetteRadius - u_vignetteSoftness, dist);

  return color * vignette;
}

// 5. COLOR GRADING
vec3 applyColorGrading(vec3 color) {
  // Exposure
  color *= pow(2.0, u_exposure);

  // Contrast
  color = (color - 0.5) * u_contrast + 0.5;

  // Saturation
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(gray), color, u_saturation);

  // Color temperature (cool to warm)
  if (u_colorTemperature > 0.0) {
    // Warm (add red/yellow, reduce blue)
    color.r += u_colorTemperature * 0.1;
    color.g += u_colorTemperature * 0.05;
    color.b -= u_colorTemperature * 0.1;
  } else {
    // Cool (add blue, reduce red/yellow)
    color.r += u_colorTemperature * 0.1;
    color.g += u_colorTemperature * 0.05;
    color.b -= u_colorTemperature * 0.1;
  }

  return color;
}

// 6. SCANLINES
vec3 applyScanlines(vec3 color, vec2 uv) {
  if (u_scanlinesEnabled < 0.01) return color;

  // Horizontal scanlines
  float line = sin(uv.y * u_scanlinesCount * 3.14159);

  // Create scanline pattern
  float scanline = mix(1.0, line * 0.5 + 0.5, u_scanlinesIntensity);

  return color * scanline;
}

// 8. VOLUMETRIC GRAIN (grain lives IN the fog, not ON the screen)
//    Returns grain amount based on fog density and depth layers
float volumetricGrain(vec2 uv, float time, float fogDensityValue, float lightValue, float noiseScale, float depthLayers) {
  if (u_grainDepthEnabled < 0.01) {
    // Disabled - return standard screen grain
    return 1.0;
  }

  // Base grain mask starts at 0 (no grain in empty space)
  float grainMask = 0.0;

  // --- FOG BINDING ---
  // Grain appears WHERE there is fog (denser fog = more visible grain)
  float fogBinding = fogDensityValue * u_grainFogBinding;

  // --- LIGHT FALLOFF ---
  // Grain fades in bright light (like real particles scatter less when lit directly)
  float lightFade = 1.0 - (lightValue * u_grainLightFalloff);
  lightFade = max(0.1, lightFade); // Never fully disappear

  // --- DEPTH LAYER VARIATION ---
  // Different grain patterns at different "depths" in the fog
  float layerGrain = 0.0;
  float layerWeight = 0.0;

  for (float i = 0.0; i < 5.0; i++) {
    if (i >= depthLayers) break;

    // Each layer gets different grain pattern
    float layerDepth = (i + 1.0) / depthLayers;

    // Interpolate grain size from front (layer 0) to back (last layer)
    float layerProgress = i / max(1.0, depthLayers - 1.0);
    float grainSize = mix(u_grainSizeFront, u_grainSizeBack, layerProgress * u_grainSizeVariation);

    // Apply grain size to UV scaling
    vec2 layerUV = uv * (1.0 + i * 0.3) * u_grainParticleSize * grainSize;

    // Offset each layer's grain in time for organic movement
    float layerTime = time + i * 0.17;

    // Sample grain at this depth with clustering
    float thisLayerGrain = grainCluster(
      layerUV * 500.0,
      layerTime,
      u_grainClusterSize,
      u_grainClustering
    );

    // Deeper layers have larger, softer grain
    float softness = 1.0 + i * 0.2;
    float softGrain = grainCluster(
      layerUV * (500.0 / softness),
      layerTime,
      u_grainClusterSize * 1.5,
      u_grainClustering * 0.7
    );

    thisLayerGrain = mix(thisLayerGrain, softGrain, u_grainLayerVariation);

    // Weight by depth (closer = more visible)
    float weight = 1.0 / (1.0 + i * 0.5);
    layerGrain += thisLayerGrain * weight;
    layerWeight += weight;
  }

  layerGrain /= layerWeight;

  // --- COMBINE ---
  // Grain visibility = fog presence × light fade × layer pattern
  grainMask = fogBinding * lightFade;

  // Mix between uniform grain (0) and depth-layered grain (1)
  float finalGrain = mix(1.0, layerGrain, u_grainLayerVariation);

  // Apply the fog binding mask
  // grainMask controls WHERE grain appears
  // finalGrain controls WHAT the grain looks like
  return mix(0.0, finalGrain, grainMask);
}

// 7. BLOOM (simplified box blur approximation)
vec3 applyBloom(vec3 color, vec2 uv) {
  if (u_bloomEnabled < 0.01) return color;

  // Extract bright areas above threshold
  float brightness = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 brightColor = color * smoothstep(u_bloomThreshold, u_bloomThreshold + 0.1, brightness);

  // Simple bloom blur (9-tap box filter approximation)
  vec3 bloom = brightColor;
  float total = 1.0;

  // Sample neighboring pixels (simplified)
  for (float x = -1.0; x <= 1.0; x += 1.0) {
    for (float y = -1.0; y <= 1.0; y += 1.0) {
      if (x == 0.0 && y == 0.0) continue;

      // In a real shader, we'd sample the texture here
      // For this fog shader, we approximate with the current color
      bloom += brightColor * 0.8; // Approximation
      total += 0.8;
    }
  }

  bloom /= total;

  // Add bloom to original color
  return color + bloom * u_bloomIntensity * u_bloomEnabled;
}

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float time = u_time;

  // Aspect ratio correction for circular light
  vec2 uvCorrected = uv;
  uvCorrected.x *= u_resolution.x / u_resolution.y;

  // Light position (follows mouse)
  vec2 lightPos = u_mouse;
  lightPos.x *= u_resolution.x / u_resolution.y;

  // Color palette
  vec3 darkColor = vec3(0.08, 0.08, 0.09);     // Deep dark
  vec3 lightColor = vec3(0.91, 0.88, 0.83);    // Warm off-white
  vec3 edgeColor = vec3(0.14, 0.14, 0.18);     // Cool blue-gray edge
  vec3 midColor = vec3(0.30, 0.28, 0.26);      // Warm mid-tone

  // Calculate light influence - now much softer/wider
  float light = lightFalloff(uvCorrected, lightPos, u_lightSoftness);

  // Calculate fog density with noise - more visible patches
  float density = fogDensity(uv, time, u_noiseScale, u_depthLayers);

  // Soft vignette (using controllable parameters)
  float vignette = 1.0 - smoothstep(0.2, 1.4, length(uv - 0.5) * u_vignetteSize);
  vignette = mix(1.0, vignette, u_vignetteStrength);

  //--- Color Mixing with Cinematic Lighting ---

  // Base: start from edge color
  vec3 fogColor = edgeColor;

  // Add cool tint to shadow areas
  vec3 shadowTint = mix(edgeColor, vec3(0.1, 0.12, 0.18), u_shadowCoolness);
  fogColor = mix(fogColor, shadowTint, 1.0 - light);

  // Warm gradient toward light - very soft transition
  vec3 warmMidColor = mix(midColor, vec3(0.35, 0.32, 0.26), u_lightWarmth);
  vec3 warmLightColor = mix(lightColor, vec3(0.95, 0.92, 0.85), u_lightWarmth);

  fogColor = mix(fogColor, warmMidColor, light * 0.7);
  fogColor = mix(fogColor, warmLightColor, pow(light, 1.5) * 0.5);

  // Apply light contrast adjustment
  float lightContrastFactor = (light - 0.5) * u_lightContrast + 0.5;
  lightContrastFactor = clamp(lightContrastFactor, 0.0, 1.0);

  // FOG PATCHES - now more visible (using uniform)
  // Thick fog = darker, thin fog = shows more light through
  float patchEffect = (density - 0.5) * u_fogPatchStrength;
  fogColor = mix(fogColor, darkColor, max(0.0, patchEffect) * (1.0 - lightContrastFactor * 0.3));
  fogColor = mix(fogColor, warmLightColor, max(0.0, -patchEffect) * lightContrastFactor * 0.3);

  // Apply vignette
  fogColor = mix(darkColor, fogColor, vignette);

  // Subtle color noise for organic feel (using uniform)
  float colorNoise = noise(uv * 4.0 + time * 0.03);
  fogColor += (colorNoise - 0.5) * u_colorNoiseAmount;

  // Calculate current brightness for grain adjustment
  float currentBrightness = dot(fogColor, vec3(0.299, 0.587, 0.114));

  // FILM GRAIN with VOLUMETRIC DEPTH option
  float grain = filmGrain(uv, time, currentBrightness);

  // Calculate volumetric grain mask (where grain should appear)
  float volGrainMask = volumetricGrain(uv, time, density, light, u_noiseScale, u_depthLayers);

  // Blend between screen grain (flat) and volumetric grain (depth-aware)
  float grainApplication = mix(1.0, volGrainMask, u_grainDepthEnabled);

  // Apply grain with depth masking
  fogColor += grain * u_grainIntensity * grainApplication;

  // Theme-aware blending
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;

  if (bgBrightness > 0.5) {
    // Light mode: invert fog colors
    vec3 invertedFog = 1.0 - fogColor;
    float gray = dot(invertedFog, vec3(0.299, 0.587, 0.114));
    invertedFog = mix(vec3(gray), invertedFog, 0.7);
    fogColor = invertedFog;
  }

  // Subtle breathing (using uniforms)
  float breath = sin(time * u_breathSpeed) * u_breathAmount + 1.0;
  fogColor *= breath;

  //--- POST-PROCESSING PIPELINE ---
  // Apply effects in correct order for best visual results:

  // 1. Halftone (print aesthetic)
  fogColor = applyHalftone(fogColor, uv);

  // 2. Dithering (quantization)
  fogColor = applyDither(fogColor, uv);

  // 3. Scanlines (CRT aesthetic)
  fogColor = applyScanlines(fogColor, uv);

  // 4. Color grading (exposure, contrast, saturation, temperature)
  fogColor = applyColorGrading(fogColor);

  // 5. Chromatic aberration (lens imperfection)
  fogColor = applyChromaticAberration(uv, fogColor);

  // 6. Enhanced vignette (lens darkening with more controls)
  // Note: This is in addition to the base vignette applied earlier
  fogColor = applyEnhancedVignette(fogColor, uv);

  // 7. Bloom (glow in bright areas)
  fogColor = applyBloom(fogColor, uv);

  // Final clamp
  fogColor = clamp(fogColor, 0.0, 1.0);

  gl_FragColor = vec4(fogColor, 1.0);
}
