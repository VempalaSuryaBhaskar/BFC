import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { LogoMark } from '../ui/Logo';
import useInView from '../../hooks/useInView';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { classNames } from '../../lib/format';
import styles from './NetworkMap.module.css';

const W = 1000;
const H = 640;
const CX = W / 2;
const CY = H / 2;
const RX = 370;
const RY = 228;

/**
 * Interactive mesh with BFC at the centre and industry disciplines around it.
 * Hover / focus a discipline to highlight its connection; the map gently
 * cycles through disciplines while visible until the user interacts.
 */
export default function NetworkMap({ categories, autoCycle = true, className }) {
  const [active, setActive] = useState(null);
  const [paused, setPaused] = useState(false);
  const [viewRef, inView] = useInView({ threshold: 0.3, once: false });
  const reduced = usePrefersReducedMotion();
  const panelId = useId();
  const interacted = useRef(false);

  const nodes = useMemo(
    () =>
      categories.map((cat, i) => {
        const angle = (-90 + (i * 360) / categories.length) * (Math.PI / 180);
        const x = CX + RX * Math.cos(angle);
        const y = CY + RY * Math.sin(angle);
        // three "professional" satellites fanning outward from each discipline
        const satellites = [-0.42, 0, 0.42].map((spread, j) => {
          const dist = [46, 64, 50][j];
          const a = angle + spread;
          return { x: x + dist * Math.cos(a), y: y + dist * 0.82 * Math.sin(a) };
        });
        return { ...cat, x, y, satellites };
      }),
    [categories],
  );

  const crossLinks = useMemo(() => {
    const n = nodes.length;
    return nodes.flatMap((node, i) => (i % 2 === 0 ? [[i, (i + 3) % n]] : []));
  }, [nodes]);

  useEffect(() => {
    if (!autoCycle || reduced || !inView || paused || interacted.current) return undefined;
    const id = setInterval(() => {
      setActive((prev) => (prev === null ? 0 : (prev + 1) % nodes.length));
    }, 2600);
    return () => clearInterval(id);
  }, [autoCycle, reduced, inView, paused, nodes.length]);

  const select = (i) => {
    interacted.current = true;
    setActive(i);
  };

  const current = active !== null ? nodes[active] : null;

  return (
    <div className={classNames(styles.wrap, className)}>
      <div
        ref={viewRef}
        className={styles.map}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          {/* orbit guides */}
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} className={styles.orbit} />
          <ellipse cx={CX} cy={CY} rx={RX * 0.55} ry={RY * 0.55} className={styles.orbitInner} />

          {/* ring + cross links */}
          {nodes.map((node, i) => {
            const next = nodes[(i + 1) % nodes.length];
            return <line key={`ring-${node.id}`} x1={node.x} y1={node.y} x2={next.x} y2={next.y} className={styles.mesh} />;
          })}
          {crossLinks.map(([a, b]) => (
            <line key={`x-${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} className={styles.meshFaint} />
          ))}

          {/* satellites */}
          {nodes.map((node, i) =>
            node.satellites.map((s, j) => (
              <g key={`s-${node.id}-${j}`} className={classNames(styles.satellite, active === i && styles.satelliteActive)}>
                <line x1={node.x} y1={node.y} x2={s.x} y2={s.y} />
                <circle cx={s.x} cy={s.y} r="3" />
              </g>
            )),
          )}

          {/* spokes from BFC */}
          {nodes.map((node, i) => (
            <line
              key={`spoke-${node.id}`}
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              className={classNames(styles.spoke, active === i && styles.spokeActive)}
              style={{ animationDelay: `${i * -0.21}s` }}
            />
          ))}

          {/* centre pulses */}
          <circle cx={CX} cy={CY} r="70" className={styles.pulse} />
          <circle cx={CX} cy={CY} r="70" className={styles.pulse} style={{ animationDelay: '1.6s' }} />
          <circle cx={CX} cy={CY} r="70" className={styles.hub} />
        </svg>

        <div className={styles.center}>
          <LogoMark className={styles.centerMark} />
          <span className={styles.centerWord}>BFC</span>
        </div>

        {nodes.map((node, i) => (
          <button
            key={node.id}
            type="button"
            className={classNames(styles.node, active === i && styles.nodeActive)}
            style={{ left: `${(node.x / W) * 100}%`, top: `${(node.y / H) * 100}%` }}
            onMouseEnter={() => select(i)}
            onFocus={() => select(i)}
            onClick={() => select(i)}
            aria-pressed={active === i}
            aria-controls={panelId}
            aria-label={node.label}
          >
            <span className={styles.nodeIcon}>
              <Icon name={node.icon} size={18} />
            </span>
            <span className={styles.nodeLabel}>{node.short}</span>
          </button>
        ))}
      </div>

      <div id={panelId} className={styles.panel} aria-live="polite">
        {current ? (
          <>
            <span className={styles.panelIcon}>
              <Icon name={current.icon} size={22} />
            </span>
            <div>
              <p className={styles.panelTitle}>{current.label}</p>
              <p className={styles.panelText}>{current.text}</p>
            </div>
          </>
        ) : (
          <>
            <span className={styles.panelIcon}>
              <Icon name="network" size={22} />
            </span>
            <div>
              <p className={styles.panelTitle}>BFC at the centre</p>
              <p className={styles.panelText}>Select a discipline to see who BFC connects with across the industry.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
