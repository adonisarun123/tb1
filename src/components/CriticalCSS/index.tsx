import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Preload non-critical CSS after the critical render path
    const loadNonCriticalCSS = () => {
      // All font links removed for performance - using system fonts only

      // Preload next page resources on hover
      const setupPreloadOnHover = () => {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.includes('#')) {
            link.addEventListener('mouseenter', () => {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'prefetch';
              preloadLink.href = href;
              document.head.appendChild(preloadLink);
            }, { once: true });
          }
        });
      };

      // Set up after initial render
      setTimeout(setupPreloadOnHover, 1000);
    };

    // Load non-critical resources after the page has loaded
    if (document.readyState === 'complete') {
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', loadNonCriticalCSS);
    }

    return () => {
      window.removeEventListener('load', loadNonCriticalCSS);
    };
  }, []);

  useEffect(() => {
    // Add intersection observer for lazy loading images below the fold
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));

      return () => {
        images.forEach(img => imageObserver.unobserve(img));
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        const htmlImg = img as HTMLImageElement;
        htmlImg.src = htmlImg.dataset.src || '';
      });
    }
  }, []);

  return (
    <style>{`
      /* Critical CSS for above-the-fold content */
      
      /* Reset and base styles */
      *, *::before, *::after {
        box-sizing: border-box;
      }
      
      * {
        margin: 0;
      }
      
      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background-color: #ffffff;
      }
      
      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }
      
      input, button, textarea, select {
        font: inherit;
      }
      
      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }
      
      #root {
        isolation: isolate;
        min-height: 100vh;
      }
      
      /* Hero section critical styles */
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        overflow: hidden;
      }
      
      .hero-title {
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
        animation: fadeInUp 0.8s ease-out;
      }
      
      .hero-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        font-weight: 400;
        opacity: 0.9;
        margin-bottom: 2rem;
        animation: fadeInUp 0.8s ease-out 0.2s both;
      }
      
      .hero-cta {
        display: inline-block;
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        color: white;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        animation: fadeInUp 0.8s ease-out 0.4s both;
      }
      
      .hero-cta:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }
      
      /* Navigation critical styles */
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 1000;
        padding: 1rem 0;
        animation: slideDown 0.5s ease-out;
      }
      
      .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
        text-decoration: none;
      }
      
      /* Lazy loading styles */
      .lazy {
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .lazy.loaded {
        opacity: 1;
      }
      
      /* Loading spinner */
      .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
      }
      
      /* Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      /* Responsive utilities */
      @media (max-width: 768px) {
        .hero-section {
          padding: 0 1rem;
        }
        
        .navbar-container {
          padding: 0 1rem;
        }
      }
      
      /* Focus styles for accessibility */
      button:focus,
      a:focus,
      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
      }
      
      /* Reduced motion preferences */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
};

export default CriticalCSS; 