import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@lib/gsap-config';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;

    // Split text for animation
    const split = new SplitText(titleRef.current, { type: 'chars,words' });
    
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Initial state
    gsap.set(split.chars, { opacity: 0, y: 50, rotateX: -90 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    gsap.set(ctaRef.current, { opacity: 0, scale: 0.8 });

    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 1.5,
      ease: 'expo.out'
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=1')
    .to(ctaRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.8');

    // Parallax background effect
    gsap.to('.parallax-bg', {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => split.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden px-8"
    >
      {/* Animated Gradient Orbs Background */}
      <div className="absolute inset-0 z-0 parallax-bg opacity-30 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-[var(--color-aether-primary)] to-[var(--color-aether-surface-tint)] blur-[100px] mix-blend-screen opacity-50"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-l from-[var(--color-aether-tertiary)] to-[var(--color-aether-error)] blur-[120px] mix-blend-screen opacity-40"
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-12">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-[var(--color-aether-on-surface)] leading-[1.1] tracking-tighter">
          Invenio Agency <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-aether-primary)] to-[var(--color-aether-on-primary-container)]">
            En Movimiento
          </span>
        </h1>
        <p ref={subtitleRef} className="text-lg md:text-xl text-[var(--color-aether-on-surface-variant)] max-w-2xl font-medium">
          Automatiza tu funnel de ventas con precisión. Acompañamos al cliente potencial desde el descubrimiento hasta la venta formalizada.
        </p>
        <button
          ref={ctaRef}
          className="mt-8 glass-panel px-8 py-4 rounded-full font-bold text-sm text-[var(--color-aether-on-surface)] shadow-[0_0_30px_rgba(89,131,146,0.2)] hover:bg-[var(--color-aether-surface-container-high)] transition-all duration-300 flex items-center gap-2 group border border-white/10 backdrop-blur-xl"
        >
          Optimizar Funnel
          <span className="material-symbols-outlined text-[var(--color-aether-primary)] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
