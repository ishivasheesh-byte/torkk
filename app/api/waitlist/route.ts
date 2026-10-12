import { NextResponse } from 'next/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body?.name ?? '').trim()
    const email = String(body?.email ?? '').trim().toLowerCase()
    const phone = String(body?.phone ?? '').trim()
    const city = String(body?.city ?? '').trim()
    const service = String(body?.service ?? '').trim()
    const consent = body?.consent === true

    if (!name || !email || !emailPattern.test(email) || !consent) {
      return NextResponse.json({ error: 'Please provide your name, a valid email, and consent to receive launch updates.' }, { status: 400 })
    }

    if (phone && !/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter a valid mobile number.' }, { status: 400 })
    }

    return NextResponse.json({
      error: 'The waitlist is not connected yet. Please email support@torkk.in to join the launch list.',
      configurationRequired: true,
    }, { status: 503 })
  } catch {
    return NextResponse.json({ error: 'Unable to process your request right now.' }, { status: 400 })
  }
}
