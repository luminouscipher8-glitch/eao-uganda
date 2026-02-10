# Supabase Setup for EAO Admin Dashboard

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up/login to your account
4. Click "New Project"
5. Choose organization or create new one
6. Enter project details:
   - **Project Name**: `eao-admin`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest region to your users
7. Click "Create new project"
8. Wait for project to be created (2-3 minutes)

## Step 2: Get Project Credentials

Once project is created, you'll see your project dashboard:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like `https://xxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Environment Variables

Create or update your `.env.local` file in the project root:

```bash
# Admin API Configuration
VITE_API_URL=http://localhost:3001

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Create Admin User Table

1. Go to **Table Editor** in Supabase dashboard
2. Click **Create a new table**
3. Create a `profiles` table with these columns:
   - `id` (uuid, primary key, default: uuid_generate_v4())
   - `email` (text, unique)
   - `role` (text, default: 'user')
   - `name` (text, optional)
   - `created_at` (timestamp, default: now())
   - `updated_at` (timestamp, default: now())

4. Click **Save**

## Step 5: Set Up Row Level Security (RLS)

1. Go to **Authentication** → **Policies**
2. Click **Enable RLS** on the `profiles` table
3. Create a new policy for `profiles` table:
   - **Policy name**: "Users can view own profile"
   - **Allowed operation**: SELECT
   - **Policy definition**: `auth.uid() = id`
4. Create another policy:
   - **Policy name**: "Users can update own profile"
   - **Allowed operation**: UPDATE
   - **Policy definition**: `auth.uid() = id`

## Step 6: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Create admin user:
   - **Email**: `admin@eao.ug` (or your preferred admin email)
   - **Password**: Create a strong password
   - **Auto-confirm**: Check this box
4. Click **Save**

5. After user is created, go to **Table Editor** → **profiles**
6. Find the admin user's ID and update their role:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'admin@eao.ug';
   ```

## Step 7: Test the Setup

1. Restart your development servers:
   ```bash
   # Stop current servers (Ctrl+C)
   # Restart frontend
   npm run dev
   # Restart backend (in another terminal)
   cd backend && npm run dev
   ```

2. Visit `http://localhost:5173/admin/login`
3. Enter your admin credentials:
   - **Email**: `admin@eao.ug`
   - **Password**: The password you created

4. You should be successfully logged in and redirected to the admin dashboard!

## Step 8: Configure Production (Optional)

For production deployment:

1. Update your production environment variables:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-production-anon-key
   ```

2. Update CORS in backend:
   ```bash
   # In backend/.env
   ALLOWED_ORIGINS=https://your-production-domain.com
   ```

## Security Notes

- **Never commit** `.env.local` to version control
- **Use strong passwords** for admin accounts
- **Enable 2FA** on your Supabase account
- **Regularly rotate** your anon keys if compromised
- **Use environment variables** for all sensitive data

## Troubleshooting

### "Supabase not configured" Error
- Check that `.env.local` exists in project root
- Verify environment variables are spelled correctly
- Restart development servers after changes

### "Access denied. Admin privileges required" Error
- Check that user has `role = 'admin' in profiles table
- Verify RLS policies allow admin access
- Clear browser cache and try again

### "Invalid supabaseUrl" Error
- Ensure URL starts with `https://`
- Check for typos in the URL
- Verify project is active in Supabase dashboard

### API Connection Issues
- Check that backend is running on port 3001
- Verify CORS settings include your frontend URL
- Check network connectivity to Supabase

## Next Steps

Once authentication is working:
1. ✅ Admin login and dashboard access
2. ✅ Protected admin routes
3. ✅ Real API integration
4. 🔄 **Phase 3**: Content Management Forms
5. 🔄 **Phase 4**: Real Database Integration

---

**Need help?** Check the Supabase documentation at [https://supabase.com/docs](https://supabase.com/docs) or review the authentication code in `src/contexts/AuthContext.tsx`.
