import { useErrorLogger, ErrorCategory } from '../hooks/useErrorLogger';

// API Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
  timestamp: number;
}

// Request interceptor type
export interface RequestConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// Response interceptor type
export interface ApiResponse<T = any> {
  data?: T;
  status: number;
  statusText: string;
  headers?: Record<string, string>;
  ok: boolean;
}

// API Error Handler class
export class ApiErrorHandler {
  private errorLogger: ReturnType<typeof useErrorLogger>;

  constructor(errorLogger: ReturnType<typeof useErrorLogger>) {
    this.errorLogger = errorLogger;
  }

  // Handle HTTP response errors
  handleResponseError = async (
    response: Response,
    requestConfig: RequestConfig
  ): Promise<ApiError> => {
    let errorData: any;
    let errorMessage = 'Unknown error occurred';

    try {
      // Try to parse error response
      errorData = await response.json();
      errorMessage =
        errorData.message || errorData.error || response.statusText;
    } catch {
      // If parsing fails, use status text
      errorMessage = response.statusText || `HTTP ${response.status}`;
    }

    const apiError: ApiError = {
      message: errorMessage,
      status: response.status,
      code: errorData?.code,
      details: errorData,
      timestamp: Date.now(),
    };

    // Log the error
    this.errorLogger.logApiError(
      new Error(errorMessage),
      requestConfig.url,
      requestConfig.method,
      response.status,
      requestConfig.body
    );

    return apiError;
  };

  // Handle network errors
  handleNetworkError = (
    error: Error,
    requestConfig: RequestConfig
  ): ApiError => {
    const apiError: ApiError = {
      message: error.message || 'Network error occurred',
      timestamp: Date.now(),
    };

    // Log network error
    this.errorLogger.logNetworkError(
      error,
      requestConfig.url,
      requestConfig.method
    );

    return apiError;
  };

  // Handle timeout errors
  handleTimeoutError = (requestConfig: RequestConfig): ApiError => {
    const errorMessage = `Request timeout after ${requestConfig.timeout || 30000}ms`;
    const apiError: ApiError = {
      message: errorMessage,
      timestamp: Date.now(),
    };

    // Log timeout error
    this.errorLogger.logError(
      new Error(errorMessage),
      ErrorCategory.NETWORK,
      'medium' as any,
      {
        url: requestConfig.url,
        method: requestConfig.method,
        timeout: requestConfig.timeout,
        type: 'timeout',
      }
    );

    return apiError;
  };

  // Enhanced fetch with error handling
  async fetchWithErrorHandling<T = any>(
    requestConfig: RequestConfig
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, requestConfig.timeout || 30000);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle successful responses
      if (response.ok) {
        let data: T;
        try {
          data = await response.json();
        } catch {
          // If response is not JSON, return text or empty object
          const text = await response.text();
          data = (text ? { raw: text } : {}) as T;
        }

        return {
          data,
          status: response.status,
          statusText: response.statusText,
          ok: true,
        };
      }

      // Handle error responses
      const error = await this.handleResponseError(response, requestConfig);
      throw error;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw this.handleTimeoutError(requestConfig);
      }

      if (error instanceof Error) {
        throw this.handleNetworkError(error, requestConfig);
      }

      // If it's already an ApiError, re-throw it
      if (error.status !== undefined) {
        throw error;
      }

      // Unknown error
      throw {
        message: 'Unknown error occurred',
        timestamp: Date.now(),
      };
    }
  }

  // Retry failed requests
  async retryRequest<T = any>(
    requestConfig: RequestConfig,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<ApiResponse<T>> {
    let lastError: ApiError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.fetchWithErrorHandling<T>(requestConfig);
        return response;
      } catch (error) {
        lastError = error as ApiError;

        // Don't retry on client errors (4xx)
        if (
          lastError.status &&
          lastError.status >= 400 &&
          lastError.status < 500
        ) {
          throw lastError;
        }

        // Don't retry on the last attempt
        if (attempt === maxRetries) {
          throw lastError;
        }

        // Wait before retrying with exponential backoff
        await new Promise(resolve =>
          setTimeout(resolve, delay * Math.pow(2, attempt - 1))
        );
      }
    }

    throw lastError!;
  }
}

// Hook for using API error handler
export const useApiErrorHandler = () => {
  const errorLogger = useErrorLogger();
  const apiErrorHandler = new ApiErrorHandler(errorLogger);

  // Enhanced fetch wrapper
  const apiFetch = async <T = any>(
    requestConfig: RequestConfig
  ): Promise<ApiResponse<T>> => {
    return apiErrorHandler.fetchWithErrorHandling<T>(requestConfig);
  };

  // Retry wrapper
  const apiFetchWithRetry = async <T = any>(
    requestConfig: RequestConfig,
    maxRetries?: number,
    delay?: number
  ): Promise<ApiResponse<T>> => {
    return apiErrorHandler.retryRequest<T>(requestConfig, maxRetries, delay);
  };

  // GET request helper
  const get = async <T = any>(
    url: string,
    headers?: Record<string, string>,
    options?: { timeout?: number; retries?: number }
  ): Promise<ApiResponse<T>> => {
    const requestConfig: RequestConfig = {
      url,
      method: 'GET',
      headers,
      timeout: options?.timeout,
    };

    if (options?.retries) {
      return apiErrorHandler.retryRequest<T>(requestConfig, options.retries);
    }

    return apiErrorHandler.fetchWithErrorHandling<T>(requestConfig);
  };

  // POST request helper
  const post = async <T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>,
    options?: { timeout?: number; retries?: number }
  ): Promise<ApiResponse<T>> => {
    const requestConfig: RequestConfig = {
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      timeout: options?.timeout,
    };

    if (options?.retries) {
      return apiErrorHandler.retryRequest<T>(requestConfig, options.retries);
    }

    return apiErrorHandler.fetchWithErrorHandling<T>(requestConfig);
  };

  // PUT request helper
  const put = async <T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>,
    options?: { timeout?: number; retries?: number }
  ): Promise<ApiResponse<T>> => {
    const requestConfig: RequestConfig = {
      url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      timeout: options?.timeout,
    };

    if (options?.retries) {
      return apiErrorHandler.retryRequest<T>(requestConfig, options.retries);
    }

    return apiErrorHandler.fetchWithErrorHandling<T>(requestConfig);
  };

  // DELETE request helper
  const del = async <T = any>(
    url: string,
    headers?: Record<string, string>,
    options?: { timeout?: number; retries?: number }
  ): Promise<ApiResponse<T>> => {
    const requestConfig: RequestConfig = {
      url,
      method: 'DELETE',
      headers,
      timeout: options?.timeout,
    };

    if (options?.retries) {
      return apiErrorHandler.retryRequest<T>(requestConfig, options.retries);
    }

    return apiErrorHandler.fetchWithErrorHandling<T>(requestConfig);
  };

  return {
    apiFetch,
    apiFetchWithRetry,
    get,
    post,
    put,
    delete: del,
    apiErrorHandler,
  };
};

// Global API error handler setup
export const setupGlobalApiErrorHandler = () => {
  // Override fetch globally if needed
  const originalFetch = window.fetch;

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    try {
      const response = await originalFetch(input, init);

      // Log non-successful responses
      if (!response.ok) {
        let url: string;
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof URL) {
          url = input.toString();
        } else {
          url = input.url;
        }

        console.warn(`API Error: ${response.status} ${response.statusText}`, {
          url,
          method: init?.method || 'GET',
        });
      }

      return response;
    } catch (error) {
      console.error('Network Error:', error);
      throw error;
    }
  };
};
