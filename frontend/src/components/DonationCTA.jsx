import React from 'react';
import { Heart, UserPlus, Share2, Megaphone, Users, Sparkles } from 'lucide-react';
import sunsetBg from '../assets/images/donation-hope.png';
import { useLanguage } from '../context/LanguageContext';

export default function DonationCTA({ onOpenDonate, onOpenVolunteer }) {
  const { t } = useLanguage();
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Maheswari & Balan Memorial Charitable Trust',
        text: 'Support education, healthcare and community welfare with Maheswari & Balan Memorial Charitable Trust.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Website link copied to clipboard! Share with your friends and family.');
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#17231F',
        backgroundImage: `linear-gradient(90deg, rgba(23, 35, 31, 0.95) 0%, rgba(23, 35, 31, 0.85) 45%, rgba(23, 35, 31, 0.45) 100%), url(${sunsetBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
        paddingTop: '80px',
        paddingBottom: '85px',
        overflow: 'hidden',
      }}
    >
      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr 0.75fr',
            gap: '30px',
            alignItems: 'center',
          }}
          className="cta-grid"
        >
          {/* Left Column: Heading, Subtitle, Buttons */}
          <div className="apple-reveal-left">
            {/* Title with small icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.1rem, 3.4vw, 3rem)',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: '1.15',
                }}
              >
                Be a Part of <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', color: 'var(--color-gold-soft)' }}>the Change</span>
              </h2>
            </div>

            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '28px',
                maxWidth: '480px',
              }}
            >
              {t('ctaSubtitle')}
            </p>

            {/* Buttons */}
            <div className="cta-buttons" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={onOpenDonate}
                className="btn btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '0.96rem',
                }}
              >
                <Heart size={18} fill="#FFFFFF" />
                <span>{t('donateNow')}</span>
              </button>

              <button
                onClick={onOpenVolunteer}
                className="btn btn-outline-light"
                style={{
                  padding: '14px 24px',
                  fontSize: '0.96rem',
                  borderRadius: '9999px',
                }}
              >
                <UserPlus size={18} />
                <span>Become a Volunteer</span>
              </button>
            </div>
          </div>

          {/* Middle Column: 3 Action Blocks */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px',
              textAlign: 'center',
            }}
            className="action-blocks"
          >
            {/* Action 1 */}
            <div
              onClick={onOpenDonate}
              className="action-box apple-reveal-scale apple-reveal-delay-2"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                padding: '20px 10px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Heart size={24} color="var(--color-gold-soft)" style={{ margin: '0 auto 8px auto' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#FFFFFF' }}>Give<br />Donation</div>
            </div>

            {/* Action 2 */}
            <div
              onClick={onOpenVolunteer}
              className="action-box apple-reveal-scale apple-reveal-delay-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                padding: '20px 10px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Users size={24} color="var(--color-gold-soft)" style={{ margin: '0 auto 8px auto' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#FFFFFF' }}>Spread<br />Awareness</div>
            </div>

            {/* Action 3 */}
            <div
              onClick={handleShare}
              className="action-box apple-reveal-scale apple-reveal-delay-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                padding: '20px 10px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Share2 size={24} color="var(--color-gold-soft)" style={{ margin: '0 auto 8px auto' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#FFFFFF' }}>Share<br />Our Mission</div>
            </div>
          </div>

          {/* Right Column: Handwritten Script */}
          <div style={{ textAlign: 'center' }} className="cta-handwriting-col apple-reveal-right apple-reveal-delay-3">
            <div
              className="font-handwriting"
              style={{
                fontSize: '2.8rem',
                lineHeight: '1.1',
                color: 'var(--color-gold-soft)',
                transform: 'rotate(-4deg)',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              Together<br />
              We Can ♡
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .action-box:hover {
          background-color: rgba(215, 154, 24, 0.25);
          transform: translateY(-4px);
          border-color: var(--color-gold-soft);
        }
        @media (max-width: 1024px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .cta-handwriting-col {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .cta-buttons button {
            width: 100% !important;
            justify-content: center !important;
          }
          .action-blocks {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
            gap: 10px !important;
          }
          .action-box {
            padding: 14px 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
