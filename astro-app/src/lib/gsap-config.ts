/**
 * GSAP Configuration & Plugin Registration
 * Centralized GSAP setup with SSR safety guards
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

// Client-side only registration (SSR safety)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, useGSAP);
  
  // Set global defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });
  
  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: false, // Set to true for debugging
  });
}

// Export configured instances
export { gsap, ScrollTrigger, SplitText, ScrollToPlugin, useGSAP };

// Custom easing curves matching CSS variables
export const easings = {
  outExpo: 'power4.out',
  inOutCubic: 'power2.inOut',
  outQuint: 'power4.out',
  elastic: 'elastic.out(1, 0.5)',
  back: 'back.out(1.7)',
} as const;

// Animation duration presets
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  verySlow: 2.0,
} as const;
