import dotenv from 'dotenv';
dotenv.config();

const mod = await import('../services/pesapalService');
const pesapalService = (mod as any).pesapalService;

async function main() {
  try {
    const data = {
      amount: 1500,
      currency: 'UGX',
      email: 'donor@example.com',
      phone_number: '256700000000',
      first_name: 'Automated',
      last_name: 'Test',
      callback_url: (process.env.BACKEND_URL || 'http://localhost:3001') + '/api/payments/pesapal/ipn',
      redirect_url: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/donation/success?tracking_id={{order_tracking_id}}',
      description: 'Test payment',
      reference: pesapalService.generateReference(),
    };

    console.log('Submitting to Pesapal:', data);
    const resp = await pesapalService.submitPayment(data);
    console.log('Pesapal submit response:', resp);
  } catch (err) {
    console.error('Submit error:', err);
    process.exitCode = 2;
  }
}

main();
