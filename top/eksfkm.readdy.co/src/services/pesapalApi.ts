const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface PesapalPaymentRequest {
  amount: number;
  currency?: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  message?: string;
}

export interface PesapalShopPaymentRequest {
  cartItems: any[];
  totalAmount: number;
  currency?: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

export interface PesapalPaymentResponse {
  redirect_url: string;
  tracking_id: string;
  merchant_reference: string;
  order_id?: string;
}

export interface PaymentStatusResponse {
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  amount: number;
  currency: string;
  type: 'DONATION' | 'SHOP';
  merchant_reference: string;
  tracking_id: string;
  payment_method?: string;
  created_at: string;
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

  const text = await res.text();
  let data: any = text;
  try { data = JSON.parse(text); } catch {}

  if (!res.ok) {
    const e: any = new Error(data?.message || `HTTP error! status: ${res.status}`);
    e.status = res.status;
    e.responseBody = data;
    throw e;
  }

  return data as T;
}

// Create donation payment
export const createDonationPayment = async (
  paymentData: PesapalPaymentRequest
): Promise<{ success: boolean; data: PesapalPaymentResponse }> => {
  return apiRequest('/api/payments/donations/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
};

// Create shop payment
export const createShopPayment = async (
  paymentData: PesapalShopPaymentRequest
): Promise<{ success: boolean; data: PesapalPaymentResponse }> => {
  return apiRequest('/api/payments/shop/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
};

// Get payment status
export const getPaymentStatus = async (
  trackingId: string
): Promise<{ success: boolean; data: PaymentStatusResponse }> => {
  return apiRequest(`/api/payments/status?tracking_id=${trackingId}`);
};

// Poll payment status (for thank-you pages)
export const pollPaymentStatus = async (
  trackingId: string,
  onStatusChange: (status: PaymentStatusResponse) => void,
  maxAttempts = 30,
  interval = 2000
): Promise<PaymentStatusResponse> => {
  let attempts = 0;
  
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        attempts++;
        
        const response = await getPaymentStatus(trackingId);
        onStatusChange(response.data);
        
        if (response.data.status === 'COMPLETED' || response.data.status === 'FAILED') {
          resolve(response.data);
          return;
        }
        
        if (attempts >= maxAttempts) {
          reject(new Error('Payment status polling timeout'));
          return;
        }
        
        setTimeout(poll, interval);
      } catch (error) {
        reject(error);
      }
    };
    
    poll();
  });
};

// Redirect to Pesapal payment page
export const redirectToPesapal = (redirectUrl: string): void => {
  window.location.href = redirectUrl;
};

// Extract tracking ID from URL
export const getTrackingIdFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('tracking_id');
};

export default {
  createDonationPayment,
  createShopPayment,
  getPaymentStatus,
  pollPaymentStatus,
  redirectToPesapal,
  getTrackingIdFromUrl,
};
