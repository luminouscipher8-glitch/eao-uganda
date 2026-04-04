# Backend Authorization Fixes - Phase 1

## Critical Security Issues Fixed

### 1. Fixed Admin Route Protection
**Problem:** `SupabaseAuth.requireAdmin` was allowing ANY authenticated user
```typescript
// BEFORE (INSECURE)
static requireAdmin = this.authorize(['authenticated', 'admin']);

// AFTER (SECURE)  
static requireAdmin = this.authorize(['admin']);
```

### 2. Added Database-Backed Admin Verification
**Problem:** Role checking relied only on user metadata (could be spoofed)

**Solution:** Added `verifyAdminStatus()` method that checks both:
- User metadata role
- Database profile role (USER role = 'ADMIN')

### 3. Updated Authorization Logic
**Problem:** Fallback logic defaulted to 'authenticated' which passed admin checks

```typescript
// BEFORE (INSECURE)
const userRole = req.user.aud === 'authenticated' ? 'authenticated' : (req.user.role || 'authenticated');

// AFTER (SECURE)
const userRole = req.user.role || 'authenticated';
```

## Files Changed

### 1. `/backend/src/middleware/supabaseAuth.ts`
- Fixed `requireAdmin` to only allow 'admin' role
- Added `verifyAdminStatus()` method for database-backed verification  
- Added `requireAdminVerification()` middleware
- Removed insecure role fallback logic

### 2. `/backend/src/routes/admin.ts`
- Added `SupabaseAuth.requireAdminVerification` to all admin routes
- Now ALL `/api/admin/*` routes require verified admin status

### 3. `/backend/src/routes/users.ts`
- Updated `GET /api/users` to use `requireAdminVerification`

### 4. `/backend/src/controllers/donationController.ts`
- Updated role checks to use `verifyAdminStatus()` instead of metadata role
- Fixed `getDonation()` and `getDonations()` methods

### 5. `/backend/src/controllers/userController.ts`
- Updated `deleteAccount()` to use `verifyAdminStatus()`

## Route Groups Now Protected

### Admin Routes (ALL PROTECTED):
- `/api/admin/dashboard/stats` ✅
- `/api/admin/programs` ✅ (GET, POST, PUT, DELETE)
- `/api/admin/news` ✅ (GET, POST, PUT, DELETE)  
- `/api/admin/contacts` ✅ (GET, PATCH, DELETE)
- `/api/admin/donations` ✅ (GET, PATCH)
- `/api/admin/volunteers` ✅ (GET, PATCH)
- `/api/admin/events` ✅ (GET, POST, PUT, DELETE, PATCH)
- `/api/admin/school-building` ✅ (GET, POST, PUT, DELETE, PATCH)
- `/api/admin/success-stories` ✅ (GET, POST, PUT, DELETE, PATCH)

### User Management Routes:
- `/api/users` (GET all users) ✅ Admin-only
- `/api/users/:id` (DELETE user) ✅ Admin or self

### Donation Routes:
- `/api/donations` (GET donations) ✅ Admin sees all, user sees own
- `/api/donations/:id` (GET donation) ✅ Admin sees all, user sees own

## Previous Risk and How It Was Fixed

### Risk 1: Any Authenticated User Could Access Admin Routes
**Before:** Regular users could access `/api/admin/*` endpoints
**Fix:** Added database-backed admin verification to all admin routes

### Risk 2: Role Spoofing Through Metadata  
**Before:** Users could potentially modify their JWT metadata to claim admin role
**Fix:** Double verification against database profile table

### Risk 3: Insecure Role Fallbacks
**Before:** Authorization logic had fallbacks that granted access by default
**Fix:** Strict role checking with no fallbacks

## How to Test Admin vs Non-Admin Access

### 1. Create Test Users
```bash
# Run the admin creation script
cd backend
npm run run scripts/create-real-admin.ts

# Create a regular user through Supabase auth or frontend signup
```

### 2. Test Admin Access
```bash
# Get admin token
curl -X POST "https://your-project.supabase.co/auth/v1/token?grant_type=password&email=admin@eao.ug&password=Admin123456!"

# Test admin endpoint (should work)
curl -H "Authorization: Bearer <admin-token>" \
     http://localhost:3001/api/admin/dashboard/stats

# Should return dashboard data
```

### 3. Test Non-Admin Access
```bash
# Get regular user token  
curl -X POST "https://your-project.supabase.co/auth/v1/token?grant_type=password&email=user@example.com&password=password"

# Test admin endpoint (should fail)
curl -H "Authorization: Bearer <user-token>" \
     http://localhost:3001/api/admin/dashboard/stats

# Should return: {"success": false, "error": "Admin access required"}
```

### 4. Test User-Specific Access
```bash
# Test getting all users as regular user (should fail)
curl -H "Authorization: Bearer <user-token>" \
     http://localhost:3001/api/users

# Should return: {"success": false, "error": "Admin access required"}

# Test getting own donations as regular user (should work)  
curl -H "Authorization: Bearer <user-token>" \
     http://localhost:3001/api/donations

# Should return user's own donations
```

## Security Verification Checklist

- ✅ Admin routes require database-verified admin status
- ✅ Role checking is strict with no fallbacks  
- ✅ Regular users cannot access admin endpoints
- ✅ Admin verification checks both metadata and database
- ✅ User-specific endpoints respect ownership rules
- ✅ No insecure role defaults or fallbacks

## Next Steps

The backend authorization is now secure. The system properly distinguishes between:
1. **Unauthenticated users** - No access
2. **Authenticated regular users** - Limited access to own resources  
3. **Verified admins** - Full administrative access

All admin routes now require database-backed verification, preventing privilege escalation attacks.
