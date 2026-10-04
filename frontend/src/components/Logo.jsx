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
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.32rem',
              fontWeight: '800',
              letterSpacing: '0.01em',
              lineHeight: '1.15',
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
              fontSize: '0.54rem',
              fontWeight: '800',
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
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '0.74rem',
              color: isLight ? '#FCD34D' : '#4F8A35',
              marginTop: '0px',
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
          .logo-symbol { width: 42px !important; height: 42px !important; }
          .logo-title { font-size: 1.08rem !important; }
          .logo-sub { font-size: 0.48rem !important; letter-spacing: 0.1em !important; }
          .logo-motto { font-size: 0.65rem !important; }
        }
        @media (max-width: 440px) {
          .logo-symbol { width: 38px !important; height: 38px !important; }
          .logo-title { font-size: 1.02rem !important; }
          .logo-motto { display: none !important; }
        }
      `}</style>
    </Link>
  );
}
