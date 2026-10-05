import { classNames } from '../../lib/format';

/**
 * Page section with a themed background.
 * tone: white | paper | dark | black   (dark/black switch to the dark theme)
 * pattern: grid | grid-right | glow    (subtle decorative background)
 */
export default function Section({
  as: Tag = 'section',
  tone = 'white',
  pattern,
  narrow = false,
  tight = false,
  ruled = false,
  className,
  containerClassName,
  children,
  ...rest
}) {
  const theme = tone === 'dark' || tone === 'black' ? 'theme-dark' : 'theme-light';
  return (
    <Tag
      className={classNames(
        'section',
        `section--${tone}`,
        theme,
        tight && 'section--tight',
        ruled && 'section--ruled',
        className,
      )}
      {...rest}
    >
      {pattern ? <div className={`pattern pattern--${pattern}`} aria-hidden="true" /> : null}
      <div className={classNames('container', narrow && 'container--narrow', containerClassName)}>{children}</div>
    </Tag>
  );
}
