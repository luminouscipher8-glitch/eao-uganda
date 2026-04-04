import { Router } from 'express';
import { body } from 'express-validator';
import { PaymentController } from '../controllers/paymentController.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();
const paymentController = new PaymentController();

// Validation middleware for donation creation
const createDonationValidation = [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be greater than 0'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
  body('donorName').optional().isLength({ max: 100 }).trim(),
  body('donorEmail').optional().isEmail().normalizeEmail(),
  body('donorPhone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
  body('message').optional().isLength({ max: 500 }).trim(),
  body('isRecurring').optional().isBoolean().withMessage('isRecurring must be boolean'),
  body('campaign').optional().isString().withMessage('Campaign must be a string'),
];

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create a donation payment with Pesapal (legacy-compatible alias)
 *     tags: [Donations]
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
 *                 description: Donation amount
 *               currency:
 *                 type: string
 *                 default: UGX
 *                 description: Currency code (3 letters)
 *               donorName:
 *                 type: string
 *                 maxLength: 100
 *                 description: Donor's full name
 *               donorEmail:
 *                 type: string
 *                 format: email
 *                 description: Donor's email address
 *               donorPhone:
 *                 type: string
 *                 description: Donor's phone number
 *               message:
 *                 type: string
 *                 maxLength: 500
 *                 description: Personal message with donation
 *               isRecurring:
 *                 type: boolean
 *                 default: false
 *                 description: Whether this is a recurring donation
 *               campaign:
 *                 type: string
 *                 description: Campaign identifier
 *     responses:
 *       200:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     redirect_url:
 *                       type: string
 *                       description: Pesapal payment URL to redirect user to
 *                     tracking_id:
 *                       type: string
 *                       description: Pesapal order tracking ID
 *                     merchant_reference:
 *                       type: string
 *                       description: Unique merchant reference
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', createDonationValidation, asyncHandler(paymentController.createDonationPayment));

/**
 * @swagger
 * /api/donations/status:
 *   get:
 *     summary: Get donation payment status (legacy-compatible alias)
 *     tags: [Donations]
 *     parameters:
 *       - in: query
 *         name: tracking_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pesapal order tracking ID
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       400:
 *         description: Tracking ID required
 *       404:
 *         description: Payment not found
 */
router.get('/status', asyncHandler(paymentController.getPaymentStatus));

/**
 * @swagger
 * /api/donations/pesapal/ipn:
 *   post:
 *     summary: Deprecated donation IPN path
 *     tags: [Donations]
 *     description: Deprecated. Use /api/payments/pesapal/ipn
 *     responses:
 *       410:
 *         description: Deprecated endpoint
 */
router.post('/pesapal/ipn', (_req, res) => {
  res.status(410).json({
    success: false,
    error: 'Deprecated. Use /api/payments/pesapal/ipn',
  });
});

/**
 * @swagger
 * /api/donations/pesapal/ipn:
 *   get:
 *     summary: Deprecated donation IPN path
 *     tags: [Donations]
 *     description: Deprecated. Use /api/payments/pesapal/ipn
 *     responses:
 *       410:
 *         description: Deprecated endpoint
 */
router.get('/pesapal/ipn', (_req, res) => {
  res.status(410).json({
    success: false,
    error: 'Deprecated. Use /api/payments/pesapal/ipn',
  });
});

export { router as donationRoutes };
