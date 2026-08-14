import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';
import { PLANS } from '@/lib/stripe/plans';

export async function POST(req: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plan = PLANS.find((p) => p.stripePriceId === priceId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get or create customer
    const { data: subscription, error: subscriptionError } = await supabase
  .from('subscriptions')
  .select('stripe_customer_id')
  .eq('user_id', user.id)
  .maybeSingle();

if (subscriptionError) {
  console.error('Error fetching subscription:', subscriptionError);
  return NextResponse.json(
    { error: 'Unable to load subscription information' },
    { status: 500 }
  );
}

    let customerId = subscription?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabaseUserId: user.id,
        },
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${req.nextUrl.origin}/dashboard?checkout=success`,
      cancel_url: cancelUrl || `${req.nextUrl.origin}/pricing`,
      metadata: {
        supabaseUserId: user.id,
        planType: plan.id,
      },
      subscription_data: {
        metadata: {
          supabaseUserId: user.id,
          planType: plan.id,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
