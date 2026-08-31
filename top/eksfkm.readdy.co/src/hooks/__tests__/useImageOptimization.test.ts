import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useImageOptimization } from '../useImageOptimization.ts';

// Mock React hooks properly
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn(initial => [initial, vi.fn()]),
    useCallback: vi.fn(fn => fn),
    useEffect: vi.fn(),
  };
});

// Mock document for all tests
Object.defineProperty(globalThis, 'document', {
  value: {
    createElement: vi.fn(() => ({
      src: '',
      onload: null,
      onerror: null,
      complete: false,
      naturalWidth: 100,
      naturalHeight: 100,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
    body: {
      appendChild: vi.fn(),
    },
  },
  writable: true,
});

// Mock createRoot for React Testing Library
Object.defineProperty(globalThis, 'document', {
  value: {
    ...globalThis.document,
    createElement: vi.fn(tagName => {
      if (tagName === 'div') {
        return {
          id: '',
          className: '',
          style: {},
          innerHTML: '',
          textContent: '',
          appendChild: vi.fn(),
          removeChild: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          setAttribute: vi.fn(),
          getAttribute: vi.fn(),
        };
      }
      return globalThis.document.createElement(tagName);
    }),
  },
  writable: true,
});

// Mock React DOM createRoot
Object.defineProperty(globalThis, 'document', {
  value: {
    ...globalThis.document,
    getElementById: vi.fn(() => ({
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    })),
  },
  writable: true,
});

// Mock createRoot for React Testing Library
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
    unmount: vi.fn(),
  })),
}));

describe('useImageOptimization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate blur data URL', () => {
    // Mock canvas
    const mockCanvas = {
      width: 40,
      height: 40,
      getContext: vi.fn(() => ({
        createLinearGradient: vi.fn(() => ({
          addColorStop: vi.fn(),
        })),
        fillStyle: '',
        fillRect: vi.fn(),
        toDataURL: vi.fn(() => 'data:image/jpeg;base64,test'),
      })),
    };

    (globalThis as any).HTMLCanvasElement = vi.fn(() => mockCanvas);

    const { result } = renderHook(() => useImageOptimization());

    const blurDataURL = result.current.generateBlurDataURL('test.jpg');

    expect(blurDataURL).toMatch(/^data:image\/jpeg;base64,/);
    expect(blurDataURL.length).toBeGreaterThan(0);
  });

  it('should optimize image with dimensions', () => {
    const { result } = renderHook(() => useImageOptimization());

    const optimized = result.current.optimizeImage('test.jpg', {
      width: 800,
      height: 600,
    });

    expect(optimized).toContain('w=800');
    expect(optimized).toContain('h=600');
  });

  it('should return original URL for external images', () => {
    const { result } = renderHook(() => useImageOptimization());

    const externalUrl = 'https://example.com/image.jpg';
    const optimized = result.current.optimizeImage(externalUrl);

    expect(optimized).toBe(externalUrl);
  });

  it('should cache optimized images', () => {
    const { result } = renderHook(() => useImageOptimization());

    const src = 'test.jpg';
    const options = { width: 800 };

    const firstCall = result.current.optimizeImage(src, options);
    const secondCall = result.current.optimizeImage(src, options);

    expect(firstCall).toBe(secondCall);
  });

  it('should preload image successfully', async () => {
    const { result } = renderHook(() => useImageOptimization());

    // Mock Image constructor
    const mockImage = {
      onload: null as ((event: Event) => void) | null,
      onerror: null as ((event: Event) => void) | null,
      src: '',
    };

    const ImageMock = vi.fn(() => mockImage);
    (globalThis as any).Image = ImageMock;

    const preloadPromise = result.current.preloadImage('test.jpg');

    // Simulate successful load
    setTimeout(() => {
      if (mockImage.onload) mockImage.onload(new Event('load'));
    }, 0);

    await expect(preloadPromise).resolves.toBeUndefined();
  });

  it('should preload multiple images', async () => {
    const { result } = renderHook(() => useImageOptimization());

    // Mock Image constructor
    const mockImage = {
      onload: null as ((event: Event) => void) | null,
      onerror: null as ((event: Event) => void) | null,
      src: '',
    };

    const ImageMock = vi.fn(() => mockImage);
    (globalThis as any).Image = ImageMock;

    const images = ['test1.jpg', 'test2.jpg'];
    const preloadPromise = result.current.preloadCriticalImages(images);

    // Simulate successful loads
    setTimeout(() => {
      if (mockImage.onload) mockImage.onload(new Event('load'));
    }, 0);

    await expect(preloadPromise).resolves.toBeUndefined();
  });

  it('should generate responsive srcset', () => {
    const { result } = renderHook(() => useImageOptimization());

    const breakpoints = [320, 640, 960];
    const srcSet = result.current.getResponsiveSrcSet('test.jpg', breakpoints);

    expect(srcSet).toContain('320w');
    expect(srcSet).toContain('640w');
    expect(srcSet).toContain('960w');
    expect(srcSet).toContain('test.jpg');
  });

  it('should handle preload image errors gracefully', async () => {
    const { result } = renderHook(() => useImageOptimization());

    // Mock Image constructor
    const mockImage = {
      onload: null as ((event: Event) => void) | null,
      onerror: null as ((event: Event) => void) | null,
      src: '',
    };

    const ImageMock = vi.fn(() => mockImage);
    (globalThis as any).Image = ImageMock;

    const preloadPromise = result.current.preloadImage('test.jpg');

    // Simulate error
    setTimeout(() => {
      if (mockImage.onerror) mockImage.onerror(new Event('error'));
    }, 0);

    await expect(preloadPromise).rejects.toBeUndefined();
  });
});
