import { useEffect } from 'react';
import { SITE } from '../data/site';

function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page SEO: title, description, Open Graph / Twitter tags and canonical.
 * Pass the full page title. Canonical/og:url are only set when SITE.url is configured.
 */
export default function useDocumentMeta({ title, description, path = '', type = 'website', noindex = false }) {
  useEffect(() => {
    const fullTitle = title || SITE.defaultTitle;
    const desc = description || SITE.defaultDescription;
    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', type);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);

    const url = SITE.url ? `${SITE.url}${path}` : '';
    if (url) upsertMeta('property', 'og:url', url);
    upsertCanonical(url);
  }, [title, description, path, type, noindex]);
}
