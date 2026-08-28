import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const env = process.env.PESAPAL_ENV || 'sandbox';
const baseUrl = env === 'production' ? 'https://pay.pesapal.com/pesapalv3' : 'https://cybqa.pesapal.com/pesapalv3';

async function main() {
  try {
    const mod = await import('../services/pesapalService');
    const pesapalService = (mod as any).pesapalService;
    const token = await pesapalService.checkAccessToken();

    const payload = {
      id: 'TEST-' + Date.now(),
      currency: 'UGX',
      amount: 1500,
      email: 'donor@example.com',
      phone_number: '256700000000',
      first_name: 'Automated',
      last_name: 'Test',
      description: 'Test payment',
      callback_url: 'https://crazy-roses-fail.loca.lt/api/payments/pesapal/ipn',
      redirect_url: 'http://localhost:5173/donation/success?tracking_id={{order_tracking_id}}',
      notification_mode: 'CALLBACK',
      brand_name: 'Educate an Orphan Uganda',
      language: 'en',
      billing_address: 'N/A',
      billing_city: 'Kampala',
      billing_state: '',
      billing_post_code: '',
      billing_country: 'UG'
    };

    console.log('Raw submit payload:', payload);

    const response = await axios.post(`${baseUrl}/api/Transactions/SubmitOrderRequest`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      validateStatus: () => true
    });

    console.log('HTTP status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response data:', response.data);
  } catch (err) {
    console.error('Raw submit failed:', err);
    process.exitCode = 2;
  }
}

main();
