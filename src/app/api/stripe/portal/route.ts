import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"

type SubscriptionRow = {
  stripe_customer_id: string | null
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    /*
     * Get authenticated Supabase user.
     */
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error(
        "Billing portal authentication error:",
        authError,
      )
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      )
    }

    /*
     * Find the Stripe customer belonging
     * to the authenticated user.
     */
    const {
      data: subscriptionData,
      error: subscriptionError,
    } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (subscriptionError) {
      console.error(
        "Billing subscription lookup error:",
        subscriptionError,
      )

      return NextResponse.json(
        {
          error:
            "Unable to load subscription information",
          details:
            subscriptionError.message,
        },
        {
          status: 500,
        },
      )
    }

    /*
     * Explicit type prevents Supabase's
     * generated types from resolving this
     * result to `never`.
     */
    const subscription =
      subscriptionData as
        | SubscriptionRow
        | null

    const customerId =
      subscription?.stripe_customer_id || null

    if (!customerId) {
      return NextResponse.json(
        {
          error:
            "No Stripe customer found. Please choose a plan first.",
        },
        {
          status: 400,
        },
      )
    }

    /*
     * Create Stripe Billing Portal session.
     */
    const session =
      await stripe.billingPortal.sessions.create(
        {
          customer: customerId,

          return_url:
            `${req.nextUrl.origin}/dashboard/settings`,
        },
      )

    return NextResponse.json({
      url: session.url,
    })
  } catch (error: unknown) {
    console.error(
      "Error creating billing portal session:",
      error,
    )

    const message =
      error instanceof Error
        ? error.message
        : "Unable to open billing portal"

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    )
  }
}
