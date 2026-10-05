import Icon from '../ui/Icon';
import { classNames } from '../../lib/format';
import styles from './ServiceCard.module.css';

/** Icon card for services / help areas. `compact` drops the large padding. */
export default function ServiceCard({ icon, title, text, index, compact = false, as: Tag = 'article', className }) {
  return (
    <Tag className={classNames(styles.card, compact && styles.compact, className)}>
      <div className={styles.top}>
        <span className={styles.iconBox}>
          <Icon name={icon} size={compact ? 22 : 26} />
        </span>
        {index ? <span className={styles.index}>{index}</span> : null}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {text ? <p className={styles.text}>{text}</p> : null}
    </Tag>
  );
}
