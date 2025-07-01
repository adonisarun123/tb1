import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  srcSet?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  decoding?: 'sync' | 'async' | 'auto';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  srcSet,
  fetchPriority = 'auto',
  loading = 'lazy',
  width,
  height,
  quality = 80,
  format = 'webp',
  placeholder,
  onLoad,
  onError,
  style,
  decoding = 'async',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use intersection observer for better lazy loading control
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
  });

  // Generate optimized image URLs for different formats
  const generateOptimizedSrc = (originalSrc: string, targetFormat?: string) => {
    // If it's an external URL (Unsplash, Webflow, etc.), add optimization parameters
    try {
      const url = new URL(originalSrc);
      
      // Unsplash optimization
      if (url.hostname.includes('unsplash.com')) {
        const params = new URLSearchParams();
        if (width) params.set('w', width.toString());
        if (height) params.set('h', height.toString());
        params.set('q', quality.toString());
        params.set('auto', 'format');
        params.set('fit', 'crop');
        if (targetFormat) params.set('fm', targetFormat);
        
        return `${url.origin}${url.pathname}?${params.toString()}`;
      }
      
      // Webflow optimization
      if (url.hostname.includes('webflow.com')) {
        const params = new URLSearchParams(url.search);
        if (width) params.set('w', width.toString());
        if (height) params.set('h', height.toString());
        params.set('q', quality.toString());
        if (targetFormat) params.set('format', targetFormat);
        
        return `${url.origin}${url.pathname}?${params.toString()}`;
      }
    } catch (e) {
      // If URL parsing fails, return original
    }
    
    return originalSrc;
  };

  // Generate responsive srcSet
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    const widths = [320, 640, 768, 1024, 1280, 1920];
    const optimizedSources = widths.map(w => {
      const optimizedSrc = generateOptimizedSrc(src);
      try {
        const url = new URL(optimizedSrc);
        const params = new URLSearchParams(url.search);
        params.set('w', w.toString());
        if (quality) params.set('q', quality.toString());
        return `${url.origin}${url.pathname}?${params.toString()} ${w}w`;
      } catch (e) {
        return `${optimizedSrc} ${w}w`;
      }
    });
    
    return optimizedSources.join(', ');
  };

  // Generate modern format sources for picture element
  const generateModernSources = () => {
    const sources = [];
    
    // AVIF support (best compression)
    if ('serviceWorker' in navigator) {
      sources.push({
        type: 'image/avif',
        srcSet: generateOptimizedSrc(src, 'avif'),
      });
    }
    
    // WebP support (better than JPEG)
    sources.push({
      type: 'image/webp',
      srcSet: generateOptimizedSrc(src, 'webp'),
    });
    
    return sources;
  };

  // Handle image loading
  useEffect(() => {
    if (!inView || loading === 'eager') return;
    
    setIsIntersecting(true);
    setCurrentSrc(generateOptimizedSrc(src, format));
  }, [inView, src, format, quality, width, height]);

  // Immediate loading for eager images
  useEffect(() => {
    if (loading === 'eager') {
      setIsIntersecting(true);
      setCurrentSrc(generateOptimizedSrc(src, format));
    }
  }, [loading, src, format]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original format if modern format fails
    if (format !== 'jpg' && !hasError) {
      setCurrentSrc(generateOptimizedSrc(src, 'jpg'));
      setHasError(false);
    } else {
      onError?.();
    }
  };

  // Placeholder component
  const Placeholder = () => (
    <div
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={{
        width: width || '100%',
        height: height || '200px',
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
        ...style,
      }}
    >
      {placeholder || (
        <svg
          className="w-10 h-10 text-gray-400"
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
      )}
    </div>
  );

  // Error fallback
  if (hasError && format === 'jpg') {
    return <Placeholder />;
  }

  // If not in view and lazy loading, show placeholder
  if (!isIntersecting && loading === 'lazy') {
    return (
      <div ref={ref}>
        <Placeholder />
      </div>
    );
  }

  // Check if we should use picture element for modern formats
  const modernSources = generateModernSources();
  const shouldUsePicture = modernSources.length > 0 && !src.includes('.webp') && !src.includes('.avif');

  if (shouldUsePicture) {
    return (
      <picture ref={ref} className={className}>
        {modernSources.map((source, index) => (
          <source
            key={index}
            type={source.type}
            srcSet={source.srcSet}
            sizes={sizes}
          />
        ))}
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={style}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </picture>
    );
  }

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={style}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={generateSrcSet()}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default LazyImage; 