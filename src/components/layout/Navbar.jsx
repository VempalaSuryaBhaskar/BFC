import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import useScrolled from '../../hooks/useScrolled';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { INQUIRY_PATH, NAV_LINKS, SITE, SOCIAL_LINKS } from '../../data/site';
import { classNames, isPlaceholder } from '../../lib/format';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const { pathname, hash } = useLocation();

  useLockBodyScroll(open);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  // Esc closes; resizing to desktop closes
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mql = window.matchMedia('(min-width: 1081px)');
    const onChange = (e) => e.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mql.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onChange);
    };
  }, [open]);

  return (
    <>
      <header className={classNames(styles.header, 'theme-dark', (scrolled || open) && styles.solid)}>
        <div className={classNames('container', styles.inner)}>
          <Link to="/" className={styles.brand} aria-label="BFC — home">
            <Logo />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.links} role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => classNames(styles.link, isActive && styles.active)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button to={INQUIRY_PATH} size="sm" className={styles.cta}>
              Talk to BFC
            </Button>
            <button
              type="button"
              className={classNames(styles.toggle, open && styles.toggleOpen)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={classNames(styles.mobile, 'theme-dark', open && styles.mobileOpen)} aria-hidden={!open}>
        <nav className={classNames('container', styles.mobileInner)} aria-label="Mobile">
          <ul className={styles.mobileLinks} role="list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.to} style={{ '--i': i }}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) => classNames(styles.mobileLink, isActive && styles.mobileActive)}
                >
                  <span className={styles.mobileIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.mobileFooter}>
            <Button to={INQUIRY_PATH} block size="lg" icon="arrowRight" tabIndex={open ? 0 : -1}>
              Talk to BFC
            </Button>
            <div className={styles.mobileMeta}>
              {!isPlaceholder(SITE.contact.email) ? (
                <a href={`mailto:${SITE.contact.email}`} tabIndex={open ? 0 : -1}>
                  {SITE.contact.email}
                </a>
              ) : (
                <span>{SITE.contact.email}</span>
              )}
              <div className={styles.mobileSocial}>
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`BFC on ${s.label} (opens in a new tab)`}
                    tabIndex={open ? 0 : -1}
                  >
                    <Icon name={s.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
