import { useCallback, useMemo, useRef, useState } from 'react';

/**
 * Minimal form state + validation.
 * `validate(values)` returns an object of { fieldName: message }.
 * Errors are shown for a field once it has been blurred, or after a submit attempt.
 */
export default function useForm({ initialValues, validate, fieldOrder = [] }) {
  const initialRef = useRef(initialValues);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [result, setResult] = useState(null);

  const errors = useMemo(() => validate(values), [values, validate]);

  const visibleErrors = useMemo(() => {
    const out = {};
    for (const [key, message] of Object.entries(errors)) {
      if (submitAttempted || touched[key]) out[key] = message;
    }
    return out;
  }, [errors, touched, submitAttempted]);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialRef.current);
    setTouched({});
    setSubmitAttempted(false);
    setStatus('idle');
    setResult(null);
  }, []);

  const handleSubmit = useCallback(
    (onValid) => async (event) => {
      event.preventDefault();
      setSubmitAttempted(true);
      const form = event.currentTarget;
      const errorKeys = Object.keys(errors);

      if (errorKeys.length) {
        const ordered = fieldOrder.find((name) => errorKeys.includes(name)) ?? errorKeys[0];
        const field = form.elements.namedItem(ordered);
        const target = field && 'length' in field && !field.tagName ? field[0] : field;
        target?.focus?.();
        return;
      }

      setStatus('submitting');
      try {
        const res = await onValid(values);
        setResult(res ?? null);
        setStatus('success');
      } catch (err) {
        setResult({ error: err?.message || 'Something went wrong.' });
        setStatus('error');
      }
    },
    [errors, fieldOrder, values],
  );

  const fieldProps = useCallback(
    (name) => ({
      name,
      value: values[name] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: visibleErrors[name],
    }),
    [values, handleChange, handleBlur, visibleErrors],
  );

  return {
    values,
    errors: visibleErrors,
    submitAttempted,
    status,
    result,
    fieldProps,
    setFieldValue,
    handleSubmit,
    reset,
  };
}
