import React, { useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap-config';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.bento-item', { opacity: 1, y: 0, rotateX: 0 });
      gsap.set('.section-title', { opacity: 1, x: 0 });
      return;
    }

    const items = gsap.utils.toArray('.bento-item');

    items.forEach((item: any, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 60,
        rotateX: -10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        delay: (i % 3) * 0.1 // Stagger effect based on column
      });
    });

    gsap.from('.section-title', {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: '.section-title',
        start: 'top bottom-=100',
      }
    });
  });

  return (
    <section ref={containerRef} className="py-12 md:py-24 px-5 md:px-8 max-w-[1440px] mx-auto">
      <div className="mb-10 md:mb-16 flex flex-col gap-4 md:flex-row md:justify-between md:items-end section-title">
        <h2 className="text-4xl md:text-6xl font-black text-[var(--color-aether-on-surface)] tracking-tighter">
          Casos de Éxito
        </h2>
        <a className="font-bold text-sm text-[var(--color-aether-surface-tint)] hover:text-[var(--color-aether-primary)] transition-colors flex items-center gap-2 md:whitespace-nowrap" href="#">
          Ver Todos <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
        </a>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[300px]">
        {/* Large Feature */}
        <div className="bento-item col-span-1 md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-0 rounded-3xl overflow-hidden relative group border border-white/10 glass-panel">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-aether-surface-container)] to-[var(--color-aether-surface-container-high)] opacity-80 z-0"></div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-end">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block px-3 py-1 bg-[#141218] border border-[var(--color-aether-surface-tint)] rounded-full text-xs font-bold text-[var(--color-aether-surface-tint)] mb-4 uppercase tracking-widest">
                Motion Design
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">Neon Genesis Redux</h3>
              <p className="text-[var(--color-aether-on-surface-variant)]">Immersive 3D web experience</p>
            </div>
          </div>
        </div>

        {/* Tall Item */}
        <div className="bento-item col-span-1 md:col-span-1 md:row-span-2 min-h-[260px] md:min-h-0 rounded-3xl overflow-hidden relative group border border-white/10 glass-panel">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-aether-primary)]/20 to-transparent z-0"></div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-[var(--color-aether-surface-tint)] bg-white/5 p-2 rounded-full backdrop-blur-md">play_arrow</span>
            </div>
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block px-3 py-1 bg-[#141218] border border-[var(--color-aether-surface-tint)] rounded-full text-xs font-bold text-[var(--color-aether-surface-tint)] mb-4 uppercase tracking-widest">
                Video
              </span>
              <h3 className="text-2xl font-bold text-white">Vimeo Originals</h3>
            </div>
          </div>
        </div>

        {/* Standard Item 1 */}
        <div className="bento-item md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group p-8 flex flex-col justify-end border border-white/10 glass-panel">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-aether-surface-container-high)] to-[var(--color-aether-surface-container)] opacity-50 z-0"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-[#141218] border border-[var(--color-aether-surface-tint)] rounded-full text-xs font-bold text-[var(--color-aether-surface-tint)] mb-4 uppercase tracking-widest">
              Branding
            </span>
            <h3 className="text-xl font-bold text-white">Aura Fragrance</h3>
          </div>
        </div>

        {/* Standard Item 2 */}
        <div className="bento-item md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group p-8 flex flex-col justify-end border border-white/10 glass-panel">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-aether-tertiary)]/20 to-transparent z-0"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-[#141218] border border-[var(--color-aether-surface-tint)] rounded-full text-xs font-bold text-[var(--color-aether-surface-tint)] mb-4 uppercase tracking-widest">
              UI/UX
            </span>
            <h3 className="text-xl font-bold text-white">Fintech App</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
