import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const POPUP_DELAY = 8000; // 8 seconds
const POPUP_COUNT_KEY = 'skipSearchPopupCount';
const POPUP_LAST_RESET_KEY = 'skipSearchPopupLastReset';
const POPUP_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MAX_POPUP_COUNT = 3; // Show 3 times before 24hr cooldown

// Pages where skip search popup should NOT appear
const EXCLUDED_PATHS = [
  '/', // Homepage
  '/blog', // Blog listing
  '/contact', // Contact Us
  '/about', // About Us
  '/jobs', // Careers/Jobs
  '/thank-you', // Thank you page
];

const EXCLUDED_PATH_PATTERNS = [
  /^\/blog\//, // Individual blog posts
];

export const useSkipSearchPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if current path should be excluded
    const currentPath = location.pathname;
    const isExcluded = EXCLUDED_PATHS.includes(currentPath) || 
      EXCLUDED_PATH_PATTERNS.some(pattern => pattern.test(currentPath));

    if (isExcluded) {
      return;
    }

    const currentTime = new Date().getTime();
    const lastReset = parseInt(localStorage.getItem(POPUP_LAST_RESET_KEY) || '0');

    // Reset counter if 24 hours have passed since last reset
    if (currentTime - lastReset >= POPUP_EXPIRY) {
      localStorage.setItem(POPUP_COUNT_KEY, '0');
      localStorage.setItem(POPUP_LAST_RESET_KEY, currentTime.toString());
    }

    // Get current count after potential reset
    const popupCount = parseInt(localStorage.getItem(POPUP_COUNT_KEY) || '0');

    // Don't show popup if we've already shown it 3 times in the current 24hr period
    if (popupCount >= MAX_POPUP_COUNT) {
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Increment counter when popup is shown
      localStorage.setItem(POPUP_COUNT_KEY, (popupCount + 1).toString());
      // Set last reset time if this is the first popup of the period
      if (popupCount === 0) {
        localStorage.setItem(POPUP_LAST_RESET_KEY, currentTime.toString());
      }
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const closePopup = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    closePopup,
  };
};

export default useSkipSearchPopup; 