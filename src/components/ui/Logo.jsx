import { classNames } from '../../lib/format';
import styles from './Logo.module.css';

/**
 * BFC logo: a braced structural frame (mark) + wordmark.
 * TODO: swap for BFC's final logo when available — keep the component API.
 */
export function LogoMark({ className }) {
  return (
    <svg className={classNames(styles.mark, className)} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M2 16h28" stroke="currentColor" strokeWidth="3" />
      <path d="M4.5 28.2 27.5 17.8" stroke="var(--c-orange-500)" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}

export default function Logo({ className, size = 'md' }) {
  return (
    <span className={classNames(styles.logo, styles[size], className)}>
      <LogoMark />
      <span className={styles.word}>BFC</span>
    </span>
  );
}
