import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import HeroVisual from '../components/sections/HeroVisual';
import TrustStrip from '../components/sections/TrustStrip';
import ProblemGrid from '../components/sections/ProblemGrid';
import HelpFlow from '../components/sections/HelpFlow';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import NetworkMap from '../components/sections/NetworkMap';
import Pillars from '../components/sections/Pillars';
import CTASection from '../components/sections/CTASection';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import ServiceCard from '../components/cards/ServiceCard';
import PodcastCard from '../components/cards/PodcastCard';
import InsightCard from '../components/cards/InsightCard';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { INDUSTRIES } from '../data/industries';
import { HELP_FLOW, PROBLEM_AREAS, SERVICES } from '../data/consulting';
import { PROCESS_STEPS } from '../data/process';
import { getLatestEpisodes } from '../data/episodes';
import { NETWORK_CATEGORIES } from '../data/network';
import { PILLARS } from '../data/about';
import { getLatestInsights } from '../data/insights';
import { INQUIRY_PATH, SITE } from '../data/site';
import styles from './Home.module.css';

const VERTICALS = [
  {
    index: '01',
    name: 'BFC Consulting',
    line: 'You have a problem. We know who can solve it.',
    to: '/consulting',
  },
  {
    index: '02',
    name: 'BFC Talks',
    line: 'Conversations that move construction forward.',
    to: '/talks',
  },
];

export default function Home() {
  useDocumentMeta({
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    path: '/',
  });

  const episodes = getLatestEpisodes(3);
  const insights = getLatestInsights(3);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <HeroSection
        variant="home"
        eyebrow="Construction · Infrastructure · Industry Network"
        title={
          <>
            <span className={styles.heroLine}>
              Construction Problems<span className={styles.dot}>.</span>
            </span>{' '}
            <span className={styles.heroLine}>
              Industry Connections<span className={styles.dot}>.</span>
            </span>{' '}
            <span className={styles.heroLine}>
              Practical Solutions<span className={styles.dot}>.</span>
            </span>
          </>
        }
        lead="BFC connects construction and infrastructure stakeholders with the right expertise, people, and industry networks to solve complex project challenges."
        actions={
          <>
            <Button to={INQUIRY_PATH} size="lg" icon="arrowRight">
              Discuss a Problem
            </Button>
            <Button to="/talks" size="lg" variant="outline" icon="play" iconPosition="start">
              Explore BFC Talks
            </Button>
          </>
        }
        visual={<HeroVisual />}
      >
        <ul className={styles.verticals} role="list">
          {VERTICALS.map((v) => (
            <li key={v.name}>
              <Link to={v.to} className={styles.vertical}>
                <span className={styles.verticalIndex}>{v.index}</span>
                <span className={styles.verticalBody}>
                  <span className={styles.verticalName}>{v.name}</span>
                  <span className={styles.verticalLine}>{v.line}</span>
                </span>
                <Icon name="arrowUpRight" size={20} className={styles.verticalIcon} />
              </Link>
            </li>
          ))}
        </ul>
      </HeroSection>

      {/* -------------------------------------------------------- Trust strip */}
      <TrustStrip title="Built around the people who build." items={INDUSTRIES} />

      {/* ---------------------------------------------------------- Problem */}
      <Section tone="paper" aria-labelledby="problem-title">
        <SectionHeading
          id="problem-title"
          eyebrow="The Problem"
          title="Every construction project has problems."
          layout="split"
          lead="Not because people are not capable, but because projects are complex, interdependent and unforgiving. Challenges surface across execution, commercial, contractual and technical fronts, often at the same time."
        />
        <ProblemGrid items={PROBLEM_AREAS} />
      </Section>

      {/* ---------------------------------------------------- How BFC helps */}
      <Section tone="white" aria-labelledby="helps-title">
        <SectionHeading
          id="helps-title"
          eyebrow="How BFC Helps"
          title="BFC helps you find the right people to solve them."
          layout="split"
          lead="Somewhere in the industry, someone has already dealt with a problem like yours. BFC’s role is to understand your situation and connect you with the people and expertise best placed to help."
        />
        <HelpFlow steps={HELP_FLOW} />
        <Reveal className="section-actions">
          <Button to={INQUIRY_PATH} size="lg" variant="dark" icon="arrowRight">
            Have a Construction Problem?
          </Button>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ Consulting */}
      <Section tone="dark" pattern="grid" aria-labelledby="consulting-title">
        <SectionHeading
          id="consulting-title"
          eyebrow="BFC Consulting"
          title="Your project has a problem. We help you find the right solution."
          layout="split"
          lead="BFC Consulting is an industry-connect and advisory platform. We listen, diagnose what is really going on, and draw on a professional network of specialists, consultants, contractors and vendors to help you identify a practical way forward."
        >
          <p className={styles.tagline}>
            <span className={styles.taglineMark} aria-hidden="true" />
            You have a problem. We know who can solve it.
          </p>
        </SectionHeading>

        <div className="grid grid-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 80}>
              <ServiceCard icon={service.icon} title={service.title} text={service.text} index={`0${i + 1}`} />
            </Reveal>
          ))}
        </div>

        <Reveal className="section-actions">
          <Button to={INQUIRY_PATH} size="lg" icon="arrowRight">
            Tell Us Your Problem
          </Button>
          <Button to="/consulting" size="lg" variant="outline">
            About BFC Consulting
          </Button>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------- How it works */}
      <Section tone="paper" pattern="grid" aria-labelledby="process-title">
        <SectionHeading
          id="process-title"
          eyebrow="How BFC Works"
          title="From first conversation to a way forward."
          layout="split"
          lead="A simple, structured process designed around your time, your project and your confidentiality."
        />
        <ProcessTimeline steps={PROCESS_STEPS} />
      </Section>

      {/* -------------------------------------------------------- BFC Talks */}
      <Section tone="black" pattern="glow" aria-labelledby="talks-title" className={styles.talks}>
        <div className={styles.talksHead}>
          <Reveal className={styles.talksIntro}>
            <p className="eyebrow">Media · Podcast</p>
            <h2 id="talks-title" className={styles.talksTitle}>
              BFC Talks
            </h2>
            <p className={styles.talksSub}>Conversations with the people shaping construction.</p>
          </Reveal>
          <Reveal className={styles.talksAside} delay={100}>
            <p className="lead">
              BFC Talks brings together leaders, professionals, entrepreneurs, experts, and decision-makers from across the construction and
              infrastructure ecosystem.
            </p>
            <div className={styles.talksActions}>
              <Button to="/talks" icon="arrowRight">
                Explore BFC Talks
              </Button>
              <Button href={SITE.social.youtube} variant="outline" icon="youtube" iconPosition="start">
                Subscribe on YouTube
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-3 rail-mobile">
          {episodes.map((episode, i) => (
            <Reveal key={episode.id} delay={i * 90}>
              <PodcastCard episode={episode} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Network */}
      <Section tone="white" aria-labelledby="network-title">
        <SectionHeading
          id="network-title"
          eyebrow="The BFC Network"
          title="The right people, across the whole industry."
          layout="split"
          lead="BFC’s strength lies in the people around the industry: engineers, project managers, contractors, developers, consultants, vendors, academics and leaders with hands-on experience."
          actions={
            <Button to="/network" variant="ghost" icon="arrowRight">
              Explore the network
            </Button>
          }
        />
        <Reveal>
          <NetworkMap categories={NETWORK_CATEGORIES} />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- Why BFC */}
      <Section tone="paper" aria-labelledby="why-title">
        <SectionHeading
          id="why-title"
          eyebrow="Why BFC"
          title="Why BFC?"
          layout="split"
          lead="Three things set the way BFC works apart: an understanding of how projects actually run, a network built across the industry, and a commitment to sharing what we learn."
        />
        <Pillars items={PILLARS} />
      </Section>

      {/* --------------------------------------------------------- Insights */}
      <Section tone="white" aria-labelledby="insights-title">
        <SectionHeading
          id="insights-title"
          eyebrow="Latest Insights"
          title="Practical perspectives from across the industry."
          layout="split"
          actions={
            <Button to="/insights" variant="ghost" icon="arrowRight">
              View all insights
            </Button>
          }
        />
        <div className="grid grid-3">
          {insights.map((article, i) => (
            <Reveal key={article.slug} delay={i * 90}>
              <InsightCard article={article} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- Final CTA */}
      <CTASection
        eyebrow="Talk to BFC"
        title="Have a problem worth solving?"
        text="Tell us what’s happening. We’ll help you find the right direction."
        primary={{ label: 'Talk to BFC', to: INQUIRY_PATH }}
        secondary={{ label: 'Watch BFC Talks', to: '/talks' }}
      />
    </>
  );
}
