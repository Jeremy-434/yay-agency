import { useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap-config';
import GlowCard from '../ui/GlowCard';

const TestimonialsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = cardsRef.current?.querySelectorAll('.testimonial-card');

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

  const testimonials = [
    {
      title: '"Escalabilidad sin fricción"',
      quote: 'El agente de IA maneja el 80% de las consultas de precios y agenda directamente a los pacientes, liberando a nuestra recepción.',
      name: 'Daniel',
    },
    {
      title: '"Control total de la operativa"',
      quote: 'Por primera vez tenemos visibilidad exacta de dónde se pierde cada prospecto, y los protocolos automáticos lo solucionan al instante.',
      name: 'Carlos',
    },
    {
      title: '"Crecimiento sin aumentar la nómina"',
      quote: 'Antes de Invenio, necesitábamos tres personas en recepción solo para contestar WhatsApp. Ahora, sus agentes de IA califican y agendan a los pacientes mientras nosotros dormimos. Hemos duplicado nuestra capacidad de atención sin contratar a un solo administrativo adicional.',
      name: 'Karen',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative z-10 py-20 md:py-32 px-6 md:px-8 bg-[var(--color-redesign-bg)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] leading-tight">
            Otras clínicas ya tienen sus sistemas en piloto automático.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="testimonial-card"
              style={{ opacity: 0, transform: 'translateY(60px)' }}
            >
              <GlowCard>
                <h3 className="text-lg md:text-xl font-bold text-[var(--color-redesign-emerald)] mb-4">
                  {testimonial.title}
                </h3>
                <p className="text-base text-white/80 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm md:text-base font-semibold text-[var(--color-text-primary)]">
                  — {testimonial.name}
                </p>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
