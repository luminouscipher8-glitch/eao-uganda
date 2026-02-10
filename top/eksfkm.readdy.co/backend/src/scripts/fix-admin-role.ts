import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rogxpucnkqwbeohpkolj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZ3hwdWNua3F3YmVvaHBrb2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzQwOTQsImV4cCI6MjA4NDg1MDA5NH0.TljQitsZXswDQTspvytNJrkz4eOEPWwX-ur2zOs9Ir4'
);

async function fixAdminRole() {
  try {
    console.log('🔧 Fixing admin role for admin@eao.ug...');
    
    // First sign in as the user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!'
    });

    if (signInError) {
      console.error('❌ Sign in error:', signInError);
      return;
    }

    console.log('✅ Signed in successfully');

    // Update user metadata to set admin role
    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      data: {
        role: 'admin',
        name: 'EAO Admin'
      }
    });

    if (updateError) {
      console.error('❌ Update error:', updateError);
    } else {
      console.log('✅ Admin role set successfully!');
      console.log('Updated user:', updateData);
    }

    // Sign out
    await supabase.auth.signOut();
    console.log('🔐 Signed out');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixAdminRole();
