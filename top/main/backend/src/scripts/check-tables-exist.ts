import { supabase } from '../lib/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkTablesExist() {
  console.log('🔍 Checking if tables exist in public schema...');
  
  try {
    // Test programs table
    console.log('📋 Testing programs table...');
    const { data: programsData, error: programsError } = await supabase
      .from('programs')
      .select('count')
      .limit(1);
    
    if (programsError) {
      console.error('❌ Programs table error:', programsError);
      console.error('Error details:', {
        message: programsError.message,
        code: programsError.code,
        details: programsError.details,
        hint: programsError.hint
      });
    } else {
      console.log('✅ Programs table exists!');
      console.log('📊 Programs data:', programsData);
    }
    
    // Test news table
    console.log('📰 Testing news table...');
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('count')
      .limit(1);
    
    if (newsError) {
      console.error('❌ News table error:', newsError);
    } else {
      console.log('✅ News table exists!');
    }
    
    // Test contacts table
    console.log('📧 Testing contacts table...');
    const { data: contactsData, error: contactsError } = await supabase
      .from('contacts')
      .select('count')
      .limit(1);
    
    if (contactsError) {
      console.error('❌ Contacts table error:', contactsError);
    } else {
      console.log('✅ Contacts table exists!');
    }
    
    // Test donations table
    console.log('💰 Testing donations table...');
    const { data: donationsData, error: donationsError } = await supabase
      .from('donations')
      .select('count')
      .limit(1);
    
    if (donationsError) {
      console.error('❌ Donations table error:', donationsError);
    } else {
      console.log('✅ Donations table exists!');
    }
    
    // Test volunteers table
    console.log('🤝 Testing volunteers table...');
    const { data: volunteersData, error: volunteersError } = await supabase
      .from('volunteers')
      .select('count')
      .limit(1);
    
    if (volunteersError) {
      console.error('❌ Volunteers table error:', volunteersError);
    } else {
      console.log('✅ Volunteers table exists!');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkTablesExist();
