import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary.tsx';
import { LoadingProvider } from './components/providers/LoadingProvider.tsx';
import { ToastProvider } from './components/common/Toast.tsx';
import { AnalyticsProvider } from './components/providers/AnalyticsProvider.tsx';
import { HomeStructuredData } from './components/seo/StructuredData.tsx';
import SocialMediaMeta from './components/seo/SocialMediaMeta.tsx';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import ScrollToTop from './components/common/ScrollToTop.tsx';
import routes from './router/config.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
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

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && (
        <header role="banner">
          <Header />
        </header>
      )}
      <main
        id="main-content"
        className="flex-1"
        role="main"
        tabIndex={-1}
      >
        <AppRoutes />
      </main>
      {!isAdminRoute && (
        <footer role="contentinfo">
          <Footer />
        </footer>
      )}
    </div>
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
        <AuthProvider>
          <AnalyticsProvider>
            <ToastProvider>
              <LoadingProvider>
                <AppContent />
              </LoadingProvider>
            </ToastProvider>
          </AnalyticsProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
