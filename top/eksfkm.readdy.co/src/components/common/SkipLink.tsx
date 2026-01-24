import { useState, useEffect } from 'react'

interface SkipLinkProps {
  href: string
  children: string
  className?: string
}

export default function SkipLink({ href, children, className = '' }: SkipLinkProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true)
      }
    }

    const handleMouseDown = () => {
      setIsVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector(href) as HTMLElement
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
        bg-amber-500 text-white px-4 py-2 rounded-md font-medium
        z-50 transition-all duration-200
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
    >
      {children}
    </a>
  )
}
