import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'navigation':
              const navEntry = entry as PerformanceNavigationTiming;
              console.log('Navigation Performance:', {
                domContentLoaded:
                  navEntry.domContentLoadedEventEnd -
                  navEntry.domContentLoadedEventStart,
                loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                firstPaint: navEntry.responseStart - navEntry.requestStart,
              });
              break;

            case 'paint':
              console.log(`${entry.name}: ${entry.startTime}ms`);
              break;

            case 'largest-contentful-paint':
              console.log(`LCP: ${entry.startTime}ms`);
              break;

            case 'first-input':
              console.log(
                `FID: ${(entry as any).processingStart - entry.startTime}ms`
              );
              break;

            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                console.log(`CLS: ${(entry as any).value}`);
              }
              break;
          }
        }
      });

      observer.observe({
        entryTypes: [
          'navigation',
          'paint',
          'largest-contentful-paint',
          'first-input',
          'layout-shift',
        ],
      });

      return () => observer.disconnect();
    }
  }, []);
}

export function reportWebVitals(metric: any) {
  // In production, send to analytics service
  if (import.meta.env.PROD) {
    // Example: send to Google Analytics, Vercel Analytics, etc.
    console.log('Web Vital:', metric);
  }
}
