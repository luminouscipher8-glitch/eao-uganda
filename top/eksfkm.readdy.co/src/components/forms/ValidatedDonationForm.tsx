import React from 'react';
import {
  useFormValidation,
  ValidationRules,
} from '../../hooks/useFormValidation';
import {
  FormInput,
  FormCheckbox,
  FormButton,
  FormContainer,
  FormErrorSummary,
} from '../common/FormComponents';
import { useLoading } from '../providers/LoadingProvider';
import { toast } from '../common/Toast';
import { useAnalyticsContext } from '../providers/AnalyticsProvider';
import { useErrorLogger } from '../../hooks/useErrorLogger';

interface DonationFormData {
  amount: string;
  customAmount: string;
  frequency: 'one-time' | 'monthly';
  name: string;
  email: string;
  phone: string;
  anonymous: boolean;
}

export const ValidatedDonationForm: React.FC<{
  onDonationComplete?: (amount: string, frequency: string) => void;
}> = ({ onDonationComplete }) => {
  const { setLoading, setLoadingMessage } = useLoading();
  const { analytics } = useAnalyticsContext();
  const { logError } = useErrorLogger();

  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    resetForm,
    validateForm,
    hasError,
    getErrorMessage,
  } = useFormValidation<DonationFormData>(
    {
      amount: '',
      customAmount: '',
      frequency: 'one-time',
      name: '',
      email: '',
      phone: '',
      anonymous: false,
    },
    {
      amount: ValidationRules.required(
        'Please select or enter a donation amount'
      ),
      customAmount: ValidationRules.amount(1000, 10000000), // UGX 1,000 to 10,000,000
      frequency: ValidationRules.required('Please select donation frequency'),
      name: ValidationRules.name(),
      email: ValidationRules.email(),
      phone: ValidationRules.phone(),
      anonymous: {}, // No validation for anonymous checkbox
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedAmount = values.customAmount || values.amount;

    // Validate amount
    if (!selectedAmount) {
      logError(
        'No donation amount selected',
        'validation' as any,
        'medium' as any,
        { form: 'donation', field: 'amount' }
      );
      toast.error(
        'Validation Error',
        'Please select or enter a donation amount.'
      );
      return;
    }

    const isFormValid = validateForm();

    if (!isFormValid) {
      toast.error(
        'Validation Error',
        'Please correct the errors below and try again.',
        5000
      );
      return;
    }

    setIsSubmitting(true);
    setLoadingMessage('Processing your generous donation...');
    setLoading(true);

    try {
      analytics.trackDonationStarted(selectedAmount, 'online_form');

      await new Promise(resolve => setTimeout(resolve, 3000));

      if (Math.random() < 0.1) {
        throw new Error('Payment gateway temporarily unavailable');
      }

      analytics.trackDonationCompleted(selectedAmount, values.frequency);

      toast.success(
        'Thank You for Your Donation!',
        'Your generous donation is being processed. You will be redirected to the secure payment page.',
        6000
      );

      onDonationComplete?.(selectedAmount, values.frequency);
      resetForm();
    } catch (error) {
      logError(error as Error, 'network' as any, 'high' as any, {
        form: 'donation',
        amount: selectedAmount,
        frequency: values.frequency,
        endpoint: '/api/donations',
        method: 'POST',
      });

      analytics.trackDonationFailed('processing_error', selectedAmount);

      toast.error(
        'Donation Processing Failed',
        'There was an error processing your donation. Please try again or contact support.',
        8000
      );
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const getAllErrorMessages = (): string[] => {
    const errorMessages: string[] = [];
    Object.keys(errors).forEach(fieldName => {
      const fieldKey = fieldName as keyof DonationFormData;
      if (touched[fieldKey] && errors[fieldKey]?.length > 0) {
        errorMessages.push(...errors[fieldKey]);
      }
    });
    return errorMessages;
  };

  const presetAmounts = [
    { value: '50000', label: 'UGX 50,000' },
    { value: '100000', label: 'UGX 100,000' },
    { value: '250000', label: 'UGX 250,000' },
    { value: '500000', label: 'UGX 500,000' },
    { value: '1000000', label: 'UGX 1,000,000' },
  ];

  return (
    <FormContainer onSubmit={handleSubmit} className="space-y-6">
      <FormErrorSummary errors={getAllErrorMessages()} />

      {/* Amount Selection */}
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Select Donation Amount
          <span className="text-red-500 ml-1">*</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {presetAmounts.map(preset => (
            <button
              key={preset.value}
              type="button"
              onClick={() => {
                handleChange('amount', preset.value);
                handleChange('customAmount', '');
              }}
              className={`
                px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-200
                ${
                  values.amount === preset.value
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }
              `}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <FormInput
          type="text"
          label="Custom Amount (UGX)"
          placeholder="Enter custom amount"
          error={hasError('customAmount')}
          helperText={getErrorMessage('customAmount')}
          value={values.customAmount}
          onChange={e => {
            handleChange('customAmount', e.target.value);
            handleChange('amount', ''); // Clear preset when custom is entered
          }}
          onBlur={() => handleBlur('customAmount')}
          onFocus={() => handleFocus('customAmount')}
        />
      </div>

      {/* Frequency Selection */}
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Donation Frequency
        </label>

        <div className="flex gap-4">
          {['one-time', 'monthly'].map(freq => (
            <button
              key={freq}
              type="button"
              onClick={() =>
                handleChange('frequency', freq as 'one-time' | 'monthly')
              }
              className={`
                flex-1 px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-200
                ${
                  values.frequency === freq
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }
              `}
            >
              {freq === 'one-time' ? 'One-Time' : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Your Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">
          <FormInput
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            required={!values.anonymous}
            disabled={values.anonymous}
            error={hasError('name') && !values.anonymous}
            helperText={getErrorMessage('name')}
            value={values.anonymous ? '' : values.name}
            onChange={e => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            onFocus={() => handleFocus('name')}
          />

          <FormInput
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            required={!values.anonymous}
            disabled={values.anonymous}
            error={hasError('email') && !values.anonymous}
            helperText={getErrorMessage('email')}
            value={values.anonymous ? '' : values.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            onFocus={() => handleFocus('email')}
          />
        </div>

        <FormInput
          type="tel"
          label="Phone Number"
          placeholder="+256 123 456 789"
          disabled={values.anonymous}
          error={hasError('phone') && !values.anonymous}
          helperText={getErrorMessage('phone')}
          value={values.anonymous ? '' : values.phone}
          onChange={e => handleChange('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
          onFocus={() => handleFocus('phone')}
        />

        <FormCheckbox
          label="Donate anonymously"
          checked={values.anonymous}
          onChange={e => {
            handleChange('anonymous', e.target.checked);
            if (e.target.checked) {
              // Clear personal info when anonymous is selected
              handleChange('name', '');
              handleChange('email', '');
              handleChange('phone', '');
            }
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <FormButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          icon={<i className="ri-heart-fill"></i>}
          iconPosition="right"
        >
          {isSubmitting ? 'Processing...' : 'Complete Donation'}
        </FormButton>
      </div>
    </FormContainer>
  );
};
