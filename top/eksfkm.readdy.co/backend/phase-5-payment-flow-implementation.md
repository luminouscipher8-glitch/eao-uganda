# Phase 5: Fixed Pesapal Payment Flow End to End

## 1. Corrected Payment Flow Diagram

```
Frontend Donation Form
         ↓
   POST /api/donations
         ↓
   Payment Controller
   ┌─────────────────┐
   │ Validation      │
   │ - Amount > 0   │
   │ - Reject recurring│
   └─────────────────┘
         ↓
   Database Records
   ┌─────────────────┐
   │ Create Payment │
   │ Status: PENDING│
   │ Create Donation │
   └─────────────────┘
         ↓
   Pesapal API
   ┌─────────────────┐
   │ Submit Payment │
   │ Get Tracking ID│
   │ Get Redirect URL│
   └─────────────────┘
         ↓
   Update Payment
   ┌─────────────────┐
   │ Add Tracking ID│
   └─────────────────┘
         ↓
   Response to Frontend
   ┌─────────────────┐
   │ redirect_url    │
   │ tracking_id     │
   │ merchant_reference│
   └─────────────────┘
         ↓
   User Redirects to Pesapal
         ↓
   Pesapal Payment Processing
         ↓
   Pesapal IPN Callback
   POST/GET /api/donations/webhook
         ↓
   IPN Handler
   ┌─────────────────┐
   │ Verify with Pesapal│
   │ Update Status   │
   │ COMPLETED/FAILED│
   │ Update Donation │
   │ TODO: Email receipt│
   └─────────────────┘
         ↓
   User Redirected to Frontend
   /donation/success?tracking_id=xxx
         ↓
   Frontend Status Check
   GET /api/donations/status?tracking_id=xxx
         ↓
   Status Response
   ┌─────────────────┐
   │ COMPLETED/FAILED│
   │ PENDING         │
   │ Payment details │
   └─────────────────┘
```

## 2. Files Changed

### Major Updates

1. **`backend/src/routes/donations.ts`** - Complete rewrite to use Pesapal PaymentController
   - Replaced Flutterwave integration with Pesapal
   - Added proper validation for frontend form fields
   - Added status check endpoint
   - Added IPN webhook endpoints (GET/POST)
   - Removed authentication requirement for public donations

2. **`backend/src/controllers/paymentController.ts`** - Fixed callback URLs and validation
   - Fixed callback URL: `/api/donations/webhook` (was `/api/pesapal/ipn`)
   - Fixed redirect URLs to point to frontend
   - Added recurring donation rejection with clear message
   - Updated email receipt comments to reflect not implemented status
   - Added environment variable fallbacks

### Route Registration Updates

- **`backend/src/index.ts`** - No changes needed (routes already registered)

## 3. Exact Route Paths Now in Use

### Donation Payment Flow

- **POST** `/api/donations` - Create donation payment
- **GET** `/api/donations/status?tracking_id=xxx` - Check payment status
- **POST** `/api/donations/webhook` - Pesapal IPN webhook (POST)
- **GET** `/api/donations/webhook` - Pesapal IPN webhook (GET support)

### Shop Payment Flow (if implemented)

- **POST** `/api/payments/shop/create` - Create shop payment
- **GET** `/api/payments/status?tracking_id=xxx` - Check payment status
- **POST** `/api/payments/pesapal/ipn` - Pesapal IPN webhook
- **GET** `/api/payments/pesapal/ipn` - Pesapal IPN webhook support

### Frontend Redirect URLs

- **Donation Success**: `${FRONTEND_URL}/donation/success?tracking_id={{order_tracking_id}}`
- **Shop Success**: `${FRONTEND_URL}/shop/success?tracking_id={{order_tracking_id}}`

### Backend Callback URLs

- **Donation IPN**: `${APP_BASE_URL}/api/donations/webhook`
- **Shop IPN**: `${APP_BASE_URL}/api/donations/webhook`

## 4. Test Steps for Payment Scenarios

### Prerequisites

1. Set environment variables:
   - `PESAPAL_CONSUMER_KEY` and `PESAPAL_CONSUMER_SECRET`
   - `PESAPAL_ENV` (sandbox or production)
   - `APP_BASE_URL` (e.g., `http://localhost:3001`)
   - `FRONTEND_URL` (e.g., `http://localhost:5173`)
2. Ensure database tables exist: `payments`, `donations`
3. Have Pesapal sandbox credentials for testing

### Test 1: Successful Payment Flow

#### Step 1: Create Donation Payment

```bash
curl -X POST http://localhost:3001/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "UGX",
    "donorName": "John Doe",
    "donorEmail": "john@example.com",
    "donorPhone": "+256123456789",
    "message": "Test donation for education"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "redirect_url": "https://cybqa.pesapal.com/...",
    "tracking_id": "PESAPAL_TRACKING_ID",
    "merchant_reference": "EOU-1234567890-ABCDEF"
  }
}
```

#### Step 2: Manual Payment in Pesapal

1. Copy the `redirect_url` from response
2. Open in browser
3. Complete payment using Pesapal sandbox test credentials
4. Note the tracking ID from the final redirect URL

#### Step 3: Check Payment Status

```bash
curl -X GET "http://localhost:3001/api/donations/status?tracking_id=PESAPAL_TRACKING_ID"
```

**Expected Response (COMPLETED):**

```json
{
  "success": true,
  "data": {
    "status": "COMPLETED",
    "amount": 5000,
    "currency": "UGX",
    "type": "DONATION",
    "merchant_reference": "EOU-1234567890-ABCDEF",
    "tracking_id": "PESAPAL_TRACKING_ID",
    "payment_method": "CARD",
    "created_at": "2024-03-07T15:30:00Z"
  }
}
```

#### Step 4: Verify Database Records

```sql
SELECT * FROM payments WHERE merchant_reference = 'EOU-1234567890-ABCDEF';
SELECT * FROM donations WHERE payment_id = (SELECT id FROM payments WHERE merchant_reference = 'EOU-1234567890-ABCDEF');
```

**Expected:** Both records should have status = 'COMPLETED'

### Test 2: Failed Payment Flow

#### Step 1: Create Donation Payment (same as Test 1)

#### Step 2: Simulate Failed Payment

1. Start payment process but cancel/abandon in Pesapal
2. Or use test card that will be declined

#### Step 3: Check Payment Status

```bash
curl -X GET "http://localhost:3001/api/donations/status?tracking_id=PESAPAL_TRACKING_ID"
```

**Expected Response (FAILED):**

```json
{
  "success": true,
  "data": {
    "status": "FAILED",
    "amount": 5000,
    "currency": "UGX",
    "type": "DONATION",
    "merchant_reference": "EOU-1234567890-ABCDEF",
    "tracking_id": "PESAPAL_TRACKING_ID",
    "payment_method": null,
    "created_at": "2024-03-07T15:30:00Z"
  }
}
```

#### Step 4: Verify Database Records

**Expected:** Both records should have status = 'FAILED'

### Test 3: Pending Payment Flow

#### Step 1: Create Donation Payment (same as Test 1)

#### Step 2: Check Status Immediately

```bash
curl -X GET "http://localhost:3001/api/donations/status?tracking_id=PESAPAL_TRACKING_ID"
```

**Expected Response (PENDING):**

```json
{
  "success": true,
  "data": {
    "status": "PENDING",
    "amount": 5000,
    "currency": "UGX",
    "type": "DONATION",
    "merchant_reference": "EOU-1234567890-ABCDEF",
    "tracking_id": "PESAPAL_TRACKING_ID",
    "payment_method": null,
    "created_at": "2024-03-07T15:30:00Z"
  }
}
```

#### Step 3: Verify Database Records

**Expected:** Both records should have status = 'PENDING'

### Test 4: IPN Webhook Testing

#### Step 1: Simulate Pesapal IPN Call

```bash
curl -X POST "http://localhost:3001/api/donations/webhook?OrderTrackingId=PESAPAL_TRACKING_ID&OrderMerchantReference=EOU-1234567890-ABCDEF&PaymentStatus=COMPLETED&PaymentMethod=CARD"
```

**Expected Response:** `OK`

#### Step 2: Verify Status Update

```bash
curl -X GET "http://localhost:3001/api/donations/status?tracking_id=PESAPAL_TRACKING_ID"
```

**Expected:** Status should be updated to 'COMPLETED'

### Test 5: Validation Error Testing

#### Test Invalid Amount

```bash
curl -X POST http://localhost:3001/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "amount": -100,
    "currency": "UGX"
  }'
```

**Expected Response:**

```json
{
  "success": false,
  "error": "Valid donation amount is required"
}
```

#### Test Recurring Donation (Should Be Rejected)

```bash
curl -X POST http://localhost:3001/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "UGX",
    "isRecurring": true
  }'
```

**Expected Response:**

```json
{
  "success": false,
  "error": "Recurring donations are not currently supported. Please make a one-time donation."
}
```

### Test 6: Missing Tracking ID

```bash
curl -X GET "http://localhost:3001/api/donations/status"
```

**Expected Response:**

```json
{
  "success": false,
  "error": "Tracking ID is required"
}
```

### Test 7: Shop Payment Flow (If Shop Exists)

#### Create Shop Payment

```bash
curl -X POST http://localhost:3001/api/payments/shop/create \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [
      {
        "name": "EAO T-Shirt",
        "price": 25000,
        "quantity": 2
      }
    ],
    "totalAmount": 50000,
    "customerInfo": {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "+256987654321"
    }
  }'
```

## 5. Environment Variables Required

```bash
# Pesapal Configuration
PESAPAL_CONSUMER_KEY=your_consumer_key
PESAPAL_CONSUMER_SECRET=your_consumer_secret
PESAPAL_ENV=sandbox  # or production

# Application URLs
APP_BASE_URL=http://localhost:3001  # Backend URL for callbacks
FRONTEND_URL=http://localhost:5173   # Frontend URL for redirects

# Optional: Webhook Secret (if implementing signature verification)
PESAPAL_WEBHOOK_SECRET=your_webhook_secret
```

## 6. Production Readiness Checklist

### ✅ Implemented

- Real Pesapal integration (no fake success)
- Proper error handling and validation
- Consistent route paths across frontend/backend
- Honest status handling (COMPLETED/FAILED/PENDING)
- Recurring donation rejection with clear message
- No false claims about email receipts

### 🔄 Ready for Production

- Database migrations for payments/donations tables
- Environment variables configuration
- Pesapal production credentials

### ❌ Not Implemented

- Email receipt sending (clearly marked as TODO)
- Recurring donations (properly rejected)
- Shop payment frontend (backend ready)

## 7. Security Considerations

1. **IPN Verification**: IPN handler verifies payment status with Pesapal to prevent spoofing
2. **Input Validation**: All inputs validated with express-validator
3. **Error Handling**: No sensitive information leaked in error messages
4. **Environment Variables**: Sensitive credentials stored in environment variables
5. **Rate Limiting**: Applied globally to prevent abuse

The payment flow is now production-ready with real Pesapal integration, proper error handling, and honest status reporting.
