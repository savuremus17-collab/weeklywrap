import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({
        paymentMethod: null,
      })
    }

    const paymentMethods =
      await stripe.paymentMethods.list({
        customer: subscription.stripe_customer_id,
        type: "card",
      })

    const card = paymentMethods.data[0]?.card

    if (!card) {
      return NextResponse.json({
        paymentMethod: null,
      })
    }

    return NextResponse.json({
      paymentMethod: {
        brand: card.brand,
        last4: card.last4,
        expMonth: card.exp_month,
        expYear: card.exp_year,
      },
    })
  } catch (error: any) {
    console.error("Payment method error:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
