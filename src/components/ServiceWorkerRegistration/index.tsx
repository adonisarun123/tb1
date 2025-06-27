import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    // Only register service worker in production
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              if (import.meta.env.DEV) {
                console.log('New service worker content available');
              }
              
              // You can show a notification to user about update
              showUpdateNotification();
            }
          });
        }
      });

      // Check for updates every 5 minutes
      setInterval(() => {
        registration.update();
      }, 5 * 60 * 1000);

      console.log('Service Worker registered successfully:', registration);

      // Send performance metrics to service worker
      if (registration.active) {
        sendPerformanceMetrics(registration.active);
      }

    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  };

  const showUpdateNotification = () => {
    // Create a subtle notification about update
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4f46e5;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: Inter, sans-serif;
      font-size: 14px;
      cursor: pointer;
      transition: transform 0.3s ease;
    `;
    notification.textContent = 'New version available! Click to refresh.';
    
    notification.addEventListener('click', () => {
      window.location.reload();
    });

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 10000);
  };

  const sendPerformanceMetrics = (serviceWorker: ServiceWorker) => {
    // Collect and send performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          ttfb: navigation.responseStart - navigation.fetchStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          loadComplete: navigation.loadEventEnd - navigation.fetchStart,
          timestamp: Date.now()
        };

        serviceWorker.postMessage({
          type: 'PERFORMANCE_METRICS',
          metrics
        });
      }
    }
  };

  return null;
};

export default ServiceWorkerRegistration; 