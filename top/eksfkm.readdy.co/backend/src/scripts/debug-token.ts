import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rogxpucnkqwbeohpkolj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZ3hwdWNua3F3YmVvaHBrb2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzQwOTQsImV4cCI6MjA4NDg1MDA5NH0.TljQitsZXswDQTspvytNJrkz4eOEPWwX-ur2zOs9Ir4'
);

async function debugToken() {
  try {
    console.log('🔍 Debugging token verification...');
    
    // Get a real token
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!'
    });

    if (error) {
      console.error('❌ Login error:', error);
      return;
    }

    const token = data.session?.access_token;
    if (!token) {
      console.error('❌ No token found');
      return;
    }

    console.log('🎯 Full token:', token);
    
    // Decode without verification first
    const decoded = jwt.decode(token, { complete: true });
    console.log('📋 Decoded token:', JSON.stringify(decoded, null, 2));
    
    // Now try verification with different issuer formats
    const jwtSecret = 'dbO7q1fen6LtfDoxntOS+hkZM4PdIyG/+ymstIcDb3K7poAA8+UtUatPW050iwsREb1nTdxUxjveCtII9/r7DA==';
    
    console.log('\n🔧 Testing verification with different issuers...');
    
    const issuers = [
      'https://rogxpucnkqwbeohpkolj.supabase.co/auth/v1',
      'https://rogxpucnkqwbeohpkolj.supabase.co',
      'rogxpucnkqwbeohpkolj.supabase.co/auth/v1',
      'rogxpucnkqwbeohpkolj.supabase.co'
    ];
    
    for (const issuer of issuers) {
      try {
        const verified = jwt.verify(token, jwtSecret, {
          algorithms: ['HS256'],
          issuer: issuer
        });
        console.log(`✅ Success with issuer: ${issuer}`);
        console.log('Verified payload:', verified);
        break;
      } catch (err) {
        console.log(`❌ Failed with issuer: ${issuer} - ${err.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugToken();
