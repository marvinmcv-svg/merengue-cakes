import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, cakeType, eventDate, message } = body

    if (!name || !email || !phone || !cakeType || !eventDate || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const cakeTypeLabels: Record<string, string> = {
      birthday: 'Birthday Cake',
      wedding: 'Wedding Cake',
      babyshower: 'Baby Shower Cake',
      graduation: 'Graduation Cake',
      anniversary: 'Anniversary Cake',
      custom: 'Custom Design',
    }

    await resend.emails.send({
      from: 'Merengue Cakes <onboarding@resend.dev>',
      to: process.env.JOSELYN_EMAIL || '',
      subject: `New Order: ${cakeTypeLabels[cakeType] || cakeType} for ${name}`,
      html: `
        <h2>New Cake Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Cake Type:</strong> ${cakeTypeLabels[cakeType] || cakeType}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
