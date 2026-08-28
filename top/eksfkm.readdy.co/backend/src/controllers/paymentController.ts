import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { ApiResponse, AuthenticatedRequest } from '../types/index.js';
import { pesapalService } from '../services/pesapalService.js';
import { sendEmail } from '../services/emailService.js';
import { DatabaseService } from '../services/database';
import { Request, Response } from 'express';


const db = new DatabaseService();

export class PaymentController {
  /**
   * Create donation payment
   */
  createDonationPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { amount, donorName, donorEmail, donorPhone, message, currency = 'UGX', isRecurring, campaign } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      throw new AppError('Valid donation amount is required', 400);
    }

    // Handle recurring donations - not currently supported
    if (isRecurring) {
      throw new AppError('Recurring donations are not currently supported. Please make a one-time donation.', 400);
    }

    // Generate unique references
    const merchantReference = pesapalService.generateReference();
    
    try {
      // Create payment record
      const payment = await db.createPayment({
        type: 'DONATION',
        merchant_reference: merchantReference,
        amount: amount as number,
        currency,
        status: 'PENDING',
        provider: 'pesapal',
        metadata: {
          donorName,
          donorEmail,
          donorPhone,
          message,
        },
      });




      // Submit to Pesapal
      const frontendBaseUrl =
        process.env.FRONTEND_URL || 'http://localhost:5173';

      const backendBaseUrl =
        process.env.BACKEND_URL ||
        process.env.API_BASE_URL ||
        'http://localhost:3001';

      const pesapalResponse = await pesapalService.submitPayment({
        amount: amount as number,
        currency,
        email: donorEmail || 'donor@eao-uganda.org',
        phone_number: donorPhone,
        first_name: donorName?.split(' ')[0] || 'Anonymous',
        last_name: donorName?.split(' ').slice(1).join(' ') || 'Donor',
        callback_url: `${backendBaseUrl}/api/payments/pesapal/ipn`,
        redirect_url: `${frontendBaseUrl}/donation/success?tracking_id={{order_tracking_id}}`,
        description: message || 'Support our mission to educate orphans in Uganda',
        reference: merchantReference,
      });

      // Update payment with tracking ID
      await db.updatePayment(payment.id, {
        tracking_id: pesapalResponse.order_tracking_id,
      });

      const response: ApiResponse = {
        success: true,
        data: {
          redirect_url: pesapalResponse.redirect_url,
          tracking_id: pesapalResponse.order_tracking_id,
          merchant_reference: merchantReference,
        },
      };

      res.status(200).json(response);
      return;
    } catch (err: any) {
      console.error('Failed to create donation payment:', err);

      // Return structured error with status and details
      const statusCode = err.status || 500;
      const response: ApiResponse = {
        success: false,
        message: err.message || 'Failed to create donation payment',
        ...(process.env.NODE_ENV === 'development' && { details: err.details }),
      };

      res.status(statusCode).json(response);
      return;
    }
  });

  /**
   * Create shop payment
   */
  createShopPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { cartItems, totalAmount, customerInfo, currency = 'UGX' } = req.body;

    // Validate input
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new AppError('Cart items are required', 400);
    }

    if (!totalAmount || totalAmount <= 0) {
      throw new AppError('Valid total amount is required', 400);
    }

    // Generate unique references
    const merchantReference = pesapalService.generateReference();
    
    try {
      // Create payment record
      const payment = await db.createPayment({
        type: 'SHOP',
        merchant_reference: merchantReference,
        amount: totalAmount as number,
        currency,
        status: 'PENDING',
        provider: 'pesapal',
        metadata: {
          cartItems,
          customerInfo,
        },
      });

      // Create order record (optional for now)
      const order = await db.createOrder({
        payment_id: payment.id,
        status: 'AWAITING_PAYMENT',
        total_amount: totalAmount as number,
        currency,
        customer_info: customerInfo,
        order_items: cartItems,
      });

      // Submit to Pesapal
      const frontendBaseUrl =
        process.env.FRONTEND_URL || 'http://localhost:5173';

      const backendBaseUrl =
        process.env.BACKEND_URL ||
        process.env.API_BASE_URL ||
        'http://localhost:3001';

      const pesapalResponse = await pesapalService.submitPayment({
        amount: totalAmount as number,
        currency,
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        callback_url: `${backendBaseUrl}/api/payments/pesapal/ipn`,
        redirect_url: `${frontendBaseUrl}/shop/success?tracking_id={{order_tracking_id}}`,
        description: `Order for ${cartItems.length} items from EAO Shop`,
        reference: merchantReference,
      });

      // Update payment with tracking ID
      await db.updatePayment(payment.id, {
        tracking_id: pesapalResponse.order_tracking_id,
      });

      const response: ApiResponse = {
        success: true,
        data: {
          redirect_url: pesapalResponse.redirect_url,
          tracking_id: pesapalResponse.order_tracking_id,
          merchant_reference: merchantReference,
          order_id: order.id,
        },
      };

      res.status(200).json(response);
      return;
    } catch (error) {
      console.error('Failed to create shop payment:', error);
      throw new AppError('Failed to create shop payment', 500);
    }
  });

  /**
   * Get payment status
   */
  getPaymentStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { tracking_id } = req.query as { tracking_id?: string };

    if (!tracking_id) {
      throw new AppError('Tracking ID is required', 400);
    }

    try {
      // Get payment from database
      const payment = await db.getPaymentByTrackingId(tracking_id as string);
      
      if (!payment) {
        throw new AppError('Payment not found', 404);
      }

      // If payment is still pending, check with Pesapal
      if (payment.status === 'PENDING') {
        const pesapalStatus = await pesapalService.getTransactionStatus(tracking_id as string);
        
        // Update payment status based on Pesapal response
        const newStatus = pesapalStatus.status === 'COMPLETED' ? 'COMPLETED' : 
                        pesapalStatus.status === 'FAILED' ? 'FAILED' : 'PENDING';
        
        await db.updatePayment(payment.id, {
          status: newStatus,
          pesapal_status: pesapalStatus.status,
          payment_method: pesapalStatus.payment_method,
        });
        
        payment.status = newStatus;
        payment.pesapal_status = pesapalStatus.status;
        payment.payment_method = pesapalStatus.payment_method;
      }

      const response: ApiResponse = {
        success: true,
        data: {
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          type: payment.type,
          merchant_reference: payment.merchant_reference,
          tracking_id: payment.tracking_id,
          payment_method: payment.payment_method,
          created_at: payment.created_at,
        },
      };

      res.status(200).json(response);
      return;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw new AppError('Failed to get payment status', 500);
    }
  });

  /**
   * Pesapal IPN/Webhook handler
   */
  handlePesapalIPN = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { OrderTrackingId, OrderMerchantReference, PaymentStatus, PaymentMethod } = req.query as { 
      OrderTrackingId?: string; 
      OrderMerchantReference?: string; 
      PaymentStatus?: string; 
      PaymentMethod?: string; 
    };

    if (!OrderTrackingId || !OrderMerchantReference) {
      throw new AppError('Missing required IPN parameters', 400);
    }

    try {
      // Get payment from database
      const payment = await db.getPaymentByTrackingId(OrderTrackingId as string);
      
      if (!payment) {
        console.warn(`Payment not found for tracking ID: ${OrderTrackingId}`);
        res.status(200).send('OK'); // Still acknowledge to Pesapal
        return;
      }

      // Verify with Pesapal to prevent spoofing
      const pesapalStatus = await pesapalService.getTransactionStatus(OrderTrackingId as string);
      
      // Update payment status
      const newStatus = pesapalStatus.status === 'COMPLETED' ? 'COMPLETED' : 
                      pesapalStatus.status === 'FAILED' ? 'FAILED' : 'PENDING';
      
      await db.updatePayment(payment.id, {
        status: newStatus,
        pesapal_status: pesapalStatus.status,
        payment_method: pesapalStatus.payment_method,
      });

      // If this is a donation and it's completed, trigger receipt email
        if (payment.type === 'DONATION' && newStatus === 'COMPLETED') {
          try {
            const donorEmail = payment.metadata?.donorEmail;
            const donorName = payment.metadata?.donorName || 'Donor';
            if (donorEmail) {
              const subject = `Donation receipt - ${payment.merchant_reference}`;
              const html = `<p>Dear ${donorName},</p><p>Thank you for your donation of ${payment.amount} ${payment.currency}. Your reference is ${payment.merchant_reference}.</p><p>Sincerely,<br/>EAO</p>`;
              const result = await sendEmail({ to: donorEmail, subject, html });
              console.log('Donation receipt send result:', result);
            } else {
              console.log('Donation completed but no donor email present; skipping receipt.');
            }
          } catch (err) {
            console.error('Failed to send donation receipt:', err);
          }
        }

      // If this is a shop order and it's completed, update order status
      if (payment.type === 'SHOP' && newStatus === 'COMPLETED') {
        await db.updateOrderByPaymentId(payment.id, {
          status: 'CONFIRMED',
        });
      }

      console.log(`IPN processed: ${OrderTrackingId} -> ${newStatus}`);
      
      // Respond with Pesapal's expected format
      res.status(200).send('OK');
      return;
    } catch (error) {
      console.error('Failed to handle Pesapal IPN:', error);
      // Still respond with 200 to avoid retries
      res.status(200).send('OK');
      return;
    }
  });
}
