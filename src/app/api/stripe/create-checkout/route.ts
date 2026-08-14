import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
import { PLANS } from "@/lib/stripe/plans"

export async function POST(req: NextRequest) {
  try {
    const {
      priceId,
      successUrl,
      cancelUrl,
    } = await req.json()

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

    const supabase =
      await createClient()

    /*
     * Get the currently authenticated
     * Supabase user.
     *
     * The server client already knows
     * the user's auth cookies, so we do
     * not need to depend exclusively on
     * a manually supplied Authorization
     * header.
     */
    const {
      data: {
        user,
      },
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

    const plan =
      PLANS.find(
        (p) =>
          p.stripePriceId ===
          priceId,
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

    /*
     * Find an existing Stripe customer
     * belonging to this Supabase user.
     */
    const {
      data: subscription,
      error:
        subscriptionError,
    } = await supabase
      .from("subscriptions")
      .select(
        "stripe_customer_id",
      )
      .eq(
        "user_id",
        user.id,
      )
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
        },
        {
          status: 500,
        },
      )
    }

    let customerId =
      subscription?.stripe_customer_id ||
      null

    /*
     * If the user doesn't have a Stripe
     * customer yet, create one.
     */
    if (!customerId) {
      const customer =
        await stripe.customers.create(
          {
            email:
              user.email ||
              undefined,

            metadata: {
              supabaseUserId:
                user.id,
            },
          },
        )

      customerId =
        customer.id

      const {
        error:
          customerSaveError,
      } = await supabase
        .from(
          "subscriptions",
        )
        .upsert(
          {
            user_id: user.id,

            stripe_customer_id:
              customerId,

            plan_type: "free",

            status:
              "incomplete",
          },
          {
            onConflict:
              "user_id",
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
          },
          {
            status: 500,
          },
        )
      }
    }

    /*
     * Create the Stripe Checkout
     * session.
     */
    const session =
      await stripe.checkout.sessions.create(
        {
          customer:
            customerId,

          line_items: [
            {
              price:
                priceId,

              quantity: 1,
            },
          ],

          mode:
            "subscription",

          success_url:
            successUrl ||
            `${req.nextUrl.origin}/dashboard?checkout=success`,

          cancel_url:
            cancelUrl ||
            `${req.nextUrl.origin}/dashboard/settings`,

          metadata: {
            supabaseUserId:
              user.id,

            planType:
              plan.id,
          },

          subscription_data: {
            metadata: {
              supabaseUserId:
                user.id,

              planType:
                plan.id,
            },
          },
        },
      )

    return NextResponse.json({
      sessionId:
        session.id,

      url:
        session.url,
    })
  } catch (error: any) {
    console.error(
      "Error creating checkout session:",
      error,
    )

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to create checkout session",
      },
      {
        status: 500,
      },
    )
  }
}
