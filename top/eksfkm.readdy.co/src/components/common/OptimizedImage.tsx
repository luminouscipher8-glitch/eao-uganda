import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP and fallback sources
  const generateSources = () => {
    const isExternal = src.startsWith('http');
    if (isExternal) {
      return {
        webp: src,
        fallback: src,
      };
    }

    const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '');

    return {
      webp: `${baseSrc}.webp`,
      fallback: src,
    };
  };

  const { webp, fallback } = generateSources();

  useEffect(() => {
    // Check WebP support
    const checkWebPSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        if (!canvas || !canvas.getContext) return false;
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) return false;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } catch {
        return false;
      }
    };

    const supportsWebP = checkWebPSupport();
    setCurrentSrc(supportsWebP ? webp : fallback);
  }, [webp, fallback]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallback) {
      // Fallback to original image if WebP fails
      setCurrentSrc(fallback);
    } else {
      setHasError(true);
      onError?.();
    }
  };

  const placeholderStyle =
    placeholder === 'blur' && blurDataURL
      ? {
          backgroundImage: `url(${blurDataURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }
      : {};

  const loadingStyle = !isLoaded
    ? {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
      }
    : {
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out',
      };

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-4">
          <i className="ri-image-line text-4xl text-gray-400 mb-2"></i>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <div className="absolute inset-0 z-10" style={placeholderStyle} />
      )}

      {/* Loading skeleton */}
      {!isLoaded && <div className="absolute inset-0 z-0 loading-skeleton" />}

      {/* Main image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${isLoaded ? 'loaded' : 'loading'}`}
        style={loadingStyle}
        decoding="async"
      />

      {/* Priority loading indicator */}
      {priority && !isLoaded && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full z-20">
          Priority
        </div>
      )}
    </div>
  );
}
