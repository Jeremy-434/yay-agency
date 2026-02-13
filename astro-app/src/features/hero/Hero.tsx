/**
 * Hero Component - Antigravity Elite Agency
 * React 19 + GSAP 4 with SplitText Typography Animations
 */

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@lib/gsap-config';

interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
}

export default function Hero({
    title = 'Antigravity',
    subtitle = 'Elite Interactive Agency',
    ctaText = 'Explore Our Work',
    ctaHref = '#portfolio',
}: HeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    // GSAP Animation using useGSAP hook (best practice for React 19)
    useGSAP(
        () => {
            if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

            // SplitText for character-based title animation
            const splitTitle = new SplitText(titleRef.current, {
                type: 'chars',
                charsClass: 'char',
            });

            // Apply gradient-style color to each char
            // Note: bg-clip-text doesn't work with SplitText's nested divs
            // Using solid colors with slight variation for premium effect
            gsap.set(splitTitle.chars, {
                backgroundImage: 'linear-gradient(90deg, var(--color-text-primary) 0%, var(--color-brand-accent) 50%, var(--color-brand-primary) 100%)',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text',
                webkitTextFillColor: 'transparent',
                display: 'inline-block',
            });

            // Master Timeline for coordinated entrance
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
            });

            // Set initial states
            gsap.set(splitTitle.chars, { opacity: 0, y: 100, rotateX: -90 });
            gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
            gsap.set(ctaRef.current, { opacity: 0, scale: 0.8 });
            gsap.set(backgroundRef.current, { opacity: 0 });

            // Animate
            tl.to(backgroundRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.inOut',
            })
                .to(
                    splitTitle.chars,
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        stagger: 0.03,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                    },
                    '-=1'
                )
                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    '-=0.4'
                )
                .to(
                    ctaRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                    },
                    '-=0.3'
                );

            // Cleanup
            return () => {
                splitTitle.revert();
            };
        },
        { scope: heroRef }
    );

    return (
        <div
            ref={heroRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
        >
            {/* Animated Background with Glassmorphism */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 opacity-0"
                aria-hidden="true"
            >
                {/* Gradient Orbs */}
                <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] opacity-20 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-tr from-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] opacity-15 blur-3xl"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-6xl text-center">
                {/* Main Title with Gradient */}
                <h1
                    ref={titleRef}
                    className="mb-6 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-tight tracking-tight"
                    style={{
                        fontFamily: 'var(--font-family-display)',
                        lineHeight: 'var(--line-height-tight)',
                        letterSpacing: 'var(--letter-spacing-tight)',
                        color: 'var(--color-text-primary)', // Fallback color before SplitText
                    }}
                >
                    {title}
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="mb-12 font-main text-[clamp(1.125rem,2.5vw,1.75rem)] font-medium tracking-wide text-[var(--color-text-secondary)]"
                    style={{
                        fontFamily: 'var(--font-family-main)',
                        letterSpacing: 'var(--letter-spacing-wide)',
                    }}
                >
                    {subtitle}
                </p>

                {/* CTA Button with Glassmorphism */}
                <a
                    ref={ctaRef}
                    href={ctaHref}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] px-8 py-4 font-display text-lg font-bold text-[var(--color-text-primary)] shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow-accent)]"
                    style={{
                        backdropFilter: 'blur(var(--blur-md))',
                    }}
                >
                    <span className="relative z-10">{ctaText}</span>

                    {/* Arrow Icon (animated on hover) */}
                    <svg
                        className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>

                    {/* Hover Glow Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="h-6 w-6 text-[var(--color-text-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </div>
    );
}
