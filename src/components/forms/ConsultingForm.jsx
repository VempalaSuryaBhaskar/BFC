import { useId } from 'react';
import Icon from '../ui/Icon';
import { ChoiceGroup, Honeypot, SelectField, TextField } from './FormFields';
import { FormSuccess, SubmitButton } from './FormStatus';
import useForm from '../../hooks/useForm';
import { FORM_OPTIONS } from '../../data/consulting';
import { EMAIL_PATTERN, isValidPhone, submitForm } from '../../lib/forms';
import styles from './Form.module.css';

const INITIAL = {
  name: '',
  company: '',
  email: '',
  phone: '',
  role: '',
  projectType: '',
  location: '',
  stage: '',
  problemCategory: '',
  description: '',
  contactMethod: 'Email',
  website: '', // honeypot
};

const FIELD_ORDER = ['name', 'email', 'phone', 'role', 'problemCategory', 'description', 'contactMethod'];
const DESCRIPTION_MAX = 2000;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';

  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(v.email.trim())) e.email = 'Please enter a valid email address.';

  const needsPhone = v.contactMethod === 'Phone' || v.contactMethod === 'WhatsApp';
  if (needsPhone && !v.phone.trim()) e.phone = `Please add a phone number so we can reach you by ${v.contactMethod}.`;
  else if (v.phone.trim() && !isValidPhone(v.phone)) e.phone = 'Please enter a valid phone number.';

  if (!v.role) e.role = 'Please select your role.';
  if (!v.problemCategory) e.problemCategory = 'Please choose the category closest to your problem.';

  const desc = v.description.trim();
  if (!desc) e.description = 'Please describe the problem you are facing.';
  else if (desc.length < 30) e.description = 'Please add a little more detail (at least 30 characters).';

  if (!v.contactMethod) e.contactMethod = 'Please choose how you would like us to contact you.';
  return e;
}

export default function ConsultingForm() {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const { values, errors, submitAttempted, status, result, fieldProps, handleSubmit, reset } = useForm({
    initialValues: INITIAL,
    validate,
    fieldOrder: FIELD_ORDER,
  });

  const onValid = async (data) => {
    if (data.website) return { mock: true }; // bot — silently drop
    const { website, ...payload } = data;
    return submitForm('consulting', { ...payload, submittedAt: new Date().toISOString() });
  };

  if (status === 'success') {
    const firstName = values.name.trim().split(/\s+/)[0];
    return (
      <div className={styles.form}>
        <FormSuccess
          title={`Thank you, ${firstName}.`}
          message={
            result?.mock
              ? 'Your problem summary is complete and ready to send.'
              : `Your inquiry has been received. Someone from BFC will review it and get back to you by ${values.contactMethod.toLowerCase()}.`
          }
          summary={[
            ['Category', values.problemCategory],
            ['Project stage', values.stage],
            ['Contact via', values.contactMethod],
          ]}
          mock={result?.mock}
          onReset={reset}
          resetLabel="Submit another problem"
        />
      </div>
    );
  }

  const submitting = status === 'submitting';
  const descProps = fieldProps('description');

  return (
    <form className={styles.form} onSubmit={handleSubmit(onValid)} noValidate aria-describedby={`${uid}-required`}>
      <fieldset className={styles.group}>
        <legend className={styles.groupTitle}>
          <span className={styles.groupNumber}>01</span> About you
        </legend>
        <div className={styles.grid}>
          <TextField id={id('name')} label="Name" required autoComplete="name" {...fieldProps('name')} />
          <TextField id={id('company')} label="Company" optional autoComplete="organization" {...fieldProps('company')} />
          <TextField id={id('email')} label="Email" type="email" required autoComplete="email" inputMode="email" {...fieldProps('email')} />
          <TextField
            id={id('phone')}
            label="Phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            hint={values.contactMethod === 'Email' ? 'Optional unless you prefer phone or WhatsApp.' : undefined}
            required={values.contactMethod !== 'Email'}
            {...fieldProps('phone')}
          />
          <SelectField id={id('role')} label="Your role" required options={FORM_OPTIONS.roles} full {...fieldProps('role')} />
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupTitle}>
          <span className={styles.groupNumber}>02</span> Your project
        </legend>
        <div className={styles.grid}>
          <SelectField id={id('projectType')} label="Project type" optional options={FORM_OPTIONS.projectTypes} {...fieldProps('projectType')} />
          <TextField id={id('location')} label="Location" optional placeholder="City / region" autoComplete="address-level2" {...fieldProps('location')} />
          <SelectField id={id('stage')} label="Approximate project stage" optional options={FORM_OPTIONS.stages} full {...fieldProps('stage')} />
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupTitle}>
          <span className={styles.groupNumber}>03</span> The problem
        </legend>
        <div className={styles.grid}>
          <SelectField
            id={id('problemCategory')}
            label="Problem category"
            required
            options={FORM_OPTIONS.problemCategories}
            full
            {...fieldProps('problemCategory')}
          />
          <TextField
            id={id('description')}
            as="textarea"
            label="Problem description"
            required
            full
            maxLength={DESCRIPTION_MAX}
            showCount
            placeholder="What is happening, what has been tried so far, and what would a good outcome look like?"
            hint={descProps.error ? undefined : 'Share as much or as little as you are comfortable with. Avoid confidential commercial figures at this stage.'}
            {...descProps}
          />
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupTitle}>
          <span className={styles.groupNumber}>04</span> How should we reach you?
        </legend>
        <div className={styles.grid}>
          <ChoiceGroup
            id={id('contactMethod')}
            label="Preferred contact method"
            required
            full
            options={FORM_OPTIONS.contactMethods}
            {...fieldProps('contactMethod')}
          />
        </div>
      </fieldset>

      <Honeypot value={values.website} onChange={fieldProps('website').onChange} />

      <div className={styles.footer}>
        <p className={styles.privacy}>
          <Icon name="shield" size={20} />
          Your information will be treated confidentially and used only to understand your requirement and respond to your inquiry.
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
          <p id={`${uid}-required`} className={styles.requiredNote}>
            Fields marked <span className={styles.req}>*</span> are required.
          </p>
          <SubmitButton submitting={submitting}>Submit Problem</SubmitButton>
        </div>
      </div>
    </form>
  );
}
