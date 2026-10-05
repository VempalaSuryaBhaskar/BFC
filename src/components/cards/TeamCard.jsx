import Icon from '../ui/Icon';
import Portrait from '../media/Portrait';
import { isPlaceholder } from '../../lib/format';
import styles from './TeamCard.module.css';

export default function TeamCard({ member }) {
  const hasLinkedIn = !isPlaceholder(member.linkedin);
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Portrait src={member.photo} alt={`Portrait of ${member.name}`} tone={member.tone} label="Profile photo" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.bg}>{member.background}</p>
        {hasLinkedIn ? (
          <a className={styles.linkedin} href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" size={18} />
            LinkedIn
            <span className="visually-hidden"> profile of {member.name} (opens in a new tab)</span>
          </a>
        ) : (
          <span className={styles.linkedin} aria-disabled="true" title="LinkedIn profile link to be added">
            <Icon name="linkedin" size={18} />
            LinkedIn <span className={styles.pending}>[link]</span>
          </span>
        )}
      </div>
    </article>
  );
}
