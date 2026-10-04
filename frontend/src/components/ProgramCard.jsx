import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProgramCard({ title, description, image, icon: Icon, link, iconColor = '#173F73' }) {
  return (
    <div className="program-card" style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '18px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.35s ease, box-shadow 0.35s ease',
    }}>
      {/* Image Container — Unobstructed 16:10 framing, heads & bodies fully visible */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '62%',   /* 16:10 ratio — unobstructed */
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
            objectPosition: 'center 22%',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Top-Right Sleek Glass Badge — Never blocks image bottom */}
        {Icon && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
            zIndex: 3,
          }}>
            <Icon size={18} strokeWidth={2.2} />
          </div>
        )}
      </div>

      {/* Content Block — Fully separated from image */}
      <div style={{
        padding: '18px 20px 22px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        flexGrow: 1,
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.08rem',
          fontWeight: '700',
          color: '#17231F',
          marginBottom: '8px',
          lineHeight: '1.3',
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: '0.84rem',
          lineHeight: '1.58',
          color: '#5B625E',
          marginBottom: '16px',
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
            gap: '6px',
            fontSize: '0.84rem',
            fontWeight: '700',
            color: '#173F73',
            textDecoration: 'none',
            transition: 'gap 0.2s, color 0.2s',
          }}
        >
          <span>Learn More</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <style>{`
        .program-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 34px rgba(23, 63, 115, 0.12);
        }
        .program-card:hover .card-img {
          transform: scale(1.04);
        }
        .program-card:hover .learn-more-link {
          color: #D79A18;
          gap: 9px;
        }
      `}</style>
    </div>
  );
}
