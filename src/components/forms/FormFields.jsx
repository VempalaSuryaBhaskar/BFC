import { classNames } from '../../lib/format';
import styles from './Form.module.css';

function describedBy(id, error, hint) {
  return [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;
}

export function Field({ id, label, required, optional, hint, error, full, children, counter }) {
  return (
    <div className={classNames(styles.field, full && styles.full, error && styles.invalid)}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required ? (
            <span className={styles.req} aria-hidden="true">
              *
            </span>
          ) : null}
          {optional ? <span className={styles.optional}>Optional</span> : null}
        </label>
        {counter}
      </div>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({ id, label, required, optional, hint, error, full, as = 'input', rows = 6, maxLength, showCount, value, ...rest }) {
  const Tag = as;
  return (
    <Field
      id={id}
      label={label}
      required={required}
      optional={optional}
      hint={hint}
      error={error}
      full={full}
      counter={
        showCount && maxLength ? (
          <span className={styles.counter} aria-hidden="true">
            {value.length}/{maxLength}
          </span>
        ) : null
      }
    >
      <Tag
        id={id}
        className={classNames(styles.control, as === 'textarea' && styles.textarea)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        aria-required={required || undefined}
        rows={as === 'textarea' ? rows : undefined}
        maxLength={maxLength}
        value={value}
        {...rest}
      />
    </Field>
  );
}

export function SelectField({ id, label, required, optional, hint, error, full, options, placeholder = 'Select…', ...rest }) {
  return (
    <Field id={id} label={label} required={required} optional={optional} hint={hint} error={error} full={full}>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={classNames(styles.control, styles.select)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          aria-required={required || undefined}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
        <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Field>
  );
}

/** Segmented radio group. */
export function ChoiceGroup({ id, label, name, options, value, onChange, onBlur, error, required, full }) {
  return (
    <fieldset
      className={classNames(styles.field, styles.choiceField, full && styles.full, error && styles.invalid)}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <legend className={styles.label}>
        {label}
        {required ? (
          <span className={styles.req} aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      <div className={styles.choices}>
        {options.map((opt) => (
          <label key={opt} className={classNames(styles.choice, value === opt && styles.choiceActive)}>
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} onBlur={onBlur} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Hidden honeypot field to deter simple spam bots. */
export function Honeypot({ value, onChange }) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
