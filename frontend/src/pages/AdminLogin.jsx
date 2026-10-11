import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import heroImg from '../assets/images/hero-children.jpg';
import { TRUST_LOGO_BASE64 } from '../utils/logoBase64';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "var(--font-sans)", backgroundColor: '#F8FAFC' }}>

      {/* ── LEFT PANEL — Photo + Branding ── */}
      <div className="login-left" style={{
        flex: '0 0 46%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '52px',
      }}>
        {/* Background photo */}
        <img
          src={heroImg}
          alt="Children in school"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        {/* Dark navy scrim gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(16,43,80,0.55) 0%, rgba(10,25,47,0.85) 100%)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, color: '#fff' }}>
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <div style={{
              width: '54px', height: '54px', borderRadius: '14px',
              backgroundColor: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              padding: '4px',
              border: '1.5px solid rgba(215, 154, 24, 0.4)',
            }}>
              <img src={TRUST_LOGO_BASE64} alt="MBMCT Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: '1.15rem', fontWeight: '700', lineHeight: '1.2' }}>
                Maheswari &amp; Balan
              </div>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F5D061', fontWeight: '700', marginTop: '2px' }}>
                Memorial Charitable Trust
              </div>
            </div>
          </div>

          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
            fontWeight: '700', lineHeight: '1.2',
            marginBottom: '14px',
          }}>
            Serve with<br />
            <span style={{ color: '#F5D061' }}>Love &amp; Compassion</span>
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.88)', lineHeight: '1.6', marginBottom: '32px', maxWidth: '360px' }}>
            Official administration portal for donor management, 80G tax receipts, and grassroot humanitarian operations.
          </p>

          {/* Impact chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['5,000+ Students', '1,200+ Patients', '350+ Seniors', '15+ Communities'].map(s => (
              <span key={s} style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(6px)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '0.78rem', fontWeight: '700', color: '#FFFFFF',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form (Perfect Center Alignment) ── */}
      <div style={{
        flex: 1,
        backgroundColor: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        minHeight: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        {/* Top-Left Back Arrow for Fast Mobile Access */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            top: '18px',
            left: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '9999px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            boxShadow: '0 2px 8px rgba(16,43,80,0.08)',
            color: '#173F73',
            fontSize: '0.80rem',
            fontWeight: '700',
            textDecoration: 'none',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F1F5F9'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
        >
          <ArrowLeft size={15} />
          <span>Home</span>
        </Link>

        <div style={{
          width: '100%',
          maxWidth: '460px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(16,43,80,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          border: '1px solid #E2E8F0',
          padding: 'clamp(32px, 5vw, 44px)',
          boxSizing: 'border-box',
          margin: 'auto',
          position: 'relative',
        }}>
          {/* Back to Home Website Link */}
          <div style={{ marginBottom: '18px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '9999px',
                backgroundColor: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#173F73',
                fontSize: '0.80rem',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E2E8F0'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F1F5F9'}
            >
              <ArrowLeft size={15} />
              <span>Back to Home Website</span>
            </Link>
          </div>

          {/* Top Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '18px',
              backgroundColor: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 6px 20px rgba(6,75,53,0.12)',
              border: '2px solid rgba(215, 154, 24, 0.35)',
              padding: '6px',
            }}>
              <img src={TRUST_LOGO_BASE64} alt="MBMCT Official Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: '1.75rem', fontWeight: '700',
              color: '#102B50', marginBottom: '6px',
            }}>Admin Portal Login</h1>
            <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
              Authorized credentials required to access trust management system.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@maheshwari-balantrust.org"
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    height: '50px', paddingLeft: '46px', paddingRight: '16px',
                    border: '1.5px solid #CBD5E1', borderRadius: '12px',
                    fontSize: '0.92rem', color: '#0F172A',
                    outline: 'none', transition: 'border-color 0.2s',
                    backgroundColor: '#FFFFFF',
                  }}
                  onFocus={e => e.target.style.borderColor = '#064B35'}
                  onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    height: '50px', paddingLeft: '46px', paddingRight: '46px',
                    border: '1.5px solid #CBD5E1', borderRadius: '12px',
                    fontSize: '0.92rem', color: '#0F172A',
                    outline: 'none', transition: 'border-color 0.2s',
                    backgroundColor: '#FFFFFF',
                  }}
                  onFocus={e => e.target.style.borderColor = '#064B35'}
                  onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px',
                }}>
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#475569', cursor: 'pointer', fontWeight: '600' }}>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#064B35' }} />
                Remember this session
              </label>
              <span style={{ color: '#064B35', fontSize: '0.82rem', fontWeight: '700' }}>
                Trust Admin Only
              </span>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px',
                padding: '11px 14px', marginBottom: '16px',
                fontSize: '0.83rem', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Shield size={16} /> <span>{error}</span>
              </div>
            )}

            {/* Login Button with Trust Palette */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: '50px',
                background: 'linear-gradient(135deg, #064B35 0%, #173F73 100%)',
                color: '#FFFFFF', border: '1px solid #D79A18', borderRadius: '12px',
                fontSize: '0.98rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 20px rgba(6,75,53,0.22)',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Verifying Credentials...
                </span>
              ) : (
                <><Lock size={16} /> Sign In to Dashboard</>
              )}
            </button>
          </form>

          {/* Security note */}
          <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#059669" />
            <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '600' }}>
              Protected by SSL &amp; JWT Session Verification
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
