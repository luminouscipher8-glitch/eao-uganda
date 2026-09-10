import { Link } from 'react-router-dom';

interface SmoothScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SmoothScrollLink = ({
  to,
  children,
  className,
  onClick,
}: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    // Check if it's a hash link on the same page
    if (to.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        const headerHeight = 80; // Approximate header height
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    // Call any additional onClick handler
    if (onClick) {
      onClick();
    }
  };

  // If it's a hash link, use regular anchor tag
  if (to.startsWith('#')) {
    return (
      <a href={to} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  // For regular navigation links, use React Router's Link
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
