import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OptimizedImage from '../OptimizedImage';
import { LoadingProvider } from '../../providers/LoadingProvider';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
(globalThis as any).IntersectionObserver = mockIntersectionObserver;

// Mock canvas context
const mockCanvasContext = {
  createLinearGradient: vi.fn(() => ({
    addColorStop: vi.fn(),
  })),
  fillStyle: '',
  fillRect: vi.fn(),
  toDataURL: vi.fn(() => 'data:image/jpeg;base64,test'),
};

const mockCanvas = {
  width: 0,
  height: 0,
  getContext: vi.fn(() => mockCanvasContext),
};

(globalThis as any).HTMLCanvasElement = mockCanvas;

const renderWithProvider = (component: React.ReactElement) => {
  return render(<LoadingProvider>{component}</LoadingProvider>);
};

describe('OptimizedImage', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    renderWithProvider(<OptimizedImage {...defaultProps} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Test image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders with priority loading', () => {
    renderWithProvider(<OptimizedImage {...defaultProps} priority={true} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('shows loading skeleton initially', () => {
    renderWithProvider(<OptimizedImage {...defaultProps} />);

    // Should show loading skeleton
    expect(
      screen.getByRole('img').closest('div')?.querySelector('.loading-skeleton')
    ).toBeInTheDocument();
  });

  it('removes loading skeleton after image loads', async () => {
    renderWithProvider(<OptimizedImage {...defaultProps} />);

    const img = screen.getByRole('img');

    // Simulate image load
    fireEvent.load(img);

    await waitFor(() => {
      expect(img).toHaveClass('loaded');
    });
  });

  it('shows error fallback when image fails to load', async () => {
    renderWithProvider(<OptimizedImage {...defaultProps} />);

    const img = screen.getByRole('img');

    // Simulate image error
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    renderWithProvider(
      <OptimizedImage {...defaultProps} className="custom-class" />
    );

    const container = screen.getByRole('img').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('sets width and height attributes', () => {
    renderWithProvider(
      <OptimizedImage {...defaultProps} width={400} height={300} />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '400');
    expect(img).toHaveAttribute('height', '300');
  });

  it('shows priority indicator for priority images', () => {
    renderWithProvider(<OptimizedImage {...defaultProps} priority={true} />);

    expect(screen.getByText('Priority')).toBeInTheDocument();
  });

  it('does not show priority indicator for non-priority images', () => {
    renderWithProvider(<OptimizedImage {...defaultProps} priority={false} />);

    expect(screen.queryByText('Priority')).not.toBeInTheDocument();
  });

  it('calls onLoad callback when image loads', async () => {
    const onLoad = vi.fn();
    renderWithProvider(<OptimizedImage {...defaultProps} onLoad={onLoad} />);

    const img = screen.getByRole('img');
    fireEvent.load(img);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('calls onError callback when image fails to load', async () => {
    const onError = vi.fn();
    renderWithProvider(<OptimizedImage {...defaultProps} onError={onError} />);

    const img = screen.getByRole('img');
    fireEvent.error(img);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it('has proper accessibility attributes', () => {
    renderWithProvider(<OptimizedImage {...defaultProps} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Test image');
    expect(img).toHaveAttribute('decoding', 'async');
  });
});
