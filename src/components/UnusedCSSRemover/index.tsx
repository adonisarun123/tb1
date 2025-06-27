import { useEffect } from 'react';

const UnusedCSSRemover = () => {
  useEffect(() => {
    // Remove unused CSS classes dynamically
    const removeUnusedCSS = () => {
      // Get all stylesheets
      const stylesheets = Array.from(document.styleSheets);
      const usedSelectors = new Set<string>();
      
      // Collect all used classes from DOM
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const classes = element.className;
        if (typeof classes === 'string') {
          classes.split(' ').forEach(className => {
            if (className.trim()) {
              usedSelectors.add(`.${className.trim()}`);
            }
          });
        }
        
        // Check for id selectors
        if (element.id) {
          usedSelectors.add(`#${element.id}`);
        }
      });
      
      // Check each stylesheet for unused rules
      stylesheets.forEach(stylesheet => {
        try {
          if (stylesheet.cssRules) {
            const rulesToRemove: number[] = [];
            
            Array.from(stylesheet.cssRules).forEach((rule, index) => {
              if (rule instanceof CSSStyleRule) {
                const selector = rule.selectorText;
                
                // Skip critical selectors
                const criticalSelectors = [
                  'html', 'body', '*', 'root',
                  '.hero-title', '.hero-subtitle', '.hero-section',
                  '.navbar', '.loading-spinner'
                ];
                
                const isCritical = criticalSelectors.some(critical => 
                  selector.includes(critical)
                );
                
                if (!isCritical) {
                  // Check if selector is actually used
                  const isUsed = Array.from(usedSelectors).some(used => 
                    selector.includes(used.replace('.', '').replace('#', ''))
                  );
                  
                  if (!isUsed) {
                    // Try to find the element in DOM
                    try {
                      const elements = document.querySelectorAll(selector);
                      if (elements.length === 0) {
                        rulesToRemove.push(index);
                      }
                    } catch (e) {
                      // Invalid selector, mark for removal
                      console.warn('Invalid CSS selector:', selector);
                    }
                  }
                }
              }
            });
            
            // Remove unused rules (in reverse order to maintain indices)
            rulesToRemove.reverse().forEach(index => {
              try {
                stylesheet.deleteRule(index);
              } catch (e) {
                console.warn('Could not remove CSS rule at index:', index);
              }
            });
          }
        } catch (e) {
          // Cross-origin stylesheet, skip
          console.warn('Cannot access stylesheet:', stylesheet.href);
        }
      });
    };
    
    // Run after initial render and DOM is ready
    const timeout = setTimeout(() => {
      removeUnusedCSS();
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return null;
};

export default UnusedCSSRemover; 