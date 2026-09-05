export const WHATSAPP_NUMBER = '917989759695';
export const INSTAGRAM_URL = 'https://www.instagram.com/vaddiarun46/';
export const INSTAGRAM_HANDLE = '@vaddiarun46';
export const EMAIL = 'arunsvaddi@gmail.com';
export const PHONE = '+91 79897 59695';

export const wa = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TYGAGP9BpCf7mC';
export const CONSULTATION_FEE = 500; // ₹500 WhatsApp consultation fee
