"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for freelancers just starting out.",
    features: [
      "1 Client / Project",
      "Basic AI Reports",
      "Weekly Wrap Branding",
      "PDF Exports",
      "Email Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 15, yearly: 149 },
    description: "For professional creators and freelancers.",
    features: [
      "Unlimited Clients",
      "Advanced AI Insights",
      "Custom Branding",
      "Email Automation",
      "Priority Support",
      "Custom Domains",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: { monthly: 39, yearly: 399 },
    description: "For teams and agencies managing multiple clients.",
    features: [
      "Multi-user Workspace",
      "Team Collaboration",
      "White-label Reports",
      "Advanced Analytics",
      "API Access",
      "Dedicated Account Manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Simple, <span className="text-primary">transparent</span> pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Choose the plan that fits your workflow. Save up to 20% with yearly billing.
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
              Yearly <span className="text-primary text-xs ml-1 font-bold">SAVE 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular 
                  ? 'border-primary bg-primary/5 shadow-[0_0_40px_-15px_rgba(var(--primary),0.3)]' 
                  : 'border-border bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-muted-foreground">/{isYearly ? 'yr' : 'mo'}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="w-full h-12"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Founding Member Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-dashed border-primary/40 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Zap size={32} />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h3 className="text-xl font-bold">Founding Member</h3>
                <span className="bg-primary text-primary-foreground text-[10px] font-black px-1.5 py-0.5 rounded uppercase">Limited</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Get lifetime access to WeeklyWrap Pro for a one-time payment. 
                Only 50 spots available.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="text-3xl font-bold">$79 <span className="text-sm font-normal text-muted-foreground line-through">$499</span></div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              Claim Your Spot
            </Button>
            <div className="text-xs text-muted-foreground">
              <span className="text-primary font-bold">12 spots</span> remaining
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
