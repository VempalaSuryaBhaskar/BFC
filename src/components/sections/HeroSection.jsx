import { useId } from 'react';
import PageArt from './PageArt';
import { classNames } from '../../lib/format';
import styles from './HeroSection.module.css';

/**
 * Dark hero used on every page.
 * variant: home (full-height, display type) | page
 * Pass `visual` for a custom illustration or `art` for one of the PageArt line drawings.
 */
export default function HeroSection({
  variant = 'page',
  eyebrow,
  title,
  lead,
  actions,
  visual,
  art,
  meta,
  children,
  className,
}) {
  const titleId = useId();
  const illustration = visual ?? (art ? <PageArt variant={art} /> : null);

  return (
    <section className={classNames(styles.hero, styles[variant], 'theme-dark', className)} aria-labelledby={titleId}>
      <div className={styles.backdrop} aria-hidden="true" />
      {illustration ? (
        <div className={styles.visual} aria-hidden="true">
          {illustration}
        </div>
      ) : null}

      <div className={classNames('container', styles.inner)}>
        <div className={styles.content}>
          {eyebrow ? <p className={classNames('eyebrow', styles.eyebrow, styles.enter)}>{eyebrow}</p> : null}
          <h1 id={titleId} className={classNames(styles.title, styles.enter)}>
            {title}
          </h1>
          {lead ? <p className={classNames(styles.lead, styles.enter)}>{lead}</p> : null}
          {actions ? <div className={classNames(styles.actions, styles.enter)}>{actions}</div> : null}
          {meta ? <div className={classNames(styles.meta, styles.enter)}>{meta}</div> : null}
        </div>
        {children ? <div className={classNames(styles.extra, styles.enter)}>{children}</div> : null}
      </div>
    </section>
  );
}
