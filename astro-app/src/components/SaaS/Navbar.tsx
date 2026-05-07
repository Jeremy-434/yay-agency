import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-full border border-white/20 bg-white/70 px-6 py-3 shadow-saas backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]" />
          <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] font-display">Invenio Agency</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[var(--color-text-secondary)]">
          <a href="#features" className="hover:text-[var(--color-brand-primary)] transition-colors cursor-pointer">Features</a>
          <a href="#testimonials" className="hover:text-[var(--color-brand-primary)] transition-colors cursor-pointer">Customers</a>
          <a href="#pricing" className="hover:text-[var(--color-brand-primary)] transition-colors cursor-pointer">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-bold text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors cursor-pointer">
            Login
          </button>
          <button className="rounded-full bg-[var(--color-brand-accent)] px-5 py-2 text-sm font-bold text-white shadow-md hover:scale-105 transition-all cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
