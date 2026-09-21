'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SiteShell } from '@/components/site-pages'

const categories = ['Customer Support', 'Driver', 'Partnership', 'Business / Corporate', 'Feedback', 'General']

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const phone = String(data.phone ?? '').replace(/[\s()-]/g, '')
    const email = String(data.email ?? '').trim()

    if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      setStatus('error')
      setErrorMessage('Please enter a valid mobile number.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, phone }),
      })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again or contact our support team.')
    }
  }

  return <SiteShell>
    <PageHero eyebrow="Contact Torkk" title={<>Let&apos;s<br/><em>talk.</em></>} copy="Whether you are a rider, driver partner or business, we would love to hear from you." />
    <section className="inner-section"><div className="container contact-route-grid">
      <div><a className="email-link" href="mailto:support@torkk.in">support@torkk.in <ArrowUpRight size={16}/></a></div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="form-grid">
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Mobile number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label>
          <label>Enquiry type<select name="subject" defaultValue="General Enquiry">{categories.map(category => <option key={category}>{category}</option>)}</select></label>
        </div>
        <label>Message<textarea name="message" rows={6} required /></label>
        <input className="honeypot" name="company" tabIndex={-1} autoComplete="off" />
        <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send Enquiry'} <ArrowUpRight size={16}/></button>
        {status === 'success' && <p className="form-success" role="status">Thank you! Your enquiry has been submitted successfully. Our team will get back to you shortly.</p>}
        {status === 'error' && <p className="form-error" role="alert">{errorMessage}</p>}
      </form>
    </div></section>
  </SiteShell>
}
