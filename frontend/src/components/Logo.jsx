import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark', className = '', showText = true }) {
  const isLight = variant === 'light';

  return (
    <Link
      to="/"
      className={`logo-brand ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {/* Official Trust Logo Image from /logo.png */}
      <div
        className="logo-symbol"
        style={{
          width: '50px',
          height: '50px',
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: isLight ? 'rgba(255,255,255,0.96)' : 'transparent',
          padding: isLight ? '2px' : '0',
          boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <img
          src="/logo.png"
          alt="Maheswari & Balan Memorial Charitable Trust"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Typography block matching reference */}
      {showText && (
        <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className="logo-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: '1.25rem',
              fontWeight: '700',
              letterSpacing: '0.01em',
              lineHeight: '1.2',
              color: isLight ? '#FFFFFF' : '#173F73',
            }}
          >
            <span>Maheswari </span>
            <span style={{ color: isLight ? '#F5D061' : '#D79A18', fontWeight: '500', fontStyle: 'italic', margin: '0 1px' }}>&amp;</span>
            <span style={{ color: isLight ? '#A7F3D0' : '#064B35' }}> Balan</span>
          </div>

          <div
            className="logo-sub"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '0.55rem',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isLight ? 'rgba(255,255,255,0.85)' : '#6B2D67',
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ display: 'inline-block', height: '1px', width: '8px', background: isLight ? 'rgba(255,255,255,0.4)' : '#D79A18' }}></span>
            MEMORIAL CHARITABLE TRUST
            <span style={{ display: 'inline-block', height: '1px', width: '8px', background: isLight ? 'rgba(255,255,255,0.4)' : '#D79A18' }}></span>
          </div>

          <div
            className="logo-motto"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: 'italic',
              fontSize: '0.78rem',
              color: isLight ? '#FCD34D' : '#4F8A35',
              marginTop: '1px',
              letterSpacing: '0.02em',
              fontWeight: '600',
            }}
          >
            — Serve with Love &amp; Compassion —
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .logo-brand { gap: 8px !important; }
          .logo-symbol { width: 38px !important; height: 38px !important; border-radius: 8px !important; }
          .logo-title { font-size: 1.04rem !important; }
          .logo-sub { font-size: 0.44rem !important; letter-spacing: 0.08em !important; }
          .logo-motto { display: none !important; }
        }
        @media (max-width: 440px) {
          .logo-brand { gap: 6px !important; }
          .logo-symbol { width: 34px !important; height: 34px !important; border-radius: 7px !important; }
          .logo-title { font-size: 0.94rem !important; }
          .logo-sub { font-size: 0.38rem !important; letter-spacing: 0.04em !important; }
        }
        @media (max-width: 360px) {
          .logo-symbol { width: 30px !important; height: 30px !important; }
          .logo-title { font-size: 0.88rem !important; }
        }
      `}</style>
    </Link>
  );
}
