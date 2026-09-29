import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, QrCode, CreditCard, Building, ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitDonationApi } from '../services/api';

export default function DonationModal({ isOpen, onClose }) {
  const [frequency, setFrequency] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('Education Support');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
  });

  if (!isOpen) return null;

  const amounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const currentTotal = customAmount ? Number(customAmount) || 0 : selectedAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTotal <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    if (!donorDetails.name || !donorDetails.email || !donorDetails.phone) {
      setErrorMessage('Please provide your name, email, and phone number.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await submitDonationApi({
        donor_name: donorDetails.name,
        email: donorDetails.email,
        phone: donorDetails.phone,
        pan_number: donorDetails.pan || null,
        amount: currentTotal,
        cause: selectedCause,
        payment_method: paymentMethod.toUpperCase(),
        notes: `Plan: ${frequency}`,
      });

      if (res && res.success) {
        setTxnRef(res.transaction_id || `MBMCT-${Math.floor(100000 + Math.random() * 900000)}`);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#064B35', '#D79A18', '#6B2D67', '#7AAE45'],
        });
        setStep('success');
      } else {
        setErrorMessage(res?.message || 'Failed to record donation. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Could not connect to database server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(6, 75, 53, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '32px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          border: '1px solid rgba(215, 154, 24, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(6, 75, 53, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-deep)',
            transition: 'all 0.2s',
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-gold-pale)',
                  color: 'var(--color-gold-warm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  border: '1px solid rgba(215, 154, 24, 0.3)',
                }}
              >
                <Heart size={26} fill="currentColor" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--color-primary-deep)',
                  lineHeight: '1.2',
                }}
              >
                Make a Meaningful Contribution
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Your generosity brings dignity, education, healthcare &amp; hope.
              </p>
            </div>

            {/* Frequency Selector: One-Time / Monthly */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgba(6, 75, 53, 0.06)',
                borderRadius: '9999px',
                padding: '4px',
                marginBottom: '20px',
              }}
            >
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  backgroundColor: frequency === 'one-time' ? '#FFFFFF' : 'transparent',
                  color: frequency === 'one-time' ? 'var(--color-primary-deep)' : 'var(--color-text-secondary)',
                  boxShadow: frequency === 'one-time' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                One-Time Donation
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  backgroundColor: frequency === 'monthly' ? 'var(--color-primary-deep)' : 'transparent',
                  color: frequency === 'monthly' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  boxShadow: frequency === 'monthly' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Monthly Supporter ❤️
              </button>
            </div>

            {/* Amount Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block', marginBottom: '8px' }}>
                Select Donation Amount (₹ INR)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '10px' }}>
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountClick(amt)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '12px',
                      border: '1.5px solid',
                      borderColor: selectedAmount === amt ? 'var(--color-gold-warm)' : 'rgba(6, 75, 53, 0.12)',
                      backgroundColor: selectedAmount === amt ? 'var(--color-gold-pale)' : '#FFFFFF',
                      color: selectedAmount === amt ? 'var(--color-primary-deep)' : 'var(--color-text-primary)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: '700',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 32px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.92rem',
                    backgroundColor: '#FAFAF8',
                  }}
                />
              </div>
            </div>

            {/* Choose Program / Cause */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block', marginBottom: '8px' }}>
                Allocate To Specific Program
              </label>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(6, 75, 53, 0.15)',
                  fontSize: '0.9rem',
                  backgroundColor: '#FAFAF8',
                  color: 'var(--color-text-primary)',
                }}
              >
                <option value="All Causes / General Fund">Where It's Needed Most (General Welfare)</option>
                <option value="Student Education">Government School Student Education</option>
                <option value="School Needs">Government School Infrastructure &amp; Needs</option>
                <option value="Cancer Support">Cancer Patients Medical Support</option>
                <option value="Leprosy Support">Leprosy Patients Care &amp; Rehabilitation</option>
                <option value="Senior Citizen Care">Old Age People Food &amp; Shelter</option>
              </select>
            </div>

            {/* Donor Information */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={donorDetails.name}
                  onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={donorDetails.email}
                  onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={donorDetails.phone}
                  onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="PAN Card (For 80G Receipt)"
                  value={donorDetails.pan}
                  onChange={(e) => setDonorDetails({ ...donorDetails, pan: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
            </div>

            {/* Cause Selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-primary-deep)', display: 'block', marginBottom: '6px' }}>
                Designate Donation To:
              </label>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(6, 75, 53, 0.15)',
                  fontSize: '0.88rem',
                  backgroundColor: '#FAFAF8',
                  color: '#102A43',
                  fontWeight: '500',
                }}
              >
                <option value="Education Support">Government School Student Education</option>
                <option value="School Needs">Government School Needs &amp; Desks</option>
                <option value="Cancer Care">Cancer Patient Medication &amp; Care</option>
                <option value="Leprosy Support">Leprosy Patients Care &amp; Rehabilitation</option>
                <option value="Elderly Care">Old Age Abandoned Elderly Care</option>
                <option value="General Support">General Corpus Fund (Highest Need)</option>
              </select>
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {[
                { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                { id: 'card', label: 'Debit / Card', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building },
              ].map((m) => {
                const MIcon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '12px',
                      border: '1.5px solid',
                      borderColor: paymentMethod === m.id ? 'var(--color-primary-deep)' : 'rgba(6, 75, 53, 0.1)',
                      backgroundColor: paymentMethod === m.id ? 'rgba(6, 75, 53, 0.06)' : '#FFFFFF',
                      color: paymentMethod === m.id ? 'var(--color-primary-deep)' : 'var(--color-text-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                    }}
                  >
                    <MIcon size={18} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {errorMessage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.85rem', marginBottom: '14px' }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                borderRadius: '9999px',
                marginBottom: '14px',
                opacity: submitting ? 0.75 : 1,
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Recording Donation...</span>
                </>
              ) : (
                <>
                  <Heart size={18} fill="#FFFFFF" />
                  <span>Proceed to Donate ₹{currentTotal.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            {/* Trust badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <ShieldCheck size={16} color="var(--color-green-natural)" />
              <span>100% Secure &amp; Transparent • Eligible for 80G Tax Exemption</span>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
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

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.9rem',
                color: 'var(--color-primary-deep)',
                marginBottom: '8px',
              }}
            >
              Heartfelt Gratitude!
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Thank you, <strong>{donorDetails.name || 'Generous Donor'}</strong>! Your donation of{' '}
              <strong style={{ color: 'var(--color-gold-warm)' }}>₹{currentTotal.toLocaleString('en-IN')}</strong> for{' '}
              <em>{selectedCause}</em> creates immediate, positive impact.
            </p>

            <div
              style={{
                backgroundColor: '#FCF9F1',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(215, 154, 24, 0.3)',
                textAlign: 'left',
                fontSize: '0.85rem',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Receipt Reference:</span>
                <strong style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}>{txnRef || 'MBMCT-SUCCESS'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Beneficiary Cause:</span>
                <strong>{selectedCause}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>80G Tax Exemption:</span>
                <strong style={{ color: 'var(--color-green-natural)' }}>Available</strong>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="btn btn-dark"
              style={{
                padding: '12px 30px',
                fontSize: '0.92rem',
                borderRadius: '9999px',
              }}
            >
              Close &amp; Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
