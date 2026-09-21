import { streamText, convertToModelMessages, type UIMessage } from 'ai'

const system = `You are Torkk AI, the concise support assistant for Torkk, a Delhi NCR mobility company. Help with Torkk rides (Bike, Auto, Cab, EV Cab, XL Cab), Torkk Parcel, driver onboarding, safety, app downloads, support, and payments. Be warm and brief. Never invent prices, availability, or policies. For unsupported questions, say: I can help with Torkk rides, drivers, parcel services, safety and app support. Mention support@torkk.in when human help is needed.`

export async function POST(request: Request) {
  try {
    const body = await request.json() as { messages?: UIMessage[] }
    if (!Array.isArray(body.messages) || body.messages.length === 0) return Response.json({ error: 'Messages are required.' }, { status: 400 })
    const messages = body.messages.slice(-12)
    const result = streamText({ model: 'google/gemini-2.5-flash', system, messages: await convertToModelMessages(messages) })
    return result.toUIMessageStreamResponse()
  } catch {
    return Response.json({ error: 'Unable to reach Torkk AI.' }, { status: 500 })
  }
}
