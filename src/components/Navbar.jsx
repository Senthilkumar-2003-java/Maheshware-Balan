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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(252, 249, 241, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(6, 75, 53, 0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(6, 75, 53, 0.05)' : 'none',
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 0' : '16px 0',
      }}
    >
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontSize: '0.94rem',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? 'var(--color-primary-deep)' : 'var(--color-text-secondary)',
                position: 'relative',
                padding: '6px 2px',
                transition: 'color 0.2s ease',
                borderBottom: isActive ? '2px solid var(--color-gold-warm)' : '2px solid transparent',
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Donate Now Button */}
          <button
            onClick={onOpenDonate}
            className="btn btn-dark"
            style={{
              padding: '10px 22px',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--color-primary-deep)',
              borderRadius: '9999px',
            }}
          >
            <Heart size={16} fill="#D79A18" color="#D79A18" />
            <span>Donate Now</span>
          </button>

          {/* Language Selector */}
          <div style={{ position: 'relative' }} className="lang-selector">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                background: 'rgba(6, 75, 53, 0.05)',
                transition: 'background 0.2s',
              }}
            >
              <Globe size={16} color="var(--color-primary-deep)" />
              <span>{currentLang}</span>
              <ChevronDown size={14} />
            </button>

            {langDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border-light)',
                  padding: '6px',
                  minWidth: '130px',
                  zIndex: 100,
                }}
              >
                {[
                  { code: 'EN', label: 'English' },
                  { code: 'TA', label: 'தமிழ் (Tamil)' },
                  { code: 'HI', label: 'हिन्दी (Hindi)' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setCurrentLang(item.code);
                      setLangDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: currentLang === item.code ? '600' : '400',
                      color: currentLang === item.code ? 'var(--color-primary-deep)' : 'var(--color-text-primary)',
                      backgroundColor: currentLang === item.code ? 'var(--color-green-mint)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--color-primary-deep)',
            }}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-lg)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
          className="mobile-nav-panel"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontSize: '1rem',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? 'var(--color-primary-deep)' : 'var(--color-text-primary)',
                padding: '10px 0',
                borderBottom: '1px solid rgba(6, 75, 53, 0.04)',
              })}
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDonate();
            }}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            <Heart size={18} fill="#FFF" />
            <span>Donate Now</span>
          </button>
        </div>
      )}

      {/* Inline styles for media queries */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
