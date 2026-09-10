import { supabase } from '../lib/supabase.js';

async function listTables() {
  console.log('🔍 Listing available tables in api schema...');
  
  try {
    // Try to get information about the database
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_schema')
      .eq('table_schema', 'api');
    
    if (error) {
      console.error('❌ Error listing tables:', error);
      
      // Try alternative approach - test common table names
      console.log('🔄 Testing common table names...');
      const commonTables = ['programs', 'news', 'contacts', 'donations', 'volunteers'];
      
      for (const tableName of commonTables) {
        try {
          const { data: testData, error: testError } = await supabase
            .from(tableName)
            .select('count')
            .limit(1);
          
          if (testError) {
            console.log(`❌ Table '${tableName}' not found:`, testError.message);
          } else {
            console.log(`✅ Table '${tableName}' exists!`);
          }
        } catch (err) {
          console.log(`❌ Table '${tableName}' error:`, err);
        }
      }
      
      return;
    }
    
    console.log('✅ Available tables:', data);
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

listTables();
