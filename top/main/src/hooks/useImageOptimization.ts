import { useState, useCallback } from 'react';

interface ImageOptions {
  width?: number;
  height?: number;
}

export function useImageOptimization() {
  const [optimizedImages, setOptimizedImages] = useState<Map<string, string>>(
    new Map()
  );

  const generateBlurDataURL = useCallback(
    (_src: string, width = 40, height = 40): string => {
      // Generate a tiny blurred placeholder
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Create a gradient placeholder
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f3f4f6');
        gradient.addColorStop(1, '#e5e7eb');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        return canvas.toDataURL('image/jpeg', 0.1);
      }

      return '';
    },
    []
  );

  const optimizeImage = useCallback(
    (src: string, options: ImageOptions = {}): string => {
      const { width, height } = options;

      // Check if already optimized
      const cacheKey = `${src}-${JSON.stringify(options)}`;
      if (optimizedImages.has(cacheKey)) {
        return optimizedImages.get(cacheKey)!;
      }

      // Handle external images
      if (src.startsWith('http')) {
        return src;
      }

      // Generate optimized URL
      let optimizedSrc = src;

      // Add dimensions if provided
      if (width || height) {
        const params = new URLSearchParams();
        if (width) params.append('w', width.toString());
        if (height) params.append('h', height.toString());

        const separator = src.includes('?') ? '&' : '?';
        optimizedSrc = `${src}${separator}${params.toString()}`;
      }

      // Cache the result
      setOptimizedImages(prev => new Map(prev.set(cacheKey, optimizedSrc)));

      return optimizedSrc;
    },
    [optimizedImages]
  );

  const preloadImage = useCallback(
    (src: string, options: ImageOptions = {}): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const optimizedSrc = optimizeImage(src, options);

        img.onload = () => resolve();
        img.onerror = reject;
        img.src = optimizedSrc;
      });
    },
    [optimizeImage]
  );

  const preloadCriticalImages = useCallback(
    async (imageSources: string[], options: ImageOptions = {}) => {
      const promises = imageSources.map(src => preloadImage(src, options));
      try {
        await Promise.all(promises);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    },
    [preloadImage]
  );

  const getResponsiveSrcSet = useCallback(
    (
      src: string,
      breakpoints: number[],
      options: ImageOptions = {}
    ): string => {
      return breakpoints
        .map(breakpoint => {
          const optimizedSrc = optimizeImage(src, {
            ...options,
            width: breakpoint,
          });
          return `${optimizedSrc} ${breakpoint}w`;
        })
        .join(', ');
    },
    [optimizeImage]
  );

  return {
    optimizeImage,
    preloadImage,
    preloadCriticalImages,
    generateBlurDataURL,
    getResponsiveSrcSet,
    optimizedImages,
  };
}
