import { useState } from 'react';
import { useLoading } from '../../components/providers/LoadingProvider';
import { toast } from '../../components/common/Toast';
import { useAnalyticsContext } from '../../components/providers/AnalyticsProvider';
import { createShopPayment, redirectToPesapal } from '../../services/pesapalApi';
import { PesapalShopPaymentRequest } from '../../services/pesapalApi';

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setLoading, setLoadingMessage } = useLoading();
  const { analytics } = useAnalyticsContext();

  // Sample shop items
  const shopItems = [
    {
      id: 1,
      name: 'EAO Branded T-Shirt',
      price: 25000,
      image: '/images/tshirt.jpg',
      description: 'High-quality cotton t-shirt with EAO logo',
      category: 'Apparel'
    },
    {
      id: 2,
      name: 'EAO Water Bottle',
      price: 15000,
      image: '/images/bottle.jpg',
      description: 'Reusable stainless steel water bottle',
      category: 'Accessories'
    },
    {
      id: 3,
      name: 'EAO Notebook Set',
      price: 20000,
      image: '/images/notebook.jpg',
      description: 'Set of 3 notebooks for students',
      category: 'Stationery'
    },
    {
      id: 4,
      name: 'EAO Tote Bag',
      price: 18000,
      image: '/images/tote.jpg',
      description: 'Canvas tote bag with educational message',
      category: 'Accessories'
    },
    {
      id: 5,
      name: 'EAO Cap',
      price: 22000,
      image: '/images/cap.jpg',
      description: 'Adjustable baseball cap with EAO embroidery',
      category: 'Apparel'
    },
    {
      id: 6,
      name: 'EAO Pen Set',
      price: 12000,
      image: '/images/pens.jpg',
      description: 'Set of 5 ballpoint pens',
      category: 'Stationery'
    }
  ];

  const addToCart = (item: any) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    toast.success('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Cart Empty', 'Please add items to your cart before checkout.');
      return;
    }

    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      toast.error('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setLoadingMessage('Processing your order...');
    setLoading(true);

    try {
      const paymentData: PesapalShopPaymentRequest = {
        cartItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        totalAmount: getTotalAmount(),
        currency: 'UGX',
        customerInfo,
      };

      const response = await createShopPayment(paymentData);

      if (response.success) {
        analytics.trackEvent({
          action: 'shop_checkout_started',
          category: 'ecommerce',
          label: `Order with ${cartItems.length} items`,
          value: getTotalAmount(),
        });
        
        redirectToPesapal(response.data.redirect_url);
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        'Checkout Error',
        'Failed to process your order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            EAO Shop
          </h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            Support our mission while getting quality merchandise. Every purchase helps educate orphaned children in Uganda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shop Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="14" font-family="Arial"%3EImage%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-purple-600">
                        UGX {item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
              </h3>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23ddd"/%3E%3Ctext x="32" y="32" text-anchor="middle" dy=".3em" fill="%23999" font-size="10" font-family="Arial"%3EImage%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-purple-600 font-semibold">UGX {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-purple-600">
                          UGX {getTotalAmount().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Customer Information</h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="First Name *"
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Last Name *"
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      
                      <input
                        type="email"
                        placeholder="Email *"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || cartItems.length === 0}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : 'Checkout with Pesapal'}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                      <p className="mb-2">Secure payment via:</p>
                      <div className="flex justify-center items-center gap-3 text-xs">
                        <span>Mobile Money</span>
                        <span>•</span>
                        <span>Cards</span>
                        <span>•</span>
                        <span>Bank Transfer</span>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
