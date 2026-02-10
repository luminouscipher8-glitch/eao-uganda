import { Router } from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import { PaymentController } from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

// Validation middleware for donation payment creation
const createDonationValidation = [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be greater than 0'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
  body('donorName').optional().isLength({ max: 100 }).trim(),
  body('donorEmail').optional().isEmail().normalizeEmail(),
  body('donorPhone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
  body('message').optional().isLength({ max: 500 }).trim(),
];

// Validation middleware for shop payment creation
const createShopPaymentValidation = [
  body('cartItems').isArray({ min: 1 }).withMessage('Cart items are required'),
  body('totalAmount').isFloat({ min: 1 }).withMessage('Total amount must be greater than 0'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
  body('customerInfo.firstName').notEmpty().withMessage('First name is required'),
  body('customerInfo.lastName').notEmpty().withMessage('Last name is required'),
  body('customerInfo.email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('customerInfo.phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
];

// Create donation payment endpoint
router.post('/donations/create', createDonationValidation, asyncHandler(paymentController.createDonationPayment));

// Create shop payment endpoint
router.post('/shop/create', createShopPaymentValidation, asyncHandler(paymentController.createShopPayment));

// Get payment status endpoint
router.get('/status', asyncHandler(paymentController.getPaymentStatus));

// Pesapal IPN webhook endpoints
router.post('/pesapal/ipn', asyncHandler(paymentController.handlePesapalIPN));
router.get('/pesapal/ipn', asyncHandler(paymentController.handlePesapalIPN));

export { router as paymentRoutes };
