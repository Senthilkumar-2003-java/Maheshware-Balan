import React from 'react';
import { Heart, ArrowRight, Play, GraduationCap, HeartPulse, Users, Sprout } from 'lucide-react';
import heroImg from '../assets/images/hero-children.jpg';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onOpenDonate, onOpenVideo }) {
  const { t } = useLanguage();
  const highlights = [
    { icon: GraduationCap, label: 'Education\nOpportunities' },
    { icon: HeartPulse, label: 'Healthcare\nSupport' },
    { icon: Users, label: 'Community\nDevelopment' },
    { icon: Sprout, label: 'Hope for\na Better Tomorrow' },
  ];

  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#FCF9F1',
      overflow: 'hidden',
      paddingTop: '28px',
      paddingBottom: '0px',
    }}>
      {/* Subtle warm radial gradient top-left */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '55%', height: '100%',
        background: 'radial-gradient(ellipse at 10% 30%, rgba(233,198,106,0.09) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '32px',
          alignItems: 'center',
        }}>
          {/* ── LEFT COLUMN ── */}
          <div style={{ paddingBottom: '40px' }}>
            {/* Eyebrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#5B625E',
              marginBottom: '14px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D79A18', display: 'inline-block', flexShrink: 0 }} />
              SMALL STEPS &nbsp;•&nbsp; BIG CHANGES
            </div>

            {/* Main Heading — matches reference: 3 lines, large serif */}
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
              fontWeight: '700',
              color: '#17231F',
              lineHeight: '1.16',
              letterSpacing: '-0.01em',
              marginBottom: '18px',
            }}>
              Together We Build<br />
              <span style={{ color: '#064B35' }}>A Kinder, Healthier</span><br />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                color: '#173F73',
                fontWeight: '600',
              }}>&amp; Brighter Future</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '0.97rem',
              lineHeight: '1.65',
              color: '#5B625E',
              marginBottom: '26px',
              maxWidth: '490px',
            }}>
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '18px', marginBottom: '32px' }}>
              <button
                onClick={onOpenDonate}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 26px',
                  background: 'linear-gradient(135deg, #D79A18 0%, #C08612 100%)',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontSize: '0.93rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(215,154,24,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(215,154,24,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(215,154,24,0.35)'; }}
              >
                <Heart size={16} fill="#FFFFFF" color="#FFFFFF" />
                <span>{t('heroDonateBtn')}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenVideo}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                }}
              >
                <span style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#17231F',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(23,35,31,0.2)',
                  flexShrink: 0,
                }}>
                  <Play size={16} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                </span>
                <span style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: '0.92rem', fontWeight: '700', color: '#17231F' }}>{t('heroStoryBtn')}</span>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: '#5B625E', fontWeight: '500' }}>See the Impact</span>
                </span>
              </button>
            </div>

            {/* 4 Feature highlights — exactly like reference: icon + label grid */}
            <div className="hero-features" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, auto)',
              gap: '20px',
              paddingTop: '22px',
              borderTop: '1px solid rgba(6,75,53,0.1)',
            }}>
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(6,75,53,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#064B35',
                    }}>
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      color: '#17231F',
                      lineHeight: '1.25',
                      whiteSpace: 'pre-line',
                    }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Hero Image ── */}
          <div style={{ position: 'relative', alignSelf: 'stretch', display: 'flex', alignItems: 'stretch' }}>
            {/* Main image — organic rounded left-top, square bottom-right matching reference */}
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: '28px 28px 28px 120px',
              overflow: 'hidden',
              boxShadow: '0 20px 55px rgba(6,75,53,0.14)',
              border: '5px solid #FFFFFF',
              minHeight: '380px',
              maxHeight: '520px',
            }}>
              <img
                src={heroImg}
                alt="Smiling Indian school children learning together"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'right center',
                  display: 'block',
                }}
              />
              {/* Bottom gradient for text contrast */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(6,75,53,0.22) 100%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Handwritten quote badge — top-right rotated, matching reference */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '10px',
              backgroundColor: 'rgba(255,255,255,0.96)',
              padding: '11px 18px',
              borderRadius: '14px',
              boxShadow: '0 8px 28px rgba(6,75,53,0.1)',
              border: '1px solid rgba(215,154,24,0.28)',
              transform: 'rotate(5deg)',
              textAlign: 'center',
              zIndex: 5,
            }}>
              <div style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.35rem',
                lineHeight: '1.2',
                color: '#064B35',
                fontWeight: '700',
              }}>
                Every Child<br />Deserves<br />a Chance ♡
              </div>
            </div>

            {/* Subtle gold ambient blob */}
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              left: '-24px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: 'rgba(215,154,24,0.12)',
              filter: 'blur(40px)',
              zIndex: -1,
            }} />
          </div>
        </div>
      </div>

      {/* Organic wave transition → Programs section */}
      <div style={{ position: 'relative', marginTop: '-1px', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '36px', display: 'block' }}
          preserveAspectRatio="none"
        >
          <path d="M0,32 C400,70 860,0 1200,42 C1300,56 1380,42 1440,32 L1440,60 L0,60 Z" fill="#FFFFFF" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .hero-features { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
