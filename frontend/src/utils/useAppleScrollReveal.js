import { useEffect } from 'react';

/**
 * Apple-style smooth scroll reveal hook using IntersectionObserver.
 * Observes ALL reveal variants:
 *  - .apple-reveal          (slide up from below)
 *  - .apple-reveal-left     (slide from left)
 *  - .apple-reveal-right    (slide from right)
 *  - .apple-reveal-scale    (scale + slide up)
 *
 * Adds class `is-visible` when element enters viewport.
 * Stagger delays are handled entirely in CSS via .apple-reveal-delay-N classes.
 *
 * @param {string} [routeKey] - Pass location.pathname so the observer
 *   re-runs on every route change, picking up new page elements.
 */
export function useAppleScrollReveal(routeKey) {
  useEffect(() => {
    // Small delay so the new page DOM has rendered before querying
    const timeoutId = setTimeout(() => {
      const SELECTORS = [
        '.apple-reveal',
        '.apple-reveal-left',
        '.apple-reveal-right',
        '.apple-reveal-scale',
      ].join(', ');

      const elements = document.querySelectorAll(SELECTORS);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Once visible, unobserve to save resources
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      elements.forEach((el) => {
        // Reset for re-entry on new page
        el.classList.remove('is-visible');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 80); // 80ms delay — enough for React to paint the new page

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);
}

/**
 * Google Translate Language Switcher helper.
 * Sets the googtrans cookie and triggers the Google Translate widget.
 */
export function changeGoogleTranslate(langCode) {
  // Set cookie for Google Translate
  document.cookie = `googtrans=/en/${langCode}; path=/;`;
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname};`;

  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  } else {
    // Google Translate widget not yet loaded — reload to apply cookie
    window.location.reload();
  }
}
