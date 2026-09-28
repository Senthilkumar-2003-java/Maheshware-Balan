import React, { useState, useEffect } from 'react';
import { ArrowRight, GraduationCap, PlusSquare, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import impactBg from '../assets/images/impact-children.jpg';

export default function Impact({ onOpenDonate }) {
  const [students, setStudents] = useState(0);
  const [medical, setMedical] = useState(0);
  const [families, setFamilies] = useState(0);
  const [countries, setCountries] = useState(0);

  // Animated counter effect
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      setStudents(Math.floor(progress * 500));
      setMedical(Math.floor(progress * 200));
      setFamilies(Math.floor(progress * 150));
      setCountries(Math.floor(progress * 10));

      if (start >= steps) {
        clearInterval(timer);
        setStudents(500);
        setMedical(200);
        setFamilies(150);
        setCountries(10);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: `${students}+`, label: 'Students Supported', icon: GraduationCap },
    { number: `${medical}+`, label: 'People Received\nMedical Support', icon: PlusSquare },
    { number: `${families}+`, label: 'Families Assisted', icon: Users },
    { number: `${countries}+`, label: 'Countries Contributing', icon: Globe },
  ];

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#064B35',
        backgroundImage: `linear-gradient(90deg, rgba(6, 75, 53, 0.94) 0%, rgba(6, 75, 53, 0.82) 50%, rgba(6, 75, 53, 0.55) 100%), url(${impactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        color: '#FFFFFF',
        paddingTop: '90px',
        paddingBottom: '120px',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(215, 154, 24, 0.18)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.6fr 0.6fr',
            alignItems: 'center',
            gap: '36px',
          }}
          className="impact-grid"
        >
          {/* Left Text Block */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-soft)',
                marginBottom: '14px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold-warm)', display: 'inline-block' }}></span>
              OUR IMPACT
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 3.8vw, 3.4rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                lineHeight: '1.12',
                letterSpacing: '-0.01em',
                marginBottom: '18px',
              }}
            >
              Real People. <br />
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', color: 'var(--color-gold-soft)' }}>
                Real Stories.
              </span>
            </h2>

            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '30px',
                maxWidth: '380px',
              }}
            >
              Your support helps us create real change in the lives of many. Together, we make a difference.
            </p>

            <Link
              to="/about"
              className="btn btn-primary"
              style={{
                padding: '13px 26px',
                fontSize: '0.92rem',
              }}
            >
              <span>See Our Impact</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Middle Stats Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(10px)',
              padding: '28px 20px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
            className="stats-container"
          >
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    padding: '0 6px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid rgba(233, 198, 106, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold-soft)',
                      marginBottom: '12px',
                      backgroundColor: 'rgba(215, 154, 24, 0.1)',
                    }}
                  >
                    <IconComponent size={20} strokeWidth={1.8} />
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.7rem, 2.3vw, 2.2rem)',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      lineHeight: '1.1',
                      marginBottom: '6px',
                    }}
                  >
                    {stat.number}
                  </div>

                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.3',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Handwritten script */}
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="impact-handwriting-col"
          >
            <div
              className="font-handwriting"
              style={{
                fontSize: '2.4rem',
                lineHeight: '1.15',
                color: 'var(--color-gold-soft)',
                transform: 'rotate(-6deg)',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              Hope<br />
              Changes<br />
              Lives ♡
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Organic Wave Curve */}
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
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '36px', display: 'block' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,35 C360,70 820,0 1200,45 C1320,60 1400,45 1440,35 L1440,70 L0,70 Z"
            fill="#FCF9F1"
          />
        </svg>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .impact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .impact-handwriting-col {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
