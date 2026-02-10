import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rogxpucnkqwbeohpkolj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZ3hwdWNua3F3YmVvaHBrb2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzQwOTQsImV4cCI6MjA4NDg1MDA5NH0.TljQitsZXswDQTspvytNJrkz4eOEPWwX-ur2zOs9Ir4'
);

async function checkAdmin() {
  try {
    // Try to sign in with common admin emails
    const adminEmails = [
      'admin@eao.ug',
      'admin@eksfkm.readdy.co',
      'test@admin.com',
      'admin@test.com'
    ];

    for (const email of adminEmails) {
      console.log(`🔍 Checking ${email}...`);
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: 'Admin123456!'
        });

        if (data.user) {
          console.log(`✅ Found admin user: ${email}`);
          console.log('User data:', {
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata?.role,
            created_at: data.user.created_at
          });
          return;
        }
      } catch (err) {
        console.log(`❌ ${email} failed: ${err.message}`);
      }
    }

    console.log('❌ No admin user found with common credentials');
    
    // List all users (if possible)
    try {
      const { data: users, error } = await supabase.auth.admin.listUsers();
      if (users) {
        console.log('📋 All users:');
        users.forEach(user => {
          console.log(`  - ${user.email} (role: ${user.user_metadata?.role || 'none'})`);
        });
      }
    } catch (err) {
      console.log('❌ Cannot list users (need service role key)');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkAdmin();
