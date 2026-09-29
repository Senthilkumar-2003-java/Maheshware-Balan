import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, GraduationCap, PlusSquare, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import impactBg from '../assets/images/impact-children.jpg';

function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const steps = 50;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start++;
      setCount(Math.floor((start / steps) * target));
      if (start >= steps) { clearInterval(timer); setCount(target); }
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return [count, ref];
}

export default function Impact({ onOpenDonate }) {
  const [students, studentsRef] = useCountUp(500);
  const [medical] = useCountUp(200);
  const [families] = useCountUp(150);
  const [countries] = useCountUp(10);

  const stats = [
    { number: students, suffix: '+', label: 'Students\nSupported', icon: GraduationCap },
    { number: medical, suffix: '+', label: 'People Received\nMedical Support', icon: PlusSquare },
    { number: families, suffix: '+', label: 'Families\nAssisted', icon: Users },
    { number: countries, suffix: '+', label: 'Countries\nContributing', icon: Globe },
  ];

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#064B35',
        backgroundImage: `linear-gradient(90deg, rgba(6,75,53,0.96) 0%, rgba(6,75,53,0.85) 50%, rgba(6,75,53,0.55) 100%), url(${impactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        color: '#FFFFFF',
        paddingTop: '72px',
        paddingBottom: '100px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gold glow */}
      <div style={{
        position: 'absolute',
        top: '25%', right: '12%',
        width: '280px', height: '280px',
        borderRadius: '50%',
        backgroundColor: 'rgba(215,154,24,0.18)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div ref={studentsRef} style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.7fr 0.55fr',
            alignItems: 'center',
            gap: '36px',
          }}
          className="impact-grid"
        >
          {/* LEFT: Heading + text + CTA */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E9C66A',
              marginBottom: '12px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D79A18', display: 'inline-block' }} />
              OUR IMPACT
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.2vw, 3rem)',
              fontWeight: '700',
              color: '#FFFFFF',
              lineHeight: '1.12',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}>
              Real People.<br />
              <span style={{
                fontStyle: 'italic',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#E9C66A',
              }}>
                Real Stories.
              </span>
            </h2>

            <p style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '28px',
              maxWidth: '360px',
            }}>
              Your support helps us create real change in the lives of many. Together, we make a difference.
            </p>

            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 24px',
                background: 'linear-gradient(135deg, #D79A18 0%, #C4870B 100%)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(215,154,24,0.38)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="impact-cta-btn"
            >
              <span>See Our Impact</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* MIDDLE: 4 Stats in glassmorphic card — exactly like reference */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              backgroundColor: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              padding: '28px 18px',
              borderRadius: '22px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            className="stats-container"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '4px',
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(233,198,106,0.4)',
                    backgroundColor: 'rgba(215,154,24,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#E9C66A',
                    marginBottom: '10px',
                  }}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  {/* Count */}
                  <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: '1.1',
                    marginBottom: '5px',
                  }}>
                    {stat.number}{stat.suffix}
                  </div>
                  {/* Label */}
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: '1.3',
                    whiteSpace: 'pre-line',
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Handwritten script — "Hope Changes Lives ♡" */}
          <div
            style={{ textAlign: 'center' }}
            className="impact-handwriting-col"
          >
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '2.2rem',
                lineHeight: '1.15',
                color: '#E9C66A',
                transform: 'rotate(-6deg)',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              Hope<br />Changes<br />Lives ♡
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave → OurStory (ivory) */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: 'translateY(1px)',
      }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '32px', display: 'block' }}
          preserveAspectRatio="none"
        >
          <path d="M0,30 C360,65 820,0 1200,38 C1320,52 1400,38 1440,30 L1440,60 L0,60 Z" fill="#FCF9F1" />
        </svg>
      </div>

      <style>{`
        .impact-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(215,154,24,0.5);
        }
        @media (max-width: 1080px) {
          .impact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .impact-handwriting-col { display: none !important; }
        }
        @media (max-width: 700px) {
          .stats-container { grid-template-columns: repeat(2, 1fr) !important; gap: 18px !important; }
        }
      `}</style>
    </section>
  );
}
