import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`logo-brand ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
      {/* SVG Emblem matching the reference: Lotus / Sun rays / Caring Hands / Bud */}
      <div className="logo-symbol" style={{ width: '48px', height: '48px', flexShrink: 0, position: 'relative' }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Outer Sun Rays */}
          <g stroke={isLight ? '#F5D061' : '#E5A922'} strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="6" x2="50" y2="14" />
            <line x1="28" y1="12" x2="33" y2="19" />
            <line x1="72" y1="12" x2="67" y2="19" />
            <line x1="12" y1="28" x2="19" y2="33" />
            <line x1="88" y1="28" x2="81" y2="33" />
            <line x1="6" y1="50" x2="14" y2="50" />
            <line x1="94" y1="50" x2="86" y2="50" />
            <line x1="38" y1="8" x2="41" y2="16" />
            <line x1="62" y1="8" x2="59" y2="16" />
            <line x1="18" y1="18" x2="24" y2="24" />
            <line x1="82" y1="18" x2="76" y2="24" />
          </g>

          {/* Golden Sun Arc */}
          <path
            d="M20 50 A30 30 0 0 1 80 50"
            fill="none"
            stroke={isLight ? '#F9DF88' : '#D79A18'}
            strokeWidth="2"
            strokeDasharray="2 3"
          />

          {/* Radiant Lotus Petals */}
          <path
            d="M50 20 C42 32 40 45 50 56 C60 45 58 32 50 20 Z"
            fill={isLight ? '#9AE6B4' : '#4F8A35'}
            opacity="0.9"
          />
          <path
            d="M48 24 C36 34 32 46 44 57 C41 44 43 32 48 24 Z"
            fill={isLight ? '#F687B3' : '#6B2D67'}
            opacity="0.85"
          />
          <path
            d="M52 24 C64 34 68 46 56 57 C59 44 57 32 52 24 Z"
            fill={isLight ? '#63B3ED' : '#173F73'}
            opacity="0.85"
          />

          {/* Central Heart / Bloom */}
          <path
            d="M50 36 C47 30 42 32 42 37 C42 42 50 48 50 48 C50 48 58 42 58 37 C58 32 53 30 50 36 Z"
            fill={isLight ? '#FFF' : '#D79A18'}
          />

          {/* Caring Hands Cupping the Base */}
          <path
            d="M24 64 C28 56 36 54 44 59 C41 68 32 75 22 75 C18 75 16 70 20 67 C24 64 24 64 24 64 Z"
            fill={isLight ? '#68D391' : '#064B35'}
          />
          <path
            d="M76 64 C72 56 64 54 56 59 C59 68 68 75 78 75 C82 75 84 70 80 67 C76 64 76 64 76 64 Z"
            fill={isLight ? '#68D391' : '#064B35'}
          />

          {/* Supporting Base Waves / Leaves */}
          <path
            d="M32 75 C42 82 58 82 68 75 C58 88 42 88 32 75 Z"
            fill={isLight ? '#F6AD55' : '#D79A18'}
          />
        </svg>
      </div>

      {/* Typography block */}
      <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: "var(--font-serif)",
          fontSize: '1.45rem',
          fontWeight: '700',
          letterSpacing: '0.01em',
          lineHeight: '1.1',
          color: isLight ? '#FFFFFF' : '#173F73'
        }}>
          <span>Maheswari </span>
          <span style={{ color: isLight ? '#F5D061' : '#D79A18', fontWeight: '400', fontStyle: 'italic', margin: '0 2px' }}>&</span>
          <span style={{ color: isLight ? '#A7F3D0' : '#064B35' }}> Balan</span>
        </div>
        
        <div style={{
          fontSize: '0.62rem',
          fontWeight: '700',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: isLight ? 'rgba(255,255,255,0.75)' : '#6B2D67',
          marginTop: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ display: 'inline-block', height: '1px', width: '12px', background: isLight ? 'rgba(255,255,255,0.4)' : '#D79A18' }}></span>
          MEMORIAL CHARITABLE TRUST
          <span style={{ display: 'inline-block', height: '1px', width: '12px', background: isLight ? 'rgba(255,255,255,0.4)' : '#D79A18' }}></span>
        </div>

        <div style={{
          fontFamily: "var(--font-editorial)",
          fontStyle: 'italic',
          fontSize: '0.8rem',
          color: isLight ? '#FCD34D' : '#4F8A35',
          marginTop: '1px',
          letterSpacing: '0.02em'
        }}>
          — Serve with Love & Compassion —
        </div>
      </div>
    </Link>
  );
}
