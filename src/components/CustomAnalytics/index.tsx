import { useEffect } from 'react';

const CustomAnalytics = () => {
  useEffect(() => {
    const loadCustomAnalytics = async () => {
      try {
        // Only load in production or when explicitly enabled
        const shouldLoad = import.meta.env.PROD || import.meta.env.VITE_ENABLE_CUSTOM_ANALYTICS === 'true';
        
        if (!shouldLoad) {
          return;
        }

        // Fetch the custom analytics HTML file
        const response = await fetch('/custom-analytics.html');
        
        if (response.ok) {
          const htmlContent = await response.text();
          
          // Create a temporary div to parse the HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          
          // Extract and execute script tags
          const scripts = tempDiv.querySelectorAll('script');
          scripts.forEach((script) => {
            if (script.src) {
              // External script
              const newScript = document.createElement('script');
              newScript.src = script.src;
              newScript.async = true;
              if (script.id) newScript.id = script.id;
              document.head.appendChild(newScript);
            } else if (script.textContent) {
              // Inline script
              const newScript = document.createElement('script');
              newScript.textContent = script.textContent;
              if (script.id) newScript.id = script.id;
              document.head.appendChild(newScript);
            }
          });

          // Extract and add meta tags
          const metaTags = tempDiv.querySelectorAll('meta');
          metaTags.forEach((meta) => {
            const newMeta = document.createElement('meta');
            Array.from(meta.attributes).forEach(attr => {
              newMeta.setAttribute(attr.name, attr.value);
            });
            document.head.appendChild(newMeta);
          });

          console.log('Custom analytics loaded successfully');
        }
      } catch (error) {
        console.warn('Could not load custom analytics:', error);
      }
    };

    loadCustomAnalytics();
  }, []);

  return null; // This component doesn't render anything
};

export default CustomAnalytics; 