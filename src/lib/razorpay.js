import { RAZORPAY_KEY_ID } from './config';

/**
 * Loads the Razorpay checkout.js script dynamically if not already loaded.
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initiates Razorpay Standard Checkout:
 * 1. Calls backend /api/create-order
 * 2. Opens Razorpay modal with order_id
 * 3. On success, calls backend /api/verify-payment to verify signature
 */
export async function initiateRazorpayPayment({
  amount, // in INR
  customer = {},
  title = 'Arun Kumar Coaching',
  description = '1:1 WhatsApp Consultation & Assessment',
  notes = {},
  onSuccess,
  onFailure,
  onDismiss,
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    onFailure?.(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    return;
  }

  // Step 1: Create Order on backend
  let orderData;
  try {
    const amountInPaise = Math.round(Number(amount) * 100);
    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          client_name: customer.name || '',
          client_phone: customer.phone || '',
          ...notes,
        },
      }),
    });

    orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.order_id) {
      throw new Error(orderData.error || 'Failed to create payment order. Please try again.');
    }
  } catch (err) {
    onFailure?.(err);
    return;
  }

  // Step 2: Open Razorpay Modal with order_id
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: orderData.currency || 'INR',
    name: title,
    description: description,
    image: '/favicon.svg',
    order_id: orderData.order_id,
    prefill: {
      name: customer.name || '',
      email: customer.email || '',
      contact: customer.phone || '',
    },
    notes: {
      client_name: customer.name || '',
      client_phone: customer.phone || '',
      order_id: orderData.order_id,
      ...notes,
    },
    theme: {
      color: '#9184d9',
      backdrop_color: 'rgba(22, 24, 38, 0.85)',
    },
    modal: {
      ondismiss: () => {
        onDismiss?.();
      },
      confirm_close: true,
    },
    handler: async function (response) {
      // Step 3: Verify payment signature on backend
      try {
        const verifyRes = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyResult = await verifyRes.json();
        if (!verifyRes.ok || !verifyResult.success) {
          throw new Error(verifyResult.error || 'Payment signature verification failed.');
        }

        onSuccess?.({
          ...response,
          ...verifyResult,
        });
      } catch (err) {
        onFailure?.(err);
      }
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on('payment.failed', function (response) {
    onFailure?.(response.error);
  });

  try {
    rzp.open();
  } catch (err) {
    onFailure?.(err);
  }
}
