import { useEffect, useRef, useState } from 'react';
import { gsap } from '@lib/gsap-config';

interface Step1 { name: string; company: string; email: string; whatsapp: string; consent1: boolean; consent2: boolean; }
interface Step2 { treatment: string; problem: string; volume: string; }

export default function SurveyPopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [s1, setS1] = useState<Step1>({ name: '', company: '', email: '', whatsapp: '', consent1: false, consent2: false });
  const [s2, setS2] = useState<Step2>({ treatment: '', problem: '', volume: '' });

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('survey-done')) return;
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  // Listen for manual open-survey event from any CTA click
  useEffect(() => {
    const handleOpen = () => {
      setSubmitted(false);
      setStep(1);
      setVisible(true);
    };
    window.addEventListener('open-survey', handleOpen);
    return () => window.removeEventListener('open-survey', handleOpen);
  }, []);

  useEffect(() => {
    if (!visible || !overlayRef.current || !cardRef.current) {
      document.body.classList.remove('overflow-hidden');
      return;
    }
    document.body.classList.add('overflow-hidden');
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.5)', delay: 0.1 });
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [visible]);

  const dismiss = () => {
    sessionStorage.setItem('survey-done', '1');
    gsap.to(cardRef.current, { opacity: 0, y: 30, scale: 0.96, duration: 0.35, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, delay: 0.1, onComplete: () => setVisible(false) });
  };

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    gsap.to(formRef.current, { opacity: 0, x: -30, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setStep(2);
      gsap.fromTo(formRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
    }});
  };

  const goBack = () => {
    if (!formRef.current) return;
    gsap.to(formRef.current, { opacity: 0, x: 30, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setStep(1);
      gsap.fromTo(formRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
    }});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('survey-done', '1');
    gsap.to(formRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setSubmitted(true);
      gsap.fromTo('.survey-success-state', { opacity: 0, scale: 0.85, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.5)' });
      setTimeout(dismiss, 2800);
    }});
  };

  if (!visible) return null;

  return (
    <div ref={overlayRef} className="sv-overlay">
      <div className="sv-backdrop" onClick={dismiss} />
      <div ref={cardRef} className="sv-card">

        {/* LEFT: info panel */}
        <div className="sv-panel">
          <img src="/logo/Invenio Logo Vector Light 1.svg" alt="Invenio Agency" className="sv-logo" />
          <img src="/clinic-crm-panel.png" alt="CRM Dashboard" className="sv-panel-img" />
          <div className="sv-panel-info">
            <p className="sv-panel-eyebrow">Para clínicas & centros estéticos</p>
            <h3 className="sv-panel-heading">Automatiza tu agenda y nunca pierdas un paciente</h3>
            <ul className="sv-benefits">
              <li><span className="sv-dot" />Seguimiento automático por WhatsApp</li>
              <li><span className="sv-dot" />Agenda inteligente 24/7</li>
              <li><span className="sv-dot" />Recuperación de pacientes inactivos</li>
            </ul>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="sv-form-col">
          <button className="sv-close" onClick={dismiss} aria-label="Cerrar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          {!submitted ? (
            <div ref={formRef}>
              {/* Step indicator */}
              <div className="sv-steps">
                <div className={`sv-step ${step === 1 ? 'active' : 'done'}`}>
                  <span className="sv-step-num">{step > 1 ? '✓' : '1'}</span>
                  <span>Contacto</span>
                </div>
                <div className="sv-step-line" />
                <div className={`sv-step ${step === 2 ? 'active' : ''}`}>
                  <span className="sv-step-num">2</span>
                  <span>Tu clínica</span>
                </div>
              </div>

              {step === 1 ? (
                <form onSubmit={goToStep2} className="sv-form">
                  <div className="sv-header">
                    <span className="sv-eyebrow">Paso 1 de 2</span>
                    <h2 className="sv-title">¿Cómo podemos contactarte?</h2>
                  </div>
                  <div className="sv-field">
                    <label htmlFor="sv-name">Nombre completo</label>
                    <input id="sv-name" type="text" required placeholder="María García" value={s1.name} onChange={e => setS1(p => ({...p, name: e.target.value}))} />
                  </div>
                  <div className="sv-field">
                    <label htmlFor="sv-company">Nombre de la clínica *</label>
                    <input id="sv-company" type="text" required placeholder="Ej: Clínica Dental San Luis" value={s1.company} onChange={e => setS1(p => ({...p, company: e.target.value}))} />
                  </div>
                  <div className="sv-row">
                    <div className="sv-field">
                      <label htmlFor="sv-email">Email *</label>
                      <input id="sv-email" type="email" required placeholder="tu@clinica.com" value={s1.email} onChange={e => setS1(p => ({...p, email: e.target.value}))} />
                    </div>
                    <div className="sv-field">
                      <label htmlFor="sv-wa">WhatsApp *</label>
                      <input id="sv-wa" type="tel" required placeholder="+52 55 1234 5678" value={s1.whatsapp} onChange={e => setS1(p => ({...p, whatsapp: e.target.value}))} />
                    </div>
                  </div>
                  <div className="sv-consents">
                    <label className="sv-check"><input type="checkbox" checked={s1.consent1} onChange={e => setS1(p => ({...p, consent1: e.target.checked}))} /><span>Acepto recibir mensajes informativos de Invenio Agency sobre mis consultas.</span></label>
                    <label className="sv-check"><input type="checkbox" checked={s1.consent2} onChange={e => setS1(p => ({...p, consent2: e.target.checked}))} /><span>Acepto recibir comunicaciones de marketing y ofertas especiales.</span></label>
                    <a href="/privacidad" className="sv-privacy">Política de Privacidad</a>
                  </div>
                  <button type="submit" className="sv-btn-next">Siguiente <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="sv-form">
                  <div className="sv-header">
                    <span className="sv-eyebrow">Paso 2 de 2</span>
                    <h2 className="sv-title">Cuéntanos sobre tu clínica</h2>
                  </div>
                  <div className="sv-field">
                    <label htmlFor="sv-treatment">Tratamiento principal</label>
                    <input id="sv-treatment" type="text" placeholder="Ej: Rehabilitación Oral" value={s2.treatment} onChange={e => setS2(p => ({...p, treatment: e.target.value}))} />
                  </div>
                  <div className="sv-field">
                    <label>¿Cuál es tu problema más recurrente?</label>
                    <div className="sv-radios">
                      {['Pacientes que no asisten o abandonan sus tratamientos', 'Mucho tiempo respondiendo WhatsApps y agendando citas', 'Necesito conseguir más pacientes nuevos'].map(opt => (
                        <label key={opt} className="sv-radio"><input type="radio" name="problem" value={opt} checked={s2.problem === opt} onChange={e => setS2(p => ({...p, problem: e.target.value}))} /><span>{opt}</span></label>
                      ))}
                    </div>
                  </div>
                  <div className="sv-field">
                    <label>Pacientes que atiendes por semana</label>
                    <div className="sv-radios sv-radios--row">
                      {['Menos de 20', 'Entre 20 y 50', 'Más de 50'].map(opt => (
                        <label key={opt} className={`sv-chip ${s2.volume === opt ? 'active' : ''}`}><input type="radio" name="volume" value={opt} checked={s2.volume === opt} onChange={e => setS2(p => ({...p, volume: e.target.value}))} /><span>{opt}</span></label>
                      ))}
                    </div>
                  </div>
                  <div className="sv-actions">
                    <button type="button" className="sv-btn-back" onClick={goBack}>← Volver</button>
                    <button type="submit" className="sv-btn-submit">Enviar</button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="survey-success-state sv-success">
              <div className="sv-success-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" stroke="var(--color-brand-sage)" strokeWidth="2"/><path d="M13 24L21 32L35 16" stroke="var(--color-brand-sage)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="sv-success-title">¡Gracias, {s1.name.split(' ')[0] || 'por escribirnos'}!</h3>
              <p className="sv-success-text">Nos pondremos en contacto contigo en menos de 24 horas.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .sv-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;}
        .sv-backdrop{position:absolute;inset:0;background:rgba(0,11,15,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
        .sv-card{position:relative;z-index:1;display:flex;width:100%;max-width:880px;max-height:90vh;overflow:hidden;border-radius:20px;border:1px solid rgba(174,195,176,.15);box-shadow:0 40px 100px rgba(0,0,0,.6);}

        /* LEFT PANEL */
        .sv-panel{display:none;flex-direction:column;width:340px;min-width:340px;background:linear-gradient(160deg,#124559 0%,#01161E 100%);padding:2rem;position:relative;overflow:hidden;}
        @media(min-width:700px){.sv-panel{display:flex;}}
        .sv-panel::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:rgba(89,131,146,.15);filter:blur(40px);}
        .sv-logo{width:130px;margin-bottom:1.5rem;position:relative;z-index:1;}
        .sv-panel-img{width:100%;border-radius:12px;border:1px solid rgba(174,195,176,.12);margin-bottom:1.5rem;position:relative;z-index:1;}
        .sv-panel-eyebrow{font-size:.65rem;text-transform:uppercase;letter-spacing:.18em;color:var(--color-brand-accent);margin-bottom:.5rem;}
        .sv-panel-heading{font-family:var(--font-family-display);font-size:1.25rem;font-weight:400;color:var(--color-brand-cream);line-height:1.3;margin-bottom:1.25rem;}
        .sv-benefits{list-style:none;display:flex;flex-direction:column;gap:.6rem;}
        .sv-benefits li{display:flex;align-items:center;gap:.6rem;font-size:.85rem;color:var(--color-brand-sage);}
        .sv-dot{width:6px;height:6px;min-width:6px;border-radius:50%;background:var(--color-brand-accent);box-shadow:0 0 8px rgba(89,131,146,.7);}

        /* RIGHT FORM COL */
        .sv-form-col{flex:1;background:linear-gradient(160deg,rgba(18,69,89,.95) 0%,rgba(1,22,30,.98) 100%);padding:2rem 2rem 2rem;overflow-y:auto;position:relative;}
        .sv-close{position:absolute;top:1rem;right:1rem;background:rgba(174,195,176,.08);border:1px solid rgba(174,195,176,.15);border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);cursor:pointer;transition:all .25s ease;}
        .sv-close:hover{background:rgba(174,195,176,.18);color:var(--color-text-primary);transform:rotate(90deg);}

        /* Step indicator */
        .sv-steps{display:flex;align-items:center;gap:.75rem;margin-bottom:1.75rem;}
        .sv-step{display:flex;align-items:center;gap:.4rem;font-size:.75rem;color:rgba(174,195,176,.45);text-transform:uppercase;letter-spacing:.08em;}
        .sv-step.active{color:var(--color-brand-sage);}
        .sv-step.done{color:var(--color-brand-accent);}
        .sv-step-num{width:22px;height:22px;border-radius:50%;border:1.5px solid currentColor;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;}
        .sv-step-line{flex:1;height:1px;background:rgba(174,195,176,.15);}

        .sv-eyebrow{display:block;font-size:.65rem;text-transform:uppercase;letter-spacing:.18em;color:var(--color-brand-accent);margin-bottom:.4rem;}
        .sv-title{font-family:var(--font-family-display);font-size:clamp(1.35rem,1.2rem+.8vw,1.75rem);font-weight:400;color:var(--color-brand-cream);line-height:1.25;margin-bottom:1.4rem;}
        .sv-form{display:flex;flex-direction:column;gap:1rem;}
        .sv-row{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;}
        .sv-field{display:flex;flex-direction:column;gap:.35rem;}
        .sv-field label{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--color-brand-sage);}
        .sv-field input{background:rgba(1,22,30,.5);border:1px solid rgba(174,195,176,.15);border-radius:8px;padding:.7rem .9rem;color:var(--color-text-primary);font-family:var(--font-family-main);font-size:.95rem;outline:none;transition:border-color .2s,box-shadow .2s;}
        .sv-field input:focus{border-color:var(--color-brand-accent);box-shadow:0 0 0 3px rgba(89,131,146,.15);}
        .sv-field input::placeholder{color:rgba(174,195,176,.3);}

        /* Consents */
        .sv-consents{display:flex;flex-direction:column;gap:.6rem;margin-top:.25rem;}
        .sv-check{display:flex;align-items:flex-start;gap:.5rem;cursor:pointer;}
        .sv-check input{margin-top:3px;accent-color:var(--color-brand-accent);flex-shrink:0;}
        .sv-check span{font-size:.75rem;color:var(--color-text-secondary);line-height:1.5;}
        .sv-privacy{font-size:.7rem;color:var(--color-brand-accent);text-decoration:underline;text-underline-offset:2px;margin-top:.15rem;align-self:flex-start;}

        /* Radios */
        .sv-radios{display:flex;flex-direction:column;gap:.5rem;margin-top:.25rem;}
        .sv-radio{display:flex;align-items:flex-start;gap:.5rem;cursor:pointer;padding:.55rem .75rem;border-radius:8px;border:1px solid rgba(174,195,176,.1);transition:border-color .2s,background .2s;}
        .sv-radio:hover{border-color:rgba(89,131,146,.4);background:rgba(89,131,146,.06);}
        .sv-radio input{display:none;}
        .sv-radio span{font-size:.875rem;color:var(--color-text-secondary);line-height:1.45;}
        .sv-radio:has(input:checked){border-color:var(--color-brand-accent);background:rgba(89,131,146,.1);}
        .sv-radio:has(input:checked) span{color:var(--color-brand-cream);}
        .sv-radios--row{flex-direction:row;flex-wrap:wrap;}
        .sv-chip{display:flex;align-items:center;cursor:pointer;padding:.45rem 1rem;border-radius:50px;border:1px solid rgba(174,195,176,.15);transition:all .2s;}
        .sv-chip input{display:none;}
        .sv-chip span{font-size:.8rem;color:var(--color-text-secondary);}
        .sv-chip.active{border-color:var(--color-brand-accent);background:rgba(89,131,146,.15);}
        .sv-chip.active span{color:var(--color-brand-cream);}

        /* Buttons */
        .sv-btn-next{display:flex;align-items:center;justify-content:center;gap:.5rem;background:var(--color-brand-accent);color:var(--color-brand-primary);border:none;border-radius:8px;padding:.85rem 1.5rem;font-family:var(--font-family-main);font-size:.95rem;font-weight:700;cursor:pointer;transition:all .3s cubic-bezier(.23,1,.32,1);margin-top:.25rem;}
        .sv-btn-next:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(89,131,146,0.3);background:var(--color-brand-cream);}
        .sv-actions{display:flex;gap:.75rem;margin-top:.5rem;}
        .sv-btn-back{flex:1;background:rgba(174,195,176,.08);border:1px solid rgba(174,195,176,.15);border-radius:8px;padding:.8rem;color:var(--color-text-secondary);font-family:var(--font-family-main);font-size:.9rem;cursor:pointer;transition:all .2s;}
        .sv-btn-back:hover{background:rgba(174,195,176,.14);color:var(--color-text-primary);}
        .sv-btn-submit{flex:2;background:var(--color-brand-accent);color:var(--color-brand-primary);border:none;border-radius:8px;padding:.85rem;font-family:var(--font-family-main);font-size:.95rem;font-weight:700;cursor:pointer;transition:all .3s cubic-bezier(.23,1,.32,1);}
        .sv-btn-submit:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(89,131,146,0.3);background:var(--color-brand-cream);}

        /* Success */
        .sv-success{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:3rem 1rem;height:100%;min-height:300px;}
        .sv-success-icon{margin-bottom:1.5rem;}
        .sv-success-title{font-family:var(--font-family-display);font-size:1.8rem;font-weight:400;color:var(--color-brand-cream);margin-bottom:.75rem;}
        .sv-success-text{color:var(--color-text-secondary);font-size:.95rem;line-height:1.6;}
      `}</style>
    </div>
  );
}
