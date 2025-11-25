/**
 * GPGPU Position Update Shader v18
 * Updates particle positions based on velocity and handles respawning
 */

uniform float u_time;
uniform float u_delta;
uniform sampler2D u_edgeMask;
uniform vec2 u_handPosition;
uniform float u_handScale;

// Hash function for pseudo-random respawn
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 hash2(vec2 p) {
    return vec2(
        fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453),
        fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453)
    );
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Read current position (xyz) and age (w)
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    // Update age
    float age = pos.w + u_delta;

    // Check if particle should respawn
    bool shouldRespawn = age > 5.0 ||
                         pos.x < -2.0 || pos.x > 2.0 ||
                         pos.y < -2.0 || pos.y > 2.0;

    if (shouldRespawn) {
        // Generate random spawn position from edge mask
        vec2 randSeed = uv + vec2(u_time * 0.1);
        vec2 spawnUv = hash2(randSeed);

        // Sample edge mask to find dissolving areas
        float edgeStrength = texture2D(u_edgeMask, spawnUv).r;

        // Spawn at edges with high dissolution activity
        // Convert UV to world position
        vec2 worldPos = (spawnUv - 0.5) * 2.0 * u_handScale + u_handPosition;

        // Add some random offset
        vec2 offset = (hash2(randSeed + vec2(0.5)) - 0.5) * 0.1;

        pos.x = worldPos.x + offset.x;
        pos.y = worldPos.y + offset.y;
        pos.z = 0.0;
        age = hash(randSeed) * 0.5; // Slight age variation at spawn
    } else {
        // Apply velocity
        pos.xyz += vel.xyz * u_delta;
    }

    // Store updated position and age
    pos.w = age;

    gl_FragColor = pos;
}
