import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface AnalyticsContextType {
  trackPageView: (path: string, title?: string) => void;
  trackEvent: (event: any) => void;
  analytics: any;
  isAnalyticsEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error(
      'useAnalyticsContext must be used within an AnalyticsProvider'
    );
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  const analyticsHook = useAnalytics();

  // Track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = Math.round((currentScroll / scrollHeight) * 100);

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;

        // Track scroll depth milestones
        if (scrollPercentage >= 25 && scrollPercentage < 50) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            analyticsHook.analytics.trackScrollDepth(25);
          }, 1000);
        } else if (scrollPercentage >= 50 && scrollPercentage < 75) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            analyticsHook.analytics.trackScrollDepth(50);
          }, 1000);
        } else if (scrollPercentage >= 75 && scrollPercentage < 90) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            analyticsHook.analytics.trackScrollDepth(75);
          }, 1000);
        } else if (scrollPercentage >= 90) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            analyticsHook.analytics.trackScrollDepth(90);
          }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [analyticsHook.analytics]);

  // Track page load time
  useEffect(() => {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    if (loadTime > 0) {
      analyticsHook.analytics.trackPageLoadTime(loadTime);
    }
  }, [analyticsHook.analytics]);

  const contextValue: AnalyticsContextType = {
    trackPageView: analyticsHook.trackPageView,
    trackEvent: analyticsHook.trackEvent,
    analytics: analyticsHook.analytics,
    isAnalyticsEnabled: analyticsHook.isAnalyticsEnabled,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Higher-order component for easy analytics integration
export const withAnalytics = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const analytics = useAnalyticsContext();
    return <Component {...props} analytics={analytics} />;
  };

  WrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`;
  return WrappedComponent;
};
