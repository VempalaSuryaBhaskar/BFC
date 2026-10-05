import HeroSection from '../components/sections/HeroSection';
import NetworkMap from '../components/sections/NetworkMap';
import CTASection from '../components/sections/CTASection';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import NetworkCard from '../components/cards/NetworkCard';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { NETWORK_CATEGORIES, NETWORK_PRINCIPLES } from '../data/network';
import { INQUIRY_PATH } from '../data/site';
import styles from './Network.module.css';

export default function Network() {
  useDocumentMeta({
    title: 'The BFC Network | Construction & Infrastructure Professionals',
    description:
      'BFC’s strength lies in the people around the industry: civil engineers, project managers, contractors, developers, architects, consultants, vendors, academics and entrepreneurs.',
    path: '/network',
  });

  return (
    <>
      <HeroSection
        eyebrow="Network"
        title="The BFC Network"
        lead="BFC’s strength lies in the people around the industry. Professionals across disciplines who have worked on real projects and solved real problems."
        actions={
          <>
            <Button to="#map" size="lg" icon="arrowRight">
              Explore the network
            </Button>
            <Button to="/contact?type=network#contact-form" size="lg" variant="outline">
              Join the network
            </Button>
          </>
        }
        art="network"
      />

      {/* ------------------------------------------------------------- Map */}
      <Section tone="black" pattern="glow" id="map" aria-labelledby="map-title" className={styles.mapSection}>
        <SectionHeading
          id="map-title"
          eyebrow="Connected Expertise"
          title="BFC at the centre of the construction ecosystem."
          align="center"
          lead="When a problem comes in, BFC looks across these disciplines to find the people with the most relevant experience."
        />
        <Reveal>
          <NetworkMap categories={NETWORK_CATEGORIES} />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ Categories */}
      <Section tone="white" aria-labelledby="disciplines-title">
        <SectionHeading
          id="disciplines-title"
          eyebrow="Disciplines"
          title="Who makes up the network."
          layout="split"
          lead="Twelve disciplines that together cover the technical, commercial, contractual and strategic sides of construction and infrastructure."
        />
        <div className="grid grid-4">
          {NETWORK_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 4) * 60}>
              <NetworkCard category={cat} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ Principles */}
      <Section tone="paper" aria-labelledby="principles-title">
        <SectionHeading id="principles-title" eyebrow="How It Works" title="How the network works." layout="split" />
        <ol className={styles.principles}>
          {NETWORK_PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} className={styles.principle} delay={i * 100}>
              <span className={styles.num}>0{i + 1}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.text}>{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection
        eyebrow="Join the BFC Network"
        title="Are you an industry professional?"
        text="If you have experience that could help others solve project problems, or a perspective worth sharing on BFC Talks, we would like to hear from you."
        primary={{ label: 'Join the network', to: '/contact?type=network#contact-form' }}
        secondary={{ label: 'Talk to BFC', to: INQUIRY_PATH, icon: 'consult' }}
      />
    </>
  );
}
