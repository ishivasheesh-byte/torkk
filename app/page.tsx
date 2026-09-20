'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Bike, Car, Check, ChevronDown, ChevronRight, Clock3, Download, Menu, Navigation, Package, Phone, ShieldCheck, Smartphone, Star, Users, X, Zap } from 'lucide-react'

const appLinks = { rider: '#download', driver: '#driver' }

const rides = [
  { name: 'Bike', description: 'Quick, convenient rides for everyday city travel.', icon: Bike, tone: 'blue' },
  { name: 'Auto', description: 'Simple and affordable three-wheeler mobility.', icon: Navigation, tone: 'pink' },
  { name: 'Cab', description: 'Comfortable rides for everyday travel.', icon: Car, tone: 'dark' },
  { name: 'EV Cab', description: 'Move comfortably with electric mobility.', icon: Zap, tone: 'blue' },
  { name: 'XL Cab', description: 'More space when you need it.', icon: Users, tone: 'pink' },
]

const safety = [
  ['Verified Driver Partners', 'Driver partners go through verification and required onboarding checks.'],
  ['Live Ride Tracking', 'Track your journey in real time.'],
  ['Emergency SOS', 'Quick access to emergency assistance during a ride.'],
  ['Ride Information', 'Access important trip and driver information throughout your journey.'],
  ['Secure Ride Flow', 'Built around secure booking and trip verification.'],
  ['Same-Gender Safety Option', 'Safety-focused ride and drive preferences where available.'],
]

const faqs = [
  ['Where is Torkk available?', 'Torkk is building its mobility experience across Delhi NCR, including Delhi, Gurugram, Noida, Ghaziabad and Faridabad. Availability may vary by service and locality.'],
  ['What ride options does Torkk offer?', 'Torkk offers Bike, Auto, Cab, EV Cab and XL Cab options, subject to local availability.'],
  ['How do I drive with Torkk?', 'Register your interest, submit the required documents, complete verification and start driving once approved.'],
  ['How can I contact support?', 'Reach us at support@torkk.in or call +91 93105 19079.'],
]

function Logo() { return <a href="#top" className="flex items-center gap-2.5" aria-label="Torkk home"><span className="logo-mark">t</span><span className="text-[22px] font-black tracking-[-0.06em]">torkk</span></a> }

function Button({ children, href = '#download', secondary = false }: { children: React.ReactNode; href?: string; secondary?: boolean }) {
  return <a href={href} className={secondary ? 'btn btn-secondary' : 'btn btn-primary'}>{children}<ArrowUpRight size={16} /></a>
}

function SectionTitle({ eyebrow, title, copy, light = false }: { eyebrow: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return <div className={light ? 'section-title light' : 'section-title'}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function PhoneMockup({ driver = false }: { driver?: boolean }) {
  return <div className="phone-wrap"><div className="phone"><div className="phone-notch" /><div className="phone-top"><span>{driver ? 'Torkk Driver' : 'Torkk'}</span><span className="tiny-dot" /></div><div className="phone-map"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-route" /><span className="map-pin pin-a" /><span className="map-pin pin-b" /><div className="map-label">{driver ? 'Active trip' : 'Delhi NCR'}</div></div><div className="phone-sheet"><div className="sheet-line" /><div className="flex items-center justify-between"><div><small>{driver ? 'Today’s earnings' : 'Good morning'}</small><strong>{driver ? '₹ 1,840' : 'Where to?'}</strong></div><span className="sheet-icon">{driver ? '₹' : '→'}</span></div><div className="phone-option"><span>{driver ? '5 trips completed' : 'Set pickup location'}</span><ChevronRight size={14} /></div></div></div></div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="nav"><div className="container nav-inner"><Logo /><nav className="desktop-nav"><a href="#ride">Ride</a><a href="#driver">Drive</a><a href="#parcel">Parcel</a><a href="#safety">Safety</a><a href="#about">About</a></nav><div className="nav-actions"><a className="nav-link" href="#support">Help</a><a className="nav-link" href="#contact">Contact</a><Button>Download App</Button><button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div></div>{open && <div className="mobile-menu"><a href="#ride" onClick={() => setOpen(false)}>Ride</a><a href="#driver" onClick={() => setOpen(false)}>Drive</a><a href="#parcel" onClick={() => setOpen(false)}>Parcel</a><a href="#safety" onClick={() => setOpen(false)}>Safety</a><a href="#about" onClick={() => setOpen(false)}>About</a><a href="#support" onClick={() => setOpen(false)}>Help & Support</a></div>}</header>
}

function ContactForm() {
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle')
  const submit = async (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setStatus('idle'); const form = e.currentTarget; const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); if (response.ok) { setStatus('success'); form.reset() } else setStatus('error') }
  return <form className="contact-form" onSubmit={submit}><div className="form-grid"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Phone<input name="phone" required placeholder="+91" /></label><label>Subject<select name="subject" defaultValue="General Enquiry"><option>Rider Support</option><option>Driver Support</option><option>Business Partnership</option><option>Parcel</option><option>Media</option><option>General Enquiry</option></select></label></div><label>Message<textarea name="message" required placeholder="How can we help?" rows={5} /></label><input className="honeypot" tabIndex={-1} autoComplete="off" name="company" /><button className="btn btn-primary" type="submit">Send Enquiry <ArrowUpRight size={16} /></button>{status === 'success' && <p className="form-success"><Check size={16} /> Thanks! Your enquiry has been received. Our team will get back to you.</p>}{status === 'error' && <p className="form-error">Something went wrong. Please try again.</p>}</form>
}

export default function Page() {
  const [activeFaq, setActiveFaq] = useState(0)
  return <main id="top"><Navbar />
    <section className="hero"><div className="container hero-grid"><motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><div className="live-pill"><span /> Now serving Delhi NCR</div><h1>Fairer rides.<br /><em>Safer journeys.</em></h1><p>Torkk is building a smarter, safer and more transparent way to move across Delhi NCR.</p><div className="hero-buttons"><Button href="#ride">Ride with Torkk</Button><Button href="#driver" secondary>Drive with Torkk</Button></div><div className="trust-row"><span><ShieldCheck size={15} /> Safety-focused</span><span><Check size={15} /> Verified partners</span><span><Star size={15} /> Multiple options</span></div></motion.div><motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}><div className="hero-glow" /><div className="route-map"><div className="route-line route-1" /><div className="route-line route-2" /><div className="route-line route-3" /><span className="location location-1">DEL</span><span className="location location-2">GGM</span><span className="location location-3">NOI</span><div className="hero-map-caption"><span className="tiny-label">LIVE NETWORK</span><strong>Moving Delhi NCR<br />forward.</strong></div></div><PhoneMockup /></motion.div></div></section>

    <section className="marquee"><div className="container marquee-inner"><span>MOVE TOGETHER.</span><span>DELHI NCR, INDIA.</span><span>BUILT FOR EVERYDAY.</span><span>MOVE TOGETHER.</span></div></section>

    <section id="ride" className="section"><div className="container"><SectionTitle eyebrow="Choose your journey" title={<>Your ride.<br /><span>Your way.</span></>} copy="From quick city trips to everyday commutes, choose the ride that fits your journey." /><div className="ride-grid">{rides.map((ride, index) => { const Icon = ride.icon; return <motion.a href="#download" className={`ride-card ${ride.tone}`} key={ride.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><div className="ride-card-top"><span className="ride-icon"><Icon size={22} /></span><ArrowUpRight size={19} /></div><h3>{ride.name}</h3><p>{ride.description}</p></motion.a> })}</div></div></section>

    <section id="safety" className="section dark-section"><div className="container safety-grid"><div><SectionTitle light eyebrow="The Torkk standard" title={<>Safety isn&apos;t a feature.<br /><span>It&apos;s the foundation.</span></>} copy="Torkk is designed around safety at every stage of the journey — from driver verification to live ride monitoring." /><div className="safety-list">{safety.map(([title, text], index) => <div className="safety-item" key={title}><span className="number">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div><div className="safety-phone"><div className="safety-orbit" /><PhoneMockup /></div></div></section>

    <section className="section steps-section"><div className="container"><SectionTitle eyebrow="The simple way to move" title="Getting there is simple." copy="A better mobility experience, from pickup to destination." /><div className="steps">{[['01','Choose your ride','Select your pickup, destination and preferred ride category.'],['02','Get matched','Torkk connects your request with an available driver partner.'],['03','Ride safely','Verify your trip details and follow your ride in real time.'],['04','Reach your destination','Complete your journey with a simple digital ride experience.']].map(([num,title,text]) => <div className="step" key={num}><span className="step-num">{num}</span><div className="step-line" /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section id="driver" className="section driver-section"><div className="container driver-grid"><div className="driver-visual"><PhoneMockup driver /><div className="earnings-card"><span>Driver-first model</span><strong>More control.<br />More value.</strong><div className="mini-bars"><i /><i /><i /><i /><i /></div></div></div><div><SectionTitle light eyebrow="For driver partners" title={<>Drive with Torkk.<br /><span>Earn on your schedule.</span></>} copy="Build your earning journey with a platform designed to give driver partners more control, transparent operations and a better digital experience." /><div className="benefit-grid">{[['Flexible Working','Choose when you want to drive.'],['Transparent Platform','Simple and clear platform operations.'],['Ride Requests','Manage incoming requests through the Driver app.'],['Earnings Tracking','Monitor your rides and earnings.']].map(([a,b]) => <div className="benefit" key={a}><Check size={17} /><div><h3>{a}</h3><p>{b}</p></div></div>)}</div><div className="mt-8"><Button href="#contact">Become a Torkk Captain</Button></div></div></div></section>

    <section id="parcel" className="section parcel-section"><div className="container parcel-grid"><div><SectionTitle eyebrow="Torkk Parcel" title={<>More than rides.<br /><span>Move what matters.</span></>} copy="Package delivery capability within the Torkk ecosystem, built for everyday movement." /><div className="parcel-items"><div><Package size={20} /><span><b>Food Delivery</b>Goes from restaurant to customer.</span></div><div><Clock3 size={20} /><span><b>Grocery Delivery</b>Move groceries from stores to customers.</span></div><div><Navigation size={20} /><span><b>Torkk Parcel</b>Send eligible packages from one location to another.</span></div></div><Button href="#contact" secondary>Explore Torkk Parcel</Button></div><div className="parcel-art"><div className="parcel-circle" /><div className="parcel-box"><Package size={48} /></div><div className="parcel-route"><span /><span /><span /></div><div className="parcel-label">DELHI NCR<br /><small>moving what matters</small></div></div></div></section>

    <section className="section contrast-section"><div className="container contrast-grid"><div><SectionTitle light eyebrow="Built with drivers in mind" title="A fairer model for moving forward." copy="Torkk's platform is designed around transparent operations and helping driver partners retain more value from their work." /><div className="commission"><strong>0%</strong><span>Commission</span><small>Applicable model and charges may vary by service, geography and applicable terms.</small></div></div><div className="network-card"><span className="eyebrow">Technology at work</span><h3>Mobility, powered by technology.</h3><div className="network-flow"><div>Rider</div><i /><div>Torkk<br />Platform</div><i /><div>Driver</div></div><p>AI-assisted matching · Live trip tracking · Secure authentication</p></div></div></section>

    <section id="about" className="section about-section"><div className="container about-grid"><SectionTitle eyebrow="Why Torkk" title={<>Built for the way<br /><span>people move.</span></>} copy="Torkk was created with a simple idea: mobility should be safer, more transparent and more accessible for both riders and driver partners." /><div className="why-grid">{[['Safety-first','Designed around safer journeys.'],['Transparent','Clearer mobility experience.'],['Driver-focused','Built with driver partners in mind.'],['Smart technology','Modern technology behind every journey.'],['Everyday mobility','Designed for the way people actually move.'],['Delhi NCR','Expanding mobility across the region.']].map(([a,b], i) => <div className="why-card" key={a}><span>0{i+1}</span><h3>{a}</h3><p>{b}</p></div>)}</div></div></section>

    <section id="download" className="download-section"><div className="container download-grid"><div><span className="eyebrow">Torkk in your pocket</span><h2>Meet Torkk<br /><em>on your phone.</em></h2><p>One simple app for your next ride. Built for riders and driver partners across Delhi NCR.</p><div className="store-row"><a href="#" className="store-button"><Smartphone size={20} /><span><small>Download on the</small>App Store</span></a><a href="#" className="store-button"><Download size={20} /><span><small>GET IT ON</small>Google Play</span></a></div><small className="availability">Torkk is now live on App Store. Torkk Driver is available on Google Play. Availability may vary by region.</small></div><div className="download-phones"><PhoneMockup /><PhoneMockup driver /></div></div></section>

    <section id="support" className="section faq-section"><div className="container faq-grid"><SectionTitle eyebrow="Help center" title="Questions, answered." copy="Need help? We&apos;re here to make your journey easier." /><div className="faq-list">{faqs.map(([q,a], i) => <div className={`faq ${activeFaq === i ? 'active' : ''}`} key={q}><button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}><span>{q}</span><ChevronDown size={18} /></button>{activeFaq === i && <p>{a}</p>}</div>)}<div className="support-contact"><a href="mailto:support@torkk.in">support@torkk.in</a><a href="tel:+919310519079">+91 93105 19079</a></div></div></div></section>

    <section id="contact" className="section contact-section"><div className="container contact-grid"><div><SectionTitle eyebrow="Contact Torkk" title={<>Let&apos;s talk.</>} copy="Whether you&apos;re a rider, driver partner or business, we&apos;d love to hear from you." /><a className="email-link" href="mailto:hello@blackoriginx.com">hello@blackoriginx.com <ArrowUpRight size={17} /></a></div><ContactForm /></div></section>

    <footer className="footer"><div className="container"><div className="footer-top"><div><Logo /><p>Move Together.</p></div><div className="footer-links"><div><b>Company</b><a href="#about">About</a><a href="#safety">Safety</a><a href="#contact">Contact</a></div><div><b>Rides</b><a href="#ride">Bike & Auto</a><a href="#ride">Cab & EV Cab</a><a href="#ride">Schedule Ride</a></div><div><b>Drive</b><a href="#driver">Become a Captain</a><a href="#download">Driver App</a><a href="#support">Driver Support</a></div><div><b>Legal</b><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a><a href="#">Refund Policy</a></div></div></div><div className="footer-bottom"><span>© 2026 BlackOriginX Private Limited. All rights reserved.</span><span>BLACKORIGINX PRIVATE LIMITED</span><div className="socials"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="LinkedIn">in</a></div></div></div></footer><a className="sticky-download" href="#download"><Download size={16} /> Download Torkk</a>
  </main>
}

