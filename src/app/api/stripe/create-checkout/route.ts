import {
  NextRequest,
  NextResponse,
} from "next/server"

import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { PLANS } from "@/lib/stripe/plans"

export async function POST(
  req: NextRequest
) {
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
        { status: 400 }
      )
    }

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
        "Checkout authentication error:",
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

    const plan = PLANS.find(
      (p) =>
        p.stripePriceId === priceId
    )

    if (!plan) {
      return NextResponse.json(
        {
          error: "Invalid plan",
        },
        { status: 400 }
      )
    }

    const {
      data: existingSubscription,
      error: subscriptionError,
    } =
      await supabaseAdmin
        .from("subscriptions")
        .select(
          "id, stripe_customer_id"
        )
        .eq(
          "user_id",
          user.id
        )
        .maybeSingle()

    if (subscriptionError) {
      console.error(
        "Subscription lookup error:",
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

    let customerId =
      existingSubscription
        ?.stripe_customer_id || null

    if (!customerId) {
      const customer =
        await stripe.customers.create({
          email:
            user.email ||
            undefined,

          metadata: {
            supabaseUserId:
              user.id,
          },
        })

      customerId =
        customer.id

      const {
        error: saveError,
      } =
        existingSubscription
          ? await supabaseAdmin
              .from("subscriptions")
              .update({
                stripe_customer_id:
                  customerId,
              })
              .eq(
                "id",
                existingSubscription.id
              )
          : await supabaseAdmin
              .from("subscriptions")
              .insert({
                user_id:
                  user.id,
                stripe_customer_id:
                  customerId,
                plan_type:
                  "free",
                status:
                  "incomplete",
              })

      if (saveError) {
        console.error(
          "Stripe customer save error:",
          saveError
        )

        return NextResponse.json(
          {
            error:
              saveError.message,
          },
          { status: 500 }
        )
      }
    }

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
        }
      )

    return NextResponse.json({
      sessionId:
        session.id,

      url:
        session.url,
    })
  } catch (error: any) {
    console.error(
      "Create checkout error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to create checkout session",
      },
      { status: 500 }
    )
  }
}
