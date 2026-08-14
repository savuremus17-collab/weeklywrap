const handleCheckout = async (
  priceId: string,
  planId: string
) => {
  if (!priceId) return

  setLoadingPlan(planId)

  try {
    const { supabase } =
      await import("@/lib/supabase/client")

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.access_token) {
      alert(
        "Your session has expired. Please sign out and sign in again."
      )
      return
    }

    const res = await fetch(
      "/api/stripe/create-checkout",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization":
            `Bearer ${session.access_token}`,
        },

        body: JSON.stringify({
          priceId,

          successUrl:
            `${window.location.origin}/dashboard?checkout=success`,

          cancelUrl:
            `${window.location.origin}/dashboard/settings`,
        }),
      }
    )

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert(
        "Error: " +
          (data.error ||
            "Unable to create checkout session")
      )
    }
  } catch (error: any) {
    console.error(
      "Checkout error:",
      error
    )

    alert(
      "Something went wrong: " +
        (error?.message ||
          "Please try again.")
    )
  } finally {
    setLoadingPlan(null)
  }
}
