import { useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap-config';

const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(contentRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-8 bg-[var(--color-redesign-bg)]"
    >
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto text-center"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-8 md:mb-10 leading-tight">
          ¿Cansado de ver huecos en su calendario por culpa de pacientes que agendan y no asisten?
        </h2>

        <p className="text-base md:text-lg text-white/80 mb-12 md:mb-16 leading-relaxed">
          Las agencias comunes le cobran un costoso trabajo que no filtra curiosos. Nuestro sistema pre-construido integra un CRM de calificación que separa a los preguntones de los prospectos listos para compra.
        </p>

        <button
          className="rounded-full px-8 py-4 min-h-[48px] bg-gradient-to-r from-[var(--color-redesign-cyan)] to-[var(--color-redesign-emerald)] text-[#0a0a0a] font-black uppercase tracking-widest text-sm shadow-[var(--shadow-glow-cyan)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-redesign-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          onClick={() => window.dispatchEvent(new CustomEvent('open-survey'))}
        >
          Ver demostración gratis
        </button>
      </div>
    </section>
  );
};

export default ProblemSection;
