import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.ResizeObserver = mockResizeObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock location
const mockLocation = {
  ...window.location,
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
};
Object.defineProperty(window, 'location', {
  writable: true,
  value: mockLocation,
});

// Global test utilities
(globalThis as any).vi = vi;

beforeAll(() => {
  // Setup global test environment
});

afterEach(() => {
  // Cleanup after each test
  vi.clearAllMocks();
});

afterAll(() => {
  // Cleanup after all tests
});

// Mock HTMLCanvasElement.getContext for jsdom (fixes image/webp checks in tests)
if (typeof HTMLCanvasElement !== 'undefined' && !HTMLCanvasElement.prototype.getContext) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: function (this: any, _type: string) {
      // Minimal 2D context mock used by image optimization utilities
      return {
        createLinearGradient: () => ({ addColorStop: (_: number, __: string) => {} }),
        addColorStop: (_: number, __: string) => {},
        fillRect: (_x: number, _y: number, _w: number, _h: number) => {},
        fillStyle: undefined,
        // allow other canvas ops without throwing
      } as any;
    },
    configurable: true,
  });

  // Provide a simple toDataURL implementation on canvas elements
  if (!HTMLCanvasElement.prototype.toDataURL) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
      value: function (this: any, _type?: string, _quality?: number) {
        // Return a tiny 1x1 JPEG base64 data URL as a placeholder
        return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIWFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAP8A/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwD//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwD//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwD//2Q==';
      },
      configurable: true,
    });
  }
}

// Mock PerformanceObserver for environments without it (Vitest + JSDOM)
if (typeof (globalThis as any).PerformanceObserver === 'undefined') {
  // Use a function constructor so tests that spy/mocking expect a constructor work
  function MockPerformanceObserver(this: any, cb: any) {
    this.callback = cb;
  }
  MockPerformanceObserver.prototype.observe = function () {
    return null;
  };
  MockPerformanceObserver.prototype.disconnect = function () {
    return null;
  };
  MockPerformanceObserver.prototype.takeRecords = function () {
    return [];
  };
  (globalThis as any).PerformanceObserver = MockPerformanceObserver as any;
}
