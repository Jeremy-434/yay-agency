import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap-config';

const testimonials = [
  {
    quote: "Yay SaaS has completely transformed how our team handles complex projects. The automation features alone saved us 20+ hours a week.",
    author: "Sarah Johnson",
    role: "Product Manager at TechFlow",
    avatarColor: "bg-blue-500",
  },
  {
    quote: "The cleanest UI I've ever used in a SaaS product. It's actually a joy to work in every day. Our developers love the integrations.",
    author: "David Chen",
    role: "CTO at Nexus Systems",
    avatarColor: "bg-orange-500",
  },
  {
    quote: "We scaled from 10 to 100 employees without breaking our workflows, all thanks to Yay SaaS. Their support team is also world-class.",
    author: "Elena Rodriguez",
    role: "COO at GlobalScale",
    avatarColor: "bg-teal-500",
  },
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      scale: 0.95,
      y: 20,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section id="testimonials" ref={containerRef} className="py-24 px-6 bg-[var(--color-bg-dark)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-5xl font-display">
            Trusted by the world's best teams
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Don't just take our word for it. Join thousands of satisfied teams scaling with Yay SaaS.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex flex-col justify-between rounded-2xl bg-white p-8 shadow-saas border border-[var(--color-brand-primary)]/5"
            >
              <div>
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-[var(--color-brand-accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-8 text-lg italic text-[var(--color-text-primary)] leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${t.avatarColor} opacity-80`} />
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">{t.author}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
