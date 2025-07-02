import React, { Suspense, lazy } from 'react';

// Loading spinner component
const LoadingSpinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4C39]"></div>
  </div>
);

// Error boundary for lazy components
class LazyComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-center text-gray-500">
          <p>Sorry, this component failed to load.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-[#FF4C39] text-white rounded hover:bg-[#E6412B]"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for lazy loading with error boundary
const withLazyLoading = <P extends object>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<P>>,
  fallback?: React.ReactNode
) => {
  return React.forwardRef<any, P>((props, ref) => (
    <LazyComponentErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || <LoadingSpinner />}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    </LazyComponentErrorBoundary>
  ));
};

// Lazy load heavy components that are not immediately needed

// AI Components (only loaded when needed)
export const LazyAIRecommendations = withLazyLoading(
  lazy(() => import('../AIRecommendations')),
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        <span>AI-Powered Recommendations</span>
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg h-[520px] animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-xl"></div>
          <div className="p-5 space-y-4">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const LazyAIChatbot = withLazyLoading(
  lazy(() => import('../AIChatbot')),
  <div className="fixed bottom-6 right-6 z-50">
    <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
  </div>
);

export const LazyAISearchWidget = withLazyLoading(
  lazy(() => import('../AISearchWidget')),
  <div className="max-w-2xl mx-auto">
    <div className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
  </div>
);

// Form Components (heavy forms with validation)
export const LazySmartForm = withLazyLoading(
  lazy(() => import('../SmartForm')),
  <div className="max-w-2xl mx-auto">
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
      ))}
      <div className="h-12 bg-[#FF4C39] rounded animate-pulse"></div>
    </div>
  </div>
);

export const LazyContactForm = withLazyLoading(
  lazy(() => import('../ContactForm')),
  <div className="space-y-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
    ))}
    <div className="h-12 bg-[#FF4C39] rounded animate-pulse"></div>
  </div>
);

// Gallery and Media Components
export const LazyGalleryModal = withLazyLoading(
  lazy(() => import('../GalleryModal')),
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="w-full max-w-4xl h-96 bg-gray-200 rounded animate-pulse"></div>
  </div>
);

// Analytics Components (loaded only when needed)
export const LazyAnalytics = withLazyLoading(
  lazy(() => import('../Analytics')),
  <LoadingSpinner className="h-32" />
);

export const LazyCustomAnalytics = withLazyLoading(
  lazy(() => import('../CustomAnalytics')),
  <LoadingSpinner className="h-16" />
);

// Blog Components
export const LazyBlogMainSection = withLazyLoading(
  lazy(() => import('../BlogMainSection')),
  <div className="space-y-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex space-x-4">
        <div className="w-48 h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// Utility function to preload components
export const preloadComponent = (componentName: keyof typeof import('../LazyComponents')) => {
  switch (componentName) {
    case 'LazyAIRecommendations':
      return import('../AIRecommendations');
    case 'LazyAIChatbot':
      return import('../AIChatbot');
    case 'LazyAISearchWidget':
      return import('../AISearchWidget');
    case 'LazySmartForm':
      return import('../SmartForm');
    case 'LazyContactForm':
      return import('../ContactForm');
    case 'LazyGalleryModal':
      return import('../GalleryModal');
    case 'LazyAnalytics':
      return import('../Analytics');
    case 'LazyCustomAnalytics':
      return import('../CustomAnalytics');
    case 'LazyBlogMainSection':
      return import('../BlogMainSection');
    default:
      return Promise.resolve();
  }
};

// Hook for conditional preloading based on user interaction
export const useConditionalPreload = () => {
  const preloadOnInteraction = React.useCallback(() => {
    // Preload AI components when user interacts
    preloadComponent('LazyAIRecommendations');
    preloadComponent('LazyAIChatbot');
  }, []);

  const preloadFormsOnScroll = React.useCallback(() => {
    // Preload forms when user scrolls down
    preloadComponent('LazySmartForm');
    preloadComponent('LazyContactForm');
  }, []);

  React.useEffect(() => {
    let hasInteracted = false;
    let hasScrolled = false;

    const handleInteraction = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        preloadOnInteraction();
      }
    };

    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 1000) {
        hasScrolled = true;
        preloadFormsOnScroll();
      }
    };

    // Add event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [preloadOnInteraction, preloadFormsOnScroll]);
};

export default {
  LazyAIRecommendations,
  LazyAIChatbot,
  LazyAISearchWidget,
  LazySmartForm,
  LazyContactForm,
  LazyGalleryModal,
  LazyAnalytics,
  LazyCustomAnalytics,
  LazyBlogMainSection,
  preloadComponent,
  useConditionalPreload
}; 