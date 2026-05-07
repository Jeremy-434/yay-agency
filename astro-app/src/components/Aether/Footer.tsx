import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 relative w-full py-24 px-8 border-t border-white/5 flex flex-col items-center justify-center text-center space-y-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter">
          Let's move together
        </h2>
        <button className="bg-gradient-to-r from-[var(--color-aether-primary-container)] to-[var(--color-aether-surface-tint)] text-[var(--color-aether-on-primary-container)] px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(207,188,255,0.3)] mb-16">
          Contact Us
        </button>
        <div className="text-4xl font-black text-white mb-8 tracking-tighter uppercase">
          AETHER
        </div>
        <nav className="flex flex-wrap justify-center gap-8 mb-12 text-sm tracking-widest uppercase font-bold">
          <a className="text-slate-500 hover:text-[var(--color-aether-surface-tint)] hover:translate-x-1 transition-all duration-300" href="#">Instagram</a>
          <a className="text-slate-500 hover:text-[var(--color-aether-surface-tint)] hover:translate-x-1 transition-all duration-300" href="#">LinkedIn</a>
          <a className="text-slate-500 hover:text-[var(--color-aether-surface-tint)] hover:translate-x-1 transition-all duration-300" href="#">Behance</a>
          <a className="text-slate-500 hover:text-[var(--color-aether-surface-tint)] hover:translate-x-1 transition-all duration-300" href="#">Vimeo</a>
        </nav>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 text-xs tracking-widest uppercase font-bold">
          © 2024 AETHER MOTION. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
