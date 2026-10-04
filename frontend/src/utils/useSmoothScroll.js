import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Initializes Lenis smooth scrolling with GSAP ScrollTrigger synchronization.
 * Apple-style physics curve with mobile and desktop responsiveness.
 */
export function useSmoothScroll(pathname) {
  useEffect(() => {
    // Prevent multiple instances
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple exponential glide
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.1,
        infinite: false,
      });

      window.__lenis = lenisInstance;

      // Sync Lenis scroll with GSAP ScrollTrigger
      lenisInstance.on('scroll', ScrollTrigger.update);

      // Tell GSAP to use requestAnimationFrame from Lenis
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Scroll to top on route change
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      // Keep instance alive across route transitions for smooth experience
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
        window.__lenis = null;
      }
    };
  }, []);
}
