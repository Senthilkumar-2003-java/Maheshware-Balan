import React from 'react';
import { Heart, Shield, Award, Users, CheckCircle2, ArrowRight, Eye, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import plantImg from '../assets/images/plant-growth-hands.png';
import heroImg from '../assets/images/hero-children.jpg';
import bannerAbout from '../assets/images/banner-about.jpg';
import SEOFAQSection from '../components/SEOFAQSection';

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
      {/* Header — Clean text banner without card container so background image is fully visible */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(10, 20, 30, 0.5) 0%, rgba(10, 20, 30, 0.25) 50%, rgba(10, 20, 30, 0.7) 100%), url(${bannerAbout}) center 95% / cover no-repeat`,
          color: '#FFFFFF',
          minHeight: '520px',
          padding: '50px 0 55px 0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '10px 16px',
            }}
          >
            <div
              className="banner-animate-1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#F5D061',
                backgroundColor: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(245, 208, 97, 0.45)',
                marginBottom: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F5D061', display: 'inline-block' }}></span>
              ABOUT OUR TRUST
            </div>
            <h1
              className="banner-animate-2"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                textShadow: '0 3px 20px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.95)',
                lineHeight: '1.2',
                marginBottom: '16px',
              }}
            >
              Rooted in Kindness. <br />
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', color: '#F5D061', textShadow: '0 3px 20px rgba(0, 0, 0, 0.9)' }}>
                Dedicated to Human Flourishing.
              </span>
            </h1>
            <p
              className="banner-animate-3"
              style={{
                fontSize: '1.1rem',
                color: '#FFFFFF',
                lineHeight: '1.65',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                fontWeight: '500',
                maxWidth: '740px',
                margin: '0 auto',
              }}
            >
              Maheswari &amp; Balan Memorial Charitable Trust was established to carry forward the timeless spirit of compassionate service, ensuring quality education and healthcare reach every deserving human being.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story & Vision Grid */}
      <section style={{ padding: '70px 0' }}>
        <div className="container" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'center',
              marginBottom: '80px',
              width: '100%',
              boxSizing: 'border-box',
            }}
            className="about-split-grid"
          >
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
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
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.4rem)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '18px',
                  lineHeight: '1.2',
                }}
              >
                A Legacy of Giving &amp; Unconditional Love
              </h2>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '16px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                Founded in loving memory of Maheswari &amp; Balan, our trust was born out of the conviction that no child should be deprived of education, no patient should fight a life-threatening disease alone, and no elder should spend their golden years in neglect.
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '24px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                Through community outreach, government school adoption, medical sponsorship, and elder care, we bridge the gap between resources and necessity.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
                <button
                  onClick={onOpenDonate}
                  className="btn btn-primary about-action-btn"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <Heart size={16} fill="#FFF" />
                  <span>Support Our Work</span>
                </button>
                <Link
                  to="/programs"
                  className="btn btn-secondary about-action-btn"
                  style={{ padding: '12px 22px', fontSize: '0.92rem' }}
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

      {/* SEO-Optimized FAQ Section for About Page */}
      <SEOFAQSection
        badge="ORGANIZATION & ETHOS"
        title="About The Trust — FAQs"
        subtitle="Learn about the founding vision, governance structure, transparency standards, and legal registration of MBMCT."
        faqs={[
          {
            q: "What is the mission of Maheswari & Balan Memorial Charitable Trust?",
            a: "The Trust was created in loving memory of Maheswari and Balan to perpetuate their lifelong commitment to human dignity, quality education for underprivileged students, cancer medical relief, and care for abandoned elders."
          },
          {
            q: "Is the Trust legally registered with the Government of India?",
            a: "Yes, Maheswari & Balan Memorial Charitable Trust is a registered non-profit charitable trust under the Indian Trusts Act, holding valid 12A registration, 80G tax-exemption status from the Income Tax Department, and CSR compliance certification."
          },
          {
            q: "How does the Trust ensure financial transparency and accountability?",
            a: "Our finances are audited annually by independent certified Chartered Accountants. Utilization statements and annual activity reports are maintained for public and statutory inspection, ensuring over 85% of funds directly reach grassroot beneficiaries."
          },
          {
            q: "Can individuals or institutions partner with MBMCT?",
            a: "Yes. We actively collaborate with schools, hospitals, local municipal bodies, NGOs, and corporate CSR foundations to maximize humanitarian impact across Tamil Nadu and neighbouring regions."
          }
        ]}
      />

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
          .about-action-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
