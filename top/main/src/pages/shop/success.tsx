import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../components/providers/LoadingProvider.tsx';
import { toast } from '../../components/common/Toast.tsx';
import { useAnalyticsContext } from '../../components/providers/AnalyticsProvider.tsx';
import { pollPaymentStatus, getTrackingIdFromUrl } from '../../services/pesapalApi.ts';
import { PaymentStatusResponse } from '../../services/pesapalApi.ts';

export default function ShopSuccessPage() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { setLoading, setLoadingMessage } = useLoading();
  const { analytics } = useAnalyticsContext();

  useEffect(() => {
    const trackingId = getTrackingIdFromUrl();
    
    if (!trackingId) {
      setError('No payment tracking ID found');
      setIsPolling(false);
      return;
    }

    // Start polling for payment status
    setLoadingMessage('Confirming your order...');
    setLoading(true);

    pollPaymentStatus(
      trackingId,
      (status) => {
        setPaymentStatus(status);
        // Track payment status changes
        analytics.trackEvent({
          action: 'payment_status_update',
          category: 'payment',
          label: status.status,
          customParameters: {
            tracking_id: trackingId,
            amount: status.amount.toString(),
            payment_type: status.type,
          },
        });
      },
      30, // max attempts (1 minute)
      2000 // interval (2 seconds)
    )
      .then((finalStatus) => {
        setPaymentStatus(finalStatus);
        setIsPolling(false);
        setLoading(false);
        
        if (finalStatus.status === 'COMPLETED') {
          // Track successful order
          analytics.trackEvent({
            action: 'shop_order_completed',
            category: 'ecommerce',
            label: 'Shop order',
            value: finalStatus.amount.toString(),
          });
          
          toast.success(
            'Order Completed Successfully!',
            'Your order has been confirmed successfully.',
            8000
          );
        } else if (finalStatus.status === 'FAILED') {
          analytics.trackEvent({
            action: 'shop_order_failed',
            category: 'ecommerce',
            label: 'Shop order failed',
            value: finalStatus.amount.toString(),
          });
          
          toast.error(
            'Payment Failed',
            'Unfortunately, your order could not be processed. Please try again or contact support.',
            8000
          );
        }
      })
      .catch((err) => {
        console.error('Payment status polling error:', err);
        setError('Failed to confirm payment status');
        setIsPolling(false);
        setLoading(false);
        
        toast.error(
          'Payment Status Error',
          'Unable to confirm your payment status. Please contact support if you believe this is an error.',
          8000
        );
      });
  }, [navigate, setLoading, analytics]);

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleContinueShopping}
              className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleContactSupport}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isPolling || !paymentStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming Your Order</h1>
          <p className="text-gray-600 mb-4">
            Please wait while we confirm your payment status...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Verifying payment with Pesapal</p>
            <p>• Updating your order status</p>
            <p>• Confirming your payment details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className={`${
        paymentStatus.status === 'COMPLETED' 
          ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
          : 'bg-gradient-to-r from-red-600 to-pink-600'
      } text-white py-12`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            paymentStatus.status === 'COMPLETED' ? 'bg-white/20' : 'bg-white/20'
          }`}>
            {paymentStatus.status === 'COMPLETED' ? (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {paymentStatus.status === 'COMPLETED' 
              ? 'Order Completed Successfully!' 
              : 'Payment Failed'
            }
          </h1>
          <p className="text-xl opacity-95">
            {paymentStatus.status === 'COMPLETED' 
              ? 'Your order has been successfully processed.'
              : 'Unfortunately, your order could not be processed.'
            }
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Receipt */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Receipt</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono text-sm">{paymentStatus.merchant_reference}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tracking ID</span>
                <span className="font-mono text-sm">{paymentStatus.tracking_id}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-lg">
                  UGX {paymentStatus.amount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  paymentStatus.status === 'COMPLETED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {paymentStatus.status}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Payment Method</span>
                <span>{paymentStatus.payment_method || 'Processing...'}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Date</span>
                <span>{new Date(paymentStatus.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {paymentStatus.status === 'COMPLETED' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Order Confirmation:</strong> Your order has been successfully confirmed.
                  Thank you for supporting our mission through the EAO Shop.
                </p>
                <p className="text-sm text-green-800 mt-2">
                  If you need support regarding this order, please contact us and share your order ID and tracking ID.
                </p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="space-y-6">
            {paymentStatus.status === 'COMPLETED' ? (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        Keep your order ID and tracking ID for reference in case you need support.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your order will be processed and shipped within 3-5 business days.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        Contact support with your order ID and tracking ID if you need an update on your order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Continue Shopping</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Need more items? Continue supporting our mission through the shop.
                  </p>
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                  >
                    Back to Shop
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What Can You Do?</h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Sometimes payments fail due to network issues or insufficient funds. Here are your options:
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={handleContinueShopping}
                      className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleContactSupport}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
