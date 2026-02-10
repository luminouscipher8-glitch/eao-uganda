import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function testWithoutRLS() {
  try {
    console.log('Testing without RLS...');
    
    // Disable RLS temporarily
    await supabase.rpc('sql', { 
      query: 'ALTER TABLE programs DISABLE ROW LEVEL SECURITY' 
    });
    
    await supabase.rpc('sql', { 
      query: 'ALTER TABLE events DISABLE ROW LEVEL SECURITY' 
    });
    
    await supabase.rpc('sql', { 
      query: 'ALTER TABLE school_building DISABLE ROW LEVEL SECURITY' 
    });
    
    await supabase.rpc('sql', { 
      query: 'ALTER TABLE success_stories DISABLE ROW LEVEL SECURITY' 
    });
    
    // Test access
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error:', error);
    } else {
      console.log('✅ Success:', data);
    }
    
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
  }
}

testWithoutRLS();
