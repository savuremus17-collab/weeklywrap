import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"

type SubscriptionRow = {
  stripe_customer_id: string | null
}

export async function GET(req: NextRequest) {
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
        "Payment method authentication error:",
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
        "Payment method subscription lookup error:",
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
     * Explicit type prevents TypeScript
     * from resolving the Supabase result
     * to `never`.
     */
    const subscription =
      subscriptionData as
        | SubscriptionRow
        | null

    const customerId =
      subscription?.stripe_customer_id || null

    if (!customerId) {
      return NextResponse.json({
        paymentMethod: null,
      })
    }

    /*
     * Retrieve the Stripe customer payment methods.
     */
    const paymentMethods =
      await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      })

    const paymentMethod =
      paymentMethods.data[0]

    if (!paymentMethod) {
      return NextResponse.json({
        paymentMethod: null,
      })
    }

    return NextResponse.json({
      paymentMethod: {
        brand:
          paymentMethod.card?.brand ||
          "card",

        last4:
          paymentMethod.card?.last4 ||
          "",

        expMonth:
          paymentMethod.card?.exp_month ||
          0,

        expYear:
          paymentMethod.card?.exp_year ||
          0,
      },
    })
  } catch (error: unknown) {
    console.error(
      "Error loading payment method:",
      error,
    )

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load payment method"

    return NextResponse.json(
      {
        error: message,
        paymentMethod: null,
      },
      {
        status: 500,
      },
    )
  }
}
