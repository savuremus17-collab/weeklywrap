import Stripe from 'stripe'

let _stripe: Stripe | null = null

function getStripeClient(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia',
      typescript: true,
    })
  }
  return _stripe
}

// Exported as a Proxy so existing call sites (`stripe.checkout.sessions...`,
// `stripe.webhooks.constructEvent(...)`, etc.) keep working unchanged, while
// the real Stripe client is only constructed on first actual use — not at
// module-import time. This avoids crashing the build when STRIPE_SECRET_KEY
// isn't available in the environment doing the build (e.g. during static
// page-data collection).
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripeClient(), prop, receiver)
  },
})
