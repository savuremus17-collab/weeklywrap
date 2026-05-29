import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27' as any,
  appInfo: {
    name: 'WeeklyWrap',
    version: '0.1.0',
  },
});

export const getWebhookSecret = () => {
  return process.env.STRIPE_WEBHOOK_SECRET;
};
