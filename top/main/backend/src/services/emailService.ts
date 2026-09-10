import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email via Resend. Throws on failure.
 */
export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!resend) {
    console.log('Resend API key not configured; simulating email send.');
    console.log('Would send to:', to, 'subject:', subject);
    return { simulated: true };
  }

  try {
    const resp = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Educate an Orphan <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    });

    console.log('sendEmail: sent', (resp as any).id || resp);
    return resp;
  } catch (err) {
    console.error('sendEmail: failed', err);
    throw err;
  }
}

export default sendEmail;
