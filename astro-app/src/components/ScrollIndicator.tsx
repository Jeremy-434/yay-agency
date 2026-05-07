import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@lib/gsap-config';

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'casos', label: 'Casos de Éxito' },
  { id: 'contacto', label: 'Contacto' },
];

export default function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Give hero a synthetic id if it doesn't have one
    const heroEl = document.querySelector('section, [data-hero]') as HTMLElement | null;
    if (heroEl && !heroEl.id) heroEl.id = 'hero';

    // Show indicator after short delay
    const showTimer = setTimeout(() => setIsVisible(true), 800);

    // Build ScrollTrigger for each section
    const triggers: ScrollTrigger[] = [];

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => activateDot(i),
        onEnterBack: () => activateDot(i),
      });

      triggers.push(st);
    });

    return () => {
      clearTimeout(showTimer);
      triggers.forEach(t => t.kill());
    };
  }, []);

  // Animate container visibility
  useEffect(() => {
    if (!containerRef.current) return;

    if (isVisible) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [isVisible]);

  const activateDot = (index: number) => {
    setActiveIndex(index);

    // Animate the progress line
    if (lineRef.current) {
      const totalSections = SECTIONS.length - 1;
      const pct = totalSections === 0 ? 100 : (index / totalSections) * 100;

      gsap.to(lineRef.current, {
        scaleY: pct / 100,
        duration: 0.6,
        ease: 'power3.out',
        transformOrigin: 'top center',
      });
    }

    // Pulse the active dot
    const dot = dotRefs.current[index];
    if (dot) {
      gsap.fromTo(
        dot.querySelector('.dot-inner'),
        { scale: 1 },
        { scale: 1.5, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    }
  };

  const scrollToSection = (id: string, index: number) => {
    const el = document.getElementById(id);
    if (!el) return;

    activateDot(index);

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: el, offsetY: 80 },
      ease: 'power3.inOut',
    });
  };

  // ScrollToPlugin is centrally registered in gsap-config.ts
  useEffect(() => {
    // No need to manually register here
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="scroll-indicator" aria-label="Navegación por secciones">
      {/* Vertical track line */}
      <div className="indicator-track">
        <div className="track-bg" />
        <div ref={lineRef} className="track-progress" />
      </div>

      {/* Dots */}
      <div className="indicator-dots">
        {SECTIONS.map((section, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={section.id}
              ref={el => { dotRefs.current[i] = el; }}
              className={`dot-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => scrollToSection(section.id, i)}
              aria-label={`Ir a ${section.label}`}
              title={section.label}
            >
              {/* Outer ring */}
              <span className="dot-ring" />
              {/* Inner fill */}
              <span className="dot-inner" />
              {/* Label tooltip */}
              <span className="dot-label" aria-hidden="true">{section.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .scroll-indicator {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* Track */
        .indicator-track {
          position: absolute;
          left: 50%;
          top: 12px;
          bottom: 12px;
          width: 2px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .track-bg {
          position: absolute;
          inset: 0;
          background: rgba(174, 195, 176, 0.12);
          border-radius: 2px;
        }

        .track-progress {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            180deg,
            var(--color-brand-accent),
            var(--color-brand-sage)
          );
          border-radius: 2px;
          transform-origin: top center;
          transform: scaleY(0);
        }

        /* Dots container */
        .indicator-dots {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        /* Individual dot button */
        .dot-btn {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        /* Outer ring — always visible */
        .dot-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(174, 195, 176, 0.25);
          transition: border-color 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Inner filled dot */
        .dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(174, 195, 176, 0.4);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 1;
        }

        /* Active state */
        .dot-btn.is-active .dot-ring {
          border-color: var(--color-brand-accent);
          transform: scale(1.25);
        }

        .dot-btn.is-active .dot-inner {
          width: 8px;
          height: 8px;
          background: var(--color-brand-accent);
          box-shadow: 0 0 10px rgba(89, 131, 146, 0.7);
        }

        /* Hover state */
        .dot-btn:hover .dot-ring {
          border-color: var(--color-brand-sage);
          transform: scale(1.15);
        }

        .dot-btn:hover .dot-inner {
          background: var(--color-brand-sage);
        }

        /* Tooltip label */
        .dot-label {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%) translateX(6px);
          white-space: nowrap;
          background: rgba(18, 69, 89, 0.95);
          border: 1px solid rgba(174, 195, 176, 0.15);
          color: var(--color-brand-cream);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .dot-btn:hover .dot-label {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* Hide on small screens */
        @media (max-width: 767px) {
          .scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
