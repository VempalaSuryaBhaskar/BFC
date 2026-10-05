import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import styles from './Form.module.css';

/** Success panel shared by the inquiry and contact forms. */
export function FormSuccess({ title, message, summary = [], mock, onReset, resetLabel }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div ref={ref} className={styles.success} role="status" tabIndex={-1}>
      <span className={styles.successIcon}>
        <Icon name="check" size={26} strokeWidth={2} />
      </span>
      <h3 className={styles.successTitle}>{title}</h3>
      <p className={styles.successText}>{message}</p>

      {summary.length ? (
        <dl className={styles.summary}>
          {summary.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value || '—'}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {mock ? (
        <p className={styles.demoNote}>
          <Icon name="info" size={18} />
          <span>
            Demo mode: this form is not yet connected to a backend, so no information was sent. Connect it in{' '}
            <code>src/lib/forms.js</code>.
          </span>
        </p>
      ) : null}

      <Button variant="outline" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}

export function SubmitButton({ submitting, children }) {
  return (
    <Button type="submit" size="lg" icon={submitting ? undefined : 'arrowRight'} disabled={submitting} aria-disabled={submitting}>
      {submitting ? (
        <>
          <span className={styles.spinner} aria-hidden="true" style={{ display: 'inline-block', marginRight: 10, verticalAlign: '-2px' }} />
          Submitting…
        </>
      ) : (
        children
      )}
    </Button>
  );
}
