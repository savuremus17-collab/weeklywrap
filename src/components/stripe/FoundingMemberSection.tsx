'use client';

import { useEffect, useState } from 'react';
import { getFoundingMemberSpots } from '@/lib/stripe/subscription';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import { getStripe } from '@/lib/stripe/client';
import { PLANS } from '@/lib/stripe/plans';

export default function FoundingMemberSection() {
  const [spots, setSpots] = useState({ total_spots: 50, claimed_spots: 0, disabled: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSpots() {
      const data = await getFoundingMemberSpots();
      setSpots(data);
    }
    fetchSpots();
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const foundingPlan = PLANS.find(p => p.id === 'founding');
      if (!foundingPlan?.stripePriceId) return;

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: foundingPlan.stripePriceId }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(null as any);
    }
  };

  const remainingSpots = spots.total_spots - spots.claimed_spots;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 fill-current" />
            LIMITED TIME OFFER
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-4">Become a Founding Member</h2>
            <p className="text-white/60 text-lg">
              One-time payment. Lifetime access. Exclusive badge. <br />
              Help shape the future of WeeklyWrap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-3xl font-bold text-purple-400 mb-1">${PLANS.find(p => p.id === 'founding')?.price}</div>
              <div className="text-sm text-white/40">One-time payment</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-3xl font-bold text-purple-400 mb-1">{remainingSpots}</div>
              <div className="text-sm text-white/40">Spots remaining</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-yellow-500 mb-1" />
              <div className="text-sm text-white/40">Founding Badge</div>
            </div>
          </div>

          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-12">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(spots.claimed_spots / spots.total_spots) * 100}%` }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || spots.disabled}
            className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : spots.disabled ? 'Sold Out' : 'Claim Your Spot'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
