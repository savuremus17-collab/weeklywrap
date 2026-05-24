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
        const session = event.data.object as Stripe.CheckoutSession;
        const supabaseUserId = session.metadata?.supabaseUserId;
        const planType = session.metadata?.planType as PlanType;

        if (!supabaseUserId || !planType) {
          throw new Error('Missing metadata in checkout session');
        }

        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          await updateSubscription(
            supabaseUserId,
            subscriptionId,
            session.customer as string,
            subscription.status,
            planType,
            new Date(subscription.current_period_start * 1000),
            new Date(subscription.current_period_end * 1000)
          );
        } else if (session.mode === 'payment') {
          // Lifetime payment (Founding Member)
          if (planType === 'founding') {
            await claimFoundingMemberSpot();
          }

          await updateSubscription(
            supabaseUserId,
            `one_time_${session.id}`, // Placeholder ID for one-time payments
            session.customer as string,
            'active',
            planType,
            new Date(),
            new Date(new Date().setFullYear(new Date().getFullYear() + 100)) // Lifetime
          );
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const supabaseUserId = subscription.metadata?.supabaseUserId;
        const planType = subscription.metadata?.planType as PlanType;

        if (supabaseUserId && planType) {
          await updateSubscription(
            supabaseUserId,
            subscription.id,
            subscription.customer as string,
            subscription.status,
            planType,
            new Date(subscription.current_period_start * 1000),
            new Date(subscription.current_period_end * 1000)
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
        // You could send a success email here
        break;
      }

      case 'invoice.payment_failed': {
        // You could send a failure email here
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
