import { useEffect, useCallback } from 'react';
import { useAnalytics } from './useAnalytics';

export const useScrollTracking = () => {
  const { trackScrollDepth } = useAnalytics();

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

    const thresholds = [25, 50, 75, 90];
    
    thresholds.forEach(threshold => {
      if (scrollPercentage >= threshold) {
        trackScrollDepth(threshold);
      }
    });
  }, [trackScrollDepth]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);
};
