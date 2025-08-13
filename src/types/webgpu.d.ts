/**
 * TypeScript declarations for WebGPU and WGSL shader imports
 * Veritron AI Agency - 2025 Implementation
 */

// WGSL shader module declarations for Vite
declare module '*.wgsl' {
  const content: string;
  export default content;
}

declare module '*.wgsl?raw' {
  const content: string;
  export default content;
}

// Extended WebGPU type declarations for better TypeScript support
declare global {
  interface Navigator {
    gpu?: GPU;
  }
}

// WebGPU Canvas Context extensions
interface HTMLCanvasElement {
  getContext(contextId: 'webgpu'): GPUCanvasContext | null;
}

// Additional WebGPU types that may not be fully covered
interface GPUAdapterInfo {
  vendor: string;
  architecture: string;
  device: string;
  description: string;
}

// Typography-specific WebGPU extensions
interface TypographyGPUCapabilities {
  supportsCompute: boolean;
  supportsTimestamps: boolean;
  supportsTextureCompression: boolean;
  maxBufferSize: number;
  maxTextureSize: number;
  maxComputeWorkgroupSize: number;
}

// Performance monitoring types
interface TypographyPerformanceMetrics {
  renderingMode: 'webgpu' | 'webgl2' | 'canvas2d';
  fps: number;
  frameTime: number;
  qualityLevel: 'high' | 'medium' | 'low';
  glyphCount: number;
  memoryUsage: number;
  adapterInfo?: GPUAdapterInfo;
}

// Shader uniform structures
interface TypographyUniforms {
  time: number;
  mouseX: number;
  mouseY: number;
  screenWidth: number;
  screenHeight: number;
  distortionStrength: number;
  waveAmplitude: number;
  waveFrequency: number;
  rippleStrength: number;
  hoverRadius: number;
  glowIntensity: number;
  colorShift: number;
}

interface GlyphData {
  position: [number, number];
  size: [number, number];
  uvOffset: [number, number];
  uvSize: [number, number];
  color: [number, number, number, number];
  distortionWeight: number;
  animationPhase: number;
}

export {
  TypographyGPUCapabilities,
  TypographyPerformanceMetrics,
  TypographyUniforms,
  GlyphData,
};