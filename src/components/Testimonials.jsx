import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Avatars
import tStudent from '../assets/images/testimonial-student.jpg';
import tPatient from '../assets/images/testimonial-patient.jpg';
import tSenior from '../assets/images/testimonial-senior.jpg';
import tParent from '../assets/images/testimonial-parent.jpg';

const QuoteIcon = () => (
  <svg width="22" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 18V10.8C0 7.2 1.2 4.4 3.6 2.4 6 0.4 9.2 0 13.2 0.8L12 3.6C10 3.2 8.4 3.6 7.2 4.8 6 6 5.6 7.6 5.6 9.6H9.6V18H0ZM14.4 18V10.8C14.4 7.2 15.6 4.4 18 2.4 20.4 0.4 23.6 0 27.6 0.8L26.4 3.6C24.4 3.2 22.8 3.6 21.6 4.8 20.4 6 20 7.6 20 9.6H24V18H14.4Z" fill="#4F8A35" fillOpacity="0.35"/>
  </svg>
);

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya',
      role: 'Student, Government School',
      quote: "Thanks to the trust's support, I am able to continue my education. Now I dream of becoming a teacher.",
      avatar: tStudent,
      tag: 'Education Beneficiary',
      tagColor: '#173F73',
      tagBg: 'rgba(23,63,115,0.07)',
    },
    {
      name: 'Ramesh',
      role: 'Cancer Patient, Chennai',
      quote: "The financial support helped me continue my treatment. I am forever grateful for their kindness.",
      avatar: tPatient,
      tag: 'Medical Support',
      tagColor: '#6B2D67',
      tagBg: 'rgba(107,45,103,0.07)',
    },
    {
      name: 'Murugan',
      role: 'Senior Citizen, Elder Care Support',
      quote: "This trust gave us food, care and companionship. We are not alone anymore.",
      avatar: tSenior,
      tag: 'Senior Care',
      tagColor: '#4F8A35',
      tagBg: 'rgba(79,138,53,0.07)',
    },
    {
      name: 'Arun',
      role: 'Student, Government School',
      quote: "With the help from this trust, I could get school books and uniforms. It gives me hope for my future.",
      avatar: tParent,
      tag: 'Education Beneficiary',
      tagColor: '#173F73',
      tagBg: 'rgba(23,63,115,0.07)',
    },
  ];

  return (
    <section
      id="testimonials"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header Row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.17em',
              textTransform: 'uppercase',
              color: '#064B35',
              marginBottom: '6px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D79A18', display: 'inline-block' }} />
              WHAT PEOPLE SAY
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)',
              fontWeight: '700',
              color: '#17231F',
              lineHeight: '1.18',
            }}>
              Kind Words. Big Impact.
            </h2>
          </div>

          <Link
            to="/testimonials"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#064B35',
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6,75,53,0.05)',
              border: '1px solid rgba(6,75,53,0.1)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            className="view-testimonials-btn"
          >
            <span>More Testimonials</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '18px',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial-card"
              style={{
                backgroundColor: '#FCF9F1',
                borderRadius: '18px',
                padding: '20px 18px',
                boxShadow: '0 6px 20px rgba(6,75,53,0.04)',
                border: '1px solid rgba(6,75,53,0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
            >
              {/* Quote icon + Tag row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}>
                <QuoteIcon />
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  color: item.tagColor,
                  backgroundColor: item.tagBg,
                  padding: '3px 9px',
                  borderRadius: '9999px',
                }}>
                  {item.tag}
                </span>
              </div>

              {/* Quote text */}
              <p style={{
                fontSize: '0.87rem',
                lineHeight: '1.58',
                color: '#17231F',
                fontStyle: 'italic',
                marginBottom: '16px',
                flexGrow: 1,
              }}>
                "{item.quote}"
              </p>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(6,75,53,0.08)',
              }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #D79A18',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    color: '#17231F',
                    lineHeight: '1.2',
                  }}>
                    — {item.name}
                  </div>
                  <div style={{
                    fontSize: '0.73rem',
                    color: '#5B625E',
                    lineHeight: '1.3',
                    marginTop: '2px',
                  }}>
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
          background-color: #064B35;
          color: #FFFFFF !important;
          border-color: #064B35;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(6,75,53,0.1);
          border-color: rgba(215,154,24,0.25);
          background-color: #FFFFFF;
        }
        @media (max-width: 1100px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
