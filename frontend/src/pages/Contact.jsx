import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Loader2, X, Heart, Sparkles } from 'lucide-react';
import { submitContactApi } from '../services/api';
import confetti from 'canvas-confetti';
import bannerContact from '../assets/images/banner-contact.jpg';
import SEOFAQSection from '../components/SEOFAQSection';

// ── Beautiful Success Popup Overlay ──
function SuccessPopup({ onClose }) {
  useEffect(() => {
    // Fire confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#064B35', '#4F8A35', '#D79A18', '#C9A227', '#FFFFFF'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#064B35', '#D79A18'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#064B35', '#D79A18'],
      });
    }, 300);
    // Auto-close after 5 seconds
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(6, 75, 53, 0.75)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.35s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '32px',
          padding: 'clamp(32px, 6vw, 48px) clamp(20px, 5vw, 40px)',
          maxWidth: 'min(92vw, 460px)',
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
          boxShadow: '0 32px 80px rgba(6, 75, 53, 0.25)',
          position: 'relative',
          animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: '#F3F4F6', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#6B7280',
          }}
        >
          <X size={16} />
        </button>

        {/* Animated check icon */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #064B35, #0f7a52)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px auto',
          boxShadow: '0 16px 40px rgba(6, 75, 53, 0.3)',
          animation: 'pulse 2s infinite',
        }}>
          <CheckCircle2 size={40} color="#FFFFFF" strokeWidth={2.5} />
        </div>

        {/* Sparkles row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
          <Sparkles size={18} color="#D79A18" />
          <Sparkles size={14} color="#064B35" />
          <Sparkles size={18} color="#D79A18" />
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.85rem', fontWeight: '800',
          color: '#064B35', marginBottom: '12px', lineHeight: '1.25',
        }}>
          Message Sent!
        </h2>
        <p style={{ fontSize: '0.98rem', color: '#5B625E', lineHeight: '1.65', marginBottom: '20px' }}>
          Thank you for reaching out. Our trust office will get back to you within <strong>24–48 hours</strong>.
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(6,75,53,0.1)' }} />
          <Heart size={14} color="#D79A18" fill="#D79A18" />
          <div style={{ flex: 1, height: '1px', background: 'rgba(6,75,53,0.1)' }} />
        </div>

        <p style={{ fontSize: '0.82rem', color: '#829AB1' }}>
          This popup closes automatically in a few seconds
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '13px 36px',
            background: '#064B35',
            color: '#FFFFFF',
            border: 'none', borderRadius: '9999px',
            fontSize: '0.95rem', fontWeight: '700',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#085e43'}
          onMouseLeave={e => e.currentTarget.style.background = '#064B35'}
        >
          Close
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 16px 40px rgba(6,75,53,0.3); }
          50% { box-shadow: 0 16px 60px rgba(6,75,53,0.5); }
        }
      `}</style>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await submitContactApi(formData);
      if (res && res.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setErrorMessage(res?.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Are donations to Maheswari & Balan Trust tax exempt?',
      a: 'Yes! All eligible donations made to Maheswari & Balan Memorial Charitable Trust qualify for tax deduction under Section 80G of the Indian Income Tax Act. You will receive an official tax receipt via email immediately after donating.',
    },
    {
      q: 'How does the trust allocate and utilize funds?',
      a: 'We maintain strict financial transparency. More than 85% of every rupee directly funds student scholarships, school classroom infrastructure, cancer treatment medicines, and elder care provisions. Detailed utilization accounts are audited regularly.',
    },
    {
      q: 'Can I volunteer for educational tutoring or healthcare camps?',
      a: 'Absolutely! We welcome volunteers from all walks of life. You can register via our volunteer form to assist in weekend teaching, medical camp coordination, or community distribution drives.',
    },
    {
      q: 'Can international / NRI donors contribute to the trust?',
      a: 'Yes, international supporters can contribute through international wire transfer or designated payment channels. Please contact our trust administration for specialized wire instructions.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FCF9F1', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* ── Success Popup ── */}
      {submitted && <SuccessPopup onClose={() => setSubmitted(false)} />}
      {/* Header — Clean text banner without card container so background image is fully visible */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(10, 20, 30, 0.5) 0%, rgba(10, 20, 30, 0.25) 50%, rgba(10, 20, 30, 0.7) 100%), url(${bannerContact}) center 95% / cover no-repeat`,
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
              <MessageSquare size={15} color="#F5D061" />
              <span>GET IN TOUCH</span>
            </div>
            <h1
              className="banner-animate-2"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                marginBottom: '16px',
                color: '#FFFFFF',
                textShadow: '0 3px 20px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.95)',
              }}
            >
              We Are Here to Listen
            </h1>
            <p
              className="banner-animate-3"
              style={{
                fontSize: '1.1rem',
                color: '#FFFFFF',
                lineHeight: '1.65',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                fontWeight: '500',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              Whether you wish to sponsor a program, partner with our trust, volunteer, or seek assistance for a beneficiary, reach out to us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: '40px',
              marginBottom: '70px',
            }}
            className="contact-grid"
          >
            {/* Contact Details Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(6, 75, 53, 0.08)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary-deep)', marginBottom: '20px' }}>
                  Trust Office Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(6, 75, 53, 0.08)', color: 'var(--color-primary-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Registered Office</div>
                      <div style={{ fontSize: '0.94rem', color: 'var(--color-text-primary)', fontWeight: '600' }}>
                        Maheswari &amp; Balan Memorial Charitable Trust<br />
                        Tamil Nadu, India
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(6, 75, 53, 0.08)', color: 'var(--color-primary-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Phone Support</div>
                      <div style={{ fontSize: '0.94rem', color: 'var(--color-text-primary)', fontWeight: '600' }}>
                        +91 98765 43210 / +91 98765 01234
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(6, 75, 53, 0.08)', color: 'var(--color-primary-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Email Enquiries</div>
                      <div style={{ fontSize: '0.94rem', color: 'var(--color-text-primary)', fontWeight: '600' }}>
                        contact@maheswaribalan.org
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline Card */}
              <div
                style={{
                  backgroundColor: 'var(--color-primary-deep)',
                  borderRadius: '24px',
                  padding: '30px',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontFamily: 'var(--font-handwritten)', fontSize: '2.2rem', color: 'var(--color-gold-soft)', lineHeight: '1.2' }}>
                  “Serve with Love &amp; Compassion”
                </div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '8px' }}>
                  Every interaction is a stepping stone toward a more dignified tomorrow.
                </div>
              </div>
            </div>

            {/* Message Form Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: 'clamp(28px, 5vw, 46px)',
                boxShadow: '0 24px 64px rgba(16, 43, 80, 0.09)',
                border: '1px solid rgba(16, 43, 80, 0.08)',
                width: '100%',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              <div style={{ marginBottom: '26px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D79A18' }}>
                  DIRECT TRUST COMMUNICATION
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem, 2.5vw, 2.1rem)', color: '#102B50', marginTop: '4px', marginBottom: '8px', lineHeight: '1.2' }}>
                  Send Us a Message
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: '1.55', margin: 0 }}>
                  Fill out the form below. Our trust office reviews all inquiries and will respond within 24–48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="contact-form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                      Full Name <span style={{ color: '#E11D48' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senthilkumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.94rem', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                      Email Address <span style={{ color: '#E11D48' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.94rem', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.94rem', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                      Purpose / Subject <span style={{ color: '#E11D48' }}>*</span>
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        padding: '13px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.94rem',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Donation & 80G">Donation &amp; 80G Tax Receipt</option>
                      <option value="Volunteer Interest">Volunteering &amp; Service</option>
                      <option value="Corporate CSR">Corporate CSR Partnership</option>
                      <option value="Beneficiary Application">Request Support for Beneficiary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#102B50', marginBottom: '7px' }}>
                    Your Message <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us how we can help you or how you would like to support..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.94rem', backgroundColor: '#F8FAFC', color: '#0F172A', resize: 'vertical', outline: 'none', minHeight: '120px' }}
                  />
                </div>

                {errorMessage && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.88rem' }}>
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{
                    padding: '15px 36px',
                    fontSize: '0.98rem',
                    alignSelf: 'flex-start',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #D79A18 0%, #B88010 100%)',
                    boxShadow: '0 8px 24px rgba(215, 154, 24, 0.35)',
                    marginTop: '6px',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Schema.org FAQ Section */}
      <SEOFAQSection
        badge="TRUST & GOVERNANCE"
        title="Frequently Asked Questions"
        subtitle="Clear answers on 80G tax exemptions, direct fund utilization, volunteer coordination, and trust visits."
        faqs={faqs}
      />

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .contact-card {
            padding: 22px 18px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}
