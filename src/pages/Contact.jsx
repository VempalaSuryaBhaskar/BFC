import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/forms/ContactForm';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { CONTACT_OPTIONS } from '../data/contact';
import { SITE, SOCIAL_LINKS } from '../data/site';
import { isPlaceholder } from '../lib/format';
import styles from './Contact.module.css';

function Detail({ icon, label, value, href }) {
  return (
    <li className={styles.detail}>
      <span className={styles.detailIcon}>
        <Icon name={icon} size={20} />
      </span>
      <span>
        <span className={styles.detailLabel}>{label}</span>
        {href && !isPlaceholder(value) ? <a href={href}>{value}</a> : <span className={styles.detailValue}>{value}</span>}
      </span>
    </li>
  );
}

export default function Contact() {
  useDocumentMeta({
    title: 'Contact BFC | Let’s Solve Something',
    description:
      'Get in touch with BFC about a construction project challenge, appearing on BFC Talks, partnerships or general inquiries.',
    path: '/contact',
  });

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ?? undefined;
  const { email, phone, location, hours } = SITE.contact;

  return (
    <>
      <HeroSection
        eyebrow="Contact"
        title="Let’s solve something."
        lead="Whether you’re dealing with a project challenge, looking for expertise, or want to collaborate with BFC Talks, we’d like to hear from you."
        art="contact"
      />

      {/* --------------------------------------------------------- Options */}
      <Section tone="white" aria-label="Ways to contact BFC">
        <div className="grid grid-3">
          {CONTACT_OPTIONS.map((opt, i) => (
            <Reveal key={opt.id} delay={i * 90}>
              <article className={styles.option}>
                <span className={styles.optionIcon}>
                  <Icon name={opt.icon} size={24} />
                </span>
                <p className={styles.optionEyebrow}>{opt.eyebrow}</p>
                <h2 className={styles.optionTitle}>{opt.title}</h2>
                <p className={styles.optionText}>{opt.text}</p>
                <Button to={opt.cta.to} variant={i === 0 ? 'primary' : 'outline'} icon="arrowRight" className={styles.optionBtn}>
                  {opt.cta.label}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Form */}
      <Section tone="paper" pattern="grid" id="contact-form" aria-labelledby="contact-form-title">
        <div className="split split--wide-right">
          <div className="sticky-col">
            <Reveal>
              <p className="eyebrow">Send a message</p>
              <h2 id="contact-form-title" className="h2">
                Write to BFC.
              </h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Use this form for BFC Talks, network, partnership and general inquiries. For detailed project problems, the consulting inquiry form
                is the fastest route.
              </p>
              <ul className={styles.details} role="list">
                <Detail icon="mail" label="Email" value={email} href={`mailto:${email}`} />
                <Detail icon="phone" label="Phone" value={phone} href={`tel:${phone.replace(/[^\d+]/g, '')}`} />
                <Detail icon="mapPin" label="Location" value={location} />
                <Detail icon="clock" label="Hours" value={hours} />
              </ul>
              <ul className={styles.social} role="list">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <Icon name={s.icon} size={18} />
                      {s.label}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <ContactForm initialType={type} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
