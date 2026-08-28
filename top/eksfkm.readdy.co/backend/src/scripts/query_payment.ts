import dotenv from 'dotenv';
dotenv.config();

import { supabase } from '../lib/supabase';

async function main() {
  const merchant = process.argv[2];
  if (!merchant) {
    console.error('Usage: tsx src/scripts/query_payment.ts <merchant_reference>');
    process.exit(2);
  }

  const res = await supabase.from('payments').select('*').eq('merchant_reference', merchant).maybeSingle();
  if (res.error) {
    console.error('Supabase error:', res.error.message);
    process.exitCode = 2;
    return;
  }

  console.log('Payment row:', res.data);
}

main();
