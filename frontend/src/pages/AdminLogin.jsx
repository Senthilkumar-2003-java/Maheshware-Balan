import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/images/hero-children.jpg';

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
    await new Promise(r => setTimeout(r, 800));
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL — Photo + Branding ── */}
      <div className="login-left" style={{
        flex: '0 0 45%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '48px',
      }}>
        {/* Background photo */}
        <img
          src={heroImg}
          alt="Children in school"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'right center',
          }}
        />
        {/* Dark navy gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(11,31,51,0.45) 0%, rgba(11,31,51,0.82) 100%)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, color: '#fff' }}>
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #2E7D32, #064B35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}>
              <Heart size={22} fill="#C9A227" color="#C9A227" />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.2' }}>
                Maheswari &amp; Balan
              </div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.8, marginTop: '1px' }}>
                Memorial Charitable Trust
              </div>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: '700', lineHeight: '1.2',
            marginBottom: '14px',
          }}>
            Serve with<br />
            <span style={{ color: '#C9A227' }}>Love &amp; Compassion</span>
          </h2>

          <p style={{ fontSize: '1rem', opacity: 0.82, lineHeight: '1.6', marginBottom: '32px', maxWidth: '340px' }}>
            Every act of kindness creates a possibility.
          </p>

          {/* Impact chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['5,000+ Students', '1,200+ Patients', '350+ Seniors', '15+ Communities'].map(s => (
              <span key={s} style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(6px)',
                borderRadius: '9999px',
                padding: '5px 14px',
                fontSize: '0.78rem', fontWeight: '600',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div style={{
        flex: 1,
        backgroundColor: '#F7F9FC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        overflowY: 'auto',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 8px 40px rgba(16,42,67,0.1)',
          padding: '44px 40px',
        }}>
          {/* Top logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #2E7D32, #064B35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 20px rgba(46,125,50,0.25)',
            }}>
              <Heart size={24} fill="#C9A227" color="#C9A227" />
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.75rem', fontWeight: '700',
              color: '#102A43', marginBottom: '6px',
            }}>Welcome Back</h1>
            <p style={{ fontSize: '0.88rem', color: '#667085', lineHeight: '1.5' }}>
              Sign in to continue managing our mission and making a difference.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '600', color: '#172B4D', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#667085' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="senthilkumar@gmail.com"
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    height: '52px', paddingLeft: '46px', paddingRight: '16px',
                    border: '1.5px solid #E5E7EB', borderRadius: '12px',
                    fontSize: '0.92rem', color: '#172B4D',
                    outline: 'none', transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA',
                  }}
                  onFocus={e => e.target.style.borderColor = '#6A1B9A'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '600', color: '#172B4D', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#667085' }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    height: '52px', paddingLeft: '46px', paddingRight: '48px',
                    border: '1.5px solid #E5E7EB', borderRadius: '12px',
                    fontSize: '0.92rem', color: '#172B4D',
                    outline: 'none', transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA',
                  }}
                  onFocus={e => e.target.style.borderColor = '#6A1B9A'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#667085', padding: '4px',
                }}>
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.83rem', color: '#667085', cursor: 'pointer' }}>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  style={{ width: '15px', height: '15px', accentColor: '#6A1B9A' }} />
                Remember me
              </label>
              <button type="button" style={{ background: 'none', border: 'none', color: '#6A1B9A', fontSize: '0.83rem', fontWeight: '600', cursor: 'pointer' }}>
                Forgot Password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px',
                padding: '10px 14px', marginBottom: '16px',
                fontSize: '0.83rem', color: '#DC3545', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Shield size={15} /> {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: '52px',
                background: loading ? '#9C7BAB' : 'linear-gradient(135deg, #6A1B9A 0%, #4A148C 100%)',
                color: '#FFFFFF', border: 'none', borderRadius: '12px',
                fontSize: '0.97rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 18px rgba(106,27,154,0.32)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(106,27,154,0.42)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(106,27,154,0.32)'; }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Signing in...
                </span>
              ) : (
                <><Lock size={17} /> Login</>
              )}
            </button>
          </form>

          {/* Security note */}
          <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Shield size={14} color="#667085" />
            <span style={{ fontSize: '0.78rem', color: '#667085' }}>
              Secure access for authorized administrators only.
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
