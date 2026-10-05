import { memo } from 'react';
import styles from './HeroVisual.module.css';

/**
 * Homepage hero illustration — an original line drawing in the style of an
 * engineering elevation: a completed tower, a structural frame under
 * construction, a tower crane lifting a beam, drawing annotations, and an
 * orange network overlay connecting it all.
 */

function lattice(x1, x2, y1, y2, step, vertical = false) {
  // zig-zag lacing between two parallel chords
  let d = '';
  if (vertical) {
    let left = true;
    for (let y = y2; y > y1; y -= step) {
      const ny = Math.max(y - step, y1);
      d += left ? `M${x1} ${y}L${x2} ${ny}` : `M${x2} ${y}L${x1} ${ny}`;
      left = !left;
    }
  } else {
    let top = true;
    for (let x = x1; x < x2; x += step) {
      const nx = Math.min(x + step, x2);
      d += top ? `M${x} ${y1}L${nx} ${y2}` : `M${x} ${y2}L${nx} ${y1}`;
      top = !top;
    }
  }
  return d;
}

const range = (a, b, s) => {
  const out = [];
  for (let v = a; v <= b; v += s) out.push(v);
  return out;
};

// Nodes sit on the right-hand structures so they never collide with the headline.
const NODES = [
  [265, 285],
  [403, 340],
  [265, 450],
  [400, 217],
  [478, 58],
  [540, 420],
  [655, 250],
  [700, 380],
  [330, 505],
];

const EDGES = [
  [0, 3],
  [0, 1],
  [0, 2],
  [2, 8],
  [8, 1],
  [1, 3],
  [3, 4],
  [1, 5],
  [4, 6],
  [5, 6],
  [6, 7],
  [5, 8],
];

const COLS = [200, 265, 330, 395];
const SLABS = [505, 450, 395, 340];

function HeroVisual() {
  const mast = lattice(470, 486, 110, 560, 16, true);
  const jib = lattice(222, 486, 110, 122, 14);
  const counterJib = lattice(486, 604, 110, 122, 14);

  return (
    <svg className={styles.svg} viewBox="0 0 720 640" preserveAspectRatio="xMaxYMax meet" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hv-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </pattern>
        <radialGradient id="hv-glow" cx="0.55" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#F06A1D" stopOpacity="0.16" />
          <stop offset="1" stopColor="#F06A1D" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="720" height="640" fill="url(#hv-glow)" />

      {/* ---------- Structures ---------- */}
      <g className={styles.structure} stroke="rgba(255,255,255,0.26)" strokeWidth="1">
        {/* ground + hatch */}
        <path d="M0 560H720" stroke="rgba(255,255,255,0.4)" />
        <rect x="0" y="561" width="720" height="12" fill="url(#hv-hatch)" stroke="none" />

        {/* Tower A — completed */}
        <rect x="40" y="170" width="110" height="390" />
        <path d={range(200, 530, 30).map((y) => `M40 ${y}H150`).join('')} strokeOpacity="0.55" />
        <path d="M76.7 170V560M113.3 170V560" strokeOpacity="0.35" />
        <rect x="70" y="150" width="50" height="20" />
        <path d="M95 150V112" />

        {/* Tower B — frame under construction */}
        <g strokeWidth="1.2">
          <path d={COLS.map((x) => `M${x} 560V340`).join('')} />
          <path d="M200 340V285M265 340V285M330 340V285" />
          <path d="M200 285V240M265 285V240" strokeDasharray="3 4" />
          <path d={SLABS.map((y) => `M192 ${y}H403`).join('')} strokeWidth="2.4" stroke="rgba(255,255,255,0.34)" />
          <path d="M192 285H338" strokeWidth="2.4" stroke="rgba(255,255,255,0.34)" />
          <path d="M265 560 330 505M330 560 265 505M200 450 265 395" strokeOpacity="0.6" />
        </g>
        {/* scaffold */}
        <path d="M411 560V330M419 560V330" strokeOpacity="0.4" strokeDasharray="2 3" />
        <path d={range(340, 550, 30).map((y) => `M411 ${y}H419`).join('')} strokeOpacity="0.4" />

        {/* Building C */}
        <rect x="540" y="420" width="160" height="140" />
        <rect x="610" y="380" width="90" height="40" />
        <path d="M540 455H700M540 490H700M540 525H700" strokeOpacity="0.5" />
        <path d="M580 420V560M620 420V560M660 420V560" strokeOpacity="0.3" />

        {/* Tower crane */}
        <g stroke="rgba(255,255,255,0.4)">
          <path d="M470 560V110M486 560V110" />
          <path d={mast} strokeOpacity="0.55" />
          <path d="M214 110H604M222 122H604M214 110 222 122M604 110V122" />
          <path d={jib} strokeOpacity="0.5" />
          <path d={counterJib} strokeOpacity="0.5" />
          <path d="M470 110 478 58 486 110" />
          <path d="M478 58 262 110M478 58 600 110" strokeOpacity="0.6" />
          <rect x="576" y="122" width="26" height="26" fill="rgba(255,255,255,0.08)" />
          <rect x="486" y="124" width="14" height="13" />
          <path d="M460 560H496" strokeWidth="2" />
        </g>

        {/* Trolley, hook and load (gently swaying) */}
        <rect x="392" y="122" width="16" height="6" stroke="rgba(255,255,255,0.5)" />
        <g className={styles.load} stroke="rgba(255,255,255,0.5)">
          <path d="M397 128V182M403 128V182" />
          <rect x="393" y="182" width="14" height="10" />
          <path d="M400 192v5a4 4 0 1 1-4 4" />
          <path d="M400 203 358 214M400 203 442 214" strokeOpacity="0.7" />
          <path d="M350 214H450M350 221H450M350 214V221M450 214V221" stroke="rgba(255,255,255,0.65)" />
        </g>
      </g>

      {/* ---------- Drawing annotations ---------- */}
      <g className={styles.annotations} stroke="rgba(255,255,255,0.3)" strokeWidth="1">
        {/* vertical dimension — tower A */}
        <path d="M22 170V560M17 175 27 165M17 565 27 555M16 170H34M16 560H34" />
        {/* horizontal dimension — tower B grid */}
        <path d="M200 590H395M195 595 205 585M260 595 270 585M325 595 335 585M390 595 400 585" />
        {/* column grid lines + bubbles */}
        <path d={COLS.map((x) => `M${x} 574V604`).join('')} strokeDasharray="2 3" />
        {COLS.map((x) => (
          <circle key={x} cx={x} cy="614" r="9" />
        ))}
        {/* level datums */}
        {SLABS.map((y) => (
          <path key={y} d={`M426 ${y}h6l-3 -5z`} />
        ))}
        {/* section callout */}
        <circle cx="655" cy="250" r="18" />
        <path d="M637 250H673" />
        <path d="M655 268V380" strokeDasharray="3 4" />
      </g>
      <g className={styles.labels} fill="rgba(255,255,255,0.42)">
        <text x="12" y="365" transform="rotate(-90 12 365)" textAnchor="middle">
          39 000
        </text>
        <text x="297" y="584" textAnchor="middle">
          3 × 6 500
        </text>
        {['A', 'B', 'C', 'D'].map((l, i) => (
          <text key={l} x={COLS[i]} y="617.5" textAnchor="middle">
            {l}
          </text>
        ))}
        {['+05.50', '+11.00', '+16.50', '+22.00'].map((t, i) => (
          <text key={t} x="436" y={SLABS[i] + 1}>
            {t}
          </text>
        ))}
        <text x="655" y="246" textAnchor="middle">
          A
        </text>
        <text x="655" y="262" textAnchor="middle" fontSize="7">
          S-02
        </text>
        <text x="40" y="160">
          T-A
        </text>
        <text x="540" y="410">
          BLK C
        </text>
      </g>

      {/* ---------- Network overlay ---------- */}
      <g className={styles.network}>
        {EDGES.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            className={styles.edge}
            style={{ animationDelay: `${i * -0.37}s` }}
          />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="9" className={styles.ring} style={{ animationDelay: `${(i % 5) * 0.7}s` }} />
            <circle cx={x} cy={y} r="3.5" className={styles.node} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default memo(HeroVisual);
