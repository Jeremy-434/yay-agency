import React from 'react';

interface GradientButtonProps {
  label: string;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  href,
  type = 'button',
  onClick,
  className = '',
}) => {
  const baseStyles =
    'rounded-full px-8 py-4 min-h-[48px] bg-gradient-to-r from-[var(--color-redesign-cyan)] to-[var(--color-redesign-emerald)] text-[#0a0a0a] font-black uppercase tracking-widest text-sm shadow-[var(--shadow-glow-cyan)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-redesign-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] cursor-pointer border-0';

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    // Default: dispatch survey event
    window.dispatchEvent(new CustomEvent('open-survey'));
  };

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} inline-block text-center no-underline ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${baseStyles} ${className}`}
    >
      {label}
    </button>
  );
};

export default GradientButton;
