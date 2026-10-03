import React, { useState } from 'react';
import { Camera, Eye } from 'lucide-react';

// Images
import heroImg from '../assets/images/hero-children.jpg';
import eduImg from '../assets/images/government-school-students.jpg';
import needsImg from '../assets/images/government-school-needs.jpg';
import cancerImg from '../assets/images/cancer-patient-support.jpg';
import leprosyImg from '../assets/images/leprosy-support.jpg';
import seniorImg from '../assets/images/senior-citizen-support.jpg';
import impactImg from '../assets/images/impact-children.png';
import storyEdu from '../assets/images/story-education.png';
import storyHealth from '../assets/images/story-healthcare.png';
import storyComm from '../assets/images/story-community.png';
import plantImg from '../assets/images/plant-growth-hands.png';
import sunsetImg from '../assets/images/donation-hope.png';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    { title: 'Classroom Study Session', category: 'education', src: eduImg, caption: 'Students joyfully participating in afternoon interactive learning.' },
    { title: 'School Building Renewal', category: 'infrastructure', src: needsImg, caption: 'Renovated government primary school with fresh coats of paint and benches.' },
    { title: 'Empowering Young Dreams', category: 'education', src: heroImg, caption: 'Children with study books smiling with renewed hope for their future.' },
    { title: 'Compassionate Caregiver Visit', category: 'healthcare', src: cancerImg, caption: 'Volunteer holding hands with cancer patient during hospital garden session.' },
    { title: 'Leprosy Care & Dignity', category: 'healthcare', src: leprosyImg, caption: 'Providing dignified medical dressings, protective footwear, and community love for leprosy patients.' },
    { title: 'Golden Years Companionship', category: 'elderly', src: seniorImg, caption: 'Senior citizens sharing laughter and wholesome nutrition at the elder care home.' },
    { title: 'Horizon of Possibility', category: 'education', src: impactImg, caption: 'Young student walking forward towards higher education and a bright career.' },
    { title: 'Seeds of Change', category: 'community', src: plantImg, caption: 'Community gardening and environmental awareness with young saplings.' },
    { title: 'United for Humanity', category: 'community', src: sunsetImg, caption: 'Volunteers and supporters coming together under the golden evening sky.' },
    { title: 'Reading & Literacy Drive', category: 'education', src: storyEdu, caption: 'Rural reading circle encouraging students with illustrated storybooks.' },
    { title: 'Mobile Health Checkup', category: 'healthcare', src: storyHealth, caption: 'Free health screening camp for rural elderly and families.' },
    { title: 'Nutritional Basket Distribution', category: 'community', src: storyComm, caption: 'Distributing wholesome food staples and high protein grains to families.' },
  ];

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter);

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
            <Camera size={16} />
            MOMENTS OF IMPACT
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
            Our Photo Gallery
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Glimpses into the real lives transformed, schools rebuilt, and human spirits uplifted through your compassionate support.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '36px 0 24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'education', label: 'Education' },
            { id: 'infrastructure', label: 'School Needs' },
            { id: 'healthcare', label: 'Healthcare' },
            { id: 'elderly', label: 'Elderly Care' },
            { id: 'community', label: 'Community' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '9px 20px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '600',
                backgroundColor: filter === tab.id ? 'var(--color-primary-deep)' : '#FFFFFF',
                color: filter === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)',
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

      {/* Gallery Grid */}
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="gallery-grid"
          >
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(item)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(6, 75, 53, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                }}
                className="gallery-card"
              >
                <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="gallery-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(6, 75, 53, 0.4)',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      transition: 'opacity 0.3s ease',
                    }}
                    className="gallery-overlay"
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-gold-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Eye size={22} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-gold-warm)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {item.category}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.12rem', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setActiveImage(null)}
        >
          <div
            style={{
              maxWidth: '850px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', maxHeight: '70vh', overflow: 'hidden' }}>
              <img src={activeImage.src} alt={activeImage.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-primary-deep)', marginBottom: '6px' }}>
                {activeImage.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(6, 75, 53, 0.12);
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.06);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        @media (max-width: 991px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
