import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Heart, Globe, Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenDonate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donations', path: '/donations' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(6,75,53,0.08)',
      boxShadow: scrolled ? '0 2px 16px rgba(6,75,53,0.07)' : 'none',
      transition: 'box-shadow 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation — center */}
        <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '24px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              style={({ isActive }) => ({
                fontSize: '0.88rem',
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

        {/* Right: Donate + Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Donate Now Button — matches reference green pill */}
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
            <span>Donate Now</span>
          </button>

          {/* Language Selector — globe + EN + chevron */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '7px 10px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                color: '#17231F',
                background: 'rgba(6,75,53,0.05)',
                border: '1px solid rgba(6,75,53,0.1)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <Globe size={15} color="#064B35" />
              <span>{currentLang}</span>
              <ChevronDown size={13} />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(6,75,53,0.12)',
                border: '1px solid rgba(6,75,53,0.08)',
                padding: '5px',
                minWidth: '130px',
                zIndex: 200,
              }}>
                {[
                  { code: 'EN', label: 'English' },
                  { code: 'TA', label: 'தமிழ் (Tamil)' },
                  { code: 'HI', label: 'हिन्दी (Hindi)' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => { setCurrentLang(item.code); setLangDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '0.83rem',
                      fontWeight: currentLang === item.code ? '600' : '400',
                      color: currentLang === item.code ? '#064B35' : '#17231F',
                      backgroundColor: currentLang === item.code ? '#eaf5e9' : 'transparent',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

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
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
            style={{
              marginTop: '12px',
              width: '100%',
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
            <span>Donate Now</span>
          </button>
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
        }
      `}</style>
    </header>
  );
}
