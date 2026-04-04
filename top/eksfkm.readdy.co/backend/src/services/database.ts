import { supabase } from '../lib/supabase.js';

export interface CreatePaymentData {
  type: 'DONATION' | 'SHOP';
  merchant_reference: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  provider: string;
  metadata?: any;
  tracking_id?: string;
  pesapal_status?: string;
  payment_method?: string;
}

export interface CreateDonationData {
  payment_id?: string;
  message?: string;
  amount?: number;
  currency?: string;
  flutterwaveTxRef?: string;
  userId?: string;
  campaignId?: string;
  is_anonymous?: boolean;
  payment_method?: string;
  is_recurring?: boolean;
}

export interface CreateOrderData {
  payment_id: string;
  status: string;
  total_amount: number;
  currency: string;
  customer_info: any;
  shipping_info?: any;
  order_items?: any;
}

export class DatabaseService {
  /**
   * Create a payment record
   */
  async createPayment(data: CreatePaymentData) {
    const result = await supabase
      .from('payments')
      .insert({
        type: data.type,
        merchant_reference: data.merchant_reference,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        provider: data.provider,
        metadata: data.metadata,
        tracking_id: data.tracking_id,
        pesapal_status: data.pesapal_status,
        payment_method: data.payment_method,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  /**
   * Update a payment record
   */
  async updatePayment(id: string, data: Partial<CreatePaymentData>) {
    const result = await supabase
      .from('payments')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  /**
   * Get payment by tracking ID
   */
  async getPaymentByTrackingId(trackingId: string) {
    const result = await supabase
      .from('payments')
      .select('*')
      .eq('tracking_id', trackingId)
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  /**
   * Create a donation record
   */
  async createDonation(data: CreateDonationData) {
    const result = await supabase
      .from('donations')
      .insert({
        ...data,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  /**
   * Create an order record
   */
  async createOrder(data: CreateOrderData) {
    const result = await supabase
      .from('orders')
      .insert({
        payment_id: data.payment_id,
        status: data.status,
        total_amount: data.total_amount,
        currency: data.currency,
        customer_info: data.customer_info,
        shipping_info: data.shipping_info,
        order_items: data.order_items,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  /**
   * Update order by payment ID
   */
  async updateOrderByPaymentId(paymentId: string, data: Partial<CreateOrderData>) {
    const result = await supabase
      .from('orders')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('payment_id', paymentId)
      .select()
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  /**
   * Get donations with pagination and filtering
   */
  async getDonations(filters: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  } = {}) {
    let query = supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate);
    }

    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate);
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    const result = await query;

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      data: result.data || [],
      count: result.count || 0,
      page,
      limit
    };
  }

  /**
   * Get donations for a specific campaign
   */
  async getCampaignDonations(campaignId: string, filters: {
    page?: number;
    limit?: number;
  } = {}) {
    let query = supabase
      .from('donations')
      .select('*')
      .eq('campaignId', campaignId)
      .order('created_at', { ascending: false });

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    const result = await query;

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      data: result.data || [],
      count: result.count || 0,
      page,
      limit
    };
  }
}
