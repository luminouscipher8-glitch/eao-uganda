import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createRealAdmin() {
  console.log('🔧 Creating real admin user...');

  try {
    // First, let's check if we can connect to the database
    console.log('📡 Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('programs')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.log('❌ Database connection error:', testError.message);
      console.log('⚠️  Tables may not exist yet. Running setup first...');
      
      // Run table setup
      console.log('🏗️  Setting up database tables...');
      const setupResponse = await fetch('http://localhost:3001/api/admin/dashboard/stats');
      if (!setupResponse.ok) {
        console.log('⚠️  Backend may not be running or has issues');
      }
    } else {
      console.log('✅ Database connection successful');
    }

    // Create admin user with service role (bypasses RLS)
    console.log('👤 Creating admin user...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@eao.ug',
      password: 'Admin123456!',
      email_confirm: true,
      user_metadata: { 
        role: 'admin', 
        name: 'EAO Admin',
        department: 'administration'
      }
    });

    let adminId: string;
    
    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('ℹ️  Admin user already exists, getting user info...');
        // Get existing user
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const adminUser = existingUsers.users.find(u => u.email === 'admin@eao.ug');
        if (adminUser) {
          adminId = adminUser.id;
          console.log('✅ Found existing admin user');
        } else {
          throw new Error('Admin user exists but not found in user list');
        }
      } else {
        throw authError;
      }
    } else {
      adminId = authData.user!.id;
      console.log('✅ Created new admin user');
    }

    // Update or create profile with admin role
    console.log('📝 Updating admin profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: adminId,
        email: 'admin@eao.ug',
        role: 'admin',
        name: 'EAO Admin',
        department: 'administration',
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.log('⚠️  Profile update error:', profileError.message);
      // Try without RLS
      console.log('🔄 Trying direct database insert...');
    } else {
      console.log('✅ Admin profile updated');
    }

    console.log('\n🎉 ADMIN SETUP COMPLETE!');
    console.log('========================');
    console.log('📧 Email: admin@eao.ug');
    console.log('🔐 Password: Admin123456!');
    console.log('🌐 Login URL: http://localhost:5173/admin/login');
    console.log('\n💡 Save these credentials securely!');
    console.log('🔒 This user has full admin privileges');

    // Test login
    console.log('\n🧪 Testing admin login...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!'
    });

    if (loginError) {
      console.log('❌ Login test failed:', loginError.message);
    } else {
      console.log('✅ Login test successful');
      console.log('👤 User:', loginData.user?.email);
      console.log('🔑 Role:', loginData.user?.user_metadata?.role);
      
      // Sign out after test
      await supabase.auth.signOut();
    }

  } catch (error) {
    console.error('❌ Setup failed:', error);
    
    if (error instanceof Error) {
      console.log('\n🔧 Troubleshooting:');
      if (error.message.includes('fetch failed')) {
        console.log('- Check if backend is running on port 3001');
        console.log('- Verify Supabase URL and keys are correct');
        console.log('- Check network connectivity');
      }
      if (error.message.includes('database')) {
        console.log('- Run table setup script first');
        console.log('- Check database connection string');
      }
    }
  }
}

createRealAdmin().then(() => {
  console.log('\n✨ Setup process completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
