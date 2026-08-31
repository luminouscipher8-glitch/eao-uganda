import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkeletonLoader, {
  CardSkeleton,
  ListSkeleton,
  TableSkeleton,
} from '../SkeletonLoader.tsx';

describe('SkeletonLoader', () => {
  it('renders with default props', () => {
    render(<SkeletonLoader />);

    const skeleton = document.querySelector('.bg-gray-200');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse', 'h-4', 'rounded');
  });

  it('renders with custom variant', () => {
    render(<SkeletonLoader variant="circular" width={60} height={60} />);

    const skeleton = document.querySelector('.rounded-full');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: '60px', height: '60px' });
  });

  it('renders with rectangular variant', () => {
    render(<SkeletonLoader variant="rectangular" />);

    const skeleton = document.querySelector('.bg-gray-200');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).not.toHaveClass('rounded');
  });

  it('renders with rounded variant', () => {
    render(<SkeletonLoader variant="rounded" />);

    const skeleton = document.querySelector('.rounded-lg');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders with multiple lines', () => {
    render(<SkeletonLoader lines={3} />);

    const skeletons = document.querySelectorAll('.bg-gray-200');
    expect(skeletons.length).toBe(3);
    expect(skeletons[2]).toHaveClass('w-3/4'); // Last line should be shorter
  });

  it('renders without animation', () => {
    render(<SkeletonLoader animation="none" />);

    const skeleton = document.querySelector('.bg-gray-200');
    expect(skeleton).not.toHaveClass('animate-pulse');
  });

  it('applies custom className', () => {
    render(<SkeletonLoader className="custom-class" />);

    const skeleton = document.querySelector('.custom-class');
    expect(skeleton).toBeInTheDocument();
  });
});

describe('CardSkeleton', () => {
  it('renders card skeleton structure', () => {
    render(<CardSkeleton />);

    expect(document.querySelector('.rounded-full')).toBeInTheDocument(); // Circular avatar
    expect(document.querySelector('.bg-white')).toBeInTheDocument(); // Card container
  });
});

describe('ListSkeleton', () => {
  it('renders list with default items', () => {
    render(<ListSkeleton />);

    const skeletons = document.querySelectorAll('.bg-gray-200');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders list with custom number of items', () => {
    render(<ListSkeleton items={5} />);

    const skeletons = document.querySelectorAll('.bg-gray-200');
    expect(skeletons.length).toBeGreaterThanOrEqual(10); // 2 per item
  });
});

describe('TableSkeleton', () => {
  it('renders table skeleton structure', () => {
    render(<TableSkeleton />);

    const skeletons = document.querySelectorAll('.bg-gray-200');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders table with custom rows and columns', () => {
    render(<TableSkeleton rows={3} columns={2} />);

    const skeletons = document.querySelectorAll('.bg-gray-200');
    expect(skeletons.length).toBeGreaterThanOrEqual(7); // 1 header + 3*2 rows
  });
});
