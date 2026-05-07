import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] font-sans tracking-tight antialiased">
      <div className="flex justify-between items-center px-8 py-5 max-w-[1440px] mx-auto">
        <div className="text-2xl font-black tracking-tighter text-white uppercase font-display">
          Invenio
        </div>
        <nav className="hidden md:flex gap-8">
          <a
            className="text-slate-400 font-medium hover:text-white transition-colors hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            href="#"
            style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            Work
          </a>
          <a
            className="text-slate-400 font-medium hover:text-white transition-colors hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            href="#"
            style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            Services
          </a>
          <a
            className="text-slate-400 font-medium hover:text-white transition-colors hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            href="#"
            style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            About
          </a>
          <a
            className="text-slate-400 font-medium hover:text-white transition-colors hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            href="#"
            style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            Contact
          </a>
        </nav>
        <button className="bg-gradient-to-r from-[var(--color-aether-primary-container)] to-[var(--color-aether-surface-tint)] text-[var(--color-aether-on-primary-container)] px-6 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(207,188,255,0.3)]">
          Start Project
        </button>
      </div>
    </header>
  );
};

export default Navbar;
