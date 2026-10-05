import Reveal from '../ui/Reveal';
import styles from './StatsSection.module.css';

/**
 * Row of key figures. Only use verified numbers — BFC's defaults describe
 * how the company is structured rather than performance claims.
 */
export default function StatsSection({ items }) {
  return (
    <dl className={styles.stats}>
      {items.map((item, i) => (
        <Reveal key={item.label} className={styles.item} delay={i * 80}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
          {item.note ? <dd className={styles.note}>{item.note}</dd> : null}
        </Reveal>
      ))}
    </dl>
  );
}
