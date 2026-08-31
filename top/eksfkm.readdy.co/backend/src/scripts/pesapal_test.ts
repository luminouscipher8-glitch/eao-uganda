// Quick Pesapal sandbox sanity check script
// Sets env vars and attempts to register an IPN using pesapalService.registerIPN()

import dotenv from 'dotenv';

// Load backend .env so tests use the same config
dotenv.config();

async function main() {
  try {
    // Show which Pesapal config will be used (mask secrets)
    const key = process.env.PESAPAL_CONSUMER_KEY || '<not set>';
    const secret = process.env.PESAPAL_CONSUMER_SECRET ? '***redacted***' : '<not set>';
    const env = process.env.PESAPAL_ENV || '<not set>';
    const ipn = process.env.PESAPAL_IPN_ID || '<not set>';

    console.log('Pesapal config:');
    console.log('  PESAPAL_CONSUMER_KEY:', key ? `${key.slice(0,6)}...${key.slice(-6)}` : key);
    console.log('  PESAPAL_CONSUMER_SECRET:', secret);
    console.log('  PESAPAL_ENV:', env);
    console.log('  PESAPAL_IPN_ID:', ipn);

    if (ipn && ipn !== '<not set>') {
      console.log('PESAPAL_IPN_ID is present in .env — runtime registration not required.');
    }

    // Import service and attempt access token fetch (diagnostic)
    const mod = await import('../services/pesapalService');
    const pesapalService = (mod as any).pesapalService;

    console.log('Attempting to fetch an access token from Pesapal (this calls the remote API)...');
    try {
      const token = await pesapalService.checkAccessToken();
      console.log('Access token obtained (masked):', token ? `${token.slice(0,6)}...${token.slice(-6)}` : token);
    } catch (err) {
      console.error('Failed to obtain access token:', err);
    }

    if (!ipn || ipn === '<not set>') {
      console.log('No IPN ID found; attempting to register IPN with callback http://localhost:3001/api/payments/pesapal/ipn');
      const callbackUrl = 'http://localhost:3001/api/payments/pesapal/ipn';
      try {
        const id = await pesapalService.registerIPN(callbackUrl);
        console.log('Pesapal registerIPN result:', id);
      } catch (regErr) {
        console.error('Register IPN failed:', regErr);
      }
    }
  } catch (err) {
    console.error('Pesapal test failed:', err);
    process.exitCode = 2;
  }
}

main();
