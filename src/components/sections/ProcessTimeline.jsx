import useInView from '../../hooks/useInView';
import { classNames } from '../../lib/format';
import styles from './ProcessTimeline.module.css';

/**
 * Five-step timeline. Horizontal on desktop, vertical on smaller screens.
 * The connecting line draws in when the timeline enters the viewport,
 * then a soft signal travels along it.
 */
export default function ProcessTimeline({ steps }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <div ref={ref} className={classNames(styles.timeline, inView && styles.active)} style={{ '--count': steps.length }}>
      <div className={styles.track} aria-hidden="true">
        <span className={styles.fill} />
        <span className={styles.signal} />
      </div>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.number} className={styles.step} style={{ '--i': i }}>
            <span className={styles.node} aria-hidden="true">
              {step.number}
            </span>
            <div className={styles.body}>
              <p className={styles.label}>Step {step.number}</p>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
