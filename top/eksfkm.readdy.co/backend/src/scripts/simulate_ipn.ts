import dotenv from 'dotenv';
dotenv.config();

import { DatabaseService } from '../services/database';
import { PaymentController } from '../controllers/paymentController';
import { pesapalService } from '../services/pesapalService';

async function run() {
  // Use an in-memory mock for DatabaseService methods so no real DB is required
  const inMemoryStore: Record<string, any> = {};
  const dbModule = await import('../services/database');
  const DatabaseServiceClass = (dbModule as any).DatabaseService;

  DatabaseServiceClass.prototype.createPayment = async function (data: any) {
    const id = `mock-${Date.now()}`;
    const payment = {
      id,
      merchant_reference: data.merchant_reference,
      tracking_id: data.tracking_id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      provider: data.provider,
      metadata: data.metadata,
      pesapal_status: data.pesapal_status || null,
      payment_method: data.payment_method || null,
      created_at: new Date().toISOString(),
    };
    inMemoryStore[payment.tracking_id] = payment;
    return payment;
  };

  DatabaseServiceClass.prototype.updatePayment = async function (id: string, updates: any) {
    const payment = Object.values(inMemoryStore).find((p: any) => p.id === id || p.merchant_reference === id);
    if (!payment) throw new Error('Payment not found');
    Object.assign(payment, updates, { updated_at: new Date().toISOString() });
    return payment;
  };

  DatabaseServiceClass.prototype.getPaymentByTrackingId = async function (trackingId: string) {
    const payment = inMemoryStore[trackingId];
    if (!payment) throw new Error('Payment not found');
    return payment;
  };

  const db = new DatabaseService();

  // Create a test payment
  const merchantRef = `SIM-${Date.now()}`;
  const trackingId = `SIM-TRACK-${Date.now()}`;

  console.log('Creating test payment with tracking_id', trackingId);

  const payment = await db.createPayment({
    type: 'DONATION',
    merchant_reference: merchantRef,
    amount: 1000,
    currency: 'UGX',
    status: 'PENDING',
    provider: 'pesapal',
    metadata: {
      donorName: 'Test Donor',
      donorEmail: process.env.TEST_DONOR_EMAIL || 'donor@example.com',
      donorPhone: '256700000000',
      message: 'Test donation',
    },
    tracking_id: trackingId,
  } as any);

  console.log('Payment created (in-memory):', payment.id);

  // Monkeypatch pesapalService.getTransactionStatus to return COMPLETED
  const orig = pesapalService.getTransactionStatus;
  (pesapalService as any).getTransactionStatus = async (orderTrackingId: string) => {
    return {
      payment_method: 'MOBILE',
      amount: payment.amount,
      currency: payment.currency,
      status: 'COMPLETED',
      reference: payment.merchant_reference,
      created_at: new Date().toISOString(),
    };
  };

  // Prepare fake req/res
  const req: any = { query: { OrderTrackingId: trackingId, OrderMerchantReference: merchantRef } };

  const res: any = {
    status(code: number) { this._status = code; return this; },
    send(body?: any) { console.log('Response send:', this._status, body); },
    json(obj: any) { console.log('Response json:', obj); }
  };

  const controller = new PaymentController();

  console.log('Invoking IPN handler...');
  await (controller as any).handlePesapalIPN(req, res, (err: any) => { if (err) console.error('Handler error:', err); });

  // Restore original
  (pesapalService as any).getTransactionStatus = orig;

  // Fetch payment from DB
  const updated = await db.getPaymentByTrackingId(trackingId);
  console.log('Updated payment:', { id: updated.id, status: updated.status, pesapal_status: updated.pesapal_status });
}

run().catch(err => { console.error('Simulation failed:', err); process.exitCode = 2; });
