import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactApi } from '../services/api';

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
      {/* Header */}
      <section
        style={{
          backgroundColor: '#064B35',
          color: '#FFFFFF',
          padding: '80px 0 60px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-soft)',
              marginBottom: '12px',
            }}
          >
            <MessageSquare size={16} />
            GET IN TOUCH
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '16px',
            }}
          >
            We Are Here to Listen
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Whether you wish to sponsor a program, partner with our trust, volunteer, or seek assistance for a beneficiary, reach out to us anytime.
          </p>
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

            {/* Message Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: '0 12px 36px rgba(6, 75, 53, 0.08)',
                border: '1px solid rgba(6, 75, 53, 0.08)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-deep)', marginBottom: '8px' }}>
                Send Us a Message
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                Fill out the form below and our trust office will respond within 24–48 hours.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle2 size={48} color="var(--color-primary-deep)" style={{ margin: '0 auto 16px auto' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-primary-deep)', marginBottom: '6px' }}>
                    Message Sent Successfully!
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
                    Thank you for reaching out. We appreciate your interest and support.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ padding: '12px 14px', borderRadius: '12px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem', backgroundColor: '#FAFAF8' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '12px 14px', borderRadius: '12px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem', backgroundColor: '#FAFAF8' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ padding: '12px 14px', borderRadius: '12px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem', backgroundColor: '#FAFAF8' }}
                    />
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ padding: '12px 14px', borderRadius: '12px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem', backgroundColor: '#FAFAF8' }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Donation & 80G">Donation &amp; 80G Receipt</option>
                      <option value="Volunteer Interest">Volunteering</option>
                      <option value="Corporate CSR">Corporate CSR Partnership</option>
                      <option value="Beneficiary Application">Request Support for Beneficiary</option>
                    </select>
                  </div>

                  <textarea
                    required
                    rows="4"
                    placeholder="Write your message here *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: '12px 14px', borderRadius: '12px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem', backgroundColor: '#FAFAF8', resize: 'vertical' }}
                  />

                  {errorMessage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.85rem' }}>
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ padding: '14px 28px', fontSize: '0.96rem', alignSelf: 'flex-start', borderRadius: '9999px', opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-primary-deep)', marginBottom: '8px' }}>
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>
                Common Inquiries
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid rgba(6, 75, 53, 0.08)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(6, 75, 53, 0.03)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: 'var(--color-primary-deep)',
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 24px 20px 24px', fontSize: '0.92rem', lineHeight: '1.65', color: 'var(--color-text-secondary)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
