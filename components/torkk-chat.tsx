'use client'

import { FormEvent, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'

type ChatMessage = { id: string; role: 'user' | 'assistant'; text: string }

const prompts = ['Ride with Torkk', 'Drive with Torkk', 'Torkk Parcel', 'Safety', 'App Support', 'Payments']

function replyFor(text: string) {
  const query = text.toLowerCase()
  if (query.includes('schedule') || query.includes('scheduled')) return 'Scheduled rides are available through the Torkk customer app. Download the app to plan your journey; this website does not process bookings.'
  if (query.includes('ride') || query.includes('book') || query.includes('bike') || query.includes('auto') || query.includes('cab')) return 'Ride booking is available through the Torkk app. Explore Bike, Auto, Cab, EV Cab and XL Cab on this website, then download the app to request a ride across Delhi NCR.'
  if (query.includes('drive') || query.includes('driver')) return 'You can join Torkk through Torkk Driver. Visit Drive with Torkk to learn about the journey, then submit a driver enquiry if you need help.'
  if (query.includes('parcel') || query.includes('package')) return 'Torkk Parcel helps you send packages across Delhi NCR. Choose Parcel to learn more or contact support for help with a specific delivery.'
  if (query.includes('safety') || query.includes('safe')) return 'Safety is built into every Torkk journey with verified partners, trip details and support when you need it.'
  if (query.includes('pay') || query.includes('payment')) return 'For payment questions, please share your trip details with support@torkk.in and our team will help.'
  if (query.includes('subscription') || query.includes('pass')) return 'For current subscription or pass availability, please check the Torkk app or contact support@torkk.in. Availability can vary by service and location.'
  if (query.includes('app') || query.includes('download')) return 'You can download Torkk from the App Store or Google Play using the Download App button above.'
  return 'I’m not sure about that. I can help with Torkk rides, drivers, parcel services, safety, scheduled rides, payments and app support. Would you like to contact Torkk support?'
}

export function TorkkChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  function submit(value: string) {
    const text = value.trim()
    if (!text || busy) return
    setInput('')
    setBusy(true)
    setMessages(current => [...current, { id: `${Date.now()}-user`, role: 'user', text }])
    window.setTimeout(() => {
      setMessages(current => [...current, { id: `${Date.now()}-assistant`, role: 'assistant', text: replyFor(text) }])
      setBusy(false)
    }, 350)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit(input)
  }

  return <div className="torkk-chat">
    {open && <section className="torkk-chat-panel" aria-label="Torkk AI chat">
      <header><div><strong>Torkk AI</strong><span>Here to help you move</span></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={17} /></button></header>
      <div className="torkk-chat-messages" aria-live="polite">
        {messages.length === 0 && <div className="torkk-chat-welcome"><Sparkles size={18} /><p>Hi, how can I help?</p></div>}
        {messages.map(message => <div className={`torkk-message ${message.role}`} key={message.id}>{message.text}</div>)}
        {busy && <div className="torkk-message assistant" aria-label="Torkk AI is replying">Thinking…</div>}
      </div>
      <div className="torkk-chat-prompts">{prompts.map(prompt => <button key={prompt} onClick={() => submit(prompt)} disabled={busy}>{prompt}</button>)}</div>
      <form onSubmit={handleSubmit}><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about Torkk…" aria-label="Message Torkk AI" /><button type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Send size={16} /></button></form>
      <a href="mailto:support@torkk.in">Contact Support →</a>
    </section>}
    <button className="torkk-chat-launcher" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close Torkk AI' : 'Open Torkk AI'}><span>{open ? <X size={20} /> : <MessageCircle size={20} />}</span></button>
  </div>
}
