import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AccessibleButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  to?: string; // For routing
  type?: 'button' | 'submit' | 'reset';
}

const AccessibleButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AccessibleButtonProps
>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      ariaLabel,
      ariaDescribedBy,
      leftIcon,
      rightIcon,
      fullWidth = false,
      to,
      type = 'button',
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary:
        'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
      secondary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
      outline:
        'border-2 border-amber-500 text-amber-500 hover:bg-amber-50 focus:ring-amber-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const buttonContent = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {leftIcon && !loading && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <span className="flex items-center">{children}</span>

        {rightIcon && !loading && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      onClick?.(e);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || loading) return;
      onClick?.(e as any);
    };

    // If it's a link, render as Link component
    if (to) {
      return (
        <Link
          to={to}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          onClick={handleLinkClick}
          {...(props as any)}
        >
          {buttonContent}
        </Link>
      );
    }

    // Otherwise, render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
