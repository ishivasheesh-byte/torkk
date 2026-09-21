'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'

const prompts = ['Ride with Torkk', 'Drive with Torkk', 'Torkk Parcel', 'Safety', 'App Support', 'Payments']

export function TorkkChat() {
  const [open, setOpen] = useState(false)
  const { messages, sendMessage, status, error } = useChat({ transport: new DefaultChatTransport({ api: '/api/chat' }) })
  const [input, setInput] = useState('')
  const busy = status === 'submitted' || status === 'streaming'

  async function submit(value: string) {
    const text = value.trim()
    if (!text || busy) return
    setInput('')
    await sendMessage({ text })
  }

  return <div className="torkk-chat">
    {open && <section className="torkk-chat-panel" aria-label="Torkk AI chat">
      <header><div><strong>Torkk AI</strong><span>Here to help you move</span></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={17} /></button></header>
      <div className="torkk-chat-messages" aria-live="polite">
        {messages.length === 0 && <div className="torkk-chat-welcome"><Sparkles size={18} /><p>Hi, how can I help?</p></div>}
        {messages.map(message => <div className={`torkk-message ${message.role}`} key={message.id}>{message.parts?.map((part, index) => part.type === 'text' ? <span key={index}>{part.text}</span> : null)}</div>)}{error && <div className="torkk-chat-error" role="alert">Torkk AI is temporarily unavailable. Please contact support@torkk.in.</div>}
      </div>
      <div className="torkk-chat-prompts">{prompts.map(prompt => <button key={prompt} onClick={() => submit(prompt)}>{prompt}</button>)}</div>
      <form onSubmit={event => { event.preventDefault(); void submit(input) }}><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about Torkk…" aria-label="Message Torkk AI" /><button type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Send size={16} /></button></form>
      <a href="mailto:support@torkk.in">Contact Support →</a>
    </section>}
    <button className="torkk-chat-launcher" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close Torkk AI' : 'Open Torkk AI'}><span>{open ? <X size={20} /> : <MessageCircle size={20} />}</span></button>
  </div>
}
