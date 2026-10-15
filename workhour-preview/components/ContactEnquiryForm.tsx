'use client'

import { FormEvent, useState } from 'react'
import { enquiryOptions } from '../data/contact-options'
import styles from './ContactEnquiryForm.module.css'

type FieldName = 'email' | 'company' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>

export default function ContactEnquiryForm() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = form.elements.namedItem('email') as HTMLInputElement
    const company = form.elements.namedItem('company') as HTMLInputElement
    const message = form.elements.namedItem('message') as HTMLTextAreaElement
    const nextErrors: FieldErrors = {}

    if (!email.value.trim()) nextErrors.email = 'Enter your email address.'
    else if (!email.validity.valid) nextErrors.email = 'Enter a valid email address.'
    if (!company.value.trim()) nextErrors.company = 'Enter your company name.'
    if (!message.value.trim()) nextErrors.message = 'Enter a message.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Review the highlighted fields and try again.')
      window.setTimeout(() => {
        const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]')
        firstInvalid?.focus({ preventScroll: true })
        firstInvalid?.closest(`.${styles.field}`)?.querySelector('label')?.scrollIntoView({ block: 'center', behavior: 'instant' })
      }, 0)
      return
    }

    setStatus('Your details pass the form checks, but enquiry submission is not available yet. Your message has not been sent.')
  }

  function clearError(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus('')
  }

  return <form className={styles.form} noValidate onSubmit={handleSubmit}>
    <p className={styles.requiredNote}><span aria-hidden="true">*</span> Required fields</p>
    <div className={styles.field}>
      <label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label>
      <input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} onChange={() => clearError('email')} />
      {errors.email && <span className={styles.error} id="contact-email-error">{errors.email}</span>}
    </div>
    <div className={styles.field}>
      <label htmlFor="contact-company">Company Name <span aria-hidden="true">*</span></label>
      <input id="contact-company" name="company" type="text" autoComplete="organization" required aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'contact-company-error' : undefined} onChange={() => clearError('company')} />
      {errors.company && <span className={styles.error} id="contact-company-error">{errors.company}</span>}
    </div>
    {enquiryOptions.length > 0 && <div className={styles.field}>
      <label htmlFor="contact-enquiry-type">Enquiry type <span className="optional-label">Optional</span></label>
      <select id="contact-enquiry-type" name="enquiryType"><option value="">Choose an enquiry type</option>{enquiryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
    </div>}
    <div className={`${styles.field} ${styles.messageField}`}>
      <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
      <textarea id="contact-message" name="message" rows={6} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} onChange={() => clearError('message')} />
      {errors.message && <span className={styles.error} id="contact-message-error">{errors.message}</span>}
    </div>
    <p className={styles.unavailable}>Enquiry submission is currently unavailable. This form checks your details locally; it does not send or store your message.</p>
    <button className="button button-dark" type="submit">Review enquiry <span aria-hidden="true">↗</span></button>
    <p className={styles.status} role="status" aria-live="polite">{status}</p>
  </form>
}
