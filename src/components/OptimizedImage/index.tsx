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

  // Generate optimized image sources
  const generateOptimizedSrc = (originalSrc: string, targetWidth?: number, targetHeight?: number): string => {
    // Handle Webflow images
    if (originalSrc.includes('uploads-ssl.webflow.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();
      
      if (targetWidth) params.set('w', targetWidth.toString());
      if (targetHeight) params.set('h', targetHeight.toString());
      params.set('q', quality.toString());
      params.set('f', 'webp'); // Force WebP format
      params.set('fit', 'crop');
      params.set('auto', 'format,compress');
      
      return `${baseUrl}?${params.toString()}`;
    }
    
    // Handle Unsplash images
    if (originalSrc.includes('images.unsplash.com')) {
      const url = new URL(originalSrc);
      
      if (targetWidth) url.searchParams.set('w', targetWidth.toString());
      if (targetHeight) url.searchParams.set('h', targetHeight.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('fm', 'webp'); // Force WebP format
      
      return url.toString();
    }
    
    // For other images, return as-is or apply simple optimizations
    return originalSrc;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (originalSrc: string): string => {
    if (!width) return '';
    
    const breakpoints = [480, 768, 1024, 1280, 1536, 1920];
    const srcSetEntries = breakpoints
      .filter(bp => bp <= (width * 2)) // Don't generate sizes larger than 2x the display width
      .map(bp => {
        const optimizedSrc = generateOptimizedSrc(originalSrc, bp, height ? Math.round((height * bp) / width) : undefined);
        return `${optimizedSrc} ${bp}w`;
      });
    
    // Add the original size
    if (width && !breakpoints.includes(width)) {
      const optimizedSrc = generateOptimizedSrc(originalSrc, width, height);
      srcSetEntries.push(`${optimizedSrc} ${width}w`);
    }
    
    return srcSetEntries.join(', ');
  };

  // Generate sizes attribute
  const generateSizes = (): string => {
    if (sizes) return sizes;
    if (!width) return '100vw';
    
    return `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ${width}px`;
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

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.srcset = img.dataset.srcset || '';
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
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