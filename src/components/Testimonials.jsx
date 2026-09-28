import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';

// Avatars
import tStudent from '../assets/images/testimonial-student.jpg';
import tPatient from '../assets/images/testimonial-patient.jpg';
import tSenior from '../assets/images/testimonial-senior.jpg';
import tParent from '../assets/images/testimonial-parent.jpg';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya',
      role: 'Student, Government School',
      quote: 'Thanks to the trust’s support, I am able to continue my education. Now I dream of becoming a teacher.',
      avatar: tStudent,
      tag: 'Education Beneficiary',
    },
    {
      name: 'Ramesh',
      role: 'Cancer Patient, Chennai',
      quote: 'The financial support helped me continue my treatment. I am forever grateful for their kindness.',
      avatar: tPatient,
      tag: 'Medical Support',
    },
    {
      name: 'Murugan',
      role: 'Senior Citizen, Elder Care',
      quote: 'This trust gave us food, care and companionship. We are not alone anymore.',
      avatar: tSenior,
      tag: 'Senior Care',
    },
    {
      name: 'Arun',
      role: 'Student, Government School',
      quote: 'With the help from this trust, I could get school books and uniforms. It gives me hope for my future.',
      avatar: tParent,
      tag: 'Education Beneficiary',
    },
  ];

  return (
    <section
      id="testimonials"
      style={{
        paddingTop: '70px',
        paddingBottom: '85px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-primary-deep)',
                marginBottom: '8px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold-warm)', display: 'inline-block' }}></span>
              WHAT PEOPLE SAY
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
                color: 'var(--color-text-primary)',
                lineHeight: '1.2',
              }}
            >
              Kind Words. Big Impact.
            </h2>
          </div>

          <Link
            to="/testimonials"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.92rem',
              fontWeight: '700',
              color: 'var(--color-primary-deep)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6, 75, 53, 0.05)',
              transition: 'all 0.2s ease',
            }}
            className="view-testimonials-btn"
          >
            <span>More Testimonials</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FCF9F1',
                borderRadius: '20px',
                padding: '24px 20px',
                boxShadow: '0 8px 24px rgba(6, 75, 53, 0.04)',
                border: '1px solid rgba(6, 75, 53, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              className="testimonial-card"
            >
              {/* Green Quote Icon */}
              <div
                style={{
                  color: 'var(--color-green-natural)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Quote size={24} fill="currentColor" opacity={0.3} />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: 'var(--color-primary-deep)',
                    backgroundColor: 'rgba(6, 75, 53, 0.06)',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Quote Text */}
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: '1.6',
                  color: 'var(--color-text-primary)',
                  fontStyle: 'italic',
                  marginBottom: '20px',
                  flexGrow: 1,
                }}
              >
                “{item.quote}”
              </p>

              {/* Author Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(6, 75, 53, 0.08)',
                }}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--color-gold-warm)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.2',
                    }}
                  >
                    {item.name}
                  </h4>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.3',
                      marginTop: '2px',
                    }}
                  >
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .view-testimonials-btn:hover {
          background-color: var(--color-primary-deep);
          color: #FFFFFF;
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(6, 75, 53, 0.1);
          border-color: rgba(215, 154, 24, 0.3);
          background-color: #FFFFFF;
        }
        @media (max-width: 1100px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
