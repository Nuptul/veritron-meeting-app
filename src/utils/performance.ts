/**
 * Performance Utilities
 * Web Vitals collection, beacon endpoint, and performance monitoring
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric, CLSAttribution, FCPAttribution, INPAttribution, LCPAttribution, TTFBAttribution } from 'web-vitals/attribution';

// Beacon endpoint configuration
const BEACON_CONFIG = {
  endpoint: import.meta.env.VITE_BEACON_ENDPOINT || '/api/beacon/vitals',
  bufferSize: 10,
  flushInterval: 5000, // ms
  enabled: import.meta.env.VITE_ENABLE_BEACON !== 'false',
  debug: import.meta.env.DEV,
};

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FCP: { good: 1800, needsImprovement: 3000 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 },
  TTFB: { good: 800, needsImprovement: 1800 },
  FID: { good: 100, needsImprovement: 300 },
};

// Metric buffer for batching
let metricBuffer: BeaconData[] = [];
let flushTimer: NodeJS.Timeout | null = null;

/**
 * Beacon data structure
 */
interface BeaconData {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  attribution?: Record<string, any>;
  metadata: {
    url: string;
    timestamp: number;
    sessionId: string;
    deviceType: string;
    connectionType: string;
    viewport: {
      width: number;
      height: number;
    };
  };
}

/**
 * Get or create session ID
 */
function getSessionId(): string {
  const key = 'perf_session_id';
  let sessionId = sessionStorage.getItem(key);
  
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  
  return sessionId;
}

/**
 * Detect device type
 */
function getDeviceType(): string {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Get connection type
 */
function getConnectionType(): string {
  const nav = navigator as any;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  if (connection) {
    return connection.effectiveType || 'unknown';
  }
  
  return 'unknown';
}

/**
 * Create metadata for beacon
 */
function createMetadata(): BeaconData['metadata'] {
  return {
    url: window.location.href,
    timestamp: Date.now(),
    sessionId: getSessionId(),
    deviceType: getDeviceType(),
    connectionType: getConnectionType(),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
}

/**
 * Send beacon data
 */
async function sendBeacon(data: BeaconData[]): Promise<void> {
  if (!BEACON_CONFIG.enabled || data.length === 0) {
    return;
  }
  
  const payload = JSON.stringify(data);
  
  if (BEACON_CONFIG.debug) {
    console.log('[Performance Beacon]', data);
  }
  
  try {
    // Try using sendBeacon API first (survives page unload)
    if (navigator.sendBeacon && navigator.sendBeacon(BEACON_CONFIG.endpoint, payload)) {
      return;
    }
    
    // Fallback to fetch
    await fetch(BEACON_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      keepalive: true, // Allow request to outlive the page
    });
  } catch (error) {
    if (BEACON_CONFIG.debug) {
      console.error('[Performance Beacon] Failed to send:', error);
    }
  }
}

/**
 * Buffer and batch metrics
 */
function bufferMetric(data: BeaconData): void {
  metricBuffer.push(data);
  
  // Flush if buffer is full
  if (metricBuffer.length >= BEACON_CONFIG.bufferSize) {
    flushMetrics();
    return;
  }
  
  // Schedule flush if not already scheduled
  if (!flushTimer) {
    flushTimer = setTimeout(() => {
      flushMetrics();
    }, BEACON_CONFIG.flushInterval);
  }
}

/**
 * Flush buffered metrics
 */
export function flushMetrics(): void {
  if (metricBuffer.length === 0) {
    return;
  }
  
  const dataToSend = [...metricBuffer];
  metricBuffer = [];
  
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  
  sendBeacon(dataToSend);
}

/**
 * Process CLS attribution
 */
function processCLSAttribution(attribution: CLSAttribution): Record<string, any> {
  return {
    largestShiftTarget: attribution.largestShiftTarget,
    largestShiftTime: attribution.largestShiftTime,
    largestShiftValue: attribution.largestShiftValue,
    largestShiftSource: attribution.largestShiftSources?.map(source => ({
      node: source.node?.nodeName,
      previousRect: source.previousRect,
      currentRect: source.currentRect,
    })),
    loadState: attribution.loadState,
  };
}

/**
 * Process LCP attribution
 */
function processLCPAttribution(attribution: LCPAttribution): Record<string, any> {
  return {
    element: attribution.element,
    elementRenderDelay: attribution.elementRenderDelay,
    resourceLoadDelay: attribution.resourceLoadDelay,
    resourceLoadDuration: attribution.resourceLoadDuration,
    url: attribution.url,
    timeToFirstByte: attribution.timeToFirstByte,
    navigationEntry: attribution.navigationEntry ? {
      domContentLoadedTime: attribution.navigationEntry.domContentLoadedEventEnd - attribution.navigationEntry.domContentLoadedEventStart,
      loadTime: attribution.navigationEntry.loadEventEnd - attribution.navigationEntry.loadEventStart,
    } : null,
  };
}

/**
 * Process INP attribution
 */
function processINPAttribution(attribution: INPAttribution): Record<string, any> {
  return {
    interactionTarget: attribution.interactionTarget,
    interactionType: attribution.interactionType,
    interactionTime: attribution.interactionTime,
    nextPaintTime: attribution.nextPaintTime,
    inputDelay: attribution.inputDelay,
    processingDuration: attribution.processingDuration,
    presentationDelay: attribution.presentationDelay,
    loadState: attribution.loadState,
  };
}

/**
 * Process FCP attribution
 */
function processFCPAttribution(attribution: FCPAttribution): Record<string, any> {
  return {
    timeToFirstByte: attribution.timeToFirstByte,
    firstByteToFCP: attribution.firstByteToFCP,
    loadState: attribution.loadState,
    navigationEntry: attribution.navigationEntry ? {
      domContentLoadedTime: attribution.navigationEntry.domContentLoadedEventEnd - attribution.navigationEntry.domContentLoadedEventStart,
    } : null,
  };
}

/**
 * Process TTFB attribution
 */
function processTTFBAttribution(attribution: TTFBAttribution): Record<string, any> {
  return {
    waitingDuration: attribution.waitingDuration,
    dnsDuration: attribution.dnsDuration,
    connectionDuration: attribution.connectionDuration,
    requestDuration: attribution.requestDuration,
    navigationEntry: attribution.navigationEntry ? {
      type: attribution.navigationEntry.type,
      redirectCount: attribution.navigationEntry.redirectCount,
    } : null,
  };
}

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals(): void {
  if (!BEACON_CONFIG.enabled) {
    console.log('[Performance] Beacon monitoring disabled');
    return;
  }
  
  // Monitor CLS with attribution
  onCLS((metric) => {
    const data: BeaconData = {
      metric: 'CLS',
      value: metric.value,
      rating: metric.rating,
      attribution: processCLSAttribution(metric.attribution as CLSAttribution),
      metadata: createMetadata(),
    };
    bufferMetric(data);
  });
  
  // Monitor FCP with attribution
  onFCP((metric) => {
    const data: BeaconData = {
      metric: 'FCP',
      value: metric.value,
      rating: metric.rating,
      attribution: processFCPAttribution(metric.attribution as FCPAttribution),
      metadata: createMetadata(),
    };
    bufferMetric(data);
  });
  
  // Monitor INP with attribution
  onINP((metric) => {
    const data: BeaconData = {
      metric: 'INP',
      value: metric.value,
      rating: metric.rating,
      attribution: processINPAttribution(metric.attribution as INPAttribution),
      metadata: createMetadata(),
    };
    bufferMetric(data);
  });
  
  // Monitor LCP with attribution
  onLCP((metric) => {
    const data: BeaconData = {
      metric: 'LCP',
      value: metric.value,
      rating: metric.rating,
      attribution: processLCPAttribution(metric.attribution as LCPAttribution),
      metadata: createMetadata(),
    };
    bufferMetric(data);
  });
  
  // Monitor TTFB with attribution
  onTTFB((metric) => {
    const data: BeaconData = {
      metric: 'TTFB',
      value: metric.value,
      rating: metric.rating,
      attribution: processTTFBAttribution(metric.attribution as TTFBAttribution),
      metadata: createMetadata(),
    };
    bufferMetric(data);
  });
  
  // Flush metrics on page unload
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushMetrics();
    }
  });
  
  window.addEventListener('pagehide', flushMetrics);
  
  console.log('[Performance] Web Vitals monitoring initialized');
}

/**
 * Mark performance timing
 */
export function markTiming(name: string): void {
  performance.mark(name);
}

/**
 * Measure between two marks
 */
export function measureTiming(name: string, startMark: string, endMark?: string): number {
  const measureName = `measure-${name}`;
  
  if (endMark) {
    performance.measure(measureName, startMark, endMark);
  } else {
    performance.measure(measureName, startMark);
  }
  
  const entries = performance.getEntriesByName(measureName);
  const duration = entries[entries.length - 1]?.duration || 0;
  
  // Clean up
  performance.clearMarks(startMark);
  if (endMark) {
    performance.clearMarks(endMark);
  }
  performance.clearMeasures(measureName);
  
  return duration;
}

/**
 * Track custom performance metric
 */
export function trackCustomMetric(name: string, value: number, unit: string = 'ms'): void {
  const data: BeaconData = {
    metric: `custom:${name}`,
    value,
    rating: 'good', // Custom metrics don't have ratings
    metadata: createMetadata(),
  };
  
  bufferMetric(data);
  
  if (BEACON_CONFIG.debug) {
    console.log(`[Performance] Custom metric: ${name} = ${value}${unit}`);
  }
}

/**
 * Performance observer for resource timing
 */
export function observeResources(callback?: (entries: PerformanceEntry[]) => void): PerformanceObserver {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    entries.forEach(entry => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Track slow resources
        if (resourceEntry.duration > 1000) {
          trackCustomMetric('slow-resource', resourceEntry.duration, 'ms');
          
          if (BEACON_CONFIG.debug) {
            console.warn(`[Performance] Slow resource: ${resourceEntry.name} (${Math.round(resourceEntry.duration)}ms)`);
          }
        }
      }
    });
    
    if (callback) {
      callback(entries);
    }
  });
  
  observer.observe({ entryTypes: ['resource', 'navigation', 'paint', 'largest-contentful-paint'] });
  
  return observer;
}

/**
 * Calculate percentile from array of values
 */
export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  
  return sorted[Math.max(0, index)];
}

/**
 * Aggregate metrics for reporting
 */
export class MetricsAggregator {
  private metrics: Map<string, number[]> = new Map();
  
  addMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }
  
  getPercentiles(name: string): { p50: number; p75: number; p90: number; p99: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;
    
    return {
      p50: calculatePercentile(values, 50),
      p75: calculatePercentile(values, 75),
      p90: calculatePercentile(values, 90),
      p99: calculatePercentile(values, 99),
    };
  }
  
  getStats(name: string): { min: number; max: number; mean: number; count: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;
    
    const sum = values.reduce((a, b) => a + b, 0);
    
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      mean: sum / values.length,
      count: values.length,
    };
  }
  
  clear(): void {
    this.metrics.clear();
  }
  
  getAllMetrics(): Record<string, { percentiles: ReturnType<typeof this.getPercentiles>; stats: ReturnType<typeof this.getStats> }> {
    const result: Record<string, any> = {};
    
    this.metrics.forEach((_, name) => {
      result[name] = {
        percentiles: this.getPercentiles(name),
        stats: this.getStats(name),
      };
    });
    
    return result;
  }
}

// Export a global aggregator instance
export const globalMetricsAggregator = new MetricsAggregator();

/**
 * Performance budget checker
 */
export function checkPerformanceBudget(metrics: Record<string, number>): { 
  passed: boolean; 
  violations: Array<{ metric: string; actual: number; budget: number }> 
} {
  const violations: Array<{ metric: string; actual: number; budget: number }> = [];
  
  Object.entries(metrics).forEach(([metric, value]) => {
    const threshold = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
    
    if (threshold && value > threshold.good) {
      violations.push({
        metric,
        actual: value,
        budget: threshold.good,
      });
    }
  });
  
  return {
    passed: violations.length === 0,
    violations,
  };
}

/**
 * Initialize performance monitoring on app start
 */
export function initPerformanceMonitoring(): void {
  // Initialize Web Vitals
  initWebVitals();
  
  // Start resource observer
  observeResources();
  
  // Track page load performance
  window.addEventListener('load', () => {
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navTiming) {
      trackCustomMetric('page-load', navTiming.loadEventEnd - navTiming.fetchStart);
      trackCustomMetric('dom-content-loaded', navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart);
      trackCustomMetric('dom-interactive', navTiming.domInteractive - navTiming.fetchStart);
    }
  });
  
  // Log performance summary in development
  if (BEACON_CONFIG.debug) {
    setTimeout(() => {
      console.log('[Performance] Initial metrics collected');
      console.table(globalMetricsAggregator.getAllMetrics());
    }, 10000);
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined' && BEACON_CONFIG.enabled) {
  // Wait for app to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);
  } else {
    initPerformanceMonitoring();
  }
}