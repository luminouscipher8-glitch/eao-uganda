import { useCallback, useRef } from 'react';
import { toast } from '../components/common/Toast';

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Error categories
export enum ErrorCategory {
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error',
  CLIENT_ERROR = 'client_error',
  PERFORMANCE = 'performance',
  USER_INPUT = 'user_input',
  EXTERNAL_SERVICE = 'external_service',
}

// Error interface
export interface ErrorLog {
  id: string;
  timestamp: number;
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  stack?: string;
  context?: Record<string, any>;
  userAgent?: string;
  url?: string;
  userId?: string;
  sessionId?: string;
  resolved?: boolean;
  retryCount?: number;
}

// Error logger hook
export const useErrorLogger = () => {
  const errorLogs = useRef<ErrorLog[]>([]);
  const sessionId = useRef(generateSessionId());

  // Generate unique session ID
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate unique error ID
  function generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get user agent info
  function getUserAgent(): string {
    return navigator.userAgent || 'Unknown';
  }

  // Get current URL
  function getCurrentUrl(): string {
    return window.location.href;
  }

  // Log error with comprehensive information
  const logError = useCallback(
    (
      error: Error | string,
      category: ErrorCategory = ErrorCategory.CLIENT_ERROR,
      severity: ErrorSeverity = ErrorSeverity.MEDIUM,
      context?: Record<string, any>,
      showToast: boolean = true
    ) => {
      const errorId = generateErrorId();
      const timestamp = Date.now();

      const errorMessage = typeof error === 'string' ? error : error.message;
      const errorStack = typeof error === 'string' ? undefined : error.stack;

      const errorLog: ErrorLog = {
        id: errorId,
        timestamp,
        message: errorMessage,
        category,
        severity,
        stack: errorStack,
        context,
        userAgent: getUserAgent(),
        url: getCurrentUrl(),
        sessionId: sessionId.current,
        retryCount: 0,
      };

      // Add to error logs
      errorLogs.current.push(errorLog);

      // Keep only last 100 errors to prevent memory issues
      if (errorLogs.current.length > 100) {
        errorLogs.current = errorLogs.current.slice(-100);
      }

      // Log to console in development
      if (import.meta.env.DEV) {
        console.group(`🚨 Error [${severity.toUpperCase()}] - ${category}`);
        console.error('Message:', errorMessage);
        console.error('Context:', context);
        if (errorStack) console.error('Stack:', errorStack);
        console.error('Full Log:', errorLog);
        console.groupEnd();
      }

      // Show user-friendly toast notification
      if (showToast) {
        const toastMessage = getUserFriendlyMessage(errorMessage, category);
        const toastDuration = getToastDuration(severity);

        if (severity === ErrorSeverity.CRITICAL) {
          toast.error('Critical Error', toastMessage, toastDuration);
        } else if (severity === ErrorSeverity.HIGH) {
          toast.error('Error Occurred', toastMessage, toastDuration);
        } else if (severity === ErrorSeverity.MEDIUM) {
          toast.warning('Warning', toastMessage, toastDuration);
        } else {
          toast.info('Notice', toastMessage, toastDuration);
        }
      }

      // Track error in analytics (if available)
      if (window.gtag && !import.meta.env.DEV) {
        window.gtag('event', 'error_logged', {
          event_category: 'error_logging',
          event_label: `${category}:${severity}`,
          error_id: errorId,
          error_category: category,
          error_severity: severity,
          error_message: errorMessage.substring(0, 100), // Truncate for privacy
        });
      }

      return errorId;
    },
    []
  );

  // Get user-friendly error message
  const getUserFriendlyMessage = (
    _errorMessage: string,
    category: ErrorCategory
  ): string => {
    switch (category) {
      case ErrorCategory.NETWORK:
        return 'Network connection issue. Please check your internet connection and try again.';
      case ErrorCategory.VALIDATION:
        return 'Please check your input and try again.';
      case ErrorCategory.AUTHENTICATION:
        return 'Please log in to continue.';
      case ErrorCategory.AUTHORIZATION:
        return "You don't have permission to perform this action.";
      case ErrorCategory.NOT_FOUND:
        return 'The requested resource was not found.';
      case ErrorCategory.SERVER_ERROR:
        return 'Server error occurred. Please try again later.';
      case ErrorCategory.EXTERNAL_SERVICE:
        return 'External service is temporarily unavailable. Please try again later.';
      case ErrorCategory.PERFORMANCE:
        return 'Performance issue detected. The page may be slow to respond.';
      case ErrorCategory.USER_INPUT:
        return 'Invalid input provided. Please check and try again.';
      default:
        return 'An unexpected error occurred. Please try again or contact support.';
    }
  };

  // Get toast duration based on severity
  const getToastDuration = (severity: ErrorSeverity): number => {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return 10000; // 10 seconds
      case ErrorSeverity.HIGH:
        return 8000; // 8 seconds
      case ErrorSeverity.MEDIUM:
        return 6000; // 6 seconds
      case ErrorSeverity.LOW:
        return 4000; // 4 seconds
      default:
        return 6000;
    }
  };

  // Log network errors specifically
  const logNetworkError = useCallback(
    (error: Error, url?: string, method?: string, statusCode?: number) => {
      return logError(error, ErrorCategory.NETWORK, ErrorSeverity.HIGH, {
        url,
        method,
        statusCode,
        type: 'network_error',
      });
    },
    [logError]
  );

  // Log validation errors
  const logValidationError = useCallback(
    (fieldName: string, value: any, validationRule: string) => {
      return logError(
        `Validation failed for ${fieldName}: ${validationRule}`,
        ErrorCategory.VALIDATION,
        ErrorSeverity.LOW,
        {
          fieldName,
          value: typeof value === 'string' ? value.substring(0, 50) : value,
          validationRule,
          type: 'validation_error',
        },
        false // Don't show toast for validation errors
      );
    },
    [logError]
  );

  // Log API errors
  const logApiError = useCallback(
    (
      error: Error,
      endpoint: string,
      method: string,
      statusCode?: number,
      requestBody?: any
    ) => {
      const severity =
        statusCode && statusCode >= 500
          ? ErrorSeverity.HIGH
          : ErrorSeverity.MEDIUM;
      const category =
        statusCode === 404
          ? ErrorCategory.NOT_FOUND
          : statusCode === 401
            ? ErrorCategory.AUTHENTICATION
            : statusCode === 403
              ? ErrorCategory.AUTHORIZATION
              : statusCode && statusCode >= 500
                ? ErrorCategory.SERVER_ERROR
                : ErrorCategory.NETWORK;

      return logError(error, category, severity, {
        endpoint,
        method,
        statusCode,
        requestBody: requestBody
          ? JSON.stringify(requestBody).substring(0, 200)
          : undefined,
        type: 'api_error',
      });
    },
    [logError]
  );

  // Get error statistics
  const getErrorStats = useCallback(() => {
    const errors = errorLogs.current;
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    return {
      total: errors.length,
      lastHour: errors.filter(e => e.timestamp >= oneHourAgo).length,
      lastDay: errors.filter(e => e.timestamp >= oneDayAgo).length,
      byCategory: errors.reduce(
        (acc, error) => {
          acc[error.category] = (acc[error.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      bySeverity: errors.reduce(
        (acc, error) => {
          acc[error.severity] = (acc[error.severity] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      unresolved: errors.filter(e => !e.resolved).length,
    };
  }, []);

  // Clear error logs
  const clearErrorLogs = useCallback(() => {
    errorLogs.current = [];
  }, []);

  // Retry failed operation
  const retryOperation = useCallback(
    async <T>(
      operation: () => Promise<T>,
      errorId: string,
      maxRetries: number = 3
    ): Promise<T> => {
      const errorLog = errorLogs.current.find(e => e.id === errorId);
      if (!errorLog) {
        throw new Error('Error log not found');
      }

      if ((errorLog.retryCount || 0) >= maxRetries) {
        throw new Error('Max retries exceeded');
      }

      errorLog.retryCount = (errorLog.retryCount || 0) + 1;

      try {
        const result = await operation();
        // Mark error as resolved
        errorLog.resolved = true;
        return result;
      } catch (error) {
        // Log retry failure
        logError(error as Error, ErrorCategory.NETWORK, ErrorSeverity.MEDIUM, {
          originalErrorId: errorId,
          retryCount: errorLog.retryCount,
          type: 'retry_failed',
        });
        throw error;
      }
    },
    [logError]
  );

  return {
    logError,
    logNetworkError,
    logValidationError,
    logApiError,
    getErrorStats,
    clearErrorLogs,
    retryOperation,
    errorLogs: errorLogs.current,
  };
};

// Global error handler setup
export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
    // You could integrate with your error logger here
  });

  // Handle uncaught errors
  window.addEventListener('error', event => {
    console.error('Uncaught error:', event.error);
    // You could integrate with your error logger here
  });
};
