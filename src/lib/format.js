const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2026-03-12' → '12 Mar 2026' (locale-independent, consistent everywhere) */
export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function padNumber(n, size = 2) {
  return String(n).padStart(size, '0');
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** True for unfilled placeholder values such as '[Guest Name]' or ''. */
export function isPlaceholder(value) {
  return !value || /^\[.*\]$/.test(String(value).trim());
}

export function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}
