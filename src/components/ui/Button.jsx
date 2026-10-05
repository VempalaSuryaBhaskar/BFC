import { Link } from 'react-router-dom';
import Icon from './Icon';
import { classNames } from '../../lib/format';
import styles from './Button.module.css';

/**
 * Renders a router <Link> (`to`), an anchor (`href`) or a <button>.
 * External http(s) links open in a new tab automatically.
 *
 * variant: primary | dark | outline | light | ghost
 * size:    sm | md | lg
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  block = false,
  external,
  className,
  children,
  ...rest
}) {
  const cls = classNames(styles.button, styles[variant], styles[size], block && styles.block, className);
  const iconEl = icon ? <Icon name={icon} size={size === 'sm' ? 16 : 18} className={styles.icon} /> : null;

  const content = (
    <>
      {iconPosition === 'start' && iconEl}
      <span className={styles.label}>{children}</span>
      {iconPosition === 'end' && iconEl}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    return (
      <a href={href} className={cls} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
        {isExternal ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
