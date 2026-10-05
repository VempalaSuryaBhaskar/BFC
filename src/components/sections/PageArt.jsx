import { memo, useMemo } from 'react';
import styles from './PageArt.module.css';

/** Subtle line drawings for page heroes. All original, all decorative. */

function seeded(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Consulting() {
  const xs = [100, 220, 340, 460];
  const ys = [70, 190, 310, 430];
  const route = [
    [100, 430],
    [220, 310],
    [220, 190],
    [340, 190],
    [460, 70],
  ];
  return (
    <>
      <path className={styles.line} d={xs.map((x) => `M${x} 40V460`).join('') + ys.map((y) => `M70 ${y}H490`).join('')} />
      <path className={styles.faint} d="M100 310 220 190M340 430 460 310M340 190 460 70M220 430 340 310" />
      {xs.flatMap((x) => ys.map((y) => <rect key={`${x}-${y}`} className={styles.joint} x={x - 3} y={y - 3} width="6" height="6" />))}
      <path className={`${styles.accent} ${styles.flow}`} d={`M${route.map((p) => p.join(' ')).join('L')}`} />
      <rect className={styles.accentFill} x="92" y="422" width="16" height="16" />
      <circle className={styles.accentFill} cx="460" cy="70" r="9" />
      <circle className={`${styles.accent} ${styles.ping}`} cx="460" cy="70" r="18" />
      <text className={styles.label} x="118" y="456">
        PROBLEM
      </text>
      <text className={styles.label} x="478" y="66">
        WAY FORWARD
      </text>
    </>
  );
}

function Talks() {
  const bars = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => {
        const x = 60 + i * 11;
        const h = 18 + Math.abs(Math.sin(i * 0.52) * 80 + Math.sin(i * 1.7) * 36 + Math.cos(i * 0.23) * 30);
        return { x, h, hot: i > 17 && i < 27 };
      }),
    [],
  );
  return (
    <>
      {[90, 150, 210].map((r) => (
        <circle key={r} className={styles.faint} cx="300" cy="250" r={r} />
      ))}
      <path className={styles.faint} d="M40 250H560" />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          className={b.hot ? styles.barHot : styles.bar}
          x={b.x}
          y={250 - b.h / 2}
          width="4"
          height={b.h}
          rx="2"
          style={{ animationDelay: `${(i % 9) * -0.31}s` }}
        />
      ))}
    </>
  );
}

function Network() {
  const { nodes, edges } = useMemo(() => {
    const rand = seeded(7);
    const pts = [[300, 250]];
    while (pts.length < 26) {
      const p = [50 + rand() * 500, 40 + rand() * 420];
      if (pts.every(([x, y]) => Math.hypot(x - p[0], y - p[1]) > 62)) pts.push(p);
    }
    const e = [];
    pts.forEach((p, i) => {
      if (i === 0) return;
      const near = pts
        .map((q, j) => [j, Math.hypot(q[0] - p[0], q[1] - p[1])])
        .filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 2);
      near.forEach(([j]) => e.push([i, j]));
    });
    return { nodes: pts, edges: e };
  }, []);
  const hubs = nodes
    .map((p, i) => [i, Math.hypot(p[0] - 300, p[1] - 250)])
    .filter(([i]) => i !== 0)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 7)
    .map(([i]) => i);

  return (
    <>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} className={styles.line} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
      ))}
      {hubs.map((i) => (
        <line key={`hub-${i}`} className={`${styles.accent} ${styles.flow}`} x1="300" y1="250" x2={nodes[i][0]} y2={nodes[i][1]} />
      ))}
      {nodes.slice(1).map(([x, y]) => (
        <circle key={`${x}-${y}`} className={styles.dot} cx={x} cy={y} r="4" />
      ))}
      <circle className={`${styles.accent} ${styles.ping}`} cx="300" cy="250" r="22" />
      <circle className={styles.accentFill} cx="300" cy="250" r="10" />
    </>
  );
}

function About() {
  return (
    <>
      <path className={styles.line} d="M80 80H520V420H80Z M88 88H512V412H88Z" />
      <path className={styles.line} d="M300 88V230M300 280V412M88 250H240M290 250H512M420 88V170M420 210V250" />
      <path className={styles.faint} d="M240 250a50 50 0 0 1 50-50M300 230a50 50 0 0 1 50 50M420 170a40 40 0 0 1 40 40" />
      <path className={styles.faint} d="M80 50H520M80 44V56M520 44V56M300 44V56M50 80V420M44 80H56M44 420H56M44 250H56" />
      <rect className={styles.accent} x="310" y="260" width="192" height="142" />
      <path className={styles.faint} d="M320 270 492 392M492 270 320 392" />
      <text className={styles.label} x="320" y="40">
        PLAN — LEVEL 01
      </text>
      <path className={styles.line} d="M560 110l12 30-12-8-12 8z" />
      <text className={styles.label} x="556" y="100">
        N
      </text>
    </>
  );
}

function Insights() {
  const pts = [
    [80, 360],
    [150, 320],
    [220, 335],
    [290, 260],
    [360, 280],
    [430, 190],
    [500, 150],
  ];
  return (
    <>
      <path className={styles.line} d="M60 60V420H540" />
      <path className={styles.faint} d={[120, 180, 240, 300, 360].map((y) => `M60 ${y}H540`).join('')} />
      {pts.map(([x], i) => (
        <rect key={x} className={styles.faint} x={x - 14} y={420 - (60 + i * 32)} width="28" height={60 + i * 32} />
      ))}
      <path className={`${styles.accent} ${styles.flow}`} d={`M${pts.map((p) => p.join(' ')).join('L')}`} />
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} className={styles.accentFill} cx={x} cy={y} r="4" />
      ))}
    </>
  );
}

function Contact() {
  return (
    <>
      {[50, 100, 150, 200].map((r) => (
        <circle key={r} className={r === 100 ? styles.line : styles.faint} cx="320" cy="250" r={r} />
      ))}
      <path className={styles.line} d="M320 20V480M90 250H550" strokeDasharray="3 6" />
      <circle className={`${styles.accent} ${styles.ping}`} cx="320" cy="250" r="26" />
      <path className={styles.accent} d="M320 274s-20-17.5-20-33a20 20 0 0 1 40 0c0 15.5-20 33-20 33Z" />
      <circle className={styles.accentFill} cx="320" cy="241" r="6" />
      <text className={styles.label} x="332" y="40">
        N 00°00′00″
      </text>
      <text className={styles.label} x="470" y="242">
        E 00°00′00″
      </text>
    </>
  );
}

function Grid() {
  const d = [];
  for (let x = 40; x <= 560; x += 40) d.push(`M${x} 40V460`);
  for (let y = 40; y <= 460; y += 40) d.push(`M40 ${y}H560`);
  return (
    <>
      <path className={styles.faint} d={d.join('')} />
      <circle className={styles.line} cx="380" cy="220" r="120" />
      <path className={styles.accent} d="M260 220H500M380 100V340" />
    </>
  );
}

const VARIANTS = { consulting: Consulting, talks: Talks, network: Network, about: About, insights: Insights, contact: Contact, grid: Grid };

function PageArt({ variant = 'grid' }) {
  const Art = VARIANTS[variant] ?? Grid;
  return (
    <svg className={styles.svg} viewBox="0 0 600 500" fill="none" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}

export default memo(PageArt);
