import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProgramCard({ title, description, image, icon: Icon, link, iconColor = 'var(--color-primary-deep)', iconBg = '#FFFFFF' }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
        border: '1px solid rgba(6, 75, 53, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100%',
      }}
      className="program-card"
    >
      {/* Top Image Container with Arch Shape */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3.4',
          overflow: 'hidden',
          backgroundColor: '#F5F0E4',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="card-img"
        />
        {/* Soft gradient bottom overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 100%)',
          }}
        />
      </div>

      {/* Floating Center Icon Badge */}
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 8px 20px rgba(6, 75, 53, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '-27px auto 14px auto',
          position: 'relative',
          zIndex: 5,
          border: '2px solid rgba(215, 154, 24, 0.25)',
          color: iconColor,
        }}
      >
        <Icon size={24} strokeWidth={2} />
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '0 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.22rem',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            marginBottom: '10px',
            lineHeight: '1.3',
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: '1.55',
            color: 'var(--color-text-secondary)',
            marginBottom: '20px',
            flexGrow: 1,
          }}
        >
          {description}
        </p>

        <Link
          to={link || '/programs'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--color-purple-elegant)',
            textDecoration: 'none',
            padding: '4px 0',
            transition: 'gap 0.2s ease, color 0.2s ease',
          }}
          className="learn-more-link"
        >
          <span>Learn More</span>
          <ArrowRight size={14} className="arrow-icon" />
        </Link>
      </div>

      <style>{`
        .program-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(6, 75, 53, 0.12);
          border-color: rgba(215, 154, 24, 0.35);
        }
        .program-card:hover .card-img {
          transform: scale(1.06);
        }
        .program-card:hover .learn-more-link {
          color: var(--color-primary-deep);
          gap: 9px;
        }
      `}</style>
    </div>
  );
}
