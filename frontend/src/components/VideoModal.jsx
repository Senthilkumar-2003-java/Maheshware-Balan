import React from 'react';
import { X, Play, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import heroThumb from '../assets/images/hero-children.jpg';

export default function VideoModal({ isOpen, onClose, onOpenDonate }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(6, 75, 53, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '720px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            cursor: 'pointer',
          }}
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        {/* Video Player Mockup / Documentary Showcase */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#000000',
            overflow: 'hidden',
          }}
        >
          <img
            src={heroThumb}
            alt="Documentary Story Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.85,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(6,75,53,0.7) 100%)',
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '24px',
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-warm)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 12px rgba(215, 154, 24, 0.35)',
                marginBottom: '16px',
                cursor: 'pointer',
              }}
            >
              <Play size={28} fill="#FFFFFF" style={{ marginLeft: '4px' }} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '6px' }}>
              “Serve with Love &amp; Compassion” — Our Journey
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', maxWidth: '480px' }}>
              Watch how compassionate individuals and community leaders joined hands to empower rural classrooms and support cancer patients.
            </p>
          </div>
        </div>

        {/* Modal Bottom Narrative */}
        <div style={{ padding: '24px 28px', backgroundColor: '#FCF9F1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-warm)' }}>
                Documentary Short Film
              </span>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-primary-deep)' }}>
                Maheswari &amp; Balan Memorial Charitable Trust
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenDonate();
              }}
              className="btn btn-primary"
              style={{
                padding: '10px 22px',
                fontSize: '0.88rem',
              }}
            >
              <Heart size={16} fill="#FFF" />
              <span>Support This Mission</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
