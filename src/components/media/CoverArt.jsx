import PatternArt from './PatternArt';
import { classNames } from '../../lib/format';
import media from './Media.module.css';
import styles from './CoverArt.module.css';

/** Generated cover for insight articles (or a real `image` when supplied). */
export default function CoverArt({ art = {}, label, image, alt = '', className }) {
  if (image) {
    return (
      <div className={classNames(media.art, styles.cover, className)}>
        <img className={media.img} src={image} alt={alt} loading="lazy" decoding="async" />
      </div>
    );
  }
  const { pattern = 'grid', tone = 'graphite' } = art;
  return (
    <div className={classNames(media.art, media[tone], styles.cover, className)} aria-hidden="true">
      <PatternArt pattern={pattern} className={media.pattern} />
      <div className={media.glow} />
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.corner} />
    </div>
  );
}
