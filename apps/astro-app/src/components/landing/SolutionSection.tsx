import { useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap-config';
import GlowCard from '../ui/GlowCard';

const SolutionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = cardsRef.current?.querySelectorAll('.solution-card');

    if (prefersReducedMotion) {
      if (cards) gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    if (!cards) return;

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  const features = [
    {
      title: 'Agentes de IA 24/7',
      description: 'Disfrute máxima tranquilidad con Agentes de IA que atienden en 5 minutos, recuperando el control de su tiempo.',
    },
    {
      title: 'CRM de calificación inteligente',
      description: 'Tome el control absoluto de su negocio usando un CRM inteligente que separa curiosos de pacientes reales.',
    },
    {
      title: 'Ecosistema All-in-One pre-construido',
      description: 'Logre que su clínica funcione en piloto automático instalando nuestra infraestructura tecnológica pre-construida y totalmente integrada.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-8 bg-[var(--color-redesign-bg)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-6 md:mb-8 leading-tight">
            La realidad es que el marketing tradicional ya no funciona igual.
          </h2>
          <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-[var(--color-redesign-cyan)] mb-4">
            Componentes Estratégicos de Alto Rendimiento
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="solution-card opacity-0 translate-y-12">
              <GlowCard>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </GlowCard>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mb-10">
          <button
            className="rounded-full px-8 py-4 min-h-[48px] bg-gradient-to-r from-[var(--color-redesign-cyan)] to-[var(--color-redesign-emerald)] text-[#0a0a0a] font-black uppercase tracking-widest text-sm shadow-[var(--shadow-glow-cyan)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-redesign-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            onClick={() => window.dispatchEvent(new CustomEvent('open-survey'))}
          >
            Escalar operaciones
          </button>
        </div>

        {/* Bottom Caption */}
        <p className="text-center text-sm md:text-base text-[var(--color-text-muted)]">
          Despliegue rápido sin interrupción de tus operaciones actuales.
        </p>
      </div>
    </section>
  );
};

export default SolutionSection;
