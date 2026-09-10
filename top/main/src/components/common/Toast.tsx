import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Listen for global toast events
  useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        addToast(customEvent.detail);
      }
    };

    const eventTarget = getToastEventTarget();
    eventTarget.addEventListener('addToast', handleToastEvent);

    return () => {
      eventTarget.removeEventListener('addToast', handleToastEvent);
    };
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'ri-checkbox-circle-line text-green-600';
      case 'error':
        return 'ri-error-warning-line text-red-600';
      case 'warning':
        return 'ri-alert-line text-amber-600';
      case 'info':
        return 'ri-information-line text-blue-600';
      default:
        return 'ri-information-line text-gray-600';
    }
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg border shadow-lg backdrop-blur-sm
        transform transition-all duration-300 ease-in-out
        animate-slide-in-right
        ${getToastStyles(toast.type)}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <i className={`${getIcon(toast.type)} text-xl flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm mt-1 leading-relaxed opacity-90">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Close notification"
        >
          <i className="ri-close-line text-lg opacity-60 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};

// Global event system for toast notifications
let toastEventTarget: EventTarget | null = null;

const getToastEventTarget = () => {
  if (!toastEventTarget) {
    toastEventTarget = new EventTarget();
  }
  return toastEventTarget;
};

// Convenience functions for common toast types
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    const event = new CustomEvent('addToast', {
      detail: { type: 'success', title, message, duration }
    });
    getToastEventTarget().dispatchEvent(event);
  },
  error: (title: string, message?: string, duration?: number) => {
    const event = new CustomEvent('addToast', {
      detail: { type: 'error', title, message, duration }
    });
    getToastEventTarget().dispatchEvent(event);
  },
  warning: (title: string, message?: string, duration?: number) => {
    const event = new CustomEvent('addToast', {
      detail: { type: 'warning', title, message, duration }
    });
    getToastEventTarget().dispatchEvent(event);
  },
  info: (title: string, message?: string, duration?: number) => {
    const event = new CustomEvent('addToast', {
      detail: { type: 'info', title, message, duration }
    });
    getToastEventTarget().dispatchEvent(event);
  },
};
