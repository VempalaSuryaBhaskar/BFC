import Icon from '../ui/Icon';
import styles from './TestimonialCard.module.css';

/** Client quote. Only publish real testimonials with written permission. */
export default function TestimonialCard({ testimonial }) {
  return (
    <figure className={styles.card}>
      <Icon name="quote" size={30} className={styles.icon} />
      <blockquote className={styles.quote}>
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className={styles.caption}>
        <span className={styles.avatar} aria-hidden="true" />
        <span>
          <span className={styles.name}>{testimonial.name}</span>
          <span className={styles.role}>
            {testimonial.role}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
