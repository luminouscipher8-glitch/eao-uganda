import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (section-specific link), let the browser handle it
    if (hash) {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          // Smooth scroll to the section with offset for header
          const headerHeight = 80; // Approximate header height
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      // For regular navigation, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
