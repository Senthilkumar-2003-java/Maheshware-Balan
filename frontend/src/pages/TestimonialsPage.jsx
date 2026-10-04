import React from 'react';
import { Quote, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Avatars
import tStudent from '../assets/images/testimonial-student.jpg';
import tPatient from '../assets/images/testimonial-patient.jpg';
import tSenior from '../assets/images/testimonial-senior.jpg';
import tParent from '../assets/images/testimonial-parent.jpg';
import bannerTestimonials from '../assets/images/banner-testimonials.jpg';

export default function TestimonialsPage({ onOpenDonate }) {
  const stories = [
    {
      name: 'Priya',
      role: 'Class 9 Student, Government High School',
      quote: 'When my father lost his daily wage job during the harvest season, I thought I would have to discontinue my schooling. The Maheswari & Balan Trust provided all my textbooks, stationery, uniform, and exam coaching. Now I dream of becoming a teacher to educate other children in my village.',
      avatar: tStudent,
      tag: 'Education Beneficiary',
      location: 'Tamil Nadu',
    },
    {
      name: 'Ramesh',
      role: 'Cancer Warrior',
      quote: 'Undergoing chemotherapy was completely draining financially and emotionally. The trust sponsored three critical cycles of my specialized medication and supported my family with monthly nutrition kits. Their compassion gave me the strength to fight and recover.',
      avatar: tPatient,
      tag: 'Healthcare Aid',
      location: 'Chennai',
    },
    {
      name: 'Murugan',
      role: 'Senior Citizen Resident',
      quote: 'Living in old age without family support is daunting. The trust ensured we received hot nutritious meals every single day, regular geriatric health checkups, and most importantly, volunteers who sit and listen to us. We are not alone anymore.',
      avatar: tSenior,
      tag: 'Elder Care',
      location: 'Coimbatore',
    },
    {
      name: 'Arun',
      role: 'Primary School Student',
      quote: 'With the help from this trust, I got brand new school bags, notebooks, and math kits. Our classrooms also got new benches and clean drinking water. I love going to school every morning!',
      avatar: tParent,
      tag: 'School Support',
      location: 'Madurai',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FCF9F1', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Header (Balanced Scrim — Image vivid, Text crisp) */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(16, 24, 40, 0.28) 0%, rgba(16, 24, 40, 0.52) 100%), url(${bannerTestimonials}) center 15% / cover no-repeat`,
          color: '#FFFFFF',
          padding: '110px 0 85px 0',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container">
          <div
            className="banner-animate-1"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              fontWeight: '700',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F5D061',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(245, 208, 97, 0.4)',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <Quote size={16} color="#F5D061" />
            VOICES OF HOPE
          </div>
          <h1
            className="banner-animate-2"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)',
              fontWeight: '700',
              color: '#FFFFFF',
              textShadow: '0 3px 18px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.9)',
              lineHeight: '1.2',
              marginBottom: '16px',
            }}
          >
            Stories of Courage &amp; Transformation
          </h1>
          <p
            className="banner-animate-3"
            style={{
              fontSize: '1.12rem',
              color: '#F8FAFC',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.9)',
              maxWidth: '660px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '500',
            }}
          >
            Read authentic experiences from the students, patients, families, and community members touched by our initiatives.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '30px',
              marginBottom: '60px',
            }}
            className="testimonials-page-grid"
          >
            {stories.map((story, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(6, 75, 53, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Quote size={28} color="var(--color-green-natural)" fill="rgba(79, 138, 53, 0.2)" />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--color-primary-deep)',
                        backgroundColor: 'rgba(6, 75, 53, 0.06)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                      }}
                    >
                      {story.tag} • {story.location}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      color: 'var(--color-text-primary)',
                      fontStyle: 'italic',
                      marginBottom: '24px',
                    }}
                  >
                    “{story.quote}”
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(6, 75, 53, 0.08)',
                  }}
                >
                  <img
                    src={story.avatar}
                    alt={story.name}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-gold-warm)',
                    }}
                  />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-text-primary)' }}>
                      {story.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                      {story.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-primary-deep)',
              borderRadius: '24px',
              padding: '40px',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>
              Help Us Write the Next Story of Hope
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px', margin: '0 auto 24px auto' }}>
              Your contribution enables us to reach out to more schools, medical wards, and seniors waiting for a helping hand.
            </p>
            <button
              onClick={onOpenDonate}
              className="btn btn-primary"
              style={{ padding: '14px 30px', fontSize: '0.96rem' }}
            >
              <Heart size={18} fill="#FFF" />
              <span>Support Our Mission Today</span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
