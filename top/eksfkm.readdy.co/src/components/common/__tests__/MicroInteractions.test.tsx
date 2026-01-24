import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { HoverCard, BounceButton, SlideIn, FadeIn, Typewriter, Counter } from '../MicroInteractions'

describe('HoverCard', () => {
  it('renders children correctly', () => {
    render(
      <HoverCard>
        <div>Test Content</div>
      </HoverCard>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies hover effects on mouse enter', async () => {
    const user = userEvent.setup()
    render(
      <HoverCard>
        <div>Test Content</div>
      </HoverCard>
    )
    
    const card = screen.getByText('Test Content').parentElement
    if (!card) throw new Error('Card element not found')
    
    await user.hover(card)
    expect(card).toHaveClass('scale-105')
  })

  it('removes hover effects on mouse leave', async () => {
    const user = userEvent.setup()
    render(
      <HoverCard>
        <div>Test Content</div>
      </HoverCard>
    )
    
    const card = screen.getByText('Test Content').parentElement
    if (!card) throw new Error('Card element not found')
    
    await user.hover(card)
    expect(card).toHaveClass('scale-105')
    
    await user.unhover(card)
    expect(card).not.toHaveClass('scale-105')
  })
})

describe('BounceButton', () => {
  it('renders button correctly', () => {
    render(
      <BounceButton>
        Click me
      </BounceButton>
    )
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveClass('scale-95')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(
      <BounceButton onClick={handleClick}>
        Click me
      </BounceButton>
    )
    
    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <BounceButton disabled>
        Disabled Button
      </BounceButton>
    )
    
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('applies bounce effect on click', async () => {
    const user = userEvent.setup()
    
    render(
      <BounceButton>
        Click me
      </BounceButton>
    )
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).not.toHaveClass('scale-95')
    
    await user.click(button)
    expect(button).toHaveClass('scale-95')
  })
})

describe('Animation Components', () => {
  it('SlideIn renders children', () => {
    render(
      <SlideIn>
        <div>Slide Content</div>
      </SlideIn>
    )
    
    expect(screen.getByText('Slide Content')).toBeInTheDocument()
  })

  it('FadeIn renders children', () => {
    render(
      <FadeIn>
        <div>Fade Content</div>
      </FadeIn>
    )
    
    expect(screen.getByText('Fade Content')).toBeInTheDocument()
  })

  it('Typewriter renders initial state', () => {
    render(
      <Typewriter text="Hello" />
    )
    
    // Typewriter renders with cursor initially
    const typewriter = document.querySelector('.animate-pulse')
    expect(typewriter).toBeInTheDocument()
  })

  it('Counter renders initial value', () => {
    render(<Counter end={100} />)
    
    const counter = screen.getByText('0')
    expect(counter).toBeInTheDocument()
  })
})
