import { useState } from 'react';

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const validateField = (name: string, value: string): string | null => {
    const rule = rules[name]
    if (!rule) return null

    // Required validation
    if (rule.required && !value.trim()) {
      return 'This field is required'
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !rule.required) {
      return null
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Invalid format'
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field] || '')
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleFieldChange = (name: string, value: string) => {
    if (touched.has(name)) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }))
    }
  }

  const handleFieldBlur = (name: string, value: string) => {
    setTouched(prev => new Set(prev).add(name))
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }))
  }

  const clearErrors = () => {
    setErrors({})
    setTouched(new Set())
  }

  return {
    errors,
    touched,
    validateForm,
    handleFieldChange,
    handleFieldBlur,
    clearErrors,
    isValid: Object.keys(errors).length === 0
  }
}

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value.includes('@')) return 'Invalid email address'
      return null
    }
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    custom: (value: string) => {
      if (value.trim().length < 2) return 'Name must be at least 2 characters'
      return null
    }
  },
  phone: {
    required: true,
    pattern: /^[\d\s\-\+\(\)]+$/,
    custom: (value: string) => {
      const digits = value.replace(/\D/g, '')
      if (digits.length < 10) return 'Phone number must be at least 10 digits'
      return null
    }
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 500,
    custom: (value: string) => {
      if (value.trim().length < 10) return 'Message must be at least 10 characters'
      return null
    }
  },
  amount: {
    required: true,
    pattern: /^\d+(\.\d{1,2})?$/,
    custom: (value: string) => {
      const amount = parseFloat(value)
      if (isNaN(amount) || amount <= 0) return 'Please enter a valid amount'
      if (amount < 1) return 'Minimum donation is $1'
      return null
    }
  }
}

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
  error?: string
  touched?: boolean
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  className?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  touched,
  value,
  onChange,
  onBlur,
  className = ''
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const baseInputClasses = `
    w-full px-4 py-2 border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${error && touched ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'}
    ${isFocused ? 'shadow-sm' : ''}
  `

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={baseInputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          required={required}
          className={baseInputClasses}
        />
      )}
      
      {error && touched && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <i className="ri-error-warning-line"></i>
          {error}
        </p>
      )}
    </div>
  )
}
