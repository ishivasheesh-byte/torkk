"use client"

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Menu, X } from 'lucide-react'
import { appLinks } from '@/lib/app-links'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), phone: form.get('phone'), category: 'customer', consent: form.get('consent') === 'on' }) })
    const result = await response.json()
    if (response.ok) setSent(true)
    else setError(result.error || 'Please check your details and try again.')
  }

  return <main className="new-home">
    <nav className="new-nav"><a className="new-logo" href="/" aria-label="Torkk home">TORKK</a><div className={`new-nav-links ${menuOpen ? 'open' : ''}`}><a href="#why">Why Torkk</a><a href="#join">Join early access</a><a href="/drive">Drive with Torkk</a></div><a className="new-nav-cta" href="#join">Get early access <ArrowRight size={15}/></a><button className="new-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></nav>
    <section className="new-hero"><div className="new-hero-orb"/><div className="new-hero-copy"><p className="new-eyebrow">MOBILITY, MADE FAIR</p><h1>Move through your day with <em>more clarity.</em></h1><p className="new-lead">Torkk is building a safer, simpler mobility experience for riders and driver partners across Delhi NCR.</p><div className="new-actions"><a className="new-button primary" href="#join">Join early access <ArrowRight size={16}/></a><a className="new-button ghost" href="/drive">Become a driver partner</a></div></div><div className="new-hero-note"><span>01</span><p>Fair pricing<br/>Clear journeys<br/>Safer rides</p></div></section>
    <section id="why" className="new-section new-intro"><p className="new-eyebrow">THE TORKK POINT OF VIEW</p><h2>Mobility should work<br/><em>for everyone.</em></h2><p>We are creating the everyday ride platform we would want to use: transparent for riders, respectful to driver partners, and designed around real life.</p></section>
    <section className="new-section new-pillars"><article><span>01</span><h3>Fair by design</h3><p>Clear information before you move, with no unnecessary friction between you and your ride.</p></article><article><span>02</span><h3>Safety as standard</h3><p>Thoughtful product decisions that help people feel more in control from pickup to drop.</p></article><article><span>03</span><h3>Built locally</h3><p>Starting with Delhi NCR and the way its people actually move every day.</p></article></section>
    <section className="new-section new-paths"><div><p className="new-eyebrow">ONE PLATFORM, TWO PATHS</p><h2>Choose your<br/><em>next move.</em></h2></div><div className="new-path-grid"><a href="#join"><small>FOR RIDERS</small><h3>Get where you need to go.</h3><p>Join the early access list for a calmer, clearer way to ride.</p><ArrowRight size={20}/></a><a href="/drive"><small>FOR DRIVER PARTNERS</small><h3>Make every route count.</h3><p>Explore flexible earning opportunities with Torkk.</p><ArrowRight size={20}/></a></div></section>
    <section id="join" className="new-join"><div><p className="new-eyebrow">EARLY ACCESS</p><h2>Be part of the<br/><em>first journey.</em></h2><p>Tell us where you fit and we will keep you posted as Torkk opens up.</p></div>{sent ? <div className="new-success"><Check size={24}/><h3>You are on the list.</h3><p>We will be in touch when early access opens.</p></div> : <form onSubmit={submit}><input name="name" placeholder="Your name" required/><input name="email" type="email" placeholder="Email address (optional)"/><input name="phone" placeholder="Mobile number (optional)"/><label><input name="consent" type="checkbox" required/> I agree to receive Torkk updates.</label><button className="new-button primary" type="submit">Join early access <ArrowRight size={16}/></button>{error && <p className="new-error">{error}</p>}</form>}</section>
    <footer className="new-footer"><a className="new-logo" href="/" aria-label="Torkk home">TORKK</a><p>Moving people forward, fairly.</p><div><a href="/about">About</a><a href="/help">Help</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><small>© 2026 Torkk. A brand of BLACKORIGINX PRIVATE LIMITED.</small></footer>
  </main>
}
