import { useState } from 'react';
import Icon from '../ui/Icon';
import EpisodeThumbnail from './EpisodeThumbnail';
import { padNumber } from '../../lib/format';
import styles from './VideoPlayer.module.css';

/**
 * Lightweight YouTube player. Shows the thumbnail until clicked, then loads a
 * privacy-enhanced embed (only when `episode.youtubeId` is set). Without an ID
 * it links out to `episode.youtubeUrl`.
 */
export default function VideoPlayer({ episode }) {
  const [playing, setPlaying] = useState(false);
  const label = `episode ${padNumber(episode.number)}: ${episode.title}`;

  if (episode.youtubeId && playing) {
    return (
      <div className={styles.frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1&rel=0`}
          title={`BFC Talks ${label}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  const poster = (
    <>
      <EpisodeThumbnail episode={episode} />
      <span className={styles.overlay} />
      <span className={styles.play}>
        <Icon name="play" size={34} />
      </span>
      <span className={styles.caption}>{episode.youtubeId ? 'Play episode' : 'Watch on YouTube'}</span>
    </>
  );

  if (episode.youtubeId) {
    return (
      <button type="button" className={styles.poster} onClick={() => setPlaying(true)} aria-label={`Play ${label}`}>
        {poster}
      </button>
    );
  }

  return (
    <a className={styles.poster} href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${label} on YouTube (opens in a new tab)`}>
      {poster}
    </a>
  );
}
