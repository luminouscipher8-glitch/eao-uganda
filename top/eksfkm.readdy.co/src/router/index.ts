import {
  useNavigate,
  useLocation,
  type NavigateFunction,
} from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import routes, { routeMeta } from './config';
import { usePerformance } from '../hooks/usePerformance';

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>(resolve => {
  navigateResolver = resolve;
});

// Scroll to top on route change
function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Force immediate scroll to top first
    window.scrollTo(0, 0);

    // Then smooth scroll after content is rendered
    const timer = setTimeout(() => {
      const supportsSmoothScroll = 'scrollBehavior' in document.documentElement;

      if (location.hash) {
        // If there's a hash, try to scroll to the element
        const element = document.querySelector(location.hash);
        if (element) {
          if (supportsSmoothScroll) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          } else {
            element.scrollIntoView({
              block: 'start',
            });
          }
        } else {
          // If hash element doesn't exist, scroll to top
          if (supportsSmoothScroll) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          } else {
            window.scrollTo(0, 0);
          }
        }
      } else {
        // If no hash, scroll to top
        if (supportsSmoothScroll) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          window.scrollTo(0, 0);
        }
      }
    }, 50); // Reduced delay for faster response

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);
}

// SEO and Analytics hook
function useRouteSEO() {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname as keyof typeof routeMeta];
    if (meta) {
      // Update document title
      document.title = meta.title;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute('content', meta.description);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );

      if (ogTitle) ogTitle.setAttribute('content', meta.title);
      if (ogDescription)
        ogDescription.setAttribute('content', meta.description);

      // Track page view (in production, send to analytics)
      if (import.meta.env.PROD) {
        console.log('Page view:', location.pathname, meta.title);
        // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: location.pathname });
      }
    }
  }, [location]);
}

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();

  // Performance monitoring
  usePerformance();

  // Scroll to top on route change
  useScrollToTop();

  // SEO updates
  useRouteSEO();

  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  }, [navigate]);

  // Force scroll reset on mount
  useEffect(() => {
    // Reset any browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  return element;
}
