import { useState } from 'react';
import { useLoading } from '../../components/providers/LoadingProvider';
import { InlineLoader } from '../../components/common/Loader';
import { toast } from '../../components/common/Toast';
import { useAnalyticsContext } from '../../components/providers/AnalyticsProvider';
import { useErrorLogger } from '../../hooks/useErrorLogger';
import { DonateStructuredData } from '../../components/seo/StructuredData';
import { submitDonation, DonationFormData } from '../../services/api';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false,
  });

  const { setLoading, setLoadingMessage } = useLoading();
  const { analytics } = useAnalyticsContext();
  const { logError } = useErrorLogger();

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
        fields: { name: !!formData.name, email: !!formData.email },
      });
      toast.error(
        'Validation Error',
        'Please fill in all required fields.'
      );
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setLoadingMessage('Processing your donation...');

    try {
      // Prepare donation data for API
      const donationData: DonationFormData = {
        amount: selectedAmount,
        currency: 'UGX',
        donorName: formData.name,
        donorEmail: formData.email,
        donorPhone: formData.phone,
        paymentMethod: 'mobile_money',
        isRecurring: frequency === 'monthly',
        campaign: 'general'
      };

      // Submit to backend API
      await submitDonation(donationData);

      // Track donation event
      if (analytics) {
        analytics.trackDonationStarted(selectedAmount, 'online');
      }

      // Show success message
      toast.success(
        'Thank You for Your Donation!',
        'Your generous contribution will help transform lives through education.'
      );

      // Reset form
      setAmount('');
      setCustomAmount('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        anonymous: false,
      });
    } catch (error) {
      console.error('Donation processing failed:', error);
      toast.error(
        'Processing Error',
        'There was an issue processing your donation. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const predefinedAmounts = [
    { amount: '50000', label: 'UGX 50,000', description: 'School supplies for one child' },
    { amount: '100000', label: 'UGX 100,000', description: 'One month of school fees' },
    { amount: '250000', label: 'UGX 250,000', description: 'Full term school fees' },
    { amount: '500000', label: 'UGX 500,000', description: 'One year of education support' },
    { amount: '1000000', label: 'UGX 1,000,000', description: 'Sponsor a child for 2 years' },
  ];

  return (
    <div className="pt-20">
      <DonateStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] flex items-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-orange-600/90"></div>
            <img
              src="https://public.readdy.ai/ai/img_res/a5c06f7bdd7e432e599ac1ef54d09652.jpg"
              alt="Children learning in classroom"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Make a{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Difference
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Your generosity transforms lives and builds futures for Uganda's children
              </p>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Your Impact in{' '}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Numbers
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how your donations are making a real difference in children's lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-heart-line text-2xl text-amber-600"></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">2,847</div>
                <div className="text-gray-600">Children Supported</div>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-map-2-line text-2xl text-teal-600"></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
                <div className="text-gray-600">Districts Reached</div>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-school-line text-2xl text-purple-600"></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">45</div>
                <div className="text-gray-600">Schools Partnered</div>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-trophy-line text-2xl text-green-600"></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Donation
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every contribution helps provide education, meals, and hope to children in need. 
                Join us in making a lasting impact.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Frequency Toggle */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-gray-100">
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      frequency === 'one-time'
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      frequency === 'monthly'
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Amount Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Donation Amount
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {predefinedAmounts.map((preset) => (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => {
                          setAmount(preset.amount);
                          setCustomAmount('');
                        }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          amount === preset.amount && !customAmount
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">
                          {preset.label}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {preset.description}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter custom amount (UGX)
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount('');
                      }}
                      placeholder="Enter amount"
                      min="1000"
                      step="1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.anonymous}
                        onChange={(e) =>
                          setFormData({ ...formData, anonymous: e.target.checked })
                        }
                        className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Make this donation anonymous
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <InlineLoader />
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="ri-heart-fill"></i>
                        Donate {frequency === 'monthly' ? 'Monthly' : 'Now'}
                      </>
                    )}
                  </button>
                </div>

                {/* Security Note */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-shield-check-line text-amber-600 text-xl mt-0.5"></i>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900 mb-1">
                        Secure Payment
                      </p>
                      <p>
                        Your payment information is encrypted and secure. We use
                        industry-standard security measures to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Other Ways to{' '}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Give
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore different ways to support our mission and make a lasting impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-bank-line text-2xl text-amber-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Bank Transfer
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Bank:</span> Centenary Bank
                  </div>
                  <div>
                    <span className="font-medium">Account Name:</span> Educate an Orphan Uganda
                  </div>
                  <div>
                    <span className="font-medium">Account Number:</span> 1234567890
                  </div>
                  <div>
                    <span className="font-medium">Swift Code:</span> CEBLUGKA
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-smartphone-line text-2xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Mobile Money
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">MTN MoMo:</span> 256700000000
                  </div>
                  <div>
                    <span className="font-medium">Airtel Money:</span> 256700000000
                  </div>
                  <div className="text-gray-600 text-xs mt-4">
                    Reference: Your Name + Donation
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-hand-heart-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  In-Person
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Visit Our Office:</span>
                  </div>
                  <div>Plot 123, Kampala Road</div>
                  <div>Kampala, Uganda</div>
                  <div className="text-gray-600 text-xs mt-4">
                    Mon-Fri: 9AM-5PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Donors */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Recent{' '}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Supporters
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our community of generous supporters making a difference
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="space-y-6">
                {[
                  { amount: 'UGX 100,000', time: '5 minutes ago', anonymous: false, name: 'Sarah M.' },
                  { amount: 'UGX 50,000', time: '1 hour ago', anonymous: true, name: 'Anonymous' },
                  { amount: 'UGX 250,000', time: '2 hours ago', anonymous: false, name: 'James K.' },
                  { amount: 'UGX 200,000', time: '2 hours ago', anonymous: false, name: 'Grace N.' },
                  { amount: 'UGX 75,000', time: '3 hours ago', anonymous: true, name: 'Anonymous' },
                ].map((donor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <i className="ri-heart-fill text-amber-600"></i>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {donor.anonymous ? 'Anonymous' : donor.name}
                        </div>
                        <div className="text-sm text-gray-600">{donor.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {frequency === 'monthly' && donor.amount !== 'UGX 75,000' && (
                          <span className="text-amber-600">Monthly </span>
                        )}
                        {donor.amount}
                      </div>
                      {frequency === 'monthly' && donor.amount !== 'UGX 75,000' && (
                        <div className="text-sm text-gray-600">
                          UGX{' '}
                          {(
                            parseInt(customAmount || amount) * 12
                          ).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
