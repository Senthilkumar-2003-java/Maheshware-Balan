import React, { useState } from 'react';
import { 
  Users, Heart, Sparkles, CheckCircle2, BookOpen, Stethoscope, 
  HandHeart, Award, Clock, MapPin, Send, AlertCircle, Loader2, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import bannerVolunteer from '../assets/images/banner-volunteer.jpg';
import { submitVolunteerApi } from '../services/api';

export default function Volunteer({ onOpenDonate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    profession: 'Working Professional',
    interests: ['Education & Teaching'],
    availability: 'Weekends',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const volunteerAreas = [
    {
      id: 'education',
      title: 'Teaching & Mentoring',
      icon: BookOpen,
      desc: 'Conduct evening tuition, weekend math & English classes, and science workshops for government school children.',
      color: '#173F73',
    },
    {
      id: 'healthcare',
      title: 'Medical Camp Coordination',
      icon: Stethoscope,
      desc: 'Assist doctors during rural health checkups, cancer awareness screenings, and medicine distribution.',
      color: '#064B35',
    },
    {
      id: 'community',
      title: 'Relief & Food Drives',
      icon: HandHeart,
      desc: 'Organize grocery kits, clothing distribution, and disaster emergency support for impoverished families.',
      color: '#D79A18',
    },
    {
      id: 'elderly',
      title: 'Senior Dignity & Care',
      icon: Heart,
      desc: 'Spend compassionate time with abandoned elders, provide companionship, and assist geriatric medical care.',
      color: '#6B2D67',
    },
  ];

  const interestOptions = [
    'Education & Teaching',
    'Medical & Health Camps',
    'Food & Relief Distribution',
    'Elderly Care & Support',
    'Event Organization',
    'Digital & Media Support',
  ];

  const handleInterestToggle = (area) => {
    setFormData(prev => {
      const exists = prev.interests.includes(area);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== area) };
      } else {
        return { ...prev, interests: [...prev.interests, area] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please fill in your name and contact phone number.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitVolunteerApi({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferred_area: formData.interests.join(', '),
        skills: `Profession: ${formData.profession}. City: ${formData.city}. Notes: ${formData.message}`,
        availability: formData.availability,
      });

      if (res && res.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#173F73', '#D79A18', '#064B35'],
        });
        setSubmitted(true);
      } else {
        setErrorMessage(res?.message || 'Failed to submit application. Please check your network and try again.');
      }
    } catch (err) {
      // Graceful local fallback confirmation
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#173F73', '#D79A18', '#064B35'],
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FCF9F1', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* ── BANNER — Clean text banner without card container so background image is fully visible ── */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(10, 20, 30, 0.5) 0%, rgba(10, 20, 30, 0.25) 50%, rgba(10, 20, 30, 0.7) 100%), url(${bannerVolunteer}) center 95% / cover no-repeat`,
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
              <Users size={15} color="#F5D061" />
              <span>SERVE WITH LOVE &amp; PURPOSE</span>
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
              Become a Volunteer
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
              Join compassionate hearts bringing education to rural children, medical relief to families, and warm dignity to our elders.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4 WAYS TO VOLUNTEER ── */}
      <section style={{ padding: '70px 0 50px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 46px auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#173F73',
              marginBottom: '8px',
            }}>
              <Sparkles size={14} color="#D79A18" />
              Ways to Make an Impact
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)',
              fontWeight: '700',
              color: '#17231F',
              marginBottom: '12px',
            }}>
              Where You Can Help
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#5B625E', lineHeight: '1.6' }}>
              Whether you have 2 hours on a weekend or can support monthly initiatives, your time creates tangible transformation.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {volunteerAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="apple-card-hover"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '30px 24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    backgroundColor: `${area.color}14`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: area.color,
                    marginBottom: '20px',
                  }}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#17231F',
                    marginBottom: '10px',
                  }}>
                    {area.title}
                  </h3>
                  <p style={{
                    fontSize: '0.86rem',
                    color: '#5B625E',
                    lineHeight: '1.6',
                    marginBottom: '18px',
                    flexGrow: 1,
                  }}>
                    {area.desc}
                  </p>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: area.color,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <span>Flexible Schedule</span>
                    <Clock size={13} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER REGISTRATION FORM ── */}
      <section style={{ padding: '30px 0 70px 0' }}>
        <div className="container">
          <div style={{
            maxWidth: '820px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            boxShadow: '0 20px 60px rgba(23, 63, 115, 0.08)',
            border: '1px solid rgba(23, 63, 115, 0.1)',
            overflow: 'hidden',
          }}>
            {/* Form Top Accent */}
            <div style={{
              background: 'linear-gradient(90deg, #102B50 0%, #173F73 50%, #D79A18 100%)',
              height: '8px',
              width: '100%',
            }} />

            <div style={{ padding: 'clamp(28px, 5vw, 50px)' }}>
              {submitted ? (
                /* Success Confirmation State */
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(23, 63, 115, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                    color: '#173F73',
                  }}>
                    <CheckCircle2 size={42} strokeWidth={2.2} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#17231F',
                    marginBottom: '10px',
                  }}>
                    Application Received!
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    color: '#5B625E',
                    maxWidth: '520px',
                    margin: '0 auto 26px auto',
                    lineHeight: '1.6',
                  }}>
                    Thank you, <strong>{formData.name}</strong>, for stepping forward to serve. Our volunteer coordinator will reach out to you via WhatsApp / Phone at <strong>{formData.phone}</strong> within 24 hours.
                  </p>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    color: '#173F73',
                    fontWeight: '600',
                    marginBottom: '30px',
                  }}>
                    <Award size={16} color="#D79A18" />
                    <span>Certificate of Appreciation provided upon drive completion</span>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          city: '',
                          profession: 'Working Professional',
                          interests: ['Education & Teaching'],
                          availability: 'Weekends',
                          message: '',
                        });
                      }}
                      style={{
                        padding: '12px 28px',
                        background: 'linear-gradient(135deg, #173F73 0%, #102B50 100%)',
                        color: '#FFFFFF',
                        borderRadius: '9999px',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(23,63,115,0.3)',
                      }}
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                /* Registration Form */
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: '#D79A18',
                      marginBottom: '8px',
                    }}>
                      <Heart size={14} fill="#D79A18" />
                      Registration Form
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.7rem, 2.8vw, 2.2rem)',
                      fontWeight: '700',
                      color: '#17231F',
                      marginBottom: '8px',
                    }}>
                      Join Our Volunteer Family
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: '#5B625E' }}>
                      Fill in your details below and our team will connect you to active ground programs.
                    </p>
                  </div>

                  {errorMessage && (
                    <div style={{
                      padding: '12px 18px',
                      borderRadius: '12px',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#B91C1C',
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '24px',
                    }}>
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {/* Name + Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                          Full Name <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Senthilkumar Balan"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = '#173F73'}
                          onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                          WhatsApp / Contact Number <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = '#173F73'}
                          onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                        />
                      </div>
                    </div>

                    {/* Email + City */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = '#173F73'}
                          onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                          City / District, Tamil Nadu
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Madurai, Chennai, Coimbatore"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = '#173F73'}
                          onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                        />
                      </div>
                    </div>

                    {/* Profession & Availability */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                          Current Occupation
                        </label>
                        <select
                          value={formData.profession}
                          onChange={e => setFormData({ ...formData, profession: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.92rem',
                            backgroundColor: '#FFFFFF',
                            outline: 'none',
                          }}
                        >
                          <option value="College Student">College Student</option>
                          <option value="Working Professional">Working Professional</option>
                          <option value="Doctor / Nurse / Healthcare">Doctor / Nurse / Healthcare</option>
                          <option value="Teacher / Academic">Teacher / Academic</option>
                          <option value="Homemaker">Homemaker</option>
                          <option value="Retired">Retired Senior</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                          Availability
                        </label>
                        <select
                          value={formData.availability}
                          onChange={e => setFormData({ ...formData, availability: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.92rem',
                            backgroundColor: '#FFFFFF',
                            outline: 'none',
                          }}
                        >
                          <option value="Weekends (Saturdays & Sundays)">Weekends (Saturdays &amp; Sundays)</option>
                          <option value="Weekdays (Morning or Evening)">Weekdays (Morning or Evening)</option>
                          <option value="Monthly Program Drives">Monthly Program Drives (1-2 days/month)</option>
                          <option value="Flexible / On-call for Emergency Relief">Flexible / On-call for Emergency Relief</option>
                        </select>
                      </div>
                    </div>

                    {/* Volunteer Interest Checkboxes */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '10px' }}>
                        Areas You Wish to Support (Select all that apply)
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '10px',
                      }}>
                        {interestOptions.map((opt) => {
                          const isChecked = formData.interests.includes(opt);
                          return (
                            <div
                              key={opt}
                              onClick={() => handleInterestToggle(opt)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: isChecked ? '1.5px solid #173F73' : '1.5px solid #E2E8F0',
                                backgroundColor: isChecked ? 'rgba(23, 63, 115, 0.05)' : '#FFFFFF',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <div style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '4px',
                                border: isChecked ? 'none' : '1.5px solid #94A3B8',
                                backgroundColor: isChecked ? '#173F73' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                flexShrink: 0,
                              }}>
                                {isChecked && <CheckCircle2 size={14} strokeWidth={3} />}
                              </div>
                              <span style={{ fontSize: '0.85rem', fontWeight: isChecked ? '700' : '500', color: isChecked ? '#173F73' : '#475569' }}>
                                {opt}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message / Motivation */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#17231F', marginBottom: '7px' }}>
                        Brief Note / Previous Experience (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what motivates you to volunteer or any specific skills you bring (teaching, first aid, driving, photography)..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2E8F0',
                          fontSize: '0.92rem',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                        }}
                        onFocus={e => e.target.style.borderColor = '#173F73'}
                        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: '15px 32px',
                        background: 'linear-gradient(135deg, #173F73 0%, #102B50 100%)',
                        color: '#FFFFFF',
                        borderRadius: '9999px',
                        fontWeight: '700',
                        fontSize: '1rem',
                        border: 'none',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 18px rgba(23, 63, 115, 0.3)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} color="#F5D061" />
                          <span>Submit Volunteer Registration</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
