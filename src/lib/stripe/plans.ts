export type PlanType = 'free' | 'pro' | 'yearly' | 'founding' | 'agency';

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year' | 'lifetime';
  features: string[];
  stripePriceId?: string;
  metadata?: Record<string, string>;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with WeeklyWrap.',
    price: 0,
    interval: 'month',
    features: [
      '1 Client',
      'Limited Reports',
      'WeeklyWrap Branding',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Unlimited reports and AI insights for professionals.',
    price: 15,
    interval: 'month',
    features: [
      'Unlimited Reports',
      'AI Insights',
      'PDF Exports',
      'Custom Branding',
      'Email Automation',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  {
    id: 'yearly',
    name: 'Pro Yearly',
    description: 'Save 2 months with our most popular yearly plan.',
    price: 149,
    interval: 'year',
    features: [
      'Unlimited Reports',
      'AI Insights',
      'PDF Exports',
      'Custom Branding',
      'Email Automation',
      'Priority Support',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    metadata: {
      isMostPopular: 'true',
    },
  },
  {
    id: 'founding',
    name: 'Founding Member',
    description: 'Lifetime access for our earliest supporters.',
    price: 79,
    interval: 'lifetime',
    features: [
      'Lifetime Access',
      'Exclusive Founding Member Badge',
      'All Pro Features Included',
      'Early Access to New Features',
      'Founding Member Community',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_FOUNDING_PRICE_ID,
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Scale your agency with team collaboration.',
    price: 39,
    interval: 'month',
    features: [
      'Multi-user Workspace',
      'Team Collaboration',
      'White-label Reporting',
      'Advanced Analytics',
      'Dedicated Account Manager',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID,
  },
];
