import { useEffect } from 'react';

// Type declarations for gtag and performance APIs
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}



const PerformanceMonitor = () => {
  useEffect(() => {
    // Basic performance monitoring with PerformanceObserver
    const observePerformance = () => {
      try {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcpTime = lastEntry.startTime;
          
          if (import.meta.env.DEV) {
            console.log(`LCP: ${Math.round(lcpTime)}ms`);
          }
          
          if (import.meta.env.PROD && window.gtag) {
            window.gtag('event', 'web_vitals', {
              metric_name: 'LCP',
              metric_value: Math.round(lcpTime),
              custom_parameter: lcpTime < 2500 ? 'good' : lcpTime < 4000 ? 'needs-improvement' : 'poor'
            });
          }
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              const fcpTime = entry.startTime;
              
              if (import.meta.env.DEV) {
                console.log(`FCP: ${Math.round(fcpTime)}ms`);
              }
              
              if (import.meta.env.PROD && window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'FCP',
                  metric_value: Math.round(fcpTime)
                });
              }
            }
          }
        });
        
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Monitor Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          
          if (import.meta.env.DEV) {
            console.log(`CLS: ${(clsValue * 1000).toFixed(1)}`);
          }
          
          if (import.meta.env.PROD && window.gtag) {
            window.gtag('event', 'web_vitals', {
              metric_name: 'CLS',
              metric_value: Math.round(clsValue * 1000)
            });
          }
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (error) {
        // PerformanceObserver not supported
        if (import.meta.env.DEV) {
          console.warn('PerformanceObserver not supported');
        }
      }
    };

    // Run performance observation after a delay
    const timeoutId = setTimeout(observePerformance, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Monitor basic page load metrics
    const handleLoad = () => {
      setTimeout(() => {
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            const ttfb = navigation.responseStart - navigation.fetchStart;
            const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
            const loadComplete = navigation.loadEventEnd - navigation.fetchStart;
            
            if (import.meta.env.DEV) {
              console.log(`TTFB: ${Math.round(ttfb)}ms`);
              console.log(`DOM Content Loaded: ${Math.round(domContentLoaded)}ms`);
              console.log(`Load Complete: ${Math.round(loadComplete)}ms`);
            }
            
            if (import.meta.env.PROD && window.gtag) {
              window.gtag('event', 'timing_complete', {
                ttfb: Math.round(ttfb),
                dom_content_loaded: Math.round(domContentLoaded),
                load_complete: Math.round(loadComplete)
              });
            }
          }
        } catch (error) {
          // Navigation timing not supported
        }
      }, 0);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
};

export default PerformanceMonitor; 