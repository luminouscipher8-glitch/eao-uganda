import React, { useState, useCallback } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fallbackType?: 'placeholder' | 'gradient' | 'solid';
  fallbackColor?: string;
  onLoad?: () => void;
  onError?: (error: React.SyntheticEvent<HTMLImageElement>) => void;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  srcSet?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  fallbackType = 'gradient',
  fallbackColor = 'bg-gradient-to-br from-teal-100 to-amber-100',
  onLoad,
  onError,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  srcSet,
  width,
  height,
  style,
  children,
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>(
    'loading'
  );
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 2;

  const handleLoad = useCallback(() => {
    setImageState('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(
    (error: React.SyntheticEvent<HTMLImageElement>) => {
      if (retryCount < maxRetries) {
        // Retry the image load
        setRetryCount(prev => prev + 1);
        const img = error.currentTarget;
        img.src = src + `?retry=${retryCount + 1}`;
      } else {
        setImageState('error');
        onError?.(error);
      }
    },
    [onError, retryCount, src]
  );

  const renderFallback = useCallback(() => {
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          loading={loading}
          decoding={decoding}
          style={style}
        />
      );
    }

    switch (fallbackType) {
      case 'placeholder':
        return (
          <div
            className={`flex items-center justify-center ${fallbackColor} ${className}`}
            style={style}
          >
            <div className="text-center p-4">
              <i className="ri-image-line text-4xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">Image unavailable</p>
            </div>
          </div>
        );

      case 'solid':
        return (
          <div
            className={`${fallbackColor} ${className}`}
            style={style}
            role="img"
            aria-label={alt}
          />
        );

      case 'gradient':
      default:
        return (
          <div
            className={`relative flex items-center justify-center ${fallbackColor} ${className}`}
            style={style}
            role="img"
            aria-label={alt}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-amber-50 to-gray-100"></div>
            <div className="relative text-center p-4">
              <i className="ri-image-line text-4xl text-teal-600 mb-2 opacity-50"></i>
              <p className="text-xs text-gray-600 opacity-70">
                Image loading...
              </p>
            </div>
          </div>
        );
    }
  }, [
    fallbackSrc,
    fallbackType,
    fallbackColor,
    className,
    loading,
    decoding,
    style,
    alt,
  ]);

  if (imageState === 'error') {
    return renderFallback();
  }

  return (
    <div className={`relative ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${imageState === 'loading' ? 'opacity-0' : 'opacity-100'}
          ${className}
        `}
        style={style}
      />

      {/* Loading skeleton */}
      {imageState === 'loading' && (
        <div
          className={`
            absolute inset-0 bg-gradient-to-br from-teal-100 to-amber-100 
            animate-pulse
            ${className}
          `}
          style={style}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <i className="ri-loader-4-line text-3xl text-teal-600 animate-spin"></i>
            </div>
          </div>
        </div>
      )}

      {/* Overlay content */}
      {children && imageState === 'loaded' && (
        <div className="absolute inset-0">{children}</div>
      )}
    </div>
  );
};

// Specialized components for common use cases
export const AvatarImage: React.FC<
  Omit<ImageWithFallbackProps, 'fallbackType' | 'fallbackColor'>
> = props => (
  <ImageWithFallback
    {...props}
    fallbackType="gradient"
    fallbackColor="bg-gradient-to-br from-teal-200 to-amber-200"
    className={`rounded-full ${props.className || ''}`}
  />
);

export const CardImage: React.FC<
  Omit<ImageWithFallbackProps, 'fallbackType'>
> = props => (
  <ImageWithFallback
    {...props}
    fallbackType="gradient"
    className={`rounded-xl ${props.className || ''}`}
  />
);

export const HeroImage: React.FC<
  Omit<ImageWithFallbackProps, 'fallbackType' | 'loading'>
> = props => (
  <ImageWithFallback
    {...props}
    fallbackType="gradient"
    fallbackColor="bg-gradient-to-br from-teal-600 to-amber-600"
    loading="eager"
    className={`w-full h-full object-cover ${props.className || ''}`}
  />
);
