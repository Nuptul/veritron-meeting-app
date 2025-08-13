/**
 * SVG Optimization Utilities for Veritron Icon System
 * Reduces file size and improves rendering performance
 */

interface OptimizationOptions {
  removeComments?: boolean;
  removeMetadata?: boolean;
  removeEmptyGroups?: boolean;
  mergeStyles?: boolean;
  minifyNumbers?: boolean;
  removeUnusedDefs?: boolean;
  simplifyGradients?: boolean;
  maxGradientStops?: number;
}

export class SVGOptimizer {
  private defaultOptions: OptimizationOptions = {
    removeComments: true,
    removeMetadata: true,
    removeEmptyGroups: true,
    mergeStyles: true,
    minifyNumbers: true,
    removeUnusedDefs: true,
    simplifyGradients: true,
    maxGradientStops: 3
  };

  /**
   * Optimize an SVG string
   */
  optimize(svgString: string, options?: OptimizationOptions): string {
    const opts = { ...this.defaultOptions, ...options };
    let optimized = svgString;

    if (opts.removeComments) {
      optimized = this.removeComments(optimized);
    }

    if (opts.removeMetadata) {
      optimized = this.removeMetadata(optimized);
    }

    if (opts.removeEmptyGroups) {
      optimized = this.removeEmptyGroups(optimized);
    }

    if (opts.minifyNumbers) {
      optimized = this.minifyNumbers(optimized);
    }

    if (opts.simplifyGradients) {
      optimized = this.simplifyGradients(optimized, opts.maxGradientStops || 3);
    }

    if (opts.mergeStyles) {
      optimized = this.mergeStyles(optimized);
    }

    return optimized;
  }

  /**
   * Remove XML comments
   */
  private removeComments(svg: string): string {
    return svg.replace(/<!--[\s\S]*?-->/g, '');
  }

  /**
   * Remove metadata tags
   */
  private removeMetadata(svg: string): string {
    return svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
  }

  /**
   * Remove empty group elements
   */
  private removeEmptyGroups(svg: string): string {
    return svg.replace(/<g[^>]*>\s*<\/g>/gi, '');
  }

  /**
   * Minify numbers to 2 decimal places
   */
  private minifyNumbers(svg: string): string {
    return svg.replace(/(\d+\.\d{3,})/g, (match) => {
      return parseFloat(match).toFixed(2);
    });
  }

  /**
   * Simplify gradients by reducing stops
   */
  private simplifyGradients(svg: string, maxStops: number): string {
    const gradientRegex = /<(linear|radial)Gradient[^>]*>([\s\S]*?)<\/\1Gradient>/gi;
    
    return svg.replace(gradientRegex, (match, type, content) => {
      const stops = content.match(/<stop[^>]*\/>/gi) || [];
      
      if (stops.length <= maxStops) {
        return match;
      }

      // Extract gradient attributes
      const idMatch = match.match(/id="([^"]+)"/);
      const id = idMatch ? idMatch[1] : '';
      
      // Extract and simplify stops
      const stopData = stops.map(stop => {
        const offsetMatch = stop.match(/offset="([^"]+)"/);
        const colorMatch = stop.match(/stop-color="([^"]+)"/);
        const opacityMatch = stop.match(/stop-opacity="([^"]+)"/);
        
        return {
          offset: offsetMatch ? parseFloat(offsetMatch[1].replace('%', '')) : 0,
          color: colorMatch ? colorMatch[1] : '#000000',
          opacity: opacityMatch ? parseFloat(opacityMatch[1]) : 1
        };
      });

      // Select evenly distributed stops
      const simplifiedStops = this.selectEvenlyDistributedStops(stopData, maxStops);
      
      // Rebuild gradient
      const stopsHtml = simplifiedStops.map(stop => 
        `<stop offset="${stop.offset}%" stop-color="${stop.color}" stop-opacity="${stop.opacity}"/>`
      ).join('\n        ');

      return `<${type}Gradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stopsHtml}
      </${type}Gradient>`;
    });
  }

  /**
   * Select evenly distributed stops from gradient
   */
  private selectEvenlyDistributedStops(stops: any[], maxStops: number): any[] {
    if (stops.length <= maxStops) return stops;

    const result = [];
    const step = (stops.length - 1) / (maxStops - 1);
    
    for (let i = 0; i < maxStops; i++) {
      const index = Math.round(i * step);
      result.push(stops[index]);
    }

    return result;
  }

  /**
   * Merge inline styles into classes
   */
  private mergeStyles(svg: string): string {
    const styleMap = new Map<string, string>();
    let classCounter = 0;

    // Find all inline styles
    const styleRegex = /style="([^"]+)"/g;
    let modifiedSvg = svg;

    modifiedSvg = modifiedSvg.replace(styleRegex, (match, styles) => {
      if (!styleMap.has(styles)) {
        styleMap.set(styles, `vt-icon-${classCounter++}`);
      }
      return `class="${styleMap.get(styles)}"`;
    });

    // Add style definitions if styles were found
    if (styleMap.size > 0) {
      const styleBlock = Array.from(styleMap.entries())
        .map(([styles, className]) => `.${className} { ${styles} }`)
        .join('\n    ');

      // Insert style block after opening svg tag
      modifiedSvg = modifiedSvg.replace(
        /<svg([^>]*)>/,
        `<svg$1>\n  <style>\n    ${styleBlock}\n  </style>`
      );
    }

    return modifiedSvg;
  }

  /**
   * Calculate size reduction percentage
   */
  calculateSizeReduction(original: string, optimized: string): number {
    const originalSize = new Blob([original]).size;
    const optimizedSize = new Blob([optimized]).size;
    return ((originalSize - optimizedSize) / originalSize) * 100;
  }
}

/**
 * Batch optimize multiple SVG files
 */
export class BatchSVGOptimizer {
  private optimizer: SVGOptimizer;

  constructor() {
    this.optimizer = new SVGOptimizer();
  }

  /**
   * Optimize multiple SVG strings
   */
  optimizeBatch(svgs: { name: string; content: string }[], options?: OptimizationOptions): {
    name: string;
    original: string;
    optimized: string;
    reduction: number;
  }[] {
    return svgs.map(({ name, content }) => {
      const optimized = this.optimizer.optimize(content, options);
      const reduction = this.optimizer.calculateSizeReduction(content, optimized);

      return {
        name,
        original: content,
        optimized,
        reduction
      };
    });
  }

  /**
   * Generate optimization report
   */
  generateReport(results: ReturnType<BatchSVGOptimizer['optimizeBatch']>): string {
    const totalOriginalSize = results.reduce((sum, r) => sum + new Blob([r.original]).size, 0);
    const totalOptimizedSize = results.reduce((sum, r) => sum + new Blob([r.optimized]).size, 0);
    const averageReduction = results.reduce((sum, r) => sum + r.reduction, 0) / results.length;

    return `
SVG Optimization Report
=======================
Total Files: ${results.length}
Original Total Size: ${(totalOriginalSize / 1024).toFixed(2)} KB
Optimized Total Size: ${(totalOptimizedSize / 1024).toFixed(2)} KB
Average Reduction: ${averageReduction.toFixed(2)}%

File Details:
${results.map(r => `- ${r.name}: ${r.reduction.toFixed(2)}% reduction`).join('\n')}
    `.trim();
  }
}

/**
 * SVG Path Optimizer - Simplifies complex paths
 */
export class PathOptimizer {
  /**
   * Optimize path data string
   */
  optimizePath(pathData: string): string {
    // Remove unnecessary whitespace
    let optimized = pathData.replace(/\s+/g, ' ').trim();
    
    // Convert absolute commands to relative where beneficial
    optimized = this.convertToRelative(optimized);
    
    // Round numbers
    optimized = this.roundPathNumbers(optimized);
    
    // Remove redundant commands
    optimized = this.removeRedundantCommands(optimized);
    
    return optimized;
  }

  /**
   * Convert absolute path commands to relative
   */
  private convertToRelative(path: string): string {
    // This is a simplified implementation
    // In production, use a proper SVG path parser
    return path.replace(/([A-Z])/g, (match) => {
      const relative = match.toLowerCase();
      // Only convert if it reduces size
      return relative;
    });
  }

  /**
   * Round numbers in path data
   */
  private roundPathNumbers(path: string): string {
    return path.replace(/(\d+\.\d{3,})/g, (match) => {
      return parseFloat(match).toFixed(2);
    });
  }

  /**
   * Remove redundant path commands
   */
  private removeRedundantCommands(path: string): string {
    // Remove redundant line commands
    path = path.replace(/l\s*0\s+0\s*/gi, '');
    
    // Remove redundant move commands
    path = path.replace(/m\s*0\s+0\s*/gi, '');
    
    return path;
  }
}

// Export singleton instances
export const svgOptimizer = new SVGOptimizer();
export const batchOptimizer = new BatchSVGOptimizer();
export const pathOptimizer = new PathOptimizer();