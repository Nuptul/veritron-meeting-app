import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WebVitalsMetrics {
  LCP: number | null;
  FID: number | null;
  CLS: number | null;
  FCP: number | null;
  TTFB: number | null;
  INP: number | null;
}

interface PerformanceMonitorProps {
  show?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  show = false,
  position = 'bottom-right',
}) => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    LCP: null,
    FID: null,
    CLS: null,
    FCP: null,
    TTFB: null,
    INP: null,
  });

  useEffect(() => {
    if (!show) return;

    // Dynamically import web-vitals to monitor Core Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((metric) => {
        setMetrics(prev => ({ ...prev, CLS: metric.value }));
      });

      onFCP((metric) => {
        setMetrics(prev => ({ ...prev, FCP: metric.value }));
      });

      onLCP((metric) => {
        setMetrics(prev => ({ ...prev, LCP: metric.value }));
      });

      onTTFB((metric) => {
        setMetrics(prev => ({ ...prev, TTFB: metric.value }));
      });

      onINP((metric) => {
        setMetrics(prev => ({ ...prev, INP: metric.value }));
      });
    });

    // Monitor FID manually since it requires interaction
    const measureFID = (event: Event) => {
      const processingStart = performance.now();
      requestAnimationFrame(() => {
        const processingEnd = performance.now();
        const inputDelay = processingEnd - processingStart;
        setMetrics(prev => ({ ...prev, FID: inputDelay }));
      });
    };

    ['click', 'keydown', 'touchstart'].forEach(type => {
      window.addEventListener(type, measureFID, { once: true });
    });

    return () => {
      ['click', 'keydown', 'touchstart'].forEach(type => {
        window.removeEventListener(type, measureFID);
      });
    };
  }, [show]);

  const getMetricStatus = (metric: string, value: number | null) => {
    if (value === null) return 'pending';

    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 },
      INP: { good: 200, needsImprovement: 500 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-500';
    }
  };

  const formatValue = (metric: string, value: number | null) => {
    if (value === null) return '—';

    switch (metric) {
      case 'CLS':
        return value.toFixed(3);
      case 'LCP':
      case 'FCP':
      case 'TTFB':
        return `${(value / 1000).toFixed(2)}s`;
      case 'FID':
      case 'INP':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
    }
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black/90 backdrop-blur-md rounded-lg p-4 shadow-2xl border border-gray-800">
            <div className="mb-2 pb-2 border-b border-gray-700">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Core Web Vitals
              </h3>
            </div>

            <div className="space-y-1.5">
              {/* Primary Metrics */}
              <div className="grid grid-cols-3 gap-3 pb-2 border-b border-gray-800">
                {(['LCP', 'INP', 'CLS'] as const).map(metric => {
                  const value = metrics[metric];
                  const status = getMetricStatus(metric, value);
                  return (
                    <div key={metric} className="text-center">
                      <div className="text-[10px] text-gray-500 uppercase">{metric}</div>
                      <div className={`text-sm font-mono ${getStatusColor(status)}`}>
                        {formatValue(metric, value)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {(['FCP', 'TTFB', 'FID'] as const).map(metric => {
                  const value = metrics[metric];
                  const status = getMetricStatus(metric, value);
                  return (
                    <div key={metric} className="text-center">
                      <div className="text-[10px] text-gray-500 uppercase">{metric}</div>
                      <div className={`text-xs font-mono ${getStatusColor(status)}`}>
                        {formatValue(metric, value)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-3 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Overall Score</span>
                <div className="flex gap-1">
                  {Object.entries(metrics).map(([key, value]) => {
                    const status = getMetricStatus(key, value);
                    const color = status === 'good' ? 'bg-green-500' : 
                                 status === 'needs-improvement' ? 'bg-yellow-500' : 
                                 status === 'poor' ? 'bg-red-500' : 'bg-gray-600';
                    return (
                      <div
                        key={key}
                        className={`w-2 h-2 rounded-full ${color}`}
                        title={`${key}: ${status}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2025 Badge */}
            <div className="mt-2 text-center">
              <span className="text-[9px] text-gray-500">
                2025 Performance Standards
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerformanceMonitor;