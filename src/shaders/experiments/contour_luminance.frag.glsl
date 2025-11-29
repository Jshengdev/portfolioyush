precision highp float;

/**
 * V21 - Luminance Contour Lines
 *
 * Renders an image as horizontal contour lines where line density/spacing
 * is driven by image luminance. Brighter areas = denser lines,
 * darker areas = sparser lines.
 *
 * The lines wrap around the form's volume, creating a topographic feel.
 * Clean, crisp, graphic style - black background, white lines.
 *
 * TECHNIQUE:
 * - Sample image luminance
 * - Create horizontal lines at regular intervals
 * - Modulate line visibility/thickness based on local luminance
 * - Apply anti-aliasing for crisp output
 */

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_handTexture;

// Line parameters
uniform float u_lineCount;        // Base number of horizontal lines (60-200)
uniform float u_lineThickness;    // Line thickness (0.5-3.0)
uniform float u_densityPower;     // How strongly luminance affects density (1.0-4.0)
uniform float u_minSpacing;       // Minimum line spacing in dark areas (0.0-1.0)
uniform float u_waveAmount;       // Amount of wave distortion along lines (0.0-1.0)
uniform float u_waveFrequency;    // Frequency of wave distortion (1.0-10.0)

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Convert RGB to luminance (perceptual weighting)
float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

// Smooth step for anti-aliasing
float aastep(float threshold, float value, float width) {
    return smoothstep(threshold - width, threshold + width, value);
}

// Simple noise for subtle variation
float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float n = i.x + i.y * 57.0;
    return mix(
        mix(hash(n), hash(n + 1.0), f.x),
        mix(hash(n + 57.0), hash(n + 58.0), f.x),
        f.y
    );
}

// ============================================
// MAIN
// ============================================

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Maintain aspect ratio for the hand texture
    vec2 texUV = uv;
    float aspectRatio = u_resolution.x / u_resolution.y;

    // Center and scale the texture appropriately
    // Flip horizontally to match other experiments
    texUV.x = 1.0 - texUV.x;

    // Sample the hand texture
    vec4 texColor = texture2D(u_handTexture, texUV);
    float luminance = getLuminance(texColor.rgb);

    // Create a mask for the hand (non-black areas)
    float handMask = smoothstep(0.02, 0.08, luminance);

    // ========================================
    // LUMINANCE-DRIVEN LINE DENSITY
    // ========================================

    // The key insight: denser lines in bright areas, sparser in dark
    // We achieve this by varying the effective "y" position based on luminance

    // Base line frequency
    float baseFreq = u_lineCount;

    // Sample luminance in a small neighborhood for smoother density transitions
    float lumLeft = getLuminance(texture2D(u_handTexture, texUV + vec2(-0.01, 0.0)).rgb);
    float lumRight = getLuminance(texture2D(u_handTexture, texUV + vec2(0.01, 0.0)).rgb);
    float lumUp = getLuminance(texture2D(u_handTexture, texUV + vec2(0.0, 0.01)).rgb);
    float lumDown = getLuminance(texture2D(u_handTexture, texUV + vec2(0.0, -0.01)).rgb);
    float avgLuminance = (luminance + lumLeft + lumRight + lumUp + lumDown) / 5.0;

    // Density multiplier: higher luminance = higher density (more lines)
    // Use power function to control the relationship
    float densityMult = pow(avgLuminance, 1.0 / u_densityPower);

    // Minimum spacing in dark areas (prevents infinite spacing)
    densityMult = mix(u_minSpacing, 1.0, densityMult);

    // ========================================
    // WAVE DISTORTION (form-wrapping effect)
    // ========================================

    // Add subtle wave to make lines feel like they wrap around the form
    // Wave amplitude is modulated by luminance (more on brighter/closer areas)
    float waveAmp = u_waveAmount * 0.02 * avgLuminance;
    float wave = sin(uv.x * u_waveFrequency * 3.14159 * 2.0 + u_time * 0.3) * waveAmp;

    // Subtle noise-based variation
    float noiseOffset = (noise(uv * 100.0) - 0.5) * 0.003 * avgLuminance;

    // ========================================
    // LINE CALCULATION
    // ========================================

    // Adjusted y position for line calculation
    float adjustedY = uv.y + wave + noiseOffset;

    // Scale y by density to create variable spacing
    // In bright areas, lines are closer together
    // In dark areas, lines are farther apart
    float scaledY = adjustedY * baseFreq * densityMult;

    // Get fractional part to create repeating line pattern
    float linePhase = fract(scaledY);

    // Create crisp line using smoothstep for anti-aliasing
    // Line is drawn when linePhase is near 0 or 1
    float aaWidth = fwidth(scaledY) * u_lineThickness;
    float halfThickness = u_lineThickness * 0.02;

    // Create the line - bright at center, fading at edges
    float line = 1.0 - aastep(halfThickness, linePhase, aaWidth);
    line = max(line, aastep(1.0 - halfThickness, linePhase, aaWidth));

    // Apply luminance-based line intensity
    // Lines are brighter where the hand is brighter
    float lineIntensity = line * smoothstep(0.0, 0.3, avgLuminance);

    // ========================================
    // EDGE ENHANCEMENT
    // ========================================

    // Detect edges using luminance gradient
    float gradX = abs(lumRight - lumLeft);
    float gradY = abs(lumUp - lumDown);
    float edge = length(vec2(gradX, gradY)) * 10.0;
    edge = smoothstep(0.1, 0.5, edge);

    // Slightly thicken lines near edges for better form definition
    lineIntensity += edge * line * 0.3;

    // ========================================
    // FINAL COMPOSITION
    // ========================================

    // Apply hand mask - only show lines where hand exists
    float finalIntensity = lineIntensity * handMask;

    // Clamp and apply slight gamma for better contrast
    finalIntensity = clamp(finalIntensity, 0.0, 1.0);
    finalIntensity = pow(finalIntensity, 0.9);

    // Output: white lines on black background
    vec3 lineColor = vec3(1.0); // Pure white
    vec3 bgColor = vec3(0.0);   // Pure black

    vec3 finalColor = mix(bgColor, lineColor, finalIntensity);

    gl_FragColor = vec4(finalColor, 1.0);
}
