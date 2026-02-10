import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { ApiResponse, AuthenticatedRequest } from '../types/index.js';
import { pesapalService } from '../services/pesapalService.js';
import { DatabaseService } from '../services/database.js';

const db = new DatabaseService();

export class PaymentController {
  /**
   * Create donation payment
   */
  createDonationPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { amount, donorName, donorEmail, donorPhone, message, currency = 'UGX' } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      throw new AppError('Valid donation amount is required', 400);
    }

    // Generate unique references
    const merchantReference = pesapalService.generateReference();
    
    try {
      // Create payment record
      const payment = await db.createPayment({
        type: 'DONATION',
        merchant_reference: merchantReference,
        amount: Number(amount),
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

      // Create donation record
      const donation = await db.createDonation({
        payment_id: payment.id,
        donor_name: donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone,
        message,
        amount: Number(amount),
        currency,
      });

      // Submit to Pesapal
      const pesapalResponse = await pesapalService.submitPayment({
        amount: Number(amount),
        currency,
        email: donorEmail || 'donor@eao-uganda.org',
        phone_number: donorPhone,
        first_name: donorName?.split(' ')[0] || 'Anonymous',
        last_name: donorName?.split(' ').slice(1).join(' ') || 'Donor',
        callback_url: `${process.env.APP_BASE_URL}/api/pesapal/ipn`,
        redirect_url: `${process.env.APP_BASE_URL}/donation/success?tracking_id={{order_tracking_id}}`,
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
    } catch (error) {
      console.error('Failed to create donation payment:', error);
      throw new AppError('Failed to create donation payment', 500);
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
        amount: Number(totalAmount),
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
        total_amount: Number(totalAmount),
        currency,
        customer_info: customerInfo,
        order_items: cartItems,
      });

      // Submit to Pesapal
      const pesapalResponse = await pesapalService.submitPayment({
        amount: Number(totalAmount),
        currency,
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        callback_url: `${process.env.APP_BASE_URL}/api/pesapal/ipn`,
        redirect_url: `${process.env.APP_BASE_URL}/shop/success?tracking_id={{order_tracking_id}}`,
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
    } catch (error) {
      console.error('Failed to create shop payment:', error);
      throw new AppError('Failed to create shop payment', 500);
    }
  });

  /**
   * Get payment status
   */
  getPaymentStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { tracking_id } = req.query;

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
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw new AppError('Failed to get payment status', 500);
    }
  });

  /**
   * Pesapal IPN/Webhook handler
   */
  handlePesapalIPN = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { OrderTrackingId, OrderMerchantReference, PaymentStatus, PaymentMethod } = req.query;

    if (!OrderTrackingId || !OrderMerchantReference) {
      throw new AppError('Missing required IPN parameters', 400);
    }

    try {
      // Get payment from database
      const payment = await db.getPaymentByTrackingId(OrderTrackingId as string);
      
      if (!payment) {
        console.warn(`Payment not found for tracking ID: ${OrderTrackingId}`);
        return res.status(200).send('OK'); // Still acknowledge to Pesapal
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

      // If this is a donation and it's completed, you could trigger receipt email here
      if (payment.type === 'DONATION' && newStatus === 'COMPLETED') {
        // TODO: Send receipt email
        console.log(`Donation completed: ${payment.merchant_reference}`);
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
    } catch (error) {
      console.error('Failed to handle Pesapal IPN:', error);
      // Still respond with 200 to avoid retries
      res.status(200).send('OK');
    }
  });
}
