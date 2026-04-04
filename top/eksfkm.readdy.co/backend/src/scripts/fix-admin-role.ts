import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ✅ ENV variables (use dotenv in your real project)
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

// ✅ Clients
const supabaseAdmin: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const supabaseAuth: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function fixAdminRole() {
  try {
    console.log('🔧 Fixing admin role for admin@eao.ug...');

    // ✅ Find the admin user via service role client
    const { data: usersData, error: listError } = await (supabaseAdmin.auth as any).admin.listUsers();

    if (listError) throw listError;

    const adminUser = usersData?.users?.find((u: any) => u.email === 'admin@eao.ug');

    if (!adminUser) {
      console.error('❌ Admin user not found');
      return;
    }

    console.log('✅ Admin user found:', adminUser.email);

    // ✅ Update metadata securely via service-role client
    const { data: updateData, error: updateError } = await (supabaseAdmin.auth as any).admin.updateUserById(adminUser.id, {
      user_metadata: {
        ...adminUser.user_metadata,
        role: 'admin',
        name: 'EAO Admin',
      },
    });

    if (updateError) {
      console.error('❌ Failed to update admin role:', updateError.message);
      return;
    }

    console.log('✅ Admin role updated successfully!');
    console.log('Updated user:', updateData);

    // Optional: Test login as user (via anon client)
    const { data: signInData, error: signInError } = await (supabaseAuth.auth as any).signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!',
    });

    if (signInError) {
      console.warn('⚠️ Could not sign in as admin for testing:', signInError.message);
    } else {
      console.log('✅ Admin login test successful:', signInData.user?.email);

      // Sign out
      await (supabaseAuth.auth as any).signOut();
      console.log('🔐 Signed out after test');
    }

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error:', message);
  }
}

fixAdminRole();