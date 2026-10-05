import Icon from '../ui/Icon';
import styles from './NetworkCard.module.css';

export default function NetworkCard({ category, index }) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={styles.icon}>
          <Icon name={category.icon} size={24} />
        </span>
        <span className={styles.code}>N—{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className={styles.title}>{category.label}</h3>
      <p className={styles.text}>{category.text}</p>
    </article>
  );
}
