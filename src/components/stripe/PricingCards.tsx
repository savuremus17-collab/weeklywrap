'use client';

import { useState } from 'react';
import { PLANS, Plan } from '@/lib/stripe/plans';
import { getStripe } from '@/lib/stripe/client';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingCards() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
        return;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(null);
    }
  };

  // Filter plans based on interval
  const displayedPlans = PLANS.filter(plan => {
    if (plan.id === 'free') return true;
    if (plan.id === 'founding') return false; // Shown in separate section
    if (plan.id === 'pro' && billingInterval === 'month') return true;
    if (plan.id === 'yearly' && billingInterval === 'year') return true;
    if (plan.id === 'agency') return true;
    return false;
  });

  return (
    <div className="py-12">
      <div className="flex justify-center mb-12">
        <div className="relative flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <button
            onClick={() => setBillingInterval('month')}
            className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-xl ${
              billingInterval === 'month' ? 'text-black' : 'text-white/60 hover:text-white'
            }`}
          >
            {billingInterval === 'month' && (
              <motion.div
                layoutId="active-interval"
                className="absolute inset-0 bg-white rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-xl ${
              billingInterval === 'year' ? 'text-black' : 'text-white/60 hover:text-white'
            }`}
          >
            {billingInterval === 'year' && (
              <motion.div
                layoutId="active-interval"
                className="absolute inset-0 bg-white rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Yearly</span>
          </button>
          {billingInterval === 'year' && (
            <div className="absolute -top-4 -right-20 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-md border border-green-500/20">
              SAVE 15%
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col h-full ${
                plan.metadata?.isMostPopular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.metadata?.isMostPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-white/60 text-sm ml-2">
                  {plan.interval === 'lifetime' ? '/ lifetime' : `/${plan.interval}`}
                </span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-purple-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => plan.id !== 'free' && plan.stripePriceId && handleCheckout(plan.stripePriceId)}
                disabled={(plan.id !== 'free' && !plan.stripePriceId) || loading !== null}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.metadata?.isMostPopular
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-white text-black hover:bg-white/90'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.stripePriceId ? 'Loading...' : plan.id === 'free' ? 'Get Started' : 'Subscribe Now'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
