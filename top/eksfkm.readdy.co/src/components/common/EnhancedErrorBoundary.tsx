import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  ErrorCategory,
  ErrorSeverity,
  useErrorLogger,
} from '../../hooks/useErrorLogger.tsx';

interface EnhancedErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
  enableRetry?: boolean;
  maxRetries?: number;
  className?: string;
}

interface EnhancedErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
  errorId?: string;
}

export class EnhancedErrorBoundary extends Component<
  EnhancedErrorBoundaryProps,
  EnhancedErrorBoundaryState
> {
  private errorLogger = useErrorLogger();

  constructor(props: EnhancedErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<EnhancedErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error using our error logger
    const errorId = this.errorLogger.logError(
      error,
      ErrorCategory.CLIENT_ERROR,
      ErrorSeverity.HIGH,
      {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
        retryCount: this.state.retryCount,
        props: this.props,
      }
    );

    this.setState({
      errorInfo,
      errorId,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    if (this.state.retryCount < (this.props.maxRetries || 3)) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: prevState.retryCount + 1,
        errorId: undefined,
      }));
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback provided by props
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error fallback UI
      return (
        <div
          className={`min-h-[200px] flex items-center justify-center p-8 ${this.props.className || ''}`}
        >
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-red-600"></i>
            </div>

            {/* Error Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>

            {/* Error Message */}
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Our team has been
              notified.
            </p>

            {/* Error Details (in development) */}
            {import.meta.env.DEV &&
              this.props.showErrorDetails &&
              this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="bg-gray-100 rounded-lg p-4 text-xs text-gray-700 overflow-auto max-h-40">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                    {this.state.errorId && (
                      <div className="mt-2">
                        <strong>Error ID:</strong> {this.state.errorId}
                      </div>
                    )}
                  </div>
                </details>
              )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {this.props.enableRetry &&
                this.state.retryCount < (this.props.maxRetries || 3) && (
                  <button
                    onClick={this.handleRetry}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="ri-refresh-line"></i>
                    Try Again
                    {this.state.retryCount > 0 && (
                      <span className="text-xs opacity-75">
                        ({this.state.retryCount}/{this.props.maxRetries || 3})
                      </span>
                    )}
                  </button>
                )}

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="ri-restart-line"></i>
                Reload Page
              </button>

              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="ri-arrow-left-line"></i>
                Go Back
              </button>
            </div>

            {/* Contact Support */}
            <div className="mt-6 text-sm text-gray-500">
              <p>If the problem persists, please contact our support team.</p>
              {this.state.errorId && (
                <p className="mt-1">
                  Reference ID:{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {this.state.errorId}
                  </code>
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useEnhancedErrorBoundary = () => {
  const { logError } = useErrorLogger();
  const [error, setError] = React.useState<Error | null>(null);

  const captureError = React.useCallback(
    (error: Error, context?: Record<string, any>) => {
      setError(error);
      logError(error, ErrorCategory.CLIENT_ERROR, ErrorSeverity.HIGH, context);
    },
    [logError]
  );

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    captureError,
    resetError,
    hasError: !!error,
  };
};

// Error Fallback Components
export const ErrorFallback: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}> = ({
  title = 'Something went wrong',
  message = 'We apologize for the inconvenience. Please try again.',
  onRetry,
  showRetry = true,
}) => {
  return (
    <div className="min-h-[300px] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-error-warning-line text-2xl text-red-600"></i>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <i className="ri-refresh-line"></i>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

// Specialized error boundaries for different use cases
export const FormErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <EnhancedErrorBoundary
    fallback={
      <ErrorFallback
        title="Form Error"
        message="There was an error with the form. Please refresh and try again."
      />
    }
    showErrorDetails={false}
    enableRetry={true}
    maxRetries={2}
  >
    {children}
  </EnhancedErrorBoundary>
);

export const ApiErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <EnhancedErrorBoundary
    fallback={
      <ErrorFallback
        title="Connection Error"
        message="Unable to connect to our services. Please check your internet connection and try again."
      />
    }
    showErrorDetails={false}
    enableRetry={true}
    maxRetries={3}
  >
    {children}
  </EnhancedErrorBoundary>
);

export const ImageErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <EnhancedErrorBoundary
    fallback={
      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-center p-4">
          <i className="ri-image-error-line text-3xl text-gray-400 mb-2"></i>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    }
    showErrorDetails={false}
    enableRetry={false}
  >
    {children}
  </EnhancedErrorBoundary>
);
