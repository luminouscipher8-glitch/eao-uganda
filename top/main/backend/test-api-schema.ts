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
    },
    db: {
      schema: 'api'
    }
  }
);

async function testApiSchema() {
  try {
    console.log('Testing api schema access...');
    
    // Test if we can access api schema
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ API Schema Error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
    } else {
      console.log('✅ API Schema Access Successful!');
      console.log('Programs data:', data);
    }
    
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
  }
}

testApiSchema();
