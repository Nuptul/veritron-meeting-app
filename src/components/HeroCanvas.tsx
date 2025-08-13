import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebGPURenderer, WebGL2Fallback } from '../gpu/WebGPURenderer';

interface HeroCanvasProps {
  className?: string;
  particleCount?: number;
  showMetrics?: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  className = '',
  particleCount = 10000,
  showMetrics = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGPURenderer | WebGL2Fallback | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isWebGPU, setIsWebGPU] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 0,
    particleCount: 0,
    lodLevel: 0,
    frameTime: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const initRenderer = async () => {
      // Try WebGPU first
      const webGPURenderer = new WebGPURenderer({
        canvas: canvasRef.current!,
        particleCount,
        enableLOD: true,
      });

      const webGPUSupported = await webGPURenderer.init();

      if (webGPUSupported) {
        rendererRef.current = webGPURenderer;
        setIsWebGPU(true);
        setIsInitialized(true);
        webGPURenderer.start();
      } else {
        // Fall back to WebGL2
        console.log('Falling back to WebGL2 renderer');
        const webGL2Renderer = new WebGL2Fallback({
          canvas: canvasRef.current!,
          particleCount: Math.min(particleCount, 5000), // Limit for WebGL2
        });

        const webGL2Supported = await webGL2Renderer.init();

        if (webGL2Supported) {
          rendererRef.current = webGL2Renderer;
          setIsWebGPU(false);
          setIsInitialized(true);
          webGL2Renderer.start();
        } else {
          console.error('Neither WebGPU nor WebGL2 is supported');
        }
      }
    };

    initRenderer();

    // Update metrics periodically
    let metricsInterval: NodeJS.Timeout | null = null;
    if (showMetrics) {
      metricsInterval = setInterval(() => {
        if (rendererRef.current) {
          setMetrics(rendererRef.current.getPerformanceMetrics());
        }
      }, 100);
    }

    return () => {
      if (metricsInterval) {
        clearInterval(metricsInterval);
      }
      if (rendererRef.current) {
        rendererRef.current.destroy();
      }
    };
  }, [particleCount, showMetrics]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: 'screen',
          opacity: isInitialized ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />

      {/* Loading state */}
      <AnimatePresence>
        {!isInitialized && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-veritron-gold-500 text-sm font-medium">
              Initializing particle system...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Metrics Overlay */}
      {showMetrics && isInitialized && (
        <motion.div
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-xs font-mono"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-1 text-white">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Renderer:</span>
              <span className={isWebGPU ? 'text-green-400' : 'text-yellow-400'}>
                {isWebGPU ? 'WebGPU' : 'WebGL2'}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">FPS:</span>
              <span className={metrics.fps >= 60 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.fps}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Particles:</span>
              <span className="text-blue-400">{metrics.particleCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">LOD:</span>
              <span className="text-purple-400">L{metrics.lodLevel}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Frame:</span>
              <span className="text-gray-300">{metrics.frameTime.toFixed(2)}ms</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Feature Badge */}
      {isInitialized && (
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-veritron-gold-500/20 to-veritron-gold-600/20 backdrop-blur-sm rounded-full px-3 py-1 border border-veritron-gold-500/30">
            <span className="text-xs font-medium text-veritron-gold-400">
              {isWebGPU ? '⚡ WebGPU Accelerated' : '🎨 Hardware Accelerated'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeroCanvas;