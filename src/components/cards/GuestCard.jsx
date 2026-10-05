import Icon from '../ui/Icon';
import Portrait from '../media/Portrait';
import styles from './GuestCard.module.css';

/** Guest profile tile. Clicking opens the guest's profile (handled by parent). */
export default function GuestCard({ guest, episodeCount = 0, onSelect }) {
  return (
    <article className={styles.card}>
      <button type="button" className={styles.trigger} onClick={() => onSelect?.(guest)}>
        <span className={styles.media}>
          <Portrait src={guest.photo} alt={`Portrait of ${guest.name}`} tone={guest.tone} label="Guest photo" />
        </span>
        <span className={styles.body}>
          <span className={styles.sector}>{guest.sector}</span>
          <span className={styles.name}>{guest.name}</span>
          <span className={styles.role}>
            {guest.designation}
            <br />
            {guest.company}
          </span>
          <span className={styles.more}>
            View profile{episodeCount ? ` · ${episodeCount} episode${episodeCount > 1 ? 's' : ''}` : ''}
            <Icon name="arrowRight" size={16} />
          </span>
        </span>
      </button>
    </article>
  );
}
