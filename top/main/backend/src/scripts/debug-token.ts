import * as jwt from 'jsonwebtoken';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ✅ ENV variables (recommended)
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

// ✅ Correct client
const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function debugToken() {
  try {
    console.log('🔍 Debugging token verification...');

    // ✅ Fix TS issue
    const { data, error } = await (supabase.auth as any).signInWithPassword({
      email: 'admin@eao.ug',
      password: 'Admin123456!',
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      return;
    }

    const token = data?.session?.access_token;

    if (!token) {
      console.error('❌ No token found');
      return;
    }

    console.log('🎯 Full token:', token);

    // ✅ Decode (no verification)
    const decoded = jwt.decode(token, { complete: true });
    console.log('📋 Decoded token:', JSON.stringify(decoded, null, 2));

    console.log('\n🔧 Testing verification with different issuers...');

    // ✅ Correct issuer formats
    const baseUrl = SUPABASE_URL.replace(/\/$/, '');

    const issuers = [
      `${baseUrl}/auth/v1`,
      baseUrl,
    ];

    for (const issuer of issuers) {
      try {
        const verified = jwt.verify(token, JWT_SECRET, {
          algorithms: ['HS256'],
          issuer: issuer,
        });

        console.log(`✅ Success with issuer: ${issuer}`);
        console.log('Verified payload:', verified);
        break;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.log(`❌ Failed with issuer: ${issuer} - ${message}`);
      }
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error:', message);
  }
}

debugToken();