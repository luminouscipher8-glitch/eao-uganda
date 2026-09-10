export interface PesapalTransactionStatus {
  payment_method: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference?: string;
  merchant_reference?: string;
  created_at: string;
  paid_at?: string;
  phone_number?: string;
  email?: string;
}

export function normalizePesapalStatus(statusResponse: {
  status?: string | number;
  payment_status_description?: string;
  payment_method?: string;
  amount?: number;
  currency?: string;
  reference?: string;
  merchant_reference?: string;
  created_at?: string;
  paid_at?: string;
  phone_number?: string;
  email?: string;
}): PesapalTransactionStatus {
  const rawStatus = String(
    statusResponse.payment_status_description ?? statusResponse.status ?? ''
  )
    .trim()
    .toLowerCase();

  const status =
    rawStatus === '1' || rawStatus.includes('complete') || rawStatus.includes('success')
      ? 'COMPLETED'
      : rawStatus === '2' || rawStatus === '4' || rawStatus.includes('fail') || rawStatus.includes('revers')
        ? 'FAILED'
        : 'PENDING';

  return {
    status,
    payment_method: statusResponse.payment_method || '',
    amount: Number(statusResponse.amount || 0),
    currency: statusResponse.currency || '',
    created_at: statusResponse.created_at || '',
  };
}