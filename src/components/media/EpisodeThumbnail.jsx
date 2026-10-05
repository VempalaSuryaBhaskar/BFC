import PatternArt from './PatternArt';
import Silhouette from './Silhouette';
import { LogoMark } from '../ui/Logo';
import { classNames, padNumber } from '../../lib/format';
import media from './Media.module.css';
import styles from './EpisodeThumbnail.module.css';

/**
 * 16:9 episode thumbnail. Uses `episode.thumbnail` when provided; otherwise
 * generates an original, YouTube-style branded thumbnail.
 */
export default function EpisodeThumbnail({ episode, className, showDuration = true }) {
  const number = padNumber(episode.number);
  const alt = `BFC Talks episode ${number}: ${episode.title}`;

  if (episode.thumbnail) {
    return (
      <div className={classNames(media.art, styles.thumb, className)}>
        <img className={media.img} src={episode.thumbnail} alt={alt} loading="lazy" decoding="async" width="640" height="360" />
        {showDuration && episode.duration ? <span className={styles.duration}>{episode.duration}</span> : null}
      </div>
    );
  }

  const { pattern = 'grid', tone = 'ember' } = episode.art ?? {};

  return (
    <div className={classNames(media.art, media[tone], styles.thumb, className)} role="img" aria-label={alt}>
      <PatternArt pattern={pattern} className={media.pattern} />
      <div className={media.glow} />
      <Silhouette className={styles.figure} />
      <div className={styles.content} aria-hidden="true">
        <span className={styles.brand}>
          <LogoMark className={styles.mark} />
          BFC Talks
        </span>
        <span className={styles.ep}>EP {number}</span>
        <span className={styles.title}>{episode.title}</span>
        <span className={styles.bar} />
      </div>
      {showDuration && episode.duration ? (
        <span className={styles.duration} aria-hidden="true">
          {episode.duration}
        </span>
      ) : null}
    </div>
  );
}
