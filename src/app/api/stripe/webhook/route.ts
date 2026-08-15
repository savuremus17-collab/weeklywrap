import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe/server'
import { createClient } from '@supabase/supabase-js'

let _supabase: any = null

// Lazily create the admin client on first use instead of at module-import
// time, so a missing env var during build-time page-data collection can't
// crash the whole build.
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _supabase
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: any

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.supabaseUserId
        const planType = session.metadata?.planType
        const customerId = session.customer
        const subscriptionId = session.subscription

        if (userId) {
          let periodStart: string | null = null
          let periodEnd: string | null = null
        if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId) as any
            periodStart = new Date(sub.current_period_start * 1000).toISOString()
            periodEnd = new Date(sub.current_period_end * 1000).toISOString()
          }
          await getSupabase().from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan_type: planType || 'pro',
            status: 'active',
            current_period_start: periodStart,
            current_period_end: periodEnd,
          }, { onConflict: 'user_id' })
        }
        break
      }

     case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        const customerId = subscription.customer

        const { data: existing } = await getSupabase()
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (existing) {
          await getSupabase().from('subscriptions').update({
            status: subscription.status,
            stripe_subscription_id: subscription.id,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          }).eq('stripe_customer_id', customerId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const customerId = subscription.customer

        await getSupabase().from('subscriptions').update({
          status: 'canceled',
          plan_type: 'free',
        }).eq('stripe_customer_id', customerId)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const customerId = invoice.customer

        await getSupabase().from('subscriptions').update({
          status: 'past_due',
        }).eq('stripe_customer_id', customerId)
        break
      }
    }
  } catch (error) {
    console.error('Webhook processing error:', error)
  }

  return NextResponse.json({ received: true })
}
