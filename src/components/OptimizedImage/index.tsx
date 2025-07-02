import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: 'blur' | 'empty';
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  sizes,
  onLoad,
  onError,
  placeholder = 'blur',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image sources with aggressive optimization
  const generateOptimizedSrc = (originalSrc: string, targetWidth?: number, targetHeight?: number): string => {
    // Handle Webflow images with EXTREME optimization for PageSpeed
    if (originalSrc.includes('uploads-ssl.webflow.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();
      
      // Use extremely small dimensions to save massive bandwidth
      const optimalWidth = targetWidth || (width && width < 200 ? width : 200);
      const optimalHeight = targetHeight || (height && height < 150 ? height : 150);
      
      params.set('w', optimalWidth.toString());
      if (optimalHeight) params.set('h', optimalHeight.toString());
      params.set('q', '50'); // Reduce quality to 50 for massive bandwidth savings
      params.set('f', 'webp'); // Force WebP format
      params.set('fit', 'crop');
      params.set('auto', 'format,compress');
      params.set('dpr', '1'); // Prevent high DPI issues
      
      return `${baseUrl}?${params.toString()}`;
    }
    
    // Handle Unsplash images with optimization
    if (originalSrc.includes('images.unsplash.com')) {
      const url = new URL(originalSrc);
      
      const optimalWidth = targetWidth || (width && width < 1200 ? width : 1200);
      const optimalHeight = targetHeight || (height && height < 800 ? height : 800);
      
      url.searchParams.set('w', optimalWidth.toString());
      if (optimalHeight) url.searchParams.set('h', optimalHeight.toString());
      url.searchParams.set('q', Math.min(quality, 80).toString());
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('fm', 'webp'); // Force WebP format
      
      return url.toString();
    }
    
    // Handle local images - convert to WebP if possible
    if (originalSrc.startsWith('/') && !originalSrc.includes('.webp')) {
      // For local images, try to use WebP version
      const extension = originalSrc.split('.').pop();
      if (extension && ['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())) {
        return originalSrc.replace(new RegExp(`\\.${extension}$`, 'i'), '.webp');
      }
    }
    
    return originalSrc;
  };

  // Generate srcSet for responsive images with ultra-conservative sizes
  const generateSrcSet = (originalSrc: string): string => {
    if (!width) return '';
    
    // Use much smaller breakpoints to reduce bandwidth dramatically
    const breakpoints = [150, 200, 300, 400];
    const maxWidth = Math.min(width, 400); // Cap at 400px for most images
    
    const srcSetEntries = breakpoints
      .filter(bp => bp <= maxWidth * 1.5) // Don't generate excessive sizes
      .map(bp => {
        const scaledHeight = height ? Math.round((height * bp) / width) : undefined;
        const optimizedSrc = generateOptimizedSrc(originalSrc, bp, scaledHeight);
        return `${optimizedSrc} ${bp}w`;
      });
    
    // Add the target size if not already included
    if (maxWidth && !breakpoints.includes(maxWidth)) {
      const optimizedSrc = generateOptimizedSrc(originalSrc, maxWidth, height);
      srcSetEntries.push(`${optimizedSrc} ${maxWidth}w`);
    }
    
    return srcSetEntries.join(', ');
  };

  // Generate sizes attribute with bandwidth-conscious defaults
  const generateSizes = (): string => {
    if (sizes) return sizes;
    if (!width) return '(max-width: 768px) 100vw, 50vw';
    
    // More conservative sizing to reduce bandwidth
    const maxDisplayWidth = Math.min(width, 800);
    return `(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, ${maxDisplayWidth}px`;
  };

  // Generate blur placeholder
  const generateBlurPlaceholder = (): string => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="sans-serif" font-size="${Math.min((width || 400) / 20, 16)}">Loading...</text>
      </svg>
    `)}`;
  };

  useEffect(() => {
    const optimizedSrc = generateOptimizedSrc(src, width, height);
    setCurrentSrc(optimizedSrc);
  }, [src, width, height, quality]);

  useEffect(() => {
    if (!imgRef.current || !currentSrc || priority) return;

    // Enhanced Intersection Observer for aggressive lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            // Add delay to ensure critical resources load first
            setTimeout(() => {
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.srcset = img.dataset.srcset || '';
                observer.unobserve(img);
              }
            }, entry.target.getBoundingClientRect().top > window.innerHeight ? 500 : 100);
          }
        });
      },
      { 
        rootMargin: '100px', // Load when closer to viewport
        threshold: 0.1 // Load when 10% visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [currentSrc, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
    
    // Fallback to original image if optimized version fails
    if (currentSrc !== src) {
      setCurrentSrc(src);
      setHasError(false);
    }
  };

  const srcSet = generateSrcSet(src);
  const sizesAttr = generateSizes();

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={generateBlurPlaceholder()}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ filter: 'blur(10px)', transform: 'scale(1.1)' }}
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={priority ? currentSrc : undefined}
        data-src={!priority ? currentSrc : undefined}
        data-srcset={!priority ? srcSet : undefined}
        srcSet={priority ? srcSet : undefined}
        sizes={sizesAttr}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${!priority ? 'lazy' : ''}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div>Image unavailable</div>
          </div>
        </div>
      )}
      
      {/* Loading indicator for priority images */}
      {priority && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 