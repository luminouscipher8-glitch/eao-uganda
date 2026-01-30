import { useCallback } from 'react';
import { toast } from '../components/common/Toast';

interface ImageErrorInfo {
  src: string;
  alt: string;
  timestamp: number;
  retryCount: number;
}

// Global image error tracking
const imageErrors = new Map<string, ImageErrorInfo>();

export const useImageErrorHandler = () => {
  const handleImageError = useCallback(
    (error: React.SyntheticEvent<HTMLImageElement>, customMessage?: string) => {
      const img = error.currentTarget;
      const src = img.src;

      // Get or create error info
      let errorInfo = imageErrors.get(src);
      if (!errorInfo) {
        errorInfo = {
          src,
          alt: img.alt || 'Image',
          timestamp: Date.now(),
          retryCount: 0,
        };
      }

      errorInfo.retryCount++;
      imageErrors.set(src, errorInfo);

      // Log error for debugging
      console.warn(`Image failed to load (attempt ${errorInfo.retryCount}):`, {
        src: errorInfo.src,
        alt: errorInfo.alt,
        retryCount: errorInfo.retryCount,
        timestamp: new Date(errorInfo.timestamp).toISOString(),
      });

      // Show toast notification for critical images (after 2+ retries)
      if (errorInfo.retryCount >= 2 && !src.includes('readdy.ai')) {
        toast.error(
          'Image Loading Issue',
          customMessage || `Unable to load image: ${errorInfo.alt}`,
          5000
        );
      }

      // Clean up old error entries (older than 5 minutes)
      const now = Date.now();
      for (const [key, info] of imageErrors.entries()) {
        if (now - info.timestamp > 5 * 60 * 1000) {
          imageErrors.delete(key);
        }
      }
    },
    []
  );

  const getImageErrorStats = useCallback(() => {
    const stats = {
      totalErrors: imageErrors.size,
      recentErrors: 0,
      errorsByDomain: {} as Record<string, number>,
    };

    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    for (const [src, info] of imageErrors.entries()) {
      if (info.timestamp >= fiveMinutesAgo) {
        stats.recentErrors++;
      }

      try {
        const domain = new URL(src).hostname;
        stats.errorsByDomain[domain] = (stats.errorsByDomain[domain] || 0) + 1;
      } catch {
        // Invalid URL, skip domain tracking
      }
    }

    return stats;
  }, []);

  const clearErrorHistory = useCallback(() => {
    imageErrors.clear();
  }, []);

  const retryFailedImages = useCallback(() => {
    // This could be expanded to actually retry failed images
    const failedImages = Array.from(imageErrors.entries())
      .filter(([_, info]) => info.retryCount >= 2)
      .map(([src, info]) => ({
        src,
        alt: info.alt,
        retryCount: info.retryCount,
      }));

    console.log('Images that could be retried:', failedImages);
    return failedImages;
  }, []);

  return {
    handleImageError,
    getImageErrorStats,
    clearErrorHistory,
    retryFailedImages,
  };
};

// Global image error monitoring (for development/debugging)
export const monitorImageErrors = () => {
  // Add global error listener for unhandled image errors
  if (typeof window !== 'undefined') {
    window.addEventListener(
      'error',
      event => {
        if (
          event.target &&
          (event.target as HTMLImageElement).tagName === 'IMG'
        ) {
          const img = event.target as HTMLImageElement;
          console.error('Unhandled image error:', {
            src: img.src,
            alt: img.alt,
            error: event.error,
          });
        }
      },
      true
    );
  }
};

// Utility function to check if an image URL is external
export const isExternalImage = (src: string): boolean => {
  try {
    const url = new URL(src, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

// Utility function to get image domain
export const getImageDomain = (src: string): string => {
  try {
    return new URL(src, window.location.origin).hostname;
  } catch {
    return 'unknown';
  }
};
