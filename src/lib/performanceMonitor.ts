interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  domElements: number;
  networkLatency: number;
  renderBlockingResources: number;
  criticalPathLatency: number;
}

interface OptimizationResults {
  beforeOptimization: PerformanceMetrics;
  afterOptimization: PerformanceMetrics;
  improvements: {
    renderBlockingSavings: number;
    domSizeReduction: number;
    imageSavings: number;
    networkLatencyReduction: number;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    domElements: 0,
    networkLatency: 0,
    renderBlockingResources: 0,
    criticalPathLatency: 0,
  };

  private observer: PerformanceObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  constructor() {
    this.initializeObservers();
    this.measureInitialMetrics();
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers() {
    // Web Vitals Observer
    if ('PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            switch (entry.name) {
              case 'first-contentful-paint':
                this.metrics.fcp = entry.startTime;
                break;
              case 'largest-contentful-paint':
                this.metrics.lcp = entry.startTime;
                break;
              case 'first-input-delay':
                this.metrics.fid = (entry as any).processingStart - entry.startTime;
                break;
              case 'cumulative-layout-shift':
                this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
                break;
            }
            this.reportMetric(entry.name, entry.startTime);
          }
        });

        this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        console.warn('PerformanceObserver not supported:', e);
      }
    }

    // DOM Size Observer
    if ('MutationObserver' in window) {
      this.mutationObserver = new MutationObserver(() => {
        this.updateDOMMetrics();
      });

      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
      });
    }

    // Layout shift observer with ResizeObserver
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        // Track potential layout shifts
      });
    }
  }

  /**
   * Measure initial performance metrics
   */
  private measureInitialMetrics() {
    // TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Network latency from resource timing
    this.measureNetworkLatency();

    // DOM elements count
    this.updateDOMMetrics();

    // Render blocking resources
    this.measureRenderBlockingResources();
  }

  /**
   * Update DOM-related metrics
   */
  private updateDOMMetrics() {
    this.metrics.domElements = document.querySelectorAll('*').length;
  }

  /**
   * Measure network latency from resource timings
   */
  private measureNetworkLatency() {
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalLatency = 0;
    let resourceCount = 0;

    resourceEntries.forEach(entry => {
      if (entry.responseStart > 0 && entry.requestStart > 0) {
        totalLatency += entry.responseStart - entry.requestStart;
        resourceCount++;
      }
    });

    this.metrics.networkLatency = resourceCount > 0 ? totalLatency / resourceCount : 0;

    // Calculate critical path latency (max chain depth)
    this.calculateCriticalPathLatency(resourceEntries);
  }

  /**
   * Calculate critical path latency for network dependency tree
   */
  private calculateCriticalPathLatency(entries: PerformanceResourceTiming[]) {
    const criticalResources = entries.filter(entry => 
      entry.name.includes('.css') || 
      entry.name.includes('.js') ||
      entry.name.includes('supabase.co')
    );

    let maxLatency = 0;
    criticalResources.forEach(entry => {
      const latency = entry.responseEnd - entry.requestStart;
      if (latency > maxLatency) {
        maxLatency = latency;
      }
    });

    this.metrics.criticalPathLatency = maxLatency;
  }

  /**
   * Measure render blocking resources
   */
  private measureRenderBlockingResources() {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
    
    this.metrics.renderBlockingResources = stylesheets.length + scripts.length;
  }

  /**
   * Report individual metrics
   */
  private reportMetric(name: string, value: number) {
    // Send to analytics or logging service
    console.log(`📊 ${name}: ${Math.round(value)}ms`);
    
    // Check if metric meets performance thresholds
    this.checkPerformanceThresholds(name, value);
  }

  /**
   * Check if metrics meet Core Web Vitals thresholds
   */
  private checkPerformanceThresholds(name: string, value: number) {
    const thresholds = {
      'first-contentful-paint': { good: 1800, needs_improvement: 3000 },
      'largest-contentful-paint': { good: 2500, needs_improvement: 4000 },
      'first-input-delay': { good: 100, needs_improvement: 300 },
      'cumulative-layout-shift': { good: 0.1, needs_improvement: 0.25 },
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold) {
      let status = 'good';
      if (value > threshold.needs_improvement) {
        status = 'poor';
      } else if (value > threshold.good) {
        status = 'needs improvement';
      }

      console.log(`${name} status: ${status} (${Math.round(value)}ms)`);
    }
  }

  /**
   * Generate comprehensive performance report
   */
  generateReport(): PerformanceMetrics {
    this.measureNetworkLatency(); // Update latest network metrics

    console.group('🚀 Performance Report');
    console.log('Core Web Vitals:');
    console.log(`  FCP: ${this.metrics.fcp ? Math.round(this.metrics.fcp) + 'ms' : 'N/A'}`);
    console.log(`  LCP: ${this.metrics.lcp ? Math.round(this.metrics.lcp) + 'ms' : 'N/A'}`);
    console.log(`  FID: ${this.metrics.fid ? Math.round(this.metrics.fid) + 'ms' : 'N/A'}`);
    console.log(`  CLS: ${this.metrics.cls ? this.metrics.cls.toFixed(3) : 'N/A'}`);
    console.log(`  TTFB: ${this.metrics.ttfb ? Math.round(this.metrics.ttfb) + 'ms' : 'N/A'}`);
    
    console.log('Optimization Metrics:');
    console.log(`  DOM Elements: ${this.metrics.domElements}`);
    console.log(`  Network Latency: ${Math.round(this.metrics.networkLatency)}ms`);
    console.log(`  Render Blocking Resources: ${this.metrics.renderBlockingResources}`);
    console.log(`  Critical Path Latency: ${Math.round(this.metrics.criticalPathLatency)}ms`);
    console.groupEnd();

    return this.metrics;
  }

  /**
   * Calculate optimization improvements
   */
  calculateImprovements(beforeMetrics: PerformanceMetrics): OptimizationResults {
    const improvements = {
      renderBlockingSavings: Math.max(0, beforeMetrics.renderBlockingResources - this.metrics.renderBlockingResources),
      domSizeReduction: Math.max(0, beforeMetrics.domElements - this.metrics.domElements),
      imageSavings: 0, // Calculated separately based on image optimizations
      networkLatencyReduction: Math.max(0, beforeMetrics.networkLatency - this.metrics.networkLatency),
    };

    return {
      beforeOptimization: beforeMetrics,
      afterOptimization: this.metrics,
      improvements,
    };
  }

  /**
   * Measure image optimization savings
   */
  measureImageOptimizations(): { originalSize: number; optimizedSize: number; savings: number } {
    const images = document.querySelectorAll('img, picture');
    let totalOptimizations = 0;

    images.forEach(img => {
      // Check if image is using modern formats (WebP, AVIF)
      if (img instanceof HTMLImageElement) {
        if (img.src.includes('.webp') || img.src.includes('.avif')) {
          totalOptimizations++;
        }
      }
      
      if (img instanceof HTMLPictureElement) {
        const sources = img.querySelectorAll('source');
        if (sources.length > 0) {
          totalOptimizations++;
        }
      }
    });

    const estimatedSavings = totalOptimizations * 150; // ~150KB average savings per optimized image
    
    return {
      originalSize: images.length * 200, // Estimated original size
      optimizedSize: images.length * 200 - estimatedSavings,
      savings: estimatedSavings,
    };
  }

  /**
   * Start continuous monitoring
   */
  startMonitoring() {
    // Report metrics every 30 seconds
    setInterval(() => {
      this.generateReport();
    }, 30000);

    // Report on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.generateReport();
      }
    });

    // Report before page unload
    window.addEventListener('beforeunload', () => {
      this.generateReport();
    });
  }

  /**
   * Stop monitoring and cleanup
   */
  stopMonitoring() {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  /**
   * Get performance score (0-100)
   */
  getPerformanceScore(): number {
    let score = 100;

    // LCP penalty
    if (this.metrics.lcp) {
      if (this.metrics.lcp > 4000) score -= 30;
      else if (this.metrics.lcp > 2500) score -= 15;
    }

    // FCP penalty
    if (this.metrics.fcp) {
      if (this.metrics.fcp > 3000) score -= 20;
      else if (this.metrics.fcp > 1800) score -= 10;
    }

    // DOM size penalty
    if (this.metrics.domElements > 1500) score -= 15;
    else if (this.metrics.domElements > 800) score -= 8;

    // Network latency penalty
    if (this.metrics.networkLatency > 500) score -= 10;
    else if (this.metrics.networkLatency > 200) score -= 5;

    return Math.max(0, score);
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Start monitoring automatically
if (typeof window !== 'undefined') {
  performanceMonitor.startMonitoring();
}

// Export for React hook
export const usePerformanceMonitoring = () => {
  return {
    generateReport: () => performanceMonitor.generateReport(),
    getPerformanceScore: () => performanceMonitor.getPerformanceScore(),
    measureImageOptimizations: () => performanceMonitor.measureImageOptimizations(),
    calculateImprovements: (beforeMetrics: PerformanceMetrics) => 
      performanceMonitor.calculateImprovements(beforeMetrics),
  };
}; 