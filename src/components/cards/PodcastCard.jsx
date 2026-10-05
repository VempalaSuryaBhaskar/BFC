import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import EpisodeThumbnail from '../media/EpisodeThumbnail';
import { getGuest } from '../../data/guests';
import { classNames, formatDate, padNumber } from '../../lib/format';
import styles from './PodcastCard.module.css';

/**
 * BFC Talks episode card.
 * variant: default | compact (smaller, used in horizontal rails)
 */
export default function PodcastCard({
  episode,
  variant = 'default',
  showDate = false,
  showCompany = true,
  watchLabel = 'Watch Episode',
  headingLevel = 3,
  className,
}) {
  const guest = getGuest(episode.guestId);
  const href = `/talks/${episode.slug}`;
  const Heading = `h${headingLevel}`;
  const number = padNumber(episode.number);

  return (
    <article className={classNames(styles.card, styles[variant], className)}>
      <Link to={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <EpisodeThumbnail episode={episode} className={styles.thumb} />
        <span className={styles.play}>
          <Icon name="play" size={22} />
        </span>
      </Link>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.ep}>Episode {number}</span>
          <span className={styles.sep} aria-hidden="true" />
          <span>{episode.topic}</span>
          {showDate ? (
            <>
              <span className={styles.sep} aria-hidden="true" />
              <time dateTime={episode.date}>{formatDate(episode.date)}</time>
            </>
          ) : null}
        </p>

        <Heading className={styles.title}>
          <Link to={href}>{episode.title}</Link>
        </Heading>

        {guest ? (
          <p className={styles.guest}>
            <span className={styles.guestName}>{guest.name}</span>
            <span className={styles.guestRole}>
              {guest.designation}
              {showCompany ? `, ${guest.company}` : ''}
            </span>
          </p>
        ) : null}

        {variant !== 'compact' ? <p className={styles.desc}>{episode.excerpt}</p> : null}

        <div className={styles.actions}>
          <Button href={episode.youtubeUrl} size="sm" icon="play" iconPosition="start">
            {watchLabel}
          </Button>
          <Button to={href} size="sm" variant="outline">
            View Episode
          </Button>
        </div>
      </div>
    </article>
  );
}
