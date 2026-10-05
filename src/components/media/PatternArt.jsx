import { memo } from 'react';

/**
 * Generated architectural line patterns (blueprint grid, truss, contours …)
 * used for episode thumbnails, insight covers and placeholders.
 * Lines use currentColor; the accent detail uses --art-accent.
 */

const W = 640;
const H = 360;

function range(start, end, step) {
  const out = [];
  for (let v = start; v <= end; v += step) out.push(v);
  return out;
}

const PATTERNS = {
  grid() {
    const lines =
      range(0, W, 32).map((x) => `M${x} 0V${H}`).join('') + range(0, H, 32).map((y) => `M0 ${y}H${W}`).join('');
    return {
      base: <path d={lines} strokeWidth="1" />,
      accent: (
        <>
          <circle cx="480" cy="128" r="56" />
          <path d="M400 128h160M480 48v160" />
        </>
      ),
    };
  },
  arcs() {
    return {
      base: (
        <>
          {range(36, 640, 36).map((r) => (
            <circle key={r} cx="520" cy="250" r={r} />
          ))}
        </>
      ),
      accent: <circle cx="520" cy="250" r="144" />,
    };
  },
  truss() {
    let d = 'M-20 248H660M-20 318H660';
    range(-20, 660, 56).forEach((x) => {
      d += `M${x} 318L${x + 28} 248L${x + 56} 318`;
    });
    let upper = 'M-20 62H660M-20 102H660';
    range(-20, 660, 40).forEach((x) => {
      upper += `M${x} 102L${x + 20} 62L${x + 40} 102`;
    });
    return {
      base: (
        <>
          <path d={d} />
          <path d={upper} opacity="0.5" />
        </>
      ),
      accent: <path d="M372 318 400 248 428 318" />,
    };
  },
  contour() {
    const paths = range(0, 9, 1).map((i) => {
      const y = 18 + i * 38;
      const wobble = (i % 3) * 12;
      return `M-20 ${y}C140 ${y - 40 + wobble} 300 ${y + 42} 460 ${y - 6}S640 ${y + 28} 680 ${y}`;
    });
    return {
      base: <path d={paths.join('')} />,
      accent: <path d={paths[5]} />,
    };
  },
  iso() {
    let d = '';
    range(-640, 640, 42).forEach((x) => {
      d += `M${x} 0L${x + 624} ${H}`;
    });
    range(0, 1280, 42).forEach((x) => {
      d += `M${x} 0L${x - 624} ${H}`;
    });
    return {
      base: <path d={d} opacity="0.75" />,
      accent: <path d="M470 120l52 30v60l-52 30-52-30v-60zM418 150l52 30 52-30M470 180v60" />,
    };
  },
  beams() {
    const cols = [372, 452, 532, 612];
    const levels = [52, 132, 212, 292];
    let d = cols.map((x) => `M${x} 0V${H}`).join('');
    d += levels.map((y) => `M352 ${y}H${W + 20}`).join('');
    d += range(0, W, 32).map((x) => `M${x} 340v8`).join('');
    return {
      base: <path d={d} />,
      accent: <path d="M372 292 452 212M532 132l80-80" />,
    };
  },
};

function PatternArt({ pattern = 'grid', className }) {
  const make = PATTERNS[pattern] ?? PATTERNS.grid;
  const { base, accent } = make();
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--art-line)">{base}</g>
      <g stroke="var(--art-accent)" strokeWidth="1.6" opacity="0.85">
        {accent}
      </g>
    </svg>
  );
}

export default memo(PatternArt);
