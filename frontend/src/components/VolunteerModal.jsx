import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, Sparkles, Heart, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitVolunteerApi } from '../services/api';

export default function VolunteerModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interest: 'Education & Teaching',
    availability: 'Weekends',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await submitVolunteerApi({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferred_area: formData.interest,
        skills: formData.city ? `City: ${formData.city}. Notes: ${formData.message}` : formData.message,
        availability: formData.availability,
      });

      if (res && res.success) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#064B35', '#4F8A35', '#D79A18'],
        });
        setSubmitted(true);
      } else {
        setErrorMessage(res?.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(6, 75, 53, 0.7)',
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
          maxWidth: '540px',
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
            cursor: 'pointer',
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(6, 75, 53, 0.08)',
                  color: 'var(--color-primary-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}
              >
                <UserPlus size={26} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--color-primary-deep)',
                  lineHeight: '1.2',
                }}
              >
                Join Us as a Volunteer
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Share your time and skills to touch lives with kindness and empathy.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(6, 75, 53, 0.15)',
                  fontSize: '0.9rem',
                  backgroundColor: '#FAFAF8',
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.9rem',
                    backgroundColor: '#FAFAF8',
                  }}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(6, 75, 53, 0.15)',
                    fontSize: '0.9rem',
                    backgroundColor: '#FAFAF8',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Area of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(6, 75, 53, 0.15)',
                      fontSize: '0.86rem',
                      backgroundColor: '#FAFAF8',
                    }}
                  >
                    <option value="Education & Teaching">Education &amp; Teaching</option>
                    <option value="Healthcare Support">Healthcare &amp; Patient Camps</option>
                    <option value="Elderly Companionship">Elderly Companionship</option>
                    <option value="Community Events">Community Events &amp; Logistics</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(6, 75, 53, 0.15)',
                      fontSize: '0.86rem',
                      backgroundColor: '#FAFAF8',
                    }}
                  >
                    <option value="Weekends">Weekends Only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Flexible">Flexible / On-Call</option>
                  </select>
                </div>
              </div>

              <textarea
                rows="3"
                placeholder="Briefly tell us what motivates you to volunteer (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(6, 75, 53, 0.15)',
                  fontSize: '0.9rem',
                  backgroundColor: '#FAFAF8',
                  resize: 'none',
                }}
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
              className="btn btn-dark"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.98rem',
                borderRadius: '9999px',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Heart size={18} fill="#D79A18" color="#D79A18" />
                  <span>Submit Volunteer Application</span>
                </>
              )}
            </button>
          </form>
        ) : (
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
                fontSize: '1.8rem',
                color: 'var(--color-primary-deep)',
                marginBottom: '8px',
              }}
            >
              Application Received!
            </h3>

            <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Thank you, <strong>{formData.name}</strong>. Our trust volunteer coordinator will contact you at{' '}
              <strong>{formData.email}</strong> shortly.
            </p>

            <button
              onClick={handleReset}
              className="btn btn-primary"
              style={{
                padding: '12px 30px',
                fontSize: '0.92rem',
                borderRadius: '9999px',
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
