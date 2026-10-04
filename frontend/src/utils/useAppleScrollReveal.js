import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apple-style Scroll-Driven Reveal System using GSAP ScrollTrigger
 * with smooth momentum, fluid scale/transforms, and mobile responsiveness.
 *
 * Supports:
 *  - .apple-reveal         (smooth slide up + subtle fade)
 *  - .apple-reveal-left    (smooth drift from left)
 *  - .apple-reveal-right   (smooth drift from right)
 *  - .apple-reveal-scale   (subtle 3D scale-up)
 *  - .apple-parallax       (subtle scroll-driven parallax for banners/images)
 */
export function useAppleScrollReveal(routeKey) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // 1. Reveal elements with ScrollTrigger batch
      const SELECTORS = [
        '.apple-reveal',
        '.apple-reveal-left',
        '.apple-reveal-right',
        '.apple-reveal-scale',
      ].join(', ');

      const elements = document.querySelectorAll(SELECTORS);
      if (elements.length > 0) {
        elements.forEach((el) => {
          // If already visible, don't re-trigger abruptly
          if (el.classList.contains('is-visible')) return;

          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              el.classList.add('is-visible');
            },
          });
        });
      }

      // 2. Parallax effect on hero or page banners for that iconic Apple depth
      const bannerImgs = document.querySelectorAll('.page-banner img, .hero-bg img, .apple-parallax');
      bannerImgs.forEach((img) => {
        gsap.to(img, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement || img,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Refresh ScrollTrigger to compute new geometry
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [routeKey]);
}

