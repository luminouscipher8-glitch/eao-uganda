import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAnalyticsContext } from '../components/providers/AnalyticsProvider.tsx';

// Core Web Vitals types
export interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  inp: number;
}

// Performance metrics
export interface PerformanceMetrics {
  navigation: PerformanceNavigationTiming;
  paint: PerformancePaintTiming[];
  resources: PerformanceResourceTiming[];
  vitals: CoreWebVitals;
  memory?: any;
  timestamp: number;
  url: string;
  userAgent: string;
}

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const vitalsRef = useRef<Partial<CoreWebVitals>>({});
  const { trackEvent } = useAnalyticsContext();

  // Get performance rating
  const getPerformanceRating = (
    value: number,
    metric: keyof typeof PERFORMANCE_THRESHOLDS
  ): 'good' | 'needs-improvement' | 'poor' => {
    const threshold = PERFORMANCE_THRESHOLDS[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  // Collect all performance metrics
  const collectMetrics = useCallback(async () => {
    try {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      const resources = performance.getEntriesByType('resource');

      const vitals: CoreWebVitals = {
        lcp: 0,
        fid: 0,
        cls: 0,
        fcp: 0,
        ttfb: navigation
          ? navigation.responseStart - navigation.requestStart
          : 0,
        inp: 0,
      };

      vitalsRef.current = vitals;

      const performanceData: PerformanceMetrics = {
        navigation,
        paint: paint as PerformancePaintTiming[],
        resources: resources as PerformanceResourceTiming[],
        vitals,
        memory: (performance as any).memory,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      setMetrics(performanceData);

      if (trackEvent && !import.meta.env.DEV) {
        trackEvent({
          action: 'performance_metrics',
          category: 'performance',
          label: 'core_web_vitals',
          value: Math.round(vitals.lcp),
          customParameters: {
            lcp: Math.round(vitals.lcp),
            fid: Math.round(vitals.fid),
            cls: vitals.cls.toFixed(3),
            fcp: Math.round(vitals.fcp),
            ttfb: Math.round(vitals.ttfb),
            inp: Math.round(vitals.inp),
          },
        });
      }

      return performanceData;
    } catch (error) {
      console.error('Error collecting performance metrics:', error);
      return null;
    }
  }, [trackEvent, getPerformanceRating]);

  // Start performance monitoring
  const startMonitoring = useCallback(() => {
    if (isMonitoring) return;

    setIsMonitoring(true);

    if (document.readyState === 'complete') {
      setTimeout(collectMetrics, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(collectMetrics, 100);
      });
    }
  }, [collectMetrics, isMonitoring]);

  // Stop performance monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Get performance score (0-100)
  const getPerformanceScore = useCallback(
    (vitals: CoreWebVitals): number => {
      const lcpScore =
        getPerformanceRating(vitals.lcp, 'LCP') === 'good'
          ? 100
          : getPerformanceRating(vitals.lcp, 'LCP') === 'needs-improvement'
            ? 50
            : 0;

      const fidScore =
        getPerformanceRating(vitals.fid, 'FID') === 'good'
          ? 100
          : getPerformanceRating(vitals.fid, 'FID') === 'needs-improvement'
            ? 50
            : 0;

      const clsScore =
        getPerformanceRating(vitals.cls, 'CLS') === 'good'
          ? 100
          : getPerformanceRating(vitals.cls, 'CLS') === 'needs-improvement'
            ? 50
            : 0;

      const fcpScore =
        getPerformanceRating(vitals.fcp, 'FCP') === 'good'
          ? 100
          : getPerformanceRating(vitals.fcp, 'FCP') === 'needs-improvement'
            ? 50
            : 0;

      const ttfbScore =
        getPerformanceRating(vitals.ttfb, 'TTFB') === 'good'
          ? 100
          : getPerformanceRating(vitals.ttfb, 'TTFB') === 'needs-improvement'
            ? 50
            : 0;

      const inpScore =
        getPerformanceRating(vitals.inp, 'INP') === 'good'
          ? 100
          : getPerformanceRating(vitals.inp, 'INP') === 'needs-improvement'
            ? 50
            : 0;

      return Math.round(
        (lcpScore + fidScore + clsScore + fcpScore + ttfbScore + inpScore) / 6
      );
    },
    [getPerformanceRating]
  );

  // Get performance recommendations
  const getPerformanceRecommendations = useCallback(
    (vitals: CoreWebVitals): string[] => {
      const recommendations: string[] = [];

      if (getPerformanceRating(vitals.lcp, 'LCP') === 'poor') {
        recommendations.push('Optimize images and reduce server response time');
      }
      if (getPerformanceRating(vitals.fid, 'FID') === 'poor') {
        recommendations.push(
          'Reduce JavaScript execution time and main-thread work'
        );
      }
      if (getPerformanceRating(vitals.cls, 'CLS') === 'poor') {
        recommendations.push(
          'Ensure elements have defined dimensions and avoid unexpected layout shifts'
        );
      }
      if (getPerformanceRating(vitals.fcp, 'FCP') === 'poor') {
        recommendations.push(
          'Reduce server response time and optimize critical resources'
        );
      }
      if (getPerformanceRating(vitals.ttfb, 'TTFB') === 'poor') {
        recommendations.push(
          'Improve server response time and reduce network latency'
        );
      }
      if (getPerformanceRating(vitals.inp, 'INP') === 'poor') {
        recommendations.push(
          'Optimize interaction handlers and reduce JavaScript blocking'
        );
      }

      return recommendations;
    },
    [getPerformanceRating]
  );

  // Auto-start monitoring
  useEffect(() => {
    if (!import.meta.env.DEV) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    collectMetrics,
    getPerformanceScore,
    getPerformanceRating,
    getPerformanceRecommendations,
    vitals: vitalsRef.current as CoreWebVitals | null,
  };
};

// Performance monitoring context
export const PerformanceContext = React.createContext<{
  metrics: PerformanceMetrics | null;
  isMonitoring: boolean;
  getPerformanceScore: (vitals: CoreWebVitals) => number;
  getPerformanceRating: (
    value: number,
    metric: keyof typeof PERFORMANCE_THRESHOLDS
  ) => 'good' | 'needs-improvement' | 'poor';
  getPerformanceRecommendations: (vitals: CoreWebVitals) => string[];
}>({
  metrics: null,
  isMonitoring: false,
  getPerformanceScore: () => 0,
  getPerformanceRating: () => 'good',
  getPerformanceRecommendations: () => [],
});

// Performance monitoring provider
export const PerformanceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const performanceData = usePerformanceMonitoring();

  return React.createElement(
    PerformanceContext.Provider,
    { value: performanceData },
    children
  );
};

// Hook to use performance context
export const usePerformanceContext = () => {
  const context = React.useContext(PerformanceContext);
  if (!context) {
    throw new Error(
      'usePerformanceContext must be used within a PerformanceProvider'
    );
  }
  return context;
};
