"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const baseFeatures = [
  "Unlimited clients & reports",
  "AI-powered insights & recommendations",
  "PDF exports",
  "Custom branding",
  "Email automation",
];

const yearlyBonusFeatures = [
  "Priority support",
  "Locked-in pricing for life",
  "Early access to new features",
];

const price = { monthly: 15, yearly: 149 };
const links = {
  monthly: "https://buy.stripe.com/test_28E9AUbNL1nIan4cPS8Zq01",
  yearly: "https://buy.stripe.com/test_fZu28s9FD1nIcvc9DG8Zq02",
};

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const monthlyEquivalent = (price.yearly / 12).toFixed(2);
  const features = isYearly ? [...baseFeatures, ...yearlyBonusFeatures] : baseFeatures;

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Simple, <span className="text-primary">honest</span> pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Every feature included at any tier. Go yearly and unlock a few extras on top — no hidden tiers, no games.
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
              Yearly <span className="text-primary text-xs ml-1 font-bold">SAVE 17% + BONUS PERKS</span>
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
              {isYearly
                ? "Everything in Monthly, plus a few extras for committing to a year."
                : "Everything you need to automate client reporting."}
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

          <div className="space-y-4 mb-2">
            {baseFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {isYearly && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 mt-4 mb-3">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">Yearly-only perks</span>
              </div>
              <div className="space-y-3">
                {yearlyBonusFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mb-8" />

          <a
            href={isYearly ? links.yearly : links.monthly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full h-12">
              Get Started
            </Button>
          </a>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Cancel anytime. No contracts.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
