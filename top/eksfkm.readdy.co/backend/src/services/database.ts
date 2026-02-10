import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  donor_name?: string;
  donor_email?: string;
  donor_phone?: string;
  message?: string;
  amount?: number;
  currency?: string;
  flutterwaveTxRef?: string;
  userId?: string;
  campaignId?: string;
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
    return await (prisma as any).payment.create({
      data: {
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
      },
    });
  }

  /**
   * Update a payment record
   */
  async updatePayment(id: string, data: Partial<CreatePaymentData>) {
    return await (prisma as any).payment.update({
      where: { id },
      data: {
        ...(data.tracking_id && { tracking_id: data.tracking_id }),
        ...(data.status && { status: data.status }),
        ...(data.pesapal_status && { pesapal_status: data.pesapal_status }),
        ...(data.payment_method && { payment_method: data.payment_method }),
      },
    });
  }

  /**
   * Get payment by tracking ID
   */
  async getPaymentByTrackingId(trackingId: string) {
    return await (prisma as any).payment.findUnique({
      where: { tracking_id: trackingId },
    });
  }

  /**
   * Create a donation record
   */
  async createDonation(data: CreateDonationData) {
    return await (prisma as any).donation.create({
      data: {
        payment_id: data.payment_id,
        donorName: data.donor_name,
        donorEmail: data.donor_email,
        donorPhone: data.donor_phone,
        message: data.message,
        amount: data.amount || 0,
        currency: data.currency || 'UGX',
        flutterwaveTxRef: data.flutterwaveTxRef,
        userId: data.userId,
        campaignId: data.campaignId,
      },
    });
  }

  /**
   * Create an order record
   */
  async createOrder(data: CreateOrderData) {
    return await (prisma as any).order.create({
      data: {
        payment_id: data.payment_id,
        status: data.status,
        total_amount: data.total_amount,
        currency: data.currency,
        customer_info: data.customer_info,
        shipping_info: data.shipping_info,
        order_items: data.order_items,
      },
    });
  }

  /**
   * Update order by payment ID
   */
  async updateOrderByPaymentId(paymentId: string, data: Partial<CreateOrderData>) {
    return await (prisma as any).order.updateMany({
      where: { payment_id: paymentId },
      data: {
        ...(data.status && { status: data.status }),
      },
    });
  }

  /**
   * Get donations with filters
   */
  async getDonations(filters: {
    page?: number;
    limit?: number;
    userId?: string;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const where = {
      ...(filters.userId && { userId: filters.userId }),
    };

    const [donations, total] = await Promise.all([
      (prisma as any).donation.findMany({
        where,
        include: {
          payment: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      (prisma as any).donation.count({ where }),
    ]);

    return {
      donations,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  }

  /**
   * Get campaign donations
   */
  async getCampaignDonations(campaignId?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = campaignId ? { campaignId: campaignId } : {};

    const [donations, total] = await Promise.all([
      (prisma as any).donation.findMany({
        where,
        include: {
          payment: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      (prisma as any).donation.count({ where }),
    ]);

    return {
      donations,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  }
}
