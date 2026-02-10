import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rogxpucnkqwbeohpkolj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZ3hwdWNua3F3YmVvaHBrb2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzQwOTQsImV4cCI6MjA4NDg1MDA5NH0.TljQitsZXswDQTspvytNJrkz4eOEPWwX-ur2zOs9Ir4'
);

async function testWithRealToken() {
  try {
    console.log('🔐 Logging in to get real token...');
    
    // Login as admin
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!'
    });

    if (error) {
      console.error('❌ Login error:', error);
      return;
    }

    console.log('✅ Login successful!');
    console.log('User:', data.user);
    console.log('Session:', data.session);
    
    if (data.session?.access_token) {
      console.log('🎯 Token:', data.session.access_token.substring(0, 50) + '...');
      
      // Test API with real token
      const response = await fetch('http://localhost:3001/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${data.session.access_token}`
        }
      });
      
      const apiData = await response.json();
      console.log('📊 API Status:', response.status);
      console.log('📊 API Response:', apiData);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testWithRealToken();
