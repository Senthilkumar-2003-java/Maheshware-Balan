// Razorpay Payment Gateway integration utility

let razorpayScriptPromise = null;

export function loadRazorpayScript() {
  if (typeof window !== 'undefined' && window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    // If window.Razorpay is already available
    if (typeof window !== 'undefined' && window.Razorpay) {
      return resolve(true);
    }

    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      // Check if it already loaded or poll briefly
      if (typeof window !== 'undefined' && window.Razorpay) {
        return resolve(true);
      }
      let elapsed = 0;
      const interval = setInterval(() => {
        elapsed += 100;
        if (typeof window !== 'undefined' && window.Razorpay) {
          clearInterval(interval);
          resolve(true);
        } else if (elapsed > 4000) {
          clearInterval(interval);
          // Retry attaching a fresh script if existing failed
          attachFreshScript(resolve);
        }
      }, 100);

      existing.addEventListener('load', () => {
        clearInterval(interval);
        resolve(true);
      });
      existing.addEventListener('error', () => {
        clearInterval(interval);
        attachFreshScript(resolve);
      });
      return;
    }

    attachFreshScript(resolve);
  });

  return razorpayScriptPromise;
}

function attachFreshScript(resolve) {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = () => resolve(true);
  script.onerror = () => {
    console.error('Failed to load Razorpay SDK');
    resolve(false);
  };
  document.body.appendChild(script);
}

export async function openRazorpayCheckout({
  amount,
  currency = 'INR',
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
  if (!loaded || typeof window === 'undefined' || !window.Razorpay) {
    alert('Razorpay Payment Gateway is initializing or your internet connection is slow. Please try again in a few seconds.');
    if (onFailure) onFailure(new Error('Razorpay SDK not loaded'));
    return;
  }

  // Active Razorpay Test Key (Fallback ensures it never uses a broken dummy string)
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TjpUljZMeNnLXm';

  // Sanitize 10-digit Indian phone number
  const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

  // Clean logo URL (avoids massive base64 strings breaking mobile iframe URL limits)
  const logoUrl = typeof window !== 'undefined' && window.location.origin
    ? `${window.location.origin}/logo-sm.png`
    : 'https://maheswaribalan.org/logo.png';

  const options = {
    key: keyId,
    amount: Math.round(Number(amount) * 100), // amount in paise
    currency: 'INR',
    name: 'Maheswari & Balan Memorial Charitable Trust',
    description: `Donation towards ${cause || 'General Charitable Cause'}`,
    image: logoUrl,
    order_id: orderId || undefined,
    prefill: {
      name: donorName || '',
      email: email || '',
      contact: cleanPhone || '',
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
      confirm_close: true,
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
