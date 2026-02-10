import crypto from 'crypto';
import axios from 'axios';

export interface PesapalPaymentRequest {
  amount: number;
  currency: string;
  email: string;
  phone_number?: string;
  first_name: string;
  last_name: string;
  callback_url: string;
  redirect_url: string;
  description: string;
  reference: string;
}

export interface PesapalTransactionResponse {
  order_tracking_id: string;
  redirect_url: string;
  payment_method: string;
  currency: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface PesapalTransactionStatus {
  payment_method: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference: string;
  created_at: string;
  paid_at?: string;
  phone_number?: string;
  email?: string;
}

class PesapalService {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.baseUrl = process.env.PESAPAL_ENV === 'production' 
      ? 'https://pay.pesapal.com/v3' 
      : 'https://cybqa.pesapal.com/v3';
    this.consumerKey = process.env.PESAPAL_CONSUMER_KEY!;
    this.consumerSecret = process.env.PESAPAL_CONSUMER_SECRET!;
  }

  /**
   * Get OAuth access token from Pesapal
   */
  private async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const credentials = Buffer.from(`${process.env.PESAPAL_CONSUMER_KEY}:${process.env.PESAPAL_CONSUMER_SECRET}`).toString('base64');
    
    const response = await axios.post(`${this.baseUrl}/api/Auth/RequestToken`, {}, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    const token = response.data.token;
    if (!token) {
      throw new Error('Failed to obtain access token from Pesapal');
    }

    // Cache token (expires in 4 minutes)
    this.accessToken = token;
    this.tokenExpiry = Date.now() + (4 * 60 * 1000) - 30000; // 30 seconds buffer

    return token;
  }

  /**
   * Submit payment request to Pesapal
   */
  async submitPayment(paymentData: PesapalPaymentRequest): Promise<PesapalTransactionResponse> {
    try {
      const token = await this.getAccessToken();

      const response = await axios.post(
        `${this.baseUrl}/api/Transactions/SubmitOrderRequest`,
        {
          id: paymentData.reference,
          currency: paymentData.currency,
          amount: paymentData.amount,
          description: paymentData.description,
          callback_url: paymentData.callback_url,
          redirect_url: paymentData.redirect_url,
          notification_mode: 'CALLBACK',
          brand_name: 'Educate an Orphan Uganda',
          logo: 'https://your-domain.com/logo.png',
          language: 'en',
          payment_methods: ['mobilemoney', 'card', 'banktransfer'],
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to submit payment to Pesapal:', error);
      throw new Error('Failed to create payment with Pesapal');
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(orderTrackingId: string): Promise<PesapalTransactionStatus> {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `${this.baseUrl}/api/Transactions/GetTransactionStatus`,
        {
          params: {
            orderTrackingId: orderTrackingId,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to get transaction status from Pesapal:', error);
      throw new Error('Failed to get transaction status');
    }
  }

  /**
   * Verify webhook notification
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const secret = process.env.PESAPAL_WEBHOOK_SECRET!;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    return signature === expectedSignature;
  }

  /**
   * Generate unique transaction reference
   */
  generateReference(): string {
    return `EOU-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  }
}

export const pesapalService = new PesapalService();
