/**
 * GPU Adapter Detection and Feature Support Utility
 * Provides comprehensive WebGPU capability testing with fallback mechanisms
 * 
 * Core Features:
 * - WebGPU adapter detection with power preference optimization  
 * - Feature availability checking (compute shaders, texture compression)
 * - Device limits validation for typography workloads
 * - Graceful degradation chain: WebGPU → WebGL2 → Canvas2D
 * - Performance-aware adapter selection
 * - Memory usage monitoring and limits enforcement
 */

import { trackCustomMetric, globalMetricsAggregator } from './performance';

// GPU capabilities interface
export interface GPUCapabilities {
  webgpu: boolean;
  webgl2: boolean;
  canvas2d: boolean;
  adapterInfo?: GPUAdapterInfo;
  deviceLimits?: Required<GPULimits>;
  supportedFeatures?: string[];
  memoryInfo?: {
    totalMemory?: number;
    availableMemory?: number;
    usedMemory?: number;
  };
}

// Typography-specific GPU requirements
export const TYPOGRAPHY_REQUIREMENTS = {
  minBufferSize: 64 * 1024 * 1024, // 64MB for text geometry
  minWorkgroupSize: 256,
  minStorageBufferSize: 32 * 1024 * 1024, // 32MB for glyph atlas
  minTextureSize: 2048,
  preferredFeatures: [
    'texture-compression-bc',
    'texture-compression-etc2',
    'texture-compression-astc',
    'timestamp-query'
  ] as GPUFeatureName[],
} as const;

// Performance thresholds for typography rendering
export const TYPOGRAPHY_PERFORMANCE_TARGETS = {
  targetFPS: 120,
  minimumFPS: 30,
  maxFrameTime: 8.33, // ms (120fps)
  budgetFrameTime: 16.67, // ms (60fps) 
  maxMemoryUsage: 256 * 1024 * 1024, // 256MB
} as const;

// Frame budget monitor for typography effects
class FrameBudgetMonitor {
  private frameHistory: number[] = [];
  private memoryHistory: number[] = [];
  private readonly historySize = 120; // 2 seconds at 60fps
  private lastFrameTime = performance.now();

  recordFrame(): number {
    const now = performance.now();
    const frameTime = now - this.lastFrameTime;
    
    this.frameHistory.push(frameTime);
    if (this.frameHistory.length > this.historySize) {
      this.frameHistory.shift();
    }
    
    this.lastFrameTime = now;
    return frameTime;
  }

  recordMemoryUsage(bytes: number): void {
    this.memoryHistory.push(bytes);
    if (this.memoryHistory.length > this.historySize) {
      this.memoryHistory.shift();
    }
  }

  getMetrics() {
    const frames = this.frameHistory;
    const memory = this.memoryHistory;
    
    if (frames.length === 0) {
      return {
        fps: 0,
        averageFrameTime: 0,
        maxFrameTime: 0,
        droppedFrames: 0,
        memoryUsage: 0,
        peakMemory: 0,
      };
    }

    const avgFrameTime = frames.reduce((a, b) => a + b, 0) / frames.length;
    const fps = Math.round(1000 / avgFrameTime);
    const maxFrameTime = Math.max(...frames);
    const droppedFrames = frames.filter(t => t > TYPOGRAPHY_PERFORMANCE_TARGETS.budgetFrameTime).length;
    
    const currentMemory = memory.length > 0 ? memory[memory.length - 1] : 0;
    const peakMemory = memory.length > 0 ? Math.max(...memory) : 0;

    return {
      fps,
      averageFrameTime: avgFrameTime,
      maxFrameTime,
      droppedFrames,
      memoryUsage: currentMemory,
      peakMemory,
    };
  }

  shouldReduceQuality(): boolean {
    const metrics = this.getMetrics();
    return (
      metrics.fps < TYPOGRAPHY_PERFORMANCE_TARGETS.minimumFPS ||
      metrics.averageFrameTime > TYPOGRAPHY_PERFORMANCE_TARGETS.budgetFrameTime ||
      metrics.memoryUsage > TYPOGRAPHY_PERFORMANCE_TARGETS.maxMemoryUsage
    );
  }

  shouldKillFeature(): boolean {
    const metrics = this.getMetrics();
    return (
      metrics.fps < 15 ||
      metrics.averageFrameTime > 50 || // 20fps threshold
      metrics.droppedFrames > 60 // More than half the frames dropped
    );
  }

  reset(): void {
    this.frameHistory = [];
    this.memoryHistory = [];
    this.lastFrameTime = performance.now();
  }
}

// Global frame budget monitor instance
export const frameBudgetMonitor = new FrameBudgetMonitor();

/**
 * Comprehensive WebGPU adapter detection with fallbacks
 */
export async function detectGPUCapabilities(): Promise<GPUCapabilities> {
  const capabilities: GPUCapabilities = {
    webgpu: false,
    webgl2: false,
    canvas2d: true, // Always available in modern browsers
  };

  // Track detection timing
  const startTime = performance.now();

  try {
    // Test WebGPU support
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
        forceFallbackAdapter: false,
      });

      if (adapter) {
        capabilities.webgpu = true;
        capabilities.adapterInfo = await adapter.requestAdapterInfo();
        capabilities.supportedFeatures = Array.from(adapter.features);

        // Test device creation with typography requirements
        try {
          const requiredFeatures: GPUFeatureName[] = [];
          for (const feature of TYPOGRAPHY_REQUIREMENTS.preferredFeatures) {
            if (adapter.features.has(feature)) {
              requiredFeatures.push(feature);
            }
          }

          const device = await adapter.requestDevice({
            requiredFeatures,
            requiredLimits: {
              maxBufferSize: Math.min(
                adapter.limits.maxBufferSize,
                TYPOGRAPHY_REQUIREMENTS.minBufferSize * 2
              ),
              maxStorageBufferBindingSize: Math.min(
                adapter.limits.maxStorageBufferBindingSize,
                TYPOGRAPHY_REQUIREMENTS.minStorageBufferSize * 2
              ),
              maxComputeWorkgroupStorageSize: Math.min(
                adapter.limits.maxComputeWorkgroupStorageSize,
                32 * 1024
              ),
            },
          });

          capabilities.deviceLimits = device.limits as Required<GPULimits>;
          
          // Clean up test device
          device.destroy();
          
          trackCustomMetric('webgpu-detection-success', performance.now() - startTime);
        } catch (deviceError) {
          console.warn('WebGPU device creation failed:', deviceError);
          capabilities.webgpu = false;
          trackCustomMetric('webgpu-device-creation-failed', performance.now() - startTime);
        }
      } else {
        trackCustomMetric('webgpu-no-adapter', performance.now() - startTime);
      }
    }
  } catch (webgpuError) {
    console.warn('WebGPU detection failed:', webgpuError);
    trackCustomMetric('webgpu-detection-failed', performance.now() - startTime);
  }

  // Test WebGL2 support
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { 
      powerPreference: 'high-performance',
      antialias: true,
    });
    
    if (gl) {
      capabilities.webgl2 = true;
      
      // Check WebGL2 extensions relevant for typography
      const extensions = [
        'EXT_color_buffer_float',
        'EXT_texture_filter_anisotropic',
        'OES_texture_float_linear',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_etc',
      ];
      
      const supportedExtensions = extensions.filter(ext => gl.getExtension(ext));
      trackCustomMetric('webgl2-extensions-supported', supportedExtensions.length);
    }
    
    canvas.remove();
  } catch (webgl2Error) {
    console.warn('WebGL2 detection failed:', webgl2Error);
    capabilities.webgl2 = false;
  }

  // Detect memory information if available
  try {
    const memoryInfo = (navigator as any).deviceMemory;
    if (memoryInfo) {
      capabilities.memoryInfo = {
        totalMemory: memoryInfo * 1024 * 1024 * 1024, // Convert GB to bytes
      };
    }

    // WebGL memory info extension
    if (capabilities.webgl2) {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          trackCustomMetric('gpu-renderer-detected', renderer ? 1 : 0);
        }
      }
      canvas.remove();
    }
  } catch (memoryError) {
    // Memory detection is optional
  }

  const detectionTime = performance.now() - startTime;
  trackCustomMetric('gpu-capabilities-detection-time', detectionTime);
  
  // Add capabilities to global metrics for monitoring
  globalMetricsAggregator.addMetric('gpu-webgpu-support', capabilities.webgpu ? 1 : 0);
  globalMetricsAggregator.addMetric('gpu-webgl2-support', capabilities.webgl2 ? 1 : 0);

  return capabilities;
}

/**
 * Check if GPU meets minimum requirements for typography features
 */
export function meetsTypographyRequirements(capabilities: GPUCapabilities): boolean {
  if (!capabilities.webgpu || !capabilities.deviceLimits) {
    return false;
  }

  const limits = capabilities.deviceLimits;
  
  return (
    limits.maxBufferSize >= TYPOGRAPHY_REQUIREMENTS.minBufferSize &&
    limits.maxComputeWorkgroupStorageSize >= TYPOGRAPHY_REQUIREMENTS.minWorkgroupSize &&
    limits.maxStorageBufferBindingSize >= TYPOGRAPHY_REQUIREMENTS.minStorageBufferSize &&
    limits.maxTexture2DSize >= TYPOGRAPHY_REQUIREMENTS.minTextureSize
  );
}

/**
 * Get recommended rendering mode based on capabilities and performance
 */
export function getRecommendedRenderingMode(capabilities: GPUCapabilities): 'webgpu' | 'webgl2' | 'canvas2d' {
  // Check frame budget before recommending GPU acceleration
  if (frameBudgetMonitor.shouldKillFeature()) {
    return 'canvas2d';
  }

  if (capabilities.webgpu && meetsTypographyRequirements(capabilities)) {
    return 'webgpu';
  }

  if (capabilities.webgl2) {
    return 'webgl2';
  }

  return 'canvas2d';
}

/**
 * Performance-aware quality level adjustment
 */
export function getQualityLevel(): 'high' | 'medium' | 'low' {
  const metrics = frameBudgetMonitor.getMetrics();
  
  if (metrics.fps >= TYPOGRAPHY_PERFORMANCE_TARGETS.targetFPS && 
      metrics.averageFrameTime <= TYPOGRAPHY_PERFORMANCE_TARGETS.maxFrameTime) {
    return 'high';
  }
  
  if (metrics.fps >= TYPOGRAPHY_PERFORMANCE_TARGETS.minimumFPS && 
      !frameBudgetMonitor.shouldReduceQuality()) {
    return 'medium';
  }
  
  return 'low';
}

/**
 * Typography-specific feature detection
 */
export interface TypographyFeatures {
  computeShaders: boolean;
  textureCompression: boolean;
  floatTextures: boolean;
  highPrecisionFloat: boolean;
  timestampQueries: boolean;
  multisampling: boolean;
}

export function detectTypographyFeatures(capabilities: GPUCapabilities): TypographyFeatures {
  const features: TypographyFeatures = {
    computeShaders: false,
    textureCompression: false,
    floatTextures: false,
    highPrecisionFloat: false,
    timestampQueries: false,
    multisampling: false,
  };

  if (capabilities.webgpu && capabilities.supportedFeatures) {
    features.computeShaders = true; // WebGPU always supports compute shaders
    features.textureCompression = TYPOGRAPHY_REQUIREMENTS.preferredFeatures.some(
      feature => capabilities.supportedFeatures!.includes(feature)
    );
    features.timestampQueries = capabilities.supportedFeatures.includes('timestamp-query');
    features.highPrecisionFloat = true; // WebGPU has consistent float precision
    features.floatTextures = true; // WebGPU supports float textures by default
    features.multisampling = true; // WebGPU supports MSAA
  } else if (capabilities.webgl2) {
    // WebGL2 feature detection would go here
    features.floatTextures = true; // WebGL2 supports float textures
    features.highPrecisionFloat = true; // Generally true for WebGL2
  }

  return features;
}

/**
 * Create safe GPU context with automatic cleanup
 */
export class SafeGPUContext {
  private device: GPUDevice | null = null;
  private buffers: Set<GPUBuffer> = new Set();
  private textures: Set<GPUTexture> = new Set();
  private isDestroyed = false;

  async initialize(capabilities: GPUCapabilities): Promise<boolean> {
    if (!capabilities.webgpu) {
      return false;
    }

    try {
      const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
      });

      if (!adapter) {
        return false;
      }

      this.device = await adapter.requestDevice({
        requiredLimits: {
          maxBufferSize: Math.min(
            adapter.limits.maxBufferSize,
            TYPOGRAPHY_REQUIREMENTS.minBufferSize * 2
          ),
        },
      });

      // Monitor uncaptured errors
      this.device.addEventListener('uncapturederror', (event) => {
        console.error('WebGPU uncaptured error:', event.error);
        trackCustomMetric('webgpu-uncaptured-error', 1);
      });

      return true;
    } catch (error) {
      console.error('Safe GPU context initialization failed:', error);
      return false;
    }
  }

  getDevice(): GPUDevice | null {
    return this.device;
  }

  trackBuffer(buffer: GPUBuffer): GPUBuffer {
    if (!this.isDestroyed) {
      this.buffers.add(buffer);
    }
    return buffer;
  }

  trackTexture(texture: GPUTexture): GPUTexture {
    if (!this.isDestroyed) {
      this.textures.add(texture);
    }
    return texture;
  }

  destroy(): void {
    if (this.isDestroyed) {
      return;
    }

    // Clean up all tracked resources
    this.buffers.forEach(buffer => {
      try {
        buffer.destroy();
      } catch (e) {
        // Buffer may already be destroyed
      }
    });

    this.textures.forEach(texture => {
      try {
        texture.destroy();
      } catch (e) {
        // Texture may already be destroyed  
      }
    });

    if (this.device) {
      this.device.destroy();
    }

    this.buffers.clear();
    this.textures.clear();
    this.isDestroyed = true;
  }
}

/**
 * Typography-specific performance monitoring
 */
export function monitorTypographyPerformance(renderingMode: string): void {
  let frameCount = 0;
  let lastLogTime = performance.now();

  const monitor = () => {
    frameCount++;
    const frameTime = frameBudgetMonitor.recordFrame();
    
    // Log performance every 5 seconds
    const now = performance.now();
    if (now - lastLogTime > 5000) {
      const metrics = frameBudgetMonitor.getMetrics();
      
      trackCustomMetric(`typography-${renderingMode}-fps`, metrics.fps);
      trackCustomMetric(`typography-${renderingMode}-frame-time`, metrics.averageFrameTime);
      trackCustomMetric(`typography-${renderingMode}-memory`, metrics.memoryUsage);
      
      console.log(`[Typography ${renderingMode.toUpperCase()}] Performance:`, {
        fps: metrics.fps,
        frameTime: `${metrics.averageFrameTime.toFixed(2)}ms`,
        quality: getQualityLevel(),
      });
      
      lastLogTime = now;
    }

    requestAnimationFrame(monitor);
  };

  requestAnimationFrame(monitor);
}

// Global GPU capabilities cache
let cachedCapabilities: GPUCapabilities | null = null;

/**
 * Get GPU capabilities with caching
 */
export async function getGPUCapabilities(): Promise<GPUCapabilities> {
  if (cachedCapabilities === null) {
    cachedCapabilities = await detectGPUCapabilities();
  }
  return cachedCapabilities;
}

/**
 * Reset GPU capabilities cache (useful for testing)
 */
export function resetGPUCapabilitiesCache(): void {
  cachedCapabilities = null;
}