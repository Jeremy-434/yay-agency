import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap-config';

const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.cta-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--color-brand-primary)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/20 to-transparent" />
      
      <div className="cta-content mx-auto max-w-4xl text-center text-white">
        <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-5xl font-display">
          Ready to scale your business?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-sky-50 opacity-90 sm:text-xl">
          Join 10,000+ companies using Yay SaaS to streamline their operations and grow faster.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-full bg-white px-10 py-4 text-lg font-bold text-[var(--color-brand-primary)] shadow-xl hover:scale-105 transition-all cursor-pointer">
            Get Started Now
          </button>
          <button className="rounded-full border border-white/30 bg-white/10 px-10 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
            Talk to Sales
          </button>
        </div>
        <p className="mt-8 text-sm font-medium text-sky-100 opacity-80">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
