import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ImageErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
}

interface ImageErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ImageErrorBoundary extends Component<
  ImageErrorBoundaryProps,
  ImageErrorBoundaryState
> {
  constructor(props: ImageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ImageErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for debugging
    console.warn('ImageErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg ${this.props.className || ''}`}
          >
            <div className="text-center p-4">
              <i className="ri-image-error-line text-3xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">Image unavailable</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useImageErrorBoundary = () => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setHasError(false);
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setHasError(true);
    setError(error);
    console.warn('Image error captured:', error);
  }, []);

  return {
    hasError,
    error,
    resetError,
    captureError,
  };
};
