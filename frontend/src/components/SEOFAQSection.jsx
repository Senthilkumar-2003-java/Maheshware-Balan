import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * SEO-Optimized FAQ Section with Schema.org FAQPage JSON-LD & Microdata.
 * Fully responsive, accessible, Apple-style smooth accordion.
 */
export default function SEOFAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our charitable initiatives, 80G tax benefits, and governance.",
  badge = "CLEAR & TRANSPARENT",
  faqs = [],
}) {
  const [openIndex, setOpenIndex] = useState(0);

  // Generate Schema.org JSON-LD Structured Data for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        padding: '70px 0',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(16, 43, 80, 0.06)',
        borderBottom: '1px solid rgba(16, 43, 80, 0.06)',
      }}
      itemScope
      itemType="https://schema.org/FAQPage"
      className="seo-faq-section"
    >
      {/* Dynamic Schema.org JSON-LD for Google Search Engine indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '46px' }} className="apple-reveal">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#D79A18',
              backgroundColor: 'rgba(215, 154, 24, 0.1)',
              padding: '6px 14px',
              borderRadius: '9999px',
              marginBottom: '12px',
            }}
          >
            <HelpCircle size={14} color="#D79A18" />
            <span>{badge}</span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
              color: '#102B50',
              fontWeight: '700',
              lineHeight: '1.25',
              marginBottom: '12px',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#5B625E',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion List with Microdata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                style={{
                  backgroundColor: isOpen ? '#FFFFFF' : '#FAFAF8',
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid #D79A18' : '1px solid rgba(16, 43, 80, 0.1)',
                  boxShadow: isOpen
                    ? '0 10px 30px rgba(16, 43, 80, 0.08)'
                    : '0 2px 6px rgba(0, 0, 0, 0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="apple-reveal apple-reveal-scale"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#102B50',
                    outline: 'none',
                  }}
                >
                  <span
                    itemProp="name"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.08rem',
                      fontWeight: '700',
                      lineHeight: '1.4',
                      color: isOpen ? '#102B50' : '#1F2937',
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'rgba(215, 154, 24, 0.15)' : 'rgba(16, 43, 80, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown size={18} color={isOpen ? '#D79A18' : '#6B7280'} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    style={{
                      padding: '0 22px 20px 22px',
                      borderTop: '1px solid rgba(16, 43, 80, 0.06)',
                      animation: 'faqFadeIn 0.28s ease',
                    }}
                  >
                    <p
                      itemProp="text"
                      style={{
                        paddingTop: '14px',
                        fontSize: '0.94rem',
                        lineHeight: '1.7',
                        color: '#4B5563',
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes faqFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .seo-faq-section button {
            padding: 16px 16px !important;
          }
          .seo-faq-section p[itemprop="text"] {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
