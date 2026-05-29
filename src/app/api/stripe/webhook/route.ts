import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'

export async function POST(req: Request) {
  const body = await req.text()

  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log(event.type)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    )
  }
}
