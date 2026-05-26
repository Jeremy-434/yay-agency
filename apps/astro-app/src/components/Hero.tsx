import { useRef } from 'react';
import { gsap, SplitText, ScrollTrigger, useGSAP } from '@lib/gsap-config';

interface HeroProps {
  title1?: string;
  title2?: string;
  subtitle?: string;
  ctaText?: string;
  showDashboard?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title1 = "Invenio Agency",
  title2 = "En Movimiento",
  subtitle = "Automatiza tu funnel de ventas con precisión. Acompañamos al cliente potencial desde el descubrimiento hasta la venta formalizada.",
  ctaText = "Optimizar Funnel",
  showDashboard = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const line1Text = title1;
  const line2Text = title2;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Split Line 1
    const split1 = new SplitText(line1Ref.current, { type: 'chars,words' });
    gsap.set(split1.chars, { opacity: 0, y: 50, rotateX: -90, display: 'inline-block' });

    // Split Line 2 if it exists
    const split2 = new SplitText(line2Ref.current, { type: 'chars,words' });
    gsap.set(split2.chars, { opacity: 0, y: 50, rotateX: -90, display: 'inline-block' });

    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    gsap.set(ctaRef.current, { opacity: 0, scale: 0.8 });

    // Animate Line 1
    tl.to(split1.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 1.2,
      ease: 'expo.out'
    });

    // Animate Line 2
    if (split2) {
      tl.to(split2.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 1.2,
        ease: 'expo.out'
      }, '-=1');
    }

    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.8')
      .to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.8');

    // Parallax background effect
    gsap.to('.parallax-bg', {
      y: () => -ScrollTrigger.maxScroll(window) * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      split1.revert();
      if (split2) split2.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 overflow-hidden px-8"
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

      <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center gap-12">
        <h1 className="text-5xl md:text-8xl font-black text-[var(--color-aether-on-surface)] leading-[1.1] tracking-tighter drop-shadow-2xl">
          <div ref={line1Ref} className="block">{line1Text}</div>
          {line2Text && (
            <div
              ref={line2Ref}
              className="text-gradient-aether block mt-2"
            >
              {line2Text}
            </div>
          )}
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-[var(--color-aether-on-surface-variant)] max-w-2xl font-medium">
          {subtitle}
        </p>

        <button
          ref={ctaRef}
          className="mt-8 px-8 py-4 rounded-full font-bold text-sm text-[var(--color-brand-primary)] bg-[rgb(89,131,146)] shadow-[0_0_30px_rgba(89,131,146,0.3)] hover:bg-[var(--color-brand-cream)] transition-all duration-300 flex items-center gap-2 group border border-white/10"
        >
          {ctaText}
          <span className="material-symbols-outlined text-[var(--color-brand-primary)] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        {showDashboard && (
          <div className="mt-20 w-full max-w-6xl rounded-2xl border border-white/50 bg-white/30 p-4 shadow-2xl backdrop-blur-lg">
            <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-tr from-sky-100 to-sky-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 opacity-40">
                <div className="h-16 w-16 rounded-2xl bg-[var(--color-aether-primary)]" />
                <p className="font-bold text-[var(--color-aether-primary)]">Dashboard Visualization</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
