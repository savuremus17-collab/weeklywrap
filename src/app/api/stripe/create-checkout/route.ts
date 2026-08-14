import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
import { PLANS } from "@/lib/stripe/plans"

type SubscriptionRow = {
  stripe_customer_id: string | null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      priceId,
      successUrl,
      cancelUrl,
    } = body

    if (!priceId) {
      return NextResponse.json(
        {
          error: "Price ID is required",
        },
        {
          status: 400,
        },
      )
    }

    const plan = PLANS.find(
      (p) => p.stripePriceId === priceId,
    )

    if (!plan) {
      return NextResponse.json(
        {
          error: "Invalid plan",
        },
        {
          status: 400,
        },
      )
    }

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
        "Checkout authentication error:",
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
     * Find existing Stripe customer.
     *
     * The explicit type prevents TypeScript from
     * incorrectly inferring the query result as `never`.
     */
    const {
      data: existingSubscriptionData,
      error: subscriptionError,
    } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (subscriptionError) {
      console.error(
        "Error fetching subscription:",
        subscriptionError,
      )

      return NextResponse.json(
        {
          error:
            "Unable to load subscription information",
          details: subscriptionError.message,
        },
        {
          status: 500,
        },
      )
    }

    const existingSubscription =
      existingSubscriptionData as
        | SubscriptionRow
        | null

    let customerId =
      existingSubscription?.stripe_customer_id ||
      null

    /*
     * Create Stripe customer if one doesn't exist.
     */
    if (!customerId) {
      const customer =
        await stripe.customers.create({
          email:
            user.email ||
            undefined,

          metadata: {
            supabaseUserId: user.id,
          },
        })

      customerId = customer.id

      /*
       * Save Stripe customer in Supabase.
       */
      const {
        error: customerSaveError,
      } = await supabase
        .from("subscriptions")
        .upsert(
          {
            user_id: user.id,
            stripe_customer_id: customerId,
            plan_type: "free",
            status: "incomplete",
          },
          {
            onConflict: "user_id",
          },
        )

      if (customerSaveError) {
        console.error(
          "Error saving Stripe customer:",
          customerSaveError,
        )

        return NextResponse.json(
          {
            error:
              "Unable to save Stripe customer",
            details:
              customerSaveError.message,
          },
          {
            status: 500,
          },
        )
      }
    }

    /*
     * Create Stripe Checkout Session.
     */
    const session =
      await stripe.checkout.sessions.create({
        customer: customerId,

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        mode: "subscription",

        success_url:
          successUrl ||
          `${req.nextUrl.origin}/dashboard?checkout=success`,

        cancel_url:
          cancelUrl ||
          `${req.nextUrl.origin}/dashboard/settings`,

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
      })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: unknown) {
    console.error(
      "Error creating checkout session:",
      error,
    )

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create checkout session"

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
