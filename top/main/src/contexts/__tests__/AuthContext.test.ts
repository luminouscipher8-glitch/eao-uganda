import { describe, expect, it } from 'vitest';
import { getEffectiveRole } from '../AuthContext.js';

describe('AuthContext role trust model', () => {
  it('accepts an admin role from app metadata', () => {
    expect(
      getEffectiveRole({
        app_metadata: { role: 'admin' },
      })
    ).toBe('admin');
  });

  it('ignores a role set only in user metadata', () => {
    expect(
      getEffectiveRole({
        user_metadata: { role: 'admin' },
      })
    ).toBeNull();
  });

  it('keeps a direct role value only when it is trusted', () => {
    expect(
      getEffectiveRole({
        role: 'admin',
      })
    ).toBe('admin');
  });
});
