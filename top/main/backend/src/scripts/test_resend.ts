import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is required to run the Resend test.');
}

const resend = new Resend(resendApiKey);

// Mock payment data for testing
const paymentData = {
  first_name: 'Automated',
  last_name: 'Test',
  email: 'luminouscipher8@gmail.com',
  currency: 'UGX',
  amount: 1500,
  reference: 'EOU-TEST-12345'
};

const templateHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Donation Receipt - Educate an Orphan Uganda</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, sans-serif; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #1a365d; padding: 30px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Educate an Orphan Uganda</h1>
              <p style="margin: 5px 0 0; font-size: 14px; color: #cbd5e1;">Thank you for changing a life</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; margin-top: 0;">Dear <strong>{{donor_name}}</strong>,</p>
              <p style="font-size: 15px; line-height: 1.5; color: #4a5568;">
                We have successfully received your generous donation. Your support directly provides vital resources, education, and hope to vulnerable children in our community. 
              </p>
              <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin: 25px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Donation Summary</h3>
                    <table width="100%" cellpadding="6" cellspacing="0">
                      <tr>
                        <td style="color: #64748b; font-size: 14px;">Amount Donated:</td>
                        <td style="text-align: right; font-weight: bold; font-size: 14px; color: #1e293b;">{{currency}} {{amount}}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 14px;">Transaction Reference:</td>
                        <td style="text-align: right; font-size: 14px; color: #1e293b; font-family: monospace;">{{reference}}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 14px;">Date:</td>
                        <td style="text-align: right; font-size: 14px; color: #1e293b;">{{date}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="font-size: 15px; margin-bottom: 0; color: #4a5568;">
                With deep gratitude,<br>
                <strong>The Educate an Orphan Uganda Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

async function runTest() {
  const htmlContent = templateHtml
    .replace('{{donor_name}}', `${paymentData.first_name} ${paymentData.last_name}`)
    .replace('{{currency}}', paymentData.currency)
    .replace('{{amount}}', paymentData.amount.toLocaleString())
    .replace('{{reference}}', paymentData.reference)
    .replace('{{date}}', new Date().toLocaleDateString());

  const response = await resend.emails.send({
    from: 'Educate an Orphan <onboarding@resend.dev>',
    to: paymentData.email,
    replyTo: 'support@delouesto.resend.app',
    subject: 'Thank you for your donation!',
    html: htmlContent,
  });

  console.log('Email sent successfully:', response);
}

runTest().catch(console.error);