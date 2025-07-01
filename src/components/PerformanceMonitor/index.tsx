import React, { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  domContentLoaded: number | null;
  loadComplete: number | null;
}

interface PerformanceMonitorProps {
  enableCSSOptimization?: boolean;
  enableResourcePreloading?: boolean;
  enableMetrics?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enableCSSOptimization = true,
  enableResourcePreloading = true,
  enableMetrics = true,
  onMetricsUpdate
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    domContentLoaded: null,
    loadComplete: null
  });

  // Critical CSS optimization
  const optimizeCSSDelivery = useCallback(() => {
    if (!enableCSSOptimization) return;

    // Identify and inline critical CSS
    const inlineCriticalCSS = () => {
      const criticalCSS = `
        /* Critical above-the-fold styles */
        *,*::before,*::after{box-sizing:border-box}
        body{margin:0;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:#fff}
        #root{min-height:100vh}
        .navbar{position:fixed;top:0;width:100%;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);z-index:1000}
        .hero-section{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative}
        .loading-spinner{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border:3px solid #f3f3f3;border-top:3px solid #FF4C39;border-radius:50%;animation:spin 1s linear infinite}
        @keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        .lazy{opacity:0;transition:opacity 0.3s}
        .lazy.loaded{opacity:1}
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      `;

      // Check if critical CSS is already inlined
      if (!document.querySelector('#critical-css')) {
        const style = document.createElement('style');
        style.id = 'critical-css';
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
      }
    };

    // Defer non-critical CSS
    const deferNonCriticalCSS = () => {
      const deferCSS = (href: string) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        document.head.appendChild(link);
      };

      // List of non-critical CSS files to defer
      const nonCriticalCSS = [
        'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap',
      ];

      nonCriticalCSS.forEach(deferCSS);
    };

    inlineCriticalCSS();
    
    // Defer non-critical CSS after initial render
    requestIdleCallback(() => {
      deferNonCriticalCSS();
    });
  }, [enableCSSOptimization]);

  // Resource preloading optimization
  const optimizeResourcePreloading = useCallback(() => {
    if (!enableResourcePreloading) return;

    // Preload critical resources
    const preloadResource = (href: string, as: string, type?: string, fetchpriority?: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (fetchpriority) link.setAttribute('fetchpriority', fetchpriority);
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload critical images with high priority
    preloadResource('/hero.webp', 'image', 'image/webp', 'high');
    
    // Preload critical fonts
    preloadResource('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', 'font', 'font/woff2');

    // Prefetch next-page resources on fast connections
    if ('connection' in navigator && (navigator as any).connection.effectiveType !== 'slow-2g') {
      setTimeout(() => {
        const prefetchResource = (href: string) => {
          if (document.querySelector(`link[href="${href}"]`)) return;
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          document.head.appendChild(link);
        };

        // Prefetch likely next pages
        prefetchResource('/activities');
        prefetchResource('/stays');
        prefetchResource('/destinations');
      }, 3000);
    }
  }, [enableResourcePreloading]);

  // Performance metrics collection
  const collectMetrics = useCallback(() => {
    if (!enableMetrics) return;

    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics(prev => {
        const updated = { ...prev, ...newMetrics };
        onMetricsUpdate?.(updated);
        return updated;
      });
    };

    // Navigation timing metrics
    const collectNavigationMetrics = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0];
          updateMetrics({
            ttfb: nav.responseStart - nav.requestStart,
            domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
            loadComplete: nav.loadEventEnd - nav.startTime
          });
        }
      }
    };

    // Core Web Vitals
    const collectCoreWebVitals = () => {
      // First Contentful Paint (FCP)
      const observeFCP = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              updateMetrics({ fcp: fcpEntry.startTime });
              observer.disconnect();
            }
          });
          observer.observe({ entryTypes: ['paint'] });
        }
      };

      // Largest Contentful Paint (LCP)
      const observeLCP = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            updateMetrics({ lcp: lastEntry.startTime });
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
      };

      // First Input Delay (FID)
      const observeFID = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              updateMetrics({ fid: entry.processingStart - entry.startTime });
            });
          });
          observer.observe({ entryTypes: ['first-input'] });
        }
      };

      // Cumulative Layout Shift (CLS)
      const observeCLS = () => {
        if ('PerformanceObserver' in window) {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            updateMetrics({ cls: clsValue });
          });
          observer.observe({ entryTypes: ['layout-shift'] });
        }
      };

      observeFCP();
      observeLCP();
      observeFID();
      observeCLS();
    };

    // Collect metrics after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        collectNavigationMetrics();
        collectCoreWebVitals();
      });
    } else {
      collectNavigationMetrics();
      collectCoreWebVitals();
    }
  }, [enableMetrics, onMetricsUpdate]);

  // DOM optimization
  const optimizeDOM = useCallback(() => {
    // Remove unused elements
    const removeUnusedElements = () => {
      // Remove unused script tags
      const scripts = document.querySelectorAll('script[data-remove-if-unused]');
      scripts.forEach(script => {
        if (!script.getAttribute('data-used')) {
          script.remove();
        }
      });

      // Remove empty elements
      const emptyElements = document.querySelectorAll('div:empty, span:empty, p:empty');
      emptyElements.forEach(element => {
        if (!element.hasAttribute('data-keep-empty')) {
          element.remove();
        }
      });
    };

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([data-optimized])');
      images.forEach((element) => {
        const img = element as HTMLImageElement;
        // Add loading="lazy" if not set
        if (!img.loading && !img.hasAttribute('fetchpriority')) {
          img.loading = 'lazy';
        }

        // Add decoding="async"
        if (!img.decoding) {
          img.decoding = 'async';
        }

        // Mark as optimized
        img.setAttribute('data-optimized', 'true');
      });
    };

    // Run optimizations after initial render
    requestIdleCallback(() => {
      removeUnusedElements();
      optimizeImages();
    });
  }, []);

  // Third-party script optimization
  const optimizeThirdPartyScripts = useCallback(() => {
    // Delay third-party scripts until user interaction
    const delayedScripts = [
      'https://cdn.signalzen.com/signalzen.js',
      'https://connect.facebook.net/en_US/fbevents.js',
      'https://www.googletagmanager.com/gtag/js'
    ];

    let scriptsLoaded = false;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;

      // Skip in development
      if (window.location.hostname === 'localhost') return;

      delayedScripts.forEach((src, index) => {
        setTimeout(() => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }, index * 1000); // Stagger loading
      });
    };

    // Load on user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, loadScripts, { once: true, passive: true });
    });

    // Fallback: load after 5 seconds
    setTimeout(loadScripts, 5000);
  }, []);

  // Initialize optimizations
  useEffect(() => {
    // Run optimizations with appropriate timing
    optimizeCSSDelivery();
    optimizeResourcePreloading();
    collectMetrics();
    optimizeDOM();
    optimizeThirdPartyScripts();
  }, [optimizeCSSDelivery, optimizeResourcePreloading, collectMetrics, optimizeDOM, optimizeThirdPartyScripts]);

  // Log metrics for debugging (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && enableMetrics) {
      console.log('Performance Metrics:', metrics);
    }
  }, [metrics, enableMetrics]);

  // Component doesn't render anything visible
  return null;
};

export default PerformanceMonitor; 