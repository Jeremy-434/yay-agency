import React, { useEffect, useRef } from 'react';
import { gsap } from '@lib/gsap-config';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      // Immediate position for dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      // Delayed follow for ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.3 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 });
    };

    // Interaction logic
    const handleLinkHover = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: 'rgba(174, 195, 176, 0.2)',
        borderColor: 'transparent',
        duration: 0.3,
      });
      gsap.to(cursor, {
        scale: 0,
        duration: 0.2,
      });
    };

    const handleLinkLeave = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'var(--color-brand-sage)',
        duration: 0.3,
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Attach to all interactive elements
    const links = document.querySelectorAll('a, button, .cursor-hover');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover as any);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover as any);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-brand-sage)] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[var(--color-brand-sage)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-50"
      />
    </>
  );
};

export default CustomCursor;
