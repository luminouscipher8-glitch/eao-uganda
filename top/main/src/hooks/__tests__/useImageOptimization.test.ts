import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useImageOptimization } from '../useImageOptimization.ts';

describe('useImageOptimization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
      })),
      toDataURL: vi.fn(() => 'data:image/jpeg;base64,test'),
    };

    const { result } = renderHook(() => useImageOptimization());
    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as unknown as HTMLCanvasElement);

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

    const ImageMock = vi.fn(function () {
      return mockImage;
    });
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
    const mockImages: Array<{
      onload: ((event: Event) => void) | null;
      onerror: ((event: Event) => void) | null;
      src: string;
    }> = [];

    const ImageMock = vi.fn(function () {
      const mockImage = {
        onload: null as ((event: Event) => void) | null,
        onerror: null as ((event: Event) => void) | null,
        src: '',
      };
      mockImages.push(mockImage);
      return mockImage;
    });
    (globalThis as any).Image = ImageMock;

    const images = ['test1.jpg', 'test2.jpg'];
    const preloadPromise = result.current.preloadCriticalImages(images);

    // Simulate successful loads
    setTimeout(() => {
      mockImages.forEach(mockImage => {
        mockImage.onload?.(new Event('load'));
      });
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

    const ImageMock = vi.fn(function () {
      return mockImage;
    });
    (globalThis as any).Image = ImageMock;

    const preloadPromise = result.current.preloadImage('test.jpg');

    // Simulate error
    setTimeout(() => {
      if (mockImage.onerror) mockImage.onerror(new Event('error'));
    }, 0);

    await expect(preloadPromise).rejects.toBeInstanceOf(Event);
  });
});
