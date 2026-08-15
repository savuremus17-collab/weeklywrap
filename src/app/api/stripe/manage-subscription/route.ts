import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { action, subscriptionId, newPriceId } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
const { data: ownSubscription, error: ownSubscriptionError } =
  await supabase
    .from("subscriptions")
    .select("stripe_subscription_id")
    .eq("user_id", user.id)
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle()

if (ownSubscriptionError) {
  return NextResponse.json(
    { error: ownSubscriptionError.message },
    { status: 500 }
  )
}

if (!ownSubscription) {
  return NextResponse.json(
    { error: "Subscription does not belong to this user" },
    { status: 403 }
  )
}
    if (action === 'cancel') {
      const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);
      return NextResponse.json({ subscription: deletedSubscription });
    }

    if (action === 'upgrade' || action === 'downgrade') {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: newPriceId,
        }],
        proration_behavior: 'always_invoice',
      });
      return NextResponse.json({ subscription: updatedSubscription });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error managing subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
