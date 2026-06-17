import React, { useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap-config';

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.service-card', { opacity: 1, y: 0 });
      gsap.set('.services-title', { opacity: 1, scale: 1 });
      return;
    }

    gsap.from('.service-card', {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.services-title', {
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.services-title',
        start: 'top bottom-=50',
      }
    });
  });

  return (
    <section ref={containerRef} className="py-10 px-5 md:px-8 bg-[var(--color-aether-surface-container-lowest)]/30 relative">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-7xl font-black text-center text-[var(--color-aether-on-surface)] mb-8 md:mb-10 services-title tracking-tighter">
          Nuestras Capacidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Service Card 1 */}
          <div className="service-card glass-panel rounded-3xl p-4 md:p-6 hover:bg-[var(--color-aether-surface-container-high)] transition-colors duration-500 group border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-aether-surface-container-low)] flex items-center justify-center mb-6 md:mb-10 border border-white/5 group-hover:border-[var(--color-aether-surface-tint)] transition-colors relative z-10">
              <span className="material-symbols-outlined text-3xl text-[var(--color-aether-surface-tint)]">psychology</span>
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-aether-on-surface)] mb-4 md:mb-6 relative z-10">Agentes de IA</h3>
            <p className="text-lg text-[var(--color-aether-on-surface-variant)] mb-6 md:mb-10 relative z-10">Construimos sistemas inteligentes que califican y convierten leads 24/7 sin intervención humana.</p>
            <ul className="space-y-4 text-[var(--color-aether-on-surface)] relative z-10 font-medium mb-6 md:mb-10">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Chatbots Avanzados
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Agentes de Voz IA
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Automatización LLM
              </li>
            </ul>
            <button className="cta-button px-6 py-3 rounded-full text-sm font-bold text-[var(--color-brand-primary)] bg-[rgb(89,131,146)] hover:bg-[var(--color-brand-cream)] transition-all z-10 relative">Saber más</button>
          </div>

          {/* Service Card 2 */}
          <div className="service-card glass-panel rounded-3xl p-4 md:p-6 hover:bg-[var(--color-aether-surface-container-high)] transition-colors duration-500 group border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-aether-primary)]/5 to-transparent rounded-3xl pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-aether-surface-container-low)] flex items-center justify-center mb-6 md:mb-10 border border-white/5 group-hover:border-[var(--color-aether-surface-tint)] transition-colors relative z-10">
              <span className="material-symbols-outlined text-3xl text-[var(--color-aether-surface-tint)]">hub</span>
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-aether-on-surface)] mb-4 md:mb-6 relative z-10">Automatización</h3>
            <p className="text-lg text-[var(--color-aether-on-surface-variant)] mb-6 md:mb-10 relative z-10">Optimizamos cada punto de contacto. Sin pasos innecesarios, solo un camino limpio a la conversión.</p>
            <ul className="space-y-4 text-[var(--color-aether-on-surface)] relative z-10 font-medium mb-6 md:mb-10">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Integración CRM
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> GoHighLevel Expert
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Workflows de Ventas
              </li>
            </ul>
            <button className="cta-button px-6 py-3 rounded-full text-sm font-bold text-[var(--color-brand-primary)] bg-[rgb(89,131,146)] hover:bg-[var(--color-brand-cream)] transition-all z-10 relative">Saber más</button>
          </div>

          {/* Service Card 3 */}
          <div className="service-card glass-panel rounded-3xl p-4 md:p-6 hover:bg-[var(--color-aether-surface-container-high)] transition-colors duration-500 group border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-aether-surface-container-low)] flex items-center justify-center mb-6 md:mb-10 border border-white/5 group-hover:border-[var(--color-aether-surface-tint)] transition-colors relative z-10">
              <span className="material-symbols-outlined text-3xl text-[var(--color-aether-surface-tint)]">insights</span>
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-aether-on-surface)] mb-4 md:mb-6 relative z-10">Estrategia</h3>
            <p className="text-lg text-[var(--color-aether-on-surface-variant)] mb-6 md:mb-10 relative z-10">Diseñamos funnels de alto rendimiento basados en datos y psicología de conversión.</p>
            <ul className="space-y-4 text-[var(--color-aether-on-surface)] relative z-10 font-medium mb-6 md:mb-10">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Landing Pages
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Performance Marketing
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--color-aether-surface-tint)] rounded-full shadow-[0_0_8px_var(--color-aether-surface-tint)]"></div> Optimización de Funnel
              </li>
            </ul>
            <button className="cta-button glass-panel px-6 py-3 rounded-full text-sm font-bold text-[var(--color-aether-on-surface)] hover:bg-[var(--color-aether-surface-container-highest)] transition-all z-10 relative">Saber más</button>
          </div>        </div>
      </div>
    </section >
  );
};

export default Services;
