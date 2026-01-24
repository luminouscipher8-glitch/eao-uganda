import { Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '@/utils/database.js';
import { SupabaseAuth } from '@/middleware/supabaseAuth.js';
import { AppError, asyncHandler } from '@/middleware/errorHandler.js';
import { AuthenticatedRequest, ApiResponse } from '@/types/index.js';

export class DonationController {
  /**
   * Create a donation payment intent with Flutterwave
   */
  createPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { amount, currency = 'UGX', message, isAnonymous = false, campaignId } = req.body;
    const userId = SupabaseAuth.extractUserId(req);

    if (!amount || amount <= 0) {
      throw new AppError('Valid donation amount is required', 400);
    }

    // Generate unique transaction reference
    const txRef = `EOU-${Date.now()}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

    // Create donation record
    const donation = await db.createDonation({
      amount,
      currency,
      flutterwaveTxRef: txRef,
      status: 'PENDING',
      message,
      isAnonymous,
      userId,
      campaignId,
    });

    // Flutterwave payment link creation
    const flutterwavePayload = {
      tx_ref: txRef,
      amount: amount,
      currency: currency,
      customer: {
        email: req.user?.email || 'donor@educateanorphantuganda.org',
        name: 'Anonymous Donor',
      },
      customizations: {
        title: 'Educate an Orphan Uganda - Donation',
        description: message || 'Support our mission to educate orphans in Uganda',
        logo: 'https://your-domain.com/logo.png',
      },
      redirect_url: `${process.env.FRONTEND_URL}/donation/success`,
      payment_options: 'card,mobilemoney,ussd,banktransfer',
    };

    // In production, you would make an actual API call to Flutterwave
    // For now, we'll return the payload for the frontend to handle
    const response: ApiResponse = {
      success: true,
      data: {
        donation,
        paymentLink: `https://flutterwave.com/pay/${txRef}`, // Mock payment link
        flutterwavePayload,
      },
      message: 'Payment intent created successfully',
    };

    res.status(201).json(response);
  });

  /**
   * Verify Flutterwave webhook
   */
  verifyWebhook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const signature = req.headers['verif-hash'] as string;
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;

    if (!signature || !secretHash) {
      throw new AppError('Invalid webhook signature', 401);
    }

    // Verify webhook signature
    const hash = crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex');
    
    if (hash !== signature) {
      throw new AppError('Invalid webhook signature', 401);
    }

    const { event, data } = req.body;

    if (event === 'charge.completed') {
      // Update donation status
      await db.updateDonation(data.tx_ref, {
        status: 'COMPLETED',
        flutterwaveTransactionId: data.id,
        paymentMethod: data.payment_type,
      });
    } else if (event === 'charge.failed') {
      // Update donation status
      await db.updateDonation(data.tx_ref, {
        status: 'FAILED',
        flutterwaveTransactionId: data.id,
        paymentMethod: data.payment_type,
      });
    }

    res.status(200).json({ status: 'success' });
  });

  /**
   * Get donation by ID
   */
  getDonation = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = SupabaseAuth.extractUserId(req);

    const donation = await db.prisma.donation.findUnique({
      where: { id: id || '' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!donation) {
      throw new AppError('Donation not found', 404);
    }

    // Users can only view their own donations unless admin
    if (donation.userId !== userId && req.user?.role !== 'admin') {
      throw new AppError('Insufficient permissions', 403);
    }

    const response: ApiResponse = {
      success: true,
      data: { donation },
    };

    res.status(200).json(response);
  });

  /**
   * Get all donations (admin or user's own donations)
   */
  getDonations = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const userId = SupabaseAuth.extractUserId(req);

    // Admins can see all donations, users only see their own
    const targetUserId = req.user?.role === 'admin' ? undefined : userId;

    const { donations, total, pages, hasNext, hasPrev } = await db.getDonations({
      page,
      limit,
      userId: targetUserId || undefined,
    });

    const response: ApiResponse = {
      success: true,
      data: {
        donations,
        pagination: {
          page,
          limit,
          total,
          pages,
          hasNext,
          hasPrev,
        },
      },
    };

    res.status(200).json(response);
  });

  /**
   * Get campaign donations
   */
  getCampaignDonations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { campaignId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const [donations, total] = await Promise.all([
      db.prisma.donation.findMany({
        where: { campaignId: campaignId || undefined },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      }),
      db.prisma.donation.count({ where: { campaignId: campaignId || undefined } }),
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        donations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
    };

    res.status(200).json(response);
  });
}
