/**
 * Form submission service.
 *
 * The site currently runs in MOCK mode: forms validate on the client and show
 * a success state, but nothing is sent anywhere. To go live, set FORMS_LIVE to
 * true and point ENDPOINTS at your form backend (e.g. your own API, Formspree,
 * Netlify Forms, a CRM webhook). Nothing else in the UI needs to change.
 */

export const FORMS_LIVE = false;

const ENDPOINTS = {
  consulting: '', // e.g. 'https://api.yourdomain.com/inquiries'
  contact: '',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitForm(kind, payload) {
  if (!FORMS_LIVE || !ENDPOINTS[kind]) {
    await wait(1100);
    return { mock: true };
  }

  const response = await fetch(ENDPOINTS[kind], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('We could not send your message. Please try again or contact us directly.');
  }
  return { mock: false };
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidPhone(value) {
  const digits = value.replace(/\D/g, '');
  return /^[+\d\s()-]+$/.test(value.trim()) && digits.length >= 7 && digits.length <= 15;
}
