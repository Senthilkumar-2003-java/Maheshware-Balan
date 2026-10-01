import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Story images
import storyEdu from '../assets/images/story-education.png';
import storyHealth from '../assets/images/story-healthcare.png';
import storyComm from '../assets/images/story-community.png';
import storySenior from '../assets/images/story-senior-care.png';
import plantImg from '../assets/images/plant-growth-hands.png';

export default function OurStory() {
  return (
    <section
      id="our-story"
      style={{
        paddingTop: '68px',
        paddingBottom: '80px',
        backgroundColor: '#FCF9F1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background botanical ambient */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '-60px',
        width: '200px', height: '200px',
        borderRadius: '50%',
        backgroundColor: 'rgba(215,154,24,0.07)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr 0.95fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="story-grid"
        >
          {/* ── LEFT: Overlapping circle collage ── */}
          <div style={{ position: 'relative', height: '340px' }} className="story-collage">
            {/* Botanical vine SVG */}
            <svg viewBox="0 0 200 180" style={{
              position: 'absolute',
              top: '-14px', left: '-18px',
              width: '110px', height: '100px',
              opacity: 0.8, pointerEvents: 'none',
            }}>
              <path d="M10,80 Q40,30 90,40 T150,10" fill="none" stroke="#4F8A35" strokeWidth="2" strokeLinecap="round" />
              <path d="M35,55 Q50,42 44,64 Q33,63 35,55 Z" fill="#4F8A35" />
              <path d="M72,38 Q85,24 79,47 Q68,44 72,38 Z" fill="#7AAE45" />
              <path d="M118,24 Q131,11 124,34 Q113,31 118,24 Z" fill="#4F8A35" />
            </svg>

            {/* Circle 1 — top-left: Education */}
            <div style={{
              position: 'absolute', top: '14px', left: '22px',
              width: '128px', height: '128px',
              borderRadius: '50%', overflow: 'hidden',
              border: '4px solid #FFFFFF',
              boxShadow: '0 10px 24px rgba(6,75,53,0.12)',
              zIndex: 2,
            }}>
              <img src={storyEdu} alt="Education" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 2 — top-right: Senior care */}
            <div style={{
              position: 'absolute', top: '4px', right: '22px',
              width: '108px', height: '108px',
              borderRadius: '50%', overflow: 'hidden',
              border: '4px solid #FFFFFF',
              boxShadow: '0 10px 24px rgba(6,75,53,0.12)',
              zIndex: 1,
            }}>
              <img src={storySenior} alt="Senior care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 3 — center: Healthcare */}
            <div style={{
              position: 'absolute', top: '114px', left: '90px',
              width: '96px', height: '96px',
              borderRadius: '50%', overflow: 'hidden',
              border: '4px solid #FFFFFF',
              boxShadow: '0 10px 24px rgba(6,75,53,0.15)',
              zIndex: 3,
            }}>
              <img src={storyHealth} alt="Healthcare" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 4 — bottom-left: Community */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '18px',
              width: '106px', height: '106px',
              borderRadius: '50%', overflow: 'hidden',
              border: '4px solid #FFFFFF',
              boxShadow: '0 10px 24px rgba(6,75,53,0.12)',
              zIndex: 2,
            }}>
              <img src={storyComm} alt="Community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 5 — bottom-right */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '28px',
              width: '100px', height: '100px',
              borderRadius: '50%', overflow: 'hidden',
              border: '4px solid #FFFFFF',
              boxShadow: '0 10px 24px rgba(6,75,53,0.12)',
              zIndex: 2,
            }}>
              <img src={storyEdu} alt="Future" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            </div>
          </div>

          {/* ── MIDDLE: Text content ── */}
          <div style={{ padding: '0 8px' }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.17em',
              textTransform: 'uppercase',
              color: '#064B35',
              marginBottom: '10px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D79A18', display: 'inline-block' }} />
              OUR STORY
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)',
              fontWeight: '700',
              color: '#17231F',
              lineHeight: '1.18',
              marginBottom: '16px',
            }}>
              From Compassion<br />
              <span style={{
                color: '#064B35',
                fontStyle: 'italic',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: '600',
              }}>
                to Action
              </span>
            </h2>

            <p style={{
              fontSize: '0.92rem',
              lineHeight: '1.65',
              color: '#5B625E',
              marginBottom: '14px',
            }}>
              Maheswari &amp; Balan Memorial Charitable Trust was founded with a simple belief — that every individual matters.
            </p>

            <p style={{
              fontSize: '0.88rem',
              lineHeight: '1.65',
              color: '#5B625E',
              marginBottom: '26px',
            }}>
              We work selflessly to support education, healthcare and community welfare, creating opportunities, dignity and hope for a better tomorrow.
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
                boxShadow: '0 4px 16px rgba(215,154,24,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="story-cta-btn"
            >
              <span>Know More About Us</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* ── RIGHT: Quote card + plant image ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Quote box */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              padding: '26px 22px',
              boxShadow: '0 12px 32px rgba(6,75,53,0.07)',
              border: '1px solid rgba(215,154,24,0.22)',
              textAlign: 'center',
            }}>
              {/* Opening quote */}
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2.8rem',
                lineHeight: '1',
                color: '#D79A18',
                marginBottom: '-8px',
              }}>
                "
              </div>
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.18rem',
                fontWeight: '600',
                color: '#17231F',
                lineHeight: '1.42',
                fontStyle: 'italic',
                marginBottom: '14px',
              }}>
                Real change happens when kind hearts come together.
              </blockquote>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: '#4F8A35',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                <span>❧</span>
                <span style={{ color: '#7E8783' }}>Maheswari &amp; Balan Trust</span>
                <span>☙</span>
              </div>
            </div>

            {/* Plant image */}
            <div style={{
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 10px 28px rgba(6,75,53,0.1)',
              aspectRatio: '16/9',
              border: '3px solid #FFFFFF',
              flexShrink: 0,
            }}>
              <img
                src={plantImg}
                alt="Hands holding green plant sprout"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .story-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(215,154,24,0.5);
        }
        @media (max-width: 1100px) {
          .story-grid { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
          .story-collage { display: none !important; }
        }
        @media (max-width: 720px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
