import { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import CTASection from '../components/sections/CTASection';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';
import PodcastCard from '../components/cards/PodcastCard';
import GuestCard from '../components/cards/GuestCard';
import EpisodeThumbnail from '../components/media/EpisodeThumbnail';
import Portrait from '../components/media/Portrait';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { EPISODES, TALK_CATEGORIES, getEpisodesByGuest, getFeaturedEpisode, getLatestEpisodes } from '../data/episodes';
import { GUESTS, getGuest } from '../data/guests';
import { SITE } from '../data/site';
import { formatDate, isPlaceholder, padNumber, slugify } from '../lib/format';
import styles from './Talks.module.css';

const FILTER_OPTIONS = TALK_CATEGORIES.map((c) => ({ value: slugify(c), label: c }));

function FeaturedEpisode({ episode }) {
  const guest = getGuest(episode.guestId);
  const href = `/talks/${episode.slug}`;
  return (
    <article className={styles.featured}>
      <Link to={href} className={styles.featuredMedia} tabIndex={-1} aria-hidden="true">
        <EpisodeThumbnail episode={episode} />
        <span className={styles.featuredPlay}>
          <Icon name="play" size={28} />
        </span>
      </Link>
      <div className={styles.featuredBody}>
        <p className={styles.featuredMeta}>
          <span className={styles.badge}>Featured</span>
          <span>Episode {padNumber(episode.number)}</span>
          <span aria-hidden="true">·</span>
          <span>{episode.topic}</span>
        </p>
        <h3 className={styles.featuredTitle}>
          <Link to={href}>{episode.title}</Link>
        </h3>
        <p className={styles.featuredGuest}>
          <strong>{guest?.name}</strong>
          <span>
            {guest?.designation}, {guest?.company}
          </span>
        </p>
        <p className={styles.featuredDesc}>{episode.excerpt}</p>
        <p className={styles.featuredDate}>
          <Icon name="calendar" size={16} />
          <time dateTime={episode.date}>{formatDate(episode.date)}</time>
          <span aria-hidden="true">·</span>
          <Icon name="clock" size={16} />
          {episode.duration}
        </p>
        <div className={styles.featuredActions}>
          <Button href={episode.youtubeUrl} icon="play" iconPosition="start">
            Watch on YouTube
          </Button>
          <Button to={href} variant="outline">
            View Episode
          </Button>
        </div>
      </div>
    </article>
  );
}

function GuestProfile({ guest }) {
  const episodes = getEpisodesByGuest(guest.id);
  return (
    <div className={styles.profile}>
      <div className={styles.profileMedia}>
        <Portrait src={guest.photo} alt={`Portrait of ${guest.name}`} tone={guest.tone} label="Guest photo" />
      </div>
      <div className={styles.profileBody}>
        <p className={styles.profileRole}>
          {guest.designation} · {guest.company}
        </p>
        <p className={styles.profileSector}>{guest.sector}</p>
        <p>{guest.bio}</p>
        {episodes.length ? (
          <div className={styles.profileEpisodes}>
            <p className={styles.profileLabel}>Appears in</p>
            <ul role="list">
              {episodes.map((ep) => (
                <li key={ep.id}>
                  <Link to={`/talks/${ep.slug}`}>
                    <span>EP {padNumber(ep.number)}</span>
                    {ep.title}
                    <Icon name="arrowRight" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {!isPlaceholder(guest.linkedin) ? (
          <Button href={guest.linkedin} variant="outline" size="sm" icon="linkedin" iconPosition="start">
            LinkedIn
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default function Talks() {
  useDocumentMeta({
    title: 'BFC Talks | Conversations Shaping Construction & Infrastructure',
    description:
      'BFC Talks is a podcast and interview series with leaders, professionals, entrepreneurs and experts from across construction, infrastructure, real estate and project management.',
    path: '/talks',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get('topic') ?? 'all';
  const [selectedGuest, setSelectedGuest] = useState(null);
  const closeGuest = useCallback(() => setSelectedGuest(null), []);

  const featured = getFeaturedEpisode();
  const popular = EPISODES.filter((ep) => ep.popular).slice(0, 4);
  const latest = useMemo(() => {
    const all = getLatestEpisodes();
    return topic === 'all' ? all : all.filter((ep) => slugify(ep.topic) === topic);
  }, [topic]);

  const setTopic = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') next.delete('topic');
    else next.set('topic', value);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <HeroSection
        eyebrow="Media · Podcast"
        title="BFC Talks"
        lead="Ideas, experiences and conversations from the people building the future."
        actions={
          <>
            <Button href={SITE.social.youtube} size="lg" icon="youtube" iconPosition="start">
              Watch on YouTube
            </Button>
            <Button to="/contact?type=talks-suggest#contact-form" size="lg" variant="outline" icon="mic" iconPosition="start">
              Suggest a Guest
            </Button>
          </>
        }
        art="talks"
        className={styles.hero}
      />

      {/* -------------------------------------------------------- Featured */}
      <Section tone="black" aria-labelledby="featured-title" className={styles.featuredSection}>
        <h2 id="featured-title" className="visually-hidden">
          Featured episode
        </h2>
        <Reveal>
          <FeaturedEpisode episode={featured} />
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- Popular */}
      <Section tone="dark" aria-labelledby="popular-title">
        <SectionHeading
          id="popular-title"
          eyebrow="Popular"
          title="Popular conversations."
          layout="split"
          lead="Episodes our audience keeps coming back to."
        />
        <div className="grid grid-4 rail-mobile">
          {popular.map((episode, i) => (
            <Reveal key={episode.id} delay={i * 70}>
              <PodcastCard episode={episode} variant="compact" showCompany={false} watchLabel="Watch" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Latest */}
      <Section tone="white" aria-labelledby="latest-title" id="episodes">
        <SectionHeading id="latest-title" eyebrow="All Episodes" title="Latest episodes." layout="split" />
        <FilterBar
          label="Filter episodes by topic"
          options={FILTER_OPTIONS}
          value={topic}
          onChange={setTopic}
          resultCount={latest.length}
          resultNoun="episode"
        />
        {latest.length ? (
          <div className="grid grid-3">
            {latest.map((episode) => (
              <PodcastCard key={episode.id} episode={episode} showDate watchLabel="Watch on YouTube" />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="mic" size={28} />
            <p>No episodes in this category yet. New conversations are on the way.</p>
            <Button variant="outline" onClick={() => setTopic('all')}>
              Show all episodes
            </Button>
          </div>
        )}
      </Section>

      {/* ---------------------------------------------------------- Guests */}
      <Section tone="paper" aria-labelledby="guests-title">
        <SectionHeading
          id="guests-title"
          eyebrow="Guests"
          title="The people behind the conversations."
          layout="split"
          lead="Leaders and practitioners from across construction, infrastructure, real estate, technology and entrepreneurship."
        />
        <div className="grid grid-4 grid-mobile-2">
          {GUESTS.map((guest, i) => (
            <Reveal key={guest.id} delay={(i % 4) * 70}>
              <GuestCard guest={guest} episodeCount={getEpisodesByGuest(guest.id).length} onSelect={setSelectedGuest} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Be part of BFC Talks"
        title="Know someone the industry should hear from?"
        text="Suggest a guest, or tell us about the experience and perspective you would bring to the conversation."
        primary={{ label: 'Connect with BFC Talks', to: '/contact?type=talks-guest#contact-form' }}
        secondary={{ label: 'Subscribe on YouTube', href: SITE.social.youtube, icon: 'youtube' }}
      />

      <Modal open={Boolean(selectedGuest)} onClose={closeGuest} title={selectedGuest?.name} eyebrow="Guest profile" size="lg">
        {selectedGuest ? <GuestProfile guest={selectedGuest} /> : null}
      </Modal>
    </>
  );
}
