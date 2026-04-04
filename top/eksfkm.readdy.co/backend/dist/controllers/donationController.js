import crypto from 'crypto';
import { db } from '../utils/database.js';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
export class DonationController {
    /**
     * Create a donation payment intent with Flutterwave
     */
    createPayment = asyncHandler(async (req, res) => {
        const { amount, currency = 'UGX', message, isAnonymous = false, campaignId } = req.body;
        const userId = SupabaseAuth.extractUserId(req);
        if (!amount || Number(amount) <= 0) {
            throw new AppError('Valid donation amount is required', 400);
        }
        const txRef = `EOU-${Date.now()}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
        const donation = await db.createDonation({
            amount: Number(amount),
            currency,
            flutterwaveTxRef: txRef,
            status: 'PENDING',
            message: message ?? null,
            isAnonymous: Boolean(isAnonymous),
            userId: userId ?? undefined,
            campaignId: campaignId ?? undefined,
            donorName: req.user?.email ? 'Authenticated Donor' : 'Anonymous Donor',
            donorEmail: req.user?.email ?? undefined,
        });
        const flutterwavePayload = {
            tx_ref: txRef,
            amount: Number(amount),
            currency,
            customer: {
                email: req.user?.email || 'donor@educateanorphantuganda.org',
                name: isAnonymous ? 'Anonymous Donor' : 'Anonymous Donor',
            },
            customizations: {
                title: 'Educate an Orphan Uganda - Donation',
                description: message || 'Support our mission to educate orphans in Uganda',
                logo: 'https://your-domain.com/logo.png',
            },
            redirect_url: `${process.env.FRONTEND_URL}/donation/success`,
            payment_options: 'card,mobilemoney,ussd,banktransfer',
        };
        const response = {
            success: true,
            data: {
                donation,
                paymentLink: `https://flutterwave.com/pay/${txRef}`,
                flutterwavePayload,
            },
            message: 'Payment intent created successfully',
        };
        res.status(201).json(response);
        return;
    });
    /**
     * Verify Flutterwave webhook
     */
    verifyWebhook = asyncHandler(async (req, res) => {
        const signature = req.headers['verif-hash'];
        const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
        if (!signature || !secretHash) {
            throw new AppError('Invalid webhook signature', 401);
        }
        const hash = crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex');
        if (hash !== signature) {
            throw new AppError('Invalid webhook signature', 401);
        }
        const { event, data } = req.body;
        if (event === 'charge.completed') {
            await db.updateDonation(data.tx_ref, {
                status: 'COMPLETED',
                flutterwaveTransactionId: String(data.id),
                paymentMethod: data.payment_type ?? null,
            });
        }
        else if (event === 'charge.failed') {
            await db.updateDonation(data.tx_ref, {
                status: 'FAILED',
                flutterwaveTransactionId: String(data.id),
                paymentMethod: data.payment_type ?? null,
            });
        }
        res.status(200).json({ status: 'success' });
        return;
    });
    /**
     * Get donation by ID
     */
    getDonation = asyncHandler(async (req, res) => {
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
            },
        });
        if (!donation) {
            throw new AppError('Donation not found', 404);
        }
        const isAdmin = await SupabaseAuth.verifyAdminStatus(req.user?.userId || '');
        if (donation.userId !== userId && !isAdmin) {
            throw new AppError('Insufficient permissions', 403);
        }
        const response = {
            success: true,
            data: { donation },
        };
        res.status(200).json(response);
        return;
    });
    /**
     * Get all donations
     */
    getDonations = asyncHandler(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const userId = SupabaseAuth.extractUserId(req);
        const isAdmin = await SupabaseAuth.verifyAdminStatus(req.user?.userId || '');
        const targetUserId = isAdmin ? undefined : userId;
        const { donations, total, pages, hasNext, hasPrev } = await db.getDonations({
            page,
            limit,
            ...(targetUserId && { userId: targetUserId }),
        });
        const response = {
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
        return;
    });
    /**
     * Get campaign donations
     */
    getCampaignDonations = asyncHandler(async (req, res) => {
        const { campaignId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const where = campaignId ? { campaignId } : {};
        const [donations, total] = await Promise.all([
            db.prisma.donation.findMany({
                where,
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
            db.prisma.donation.count({ where }),
        ]);
        const response = {
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
        return;
    });
}
//# sourceMappingURL=donationController.js.map