import { generateText } from 'ai'
import { NextResponse } from 'next/server'

const system = `You are Torkk's website support assistant. Answer only using publicly available Torkk information. Do not invent pricing, availability, earnings, statistics or guarantees. If you do not know the answer, direct the user to support@torkk.in. Torkk offers Bike, Auto, Cab, EV Cab and XL Cab across Delhi NCR, subject to service availability. Keep answers concise and helpful.`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const messages = Array.isArray(body.messages) ? body.messages : []
    const prompt = messages.slice(-8).map((message: { role?: string; text?: string }) => `${message.role === 'user' ? 'User' : 'Assistant'}: ${String(message.text || '').slice(0, 500)}`).join('\n')
    if (!prompt) return NextResponse.json({ text: 'How can I help? You can ask about rides, safety, drivers, parcel or app downloads.' })
    const { text } = await generateText({ model: 'openai/gpt-5.4-mini', system, prompt })
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ text: 'I could not connect right now. Please contact support@torkk.in.' }, { status: 200 })
  }
}
