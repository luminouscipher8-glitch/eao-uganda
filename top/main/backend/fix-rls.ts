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

async function fixRLSPolicies() {
  try {
    console.log('Fixing RLS policies...');
    
    // Enable RLS on all tables
    const policies = [
      'ALTER TABLE api.programs ENABLE ROW LEVEL SECURITY',
      'ALTER TABLE api.events ENABLE ROW LEVEL SECURITY', 
      'ALTER TABLE api.school_building ENABLE ROW LEVEL SECURITY',
      'ALTER TABLE api.success_stories ENABLE ROW LEVEL SECURITY',
      
      'CREATE POLICY "Allow service role full access to programs" ON api.programs FOR ALL USING (auth.role() = \'service_role\') WITH CHECK (auth.role() = \'service_role\')',
      'CREATE POLICY "Allow service role full access to events" ON api.events FOR ALL USING (auth.role() = \'service_role\') WITH CHECK (auth.role() = \'service_role\')',
      'CREATE POLICY "Allow service role full access to school_building" ON api.school_building FOR ALL USING (auth.role() = \'service_role\') WITH CHECK (auth.role() = \'service_role\')',
      'CREATE POLICY "Allow service role full access to success_stories" ON api.success_stories FOR ALL USING (auth.role() = \'service_role\') WITH CHECK (auth.role() = \'service_role\')',
      
      'GRANT ALL ON api.programs TO service_role',
      'GRANT ALL ON api.events TO service_role', 
      'GRANT ALL ON api.school_building TO service_role',
      'GRANT ALL ON api.success_stories TO service_role'
    ];
    
    for (const policy of policies) {
      console.log(`Executing: ${policy}`);
      const { error } = await supabase.rpc('sql', { query: policy });
      if (error) {
        console.error(`❌ Error:`, error);
      } else {
        console.log(`✅ Success`);
      }
    }
    
    console.log('✅ RLS policies fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing RLS:', error);
  }
}

fixRLSPolicies();
