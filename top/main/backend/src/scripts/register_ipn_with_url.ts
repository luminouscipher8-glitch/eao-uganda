import dotenv from 'dotenv';

// Load backend .env so script uses same config
dotenv.config();

async function main() {
  const callbackUrl = process.argv[2] || 'https://sinless-carded-hasty.ngrok-free.dev/api/payments/pesapal/ipn';
  console.log('Registering Pesapal IPN callback URL:', callbackUrl);

  try {
    const mod = await import('../services/pesapalService.js');
    const pesapalService = (mod as any).pesapalService;
    const id = await pesapalService.registerIPN(callbackUrl);
    console.log('Pesapal registerIPN returned:', id);
  } catch (err) {
    console.error('Failed to register IPN:', err);
    process.exitCode = 2;
  }
}

main();
