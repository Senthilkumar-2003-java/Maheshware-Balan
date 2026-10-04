import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { getLenis } from '../utils/useSmoothScroll';

/**
 * Apple-style floating scroll-to-top button with circular SVG progress ring.
 * Appears after scrolling 300px.
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (total > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (scrollY / total) * 100)));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '26px',
        right: '26px',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 10px 30px rgba(16, 43, 80, 0.22), 0 2px 6px rgba(0, 0, 0, 0.08)',
        border: '1.5px solid rgba(215, 154, 24, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 99,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="apple-card-hover scroll-to-top-btn"
    >
      {/* Circular SVG progress ring */}
      <svg
        width="44"
        height="44"
        style={{
          position: 'absolute',
          top: '1px',
          left: '1px',
          transform: 'rotate(-90deg)',
        }}
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="rgba(16, 43, 80, 0.08)"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="#D79A18"
          strokeWidth="2.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.12s linear' }}
        />
      </svg>

      {/* Pure SVG Arrow Icon */}
      <ArrowUp size={18} color="#102B50" strokeWidth={2.5} style={{ zIndex: 1 }} />
      <style>{`
        @media (max-width: 640px) {
          .scroll-to-top-btn {
            bottom: 18px !important;
            right: 18px !important;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </button>
  );
}
