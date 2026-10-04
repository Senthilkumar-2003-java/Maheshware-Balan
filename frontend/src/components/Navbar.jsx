import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Heart, Globe, Menu, X, ChevronDown, Building2, LogIn, 
  ShieldCheck, Home, Users, BookOpen, Image, HandHeart, MessageSquare 
} from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onOpenDonate }) {
  const { language, setLanguage, t, languageList } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { 
    setMobileMenuOpen(false); 
    setLangDropdownOpen(false);
  }, [location]);

  const handleSelectLanguage = (langCode) => {
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };

  const currentLangObj = (languageList || []).find(l => l.code === language) || { code: 'en', name: 'English', nativeName: 'English' };

  const navLinks = [
    { name: t('navHome'), path: '/', icon: Home },
    { name: t('navAbout'), path: '/about', icon: Users },
    { name: t('navPrograms'), path: '/programs', icon: BookOpen },
    { name: t('navGallery'), path: '/gallery', icon: Image },
    { name: t('navDonations'), path: '/donations', icon: HandHeart },
    { name: t('navVolunteer'), path: '/volunteer', icon: Users },
    { name: t('navContact'), path: '/contact', icon: MessageSquare },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.07)' : '0 1px 3px rgba(0,0,0,0.03)',
      transition: 'all 0.3s ease',
    }}>

      {/* ── TOP BAR (Trust Logo Deep Navy #173F73 & Warm Gold Accents) ── */}
      <div style={{
        background: 'linear-gradient(90deg, #102B50 0%, #173F73 100%)',
        color: '#FFFFFF',
        fontSize: '0.78rem',
        fontWeight: '500',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 16px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          {/* Left: 80G Tax Exemption & Trust Info */}
          <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={14} color="#F5D061" />
            <span style={{ opacity: 0.95, letterSpacing: '0.01em', color: '#F8FAFC' }}>
              100% Tax Exempted under Section 80G • Registered NGO (Reg. No. 142/2021)
            </span>
          </div>

          {/* Right: Office link + Google Translate Dropdown + Admin Login */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto' }}>
            <NavLink 
              to="/contact" 
              className="topbar-office-link"
              style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px',
                color: 'rgba(255,255,255,0.92)', 
                textDecoration: 'none',
                fontSize: '0.76rem',
                transition: 'color 0.2s',
              }}
            >
              <Building2 size={13} color="#F5D061" />
              <span>Trust Office</span>
            </NavLink>

            <div className="topbar-divider" style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.25)' }} />

            {/* Official Google Translate Trigger Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Google Translate Language"
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  background: 'rgba(255,255,255,0.12)', 
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '6px', 
                  padding: '3px 9px',
                  cursor: 'pointer',
                  color: '#FFFFFF', 
                  fontSize: '0.76rem', 
                  fontWeight: '600',
                  transition: 'background 0.2s',
                }}
              >
                <Globe size={13} color="#F5D061" />
                <span>{currentLangObj.nativeName}</span>
                <ChevronDown size={11} />
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute', 
                  top: '125%', 
                  right: 0,
                  background: '#FFFFFF', 
                  borderRadius: '12px',
                  boxShadow: '0 16px 36px rgba(23,63,115,0.25)',
                  border: '1px solid #E2E8F0',
                  padding: '6px', 
                  minWidth: '180px', 
                  zIndex: 1300,
                }}>
                  <div style={{ padding: '6px 12px 6px', fontSize: '0.68rem', color: '#173F73', borderBottom: '1px solid #F1F5F9', fontWeight: '700', letterSpacing: '0.04em' }}>
                    LANGUAGE / மொழி
                  </div>
                  {(languageList || []).map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleSelectLanguage(item.code)}
                      style={{
                        width: '100%', 
                        textAlign: 'left',
                        padding: '8px 12px', 
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: language === item.code ? '700' : '500',
                        color: language === item.code ? '#173F73' : '#334155',
                        backgroundColor: language === item.code ? 'rgba(23,63,115,0.08)' : 'transparent',
                        cursor: 'pointer', 
                        border: 'none',
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <span>{item.nativeName}</span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.25)' }} />

            {/* Admin Login Button */}
            <button
              onClick={() => navigate('/admin/login')}
              style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '6px',
                padding: '3px 10px',
                color: '#FFFFFF', 
                fontSize: '0.76rem', 
                fontWeight: '600',
                cursor: 'pointer', 
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              <LogIn size={12} color="#F5D061" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div style={{
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          gap: '12px',
        }}>
          {/* Brand Logo (Responsive) */}
          <div style={{ flexShrink: 0, minWidth: 0 }}>
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: 'clamp(4px, 1vw, 14px)' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className="desktop-nav-link"
                style={({ isActive }) => ({
                  fontSize: '0.86rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#9C6F0A' : '#334155',
                  backgroundColor: isActive ? 'rgba(215, 154, 24, 0.12)' : 'transparent',
                  padding: '7px 12px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                  outline: 'none',
                  userSelect: 'none',
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Block: Donate Now + Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Logo Brand Golden Donate Now Button */}
            <button
              onClick={onOpenDonate}
              className="navbar-donate-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 20px',
                background: 'linear-gradient(135deg, #D79A18 0%, #B88010 100%)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 4px 14px rgba(215, 154, 24, 0.35)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(215, 154, 24, 0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(215, 154, 24, 0.35)';
              }}
            >
              <Heart size={14} fill="#FFFFFF" color="#FFFFFF" />
              <span>Donate Now</span>
            </button>

            {/* Premium Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="mobile-toggle-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: mobileMenuOpen ? 'rgba(23,63,115,0.08)' : 'rgba(23,63,115,0.04)',
                border: '1px solid rgba(23,63,115,0.15)',
                color: '#173F73',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── PREMIUM MOBILE DRAWER MENU ── */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(23,63,115,0.1)',
          boxShadow: '0 20px 48px rgba(23,63,115,0.16)',
          maxHeight: 'calc(100vh - 110px)',
          overflowY: 'auto',
          padding: '16px',
          animation: 'navFadeDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Quick Language Badges */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#173F73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Select Language / மொழியை தேர்ந்தெடுக்கவும்
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(languageList || []).map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleSelectLanguage(item.code)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: language === item.code ? '700' : '500',
                    color: language === item.code ? '#FFFFFF' : '#173F73',
                    backgroundColor: language === item.code ? '#173F73' : '#F1F5F9',
                    border: '1px solid',
                    borderColor: language === item.code ? '#173F73' : '#CBD5E1',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {item.nativeName}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '10px 0' }} />

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? '#173F73' : '#475569',
                    backgroundColor: isActive ? 'rgba(23,63,115,0.06)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  })}
                >
                  <Icon size={18} color="#D79A18" />
                  <span style={{ flex: 1 }}>{link.name}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.5, color: '#D79A18' }}>→</span>
                </NavLink>
              );
            })}
          </div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '12px 0' }} />

          {/* Action CTAs in Mobile Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
              style={{
                width: '100%',
                padding: '13px',
                background: 'linear-gradient(135deg, #D79A18 0%, #B88010 100%)',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(215, 154, 24, 0.35)',
              }}
            >
              <Heart size={18} fill="#FFFFFF" color="#FFFFFF" />
              <span>Make a Donation</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/admin/login'); }}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#F8FAFC',
                color: '#173F73',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <LogIn size={15} color="#D79A18" />
              <span>Admin Login Portal</span>
            </button>
          </div>

          {/* Helpline Footer in Drawer */}
          <div style={{
            marginTop: '14px',
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            fontSize: '0.78rem',
            color: '#6B7280',
            textAlign: 'center',
          }}>
            <div style={{ fontWeight: '700', color: '#173F73', marginBottom: '2px' }}>
              Maheswari &amp; Balan Memorial Charitable Trust
            </div>
            <div>Tamil Nadu, India • 100% Tax Exempt (Section 80G)</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes navFadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .desktop-nav-link:hover {
          background-color: rgba(23, 63, 115, 0.06) !important;
          color: #173F73 !important;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: inline-flex !important; }
          .topbar-left { display: none !important; }
        }
        @media (max-width: 580px) {
          .topbar-office-link, .topbar-divider { display: none !important; }
          .navbar-donate-btn { 
            padding: 7px 12px !important; 
            font-size: 0.78rem !important; 
          }
          .mobile-toggle-btn {
            width: 36px !important;
            height: 36px !important;
          }
        }
        @media (max-width: 380px) {
          .navbar-donate-btn span {
            display: none !important;
          }
          .navbar-donate-btn {
            padding: 8px 10px !important;
            border-radius: 50% !important;
          }
        }
      `}</style>
    </header>
  );
}
