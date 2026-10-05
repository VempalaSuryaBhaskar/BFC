import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import styles from './Pillars.module.css';

/** "Why BFC?" — Experience / Network / Knowledge. */
export default function Pillars({ items }) {
  return (
    <div className={styles.pillars}>
      {items.map((p, i) => (
        <Reveal key={p.title} as="article" className={styles.pillar} delay={i * 100}>
          <div className={styles.head}>
            <span className={styles.number}>{p.number}</span>
            <Icon name={p.icon} size={30} className={styles.icon} />
          </div>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.subtitle}>{p.subtitle}</p>
          <p className={styles.text}>{p.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
