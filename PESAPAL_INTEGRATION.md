# Pesapal Integration Guide

This document provides a comprehensive guide for integrating Pesapal payment gateway into the Educate an Orphan Uganda (EAO) website.

## Overview

Pesapal is a leading African payment gateway that supports multiple payment methods including:

- Mobile Money (MTN, Airtel, etc.)
- Credit/Debit Cards (Visa, Mastercard)
- Bank Transfers
- USSD

## Architecture

### Backend Components

1. **Pesapal Service** (`backend/src/services/pesapalService.ts`)
   - Handles OAuth authentication with Pesapal
   - Manages payment submission and status checking
   - Includes token caching and automatic refresh

2. **Payment Controller** (`backend/src/controllers/paymentController.ts`)
   - RESTful endpoints for donation and shop payments
   - IPN/webhook handler for payment notifications
   - Comprehensive error handling and validation

3. **Database Service** (`backend/src/services/database.ts`)
   - Abstraction layer for database operations
   - Handles payment, donation, and order records
   - Type-safe operations with Prisma

### Frontend Components

1. **Pesapal API Service** (`src/services/pesapalApi.ts`)
   - HTTP client for backend payment APIs
   - Payment status polling functionality
   - URL utilities for tracking IDs

2. **Donation Page** (`src/pages/donate/page.tsx`)
   - Complete donation form with Pesapal integration
   - Real-time impact messaging
   - Embedded Pesapal widget support

3. **Shop Page** (`src/pages/shop/page.tsx`)
   - E-commerce functionality with cart management
   - Product catalog and checkout flow
   - Pesapal payment integration

4. **Success Page** (`src/pages/donation/success.tsx`)
   - Payment status polling and confirmation
   - Receipt generation and display
   - Error handling and retry options

## Database Schema

### New Tables

#### `payments`

- Central payment table for both donations and shop orders
- Supports multiple payment types and statuses
- Stores Pesapal tracking IDs and metadata

#### `orders`

- E-commerce order management
- Links to payments table
- Stores customer info and order items

#### Updated `donations`

- Added foreign key to payments table
- Maintains backward compatibility with Flutterwave

## API Endpoints

### Payment Creation

- `POST /api/payments/donations/create` - Create donation payment
- `POST /api/payments/shop/create` - Create shop payment

### Payment Status

- `GET /api/payments/status?tracking_id=<id>` - Check payment status

### Webhooks

- `GET/POST /api/pesapal/ipn` - Pesapal IPN handler

## Environment Variables

### Required for Production

```bash
PESAPAL_CONSUMER_KEY="yVgqwwAzj+BI3r9EMhAYZSVy+vLrNSDM"
PESAPAL_CONSUMER_SECRET="b6+G9SITm1sWvwje1MZPj6tU8bc="
PESAPAL_ENV="production"
PESAPAL_WEBHOOK_SECRET="your-webhook-secret"
PESAPAL_IPN_ID="your-ipn-notification-id"
```

### Required for Development

```bash
PESAPAL_CONSUMER_KEY="your-sandbox-consumer-key"
PESAPAL_CONSUMER_SECRET="your-sandbox-consumer-secret"
PESAPAL_ENV="sandbox"
```

## Setup Instructions

### 1. Backend Setup

1. **Install Dependencies**

   ```bash
   npm install axios crypto
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in Pesapal credentials
   - Set `PESAPAL_ENV` to `sandbox` for testing

3. **Database Migration**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start Backend**

   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure API URL**
   - Update `VITE_API_URL` in `.env` if needed
   - Default: `http://localhost:3001`

3. **Start Frontend**

   ```bash
   npm run dev
   ```

## Testing

### Sandbox Testing

1. Use Pesapal sandbox credentials
2. Test with small amounts (UGX 100)
3. Verify webhook endpoint is accessible
4. Test payment flow end-to-end

### Production Deployment

1. Switch to production Pesapal credentials
2. Update webhook URLs in Pesapal dashboard
3. Set `PESAPAL_ENV=production`
4. Test with real payment methods

## Payment Flow

### Donation Flow

1. User fills donation form
2. Frontend calls `/api/payments/donations/create`
3. Backend creates payment record and submits to Pesapal
4. User redirected to Pesapal payment page
5. User completes payment
6. Pesapal sends IPN to backend
7. Backend updates payment status
8. User redirected to success page
9. Success page polls payment status
10. Final confirmation displayed

### Shop Flow

1. User adds items to cart
2. User proceeds to checkout
3. User fills customer information
4. Frontend calls `/api/payments/shop/create`
5. Same flow as donation from step 3

## Security Features

### Webhook Security

- HMAC signature verification
- Request validation
- Idempotency handling
- Rate limiting

### Data Protection

- PCI compliance through Pesapal
- Encrypted communication
- Secure token storage

## Error Handling

### Common Errors

1. **Invalid Credentials** - Check environment variables
2. **Network Timeout** - Implement retry logic
3. **Payment Failed** - User-friendly error messages
4. **Webhook Issues** - Logging and monitoring

### Monitoring

- Comprehensive error logging
- Payment status tracking
- Performance metrics
- Alert notifications

## Migration from Flutterwave

### Backward Compatibility

- Existing Flutterwave donations preserved
- Dual payment provider support
- Gradual migration strategy

### Data Migration

1. Export existing Flutterwave data
2. Transform to new payment schema
3. Import into payments table
4. Verify data integrity

## Performance Optimization

### Caching

- Pesapal token caching (4-minute expiry)
- Payment status caching
- Database query optimization

### Scalability

- Async processing for webhooks
- Database connection pooling
- Load balancing ready

## Support

### Documentation

- [Pesapal Developer Docs](https://developer.pesapal.com/)
- [API Reference](./docs/api.md)
- [Troubleshooting Guide](./docs/troubleshooting.md)

### Contact

- Technical Support: <tech@eao-uganda.org>
- Pesapal Support: <support@pesapal.com>

## Compliance

### Regulatory

- PCI DSS compliance through Pesapal
- Uganda Financial Regulations
- Data Protection Laws

### Audit Trail

- Complete payment logs
- IPN request/response tracking
- Error monitoring and alerting

## Future Enhancements

### Planned Features

1. **Subscription Payments** - Recurring donations
2. **Multi-currency Support** - USD, EUR support
3. **Advanced Analytics** - Payment insights
4. **Mobile App Integration** - React Native support

### Scalability Improvements

1. **Microservices Architecture** - Separate payment service
2. **Event Streaming** - Real-time updates
3. **Database Sharding** - Performance optimization

---

## Quick Start Checklist

- [ ] Pesapal sandbox account created
- [ ] Environment variables configured
- [ ] Database schema updated
- [ ] Backend services running
- [ ] Frontend integration complete
- [ ] Test payments successful
- [ ] Webhook endpoint verified
- [ ] Production deployment ready

For any issues or questions, refer to the troubleshooting guide or contact the technical support team.
