import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import { LoadingProvider } from './components/providers';
import SkipLink from './components/common/SkipLink';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <LoadingProvider>
          <div className="min-h-screen flex flex-col">
            <SkipLink href="#main-content" className="skip-link">
              Skip to main content
            </SkipLink>
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
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
