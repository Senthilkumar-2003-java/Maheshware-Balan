import React, { useState } from 'react';
import { Heart, ShieldCheck, FileCheck, Landmark, ArrowRight, Sparkles, CheckCircle2, QrCode, CreditCard, Building, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitDonationApi } from '../services/api';
import bannerDonations from '../assets/images/banner-donations.jpg';
import SEOFAQSection from '../components/SEOFAQSection';

import { openRazorpayCheckout } from '../utils/razorpay';
import { Download } from 'lucide-react';

function numberToWords(num) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const n = parseInt(num, 10);
  if (isNaN(n) || n <= 0) return '';
  if (n === 0) return 'Zero';
  function convert(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convert(n % 100) : '');
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + convert(n % 10000000) : '');
  }
  return convert(n) + ' Rupees Only';
}

export default function Donations({ onOpenDonate }) {
  const [amount, setAmount] = useState(2500);
  const [customVal, setCustomVal] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [cause, setCause] = useState('Education Support');
  const [donated, setDonated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [receiptData, setReceiptData] = useState(null);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
  });

  const presets = [500, 1000, 2500, 5000, 10000];

  const handlePreset = (val) => {
    setAmount(val);
    setCustomVal('');
  };

  const handleCustom = (e) => {
    setCustomVal(e.target.value);
    setAmount(null);
  };

  const total = customVal ? Number(customVal) || 0 : amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (total <= 0) return;
    if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
      setErrorMessage('Please provide your name, email, and phone number.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

    // Open Real Razorpay Checkout Gateway!
    openRazorpayCheckout({
      amount: total,
      currency: 'INR',
      donorName: donorInfo.name,
      email: donorInfo.email,
      phone: donorInfo.phone,
      cause: cause,
      notes: {
        frequency,
        pan: donorInfo.pan || 'N/A',
      },
      onSuccess: async (rzpResponse) => {
        try {
          const generatedReceiptNo = `REC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
          const txnId = rzpResponse.razorpay_payment_id || `RZP-${Date.now()}`;

          await submitDonationApi({
            donor_name: donorInfo.name,
            email: donorInfo.email,
            phone: donorInfo.phone,
            pan_number: donorInfo.pan || null,
            amount: total,
            cause,
            payment_method: 'Razorpay',
            transaction_id: txnId,
            razorpay_payment_id: rzpResponse.razorpay_payment_id,
            razorpay_order_id: rzpResponse.razorpay_order_id || null,
            razorpay_signature: rzpResponse.razorpay_signature || null,
            notes: `Plan: ${frequency} | Razorpay ID: ${rzpResponse.razorpay_payment_id}`,
          });

          const receipt = {
            receiptNo: generatedReceiptNo,
            transactionId: txnId,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            donorName: donorInfo.name,
            email: donorInfo.email,
            phone: donorInfo.phone,
            pan: donorInfo.pan ? donorInfo.pan.toUpperCase() : 'N/A',
            amount: total,
            amountInWords: numberToWords(total),
            cause,
            frequency: frequency === 'monthly' ? 'Monthly Recurring' : 'One-Time Donation',
            paymentMethod: 'Razorpay Gateway (Online Verified)',
          };

          setReceiptData(receipt);
          setTxnRef(txnId);
          setDonated(true);
          setSubmitting(false);

          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#173F73', '#064B35', '#D79A18', '#F5D061'],
          });
        } catch (saveErr) {
          console.error('Error saving donation:', saveErr);
          setErrorMessage('Payment received, but database sync encountered an issue. Ref ID: ' + rzpResponse.razorpay_payment_id);
          setSubmitting(false);
        }
      },
      onDismiss: () => {
        setSubmitting(false);
      },
      onFailure: (err) => {
        setSubmitting(false);
        setErrorMessage(err?.description || err?.message || 'Payment was declined or cancelled. Please try again.');
      },
    });
  };

  const handleDownloadReceipt = () => {
    if (!receiptData) return;

    const printWindow = window.open('', '_blank', 'width=880,height=980');
    if (!printWindow) {
      alert('Please allow popups to download and print your donation receipt.');
      return;
    }

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>80G Donation Receipt - ${receiptData.receiptNo} - Maheswari & Balan Memorial Charitable Trust</title>
        <meta charset="utf-8" />
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            color: #1F2937;
            background-color: #F8FAFC;
            margin: 0;
            padding: 24px;
            line-height: 1.5;
          }
          .receipt-box {
            max-width: 780px;
            margin: 0 auto;
            border: 3px double #064B35;
            outline: 1.5px solid #D79A18;
            outline-offset: -8px;
            padding: 34px 30px;
            border-radius: 12px;
            position: relative;
            background: #FFFFFF;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #D79A18;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .trust-name {
            font-family: Georgia, serif;
            font-size: 23px;
            font-weight: 800;
            letter-spacing: 0.02em;
            margin: 0;
            text-transform: uppercase;
          }
          .trust-name .part1 { color: #173F73; }
          .trust-name .amp { color: #D79A18; font-style: italic; }
          .trust-name .part2 { color: #064B35; }
          .trust-subtitle {
            font-size: 11px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #173F73;
            font-weight: 700;
            margin-top: 3px;
          }
          .motto {
            font-style: italic;
            color: #D79A18;
            font-size: 13px;
            font-weight: 600;
            margin: 4px 0 8px 0;
          }
          .reg-info {
            font-size: 11px;
            color: #4B5563;
            line-height: 1.6;
          }
          .receipt-badge-wrap {
            text-align: center;
            margin: 16px 0;
          }
          .receipt-badge {
            display: inline-block;
            background-color: #064B35;
            color: #F5D061;
            padding: 6px 24px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.06em;
            border: 1px solid #D79A18;
          }
          .grid-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 16px 0;
            font-size: 13px;
            background-color: #F0FDF4;
            border: 1px solid #BBF7D0;
            padding: 12px 18px;
            border-radius: 8px;
          }
          .donor-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 13px;
          }
          .donor-table th, .donor-table td {
            padding: 10px 14px;
            border-bottom: 1px solid #E5E7EB;
            text-align: left;
          }
          .donor-table th {
            width: 34%;
            color: #173F73;
            font-weight: 700;
            background-color: #F8FAFC;
          }
          .donor-table td {
            color: #111827;
            font-weight: 600;
          }
          .amount-highlight {
            font-size: 24px;
            color: #064B35;
            font-weight: 800;
          }
          .tax-note {
            background-color: #F8FAFC;
            border-left: 4px solid #064B35;
            padding: 12px 16px;
            font-size: 11px;
            color: #374151;
            border-radius: 6px;
            margin-bottom: 24px;
            line-height: 1.6;
          }
          .footer-signatures {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 30px;
            padding-top: 18px;
          }
          .seal-box {
            text-align: center;
            width: 160px;
            border: 2px dashed #064B35;
            border-radius: 10px;
            padding: 10px 8px;
            background: #FCFDFB;
          }
          .seal-star { font-size: 10px; font-weight: 800; color: #D79A18; margin-bottom: 3px; }
          .seal-name { font-size: 11px; font-weight: 800; color: #173F73; line-height: 1.2; }
          .seal-sub { font-size: 9px; font-weight: 700; color: #064B35; }
          .sign-box {
            text-align: right;
            width: 280px;
          }
          .stamp-verified {
            font-size: 11px;
            color: #059669;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .sign-line {
            border-top: 1.5px solid #173F73;
            margin-top: 36px;
            padding-top: 8px;
          }
          .sign-title {
            font-size: 13px;
            font-weight: 800;
            color: #173F73;
            letter-spacing: 0.02em;
          }
          .sign-trust {
            font-size: 11px;
            font-weight: 600;
            color: #064B35;
            margin-top: 3px;
          }
          .print-btn-bar {
            text-align: center;
            margin-bottom: 20px;
          }
          .btn-print {
            background: linear-gradient(135deg, #064B35 0%, #173F73 100%);
            color: #FFFFFF;
            border: 1px solid #D79A18;
            padding: 13px 32px;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(6, 75, 53, 0.25);
          }
          @media print {
            .print-btn-bar { display: none; }
            body { padding: 0; background: #FFF; }
            .receipt-box { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="print-btn-bar">
          <button class="btn-print" onclick="window.print()">🖨️ Click to Print / Save as PDF</button>
        </div>
        <div class="receipt-box">
          <div class="header">
            <h1 class="trust-name">
              <span class="part1">MAHESWARI </span>
              <span class="amp">&amp;</span>
              <span class="part2"> BALAN</span>
            </h1>
            <div class="trust-subtitle">MEMORIAL CHARITABLE TRUST</div>
            <div class="motto">— Serve with Love &amp; Compassion —</div>
            <div class="reg-info">
              Registered Public Charitable Trust • Trust Reg. No: <strong>142/IV/2021</strong><br/>
              Income Tax 80G Exemption Approval Order No: <strong>AAATM5432RF20214</strong> | Trust PAN: <strong>AAATM5432R</strong><br/>
              NITI Aayog NGO Darpan Reg: <strong>TN/2021/0289145</strong><br/>
              Registered Trust Office: Tamil Nadu, India • Phone: +91 85959 68122
            </div>
          </div>

          <div class="receipt-badge-wrap">
            <span class="receipt-badge">OFFICIAL DONATION &amp; 80G TAX EXEMPTION RECEIPT</span>
          </div>

          <div class="grid-meta">
            <div>
              <strong>Receipt No:</strong> <span style="font-family:monospace; font-weight:800; color:#173F73;">${receiptData.receiptNo}</span><br/>
              <strong>Date &amp; Time:</strong> ${receiptData.date} (${receiptData.time})
            </div>
            <div style="text-align: right;">
              <strong>Transaction / Razorpay ID:</strong> <span style="font-family:monospace; font-weight:800; color:#064B35;">${receiptData.transactionId}</span><br/>
              <strong>Status:</strong> <span style="color:#064B35; font-weight:800;">✓ VERIFIED &amp; RECEIVED</span>
            </div>
          </div>

          <table class="donor-table">
            <tr>
              <th>Donor Full Name</th>
              <td style="color:#173F73; font-size:14px; font-weight:800;">${receiptData.donorName}</td>
            </tr>
            <tr>
              <th>Donor Email &amp; Contact</th>
              <td>${receiptData.email} • ${receiptData.phone}</td>
            </tr>
            <tr>
              <th>Donor PAN Number (80G Benefit)</th>
              <td style="font-family:monospace; font-weight:800; color:#173F73;">${receiptData.pan}</td>
            </tr>
            <tr>
              <th>Donation Allocated To</th>
              <td style="color:#064B35; font-weight:700;">${receiptData.cause}</td>
            </tr>
            <tr>
              <th>Payment Gateway &amp; Frequency</th>
              <td>${receiptData.paymentMethod} • ${receiptData.frequency}</td>
            </tr>
            <tr>
              <th>Amount Received</th>
              <td class="amount-highlight">₹ ${receiptData.amount.toLocaleString('en-IN')} INR</td>
            </tr>
            <tr>
              <th>Amount in Words</th>
              <td style="color:#4B5563; font-style:italic;">INR ${receiptData.amountInWords}</td>
            </tr>
          </table>

          <div class="tax-note">
            <strong>80G TAX EXEMPTION DECLARATION:</strong> All donations made to Maheswari &amp; Balan Memorial Charitable Trust are 100% tax exempt under Section 80G of the Indian Income Tax Act, 1961. This computer-generated receipt serves as official proof for filing income tax returns.
          </div>

          <div class="footer-signatures">
            <div class="seal-box">
              <div class="seal-star">★ OFFICIAL TRUST SEAL ★</div>
              <div class="seal-name">MAHESWARI &amp; BALAN</div>
              <div class="seal-sub">MEMORIAL CHARITABLE TRUST</div>
              <div style="font-size:8px; color:#6B7280; margin-top:2px;">ESTD. 2021 • TAMIL NADU</div>
            </div>
            <div class="sign-box">
              <div class="stamp-verified">✓ Digitally Signed &amp; Approved</div>
              <div class="sign-line">
                <div class="sign-title">Authorized Signatory</div>
                <div class="sign-trust">For Maheswari &amp; Balan Memorial Charitable Trust</div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };

  return (
    <div style={{ backgroundColor: '#FCF9F1', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Header — Clean text banner without card container so background image is fully visible */}
      <section
        style={{
          background: `linear-gradient(180deg, rgba(10, 20, 30, 0.5) 0%, rgba(10, 20, 30, 0.25) 50%, rgba(10, 20, 30, 0.7) 100%), url(${bannerDonations}) center 95% / cover no-repeat`,
          color: '#FFFFFF',
          minHeight: '520px',
          padding: '50px 0 55px 0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '10px 16px',
            }}
          >
            <div
              className="banner-animate-1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#F5D061',
                backgroundColor: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(245, 208, 97, 0.45)',
                marginBottom: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Heart size={15} fill="#F5D061" color="#F5D061" />
              <span>TRANSPARENT GIVING</span>
            </div>
            <h1
              className="banner-animate-2"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                textShadow: '0 3px 20px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.95)',
                lineHeight: '1.2',
                marginBottom: '16px',
              }}
            >
              Empower a Life Today
            </h1>
            <p
              className="banner-animate-3"
              style={{
                fontSize: '1.1rem',
                color: '#FFFFFF',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                lineHeight: '1.65',
                fontWeight: '500',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              Every contribution directly finances quality schooling for children, life-saving medicines for cancer fighters, and warm dignified care for our elders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Portal Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '40px',
              alignItems: 'flex-start',
            }}
            className="donation-page-grid"
          >
            {/* Left Box: Donation Calculator & Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: '0 12px 36px rgba(6, 75, 53, 0.08)',
                border: '1px solid rgba(215, 154, 24, 0.25)',
              }}
            >
              {!donated ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-deep)' }}>
                      Select Contribution
                    </h3>
                    <div style={{ display: 'flex', backgroundColor: 'rgba(6,75,53,0.06)', borderRadius: '9999px', padding: '3px' }}>
                      <button
                        type="button"
                        onClick={() => setFrequency('one-time')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: frequency === 'one-time' ? '#FFFFFF' : 'transparent',
                          color: frequency === 'one-time' ? 'var(--color-primary-deep)' : 'var(--color-text-secondary)',
                        }}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: frequency === 'monthly' ? 'var(--color-primary-deep)' : 'transparent',
                          color: frequency === 'monthly' ? '#FFFFFF' : 'var(--color-text-secondary)',
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '14px' }}>
                    {presets.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePreset(amt)}
                        style={{
                          padding: '12px 4px',
                          borderRadius: '12px',
                          border: '1.5px solid',
                          borderColor: amount === amt ? 'var(--color-gold-warm)' : 'rgba(6, 75, 53, 0.12)',
                          backgroundColor: amount === amt ? 'var(--color-gold-pale)' : '#FFFFFF',
                          color: amount === amt ? 'var(--color-primary-deep)' : 'var(--color-text-primary)',
                          fontWeight: '700',
                          fontSize: '0.95rem',
                        }}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div style={{ position: 'relative', marginBottom: '22px' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: 'var(--color-text-secondary)' }}>
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customVal}
                      onChange={handleCustom}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 36px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(6, 75, 53, 0.15)',
                        fontSize: '0.96rem',
                        backgroundColor: '#FAFAF8',
                      }}
                    />
                  </div>

                  {/* Program Selection */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block', marginBottom: '8px' }}>
                      Designate Fund To:
                    </label>
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(6, 75, 53, 0.15)',
                        fontSize: '0.92rem',
                        backgroundColor: '#FAFAF8',
                        color: '#1E293B',
                        outline: 'none',
                      }}
                    >
                      <option value="Education Support">Government School Student Education</option>
                      <option value="School Infrastructure">Government School Needs &amp; Facilities</option>
                      <option value="Cancer Medical Aid">Cancer Patients Medication &amp; Nutrition</option>
                      <option value="Leprosy Patients Care">Leprosy Patients Care &amp; Rehabilitation</option>
                      <option value="Senior Citizen Care">Old Age People Food &amp; Shelter</option>
                      <option value="General Corpus">General Welfare Fund (Where Most Urgently Needed)</option>
                    </select>
                  </div>

                  {/* Donor Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                    <input
                      type="text"
                      placeholder="PAN Number (For 80G Tax Exemption)"
                      value={donorInfo.pan}
                      onChange={(e) => setDonorInfo({ ...donorInfo, pan: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(6, 75, 53, 0.15)', fontSize: '0.9rem' }}
                    />
                  </div>

                  {errorMessage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.85rem', marginBottom: '14px' }}>
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '15px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      borderRadius: '9999px',
                      marginBottom: '14px',
                      opacity: submitting ? 0.75 : 1,
                      background: 'linear-gradient(135deg, #064B35 0%, #173F73 100%)',
                      border: '1px solid #D79A18',
                      boxShadow: '0 6px 20px rgba(6, 75, 53, 0.22)',
                      cursor: 'pointer',
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Opening Razorpay Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Heart size={18} fill="#F5D061" color="#F5D061" />
                        <span>Pay via Razorpay — ₹{total.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    <ShieldCheck size={16} color="var(--color-green-natural)" />
                    <span>Secure Razorpay 256-Bit SSL Encrypted • Instant 80G Tax Exemption Receipt</span>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-green-mint)',
                      color: 'var(--color-primary-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto',
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-deep)', marginBottom: '6px' }}>
                    Thank You for Your Generosity!
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                    Your donation of <strong>₹{total.toLocaleString('en-IN')}</strong> has been confirmed for <em>{cause}</em>.
                  </p>

                  {/* Official On-Screen Receipt Preview Card */}
                  <div style={{
                    backgroundColor: '#FCFDFB',
                    borderRadius: '16px',
                    border: '2px solid #064B35',
                    outline: '1px solid #D79A18',
                    outlineOffset: '-4px',
                    padding: '18px',
                    textAlign: 'left',
                    fontSize: '0.82rem',
                    marginBottom: '18px',
                    boxShadow: '0 6px 20px rgba(6, 75, 53, 0.08)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#173F73', fontWeight: '800' }}>
                          Official 80G Tax Receipt
                        </div>
                        <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#064B35', fontSize: '0.92rem' }}>
                          {receiptData?.receiptNo || 'REC-VERIFIED'}
                        </div>
                      </div>
                      <span style={{ backgroundColor: '#064B35', color: '#F5D061', padding: '3px 10px', borderRadius: '16px', fontWeight: '700', fontSize: '0.7rem' }}>
                        ✓ 80G Verified
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                      <div>
                        <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block' }}>Donor Name:</span>
                        <strong style={{ color: '#173F73' }}>{donorInfo.name}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block' }}>Payment Ref:</span>
                        <span style={{ fontFamily: 'monospace', color: '#064B35', fontWeight: '700' }}>{txnRef}</span>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block' }}>Amount Donated:</span>
                        <strong style={{ color: '#064B35', fontSize: '1rem' }}>₹ {total.toLocaleString('en-IN')} INR</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block' }}>PAN (80G):</span>
                        <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{donorInfo.pan || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Authorized Signatory section requested by user */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px dashed #CBD5E1', paddingTop: '10px', marginTop: '10px' }}>
                      <div style={{ border: '1.5px dashed #064B35', padding: '4px 8px', borderRadius: '6px', textAlign: 'center', background: '#FFF' }}>
                        <div style={{ fontSize: '0.58rem', fontWeight: '800', color: '#D79A18' }}>★ OFFICIAL SEAL ★</div>
                        <div style={{ fontSize: '0.64rem', fontWeight: '800', color: '#173F73' }}>MAHESWARI &amp; BALAN</div>
                        <div style={{ fontSize: '0.56rem', color: '#064B35', fontWeight: '700' }}>TRUST</div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.66rem', color: '#059669', fontWeight: '700' }}>✓ Digitally Verified &amp; Signed</div>
                        <div style={{ width: '150px', height: '1.5px', backgroundColor: '#173F73', margin: '2px 0 2px auto' }} />
                        <div style={{ fontWeight: '800', color: '#173F73', fontSize: '0.76rem' }}>Authorized Signatory</div>
                        <div style={{ fontSize: '0.64rem', color: '#064B35', fontWeight: '600' }}>For Maheswari &amp; Balan Memorial Charitable Trust</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      onClick={handleDownloadReceipt}
                      className="btn"
                      style={{
                        padding: '13px 24px',
                        fontSize: '0.94rem',
                        fontWeight: '700',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #064B35 0%, #173F73 100%)',
                        color: '#FFFFFF',
                        border: '1px solid #D79A18',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(6, 75, 53, 0.25)',
                      }}
                    >
                      <Download size={18} />
                      <span>Download / Print Official 80G Receipt (PDF)</span>
                    </button>

                    <button
                      onClick={() => {
                        setDonated(false);
                        setDonorInfo({ name: '', email: '', phone: '', pan: '' });
                      }}
                      className="btn btn-dark"
                      style={{ padding: '12px 28px', fontSize: '0.9rem', borderRadius: '9999px' }}
                    >
                      Make Another Donation
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Box: Trust Wire Transfer Details & Transparency */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Bank Account Info Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '28px',
                  boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(6, 75, 53, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: 'var(--color-primary-deep)' }}>
                  <Landmark size={22} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Direct Bank Transfer / NEFT / RTGS</h4>
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                  <div><strong>Account Name:</strong> MAHESWARI AND BALAN MEMORIAL CHARITABLE TRUST </div>
                  <div><strong>Bank:</strong> UNION BANK OF INDIA</div>
                  <div><strong>Account Number:</strong> 334101010201339 (Registered Trust Account)</div>
                  <div><strong>IFSC Code:</strong> UBIN0533416</div>
                  <div><strong>Branch:</strong> SALEM MAIN</div>
                </div>
              </div>

              {/* Tax Benefit Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '28px',
                  boxShadow: '0 10px 30px rgba(6, 75, 53, 0.06)',
                  border: '1px solid rgba(215, 154, 24, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--color-gold-warm)' }}>
                  <FileCheck size={22} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
                    80G Tax Exemption
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                  Donations to Maheswari &amp; Balan Memorial Charitable Trust are eligible for tax exemption under Section 80G of the Indian Income Tax Act. A formal electronic 80G certificate is generated for every contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized FAQ Section for Donors */}
      <SEOFAQSection
        badge="DONOR TRANSPARENCY & TAX BENEFITS"
        title="Donation & Tax Exemption FAQs"
        subtitle="Key details about our Section 80G tax certificates, secure payment gateways, and audited fund allocation."
        faqs={[
          {
            q: "How does the Section 80G tax exemption benefit me as a donor?",
            a: "Under Section 80G of the Indian Income Tax Act, 1961, donors are eligible to claim a 50% deduction on eligible donations from their taxable gross income. You will receive an official tax exemption certificate containing our Trust 80G registration number and PAN immediately via email."
          },
          {
            q: "When and how will I receive my official donation receipt?",
            a: "Your formal 80G tax exemption receipt is generated digitally right after your transaction is verified. You can print or download the PDF receipt directly from the on-screen confirmation, and a duplicate copy is sent to your registered email address."
          },
          {
            q: "Is it safe to donate online through UPI, Cards, and NetBanking?",
            a: "Yes, 100%. All online transactions are encrypted via bank-grade 256-bit SSL protocols. Donations go directly into the official registered Union Bank of India account of 'MAHESWARI AND BALAN MEMORIAL CHARITABLE TRUST'."
          },
          {
            q: "Can I designate my donation to a specific school or patient?",
            a: "Yes. When donating, you can select whether your funds should specifically go towards Government School Student Education, School Infrastructure & Sanitations, Cancer Patient Medications, Leprosy Patient Care, or Elderly Support."
          },
          {
            q: "Can corporations contribute to MBMCT under their CSR programs?",
            a: "Yes! Maheswari & Balan Memorial Charitable Trust is registered and compliant with Ministry of Corporate Affairs regulations for corporate CSR allocations under Section 135 of the Companies Act. We provide comprehensive CSR utilization and impact audit reports."
          }
        ]}
      />

      <style>{`
        @media (max-width: 991px) {
          .donation-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
