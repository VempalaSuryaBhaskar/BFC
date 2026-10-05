import { Link, useParams } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import PodcastCard from '../components/cards/PodcastCard';
import Portrait from '../components/media/Portrait';
import VideoPlayer from '../components/media/VideoPlayer';
import NotFound from './NotFound';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { getEpisodeBySlug, getLatestEpisodes } from '../data/episodes';
import { getGuest } from '../data/guests';
import { formatDate, isPlaceholder, padNumber } from '../lib/format';
import styles from './EpisodeDetail.module.css';

export default function EpisodeDetail() {
  const { slug } = useParams();
  const episode = getEpisodeBySlug(slug);

  useDocumentMeta({
    title: episode ? `${episode.title} | BFC Talks Episode ${padNumber(episode.number)}` : 'Episode not found | BFC Talks',
    description: episode?.excerpt,
    path: `/talks/${slug}`,
    type: 'video.episode',
    noindex: !episode,
  });

  if (!episode) return <NotFound embedded />;

  const guest = getGuest(episode.guestId);
  const related = getLatestEpisodes()
    .filter((ep) => ep.id !== episode.id)
    .sort((a, b) => Number(b.topic === episode.topic) - Number(a.topic === episode.topic))
    .slice(0, 3);

  return (
    <>
      <HeroSection
        eyebrow={`BFC Talks · Episode ${padNumber(episode.number)}`}
        title={episode.title}
        lead={episode.excerpt}
        meta={
          <ul className={styles.meta} role="list">
            <li>
              <Icon name="mic" size={16} />
              {guest?.name}, {guest?.designation}, {guest?.company}
            </li>
            <li>
              <Icon name="calendar" size={16} />
              <time dateTime={episode.date}>{formatDate(episode.date)}</time>
            </li>
            <li>
              <Icon name="clock" size={16} />
              {episode.duration}
            </li>
            <li className={styles.topic}>{episode.topic}</li>
          </ul>
        }
        className={styles.hero}
      />

      <Section tone="black" className={styles.playerSection} aria-label="Watch the episode">
        <div className={styles.player}>
          <VideoPlayer episode={episode} />
        </div>
        <div className={styles.playerActions}>
          <Button href={episode.youtubeUrl} icon="youtube" iconPosition="start">
            Watch on YouTube
          </Button>
          <Button to="/talks" variant="outline" icon="arrowRight">
            All episodes
          </Button>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="about-episode">
        <div className="split split--wide-right">
          <Reveal className={styles.notes}>
            <p className="eyebrow">Show notes</p>
            <h2 id="about-episode" className="h2">
              About this episode
            </h2>
            <div className="prose" style={{ marginTop: 24 }}>
              <p>{episode.description}</p>
            </div>
            {episode.highlights?.length ? (
              <div className={styles.highlights}>
                <h3 className={styles.highlightsTitle}>In this conversation</h3>
                <ul role="list">
                  {episode.highlights.map((h) => (
                    <li key={h}>
                      <Icon name="arrowRight" size={16} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>

          {guest ? (
            <Reveal delay={100} className="sticky-col">
              <aside className={styles.guest} aria-label="About the guest">
                <div className={styles.guestMedia}>
                  <Portrait src={guest.photo} alt={`Portrait of ${guest.name}`} tone={guest.tone} label="Guest photo" />
                </div>
                <div className={styles.guestBody}>
                  <p className={styles.guestLabel}>Guest</p>
                  <h3 className={styles.guestName}>{guest.name}</h3>
                  <p className={styles.guestRole}>
                    {guest.designation}, {guest.company}
                  </p>
                  <p className={styles.guestBio}>{guest.bio}</p>
                  {!isPlaceholder(guest.linkedin) ? (
                    <Button href={guest.linkedin} variant="outline" size="sm" icon="linkedin" iconPosition="start">
                      LinkedIn
                    </Button>
                  ) : null}
                </div>
              </aside>
            </Reveal>
          ) : null}
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="more-title">
        <SectionHeading
          id="more-title"
          eyebrow="Keep watching"
          title="More conversations."
          layout="split"
          actions={
            <Button to="/talks" variant="ghost" icon="arrowRight">
              Browse all episodes
            </Button>
          }
        />
        <div className="grid grid-3">
          {related.map((ep, i) => (
            <Reveal key={ep.id} delay={i * 80}>
              <PodcastCard episode={ep} showDate watchLabel="Watch" />
            </Reveal>
          ))}
        </div>
        <p className={styles.back}>
          <Link to="/contact?type=talks-suggest#contact-form">
            Have a guest in mind for BFC Talks? <span>Suggest a guest</span>
          </Link>
        </p>
      </Section>
    </>
  );
}
