import { describe, expect, it } from 'vitest';
import { normalizePesapalStatus } from './pesapalStatus.js';

describe('Pesapal status normalization', () => {
  it('supports the documented numeric completed status', () => {
    expect(normalizePesapalStatus({ status: 1 }).status).toBe('COMPLETED');
  });

  it('supports the documented payment status description', () => {
    expect(
      normalizePesapalStatus({ payment_status_description: 'Completed' }).status
    ).toBe('COMPLETED');
  });

  it('maps failed and reversed statuses to failed', () => {
    expect(normalizePesapalStatus({ status: 2 }).status).toBe('FAILED');
    expect(normalizePesapalStatus({ status: 4 }).status).toBe('FAILED');
    expect(normalizePesapalStatus({ status: 'Failed' }).status).toBe('FAILED');
  });

  it('defaults unknown statuses to pending', () => {
    expect(normalizePesapalStatus({ status: 0 }).status).toBe('PENDING');
    expect(normalizePesapalStatus({ status: 'Processing' }).status).toBe('PENDING');
  });
});