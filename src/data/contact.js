import { INQUIRY_PATH } from './site';

/** Contact page option cards. */
export const CONTACT_OPTIONS = [
  {
    id: 'consulting',
    icon: 'consult',
    eyebrow: 'Consulting',
    title: 'Have a project problem?',
    text: 'Tell us what you are dealing with. Our detailed inquiry form helps us understand the situation quickly.',
    cta: { label: 'Talk to BFC', to: INQUIRY_PATH },
  },
  {
    id: 'talks',
    icon: 'mic',
    eyebrow: 'BFC Talks',
    title: 'Want to appear on BFC Talks or suggest a guest?',
    text: 'We are always looking for people with real experience and perspective to share with the industry.',
    cta: { label: 'Connect with BFC Talks', to: '/contact?type=talks-guest#contact-form' },
  },
  {
    id: 'general',
    icon: 'mail',
    eyebrow: 'General',
    title: 'Partnerships and other inquiries.',
    text: 'For collaborations, partnerships, media or anything else, send us a message.',
    cta: { label: 'Send a Message', to: '/contact?type=general#contact-form' },
  },
];

export const INQUIRY_TYPES = [
  { value: 'consulting', label: 'Consulting — project problem' },
  { value: 'talks-guest', label: 'BFC Talks — appear as a guest' },
  { value: 'talks-suggest', label: 'BFC Talks — suggest a guest' },
  { value: 'network', label: 'Join the BFC network' },
  { value: 'partnership', label: 'Partnership / collaboration' },
  { value: 'general', label: 'General inquiry' },
];
