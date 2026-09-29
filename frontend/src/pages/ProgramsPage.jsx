import React, { useState } from 'react';
import { GraduationCap, School, Heart, Ribbon, Users, ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Program Images
import eduImg from '../assets/images/government-school-students.jpg';
import needsImg from '../assets/images/government-school-needs.jpg';
import cancerImg from '../assets/images/cancer-patient-support.jpg';
import aidsImg from '../assets/images/aids-support.jpg';
import seniorImg from '../assets/images/senior-citizen-support.jpg';

export default function ProgramsPage({ onOpenDonate }) {
  const [activeTab, setActiveTab] = useState('all');

  const programs = [
    {
      id: 'student-education',
      category: 'education',
      title: 'Government School Student Education',
      tagline: 'Empowering Young Minds with Books, Uniforms & Tutoring',
      image: eduImg,
      icon: GraduationCap,
      color: '#173F73',
      description: 'Many children from impoverished backgrounds drop out of school due to the lack of basic supplies, uniforms, bags, and academic guidance. Our trust sponsors deserving primary and secondary students, covering their complete schooling kit, nutrition support, and after-school remedial learning.',
      impactPoints: [
        '500+ students sponsored across rural and semi-urban government schools',
        'Distribution of notebooks, stationery kits, school bags, and uniforms',
        'Special academic coaching and science laboratory workshops',
        'Merit scholarships for higher secondary students aiming for college',
      ],
      ctaText: 'Sponsor a Student’s Education',
    },
    {
      id: 'school-needs',
      category: 'infrastructure',
      title: 'Government School Needs & Infrastructure',
      tagline: 'Transforming Neglected Classrooms into Vibrant Learning Hubs',
      image: needsImg,
      icon: School,
      color: '#6B2D67',
      description: 'A conducive physical environment is paramount for learning. We partner directly with school headmasters to repair classrooms, construct clean sanitization facilities, install safe drinking water filtration systems, set up libraries, and provide benches and smart teaching boards.',
      impactPoints: [
        'Renovation of classrooms, blackboards, and student desk benches',
        'Clean sanitation facilities and dedicated girl-student washrooms',
        'Installation of RO drinking water filtration units',
        'Creation of reading libraries with illustrated books and learning aids',
      ],
      ctaText: 'Support School Infrastructure',
    },
    {
      id: 'cancer-support',
      category: 'healthcare',
      title: 'Cancer Patients Support',
      tagline: 'Compassionate Financial, Nutritional & Emotional Care',
      image: cancerImg,
      icon: Heart,
      color: '#064B35',
      description: 'Cancer diagnosis brings severe financial stress and emotional exhaustion to low-income families. We provide direct financial aid for chemotherapy medicines, nutritional supplements, diagnostic scans, and counseling so no patient is forced to discontinue their treatment.',
      impactPoints: [
        'Subsidized and funded chemotherapy medication assistance',
        'Monthly high-protein nutritional care packages for recovery',
        'Palliative care support and psycho-oncology emotional counseling',
        'Transport and hospital stay assistance for rural families',
      ],
      ctaText: 'Support a Cancer Patient',
    },
    {
      id: 'leprosy-support',
      category: 'healthcare',
      title: 'Leprosy Patients Care & Rehabilitation',
      tagline: 'Dignity, Ulcer Wound Care, Nutrition & Social Rehabilitation',
      image: aidsImg,
      icon: Ribbon,
      color: '#6B2D67',
      description: 'Individuals affected by leprosy often suffer from severe societal isolation, physical disabilities, and chronic ulcers. Our trust provides regular antiseptic dressings, ulcer care kits, specialized protective footwear, nutritious groceries, and unconditional human dignity.',
      impactPoints: [
        'Regular antiseptic wound dressing and ulcer cleaning medical kits',
        'Customized microcellular rubber (MCR) protective footwear distribution',
        'Monthly nutritional grocery hampers ensuring adequate healing protein',
        'Dignified social inclusion, emotional counseling, and rehabilitation support',
      ],
      ctaText: 'Support Leprosy Care & Dignity',
    },
    {
      id: 'elder-support',
      category: 'elderly',
      title: 'Old Age People Support',
      tagline: 'Companionship, Daily Food, Warmth & Geriatric Healthcare',
      image: seniorImg,
      icon: Users,
      color: '#4F8A35',
      description: 'Elderly citizens who have been abandoned or lack family support deserve to live their golden years with dignity, comfort, and love. We support old age homes, organize mobile health checkups, provide walking aids and medicines, and create joyful community interaction days.',
      impactPoints: [
        'Daily wholesome meals and clean living essentials for destitute elders',
        'Regular doctor visits, eye checkups, and chronic medication supplies',
        'Distribution of walking sticks, hearing aids, and comfortable bedding',
        'Emotional companionship and festival celebrations with trust volunteers',
      ],
      ctaText: 'Support Senior Citizens',
    },
  ];

  const filteredPrograms = activeTab === 'all' ? programs : programs.filter((p) => p.category === activeTab);

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
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold-warm)', display: 'inline-block' }}></span>
            WHAT WE DO
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
            Our Humanitarian Programs
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Focused initiatives designed to address the most urgent needs in education, medical emergency relief, and social dignity.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '36px 0 20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { id: 'all', label: 'All Programs' },
            { id: 'education', label: 'Education' },
            { id: 'infrastructure', label: 'School Infrastructure' },
            { id: 'healthcare', label: 'Healthcare & Cancer Support' },
            { id: 'elderly', label: 'Elderly Care' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary-deep)' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid rgba(6, 75, 53, 0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Program Detailed Rows */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {filteredPrograms.map((prog, idx) => {
            const Icon = prog.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                id={prog.id}
                key={prog.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 36px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(6, 75, 53, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: isReversed ? '1fr 1.15fr' : '1.15fr 1fr',
                  alignItems: 'center',
                }}
                className="program-detail-card"
              >
                {/* Image Section */}
                <div
                  style={{
                    order: isReversed ? 2 : 1,
                    height: '100%',
                    minHeight: '340px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={prog.image}
                    alt={prog.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      padding: '8px 14px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: prog.color,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Icon size={18} />
                    <span>{prog.title}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  style={{
                    order: isReversed ? 1 : 2,
                    padding: '40px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold-warm)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    {prog.tagline}
                  </span>

                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '14px',
                      lineHeight: '1.25',
                    }}
                  >
                    {prog.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '1.65',
                      color: 'var(--color-text-secondary)',
                      marginBottom: '20px',
                    }}
                  >
                    {prog.description}
                  </p>

                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-primary-deep)', marginBottom: '10px' }}>
                      Key Impact Deliverables:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {prog.impactPoints.map((pt, pti) => (
                        <li key={pti} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-primary)' }}>
                          <CheckCircle2 size={16} color="var(--color-green-natural)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={onOpenDonate}
                    className="btn btn-primary"
                    style={{ padding: '12px 26px', fontSize: '0.92rem' }}
                  >
                    <Heart size={16} fill="#FFF" />
                    <span>{prog.ctaText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .program-detail-card {
            grid-template-columns: 1fr !important;
          }
          .program-detail-card > div {
            order: initial !important;
          }
        }
      `}</style>
    </div>
  );
}
