import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 75,
  priority = false,
  objectFit = 'cover',
  sizes = '100vw',
  onLoad,
  onError,
  style,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image URLs with connection-aware sizing
  const generateOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif' | 'jpg' = 'webp'): string => {
    try {
      const url = new URL(originalSrc);
      
      // Get connection quality for adaptive sizing
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData
      );
      
      // Reduce quality and size for slow connections
      const adaptiveQuality = isSlowConnection ? Math.max(quality - 20, 40) : quality;
      const adaptiveWidth = isSlowConnection && width ? Math.floor(width * 0.7) : width;
      const adaptiveHeight = isSlowConnection && height ? Math.floor(height * 0.7) : height;
      
      // Handle Webflow images (major optimization target - 9,343.8 KiB total)
      if (url.hostname.includes('webflow.com')) {
        const params = new URLSearchParams();
        
        // More aggressive size limits for Webflow images
        if (adaptiveWidth) params.set('w', Math.min(adaptiveWidth, 1200).toString());
        if (adaptiveHeight) params.set('h', Math.min(adaptiveHeight, 800).toString());
        
        params.set('q', Math.min(adaptiveQuality, 75).toString()); // Max 75% quality
        params.set('fm', format);
        params.set('fit', 'crop');
        params.set('auto', 'compress');
        
        // Force smaller sizes for offscreen images
        if (!priority) {
          params.set('w', Math.min(parseInt(params.get('w') || '800'), 800).toString());
          params.set('q', Math.min(parseInt(params.get('q') || '60'), 60).toString());
        }
        
        return `${url.origin}${url.pathname}?${params.toString()}`;
      }
      
      // Handle Unsplash images (major optimization target - 2,803.8 KiB total)
      if (url.hostname.includes('unsplash.com')) {
        const params = new URLSearchParams(url.search);
        
        // Override existing parameters with optimized ones
        if (adaptiveWidth) params.set('w', Math.min(adaptiveWidth, 1200).toString());
        if (adaptiveHeight) params.set('h', Math.min(adaptiveHeight, 800).toString());
        
        params.set('q', Math.min(adaptiveQuality, 80).toString());
        params.set('auto', 'format,compress');
        params.set('fit', 'crop');
        
        // More aggressive compression for offscreen images
        if (!priority) {
          params.set('w', Math.min(parseInt(params.get('w') || '800'), 800).toString());
          params.set('q', Math.min(parseInt(params.get('q') || '65'), 65).toString());
        }
        
        return `${url.origin}${url.pathname}?${params.toString()}`;
      }
      
      // For local images, check if optimized versions exist
      if (url.pathname.startsWith('/images/')) {
        const pathWithoutExt = url.pathname.substring(0, url.pathname.lastIndexOf('.'));
        const ext = format === 'jpg' ? 'jpg' : format;
        return `${pathWithoutExt}.${ext}`;
      }
      
    } catch (e) {
      // If URL parsing fails, return original
    }
    
    return originalSrc;
  };

  // Generate responsive srcSet for different screen sizes
  const generateSrcSet = (format: 'webp' | 'avif' | 'jpg' = 'webp'): string => {
    if (!width) return '';
    
    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    const srcSetEntries = breakpoints
      .filter(bp => bp <= (width || 1920))
      .map(bp => {
        const aspectRatio = height && width ? height / width : 0.6;
        const optimizedHeight = Math.round(bp * aspectRatio);
        const optimizedSrc = generateOptimizedSrc(src, format);
        
        try {
          const url = new URL(optimizedSrc);
          const params = new URLSearchParams(url.search);
          params.set('w', bp.toString());
          if (optimizedHeight) params.set('h', optimizedHeight.toString());
          
          return `${url.origin}${url.pathname}?${params.toString()} ${bp}w`;
        } catch (e) {
          return `${optimizedSrc} ${bp}w`;
        }
      });
    
    return srcSetEntries.join(', ');
  };

  // Set up intersection observer for lazy loading with enhanced deferring
  useEffect(() => {
    if (priority || !imgRef.current) return;

    // More aggressive lazy loading for offscreen images
    const rootMargin = priority ? '0px' : '200px'; // Larger margin for non-critical images
    const threshold = priority ? 0.1 : 0.01; // Lower threshold for offscreen images

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay for offscreen images to prioritize critical resources
          const delay = priority ? 0 : 100;
          
          setTimeout(() => {
            setIsInView(true);
            observerRef.current?.disconnect();
          }, delay);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Set current source when in view
  useEffect(() => {
    if (isInView && !currentSrc) {
      setCurrentSrc(generateOptimizedSrc(src, 'webp'));
    }
  }, [isInView, src, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError) {
      // Try fallback to JPEG
      setHasError(true);
      setCurrentSrc(generateOptimizedSrc(src, 'jpg'));
    } else {
      onError?.();
    }
  };

  // Placeholder while loading
  const PlaceholderDiv = () => (
    <div
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={{
        width: width || '100%',
        height: height || '200px',
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
        ...style,
      }}
    >
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  // Show placeholder until image is in view
  if (!isInView) {
    return (
      <div ref={imgRef}>
        <PlaceholderDiv />
      </div>
    );
  }

  return (
    <picture>
      {/* AVIF source (best compression) */}
      {generateSrcSet('avif') && (
        <source
          type="image/avif"
          srcSet={generateSrcSet('avif')}
          sizes={sizes}
        />
      )}
      
      {/* WebP source (good compression) */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
      />
      
      {/* JPEG fallback */}
      <source
        type="image/jpeg"
        srcSet={generateSrcSet('jpg')}
        sizes={sizes}
      />
      
      {/* Fallback img element */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{
          objectFit,
          width: width || '100%',
          height: height || 'auto',
          ...style,
        }}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
};

export default OptimizedImage; 