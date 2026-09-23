'use client'

import { useState } from 'react'
import { ArrowUpRight, Bike, Car, Check, MapPin, Package, ShieldCheck, Users, Zap } from 'lucide-react'
import { appLinks, Button, Footer, Navbar } from '../components/site-pages'
import { TorkkChat } from '../components/torkk-chat'

const rides = [
  ['Bike', 'Fast, light city trips.', Bike, '/ride/bike'],
  ['Auto', 'Everyday movement, made simple.', MapPin, '/ride/auto'],
  ['Cab', 'Comfort when you need it.', Car, '/ride/cab'],
  ['EV Cab', 'A quieter way to move.', Zap, '/ride/ev-cab'],
  ['XL Cab', 'More room for people and plans.', Users, '/ride/xl-cab'],
] as const

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    const form = event.currentTarget
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      if (!response.ok) throw new Error()
      form.reset()
      setStatus('success')
    } catch { setStatus('error') }
  }
  return <form className="mono-form" onSubmit={submit}><div className="mono-form-grid"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Phone<input name="phone" required placeholder="Your phone number" /></label><label>Enquiry type<select name="subject" defaultValue="General"><option>Customer Support</option><option>Driver</option><option>Partnership</option><option>Business / Corporate</option><option>Feedback</option><option>General</option></select></label></div><label>Message<textarea name="message" required rows={5} placeholder="How can we help?" /></label><button className="mono-button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending...' : 'Send enquiry'} <ArrowUpRight size={16} /></button>{status === 'success' && <p className="mono-success">Thanks. Your enquiry has been received.</p>}{status === 'error' && <p className="mono-error">Something went wrong. Please try again.</p>}</form>
}

export default function Page() {
  return <><Navbar /><main className="mono-home">
    <section className="mono-hero"><div className="mono-container mono-hero-grid"><div><span className="mono-kicker">TORKK · MOBILITY PLATFORM</span><p className="mono-brand-line">Torkk is building fairer mobility for Delhi NCR.</p><h1>Fairer rides.<br />Safer journeys.</h1><p>A simpler way to move across Delhi NCR.</p><div className="mono-actions"><Button href="#rides">Ride with Torkk</Button><Button href="/drive" secondary>Drive with Torkk</Button></div></div><div className="mono-map" aria-label="Minimal Delhi NCR mobility map"><span className="mono-map-line line-one" /><span className="mono-map-line line-two" /><span className="mono-map-dot dot-delhi">Delhi</span><span className="mono-map-dot dot-gurugram">Gurugram</span><span className="mono-map-dot dot-noida">Noida</span><span className="mono-map-caption"><MapPin size={14} /> Built for Delhi NCR</span></div></div></section>
    <section className="mono-section mono-light"><div className="mono-container mono-split"><span className="mono-index">01</span><div><span className="mono-kicker">OUR VISION</span><h2>We&apos;re building more than a ride.</h2><p className="mono-large-copy">A mobility platform designed around riders, drivers and the cities they move through.</p><div className="mono-feature"><span className="mono-kicker">WHAT IS TORKK BUILDING?</span><h3>A connected mobility platform.</h3><p>Torkk is building one connected mobility platform for everyday movement: reliable rides for passengers, transparent tools for driver partners, safety technology that supports every trip and local logistics that help cities move. The goal is simple — make mobility fairer, clearer and more useful for everyone.</p></div></div></div></section>
    <section id="rides" className="mono-section"><div className="mono-container"><div className="mono-heading"><span className="mono-index">02</span><div><span className="mono-kicker">CHOOSE HOW YOU MOVE</span><h2>Your city.<br />Your way.</h2><p>Explore each service before opening the Torkk app.</p></div></div><div className="mono-rides">{rides.map(([name, copy, Icon, href]) => <a className="mono-ride" href={href} key={name}><span className="mono-ride-icon"><Icon size={19} /></span><strong>{name}</strong><span>{copy}</span><small>Explore service</small><ArrowUpRight size={17} /></a>)}</div></div></section>
    <section id="safety" className="mono-section mono-dark"><div className="mono-container mono-split"><span className="mono-index">03</span><div><span className="mono-kicker">SAFETY, BUILT IN</span><h2>Safety is the foundation.</h2><p className="mono-large-copy">Every journey should feel informed, supported and in your control. Torkk builds safety into the ride experience from booking through support.</p><a className="mono-inline-link" href="/safety">Explore Torkk safety <ArrowUpRight size={16} /></a></div></div></section>
    <section className="mono-ride-cta"><div className="mono-container mono-ride-cta-inner"><div><span className="mono-kicker">FOR RIDERS</span><h2>Ride with Torkk.</h2><p>A clearer way to move across Delhi NCR, with the right ride for every everyday journey.</p></div><Button href="/ride">Explore rides <ArrowUpRight size={16} /></Button></div></section><section id="driver" className="mono-section mono-light"><div className="mono-container mono-split"><span className="mono-index">04</span><div><span className="mono-kicker">FOR DRIVERS</span><h2>Drive with Torkk.</h2><p className="mono-large-copy">A driver platform built around transparency, flexibility and better tools.</p><div className="mono-three"><div><b>FLEXIBLE</b><p>Drive when you want.</p></div><div><b>TRANSPARENT</b><p>Clear platform economics.</p></div><div><b>BUILT FOR DRIVERS</b><p>Tools designed around everyday driving.</p></div></div><Button href="/drive">Become a Torkk Captain</Button></div></div></section>
    <section className="mono-section mono-dark"><div className="mono-container mono-parcel"><div><span className="mono-kicker">LOCAL LOGISTICS</span><h2>Move people.<br />Move packages.</h2><p className="mono-large-copy">Torkk connects everyday mobility with local delivery.</p><Button href="/parcel" secondary>Explore Parcel</Button></div><div className="mono-package"><Package size={46} /></div></div></section>
    <section id="contact" className="mono-section mono-contact"><div className="mono-container mono-split"><span className="mono-index">05</span><div><span className="mono-kicker">GET IN TOUCH</span><h2>Let&apos;s move forward.</h2><p>Questions, partnerships or support.</p><a className="mono-email" href="mailto:support@torkk.in">support@torkk.in <ArrowUpRight size={16} /></a><ContactForm /></div></div></section>
  </main><Footer /><TorkkChat /></>
}
