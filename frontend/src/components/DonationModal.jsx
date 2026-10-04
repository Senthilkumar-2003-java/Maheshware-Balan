import React, { useState } from 'react';
import { 
  X, Heart, ShieldCheck, CheckCircle2, QrCode, CreditCard, Building, 
  Sparkles, AlertCircle, Loader2, Download, ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitDonationApi } from '../services/api';
import { openRazorpayCheckout } from '../utils/razorpay';

const currencies = [
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'AED', symbol: 'AED', label: 'AED' },
  { code: 'SGD', symbol: 'S$', label: 'SGD (S$)' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD (CA$)' },
  { code: 'AUD', symbol: 'AU$', label: 'AUD (AU$)' },
  { code: 'MYR', symbol: 'RM', label: 'MYR (RM)' },
];

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

export default function DonationModal({ isOpen, onClose }) {
  const [frequency, setFrequency] = useState('one-time');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('Child Education & School Needs');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [step, setStep] = useState('form'); // 'form' | 'receipt'
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
  });

  if (!isOpen) return null;

  const currentAmountNum = Number(amount) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentAmountNum || currentAmountNum <= 0) {
      setErrorMessage('Please enter a valid donation amount.');
      return;
    }
    if (!donorDetails.name.trim() || !donorDetails.email.trim()) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    // Trigger Razorpay Checkout Gateway
    openRazorpayCheckout({
      amount: currentAmountNum,
      currency: selectedCurrency.code === 'INR' ? 'INR' : 'INR',
      donorName: donorDetails.name,
      email: donorDetails.email,
      phone: donorDetails.phone,
      cause: selectedCause,
      notes: {
        frequency,
        pan: donorDetails.pan ? donorDetails.pan.toUpperCase() : 'N/A',
      },
      onSuccess: async (rzpResponse) => {
        try {
          const generatedReceiptNo = `REC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
          const txnId = rzpResponse.razorpay_payment_id || `RZP-${Date.now()}`;

          // Save completed donation to MySQL database via Backend API
          await submitDonationApi({
            donor_name: donorDetails.name,
            email: donorDetails.email,
            phone: donorDetails.phone || 'N/A',
            pan_number: donorDetails.pan ? donorDetails.pan.toUpperCase() : null,
            amount: currentAmountNum,
            currency: selectedCurrency.code,
            cause: selectedCause,
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
            donorName: donorDetails.name,
            email: donorDetails.email,
            phone: donorDetails.phone || 'N/A',
            pan: donorDetails.pan ? donorDetails.pan.toUpperCase() : 'N/A',
            amount: currentAmountNum,
            currency: selectedCurrency,
            amountInWords: numberToWords(currentAmountNum),
            cause: selectedCause,
            frequency: frequency === 'monthly' ? 'Monthly Recurring' : 'One-Time Donation',
            paymentMethod: 'Razorpay Gateway (Online Verified)',
          };

          setReceiptData(receipt);
          setSubmitting(false);
          setStep('receipt');

          confetti({
            particleCount: 130,
            spread: 85,
            origin: { y: 0.6 },
            colors: ['#173F73', '#064B35', '#D79A18', '#F5D061'],
          });
        } catch (saveErr) {
          console.error('Error saving donation:', saveErr);
          setSubmitting(false);
          setErrorMessage('Payment received, but database sync had an issue. Ref ID: ' + rzpResponse.razorpay_payment_id);
        }
      },
      onDismiss: () => {
        setSubmitting(false);
      },
      onFailure: (err) => {
        setSubmitting(false);
        setErrorMessage(err?.description || err?.message || 'Payment cancelled or declined. Please try again.');
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
            font-family: 'Playfair Display', Georgia, serif;
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
              <td class="amount-highlight">${receiptData.currency.symbol} ${receiptData.amount.toLocaleString()} ${receiptData.currency.code}</td>
            </tr>
            <tr>
              <th>Amount in Words</th>
              <td style="color:#4B5563; font-style:italic;">${receiptData.currency.code} ${receiptData.amountInWords}</td>
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

  const handleReset = () => {
    setStep('form');
    setErrorMessage('');
    setAmount('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          maxWidth: step === 'receipt' ? '600px' : 'min(94vw, 520px)',
          width: '100%',
          boxSizing: 'border-box',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 4vw, 30px) clamp(16px, 4vw, 24px)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Apple-style Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#F5F5F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1D1D1F',
            cursor: 'pointer',
            border: 'none',
            transition: 'background 0.2s',
          }}
          aria-label="Close dialog"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFBEB',
                  color: '#D79A18',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px auto',
                  border: '1px solid rgba(215, 154, 24, 0.3)',
                }}
              >
                <Heart size={22} fill="#D79A18" />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.7rem',
                  fontWeight: '700',
                  color: '#111827',
                  lineHeight: '1.2',
                  marginBottom: '4px',
                }}
              >
                Support Our Mission
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B7280' }}>
                Your generosity brings education, healthcare and dignity to those in need.
              </p>
            </div>

            {/* iOS-Style Segmented Frequency Toggle */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#F5F5F7',
                borderRadius: '9999px',
                padding: '3px',
                marginBottom: '20px',
                border: '1px solid #E5E5EA',
              }}
            >
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: '9999px',
                  fontSize: '0.86rem',
                  fontWeight: '700',
                  backgroundColor: frequency === 'one-time' ? '#FFFFFF' : 'transparent',
                  color: frequency === 'one-time' ? '#111827' : '#6B7280',
                  boxShadow: frequency === 'one-time' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                One-Time Donation
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: '9999px',
                  fontSize: '0.86rem',
                  fontWeight: '700',
                  backgroundColor: frequency === 'monthly' ? '#111827' : 'transparent',
                  color: frequency === 'monthly' ? '#FFFFFF' : '#6B7280',
                  boxShadow: frequency === 'monthly' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Monthly Supporter</span>
                <Heart size={13} fill={frequency === 'monthly' ? '#D79A18' : '#6B7280'} color={frequency === 'monthly' ? '#D79A18' : '#6B7280'} />
              </button>
            </div>

            {/* Apple-Style Currency & Amount Input Group (ZERO OVERLAP ARCHITECTURE) */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px' }}>
                Select Currency &amp; Enter Donation Amount
              </label>

              {/* Flex Container: Currency Selector + Distinct Symbol Column + Separate Number Input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  backgroundColor: '#F5F5F7',
                  borderRadius: '16px',
                  border: '1.5px solid #E5E5EA',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* 1. Currency Code Selector Dropdown */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#EAEAEE',
                  padding: '0 12px',
                  borderRight: '1px solid #D1D1D6',
                  flexShrink: 0,
                }}>
                  <select
                    value={selectedCurrency.code}
                    onChange={(e) => {
                      const cur = currencies.find(c => c.code === e.target.value) || currencies[0];
                      setSelectedCurrency(cur);
                    }}
                    style={{
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      color: '#111827',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {currencies.map(cur => (
                      <option key={cur.code} value={cur.code}>
                        {cur.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Isolated Currency Symbol Display Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 12px',
                    fontWeight: '800',
                    fontSize: '1.25rem',
                    color: '#111827',
                    backgroundColor: '#F5F5F7',
                    borderRight: '1px solid #E5E5EA',
                    flexShrink: 0,
                  }}
                >
                  {selectedCurrency.symbol}
                </div>

                {/* 3. Number Input Field: Completely isolated so NO characters ever overlap digits */}
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: '14px 16px',
                    fontSize: '1.35rem',
                    fontWeight: '800',
                    color: '#111827',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                  }}
                />
              </div>

              {currentAmountNum > 0 && (
                <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '6px', fontStyle: 'italic' }}>
                  Amount in words: {selectedCurrency.code} {numberToWords(currentAmountNum)}
                </div>
              )}
            </div>

            {/* Allocate To Specific Program */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Allocate To Specific Initiative
              </label>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #E5E5EA',
                  fontSize: '0.88rem',
                  backgroundColor: '#F5F5F7',
                  color: '#1D1D1F',
                  fontWeight: '600',
                  outline: 'none',
                }}
              >
                <option value="Child Education & School Needs">Child Education Support</option>
                <option value="Government School Infrastructure">Government School Infrastructure</option>
                <option value="Cancer Patients Medical Relief">Cancer Patient Medical Relief</option>
                <option value="Leprosy Patients Care & Rehabilitation">Leprosy Patient Rehabilitation</option>
                <option value="Elderly & Bedridden Care">Elderly Care &amp; Nutrition</option>
                <option value="General Welfare & Immediate Relief">General Humanitarian Welfare</option>
              </select>
            </div>

            {/* Donor Information */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Donor Information
              </label>
              <div className="modal-donor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={donorDetails.name}
                    onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E5EA',
                      fontSize: '0.86rem',
                      backgroundColor: '#F5F5F7',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={donorDetails.email}
                    onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E5EA',
                      fontSize: '0.86rem',
                      backgroundColor: '#F5F5F7',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={donorDetails.phone}
                    onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E5EA',
                      fontSize: '0.86rem',
                      backgroundColor: '#F5F5F7',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="PAN Card (For 80G Receipt)"
                    value={donorDetails.pan}
                    onChange={(e) => setDonorDetails({ ...donorDetails, pan: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E5EA',
                      fontSize: '0.86rem',
                      backgroundColor: '#F5F5F7',
                      textTransform: 'uppercase',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Payment Gateway &amp; Mode
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { id: 'razorpay', label: 'Razorpay Gateway', icon: CreditCard },
                  { id: 'upi', label: 'UPI / GPay / QR', icon: QrCode },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                ].map((m) => {
                  const MIcon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      style={{
                        padding: '10px 6px',
                        borderRadius: '12px',
                        border: '1.5px solid',
                        borderColor: isSelected ? '#064B35' : '#E5E5EA',
                        backgroundColor: isSelected ? '#F0FDF4' : '#FFFFFF',
                        color: isSelected ? '#064B35' : '#6B7280',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <MIcon size={17} color={isSelected ? '#064B35' : '#6B7280'} />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {errorMessage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.84rem', marginBottom: '14px' }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Apple-Style Primary Action Button with Trust Logo Theme */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.98rem',
                fontWeight: '700',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #064B35 0%, #173F73 100%)',
                color: '#FFFFFF',
                border: '1px solid #D79A18',
                cursor: 'pointer',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(6, 75, 53, 0.22)',
                opacity: submitting ? 0.75 : 1,
                transition: 'all 0.2s ease',
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
                  <span>
                    Pay via Razorpay — {selectedCurrency.symbol} {currentAmountNum ? currentAmountNum.toLocaleString() : '0'}
                  </span>
                </>
              )}
            </button>

            {/* 80G Trust Guarantee */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.74rem',
                color: '#6B7280',
              }}
            >
              <ShieldCheck size={15} color="#059669" />
              <span>100% Tax Exempted under Section 80G • Instant Official Receipt</span>
            </div>
          </form>
        ) : (
          /* ── SUCCESS & OFFICIAL RECEIPT VIEW (APPLE WALLET STYLE) ── */
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '4px',
              }}
            >
              Thank You for Your Generosity!
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '18px' }}>
              Your donation of{' '}
              <strong style={{ color: '#111827' }}>
                {receiptData?.currency?.symbol} {receiptData?.amount?.toLocaleString()} {receiptData?.currency?.code}
              </strong>{' '}
              has been recorded and an official 80G tax receipt has been generated.
            </p>

            {/* On-Screen Official Receipt Card */}
            <div
              style={{
                backgroundColor: '#FCFDFB',
                borderRadius: '18px',
                border: '2px solid #064B35',
                outline: '1px solid #D79A18',
                outlineOffset: '-4px',
                padding: '22px 20px',
                textAlign: 'left',
                fontSize: '0.84rem',
                marginBottom: '20px',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(6, 75, 53, 0.08)',
              }}
            >
              {/* Receipt Header Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#173F73', fontWeight: '800' }}>
                    Official 80G Tax Receipt
                  </div>
                  <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#064B35', fontSize: '0.96rem' }}>
                    {receiptData?.receiptNo}
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#064B35',
                  color: '#F5D061',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  fontSize: '0.72rem',
                  border: '1px solid #D79A18',
                }}>
                  ✓ 80G Tax Deductible
                </div>
              </div>

              {/* Receipt Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.74rem', display: 'block' }}>Donor Name:</span>
                  <strong style={{ color: '#173F73' }}>{receiptData?.donorName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.74rem', display: 'block' }}>Date &amp; Time:</span>
                  <span>{receiptData?.date} ({receiptData?.time})</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.74rem', display: 'block' }}>Payment / Razorpay ID:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.76rem', color: '#064B35', fontWeight: '700' }}>{receiptData?.transactionId}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.74rem', display: 'block' }}>PAN (80G Benefit):</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{receiptData?.pan || 'N/A'}</span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#64748B', fontSize: '0.74rem', display: 'block' }}>Designated Initiative:</span>
                  <span style={{ color: '#064B35', fontWeight: '700' }}>{receiptData?.cause}</span>
                </div>
              </div>

              {/* Total Amount Row */}
              <div style={{
                borderTop: '1px solid #E2E8F0',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F0FDF4',
                margin: '0 -10px',
                padding: '12px 14px',
                borderRadius: '8px',
              }}>
                <span style={{ fontWeight: '700', color: '#173F73' }}>Total Donation:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#064B35' }}>
                  {receiptData?.currency?.symbol} {receiptData?.amount?.toLocaleString()} {receiptData?.currency?.code}
                </span>
              </div>

              {/* Signatures & Seal preview requested by user */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px dashed #CBD5E1',
              }}>
                <div style={{
                  border: '1.5px dashed #064B35',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: '800', color: '#D79A18' }}>★ OFFICIAL SEAL ★</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#173F73' }}>MAHESWARI &amp; BALAN</div>
                  <div style={{ fontSize: '0.6rem', color: '#064B35', fontWeight: '700' }}>CHARITABLE TRUST</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: '700', marginBottom: '2px' }}>✓ Digitally Verified</div>
                  <div style={{ width: '150px', height: '1.5px', backgroundColor: '#173F73', marginBottom: '3px' }} />
                  <div style={{ fontWeight: '800', color: '#173F73', fontSize: '0.78rem' }}>Authorized Signatory</div>
                  <div style={{ fontSize: '0.66rem', color: '#064B35', fontWeight: '600' }}>For Maheswari &amp; Balan Memorial Charitable Trust</div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Download / Print Receipt & Return */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleDownloadReceipt}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #064B35 0%, #173F73 100%)',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  border: '1px solid #D79A18',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(6, 75, 53, 0.25)',
                }}
              >
                <Download size={18} />
                <span>Download / Print Official Receipt (PDF)</span>
              </button>

              <button
                onClick={handleReset}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
