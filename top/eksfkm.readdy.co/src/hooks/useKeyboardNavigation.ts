import { useEffect, useCallback } from 'react'

interface KeyboardNavigationOptions {
  onEscape?: () => void
  onEnter?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: () => void
  onShiftTab?: () => void
  enabled?: boolean
}

export function useKeyboardNavigation(
  elementRef: React.RefObject<HTMLElement>,
  options: KeyboardNavigationOptions = {}
) {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    onShiftTab,
    enabled = true
  } = options

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return

    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        onEscape?.()
        break
      case 'Enter':
        event.preventDefault()
        onEnter?.()
        break
      case 'ArrowUp':
        event.preventDefault()
        onArrowUp?.()
        break
      case 'ArrowDown':
        event.preventDefault()
        onArrowDown?.()
        break
      case 'ArrowLeft':
        event.preventDefault()
        onArrowLeft?.()
        break
      case 'ArrowRight':
        event.preventDefault()
        onArrowRight?.()
        break
      case 'Tab':
        if (event.shiftKey) {
          onShiftTab?.()
        } else {
          onTab?.()
        }
        break
    }
  }, [enabled, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onShiftTab])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    element.addEventListener('keydown', handleKeyDown)
    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [elementRef, handleKeyDown, enabled])
}

// Focus management utilities
export function useFocusManagement() {
  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    return () => container.removeEventListener('keydown', handleTabKey)
  }, [])

  const setFocus = useCallback((element: HTMLElement | null) => {
    if (element) {
      requestAnimationFrame(() => {
        element.focus()
      })
    }
  }, [])

  const restoreFocus = useCallback((element: HTMLElement | null) => {
    if (element) {
      requestAnimationFrame(() => {
        element.focus()
      })
    }
  }, [])

  return {
    trapFocus,
    setFocus,
    restoreFocus
  }
}

// Skip link functionality
export function useSkipLink() {
  useEffect(() => {
    const handleSkipLink = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.target === document.body) {
        // Show skip link when user tabs from the top
        const skipLink = document.getElementById('skip-to-main')
        if (skipLink) {
          skipLink.style.display = 'block'
        }
      }
    }

    document.addEventListener('keydown', handleSkipLink)
    return () => document.removeEventListener('keydown', handleSkipLink)
  }, [])
}
