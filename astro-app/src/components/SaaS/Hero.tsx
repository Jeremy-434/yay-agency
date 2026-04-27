import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@lib/gsap-config';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;

    const split = new SplitText(titleRef.current, { type: 'words,chars' });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(split.chars, {
      opacity: 0,
      y: 20,
      rotateX: -30,
      stagger: 0.02,
      duration: 1,
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
    .from(ctaRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4');

    return () => split.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[var(--color-brand-primary)]/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-4xl">
        <h1 ref={titleRef} className="mb-6 text-5xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-7xl font-display leading-[1.1]">
          Everything you need to <span className="text-[var(--color-brand-primary)]">scale faster</span>
        </h1>
        <p ref={subtitleRef} className="mx-auto mb-10 max-w-2xl text-lg font-medium text-[var(--color-text-secondary)] sm:text-xl leading-relaxed">
          The all-in-one platform for modern teams. Manage your projects, automate workflows, and grow your business with Yay SaaS.
        </p>
        <div ref={ctaRef} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-full bg-[var(--color-brand-primary)] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 hover:shadow-sky-500/40 transition-all cursor-pointer">
            Start Free Trial
          </button>
          <button className="flex items-center gap-2 rounded-full border border-[var(--color-brand-primary)]/20 bg-white/50 px-8 py-4 text-lg font-bold text-[var(--color-brand-primary)] backdrop-blur-sm hover:bg-white transition-all cursor-pointer">
            View Demo
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Image / Illustration Placeholder */}
      <div className="mt-20 w-full max-w-6xl rounded-2xl border border-white/50 bg-white/30 p-4 shadow-2xl backdrop-blur-lg">
        <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-tr from-sky-100 to-sky-50 flex items-center justify-center">
           <div className="flex flex-col items-center gap-4 opacity-40">
              <div className="h-16 w-16 rounded-2xl bg-[var(--color-brand-primary)]" />
              <p className="font-bold text-[var(--color-brand-primary)]">Dashboard Visualization Placeholder</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
