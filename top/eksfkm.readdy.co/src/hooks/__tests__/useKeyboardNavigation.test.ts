import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  useKeyboardNavigation,
  useFocusManagement,
} from '../useKeyboardNavigation';

describe('useKeyboardNavigation', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    vi.clearAllMocks();
  });

  it('should add keyboard event listener', () => {
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener');

    renderHook(() => useKeyboardNavigation({ current: mockElement }, {}));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('should call onEscape when Escape key is pressed', () => {
    const onEscape = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onEscape })
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    mockElement.dispatchEvent(event);

    expect(onEscape).toHaveBeenCalled();
  });

  it('should call onEnter when Enter key is pressed', () => {
    const onEnter = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onEnter })
    );

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    mockElement.dispatchEvent(event);

    expect(onEnter).toHaveBeenCalled();
  });

  it('should call onArrowUp when ArrowUp key is pressed', () => {
    const onArrowUp = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onArrowUp })
    );

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    mockElement.dispatchEvent(event);

    expect(onArrowUp).toHaveBeenCalled();
  });

  it('should call onArrowDown when ArrowDown key is pressed', () => {
    const onArrowDown = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onArrowDown })
    );

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    mockElement.dispatchEvent(event);

    expect(onArrowDown).toHaveBeenCalled();
  });

  it('should call onTab when Tab key is pressed', () => {
    const onTab = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onTab })
    );

    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    mockElement.dispatchEvent(event);

    expect(onTab).toHaveBeenCalled();
  });

  it('should call onShiftTab when Shift+Tab is pressed', () => {
    const onShiftTab = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onShiftTab })
    );

    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    mockElement.dispatchEvent(event);

    expect(onShiftTab).toHaveBeenCalled();
  });

  it('should not call handlers when disabled', () => {
    const onEscape = vi.fn();

    renderHook(() =>
      useKeyboardNavigation(
        { current: mockElement },
        { onEscape, enabled: false }
      )
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    mockElement.dispatchEvent(event);

    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should prevent default for handled keys', () => {
    const onEscape = vi.fn();
    const preventDefaultSpy = vi.fn();

    renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, { onEscape })
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    Object.defineProperty(event, 'preventDefault', {
      value: preventDefaultSpy,
    });
    mockElement.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useKeyboardNavigation({ current: mockElement }, {})
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });
});

describe('useFocusManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set focus on element', () => {
    const { result } = renderHook(() => useFocusManagement());
    const element = document.createElement('button');

    // Mock the focus method
    const focusMock = vi.fn();
    element.focus = focusMock;

    // Mock requestAnimationFrame properly
    const rafMock = vi.fn((_cb: FrameRequestCallback) => 1);
    globalThis.requestAnimationFrame = rafMock;

    result.current.setFocus(element);

    // Manually call the callback to simulate requestAnimationFrame
    if (rafMock.mock.calls.length > 0) {
      const callback = rafMock.mock.calls[0][0];
      callback(0);
    }

    expect(focusMock).toHaveBeenCalled();
  });

  it('should restore focus on element', () => {
    const { result } = renderHook(() => useFocusManagement());
    const element = document.createElement('button');

    // Mock the focus method
    const focusMock = vi.fn();
    element.focus = focusMock;

    // Mock requestAnimationFrame properly
    const rafMock = vi.fn((_cb: FrameRequestCallback) => 1);
    globalThis.requestAnimationFrame = rafMock;

    result.current.restoreFocus(element);

    // Manually call the callback to simulate requestAnimationFrame
    if (rafMock.mock.calls.length > 0) {
      const callback = rafMock.mock.calls[0][0];
      callback(0);
    }

    expect(focusMock).toHaveBeenCalled();
  });

  it('should trap focus within container', () => {
    const { result } = renderHook(() => useFocusManagement());
    const container = document.createElement('div');

    // Create focusable elements
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    container.appendChild(button1);
    container.appendChild(button2);

    const addEventListenerSpy = vi.spyOn(container, 'addEventListener');

    const cleanup = result.current.trapFocus(container);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(typeof cleanup).toBe('function');
  });

  it('should handle tab key cycling in focus trap', () => {
    const { result } = renderHook(() => useFocusManagement());
    const container = document.createElement('div');

    // Create focusable elements
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    container.appendChild(button1);
    container.appendChild(button2);

    // Mock activeElement
    Object.defineProperty(document, 'activeElement', {
      value: button1,
      writable: true,
    });

    const focusSpy1 = vi.spyOn(button1, 'focus');
    vi.spyOn(button2, 'focus');

    result.current.trapFocus(container);

    // Simulate Tab key on last element
    Object.defineProperty(document, 'activeElement', {
      value: button2,
      writable: true,
    });

    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    container.dispatchEvent(event);

    expect(focusSpy1).toHaveBeenCalled();
  });

  it('should handle shift+tab key cycling in focus trap', () => {
    const { result } = renderHook(() => useFocusManagement());
    const container = document.createElement('div');

    // Create focusable elements
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    container.appendChild(button1);
    container.appendChild(button2);

    // Mock activeElement
    Object.defineProperty(document, 'activeElement', {
      value: button2,
      writable: true,
    });

    vi.spyOn(button1, 'focus');
    const focusSpy2 = vi.spyOn(button2, 'focus');

    result.current.trapFocus(container);

    // Simulate Shift+Tab key on first element
    Object.defineProperty(document, 'activeElement', {
      value: button1,
      writable: true,
    });

    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    container.dispatchEvent(event);

    expect(focusSpy2).toHaveBeenCalled();
  });
});
