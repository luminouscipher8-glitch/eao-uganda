import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const url = process.env.BACKEND_URL || 'http://localhost:3001';
  const endpoint = `${url}/api/payments/donations/create`;

  console.log('Creating donation to:', endpoint);

  const body = {
    amount: 1500,
    donorName: 'Automated Test',
    donorEmail: process.env.TEST_DONOR_EMAIL || 'luminouscipher8@gmail.com',
    donorPhone: '256700000000',
    message: 'Donation test',
    currency: 'UGX'
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try { 
      console.log('Response:', JSON.parse(text)); 
    } catch { 
      console.log('Response text:', text); 
    }
  } catch (err) {
    console.error('Request failed:', err);
    process.exitCode = 2;
  }
}

main();