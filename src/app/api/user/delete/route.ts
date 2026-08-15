import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // 1. Cauta abonamentul activ in Supabase
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id, status')
      .eq('user_id', user.id)
      .single()
    // 2. Anuleaza abonamentul Stripe daca exista
    if (subscription?.stripe_subscription_id && subscription.status === 'active') {
      try {
        await stripe.subscriptions.cancel(subscription.stripe_subscription_id)
      } catch (stripeError) {
        console.error('Error canceling Stripe subscription:', stripeError)
      }
    }
    // 3. Sterge datele userului din Supabase
    await supabase.from('clients').delete().eq('user_id', user.id)
    await supabase.from('reports').delete().eq('user_id', user.id)
    await supabase.from('subscriptions').delete().eq('user_id', user.id)
    await supabase.from('users').delete().eq('id', user.id)
    // 4. Sterge userul din auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
    if (deleteError) throw deleteError
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting account:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
