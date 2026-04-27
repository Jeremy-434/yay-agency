# Project Mandates & Core Intel

## CSS Architecture (Tailwind v4 Transition)
- **Mandate:** DO NOT refactor existing `.astro` components to use new Tailwind v4 variable names (e.g., `--spacing-1`).
- **Standard:** Use the legacy mapping layer in `src/styles/globals.css`. Always use `--space-X` and `--font-size-X` for backward compatibility.
- **Reasoning:** Prevents "churn" and broken layouts in legacy components while allowing the new Design System to coexist.

## Motion & Animation (GSAP)
- **Status:** GSAP and all premium plugins (including **SplitText**) are now **100% FREE** for commercial use (effective late 2025/2026).
- **Mandate:** Directly import plugins from `gsap/SplitText`, `gsap/ScrollTrigger`, etc. No private registry or `.npmrc` is required.
- **Registration:** Always register plugins inside the `src/lib/gsap-config.ts` SSR guard.

## Workspace Organization
- **Scripts:** All utility Python scripts reside in the `/scripts` root directory.
- **Imports:** Standardize on `@lib/*`, `@components/*`, and `@styles/*` aliases. Avoid relative path depth (e.g., `../../`).
