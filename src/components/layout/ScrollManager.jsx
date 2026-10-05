import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on page change, or to the #hash target when present.
 * Retries briefly so anchors inside lazy-loaded pages are found.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    let timer;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: samePage ? 'smooth' : 'auto', block: 'start' });
        } else if (attempts < 30) {
          attempts += 1;
          timer = setTimeout(attempt, 50);
        }
      };
      attempt();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
