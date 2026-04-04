import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ✅ Minimal user type (only what you need)
type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
  created_at?: string;
};

// ⚠️ Use ENV in real projects
const SUPABASE_URL = 'https://merrqcqxvqvwfuohlxbs.supabase.co';

// ✅ anon client (for login testing)
const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY!
);

// ✅ service role client (for admin actions)
const supabaseAdmin: SupabaseClient = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAdmin() {
  try {
    const adminEmails = [
      'admin@eao.ug',
      'admin@eksfkm.readdy.co',
      'test@admin.com',
      'admin@test.com'
    ];

    for (const email of adminEmails) {
      console.log(`🔍 Checking ${email}...`);

      try {
        const { data, error } = await (supabase.auth as any).signInWithPassword({
          email,
          password: 'Admin123456!',
        });

        if (error) {
          console.log(`❌ ${email} failed: ${error.message}`);
          continue;
        }

        if (data?.user) {
          const user = data.user as SupabaseUser;

          console.log(`✅ Found admin user: ${email}`);
          console.log('User data:', {
            id: user.id,
            email: user.email,
            role: user.user_metadata?.role,
            created_at: user.created_at,
          });
          return;
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.log(`❌ ${email} failed: ${message}`);
      }
    }

    console.log('❌ No admin user found with common credentials');

    try {
      const { data, error } = await (supabaseAdmin.auth as any).admin.listUsers();

      if (error) {
        console.log(`❌ Cannot list users: ${error.message}`);
        return;
      }

      if (data?.users) {
        console.log('📋 All users:');

        data.users.forEach((user: SupabaseUser) => {
          console.log(
            `  - ${user.email} (role: ${
              user.user_metadata?.role || 'none'
            })`
          );
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.log(
        `❌ Cannot list users (need service role key): ${message}`
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error:', message);
  }
}

checkAdmin();