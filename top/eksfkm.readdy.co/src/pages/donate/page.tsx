import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoading } from '../../components/providers/LoadingProvider';
import { InlineLoader } from '../../components/common/Loader';
import { toast } from '../../components/common/Toast';
import { useAnalyticsContext } from '../../components/providers/AnalyticsProvider';
import { useErrorLogger } from '../../hooks/useErrorLogger';
import { DonateStructuredData } from '../../components/seo/StructuredData';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>(
    'one-time'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

    // Track donation started
    analytics.trackDonationStarted(selectedAmount, 'online_form');

    // Show inline loading state
    setIsSubmitting(true);

    // Show full page loader for processing
    setLoadingMessage('Processing your generous donation...');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate potential API error for demonstration
      if (Math.random() < 0.1) {
        // 10% chance of error for testing
        throw new Error('Payment gateway temporarily unavailable');
      }

      // Track donation completed
      analytics.trackDonationCompleted(selectedAmount, 'online_form');

      // Success
      toast.success(
        'Thank You for Your Donation!',
        'Your generous donation is being processed. You will be redirected to the secure payment page.',
        6000
      );
    } catch (error) {
      // Log the error with comprehensive context
      logApiError(error as Error, '/api/donations', 'POST', 500, {
        amount: selectedAmount,
        frequency,
        donorInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          anonymous: formData.anonymous,
        },
      });

      // Track donation failed
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

  const presetAmounts = [
    {
      value: '50000',
      label: 'UGX 50,000',
      impact: 'School supplies for 2 children',
    },
    { value: '100000', label: 'UGX 100,000', impact: 'One term school fees' },
    {
      value: '250000',
      label: 'UGX 250,000',
      impact: 'Full uniform set for 5 children',
    },
    {
      value: '500000',
      label: 'UGX 500,000',
      impact: 'Support 10 children for a month',
    },
    {
      value: '1000000',
      label: 'UGX 1,000,000',
      impact: 'Annual support for 3 children',
    },
    {
      value: '2500000',
      label: 'UGX 2,500,000',
      impact: 'Classroom renovation',
    },
  ];

  const recentDonations = [
    {
      amount: 'UGX 150,000',
      time: '5 minutes ago',
      anonymous: false,
      name: 'Sarah M.',
    },
    {
      amount: 'UGX 500,000',
      time: '23 minutes ago',
      anonymous: true,
      name: 'Anonymous',
    },
    {
      amount: 'UGX 75,000',
      time: '1 hour ago',
      anonymous: false,
      name: 'James K.',
    },
    {
      amount: 'UGX 200,000',
      time: '2 hours ago',
      anonymous: false,
      name: 'Grace N.',
    },
    {
      amount: 'UGX 1,000,000',
      time: '3 hours ago',
      anonymous: false,
      name: 'David & Family',
    },
  ];

  const getImpactText = () => {
    const selectedAmount = customAmount || amount;
    if (!selectedAmount) return 'Select an amount to see your impact';

    const numAmount = parseInt(selectedAmount);
    if (numAmount >= 2500000)
      return 'Your donation can renovate an entire classroom';
    if (numAmount >= 1000000)
      return 'Your donation provides annual support for 3 children';
    if (numAmount >= 500000)
      return 'Your donation supports 10 children for a month';
    if (numAmount >= 250000)
      return 'Your donation provides uniforms for 5 children';
    if (numAmount >= 100000)
      return 'Your donation covers one term of school fees';
    if (numAmount >= 50000)
      return 'Your donation provides school supplies for 2 children';
    return 'Every contribution makes a difference';
  };

  return (
    <div className="pt-20">
      <DonateStructuredData />
      <div className="min-h-screen bg-white">
        {/* Trust-Building Hero */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-shield-check-line text-xl sm:text-2xl text-teal-600"></i>
                </div>
                <span className="text-sm sm:text-base font-semibold">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <i className="ri-verified-badge-line text-xl sm:text-2xl text-amber-600"></i>
                </div>
                <span className="text-sm sm:text-base font-semibold">
                  Verified NGO
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-eye-line text-xl sm:text-2xl text-teal-600"></i>
                </div>
                <span className="text-sm sm:text-base font-semibold">
                  94% Transparency
                </span>
              </div>
            </div>

            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Your Gift Changes Lives
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Every donation directly supports vulnerable children in Uganda.
                We operate with complete transparency, ensuring your
                contribution makes the maximum impact.
              </p>
            </div>

            {/* Transparency Statement */}
            <div className="bg-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-teal-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-hand-heart-line text-xl sm:text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Our Transparency Promise
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    We believe donors deserve to know exactly how their money is
                    used. That's why we publish detailed financial reports and
                    maintain one of the highest transparency ratings among NGOs
                    in Uganda.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
                    <span className="font-semibold text-teal-700">
                      70% Programs
                    </span>
                    <span className="font-semibold text-teal-700">
                      20% Operations
                    </span>
                    <span className="font-semibold text-teal-700">
                      10% Fundraising
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
              {/* Left Column - Donation Form */}
              <div className="lg:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Frequency Toggle */}
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Donation Frequency
                    </label>
                    <div className="inline-flex bg-gray-100 rounded-full p-1 w-full max-w-md">
                      <button
                        type="button"
                        onClick={() => setFrequency('one-time')}
                        className={`flex-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                          frequency === 'one-time'
                            ? 'bg-teal-600 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`flex-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                          frequency === 'monthly'
                            ? 'bg-teal-600 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {presetAmounts.map(preset => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => {
                            setAmount(preset.value);
                            setCustomAmount('');
                          }}
                          className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            amount === preset.value && !customAmount
                              ? 'border-teal-600 bg-teal-50 shadow-lg'
                              : 'border-gray-200 hover:border-teal-400'
                          }`}
                        >
                          <div className="font-bold text-base sm:text-lg text-gray-900">
                            {preset.label}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {preset.impact}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base font-semibold">
                        UGX
                      </span>
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={e => {
                          setCustomAmount(e.target.value);
                          setAmount('');
                        }}
                        className="w-full pl-14 sm:pl-16 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-base sm:text-lg"
                      />
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Your Information
                    </label>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name *"
                          required
                          value={formData.name}
                          onChange={e =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address *"
                          required
                          value={formData.email}
                          onChange={e =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number (Optional)"
                          value={formData.phone}
                          onChange={e =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-sm sm:text-base"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={formData.anonymous}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              anonymous: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                        />
                        <label
                          htmlFor="anonymous"
                          className="text-sm sm:text-base text-gray-700 cursor-pointer"
                        >
                          Make this donation anonymous
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <button
                        type="button"
                        className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-teal-600 transition-all cursor-pointer"
                      >
                        <i className="ri-smartphone-line text-2xl sm:text-3xl text-gray-600 mb-1 sm:mb-2"></i>
                        <div className="text-xs sm:text-sm font-semibold text-gray-700">
                          Mobile Money
                        </div>
                      </button>
                      <button
                        type="button"
                        className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-teal-600 transition-all cursor-pointer"
                      >
                        <i className="ri-bank-card-line text-2xl sm:text-3xl text-gray-600 mb-1 sm:mb-2"></i>
                        <div className="text-xs sm:text-sm font-semibold text-gray-700">
                          Card
                        </div>
                      </button>
                      <button
                        type="button"
                        className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-teal-600 transition-all cursor-pointer"
                      >
                        <i className="ri-bank-line text-2xl sm:text-3xl text-gray-600 mb-1 sm:mb-2"></i>
                        <div className="text-xs sm:text-sm font-semibold text-gray-700">
                          Bank Transfer
                        </div>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                      <i className="ri-lock-line text-teal-600"></i>
                      <span>
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-5 bg-amber-500 text-white text-lg sm:text-xl font-bold rounded-full hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-102 flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <InlineLoader />
                    ) : (
                      <>
                        <i className="ri-lock-line"></i>
                        Complete Donation
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column - Impact Sidebar */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Your Impact Box */}
                  <div className="bg-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-teal-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Your Impact
                    </h3>
                    <div className="text-3xl sm:text-4xl font-bold text-teal-700 mb-3 sm:mb-4">
                      {customAmount || amount
                        ? `UGX ${(customAmount || amount).toLocaleString()}`
                        : 'UGX 0'}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                      {getImpactText()}
                    </p>
                    {frequency === 'monthly' && (customAmount || amount) && (
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-300">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">
                          Annual Impact
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-teal-700">
                          UGX{' '}
                          {(
                            parseInt(customAmount || amount) * 12
                          ).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recent Donors */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                      Recent Donations
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {recentDonations.map((donation, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <div className="text-sm sm:text-base font-semibold text-gray-900">
                              {donation.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              {donation.time}
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-bold text-teal-700">
                            {donation.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transparency Promise */}
                  <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-200">
                    <div className="flex items-start gap-3 mb-3 sm:mb-4">
                      <i className="ri-shield-check-line text-2xl sm:text-3xl text-amber-600"></i>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                          Transparency Promise
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          We publish quarterly financial reports showing exactly
                          how every shilling is spent. You'll receive updates on
                          the children your donation supports.
                        </p>
                      </div>
                    </div>
                    <a
                      href="/financial-reports"
                      className="text-amber-700 font-semibold text-xs sm:text-sm hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      View Financial Reports{' '}
                      <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fund Allocation */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Where Your Money Goes
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Complete transparency in how we allocate funds to maximize
                impact
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <i className="ri-book-open-line text-3xl sm:text-4xl text-teal-600"></i>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-teal-700 mb-2 sm:mb-3">
                  70%
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Programs
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Direct support for education, school fees, materials,
                  uniforms, and sanitary supplies
                </p>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <i className="ri-building-line text-3xl sm:text-4xl text-amber-600"></i>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-amber-600 mb-2 sm:mb-3">
                  20%
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Operations
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Staff salaries, office costs, and essential infrastructure to
                  run programs effectively
                </p>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <i className="ri-megaphone-line text-3xl sm:text-4xl text-gray-600"></i>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-700 mb-2 sm:mb-3">
                  10%
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Fundraising
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Marketing, events, and donor relations to grow our impact and
                  reach more children
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Detailed Breakdown
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span className="font-semibold text-gray-700">
                      Education Programs
                    </span>
                    <span className="font-bold text-teal-700">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span className="font-semibold text-gray-700">
                      Operations & Administration
                    </span>
                    <span className="font-bold text-amber-600">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: '20%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span className="font-semibold text-gray-700">
                      Fundraising & Marketing
                    </span>
                    <span className="font-bold text-gray-700">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                    <div
                      className="bg-gray-600 h-full rounded-full"
                      style={{ width: '10%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Other Ways to Give
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                There are many ways to support our mission
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <Link
                to="/corporate-sponsorship"
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-600 cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-building-line text-2xl sm:text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Corporate Sponsorship
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Partner with us through employee matching, in-kind donations,
                  or strategic partnerships
                </p>
                <span className="text-sm sm:text-base text-teal-600 font-semibold flex items-center gap-2">
                  Learn More <i className="ri-arrow-right-line"></i>
                </span>
              </Link>

              <Link
                to="/stock-gifts"
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-600 cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-stock-line text-2xl sm:text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Stock &amp; Securities
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Donate appreciated stocks or securities to maximize your
                  impact and tax benefits
                </p>
                <span className="text-sm sm:text-base text-teal-600 font-semibold flex items-center gap-2">
                  Learn More <i className="ri-arrow-right-line"></i>
                </span>
              </Link>

              <Link
                to="/planned-giving"
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-600 cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-hand-heart-line text-2xl sm:text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Planned Giving
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Leave a lasting legacy through bequests, trusts, or
                  beneficiary designations
                </p>
                <span className="text-sm sm:text-base text-teal-600 font-semibold flex items-center gap-2">
                  Learn More <i className="ri-arrow-right-line"></i>
                </span>
              </Link>

              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-600">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-gift-line text-2xl sm:text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  In-Kind Donations
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Contribute goods, services, or professional expertise to
                  support our programs
                </p>
                <span className="text-sm sm:text-base text-teal-600 font-semibold flex items-center gap-2">
                  Contact Us <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Transparency */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Every donation is tracked and reported with complete
                accountability
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-600 mb-3 sm:mb-4">
                  70%
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Program Services
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Direct support for children's education
                </p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-600 mb-3 sm:mb-4">
                  20%
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Operations
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Management and infrastructure
                </p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-600 mb-3 sm:mb-4">
                  10%
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Fundraising
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Events and donor relations
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/financial-reports"
                className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gray-900 text-white text-base sm:text-lg font-bold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                View Financial Reports
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
