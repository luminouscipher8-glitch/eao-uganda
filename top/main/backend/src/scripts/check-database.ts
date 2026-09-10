import { supabase } from '../lib/supabase.js';

async function checkDatabase() {
  console.log('🔍 Checking database connection and tables...');
  
  try {
    // Test connection
    console.log('📡 Testing Supabase connection...');
    const { data, error } = await supabase.from('programs').select('count').limit(1);
    
    if (error) {
      console.error('❌ Database connection error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return;
    }
    
    console.log('✅ Database connection successful!');
    
    // Check if programs table exists
    console.log('📋 Checking programs table structure...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('programs')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Programs table error:', tableError);
      return;
    }
    
    console.log('✅ Programs table exists!');
    console.log('📊 Sample data:', tableInfo);
    
    // Test insert operation
    console.log('🧪 Testing program creation...');
    const testProgram = {
      title: 'Test Program',
      description: 'Test description',
      impact: 'Test impact',
      category: 'education',
      image: '/images/programs/default.jpg',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data: insertResult, error: insertError } = await supabase
      .from('programs')
      .insert(testProgram)
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError);
      console.error('Error details:', {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint
      });
    } else {
      console.log('✅ Insert test successful!');
      console.log('📝 Created program:', insertResult);
      
      // Clean up test data
      await supabase.from('programs').delete().eq('id', insertResult.id);
      console.log('🧹 Test data cleaned up');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkDatabase();
