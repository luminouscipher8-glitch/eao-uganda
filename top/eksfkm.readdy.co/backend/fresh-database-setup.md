# Fresh Database Setup Guide

## 🚨 Current Issue
"Tenant or user not found" error suggests database credentials are incorrect.

## 🔧 Step-by-Step Solution

### Step 1: Verify Project Details
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check if project `rogxpucnkqwbeohpkolj` exists
3. If not, create a new project
4. Note the exact project ID and password

### Step 2: Reset Database Password
1. In Supabase Dashboard → Settings → Database
2. Click "Reset Database Password"
3. Create a new strong password
4. Copy the new connection string

### Step 3: Update .env File
Replace the DATABASE_URL with the new connection string:

```bash
# Option A: Direct connection
DATABASE_URL="postgresql://postgres.rogxpucnkqwbeohpkolj:NEW_PASSWORD@aws-0-ap-southeast-1.supabase.co:5432/postgres"

# Option B: Pooler connection  
DATABASE_URL="postgresql://postgres.rogxpucnkqwbeohpkolj:NEW_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

### Step 4: Test Connection
```bash
cd backend
node test-db-connection.js
```

### Step 5: Run Migration
```bash
npx prisma db push
```

## 🆘 Alternative: Create New Project
If the above doesn't work:

1. Create a completely new Supabase project
2. Update all environment variables:
   - DATABASE_URL
   - SUPABASE_URL  
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - SUPABASE_JWT_SECRET

3. Run fresh setup

## 📞 Common Issues & Solutions

| Issue | Solution |
|--------|----------|
| Wrong project ID | Double-check dashboard URL |
| Password expired | Reset in Supabase settings |
| Network blocked | Try VPN or different network |
| Project suspended | Check billing status |

## ✅ Success Indicators
- `node test-db-connection.js` shows "✅ Database connected successfully!"
- `npx prisma db push` creates tables without errors
- Backend starts without database connection errors
