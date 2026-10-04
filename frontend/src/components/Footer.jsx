import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Send, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

// Clean inline SVGs for social channels
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer({ onOpenDonate }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#043424',
        color: '#FFFFFF',
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '30px',
        borderTop: '1px solid rgba(215, 154, 24, 0.25)',
      }}
    >
      <div className="container-wide">
        {/* Top Newsletter & Social Bar matching reference */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '48px',
          }}
          className="footer-top-bar"
        >
          {/* Logo on Left */}
          <Logo variant="light" />

          {/* Quick Nav Links on top bar */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
            className="footer-nav-top"
          >
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Our Programs', path: '/programs' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'Donations', path: '/donations' },
              { name: 'Volunteer', path: '/volunteer' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.82)',
                  transition: 'color 0.2s',
                }}
                className="footer-nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Newsletter Subscribe Form */}
          <div style={{ minWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Mail size={16} color="var(--color-gold-soft)" />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#FFFFFF' }}>Stay Connected</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '8px' }}>
              Subscribe to get updates on our humanitarian work
            </div>

            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-gold-soft)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                }}
              >
                <CheckCircle2 size={18} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                    width: '100%',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.82rem',
                    borderRadius: '9999px',
                  }}
                >
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Detailed Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: '40px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          className="footer-columns-grid"
        >
          {/* Col 1: About & Purpose */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Maheswari &amp; Balan Trust
            </h4>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: '1.65',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '20px',
              }}
            >
              {t('footerAbout')}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <a href="#facebook" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.75)', transition: 'color 0.2s' }} className="social-icon">
                <FacebookIcon />
              </a>
              <a href="#instagram" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.75)', transition: 'color 0.2s' }} className="social-icon">
                <InstagramIcon />
              </a>
              <a href="#youtube" aria-label="YouTube" style={{ color: 'rgba(255,255,255,0.75)', transition: 'color 0.2s' }} className="social-icon">
                <YoutubeIcon />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" style={{ color: 'rgba(255,255,255,0.75)', transition: 'color 0.2s' }} className="social-icon">
                <LinkedinIcon />
              </a>
              <a href="#x" aria-label="X Twitter" style={{ color: 'rgba(255,255,255,0.75)', transition: 'color 0.2s' }} className="social-icon">
                <TwitterXIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Our Programs */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Our Programs
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Student Education', path: '/programs#student-education' },
                { name: 'Government School Needs', path: '/programs#school-needs' },
                { name: 'Cancer Patients Support', path: '/programs#cancer-support' },
                { name: 'Leprosy Patients Support', path: '/programs#leprosy-support' },
                { name: 'Senior Citizen Support', path: '/programs#elder-support' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.86rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      transition: 'color 0.2s',
                    }}
                    className="footer-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Get Involved */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Get Involved
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={onOpenDonate}
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--color-gold-soft)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Heart size={14} fill="currentColor" />
                  <span>Donate Today</span>
                </button>
              </li>
              {[
                { name: 'Volunteer With Us', path: '/volunteer' },
                { name: 'Partner With Us', path: '/about' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Our Programs', path: '/programs' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.86rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      transition: 'color 0.2s',
                    }}
                    className="footer-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location + Handwritten Motto */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Contact &amp; Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                <MapPin size={16} color="var(--color-gold-soft)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Registered Trust Office, Tamil Nadu, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                <Phone size={16} color="var(--color-gold-soft)" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                <Mail size={16} color="var(--color-gold-soft)" style={{ flexShrink: 0 }} />
                <span>contact@maheswaribalan.org</span>
              </div>
            </div>

            {/* Handwritten Motto */}
            <div
              className="font-handwriting"
              style={{
                fontSize: '1.8rem',
                color: 'var(--color-gold-soft)',
                transform: 'rotate(-2deg)',
                textAlign: 'left',
              }}
            >
              Together We Create Hope ♡
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '28px',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <div>
            © 2026 {t('footerRights')}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/contact" style={{ color: 'inherit' }} className="footer-link">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/contact" style={{ color: 'inherit' }} className="footer-link">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link to="/donations" style={{ color: 'inherit' }} className="footer-link">
              Donation Policy
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-nav-link:hover, .footer-link:hover, .social-icon:hover {
          color: var(--color-gold-soft) !important;
        }
        @media (max-width: 991px) {
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 30px !important;
          }
          .footer-top-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 576px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
