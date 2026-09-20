import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, category, message, company } = body ?? {}
    if (company) return NextResponse.json({ ok: true })
    const selectedCategory = subject || category
    if (!name || !email || !selectedCategory || !message) return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    if (!process.env.CONTACT_EMAIL || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return NextResponse.json({ error: 'Contact service is not configured.' }, { status: 503 })
    return NextResponse.json({ ok: true, message: 'Enquiry received.' })
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
}
