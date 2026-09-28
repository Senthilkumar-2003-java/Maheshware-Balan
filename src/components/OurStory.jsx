import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Story images
import storyEdu from '../assets/images/story-education.jpg';
import storyHealth from '../assets/images/story-healthcare.jpg';
import storyComm from '../assets/images/story-community.jpg';
import storySenior from '../assets/images/story-senior-care.jpg';
import plantImg from '../assets/images/plant-growth-hands.jpg';

export default function OurStory() {
  return (
    <section
      id="our-story"
      style={{
        paddingTop: '80px',
        paddingBottom: '90px',
        backgroundColor: '#FCF9F1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.15fr 0.95fr',
            gap: '36px',
            alignItems: 'center',
          }}
          className="story-grid"
        >
          {/* Left Column: Organic Circular Collage with Botanical Leaves */}
          <div style={{ position: 'relative', minHeight: '340px' }} className="story-collage-wrapper">
            {/* Botanical SVG Vines / Leaves */}
            <svg
              viewBox="0 0 200 200"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-30px',
                width: '120px',
                height: '120px',
                pointerEvents: 'none',
                opacity: 0.85,
              }}
            >
              <path
                d="M10,80 Q40,30 90,40 T150,10"
                fill="none"
                stroke="var(--color-green-natural)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M35,55 Q50,45 45,65 Q35,65 35,55 Z" fill="var(--color-green-natural)" />
              <path d="M70,38 Q85,25 80,48 Q70,45 70,38 Z" fill="var(--color-green-leaf)" />
              <path d="M115,25 Q130,12 125,35 Q115,32 115,25 Z" fill="var(--color-green-natural)" />
            </svg>

            {/* Circle 1 - Top Left (Education) */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '20px',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: '0 10px 25px rgba(6, 75, 53, 0.12)',
                zIndex: 2,
              }}
            >
              <img src={storyEdu} alt="Education story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 2 - Top Right (Senior Care) */}
            <div
              style={{
                position: 'absolute',
                top: '0px',
                right: '25px',
                width: '115px',
                height: '115px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: '0 10px 25px rgba(6, 75, 53, 0.12)',
                zIndex: 1,
              }}
            >
              <img src={storySenior} alt="Elderly care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 3 - Center Center (Healthcare) */}
            <div
              style={{
                position: 'absolute',
                top: '110px',
                left: '95px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: '0 10px 25px rgba(6, 75, 53, 0.15)',
                zIndex: 3,
              }}
            >
              <img src={storyHealth} alt="Healthcare aid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 4 - Bottom Left (Community) */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '25px',
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: '0 10px 25px rgba(6, 75, 53, 0.12)',
                zIndex: 2,
              }}
            >
              <img src={storyComm} alt="Community care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Circle 5 - Bottom Right (Student smile) */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '35px',
                width: '105px',
                height: '105px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: '0 10px 25px rgba(6, 75, 53, 0.12)',
                zIndex: 2,
              }}
            >
              <img src={storyEdu} alt="Student future" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            </div>
          </div>

          {/* Middle Column: Narrative Copy & CTA */}
          <div style={{ padding: '0 10px' }}>
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
                marginBottom: '12px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold-warm)', display: 'inline-block' }}></span>
              OUR STORY
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                lineHeight: '1.18',
                marginBottom: '18px',
              }}
            >
              From Compassion <br />
              <span style={{ color: 'var(--color-primary-deep)', fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
                to Action
              </span>
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.65',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              Maheswari &amp; Balan Memorial Charitable Trust was founded with a simple belief — that every individual matters.
            </p>

            <p
              style={{
                fontSize: '0.96rem',
                lineHeight: '1.65',
                color: 'var(--color-text-secondary)',
                marginBottom: '28px',
              }}
            >
              We work selflessly to support education, healthcare and community welfare, creating opportunities, dignity and hope for a better tomorrow.
            </p>

            <Link
              to="/about"
              className="btn btn-primary"
              style={{
                padding: '13px 26px',
                fontSize: '0.92rem',
              }}
            >
              <span>Know More About Us</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Column: Quote Card & Plant Growing Shoot */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative',
            }}
          >
            {/* Elegant Cream Quote Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '30px 24px',
                boxShadow: '0 12px 36px rgba(6, 75, 53, 0.08)',
                border: '1px solid rgba(215, 154, 24, 0.25)',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Gold Quote Mark */}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '3rem',
                  lineHeight: '1',
                  color: 'var(--color-gold-warm)',
                  marginBottom: '-10px',
                }}
              >
                “
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.24rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  lineHeight: '1.4',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                }}
              >
                Real change happens when kind hearts come together.
              </blockquote>

              {/* Botanical Leaf Motif */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: 'var(--color-green-natural)',
                  marginBottom: '8px',
                }}
              >
                <span>❧</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Maheswari &amp; Balan Trust
                </span>
                <span>☙</span>
              </div>
            </div>

            {/* Plant in Soil Imagery */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(6, 75, 53, 0.1)',
                aspectRatio: '16 / 9',
                border: '3px solid #FFFFFF',
              }}
            >
              <img
                src={plantImg}
                alt="Hands holding green plant sprout"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .story-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .story-collage-wrapper {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
