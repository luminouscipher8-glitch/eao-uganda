import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ✅ Clients
const supabaseAuth: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

async function testProgramCreation() {
  console.log('🧪 Testing program creation...');

  try {
    // Login as admin (TS fix with `any`)
    const { data, error } = await (supabaseAuth.auth as any).signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!',
    });

    if (error) {
      console.error('❌ Login failed:', error.message || error);
      return;
    }

    const token = data.session?.access_token;
    if (!token) {
      console.error('❌ No token received');
      return;
    }

    console.log('✅ Login successful!');
    console.log('🎯 Token:', token.substring(0, 50) + '...');

    // Test program creation via API
    const programData = {
      title: 'Test Program',
      description: 'This is a test program created via API',
      impact: 'Will help test children',
      category: 'education',
      image: '/images/programs/test.jpg',
    };

    const response = await fetch('http://localhost:3001/api/admin/programs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(programData),
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

    // ✅ Logout (TS fix)
    await (supabaseAuth.auth as any).signOut();
    console.log('🔐 Logged out');

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Test failed:', message);
  }
}

testProgramCreation();