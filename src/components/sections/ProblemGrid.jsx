import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import styles from './ProblemGrid.module.css';

/** Problem areas laid out like a drawing schedule. */
export default function ProblemGrid({ items }) {
  return (
    <Reveal>
      <ul className={styles.grid} role="list">
        {items.map((item) => (
          <li key={item.code} className={styles.cell}>
            <div className={styles.top}>
              <span className={styles.code}>{item.code}</span>
              <Icon name={item.icon} size={22} className={styles.icon} />
            </div>
            <h3 className={styles.label}>{item.label}</h3>
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
