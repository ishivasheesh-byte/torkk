import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { enquiries } from '@/lib/db/schema'
import { cleanText, isValidEmail } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = cleanText(body?.name, 120)
    const email = cleanText(body?.email, 240).toLowerCase()
    const phone = cleanText(body?.phone, 40) || null
    const category = cleanText(body?.subject || body?.category, 80)
    const message = cleanText(body?.message, 4000)

    if (body?.company) return NextResponse.json({ ok: true })
    if (!name || !email || !category || !message) return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    if (!isValidEmail(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    if (phone && !/^\+?[0-9\s()-]{10,20}$/.test(phone)) return NextResponse.json({ error: 'Please enter a valid mobile number.' }, { status: 400 })

    await db.insert(enquiries).values({ name, email, phone, category, message })
    return NextResponse.json({ ok: true, message: 'Enquiry received.' })
  } catch {
    return NextResponse.json({ error: 'Unable to submit your enquiry right now.' }, { status: 500 })
  }
}
