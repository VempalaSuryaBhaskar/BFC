import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import styles from './HelpFlow.module.css';

/** Compact five-stage flow: problem → way forward. */
export default function HelpFlow({ steps }) {
  return (
    <ol className={styles.flow}>
      {steps.map((step, i) => (
        <Reveal as="li" key={step.number} className={styles.step} delay={i * 90}>
          <span className={styles.number}>{step.number}</span>
          <span className={styles.title}>{step.title}</span>
          <span className={styles.text}>{step.text}</span>
          {i < steps.length - 1 ? (
            <span className={styles.arrow} aria-hidden="true">
              <Icon name="arrowRight" size={16} />
            </span>
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}
