import {
  NextRequest,
  NextResponse,
} from "next/server"

import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function GET(
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
        "Payment method auth error:",
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
      return NextResponse.json({
        paymentMethod: null,
      })
    }

    const paymentMethods =
      await stripe.paymentMethods.list(
        {
          customer:
            subscription.stripe_customer_id,

          type: "card",
        }
      )

    const card =
      paymentMethods.data[0]?.card

    if (!card) {
      return NextResponse.json({
        paymentMethod: null,
      })
    }

    return NextResponse.json({
      paymentMethod: {
        brand:
          card.brand,
        last4:
          card.last4,
        expMonth:
          card.exp_month,
        expYear:
          card.exp_year,
      },
    })
  } catch (error: any) {
    console.error(
      "Payment method error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to load payment method",
      },
      { status: 500 }
    )
  }
}
