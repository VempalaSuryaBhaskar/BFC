import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { FOOTER_LINKS, INQUIRY_PATH, SITE, SOCIAL_LINKS } from '../../data/site';
import { isPlaceholder } from '../../lib/format';
import styles from './Footer.module.css';

function ContactLine({ icon, value, href }) {
  return (
    <li className={styles.contactLine}>
      <Icon name={icon} size={18} />
      {href && !isPlaceholder(value) ? <a href={href}>{value}</a> : <span>{value}</span>}
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, location } = SITE.contact;

  return (
    <footer className={`${styles.footer} theme-dark`}>
      <div className="container">
        <div className={styles.top}>
          <p className={styles.statement}>
            Construction problems, industry connections and conversations that move projects forward.
          </p>
          <Button to={INQUIRY_PATH} icon="arrowRight" size="lg">
            Talk to BFC
          </Button>
        </div>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to="/" aria-label="BFC — home" className={styles.logo}>
              <Logo />
            </Link>
            <p className={styles.desc}>{SITE.tagline}</p>
            <ul className={styles.social} role="list">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`BFC on ${s.label} (opens in a new tab)`}>
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className={styles.col}>
            <h2 className={styles.heading}>Navigation</h2>
            <ul role="list" className={styles.list}>
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.heading}>Get in touch</h2>
            <ul role="list" className={styles.list}>
              <ContactLine icon="mail" value={email} href={`mailto:${email}`} />
              <ContactLine icon="phone" value={phone} href={`tel:${phone.replace(/[^\d+]/g, '')}`} />
              <ContactLine icon="mapPin" value={location} />
            </ul>
          </div>

          <div className={styles.col}>
            <h2 className={styles.heading}>Follow</h2>
            <ul role="list" className={styles.list}>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.extLink}>
                    {s.label}
                    <Icon name="arrowUpRight" size={14} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} BFC. All rights reserved.</p>
          <ul role="list" className={styles.legal}>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        BFC
      </div>
    </footer>
  );
}
