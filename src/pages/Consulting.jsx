import HeroSection from '../components/sections/HeroSection';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import ServiceCard from '../components/cards/ServiceCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import ConsultingForm from '../components/forms/ConsultingForm';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { AUDIENCES, FAQS, HELP_AREAS, PRINCIPLES, SERVICES } from '../data/consulting';
import { PROCESS_STEPS } from '../data/process';
import { TESTIMONIALS } from '../data/testimonials';
import { SITE } from '../data/site';
import { isPlaceholder } from '../lib/format';
import styles from './Consulting.module.css';

const NEXT_STEPS = [
  'We review your submission and may ask a few clarifying questions.',
  'We discuss the situation with you to understand it properly.',
  'Where we can help, we identify the right people and next steps.',
];

export default function Consulting() {
  useDocumentMeta({
    title: 'BFC Consulting | Construction Problem Solving & Expert Connect',
    description:
      'Facing a complex construction or infrastructure project problem? BFC Consulting helps you understand the situation and connect with the right expertise, specialists, contractors and vendors.',
    path: '/consulting',
  });

  const { email } = SITE.contact;

  return (
    <>
      <HeroSection
        eyebrow="BFC Consulting"
        title="When the problem is complex, the right connection matters."
        lead="BFC Consulting helps clients, builders, contractors, developers and consultants work through difficult project situations by understanding the problem and connecting them with the right expertise."
        actions={
          <>
            <Button to="#inquiry" size="lg" icon="arrowRight">
              Submit a Problem
            </Button>
            <Button to="#how-it-works" size="lg" variant="outline">
              How it works
            </Button>
          </>
        }
        art="consulting"
      />

      {/* ------------------------------------------------------- Philosophy */}
      <Section tone="white" aria-labelledby="philosophy-title">
        <div className="split">
          <Reveal>
            <p className="eyebrow">Our Philosophy</p>
            <h2 id="philosophy-title" className="h2">
              Most project problems are not unsolvable. They are unconnected.
            </h2>
            <div className="prose" style={{ marginTop: 28 }}>
              <p>
                The expertise to solve most construction problems already exists somewhere in the industry. The difficulty is finding the right
                person quickly, trusting their experience, and bringing them in with enough context to help.
              </p>
              <p>
                That is the gap BFC exists to close. We start by understanding the situation properly, then draw on our professional network to
                identify the people and resources best suited to it.
              </p>
              <p>
                <strong>BFC helps identify the appropriate expertise and resources depending on the problem.</strong> Where specialist engineering,
                legal, financial or statutory services are required, they are provided by appropriately qualified professionals and firms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ol className={styles.principles}>
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className={styles.principle}>
                  <span className={styles.principleNum}>0{i + 1}</span>
                  <div>
                    <h3 className={styles.principleTitle}>{p.title}</h3>
                    <p className={styles.principleText}>{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- Audience */}
      <Section tone="paper" tight ruled aria-label="Who approaches BFC">
        <Reveal className={styles.audience}>
          <p className={styles.audienceLabel}>Who approaches BFC</p>
          <ul className={styles.audienceList} role="list">
            {AUDIENCES.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* -------------------------------------------------- What we help with */}
      <Section tone="paper" className={styles.helpSection} aria-labelledby="help-title">
        <SectionHeading
          id="help-title"
          eyebrow="What We Help With"
          title="Challenges we help you work through."
          layout="split"
          lead="BFC helps identify the appropriate expertise and resources depending on the problem. These are some of the situations people bring to us."
        />
        <div className="grid grid-4">
          {HELP_AREAS.map((area, i) => (
            <Reveal key={area.label} delay={(i % 4) * 60}>
              <ServiceCard compact icon={area.icon} title={area.label} text={area.text} />
            </Reveal>
          ))}
          <Reveal delay={180}>
            <a href="#inquiry" className={styles.otherCard}>
              <span className={styles.otherLabel}>Something else?</span>
              <span className={styles.otherText}>If it is a construction or project challenge, tell us about it.</span>
              <span className={styles.otherCta}>
                Describe your problem <Icon name="arrowRight" size={16} />
              </span>
            </a>
          </Reveal>
        </div>
        <Reveal className={`placeholder-note ${styles.disclaimer}`}>
          <Icon name="info" size={18} />
          <span>
            BFC is an advisory and industry-connect platform. We do not offer guaranteed outcomes, and we do not provide licensed engineering,
            legal or financial services ourselves. Where these are needed, we help you identify and engage appropriately qualified professionals.
          </span>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- Services */}
      <Section tone="dark" pattern="grid" aria-labelledby="engage-title">
        <SectionHeading
          id="engage-title"
          eyebrow="How We Engage"
          title="Ways BFC can support your project."
          layout="split"
          lead="Every situation is different. Engagements are shaped around the problem rather than a fixed menu, but most fall into one or more of these areas."
        />
        <div className="grid grid-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 80}>
              <ServiceCard icon={service.icon} title={service.title} text={service.text} index={`0${i + 1}`} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- How it works */}
      <Section tone="white" id="how-it-works" aria-labelledby="hiw-title">
        <SectionHeading
          id="hiw-title"
          eyebrow="How BFC Works"
          title="A clear process, from first contact to a way forward."
          layout="split"
        />
        <ProcessTimeline steps={PROCESS_STEPS} />
      </Section>

      {/* ----------------------------------------------------- Testimonials */}
      <Section tone="paper" aria-labelledby="testimonials-title">
        <SectionHeading id="testimonials-title" eyebrow="Client Perspectives" title="What clients say." layout="split" />
        <div className="grid grid-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <p className="placeholder-note" style={{ marginTop: 24 }}>
          <Icon name="info" size={18} />
          Placeholder testimonials. Replace with real client quotes, published only with written permission.
        </p>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section tone="white" aria-labelledby="faq-title">
        <div className="split split--wide-right">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title" className="h2">
              Frequently asked questions.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Not finding what you need? Ask us directly through the form below.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.faq}>
              {FAQS.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary className={styles.faqQ}>
                    <span>{item.q}</span>
                    <Icon name="plus" size={20} className={styles.faqIcon} />
                  </summary>
                  <p className={styles.faqA}>{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Inquiry */}
      <Section tone="paper" pattern="grid" id="inquiry" aria-labelledby="inquiry-title" className={styles.inquiry}>
        <div className="split split--wide-right">
          <div className="sticky-col">
            <Reveal>
              <p className="eyebrow">Consulting Inquiry</p>
              <h2 id="inquiry-title" className="h2">
                Tell us what you’re dealing with.
              </h2>
              <p className="lead" style={{ marginTop: 20 }}>
                A few details help us understand your situation and respond with something useful. There is no obligation, and you choose how
                much to share.
              </p>

              <div className={styles.next}>
                <p className={styles.nextTitle}>What happens next</p>
                <ol className={styles.nextList}>
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step}>
                      <span>0{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className={styles.alt}>
                <Icon name="mail" size={18} />
                <span>
                  Prefer email?{' '}
                  {isPlaceholder(email) ? <span>{email}</span> : <a href={`mailto:${email}`}>{email}</a>}
                </span>
              </p>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <ConsultingForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
