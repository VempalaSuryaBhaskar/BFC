import Silhouette from './Silhouette';
import { classNames } from '../../lib/format';
import media from './Media.module.css';
import styles from './Portrait.module.css';

const TONE_MAP = { warm: 'ember', steel: 'steel', cool: 'concrete' };

/**
 * Profile image with a neutral placeholder fallback.
 * Pass `src` (and optionally `srcSet`/`sizes`) once real photos are available.
 */
export default function Portrait({ src, srcSet, sizes, alt, tone = 'steel', label = 'Photo', className }) {
  if (src) {
    return (
      <div className={classNames(styles.portrait, className)}>
        <img className={media.img} src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div className={classNames(media.art, media[TONE_MAP[tone] ?? tone], styles.portrait, className)} role="img" aria-label={alt}>
      <div className={styles.grid} />
      <div className={media.glow} />
      <Silhouette className={styles.figure} />
      <span className={styles.crop} />
      <span className={styles.tag}>[{label}]</span>
    </div>
  );
}
