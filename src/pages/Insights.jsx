import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import CTASection from '../components/sections/CTASection';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import FilterBar from '../components/ui/FilterBar';
import InsightCard from '../components/cards/InsightCard';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { INSIGHT_CATEGORIES, getLatestInsights } from '../data/insights';
import { slugify } from '../lib/format';
import styles from './Insights.module.css';

const FILTER_OPTIONS = INSIGHT_CATEGORIES.map((c) => ({ value: slugify(c), label: c }));

export default function Insights() {
  useDocumentMeta({
    title: 'BFC Insights | Construction, Infrastructure & Project Management Perspectives',
    description:
      'Practical perspectives on construction trends, project management, infrastructure, contracts, procurement, technology and leadership from BFC.',
    path: '/insights',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? 'all';
  // The search box keeps local state (URL updates are async and would drop keystrokes);
  // the query is mirrored into ?q= so filtered views stay shareable.
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const deferredQuery = useDeferredValue(query);

  const updateParam = (key, value, emptyValue = '') => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === emptyValue) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  useEffect(() => {
    const trimmed = deferredQuery.trim();
    if ((searchParams.get('q') ?? '') === trimmed) return;
    const next = new URLSearchParams(searchParams);
    if (trimmed) next.set('q', trimmed);
    else next.delete('q');
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }, [deferredQuery, searchParams, setSearchParams]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return getLatestInsights().filter((a) => {
      if (category !== 'all' && slugify(a.category) !== category) return false;
      if (!q) return true;
      return [a.title, a.excerpt, a.category, a.author].some((field) => field.toLowerCase().includes(q));
    });
  }, [category, deferredQuery]);

  const isFiltered = category !== 'all' || query.trim() !== '';
  const featured = !isFiltered ? (results.find((a) => a.featured) ?? results[0]) : null;
  const rest = featured ? results.filter((a) => a !== featured) : results;

  const clearAll = () => {
    setQuery('');
    setSearchParams(new URLSearchParams(), { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <HeroSection
        eyebrow="Insights"
        title="BFC Insights"
        lead="Practical perspectives on construction, infrastructure, project delivery and the people behind them."
        art="insights"
      />

      <Section tone="white" aria-label="Articles" className={styles.list}>
        <FilterBar
          label="Filter insights by category"
          options={FILTER_OPTIONS}
          value={category}
          onChange={(value) => updateParam('category', value, 'all')}
          search={query}
          onSearch={setQuery}
          searchPlaceholder="Search insights"
          resultCount={results.length}
          resultNoun="article"
        />

        {featured ? (
          <Reveal className={styles.featured}>
            <InsightCard article={featured} variant="featured" headingLevel={2} />
          </Reveal>
        ) : null}

        {rest.length ? (
          <div className="grid grid-3">
            {rest.map((article) => (
              <InsightCard key={article.slug} article={article} headingLevel={featured ? 3 : 2} />
            ))}
          </div>
        ) : null}

        {!results.length ? (
          <div className="empty-state">
            <Icon name="search" size={28} />
            <p>No insights match your search. Try a different keyword or category.</p>
            <Button variant="outline" onClick={clearAll}>
              Clear filters
            </Button>
          </div>
        ) : null}
      </Section>

      <CTASection
        eyebrow="Contribute"
        title="Have a perspective worth sharing?"
        text="Suggest a topic you would like BFC to cover, or share your own experience from the field."
        primary={{ label: 'Get in touch', to: '/contact?type=general#contact-form' }}
        secondary={{ label: 'Watch BFC Talks', to: '/talks' }}
      />
    </>
  );
}
