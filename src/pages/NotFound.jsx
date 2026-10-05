import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { NAV_LINKS } from '../data/site';
import styles from './NotFound.module.css';

/** 404 page. `embedded` is used when a detail page cannot find its record. */
export default function NotFound({ embedded = false }) {
  useDocumentMeta({
    title: 'Page not found | BFC',
    description: 'The page you were looking for could not be found.',
    noindex: true,
  });

  return (
    <HeroSection
      eyebrow="Error 404"
      title="This page isn’t on the drawings."
      lead={
        embedded
          ? 'We could not find what you were looking for. It may have moved, or the link may be out of date.'
          : 'The page you are looking for does not exist or may have moved. Here are a few places to start instead.'
      }
      actions={
        <>
          <Button to="/" size="lg" icon="arrowRight">
            Back to home
          </Button>
          <Button to="/contact" size="lg" variant="outline">
            Contact BFC
          </Button>
        </>
      }
      art="grid"
      className={styles.hero}
    >
      <ul className={styles.links} role="list">
        {NAV_LINKS.filter((l) => l.to !== '/').map((link) => (
          <li key={link.to}>
            <Link to={link.to}>
              {link.label}
              <Icon name="arrowUpRight" size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </HeroSection>
  );
}
