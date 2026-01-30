import React, { forwardRef } from 'react';

// Base input component
export interface BaseInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

// Text input component
export const FormInput = forwardRef<
  HTMLInputElement,
  BaseInputProps & {
    type?: 'text' | 'email' | 'tel' | 'password' | 'url';
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    autoComplete?: string;
  }
>(
  (
    {
      label,
      type = 'text',
      placeholder,
      required = false,
      disabled = false,
      error = false,
      helperText,
      value,
      onChange,
      onBlur,
      onFocus,
      autoComplete,
      className = '',
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      helperTextClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`form-group ${containerClassName}`}>
        {label && (
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
          w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50'
              : 'border-gray-200 focus:border-teal-600 focus:ring-teal-200 bg-white hover:border-gray-300'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          ${inputClassName}
          ${className}
        `}
          {...props}
        />

        {helperText && (
          <p
            className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'} ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

// Textarea component
export const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  BaseInputProps & {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  }
>(
  (
    {
      label,
      placeholder,
      required = false,
      disabled = false,
      error = false,
      helperText,
      value,
      onChange,
      onBlur,
      onFocus,
      rows = 4,
      resize = 'vertical',
      className = '',
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      helperTextClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`form-group ${containerClassName}`}>
        {label && (
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`
          w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-${resize}
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50'
              : 'border-gray-200 focus:border-teal-600 focus:ring-teal-200 bg-white hover:border-gray-300'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          ${inputClassName}
          ${className}
        `}
          {...props}
        />

        {helperText && (
          <p
            className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'} ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Select component
export const FormSelect = forwardRef<
  HTMLSelectElement,
  BaseInputProps & {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
  }
>(
  (
    {
      label,
      required = false,
      disabled = false,
      error = false,
      helperText,
      value,
      onChange,
      onBlur,
      onFocus,
      children,
      className = '',
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      helperTextClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`form-group ${containerClassName}`}>
        {label && (
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          className={`
          w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50'
              : 'border-gray-200 focus:border-teal-600 focus:ring-teal-200 bg-white hover:border-gray-300'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${inputClassName}
          ${className}
        `}
          {...props}
        >
          {children}
        </select>

        {helperText && (
          <p
            className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'} ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

// Checkbox component
export const FormCheckbox = forwardRef<
  HTMLInputElement,
  {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    checkboxClassName?: string;
    helperTextClassName?: string;
  }
>(
  (
    {
      label,
      required = false,
      disabled = false,
      error = false,
      helperText,
      checked,
      onChange,
      onBlur,
      onFocus,
      className = '',
      containerClassName = '',
      labelClassName = '',
      checkboxClassName = '',
      helperTextClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`form-group ${containerClassName}`}>
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            className={`
            h-5 w-5 text-teal-600 border-2 border-gray-300 rounded
            focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            ${error ? 'border-red-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${checkboxClassName}
            ${className}
          `}
            {...props}
          />

          {label && (
            <label
              className={`ml-3 text-sm font-medium text-gray-700 cursor-pointer ${labelClassName}`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
        </div>

        {helperText && (
          <p
            className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'} ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

// Radio button group component
export const FormRadioGroup = ({
  label,
  required = false,
  disabled = false,
  error = false,
  helperText,
  options,
  value,
  onChange,
  onBlur,
  onFocus,
  className = '',
  containerClassName = '',
  labelClassName = '',
  radioClassName = '',
  helperTextClassName = '',
}: {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  radioClassName?: string;
  helperTextClassName?: string;
}) => {
  return (
    <div className={`form-group ${containerClassName}`}>
      {label && (
        <label
          className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={`space-y-3 ${className}`}>
        {options.map(option => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={e => onChange?.(e.target.value)}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={disabled || option.disabled}
              className={`
                h-5 w-5 text-teal-600 border-2 border-gray-300
                focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                ${error ? 'border-red-500' : ''}
                ${disabled || option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${radioClassName}
              `}
            />
            <label className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {helperText && (
        <p
          className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'} ${helperTextClassName}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Form submission button
export const FormButton = ({
  type = 'submit',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
}: {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-teal-600 to-amber-600 text-white hover:from-teal-700 hover:to-amber-700 focus:ring-teal-500 shadow-lg hover:shadow-xl',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl',
    outline:
      'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
    ghost: 'text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}

      {children}

      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

// Form container with validation state
export const FormContainer = ({
  children,
  onSubmit,
  className = '',
}: {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`} noValidate>
      {children}
    </form>
  );
};

// Form error summary
export const FormErrorSummary = ({
  errors,
  className = '',
}: {
  errors: string[];
  className?: string;
}) => {
  if (errors.length === 0) return null;

  return (
    <div
      className={`bg-red-50 border-2 border-red-200 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-start">
        <i className="ri-error-warning-line text-red-600 text-xl mr-3 mt-0.5"></i>
        <div>
          <h3 className="text-red-800 font-semibold mb-2">
            Please fix the following errors:
          </h3>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
