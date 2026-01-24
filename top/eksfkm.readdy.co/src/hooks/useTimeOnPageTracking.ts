import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

export const useTimeOnPageTracking = () => {
  const { trackTimeOnPage } = useAnalytics();
  const startTime = useRef<number>(Date.now());
  const intervalsTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const trackTimeIntervals = () => {
      const currentTime = Date.now();
      const timeOnPage = Math.floor((currentTime - startTime.current) / 1000);

      const intervals = [30, 60, 180];
      
      intervals.forEach(interval => {
        if (timeOnPage >= interval && !intervalsTracked.current.has(interval)) {
          intervalsTracked.current.add(interval);
          trackTimeOnPage(interval);
        }
      });
    };

    intervalId = setInterval(trackTimeIntervals, 5000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        startTime.current = Date.now();
        intervalsTracked.current.clear();
        intervalId = setInterval(trackTimeIntervals, 5000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackTimeOnPage]);
};
