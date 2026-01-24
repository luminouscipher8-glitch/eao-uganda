import { Router } from 'express';
import { body } from 'express-validator';
import { DonationController } from '../controllers/donationController.js';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();
const donationController = new DonationController();

// Validation middleware
const createDonationValidation = [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be greater than 0'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
  body('message').optional().isLength({ max: 500 }).trim(),
  body('isAnonymous').optional().isBoolean(),
  body('campaignId').optional().isString(),
];

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create a donation payment
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 1
 *               currency:
 *                 type: string
 *                 default: UGX
 *               message:
 *                 type: string
 *                 maxLength: 500
 *               isAnonymous:
 *                 type: boolean
 *                 default: false
 *               campaignId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment intent created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authenticated
 */
router.post('/', SupabaseAuth.authenticate, createDonationValidation, asyncHandler(donationController.createPayment));

/**
 * @swagger
 * /api/donations/webhook:
 *   post:
 *     summary: Flutterwave webhook handler
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 */
router.post('/webhook', asyncHandler(donationController.verifyWebhook));

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Get all donations (admin or user's own)
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Donations retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/', SupabaseAuth.authenticate, asyncHandler(donationController.getDonations));

/**
 * @swagger
 * /api/donations/{id}:
 *   get:
 *     summary: Get donation by ID
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Donation retrieved successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Donation not found
 */
router.get('/:id', SupabaseAuth.authenticate, asyncHandler(donationController.getDonation));

/**
 * @swagger
 * /api/donations/campaign/{campaignId}:
 *   get:
 *     summary: Get donations for a specific campaign
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Campaign donations retrieved successfully
 */
router.get('/campaign/:campaignId', asyncHandler(donationController.getCampaignDonations));

export { router as donationRoutes };
