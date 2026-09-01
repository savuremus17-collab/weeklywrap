"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Lock, Rocket, Headset } from "lucide-react";

const features = [
  "Unlimited clients & reports",
  "AI-powered insights & recommendations",
  "PDF exports",
  "Custom branding",
  "Email automation",
];

const yearlyPerks = [
  { icon: Sparkles, label: "Year in Review report", desc: "An AI-generated year-end summary of every client's progress" },
  { icon: Lock, label: "Price locked for life", desc: "Your $499.99/yr rate never goes up, even if we raise prices later" },
  { icon: Rocket, label: "Early access to new features", desc: "Try new tools before they roll out to everyone else" },
  { icon: Headset, label: "Priority support", desc: "Jump the queue when you need help" },
];

const price = { monthly: 34.99, yearly: 499.99 };

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const monthlyEquivalent = (price.yearly / 12).toFixed(2);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Simple, <span className="text-primary">honest</span> pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            One plan. Every feature. Pay monthly or save by paying yearly — no free tier, no hidden tiers, no games.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-muted border border-border p-1 transition-colors hover:border-primary/50"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 rounded-full bg-primary"
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly <span className="text-primary text-xs ml-1 font-bold">SAVE 17%</span>
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md mx-auto p-8 rounded-2xl border border-primary bg-primary/5 shadow-[0_0_40px_-15px_rgba(var(--primary),0.3)]"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">WeeklyWrap</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Everything you need to automate client reporting — no matter how you pay.
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold">${isYearly ? price.yearly : price.monthly}</span>
              <span className="text-muted-foreground">/{isYearly ? 'yr' : 'mo'}</span>
            </div>
            {isYearly && (
              <p className="text-xs text-muted-foreground mt-1">
                Works out to ${monthlyEquivalent}/mo, billed annually
              </p>
            )}
          </div>

          <div className="space-y-4 mb-6">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {isYearly && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 mb-6">
                  <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">
                    Only with Yearly
                  </p>
                  <div className="space-y-3">
                    {yearlyPerks.map((perk) => (
                      <div key={perk.label} className="flex items-start gap-3">
                        <perk.icon size={16} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{perk.label}</p>
                          <p className="text-xs text-muted-foreground">{perk.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Link href={`/signup?plan=${isYearly ? "yearly" : "monthly"}`}>
            <Button className="w-full h-12">
              Get Started
            </Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Cancel anytime. No contracts.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
