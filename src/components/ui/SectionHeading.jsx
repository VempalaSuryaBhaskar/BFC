import Reveal from './Reveal';
import { classNames } from '../../lib/format';
import styles from './SectionHeading.module.css';

/**
 * Eyebrow + title + lead. `layout="split"` places the lead/actions in a
 * second column on wide screens.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  id,
  align = 'left',
  layout = 'stack',
  size = 'md',
  actions,
  className,
  children,
}) {
  return (
    <Reveal
      className={classNames(styles.heading, styles[align], styles[layout], styles[size], className)}
    >
      <div className={styles.main}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Tag id={id} className={styles.title}>
          {title}
        </Tag>
      </div>
      {lead || actions || children ? (
        <div className={styles.aside}>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {children}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      ) : null}
    </Reveal>
  );
}
