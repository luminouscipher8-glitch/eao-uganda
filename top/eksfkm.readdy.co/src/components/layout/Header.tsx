import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  useKeyboardNavigation,
  useFocusManagement,
} from '../../hooks/useKeyboardNavigation';
import AccessibleButton from '../common/AccessibleButton';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { trapFocus } = useFocusManagement();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const cleanup = trapFocus(mobileMenuRef.current);
      return cleanup;
    }
  }, [isOpen, trapFocus]);

  // Keyboard navigation for mobile menu
  useKeyboardNavigation(mobileMenuRef, {
    onEscape: () => setIsOpen(false),
    enabled: isOpen,
  });

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/blog', label: 'Blog' },
    { path: '/shop', label: 'Shop' },
    { path: '/get-involved', label: 'Get Involved' },
    { path: '/partners', label: 'Partners' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200'
          : 'bg-white/60 backdrop-blur-md border-b border-white/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <img
              src="/images/logo-1024.png"
              alt="Educate an Orphan Uganda Logo"
              className="w-24 h-24 transition-all duration-300"
            />
            <div className="hidden md:block">
              <div
                className={`text-xl font-bold transition-colors duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-gray-900'
                }`}
              >
                Educate an Orphan
              </div>
              <div
                className={`text-xs transition-colors duration-300 ${
                  scrolled ? 'text-gray-600' : 'text-gray-700'
                }`}
              >
                Uganda
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium transition-colors duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
                  location.pathname === link.path
                    ? scrolled
                      ? 'text-teal-600'
                      : 'text-teal-700'
                    : scrolled
                      ? 'text-gray-700 hover:text-teal-600'
                      : 'text-gray-800 hover:text-teal-600'
                }`}
                aria-current={
                  location.pathname === link.path ? 'page' : undefined
                }
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <AccessibleButton
            to="/donate"
            variant="primary"
            className="hidden lg:inline-block shadow-md hover:shadow-lg hover:scale-105"
            ariaLabel="Donate to support education in Uganda"
          >
            Donate Now
          </AccessibleButton>

          {/* Mobile Menu Button */}
          <AccessibleButton
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className={`lg:hidden w-10 h-10 rounded-lg ${
              scrolled
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-gray-900 hover:bg-white/50'
            }`}
            ariaLabel={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isOpen}
          >
            <i
              className={`${isOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}
              aria-hidden="true"
            ></i>
          </AccessibleButton>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden py-6 border-t border-gray-200 bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    location.pathname === link.path
                      ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                  }`}
                  aria-current={
                    location.pathname === link.path ? 'page' : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-6 px-4">
              <AccessibleButton
                to="/donate"
                variant="primary"
                fullWidth
                ariaLabel="Donate to support education in Uganda"
              >
                Donate Now
              </AccessibleButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
