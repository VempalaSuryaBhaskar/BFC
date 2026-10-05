import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import styles from './TrustStrip.module.css';

export default function TrustStrip({ title, items }) {
  return (
    <section className={`${styles.strip} theme-light`} aria-labelledby="trust-strip-title">
      <div className="container">
        <Reveal className={styles.inner}>
          <h2 id="trust-strip-title" className={styles.title}>
            {title}
          </h2>
          <ul className={styles.list} role="list">
            {items.map((item) => (
              <li key={item.label} className={styles.item}>
                <Icon name={item.icon} size={26} className={styles.icon} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
