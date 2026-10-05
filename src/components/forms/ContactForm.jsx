import { useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import { Honeypot, SelectField, TextField } from './FormFields';
import { FormSuccess, SubmitButton } from './FormStatus';
import useForm from '../../hooks/useForm';
import { INQUIRY_TYPES } from '../../data/contact';
import { INQUIRY_PATH } from '../../data/site';
import { EMAIL_PATTERN, isValidPhone, submitForm } from '../../lib/forms';
import styles from './Form.module.css';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  inquiryType: '',
  message: '',
  website: '',
};

const FIELD_ORDER = ['name', 'email', 'phone', 'inquiryType', 'message'];
const MESSAGE_MAX = 1500;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !isValidPhone(v.phone)) e.phone = 'Please enter a valid phone number.';
  if (!v.inquiryType) e.inquiryType = 'Please choose what your message is about.';
  const msg = v.message.trim();
  if (!msg) e.message = 'Please enter a message.';
  else if (msg.length < 20) e.message = 'Please add a little more detail (at least 20 characters).';
  return e;
}

/** General contact form. `initialType` pre-selects the inquiry type (e.g. from ?type=talks-guest). */
export default function ContactForm({ initialType }) {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const { values, errors, submitAttempted, status, result, fieldProps, setFieldValue, handleSubmit, reset } = useForm({
    initialValues: INITIAL,
    validate,
    fieldOrder: FIELD_ORDER,
  });

  useEffect(() => {
    if (initialType && INQUIRY_TYPES.some((t) => t.value === initialType)) {
      setFieldValue('inquiryType', initialType);
    }
  }, [initialType, setFieldValue]);

  const onValid = async (data) => {
    if (data.website) return { mock: true };
    const { website, ...payload } = data;
    return submitForm('contact', { ...payload, submittedAt: new Date().toISOString() });
  };

  if (status === 'success') {
    const firstName = values.name.trim().split(/\s+/)[0];
    const typeLabel = INQUIRY_TYPES.find((t) => t.value === values.inquiryType)?.label;
    return (
      <div className={styles.form}>
        <FormSuccess
          title={`Thank you, ${firstName}.`}
          message={result?.mock ? 'Your message is complete and ready to send.' : 'Your message has been received. We will get back to you by email.'}
          summary={[['Regarding', typeLabel]]}
          mock={result?.mock}
          onReset={reset}
          resetLabel="Send another message"
        />
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onValid)} noValidate>
      <div className={styles.grid}>
        <TextField id={id('name')} label="Name" required autoComplete="name" {...fieldProps('name')} />
        <TextField id={id('email')} label="Email" type="email" required autoComplete="email" inputMode="email" {...fieldProps('email')} />
        <TextField id={id('phone')} label="Phone" optional type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
        <TextField id={id('organization')} label="Organization" optional autoComplete="organization" {...fieldProps('organization')} />
        <SelectField id={id('inquiryType')} label="What is this about?" required full options={INQUIRY_TYPES} {...fieldProps('inquiryType')} />
        {values.inquiryType === 'consulting' ? (
          <p className={`${styles.full} ${styles.hint}`}>
            For project problems, the <Link to={INQUIRY_PATH} style={{ textDecoration: 'underline' }}>consulting inquiry form</Link> captures the
            details we need to help faster.
          </p>
        ) : null}
        <TextField
          id={id('message')}
          as="textarea"
          label="Message"
          required
          full
          rows={6}
          maxLength={MESSAGE_MAX}
          showCount
          placeholder={
            values.inquiryType?.startsWith('talks')
              ? 'Tell us about yourself or the guest you would like to suggest, and the conversation you have in mind.'
              : 'How can we help?'
          }
          {...fieldProps('message')}
        />
      </div>

      <Honeypot value={values.website} onChange={fieldProps('website').onChange} />

      <div className={styles.footer}>
        <p className={styles.privacy}>
          <Icon name="shield" size={20} />
          Your information will be treated confidentially and used only to respond to your inquiry.
        </p>
        {status === 'error' && result?.error ? (
          <p className={styles.formError} role="alert">
            {result.error}
          </p>
        ) : null}
        {submitAttempted && Object.keys(errors).length > 0 ? (
          <p className={styles.formError} role="alert">
            Please check the highlighted fields.
          </p>
        ) : null}
        <div className={styles.submitRow}>
          <p className={styles.requiredNote}>
            Fields marked <span className={styles.req}>*</span> are required.
          </p>
          <SubmitButton submitting={status === 'submitting'}>Send Message</SubmitButton>
        </div>
      </div>
    </form>
  );
}
