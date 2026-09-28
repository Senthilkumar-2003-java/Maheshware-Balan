import React, { useState } from 'react';
import { Heart, ShieldCheck, FileCheck, Landmark, ArrowRight, Sparkles, CheckCircle2, QrCode, CreditCard, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Donations({ onOpenDonate }) {
  const [amount, setAmount] = useState(2500);
  const [customVal, setCustomVal] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [cause, setCause] = useState('Education Support');
  const [donated, setDonated] = useState(false);

  const presets = [500, 1000, 2500, 5000, 10000];

  const handlePreset = (val) => {
    setAmount(val);
    setCustomVal('');
  };

  const handleCustom = (e) => {
    setCustomVal(e.target.value);
    setAmount(null);
  };

  const total = customVal ? Number(customVal) || 0 : amount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (total <= 0) return;
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#064B35', '#D79A18', '#7AAE45'],
    });
    setDonated(true);
  };

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
            <Heart size={16} fill="currentColor" />
            TRANSPARENT GIVING
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
            Empower a Life Today
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Every rupee you contribute directly finances books for rural children, chemotherapy drugs for cancer warriors, and warm meals for our elders.
          </p>
        </div>
      </section>

      {/* Main Donation Portal Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '40px',
              alignItems: 'flex-start',
            }}
            className="donation-page-grid"
          >
            {/* Left Box: Donation Calculator & Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: '0 12px 36px rgba(6, 75, 53, 0.08)',
                border: '1px solid rgba(215, 154, 24, 0.25)',
              }}
            >
              {!donated ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-deep)' }}>
                      Select Contribution
                    </h3>
                    <div style={{ display: 'flex', backgroundColor: 'rgba(6,75,53,0.06)', borderRadius: '9999px', padding: '3px' }}>
                      <button
                        type="button"
                        onClick={() => setFrequency('one-time')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: frequency === 'one-time' ? '#FFFFFF' : 'transparent',
                          color: frequency === 'one-time' ? 'var(--color-primary-deep)' : 'var(--color-text-secondary)',
                        }}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: frequency === 'monthly' ? 'var(--color-primary-deep)' : 'transparent',
                          color: frequency === 'monthly' ? '#FFFFFF' : 'var(--color-text-secondary)',
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '14px' }}>
                    {presets.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePreset(amt)}
                        style={{
                          padding: '12px 4px',
                          borderRadius: '12px',
                          border: '1.5px solid',
                          borderColor: amount === amt ? 'var(--color-gold-warm)' : 'rgba(6, 75, 53, 0.12)',
                          backgroundColor: amount === amt ? 'var(--color-gold-pale)' : '#FFFFFF',
                          color: amount === amt ? 'var(--color-primary-deep)' : 'var(--color-text-primary)',
                          fontWeight: '700',
                          fontSize: '0.95rem',
                        }}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div style={{ position: 'relative', marginBottom: '22px' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: 'var(--color-text-secondary)' }}>
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customVal}
                      onChange={handleCustom}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 36px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(6, 75, 53, 0.15)',
                        fontSize: '0.96rem',
                        backgroundColor: '#FAFAF8',
                      }}
                    />
                  </div>

                  {/* Program Selection */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block', marginBottom: '8px' }}>
                      Designate Fund To:
                    </label>
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(6, 75, 53, 0.15)',
                        fontSize: '0.9rem',
                        backgroundColor: '#FAFAF8',
                      }}
                    >
                      <option value="Education Support">Government School Student Education</option>
                      <option value="School Infrastructure">Government School Needs &amp; Facilities</option>
                      <option value="Cancer Medical Aid">Cancer Patients Medication &amp; Nutrition</option>
                      <option value="AIDS Patients Dignity">AIDS Patients Care &amp; Awareness</option>
                      <option value="Senior Citizen Care">Old Age People Food &amp; Shelter</option>
                      <option value="General Corpus">General Welfare Fund (Where Most Urgently Needed)</option>
                    </select>
                  </div>

                  {/* Donor Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone (Optional)"
                      style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="text"
                      placeholder="PAN Number (For 80G Tax Exemption)"
                      style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '15px', fontSize: '1rem', borderRadius: '9999px', marginBottom: '14px' }}
                  >
                    <Heart size={18} fill="#FFF" />
                    <span>Complete Donation of ₹{total.toLocaleString('en-IN')}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    <ShieldCheck size={16} color="var(--color-green-natural)" />
                    <span>Secure 256-Bit SSL Encrypted • Instant 80G Tax Exemption Receipt</span>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-green-mint)',
                      color: 'var(--color-primary-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-primary-deep)', marginBottom: '8px' }}>
                    Thank You for Your Generosity!
                  </h3>
                  <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                    Your donation of <strong>₹{total.toLocaleString('en-IN')}</strong> will be utilized for <em>{cause}</em>. An official 80G receipt has been dispatched.
                  </p>
                  <button
                    onClick={() => setDonated(false)}
                    className="btn btn-dark"
                    style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                  >
                    Make Another Donation
                  </button>
                </div>
              )}
            </div>

            {/* Right Box: Trust Wire Transfer Details & Transparency */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Bank Account Info Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '28px',
                  boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(6, 75, 53, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: 'var(--color-primary-deep)' }}>
                  <Landmark size={22} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Direct Bank Transfer / NEFT / RTGS</h4>
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                  <div><strong>Account Name:</strong> Maheswari &amp; Balan Memorial Charitable Trust</div>
                  <div><strong>Bank:</strong> State Bank of India (SBI)</div>
                  <div><strong>Account Number:</strong> XXXXXXXXXX (Registered Trust Account)</div>
                  <div><strong>IFSC Code:</strong> SBIN000XXXX</div>
                  <div><strong>Branch:</strong> Tamil Nadu, India</div>
                </div>
              </div>

              {/* Tax Benefit Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '28px',
                  boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(215, 154, 24, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--color-gold-warm)' }}>
                  <FileCheck size={22} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
                    80G Tax Exemption
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                  Donations to Maheswari &amp; Balan Memorial Charitable Trust are eligible for tax exemption under Section 80G of the Indian Income Tax Act. A formal electronic 80G certificate is generated for every contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 991px) {
          .donation-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
