precision highp float;

/*
 * ═══════════════════════════════════════════════════════════════════
 * V22: LUMINOUS HAND - Wisps Shader (COMPREHENSIVE FIX)
 * ═══════════════════════════════════════════════════════════════════
 *
 * FIXES APPLIED:
 * 1. Aspect ratio: * scale (expand) not / scale (compress)
 * 2. Ridged FBM: Sharp ridge with n*n and prev connection
 * 3. Edge bleed: Wisps EMANATE from edges, not just AT edges
 * 4. Depth brightness: Brighter near hand surface
 *
 * Debug modes:
 *   0 = Normal output
 *   1 = Edge detection only
 *   2 = FBM noise only
 *   3 = Depth map only
 * ═══════════════════════════════════════════════════════════════════
 */

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;

uniform sampler2D u_depthMap;
uniform float u_imageAspect;  // depth map width/height

uniform float u_wispIntensity;
uniform float u_wispScale;
uniform float u_wispWarp;
uniform float u_wispEdgeConcentration;
uniform float u_debugMode;

// === HASH ===
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// === VALUE NOISE ===
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// === STANDARD FBM (for domain warping) ===
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

// === IMPROVED RIDGED FBM (sharp tendrils, not clouds) ===
float ridgedFbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float prev = 1.0;

    for (int i = 0; i < 5; i++) {
        // Sharp ridge: fold noise and invert
        float n = 1.0 - abs(noise(p) * 2.0 - 1.0);
        // Sharpen further by squaring
        n = n * n;
        // Connect ridges by weighting with previous
        n *= prev;
        prev = n;

        value += n * amplitude;
        p *= 2.2;
        amplitude *= 0.5;
    }

    return value;
}

// === ASPECT RATIO CORRECTION (FIXED: * scale not / scale) ===
vec2 getAspectCorrectedUV(vec2 uv) {
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageAspect;

    vec2 correctedUV = uv;

    if (screenAspect > imageAspect) {
        // Screen wider than image - fit height, center horizontally
        // EXPAND UVs horizontally so image content fills less of screen
        float scale = screenAspect / imageAspect;
        correctedUV.x = (uv.x - 0.5) * scale + 0.5;
    } else {
        // Screen taller than image - fit width, center vertically
        // EXPAND UVs vertically so image content fills less of screen
        float scale = imageAspect / screenAspect;
        correctedUV.y = (uv.y - 0.5) * scale + 0.5;
    }

    return correctedUV;
}

// === WISP GENERATION (with edge bleed and depth brightness) ===
float getWisps(vec2 uv, float edge, float depth) {
    // Domain warp for organic shape (use ridgedFbm for more interesting warp)
    vec2 warp = vec2(
        ridgedFbm(uv * 2.0 + vec2(100.0, 0.0) + u_time * 0.02),
        ridgedFbm(uv * 2.0 + vec2(0.0, 100.0) + u_time * 0.015)
    );
    vec2 warpedUV = uv + warp * u_wispWarp;

    // Generate tendril pattern
    float wispPattern = ridgedFbm(warpedUV * u_wispScale);

    // KEY FIX: edgeBleed allows wisps to exist NEAR edges, not just AT edges
    // This creates the "emanating" effect rather than just edge glow
    float edgeBleed = smoothstep(0.0, 0.15, edge);

    // Combine pattern with edge mask
    float wisp = wispPattern * edgeBleed;

    // Threshold to make distinct tendrils
    wisp = smoothstep(0.15, 0.5, wisp);

    // Depth influence: brighter near hand surface, fading into void
    float depthBoost = smoothstep(0.0, 0.4, depth);
    wisp *= (0.3 + depthBoost * 0.7);

    return wisp * u_wispIntensity;
}

// === MAIN ===
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // === STEP 1: Correct aspect ratio for depth map ===
    vec2 depthUV = getAspectCorrectedUV(uv);

    // Flip X for hand orientation
    depthUV.x = 1.0 - depthUV.x;

    // Early discard if outside bounds (pure black)
    if (depthUV.x < 0.0 || depthUV.x > 1.0 || depthUV.y < 0.0 || depthUV.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    // Sample depth
    float depth = texture2D(u_depthMap, depthUV).r;

    // === STEP 2: Calculate edge (where depth CHANGES) ===
    float edge = fwidth(depth);
    edge *= u_wispEdgeConcentration;

    // === DEBUG MODES ===
    if (u_debugMode > 0.5 && u_debugMode < 1.5) {
        // Debug 1: Edge detection only
        gl_FragColor = vec4(vec3(edge), 1.0);
        return;
    }

    if (u_debugMode > 1.5 && u_debugMode < 2.5) {
        // Debug 2: Ridged FBM noise only
        float wispPattern = ridgedFbm(uv * u_wispScale);
        gl_FragColor = vec4(vec3(wispPattern), 1.0);
        return;
    }

    if (u_debugMode > 2.5 && u_debugMode < 3.5) {
        // Debug 3: Depth map only (with aspect correction)
        gl_FragColor = vec4(vec3(depth), 1.0);
        return;
    }

    // === STEP 3: Generate wisps with all improvements ===
    float wisp = getWisps(uv, edge, depth);

    // === NORMAL OUTPUT ===
    gl_FragColor = vec4(vec3(wisp), 1.0);
}
