import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import styles from './CTASection.module.css';

/** Large dark closing call-to-action. */
export default function CTASection({ eyebrow, title, text, primary, secondary }) {
  return (
    <section className={`${styles.cta} theme-dark`} aria-label={typeof title === 'string' ? title : undefined}>
      <div className={styles.bg} aria-hidden="true">
        <svg className={styles.frame} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M0 330H800M0 70H800M120 0V400M680 0V400" stroke="rgba(255,255,255,0.06)" />
          <path d="M120 330 400 70 680 330" stroke="rgba(255,255,255,0.08)" />
          <path d="M260 330 400 200 540 330M400 70V330" stroke="rgba(255,255,255,0.05)" />
          <circle cx="400" cy="70" r="5" fill="#F06A1D" />
          <circle cx="400" cy="70" r="16" stroke="#F06A1D" strokeOpacity="0.4" />
        </svg>
      </div>
      <div className="container">
        <Reveal className={styles.inner}>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className={styles.title}>{title}</h2>
          {text ? <p className={styles.text}>{text}</p> : null}
          <div className={styles.actions}>
            {primary ? (
              <Button to={primary.to} href={primary.href} size="lg" icon="arrowRight">
                {primary.label}
              </Button>
            ) : null}
            {secondary ? (
              <Button to={secondary.to} href={secondary.href} size="lg" variant="outline" icon={secondary.icon ?? 'play'} iconPosition="start">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
