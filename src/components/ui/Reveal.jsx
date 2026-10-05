import useInView from '../../hooks/useInView';
import { classNames } from '../../lib/format';

/** Fades + slides its children in once they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={classNames('reveal', inView && 'is-visible', className)}
      style={delay ? { '--reveal-delay': `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
