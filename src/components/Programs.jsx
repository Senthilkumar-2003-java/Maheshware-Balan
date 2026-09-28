import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, School, Heart, Ribbon, Users } from 'lucide-react';
import ProgramCard from './ProgramCard';

// Images
import eduImg from '../assets/images/government-school-students.jpg';
import needsImg from '../assets/images/government-school-needs.jpg';
import cancerImg from '../assets/images/cancer-patient-support.jpg';
import aidsImg from '../assets/images/aids-support.jpg';
import seniorImg from '../assets/images/senior-citizen-support.jpg';

export default function Programs() {
  const programsData = [
    {
      title: 'Government School Student Education',
      description: 'We support deserving students with education, books, uniforms and essential learning resources.',
      image: eduImg,
      icon: GraduationCap,
      link: '/programs#student-education',
      iconColor: '#173F73',
    },
    {
      title: 'Government School Needs',
      description: 'Improving infrastructure, facilities and essential resources for better learning environments.',
      image: needsImg,
      icon: School,
      link: '/programs#school-needs',
      iconColor: '#6B2D67',
    },
    {
      title: 'Cancer Patients Support',
      description: 'Financial and medical support for cancer patients and their families in need.',
      image: cancerImg,
      icon: Heart,
      link: '/programs#cancer-support',
      iconColor: '#064B35',
    },
    {
      title: 'AIDS Patients Support',
      description: 'Awareness, medical support and care for a healthier and stigma-free life.',
      image: aidsImg,
      icon: Ribbon,
      link: '/programs#aids-support',
      iconColor: '#6B2D67',
    },
    {
      title: 'Old Age People Support',
      description: 'Food, healthcare, shelter and companionship for our senior citizens.',
      image: seniorImg,
      icon: Users,
      link: '/programs#elder-support',
      iconColor: '#4F8A35',
    },
  ];

  return (
    <section
      id="programs"
      style={{
        paddingTop: '60px',
        paddingBottom: '90px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container-wide">
        {/* Section Header with right-aligned link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '44px',
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
              OUR PROGRAMS
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
                color: 'var(--color-text-primary)',
                lineHeight: '1.2',
                marginBottom: '8px',
              }}
            >
              What We Support
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-secondary)',
                maxWidth: '600px',
              }}
            >
              We focus on key areas that create a lasting impact in society.
            </p>
          </div>

          <Link
            to="/programs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.95rem',
              fontWeight: '700',
              color: 'var(--color-primary-deep)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6, 75, 53, 0.05)',
              transition: 'all 0.2s ease',
            }}
            className="view-all-link"
          >
            <span>View All Programs</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 5-Card Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
          }}
          className="programs-grid"
        >
          {programsData.map((item, index) => (
            <ProgramCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              icon={item.icon}
              link={item.link}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </div>

      <style>{`
        .view-all-link:hover {
          background-color: var(--color-primary-deep);
          color: #FFFFFF;
        }
        @media (max-width: 1200px) {
          .programs-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 860px) {
          .programs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .programs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
