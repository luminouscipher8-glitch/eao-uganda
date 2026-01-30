import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { LoadingProvider } from './components/providers/LoadingProvider';
import { ToastProvider } from './components/common/Toast';
import { AnalyticsProvider } from './components/providers/AnalyticsProvider';
import { PerformanceProvider } from './hooks/usePerformanceMonitoring';
import { PerformanceToggle } from './components/performance/PerformanceDashboard';
import { HomeStructuredData } from './components/seo/StructuredData';
import SocialMediaMeta from './components/seo/SocialMediaMeta';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import routes from './router/config';
import './styles/toast-animations.css';

function AppRoutes() {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.path || 'index'}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
}

function App() {
  return (
    <Router
      basename={__BASE_PATH__}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ScrollToTop />
      <HomeStructuredData />
      <SocialMediaMeta />
      <ErrorBoundary>
        <AnalyticsProvider>
          <PerformanceProvider>
            <ToastProvider>
              <LoadingProvider>
                <div className="min-h-screen flex flex-col">
                  <header role="banner">
                    <Header />
                  </header>
                  <main
                    id="main-content"
                    className="flex-1"
                    role="main"
                    tabIndex={-1}
                  >
                    <AppRoutes />
                  </main>
                  <footer role="contentinfo">
                    <Footer />
                  </footer>
                </div>
              </LoadingProvider>
            </ToastProvider>
          </PerformanceProvider>
        </AnalyticsProvider>
      </ErrorBoundary>
      <PerformanceToggle />
    </Router>
  );
}

export default App;
