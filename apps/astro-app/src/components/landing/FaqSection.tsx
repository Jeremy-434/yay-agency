import { useState, useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap-config';
import GlowCard from '../ui/GlowCard';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const faqs = [
    {
      q: '¿Mi equipo o yo tendremos que aprender a usar programas complicados?',
      a: 'Para nada. Nosotros nos encargamos de absolutamente todo el montaje técnico. Usted y su equipo no necesitan aprender tecnologías complejas ni perder tiempo en capacitaciones largas, ya que solo gestionarán las citas desde una interfaz centralizada y muy fácil de usar.',
    },
    {
      q: '¿Qué pasa si el sistema no me genera los resultados esperados?',
      a: 'El riesgo corre por nuestra cuenta y queda respaldado por contrato. Garantizamos un mínimo de 15 agendamientos efectivos en sus primeros 30 días de pauta activa. Si por alguna razón no alcanzamos esa meta, trabajamos el mes siguiente de forma completamente gratuita hasta lograrlo, exonerándolo del pago de la mensualidad.',
    },
    {
      q: 'Ya estoy muy saturado en la clínica, ¿esto me quitará más tiempo?',
      a: 'Al contrario, este sistema fue diseñado exactamente para rescatar su tiempo y sacarlo del rol de todero. Los Agentes de IA y las automatizaciones trabajan de forma independiente las 24/7. El ecosistema atiende, filtra y agenda a los pacientes de manera automática para que usted pueda concentrarse solo en sus consultas médicas.',
    },
    {
      q: '¿Me encontraré con costos ocultos o sorpresas en la factura?',
      a: 'Transparencia total desde el primer día. Su tarifa base mensual ya incluye el mantenimiento técnico y las licencias base del CRM y la API de WhatsApp. Los únicos valores externos son el presupuesto que usted decida invertir directamente en publicidad de Meta o Google y los consumos variables de tokens de IA al final del mes.',
    },
    {
      q: '¿El uso de Inteligencia Artificial no hará que la atención a mis pacientes se sienta muy fría o robótica?',
      a: 'Para nada, ya que nos alejamos por completo del típico cliché del robot inteligente y brillante. Programamos el sistema con un discurso claro, directo y humano que clona al mejor vendedor. De esta manera, el interesado recibe una atención de alto valor.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative z-10 py-20 md:py-32 px-6 md:px-8 bg-[var(--color-redesign-bg)]"
    >
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] leading-tight">
            Preguntas Frecuentes
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
          {faqs.map((faq, idx) => (
            <GlowCard key={idx}>
              <button
                className="w-full text-left flex items-start justify-between gap-4 focus-visible:ring-2 focus-visible:ring-[var(--color-redesign-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] rounded px-0 py-0"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="text-lg md:text-base font-semibold text-[var(--color-text-primary)] leading-tight">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[var(--color-redesign-cyan)] flex items-center justify-center transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  <span className="text-[var(--color-redesign-cyan)] font-bold">+</span>
                </span>
              </button>

              {/* Answer Panel */}
              <div
                id={`faq-answer-${idx}`}
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}
                role="region"
              >
                <p className="text-base text-white/80 leading-relaxed pt-4 border-t border-[var(--color-redesign-border)]">
                  {faq.a}
                </p>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Final CTA Button */}
        <div className="text-center mb-10">
          <button
            className="rounded-full px-8 py-4 min-h-[48px] bg-gradient-to-r from-[var(--color-redesign-cyan)] to-[var(--color-redesign-emerald)] text-[#0a0a0a] font-black uppercase tracking-widest text-sm shadow-[var(--shadow-glow-cyan)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-redesign-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            onClick={() => window.dispatchEvent(new CustomEvent('open-survey'))}
          >
            Automatizar mi clínica
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

export default FaqSection;
