import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProgramCard({ title, description, image, icon: Icon, link, iconColor = '#064B35' }) {
  return (
    <div className="program-card" style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(6,75,53,0.07)',
      border: '1px solid rgba(6,75,53,0.07)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}>
      {/* Image — 4:3 like reference card images */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '75%',   /* 4:3 ratio */
        overflow: 'hidden',
        backgroundColor: '#F5F0E4',
        flexShrink: 0,
      }}>
        <img
          src={image}
          alt={title}
          className="card-img"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.45s ease',
          }}
        />
      </div>

      {/* Floating icon — centered, overlapping image/content border */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-22px',
        zIndex: 2,
        position: 'relative',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(6,75,53,0.13)',
          border: '2px solid rgba(215,154,24,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
        }}>
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '12px 16px 20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flexGrow: 1,
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.03rem',
          fontWeight: '700',
          color: '#17231F',
          marginBottom: '8px',
          lineHeight: '1.3',
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: '0.8rem',
          lineHeight: '1.52',
          color: '#5B625E',
          marginBottom: '14px',
          flexGrow: 1,
        }}>
          {description}
        </p>

        <Link
          to={link || '/programs'}
          className="learn-more-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: '#6B2D67',
            textDecoration: 'none',
            transition: 'gap 0.2s, color 0.2s',
          }}
        >
          Learn More <ArrowRight size={13} />
        </Link>
      </div>

      <style>{`
        .program-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(6,75,53,0.12);
        }
        .program-card:hover .card-img {
          transform: scale(1.05);
        }
        .program-card:hover .learn-more-link {
          color: #064B35;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
