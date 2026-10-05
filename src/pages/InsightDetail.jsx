import { Link, useParams } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import InsightCard from '../components/cards/InsightCard';
import CoverArt from '../components/media/CoverArt';
import NotFound from './NotFound';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { getInsightBySlug, getLatestInsights } from '../data/insights';
import { formatDate, slugify } from '../lib/format';
import styles from './InsightDetail.module.css';

const PLACEHOLDER_BODY = [
  { type: 'p', text: '[Article introduction — two or three paragraphs that set up the problem, why it matters and who it affects on a project.]' },
  { type: 'h2', text: '[Section heading]' },
  { type: 'p', text: '[Body copy — practical explanation drawn from real project experience. Keep paragraphs short and concrete.]' },
  { type: 'list', items: ['[Key point one]', '[Key point two]', '[Key point three]'] },
  { type: 'quote', text: '[Pull quote — a memorable line from the article or a BFC Talks guest.]' },
  { type: 'h2', text: '[Section heading]' },
  { type: 'p', text: '[Closing thoughts and practical next steps for readers facing a similar situation.]' },
];

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'quote':
      return (
        <blockquote>
          <p>{block.text}</p>
        </blockquote>
      );
    case 'list':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default function InsightDetail() {
  const { slug } = useParams();
  const article = getInsightBySlug(slug);

  useDocumentMeta({
    title: article ? `${article.title} | BFC Insights` : 'Article not found | BFC Insights',
    description: article?.excerpt,
    path: `/insights/${slug}`,
    type: 'article',
    noindex: !article,
  });

  if (!article) return <NotFound embedded />;

  const body = article.body ?? PLACEHOLDER_BODY;
  const related = getLatestInsights()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);

  return (
    <>
      <HeroSection
        eyebrow={article.category}
        title={article.title}
        lead={article.excerpt}
        meta={
          <p className={styles.byline}>
            <span className={styles.avatar} aria-hidden="true" />
            <span>
              <strong>{article.author}</strong>
              <span>
                {article.authorRole} · <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readTime}
              </span>
            </span>
          </p>
        }
        className={styles.hero}
      />

      <Section tone="white" narrow aria-label="Article">
        <Reveal className={styles.cover}>
          <CoverArt art={article.art} image={article.image} label={article.category} />
        </Reveal>

        <article className={`prose ${styles.body}`}>
          {!article.body ? (
            <p className="placeholder-note">
              <Icon name="info" size={18} />
              Placeholder article structure. Add the final text as `body` blocks in src/data/insights.js.
            </p>
          ) : null}
          <p className={styles.lede}>{article.excerpt}</p>
          {body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        <div className={styles.footer}>
          <Link to={`/insights?category=${slugify(article.category)}`} className={styles.tag}>
            More in {article.category}
          </Link>
          <Button to="/insights" variant="ghost" icon="arrowRight">
            All insights
          </Button>
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="related-title">
        <SectionHeading id="related-title" eyebrow="Keep reading" title="Related insights." layout="split" />
        <div className="grid grid-3">
          {related.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <InsightCard article={a} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
