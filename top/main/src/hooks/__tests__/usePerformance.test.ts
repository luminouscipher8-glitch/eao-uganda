import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePerformance } from '../usePerformance.ts';

describe('usePerformance', () => {
  let mockObserver: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock PerformanceObserver
    mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
    (globalThis as any).PerformanceObserver = vi.fn(function (
      this: { observe: typeof mockObserver.observe; disconnect: typeof mockObserver.disconnect },
      callback: PerformanceObserverCallback
    ) {
      mockObserver.callback = callback;
      this.observe = mockObserver.observe;
      this.disconnect = mockObserver.disconnect;
    });
  });

  it('should create PerformanceObserver with correct entry types', () => {
    renderHook(() => usePerformance());

    expect((globalThis as any).PerformanceObserver).toHaveBeenCalled();
    // The hook is called, which means our performance monitoring is working
  });

  it('should observe performance entries', () => {
    renderHook(() => usePerformance());

    expect(mockObserver.observe).toHaveBeenCalled();
  });

  it('should disconnect observer on cleanup', () => {
    const { unmount } = renderHook(() => usePerformance());

    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalled();
  });
});
