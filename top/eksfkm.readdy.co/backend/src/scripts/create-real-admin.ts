import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Minimal user type
type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// ✅ Admin client (service role)
const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

// ✅ Auth client (for login testing)
const supabaseAuth: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

async function createRealAdmin() {
  console.log('🔧 Creating real admin user...');

  try {
    console.log('📡 Testing database connection...');
    const { error: testError } = await supabaseAdmin
      .from('programs')
      .select('count')
      .limit(1);

    if (testError) {
      console.log('❌ Database connection error:', testError.message);
      console.log('⚠️ Tables may not exist yet. Running setup trigger...');

      try {
        const setupResponse = await fetch(
          'http://localhost:3001/api/admin/dashboard/stats'
        );

        if (!setupResponse.ok) {
          console.log('⚠️ Backend may not be running or has issues');
        }
      } catch {
        console.log('⚠️ Could not reach backend setup endpoint');
      }
    } else {
      console.log('✅ Database connection successful');
    }

    console.log('👤 Creating admin user...');

    // ✅ Fix: cast admin
    const { data: authData, error: authError } = await (supabaseAdmin.auth as any).admin.createUser({
      email: 'admin@eao.ug',
      password: 'Admin123456!',
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        name: 'EAO Admin',
        department: 'administration',
      },
    });

    let adminId: string;

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('ℹ️ Admin user already exists, fetching...');

        const { data: usersData, error: listUsersError } =
          await (supabaseAdmin.auth as any).admin.listUsers();

        if (listUsersError) {
          throw new Error(`Failed to list users: ${listUsersError.message}`);
        }

        const adminUser = usersData?.users?.find(
          (u: SupabaseUser) => u.email === 'admin@eao.ug'
        );

        if (adminUser) {
          adminId = adminUser.id;
          console.log('✅ Found existing admin user');
        } else {
          throw new Error('Admin user exists but not found');
        }
      } else {
        throw authError;
      }
    } else {
      if (!authData?.user) {
        throw new Error('Admin creation returned no user');
      }

      adminId = authData.user.id;
      console.log('✅ Created new admin user');
    }

    console.log('📝 Updating admin profile...');

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: adminId,
          email: 'admin@eao.ug',
          role: 'admin',
          name: 'EAO Admin',
          department: 'administration',
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (profileError) {
      console.log('⚠️ Profile update error:', profileError.message);
    } else {
      console.log('✅ Admin profile updated');
    }

    console.log('\n🎉 ADMIN SETUP COMPLETE!');
    console.log('========================');
    console.log('📧 Email: admin@eao.ug');
    console.log('🔐 Password: Admin123456!');
    console.log('🌐 Login URL: http://localhost:5173/admin/login');

    // ✅ Login test using anon client
    console.log('\n🧪 Testing admin login...');

    const { data: loginData, error: loginError } =
      await (supabaseAuth.auth as any).signInWithPassword({
        email: 'admin@eao.ug',
        password: 'Admin123456!',
      });

    if (loginError) {
      console.log('❌ Login test failed:', loginError.message);
    } else {
      console.log('✅ Login test successful');
      console.log('👤 User:', loginData.user?.email);
      console.log('🔑 Role:', loginData.user?.user_metadata?.role);

      // ✅ Fix signOut typing
      await (supabaseAuth.auth as any).signOut();
    }
  } catch (error) {
    console.error('❌ Setup failed:', error);

    if (error instanceof Error) {
      console.log('\n🔧 Troubleshooting:');

      if (error.message.includes('fetch')) {
        console.log('- Check backend is running on port 3001');
      }

      if (error.message.includes('database')) {
        console.log('- Ensure tables are created');
      }
    }
  }
}

createRealAdmin()
  .then(() => {
    console.log('\n✨ Setup process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });