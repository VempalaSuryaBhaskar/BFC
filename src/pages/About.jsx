import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import Pillars from '../components/sections/Pillars';
import StatsSection from '../components/sections/StatsSection';
import CTASection from '../components/sections/CTASection';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import TeamCard from '../components/cards/TeamCard';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { PILLARS, STATS, VALUES } from '../data/about';
import { TEAM } from '../data/team';
import { INQUIRY_PATH } from '../data/site';
import styles from './About.module.css';

const VERTICALS = [
  {
    name: 'BFC Consulting',
    tag: 'Problem solving · Expert connect · Advisory',
    text: 'For clients, builders, contractors, developers and consultants facing difficult project situations. We understand the problem and help connect the right expertise and resources.',
    quote: 'You have a problem. We know who can solve it.',
    to: '/consulting',
    cta: 'Explore Consulting',
    icon: 'consult',
  },
  {
    name: 'BFC Talks',
    tag: 'Podcast · Interviews · Insights',
    text: 'Conversations with people across construction, infrastructure, real estate and project management, published on YouTube and social platforms.',
    quote: 'Conversations that move construction forward.',
    to: '/talks',
    cta: 'Explore BFC Talks',
    icon: 'mic',
  },
];

export default function About() {
  useDocumentMeta({
    title: 'About BFC | Built by People Who Understand How Projects Work',
    description:
      'BFC was founded by professionals from the civil engineering, construction, infrastructure and project-management ecosystem to connect people, share knowledge and solve real project problems.',
    path: '/about',
  });

  return (
    <>
      <HeroSection
        eyebrow="About BFC"
        title="Built by people who understand how projects actually work."
        lead="BFC was started by a group of professionals connected with the civil engineering, construction, infrastructure and project-management ecosystem, including people from the NICMAR community."
        art="about"
      />

      {/* ------------------------------------------------------------ Story */}
      <Section tone="white" aria-labelledby="story-title">
        <div className="split">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 id="story-title" className="h2">
              Started by industry people, for industry people.
            </h2>
          </Reveal>
          <Reveal delay={100} className="prose">
            <p>
              Anyone who has worked on a construction project knows that problems are part of the job. What makes the difference is how quickly
              you can reach someone who understands the situation and has dealt with something similar before.
            </p>
            <p>
              BFC was built around that idea. Its founders have seen how much expertise sits across the industry, with engineers, project
              managers, contractors, consultants, vendors and leaders, and how often the people who need it cannot find it in time.
            </p>
            <p>
              Today BFC works in two ways: <strong>BFC Consulting</strong> helps people solve project problems through the right connections,
              and <strong>BFC Talks</strong> shares the experience of people shaping the industry with everyone building its future.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- Verticals */}
      <Section tone="dark" pattern="grid" aria-labelledby="verticals-title">
        <SectionHeading id="verticals-title" eyebrow="What We Do" title="Two verticals. One purpose." layout="split" />
        <div className="grid grid-2">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.name} delay={i * 100}>
              <Link to={v.to} className={styles.vertical}>
                <span className={styles.verticalTop}>
                  <span className={styles.verticalIcon}>
                    <Icon name={v.icon} size={26} />
                  </span>
                  <span className={styles.verticalTag}>{v.tag}</span>
                </span>
                <span className={styles.verticalName}>{v.name}</span>
                <span className={styles.verticalQuote}>“{v.quote}”</span>
                <span className={styles.verticalText}>{v.text}</span>
                <span className={styles.verticalCta}>
                  {v.cta} <Icon name="arrowRight" size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- Values */}
      <Section tone="paper" aria-labelledby="values-title">
        <SectionHeading
          id="values-title"
          eyebrow="What BFC Is Built On"
          title="The principles behind the work."
          layout="split"
          lead="Seven ideas guide how BFC approaches problems, people and knowledge."
        />
        <ul className={styles.values} role="list">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} className={styles.value} delay={(i % 4) * 60}>
              <Icon name={v.icon} size={24} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueText}>{v.text}</p>
            </Reveal>
          ))}
          <Reveal as="li" className={styles.valueStatement} delay={180}>
            <p>Connecting people. Sharing knowledge. Solving problems.</p>
          </Reveal>
        </ul>
      </Section>

      {/* ---------------------------------------------------------- Why BFC */}
      <Section tone="white" aria-labelledby="why-title">
        <SectionHeading id="why-title" eyebrow="Why BFC" title="Why BFC?" layout="split" />
        <Pillars items={PILLARS} />
      </Section>

      {/* ------------------------------------------------------------ Stats */}
      <Section tone="paper" tight aria-label="BFC at a glance">
        <StatsSection items={STATS} />
      </Section>

      {/* ------------------------------------------------------------- Team */}
      <Section tone="white" id="team" aria-labelledby="team-title">
        <SectionHeading
          id="team-title"
          eyebrow="Founders"
          title="The people behind BFC."
          layout="split"
          lead="A team with backgrounds across construction, infrastructure and project management."
        />
        <div className="grid grid-3">
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 90}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
        <p className="placeholder-note" style={{ marginTop: 24 }}>
          <Icon name="info" size={18} />
          Placeholder profiles. Add founder names, roles, backgrounds, photos and LinkedIn links in src/data/team.js.
        </p>
      </Section>

      <CTASection
        eyebrow="Work with BFC"
        title="Have a problem worth solving?"
        text="Tell us what’s happening. We’ll help you find the right direction."
        primary={{ label: 'Talk to BFC', to: INQUIRY_PATH }}
        secondary={{ label: 'Watch BFC Talks', to: '/talks' }}
      />
    </>
  );
}
