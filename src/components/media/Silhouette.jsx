import { useId } from 'react';

/** Neutral head-and-shoulders placeholder figure (no real likeness). */
export default function Silhouette({ className }) {
  const gid = `sil-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg className={className} viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--art-figure-top)" />
          <stop offset="1" stopColor="var(--art-figure-bottom)" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="86" rx="40" ry="46" fill={`url(#${gid})`} />
      <path d="M84 126h32v26H84z" fill={`url(#${gid})`} opacity="0.7" />
      <path d="M10 240c4-56 40-88 90-88s86 32 90 88Z" fill={`url(#${gid})`} />
      <path
        d="M138 70c4 14 2 30-6 42M172 196c6 12 9 28 10 44"
        fill="none"
        stroke="var(--art-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
