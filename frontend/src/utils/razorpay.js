import { TRUST_LOGO_BASE64 } from './logoBase64';

// Razorpay Payment Gateway integration utility

let razorpayScriptPromise = null;

export function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.onload = () => resolve(true);
      existing.onerror = () => resolve(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export async function openRazorpayCheckout({
  amount,
  orderId,
  donorName,
  email,
  phone,
  cause,
  notes = {},
  onSuccess,
  onFailure,
  onDismiss,
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    alert('Razorpay SDK failed to load. Please check your internet connection.');
    if (onFailure) onFailure(new Error('Razorpay SDK not loaded'));
    return;
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

  const options = {
    key: keyId,
    amount: Math.round(Number(amount) * 100), // amount in paise
    currency: 'INR',
    name: 'Maheswari & Balan Memorial Charitable Trust',
    description: `Donation towards ${cause || 'General Charitable Cause'}`,
    image: TRUST_LOGO_BASE64,
    order_id: orderId || undefined,
    prefill: {
      name: donorName || '',
      email: email || '',
      contact: phone || '',
    },
    notes: {
      cause: cause || 'General Support',
      trust_reg: 'BOOK-4/35/2026',
      tax_benefit: '80G Exemption',
      ...notes,
    },
    theme: {
      color: '#064B35', // Deep Trust Emerald Green
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      },
      escape: true,
      backdropclose: false,
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id || null,
          razorpay_signature: response.razorpay_signature || null,
        });
      }
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.error('Razorpay payment failed:', response.error);
      if (onFailure) {
        onFailure(response.error);
      }
    });
    rzp.open();
  } catch (err) {
    console.error('Error opening Razorpay checkout:', err);
    if (onFailure) {
      onFailure(err);
    }
  }
}
