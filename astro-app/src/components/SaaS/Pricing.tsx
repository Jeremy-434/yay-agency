import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-5xl font-display">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Choose the plan that's right for your team. No hidden fees, ever.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-3xl border border-[var(--color-brand-primary)]/10 bg-[var(--color-bg-dark)] p-8 shadow-sm transition-all hover:shadow-md">
            <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">Starter</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[var(--color-text-primary)]">$0</span>
              <span className="text-[var(--color-text-secondary)]">/month</span>
            </div>
            <p className="mb-8 text-sm text-[var(--color-text-secondary)]">Perfect for individuals and side projects.</p>
            <ul className="mb-8 flex-1 space-y-4 text-sm text-[var(--color-text-primary)] font-medium">
              {['Up to 3 projects', 'Basic analytics', 'Community support', 'Core integrations'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-xl border border-[var(--color-brand-primary)] py-3 font-bold text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-all cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col rounded-3xl border-2 border-[var(--color-brand-primary)] bg-white p-8 shadow-xl scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand-primary)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>
            <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">Pro</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[var(--color-text-primary)]">$49</span>
              <span className="text-[var(--color-text-secondary)]">/month</span>
            </div>
            <p className="mb-8 text-sm text-[var(--color-text-secondary)]">For growing teams that need more power.</p>
            <ul className="mb-8 flex-1 space-y-4 text-sm text-[var(--color-text-primary)] font-medium">
              {['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations', 'Team collaboration tools'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-xl bg-[var(--color-brand-primary)] py-3 font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] transition-all cursor-pointer">
              Start Pro Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-3xl border border-[var(--color-brand-primary)]/10 bg-[var(--color-bg-dark)] p-8 shadow-sm transition-all hover:shadow-md">
            <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">Enterprise</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[var(--color-text-primary)]">Custom</span>
            </div>
            <p className="mb-8 text-sm text-[var(--color-text-secondary)]">Tailored solutions for large organizations.</p>
            <ul className="mb-8 flex-1 space-y-4 text-sm text-[var(--color-text-primary)] font-medium">
              {['Dedicated account manager', 'SLA guarantees', 'Custom security audits', 'Unlimited users', 'SSO & SAML'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-xl border border-[var(--color-brand-primary)] py-3 font-bold text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-all cursor-pointer">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
