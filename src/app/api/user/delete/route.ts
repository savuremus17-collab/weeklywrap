import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe/server'

export async function POST() {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Look up any active Stripe subscription for this user
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id, status')
      .eq('user_id', user.id)
      .single()

    // 2. Cancel the Stripe subscription if one exists and is active
    if (subscription?.stripe_subscription_id && subscription.status === 'active') {
      try {
        await stripe.subscriptions.cancel(subscription.stripe_subscription_id)
      } catch (stripeError) {
        console.error('Error canceling Stripe subscription:', stripeError)
      }
    }

    // 3. Delete the user's app data from Supabase
    await supabase.from('clients').delete().eq('user_id', user.id)
    await supabase.from('reports').delete().eq('user_id', user.id)
    await supabase.from('subscriptions').delete().eq('user_id', user.id)
    await supabase.from('users').delete().eq('id', user.id)

    // 4. Delete the auth account itself — this requires the service-role
    //    key (the regular session client is not authorized for admin ops).
    //    persistSession/autoRefreshToken are disabled per Supabase's own
    //    guidance for server-side admin clients.
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: SUPABASE_SERVICE_ROLE_KEY is not set' },
        { status: 500 }
      )
    }

    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
    const { data: deleteData, error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id)

    if (deleteError) {
      return NextResponse.json(
        {
          error: `Supabase admin error: ${deleteError.message}`,
          status: (deleteError as any).status ?? null,
          code: (deleteError as any).code ?? null,
          name: deleteError.name ?? null,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, deleteData })
  } catch (error: any) {
    console.error('Error deleting account:', error)
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}
