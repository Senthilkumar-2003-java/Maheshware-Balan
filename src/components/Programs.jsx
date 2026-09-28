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
        paddingTop: '52px',
        paddingBottom: '64px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header — matches reference: left-aligned OUR PROGRAMS eyebrow, h2 "What We Support", right-aligned link */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}>
          <div>
            {/* Eyebrow */}
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
              OUR PROGRAMS
            </div>
            {/* Heading */}
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)',
              fontWeight: '700',
              color: '#17231F',
              lineHeight: '1.18',
              marginBottom: '4px',
            }}>
              What We Support
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: '#5B625E',
              lineHeight: '1.5',
            }}>
              We focus on key areas that create a lasting impact in society.
            </p>
          </div>

          {/* Right — View All Programs → link matching reference */}
          <Link
            to="/programs"
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
              backgroundColor: 'rgba(6, 75, 53, 0.05)',
              border: '1px solid rgba(6,75,53,0.1)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            className="view-all-link"
          >
            <span>View All Programs</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 5-Card Grid — exactly like reference */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '18px',
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
          background-color: #064B35;
          color: #FFFFFF !important;
          border-color: #064B35;
        }
        @media (max-width: 1200px) {
          .programs-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .programs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
