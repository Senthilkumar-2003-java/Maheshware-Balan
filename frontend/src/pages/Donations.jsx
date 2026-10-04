import React, { useState } from 'react';
import { Heart, ShieldCheck, FileCheck, Landmark, ArrowRight, Sparkles, CheckCircle2, QrCode, CreditCard, Building, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitDonationApi } from '../services/api';
import bannerDonations from '../assets/images/banner-donations.jpg';
import SEOFAQSection from '../components/SEOFAQSection';

export default function Donations({ onOpenDonate }) {
  const [amount, setAmount] = useState(2500);
  const [customVal, setCustomVal] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [cause, setCause] = useState('Education Support');
  const [donated, setDonated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (total <= 0) return;
    if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
      setErrorMessage('Please provide your name, email, and phone number.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await submitDonationApi({
        donor_name: donorInfo.name,
        email: donorInfo.email,
        phone: donorInfo.phone,
        pan_number: donorInfo.pan || null,
        amount: total,
        cause,
        payment_method: 'UPI',
        notes: `Plan: ${frequency}`,
      });

      if (res && res.success) {
        setTxnRef(res.transaction_id || `MBMCT-${Math.floor(100000 + Math.random() * 900000)}`);
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#064B35', '#D79A18', '#7AAE45'],
        });
        setDonated(true);
      } else {
        setErrorMessage(res?.message || 'Failed to submit donation. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FCF9F1', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Header — Clean text banner without card container so background image is fully visible */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(10, 20, 30, 0.5) 0%, rgba(10, 20, 30, 0.25) 50%, rgba(10, 20, 30, 0.7) 100%), url(${bannerDonations}) center 95% / cover no-repeat`,
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
              <Heart size={15} fill="#F5D061" color="#F5D061" />
              <span>TRANSPARENT GIVING</span>
            </div>
            <h1
              className="banner-animate-2"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                textShadow: '0 3px 20px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.95)',
                lineHeight: '1.2',
                marginBottom: '16px',
              }}
            >
              Empower a Life Today
            </h1>
            <p
              className="banner-animate-3"
              style={{
                fontSize: '1.1rem',
                color: '#FFFFFF',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                lineHeight: '1.65',
                fontWeight: '500',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              Every contribution directly finances quality schooling for children, life-saving medicines for cancer fighters, and warm dignified care for our elders.
            </p>
          </div>
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
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(6, 75, 53, 0.15)',
                        fontSize: '0.92rem',
                        backgroundColor: '#FAFAF8',
                        color: '#1E293B',
                        outline: 'none',
                      }}
                    >
                      <option value="Education Support">Government School Student Education</option>
                      <option value="School Infrastructure">Government School Needs &amp; Facilities</option>
                      <option value="Cancer Medical Aid">Cancer Patients Medication &amp; Nutrition</option>
                      <option value="Leprosy Patients Care">Leprosy Patients Care &amp; Rehabilitation</option>
                      <option value="Senior Citizen Care">Old Age People Food &amp; Shelter</option>
                      <option value="General Corpus">General Welfare Fund (Where Most Urgently Needed)</option>
                    </select>
                  </div>

                  {/* Donor Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="text"
                      placeholder="PAN Number (For 80G Tax Exemption)"
                      value={donorInfo.pan}
                      onChange={(e) => setDonorInfo({ ...donorInfo, pan: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                  </div>

                  {errorMessage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.85rem', marginBottom: '14px' }}>
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '15px', fontSize: '1rem', borderRadius: '9999px', marginBottom: '14px', opacity: submitting ? 0.75 : 1 }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Recording Donation to Database...</span>
                      </>
                    ) : (
                      <>
                        <Heart size={18} fill="#FFF" />
                        <span>Complete Donation of ₹{total.toLocaleString('en-IN')}</span>
                      </>
                    )}
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
                  <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                    Thank you, <strong>{donorInfo.name || 'Kind Donor'}</strong>! Your donation of <strong>₹{total.toLocaleString('en-IN')}</strong> has been recorded for <em>{cause}</em>.
                  </p>
                  <div style={{ backgroundColor: '#FCF9F1', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(215, 154, 24, 0.3)', display: 'inline-block', marginBottom: '22px', fontSize: '0.85rem' }}>
                    Reference ID: <strong style={{ fontFamily: 'monospace' }}>{txnRef || 'MBMCT-SUCCESS'}</strong>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setDonated(false);
                        setDonorInfo({ name: '', email: '', phone: '', pan: '' });
                      }}
                      className="btn btn-dark"
                      style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                    >
                      Make Another Donation
                    </button>
                  </div>
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
                  <div><strong>Account Name:</strong> MAHESWARI AND BALAN MEMORIAL CHARITABLE TRUST </div>
                  <div><strong>Bank:</strong> UNION BANK OF INDIA</div>
                  <div><strong>Account Number:</strong> 334101010201339 (Registered Trust Account)</div>
                  <div><strong>IFSC Code:</strong> UBIN0533416</div>
                  <div><strong>Branch:</strong> SALEM MAIN</div>
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

      {/* SEO-Optimized FAQ Section for Donors */}
      <SEOFAQSection
        badge="DONOR TRANSPARENCY & TAX BENEFITS"
        title="Donation & Tax Exemption FAQs"
        subtitle="Key details about our Section 80G tax certificates, secure payment gateways, and audited fund allocation."
        faqs={[
          {
            q: "How does the Section 80G tax exemption benefit me as a donor?",
            a: "Under Section 80G of the Indian Income Tax Act, 1961, donors are eligible to claim a 50% deduction on eligible donations from their taxable gross income. You will receive an official tax exemption certificate containing our Trust 80G registration number and PAN immediately via email."
          },
          {
            q: "When and how will I receive my official donation receipt?",
            a: "Your formal 80G tax exemption receipt is generated digitally right after your transaction is verified. You can print or download the PDF receipt directly from the on-screen confirmation, and a duplicate copy is sent to your registered email address."
          },
          {
            q: "Is it safe to donate online through UPI, Cards, and NetBanking?",
            a: "Yes, 100%. All online transactions are encrypted via bank-grade 256-bit SSL protocols. Donations go directly into the official registered Union Bank of India account of 'MAHESWARI AND BALAN MEMORIAL CHARITABLE TRUST'."
          },
          {
            q: "Can I designate my donation to a specific school or patient?",
            a: "Yes. When donating, you can select whether your funds should specifically go towards Government School Student Education, School Infrastructure & Sanitations, Cancer Patient Medications, Leprosy Patient Care, or Elderly Support."
          },
          {
            q: "Can corporations contribute to MBMCT under their CSR programs?",
            a: "Yes! Maheswari & Balan Memorial Charitable Trust is registered and compliant with Ministry of Corporate Affairs regulations for corporate CSR allocations under Section 135 of the Companies Act. We provide comprehensive CSR utilization and impact audit reports."
          }
        ]}
      />

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
