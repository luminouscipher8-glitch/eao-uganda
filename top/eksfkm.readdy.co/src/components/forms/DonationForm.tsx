import { useState } from 'react';
import { toast } from '../common/Toast';
import { submitDonation, DonationFormData } from '../../services/api';

export default function DonationForm() {
  const [formData, setFormData] = useState<DonationFormData>({
    amount: '',
    currency: 'UGX',
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    paymentMethod: 'mobile_money',
    isRecurring: false,
    campaign: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = [
    { amount: '50000', label: 'UGX 50,000', description: 'School supplies for one child' },
    { amount: '100000', label: 'UGX 100,000', description: 'One month of school fees' },
    { amount: '250000', label: 'UGX 250,000', description: 'Full term school fees' },
    { amount: '500000', label: 'UGX 500,000', description: 'One year of education support' },
    { amount: '1000000', label: 'UGX 1,000,000', description: 'Sponsor a child for 2 years' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmountSelect = (amount: string) => {
    setFormData(prev => ({
      ...prev,
      amount
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.amount || !formData.donorName.trim() || !formData.donorEmail.trim()) {
      toast.error('Validation Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.donorEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      toast.error('Invalid Amount', 'Please enter a valid donation amount');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitDonation(formData);
      toast.success('Donation Initiated!', 'Thank you for your generosity. You will be redirected to complete your payment.');
      
      // In a real implementation, you would redirect to payment gateway
      // For now, we'll just reset the form
      setFormData({
        amount: '',
        currency: 'UGX',
        donorName: '',
        donorEmail: '',
        donorPhone: '',
        paymentMethod: 'mobile_money',
        isRecurring: false,
        campaign: 'general'
      });
    } catch (error) {
      console.error('Donation submission error:', error);
      toast.error('Payment Failed', 'Failed to initiate donation. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Amount Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Donation Amount</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {predefinedAmounts.map((preset) => (
            <button
              key={preset.amount}
              type="button"
              onClick={() => handleAmountSelect(preset.amount)}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.amount === preset.amount
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{preset.label}</div>
              <div className="text-sm text-gray-600 mt-1">{preset.description}</div>
            </button>
          ))}
        </div>
        
        {/* Custom Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Or enter custom amount (UGX)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1000"
            step="1000"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="Enter amount in UGX"
          />
        </div>
      </div>

      {/* Donor Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="donorEmail"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="donorPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="donorPhone"
            name="donorPhone"
            value={formData.donorPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="+256 700 000 000"
          />
        </div>
      </div>

      {/* Payment Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="mobile_money">Mobile Money (MTN, Airtel)</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="credit_card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div>
            <label htmlFor="campaign" className="block text-sm font-medium text-gray-700 mb-2">
              Campaign
            </label>
            <select
              id="campaign"
              name="campaign"
              value={formData.campaign}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="general">General Support</option>
              <option value="education">Education Fund</option>
              <option value="feeding">Feeding Program</option>
              <option value="infrastructure">Infrastructure Development</option>
              <option value="medical">Medical Support</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isRecurring"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="isRecurring" className="ml-2 text-sm text-gray-700">
              Make this a monthly recurring donation
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <i className="ri-heart-fill"></i>
              Donate Now
            </>
          )}
        </button>
      </div>

      {/* Security Note */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <i className="ri-shield-check-line text-teal-600 text-xl mt-0.5"></i>
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-1">Secure Payment</p>
            <p>Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
          </div>
        </div>
      </div>
    </form>
  );
}
