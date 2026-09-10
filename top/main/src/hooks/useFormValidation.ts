import { useState, useCallback, useEffect } from 'react';
import React from 'react';
import { useErrorLogger } from './useErrorLogger.ts';

// Validation rule types
export type ValidationRule<T = any> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
  message?: string;
};

// Field validation configuration
export interface FieldValidation {
  [fieldName: string]: {
    value: any;
    rules: ValidationRule;
    touched: boolean;
    errors: string[];
    isValid: boolean;
  };
}

// Form validation hook
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, ValidationRule>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string[]>>(
    {} as Record<keyof T, string[]>
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logValidationError } = useErrorLogger();

  // Validate a single field
  const validateField = useCallback(
    (fieldName: keyof T, value: any, rules: ValidationRule): string[] => {
      const fieldErrors: string[] = [];

      // Required validation
      if (
        rules.required &&
        (!value || (typeof value === 'string' && value.trim() === ''))
      ) {
        fieldErrors.push(rules.message || 'This field is required');
      }

      // Skip other validations if field is empty and not required
      if (!value && !rules.required) {
        return fieldErrors;
      }

      // String validations
      if (typeof value === 'string') {
        if (rules.minLength && value.length < rules.minLength) {
          fieldErrors.push(
            `Must be at least ${rules.minLength} characters long`
          );
        }

        if (rules.maxLength && value.length > rules.maxLength) {
          fieldErrors.push(
            `Must be no more than ${rules.maxLength} characters long`
          );
        }

        if (rules.pattern && !rules.pattern.test(value)) {
          fieldErrors.push(rules.message || 'Invalid format');
        }
      }

      // Number validations
      if (typeof value === 'number') {
        if (rules.min !== undefined && value < rules.min) {
          fieldErrors.push(`Must be at least ${rules.min}`);
        }

        if (rules.max !== undefined && value > rules.max) {
          fieldErrors.push(`Must be no more than ${rules.max}`);
        }
      }

      // Custom validation
      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          fieldErrors.push(customError);
        }
      }

      // Log validation errors for debugging
      if (fieldErrors.length > 0) {
        logValidationError(String(fieldName), value, fieldErrors.join(', '));
      }

      return fieldErrors;
    },
    [logValidationError]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<keyof T, string[]> = {} as Record<
      keyof T,
      string[]
    >;
    let formIsValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const fieldKey = fieldName as keyof T;
      const fieldErrors = validateField(
        fieldKey,
        values[fieldKey],
        validationRules[fieldKey]
      );
      newErrors[fieldKey] = fieldErrors;

      if (fieldErrors.length > 0) {
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  }, [values, validationRules, validateField]);

  // Handle field value change
  const handleChange = useCallback(
    (fieldName: keyof T, value: any) => {
      setValues(prev => ({ ...prev, [fieldName]: value }));

      // Validate field if it's been touched
      if (touched[fieldName]) {
        const fieldErrors = validateField(
          fieldName,
          value,
          validationRules[fieldName]
        );
        setErrors(prev => ({ ...prev, [fieldName]: fieldErrors }));
      }
    },
    [touched, validationRules, validateField]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (fieldName: keyof T) => {
      setTouched(prev => ({ ...prev, [fieldName]: true }));

      // Validate field on blur
      const fieldErrors = validateField(
        fieldName,
        values[fieldName],
        validationRules[fieldName]
      );
      setErrors(prev => ({ ...prev, [fieldName]: fieldErrors }));
    },
    [values, validationRules, validateField]
  );

  // Handle field focus
  const handleFocus = useCallback((_fieldName: keyof T) => {
    // Mark field as focused (can be used for UI states)
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string[]>);
    setTouched({} as Record<keyof T, boolean>);
    setIsValid(false);
    setIsSubmitting(false);
  }, [initialValues]);

  // Set field error manually
  const setFieldError = useCallback((_fieldName: keyof T, _error: string) => {
    // Implementation would set error for specific field
  }, []);

  // Clear field error
  const clearFieldError = useCallback((_fieldName: keyof T) => {
    // Implementation would clear error for specific field
  }, []);

  // Get field props for form inputs
  const getFieldProps = useCallback(
    (fieldName: keyof T) => {
      const fieldValue = values[fieldName];
      const isCheckbox = typeof fieldValue === 'boolean';

      return {
        value: isCheckbox ? undefined : fieldValue,
        checked: isCheckbox ? fieldValue : undefined,
        onChange: (
          e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          if (e.target.type === 'checkbox') {
            const value = (e.target as HTMLInputElement).checked;
            handleChange(fieldName, value);
          } else {
            const value = e.target.value;
            handleChange(fieldName, value);
          }
        },
        onBlur: () => handleBlur(fieldName),
        onFocus: () => handleFocus(fieldName),
        error: touched[fieldName] && errors[fieldName]?.length > 0,
        helperText: touched[fieldName] ? errors[fieldName]?.[0] : '',
      };
    },
    [values, touched, errors, handleChange, handleBlur, handleFocus]
  );

  // Check if form is valid
  useEffect(() => {
    const formIsValid = Object.keys(validationRules).every(fieldName => {
      const fieldKey = fieldName as keyof T;
      const fieldErrors = validateField(
        fieldKey,
        values[fieldKey],
        validationRules[fieldKey]
      );
      return fieldErrors.length === 0;
    });
    setIsValid(formIsValid);
  }, [values, validationRules, validateField]);

  return {
    // Values and state
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setIsSubmitting,

    // Handlers
    handleChange,
    handleBlur,
    handleFocus,
    resetForm,
    validateForm,
    setFieldError,
    clearFieldError,

    // Utilities
    getFieldProps,
    hasError: (fieldName: keyof T) =>
      touched[fieldName] && errors[fieldName]?.length > 0,
    getErrorMessage: (fieldName: keyof T) =>
      touched[fieldName] ? errors[fieldName]?.[0] : '',
    isFieldValid: (fieldName: keyof T) =>
      !touched[fieldName] || errors[fieldName]?.length === 0,
  };
};

// Common validation rules
export const ValidationRules = {
  required: (message?: string): ValidationRule => ({
    required: true,
    message: message || 'This field is required',
  }),

  email: (message?: string): ValidationRule => ({
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || 'Please enter a valid email address',
  }),

  phone: (message?: string): ValidationRule => ({
    required: true,
    pattern: /^\+?[\d\s\-\(\)]+$/,
    message: message || 'Please enter a valid phone number',
  }),

  name: (message?: string): ValidationRule => ({
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-']+$/,
    message:
      message || 'Please enter a valid name (letters only, 2-50 characters)',
  }),

  amount: (min?: number, max?: number): ValidationRule => ({
    required: true,
    min: min || 1,
    max: max || 1000000,
    custom: (value: any) => {
      if (typeof value === 'string') {
        const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
        if (isNaN(numValue) || numValue <= 0) {
          return 'Please enter a valid amount';
        }
      }
      return null;
    },
  }),

  message: (minLength?: number, maxLength?: number): ValidationRule => ({
    required: true,
    minLength: minLength || 10,
    maxLength: maxLength || 1000,
    message: `Message must be between ${minLength || 10} and ${maxLength || 1000} characters`,
  }),

  password: (message?: string): ValidationRule => ({
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message:
      message ||
      'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  }),

  confirmPassword: (_passwordFieldName: string): ValidationRule => ({
    required: true,
    custom: (value: any) => {
      // This is a simplified version - in a real implementation, you'd need access to form values
      if (!value || typeof value !== 'string') {
        return 'Password confirmation is required';
      }
      return null;
    },
  }),

  url: (message?: string): ValidationRule => ({
    required: true,
    pattern: /^https?:\/\/.+/,
    message: message || 'Please enter a valid URL (http:// or https://)',
  }),

  optionalEmail: (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || 'Please enter a valid email address',
  }),
};
