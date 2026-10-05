/**
 * Global site configuration.
 * Values wrapped in [square brackets] are placeholders — replace them with
 * BFC's real details. Placeholder values are detected automatically and
 * rendered as plain text (not links) until replaced.
 */

export const SITE = {
  name: 'BFC',
  // Set to the live domain (no trailing slash) to enable canonical URLs and og:url.
  url: '',
  tagline: 'Construction industry consulting, connections and conversations.',
  defaultTitle: 'BFC | Construction Consulting, Industry Connections & BFC Talks',
  defaultDescription:
    'BFC helps construction and infrastructure professionals solve complex project challenges through industry expertise, professional networks and practical problem solving. BFC Talks brings conversations with leaders shaping the construction industry.',
  contact: {
    email: '[contact@yourdomain.com]',
    phone: '[+00 00000 00000]',
    location: '[City, Country]',
    hours: '[Working days & hours]',
  },
  // TODO: replace with BFC's actual profile / channel URLs.
  social: {
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Consulting', to: '/consulting' },
  { label: 'BFC Talks', to: '/talks' },
  { label: 'About', to: '/about' },
  { label: 'Network', to: '/network' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_LINKS = [
  { label: 'Company', to: '/about' },
  { label: 'Consulting', to: '/consulting' },
  { label: 'BFC Talks', to: '/talks' },
  { label: 'Network', to: '/network' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'YouTube', icon: 'youtube', href: SITE.social.youtube },
  { label: 'LinkedIn', icon: 'linkedin', href: SITE.social.linkedin },
  { label: 'Instagram', icon: 'instagram', href: SITE.social.instagram },
];

/** Primary call-to-action target used across the site ("Talk to BFC"). */
export const INQUIRY_PATH = '/consulting#inquiry';
