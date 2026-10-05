import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import CoverArt from '../media/CoverArt';
import { classNames, formatDate } from '../../lib/format';
import styles from './InsightCard.module.css';

/** Article card. variant: default | featured (horizontal, larger). */
export default function InsightCard({ article, variant = 'default', headingLevel = 3 }) {
  const href = `/insights/${article.slug}`;
  const Heading = `h${headingLevel}`;

  return (
    <article className={classNames(styles.card, styles[variant])}>
      <Link to={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <CoverArt art={article.art} image={article.image} label={article.category} />
      </Link>
      <div className={styles.body}>
        <p className={styles.category}>{article.category}</p>
        <Heading className={styles.title}>
          <Link to={href}>{article.title}</Link>
        </Heading>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.footer}>
          <p className={styles.byline}>
            <span className={styles.author}>{article.author}</span>
            <span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.readTime ? ` · ${article.readTime}` : ''}
            </span>
          </p>
          <Link to={href} className={styles.more}>
            Read More
            <span className="visually-hidden">: {article.title}</span>
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
