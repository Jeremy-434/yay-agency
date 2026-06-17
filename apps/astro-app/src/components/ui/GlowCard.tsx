import React from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-2xl bg-[var(--color-redesign-bg-card)] border border-[var(--color-redesign-border)] shadow-[var(--shadow-card-cyan)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 p-8 md:p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlowCard;
