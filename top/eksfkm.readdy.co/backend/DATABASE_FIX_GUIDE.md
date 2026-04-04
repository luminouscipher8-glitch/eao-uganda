# Database Connection Fix Guide

## Current Issue
The database connection is failing with DNS resolution error:
```
ENOTFOUND db.https://merrqcqxvqvwfuohlxbs.supabase.co
```

## Steps to Fix:

### 1. Get Correct Database URL from Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings > Database**
4. Scroll down to **Connection string**
5. Copy the **URI** (it should look like):
   ```
   postgresql://[user]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```

### 2. Update Your .env File
Replace the current DATABASE_URL in `backend/.env`:
```bash
# OLD (broken)
DATABASE_URL="postgresql://luminouscipher8-glitch:7WpezfT3rWLHuVBN@db.https://merrqcqxvqvwfuohlxbs.supabase.co:5432/postgres"

# NEW (get from Supabase dashboard)
DATABASE_URL="postgresql://[user]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

### 3. Test Connection Again
```bash
cd backend
node test-db-connection.js
```

### 4. Run Prisma Migration
```bash
npx prisma db push
```

## Alternative Solutions:

### If Supabase Project is Suspended:
1. Reactivate your Supabase project
2. Check billing status
3. Ensure database is not paused

### If Network Issues:
1. Try using a VPN
2. Check firewall settings
3. Test with mobile hotspot

### Create New Supabase Project:
If the project is permanently lost:
1. Create new Supabase project
2. Update all environment variables
3. Run fresh database setup

## Verification Commands:
```bash
# Test database connection
node test-db-connection.js

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

## Common Supabase Hostnames:
- Pooler: `aws-0-ap-southeast-1.pooler.supabase.com:6543`
- Direct: `aws-0-ap-southeast-1.supabase.co:5432`
- Regional: `db.REGION.supabase.co:5432`

## Next Steps After Fix:
1. ✅ Database connection working
2. ✅ Prisma schema pushed
3. ✅ Pesapal integration ready
4. ✅ Test payment flows
