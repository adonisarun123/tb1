import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  lowQualitySrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  lowQualitySrc,
  onLoad,
  onError,
  style,
  width,
  height,
  loading = 'lazy',
  decoding = 'async'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setInView(true);
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
    }
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '50px', // Start loading 50px before the image comes into view
      threshold: 0.1
    });

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleImageError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Preload image when in view
  useEffect(() => {
    if (inView && !imageLoaded && !imageError) {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = src;
    }
  }, [inView, imageLoaded, imageError, src, handleImageLoad, handleImageError]);

  // Base styles for image container
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    ...style
  };

  // Image styles
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease-in-out',
    opacity: imageLoaded ? 1 : 0
  };

  // Placeholder styles
  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    fontSize: '14px',
    transition: 'opacity 0.3s ease-in-out',
    opacity: imageLoaded ? 0 : 1,
    pointerEvents: 'none'
  };

  return (
    <div 
      ref={imgRef}
      className={className}
      style={containerStyle}
    >
      {/* Low quality placeholder or loading state */}
      {lowQualitySrc && !imageLoaded && (
        <img
          src={lowQualitySrc}
          alt={alt}
          style={{
            ...imageStyle,
            filter: 'blur(5px)',
            opacity: 1
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          style={imageStyle}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Placeholder content */}
      {!imageLoaded && !lowQualitySrc && (
        <div style={placeholderStyle}>
          {imageError ? (
            <span>Failed to load image</span>
          ) : placeholder ? (
            <span>{placeholder}</span>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-2"></div>
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LazyImage; 