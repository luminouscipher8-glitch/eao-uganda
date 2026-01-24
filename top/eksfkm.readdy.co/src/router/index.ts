import { useNavigate, useLocation, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes, { routeMeta } from "./config";
import { usePerformance } from "../hooks/usePerformance";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

// SEO and Analytics hook
function useRouteSEO() {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname as keyof typeof routeMeta];
    if (meta) {
      // Update document title
      document.title = meta.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', meta.description);
      }
      
      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      
      if (ogTitle) ogTitle.setAttribute('content', meta.title);
      if (ogDescription) ogDescription.setAttribute('content', meta.description);
      
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
  
  // SEO updates
  useRouteSEO();
  
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  }, [navigate]);
  
  return element;
}
