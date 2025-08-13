// WebGPU Typography Distortion Shaders - WGSL
// Advanced text rendering with GPU-accelerated effects
// Veritron AI Agency - Progressive Enhancement Typography System

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @location(2) worldPos: vec2<f32>,
}

struct TypographyUniforms {
  time: f32,
  mouseX: f32,
  mouseY: f32,
  screenWidth: f32,
  screenHeight: f32,
  distortionStrength: f32,
  waveAmplitude: f32,
  waveFrequency: f32,
  rippleStrength: f32,
  hoverRadius: f32,
  glowIntensity: f32,
  colorShift: f32,
}

struct GlyphData {
  position: vec2<f32>,
  size: vec2<f32>,
  uvOffset: vec2<f32>,
  uvSize: vec2<f32>,
  color: vec4<f32>,
  distortionWeight: f32,
  animationPhase: f32,
}

@group(0) @binding(0) var<uniform> uniforms: TypographyUniforms;
@group(0) @binding(1) var<storage, read> glyphs: array<GlyphData>;
@group(0) @binding(2) var textAtlas: texture_2d<f32>;
@group(0) @binding(3) var textSampler: sampler;

// Advanced noise functions for text distortion
fn random(seed: vec2<f32>) -> f32 {
  return fract(sin(dot(seed, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn noise2D(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  
  let a = random(i);
  let b = random(i + vec2<f32>(1.0, 0.0));
  let c = random(i + vec2<f32>(0.0, 1.0));
  let d = random(i + vec2<f32>(1.0, 1.0));
  
  let u = f * f * (3.0 - 2.0 * f);
  
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

fn fbm(p: vec2<f32>) -> f32 {
  var value = 0.0;
  var amplitude = 0.5;
  var frequency = 1.0;
  
  for (var i = 0; i < 6; i++) {
    value += amplitude * noise2D(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// Sophisticated distortion function for typography
fn calculateDistortion(worldPos: vec2<f32>, time: f32) -> vec2<f32> {
  var distortion = vec2<f32>(0.0);
  
  // Mouse interaction ripple effect
  let mousePos = vec2<f32>(uniforms.mouseX, uniforms.mouseY);
  let toMouse = worldPos - mousePos;
  let mouseDistance = length(toMouse);
  
  if (mouseDistance < uniforms.hoverRadius) {
    let influence = 1.0 - smoothstep(0.0, uniforms.hoverRadius, mouseDistance);
    let ripple = sin(mouseDistance * 10.0 - time * 8.0) * influence;
    distortion += normalize(toMouse) * ripple * uniforms.rippleStrength;
  }
  
  // Wave distortion
  let wave = sin(worldPos.x * uniforms.waveFrequency + time) * 
             cos(worldPos.y * uniforms.waveFrequency * 0.7 + time * 0.8);
  distortion.y += wave * uniforms.waveAmplitude;
  
  // Noise-based organic distortion
  let noisePos = worldPos * 2.0 + vec2<f32>(time * 0.1, time * 0.15);
  let organic = fbm(noisePos) - 0.5;
  distortion += vec2<f32>(organic * 0.02, organic * 0.015) * uniforms.distortionStrength;
  
  // Breathing effect for text
  let breathe = sin(time * 2.0) * 0.002;
  distortion += vec2<f32>(breathe, breathe * 0.5);
  
  return distortion;
}

// Color shifting based on position and time
fn calculateColorShift(worldPos: vec2<f32>, baseColor: vec4<f32>, time: f32) -> vec4<f32> {
  var color = baseColor;
  
  // Prismatic color shift
  let shift = sin(worldPos.x * 8.0 + time) * uniforms.colorShift;
  color.r = clamp(color.r + shift * 0.1, 0.0, 1.0);
  color.g = clamp(color.g + sin(shift + 2.094) * 0.1, 0.0, 1.0);  // 120 degrees
  color.b = clamp(color.b + sin(shift + 4.188) * 0.1, 0.0, 1.0);  // 240 degrees
  
  // Glow enhancement near mouse
  let mousePos = vec2<f32>(uniforms.mouseX, uniforms.mouseY);
  let mouseDistance = length(worldPos - mousePos);
  let glowFactor = 1.0 + exp(-mouseDistance * 5.0) * uniforms.glowIntensity;
  color.rgb *= glowFactor;
  
  return color;
}

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) instanceIndex: u32) -> VertexOutput {
  let glyph = glyphs[instanceIndex];
  
  // Quad vertices (two triangles forming a rectangle)
  var vertices = array<vec2<f32>, 6>(
    vec2<f32>(0.0, 0.0), // Bottom-left
    vec2<f32>(1.0, 0.0), // Bottom-right
    vec2<f32>(0.0, 1.0), // Top-left
    vec2<f32>(1.0, 0.0), // Bottom-right
    vec2<f32>(1.0, 1.0), // Top-right
    vec2<f32>(0.0, 1.0)  // Top-left
  );
  
  let vertex = vertices[vertexIndex];
  
  // Calculate world position
  let worldPos = glyph.position + vertex * glyph.size;
  
  // Apply sophisticated distortion
  let distortedPos = worldPos + calculateDistortion(worldPos, uniforms.time + glyph.animationPhase);
  
  // Convert to clip space
  let clipPos = vec2<f32>(
    (distortedPos.x / uniforms.screenWidth) * 2.0 - 1.0,
    -((distortedPos.y / uniforms.screenHeight) * 2.0 - 1.0)
  );
  
  // Calculate UV coordinates for texture atlas
  let uv = glyph.uvOffset + vertex * glyph.uvSize;
  
  var output: VertexOutput;
  output.position = vec4<f32>(clipPos, 0.0, 1.0);
  output.uv = uv;
  output.color = calculateColorShift(worldPos, glyph.color, uniforms.time);
  output.worldPos = worldPos;
  
  return output;
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
  // Sample the text texture
  var texColor = textureSample(textAtlas, textSampler, input.uv);
  
  // Skip transparent pixels
  if (texColor.a < 0.01) {
    discard;
  }
  
  // Apply base color
  var finalColor = input.color * texColor;
  
  // Add subtle gradient based on position
  let gradient = smoothstep(0.0, 1.0, input.worldPos.y / uniforms.screenHeight);
  finalColor.rgb *= 0.8 + gradient * 0.4;
  
  // Enhanced edge detection for crisp text rendering
  let edge = 1.0 - smoothstep(0.4, 0.6, texColor.a);
  finalColor.a *= 1.0 - edge * 0.2;
  
  // Add subtle glow effect
  let glowFactor = smoothstep(0.3, 0.7, texColor.a);
  finalColor.rgb += glowFactor * uniforms.glowIntensity * 0.1;
  
  // Anti-aliasing enhancement
  let antialias = fwidth(texColor.a) * 0.5;
  finalColor.a = smoothstep(0.5 - antialias, 0.5 + antialias, texColor.a);
  
  return finalColor;
}

// Compute shader for advanced text layout and effects
struct LayoutParams {
  textLength: u32,
  fontSize: f32,
  lineHeight: f32,
  letterSpacing: f32,
  containerWidth: f32,
  containerHeight: f32,
  alignmentMode: u32, // 0=left, 1=center, 2=right, 3=justify
  animationTime: f32,
}

@group(1) @binding(0) var<uniform> layoutParams: LayoutParams;
@group(1) @binding(1) var<storage, read_write> glyphLayout: array<GlyphData>;
@group(1) @binding(2) var<storage, read> fontMetrics: array<vec4<f32>>; // x=advance, y=bearing, z=width, w=height

@compute @workgroup_size(64)
fn layout_compute(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  if (index >= layoutParams.textLength) {
    return;
  }
  
  var glyph = glyphLayout[index];
  let metrics = fontMetrics[index];
  
  // Calculate position with advanced typography features
  var x = f32(index) * (metrics.x + layoutParams.letterSpacing); // Basic advance
  let y = 0.0; // Base line
  
  // Apply kerning and optical adjustments
  if (index > 0) {
    let prevMetrics = fontMetrics[index - 1];
    let kerning = (prevMetrics.z + metrics.z) * -0.1; // Simple kerning approximation
    x += kerning;
  }
  
  // Word wrapping
  if (x + metrics.z > layoutParams.containerWidth) {
    // Move to next line (simplified)
    x = 0.0;
    // y would be adjusted for line breaks
  }
  
  // Animation effects
  let animOffset = sin(layoutParams.animationTime + f32(index) * 0.1) * 2.0;
  
  // Store computed layout
  glyph.position = vec2<f32>(x, y + animOffset);
  glyph.size = vec2<f32>(metrics.z * layoutParams.fontSize, metrics.w * layoutParams.fontSize);
  glyph.animationPhase = f32(index) * 0.2;
  glyph.distortionWeight = 1.0;
  
  glyphLayout[index] = glyph;
}