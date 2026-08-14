import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Get token sent by the browser
    const authHeader =
      req.headers.get("authorization")

    const accessToken =
      authHeader?.match(
        /^Bearer\s+(.+)$/i
      )?.[1]

    const {
      data: { user },
      error: authError,
    } = accessToken
      ? await supabase.auth.getUser(
          accessToken
        )
      : await supabase.auth.getUser()

    if (authError) {
      console.error(
        "Billing portal authentication error:",
        authError
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const {
      data: subscription,
      error: subscriptionError,
    } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (subscriptionError) {
      console.error(
        "Error fetching subscription:",
        subscriptionError
      )

      return NextResponse.json(
        {
          error:
            subscriptionError.message,
        },
        { status: 500 }
      )
    }

    if (
      !subscription?.stripe_customer_id
    ) {
      return NextResponse.json(
        {
          error:
            "No Stripe customer found. Please choose a plan first.",
        },
        { status: 400 }
      )
    }

    const session =
      await stripe.billingPortal.sessions.create(
        {
          customer:
            subscription.stripe_customer_id,

          return_url:
            `${req.nextUrl.origin}/dashboard/settings`,
        }
      )

    return NextResponse.json({
      url: session.url,
    })
  } catch (error: any) {
    console.error(
      "Error creating portal session:",
      error
    )

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to open billing portal",
      },
      { status: 500 }
    )
  }
}
