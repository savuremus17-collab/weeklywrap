export type PlanType = 'pro' | 'yearly';

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId?: string;
  metadata?: Record<string, string>;
}

export const PLANS: Plan[] = [
  {
    id: 'pro',
    name: 'Monthly',
    description: 'Everything you need to automate client reporting.',
    price: 34.99,
    interval: 'month',
    features: [
      'Unlimited clients & reports',
      'AI-powered insights & recommendations',
      'PDF exports',
      'Custom branding',
      'Email automation',
      'Priority support',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    description: 'Everything in Monthly — pay yearly and save 17%.',
    price: 499.99,
    interval: 'year',
    features: [
      'Unlimited clients & reports',
      'AI-powered insights & recommendations',
      'PDF exports',
      'Custom branding',
      'Email automation',
      'Priority support',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    metadata: {
      isMostPopular: 'true',
    },
  },
];
