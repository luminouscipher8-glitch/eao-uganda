import { createClient } from '@supabase/supabase-js';

// Get the real JWT secret from Supabase
const supabaseUrl = 'https://rogxpucnkqwbeohpkolj.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZ3hwdWNua3F3YmVvaHBrb2xqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTI3NDA5NCwiZXhwIjoyMDg0ODUwMDk0fQ.g9rLzYwClWX56zSD1Aanz-h3q3vLl-k0xUxfK7rffp8';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function getJwtSecret() {
  try {
    console.log('🔑 Getting JWT secret from Supabase...');
    
    // The JWT secret is typically the same as the service role key's secret
    // For Supabase, the JWT secret is usually the same as the JWT_SECRET in the project settings
    // Let's extract it from the service role key or use a standard approach
    
    // For Supabase projects, the JWT secret is typically:
    // The same as the JWT_SECRET shown in the Supabase dashboard under Settings > API
    
    console.log('📋 To get your real JWT secret:');
    console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
    console.log('2. Select your project: rogxpucnkqwbeohpkolj');
    console.log('3. Go to Settings > API');
    console.log('4. Find the "JWT Secret" field');
    console.log('5. Copy the JWT secret and update your backend/.env file');
    
    console.log('\n🔧 For now, let me try a common approach...');
    
    // Try to decode the service role key to get the secret
    const jwt = require('jsonwebtoken');
    try {
      const decoded = jwt.decode(serviceRoleKey);
      console.log('Service role key decoded:', decoded);
    } catch (err) {
      console.log('Could not decode service role key');
    }
    
    // The JWT secret for Supabase is typically:
    // Your project's JWT secret which is different from the API keys
    console.log('\n⚠️  IMPORTANT: You need to update your backend/.env file:');
    console.log('SUPABASE_JWT_SECRET=<your-real-jwt-secret-from-supabase-dashboard>');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

getJwtSecret();
