import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;

beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    // Create a component that throws an error after mount
    const ComponentWithError = () => {
      const [shouldThrow, setShouldThrow] = React.useState(false);

      React.useEffect(() => {
        setShouldThrow(true);
      }, []);

      if (shouldThrow) {
        throw new Error('Test error');
      }

      return <div>No error</div>;
    };

    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );

    // Check if error boundary caught the error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('calls console.error when error occurs', () => {
    const ComponentWithError = () => {
      const [shouldThrow, setShouldThrow] = React.useState(false);

      React.useEffect(() => {
        setShouldThrow(true);
      }, []);

      if (shouldThrow) {
        throw new Error('Test error');
      }

      return <div>No error</div>;
    };

    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });

  it('shows retry button', () => {
    const ComponentWithError = () => {
      const [shouldThrow, setShouldThrow] = React.useState(false);

      React.useEffect(() => {
        setShouldThrow(true);
      }, []);

      if (shouldThrow) {
        throw new Error('Test error');
      }

      return <div>No error</div>;
    };

    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: 'Refresh Page' })
    ).toBeInTheDocument();
  });
});
