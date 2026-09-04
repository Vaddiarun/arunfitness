export const WHATSAPP_NUMBER = '917989759695';
export const INSTAGRAM_URL = 'https://www.instagram.com/vaddiarun46/';
export const INSTAGRAM_HANDLE = '@vaddiarun46';
export const EMAIL = 'arunsvaddi@gmail.com';
export const PHONE = '+91 79897 59695';

export const wa = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
