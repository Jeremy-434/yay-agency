import { useRef } from 'react';
import { gsap, SplitText, ScrollTrigger, useGSAP } from '@lib/gsap-config';
import GradientButton from '../ui/GradientButton';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(
        [headlineRef.current, subheadlineRef.current, bulletsRef.current, buttonRef.current, videoRef.current, captionRef.current],
        { opacity: 1, y: 0 }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Headline split text animation
    const split = new SplitText(headlineRef.current, { type: 'chars,words' });
    gsap.set(split.chars, { opacity: 0, y: 50, rotateX: -90, display: 'inline-block' });

    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 1.2,
      ease: 'expo.out',
    });

    // Animate secondary elements
    tl.to(
      [subheadlineRef.current, bulletsRef.current, buttonRef.current, videoRef.current, captionRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=0.8'
    );

    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden px-6 md:px-8"
      style={{ background: 'var(--color-redesign-bg)' }}
    >
      {/* Contact Email Pill */}
      <div className="mb-8 md:mb-12">
        <div className="inline-block border border-[var(--color-redesign-cyan)] rounded-full px-6 py-2 text-xs md:text-sm font-medium text-[var(--color-redesign-cyan)] opacity-75">
          contact@contact.invenioagency.com
        </div>
      </div>

      {/* Main Headline */}
      <h1
        ref={headlineRef}
        className="text-4xl md:text-7xl lg:text-8xl font-black text-[var(--color-text-primary)] leading-[1.1] tracking-tight text-center max-w-5xl mb-8 md:mb-12"
      >
        Elimina el estrés operativo en 30 días con IA.
      </h1>

      {/* Subheadline */}
      <p
        ref={subheadlineRef}
        className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl text-center mb-10 md:mb-14 opacity-0 translate-y-6 leading-relaxed"
      >
        No dejes que la recepción lenta deje huecos en tu agenda. Conecta una infraestructura impulsada por IA que califica y agenda citas automáticamente 24/7. Regístrate para conocer nuestro sistema
      </p>

      {/* Trust Badges */}
      <div
        ref={bulletsRef}
        className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center text-sm md:text-base text-[var(--color-text-secondary)] mb-12 md:mb-16 opacity-0 translate-y-6"
      >
        <div>✓ Garantía por contrato</div>
        <div>✓ Agentes IA 24/7</div>
      </div>

      {/* CTA Button */}
      <div
        ref={buttonRef}
        className="mb-12 md:mb-16 opacity-0 translate-y-6"
      >
        <button
          className="rounded-full px-8 py-4 min-h-[48px] bg-gradient-to-r from-[var(--color-redesign-cyan)] to-[var(--color-redesign-emerald)] text-[#0a0a0a] font-black uppercase tracking-widest text-sm shadow-[var(--shadow-glow-cyan)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-redesign-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          onClick={() => window.dispatchEvent(new CustomEvent('open-survey'))}
        >
          Automatizar mi clínica
        </button>
      </div>

      {/* Video Placeholder */}
      <div
        ref={videoRef}
        className="w-full max-w-4xl aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1a1a] to-[#0a0a0a] flex items-center justify-center mb-12 md:mb-16 opacity-0 translate-y-6 overflow-hidden"
        role="img"
        aria-label="Demo de la plataforma Invenio"
      >
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-redesign-cyan)] flex items-center justify-center opacity-60">
          <span className="material-symbols-outlined text-[var(--color-redesign-cyan)] text-3xl">play_arrow</span>
        </div>
      </div>

      {/* Bottom Caption */}
      <p
        ref={captionRef}
        className="text-center text-sm md:text-base text-[var(--color-text-muted)] max-w-2xl opacity-0 translate-y-6"
      >
        Recupere el control de su tiempo y de su facturación sin aprender programas complicados.
      </p>
    </section>
  );
};

export default HeroSection;
