import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ✅ ENV
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// ✅ Clients
const supabaseAuth: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const supabaseAdmin: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

// ✅ Minimal user type
type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
};

async function testWithRealToken() {
  try {
    console.log('🔐 Logging in to get real token...');

    // ✅ Login (anon client)
    const { data, error } = await (supabaseAuth.auth as any).signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!',
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      return;
    }

    const user = data?.user as SupabaseUser;
    const token = data?.session?.access_token;

    if (!user || !token) {
      console.error('❌ Missing user or token');
      return;
    }

    console.log('✅ Login successful!');
    console.log('👤 User:', user.email);

    // 🔐 SECURE ROLE FIX (SERVICE ROLE)
    console.log('🔧 Ensuring admin role (secure)...');

    await (supabaseAdmin.auth as any).admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        role: 'admin',
      },
    });

    console.log('✅ Auth metadata role ensured');

    // ✅ ALSO enforce in DB (REAL SOURCE OF TRUTH)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          role: 'admin',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (profileError) {
      console.log('⚠️ Profile update error:', profileError.message);
    } else {
      console.log('✅ DB role updated (source of truth)');
    }

    // 🎯 Token preview
    console.log('🎯 Token:', token.substring(0, 50) + '...');

    // 🚀 API TEST
    console.log('🌐 Testing protected API...');

    const response = await fetch(
      'http://localhost:3001/api/admin/dashboard/stats',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const apiData = await response.json();

    console.log('📊 API Status:', response.status);
    console.log('📊 API Response:', apiData);

    // ✅ Logout
    await (supabaseAuth.auth as any).signOut();

    console.log('👋 Logged out');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error:', message);
  }
}

testWithRealToken();