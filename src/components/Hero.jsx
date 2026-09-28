import React from 'react';
import { Heart, ArrowRight, Play, GraduationCap, HeartPulse, Users, Sprout } from 'lucide-react';
import heroImg from '../assets/images/hero-children.jpg';

export default function Hero({ onOpenDonate, onOpenVideo }) {
  const highlights = [
    { icon: GraduationCap, label: 'Education\nOpportunities' },
    { icon: HeartPulse, label: 'Healthcare\nSupport' },
    { icon: Users, label: 'Community\nDevelopment' },
    { icon: Sprout, label: 'Hope for\na Better Tomorrow' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#FCF9F1',
        backgroundImage: 'radial-gradient(ellipse at 10% 20%, rgba(233, 198, 106, 0.12) 0%, transparent 60%)',
        overflow: 'hidden',
        paddingTop: '32px',
        paddingBottom: '80px',
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.15fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Copy & Actions */}
          <div style={{ zIndex: 2, paddingRight: '12px' }}>
            {/* Eyebrow badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary-deep)',
                marginBottom: '16px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold-warm)', display: 'inline-block' }}></span>
              SMALL STEPS • BIG CHANGES
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                lineHeight: '1.14',
                letterSpacing: '-0.02em',
                marginBottom: '22px',
              }}
            >
              Together We Build <br />
              <span style={{ color: 'var(--color-primary-deep)' }}>A Kinder, Healthier</span> <br />
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', color: 'var(--color-navy-pro)' }}>& Brighter Future</span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.65',
                color: 'var(--color-text-secondary)',
                marginBottom: '32px',
                maxWidth: '540px',
              }}
            >
              Maheswari &amp; Balan Memorial Charitable Trust is dedicated to supporting education, healthcare and community welfare for a better tomorrow.
            </p>

            {/* CTA Buttons Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '42px',
              }}
            >
              <button
                onClick={onOpenDonate}
                className="btn btn-primary"
                style={{
                  padding: '15px 30px',
                  fontSize: '1rem',
                  borderRadius: '9999px',
                }}
              >
                <Heart size={18} fill="#FFFFFF" />
                <span>Support Our Mission</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onOpenVideo}
                className="btn-video"
                style={{ cursor: 'pointer' }}
                aria-label="Watch our story"
              >
                <span className="video-play-icon">
                  <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>Watch Our Story</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>See the Impact</span>
                </div>
              </button>
            </div>

            {/* 4 Feature Badges / Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(6, 75, 53, 0.1)',
              }}
              className="hero-features-grid"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(6, 75, 53, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary-deep)',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        lineHeight: '1.25',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Image with Handwritten Cursive Tag */}
          <div style={{ position: 'relative' }}>
            {/* Image Container with Organic Border Radius */}
            <div
              style={{
                position: 'relative',
                borderRadius: '32px 32px 32px 140px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(6, 75, 53, 0.16)',
                border: '6px solid #FFFFFF',
                aspectRatio: '16 / 10.5',
                maxHeight: '560px',
              }}
              className="hero-image-wrapper"
            >
              <img
                src={heroImg}
                alt="Smiling Indian school children in uniform learning together"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                }}
              />
              {/* Subtle warm sunlight vignette overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(6, 75, 53, 0.3) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Handwritten Floating Quote Badge on upper right */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '12px 20px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(6, 75, 53, 0.12)',
                border: '1px solid rgba(215, 154, 24, 0.3)',
                transform: 'rotate(4deg)',
                textAlign: 'center',
                zIndex: 10,
              }}
              className="hero-badge-tag"
            >
              <div
                className="font-handwriting"
                style={{
                  fontSize: '1.45rem',
                  lineHeight: '1.15',
                  color: 'var(--color-primary-deep)',
                  fontWeight: '700',
                }}
              >
                Every Child<br />
                Deserves<br />
                a Chance ♡
              </div>
            </div>

            {/* Decorative Soft Glow Behind Image */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'rgba(215, 154, 24, 0.15)',
                filter: 'blur(40px)',
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Organic Curved Wave Transition to Section 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          transform: 'translateY(1px)',
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '40px', display: 'block' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,80 720,0 1140,50 C1280,65 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-image-wrapper {
            border-radius: 24px !important;
            aspect-ratio: 16 / 10 !important;
          }
          .hero-features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 576px) {
          .hero-badge-tag {
            top: 10px !important;
            right: 10px !important;
            padding: 8px 14px !important;
          }
          .hero-features-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
