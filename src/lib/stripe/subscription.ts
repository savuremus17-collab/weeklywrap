import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database.types';
import { PLANS, PlanType } from './plans';

export async function updateSubscription(
  userId: string,
  stripeSubscriptionId: string,
  stripeCustomerId: string,
  status: string,
  planType: PlanType,
  currentPeriodStart: Date,
  currentPeriodEnd: Date
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_subscription_id: stripeSubscriptionId,
      stripe_customer_id: stripeCustomerId,
      status,
      plan_type: planType,
      current_period_start: currentPeriodStart.toISOString(),
      current_period_end: currentPeriodEnd.toISOString(),
      founding_member: false,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'stripe_subscription_id',
    });

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

export async function deleteSubscription(stripeSubscriptionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('stripe_subscription_id', stripeSubscriptionId);

  if (error) {
    console.error('Error deleting subscription:', error);
    throw error;
  }
}

export async function getSubscription(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching subscription:', error);
    throw error;
  }

  return data;
}

export async function getFoundingMemberSpots() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('founding_member_spots')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching founding member spots:', error);
    return { total_spots: 50, claimed_spots: 0, disabled: false };
  }

  return data;
}

export async function claimFoundingMemberSpot() {
  const supabase = await createClient();

  // In a real scenario, this should be done in a transaction or with a stored procedure
  // to ensure atomicity and handle the 50 spots limit correctly.
  // For now, we'll do a simple update.
  
  const { data: spots, error: fetchError } = await supabase
    .from('founding_member_spots')
    .select('*')
    .single();

  if (fetchError) throw fetchError;

  if (spots.claimed_spots >= spots.total_spots) {
    throw new Error('No founding member spots remaining');
  }

  const { error: updateError } = await supabase
    .from('founding_member_spots')
    .update({
      claimed_spots: spots.claimed_spots + 1,
      disabled: spots.claimed_spots + 1 >= spots.total_spots,
    })
    .eq('id', spots.id);

  if (updateError) throw updateError;
}
