import { useState } from 'react';
import { useLoading } from '../../components/providers/LoadingProvider';
import { toast } from '../../components/common/Toast';
import { useAnalyticsContext } from '../../components/providers/AnalyticsProvider';
import { useErrorLogger } from '../../hooks/useErrorLogger';
import { DonateStructuredData } from '../../components/seo/StructuredData';
import { createDonationPayment, redirectToPesapal } from '../../services/pesapalApi';
import { PesapalPaymentRequest } from '../../services/pesapalApi';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false,
  });

  const { setLoading, setLoadingMessage } = useLoading();
  const { analytics } = useAnalyticsContext();
  const { logError, logApiError } = useErrorLogger();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedAmount = customAmount || amount;

    // Validate form data
    if (!selectedAmount) {
      logError(
        'No donation amount selected',
        'validation' as any,
        'low' as any,
        { form: 'donation', field: 'amount' }
      );
      toast.error(
        'Validation Error',
        'Please select or enter a donation amount.'
      );
      return;
    }

    if (!formData.name || !formData.email) {
      logError('Missing required fields', 'validation' as any, 'low' as any, {
        form: 'donation',
        missingFields: { name: !formData.name, email: !formData.email },
      });
      toast.error('Validation Error', 'Please fill in all required fields.');
      return;
    }

    // Track checkout intent; completion is recorded only after payment verification.
    analytics.trackDonationCheckoutStarted(selectedAmount, 'pesapal');

    // Show inline loading state
    setIsSubmitting(true);

    // Show full page loader for processing
    setLoadingMessage('Connecting to Pesapal payment gateway...');
    setLoading(true);

    // Prepare donation data for Pesapal API
    const paymentData: PesapalPaymentRequest = {
      amount: parseFloat(selectedAmount),
      currency: 'UGX',
      donorName: formData.name,
      donorEmail: formData.email,
      donorPhone: formData.phone,
      message: formData.message,
    };

    try {
      // Create payment with Pesapal
      const response = await createDonationPayment(paymentData);

      if (response.success) {
        // Redirect to Pesapal payment page
        redirectToPesapal(response.data.redirect_url);
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error) {
      console.error('Donation error:', error);
      
      const errAny = error as any;
      logApiError(
        errAny,
        "/api/payments/donations/create",
        "POST",
        errAny.status,
        paymentData
      );
      
      analytics.trackDonationFailed('Payment processing failed', selectedAmount, 'pesapal', undefined as any);
      
      toast.error(
        'Payment Error',
        'Failed to process donation. Please try again or contact support.'
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const presetAmounts = [
    { value: '10000', label: 'UGX 10,000', impact: 'Provides school meals for 1 week' },
    { value: '25000', label: 'UGX 25,000', impact: 'Covers school supplies for 1 month' },
    { value: '50000', label: 'UGX 50,000', impact: 'Supports healthcare for 1 child' },
    { value: '100000', label: 'UGX 100,000', impact: 'Funds education for 1 term' },
    { value: '250000', label: 'UGX 250,000', impact: 'Sponsors a child for 6 months' },
    { value: '500000', label: 'UGX 500,000', impact: 'Full year sponsorship' },
  ];

  const recentDonations = [
    { name: 'Anonymous', amount: '50,000', time: '2 hours ago', type: 'Education' },
    { name: 'Sarah K.', amount: '25,000', time: '5 hours ago', type: 'Healthcare' },
    { name: 'John M.', amount: '100,000', time: '1 day ago', type: 'Education' },
    { name: 'Anonymous', amount: '75,000', time: '2 days ago', type: 'Community' },
  ];

  const getImpactText = (amount: string) => {
    const impactMap: { [key: string]: string } = {
      '10000': 'Provides school meals for 1 week',
      '25000': 'Covers school supplies for 1 month',
      '50000': 'Supports healthcare for 1 child',
      '100000': 'Funds education for 1 term',
      '250000': 'Sponsors a child for 6 months',
      '500000': 'Full year sponsorship',
    };
    return impactMap[amount] || 'Makes a real difference in a child\'s life';
  };

  return (
    <>
      <DonateStructuredData />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 pt-20">
                Transform Lives Through Education
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
                Your generous donation helps provide quality education, healthcare, and hope 
                to orphaned children in Uganda. Every contribution makes a lasting impact.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Tax Deductible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Instant Receipt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Make Your Donation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Donation Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Frequency
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFrequency('one-time')}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          frequency === 'one-time'
                            ? 'bg-amber-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          frequency === 'monthly'
                            ? 'bg-amber-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Amount (UGX)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {presetAmounts.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => {
                            setAmount(preset.value);
                            setCustomAmount('');
                          }}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            amount === preset.value && !customAmount
                              ? 'border-amber-600 bg-amber-50 text-amber-700'
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          <div className="font-semibold">{preset.label}</div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Amount */}
                    <div>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount('');
                        }}
                        placeholder="Enter custom amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    {/* Impact Message */}
                    {(customAmount || amount) && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4" style={{ marginTop: 20 }}>
                        <p className="text-sm text-amber-800">
                          <strong>Your Impact:</strong> {getImpactText(customAmount || amount)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Your Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="+256 700 000000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Share why you're supporting our cause..."
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.anonymous}
                        onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                        className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                        Make this donation anonymous
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSubmitting ? 'Processing...' : 'Donate Now with Pesapal'}
                  </button>

                  {/* Payment Methods */}
                  <div className="text-center text-sm text-gray-600">
                    <p className="mb-2">Secure payment via:</p>
                    <div className="flex justify-center items-center gap-4">
                      <span className="font-medium">Mobile Money</span>
                      <span>•</span>
                      <span className="font-medium">Credit/Debit Cards</span>
                      <span>•</span>
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pesapal Embed */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Donate
                </h3>
                <div className="aspect-w-5 aspect-h-1">
                  <iframe
  title="Pesapal secure donation widget"
  loading="lazy"
  width="200"
  height="40"
  src="https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/welcometodonationssection"
  allowFullScreen
  className="w-full rounded-lg"
/>
                </div>
              </div>

              {/* Recent Donations */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Supporters
                </h3>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-medium text-gray-900">{donation.name}</div>
                        <div className="text-sm text-gray-500">{donation.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-amber-600">UGX {donation.amount}</div>
                        <div className="text-xs text-gray-500">{donation.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Stats */}
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Your Impact in 2024
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Children Educated</span>
                    <span className="font-bold">250+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meals Provided</span>
                    <span className="font-bold">15,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Health Check-ups</span>
                    <span className="font-bold">500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
