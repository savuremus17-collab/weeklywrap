import {
  NextRequest,
  NextResponse,
} from "next/server"

import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function POST(
  req: NextRequest
) {
  try {
    const supabase =
      await createClient()

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
        "Portal auth error:",
        authError
      )
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      )
    }

    const {
      data: subscription,
      error,
    } = await supabaseAdmin
      .from("subscriptions")
      .select(
        "stripe_customer_id"
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle()

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      )
    }

    if (
      !subscription
        ?.stripe_customer_id
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
      "Billing portal error:",
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
