import { describe, expect, it } from 'vitest';
import { calculateShopCart } from './shopCatalog.js';

describe('shop catalog pricing', () => {
  it('calculates totals from server-owned prices', () => {
    const cart = calculateShopCart([
      { id: 1, quantity: 2 },
      { id: 6, quantity: 1 },
    ]);

    expect(cart.totalAmount).toBe(62000);
    expect(cart.items).toEqual([
      {
        id: 1,
        name: 'EAO Branded T-Shirt',
        unitPrice: 25000,
        quantity: 2,
        lineTotal: 50000,
      },
      {
        id: 6,
        name: 'EAO Pen Set',
        unitPrice: 12000,
        quantity: 1,
        lineTotal: 12000,
      },
    ]);
  });

  it('ignores client-provided prices and totals', () => {
    const cart = calculateShopCart([
      { id: 1, quantity: 2, price: 1, total: 2 } as any,
    ]);

    expect(cart.totalAmount).toBe(50000);
    expect(cart.items[0]?.unitPrice).toBe(25000);
  });

  it('rejects unknown products and invalid quantities', () => {
    expect(() => calculateShopCart([{ id: 999, quantity: 1 }])).toThrow(
      'Product 999 is not available'
    );
    expect(() => calculateShopCart([{ id: 1, quantity: 0 }])).toThrow(
      'quantity must be between'
    );
    expect(() => calculateShopCart([{ id: 1, quantity: 1.5 }])).toThrow(
      'quantity must be a positive integer'
    );
  });

  it('rejects unsupported currencies and duplicate product lines', () => {
    expect(() => calculateShopCart([{ id: 1, quantity: 1 }], 'USD')).toThrow(
      'support UGX only'
    );
    expect(() =>
      calculateShopCart([
        { id: 1, quantity: 1 },
        { id: 1, quantity: 1 },
      ])
    ).toThrow('duplicate product IDs');
  });
});
