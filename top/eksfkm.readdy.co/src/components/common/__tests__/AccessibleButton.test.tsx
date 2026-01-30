import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AccessibleButton from '../AccessibleButton';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AccessibleButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders as button by default', () => {
    render(<AccessibleButton>Click me</AccessibleButton>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders as link when to prop is provided', () => {
    renderWithRouter(
      <AccessibleButton to="/test">Go to test</AccessibleButton>
    );

    const link = screen.getByRole('link', { name: 'Go to test' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies variant classes correctly', () => {
    render(<AccessibleButton variant="secondary">Secondary</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-teal-500', 'text-white');
  });

  it('applies size classes correctly', () => {
    render(<AccessibleButton size="lg">Large</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('shows loading state', () => {
    render(<AccessibleButton loading>Loading</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();

    // Check for loading spinner
    const spinner = button.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('is disabled when disabled prop is true', () => {
    render(<AccessibleButton disabled>Disabled</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<AccessibleButton fullWidth>Full width</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('renders with left icon', () => {
    const icon = <span data-testid="left-icon">Icon</span>;
    render(<AccessibleButton leftIcon={icon}>With icon</AccessibleButton>);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const icon = <span data-testid="right-icon">Icon</span>;
    render(<AccessibleButton rightIcon={icon}>With icon</AccessibleButton>);

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies aria-label correctly', () => {
    render(
      <AccessibleButton ariaLabel="Custom label">Button</AccessibleButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies aria-describedby correctly', () => {
    render(
      <div>
        <p id="description">Button description</p>
        <AccessibleButton ariaDescribedBy="description">
          Button
        </AccessibleButton>
      </div>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'description');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>);

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has proper focus styles', () => {
    render(<AccessibleButton>Button</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('supports submit type', () => {
    render(<AccessibleButton type="submit">Submit</AccessibleButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('does not show icon when loading', () => {
    const icon = <span data-testid="icon">Icon</span>;
    render(
      <AccessibleButton loading leftIcon={icon}>
        Loading
      </AccessibleButton>
    );

    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });
});
