import { useState, useEffect } from 'react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  shadow?: boolean;
}

export function HoverCard({
  children,
  className = '',
  scale = 1.05,
  shadow = true,
}: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        transition-all duration-300 ease-out cursor-pointer
        ${isHovered ? `scale-${scale === 1.05 ? '105' : Math.round(scale * 100)}` : 'scale-100'}
        ${shadow && isHovered ? 'shadow-xl' : 'shadow-md'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

interface BounceButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function BounceButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: BounceButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsPressed(true);
      onClick?.();
      setTimeout(() => setIsPressed(false), 200);
    }
  };

  return (
    <button
      className={`
        transition-transform duration-150 ease-out
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 500,
  className = '',
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    switch (direction) {
      case 'up':
        return 'translateY(20px)';
      case 'down':
        return 'translateY(-20px)';
      case 'left':
        return 'translateX(20px)';
      case 'right':
        return 'translateX(-20px)';
      default:
        return 'translateY(20px)';
    }
  };

  return (
    <div
      className={`
        transition-all ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 300,
  className = '',
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transition-opacity ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        onComplete?.();
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const updateCounter = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentCount = Math.floor(progress * end);

        setCount(currentCount);

        if (now < endTime) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [end, duration, delay]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
