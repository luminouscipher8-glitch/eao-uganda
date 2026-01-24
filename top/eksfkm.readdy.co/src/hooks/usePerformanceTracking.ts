import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

export const usePerformanceTracking = () => {
  const { trackPerformance } = useAnalytics();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current || typeof window === 'undefined') return;

    const trackWebVitals = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'navigation') {
                const navEntry = entry as PerformanceNavigationTiming;
                
                trackPerformance({
                  eventName: 'page_load_time',
                  metricType: 'page_load',
                  value: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
                });

                trackPerformance({
                  eventName: 'first_contentful_paint',
                  metricType: 'first_contentful_paint',
                  value: Math.round(navEntry.loadEventStart - navEntry.fetchStart),
                });

                trackPerformance({
                  eventName: 'time_to_interactive',
                  metricType: 'page_load',
                  value: Math.round(navEntry.domInteractive - navEntry.fetchStart),
                });
              }

              if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
                trackPerformance({
                  eventName: 'first_contentful_paint',
                  metricType: 'first_contentful_paint',
                  value: Math.round(entry.startTime),
                });
              }

              if (entry.entryType === 'largest-contentful-paint') {
                trackPerformance({
                  eventName: 'largest_contentful_paint',
                  metricType: 'largest_contentful_paint',
                  value: Math.round(entry.startTime),
                });
              }

              if (entry.entryType === 'first-input') {
                trackPerformance({
                  eventName: 'first_input_delay',
                  metricType: 'first_input_delay',
                  value: Math.round((entry as any).processingStart - entry.startTime),
                });
              }

              if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                trackPerformance({
                  eventName: 'cumulative_layout_shift',
                  metricType: 'cumulative_layout_shift',
                  value: Math.round((entry as any).value * 1000) / 1000,
                });
              }
            });
          });

          observer.observe({
            entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'],
          });

          hasTracked.current = true;
        } catch (error) {
          console.error('Performance tracking error:', error);
        }
      }
    };

    if (document.readyState === 'complete') {
      trackWebVitals();
    } else {
      window.addEventListener('load', trackWebVitals);
      return () => window.removeEventListener('load', trackWebVitals);
    }
  }, [trackPerformance]);
};
