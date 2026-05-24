import { NextRequest, NextResponse } from 'next/server';
import { stripe, getWebhookSecret } from '@/lib/stripe/server';
import { updateSubscription, deleteSubscription, claimFoundingMemberSpot } from '@/lib/stripe/subscription';
import { PlanType } from '@/lib/stripe/plans';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = getWebhookSecret();

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      throw new Error('Missing stripe-signature or webhook secret');
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const supabaseUserId = session.metadata?.supabaseUserId;
        const planType = session.metadata?.planType as PlanType;

        if (!supabaseUserId || !planType) {
          throw new Error('Missing metadata in checkout session');
        }

        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          const sub = subscription as any;
          await updateSubscription(
            supabaseUserId,
            subscriptionId,
            session.customer as string,
            sub.status,
            planType,
            new Date(sub.current_period_start * 1000),
            new Date(sub.current_period_end * 1000)
          );
        } else if (session.mode === 'payment') {
          // Lifetime payment (Founding Member)
          if (planType === 'founding') {
            await claimFoundingMemberSpot();
          }

          await updateSubscription(
            supabaseUserId,
            `one_time_${session.id}`,
            session.customer as string,
            'active',
            planType,
            new Date(),
            new Date(new Date().setFullYear(new Date().getFullYear() + 100))
          );
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as any;
        const supabaseUserId = sub.metadata?.supabaseUserId;
        const planType = sub.metadata?.planType as PlanType;

        if (supabaseUserId && planType) {
          await updateSubscription(
            supabaseUserId,
            sub.id,
            sub.customer as string,
            sub.status,
            planType,
            new Date(sub.current_period_start * 1000),
            new Date(sub.current_period_end * 1000)
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await deleteSubscription(subscription.id);
        break;
      }

      case 'invoice.paid': {
        break;
      }

      case 'invoice.payment_failed': {
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
