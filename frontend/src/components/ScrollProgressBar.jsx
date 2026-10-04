import React, { useEffect, useState } from 'react';

/**
 * Apple-style top scroll progress indicator.
 * Displays a sleek golden-royal navy progress line at the very top of the viewport.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #102B50 0%, #D79A18 70%, #F5C042 100%)',
          boxShadow: '0 0 10px rgba(215, 154, 24, 0.65)',
          transition: 'width 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
