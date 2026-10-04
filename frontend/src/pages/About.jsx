import React from 'react';
import { Heart, Shield, Award, Users, CheckCircle2, ArrowRight, Eye, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import plantImg from '../assets/images/plant-growth-hands.png';
import heroImg from '../assets/images/hero-children.jpg';
import bannerAbout from '../assets/images/banner-about.jpg';

export default function About({ onOpenDonate }) {
  const values = [
    { title: 'Compassion', desc: 'Serving every person with unconditional empathy, warmth, and respect.', icon: Heart },
    { title: 'Transparency', desc: '100% openness in fund allocation, impact reports, and financial accountability.', icon: Shield },
    { title: 'Dignity', desc: 'Empowering beneficiaries so they lead independent, respected, and fulfilled lives.', icon: Award },
    { title: 'Community', desc: 'Building grassroot partnerships that foster collective growth and enduring support.', icon: Users },
  ];

  return (
    <div style={{ backgroundColor: '#FCF9F1', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Page Header (Balanced Scrim — Image vivid, Text crisp) */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(16, 24, 40, 0.28) 0%, rgba(16, 24, 40, 0.52) 100%), url(${bannerAbout}) center 15% / cover no-repeat`,
          color: '#FFFFFF',
          padding: '110px 0 85px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            className="banner-animate-1"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              fontWeight: '700',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F5D061',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(245, 208, 97, 0.4)',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F5D061', display: 'inline-block' }}></span>
            ABOUT OUR TRUST
          </div>
          <h1
            className="banner-animate-2"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)',
              fontWeight: '700',
              color: '#FFFFFF',
              textShadow: '0 3px 18px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.9)',
              lineHeight: '1.2',
              marginBottom: '16px',
            }}
          >
            Rooted in Kindness. <br />
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', color: '#F5D061' }}>
              Dedicated to Human Flourishing.
            </span>
          </h1>
          <p
            className="banner-animate-3"
            style={{
              fontSize: '1.1rem',
              color: '#F8FAFC',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.9)',
              fontWeight: '500',
            }}
          >
            Maheswari &amp; Balan Memorial Charitable Trust was established to carry forward the timeless spirit of compassionate service, ensuring quality education and healthcare reach every deserving human being.
          </p>
        </div>
      </section>

      {/* Origin Story & Vision Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '50px',
              alignItems: 'center',
              marginBottom: '80px',
            }}
            className="about-split-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-deep)',
                  marginBottom: '12px',
                }}
              >
                OUR INSPIRATION
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  color: 'var(--color-text-primary)',
                  marginBottom: '18px',
                  lineHeight: '1.2',
                }}
              >
                A Legacy of Giving &amp; Unconditional Love
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                Founded in loving memory of Maheswari &amp; Balan, our trust was born out of the conviction that no child should be deprived of education, no patient should fight a life-threatening disease alone, and no elder should spend their golden years in neglect.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                Through community outreach, government school adoption, medical sponsorship, and elder care, we bridge the gap between resources and necessity.
              </p>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={onOpenDonate}
                  className="btn btn-primary"
                  style={{ padding: '12px 26px', fontSize: '0.94rem' }}
                >
                  <Heart size={16} fill="#FFF" />
                  <span>Support Our Work</span>
                </button>
                <Link
                  to="/programs"
                  className="btn btn-secondary"
                  style={{ padding: '12px 24px', fontSize: '0.94rem' }}
                >
                  <span>Explore Programs</span>
                </Link>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 48px rgba(6, 75, 53, 0.14)',
                  border: '6px solid #FFFFFF',
                  aspectRatio: '4 / 3',
                }}
              >
                <img
                  src={heroImg}
                  alt="Maheswari and Balan Trust Inspiration"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '80px',
            }}
            className="mission-vision-grid"
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                border: '1px solid rgba(6, 75, 53, 0.08)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(6, 75, 53, 0.08)',
                  color: 'var(--color-primary-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Target size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '12px', color: 'var(--color-primary-deep)' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.96rem', lineHeight: '1.65', color: 'var(--color-text-secondary)' }}>
                To serve underserved communities with empathy, providing educational resources to government schools, critical medical support to cancer and leprosy patients, and compassionate care to senior citizens without distinction of creed or background.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                border: '1px solid rgba(215, 154, 24, 0.3)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-gold-pale)',
                  color: 'var(--color-gold-warm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Eye size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '12px', color: 'var(--color-gold-warm)' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '0.96rem', lineHeight: '1.65', color: 'var(--color-text-secondary)' }}>
                A compassionate society where every child has access to transformative education, every ailing individual receives dignified medical care, and every senior citizen lives with respect, warmth, and peace.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-primary-deep)',
                marginBottom: '8px',
              }}
            >
              PILLARS OF TRUST
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-text-primary)' }}>
              Core Values That Guide Us
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}
            className="values-grid"
          >
            {values.map((v, i) => {
              const VIcon = v.icon;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(6, 75, 53, 0.05)',
                    border: '1px solid rgba(6, 75, 53, 0.08)',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(6, 75, 53, 0.06)',
                      color: 'var(--color-primary-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 14px auto',
                    }}
                  >
                    <VIcon size={22} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    {v.title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', lineHeight: '1.55', color: 'var(--color-text-secondary)' }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 991px) {
          .about-split-grid, .mission-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 576px) {
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
