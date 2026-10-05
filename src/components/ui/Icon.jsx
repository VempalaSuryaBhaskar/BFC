/**
 * BFC icon set — 24×24 line icons drawn on a consistent 1.5px stroke.
 * Usage: <Icon name="crane" size={28} />
 */

const dot = (x, y) => `M${x} ${y}h.01`;

const ICONS = {
  /* ---- Interface ---- */
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  arrowDown: <path d="M12 4.5v15M6 13.5l6 6 6-6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m4.5 12.5 4.5 4.5L19.5 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  play: <path d="M8 5.2v13.6a.6.6 0 0 0 .9.5l10.7-6.8a.6.6 0 0 0 0-1L8.9 4.7a.6.6 0 0 0-.9.5Z" fill="currentColor" stroke="none" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: <path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11.5 11.5 0 0 0 6.5 6.5l1.4-2.3 4.6 1.8V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5Z" />,
  mapPin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  calendarCheck: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4m-6.5 8.5 2 2 4-4" />
    </>
  ),
  quote: (
    <path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h5V7Zm0 5c0 3-1.5 5-4.5 6M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h5V7Zm0 5c0 3-1.5 5-4.5 6" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d={`M12 11v5.5${dot(12, 8)}`} />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.3 3 7.9 7 9 4-1.1 7-4.7 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),

  /* ---- Social ---- */
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d={`M8 10.5V17${dot(8, 7.5)}M12 17v-6.5M12 13.5c0-1.7 1.3-3 3-3s2.5 1.2 2.5 3V17`} />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d={dot(17.2, 6.8)} strokeWidth="2" />
    </>
  ),

  /* ---- Industry ---- */
  bridge: <path d="M2.5 9h19M3.5 20c1.3-5.6 4.6-8.5 8.5-8.5s7.2 2.9 8.5 8.5M7 9v5M12 9v2.5M17 9v5M2.5 20h19" />,
  crane: (
    <path d="M6.5 21V6M9.5 21V6M6.5 9.5l3 3M9.5 12.5l-3 3M6.5 15.5l3 3M3.5 6h17M6.5 6 8 3l1.5 3M17.5 6v5.5M16.5 11.5h2v2h-2zM3 21h10" />
  ),
  road: <path d="M8 3.5 4 20.5M16 3.5l4 17M12 4.5v2.5M12 10.5v3M12 17v3" />,
  buildings: (
    <path d={`M3 20.5h18M5 20.5V7l6-3v16.5M11 9h7.5a.5.5 0 0 1 .5.5v11${dot(8, 9)}${dot(8, 12)}${dot(8, 15)}${dot(15, 12.5)}${dot(15, 15.5)}M14 20.5v-2h2v2`} />
  ),
  gantt: <path d="M4 4v16h16M7.5 8h6M10 12h7.5M8.5 16h5" />,
  package: <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5l8 4.5 8-4.5M12 12v9M8 5.3l8 4.5" />,
  contract: (
    <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8L14 3Zm0 0v5h5M8.5 12.5h7M8.5 16c.8-1 1.6-1 2.2 0s1.5 1 2.3 0" />
  ),
  consult: (
    <path d="M4.5 4.5h10a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3h-1A1.5 1.5 0 0 1 3 12V6a1.5 1.5 0 0 1 1.5-1.5ZM19 9h.5A1.5 1.5 0 0 1 21 10.5v6a1.5 1.5 0 0 1-1.5 1.5h-1v3l-3.5-3h-4A1.5 1.5 0 0 1 10.5 16.5" />
  ),
  hardhat: <path d="M2.5 18.5h19M4.5 18.5V16a7.5 7.5 0 0 1 15 0v2.5M10 9V5.5h4V9M12 5.5V9.5" />,
  truck: (
    <>
      <path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5v3h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  wrench: (
    <path d="M14.6 6.4a4 4 0 0 0-5.2 5.1l-6 6a1.6 1.6 0 0 0 2.3 2.3l6-6a4 4 0 0 0 5.1-5.2l-2.4 2.4-2.2-.6-.6-2.2 3-1.8Z" />
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d={`M8 6.5h8v3H8z${dot(8.5, 13.5)}${dot(12, 13.5)}${dot(15.5, 13.5)}${dot(8.5, 17)}${dot(12, 17)}${dot(15.5, 17)}`} />
    </>
  ),
  layers: <path d="m12 3.5 9 4.8-9 4.8-9-4.8 9-4.8ZM3 12.4l9 4.8 9-4.8M3 16.4l9 4.8 9-4.8" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M3 19.5a6 6 0 0 1 12 0M15.5 4.9a3.3 3.3 0 0 1 0 6.3M21 19.5a6 6 0 0 0-3.6-5.5" />
    </>
  ),
  files: (
    <path d="M8 3h7.5L19 6.5v11a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 8 3Zm7.5 0v3.5H19M4 7v12.5A1.5 1.5 0 0 0 5.5 21H15M9.5 11h6M9.5 14.5h4" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  chart: <path d="M3.5 20.5h17M6.5 16.5v-4M10.5 16.5V9M14.5 16.5v-6M18.5 16.5V5.5" />,
  route: (
    <>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8.2 18H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.8" />
    </>
  ),
  expertConnect: (
    <>
      <circle cx="6.5" cy="8" r="2.6" />
      <circle cx="17.5" cy="8" r="2.6" />
      <path d="M2.5 18.5a4 4 0 0 1 8 0M13.5 18.5a4 4 0 0 1 8 0M10 8h4" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="12" cy="4" r="1.6" />
      <circle cx="19.5" cy="16.5" r="1.6" />
      <circle cx="4.5" cy="16.5" r="1.6" />
      <path d="M12 5.6v4M13.9 13.2l4.2 2.4M10.1 13.2l-4.2 2.4" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3.5M8.5 21h7" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="1.5" />
      <path d="M9 4.5V3h6v1.5M9 13l2 2 4-4" />
    </>
  ),
  alert: <path d={`M12 4 21 19.5H3L12 4ZM12 10v4.5${dot(12, 17)}`} />,
  setSquare: <path d="M4 20V4l16 16H4ZM8 16v-4.4l4.4 4.4H8M4 8h2M4 12h2" />,
  drafting: (
    <>
      <circle cx="12" cy="5" r="1.8" />
      <path d="m11.2 6.6-5.7 14M12.8 6.6l5.7 14M8 14.5c2.5 1 5.5 1 8 0M12 2v1.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18M10.5 12.5v1.5h3v-1.5" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.6 13.4 7 21l5-2.5 5 2.5-1.6-7.6" />
    </>
  ),
  graduation: <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9ZM6.5 11v5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-5M21.5 9v5" />,
  bulb: (
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3Z" />
  ),
  book: <path d="M12 6.5C10 5 7 4.5 3.5 4.5v14c3.5 0 6.5.5 8.5 2 2-1.5 5-2 8.5-2v-14c-3.5 0-6.5.5-8.5 2Zm0 0v14" />,
};

export const ICON_NAMES = Object.keys(ICONS);

export default function Icon({ name, size = 24, strokeWidth = 1.5, className, title }) {
  const content = ICONS[name];
  if (!content) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  );
}
