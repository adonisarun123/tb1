// GCLID (Google Click ID) utilities for Google Ads tracking

export interface GCLIDData {
  value: string;
  expiryDate: number;
  source?: string;
  medium?: string;
  campaign?: string;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const GCLID_STORAGE_KEY = 'gclid_data';
const GCLID_EXPIRY_DAYS = 90; // Google Ads attribution window

/**
 * Get URL parameter value
 */
export const getURLParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

/**
 * Get all UTM parameters from URL
 */
export const getUTMParams = (): UTMParams => {
  return {
    utm_source: getURLParam('utm_source') || undefined,
    utm_medium: getURLParam('utm_medium') || undefined,
    utm_campaign: getURLParam('utm_campaign') || undefined,
    utm_term: getURLParam('utm_term') || undefined,
    utm_content: getURLParam('utm_content') || undefined
  };
};

/**
 * Create expiry record for GCLID
 */
const createExpiryRecord = (value: string, utmParams?: UTMParams): GCLIDData => {
  const expiryPeriod = GCLID_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const expiryDate = new Date().getTime() + expiryPeriod;
  
  return {
    value,
    expiryDate,
    source: utmParams?.utm_source || 'google',
    medium: utmParams?.utm_medium || 'cpc',
    campaign: utmParams?.utm_campaign
  };
};

/**
 * Capture and store GCLID from URL
 */
export const captureGCLID = (): GCLIDData | null => {
  const gclidParam = getURLParam('gclid');
  const gclsrcParam = getURLParam('gclsrc');
  
  // Validate GCLSRC (should be 'aw' for Google Ads or empty)
  const isGclsrcValid = !gclsrcParam || gclsrcParam.indexOf('aw') !== -1;
  
  if (gclidParam && isGclsrcValid) {
    const utmParams = getUTMParams();
    const gclidData = createExpiryRecord(gclidParam, utmParams);
    
    // Store in localStorage
    localStorage.setItem(GCLID_STORAGE_KEY, JSON.stringify(gclidData));
    
    console.log('🎯 GCLID captured:', gclidParam);
    return gclidData;
  }
  
  return null;
};

/**
 * Get stored GCLID data
 */
export const getStoredGCLID = (): GCLIDData | null => {
  try {
    const stored = localStorage.getItem(GCLID_STORAGE_KEY);
    if (!stored) return null;
    
    const gclidData: GCLIDData = JSON.parse(stored);
    const currentTime = new Date().getTime();
    
    // Check if GCLID has expired
    if (currentTime > gclidData.expiryDate) {
      localStorage.removeItem(GCLID_STORAGE_KEY);
      return null;
    }
    
    return gclidData;
  } catch (error) {
    console.error('Error retrieving GCLID:', error);
    return null;
  }
};

/**
 * Get current GCLID value (either from URL or storage)
 */
export const getCurrentGCLID = (): string | null => {
  // First try to get from URL (fresh click)
  const freshGCLID = captureGCLID();
  if (freshGCLID) {
    return freshGCLID.value;
  }
  
  // Fall back to stored GCLID
  const storedGCLID = getStoredGCLID();
  return storedGCLID?.value || null;
};

/**
 * Populate form fields with GCLID
 */
export const populateGCLIDFields = (formElement?: HTMLFormElement): void => {
  const gclid = getCurrentGCLID();
  if (!gclid) return;
  
  const possibleFieldNames = [
    'gclid',
    'gclid_field', 
    'google_click_id',
    'click_id',
    'gcl_id'
  ];
  
  const searchIn = formElement || document;
  
  possibleFieldNames.forEach(fieldName => {
    // Try by name attribute
    const fieldByName = searchIn.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement;
    if (fieldByName) {
      fieldByName.value = gclid;
    }
    
    // Try by ID
    const fieldById = searchIn.querySelector(`#${fieldName}`) as HTMLInputElement;
    if (fieldById) {
      fieldById.value = gclid;
    }
  });
};

/**
 * Add GCLID to form data object
 */
export const addGCLIDToFormData = (formData: Record<string, any>): Record<string, any> => {
  const gclidData = getStoredGCLID();
  if (!gclidData) return formData;
  
  return {
    ...formData,
    gclid: gclidData.value,
    utm_source: gclidData.source,
    utm_medium: gclidData.medium,
    utm_campaign: gclidData.campaign
  };
};

/**
 * Initialize GCLID tracking on page load
 */
export const initializeGCLIDTracking = (): void => {
  // Capture GCLID on page load
  captureGCLID();
  
  // Auto-populate existing forms
  document.addEventListener('DOMContentLoaded', () => {
    populateGCLIDFields();
  });
  
  // Listen for new forms being added to DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const forms = element.querySelectorAll('form');
          forms.forEach((form) => {
            populateGCLIDFields(form as HTMLFormElement);
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

/**
 * Track conversion with GCLID
 */
export const trackConversion = (conversionLabel: string, value?: number): void => {
  const gclid = getCurrentGCLID();
  
  if (window.gtag && gclid) {
    window.gtag('event', 'conversion', {
      send_to: `AW-832201286/${conversionLabel}`,
      value: value,
      currency: 'INR',
      transaction_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      gclid: gclid
    });
    
    console.log('🎯 Conversion tracked:', { conversionLabel, value, gclid });
  }
}; 