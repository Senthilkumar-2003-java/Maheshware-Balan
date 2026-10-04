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
  currency = 'INR',
  donorName,
  email,
  phone,
  cause = 'General Support',
  notes = {},
  onSuccess,
  onDismiss,
  onFailure,
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    if (onFailure) {
      onFailure(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    }
    return;
  }

  // Fallback to configured key
  const defaultKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TjpUljZMeNnLXm';
  let keyId = defaultKey;

  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://maheshware-balan.onrender.com/api';
    const keyRes = await fetch(`${apiUrl}/donations/razorpay-key`);
    if (keyRes.ok) {
      const keyData = await keyRes.json();
      if (keyData?.keyId) {
        keyId = keyData.keyId;
      }
    }
  } catch (e) {
    console.warn('Using fallback Razorpay Key ID:', e.message);
  }

  // Razorpay amounts are in the smallest currency unit (paise for INR)
  const amountInPaise = Math.round(Number(amount) * 100);

  const options = {
    key: keyId,
    amount: amountInPaise,
    currency: currency || 'INR',
    name: 'Maheswari & Balan Memorial Charitable Trust',
    description: `Donation: ${cause}`,
    image: 'https://cdn-icons-png.flaticon.com/512/3342/3342137.png',
    prefill: {
      name: donorName || '',
      email: email || '',
      contact: phone || '',
    },
    notes: {
      cause: cause || 'General Support',
      trust_reg: '142/IV/2021',
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
