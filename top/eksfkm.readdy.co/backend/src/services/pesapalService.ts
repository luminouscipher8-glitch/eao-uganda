import crypto from 'crypto';
import axios, { AxiosError } from "axios";

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
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    const env = process.env.PESAPAL_ENV ?? "sandbox";
    this.baseUrl = env === "production" 
      ? "https://pay.pesapal.com/v3" 
      : "https://cybqa.pesapal.com/pesapalv3";

    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      throw new Error("Missing Pesapal env vars: PESAPAL_CONSUMER_KEY and/or PESAPAL_CONSUMER_SECRET");
    }

    this.consumerKey = process.env.PESAPAL_CONSUMER_KEY;
    this.consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
  }

/**
   * Get OAuth access token from Pesapal
   */
  private async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }
    
    const response = await axios.post(
      `${this.baseUrl}/api/Auth/RequestToken`,
      {
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

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

      // Use only an explicitly configured notification id from env.
      // Do NOT attempt runtime registration here — dynamic IPN IDs from tunnels
      // are often rejected by Pesapal sandbox. If you need to register an IPN
      // programmatically, call `registerIPN()` manually and store the stable id
      // in `PESAPAL_IPN_ID`.
      const notificationId = process.env.PESAPAL_IPN_ID || null;

      const payload: any = {
        id: paymentData.reference,
        currency: paymentData.currency,
        amount: paymentData.amount,
        email: paymentData.email,
        phone_number: paymentData.phone_number,
        first_name: paymentData.first_name,
        last_name: paymentData.last_name,
        description: paymentData.description,
        callback_url: paymentData.callback_url,
        redirect_url: paymentData.redirect_url,

        // Start minimal; add optional fields after it works:
        // include notification_mode only when a notification id is present
        // to avoid sandbox validation errors
        // notification_mode: 'CALLBACK',
        brand_name: 'Educate an Orphan Uganda',
        language: 'en',
      };

      // Pesapal sometimes requires billing details — include minimal placeholders
      payload.billing_address = paymentData['billing_address'] || 'N/A';
      payload.billing_city = paymentData['billing_city'] || 'Kampala';
      payload.billing_state = paymentData['billing_state'] || '';
      payload.billing_post_code = paymentData['billing_post_code'] || '';
      payload.billing_country = paymentData['billing_country'] || 'UG';

      // Intentionally do not include `notification_id` or `notification_mode`
      // in the SubmitOrderRequest to avoid sandbox validation issues.

      try {
        const response = await axios.post(`${this.baseUrl}/api/Transactions/SubmitOrderRequest`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Pesapal sometimes returns a 200 with an error object inside the body.
        if (response.data && response.data.error) {
          const msg = response.data.error.message || JSON.stringify(response.data.error);
          const e: any = new Error(msg || 'Pesapal reported an error in response');
          e.details = response.data;
          e.status = response.data.status || 502;
          throw e;
        }

        return response.data;
      } catch (submitErr) {
        const serr = submitErr as AxiosError<any>;
        const message = serr.response?.data?.error?.message || serr.response?.data?.message || '';

        // If Pesapal complains about the IPN/notification id, retry without notification fields.
        if (message && message.toLowerCase().includes('ipn')) {
          console.warn('Pesapal rejected notification_id; retrying SubmitOrderRequest without IPN fields');
          // Remove IPN related fields and retry once
          delete payload.notification_id;
          delete payload.notification_mode;

          const retryResp = await axios.post(`${this.baseUrl}/api/Transactions/SubmitOrderRequest`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          return retryResp.data;
        }

        throw submitErr;
      }
    } catch (error) {
      const err = error as AxiosError<any>;

      console.error("Pesapal SubmitOrderRequest failed:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      const e: any = new Error(
        err.response?.data?.message || "Failed to create payment with Pesapal"
      );
      e.status = err.response?.status || 502;
      e.details = err.response?.data;
      throw e;
    }
  }

  /**
   * Register an IPN (callback) with Pesapal and return the notification id.
   * If Pesapal does not support programmatic registration in your account,
   * this method may fail — in which case set PESAPAL_IPN_ID in env.
   */
  async registerIPN(callbackUrl: string): Promise<string | null> {
    try {
      const token = await this.getAccessToken();

      const response = await axios.post(
        `${this.baseUrl}/api/URLSetup/RegisterIPN`,
        {
          url: callbackUrl,
          ipn_notification_type: 'GET',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const data = response.data;
      return data?.ipn_id || data?.notification_id || data?.id || null;
    } catch (error) {
      const err = error as AxiosError<any>;
      console.error('Pesapal RegisterIPN failed:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      throw error;
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
   * Public helper to check access token validity (used for diagnostics).
   * Returns the raw token string when successful.
   */
  async checkAccessToken(): Promise<string> {
    return await this.getAccessToken();
  }

  /**
   * Generate unique transaction reference
   */
  generateReference(): string {
    return `EOU-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  }
}

export const pesapalService = new PesapalService();
