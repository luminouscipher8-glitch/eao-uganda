import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text = 'Loading...',
  className = '',
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizes: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {/* Main Loader Container */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer Ring - Graduation Cap */}
        <div className="absolute inset-0 rounded-full border-4 border-teal-200 dark:border-teal-800">
          <div className="absolute inset-0 rounded-full border-4 border-t-teal-600 border-r-amber-500 border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Middle Ring - Book Pages */}
        <div className="absolute inset-2 rounded-full border-4 border-amber-200 dark:border-amber-800">
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-teal-600 border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
        </div>

        {/* Inner Ring - Pencil */}
        <div className="absolute inset-4 rounded-full border-4 border-gray-200 dark:border-gray-700">
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-600 border-r-gray-400 border-b-transparent border-l-transparent animate-spin animation-delay-300"></div>
        </div>

        {/* Center Icon - Site Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Site Logo */}
            <img
              src="/images/logo-1024.png"
              alt="Educate an Orphan Uganda"
              className="w-8 h-8 animate-pulse"
            />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-2 -left-2 w-3 h-3 bg-amber-400 rounded-full animate-bounce animation-delay-100"></div>
        <div className="absolute -top-1 -right-3 w-2 h-2 bg-teal-500 rounded-full animate-bounce animation-delay-200"></div>
        <div className="absolute -bottom-2 -left-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce animation-delay-300"></div>
        <div className="absolute -bottom-1 -right-2 w-2 h-2 bg-teal-400 rounded-full animate-bounce animation-delay-400"></div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p
          className={`${textSizes[text]} font-medium text-gray-600 dark:text-gray-400 animate-pulse`}
        >
          {text}
        </p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-teal-600 to-amber-500 rounded-full animate-pulse-width"></div>
      </div>

      <style>{`
        @keyframes pulse-width {
          0%, 100% { width: 0%; }
          50% { width: 70%; }
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-150 { animation-delay: 150ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-1500 { animation-delay: 1500ms; }
        .animate-pulse-width {
          animation: pulse-width 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Full Page Loader for initial page load
export const FullPageLoader: React.FC<{ message?: string }> = ({
  message = "Empowering Uganda's Future Through Education...",
}) => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo-1024.png"
            alt="Educate an Orphan Uganda"
            className="w-20 h-20 animate-pulse"
          />
        </div>

        {/* Main Loader */}
        <Loader size="lg" text={message} />

        {/* Inspirational Quote */}
        <div className="mt-8 max-w-md mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            "Education is the most powerful weapon which you can use to change
            the world."
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            - Nelson Mandela
          </p>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-lg animate-pulse animation-delay-500"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-lg animate-pulse animation-delay-1500"></div>
        </div>
      </div>
    </div>
  );
};

// Inline Loader for buttons and small sections
export const InlineLoader: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce animation-delay-200"></div>
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Loading...
      </span>
    </div>
  );
};

// Card Skeleton Loader
export const CardSkeletonLoader: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-20 animate-pulse"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 animate-pulse"></div>
      </div>
    </div>
  );
};
