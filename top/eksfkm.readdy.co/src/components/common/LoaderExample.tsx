import React from 'react';
import { useLoading } from '../providers/LoadingProvider';
import { Loader, InlineLoader } from './Loader';
import { toast } from './Toast';

// Example component showing how to use the loader
export const LoaderExample: React.FC = () => {
  const { setLoading, setLoadingMessage } = useLoading();

  const handleAsyncOperation = async () => {
    // Show full page loader
    setLoadingMessage('Processing donation...');
    setLoading(true);

    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Hide loader
      setLoading(false);

      // Show success message
      toast.success(
        'Donation Processed!',
        'Your donation has been processed successfully.'
      );
    } catch (error) {
      setLoading(false);
      toast.error(
        'Processing Failed',
        'There was an error processing your donation. Please try again.'
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Loader Usage Examples</h3>

      {/* Full Page Loader Example */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Full Page Loader</h4>
        <button
          onClick={handleAsyncOperation}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
        >
          Process Donation (Full Page Loader)
        </button>
      </div>

      {/* Inline Loader Example */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Inline Loader</h4>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors">
            Submit Form
          </button>
          <InlineLoader />
        </div>
      </div>

      {/* Standalone Loader Example */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Standalone Loader</h4>
        <Loader size="md" text="Loading resources..." />
      </div>
    </div>
  );
};

// Usage in forms
export const DonationForm: React.FC = () => {
  const { setLoading, setLoadingMessage } = useLoading();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show inline loading state
    setIsSubmitting(true);

    // Show full page loader for processing
    setLoadingMessage('Processing your generous donation...');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Success
      toast.success(
        'Thank You for Your Donation!',
        'Your generous donation has been received and is being processed.',
        6000
      );
    } catch (error) {
      toast.error(
        'Donation Processing Failed',
        'There was an error processing your donation. Please try again.',
        7000
      );
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Donation Amount
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter amount"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? <InlineLoader /> : 'Donate Now'}
      </button>
    </form>
  );
};
