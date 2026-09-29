import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Globe, Menu, X, ChevronDown, Phone, Building2, LogIn } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onOpenDonate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { language, setLanguage, t, languageList, regionInfo } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  // Current selected language object
  const currentLangObj = languageList.find(l => l.code === language) || languageList[0];

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navPrograms'), path: '/programs' },
    { name: t('navGallery'), path: '/gallery' },
    { name: t('navDonations'), path: '/donations' },
    { name: t('navTestimonials'), path: '/testimonials' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
      boxShadow: scrolled ? '0 2px 16px rgba(6,75,53,0.07)' : 'none',
      transition: 'box-shadow 0.3s ease',
    }}>

      {/* ── TOP BAR ── */}
      <div style={{
        backgroundColor: '#064B35',
        color: '#FFFFFF',
        fontSize: '0.78rem',
        fontWeight: '500',
      }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 24px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left: Request by Call & Regional indicator */}
          <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="tel:+918595968122"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#FFFFFF', textDecoration: 'none', opacity: 0.95,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.95'}
            >
              <Phone size={13} strokeWidth={2} />
              {t('requestByCall')}
            </a>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} />
            <a
              href="tel:+918595968122"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#C9A227', textDecoration: 'none', fontWeight: '600',
              }}
            >
              +91 85959 68122
            </a>

            {/* Region / Country Pill */}
            {regionInfo?.country && regionInfo.country !== 'India' && (
              <span style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                color: '#E5E7EB',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                📍 {regionInfo.country} ({regionInfo.currency})
              </span>
            )}
          </div>

          {/* Right: Our Office + 6-Language Dropdown + Login */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a href="/contact" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
            >
              <Building2 size={13} strokeWidth={2} />
              {t('ourOffices')}
            </a>

            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} />

            {/* Multi-Language Dropdown (English, Tamil, Hindi, Telugu, Malayalam, Kannada) */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px', padding: '3px 8px',
                  cursor: 'pointer',
                  color: '#FFFFFF', fontSize: '0.78rem', fontWeight: '500',
                  transition: 'background 0.2s',
                }}
              >
                <Globe size={13} color="#C9A227" />
                <span>{currentLangObj.native}</span>
                <ChevronDown size={12} />
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '135%', right: 0,
                  background: '#FFFFFF', borderRadius: '10px',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
                  border: '1px solid #E5E7EB',
                  padding: '6px', minWidth: '170px', zIndex: 1200,
                }}>
                  <div style={{ padding: '4px 10px 6px', fontSize: '0.7rem', color: '#6B7280', borderBottom: '1px solid #F3F4F6', fontWeight: '600' }}>
                    SELECT LANGUAGE
                  </div>
                  {languageList.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '8px 12px', borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: language === item.code ? '600' : '400',
                        color: language === item.code ? '#064B35' : '#17231F',
                        backgroundColor: language === item.code ? '#EAF5E9' : 'transparent',
                        cursor: 'pointer', border: 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                    >
                      <span>{item.native}</span>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} />

            {/* Login Button (links to admin login) */}
            <button
              onClick={() => navigate('/admin/login')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '6px',
                padding: '4px 12px',
                color: '#FFFFFF', fontSize: '0.78rem', fontWeight: '600',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            >
              <LogIn size={13} />
              {t('login')}
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div style={{
        borderBottom: '1px solid rgba(6,75,53,0.08)',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '22px' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => ({
                  fontSize: '0.87rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#064B35' : '#5B625E',
                  position: 'relative',
                  padding: '4px 0 6px 0',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid #D79A18' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Donate + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Donate Now Button */}
            <button
              onClick={onOpenDonate}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 20px',
                backgroundColor: '#064B35',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#085e43'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#064B35'}
            >
              <Heart size={15} fill="#D79A18" color="#D79A18" />
              <span>{t('donateNow')}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="mobile-toggle-btn"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                color: '#064B35',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(6,75,53,0.06)',
          boxShadow: '0 8px 24px rgba(6,75,53,0.08)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}>
          {/* Mobile Language Selector */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            paddingBottom: '12px',
            marginBottom: '10px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            {languageList.map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: language === item.code ? '600' : '400',
                  color: language === item.code ? '#FFFFFF' : '#064B35',
                  backgroundColor: language === item.code ? '#064B35' : '#F3F4F6',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {item.native}
              </button>
            ))}
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              style={({ isActive }) => ({
                fontSize: '0.96rem',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? '#064B35' : '#17231F',
                padding: '10px 0',
                borderBottom: '1px solid rgba(6,75,53,0.04)',
                textDecoration: 'none',
                display: 'block',
              })}
            >
              {link.name}
            </NavLink>
          ))}

          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#064B35',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Heart size={17} fill="#D79A18" color="#D79A18" />
              <span>{t('donateNow')}</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/admin/login'); }}
              style={{
                padding: '12px 18px',
                backgroundColor: '#064B35',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: 0.85,
              }}
            >
              <LogIn size={16} /> {t('login')}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: inline-flex !important; }
          .topbar-left { display: none !important; }
        }
      `}</style>
    </header>
  );
}
