import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testProgramCreation() {
  console.log('🧪 Testing program creation...');
  
  try {
    // Login to get token
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!'
    });

    if (error) {
      console.error('❌ Login failed:', error);
      return;
    }

    const token = data.session?.access_token;
    if (!token) {
      console.error('❌ No token received');
      return;
    }

    console.log('✅ Login successful!');
    console.log('🎯 Token:', token.substring(0, 50) + '...');

    // Test program creation
    const programData = {
      title: 'Test Program',
      description: 'This is a test program created via API',
      impact: 'Will help test children',
      category: 'education',
      image: '/images/programs/test.jpg'
    };

    const response = await fetch('http://localhost:3001/api/admin/programs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(programData)
    });

    const result = await response.json();
    
    console.log('📊 API Status:', response.status);
    console.log('📊 API Response:', result);

    if (response.ok && result.success) {
      console.log('✅ Program creation successful!');
      console.log('📝 Created program:', result.data);
    } else {
      console.log('❌ Program creation failed:', result.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testProgramCreation();
